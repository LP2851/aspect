import { memo } from "react";
import DetailItem from "../../../../../components/detail-item/DetailItem.tsx";

interface UploadTasksMessageProps {
  project: any;
}

const UploadTasksMessage = (props: UploadTasksMessageProps) => {
  const { project } = props;

  const uploads = project?.uploadsTo ?? [];
  const failedCount = uploads.filter(
    (u: any) => u.uploadStatus === "FAILED",
  ).length;

  const completedCount = uploads.filter(
    (u: any) => u.uploadStatus === "COMPLETED",
  ).length;

  if (!uploads.length) return null;

  if (failedCount > 0) {
    return (
      <DetailItem
        isPositive={false}
        headerText="Upload Tasks"
        statusText="Failed"
        descriptionText={`You have ${failedCount} failed upload task${
          failedCount > 1 ? "s" : ""
        } configured for this project.`}
      />
    );
  }

  if (completedCount === uploads.length) {
    return (
      <DetailItem
        isPositive={true}
        headerText="Upload Tasks"
        statusText="All Complete"
        descriptionText={`You have ${completedCount} completed upload task${
          completedCount > 1 ? "s" : ""
        } configured for this project.`}
      />
    );
  }

  return (
    <DetailItem
      isPositive={true}
      headerText="Upload Tasks"
      statusText={`${uploads.length} Tasks`}
      descriptionText={`You have ${uploads.length} upload task${
        uploads.length > 1 ? "s" : ""
      } configured for this project.`}
    />
  );
};

export default memo(UploadTasksMessage);
