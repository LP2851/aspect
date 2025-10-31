import { render, screen, fireEvent } from "@testing-library/react";
import Modal from "./Modal";

describe("<Modal />", () => {
  it("does not render when isOpen is false", () => {
    render(<Modal isOpen={false} onClose={() => {}} title="Test Modal">Content</Modal>);
    expect(screen.queryByText("Test Modal")).toBeNull();
  });

  it("renders title and children when isOpen is true", () => {
    render(<Modal isOpen onClose={() => {}} title="Test Modal">Modal content</Modal>);
    expect(screen.getByText("Test Modal")).toBeInTheDocument();
    expect(screen.getByText("Modal content")).toBeInTheDocument();
  });

  it("calls onClose when close button is clicked", () => {
    const onClose = vi.fn();
    render(<Modal isOpen onClose={onClose} title="Test Modal">Content</Modal>);
    fireEvent.click(screen.getByText("×"));
    expect(onClose).toHaveBeenCalled();
  });

  it("calls onClose when clicking on backdrop", () => {
    const onClose = vi.fn();
    render(<Modal isOpen onClose={onClose} title="Test Modal">Content</Modal>);
    const backdrop = screen.getByText("Test Modal").closest(".modal-backdrop")!;
    fireEvent.click(backdrop);
    expect(onClose).toHaveBeenCalled();
  });

  it("does not call onClose when clicking inside modal content", () => {
    const onClose = vi.fn();
    render(<Modal isOpen onClose={onClose} title="Test Modal">Modal content</Modal>);
    const content = screen.getByText("Modal content").parentElement!;
    fireEvent.click(content);
    expect(onClose).not.toHaveBeenCalled();
  });
});
