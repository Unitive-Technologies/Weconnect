import React, { useMemo } from "react";
import PropTypes from "prop-types";
import TableContainer from "../../../components/Common/TableContainer";
import { Card, CardBody, Table } from "reactstrap";
import { Link } from "react-router-dom";

const AdditionalMRP = ({ additionalRates, rechargeperiod }) => {
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
              additionalRates.map((row, index) => (
                <tr key={row.rate_code}>
                  <td>{index + 1}</td>
                  <td>{row.rate_code}</td>
                  <td>{row.mrp_data.dis_pcc}</td>
                  <td>{row.mrp_data.lmo_pcc}</td>
                  <td>
                    {row.rate && (
                      <Table>
                        <thead>
                          <tr>
                            {/* <th>#</th> */}
                            <th>Period</th>
                            <th>Price</th>
                            <th>Tax</th>
                            <th>Total</th>
                            <th>Refundable</th>
                            <th>Free Days</th>
                          </tr>
                        </thead>
                        <tbody>
                          {row.rate.map((insideRow, i) => (
                            <tr key={i}>
                              {/* <td>{i + 1}</td> */}
                              <td>{insideRow.period}</td>
                              <td>{parseFloat(insideRow.price).toFixed(2)}</td>
                              <td>{parseFloat(insideRow.tax).toFixed(2)}</td>
                              <td>
                                {parseFloat(insideRow.total_amount).toFixed(2)}
                              </td>
                              <td>{insideRow.is_refundable ? "Yes" : "No"}</td>
                              <td>{insideRow.free_days}</td>
                              <td>{/* Render $ value */}</td>
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
      </CardBody>
    </Card>
  );
};

AdditionalMRP.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default AdditionalMRP;
