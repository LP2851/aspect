import { render, screen } from "@testing-library/react";
import ErrorMessage from "./ErrorMessage";

describe("<ErrorMessage />", () => {
  it("renders the error message when provided", () => {
    render(<ErrorMessage message="Something went wrong" />);
    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
  });

  it("renders nothing when message is not provided", () => {
    render(<ErrorMessage />);
    expect(screen.queryByText(/./)).toBeNull();
  });
});
