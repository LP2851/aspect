import fs from "fs";
import { google } from "googleapis";
import { KeystoneContext } from "@keystone-6/core/types";
import { decrypt, encrypt } from "../../utils/encrypt";

export async function uploadQueuedVideos(context: KeystoneContext) {
  // Fetch pending videos
  const videos = await context.db.Video.findMany({
    where: { status: { equals: "pending" } },
    include: { owner: true },
  });

  for (const video of videos) {
    try {
      const oauth2Client = await getOAuthClient(context, video.owner.userId);
      const youtube = google.youtube({ version: "v3", auth: oauth2Client });

      // Update status to "uploading"
      await context.db.Video.updateOne({
        where: { id: video.id },
        data: { status: "uploading" },
      });

      const res = await youtube.videos.insert({
        part: ["snippet", "status"],
        requestBody: {
          snippet: { title: video.title, description: video.description || "" },
          status: { privacyStatus: "private" },
        },
        media: { body: fs.createReadStream(video.filePath) },
      });

      // Update status to "uploaded"
      await context.db.Video.updateOne({
        where: { id: video.id },
        data: { status: "uploaded", uploadedAt: new Date() },
      });

      console.log(`Uploaded video ID: ${res.data.id}`);
    } catch (err) {
      console.error(`Failed to upload video ${video.id}`, err);

      // Mark as failed
      await context.db.Video.updateOne({
        where: { id: video.id },
        data: { status: "failed" },
      });
    }
  }

  export async function getOAuthClient(
    context: KeystoneContext,
    userId: string
  ) {
    const userToken = await context.db.UserToken.findOne({ where: { userId } });
    if (!userToken) throw new Error("User token not found");

    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );

    const tokens = {
      access_token: decrypt(userToken.accessToken as string),
      refresh_token: decrypt(userToken.refreshToken as string),
      expiry_date: (userToken.expiryDate as Date)?.getTime() || 0,
    };

    oauth2Client.setCredentials(tokens);

    // Listen for new tokens (auto-save refreshed tokens)
    oauth2Client.on("tokens", async (newTokens) => {
      await context.db.UserToken.updateOne({
        where: { userId },
        data: {
          accessToken: newTokens.access_token
            ? encrypt(newTokens.access_token)
            : undefined,
          refreshToken: newTokens.refresh_token
            ? encrypt(newTokens.refresh_token)
            : undefined,
          expiryDate: newTokens.expiry_date
            ? new Date(newTokens.expiry_date)
            : undefined,
        },
      });
    });

    return oauth2Client;
  }
}
