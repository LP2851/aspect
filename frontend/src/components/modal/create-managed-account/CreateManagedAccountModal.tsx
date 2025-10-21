import {type FormEvent, memo, useEffect, useState} from "react";
import Modal from "../Modal.tsx";
import "./CreateManagedAccountModal.css";
import TextInput from "../../input/text/TextInput.tsx";
import TextAreaInput from "../../input/textarea/TextAreaInput.tsx";
import Button from "../../button/Button.tsx";

interface ManagedAccountData {
  id: string;
  name: string;
  description: string;
}

interface CreateManagedAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  isCreate: boolean;
  isLoading?: boolean;
  onSubmit: (data: ManagedAccountData) => void;
  managedAccount?: ManagedAccountData;
}

const CreateManagedAccountModal = ({
  isOpen,
  onClose,
  onSubmit,
  isCreate,
  isLoading = false,
  managedAccount,
}: CreateManagedAccountModalProps) => {
  const [name, setName] = useState(managedAccount?.name ?? "");
  const [description, setDescription] = useState(managedAccount?.description ?? "");
  const [errors, setErrors] = useState<{ name?: string; description?: string }>({});

  useEffect(() => {
    if (managedAccount) {
      setName(managedAccount.name);
      setDescription(managedAccount.description);
    }
  }, [managedAccount]);

  useEffect(() => {
    if (!isOpen) {
      setName("");
      setDescription("");
      setErrors({});
    }
  }, [isOpen]);

  const handleClose = () => {
    setName("");
    setDescription("");
    setErrors({});
    onClose();
  }

  const validateForm = () => {
    const newErrors: { name?: string; description?: string } = {};

    if (!name.trim()) {
      newErrors.name = "Account name is required";
    }

    if (!description.trim()) {
      newErrors.description = "Description is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    onSubmit({
      id: managedAccount?.id ?? "",
      name: name.trim(),
      description: description.trim(),
    });
  }

  return (
    <Modal isOpen={isOpen}
           onClose={onClose}
           title={isCreate ? "Create New Managed Account" : "Edit Managed Account"}>
      <form className="create-managed-account-modal-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <TextInput
            label="Account Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter managed account name"
            error={errors.name}
            required
          />
        </div>

        <div className="form-group">
          <TextAreaInput
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description for managed account"
            rows={4}
            error={errors.description}
            required
          />
        </div>

        {isCreate && (
          <div className="form-group">
            <p className="note">
              You will be able to link multiple platform accounts to this managed account once created.
            </p>
          </div>
        )}

        <div className="form-actions">
          <Button
            onClick={handleClose}
            variant="secondary"
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            { isCreate ? "Create Managed Account" : "Save Changes"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export default memo(CreateManagedAccountModal);
