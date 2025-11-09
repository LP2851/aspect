import { render, screen, fireEvent } from "@testing-library/react";
import LeftSidebar from "./LeftSidebar";

describe("<LeftSidebar />", () => {
  const mockOnSelectElement = vi.fn();

  const mockMapping = [
    {
      key: "parent1",
      itemName: "Parent 1",
      subElementMapping: [
        { key: "child1", itemName: "Child 1" },
        { key: "child2", itemName: "Child 2" },
      ],
    },
    {
      key: "parent2",
      itemName: "Parent 2",
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders all parent and child items", () => {
    render(
      <LeftSidebar
        renderContentMapping={mockMapping}
        onSelectElement={mockOnSelectElement}
      />
    );

    // Parents
    expect(screen.getByText("Parent 1")).toBeInTheDocument();
    expect(screen.getByText("Parent 2")).toBeInTheDocument();

    // Children
    expect(screen.getByText("Child 1")).toBeInTheDocument();
    expect(screen.getByText("Child 2")).toBeInTheDocument();
  });

  it("calls onSelectElement with the correct key when parent is clicked", () => {
    render(
      <LeftSidebar
        renderContentMapping={mockMapping}
        onSelectElement={mockOnSelectElement}
      />
    );

    fireEvent.click(screen.getByText("Parent 1"));
    expect(mockOnSelectElement).toHaveBeenCalledWith("parent1");
  });

  it("calls onSelectElement with the correct key when sub-element is clicked", () => {
    render(
      <LeftSidebar
        renderContentMapping={mockMapping}
        onSelectElement={mockOnSelectElement}
      />
    );

    fireEvent.click(screen.getByText("Child 2"));
    expect(mockOnSelectElement).toHaveBeenCalledWith("child2");
  });

  it("renders sidebar footer when provided", () => {
    render(
      <LeftSidebar
        renderContentMapping={mockMapping}
        sidebarFooter={<div data-testid="footer">Footer Content</div>}
        onSelectElement={mockOnSelectElement}
      />
    );

    expect(screen.getByTestId("footer")).toBeInTheDocument();
    expect(screen.getByText("Footer Content")).toBeInTheDocument();
  });
});
