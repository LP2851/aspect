import { render, screen, fireEvent } from "@testing-library/react";
import TextAreaInput from "./TextAreaInput";

describe("<TextAreaInput />", () => {
  it("renders label and textarea", () => {
    render(<TextAreaInput label="Description" value="" onChange={() => {}} />);
    expect(screen.getByText("Description")).toBeInTheDocument();
    const textarea = screen.getByRole("textbox") as HTMLTextAreaElement;
    expect(textarea).toBeInTheDocument();
  });

  it("renders with provided value", () => {
    render(
      <TextAreaInput label="Description" value="Initial text" onChange={() => {}} />
    );
    const textarea = screen.getByRole("textbox") as HTMLTextAreaElement;
    expect(textarea.value).toBe("Initial text");
  });

  it("calls onChange when textarea value changes", () => {
    const onChange = vi.fn();
    render(<TextAreaInput label="Description" value="" onChange={onChange} />);
    const textarea = screen.getByRole("textbox") as HTMLTextAreaElement;
    fireEvent.change(textarea, { target: { value: "New text" } });
    expect(onChange).toHaveBeenCalled();
  });

  it("applies disabled attribute", () => {
    render(<TextAreaInput label="Description" value="" onChange={() => {}} disabled />);
    const textarea = screen.getByRole("textbox") as HTMLTextAreaElement;
    expect(textarea.disabled).toBe(true);
  });

  it("applies error class and shows error message", () => {
    render(
      <TextAreaInput label="Description" value="" onChange={() => {}} error="Required" />
    );
    const textarea = screen.getByRole("textbox") as HTMLTextAreaElement;
    expect(textarea).toHaveClass("error");
    expect(screen.getByText("Required")).toBeInTheDocument();
  });

  it("sets required attribute when passed", () => {
    render(
      <TextAreaInput label="Description" value="" onChange={() => {}} required />
    );
    const textarea = screen.getByRole("textbox") as HTMLTextAreaElement;
    expect(textarea.required).toBe(true);
  });

  it("renders the correct number of rows", () => {
    render(
      <TextAreaInput label="Description" value="" onChange={() => {}} rows={6} />
    );
    const textarea = screen.getByRole("textbox") as HTMLTextAreaElement;
    expect(textarea.rows).toBe(6);
  });
});
