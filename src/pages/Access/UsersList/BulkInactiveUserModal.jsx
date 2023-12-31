import React, { useEffect, useState, useRef, useMemo } from "react";
import PropTypes from "prop-types";
import TableContainer from "../../../components/Common/TableContainer";
import {
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
  CardTitle,
  CardSubtitle,
} from "reactstrap";
import { Link } from "react-router-dom";
import Dropzone from "react-dropzone";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { updateUser as onUpdateUser } from "/src/store/users/actions";

const BulkInactiveUserModal = (props) => {
  const {
    isOpen,
    handleBulkInactiveUser,
    users,
    // filteredActiveBlockUsers,
    // filteredInActiveUsers,
    // filteredActiveInactiveUsers,
    setUsers,
  } = props;
  // console.log(
  //   "Inactive in bulk modal:" + JSON.stringify(filteredInActiveUsers)
  // );
  const dispatch = useDispatch();
  const [tableList, setTableList] = useState([]);
  // const selectedusers = [];
  const [selectedStatusToSet, setSelectedStatusToSet] = useState("active");
  const [filteredActiveBlockUsers, setFilteredActiveBlockUsers] = useState([]);
  const [filteredInActiveUsers, setFilteredInActiveUsers] = useState([]);
  const [filteredActiveInactiveUsers, setFilteredActiveInactiveUsers] =
    useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const handleActive = (row) => {
    // Check if the row is already selected
    const isRowSelected = selectedUsers.some((user) => user.id === row.id);

    if (isRowSelected) {
      // If the row is already selected, remove it from selectedUsers
      const updatedSelectedUsers = selectedUsers.filter(
        (user) => user.id !== row.id
      );
      setSelectedUsers(updatedSelectedUsers);
    } else {
      // If the row is not selected, add it to selectedUsers and remove it from users
      setSelectedUsers((prevSelectedUsers) => [...prevSelectedUsers, row]);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== row.id));
    }
  };

  // if (statustoset === "active") {
  //   setTableList(filteredInActiveUsers);
  // } else if (statustoset === "inactive") {
  //   setTableList(filteredActiveBlockUsers);
  // } else if (statustoset === "block") {
  //   setTableList(filteredActiveInactiveUsers);
  // } else setTableList([]);
  // console.log("tableList:" + JSON.stringify(tableList));

  const handleStatusChange = (e) => {
    const statustoset = e.target.value;
    setSelectedStatusToSet(statustoset);
    validation.handleChange(e);
    console.log("statustoset:" + statustoset);
  };
  // const handleStatusChange = (e) => {
  //   const statustoset = e.target.value;
  //   setSelectedStatusToSet(statustoset);
  //   validation.handleChange(e);
  //   console.log("statustoset:" + statustoset);

  //   if (statustoset === "inactive") {
  //     const filteredActiveBlockData = users.filter(
  //       (user) => parseInt(user.status) === 1 && parseInt(user.status) === -7
  //     );
  //     setTableList(filteredActiveBlockData);
  //   } else if (statustoset === "active") {
  //     const filteredInActiveData = users.filter(
  //       (user) => parseInt(user.status) === 0
  //     );
  //     setTableList(filteredInActiveData);
  //   } else if (statustoset === "block") {
  //     const filteredActiveInactiveData = users.filter(
  //       (user) => parseInt(user.status) === 0 && parseInt(user.status) === 1
  //     );
  //     setTableList(filteredActiveInactiveData);
  //   } else return [];
  //   // console.log("ActiveBlock:" + JSON.stringify(filteredActiveBlockData));
  //   // console.log("Inactive:" + JSON.stringify(filteredInActiveData));
  //   // console.log("ActiveInactive:" + JSON.stringify(filteredActiveInactiveData));
  // };

  useEffect(() => {
    if (users) {
      const filteredActiveBlockData = users.filter(
        (user) => parseInt(user.status) === -7 || parseInt(user.status) === 1
      );
      setFilteredActiveBlockUsers(filteredActiveBlockData);
      const filteredInActiveData = users.filter(
        (user) => parseInt(user.status) === 0
      );
      setFilteredInActiveUsers(filteredInActiveData);
      const filteredActiveInactiveData = users.filter(
        (user) => parseInt(user.status) === 1 || parseInt(user.status) === 0
      );
      setFilteredActiveInactiveUsers(filteredActiveInactiveData);
    }
    // console.log("ActiveBlock:" + JSON.stringify(filteredActiveBlockUsers));
    // console.log("Inactive:" + JSON.stringify(filteredInActiveUsers));
    // console.log(
    //   "ActiveInactive:" + JSON.stringify(filteredActiveInactiveUsers)
    // );
  }, [users, selectedStatusToSet]);
  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      statustoset: "",
      block_message: "",
    },
    validationSchema: Yup.object({
      statustoset: Yup.string().required("Please Enter Status"),
    }),
    onSubmit: (values) => {
      const newStatus = {
        block_message: values["block_message"],
        status: parseInt(values["statustoset"]),
      };
      console.log("newUser:" + JSON.stringify(newStatus));
      dispatch(onUpdateUser(newStatus));
      validation.resetForm();
      handleAddUser();
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
            onChange={() => handleActive(cellProps.row.original)}
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
        accessor: "status_lbl",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <>
              <h5 className="font-size-14 mb-1">
                <Link className="text-dark" to="#">
                  {cellProps.row.original.status_lbl}
                  {/* {cellProps.row.original.status === 1
                    ? "Active"
                    : cellProps.row.original.status === 0
                    ? "In-Active"
                    : "Blocked"} */}
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
          return <i className="dripicons-tag-delete" />;
        },
      },
    ],
    []
  );

  return (
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
            <Form>
              <Row>
                <Col lg={4}>
                  <div className="mb-3">
                    <Label className="form-label">
                      Status To Set<span style={{ color: "red" }}>*</span>
                    </Label>
                    <Input
                      name="statustoset"
                      type="select"
                      placeholder="Select Status to set"
                      className="form-select"
                      // onChange={validation.handleChange}
                      onChange={handleStatusChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.statustoset}
                    >
                      <option value="active">ACTIVE</option>
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
                        selectedStatusToSet === "inactive" || "block"
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
              {console.log("tableList: " + JSON.stringify(tableList))}
              <TableContainer
                isPagination={true}
                columns={columns}
                data={
                  selectedStatusToSet === "active"
                    ? filteredInActiveUsers
                    : selectedStatusToSet === "inactive"
                    ? filteredActiveBlockUsers
                    : selectedStatusToSet === "block"
                    ? filteredActiveInactiveUsers
                    : []
                }
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
                  <button type="button" className="btn btn-primary ml-2 ">
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
  );
};

BulkInactiveUserModal.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default BulkInactiveUserModal;
