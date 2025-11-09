import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import DetailItem from "./DetailItem";

describe("<DetailItem />", () => {
  const headerText = "Header";
  const statusText = "Connected";
  const descriptionText = "This is the description";

  it("renders header, status, and description correctly when positive", () => {
    render(
      <DetailItem
        isPositive={true}
        headerText={headerText}
        statusText={statusText}
        descriptionText={descriptionText}
      />
    );

    expect(screen.getByText(headerText)).toBeInTheDocument();

    expect(screen.getByText(statusText)).toBeInTheDocument();
    expect(screen.getByText("✓")).toBeInTheDocument();

    expect(screen.getByText(descriptionText)).toBeInTheDocument();

    expect(screen.getByText(headerText).closest("div")).toHaveClass("general-detail-item-header");
  });

  it("renders correctly when not positive", () => {
    render(
      <DetailItem
        isPositive={false}
        headerText={headerText}
        statusText="Not Connected"
        descriptionText={descriptionText}
      />
    );

    expect(screen.getByText("Not Connected")).toBeInTheDocument();
    expect(screen.getByText("×")).toBeInTheDocument();

    expect(screen.getByText(descriptionText)).toBeInTheDocument();

    expect(screen.getByText(headerText).closest("div")).toHaveClass("general-detail-item-header");
  });
});
