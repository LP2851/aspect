import {render, screen, act, fireEvent} from "@testing-library/react";
import { ToastProvider, useToast } from "./ToastProvider";

vi.useFakeTimers();

const TestComponent = ({ message }: { message: string }) => {
  const { showToast } = useToast();
  return <button onClick={() => showToast("success", message)}>Show Toast</button>;
};

describe("ToastProvider", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders children", () => {
    render(
      <ToastProvider>
        <div>Child Content</div>
      </ToastProvider>
    );
    expect(screen.getByText("Child Content")).toBeInTheDocument();
  });

  it("shows a toast when showToast is called", () => {
    render(
      <ToastProvider>
        <TestComponent message="Hello Toast" />
      </ToastProvider>
    );
    fireEvent.click(screen.getByText("Show Toast"));
    expect(screen.getByText("Hello Toast")).toBeInTheDocument();
  });

  it("auto-hides toast after default duration", () => {
    render(
      <ToastProvider>
        <TestComponent message="Auto Hide Toast" />
      </ToastProvider>
    );
    fireEvent.click(screen.getByText("Show Toast"));
    expect(screen.getByText("Auto Hide Toast")).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(5000);
    });

    expect(screen.queryByText("Auto Hide Toast")).toBeNull();
  });

  it("removes toast when close button is clicked", () => {
    render(
      <ToastProvider>
        <TestComponent message="Manual Close" />
      </ToastProvider>
    );
    fireEvent.click(screen.getByText("Show Toast"));

    const closeButton = screen.getByText("×");
    fireEvent.click(closeButton);

    expect(screen.queryByText("Manual Close")).toBeNull();
  });
});
