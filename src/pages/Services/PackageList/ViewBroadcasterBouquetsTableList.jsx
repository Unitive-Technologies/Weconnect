import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import TableContainer from "../../../components/Common/TableContainer";
import {
  Card,
  CardBody,
  Col,
  Input,
  Row,
  Toast,
  ToastHeader,
  Modal,
  ModalBody,
  ModalHeader,
  ToastBody,
  ModalFooter,
  Form,
} from "reactstrap";
import { Link } from "react-router-dom";

const ViewBroadcasterBouquetsTableList = (props) => {
  // const { isOpen } = props
  const { isOpen, toggleViewBouquetPlus, data } = props;
  const columns = useMemo(
    () => [
      {
        Header: "*",
        disableFilters: true,
        filterable: true,
        Cell: () => {
          return (
            <>
              <i className="bx bx-bx bx-check"></i>
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
        Header: "Channel Count",
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
                  {"Channel Count"}
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
    ],
    []
  );

  const [showAddBouquetsPlus, setShowAddBouquetsPlus] = useState(false);

  const handleAddBouquetsPlus = () => {
    setShowAddBouquetsPlus(!showAddBouquetsPlus);
  };

  const casData = [];

  return (
    <Modal
      isOpen={isOpen}
      role="dialog"
      autoFocus={true}
      centered={true}
      className="exampleModal"
      tabIndex="-1"
      size="xl"
      toggle={toggleViewBouquetPlus}
    >
      <ModalHeader toggle={toggleViewBouquetPlus} tag="h4">
        Add Broadcaster Bouquets
      </ModalHeader>
      <ModalHeader tag="h6">
        **To Select row, Click <i className="bx bx-bx bx-check"></i>
      </ModalHeader>
      <ModalBody>
        <Card>
          <CardBody>
            <div
              className="position-fixed top-0 end-0 p-3"
              style={{ zIndex: "1005" }}
            >
              <Toast isOpen={showAddBouquetsPlus}>
                <ToastHeader toggle={handleAddBouquetsPlus}>
                  <i className="mdi mdi-alert-outline me-2"></i> Warning
                </ToastHeader>
                <ToastBody>Please select package definition</ToastBody>
              </Toast>
            </div>

            <TableContainer
              // isPagination={true}
              columns={columns}
              data={casData}
              tableClass="table align-middle table-nowrap table-hover"
              theadClass="table-light"
              // paginationDiv="col-sm-12 col-md-7"
              // pagination="pagination pagination-rounded justify-content-end mt-4"
            />
          </CardBody>

          <div
            style={{
              backgroundColor: "#fff",
              padding: "10px",
              width: "100%",
              boxSizing: "border-box",
            }}
          >
            <h6 style={{ textAlign: "left", margin: 0 }}>Total Items:</h6>
          </div>
          <div
            style={{
              backgroundColor: "#fff",
              padding: "10px",
              width: "100%",
              boxSizing: "border-box",
            }}
          >
            <h6 style={{ textAlign: "left", margin: 0 }}>
              *Click tick to select channels
            </h6>
          </div>
          <div
            style={{
              backgroundColor: "#fff",
              padding: "10px",
              width: "100%",
              boxSizing: "border-box",
            }}
          >
            <h6 style={{ textAlign: "left", margin: 0 }}>
              **HD packages can contain both types(HD & SD)
            </h6>
          </div>
          <Row>
            <Col>
              <ModalFooter>
                <button type="submit" className="btn btn-success save-user">
                  ADD
                </button>
              </ModalFooter>
            </Col>
          </Row>
        </Card>
      </ModalBody>
    </Modal>
  );
};

ViewBroadcasterBouquetsTableList.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default ViewBroadcasterBouquetsTableList;
