import { memo, useEffect, useState } from "react";
import { useParams } from "react-router";
import { useToast } from "../../../providers/toast/ToastProvider.tsx";
import { useGetUploadProjectQuery } from "../../../generated/graphql.ts";
import type { Project } from "../../../api/types/types.ts";
import PageWithLeftSidebar from "../../../components/page-with-left-sidebar/PageWithLeftSidebar.tsx";
import ProjectDetailsGeneralDetails from "./general-details/ProjectDetailsGeneralDetails.tsx";
import ProjectDetailsUploadLocation from "./file-upload-link/ProjectDetailsFileUploadLink.tsx";
import UploadToDetails from "./upload-to/UploadToDetails.tsx";
import "./ProjectDetailsPage.css";
import TextEditor from "./text-editor/TextEditor.tsx";
import OverviewDetails from "./overview/OverviewDetails.tsx";

const ProjectDetailsPage = () => {
  // const navigate = useNavigate();
  const { showToast } = useToast();
  const { projectId: id } = useParams<{ projectId: string }>();
  const [project, setProject] = useState<any | null>(null);

  const { data, loading, error, refetch } = useGetUploadProjectQuery({
    variables: {
      where: {
        id,
      },
    },
    pollInterval: 10000, // 1 second
  });

  useEffect(() => {
    setProject(data?.uploadProject as Project);
  }, [loading, data?.uploadProject]);

  const onSave = async () => {
    showToast("success", "Saved changes successfully!");
    await refetch();
  };

  const refresh = async () => {
    await refetch();
  };

  if (loading && !project) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const renderContentMapping = [
    {
      key: "overview",
      itemName: "Overview",
      hidden: false,
      element: <OverviewDetails project={project} />,
    },
    {
      key: "general",
      itemName: "General Details",
      hidden: false,
      element: (
        <ProjectDetailsGeneralDetails
          project={project}
          setProject={setProject}
          onSave={onSave}
        />
      ),
    },
    {
      key: "text-editor",
      itemName: "Text Editor",
      hidden: false,
      element: <TextEditor project={project} onSave={onSave} />,
    },
    {
      key: "file-upload-link",
      itemName: "File Upload Link",
      hidden: project?.projectType === "TEXT",
      element: (
        <ProjectDetailsUploadLocation
          project={project}
          setProject={setProject}
          onSave={onSave}
        />
      ),
    },
    {
      key: "upload-tasks",
      itemName: "Upload Tasks",
      hidden: false,
      element: (
        <UploadToDetails project={project} onSave={onSave} refresh={refresh} />
      ),
    },
  ];

  return (
    // @ts-ignore
    <PageWithLeftSidebar
      contentMapping={renderContentMapping}
      title={"Project: " + project?.projectName}
      defaultKey="overview"
      path={"/projects/" + id}
    />
  );
};

export default memo(ProjectDetailsPage);
