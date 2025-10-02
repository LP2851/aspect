import "./PaginationControls.css";

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
    <div className="pagination-controls">
      <button
        className="pagination-button-prev"
        onClick={() => onClickPrev(-1)}
        disabled={currentPage === 1}
      >
        <FaChevronLeft className="pagination-chevron" />
      </button>
      <span className="pagination-label">Page {currentPage}</span>
      <button
        className="pagination-button-next"
        onClick={() => onClickNext(1)}
        disabled={totalItems < itemsPerPage}
      >
        <FaChevronRight className="pagination-chevron" />
      </button>
    </div>
  );
};

export default memo(PaginationControls);
