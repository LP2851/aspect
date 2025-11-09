import { render, screen, fireEvent } from "@testing-library/react";
import Checkbox, { type CheckboxProps } from "./Checkbox";

describe("<Checkbox />", () => {
  const defaultProps: CheckboxProps = {
    id: "check1",
    name: "test-checkbox",
    value: "value1",
    label: "Test Checkbox",
    checked: false,
    onChange: vi.fn(),
  };

  it("renders the label", () => {
    render(<Checkbox {...defaultProps} />);
    expect(screen.getByText("Test Checkbox")).toBeInTheDocument();
  });

  it("reflects the checked state", () => {
    render(<Checkbox {...defaultProps} checked={true} />);
    const input = screen.getByRole("checkbox") as HTMLInputElement;
    expect(input.checked).toBe(true);
  });

  it("calls onChange when clicked", () => {
    const onChange = vi.fn();
    render(<Checkbox {...defaultProps} onChange={onChange} />);
    const input = screen.getByRole("checkbox");
    fireEvent.click(input);
    expect(onChange).toHaveBeenCalled();
  });

  it("renders unchecked when checked is false", () => {
    render(<Checkbox {...defaultProps} checked={false} />);
    const input = screen.getByRole("checkbox") as HTMLInputElement;
    expect(input.checked).toBe(false);
  });
});
