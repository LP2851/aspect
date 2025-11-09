import { render, screen } from "@testing-library/react";
import { Tag } from "./Tag";

describe("Tag", () => {
  it("renders the label", () => {
    render(<Tag label="Active" />);
    expect(screen.getByText("Active")).toBeInTheDocument();
  });

  it("applies the correct default color class", () => {
    render(<Tag label="Default" />);
    const tag = screen.getByText("Default");
    expect(tag).toHaveClass("tag-gray");
  });

  it("applies the correct color class when provided", () => {
    render(<Tag label="Success" color="green" />);
    const tag = screen.getByText("Success");
    expect(tag).toHaveClass("tag-green");
  });

  it("renders children before the label", () => {
    render(
      <Tag label="Loading">
        <span data-testid="icon">⏳</span>
      </Tag>
    );
    const tag = screen.getByText("Loading");
    const icon = screen.getByTestId("icon");
    expect(tag).toContainElement(icon);
  });
});
