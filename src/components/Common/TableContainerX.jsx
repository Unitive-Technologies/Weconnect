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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";

// Define a default UI for filtering
function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
  isJobListGlobalFilter,
}) {
  // const count = preGlobalFilteredRows.length;
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
  // console.log(updatedArray);
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
  subTableEnabled,
  getRenderedSubTable,
  isSubTableContentExists,
}) => {
  const [navigationPage, setNavigationPage] = React.useState(currentPage);
  const [open, setOpen] = React.useState(-1);

  // console.log("[Table ContainerX] Page Size: ", pageSize);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    rows,
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
  const generateSortingIndicator = (column) => {
    return column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : "";
  };

  const onChangeInSelect = (event) => {
    setPageSize(Number(event.target.value));
  };

  const toggleRowOpen = (e, id) => {
    // debugger;
    e.preventDefault();
    if (open === id) {
      setOpen(-1);
    } else {
      setOpen(id);
    }
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
                    {subTableEnabled && <th> </th>}
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
                      {/* {console.log("Row: ", row.original)} */}
                      <tr
                        onClick={() => handleRowClick(row.original)}
                        style={{ cursor: "pointer" }}
                      >
                        {subTableEnabled && (
                          <td>
                            {isSubTableContentExists(row.original) && (
                              <span
                                id={row.id}
                                onClick={(e) => {
                                  e.preventDefault();
                                  toggleRowOpen(e, row.id);
                                }}
                              >
                                <FontAwesomeIcon
                                  icon={open === row.id ? faMinus : faPlus}
                                  style={{
                                    cursor: "pointer",
                                    border: "solid 1px",
                                    padding: "4px",
                                    background: "#151b1e",
                                    color: "white",
                                  }}
                                />
                              </span>
                            )}
                          </td>
                        )}
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
                      {subTableEnabled && open === row.id && (
                        <tr>
                          <td colSpan={row.cells.length + 1}>
                            {getRenderedSubTable(row.original)}
                          </td>
                        </tr>
                      )}
                    </Fragment>
                  );
                })}
              </tbody>
            </Table>
          </div>

          {isPagination && (
            <Row
              // className="justify-content-between align-items-center"
              style={{
                // border: "1px solid red",
                display: "flex",
                // gap: "20px",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
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
                  // border: "1px solid green",
                  display: "flex",
                  gap: "5%",
                  alignItems: "center",
                  justifyContent: "center",
                  paddingLeft: "10%",
                }}
              >
                <div
                  style={{
                    // border: "1px solid blue",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "10px",
                    height: "30px",
                    width: "30%",
                  }}
                >
                  <Input
                    // style={{ width: "100%" }}
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
                      width: "400px",
                    }}
                  >
                    {" "}
                    / {totalPage}
                  </span>
                </div>
                <ul
                  className={paginationClass}
                  // style={{ border: "1px solid black" }}
                >
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
                                currentPage === currentPage + index
                                  ? "active"
                                  : ""
                              }`}
                            >
                              <Link
                                to="#"
                                className="page-link"
                                onClick={() => goToPage(currentPage + index)}
                              >
                                {currentPage + index}
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
  subTableEnabled: false,
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
  subTableEnabled: PropTypes.bool,
  getRenderedSubTable: PropTypes.func,
  isSubTableContentExists: PropTypes.func,
};

export default TableContainerX;
