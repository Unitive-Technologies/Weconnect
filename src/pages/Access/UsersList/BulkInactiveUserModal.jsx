import React, { useEffect, useState, useRef, useMemo } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import TableContainer from "../../../components/Common/TableContainer";
import {
  Badge,
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
  FormFeedback,
  UncontrolledTooltip,
  Input,
  Form,
  Toast,
  ToastBody,
  ToastHeader,
  CardTitle,
  CardSubtitle,
} from "reactstrap";
import { Link } from "react-router-dom";
import Dropzone from "react-dropzone";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import {
  updateUser as onUpdateUser,
  getUsers as onGetUsers,
} from "/src/store/users/actions";

const BulkInactiveUserModal = (props) => {
  const { isOpen, handleBulkInactiveUser, users } = props;
  const API_URL = "https://sms.unitch.in/api/index.php/v1";

  const dispatch = useDispatch();
  const [tableList, setTableList] = useState([]);

  const [selectedStatusToSet, setSelectedStatusToSet] = useState("active");
  // const [filteredActiveBlockUsers, setFilteredActiveBlockUsers] = useState([]);
  // const [filteredInActiveUsers, setFilteredInActiveUsers] = useState([]);
  // const [filteredActiveInactiveUsers, setFilteredActiveInactiveUsers] =
  //   useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const [showWarning, setShowWarning] = useState(false);
  const [showError, setShowError] = useState(false);
  const handleError = () => {
    setShowError(!showError);
  };
  const handleWarning = () => {
    setShowWarning(!showWarning);
  };

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

  const handleStatusChange = async (e) => {
    try {
      const selectedStatus = e.target.value;
      setSelectedStatusToSet(selectedStatus);
      validation.handleChange(e);
      console.log("selectedStatus:", selectedStatus);

      const token = "Bearer " + localStorage.getItem("temptoken");
      let statusFilters = "";
      switch (selectedStatus) {
        case "active":
          statusFilters = "0";
          break;
        case "inactive":
          statusFilters = "1,-7";
          break;
        case "block":
          statusFilters = "0,1";
          break;
        case "unblock":
          statusFilters = "-7";
          break;
        default:
          statusFilters = "0";
      }
      const response = await axios.get(
        `${API_URL}/user?expand=role_lbl,status_lbl,type_lbl,operator_lbl,created_by_lbl,parent_lbl&notfilter[id]=2&filter[status]=${statusFilters}&filter[role]=4&page=1&per-page=500&vr=web1.0`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      setTableList(response.data.data);
    } catch (error) {
      console.error("Error in handleStatusChange:", error);
    }
  };

  // useEffect(() => {
  //   if (selectedStatusToSet === "inactive") {
  //     const filteredActiveBlockData = users.filter(
  //       (user) => parseInt(user.status) === -7 || parseInt(user.status) === 1
  //     );
  //     setTableList(filteredActiveBlockData);
  //   } else if (selectedStatusToSet === "active") {
  //     const filteredInActiveData = users.filter(
  //       (user) => parseInt(user.status) === 0
  //     );
  //     setTableList(filteredInActiveData);
  //   } else if (selectedStatusToSet === "block") {
  //     const filteredActiveInactiveData = users.filter(
  //       (user) => parseInt(user.status) === 1 || parseInt(user.status) === 0
  //     );
  //     setTableList(filteredActiveInactiveData);
  //   } else {
  //     setTableList([]);
  //   }
  // }, [users,  selectedStatusToSet]);

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      statustoset: "active",
      block_message: "",
    },
    validationSchema: Yup.object().shape({}),

    onSubmit: async (values) => {
      try {
        if (selectedUsers.length === 0) {
          handleWarning();
        }
        if (
          values.statustoset === "inactive" ||
          values.statustoset === "block"
        ) {
          if (!values.block_message) {
            handleError();
          }
        }

        const newStatus = {
          user_id: selectedUsers.map((user) => user.id),
          block_message: values.block_message,
          status:
            values.statustoset === "active"
              ? 1
              : values.statustoset === "inactive"
              ? 0
              : values.statustoset === "block"
              ? -7
              : 2,
        };

        console.log("newStatus:", JSON.stringify(newStatus));
        const token = "Bearer " + localStorage.getItem("temptoken");

        const response = await axios.post(
          `${API_URL}/user/bulk-status/2?vr=web1.0`,
          newStatus,
          {
            headers: {
              Authorization: token,
            },
          }
        );

        console.log("Axios Response:", response);
        dispatch(onGetUsers());

        validation.resetForm();
        handleBulkInactiveUser();
      } catch (error) {
        console.error("Error in onSubmit:", error);
      }
    },
    onReset: (values) => {
      validation.setValues(validation.initialValues);
    },
  });

  const columns = useMemo(
    () => [
      {
        Header: ".",
        disableFilters: true,
        filterable: true,

        Cell: (cellProps) => (
          <input
            type="checkbox"
            disabled
            checked
            // onClick={() => handleActive(cellProps.row.original)}
          />
        ),
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
        accessor: "name",
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
        Header: "Login ID",
        accessor: "username",
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
        Header: "Status",
        // accessor: "status",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <>
              <h5 className="font-size-14 mb-1">
                <Link className="text-dark" to="#">
                  {cellProps.row.original.status === 1 ? (
                    "Active"
                  ) : cellProps.row.original.status === 0 ? (
                    <Badge className="bg-danger font-size-14">In-Active</Badge>
                  ) : (
                    "Blocked"
                  )}
                </Link>
              </h5>
            </>
          );
        },
      },
      {
        Header: "Type",
        accessor: "type",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <>
              <h5 className="font-size-14 mb-1">
                <Link className="text-dark" to="#">
                  {cellProps.row.original.type_lbl}
                  {/* {cellProps.row.original.status === 0
                    ? "MSO"
                    : cellProps.row.original.status === 1
                    ? "RO"
                    : cellProps.row.original.status === 2
                    ? "DISTRIBUTOR"
                    : "LCO"} */}
                </Link>
              </h5>
            </>
          );
        },
      },
      {
        Header: "Role",
        accessor: "role_lbl",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <>
              <h5 className="font-size-14 mb-1">
                <Link className="text-dark" to="#">
                  {cellProps.row.original.status.role_lbl}
                  {/* {cellProps.row.original.status === 1
                    ? "Administrator"
                    : cellProps.row.original.status === 2
                    ? "Staff"
                    : "User"} */}
                </Link>
              </h5>
            </>
          );
        },
      },
      {
        Header: "Organization",
        accessor: "operator_lbl",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <>
              <h5 className="font-size-14 mb-1">
                <Link className="text-dark" to="#">
                  {cellProps.row.original.operator_lbl}
                </Link>
              </h5>
            </>
          );
        },
      },
    ],
    []
  );

  const userColumn = useMemo(
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
        Header: "Type",
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
        Header: "Role",
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
        Header: "Organization",
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

  useEffect(() => {
    console.log("status in useEffect: " + selectedStatusToSet);

    const getFilteredData = async () => {
      try {
        const token = "Bearer " + localStorage.getItem("temptoken");
        if (selectedStatusToSet === "active") {
          const response = await axios.get(
            `${API_URL}/user?expand=role_lbl,status_lbl,type_lbl,operator_lbl,created_by_lbl,parent_lbl&notfilter[id]=2&filter[status]=0&notfilter[role]=4&page=1&per-page=500&vr=web1.0`,
            {
              headers: {
                Authorization: token,
              },
            }
          );

          setTableList(response.data.data);
        } else if (selectedStatusToSet === "inactive") {
          const response = await axios.get(
            `${API_URL}/user?expand=role_lbl,status_lbl,type_lbl,operator_lbl,created_by_lbl,parent_lbl&notfilter[id]=2&filter[status]=1,-7&notfilter[role]=4&page=1&per-page=500&vr=web1.0`,
            {
              headers: {
                Authorization: token,
              },
            }
          );

          setTableList(response.data.data);
        } else if (selectedStatusToSet === "block") {
          const response = await axios.get(
            `${API_URL}/user?expand=role_lbl,status_lbl,type_lbl,operator_lbl,created_by_lbl,parent_lbl&notfilter[id]=2&filter[status]=0,1&notfilter[role]=4&page=1&per-page=500&vr=web1.0`,
            {
              headers: {
                Authorization: token,
              },
            }
          );

          setTableList(response.data.data);
        } else {
          const response = await axios.get(
            `${API_URL}/user?expand=role_lbl,status_lbl,type_lbl,operator_lbl,created_by_lbl,parent_lbl&notfilter[id]=2&filter[status]=-7&notfilter[role]=4&page=1&per-page=500&vr=web1.0`,
            {
              headers: {
                Authorization: token,
              },
            }
          );

          setTableList(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getFilteredData();
  }, [selectedStatusToSet]);

  return (
    <>
      <div
        className="position-fixed top-0 end-0 p-3"
        style={{ zIndex: "1500" }}
      >
        <Toast isOpen={showWarning}>
          <ToastHeader toggle={handleWarning}>
            <i className="mdi mdi-alert-outline me-2"></i> Error
          </ToastHeader>
          <ToastBody>Please select at least one user</ToastBody>
        </Toast>
      </div>
      <div
        className="position-fixed top-0 end-0 p-3"
        style={{ zIndex: "1500" }}
      >
        <Toast isOpen={showError}>
          <ToastHeader toggle={handleError}>
            <i className="mdi mdi-alert-outline me-2"></i> Error
          </ToastHeader>
          <ToastBody>Please enter message</ToastBody>
        </Toast>
      </div>
      <Modal
        isOpen={isOpen}
        size="xl"
        role="dialog"
        autoFocus={true}
        centered={true}
        className="exampleModal"
        tabIndex="-1"
        toggle={handleBulkInactiveUser}
      >
        <ModalHeader toggle={handleBulkInactiveUser} tag="h4">
          Bulk Active/Inactive User
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
                        Select Status To Set
                        <span style={{ color: "red" }}>*</span>
                      </Label>
                      <Input
                        name="statustoset"
                        type="select"
                        placeholder="Select Status to set"
                        className="form-select"
                        onChange={handleStatusChange}
                        onBlur={validation.handleBlur}
                        value={selectedStatusToSet}
                      >
                        <option defaultValue="active">ACTIVE</option>
                        <option value="inactive">In-Active</option>
                        <option value="block">BLOCK</option>
                        <option value="unblock">UNBLOCK</option>
                      </Input>

                      {validation.touched.statustoset &&
                      validation.errors.statustoset ? (
                        <FormFeedback type="invalid">
                          {validation.errors.statustoset}
                        </FormFeedback>
                      ) : null}
                    </div>
                  </Col>
                  {console.log("status: " + selectedStatusToSet)}
                  <Col lg={4}>
                    <div className="mb-3">
                      <Label className="form-label">
                        Inactive/Block Message
                        <span style={{ color: "red" }}>*</span>
                      </Label>
                      <Input
                        name="block_message"
                        type="textarea"
                        placeholder="Enter Message"
                        rows="3"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.block_message || ""}
                        invalid={
                          validation.touched.block_message &&
                          validation.errors.block_message
                            ? true
                            : false
                        }
                        disabled={
                          selectedStatusToSet === "inactive" ||
                          selectedStatusToSet === "block"
                            ? false
                            : true
                        }
                      />
                      {validation.touched.block_message &&
                      validation.errors.block_message ? (
                        <FormFeedback type="invalid">
                          {validation.errors.block_message}
                        </FormFeedback>
                      ) : null}
                    </div>
                  </Col>
                </Row>
                {/* {console.log("tableList: " + JSON.stringify(tableList))} */}
                {/* <TableContainerX
                columns={columns}
                data={users}
                isShowTableActionButtons={true}
                isLoading={loading}
                isPagination={true}
                totalCount={Number(totalCount)}
                pageSize={Number(pageSize)}
                currentPage={Number(currentPage)}
                totalPage={Number(totalPage)}
                isGlobalFilter={true}
                isShowingPageLength={true}
                tableActions={getTableActions()}
                handleRowClick={(row) => {
                  toggleViewModal(row);
                }}
                goToPage={goToPage}
              /> */}
                <TableContainer
                  isPagination={true}
                  columns={columns}
                  data={tableList}
                  handleRowClick={(row) => {
                    // console.log("row:" + JSON.stringify(row));
                    handleActive(row);
                  }}
                  isGlobalFilter={true}
                  isShowingPageLength={true}
                  customPageSize={50}
                  tableClass="table align-middle table-nowrap table-hover"
                  theadClass="table-light"
                  paginationDiv="col-sm-12 col-md-7"
                  pagination="pagination pagination-rounded justify-content-end mt-4"
                />
                <div
                  style={{
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
                  <h5 style={{}}>Selected Users</h5>
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
                      columns={userColumn}
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
                <div className="text-center mt-4 ">
                  <div
                    style={{
                      display: "flex",
                      gap: 5,
                      textAlign: "center",
                      justifyContent: "center",
                    }}
                  >
                    <button
                      type="submit"
                      className="btn btn-primary ml-2 "
                      // onClick={() => {
                      //   validation.handleSubmit();
                      // }}
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary "
                      onClick={handleBulkInactiveUser}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </Form>
            </CardBody>
          </Card>
        </ModalBody>
      </Modal>
    </>
  );
};

BulkInactiveUserModal.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default BulkInactiveUserModal;
