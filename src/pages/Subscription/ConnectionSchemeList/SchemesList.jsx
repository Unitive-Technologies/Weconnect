import React, { useMemo } from "react";
import PropTypes from "prop-types";
import TableContainer from "../../../components/Common/TableContainer";
import { Card, CardBody, Table } from "reactstrap";
import { Link } from "react-router-dom";

const SchemesList = ({ selectedRows }) => {
  console.log("selectedRow in schemeslist:" + JSON.stringify(selectedRows));
  const columns = useMemo(
    () => [
      {
        Header: "*",
        disableFilters: true,
        filterable: true,
        Cell: () => {
          return (
            <>
              <i className="mdi mdi-check"></i>
            </>
          );
        },
      },
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
        Header: "Hardware Charges",
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
                  {cellProps.row.original.hardware_charge}
                </Link>
              </h5>
            </>
          );
        },
      },
      {
        Header: "Installation charges",
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
                  {cellProps.row.original.installation_charge}
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
    ],
    []
  );

  return (
    <Card>
      <CardBody>
        {/* <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Code</th>
              <th>Type</th>
              <th>Hardware Charge</th>
              <th>Installation Charge</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {
              selectedRow && (
                // selectedRow.map((row, i) => (
                <tr>
                  <td>1</td>

                  <td>{selectedRow.name}</td>
                  <td>{selectedRow.code}</td>
                  <td>{selectedRow.boxtype_lbl}</td>
                  <td>{selectedRow.hardware_charge}</td>
                  <td>{selectedRow.installation_charge}</td>
                  <td>{selectedRow.status_lbl}</td>
                </tr>
              )
              // ))
            }
          </tbody>
        </Table> */}
        <TableContainer
          isPagination={true}
          columns={columns}
          data={selectedRows}
          // isGlobalFilter={true}
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

SchemesList.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default SchemesList;
