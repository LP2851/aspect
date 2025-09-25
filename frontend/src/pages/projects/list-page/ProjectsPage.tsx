import { memo, useState } from "react";
import {
  type Upload,
  UploadStatus,
  UploadPlatform,
} from "../../../api/types/types.ts";
import { Tag } from "../../../components/tag/Tag.tsx";
import "./ProjectsPage.css";
import { FaFacebook, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";
import {
  FaFileCircleCheck,
  FaFileCircleExclamation,
  FaXTwitter,
} from "react-icons/fa6";
import {
  useGetUploadProjectsQuery,
  YouTubeAuthUrlDocument,
  type YouTubeAuthUrlQueryResult,
} from "../../../generated/graphql.tsx";
import { useApolloClient } from "@apollo/client/react";
import PaginationControls from "../../../components/pagination-controls/PaginationControls.tsx";

const iconStyle = { paddingRight: "8px", height: "24px" };

const getTagColorForStatus = (status: UploadStatus) => {
  switch (status) {
    case UploadStatus.PENDING_RELEASE:
      return "gray";
    case UploadStatus.QUEUED:
      return "blue";
    case UploadStatus.UPLOADING:
      return "purple";
    case UploadStatus.COMPLETED:
      return "green";
    case UploadStatus.FAILED:
      return "red";
  }
};

const getUploadToIcons = (uploads: Upload[]) => {
  return uploads.map((uploadTo) => {
    switch (uploadTo.uploadTo) {
      case UploadPlatform.TIK_TOK:
        return (
          <Tag
            label="TIK TOK"
            color={getTagColorForStatus(uploadTo.uploadStatus)}
            children={<FaTiktok style={iconStyle} />}
          />
        );
      case UploadPlatform.YOUTUBE:
        return (
          <Tag
            label="YOUTUBE"
            color={getTagColorForStatus(uploadTo.uploadStatus)}
            children={<FaYoutube style={iconStyle} />}
          />
        );
      case UploadPlatform.X:
        return (
          <Tag
            label="X"
            color={getTagColorForStatus(uploadTo.uploadStatus)}
            children={<FaXTwitter style={iconStyle} />}
          />
        );
      case UploadPlatform.INSTAGRAM:
        return (
          <Tag
            label="INSTAGRAM"
            color={getTagColorForStatus(uploadTo.uploadStatus)}
            children={<FaInstagram style={iconStyle} />}
          />
        );
      case UploadPlatform.FACEBOOK:
        return (
          <Tag
            label="FACEBOOK"
            color={getTagColorForStatus(uploadTo.uploadStatus)}
            children={<FaFacebook style={iconStyle} />}
          />
        );
    }
  });
};

const ITEMS_PER_PAGE = 10;

const ProjectsPage = () => {
  const client = useApolloClient();
  const [currentPage, setCurrentPage] = useState(1);

  const { data, loading, error } = useGetUploadProjectsQuery({
    pollInterval: 10000, // Poll every 10 seconds
    variables: {
      where: {},
      skip: (currentPage - 1) * ITEMS_PER_PAGE,
      take: ITEMS_PER_PAGE,
    },
  });

  // const [filters, setFilters] = useState({ projectName: "", status: "" });

  // Helper to handle input and dropdown changes
  // const handleFilterChange = (e) => {
  //   const { name, value } = e.target;
  //   setFilters((prev) => ({ ...prev, [name]: value }));
  // };

  // const { data, loading, error } = useGetUploadProjectsQuery({
  //   variables: {
  //     projectName: filters.projectName,
  //     status: filters.status,
  //     skip: (currentPage - 1) * itemsPerPage,
  //     take: itemsPerPage,
  //   },
  //   pollInterval: 10000, // Poll every 10 seconds
  // });

  const handlePageChange = (direction: number) => {
    setCurrentPage((prev) => Math.max(1, prev + direction));
  };

  const onAttemptYouTubeLogin = async () => {
    const { data } = (await client.query({
      query: YouTubeAuthUrlDocument,
    })) as YouTubeAuthUrlQueryResult;
    console.log(data);
    window.location.href = data?.youtubeAuthUrl || ""; // if you want redirect
  };
  if (loading && data?.uploadProjects?.length === 0) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="projects-page-container">
      <h1>Projects</h1>

      <button onClick={onAttemptYouTubeLogin}>Login with YouTube</button>

      <table className="projects-table">
        <thead>
          <tr>
            <th>Project name</th>
            <th>Description</th>
            <th>Upload source</th>
            <th>Upload status</th>
            <th>Last updated at</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={6}>
              <button
                onClick={() => console.log("Start creating a new project")}
                className=""
                style={{
                  width: "100%",
                  padding: "12px",
                  fontSize: "24px",
                  fontFamily: "inherit",
                  backgroundColor: "transparent",
                  border: "dashed",
                  cursor: "pointer",
                  color: "white",
                }}
              >
                Create New Project
              </button>
            </td>
          </tr>
          {data?.uploadProjects &&
            data.uploadProjects.map((project) => (
              <tr key={project.id}>
                <td>{project.projectName}</td>
                <td>{project.description}</td>
                <td>
                  {!!project.uploadLocation?.type && (
                    <Tag
                      label={project.uploadLocation.type}
                      children={<FaFileCircleCheck style={iconStyle} />}
                    />
                  )}
                  {!project.uploadLocation?.type && (
                    <Tag
                      label="UNSPECIFIED"
                      children={<FaFileCircleExclamation style={iconStyle} />}
                    />
                  )}
                </td>
                <td>
                  {getUploadToIcons((project.uploadsTo as Upload[]) ?? [])}
                  {/*<span className={`status ${project.status}`}>*/}
                  {/*  {project.status}*/}
                  {/*</span>*/}
                </td>
                <td>{new Date(project.updatedAt).toLocaleString()}</td>
                <td>
                  <button>Here</button>
                  {/*<button*/}
                  {/*  className="button secondary"*/}
                  {/*  onClick={() => navigate(`/projects/${project.id}`)}*/}
                  {/*>*/}
                  {/*  Edit*/}
                  {/*</button>*/}
                  {/*<button className="button danger">Delete</button>*/}
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      <PaginationControls
        onClickNext={handlePageChange}
        onClickPrev={handlePageChange}
        currentPage={currentPage}
        itemsPerPage={ITEMS_PER_PAGE}
        totalItems={data?.uploadProjects?.length ?? 0}
      />
    </div>
  );
};

export default memo(ProjectsPage);
