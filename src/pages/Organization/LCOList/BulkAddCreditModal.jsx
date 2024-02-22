import React, { useEffect, useState, useRef, useMemo } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import TableContainer from "../../../components/Common/TableContainer";
import {
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Label,
  FormFeedback,
  UncontrolledTooltip,
  Input,
  Form,
  CardTitle,
  CardSubtitle,
} from "reactstrap";
import { Link } from "react-router-dom";
import Dropzone from "react-dropzone";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { getLco as onGetLco } from "/src/store/lcolist/actions";

const BulkAddCreditModal = (props) => {
  const { isOpen, toggleAddCreditModal, lco } = props;
  const API_URL = "https://sms.unitch.in/api/index.php/v1";
  // const [tableData, setTableData] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [tableList, setTableList] = useState([]);
  const dispatch = useDispatch();

  const handleActive = (row) => {
    const isRowSelected = selectedUsers.some((user) => user.id === row.id);
    setTableList((prevTableList) =>
      prevTableList.filter((user) => user.id !== row.id)
    );
    if (isRowSelected) {
      setSelectedUsers((prevSelectedUsers) =>
        prevSelectedUsers.filter((user) => user.id !== row.id)
      );
    } else {
      setSelectedUsers((prevSelectedUsers) => [...prevSelectedUsers, row]);
    }
    // Ensure that row.original exists before accessing its properties
    if (row.original) {
      row.original.isSelected = !isRowSelected;
    }
  };

  const handleRemove = (row) => {
    if (selectedUsers) {
      setSelectedUsers((prevSelectedUsers) =>
        prevSelectedUsers.filter((user) => user.id !== row.id)
      );
      setTableList((prevTableList) =>
        prevTableList.map((user) => {
          if (user.id === row.id && user.original) {
            user.original.isSelected = false;
          }
          return user;
        })
      );
    }
  };

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      amount: "",
      remark: "",
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
        const newCredit = {
          operator_ids: selectedUsers.map((user) => user.id),
          amount: parseInt(values["amount"]),
          remark: values["remark"],
          mode: 0,
          wallet_type: 0,
        };

        console.log("newSetting:", JSON.stringify(newCredit));
        const token = "Bearer " + localStorage.getItem("temptoken");

        const response = await axios.post(
          `${API_URL}/operator-account/bulk-balance?vr=web1.0`,
          newCredit,
          {
            headers: {
              Authorization: token,
            },
          }
        );

        console.log("Axios Response:", response);

        toggleAddCreditModal();
        dispatch(onGetLco());

        validation.resetForm();
      } catch (error) {
        console.error("Error in onSubmit:", error);
      }
    },
    onReset: () => {
      validation.setValues(validation.initialValues);
    },
  });
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
        // accessor: "name",
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
                // onClick={() => {
                //   const userData = cellProps.row.original;
                //   toggleViewModal(userData);
                // }}
              >
                <Link className="text-dark" to="#">
                  {cellProps.row.original.name}
                </Link>
              </h5>
            </>
          );
        },
      },
      {
        Header: "Code",
        // accessor: "login",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <>
              <h5 className="font-size-14 mb-1">
                <Link className="text-dark" to="#">
                  {cellProps.row.original.username}
                </Link>
              </h5>
            </>
          );
        },
      },
      {
        Header: "Distributor",
        // accessor: "status",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <>
              <h5 className="font-size-14 mb-1">
                <Link className="text-dark" to="#">
                  {cellProps.row.original.status}
                </Link>
              </h5>
            </>
          );
        },
      },
      {
        Header: "Regional Office",
        // accessor: "type",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <>
              <h5 className="font-size-14 mb-1">
                <Link className="text-dark" to="#">
                  {cellProps.row.original.status}
                </Link>
              </h5>
            </>
          );
        },
      },
      {
        Header: "Balance",
        // accessor: "role",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <>
              <h5 className="font-size-14 mb-1">
                <Link className="text-dark" to="#">
                  {cellProps.row.original.balance}
                </Link>
              </h5>
            </>
          );
        },
      },
    ],
    []
  );

  const selOperColumn = useMemo(
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
        // accessor: "name",
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
                onClick={() => {
                  const userData = cellProps.row.original;
                  toggleViewModal(userData);
                }}
              >
                <Link className="text-dark" to="#">
                  {cellProps.row.original.name}
                </Link>
              </h5>
            </>
          );
        },
      },
      {
        Header: "Code",
        // accessor: "login",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <>
              <h5 className="font-size-14 mb-1">
                <Link className="text-dark" to="#">
                  {cellProps.row.original.username}
                </Link>
              </h5>
            </>
          );
        },
      },
      {
        Header: "Distributor",
        // accessor: "status",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <>
              <h5 className="font-size-14 mb-1">
                <Link className="text-dark" to="#">
                  {cellProps.row.original.status}
                </Link>
              </h5>
            </>
          );
        },
      },
      {
        Header: "Regional Office",
        // accessor: "type",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <>
              <h5 className="font-size-14 mb-1">
                <Link className="text-dark" to="#">
                  {cellProps.row.original.status}
                </Link>
              </h5>
            </>
          );
        },
      },
      {
        Header: "..",
        Cell: (cellProps) => {
          return (
            <i
              className="dripicons-tag-delete"
              onClick={() => handleRemove(cellProps.row.original)}
            />
          );
        },
      },
    ],
    []
  );
  const getAllLCO = async (e) => {
    try {
      const token = "Bearer " + localStorage.getItem("temptoken");

      const response = await axios.get(
        `${API_URL}/operator?expand=balance,balance_h,created_by_lbl,distributor_lbl,status_lbl,branch_lbl,username&filter[type]=3&page=1&per-page=50&vr=web1.0`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setTableList(response.data.data);
      console.log("response in useEffect:" + JSON.stringify(response));
    } catch (error) {
      console.error("Error fetching history data:", error);
    }
  };
  useEffect(() => {
    getAllLCO();
  }, []);

  // useEffect(() => {
  //   if (lco) {
  //     setTableList(lco);
  //   }
  // }, []);
  return (
    <Modal
      isOpen={isOpen}
      size="xl"
      role="dialog"
      autoFocus={true}
      centered={true}
      className="exampleModal"
      tabIndex="-1"
      toggle={toggleAddCreditModal}
    >
      <ModalHeader toggle={toggleAddCreditModal} tag="h4">
        Bulk Add Credit to LCO
      </ModalHeader>
      <ModalBody>
        <Card>
          <CardBody>
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                validation.handleSubmit();
                return false;
              }}
            >
              <Row>
                <Col lg={4}>
                  <div className="mb-3">
                    <Label className="form-label">
                      Credit Amount<span style={{ color: "red" }}>*</span>
                    </Label>
                    <Input
                      name="amount"
                      label="Credit Amount"
                      placeholder="Enter Credit Amount"
                      type="number"
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.amount || ""}
                      invalid={
                        validation.touched.amount && validation.errors.amount
                          ? true
                          : false
                      }
                    />
                    {validation.touched.amount && validation.errors.amount ? (
                      <FormFeedback type="invalid">
                        {validation.errors.amount}
                      </FormFeedback>
                    ) : null}
                  </div>
                </Col>
                <Col lg={4}>
                  <div className="mb-3">
                    <Label className="form-label">
                      Remark<span style={{ color: "red" }}>*</span>
                    </Label>
                    <Input
                      name="remark"
                      label="Remark"
                      placeholder="Enter Remark"
                      type="textarea"
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.remark || ""}
                      invalid={
                        validation.touched.remark && validation.errors.remark
                          ? true
                          : false
                      }
                    />
                    {validation.touched.remark && validation.errors.remark ? (
                      <FormFeedback type="invalid">
                        {validation.errors.remark}
                      </FormFeedback>
                    ) : null}
                  </div>
                </Col>
              </Row>
              <TableContainer
                isPagination={true}
                columns={columns}
                data={tableList && tableList}
                //   isGlobalFilter={true}
                isShowingPageLength={true}
                customPageSize={5}
                handleRowClick={(row) => {
                  handleActive(row);
                }}
                tableClass="table align-middle table-nowrap table-hover"
                theadClass="table-light"
                paginationDiv="col-sm-12 col-md-7"
                pagination="pagination pagination-rounded justify-content-end mt-4"
              />
              <div
                style={{
                  // margin: "20px 0px",
                  marginTop: "20px",
                  marginBottom: "-18px",
                  zIndex: 12000,
                  backgroundColor: "#fff",
                  width: "fit-content",
                  marginLeft: "40%",
                  position: "absolute",
                  padding: "0px 10px",
                }}
              >
                {" "}
                <h5 style={{}}>Selected Operators</h5>
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
                  <TableContainer
                    isPagination={true}
                    columns={selOperColumn}
                    data={selectedUsers}
                    //   isGlobalFilter={true}
                    isShowingPageLength={true}
                    customPageSize={50}
                    tableClass="table align-middle table-nowrap table-hover"
                    theadClass="table-light"
                    paginationDiv="col-sm-12 col-md-7"
                    pagination="pagination pagination-rounded justify-content-end mt-4"
                  />
                </Col>
              </Row>
              <Row>
                <ModalFooter>
                  <button type="submit" className="btn btn-success save-user">
                    Save
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={() => {
                      validation.resetForm();
                      toggleAddCreditModal();
                    }}
                  >
                    Cancel
                  </button>
                </ModalFooter>
              </Row>
            </Form>
          </CardBody>
        </Card>
      </ModalBody>
      {/* <ModalFooter>
        <button type="submit" className="btn btn-success save-user">
          Save
        </button>
        <button
          type="button"
          className="btn btn-outline-danger"
          onClick={() => {
            validation.resetForm();
            toggleAddCreditModal();
          }}
        >
          Cancel
        </button>
      </ModalFooter> */}
    </Modal>
  );
};

BulkAddCreditModal.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default BulkAddCreditModal;
