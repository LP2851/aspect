import { render, screen, fireEvent } from "@testing-library/react";
import DateTimeInput from "./DateTimeInput";

describe("<DateTimeInput />", () => {
  it("renders label and input", () => {
    render(<DateTimeInput label="Date Time" />);
    expect(screen.getByText("Date Time")).toBeInTheDocument();
    const input = screen.getByLabelText("Date Time") as HTMLInputElement;
    expect(input).toBeInTheDocument();
  });

  it("renders with provided value", () => {
    render(<DateTimeInput label="DT" value="2025-10-24T12:00" />);
    const input = screen.getByLabelText("DT") as HTMLInputElement;
    expect(input.value).toBe("2025-10-24T12:00");
  });

  it("calls onChange when input value changes", () => {
    const onChange = vi.fn();
    render(<DateTimeInput label="DT" onChange={onChange} />);
    const input = screen.getByLabelText("DT") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "2025-10-25T08:30" } });
    expect(onChange).toHaveBeenCalled();
  });

  it("applies disabled attribute", () => {
    render(<DateTimeInput label="DT" disabled />);
    const input = screen.getByLabelText("DT") as HTMLInputElement;
    expect(input.disabled).toBe(true);
  });

  it("applies error class and shows error message", () => {
    render(<DateTimeInput label="DT" error="Invalid date" />);
    const input = screen.getByLabelText("DT") as HTMLInputElement;
    expect(input).toHaveClass("error");
    expect(screen.getByText("Invalid date")).toBeInTheDocument();
  });

  it("sets required attribute when passed", () => {
    render(<DateTimeInput label="DT" required />);
    const input = document.querySelector('input[type="datetime-local"]') as HTMLInputElement;
    expect(input.required).toBe(true);
  });

  it("sets autocomplete correctly", () => {
    render(<DateTimeInput label="DT" autocomplete />);
    const input = screen.getByLabelText("DT") as HTMLInputElement;
    expect(input.autocomplete).toBe("on");
  });
});
