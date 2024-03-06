import React, { useMemo } from "react";
import PropTypes from "prop-types";
import TableContainer from "../../../components/Common/TableContainer";
import { Card, CardBody, Table } from "reactstrap";
import { Link } from "react-router-dom";

const AdditionalMRP = ({ additionalRates }) => {
  console.log(
    "additionalRates in additionalMrpTable:" + JSON.stringify(additionalRates)
  );
  const columns = useMemo(
    () => [
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
                  {cellProps.row.original.rate_code}
                </Link>
              </h5>
            </>
          );
        },
      },
      {
        Header: "LCO Discount(%)",
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
                  {cellProps.row.original.mrp_data.dis_pcc}
                </Link>
              </h5>
            </>
          );
        },
      },
      {
        Header: "LCO Rate(%)",
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
                  {cellProps.row.original.mrp_data.lmo_pcc}
                </Link>
              </h5>
            </>
          );
        },
      },
      {
        Header: "Rates",
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
                  {"LCO Rate"}
                </Link>
              </h5>
            </>
          );
        },
      },
      {
        Header: "$",
        // accessor: "type",
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
                  {"$"}
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
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>LCO Discount(%)</th>
              <th>LCO Rate</th>
              <th>Rates</th>
              <th>$</th>
            </tr>
          </thead>

          <tbody>
            {additionalRates &&
              additionalRates.map((row, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{row.rate_code}</td>
                  <td>{row.mrp_data.dis_pcc}</td>
                  <td>{row.mrp_data.lmo_pcc}</td>
                  <td>
                    {row.mrp_data.rate && (
                      <Table>
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Period</th>
                            <th>Price</th>
                            <th>Tax</th>
                            <th>Total</th>
                            <th>Refundable</th>
                            <th>Free Days</th>
                            <th>$</th>
                          </tr>
                        </thead>

                        <tbody>
                          {row.mrp_data.rate.map((insideRow, i) => (
                            <tr key={i}>
                              <td>1Year</td>
                              <td>{insideRow.price}</td>
                              <td></td>
                              <td>{insideRow.total_amount}</td>
                              <td>{insideRow.is_refundable}</td>
                              <td>{insideRow.free_days}</td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
        <TableContainer
          isPagination={true}
          columns={columns}
          data={additionalRates && additionalRates}
          // isGlobalFilter={true}
          isShowingPageLength={true}
          // customPageSize={50}
          tableClass="table align-middle table-nowrap table-hover"
          theadClass="table-light"
          paginationDiv="col-sm-12 col-md-7"
          pagination="pagination pagination-rounded justify-content-end mt-4"
        />
      </CardBody>
    </Card>
  );
};

AdditionalMRP.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default AdditionalMRP;
