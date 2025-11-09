import { KeystoneContext } from "@keystone-6/core/types";

const DATA = [
  // Upload Tasks
  {
    name: "Upload to X",
    description: "Upload to X",
    type: "UPLOAD",
    handler: "uploadToX",
    isEnabled: true,
    maxRetries: 1,
  },
  {
    name: "Upload to YouTube",
    description: "Upload to YouTube",
    type: "UPLOAD",
    handler: "uploadToYouTube",
    isEnabled: false,
    maxRetries: 1,
  },
  {
    name: "Upload to TikTok",
    description: "Upload to TikTok",
    type: "UPLOAD",
    handler: "uploadToTikTok",
    isEnabled: false,
    maxRetries: 1,
  },
  {
    name: "Upload to Instagram",
    description: "Upload to Instagram",
    type: "UPLOAD",
    handler: "uploadToInstagram",
    isEnabled: false,
    maxRetries: 1,
  },
  {
    name: "Upload to Facebook",
    description: "Upload to Facebook",
    type: "UPLOAD",
    handler: "uploadToFacebook",
    isEnabled: false,
    maxRetries: 1,
  },
  // Email Tasks

  // Ffmpeg Tasks

  // Other Tasks
];

const createTask = async (taskType: any, context: KeystoneContext<any>) => {
  await context.db.TaskType.createOne({
    data: {
      ...taskType,
    },
  });
};

const updateTask = async (
  currentTaskId: string,
  taskType: any,
  context: KeystoneContext<any>
) => {
  await context.db.TaskType.updateOne({
    where: {
      id: currentTaskId,
    },
    data: {
      ...taskType,
    },
  });
};

export const generateTaskTypes = async (context: KeystoneContext<any>) => {
  for (const taskType of DATA) {
    const data = await context.db.TaskType.findMany({
      where: {
        name: { equals: taskType.name },
      },
    });

    if (!data || data.length === 0) {
      await createTask(taskType, context);
      continue;
    }

    await updateTask(data[0].id, taskType, context);
  }

  console.log("✅ Generating task types");
};
