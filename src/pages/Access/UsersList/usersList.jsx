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
  UncontrolledTooltip,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  Input,
  FormFeedback,
  Label,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
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
import ViewUserModal from "./ViewUserModal";
import AddUserModal from "./AddUserModal";
import UploadUserModal from "./UploadUserModal";
import BulkUpdateUserModal from "./BulkUpdateUserModal";

const ContactsList = (props) => {
  //meta title
  document.title = "Users List | VDigitals";

  const dispatch = useDispatch();
  const [user, setUser] = useState();

  // const validation = useFormik({
  //   // enableReinitialize : use this flag when initial values needs to be changed
  //   enableReinitialize: true,

  //   initialValues: {
  //     name: (user && user.name) || "",
  //     email: (user && user.email) || "",
  //     mobile: (user && user.mobile) || "",
  //     usertype: (user && user.usertype) || "",
  //     status: (user && user.status) || "",
  //     message: (user && user.message) || "",
  //     role: (user && user.role) || "",
  //     designation: (user && user.designation) || "",
  //     grouppolicy: (user && user.grouppolicy) || "",
  //     loginid: (user && user.loginid) || "",
  //     password: (user && user.password) || "",
  //     confirmpassword: (user && user.confirmpassword) || "",
  //   },
  //   validationSchema: Yup.object({
  //     name: Yup.string().required("Please Enter Your Name"),
  //     email: Yup.string()
  //       .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Please Enter Valid Email")
  //       .required("Please Enter Your Email"),
  //     // mobile: Yup.array().required("Please Enter mobile"),
  //     mobile: Yup.string().required("Please Enter mobile Number"),
  //     usertype: Yup.string().required("Please Enter User Type"),
  //     status: Yup.string().required("Please Enter Status"),
  //     message: Yup.string().required("Please Enter Message"),
  //     role: Yup.string().required("Please Enter Role"),
  //     designation: Yup.string().required("Please Enter Designation"),
  //     grouppolicy: Yup.string().required("Please Enter Group Policy"),
  //     loginid: Yup.string().required("Please Enter Login ID"),
  //     password: Yup.string().required("Please Enter Password"),
  //     confirmpassword: Yup.string().required("Please Enter Confirm Password"),
  //   }),
  //   onSubmit: (values) => {
  //     // if (isView) {
  //     //   const updateUser = {
  //     //     id: user.id,
  //     //     name: values.name,
  //     //     email: values.email,
  //     //     mobile: values.mobile,
  //     //     usertype: values.usertype,
  //     //     status: values.status,
  //     //     message: values.message,
  //     //     role: values.role,
  //     //     designation: values.designation,
  //     //     grouppolicy: values.grouppolicy,
  //     //     loginid: values.loginid,
  //     //     password: values.password,
  //     //     confirmpassword: values.confirmpassword,
  //     //   };

  //     //   // update user
  //     //   dispatch(onUpdateUser(updateUser));
  //     //   validation.resetForm();
  //     //   setIsView(false);
  //     // } else {
  //     const newUser = {
  //       id: Math.floor(Math.random() * (30 - 20)) + 20,
  //       name: values["name"],
  //       email: values["email"],
  //       mobile: values["mobile"],
  //       usertype: values["usertype"],
  //       status: values["status"],
  //       message: values["message"],
  //       role: values["role"],
  //       designation: values["designation"],
  //       grouppolicy: values["grouppolicy"],
  //       loginid: values["loginid"],
  //       password: values["password"],
  //       confirmpassword: values["confirmpassword"],
  //     };
  //     console.log("newUser:" + newUser);
  //     // save new user
  //     dispatch(onAddNewUser(newUser));
  //     validation.resetForm();
  //     toggle();
  //   },
  //   // toggle()
  //   // },
  // });

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
  const [modal1, setModal1] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [modal3, setModal3] = useState(false);

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
      // setIsView(false);
    }
  }, [dispatch, users]);

  useEffect(() => {
    setUser(users);
    // setIsView(false);
  }, [users]);

  useEffect(() => {
    if (!isEmpty(users)) {
      setUser(users);
      // setIsView(false);
    }
  }, [users]);

  const toggle = () => {
    setModal(!modal);
  };

  const toggle2 = () => {
    setModal2(!modal2);
  };

  const toggle3 = () => {
    setModal3(!modal3);
  };
  const [viewUser, setViewUser] = useState({});
  // const toggleViewModal = () => setModal(modal);
  // const handleUserClick = (arg) => {
  const toggleViewModal = (userData) => {
    setModal1(!modal1);
    setViewUser(userData);
    // toggle();
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

  const handleUserClicks = () => {
    setUserList("");
    // setIsView(false);
    toggle();
  };

  const keyField = "id";

  return (
    <React.Fragment>
      {/* {console.log("viewuser initially:" + JSON.stringify(viewUser))} */}
      <ViewUserModal isOpen={modal1} toggle={toggleViewModal} user={viewUser} />
      <AddUserModal isOpen={modal} toggle={toggle} />
      <UploadUserModal isOpen={modal2} toggle={toggle2} />
      <BulkUpdateUserModal isOpen={modal3} toggle={toggle3} />
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
                    <div className="d-flex align-items-center justify-content-between">
                      {/* <h5 className="mb-0 card-title flex-grow-1">
                        Jobs Lists
                      </h5> */}
                      <form className="app-search d-none d-lg-block">
                        <div className="position-relative">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Search..."
                          />
                          <span className="bx bx-search-alt" />
                        </div>
                      </form>
                      <div className="flex-shrink-0">
                        <Link
                          to="#!"
                          onClick={() => setModal(true)}
                          className="btn btn-primary me-1"
                        >
                          Create New User
                        </Link>
                        <UncontrolledDropdown className="dropdown d-inline-block me-1">
                          <DropdownToggle
                            type="menu"
                            className="btn btn-success"
                            id="dropdownMenuButton1"
                          >
                            Upload &nbsp;
                            <i className="bx bx-upload"></i>
                          </DropdownToggle>
                          <DropdownMenu>
                            <li onClick={() => setModal2(true)}>
                              <DropdownItem href="#">Upload User</DropdownItem>
                            </li>
                            <li onClick={() => setModal3(true)}>
                              <DropdownItem href="#">
                                Bulk Update User
                              </DropdownItem>
                            </li>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                        <UncontrolledDropdown className="dropdown d-inline-block me-1">
                          <DropdownToggle
                            type="menu"
                            className="btn btn-success"
                            id="dropdownMenuButton1"
                          >
                            Action &nbsp;
                            <i className="mdi mdi-dots-vertical"></i>
                          </DropdownToggle>
                          <DropdownMenu>
                            <li>
                              <DropdownItem href="#">
                                Bulk Active/Inactive User
                              </DropdownItem>
                            </li>
                            <li>
                              <DropdownItem href="#">
                                Bulk User Settings
                              </DropdownItem>
                            </li>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </div>
                    </div>
                  </CardBody>
                  <CardBody>
                    {/* {console.log("users:" + JSON.stringify(users))} */}
                    <TableContainer
                      isPagination={true}
                      columns={columns}
                      data={users}
                      isGlobalFilter={true}
                      // isAddUserList={true}
                      // isUploadUser={true}
                      // handleUploadUserClick={() => setModal2(true)}
                      isShowingPageLength={true}
                      // iscustomPageSizeOptions={true}
                      // handleUserClick={handleUserClicks}
                      customPageSize={50}
                      tableClass="table align-middle table-nowrap table-hover"
                      theadClass="table-light"
                      paginationDiv="col-sm-12 col-md-7"
                      pagination="pagination pagination-rounded justify-content-end mt-4"
                    />
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
