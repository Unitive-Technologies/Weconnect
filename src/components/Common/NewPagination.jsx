import React, { useState, useEffect } from "react";
import { Row } from "reactstrap";
import { Link } from "react-router-dom";

const NewPagination = ({
  pageChangeHandler,
  currentPage,
  totalRows,
  rowsPerPage,
  pagination,
  paginationDiv,
  showPageLength = true,
}) => {
  // Calculating max number of pages
  const noOfPages = Math.ceil(totalRows / rowsPerPage);

  // Creating an array with length equal to no.of pages
  const pagesArr = [...new Array(noOfPages)];

  // State variable to hold the current page. This value is
  // passed to the callback provided by the parent
  // const [currPage, setCurrPage] = useState(parseInt(currentPage));

  // Navigation arrows enable/disable state
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoNext, setCanGoNext] = useState(true);

  // Onclick handlers for the butons
  const onNextPage = () => pageChangeHandler((prevPage) => prevPage + 1);
  const onPrevPage = () => pageChangeHandler((prevPage) => prevPage - 1);

  const onPageSelect = (pageNo) => pageChangeHandler(pageNo);

  // Disable previous and next buttons in the first and last page
  // respectively
  useEffect(() => {
    if (noOfPages === currentPage) {
      setCanGoNext(false);
    } else {
      setCanGoNext(true);
    }
    if (currentPage === 1) {
      setCanGoBack(false);
    } else {
      setCanGoBack(true);
    }
  }, []);

  return (
    <Row className="justify-content-between align-items-center">
      {noOfPages > 1 && (
        <>
          {showPageLength && (
            <>
              <div className="col-sm">
                <div className="text-muted">
                  Showing <span className="fw-semibold">{rowsPerPage}</span> of{" "}
                  <span className="fw-semibold">{totalRows}</span> entries
                </div>
              </div>
            </>
          )}

          <div className={paginationDiv}>
            <ul className={pagination}>
              <li className={`page-item ${!canGoBack ? "disabled" : ""}`}>
                <Link to="#" className="page-link" onClick={onPrevPage}>
                  <i className="mdi mdi-chevron-left"></i>
                </Link>
              </li>
              {pagesArr.map((num, index) => (
                <li
                  key={index}
                  className={`page-item ${
                    index + 1 === currentPage ? "active" : ""
                  }`}
                >
                  <Link
                    to="#"
                    className="page-link"
                    onClick={() => onPageSelect(index + 1)}
                  >
                    {index + 1}
                  </Link>
                </li>
              ))}
              <li className={`page-item ${!canGoNext ? "disabled" : ""}`}>
                <Link to="#" className="page-link" onClick={onNextPage}>
                  <i className="mdi mdi-chevron-right"></i>
                </Link>
              </li>
            </ul>
          </div>
        </>
      )}
    </Row>
  );
};
export default NewPagination;
