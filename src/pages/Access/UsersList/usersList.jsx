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
import BulkInactiveUserModal from "./BulkInactiveUserModal";
import BulkUserSettings from "./BulkUserSettings";

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
  const [showAddUser, setShowAddUser] = useState(false);
  const [showViewUser, setShowViewUser] = useState(false);
  const [showUploadUser, setShowUploadUser] = useState(false);
  const [showBulkUpdateUser, setShowBulkUpdateUser] = useState(false);
  const [showInactivateUser, setShowInactivateUser] = useState(false);
  const [showBulkUserSettings, setBulkUserSettings] = useState(false);
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
              <h5
                className="font-size-14 mb-1"
                style={{
                  maxWidth: 200,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                <Link className="text-dark" to="#">
                  BULK LIMIT: 0 ALLOWED CLIENT IPS: All PAY MODE ALLOWED:
                  Cash,Cheque,DD,NEFT/RTFS/IMPS,Online Transfer,Debit
                  Card,Credit Card,PAY TM,Other,Recharge Coupon, Payment
                  Gateway, TDS, BANK DEPOSIT
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
    setShowAddUser(!showAddUser);
  };

  const toggle2 = () => {
    setShowUploadUser(!showUploadUser);
  };

  const toggle3 = () => {
    setShowBulkUpdateUser(!showBulkUpdateUser);
  };

  const toggle4 = () => {
    setShowInactivateUser(!showInactivateUser);
  };

  const toggle5 = () => {
    setBulkUserSettings(!showBulkUserSettings);
  };
  const [viewUser, setViewUser] = useState({});
  // const toggleViewModal = () => setModal(modal);
  // const handleUserClick = (arg) => {
  const toggleViewModal = (userData) => {
    setShowViewUser(!showViewUser);
    setViewUser(userData);
    // toggle();
  };
  const [filteredUsers, setFilteredUsers] = useState([]);
  useEffect(() => {
    // Filter users based on status values "Bulk" and "Inactive"
    const filteredData = users.filter(
      (user) => user.status_lbl === "Bulk" || user.status_lbl === "Inactive"
    );

    // Update the filteredUsers state
    setFilteredUsers(filteredData);
  }, [users]);
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

  const getTableActions = () => {
    return [
      {
        name: "Create",
        action: setShowAddUser,
        type: "normal",
      },
      {
        name: "Upload",
        action: setShowUploadUser,
        type: "dropdown",
        dropdownName: "Upload",
      },
      {
        name: "Bulk Update",
        action: setShowBulkUpdateUser,
        type: "dropdown",
        dropdownName: "Upload",
      },
      {
        name: "Bulk Active/Inactive User",
        action: setShowInactivateUser,
        type: "dropdown",
        dropdownName: "Actions",
      },
      {
        name: "Bulk User Settings",
        action: setBulkUserSettings,
        type: "dropdown",
        dropdownName: "Actions",
      },
    ];
  };

  return (
    <React.Fragment>
      {/* {console.log("viewuser initially:" + JSON.stringify(viewUser))} */}
      <ViewUserModal
        isOpen={showViewUser}
        toggle={toggleViewModal}
        user={viewUser}
      />
      <AddUserModal isOpen={showAddUser} toggle={toggle} />
      <UploadUserModal isOpen={showUploadUser} toggle={toggle2} />
      <BulkUpdateUserModal isOpen={showBulkUpdateUser} toggle={toggle3} />
      <BulkInactiveUserModal
        isOpen={showInactivateUser}
        toggle={toggle4}
        user={filteredUsers}
      />
      <BulkUserSettings
        isOpen={showBulkUserSettings}
        toggle={toggle5}
        user={filteredUsers}
      />
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Access" breadcrumbItem="Users" />
          {isLoading ? (
            <Spinners setLoading={setLoading} />
          ) : (
            <Row>
              <Col lg="12">
                <Card>
                  <CardBody>
                    <TableContainer
                      isPagination={true}
                      columns={columns}
                      data={users}
                      isGlobalFilter={true}
                      isAddUserList={true}
                      tableActions={getTableActions()}
                      handleUserClick={() => setShowAddUser(true)}
                      handleUploadUser={() => setShowUploadUser(true)}
                      handleBulkUpdateUser={() => setShowBulkUpdateUser(true)}
                      isShowingPageLength={true}
                      // iscustomPageSizeOptions={true}
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
