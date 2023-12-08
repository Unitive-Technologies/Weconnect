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
import { Table, Row, Col, Button, Input } from "reactstrap";
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

const TableContainer = ({
  columns,
  data,
  tableActions,
  isGlobalFilter,
  isAddOptions,
  isAddUserList,
  isAddRegionalOffice,
  isAddDistributor,
  handleUploadUser,
  handleBulkUpdateUser,
  isAddBroadCaster,
  isAddGenreList,
  isAddLanguageList,
  isAddChannelList,
  isAddBroadcasterBouquetList,
  isAddPackageList,
  handleBroadCasterClick,
  handleGenreClick,
  handleOrderClicks,
  handleUserClick,
  handleGroupPolicyClick,
  handleLanguageClick,
  handleChannelClick,
  handleBroadcasterBouquetClick,
  handlePackageClick,
  isUploadUser,
  handleUploadUserClick,
  isAddGpPolicyList,
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
}) => {
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

  // const getColumnWidth = (column) => {
  //   const defaultWidth = 100;
  //   return column.width || defaultWidth;
  // };
  return (
    <Fragment>
      <Row className="mb-2  ">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
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
          {isAddOptions && (
            <Col sm="7">
              <div className="text-sm-end">
                <Button
                  type="button"
                  color="primary"
                  className="btn mb-2 me-2"
                  onClick={handleOrderClicks}
                >
                  <i className="mdi mdi-plus me-1" />
                  Add New Order
                </Button>
              </div>
            </Col>
          )}
          {isAddUserList && <TableActionButtons tableActions={tableActions} />}
          {isAddRegionalOffice && (
            <TableActionButtons tableActions={tableActions} />
          )}
          {isAddDistributor && (
            <TableActionButtons tableActions={tableActions} />
          )}

          {isAddGpPolicyList && (
            <Col sm="12">
              <div className="text-sm-end">
                <Button
                  type="button"
                  color="primary"
                  className="btn mb-2 me-2"
                  onClick={handleGroupPolicyClick}
                >
                  <i className="mdi mdi-plus me-1" />
                  Create Group Policy
                </Button>
              </div>
            </Col>
          )}
          {isAddBroadCaster && (
            <Col sm="12">
              <div className="text-sm-end">
                <Button
                  type="button"
                  color="primary"
                  className="btn mb-2 me-2"
                  onClick={handleBroadCasterClick}
                >
                  <i className="mdi mdi-plus me-1" />
                  Create Broad Caster
                </Button>
              </div>
            </Col>
          )}
          {isAddGenreList && (
            <Col sm="12">
              <div className="text-sm-end">
                <Button
                  type="button"
                  color="primary"
                  className="btn mb-2 me-2"
                  onClick={handleGenreClick}
                >
                  <i className="mdi mdi-plus me-1" />
                  Create Genre
                </Button>
              </div>
            </Col>
          )}
          {isAddLanguageList && (
            <Col sm="12">
              <div className="text-sm-end">
                <Button
                  type="button"
                  color="primary"
                  className="btn mb-2 me-2"
                  onClick={handleLanguageClick}
                >
                  <i className="mdi mdi-plus me-1" />
                  Create Language
                </Button>
              </div>
            </Col>
          )}
          {isAddChannelList && (
            <Col sm="12">
              <div className="text-sm-end">
                <Button
                  type="button"
                  color="primary"
                  className="btn mb-2 me-2"
                  onClick={handleChannelClick}
                >
                  <i className="mdi mdi-plus me-1" />
                  Create Channel
                </Button>
              </div>
            </Col>
          )}
          {isUploadUser && (
            <Col sm="12">
              <div className="text-sm-end">
                <Button
                  type="button"
                  color="primary"
                  className="btn mb-2 me-2"
                  onClick={handleUploadUserClick}
                >
                  <i className="mdi mdi-plus me-1" />
                  Upload User
                </Button>
              </div>
            </Col>
          )}
          {isAddPackageList && (
            <Col sm="12">
              <div className="text-sm-end">
                <Button
                  type="button"
                  color="primary"
                  className="btn mb-2 me-2"
                  onClick={handlePackageClick}
                >
                  <i className="mdi mdi-plus me-1" />
                  Create Package
                </Button>
              </div>
            </Col>
          )}
          {isAddBroadcasterBouquetList && (
            <Col sm="12">
              <div className="text-sm-end">
                <Button
                  type="button"
                  color="primary"
                  className="btn mb-2 me-2"
                  onClick={handleBroadcasterBouquetClick}
                >
                  <i className="mdi mdi-plus me-1" />
                  Create Broadcaster Bouquet
                </Button>
              </div>
            </Col>
          )}
        </div>
      </Row>

      <div className="table-responsive react-table">
        <Table {...getTableProps()} className={tableClass}>
          <thead className={theadClass}>
            {headerGroups.map((headerGroup) => (
              <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    key={column.id}
                    className={column.isSort ? "sorting" : ""}
                  >
                    <div {...column.getSortByToggleProps()}>
                      {column.render("Header")}
                      {generateSortingIndicator(column)}
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
                  <tr>
                    {row.cells.map((cell) => {
                      return (
                        <td
                          key={cell.id}
                          {...cell.getCellProps()}
                          // style={{ width: `${getColumnWidth(cell.column)}px` }}
                        >
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
                  <li
                    className={
                      pageIndex === item ? "page-item active" : "page-item"
                    }
                  >
                    <Link
                      to="#"
                      className="page-link"
                      onClick={() => gotoPage(item)}
                    >
                      {item + 1}
                    </Link>
                  </li>
                </React.Fragment>
              ))}
              <li className={`page-item ${!canNextPage ? "disabled" : ""}`}>
                <Link to="#" className="page-link" onClick={nextPage}>
                  <i className="mdi mdi-chevron-right"></i>
                </Link>
              </li>
            </ul>
          </div>
        </Row>
      )}
    </Fragment>
  );
};

TableContainer.propTypes = {
  preGlobalFilteredRows: PropTypes.any,
};

export default TableContainer;
