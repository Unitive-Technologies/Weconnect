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
import { getBouquet as onGetBouquets } from "/src/store/actions";
import AddOperators from "./AddOperator";
import Bouquets from "./Bouquets";

const BulkAssignBouquets = (props) => {
  const API_URL = "https://sms.unitch.in/api/index.php/v1";
  const { isOpen, toggle, ncf, selectedRows } = props;
  const [showAddOperator, setShowAddOperator] = useState(false);
  const [addOperatorsData, setAddOperatorsData] = useState([]);
  const [toggleSwitch, settoggleSwitch] = useState(true);
  const [selectedRowNestedData, setSelectedRowNestedData] = useState([]);
  const [selectedOperators, setSelectedOperators] = useState([]);
  const [ncfData, setNcfData] = useState({});
  const [rates, setRates] = useState({});
  const [refundables, setRefundables] = useState({});
  const [data, setData] = useState([]);
  const [bouquetData, setBouquetData] = useState([]);

  const handleRateChange = (e, index) => {
    const { value } = e.target;
    console.log("Selected Rate:", value);
    console.log("Row Index:", index);
    setRates((prevRates) => ({ ...prevRates, [index]: value }));
  };

  const handleIsRefundableChange = (e, index) => {
    const { value } = e.target;
    console.log("Selected IsRefundable:", typeof value, value);
    console.log("Row Index:", index);
    setRefundables((prevRefundables) => ({
      ...prevRefundables,
      [index]: value,
    }));
  };

  const toggleAddOperator = () => {
    setShowAddOperator(!showAddOperator);
  };

  const handleRowClick = (rowData) => {
    setNcfData(rowData);
  };
  const columns = useMemo(
    () => [
      // {
      //   Header: "*",
      //   disableFilters: true,
      //   id: "*",
      //   filterable: true,
      //   Cell: (cellProps) => {
      //     return <input type="checkbox" />;
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
          bouque_data: bouquetData,
          bouque_ids: selectedRows.map((row) => row.id),
          operator_id: selectedOperators.map((operator) => operator.id),
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

        toggle();
        validation.resetForm();
        // selectedRows([]);
        // selectedOperators([]);
        dispatch(onGetBouquets());
      } catch (error) {
        console.error("Error in onSubmit:", error);
      }
    },

    onReset: () => {
      validation.setValues(validation.initialValues);
    },
  });

  useEffect(() => {
    if (selectedRows) {
      setData(selectedRows);
    }
  }, [selectedRows]);

  useEffect(() => {
    setBouquetData(
      data.map((row, i) => ({
        bouque_id: row.id,
        rate_code: rates[i],
        is_refundable: parseInt(refundables[i]),
      }))
    );
  }, [data]);
  return (
    <>
      {showAddOperator && (
        <AddOperators
          isOpen={Boolean(showAddOperator)}
          toggleClose={toggleAddOperator}
          data={addOperatorsData}
          setData={setAddOperatorsData}
          selectedRows={selectedRows}
          selectedOperators={selectedOperators}
          setSelectedOperators={setSelectedOperators}
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
              {/* <Bouquets
                selectedRows={selectedRows}
                rate={rate}
                setRate={setRate}
                isRefundable={isRefundable}
                setIsRefundable={setIsRefundable}
              /> */}
              <Table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Code</th>
                    <th>Type</th>
                    <th>HD/SD</th>
                    <th>Status</th>
                    <th>SelectRate</th>
                    <th>Is Refundable</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedRows &&
                    selectedRows.map((row, i) => (
                      <tr key={i}>
                        <td>{i + 1}</td>

                        <td>{row && row.name}</td>
                        <td>{row && row.code}</td>
                        <td>{row && row.boxtype_lbl}</td>
                        <td>{row && row.type_lbl}</td>
                        <td>{row && row.status_lbl}</td>
                        <td>
                          <Input
                            name="rate"
                            type="select"
                            placeholder={row.placeholder}
                            className="form-select"
                            onChange={(e) => handleRateChange(e, i)}
                            value={rates[i] || ""}
                          >
                            <option value="">Default</option>
                            {row.additional_rates &&
                              row.additional_rates.map((rate) => (
                                <option key={rate.id} value={rate.rate_code}>
                                  {rate.rate_code}
                                </option>
                              ))}
                          </Input>
                        </td>
                        <td>
                          <Input
                            name="isRefundable"
                            type="select"
                            placeholder="Select Stop Other"
                            className="form-select"
                            onChange={(e) => handleIsRefundableChange(e, i)}
                            value={refundables[i] || ""}
                          >
                            <option value="0">No</option>
                            <option value="1">Yes</option>
                          </Input>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
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
