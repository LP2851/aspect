import { render, screen, fireEvent } from "@testing-library/react";
import Select from "./Select";

describe("<Select />", () => {
  const options = [
    { value: "val1", label: "Option 1" },
    { value: "val2", label: "Option 2" },
  ];

  it("renders label and select element", () => {
    render(<Select id="test-select" label="Choose an option" options={options} />);
    expect(screen.getByText("Choose an option")).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  it("renders default option when provided", () => {
    render(
      <Select
        id="test-select"
        label="Choose"
        defaultOption="Select one"
        defaultValue=""
        options={options}
      />
    );
    expect(screen.getByText("Select one")).toBeInTheDocument();
  });

  it("renders all options", () => {
    render(<Select id="test-select" options={options} />);
    expect(screen.getByText("Option 1")).toBeInTheDocument();
    expect(screen.getByText("Option 2")).toBeInTheDocument();
  });

  it("calls onChange when a new option is selected", () => {
    const onChange = vi.fn();
    render(<Select id="test-select" options={options} onChange={onChange} />);
    const select = screen.getByRole("combobox") as HTMLSelectElement;
    fireEvent.change(select, { target: { value: "val2" } });
    expect(onChange).toHaveBeenCalled();
  });

  it("sets the value correctly", () => {
    render(<Select id="test-select" options={options} value="val1" />);
    const select = screen.getByRole("combobox") as HTMLSelectElement;
    expect(select.value).toBe("val1");
  });

  it("renders required attribute on label and select when required", () => {
    render(<Select id="test-select" label="Choose" options={options} required />);
    const select = screen.getByRole("combobox") as HTMLSelectElement;
    expect(select.required).toBe(true);
    const label = screen.getByText("Choose");
    expect(label).toBeInTheDocument();
  });
});
