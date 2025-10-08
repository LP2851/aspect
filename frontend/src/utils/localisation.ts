import { UploadPlatform, UploadStatus } from "../api/types/types.ts";

export const getStatusAsText = (status: UploadStatus) => {
  switch (status) {
    case UploadStatus.PENDING_RELEASE:
      return "Pending Release";
    case UploadStatus.QUEUED:
      return "Queued";
    case UploadStatus.UPLOADING:
      return "Uploading";
    case UploadStatus.COMPLETED:
      return "Completed";
    case UploadStatus.FAILED:
      return "Failed";
  }
};

export const getPlatformAsText = (platform: UploadPlatform) => {
  switch (platform) {
    case UploadPlatform.FACEBOOK:
      return "Facebook";
    case UploadPlatform.INSTAGRAM:
      return "Instagram";
    case UploadPlatform.YOUTUBE:
      return "YouTube";
    case UploadPlatform.TIK_TOK:
      return "TikTok";
    case UploadPlatform.X:
      return "X";
  }
};
