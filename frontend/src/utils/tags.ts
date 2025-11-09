import { UploadStatus } from "../api/types/types.ts";

export const getTagColorForStatus = (status: UploadStatus) => {
  switch (status) {
    case UploadStatus.PENDING_RELEASE:
      return "gray";
    case UploadStatus.QUEUED:
      return "blue";
    case UploadStatus.UPLOADING:
      return "purple";
    case UploadStatus.COMPLETED:
      return "green";
    case UploadStatus.FAILED:
      return "red";
  }
};
