import { render, screen, fireEvent } from "@testing-library/react";
import {MemoryRouter, useLocation, useNavigate} from "react-router";
import PageWithLeftSidebar from "./PageWithLeftSidebar";

// Mock navigate and location
vi.mock("react-router", async () => {
  const actual = await vi.importActual<typeof import("react-router")>("react-router");
  return {
    ...actual,
    useNavigate: vi.fn(),
    useLocation: vi.fn(),
  };
});

const mockNavigate = vi.fn();

describe("<PageWithLeftSidebar />", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (useNavigate as any).mockReturnValue(mockNavigate);
    (useLocation as any).mockReturnValue({ search: "" });
  });

  const mockElement = <div data-testid="mock-element">Mock Element</div>;
  const mockFunc = vi.fn();

  const mockMapping = [
    {
      key: "item1",
      itemName: "Item 1",
      element: mockElement,
    },
    {
      key: "item2",
      itemName: "Item 2",
      func: mockFunc,
    },
    {
      key: "item3",
      itemName: "Parent",
      subElementMapping: [
        { key: "sub1", itemName: "Sub 1", element: <div data-testid="sub1">Sub 1 Content</div> },
      ],
    },
  ];

  const renderComponent = (search = "") => {
    (useLocation as any).mockReturnValue({ search });
    render(
      <MemoryRouter>
        <PageWithLeftSidebar
          title="Test Page"
          contentMapping={mockMapping}
          defaultKey="item1"
          path="/test"
        />
      </MemoryRouter>
    );
  };

  it("renders title and sidebar", () => {
    renderComponent();

    expect(screen.getByText("Test Page")).toBeInTheDocument();
    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();
    expect(screen.getByText("Parent")).toBeInTheDocument();
  });

  it("navigates to defaultKey if no search param exists", () => {
    renderComponent("");
    expect(mockNavigate).toHaveBeenCalledWith("/test?element=item1");
  });

  it("renders element content when element key matches search param", () => {
    renderComponent("?element=item1");
    expect(screen.getByText("Test Page"));
  });

  it("renders sub-element content when sub-element key matches search param", () => {
    renderComponent("?element=sub1");
    expect(screen.getByText("Sub 1"));
  });

  it("navigates to correct URL when sidebar item clicked", () => {
    renderComponent("?element=item1");

    fireEvent.click(screen.getByText("Item 2"));
    expect(mockNavigate).toHaveBeenCalledWith("/test?element=item2");
  });
});
