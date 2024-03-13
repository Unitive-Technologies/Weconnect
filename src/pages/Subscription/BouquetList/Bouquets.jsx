import React, { useMemo } from "react";
import PropTypes from "prop-types";
import TableContainer from "../../../components/Common/TableContainer";
import { Card, CardBody, Table, Input } from "reactstrap";
import { Link } from "react-router-dom";

const Bouquets = ({
  selectedRows,
  rate,
  setRate,
  isRefundable,
  setIsRefundable,
}) => {
  console.log("selectedRows in Bouquets:" + JSON.stringify(selectedRows));
  const columns = useMemo(
    () => [
      // {
      //   Header: "*",
      //   disableFilters: true,
      //   filterable: true,
      //   Cell: () => {
      //     return (
      //       <>
      //         <i className="mdi mdi-check"></i>
      //       </>
      //     );
      //   },
      // },
      {
        Header: "#",
        disableFilters: true,
        filterable: true,
        Cell: (cellProps) => {
          const totalRows = cellProps.rows.length;
          const reverseIndex = totalRows - cellProps.row.index;

          return (
            <>
              <h5 className="font-size-14 mb-1">
                <Link className="text-dark" to="#">
                  {reverseIndex}
                </Link>
              </h5>
            </>
          );
        },
      },

      {
        Header: "Name",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <>
              <h5
                style={{
                  maxWidth: 200,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
                className="font-size-14 mb-1"
              >
                <Link className="text-dark" to="#">
                  {cellProps.row.original.name}
                </Link>
              </h5>
            </>
          );
        },
      },
      {
        Header: "Code",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <>
              <h5
                style={{
                  maxWidth: 200,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
                className="font-size-14 mb-1"
              >
                <Link className="text-dark" to="#">
                  {cellProps.row.original.code}
                </Link>
              </h5>
            </>
          );
        },
      },
      {
        Header: "Type",
        // accessor: "status",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <>
              <h5
                style={{
                  maxWidth: 200,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
                className="font-size-14 mb-1"
              >
                <Link className="text-dark" to="#">
                  {cellProps.row.original.boxtype_lbl}
                </Link>
              </h5>
            </>
          );
        },
      },
      {
        Header: "HD/SD",
        // accessor: "status",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <>
              <h5
                style={{
                  maxWidth: 200,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
                className="font-size-14 mb-1"
              >
                <Link className="text-dark" to="#">
                  {cellProps.row.original.type_lbl}
                </Link>
              </h5>
            </>
          );
        },
      },
      {
        Header: "Status",
        // accessor: "status",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <>
              <h5
                style={{
                  maxWidth: 200,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
                className="font-size-14 mb-1"
              >
                <Link className="text-dark" to="#">
                  {cellProps.row.original.status_lbl}
                </Link>
              </h5>
            </>
          );
        },
      },
      {
        Header: "SelectRate",
        // accessor: "status",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <>
              <Input
                name="rate"
                type="select"
                placeholder="Select Stop Other"
                className="form-select"
                onChange={(e) => setRate(e.target.value)}
                value={rate}
              >
                <option value="0">No</option>
                <option value="1">Yes</option>
              </Input>
            </>
          );
        },
      },
      {
        Header: "Is Refundable",
        // accessor: "status",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <>
              <Input
                name="isRefundable"
                type="select"
                placeholder="Select Stop Other"
                className="form-select"
                onChange={(e) => setIsRefundable(e.target.value)}
                value={isRefundable}
              >
                <option value="0">No</option>
                <option value="1">Yes</option>
              </Input>
            </>
          );
        },
      },
    ],
    [selectedRows]
  );

  return (
    <Card>
      <CardBody>
        <TableContainer
          isPagination={true}
          columns={columns}
          data={selectedRows}
          //   isGlobalFilter={true}
          isShowingPageLength={true}
          customPageSize={8}
          tableClass="table align-middle table-nowrap table-hover"
          theadClass="table-light"
          paginationDiv="col-sm-12 col-md-7"
          pagination="pagination pagination-rounded justify-content-end mt-4"
        />
      </CardBody>
    </Card>
  );
};

Bouquets.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default Bouquets;
