import React, { useMemo } from "react";
import PropTypes from "prop-types";
import TableContainer from "../../../components/Common/TableContainer";
import { Card, CardBody, Col, Input, Row } from "reactstrap";
import { Link } from "react-router-dom";

const ViewBroadcasterBouquets = (props) => {
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
                  {"Name"}
                </Link>
              </h5>
            </>
          );
        },
      },
      {
        Header: "Broadcaster",
        // accessor: "login",
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
                  {"Broadcaster"}
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
                  {"Type"}
                </Link>
              </h5>
            </>
          );
        },
      },
      {
        Header: "Channel Count",
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
                  {"Channel Count"}
                </Link>
              </h5>
            </>
          );
        },
      },
      {
        Header: "FTA",
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
                  {"FTA"}
                </Link>
              </h5>
            </>
          );
        },
      },
      {
        Header: "Rate",
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
                  {"rate"}
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

  const casData = [];
  return (
    <Card>
      <CardBody>
        <TableContainer
          // isPagination={true}
          columns={columns}
          data={casData}
          // isGlobalFilter={true}
          // isShowingPageLength={true}
          // customPageSize={50}
          tableClass="table align-middle table-nowrap table-hover"
          theadClass="table-light"
        // paginationDiv="col-sm-12 col-md-7"
        // pagination="pagination pagination-rounded justify-content-end mt-4"
        />
      </CardBody>

      <div style={{ display: "flex" }}>
        <Row
          style={{
            border: "1px solid #ced4da",
            padding: "5px 0px",
            margin: "1px 0px",
            width: "450px",
            height: "50px",
            display: "flex",
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              padding: "10px",
              width: "100%",
              boxSizing: "border-box",
            }}
          >
            <h6 style={{ textAlign: "left", margin: 0 }}>Total Channels:</h6>
          </div>
        </Row>
        <Row
          style={{
            border: "1px solid #ced4da",
            padding: "5px 0px",
            margin: "1px 0px",
            width: "250px",
            display: "flex",
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              padding: "10px",
              width: "100%",
              boxSizing: "border-box",
            }}
          >
            <h6 style={{ textAlign: "center", margin: 0 }}>Total:</h6>
          </div>
        </Row>
      </div>


    </Card>
  );
};

ViewBroadcasterBouquets.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default ViewBroadcasterBouquets;
