import { render, screen, waitFor, act } from "@testing-library/react";
import { AuthProvider, useAuth } from "./AuthProvider";
import {BrowserRouter} from "react-router";

const mockSignIn = vi.fn();
const mockLogout = vi.fn();
const mockFetchMe = vi.fn();

const mockNavigate = vi.fn();

vi.mock("../generated/graphql", () => ({
  useSignInMutation: () => [mockSignIn],
  useLogoutMutation: () => [mockLogout],
  useMeLazyQuery: () => [mockFetchMe],
}));

vi.mock("react-router", async () => {
  const actual: any = await vi.importActual("react-router");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const TestComponent = () => {
  const { user, loading, login, logout } = useAuth();
  return (
    <div>
      <span data-testid="user">{user?.email || "null"}</span>
      <span data-testid="loading">{loading ? "true" : "false"}</span>
      <button
        onClick={() => login("test@example.com", "password")}
        data-testid="login-btn"
      >
        Login
      </button>
      <button onClick={logout} data-testid="logout-btn">
        Logout
      </button>
    </div>
  );
};

describe("AuthProvider", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("throws if useAuth is used outside provider", () => {
    const consoleError = console.error;
    console.error = () => {};
    expect(() => render(<TestComponent />)).toThrow(
      "useAuth must be used within AuthProvider"
    );
    console.error = consoleError;
  });

  it("sets user from fetchMe on mount", async () => {
    const userData = { __typename: "User", id: "1", email: "me@test.com" };
    mockFetchMe.mockResolvedValue({ data: { authenticatedItem: userData } });

    render(
      <BrowserRouter>
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      </BrowserRouter>
    );

    expect(screen.getByTestId("loading").textContent).toBe("true");

    await waitFor(() =>
      expect(screen.getByTestId("loading").textContent).toBe("false")
    );
    expect(screen.getByTestId("user").textContent).toBe("me@test.com");
  });

  it("login sets user when successful", async () => {
    mockSignIn.mockResolvedValue({
      data: {
        authenticateUserWithPassword: {
          __typename: "UserAuthenticationWithPasswordSuccess",
          item: { id: "2", email: "login@test.com" },
        },
      },
    });

    mockFetchMe.mockResolvedValue({ data: { authenticatedItem: null } });

    render(
      <BrowserRouter>
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      </BrowserRouter>
    );

    await waitFor(() =>
      expect(screen.getByTestId("loading").textContent).toBe("false")
    );

    await act(async () => {
      screen.getByTestId("login-btn").click();
    });

    expect(screen.getByTestId("user").textContent).toBe("login@test.com");
  });

  it("logout clears user and navigates", async () => {
    mockFetchMe.mockResolvedValue({
      data: { authenticatedItem: { __typename: "User", id: "1", email: "me@test.com" } },
    });
    mockLogout.mockResolvedValue({});

    render(
      <BrowserRouter>
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      </BrowserRouter>
    );

    await waitFor(() =>
      expect(screen.getByTestId("user").textContent).toBe("me@test.com")
    );

    await act(async () => {
      screen.getByTestId("logout-btn").click();
    });

    expect(screen.getByTestId("user").textContent).toBe("null");
    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });
});
