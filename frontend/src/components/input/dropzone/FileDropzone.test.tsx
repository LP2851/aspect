import { render, screen, fireEvent } from "@testing-library/react";
import FileDropzone from "./FileDropzone";

describe("<FileDropzone />", () => {
  it("renders the label", () => {
    render(<FileDropzone label="Upload File" onDrop={() => {}} />);
    expect(screen.getByText("Upload File")).toBeInTheDocument();
  });

  it("applies disabled attribute and class when disabled", () => {
    render(<FileDropzone label="Upload File" onDrop={() => {}} disabled />);
    const input = screen.getByLabelText("Upload File") as HTMLInputElement;
    expect(input.disabled).toBe(true);
    const label = screen.getByText("Upload File");
    expect(label).toHaveClass("file-dropzone", "dropzone-disabled");
  });

  it("sets accept and multiple attributes correctly", () => {
    render(
      <FileDropzone
        label="Upload File"
        onDrop={() => {}}
        accept=".png,.jpg"
        multiple
      />
    );
    const input = screen.getByLabelText("Upload File") as HTMLInputElement;
    expect(input.accept).toBe(".png,.jpg");
    expect(input.multiple).toBe(true);
  });

  it("calls onDrop handler when a file is dropped", () => {
    const onDrop = vi.fn();
    render(<FileDropzone label="Upload File" onDrop={onDrop} />);
    const input = screen.getByLabelText("Upload File");
    fireEvent.drop(input, {
      dataTransfer: {
        files: [new File(["file content"], "test.png", { type: "image/png" })],
      },
    });
    expect(onDrop).toHaveBeenCalled();
  });
});
