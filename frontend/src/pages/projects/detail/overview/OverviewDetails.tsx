import { memo } from "react";
import Card from "../../../../components/card/Card.tsx";
import FileUploadMessage from "./overview-messages/FileUploadMessage.tsx";
import TextContentMessage from "./overview-messages/TextContentMessage.tsx";
import UploadTasksMessage from "./overview-messages/UploadTasksMessage.tsx";

interface OverviewDetailsProps {
  project: any;
}

const OverviewDetails = (props: OverviewDetailsProps) => {
  const { project } = props;
  return (
    <Card className="section scroll-container card-height-setting">
      <h2>Overview</h2>
      <p className="section-description">
        Overview of the project status and what remains to be completed
      </p>

      <TextContentMessage project={project} />
      <FileUploadMessage project={project} />
      <UploadTasksMessage project={project} />
    </Card>
  );
};

export default memo(OverviewDetails);
