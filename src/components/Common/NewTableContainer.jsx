import React, { Fragment, useMemo, useEffect } from "react";
import PropTypes from "prop-types";

import {
  useTable,
  useGlobalFilter,
  useSortBy,
  useFilters,
  useExpanded,
  usePagination,
} from "react-table";
import "flatpickr/dist/themes/material_blue.css";
import FlatPickr from "react-flatpickr";
import * as Yup from "yup";
import { useFormik } from "formik";
import moment from "moment";
import { Col, Row, Table } from "reactstrap";
import { Filter, DefaultColumnFilter } from "./filters";
import { Link } from "react-router-dom";
import JobListGlobalFilter from "./GlobalSearchFilter";
import TableActionButtons from "./TableActionButtons";
import NewPagination from "./NewPagination";
import Loader from "./Loader";

const NewTableContainer = ({
  columns,
  data,
  tableActions,
  isGlobalFilter,
  isShowTableActionButtons,
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
  currentPage,
  totalRows,
  totalPageCount,
  rowsPerPage,
  isLoading,
  pageChangeHandler,
  // manualPagination = false,
}) => {
  // convert currentPage to integer
  // const columnData = useMemo(() => columns, [columns]);
  // const rowData = data;
  // console the current time
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    // pageCount,
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
      // manualPagination,
      defaultColumn: { Filter: DefaultColumnFilter },
      initialState: {
        pageIndex: currentPage - 1,
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
  const pageCount = Math.ceil(totalRows / rowsPerPage);

  const generateSortingIndicator = (column) => {
    return column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : "";
  };

  const onChangeInSelect = (event) => {
    setPageSize(parseInt(event.target.value));
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
                {[10, 20, 30, 50, 100, 200, 500].map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                    Show {pageSize}
                  </option>
                ))}
              </select>
            </Col>
          )}
          {isShowTableActionButtons && (
            <TableActionButtons tableActions={tableActions} />
          )}
        </div>
      </Row>
      {isLoading ? (
        <h2>Loading...</h2>
      ) : (
        <div className="table-responsive react-table">
          <Table {...getTableProps()} className={tableClass}>
            <thead className={theadClass}>
              {headerGroups.map((headerGroup) => (
                <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps()}
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
                    <tr onClick={() => handleRowClick(row.original)}>
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
      )}

      <NewPagination
        pageChangeHandler={pageChangeHandler}
        rowsPerPage={rowsPerPage}
        totalRows={totalRows}
        currentPage={parseInt(currentPage)}
        paginationDiv={paginationDiv}
        pagination={pagination}
        pageCount={pageCount}
        pageIndex={state.pageIndex}
      />
    </Fragment>
  );
};

NewTableContainer.propTypes = {
  preGlobalFilteredRows: PropTypes.any,
};

export default NewTableContainer;
