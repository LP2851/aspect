import "./CreateProjectModal.css";

import { type FC, useEffect, useState } from "react";

import Button from "../../button/Button.tsx";
import TextInput from "../../input/text/TextInput.tsx";
import TextAreaInput from "../../input/textarea/TextAreaInput.tsx";
import Modal from "../Modal.tsx";
import Select from "../../input/select/Select.tsx";
import {useSearchParams} from "react-router";

interface CreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (projectData: { name: string; description: string; account: string }) => void;
  isLoading?: boolean;
  managedAccounts: any[];
}

const CreateProjectModal: FC<CreateProjectModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  isLoading = false,
  managedAccounts
}) => {
  const [params] = useSearchParams();

  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [account, setAccount] = useState("");
  const [errors, setErrors] = useState<{ name?: string; description?: string }>(
    {},
  );

  // Clear form when modal is closed
  useEffect(() => {
    if (!isOpen) {
      setProjectName("");
      setDescription("");
      setAccount(
        (managedAccounts.length === 1
          ? managedAccounts[0].id
          : (params.get("managedAccounts") ?? ""))
        || ""
      );
      setErrors({});
    }
  }, [isOpen]);

  const validateForm = () => {
    const newErrors: { name?: string; description?: string; account?: string; } = {};

    if (!projectName.trim()) {
      newErrors.name = "Project name is required";
    }

    if (!description.trim()) {
      newErrors.description = "Description is required";
    }

    if (!account.trim()) {
      newErrors.account = "Target account must be selected";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    onSubmit({
      name: projectName.trim(),
      description: description.trim(),
      account: account.trim(),
    });
  };

  const handleClose = () => {
    setProjectName("");
    setDescription("");
    setAccount(
      managedAccounts.length === 1
        ? managedAccounts[0].id
        : (params.get("managedAccounts") ?? "")
      || ""
    );
    setErrors({});
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Project">
      <form onSubmit={handleSubmit} className="create-project-form">
        <div className="form-group">
          <TextInput
            label="Project Name"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            placeholder="Enter project name"
            error={errors.name}
            required
          />
        </div>

        <div className="form-group">
          <TextAreaInput
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter project description"
            rows={4}
            error={errors.description}
            required
          />
        </div>

        <div className="form-group">
          <Select
            label="Account"
            id="account"
            key="account"
            value={account}
            onChange={(e) => setAccount(e.target.value)}
            required={true}
            options={managedAccounts.map(acc => {
              return {
                value: acc.id,
                label: acc.name,
              };
            })}
          />
        </div>

        <div className="form-actions">
          <Button
            onClick={handleClose}
            variant="secondary"
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Creating..." : "Create Project"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateProjectModal;
