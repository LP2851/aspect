import "./TaskItem.css";

import { memo } from "react";

import Button from "../../../../../components/button/Button.tsx";
import { Tag } from "../../../../../components/tag/Tag.tsx";
import {
  getPlatformAsText,
  getStatusAsText,
} from "../../../../../utils/localisation.ts";
import { getTagColorForStatus } from "../../../../../utils/tags.ts";

interface TaskItemProps {
  uploadTask: any;
  onConfigure: () => void;
  onCancel: (id: string) => void;
  onSave: () => void;
  onRetry: (id: string) => void;
}

const TaskItem = ({
  uploadTask: { id, uploadTo: platform, uploadStatus: status, scheduledFor },
  onConfigure,
  onCancel,
  onRetry,
}: TaskItemProps) => {
  const platformName = getPlatformAsText(platform);
  const statusText = getStatusAsText(status).toUpperCase();
  const isConfigurable = status === "PENDING_RELEASE" || status === "FAILED";

  return (
    <div className="task-item" id={id}>
      <div className="task-item-header">
        <span className="task-item-header-item" style={{ marginRight: "auto" }}>
          Upload to {platformName}
        </span>
        <span className="task-item-header-item">
          <Tag label={statusText} color={getTagColorForStatus(status)} />
        </span>
        <span className="task-item-header-item" style={{ marginLeft: "auto" }}>
          <Button disabled={!isConfigurable} onClick={onConfigure}>
            Configure
          </Button>
        </span>
      </div>
      <div className="task-item-body">
        <div className="task-item-body-item">
          <span className="task-item-body-item-label">Platform: </span>
          <span className="task-item-body-item-value">{platformName}</span>
          <br />
          <span className="task-item-body-item-label">Scheduled For: </span>
          <span className="task-item-body-item-value">
            {scheduledFor ? new Date(scheduledFor).toLocaleString() : ""}
          </span>
        </div>
        {status !== "COMPLETED" && (
          <div className="task-item-buttons">
            <Button
              variant="danger"
              onClick={() => onCancel(id)}
              disabled={!isConfigurable}
            >
              Cancel task
            </Button>
            {status === "FAILED" && (
              <Button variant="secondary" onClick={() => onRetry(id)}>
                Retry task
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(TaskItem);
