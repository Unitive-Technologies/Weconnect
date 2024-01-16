import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import {
  useTable,
  useGlobalFilter,
  useSortBy,
  useFilters,
  useExpanded,
  usePagination,
} from "react-table";
import { Table, Row, Col, Button, Input, Spinner } from "reactstrap";
import { Filter, DefaultColumnFilter } from "./filters";
import { Link } from "react-router-dom";
import JobListGlobalFilter from "./GlobalSearchFilter";
import TableActionButtons from "./TableActionButtons";

// Define a default UI for filtering
function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
  isJobListGlobalFilter,
}) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = React.useState(globalFilter);
  const onChange = (value) => {
    setGlobalFilter(value || undefined);
  };

  return (
    <React.Fragment>
      <Col md={4}>
        <div className="search-box me-xxl-2 my-3 my-xxl-0 d-inline-block">
          <div className="position-relative">
            <label htmlFor="search-bar-0" className="search-label">
              <span id="search-bar-0-label" className="sr-only">
                Search this table
              </span>
              <input
                onChange={(e) => {
                  setValue(e.target.value);
                  onChange(e.target.value);
                }}
                id="search-bar-0"
                type="text"
                className="form-control"
                // placeholder={`${count} records...`}
                placeholder="Search..."
                value={value || ""}
              />
            </label>
            <i className="bx bx-search-alt search-icon"></i>
          </div>
        </div>
      </Col>
      {isJobListGlobalFilter && (
        <JobListGlobalFilter setGlobalFilter={setGlobalFilter} />
      )}
    </React.Fragment>
  );
}

