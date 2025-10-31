import { render, screen, fireEvent, act } from "@testing-library/react";
import Toast from "./Toast";

vi.useFakeTimers();

describe("Toast", () => {
  const onClose = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders message and type correctly", () => {
    render(<Toast type="success" message="Operation successful" onClose={onClose} />);
    const toast = screen.getByText("Operation successful");
    expect(toast).toBeInTheDocument();
    expect(toast.closest(".toast")).toHaveClass("success");
  });

  it("calls onClose when close button is clicked", () => {
    render(<Toast type="error" message="Something went wrong" onClose={onClose} />);
    fireEvent.click(screen.getByRole("button"));
    expect(onClose).toHaveBeenCalled();
  });

  it("auto-hides after the specified duration", () => {
    render(<Toast type="success" message="Auto hide" onClose={onClose} autoHideDuration={3000} />);
    act(() => {
      vi.advanceTimersByTime(3000);
    });
    expect(onClose).toHaveBeenCalled();
  });

  it("does not auto-hide when autoHideDuration is 0", () => {
    render(<Toast type="success" message="Persistent" onClose={onClose} autoHideDuration={0} />);
    act(() => {
      vi.advanceTimersByTime(10000);
    });
    expect(onClose).not.toHaveBeenCalled();
  });
});
