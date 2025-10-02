import "./ProjectDetailsPage.css";

import { memo, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

import { type Project } from "../../../api/types/types.ts";
import Button from "../../../components/button/Button.tsx";
import Card from "../../../components/card/Card.tsx";
import TextInput from "../../../components/input/text/TextInput.tsx";
import TextAreaInput from "../../../components/input/textarea/TextAreaInput.tsx";
import LeftSidebar from "../../../components/left-sidebar/LeftSidebar.tsx";
import { useGetUploadProjectQuery } from "../../../generated/graphql.ts";
import { useToast } from "../../../providers/toast/ToastProvider.tsx";

const ProjectDetailPage = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { projectId: id } = useParams<{ projectId: string }>();
  const [project, setProject] = useState<Project | null>(null);

  const { data, loading, error } = useGetUploadProjectQuery({
    variables: {
      where: {
        id,
      },
    },
  });

  useEffect(() => {
    setProject(data?.uploadProject as Project);
  }, [loading, data?.uploadProject]);

  // const handleSave = () => {
  //   // Call API to save project changes
  //   fetch(`/api/projects/${id}`, {
  //     method: "PUT",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(project),
  //   });
  // };

  if (loading && !project) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="project-detail-page">
      <LeftSidebar
        header={"Project: " + project?.projectName}
        sidebarFooter={
          <div className="sidebar-footer-item">
            <Button
              variant="danger"
              onClick={() => {
                navigate("/projects");
                showToast(
                  "error",
                  "Cancelled changes to project: " + project?.projectName,
                );
              }}
            >
              Cancel Changes
            </Button>
            <Button
              onClick={() =>
                showToast("success", "Saved changes successfully!")
              }
            >
              Save All Changes
            </Button>
          </div>
        }
        renderContentMapping={{
          general: {
            element: (
              <Card>
                <h3>General Details</h3>
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
                  onClick={() => alert("Saving")}
                >
                  Save Changes
                </Button>
              </Card>
            ),
            itemName: "General Details",
          },
          uploadLocation: {
            itemName: "Upload Location",
            element: <Card></Card>,
          },
          uploadsTo: {
            itemName: "Upload To",
            element: <Card></Card>,
          },
        }}
      />
    </div>
  );
};

export default memo(ProjectDetailPage);
