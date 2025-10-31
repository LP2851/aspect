import { render, screen } from "@testing-library/react";
import Button from "./Button";

describe("<Button />", () => {
  it("renders children", () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByText("Click Me")).toBeInTheDocument();
  });

  it("applies default variant class", () => {
    render(<Button>Default</Button>);
    const button = screen.getByText("Default");
    expect(button).toHaveClass("button", "button-primary");
  });

  it("applies the correct variant class when passed", () => {
    render(<Button variant="secondary">Secondary</Button>);
    const button = screen.getByText("Secondary");
    expect(button).toHaveClass("button", "button-secondary");
  });

  it("applies extraClasses correctly", () => {
    render(
      <Button extraClasses="my-extra-class">Extra Class</Button>
    );
    const button = screen.getByText("Extra Class");
    expect(button).toHaveClass("button", "button-primary", "my-extra-class");
  });

  it("sets the disabled attribute", () => {
    render(<Button disabled>Disabled</Button>);
    const button = screen.getByText("Disabled");
    expect(button).toBeDisabled();
  });

  it("sets the type attribute", () => {
    render(<Button type="submit">Submit</Button>);
    const button = screen.getByText("Submit");
    expect(button).toHaveAttribute("type", "submit");
  });
});
