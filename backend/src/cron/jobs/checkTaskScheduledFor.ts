import { CronContext } from "../helpers";
import { UploadStatus } from "../../types";
import { updateUploadToStatus } from "../../utils/db";

const checkTaskScheduledFor = async (context: CronContext) => {
  const uploads = await context.db.Upload.findMany({
    where: {
      scheduledFor: {
        lte: new Date(Date.now() - 60 * 1000),
      },
      uploadStatus: {
        equals: UploadStatus.PENDING_RELEASE,
      },
    },
  });

  if (uploads.length === 0) {
    console.log("checkTaskScheduledFor: No uploads found");
    return;
  }

  console.log("checkTaskScheduledFor: Found " + uploads.length + " uploads");

  for (const upload of uploads) {
    await updateUploadToStatus(upload.id, UploadStatus.QUEUED, context);
  }
};

export default {
  name: "CheckTaskScheduledFor",
  description: "Check task scheduled for and queue if needed",
  schedule: "* * * * *",
  func: checkTaskScheduledFor,
};