const createLimitedArray = (startPage, totalPage, limit) => {
  const endPage = Math.min(startPage + limit, totalPage);
  const updatedArray = Array.from(
    { length: endPage - (startPage - 1) },
    (_, index) => startPage + index
  );
  console.log(updatedArray);
  return updatedArray;
};
const TableContainerX = ({
  columns,
  data,
  isGlobalFilter,
  tableActions,
  isLoading,
  handleRowClick,
  customPageSizeOptions,
  totalCount,
  currentPage,
  pageSize,
  totalPage,
  isShowingPageLength,
  isPagination,
  paginationDiv,
  paginationClass,
  isCustomPageSizeOptions = false,
  theadClass,
  tableClass,
  goToPage,
}) => {
  const [navigationPage, setNavigationPage] = React.useState(currentPage);
  console.log("[Table ContainerX] Page Size: ", pageSize);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    state,
    preGlobalFilteredRows,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      defaultColumn: { Filter: DefaultColumnFilter },
      initialState: { pageIndex: 0, pageSize: pageSize },
      manualPagination: true,
    },
    useGlobalFilter,
    useFilters,
    useSortBy,
    useExpanded,
    usePagination
  );

  useEffect(() => {
    setNavigationPage(currentPage);
  }, [currentPage]);

  const startIndex = (currentPage - 1) * pageSize + 1;
  // console.log("current data size - ", data.length);
  // console.log(startIndex, "S.I - PageSize ", pageSize);
  // debugger;
  const generateSortingIndicator = (column) => {
    return column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : "";
  };

  const onChangeInSelect = (event) => {
    setPageSize(Number(event.target.value));
  };

  return (
    <Fragment>
      <Row className="mb-3  ">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {isCustomPageSizeOptions && (
            <Col md={customPageSizeOptions ? 2 : 1}>
              <select
                className="form-select"
                value={pageSize}
                onChange={onChangeInSelect}
              >
                {customPageSizeOptions.map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                    Show {pageSize}
                  </option>
                ))}
              </select>
            </Col>
          )}
          {isGlobalFilter && (
            <GlobalFilter
              preGlobalFilteredRows={preGlobalFilteredRows}
              globalFilter={state.globalFilter}
              setGlobalFilter={setGlobalFilter}
              isJobListGlobalFilter={false}
            />
          )}
          {tableActions.length > 0 ? (
            <TableActionButtons tableActions={tableActions} />
          ) : (
            <></>
          )}
        </div>
      </Row>
      {isLoading ? (
        // <Loader />
        <React.Fragment>
          <Spinner
            color="primary"
            className="position-absolute top-50 start-50"
          />
        </React.Fragment>
      ) : (
        <>
          <div className="table-responsive react-table">
            <Table {...getTableProps()} className={tableClass}>
              <thead className={theadClass}>
                {headerGroups.map((headerGroup) => (
                  <tr
                    key={headerGroup.id}
                    {...headerGroup.getHeaderGroupProps()}
                  >
                    {headerGroup.headers.map((column) => (
                      <th
                        key={column.id}
                        className={column.isSort ? "sorting" : ""}
                      >
                        <div {...column.getSortByToggleProps()}>
                          {column.render("Header")}
                          {/* {generateSortingIndicator(column)} */}
                        </div>
                        {/* <Filter column={column} /> */}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>

              <tbody {...getTableBodyProps()}>
                {page.map((row) => {
                  prepareRow(row);
                  return (
                    <Fragment key={row.getRowProps().key}>
                      <tr
                        onClick={() => handleRowClick(row.original)}
                        style={{ cursor: "pointer" }}
                      >
                        {row.cells.map((cell) => {
                          return (
                            <td
                              key={cell.id}
                              {...cell.getCellProps()}
                              // style={{ width: `${getColumnWidth(cell.column)}px` }}
                            >
                              {" "}
                              {cell.render("Cell")}
                            </td>
                          );
                        })}
                      </tr>
                    </Fragment>
                  );
                })}
              </tbody>
            </Table>
          </div>

          {isPagination && (
            <Row className="justify-content-between align-items-center">
              {isShowingPageLength && startIndex > 0 && (
                <div className="col-sm">
                  <div className="text-muted">
                    Showing{" "}
                    <span className="fw-semibold">
                      {startIndex} to {startIndex + data.length - 1} -{" "}
                    </span>{" "}
                    of <span className="fw-semibold">{totalCount}</span> entries
                  </div>
                </div>
              )}
              <div
                className={paginationDiv}
                style={{
                  display: "flex",
                  gap: "20px",
                  alignItems: "center",
                  justifyContent: "right",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    height: "30px",
                    width: "100px",
                  }}
                >
                  <Input
                    style={{ width: "50%" }}
                    type="number"
                    // id="inputToPage"
                    autoComplete="off"
                    min={1}
                    max={totalPage}
                    value={navigationPage}
                    onChange={(e) => setNavigationPage(e.target.value)}
                    onBlur={(e) => {
                      setNavigationPage(e.target.value);
                      goToPage(Number(e.target.value));
                    }}
                  />
                  <span
                    style={{
                      display: "flex",
                    }}
                  >
                    {" "}
                    / {totalPage}
                  </span>
                </div>
                <ul className={paginationClass}>
                  <li
                    className={`page-item ${
                      currentPage <= 1 ? "disabled" : ""
                    }`}
                  >
                    <Link
                      to="#"
                      className="page-link"
                      onClick={() => goToPage(currentPage - 1)}
                    >
                      <i className="mdi mdi-chevron-left"></i>
                    </Link>
                  </li>
                  {
                    // create the array of maximum 5 elements starts from current page and maximum ends with totalPage
                    totalPage < 8
                      ? [...Array(totalPage)].map((_, index) => (
                          <li
                            key={index}
                            className={`page-item ${
                              currentPage === index + 1 ? "active" : ""
                            }`}
                          >
                            <Link
                              to="#"
                              className="page-link"
                              onClick={() => goToPage(index + 1)}
                            >
                              {index + 1}
                            </Link>
                          </li>
                        ))
                      : createLimitedArray(currentPage, totalPage, 5).map(
                          (_, index) => (
                            <li
                              key={index}
                              className={`page-item ${
                                currentPage === currentPage + index + 1
                                  ? "active"
                                  : ""
                              }`}
                            >
                              <Link
                                to="#"
                                className="page-link"
                                onClick={() =>
                                  goToPage(currentPage + index + 1)
                                }
                              >
                                {currentPage + index + 1}
                              </Link>
                            </li>
                          )
                        )
                  }
                  <li
                    className={`page-item ${
                      currentPage >= totalPage ? "disabled" : ""
                    }`}
                  >
                    <Link
                      to="#"
                      className="page-link"
                      onClick={() => goToPage(currentPage + 1)}
                    >
                      <i className="mdi mdi-chevron-right"></i>
                    </Link>
                  </li>
                </ul>
              </div>
            </Row>
          )}
        </>
      )}
    </Fragment>
  );
};

// create propType with two props as optional string
TableContainerX.defaultProps = {
  data: [],
  isPagination: true,
  theadClass: "table-light",
  tableClass: "table align-middle table-nowrap table-hover",
  paginationDiv: "col-sm-12 col-md-7",
  paginationClass: "pagination pagination-rounded justify-content-end mt-4",
  isCustomPageSizeOptions: false,
  customPageSizeOptions: [10, 20, 30, 40, 50],
  isLoading: false,
  currentPage: 1,
  pageSize: 30,
  totalPage: 0,
  handleRowClick: () => {},
};

TableContainerX.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array,
  isLoading: PropTypes.bool,
  isPagination: PropTypes.bool,
  totalCount: PropTypes.number,
  isCustomPageSizeOptions: PropTypes.bool,
  customPageSizeOptions: PropTypes.array,
  handleRowClick: PropTypes.func,
  isGlobalFilter: PropTypes.bool,
  isShowingPageLength: PropTypes.bool,
  tableActions: PropTypes.array,
  customPageSize: PropTypes.number,
  theadClass: PropTypes.string,
  tableClass: PropTypes.string,
  paginationDiv: PropTypes.string,
  paginationClass: PropTypes.string,
  currentPage: PropTypes.number,
  pageSize: PropTypes.number,
  totalPage: PropTypes.number,
  goToPage: PropTypes.func,
};

export default TableContainerX;
