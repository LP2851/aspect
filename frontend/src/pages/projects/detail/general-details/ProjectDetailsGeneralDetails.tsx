import { memo } from "react";

import Button from "../../../../components/button/Button.tsx";
import Card from "../../../../components/card/Card.tsx";
import TextInput from "../../../../components/input/text/TextInput.tsx";
import TextAreaInput from "../../../../components/input/textarea/TextAreaInput.tsx";
import {
  useGetManagedAccountsQuery,
  useUpdateProjectMutation,
} from "../../../../generated/graphql.ts";
import { useAuth } from "../../../../auth/AuthProvider.tsx";
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

  const [updateProject] = useUpdateProjectMutation();

  const onSaveProject = async () => {
    try {
      await updateProject({
        variables: {
          where: { id: project.id },
          data: {
            projectName: project.projectName,
            description: project.description,
            projectType: project.projectType,
            account: { connect: { id: project.account.id } },
          },
        },
      });
      onSave();
    } catch (err: any) {
      console.log(err);
    }
  };

  return (
    <Card className="section scroll-container card-height-setting">
      <h2>General</h2>
      <p className="section-description">General details about the project</p>
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
        label="Type"
        id="projectType"
        value={project?.projectType || ""}
        key="projectType"
        options={[
          { value: "TEXT", label: "Text" },
          { value: "IMAGE", label: "Image" },
          { value: "VIDEO", label: "Video" },
          { value: "MULTI_MEDIA", label: "Multi-Media" },
        ]}
        onChange={(e) => {
          if (project) {
            setProject({ ...project, projectType: e.target.value });
          }
        }}
      />

      <Select
        required={true}
        label="Account"
        id="account"
        value={project?.account.id || ""}
        key="account"
        options={
          data?.managedAccounts?.map((account: any) => ({
            value: account.id,
            label: account.name,
          })) || []
        }
        onChange={(e) => {
          if (project) {
            setProject({ ...project, account: { id: e.target.value } });
          }
        }}
      />

      <Button
        style={{ marginTop: "2rem", width: "100%" }}
        onClick={onSaveProject}
      >
        Save Changes
      </Button>
    </Card>
  );
};

export default memo(ProjectDetailsGeneralDetails);
