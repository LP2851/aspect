import Card from "../../../../components/card/Card.tsx";
import Button from "../../../../components/button/Button.tsx";
import { useUpdateProjectMutation } from "../../../../generated/graphql.ts";
import { memo, useEffect, useState } from "react";
import TextAreaWithHighlights from "../../../../components/input/textarea-highlighted/TextAreaWithHighlights.tsx";

interface TextEditorProps {
  project: any;
  onSave: () => void;
}

const TextEditor = (props: TextEditorProps) => {
  const { project, onSave } = props;
  const [textContent, setTextContent] = useState<string>("");

  const [updateProject] = useUpdateProjectMutation();

  useEffect(() => {
    setTextContent(project?.textContent || "");
  }, [project?.id]);

  const onSaveProject = async () => {
    try {
      await updateProject({
        variables: {
          where: { id: project.id },
          data: {
            textContent,
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
      <h2>Text Editor</h2>
      <p className="section-description">
        Text content for the project, to be uploaded
      </p>

      <TextAreaWithHighlights
        required={true}
        label="Text Content"
        placeholder="Enter text content for your post"
        value={textContent || ""}
        onChange={(e) => {
          if (project) {
            setTextContent(e.target.value);
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

export default memo(TextEditor);
