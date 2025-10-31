import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import CreateTaskModal from "./CreateTaskModal";

const showToast = vi.fn();

vi.mock("../../../providers/toast/ToastProvider.tsx", () => ({
  useToast: () => ({ showToast }),
}));

const mockCreateUploadMutation = vi.fn();
const mockUpdateUploadMutation = vi.fn();

vi.mock("../../../generated/graphql.ts", () => ({
  useCreateUploadMutation: () => [mockCreateUploadMutation],
  useUpdateUploadMutation: () => [mockUpdateUploadMutation],
  useGetUploadProjectQuery: () => ({
    data: {
      uploadProject: {
        id: "proj1",
        account: { id: "acc1" },
      },
    },
  }),
  useGetManagedAccountsQuery: () => ({
    data: {
      managedAccounts: [
        {
          id: "acc1",
          managedAccountLinks: [
            { tokenFor: "TIK_TOK" },
            { tokenFor: "YOUTUBE" },
          ],
        },
      ],
    },
  }),
}));

describe("<CreateTaskModal />", () => {
  const onClose = vi.fn();
  const onSubmit = vi.fn();

  const renderModal = (props = {}) =>
    render(
      <CreateTaskModal
        isOpen
        onClose={onClose}
        onSubmit={onSubmit}
        projectId="proj1"
        isCreate
        {...props}
      />
    );

  beforeEach(() => {
    vi.clearAllMocks();
    mockCreateUploadMutation.mockResolvedValue({
      data: { createUpload: { id: "upload1" } },
    });
    mockUpdateUploadMutation.mockResolvedValue({
      data: { updateUpload: { id: "upload1" } },
    });
  });

  it("renders modal with all form fields", () => {
    renderModal();

    expect(screen.getByText("Create New Task")).toBeInTheDocument();
    expect(screen.getByLabelText(/Scheduled For/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Task Type/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Upload Platform/i)).toBeInTheDocument();
    expect(screen.getByText("Create Task")).toBeInTheDocument();
  });

  it("shows validation error when scheduled date is in the past", async () => {
    renderModal();

    const pastDate = new Date(Date.now() - 60000).toISOString().slice(0, 16);
    fireEvent.change(screen.getByLabelText(/Scheduled For/i), {
      target: { value: pastDate },
    });
    fireEvent.change(screen.getByLabelText(/Upload Platform/i), {
      target: { value: "TIK_TOK" },
    });

    fireEvent.click(screen.getByText("Create Task"));

    await waitFor(() => {
      expect(
        screen.getByText("Scheduled for must not be in the past")
      ).toBeInTheDocument();
      expect(mockCreateUploadMutation).not.toHaveBeenCalled();
    });
  });

  it("calls create mutation, shows toast, and closes modal on success", async () => {
    renderModal();

    const futureDate = new Date(Date.now() + 60000).toISOString().slice(0, 16);
    fireEvent.change(screen.getByLabelText(/Scheduled For/i), {
      target: { value: futureDate },
    });
    fireEvent.change(screen.getByLabelText(/Upload Platform/i), {
      target: { value: "TIK_TOK" },
    });

    fireEvent.click(screen.getByText("Create Task"));

    await waitFor(() => {
      expect(mockCreateUploadMutation).toHaveBeenCalled();
      expect(showToast).toHaveBeenCalledWith(
        "success",
        "Task created successfully"
      );
      expect(onClose).toHaveBeenCalled();
      expect(onSubmit).toHaveBeenCalled();
    });
  });

  it("renders edit mode and updates correctly", async () => {
    const task = {
      id: "task1",
      uploadTo: "YOUTUBE",
      scheduledFor: new Date(Date.now() + 60000).toISOString(),
    };

    renderModal({ isCreate: false, task });

    expect(screen.getByText("Edit Task")).toBeInTheDocument();
    expect(
      (screen.getByLabelText(/Upload Platform/i) as HTMLSelectElement).value
    ).toBe("YOUTUBE");

    const newDate = new Date(Date.now() + 120000).toISOString().slice(0, 16);
    fireEvent.change(screen.getByLabelText(/Scheduled For/i), {
      target: { value: newDate },
    });

    fireEvent.click(screen.getByText("Save Changes"));

    await waitFor(() => {
      expect(mockUpdateUploadMutation).toHaveBeenCalled();
      expect(showToast).toHaveBeenCalledWith(
        "success",
        "Task updated successfully"
      );
      expect(onClose).toHaveBeenCalled();
      expect(onSubmit).toHaveBeenCalled();
    });
  });
});
