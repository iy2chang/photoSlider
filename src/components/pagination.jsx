import React from "react";
import _ from "lodash";

const Pagination = ({
  itemsCount,
  pageSize,
  currentPage,
  onPageChange,
  showModal
}) => {
  const pageCount = Math.ceil(itemsCount / pageSize);
  if (pageCount === 1) return null;
  const pages = _.range(1, pageCount + 1);

  return (
    <nav>
      <ul className="pagination justify-content-center">
        {pages.map(page => (
          <li
            key={page}
            className={
              page === currentPage && !showModal
                ? "page-item active"
                : "page-item"
            }
          >
            <nav className="page-link" onClick={() => onPageChange(page)}>
              {page}
            </nav>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
