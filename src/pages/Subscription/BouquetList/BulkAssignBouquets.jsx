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
import Bouquets from "./Bouquets";

const BulkAssignBouquets = (props) => {
  const { isOpen, toggle, ncf, selectedRows } = props;
  const [showAddOperator, setShowAddOperator] = useState(false);
  const [addOperatorsData, setAddOperatorsData] = useState([]);
  const [toggleSwitch, settoggleSwitch] = useState(true);
  const [selectedRowNestedData, setSelectedRowNestedData] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [ncfData, setNcfData] = useState({});
  const [expiryDates, setExpiryDates] = useState(
    Array(selectedUsers.length).fill("")
  );
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
    },
    validationSchema: Yup.object({}),

    onSubmit: async (values) => {
      try {
        const newAssign = {
          // bouque_data: selectedUsers.map((user) =>  {
          //   "bouque_id":user.id,
          //   "rate_code": "",
          //   "is_refundable": 1 ,
          // }),
          bouque_data: [],
          bouque_ids: selectedRows.map((user) => user.id),
          operator_id: selectedUsers.map((user) => user.id),
        };

        console.log("newAssign:", JSON.stringify(newAssign));

        const token = "Bearer " + localStorage.getItem("temptoken");
        const response = await axios.post(
          `${API_URL}/operator-bouque?vr=web1.0`,
          newAssign,
          {
            headers: {
              Authorization: token,
            },
          }
        );

        console.log("Axios Response:", response);

        dispatch(onGetNcf());
        toggle();
        validation.resetForm();
      } catch (error) {
        console.error("Error in onSubmit:", error);
      }
    },

    onReset: () => {
      validation.setValues(validation.initialValues);
    },
  });

  // useEffect(() => {
  //   if (selectedRows) {
  //     setSelectedRowNestedData(selectedRows.additional_rates);
  //   }
  // }, [selectedRows]);
  return (
    <>
      {showAddOperator && (
        <AddOperators
          isOpen={Boolean(showAddOperator)}
          toggleClose={toggleAddOperator}
          data={addOperatorsData}
          setData={setAddOperatorsData}
          selectedRows={selectedRows}
          selectedUsers={selectedUsers}
          setSelectedUsers={setSelectedUsers}
          expiryDates={expiryDates}
          setExpiryDates={setExpiryDates}
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
          Bulk Assign Bouquets
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
            <Row style={{ padding: "20px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <p style={{ fontWeight: "bold" }}>
                  Operators<span style={{ color: "red" }}>*</span>
                </p>
              </div>
              <Table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Code</th>
                    <th>Type</th>
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
                      </tr>
                    ))}
                </tbody>
              </Table>
            </Row>

            <Row style={{ padding: "20px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <p style={{ fontWeight: "bold" }}>
                  Bouquets<span style={{ color: "red" }}>*</span>
                </p>
              </div>
              <p>
                ** To select row, click <i className="mdi mdi-check"></i>{" "}
              </p>
              <Bouquets selectedRows={selectedRows} />
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

BulkAssignBouquets.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default BulkAssignBouquets;
