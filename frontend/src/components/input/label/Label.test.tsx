import { render, screen } from "@testing-library/react";
import Label from "./Label";

describe("<Label />", () => {
  it("renders the message", () => {
    render(<Label id="test" message="Test Label" />);
    expect(screen.getByText("Test Label")).toBeInTheDocument();
  });

  it("renders required asterisk when required is true", () => {
    render(<Label id="test" message="Test Label" required />);
    expect(screen.getByText("*")).toBeInTheDocument();
  });

  it("associates label with input via htmlFor", () => {
    render(<Label id="inputId" message="Input Label" />);
    const label = screen.getByText("Input Label") as HTMLLabelElement;
    expect(label.htmlFor).toBe("inputId");
  });
});
