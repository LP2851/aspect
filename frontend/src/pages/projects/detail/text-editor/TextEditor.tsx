import Card from "../../../../components/card/Card.tsx";
import Button from "../../../../components/button/Button.tsx";
import { useUpdateProjectMutation } from "../../../../generated/graphql.ts";
import { memo, useEffect, useState } from "react";
import TextAreaWithHighlights from "../../../../components/input/textarea-highlighted/TextAreaWithHighlights.tsx";
import Table from "../../../../components/table/Table.tsx";
import "./TextEditor.css";

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

      <h2 className="new-section">Advanced Text Options</h2>
      <p className="section-description">
        Advanced text options that can be used to customize the text content for
        the project by dynamically replacing certain keywords with specific
        information.
      </p>

      <div className="advanced-text-options">
        <div className="advanced-text-option">
          <Table
            style={{ fontSize: "small" }}
            headers={["Command", "Description"]}
          >
            <tr>
              <td style={{ fontSize: "medium" }} colSpan={2}>
                Date Commands
              </td>
            </tr>

            <tr>
              <td>
                <span className="highlight-text">//date</span>
              </td>
              <td>
                Replaced with the current date in the format{" "}
                <span className="bold-text">YYYY-MM-DD</span> upon upload.
              </td>
            </tr>
            <tr>
              <td>
                <span className="highlight-text">//date_us</span>
              </td>
              <td>
                Replaced with the current date in the format{" "}
                <span className="bold-text">MM-DD-YYYY</span> upon upload.
              </td>
            </tr>
            <tr>
              <td>
                <span className="highlight-text">//date_uk</span>
              </td>
              <td>
                Replaced with the current date in the format{" "}
                <span className="bold-text">DD-MM-YYYY</span> upon upload.
              </td>
            </tr>

            <tr>
              <td style={{ fontSize: "medium" }} colSpan={2}>
                Time Commands
              </td>
            </tr>

            <tr>
              <td>
                <span className="highlight-text">//time_hm</span>
              </td>
              <td>
                Replaced with the current time in the format{" "}
                <span className="bold-text">HH:MM</span> upon upload.
              </td>
            </tr>
            <tr>
              <td>
                <span className="highlight-text">//time_hms</span>
              </td>
              <td>
                Replaced with the current time in the format{" "}
                <span className="bold-text">HH:MM:SS</span> upon upload.
              </td>
            </tr>
          </Table>
        </div>
      </div>
    </Card>
  );
};

export default memo(TextEditor);
