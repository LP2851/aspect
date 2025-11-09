import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router";
import CreateProjectModal from "./CreateProjectModal";

describe("<CreateProjectModal />", () => {
  const onClose = vi.fn();
  const onSubmit = vi.fn();

  const managedAccounts = [
    { id: "acc1", name: "Account One" },
    { id: "acc2", name: "Account Two" },
  ];

  const renderModal = (props = {}) =>
    render(
      <BrowserRouter>
        <CreateProjectModal
          isOpen
          onClose={onClose}
          onSubmit={onSubmit}
          managedAccounts={managedAccounts}
          {...props}
        />
      </BrowserRouter>
    );

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("does not render when isOpen is false", () => {
    render(
      <BrowserRouter>
        <CreateProjectModal
          isOpen={false}
          onClose={onClose}
          onSubmit={onSubmit}
          managedAccounts={managedAccounts}
        />
      </BrowserRouter>
    );
    expect(screen.queryByText("Create New Project")).toBeNull();
  });

  it("renders modal with all fields", () => {
    renderModal();
    expect(screen.getByText("Create New Project")).toBeInTheDocument();
    expect(screen.getByLabelText(/Project Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Account/i)).toBeInTheDocument();
  });

  it("calls onSubmit with correct data when form is valid", () => {
    renderModal();

    fireEvent.change(screen.getByLabelText(/Project Name/i), { target: { value: "My Project" } });
    fireEvent.change(screen.getByLabelText(/Description/i), { target: { value: "Some description" } });
    fireEvent.change(screen.getByLabelText(/Account/i), { target: { value: "acc2" } });

    fireEvent.click(screen.getByText("Create Project"));

    expect(onSubmit).toHaveBeenCalledWith({
      name: "My Project",
      description: "Some description",
      account: "acc2",
    });
  });

  // it("resets form when modal is closed", () => {
  //   const { rerender } = renderModal();
  //
  //   fireEvent.change(screen.getByLabelText(/Project Name/i), { target: { value: "My Project" } });
  //   fireEvent.change(screen.getByLabelText(/Description/i), { target: { value: "Some description" } });
  //   fireEvent.change(screen.getByLabelText(/Account/i), { target: { value: "acc2" } });
  //
  //   fireEvent.click(screen.getByText("Cancel"));
  //   expect(onClose).toHaveBeenCalled();
  //
  //   rerender(
  //     <BrowserRouter>
  //       <CreateProjectModal
  //         isOpen
  //         onClose={onClose}
  //         onSubmit={onSubmit}
  //         managedAccounts={managedAccounts}
  //       />
  //     </BrowserRouter>
  //   );
  //
  //   expect((screen.getByLabelText(/Project Name/i) as HTMLInputElement).value).toBe("");
  //   expect((screen.getByLabelText(/Description/i) as HTMLTextAreaElement).value).toBe("");
  //
  //   expect((screen.getByLabelText(/Account/i) as HTMLSelectElement).value).toBe("");
  // });

  it("handles default account when only one managed account exists", () => {
    render(
      <BrowserRouter>
        <CreateProjectModal
          isOpen
          onClose={onClose}
          onSubmit={onSubmit}
          managedAccounts={[{ id: "acc1", name: "Account One" }]}
        />
      </BrowserRouter>
    );

    expect((screen.getByLabelText(/Account/i) as HTMLSelectElement).value).toBe("acc1");
  });
});
