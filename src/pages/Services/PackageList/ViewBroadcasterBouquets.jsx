import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import TableContainer from "../../../components/Common/TableContainer";
import {
  Card, CardBody, Col, Input, Row, Toast,
  ToastHeader,
  ToastBody,
} from "reactstrap";
import { Link } from "react-router-dom";
import ViewBroadcasterBouquetsTableList from "./ViewBroadcasterBouquetsTableList";

const ViewBroadcasterBouquets = (props) => {

  const { showEditChannel } = props

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

  const [showViewChannelsPlus, setShowViewChannelsPlus] = useState(false);

  const handleViewChannelsPlus = () => {
    setShowViewChannelsPlus(!showViewChannelsPlus);
  };

  const casData = [];
  return (
    <Card>
      <CardBody>
        <Row>
          <Col lg={10}>
          </Col>
          <Col lg={2}>
            <div className="mb-3">
              <button disabled={!showEditChannel} type="button" onClick={handleViewChannelsPlus} className="btn btn-primary d-flex justify-content-end">
                <i className="mdi mdi-plus ms-1" style={{ fontSize: 20, textAlign: "right" }}></i>
              </button>
            </div>
          </Col>
        </Row>
        <ViewBroadcasterBouquetsTableList isOpen={showViewChannelsPlus} handleAddChannelsTable={() => setShowViewChannelsPlus(false)} />
        {/* <div
          className="position-fixed top-0 end-0 p-3"
          style={{ zIndex: "1005" }}
        >
          <Toast isOpen={showAddChannelsPlus}>
            <ToastHeader toggle={handleAddChannelsPlus}>
              <i className="mdi mdi-alert-outline me-2"></i> Warning
            </ToastHeader>
            <ToastBody>Please select package definition</ToastBody>
          </Toast>
        </div> */}


        <TableContainer
          columns={columns}
          data={casData}
          tableClass="table align-middle table-nowrap table-hover"
          theadClass="table-light"
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
