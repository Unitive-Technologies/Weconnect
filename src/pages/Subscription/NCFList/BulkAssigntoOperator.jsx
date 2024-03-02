import React, { useState, useMemo, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import TableContainer from "../../../components/Common/TableContainer";
import { Link } from "react-router-dom";
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
import { getNcf as onGetNcf } from "/src/store/actions";
import AddOperators from "./AddOperator";

const BulkAssigntoOperator = (props) => {
  const { isOpen, toggle, ncf, selectedRow } = props;
  const [showAddOperator, setShowAddOperator] = useState(false);
  const [addOperatorsData, setAddOperatorsData] = useState([]);
  const [toggleSwitch, settoggleSwitch] = useState(true);
  const [selectedRowNestedData, setSelectedRowNestedData] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [ncfData, setNcfData] = useState({});
  const [expiryDate, setExpiryDate] = useState("");
  const API_URL = "https://sms.unitch.in/api/index.php/v1";
  const toggleAddOperator = () => {
    setShowAddOperator(!showAddOperator);
  };

  const handleRowClick = (rowData) => {
    setNcfData(rowData);
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
                {cellProps.row.original.name}
              </h5>
            </>
          );
        },
      },
      {
        Header: "MRP",
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
                {cellProps.row.original.mrp}
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
                {cellProps.row.original.lmo_discount}
              </h5>
            </>
          );
        },
      },
      {
        Header: "LCO Rate",
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
                {" "}
                {cellProps.row.original.lmo_rate}
              </h5>
            </>
          );
        },
      },
      {
        Header: "Per Channel",
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
                {" "}
                {parseInt(cellProps.row.original.calculate_per_channel) === 1
                  ? "YES"
                  : "NO"}
              </h5>
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
              <h5
                style={{
                  maxWidth: 200,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
                className="font-size-14 mb-1"
              >
                {parseInt(cellProps.row.original.is_refundable) === 1
                  ? "YES"
                  : "NO"}
              </h5>
            </>
          );
        },
      },
    ],
    []
  );

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      operator_id: [],
      // scheme_ids: [],
    },
    validationSchema: Yup.object({
      // setting: Yup.object({
      //   bulk_limit: Yup.string().required("Please Enter Bulk Limit"),
      //   allowed_ips: Yup.string().required("Please Enter allowed client ips"),
      //   enabled_pay_modes: Yup.array()
      //     .of(Yup.number().required("Please Select Pay Modes"))
      //     .min(1, "Please Select at least one Pay Mode"),
      // }),
    }),

    onSubmit: async (values) => {
      try {
        const newAssign = {
          default: 0,
          forceFull: 1,
          replace: 0,
          name: ncfData.name,
          ncf_id: selectedRow.id,
          operator_expiry: addOperatorsData.reduce((acc, single) => {
            acc[single.expiryDate] = single.id;
            return acc;
          }, {}),
          // {2024-03-20: [2001], 2024-03-26: [1998]},
          operator_id: selectedUsers.map((user) => user.id),
        };

        console.log("newSetting:", JSON.stringify(newAssign));
        const token = "Bearer " + localStorage.getItem("temptoken");

        const response = await axios.put(
          `${API_URL}/ncf-rates/assign?vr=web1.0`,
          newAssign,
          {
            headers: {
              Authorization: token,
            },
          }
        );

        console.log("Axios Response:", response);
        toggle();
        dispatch(onGetNcf());
        validation.resetForm();
      } catch (error) {
        console.error("Error in onSubmit:", error);
      }
    },
    onReset: () => {
      validation.setValues(validation.initialValues);
    },
  });

  useEffect(() => {
    if (selectedRow) {
      setSelectedRowNestedData(selectedRow.additional_rates);
    }
  }, [selectedRow]);
  return (
    <>
      {showAddOperator && (
        <AddOperators
          isOpen={Boolean(showAddOperator)}
          toggleClose={toggleAddOperator}
          data={addOperatorsData}
          setData={setAddOperatorsData}
          selectedRowId={selectedRow.id}
          selectedUsers={selectedUsers}
          setSelectedUsers={setSelectedUsers}
          expiryDate={expiryDate}
          setExpiryDate={setExpiryDate}
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
                        <td>{row && row.expiryDate}</td>
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
                            {selectedRow && (
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
                      <TableContainer
                        isPagination={true}
                        columns={columns}
                        data={selectedRowNestedData}
                        handleRowClick={(row) => {
                          handleRowClick(row);
                        }}
                        isGlobalFilter={true}
                        isShowingPageLength={true}
                        customPageSize={10}
                        tableClass="table align-middle table-nowrap table-hover"
                        theadClass="table-light"
                        paginationDiv="col-sm-12 col-md-7"
                        pagination="pagination pagination-rounded justify-content-end mt-4"
                      />
                      {/* <div className="table-responsive">
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
                          {console.log(
                            "selectedRow:" + JSON.stringify(selectedRow)
                          )}
                          {console.log(
                            "selectedRowNestedData:" +
                              JSON.stringify(selectedRowNestedData)
                          )}
                          <tbody>
                            {selectedRow &&
                              selectedRowNestedData.map((item, index) => (
                                <tr key={index}>
                                  <th scope="row">{index + 1}</th>
                                  <td style={{ maxWidth: 100 }}>{item.name}</td>
                                  <td>{item.mrp}</td>
                                  <td>{item.lmo_discount}</td>
                                  <td>{item.lmo_rate}</td>
                                  <td>
                                    {parseInt(item.calculate_per_channel) === 1
                                      ? "YES"
                                      : "NO"}
                                  </td>
                                  <td>
                                    {parseInt(item.is_refundable) === 1
                                      ? "YES"
                                      : "NO"}
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </Table>
                      </div> */}
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
