import { memo, useEffect, useState } from "react";

import Button from "../../../../components/button/Button.tsx";
import Card from "../../../../components/card/Card.tsx";
import CreateTaskModal from "../../../../components/modal/create-task-modal/CreateTaskModal.tsx";
import Table from "../../../../components/table/Table.tsx";
import { Tag } from "../../../../components/tag/Tag.tsx";
import {
  useDeleteUploadMutation,
  useUpdateUploadMutation,
} from "../../../../generated/graphql.ts";
import { useToast } from "../../../../providers/toast/ToastProvider.tsx";
import {
  getPlatformAsText,
  getStatusAsText,
} from "../../../../utils/localisation.ts";
import { getTagColorForStatus } from "../../../../utils/tags.ts";
import TaskItem from "./task-item/TaskItem.tsx";

interface UploadToDetailsProps {
  project: any;
  onSave: () => void;
  refresh: () => void;
}

const UploadToDetails = ({
  project,
  onSave,
  refresh,
}: UploadToDetailsProps) => {
  const { showToast } = useToast();
  const [tasks, setTasks] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreatingTask, setIsCreatingTask] = useState(false);
  const [selectedTask, setSelectedTask] = useState<any | null>(null);

  const [deleteUploadTask] = useDeleteUploadMutation();
  const [updateUploadTask] = useUpdateUploadMutation();

  useEffect(() => {
    setTasks(project.uploadsTo || []);
  }, [project]);

  const onRemoveTask = async (taskId: string) => {
    try {
      await deleteUploadTask({
        variables: {
          where: { id: taskId },
        },
      });

      showToast("success", "Upload task deleted successfully!");
      refresh();
    } catch (err: any) {
      showToast("error", "Failed to delete upload task: " + err.message);
    }
  };

  const onRetryTask = async (taskId: string) => {
    try {
      await updateUploadTask({
        variables: {
          where: { id: taskId },
          data: {
            uploadStatus: "QUEUED",
          },
        },
      });
      showToast("success", "Retrying upload task!");
      refresh();
    } catch (err: any) {
      showToast("error", "Failed to retry upload task: " + err.message);
    }
  };

  return (
    <Card className="scroll-container card-height-setting">
      <h2>Upload Tasks</h2>
      <p className="description">
        Settings for distribution of project across platforms
      </p>

      <h2 className="new-section">Overview</h2>
      <p className="description">
        Information about selected tasks and basic details
      </p>

      {tasks?.length > 0 && (
        <Table
          style={{ fontSize: "small" }}
          headers={["Upload Platform", "Upload Status"]}
        >
          {project.uploadsTo &&
            project.uploadsTo.map((task: any) => (
              <tr
                key={task.id}
                onClick={() => {
                  const el = document.getElementById(task.id);
                  if (el) {
                    el.scrollIntoView({ behavior: "smooth", block: "start" });
                    el.classList.add("highlighted");
                    setTimeout(() => el.classList.remove("highlighted"), 5000);
                  }
                }}
              >
                <td>{getPlatformAsText(task.uploadTo)}</td>
                <td>
                  <Tag
                    label={getStatusAsText(task.uploadStatus).toUpperCase()}
                    color={getTagColorForStatus(task.uploadStatus)}
                  />
                </td>
              </tr>
            ))}
        </Table>
      )}

      {tasks?.length === 0 && (
        <span>You have not set any upload tasks for this project.</span>
      )}

      <h2 className="new-section">Configured Tasks</h2>
      <p className="description">List of tasks for this upload project</p>
      <Button
        style={{ marginTop: "1rem", width: "100%" }}
        onClick={() => {
          setIsModalOpen(true);
          setIsCreatingTask(true);
          setSelectedTask(null);
        }}
      >
        Create new upload task
      </Button>

      {tasks.length > 0 &&
        tasks.map((task: any) => (
          <TaskItem
            uploadTask={task}
            onConfigure={() => {
              setSelectedTask(task);
              setIsCreatingTask(false);
              setIsModalOpen(true);
            }}
            onCancel={onRemoveTask}
            onSave={() => {}}
            onRetry={onRetryTask}
          />
        ))}

      <CreateTaskModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setIsCreatingTask(false);
          setSelectedTask(null);
        }}
        isCreate={isCreatingTask}
        onSubmit={onSave}
        projectId={project.id}
        task={selectedTask}
      />
    </Card>
  );
};

export default memo(UploadToDetails);
