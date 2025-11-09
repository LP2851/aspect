import { memo } from "react";
import DetailItem from "../../../../../components/detail-item/DetailItem.tsx";

interface FileUploadMessageProps {
  project: any;
}

const FileUploadMessage = (props: FileUploadMessageProps) => {
  const { project } = props;

  return (
    <>
      {!project?.uploadLocation && project?.projectType !== "TEXT" && (
        <DetailItem
          isPositive={false}
          headerText="File Upload Link"
          statusText="Not Connected"
          descriptionText="You have NOT linked this project a file upload location."
        />
      )}

      {project?.uploadLocation && project?.projectType !== "TEXT" && (
        <DetailItem
          isPositive={true}
          headerText="File Upload Link"
          statusText="Connected"
          descriptionText={`You have linked this project a file upload to ${project?.uploadLocation.type === "LOCAL" ? "a local file system." : ""} ${project?.uploadLocation.type === "G_DRIVE" ? "Google Drive." : ""} ${project?.uploadLocation.type === "S3" ? "AWS S3." : ""}`}
        />
      )}
    </>
  );
};

export default memo(FileUploadMessage);
