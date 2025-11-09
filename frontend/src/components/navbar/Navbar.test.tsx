import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import Navbar from "./Navbar";

const mockNavigate = vi.fn();
vi.mock("react-router", () => ({
  useNavigate: () => mockNavigate,
}));

const mockLogout = vi.fn(() => Promise.resolve());
vi.mock("../../auth/AuthProvider.tsx", () => ({
  useAuth: () => ({ logout: mockLogout }),
}));

describe("<Navbar />", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders all navbar links", () => {
    render(<Navbar />);

    expect(screen.getByText("aspect")).toBeInTheDocument();
    expect(screen.getByText("Managed Accounts")).toBeInTheDocument();
    expect(screen.getByText("Projects")).toBeInTheDocument();
    expect(screen.getByText("Profile")).toBeInTheDocument();
  });

  it("calls logout and navigates to /login on logout click", async () => {
    render(<Navbar />);

    fireEvent.click(document.querySelector(".nav-item.border-left:last-child")!);

    await mockLogout();

    expect(mockLogout).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });

  it("links navigate to correct hrefs", () => {
    render(<Navbar />);

    expect(screen.getByText("Managed Accounts").closest("a")).toHaveAttribute("href", "/managed-accounts");
    expect(screen.getByText("Projects").closest("a")).toHaveAttribute("href", "/projects");
    expect(screen.getByText("Profile").closest("a")).toHaveAttribute("href", "/profile");
    expect(screen.getByText("aspect").closest("a")).toHaveAttribute("href", "/");
  });
});
