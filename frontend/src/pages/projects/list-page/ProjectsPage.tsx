import "./ProjectsPage.css";

import { memo, useState } from "react";
import { useNavigate } from "react-router";

import CreateProjectModal from "../../../components/modal/create-project-modal/CreateProjectModal.tsx";
import PaginationControls from "../../../components/pagination-controls/PaginationControls.tsx";
import Spacer from "../../../components/spacer/Spacer.tsx";
import {
  useCreateNewProjectMutation,
  useGetUploadProjectsQuery,
} from "../../../generated/graphql";
import { useToast } from "../../../providers/toast/ToastProvider.tsx";
import ProjectsFilters from "./filters/ProjectsFilters.tsx";
import ProjectsTable from "./table/ProjectsTable.tsx";

const ITEMS_PER_PAGE = 10;

const ProjectsPage = () => {
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreatingProject, setIsCreatingProject] = useState(false);

  const { data, loading, error, refetch } = useGetUploadProjectsQuery({
    pollInterval: 10000, // Poll every 10 seconds
    variables: {
      where: {},
      skip: (currentPage - 1) * ITEMS_PER_PAGE,
      take: ITEMS_PER_PAGE,
    },
  });

  const [createNewProject] = useCreateNewProjectMutation();

  const handlePageChange = (direction: number) => {
    setCurrentPage((prev) => Math.max(1, prev + direction));
  };

  const handleCreateProject = async (projectData: {
    name: string;
    description: string;
  }) => {
    setIsCreatingProject(true);
    try {
      createNewProject({
        variables: {
          data: {
            projectName: projectData.name,
            description: projectData.description,
          },
        },
      }).then((res) => {
        navigate("/projects/" + res.data?.createUploadProject?.id);
        showToast(
          "success",
          "Successfully created new project: " + projectData.name,
        );
      });

      setIsModalOpen(false);
      refetch();
    } catch (error) {
      console.error("Error creating project:", error);
      showToast("error", "Failed to create project: " + projectData.name);
      // TODO: Add proper error handling and user feedback
    } finally {
      setIsCreatingProject(false);
    }
  };

  if (loading && data?.uploadProjects?.length === 0) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="projects-page scroll-container">
      <div className="projects-page-container">
        <h1>Projects</h1>

        <ProjectsFilters />

        <ProjectsTable
          projects={data?.uploadProjects ?? []}
          onCreateNew={() => setIsModalOpen(true)}
        />

        <PaginationControls
          onClickNext={handlePageChange}
          onClickPrev={handlePageChange}
          currentPage={currentPage}
          itemsPerPage={ITEMS_PER_PAGE}
          totalItems={data?.uploadProjects?.length ?? 0}
        />

        <Spacer />

        <CreateProjectModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleCreateProject}
          isLoading={isCreatingProject}
        />
      </div>
    </div>
  );
};

export default memo(ProjectsPage);
