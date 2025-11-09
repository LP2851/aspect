import { render, screen, fireEvent } from "@testing-library/react";
import ConfigBox from "./ConfigBox";

describe("<ConfigBox />", () => {
  const name = "Test Box";
  const description = "This is a test description";

  it("renders the name and description", () => {
    render(
      <ConfigBox name={name} description={description}>
        <div>Child content</div>
      </ConfigBox>
    );

    expect(screen.getByText(name)).toBeInTheDocument();
    expect(screen.getByText(description)).toBeInTheDocument();
    expect(screen.getByText("Child content")).toBeInTheDocument();
  });

  it("collapses and expands when header is clicked", () => {
    render(
      <ConfigBox name={name} description={description}>
        <div>Child content</div>
      </ConfigBox>
    );

    const headerButton = screen.getByRole("button", { name: "-" });
    expect(headerButton).toBeInTheDocument();

    // Initially expanded
    expect(screen.getByText(description)).toBeVisible();

    // Collapse
    fireEvent.click(headerButton);
    expect(screen.queryByText(description)).not.toBeInTheDocument();
    expect(screen.getByText("+")).toBeInTheDocument();

    // Expand again
    fireEvent.click(screen.getByText("+"));
    expect(screen.getByText(description)).toBeVisible();
  });

  it("renders children correctly when expanded", () => {
    render(
      <ConfigBox name={name} description={description}>
        <span data-testid="child">Child</span>
      </ConfigBox>
    );

    expect(screen.getByTestId("child")).toBeInTheDocument();
  });
});
