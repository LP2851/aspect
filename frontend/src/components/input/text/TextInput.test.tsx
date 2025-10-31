import { render, screen, fireEvent } from "@testing-library/react";
import TextInput from "./TextInput";

describe("<TextInput />", () => {
  it("renders label and input", () => {
    render(<TextInput label="Name" placeholder="Enter name" />);
    expect(screen.getByText("Name")).toBeInTheDocument();
    const input = screen.getByPlaceholderText("Enter name") as HTMLInputElement;
    expect(input).toBeInTheDocument();
  });

  it("renders with provided value", () => {
    render(<TextInput label="Name" placeholder="Enter name" value="John" />);
    const input = screen.getByPlaceholderText("Enter name") as HTMLInputElement;
    expect(input.value).toBe("John");
  });

  it("calls onChange when input changes", () => {
    const onChange = vi.fn();
    render(<TextInput label="Name" placeholder="Enter name" onChange={onChange} />);
    const input = screen.getByPlaceholderText("Enter name") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "Jane" } });
    expect(onChange).toHaveBeenCalled();
  });

  it("applies disabled attribute", () => {
    render(<TextInput label="Name" placeholder="Enter name" disabled />);
    const input = screen.getByPlaceholderText("Enter name") as HTMLInputElement;
    expect(input.disabled).toBe(true);
  });

  it("applies error class and shows error message", () => {
    render(<TextInput label="Name" placeholder="Enter name" error="Required" />);
    const input = screen.getByPlaceholderText("Enter name") as HTMLInputElement;
    expect(input).toHaveClass("error");
    expect(screen.getByText("Required")).toBeInTheDocument();
  });

  it("sets required attribute when passed", () => {
    render(<TextInput label="Name" placeholder="Enter name" required />);
    const input = screen.getByPlaceholderText("Enter name") as HTMLInputElement;
    expect(input.required).toBe(true);
  });

  it("sets autocomplete correctly", () => {
    render(<TextInput label="Name" placeholder="Enter name" autocomplete />);
    const input = screen.getByPlaceholderText("Enter name") as HTMLInputElement;
    expect(input.autocomplete).toBe("on");
  });

  it("uses specified input type", () => {
    render(<TextInput label="Password" placeholder="Enter password" inputType="password" />);
    const input = screen.getByPlaceholderText("Enter password") as HTMLInputElement;
    expect(input.type).toBe("password");
  });
});
