import React, { useState, useMemo } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import TableContainer from "../../../components/Common/TableContainer";
import {
  Col,
  Input,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  Card,
  CardBody,
  Table,
} from "reactstrap";

import AddOperators from "./AddOperator";

const BulkAssigntoOperator = (props) => {
  const { isOpen, toggle, ncf, selectedRow } = props;
  const [showAddOperator, setShowAddOperator] = useState(false);
  const [addOperatorsData, setAddOperatorsData] = useState([]);
  const [toggleSwitch, settoggleSwitch] = useState(true);
  const API_URL = "https://sms.unitch.in/api/index.php/v1";
  const toggleAddOperator = () => {
    setShowAddOperator(!showAddOperator);
  };
  const columns = useMemo(
    () => [
      {
        Header: "*",
        disableFilters: true,
        id: "*",
        filterable: true,
        Cell: (cellProps) => {
          return <input type="checkbox" />;
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
                {}
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
              ></h5>
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
              ></h5>
            </>
          );
        },
      },
      {
        Header: "Expiry Date",
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
              ></h5>
            </>
          );
        },
      },
    ],
    []
  );

  return (
    <>
      {showAddOperator && (
        <AddOperators
          isOpen={Boolean(showAddOperator)}
          toggleClose={toggleAddOperator}
          data={addOperatorsData}
          setData={setAddOperatorsData}
          selectedRowId={selectedRow.id}
        />
      )}
      <Modal
        isOpen={isOpen}
        role="dialog"
        autoFocus={true}
        centered={true}
        className="exampleModal"
        tabIndex="-1"
        toggle={toggle}
        size="xl"
      >
        <ModalHeader toggle={toggle} tag="h4">
          Bulk Assign NCF
        </ModalHeader>
        <ModalBody>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              validation.handleSubmit();
              return false;
            }}
          >
            <Row>
              <Col lg={10}></Col>
              <Col lg={2}>
                <button
                  onClick={() => setShowAddOperator(true)}
                  type="button"
                  className="btn btn-success save-user mb-3"
                  disabled={!toggleSwitch}
                >
                  Add Operator
                </button>
              </Col>
            </Row>
            <Row>
              <Table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Code</th>
                    <th>Type</th>
                    <th>Expiry Date</th>
                  </tr>
                </thead>
                <tbody>
                  {console.log(
                    "...................selectedOperatorsdata from AddOperator:" +
                      JSON.stringify(addOperatorsData)
                  )}
                  {addOperatorsData &&
                    addOperatorsData.map((row, i) => (
                      <tr key={i}>
                        <td>{i + 1}</td>

                        <td>{row && row.name}</td>
                        <td>{row && row.code}</td>
                        <td>{row && row.type_lbl}</td>
                        <td>
                          <Input
                            type="date"
                            name="expirydate"
                            placeholder="Select Expiry Date"
                            onChange={(e) => setExpiryDate(e.target.value)}
                            value={expirydate}
                          />
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </Row>
            <Row>
              <div
                style={{
                  // margin: "20px 0px",
                  marginTop: "20px",
                  // marginBottom: "18px",
                  zIndex: 12000,
                  backgroundColor: "#fff",
                  width: "fit-content",
                  marginLeft: "40%",
                  position: "absolute",
                  padding: "0px 10px",
                }}
              >
                <p style={{ fontWeight: "bold" }}>Default NCF</p>
              </div>
              <Row
                style={{
                  position: "relative",
                  border: "1px solid #ced4da",
                  padding: "20px 0px",
                  margin: "30px 0px",
                }}
              >
                <Col lg={12}>
                  <Card>
                    <CardBody>
                      <div className="table-responsive">
                        <Table className="table mb-0">
                          <thead className="table-light">
                            <tr>
                              <th>#</th>
                              <th>Name</th>
                              <th>MRP</th>
                              <th>LCO Discount(%)</th>
                              <th>LCO Rate</th>
                              <th>Per Channel</th>
                              <th>Is Refundable</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <th scope="row">1</th>
                              <td style={{ maxWidth: 100 }}>
                                {selectedRow.name}
                              </td>
                              <td
                                style={{
                                  maxWidth: 200,
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  whiteSpace: "nowrap",
                                }}
                              >
                                {selectedRow.mrp}
                              </td>
                              <td>{selectedRow.lmo_discount}</td>
                              <td>{selectedRow.lmo_rate}</td>
                              <td>
                                {parseInt(selectedRow.calculate_per_channel) ===
                                1
                                  ? "YES"
                                  : "NO"}
                              </td>
                              <td>
                                {parseInt(selectedRow.is_refundable) === 1
                                  ? "YES"
                                  : "NO"}
                              </td>
                            </tr>
                          </tbody>
                        </Table>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Row>
            <Row>
              <div
                style={{
                  // margin: "20px 0px",
                  marginTop: "20px",
                  // marginBottom: "18px",
                  zIndex: 12000,
                  backgroundColor: "#fff",
                  width: "fit-content",
                  marginLeft: "40%",
                  position: "absolute",
                  padding: "0px 10px",
                }}
              >
                <p style={{ fontWeight: "bold" }}>
                  Mutiple NCF<span style={{ color: "red" }}>*</span>
                </p>
              </div>
              <Row
                style={{
                  // border: "1px solid #ced4da",
                  padding: "20px 0px",
                  margin: "20px 0px",
                }}
              >
                <p style={{}}>**To select row, click</p>
                <Col lg={12}>
                  <Card>
                    <CardBody>
                      <div className="table-responsive">
                        <Table className="table mb-0">
                          <thead className="table-light">
                            <tr>
                              <th>#</th>
                              <th>Name</th>
                              <th>MRP</th>
                              <th>LCO Discount(%)</th>
                              <th>LCO Rate</th>
                              <th>Per Channel</th>
                              <th>Is Refundable</th>
                            </tr>
                          </thead>
                          <tbody>
                            {selectedRow &&
                              selectedRow.additional_rates.map(
                                (item, index) => (
                                  <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td style={{ maxWidth: 100 }}>
                                      {item.name}
                                    </td>
                                    <td>{item.mrp}</td>
                                    <td>{selectedRow.lmo_discount}</td>
                                    <td>{selectedRow.lmo_rate}</td>
                                    <td>
                                      {parseInt(
                                        selectedRow.calculate_per_channel
                                      ) === 1
                                        ? "YES"
                                        : "NO"}
                                    </td>
                                    <td>
                                      {parseInt(selectedRow.is_refundable) === 1
                                        ? "YES"
                                        : "NO"}
                                    </td>
                                  </tr>
                                )
                              )}
                          </tbody>
                        </Table>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Row>
            <Row>
              <Col sm="12">
                <div className="d-flex flex-wrap gap-2">
                  <button type="submit" className="btn btn-success save-user">
                    Assign
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={() => {
                      validation.resetForm();
                      toggle();
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </Col>
            </Row>
          </Form>
        </ModalBody>
        {/* </Modal> */}
      </Modal>
    </>
  );
};

BulkAssigntoOperator.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default BulkAssigntoOperator;
