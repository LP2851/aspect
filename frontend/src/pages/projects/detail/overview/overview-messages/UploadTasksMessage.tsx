import { memo } from "react";
import DetailItem from "../../../../../components/detail-item/DetailItem.tsx";

interface UploadTasksMessageProps {
  project: any;
}

const UploadTasksMessage = (props: UploadTasksMessageProps) => {
  const { project } = props;

  return (
    <>
      {project?.uploadLocation &&
        project?.uploadsTo.filter(
          (uploadTask: any) => uploadTask.uploadStatus === "FAILED",
        ).length > 0 && (
          <DetailItem
            isPositive={false}
            headerText="Upload Tasks"
            statusText="Failed"
            descriptionText={`You have ${project?.uploadsTo.filter((uploadTask: any) => uploadTask.uploadStatus === "FAILED").length} failed upload tasks configured for this project.`}
          />
        )}

      {project?.uploadsTo && project?.uploadsTo.length > 0 && (
        <DetailItem
          isPositive={true}
          headerText="Upload Tasks"
          statusText={`${project?.uploadsTo.length} Tasks`}
          descriptionText={`You have ${project?.uploadsTo.length} upload tasks configured for this project.`}
        />
      )}
    </>
  );
};

export default memo(UploadTasksMessage);
