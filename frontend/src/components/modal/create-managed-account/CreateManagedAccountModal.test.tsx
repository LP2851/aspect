import { render, screen, fireEvent } from "@testing-library/react";
import CreateManagedAccountModal from "./CreateManagedAccountModal";

describe("<CreateManagedAccountModal />", () => {
  const onClose = vi.fn();
  const onSubmit = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("does not render when isOpen is false", () => {
    render(
      <CreateManagedAccountModal
        isOpen={false}
        onClose={onClose}
        onSubmit={onSubmit}
        isCreate
      />
    );
    expect(screen.queryByText("Create New Managed Account")).toBeNull();
  });

  it("renders modal with title when isOpen is true", () => {
    render(
      <CreateManagedAccountModal
        isOpen
        onClose={onClose}
        onSubmit={onSubmit}
        isCreate
      />
    );
    expect(screen.getByText("Create New Managed Account")).toBeInTheDocument();

    const nameInput = screen.getByLabelText(/Account Name/i, { exact: false }) as HTMLInputElement;
    expect(nameInput).toBeInTheDocument();

    const descriptionInput = screen.getByLabelText(/Description/i, { exact: false }) as HTMLTextAreaElement;
    expect(descriptionInput).toBeInTheDocument();
  });
  
  it("calls onSubmit with correct data when form is valid", () => {
    render(
      <CreateManagedAccountModal
        isOpen
        onClose={onClose}
        onSubmit={onSubmit}
        isCreate
      />
    );

    const nameInput = screen.getByLabelText(/Account Name/i, { exact: false }) as HTMLInputElement;
    const descriptionInput = screen.getByLabelText(/Description/i, { exact: false }) as HTMLTextAreaElement;

    fireEvent.change(nameInput, { target: { value: "My Account" } });
    fireEvent.change(descriptionInput, { target: { value: "Some description" } });
    fireEvent.click(screen.getByText("Create Managed Account"));

    expect(onSubmit).toHaveBeenCalledWith({
      id: "",
      name: "My Account",
      description: "Some description",
    });
  });

  it("resets form when modal is closed", () => {
    const { rerender } = render(
      <CreateManagedAccountModal
        isOpen
        onClose={onClose}
        onSubmit={onSubmit}
        isCreate
      />
    );

    const nameInput = screen.getByLabelText(/Account Name/i, { exact: false }) as HTMLInputElement;
    fireEvent.change(nameInput, { target: { value: "My Account" } });

    fireEvent.click(screen.getByText("Cancel"));
    expect(onClose).toHaveBeenCalled();

    rerender(
      <CreateManagedAccountModal
        isOpen={false}
        onClose={onClose}
        onSubmit={onSubmit}
        isCreate
      />
    );

    rerender(
      <CreateManagedAccountModal
        isOpen
        onClose={onClose}
        onSubmit={onSubmit}
        isCreate
      />
    );

    const resetNameInput = screen.getByLabelText(/Account Name/i, { exact: false }) as HTMLInputElement;
    expect(resetNameInput.value).toBe("");
  });

  it("renders edit mode with provided managedAccount", () => {
    const account = { id: "1", name: "Test", description: "Desc" };
    render(
      <CreateManagedAccountModal
        isOpen
        onClose={onClose}
        onSubmit={onSubmit}
        isCreate={false}
        managedAccount={account}
      />
    );

    expect(screen.getByText("Edit Managed Account")).toBeInTheDocument();

    const nameInput = screen.getByLabelText(/Account Name/i, { exact: false }) as HTMLInputElement;
    expect(nameInput.value).toBe("Test");

    const descriptionInput = screen.getByLabelText(/Description/i, { exact: false }) as HTMLTextAreaElement;
    expect(descriptionInput.value).toBe("Desc");
  });
});
