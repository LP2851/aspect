import "./ProjectsPage.css";

import { memo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";

import CreateProjectModal from "../../../components/modal/create-project-modal/CreateProjectModal.tsx";
import PaginationControls from "../../../components/pagination-controls/PaginationControls.tsx";
import Spacer from "../../../components/spacer/Spacer.tsx";
import {
  useCreateNewProjectMutation,
  useGetManagedAccountsQuery,
  useGetUploadProjectsQuery,
} from "../../../generated/graphql";
import { useToast } from "../../../providers/toast/ToastProvider.tsx";
import ProjectsFilters from "./filters/ProjectsFilters.tsx";
import ProjectsTable from "./table/ProjectsTable.tsx";
import { useAuth } from "../../../auth/AuthProvider.tsx";

const ITEMS_PER_PAGE = 10;

const ProjectsPage = () => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const managedAccounts = searchParams.get("managedAccounts");
  const selectedPlatforms = searchParams.get("platforms");
  const selectedTypes = searchParams.get("types");

  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreatingProject, setIsCreatingProject] = useState(false);

  const buildWhereClause = () => {
    const where: any = {};

    if (managedAccounts) {
      const accountIds = managedAccounts.split(",");
      where.account = {
        id: { in: accountIds },
      };
    }

    if (selectedTypes) {
      const types = selectedTypes.split(",");
      where.projectType = {
        in: types.map((type) => type.toUpperCase().replace("-", "_")),
      };
    }

    if (selectedPlatforms) {
      const platforms = selectedPlatforms.split(",");
      where.uploadsTo = {
        some: {
          uploadTo: { in: platforms.map((platform) => platform.toUpperCase()) },
        },
      };
    }

    return where;
  };

  const { data, loading, error, refetch } = useGetUploadProjectsQuery({
    pollInterval: 10000, // Poll every 10 seconds
    variables: {
      where: buildWhereClause(),
      skip: (currentPage - 1) * ITEMS_PER_PAGE,
      take: ITEMS_PER_PAGE,
    },
  });

  const { data: managedAccountsData } = useGetManagedAccountsQuery({
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

  const [createNewProject] = useCreateNewProjectMutation();

  const handlePageChange = (direction: number) => {
    setCurrentPage((prev) => Math.max(1, prev + direction));
  };

  const handleCreateProject = async (projectData: {
    name: string;
    description: string;
    account: string;
    projectType: string;
  }) => {
    setIsCreatingProject(true);
    try {
      createNewProject({
        variables: {
          data: {
            projectName: projectData.name,
            description: projectData.description,
            projectType: projectData.projectType,
            account: {
              connect: {
                id: projectData.account,
              },
            },
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
          managedAccounts={managedAccountsData?.managedAccounts || []}
        />
      </div>
    </div>
  );
};

export default memo(ProjectsPage);
