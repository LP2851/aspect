import "./ProjectDetailsPage.css";

import { memo, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

import { type Project } from "../../../api/types/types.ts";
import Button from "../../../components/button/Button.tsx";
import Card from "../../../components/card/Card.tsx";
import LeftSidebar from "../../../components/left-sidebar/LeftSidebar.tsx";
import { useGetUploadProjectQuery } from "../../../generated/graphql.ts";
import { useToast } from "../../../providers/toast/ToastProvider.tsx";
import ProjectDetailsGeneralDetails from "./general-details/ProjectDetailsGeneralDetails.tsx";
import ProjectDetailsUploadLocation from "./file-upload-link/ProjectDetailsFileUploadLink.tsx";

const ProjectDetailPage = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { projectId: id } = useParams<{ projectId: string }>();
  const [project, setProject] = useState<Project | null>(null);

  const { data, loading, error, refetch } = useGetUploadProjectQuery({
    variables: {
      where: {
        id,
      },
    },
  });

  useEffect(() => {
    setProject(data?.uploadProject as Project);
  }, [loading, data?.uploadProject]);

  const onSave = async () => {
    showToast("success", "Saved changes successfully!");
    await refetch();
  }

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
            element: <ProjectDetailsGeneralDetails
              project={project}
              setProject={setProject}
              onSave={onSave}
            />,
            itemName: "General Details",
          },
          fileUploadLink: {
            itemName: "File Upload Link",
            element: <ProjectDetailsUploadLocation
              project={project}
              setProject={setProject}
              onSave={onSave}
            />,
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
