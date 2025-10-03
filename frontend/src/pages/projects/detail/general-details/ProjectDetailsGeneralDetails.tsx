import TextInput from "../../../../components/input/text/TextInput.tsx";
import TextAreaInput from "../../../../components/input/textarea/TextAreaInput.tsx";
import Button from "../../../../components/button/Button.tsx";
import Card from "../../../../components/card/Card.tsx";
import {memo} from "react";

interface ProjectDetailsGeneralDetailsProps {
  project: any;
  setProject: (project: any) => void;
  onSave: () => void;
}

const ProjectDetailsGeneralDetails = ({project, setProject, onSave}: ProjectDetailsGeneralDetailsProps) => {
  return <Card>
    <h2>General</h2>
    <p className="description">General details about the project</p>
    <TextInput
      required={true}
      label="Project Name"
      placeholder={"Project Name"}
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

    <Button
      style={{ marginTop: "2rem", width: "100%" }}
      onClick={onSave}
    >
      Save Changes
    </Button>
  </Card>;
}

export default memo(ProjectDetailsGeneralDetails);
