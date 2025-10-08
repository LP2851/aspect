import { type FC, type FormEvent, useEffect, useState } from "react";

import { useCreateUploadMutation } from "../../../generated/graphql.ts";
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
  task?: any[];
}

const CreateTaskModal: FC<CreateTaskModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  isLoading = false,
  projectId,
}) => {
  const { showToast } = useToast();
  const [scheduledFor, setScheduledFor] = useState<Date | null>();
  const [taskType, setTaskType] = useState<string | undefined>();
  const [uploadPlatform, setUploadPlatform] = useState<string | undefined>();
  const [errors, setErrors] = useState<{ scheduledFor?: string }>();

  const [createNewUploadTask] = useCreateUploadMutation();

  const validateForm = () => {
    const newErrors: { scheduledFor?: string } = {};

    if (!scheduledFor || scheduledFor < new Date()) {
      newErrors.scheduledFor = "Scheduled for must not be in the past";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    if (!isOpen) {
      setScheduledFor(null);
      setTaskType(undefined);
      setUploadPlatform(undefined);
      setErrors({});
    }
  }, [isOpen]);

  useEffect(() => {
    if (scheduledFor) {
      validateForm();
    }
  }, [scheduledFor, validateForm]);

  const onCreateNewUploadTask = async () => {
    try {
      const { data } = await createNewUploadTask({
        variables: {
          data: {
            project: {
              connect: {
                id: projectId,
              },
            },
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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    let result = false;

    if (taskType === "UPLOAD") {
      result = await onCreateNewUploadTask();
    }

    if (!result) {
      return;
    }

    setTimeout(() => {
      showToast("success", "Successfully created new task");
    }, 5000);

    onClose();
    onSubmit();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Task">
      <form onSubmit={handleSubmit} className="create-project-form">
        <div className="form-group">
          <DateTimeInput
            label="Scheduled For"
            error={errors?.scheduledFor}
            required={true}
            onChange={(e) => setScheduledFor(new Date(e.target.value))}
          />

          <Select
            id="task-type"
            required={true}
            label="Task Type"
            defaultOption="Select a task type"
            defaultValue={undefined}
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
              required={true}
              label="Upload Platform"
              defaultOption="Select an upload platform"
              defaultValue={undefined}
              options={[
                { label: "TikTok", value: "TIK_TOK" },
                { label: "YouTube", value: "YOUTUBE" },
                { label: "Instagram", value: "INSTAGRAM" },
                { label: "Facebook", value: "FACEBOOK" },
                { label: "X", value: "X" },
              ]}
              onChange={(e) => setUploadPlatform(e.target.value)}
            />
          )}
        </div>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Creating..." : "Create Project"}
        </Button>
      </form>
    </Modal>
  );
};

export default CreateTaskModal;
