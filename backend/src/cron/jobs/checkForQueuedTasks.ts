import { CronContext } from "../helpers";
import { Platform, UploadStatus } from "../../types";
import { getUploadProjectById, updateUploadToStatus } from "../../utils/db";
import { generateTextContent } from "../../utils/content/textContent";

const runUploadTaskX = async (task: any, context: CronContext) => {
  // console.log(JSON.stringify(task));
  const project = await getUploadProjectById(task.projectId, context);

  await updateUploadToStatus(task.id, UploadStatus.UPLOADING, context);

  const textContent = generateTextContent(project.textContent || "");

  console.log("Generated Text Content: " + textContent);

  // todo do something for task
  await updateUploadToStatus(task.id, UploadStatus.COMPLETED, context);
  // todo or FAILURE
};

const checkForQueuedTasks = async (context: CronContext) => {
  const queuedUploads = await context.db.Upload.findMany({
    where: {
      uploadStatus: {
        equals: UploadStatus.QUEUED,
      },
    },
  });

  if (queuedUploads.length === 0) {
    console.log("checkForQueuedTasks: No queued uploads found");
    return;
  }

  console.log(
    "checkForQueuedTasks: Found " + queuedUploads.length + " queued uploads"
  );

  queuedUploads
    .filter((u) => {
      return u.uploadTo === Platform.X;
    })
    .forEach((upload) => {
      runUploadTaskX(upload, context);
    });
};

export default {
  name: "CheckForQueuedTasks",
  description: "Check for queued tasks",
  schedule: "* * * * *",
  func: checkForQueuedTasks,
};
