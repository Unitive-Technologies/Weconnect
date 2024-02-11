import React, { Fragment } from "react";
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
import Loader from "./Loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";

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

const TableContainer = ({
  columns,
  data,
  isGlobalFilter,
  isShowTableActionButtons,
  tableActions,
  isLoading,
  handleRowClick,
  customPageSize,
  tableClass,
  customPageSizeOptions,
  isShowingPageLength,
  isPagination,
  paginationDiv,
  pagination,
  iscustomPageSizeOptions,
  theadClass,
  isJobListGlobalFilter,
  subTableEnabled,
  getRenderedSubTable,
  isSubTableContentExists,
}) => {
  const [open, setOpen] = React.useState(false);
  const toggleRowOpen = (e, id) => {
    e.preventDefault();
    if (open === id) {
      setOpen(false);
    } else {
      setOpen(id);
    }
  };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state,
    preGlobalFilteredRows,
    setGlobalFilter,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      defaultColumn: { Filter: DefaultColumnFilter },
      initialState: {
        pageIndex: 0,
        pageSize: customPageSize,
        sortBy: [
          {
            desc: true,
          },
        ],
      },
    },
    useGlobalFilter,
    useFilters,
    useSortBy,
    useExpanded,
    usePagination
  );

  const generateSortingIndicator = (column) => {
    return column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : "";
  };

  const onChangeInSelect = (event) => {
    setPageSize(Number(event.target.value));
  };

  return (
    <Fragment>
      <Row className="mb-3  ">
        {/* <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        > */}
        <Col
          lg={6}
          style={{
            display: "flex",
            alignItems: "left",
            justifyContent: "left",
          }}
        >
          {iscustomPageSizeOptions && (
            <Col md={customPageSizeOptions ? 2 : 1}>
              <select
                className="form-select"
                value={pageSize}
                onChange={onChangeInSelect}
              >
                {[10, 20, 30, 40, 50].map((pageSize) => (
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
              isJobListGlobalFilter={isJobListGlobalFilter}
            />
          )}
        </Col>
        <Col
          lg={6}
          style={{
            display: "flex",
            alignItems: "right",
            justifyContent: "right",
          }}
        >
          {isShowTableActionButtons && (
            <TableActionButtons tableActions={tableActions} />
          )}
        </Col>

        {/* </div> */}
      </Row>
      {isLoading ? (
        <React.Fragment>
          <Spinner
            color="primary"
            className="position-absolute top-50 start-50"
          />
        </React.Fragment>
      ) : (
        <div className="table-responsive react-table">
          <Table {...getTableProps()} className={tableClass}>
            <thead className={theadClass}>
              {headerGroups.map((headerGroup) => (
                <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
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
                    <tr
                      onClick={() => handleRowClick(row.original)}
                      style={{ cursor: "pointer" }}
                    >
                      {subTableEnabled && (
                        <td>
                          {isSubTableContentExists(row.original) && (
                            <span
                              id={row.id}
                              onClick={(e) => toggleRowOpen(e, row.id)}
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
      )}
      {isPagination && (
        <Row className="justify-content-between align-items-center">
          {isShowingPageLength && (
            <div className="col-sm">
              <div className="text-muted">
                Showing <span className="fw-semibold">{page.length}</span> of{" "}
                <span className="fw-semibold">{data.length}</span> entries
              </div>
            </div>
          )}
          <div className={paginationDiv}>
            <ul className={pagination}>
              <li className={`page-item ${!canPreviousPage ? "disabled" : ""}`}>
                <Link to="#" className="page-link" onClick={previousPage}>
                  <i className="mdi mdi-chevron-left"></i>
                </Link>
              </li>
              {pageOptions.map((item, key) => (
                <React.Fragment key={key}>
                  {item >= pageIndex && item < pageIndex + 5 && (
                    <li
                      className={`page-item ${
                        pageIndex === item ? "active" : ""
                      } ${
                        pageIndex === item ? "page-item active" : "page-item"
                      }`}
                    >
                      <Link
                        to="#"
                        className="page-link"
                        onClick={() => gotoPage(item)}
                      >
                        {item + 1}
                      </Link>
                    </li>
                  )}
                </React.Fragment>
              ))}
              {pageOptions.length > pageIndex + 5 && (
                <li className={`page-item ${!canNextPage ? "disabled" : ""}`}>
                  <Link to="#" className="page-link" onClick={nextPage}>
                    <i className="mdi mdi-chevron-right"></i>
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </Row>
      )}
    </Fragment>
  );
};

TableContainer.defaultProps = {
  data: [],
  handleRowClick: () => {},
  subTableEnabled: false,
};

TableContainer.propTypes = {
  preGlobalFilteredRows: PropTypes.any,
  data: PropTypes.array,
  handleRowClick: PropTypes.func,
  subTableEnabled: PropTypes.bool,
  getRenderedSubTable: PropTypes.func,
  isSubTableContentExists: PropTypes.func,
};

export default TableContainer;
