import { memo } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

const PaginationControls = ({
  onClickPrev,
  onClickNext,
  currentPage,
  itemsPerPage,
  totalItems,
}: {
  onClickPrev: (inc: number) => void;
  onClickNext: (inc: number) => void;
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
}) => {
  return (
    <div
      className="pagination-controls"
      style={{ marginTop: "16px", display: "flex", justifyContent: "center" }}
    >
      <button
        onClick={() => onClickPrev(-1)}
        disabled={currentPage === 1}
        style={{ marginRight: "8px" }}
      >
        <FaChevronLeft style={{ height: "24px" }} />
      </button>
      <span style={{ paddingTop: "5px" }}>Page {currentPage}</span>
      <button
        onClick={() => onClickNext(1)}
        disabled={totalItems < itemsPerPage}
        style={{ marginLeft: "8px" }}
      >
        <FaChevronRight style={{ height: "24px" }} />
      </button>
    </div>
  );
};

export default memo(PaginationControls);
