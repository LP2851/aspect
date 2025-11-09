import { render, screen, fireEvent } from "@testing-library/react";
import PaginationControls from "./PaginationControls";

describe("<PaginationControls />", () => {
  const onClickPrev = vi.fn();
  const onClickNext = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders current page correctly", () => {
    render(
      <PaginationControls
        onClickPrev={onClickPrev}
        onClickNext={onClickNext}
        currentPage={3}
        itemsPerPage={10}
        totalItems={50}
      />
    );
    expect(screen.getByText("Page 3")).toBeInTheDocument();
  });

  it("calls onClickPrev when previous button clicked", () => {
    render(
      <PaginationControls
        onClickPrev={onClickPrev}
        onClickNext={onClickNext}
        currentPage={2}
        itemsPerPage={10}
        totalItems={50}
      />
    );
    fireEvent.click(screen.getByRole("button", { name: /previous page/i }));
    expect(onClickPrev).toHaveBeenCalledWith(-1);
  });

  it("disables previous button when on first page", () => {
    render(
      <PaginationControls
        onClickPrev={onClickPrev}
        onClickNext={onClickNext}
        currentPage={1}
        itemsPerPage={10}
        totalItems={50}
      />
    );
    const prevButton = screen.getAllByRole("button")[0];
    expect(prevButton).toBeDisabled();
  });

  it("calls onClickNext when next button clicked", () => {
    render(
      <PaginationControls
        onClickPrev={onClickPrev}
        onClickNext={onClickNext}
        currentPage={2}
        itemsPerPage={10}
        totalItems={50}
      />
    );
    const nextButton = screen.getAllByRole("button")[1];
    fireEvent.click(nextButton);
    expect(onClickNext).toHaveBeenCalledWith(1);
  });

  it("disables next button when totalItems < itemsPerPage", () => {
    render(
      <PaginationControls
        onClickPrev={onClickPrev}
        onClickNext={onClickNext}
        currentPage={1}
        itemsPerPage={10}
        totalItems={5}
      />
    );
    const nextButton = screen.getAllByRole("button")[1];
    expect(nextButton).toBeDisabled();
  });
});
