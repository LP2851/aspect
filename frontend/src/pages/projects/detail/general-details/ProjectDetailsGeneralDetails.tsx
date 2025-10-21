import { memo } from "react";

import Button from "../../../../components/button/Button.tsx";
import Card from "../../../../components/card/Card.tsx";
import DetailItem from "../../../../components/detail-item/DetailItem.tsx";
import TextInput from "../../../../components/input/text/TextInput.tsx";
import TextAreaInput from "../../../../components/input/textarea/TextAreaInput.tsx";
import {useGetManagedAccountsQuery} from "../../../../generated/graphql.ts";
import {useAuth} from "../../../../auth/AuthProvider.tsx";
import Select from "../../../../components/input/select/Select.tsx";

interface ProjectDetailsGeneralDetailsProps {
  project: any;
  setProject: (project: any) => void;
  onSave: () => void;
}

const ProjectDetailsGeneralDetails = ({
  project,
  setProject,
  onSave,
}: ProjectDetailsGeneralDetailsProps) => {
  const { user } = useAuth();
  const { data } = useGetManagedAccountsQuery({
    variables: {
      where: {
        user: {
          id: {
            equals: user?.id,
          },
        },
      },
      skip: 0,
      take: 100,
    },
  });

  return (
    <Card className="scroll-container card-height-setting">
      <h2>General</h2>
      <p className="description">General details about the project</p>
      <TextInput
        required={true}
        label="Project Name"
        placeholder="Project Name"
        value={project?.projectName}
        onChange={(e) => {
          if (project) {
            setProject({ ...project, projectName: e.target.value });
          }
        }}
      />

      <TextAreaInput
        required={true}
        label="Description"
        value={project?.description || ""}
        onChange={(e) => {
          if (project) {
            setProject({ ...project, description: e.target.value });
          }
        }}
      />

      <Select
        required={true}
        label="Account"
        id="account"
        value={project?.account.id || ""}
        key="account"
        options={data?.managedAccounts?.map((account: any) => ({
          value: account.id,
          label: account.name,
        })) || []}
        onChange={(e) => {
          if (project) {
            setProject({ ...project, account: { connect:{ id: e.target.value } } });
          }
        }}
      />

      <Button style={{ marginTop: "2rem", width: "100%" }} onClick={onSave}>
        Save Changes
      </Button>

      <h2 className="new-section">Overview</h2>
      <p className="description">
        Overview of the project status and what remains to be completed
      </p>

      {!project?.uploadLocation && (
        <DetailItem
          isPositive={false}
          headerText="File Upload Link"
          statusText="Not Connected"
          descriptionText="You have NOT linked this project a file upload location."
        />
      )}

      {project?.uploadLocation && (
        <DetailItem
          isPositive={true}
          headerText="File Upload Link"
          statusText="Connected"
          descriptionText={`You have linked this project a file upload to ${project?.uploadLocation.type === "LOCAL" ? "a local file system." : ""} ${project?.uploadLocation.type === "G_DRIVE" ? "Google Drive." : ""} ${project?.uploadLocation.type === "S3" ? "AWS S3." : ""}`}
        />
      )}

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
    </Card>
  );
};

export default memo(ProjectDetailsGeneralDetails);
