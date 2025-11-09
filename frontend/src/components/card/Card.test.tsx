import { render, screen } from "@testing-library/react";
import Card from "./Card";

describe("<Card />", () => {
  it("renders children correctly", () => {
    render(<Card>Test content</Card>);
    expect(screen.getByText("Test content")).toBeInTheDocument();
  });

  it("applies the base class", () => {
    render(<Card>Card content</Card>);
    const card = screen.getByText("Card content").closest("div");
    expect(card).toHaveClass("card");
  });

  it("appends a custom className when provided", () => {
    render(<Card className='custom-class'>Content</Card>);
    const card = screen.getByText("Content").closest("div");
    expect(card).toHaveClass("card");
    expect(card).toHaveClass("custom-class");
  });

  it("does not add extra spaces when no className is provided", () => {
    render(<Card>Test</Card>);
    const card = screen.getByText("Test").closest("div");
    expect(card?.className).toBe("card");
  });
});
