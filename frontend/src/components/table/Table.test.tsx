import { render, screen } from "@testing-library/react";
import Table from "./Table";

describe("<Table />", () => {
  const headers = ["Name", "Age", "City"];
  const rows = (
    <>
      <tr>
        <td>Alice</td>
        <td>25</td>
        <td>London</td>
      </tr>
      <tr>
        <td>Bob</td>
        <td>30</td>
        <td>New York</td>
      </tr>
    </>
  );

  it("renders table headers correctly", () => {
    render(<Table headers={headers}>{rows}</Table>);
    headers.forEach((header) => {
      expect(screen.getByRole("columnheader", { name: header })).toBeInTheDocument();
    });
  });

  it("renders table rows and cells correctly", () => {
    render(<Table headers={headers}>{rows}</Table>);
    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("Bob")).toBeInTheDocument();
    expect(screen.getAllByRole("row")).toHaveLength(3);
  });

  it("renders with the correct class name", () => {
    const { container } = render(<Table headers={headers}>{rows}</Table>);
    expect(container.querySelector("table")).toHaveClass("app-table");
  });
});
