import React from "react";
import PropTypes from "prop-types";
import _ from "lodash"; //Library, imported for creating array using lodash (_.range()) method

const Pagination = ({ itemsCount, pageSize, currentPage, onPageChange }) => {
  const pagesCount = Math.ceil(itemsCount / pageSize); //Math.celi, bulit-in function for rounding off a number
  if (pagesCount === 1)
    return <p>These are only the list of movies that are in database.</p>;
  const pages = _.range(1, pagesCount + 1); //creating array depending upon the pages count
  return (
    <nav className="clickable">
      <ul className="pagination">
        {pages.map((page) => (
          <li
            key={page}
            className={page === currentPage ? "page-item active" : "page-item"}
          >
            <a className="page-link" onClick={() => onPageChange(page)}>
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
}; //This is for type-checking: to check whether the given props are correct or not

export default Pagination;
