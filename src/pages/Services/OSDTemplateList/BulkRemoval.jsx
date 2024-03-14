import React, { useState, useMemo } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import {
  Col,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  Table,
  Card,
  CardBody,
} from "reactstrap";
import Templates from "./Templates";
import TableContainer from "../../../components/Common/TableContainer";
import AddOperators from "./AddOperators";
import { useFormik } from "formik";
import * as Yup from "yup";
import { getOSDTemplate as onGetOSDTemplate } from "/src/store/OSDTemplate/actions";

const BulkRemoval = (props) => {
  const { isOpen, toggle, selectedRows } = props;
  const [showAddOperator, setShowAddOperator] = useState(false);
  const [addOperatorsData, setAddOperatorsData] = useState([]);
  const [toggleSwitch, settoggleSwitch] = useState(true);
  const [selectedOperators, setSelectedOperators] = useState([]);
  const API_URL = "https://sms.unitch.in/api/index.php/v1";
  const toggleAddOperator = () => {
    setShowAddOperator(!showAddOperator);
  };

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
              <h5 className="font-size-14 mb-1">{reverseIndex}</h5>
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
              ></h5>
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
    ],
    []
  );

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      operator_ids: [],
      ref_ids: [],
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
          operator_ids: selectedOperators.map((operator) => operator.id),
          ref_ids: selectedRows.map((osd) => osd.id),
          type: 1,
        };

        console.log("newSetting:", JSON.stringify(newAssign));
        const token = "Bearer " + localStorage.getItem("temptoken");

        const response = await axios.put(
          `${API_URL}/operator-mapping/0?vr=web1.0`,
          newAssign,
          {
            headers: {
              Authorization: token,
            },
          }
        );

        console.log("Axios Response:", response);
        toggle();
        dispatch(onGetOSDTemplate());
        validation.resetForm();
      } catch (error) {
        console.error("Error in onSubmit:", error);
      }
    },
    onReset: () => {
      validation.setValues(validation.initialValues);
    },
  });

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
          Bulk Remove OSD Templates
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
              </div>{" "}
              <Card>
                <CardBody>
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
                </CardBody>
              </Card>
            </Row>

            <Row>
              <h6
                style={{
                  fontWeight: "bold",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                OSD Templates<span style={{ color: "red" }}>*</span>
              </h6>
              <p>
                ** To select row, click <i className="mdi mdi-check"></i>{" "}
              </p>
              <Templates selectedRows={selectedRows} />
            </Row>
            <Row>
              <Col sm="12">
                <div className="d-flex flex-wrap gap-2">
                  <button type="submit" className="btn btn-success save-user">
                    Remove
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

BulkRemoval.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default BulkRemoval;
