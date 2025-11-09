import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import CheckboxList from "./CheckboxList";

describe("<CheckboxList />", () => {
  const checkboxes = [
    { id: "1", name: "cb1", value: "val1", label: "Checkbox 1", checked: false },
    { id: "2", name: "cb2", value: "val2", label: "Checkbox 2", checked: true },
  ];

  it("renders label and all checkboxes", () => {
    const onChange = vi.fn();
    render(<CheckboxList id="test-list" label="Test Label" checkboxes={checkboxes} onChange={onChange} />);

    expect(screen.getByText("Test Label")).toBeInTheDocument();
    expect(screen.getByText("Checkbox 1")).toBeInTheDocument();
    expect(screen.getByText("Checkbox 2")).toBeInTheDocument();
  });

  it("initializes checkboxes with correct checked states", () => {
    const onChange = vi.fn();
    render(<CheckboxList id="test-list" label="Test Label" checkboxes={checkboxes} onChange={onChange} />);
    const inputs = screen.getAllByRole("checkbox") as HTMLInputElement[];
    expect(inputs[0].checked).toBe(false);
    expect(inputs[1].checked).toBe(true);
  });

  it("calls onChange with updated checked values when a checkbox is toggled", () => {
    const onChange = vi.fn();
    render(<CheckboxList id="test-list" label="Test Label" checkboxes={checkboxes} onChange={onChange} />);
    const input1 = screen.getByLabelText("Checkbox 1") as HTMLInputElement;
    fireEvent.click(input1);
    expect(onChange).toHaveBeenCalledWith(["val1", "val2"]);
  });

  it("updates checked states when toggled", () => {
    const onChange = vi.fn();
    render(<CheckboxList id="test-list" label="Test Label" checkboxes={checkboxes} onChange={onChange} />);
    const input1 = screen.getByLabelText("Checkbox 1") as HTMLInputElement;
    fireEvent.click(input1);
    expect(input1.checked).toBe(true);
  });
});
