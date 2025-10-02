import "./ProjectsTable.css";

import { memo } from "react";
import { FaFacebook, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";
import {
  FaEye,
  FaFileCircleCheck,
  FaFileCircleExclamation,
} from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { useNavigate } from "react-router";

import {
  type Upload,
  UploadPlatform,
  UploadStatus,
} from "../../../../api/types/types.ts";
import Table from "../../../../components/table/Table.tsx";
import { Tag } from "../../../../components/tag/Tag.tsx";

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
            key={`tt-${uploadTo.id}`}
            label="TIK TOK"
            color={getTagColorForStatus(uploadTo.uploadStatus)}
            children={<FaTiktok style={iconStyle} />}
          />
        );
      case UploadPlatform.YOUTUBE:
        return (
          <Tag
            key={`yt-${uploadTo.id}`}
            label="YOUTUBE"
            color={getTagColorForStatus(uploadTo.uploadStatus)}
            children={<FaYoutube style={iconStyle} />}
          />
        );
      case UploadPlatform.X:
        return (
          <Tag
            key={`x-${uploadTo.id}`}
            label="X"
            color={getTagColorForStatus(uploadTo.uploadStatus)}
            children={<FaXTwitter style={iconStyle} />}
          />
        );
      case UploadPlatform.INSTAGRAM:
        return (
          <Tag
            key={`ig-${uploadTo.id}`}
            label="INSTAGRAM"
            color={getTagColorForStatus(uploadTo.uploadStatus)}
            children={<FaInstagram style={iconStyle} />}
          />
        );
      case UploadPlatform.FACEBOOK:
        return (
          <Tag
            key={`fb-${uploadTo.id}`}
            label="FACEBOOK"
            color={getTagColorForStatus(uploadTo.uploadStatus)}
            children={<FaFacebook style={iconStyle} />}
          />
        );
    }
  });
};

interface ProjectsTableProps {
  projects: any[];
  onCreateNew: () => void;
}

const ProjectsTable = ({ projects, onCreateNew }: ProjectsTableProps) => {
  const navigate = useNavigate();

  return (
    <Table
      headers={[
        "Project name",
        "Description",
        "Upload source",
        "Upload status",
        "Last updated at",
        "Actions",
      ]}
    >
      <tr>
        <td colSpan={6}>
          <button onClick={onCreateNew} className="app-table-top-button">
            Create New Project
          </button>
        </td>
      </tr>
      {projects.map((project) => (
        <tr key={project.id}>
          <td>{project.projectName}</td>
          <td>{project.description}</td>
          <td>
            {project.uploadLocation?.type ? (
              <Tag
                label={project.uploadLocation.type}
                children={<FaFileCircleCheck style={iconStyle} />}
              />
            ) : (
              <Tag
                label="UNSPECIFIED"
                children={<FaFileCircleExclamation style={iconStyle} />}
              />
            )}
          </td>
          <td>{getUploadToIcons((project.uploadsTo as Upload[]) ?? [])}</td>
          <td>{new Date(project.updatedAt).toLocaleString()}</td>
          <td>
            <div className="table-actions">
              <FaEye
                className="icon"
                onClick={() => navigate(`/projects/${project.id}`)}
              />
            </div>
          </td>
        </tr>
      ))}
    </Table>
  );
};

export default memo(ProjectsTable);
