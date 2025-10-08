// Welcome to Keystone!
//
// This file is what Keystone uses as the entry-point to your headless backend
//
// Keystone imports the default export of this file, expecting a Keystone configuration object
//   you can find out more at https://keystonejs.com/docs/apis/config

import "dotenv/config";
import { config, graphql } from "@keystone-6/core";

// to keep this file tidy, we define our schema in a different file
import { lists } from "./schema";

// authentication is configured separately here too, but you might move this elsewhere
// when you write your list-level access control functions, as they typically rely on session data
import { withAuth, session } from "./auth";
import { google } from "googleapis";

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

// @ts-ignore
export default withAuth(
  config({
    db: {
      provider: "postgresql",
      url: process.env.DATABASE_URL || "",
    },
    lists,
    session,
    // extendGraphqlSchema: graphql.extend(base => {
    //   return {
    //     query: {
    //       youtubeAuthUrl: {
    //         type: graphql.String,
    //         resolve: () => {
    //           const url = oauth2Client.generateAuthUrl({
    //             access_type: 'offline',
    //             scope: ['https://www.googleapis.com/auth/youtube.upload'],
    //             prompt: 'consent',
    //           });
    //           return url;
    //         }
    //       }
    //     }
    //   }
    // }),
    graphql: {
      // @ts-ignore
      extendGraphqlSchema: graphql.extend(() => {
        return {
          query: {
            youtubeAuthUrl: {
              type: graphql.String,
              resolve: () => {
                const url = oauth2Client.generateAuthUrl({
                  access_type: "offline",
                  scope: [
                    "https://www.googleapis.com/auth/youtube.upload",
                    "https://www.googleapis.com/auth/userinfo.email",
                  ],
                  prompt: "consent",
                });
                return url;
              },
            },
          },
        };
      }),
    },
    server: {
      port: 3001,
      cors: { origin: ["http://localhost:5173"], credentials: true },
      extendExpressApp: (app, commonContext) => {
        app.get("/auth/youtube/callback", async (req, res) => {
          const { code, error } = req.query;

          if (error) {
            return res.redirect(`http://localhost:5173/settings?error=error`);
          }

          if (!code) {
            return res.redirect("http://localhost:5173/profile?error=error");
          }

          try {
            // Exchange the code for tokens directly (without GraphQL)
            const { tokens } = await oauth2Client.getToken(code as string);
            oauth2Client.setCredentials(tokens);

            // Get Google user info
            const oauth2 = google.oauth2({ version: "v2", auth: oauth2Client });
            const { data: googleUser } = await oauth2.userinfo.get();

            // Get current user from session
            const { id: userId } = await commonContext.db.User.findOne({
              where: { email: googleUser.email },
            });

            if (!userId) {
              console.log("User not authenticated");
              console.log(JSON.stringify(googleUser));
              console.log(JSON.stringify(userId));
              console.log(JSON.stringify(tokens));

              return res.redirect(
                "http://localhost:5173/profile?error=youtube_not_authenticated"
              );
            }

            const existingToken = await commonContext.db.UserToken.findMany({
              where: {
                AND: [
                  {
                    tokenFor: {
                      equals: "YOUTUBE",
                    },
                    user: {
                      id: {
                        equals: userId,
                      },
                    },
                  },
                ],
              },
            });

            const tokenData = {
              user: {
                connect: {
                  id: userId,
                },
              },
              accessToken: tokens.access_token,
              refreshToken: tokens.refresh_token,
              scopes: tokens.scope,
              tokenFor: "YOUTUBE",
              expiryDate: tokens.expiry_date
                ? new Date(tokens.expiry_date)
                : null,
            };

            if (existingToken) {
              // Update existing token
              await commonContext.db.UserToken.updateOne({
                where: { id: existingToken.id },
                data: tokenData,
              });
            } else {
              // Create new token record
              await commonContext.db.UserToken.createOne({
                data: tokenData,
              });
            }

            // Success - redirect back to your frontend
            res.redirect(
              "http://localhost:5173/profile?success=youtube_connected"
            );
          } catch (error) {
            console.error("Callback error:", error);
            res.redirect("http://localhost:5173/profile?error=callback_failed");
          }
        });
      },
    },
  })
);

import "./src/cron/scheduler";
