import React, { useEffect, useState, useRef, useMemo } from "react";
import { Link } from "react-router-dom";
import withRouter from "../../../components/Common/withRouter";
import TableContainer from "../../../components/Common/TableContainer";
import Spinners from "../../../components/Common/Spinner";
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
} from "reactstrap";
import * as Yup from "yup";
import { useFormik } from "formik";

import { Email, Tags, Projects } from "./usersListCol";

//Import Breadcrumb
import Breadcrumbs from "/src/components/Common/Breadcrumb";
import DeleteModal from "/src/components/Common/DeleteModal";

import {
  getUsers as onGetUsers,
  addNewUser as onAddNewUser,
  updateUser as onUpdateUser,
  deleteUser as onDeleteUser,
} from "/src/store/users/actions";
import { isEmpty } from "lodash";

//redux
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { ToastContainer } from "react-toastify";
import Login from "../../Authentication/Login";

const ContactsList = (props) => {
  //meta title
  document.title = "Users List | VDigitals";

  const dispatch = useDispatch();
  const [user, setUser] = useState();

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      name: (user && user.name) || "",
      email: (user && user.email) || "",
      mobile: (user && user.mobile) || "",
      usertype: (user && user.usertype) || "",
      status: (user && user.status) || "",
      message: (user && user.message) || "",
      role: (user && user.role) || "",
      designation: (user && user.designation) || "",
      grouppolicy: (user && user.grouppolicy) || "",
      loginid: (user && user.loginid) || "",
      password: (user && user.password) || "",
      confirmpassword: (user && user.confirmpassword) || "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please Enter Your Name"),
      email: Yup.string()
        .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Please Enter Valid Email")
        .required("Please Enter Your Email"),
      // mobile: Yup.array().required("Please Enter mobile"),
      mobile: Yup.string().required("Please Enter mobile Number"),
      usertype: Yup.string().required("Please Enter User Type"),
      status: Yup.string().required("Please Enter Status"),
      message: Yup.string().required("Please Enter Message"),
      role: Yup.string().required("Please Enter Role"),
      designation: Yup.string().required("Please Enter Designation"),
      grouppolicy: Yup.string().required("Please Enter Group Policy"),
      loginid: Yup.string().required("Please Enter Login ID"),
      password: Yup.string().required("Please Enter Password"),
      confirmpassword: Yup.string().required("Please Enter Confirm Password"),
    }),
    onSubmit: (values) => {
      if (isView) {
        const updateUser = {
          id: user.id,
          name: values.name,
          email: values.email,
          mobile: values.mobile,
          usertype: values.usertype,
          status: values.status,
          message: values.message,
          role: values.role,
          designation: values.designation,
          grouppolicy: values.grouppolicy,
          loginid: values.loginid,
          password: values.password,
          confirmpassword: values.confirmpassword,
        };

        // update user
        dispatch(onUpdateUser(updateUser));
        validation.resetForm();
        setIsView(false);
      } else {
        const newUser = {
          id: Math.floor(Math.random() * (30 - 20)) + 20,
          name: values["name"],
          email: values["email"],
          mobile: values["mobile"],
          usertype: values["usertype"],
          status: values["status"],
          message: values["message"],
          role: values["role"],
          designation: values["designation"],
          grouppolicy: values["grouppolicy"],
          loginid: values["loginid"],
          password: values["password"],
          confirmpassword: values["confirmpassword"],
        };
        console.log("newUser:" + newUser);
        // save new user
        dispatch(onAddNewUser(newUser));
        validation.resetForm();
        toggle();
      }
      // toggle()
    },
  });

  const selectContactsState = (state) => state.users;
  const ContactsProperties = createSelector(selectContactsState, (Users) => ({
    users: Users.users,
    loading: Users.loading,
  }));

  const { users, loading } = useSelector(ContactsProperties);

  useEffect(() => {
    console.log("Users data in component:", users);
  }, [users]);
  const [isLoading, setLoading] = useState(loading);

  const [userList, setUserList] = useState([]);
  const [modal, setModal] = useState(false);
  const [isView, setIsView] = useState(false);

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
                  handleUserClick(userData);
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
        accessor: "login",
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
        Header: "Mobile",
        accessor: "mobile",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <>
              <h5 className="font-size-14 mb-1">
                <Link className="text-dark" to="#">
                  {cellProps.row.original.mobile_no}
                </Link>
              </h5>
            </>
          );
        },
      },
      {
        Header: "Status",
        accessor: "status",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <>
              <h5 className="font-size-14 mb-1">
                <Link className="text-dark" to="#">
                  {cellProps.row.original.status === 1
                    ? "Active"
                    : cellProps.row.original.status === 0
                    ? "In-Active"
                    : "Blocked"}
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
                  {cellProps.row.original.status === 0
                    ? "MSO"
                    : cellProps.row.original.status === 1
                    ? "RO"
                    : cellProps.row.original.status === 2
                    ? "DISTRIBUTOR"
                    : "LCO"}
                </Link>
              </h5>
            </>
          );
        },
      },
      {
        Header: "Role",
        accessor: "role",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <>
              <h5 className="font-size-14 mb-1">
                <Link className="text-dark" to="#">
                  {cellProps.row.original.status === 1
                    ? "Administrator"
                    : cellProps.row.original.status === 2
                    ? "Staff"
                    : "User"}
                </Link>
              </h5>
            </>
          );
        },
      },
      {
        Header: "Organization",
        accessor: "organization",
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
      {
        Header: "Parent",
        accessor: "parent",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <>
              <h5 className="font-size-14 mb-1">
                <Link className="text-dark" to="#">
                  {cellProps.row.original.parent_lbl}
                </Link>
              </h5>
            </>
          );
        },
      },
      {
        Header: "Group Policy",
        accessor: "grouppolicy",
        filterable: true,
        Cell: (cellProps) => {
          // return <Tags {...cellProps} />;
        },
      },
      {
        Header: "LAST LOGIN TIME",
        accessor: "lastlogintime",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <>
              <h5 className="font-size-14 mb-1">
                <Link className="text-dark" to="#">
                  {cellProps.row.original.last_login_at
                    ? cellProps.row.original.last_login_at
                    : "Never Logged In"}
                </Link>
              </h5>
            </>
          );
        },
      },
      {
        Header: "Settings",
        accessor: "settings",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <>
              <h5 className="font-size-14 mb-1">
                <Link className="text-dark" to="#">
                  {/* {cellProps.row.original.setting} */}
                </Link>
              </h5>
            </>
          );
        },
      },
      {
        Header: "Created At",
        accessor: "createat",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <>
              <h5 className="font-size-14 mb-1">
                <Link className="text-dark" to="#">
                  {cellProps.row.original.created_at}
                </Link>
              </h5>
            </>
          );
        },
      },
      {
        Header: "Created BY",
        accessor: "createdby",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <>
              <h5 className="font-size-14 mb-1">
                <Link className="text-dark" to="#">
                  {cellProps.row.original.created_by_lbl}
                </Link>
              </h5>
            </>
          );
        },
      },
    ],
    []
  );

  useEffect(() => {
    if (users && !users.length) {
      dispatch(onGetUsers());
      setIsView(false);
    }
  }, [dispatch, users]);

  useEffect(() => {
    setUser(users);
    setIsView(false);
  }, [users]);

  useEffect(() => {
    if (!isEmpty(users) && !!isView) {
      setUser(users);
      setIsView(false);
    }
  }, [users]);

  const toggle = () => {
    setModal(!modal);
  };

  const handleUserClick = (arg) => {
    const user = arg;

    setUser({
      id: user.id,
      name: user.name,
      email: user.email,
      mobile: user.mobile,
      usertype: user.usertype,
      status: user.status,
      message: user.message,
      role: user.role,
      designation: user.designation,
      grouppolicy: user.grouppolicy,
      loginid: user.loginid,
      password: user.password,
      confirmpassword: user.confirmpassword,
    });
    setIsView(true);

    toggle();
  };

  var node = useRef();
  const onPaginationPageChange = (page) => {
    if (
      node &&
      node.current &&
      node.current.props &&
      node.current.props.pagination &&
      node.current.props.pagination.options
    ) {
      node.current.props.pagination.options.onPageChange(page);
    }
  };

  //delete customer
  const [deleteModal, setDeleteModal] = useState(false);

  const onClickDelete = (users) => {
    setUser(users);
    setDeleteModal(true);
  };

  const handleDeleteUser = () => {
    if (user && user.id) {
      dispatch(onDeleteUser(user.id));
    }
    setUser("");
    onPaginationPageChange(1);
    setDeleteModal(false);
  };

  const handleUserClicks = () => {
    setUserList("");
    setIsView(false);
    toggle();
  };

  const keyField = "id";

  return (
    <React.Fragment>
      {/* <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteUser}
        onCloseClick={() => setDeleteModal(
          false)}
      /> */}
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Access" breadcrumbItem="User List" />
          {isLoading ? (
            <Spinners setLoading={setLoading} />
          ) : (
            <Row>
              <Col lg="12">
                <Card>
                  <CardBody>
                    {/* {console.log("users:" + JSON.stringify(users))} */}
                    <TableContainer
                      isPagination={true}
                      columns={columns}
                      data={users}
                      // isGlobalFilter={true}
                      isAddUserList={true}
                      isShowingPageLength={true}
                      // iscustomPageSizeOptions={true}
                      handleUserClick={handleUserClicks}
                      customPageSize={50}
                      tableClass="table align-middle table-nowrap table-hover"
                      theadClass="table-light"
                      paginationDiv="col-sm-12 col-md-7"
                      pagination="pagination pagination-rounded justify-content-end mt-4"
                    />
                    <Modal isOpen={modal} toggle={toggle}>
                      <ModalHeader toggle={toggle} tag="h4">
                        {!!isView ? "View User" : "Add User"}
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
                            <Col sm="6">
                              <div className="mb-3">
                                <Label className="form-label">Name</Label>
                                <Input
                                  name="name"
                                  type="text"
                                  placeholder="Insert Name"
                                  onChange={validation.handleChange}
                                  onBlur={validation.handleBlur}
                                  value={validation.values.name || ""}
                                  invalid={
                                    validation.touched.name &&
                                    validation.errors.name
                                      ? true
                                      : false
                                  }
                                />
                                {validation.touched.name &&
                                validation.errors.name ? (
                                  <FormFeedback type="invalid">
                                    {validation.errors.name}
                                  </FormFeedback>
                                ) : null}
                              </div>

                              <div className="mb-3">
                                <Label className="form-label">Email</Label>
                                <Input
                                  name="email"
                                  label="Email"
                                  type="email"
                                  placeholder="Insert Email"
                                  onChange={validation.handleChange}
                                  onBlur={validation.handleBlur}
                                  value={validation.values.email || ""}
                                  invalid={
                                    validation.touched.email &&
                                    validation.errors.email
                                      ? true
                                      : false
                                  }
                                />
                                {validation.touched.email &&
                                validation.errors.email ? (
                                  <FormFeedback type="invalid">
                                    {validation.errors.email}
                                  </FormFeedback>
                                ) : null}
                              </div>
                              <div className="mb-3">
                                <Label className="form-label">Mobile No.</Label>
                                <Input
                                  name="mobile"
                                  label="Mobile No."
                                  placeholder="Insert Mobile Number"
                                  type="text"
                                  onChange={validation.handleChange}
                                  onBlur={validation.handleBlur}
                                  value={validation.values.mobile || ""}
                                  invalid={
                                    validation.touched.mobile &&
                                    validation.errors.mobile
                                      ? true
                                      : false
                                  }
                                />
                                {validation.touched.mobile &&
                                validation.errors.mobile ? (
                                  <FormFeedback type="invalid">
                                    {validation.errors.mobile}
                                  </FormFeedback>
                                ) : null}
                              </div>

                              <div className="mb-3">
                                <Label className="form-label">User Type</Label>
                                <Input
                                  name="usertype"
                                  type="select"
                                  placeholder="Select User Type"
                                  className="form-select"
                                  onChange={validation.handleChange}
                                  onBlur={validation.handleBlur}
                                  value={validation.values.usertype || ""}
                                >
                                  <option value="">Select User Type</option>
                                  <option value="1">MSO</option>
                                  <option value="2">RO</option>
                                  <option value="3">Distributor</option>
                                  <option value="4">LCO</option>
                                </Input>
                                {validation.touched.usertype &&
                                validation.errors.usertype ? (
                                  <FormFeedback type="invalid">
                                    {validation.errors.usertype}
                                  </FormFeedback>
                                ) : null}
                              </div>

                              <div className="mb-3">
                                <Label className="form-label">Status</Label>
                                <Input
                                  name="status"
                                  type="select"
                                  placeholder="Select Status"
                                  className="form-select"
                                  onChange={validation.handleChange}
                                  onBlur={validation.handleBlur}
                                  value={validation.values.status || ""}
                                >
                                  <option value="">Select Status</option>
                                  <option value="11">Active</option>
                                  <option value="12">BLOCKED</option>
                                  <option value="13">In-Active</option>
                                </Input>
                                {validation.touched.status &&
                                validation.errors.status ? (
                                  <FormFeedback type="invalid">
                                    {validation.errors.status}
                                  </FormFeedback>
                                ) : null}
                              </div>
                              <div className="mb-3">
                                <Label className="form-label">
                                  InActive/Block Message
                                </Label>
                                <Input
                                  name="message"
                                  type="textarea"
                                  placeholder="Enter Message"
                                  rows="3"
                                  onChange={validation.handleChange}
                                  onBlur={validation.handleBlur}
                                  value={validation.values.message || ""}
                                  invalid={
                                    validation.touched.message &&
                                    validation.errors.message
                                      ? true
                                      : false
                                  }
                                />
                                {validation.touched.message &&
                                validation.errors.message ? (
                                  <FormFeedback type="invalid">
                                    {validation.errors.message}
                                  </FormFeedback>
                                ) : null}
                              </div>
                            </Col>
                            <Col sm="6">
                              <div className="mb-3">
                                <Label className="form-label">Role</Label>
                                <Input
                                  name="role"
                                  type="select"
                                  placeholder="Select Role"
                                  className="form-select"
                                  onChange={validation.handleChange}
                                  onBlur={validation.handleBlur}
                                  value={validation.values.role || ""}
                                >
                                  <option value="">Select Role</option>
                                  <option value="21">Administrator</option>
                                  <option value="22">Staff</option>
                                  <option value="23">User</option>
                                </Input>
                                {validation.touched.role &&
                                validation.errors.role ? (
                                  <FormFeedback type="invalid">
                                    {validation.errors.role}
                                  </FormFeedback>
                                ) : null}
                              </div>
                              <div className="mb-3">
                                <Label className="form-label">
                                  Designation
                                </Label>
                                <Input
                                  name="designation"
                                  type="select"
                                  placeholder="Select Designation"
                                  className="form-select"
                                  onChange={validation.handleChange}
                                  onBlur={validation.handleBlur}
                                  value={validation.values.designation || ""}
                                >
                                  <option value="">Select Designation</option>
                                  <option value="dir">Director</option>
                                </Input>
                                {validation.touched.designation &&
                                validation.errors.designation ? (
                                  <FormFeedback type="invalid">
                                    {validation.errors.designation}
                                  </FormFeedback>
                                ) : null}
                              </div>
                              <div className="mb-3">
                                <Label className="form-label">
                                  Group Policy
                                </Label>
                                <Input
                                  name="grouppolicy"
                                  type="select"
                                  placeholder="Select Group Policy"
                                  className="form-select"
                                  onChange={validation.handleChange}
                                  onBlur={validation.handleBlur}
                                  value={validation.values.grouppolicy || ""}
                                >
                                  <option value="">Select Group Policy</option>
                                  <option value="A">Active</option>
                                  <option value="B">BLOCKED</option>
                                  <option value="C">In-Active</option>
                                </Input>
                                {validation.touched.grouppolicy &&
                                validation.errors.grouppolicy ? (
                                  <FormFeedback type="invalid">
                                    {validation.errors.grouppolicy}
                                  </FormFeedback>
                                ) : null}
                              </div>
                              <div className="mb-3">
                                <Label className="form-label">Login ID</Label>
                                <Input
                                  name="loginid"
                                  label="Login ID"
                                  type="text"
                                  placeholder="Login ID"
                                  onChange={validation.handleChange}
                                  onBlur={validation.handleBlur}
                                  value={validation.values.loginid || ""}
                                  invalid={
                                    validation.touched.loginid &&
                                    validation.errors.loginid
                                      ? true
                                      : false
                                  }
                                />
                                {validation.touched.loginid &&
                                validation.errors.loginid ? (
                                  <FormFeedback type="invalid">
                                    {validation.errors.loginid}
                                  </FormFeedback>
                                ) : null}
                              </div>
                              <div className="mb-3">
                                <Label className="form-label">Password</Label>
                                <Input
                                  name="password"
                                  label="Password"
                                  type="text"
                                  placeholder="Password"
                                  onChange={validation.handleChange}
                                  onBlur={validation.handleBlur}
                                  value={validation.values.password || ""}
                                  invalid={
                                    validation.touched.password &&
                                    validation.errors.password
                                      ? true
                                      : false
                                  }
                                />
                                {validation.touched.password &&
                                validation.errors.password ? (
                                  <FormFeedback type="invalid">
                                    {validation.errors.password}
                                  </FormFeedback>
                                ) : null}
                              </div>
                              <div className="mb-3">
                                <Label className="form-label">
                                  Confirm-Password
                                </Label>
                                <Input
                                  name="confirmpassword"
                                  label="Confirm Password"
                                  type="text"
                                  placeholder="Retype Password"
                                  onChange={validation.handleChange}
                                  onBlur={validation.handleBlur}
                                  value={
                                    validation.values.confirmpassword || ""
                                  }
                                  invalid={
                                    validation.touched.confirmpassword &&
                                    validation.errors.confirmpassword
                                      ? true
                                      : false
                                  }
                                />
                                {validation.touched.confirmpassword &&
                                validation.errors.confirmpassword ? (
                                  <FormFeedback type="invalid">
                                    {validation.errors.confirmpassword}
                                  </FormFeedback>
                                ) : null}
                              </div>
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <div className="text-end">
                                <button
                                  type="submit"
                                  className="btn btn-success save-user"
                                >
                                  Create
                                </button>
                              </div>
                            </Col>
                          </Row>
                        </Form>
                      </ModalBody>
                    </Modal>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          )}
        </Container>
      </div>
      <ToastContainer />
    </React.Fragment>
  );
};

export default withRouter(ContactsList);
