import "./ProjectsTable.css";

import { memo } from "react";
import {
  FaFacebook,
  FaImage,
  FaInstagram,
  FaTiktok,
  FaVideo,
  FaYoutube,
} from "react-icons/fa";
import {
  FaEye,
  FaFileCircleCheck,
  FaFileCircleExclamation,
} from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { useNavigate } from "react-router";

import {
  ProjectType,
  type Upload,
  UploadPlatform,
} from "../../../../api/types/types.ts";
import Table from "../../../../components/table/Table.tsx";
import Tag from "../../../../components/tag/Tag.tsx";
import { getTagColorForStatus } from "../../../../utils/tags.ts";
import { BsCardText } from "react-icons/bs";
import { TbBoxMultipleFilled } from "react-icons/tb";

const iconStyle = { paddingRight: "8px", height: "24px" };

const getTypeTag = (type: string) => {
  switch (type) {
    case ProjectType.TEXT:
      return (
        <Tag
          label="TEXT"
          color="green"
          children={<BsCardText style={iconStyle} />}
        />
      );
    case ProjectType.IMAGE:
      return (
        <Tag
          label="IMAGE"
          color="yellow"
          children={<FaImage style={iconStyle} />}
        />
      );
    case ProjectType.VIDEO:
      return (
        <Tag
          label="VIDEO"
          color="blue"
          children={<FaVideo style={iconStyle} />}
        />
      );
    case ProjectType.MULTI_MEDIA:
      return (
        <Tag
          label="MULTI-MEDIA"
          color="purple"
          children={<TbBoxMultipleFilled style={iconStyle} />}
        />
      );
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

  const columns = [
    "Project name",
    "Description",
    "Account",
    "Project type",
    "Upload source",
    "Upload status",
    "Last updated at",
    "Actions",
  ];

  return (
    <Table headers={columns}>
      <tr>
        <td colSpan={columns.length}>
          <button onClick={onCreateNew} className="app-table-top-button">
            Create New Project
          </button>
        </td>
      </tr>
      {projects.map((project) => (
        <tr key={project.id}>
          <td>{project.projectName}</td>
          <td style={{ maxWidth: "calc(100% / 7)" }}>{project.description}</td>
          <td>{project.account.name}</td>
          <td>{getTypeTag(project.projectType)}</td>
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
