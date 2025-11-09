import { type FC, type FormEvent, useEffect, useState } from "react";

import {
  useCreateUploadMutation,
  useGetManagedAccountsQuery,
  useGetUploadProjectQuery,
  useUpdateUploadMutation,
} from "../../../generated/graphql.ts";
import { useToast } from "../../../providers/toast/ToastProvider.tsx";
import Button from "../../button/Button.tsx";
import DateTimeInput from "../../input/datetime/DateTimeInput.tsx";
import Select from "../../input/select/Select.tsx";
import Modal from "../Modal.tsx";

interface CreateTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  isLoading?: boolean;
  projectId: string;
  isCreate: boolean;
  task?: {
    id: string;
    uploadTo?: string | null;
    scheduledFor?: string | null;
  } | null;
}

const PLATFORMS = [
  { label: "TikTok", value: "TIK_TOK" },
  { label: "YouTube", value: "YOUTUBE" },
  { label: "Instagram", value: "INSTAGRAM" },
  { label: "Facebook", value: "FACEBOOK" },
  { label: "X", value: "X" },
];

const CreateTaskModal: FC<CreateTaskModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  isLoading = false,
  projectId,
  isCreate,
  task,
}) => {
  const { showToast } = useToast();
  const [scheduledFor, setScheduledFor] = useState<Date | null>(null);
  const [taskType, setTaskType] = useState<string | undefined>("UPLOAD");
  const [uploadPlatform, setUploadPlatform] = useState<string | undefined>();
  const [errors, setErrors] = useState<{ scheduledFor?: string }>({});

  const { data: project } = useGetUploadProjectQuery({
    variables: {
      where: { id: projectId },
    },
  });

  const managedAccountId = project?.uploadProject?.account?.id ?? "";

  const { data } = useGetManagedAccountsQuery({
    variables: {
      where: { id: { equals: managedAccountId } },
      skip: 0,
      take: 100,
    },
  });

  const platforms = PLATFORMS.filter((p) =>
    data?.managedAccounts?.some(
      (ma) =>
        ma.id === managedAccountId &&
        ma.managedAccountLinks?.some((l) => l.tokenFor === p.value),
    ),
  ).filter(
    (p) => project?.uploadProject?.projectType !== "TEXT" || p.value === "X",
  );

  const [createNewUploadTask] = useCreateUploadMutation();
  const [updateUploadTask] = useUpdateUploadMutation();

  useEffect(() => {
    if (!isOpen) {
      setScheduledFor(null);
      setTaskType("UPLOAD");
      setUploadPlatform(undefined);
      setErrors({});
      return;
    }

    if (!isCreate && task) {
      setScheduledFor(task.scheduledFor ? new Date(task.scheduledFor) : null);
      setUploadPlatform(task.uploadTo ?? undefined);
      setTaskType("UPLOAD");
    }
  }, [isOpen, isCreate, task]);

  const validateForm = () => {
    const newErrors: { scheduledFor?: string } = {};

    if (!scheduledFor || scheduledFor < new Date()) {
      newErrors.scheduledFor = "Scheduled for must not be in the past";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onCreateNewUploadTask = async () => {
    try {
      const { data } = await createNewUploadTask({
        variables: {
          data: {
            project: { connect: { id: projectId } },
            uploadTo: uploadPlatform,
            uploadStatus: "PENDING_RELEASE",
            scheduledFor: scheduledFor?.toISOString(),
          },
        },
      });
      return !!data?.createUpload?.id;
    } catch (err: any) {
      showToast("error", "Failed to create upload task: " + err.message);
      return false;
    }
  };

  const onUpdateUploadTask = async () => {
    if (!task?.id) return false;

    try {
      const { data } = await updateUploadTask({
        variables: {
          where: { id: task.id },
          data: {
            uploadTo: uploadPlatform,
            scheduledFor: scheduledFor?.toISOString(),
          },
        },
      });
      return !!data?.updateUpload?.id;
    } catch (err: any) {
      showToast("error", "Failed to update task: " + err.message);
      return false;
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const result = isCreate
      ? await onCreateNewUploadTask()
      : await onUpdateUploadTask();

    if (!result) return;

    showToast(
      "success",
      isCreate ? "Task created successfully" : "Task updated successfully",
    );
    onClose();
    onSubmit();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isCreate ? "Create New Task" : "Edit Task"}
    >
      <form onSubmit={handleSubmit} className="create-project-form">
        <div className="form-group">
          <DateTimeInput
            label="Scheduled For"
            error={errors?.scheduledFor}
            required
            value={scheduledFor ? scheduledFor.toISOString().slice(0, 16) : ""}
            onChange={(e) => setScheduledFor(new Date(e.target.value))}
          />

          <Select
            id="task-type"
            required
            label="Task Type"
            defaultOption="Select a task type"
            value={taskType}
            options={[{ label: "Upload", value: "UPLOAD" }]}
            onChange={(e) => {
              const val = e.target.value;
              setTaskType(val);
              if (val !== "UPLOAD") setUploadPlatform(undefined);
            }}
          />

          {taskType === "UPLOAD" && (
            <Select
              id="upload-platform"
              required
              label="Upload Platform"
              description="If a platform is not available, connect it to your account via the profile page."
              defaultOption="Select an upload platform"
              value={uploadPlatform}
              options={platforms}
              onChange={(e) => setUploadPlatform(e.target.value)}
            />
          )}
        </div>

        <Button type="submit" disabled={isLoading}>
          {isLoading
            ? isCreate
              ? "Creating..."
              : "Updating..."
            : isCreate
              ? "Create Task"
              : "Save Changes"}
        </Button>
      </form>
    </Modal>
  );
};

export default CreateTaskModal;
