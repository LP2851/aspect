export const PROJECT_STATUS_OPTIONS = [
  { label: "Created", value: "CREATED" },
  { label: "Ready", value: "READY" },
  { label: "Queued", value: "QUEUED" },
  { label: "Uploading", value: "UPLOADING" },
  { label: "Processing", value: "PROCESSING" },
  { label: "Completed", value: "COMPLETED" },
  { label: "Failed", value: "FAILED" },
];

export const PROJECT_TYPE_OPTIONS = [
  { label: "Text", value: "TEXT" },
  { label: "Image", value: "IMAGE" },
  { label: "Video", value: "VIDEO" },
  { label: "Multi-Media", value: "MULTI_MEDIA" },
  // { label: "Audio", value: "AUDIO" },
  // { label: "Document", value: "DOCUMENT" },
];

export const UPLOAD_LOCATION_TYPE_OPTIONS = [
  { label: "S3", value: "S3" },
  { label: "Local", value: "LOCAL" },
  { label: "Google Drive", value: "G_DRIVE" },
];

export const UPLOAD_PLATFORM_OPTIONS = [
  { label: "TikTok", value: "TIK_TOK" },
  { label: "YouTube", value: "YOUTUBE" },
  { label: "Instagram", value: "INSTAGRAM" },
  { label: "Facebook", value: "FACEBOOK" },
  { label: "X", value: "X" },
];

export const UPLOAD_STATUS_OPTIONS = [
  { label: "Pending Release", value: "PENDING_RELEASE" },
  { label: "Queued", value: "QUEUED" },
  { label: "Uploading", value: "UPLOADING" },
  { label: "Completed", value: "COMPLETED" },
  { label: "Failed", value: "FAILED" },
];

export const AUDIT_TYPES_OPTIONS = ["CREATE", "UPDATE", "DELETE"];

export const AUDIT_CHANGE_SUB_TYPES = [
  {
    label: "Task Update to Pending Release",
    value: "TASK_UPDATE_PENDING_RELEASE",
  },
  { label: "Task Update to Queued", value: "TASK_UPDATE_QUEUED" },
  { label: "Task Update to Uploading", value: "TASK_UPDATE_UPLOADING" },
  { label: "Task Update to Completed", value: "TASK_UPDATE_COMPLETED" },
  { label: "Task Update to Failed", value: "TASK_UPDATE_FAILED" },
];
