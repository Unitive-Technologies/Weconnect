import React, { useEffect, useState, useRef, useMemo } from "react";
import { Link } from "react-router-dom";
import withRouter from "../../../components/Common/withRouter";
import TableContainer from "../../../components/Common/TableContainer";
import Spinners from "../../../components/Common/Spinner";
import { Card, CardBody, Col, Container, Row } from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "/src/components/Common/Breadcrumb";

import {
  getUsers as onGetUsers,
  getUserType as onGetUserType,
  getUserStatus as onGetUserStatus,
  getUserRole as onGetUserRole,
  getUserDesignation as onGetUserDesignation,
  getUserMsoPolicy as onGetUserMsoPolicy,
  // getUserRegionalOffice as onGetUserRegionalOffice,
  // getUserMsoDetails as onGetUserMsoDetails,
  // getUserDistributor as onGetUserDistributor,
} from "/src/store/users/actions";

//redux
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { ToastContainer } from "react-toastify";
import ViewUserModal from "./ViewUserModal";
import AddUserModal from "./AddUserModal";
import UploadUserModal from "./UploadUserModal";
import BulkUpdateUserModal from "./BulkUpdateUserModal";
import BulkInactiveUserModal from "./BulkInactiveUserModal";
import BulkUserSettings from "./BulkUserSettings";
import ViewModal from "./ViewModal";

const ContactsList = (props) => {
  //meta title
  document.title = "Users | VDigitals";

  const dispatch = useDispatch();

  const selectContactsState = (state) => state.users;
  const ContactsProperties = createSelector(selectContactsState, (Users) => ({
    users: Users.users,
    loading: Users.loading,
    userType: Users.userType,
    userStatus: Users.userStatus,
    userRole: Users.userRole,
    userDesignation: Users.userDesignation,
    userMsoPolicy: Users.userMsoPolicy,
    // userRegional: Users.userRegional,
    // userMsoDetails: Users.userMsoDetails,
    // userDistributor: Users.userDistributor,
  }));

  const {
    users,
    userType,
    userStatus,
    userRole,
    userDesignation,
    userMsoPolicy,
    // userRegional,
    // userMsoDetails,
    // userDistributor,
    loading,
  } = useSelector(ContactsProperties);

  // useEffect(() => {
  //   console.log("Users data in component:", users);
  // }, [users]);
  const [isLoading, setLoading] = useState(loading);

  const [showAddUser, setShowAddUser] = useState(false);
  const [showViewUser, setShowViewUser] = useState(false);
  const [showUploadUser, setShowUploadUser] = useState(false);
  const [showBulkUpdateUser, setShowBulkUpdateUser] = useState(false);
  const [showInactivateUser, setShowInactivateUser] = useState(false);
  const [showBulkUserSettings, setShowBulkUserSettings] = useState(false);
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
                  handleViewUser(userData);
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
      dispatch(onGetUserType());
      dispatch(onGetUserStatus());
      dispatch(onGetUserRole());
      dispatch(onGetUserDesignation());
      dispatch(onGetUserMsoPolicy());
      // dispatch(onGetUserRegionalOffice());
      // dispatch(onGetUserMsoDetails());
      // dispatch(onGetUserDistributor());
    }
  }, [dispatch, users]);

  const handleAddUser = () => {
    setShowAddUser(!showAddUser);
  };

  const handleUploadUser = () => {
    setShowUploadUser(!showUploadUser);
  };

  const handleBulkUpdateUser = () => {
    setShowBulkUpdateUser(!showBulkUpdateUser);
  };

  const handleBulkInactiveUser = () => {
    setShowInactivateUser(!showInactivateUser);
  };

  const handleUserSettings = () => {
    setShowBulkUserSettings(!showBulkUserSettings);
  };
  const [viewUser, setViewUser] = useState({});

  const handleViewUser = (row) => {
    // console.log("Row data:", row);
    setShowViewUser(!showViewUser);
    setViewUser(row);
  };

  // const [filteredUsers, setFilteredUsers] = useState([]);
  // const [filteredActiveBlockUsers, setFilteredActiveBlockUsers] = useState([]);
  // const [filteredInActiveUsers, setFilteredInActiveUsers] = useState([]);
  // const [filteredActiveInactiveUsers, setFilteredActiveInactiveUsers] =
  //   useState([]);
  // useEffect(() => {
  //   // console.log("@@@@users:" + JSON.stringify(users));
  //   if (users) {
  //     const filteredActiveBlockData = users.filter(
  //       (user) => parseInt(user.status) === 1 && parseInt(user.status) === -7
  //     );
  //     // console.log("@@@@@@@@@filter:" + JSON.stringify(filteredActiveBlockData));
  //     setFilteredActiveBlockUsers(filteredActiveBlockData);
  //     const filteredInActiveData = users.filter(
  //       (user) => parseInt(user.status) === 0
  //     );

  //     // console.log("@@@@@@@@@filter:" + JSON.stringify(filteredInActiveData));
  //     setFilteredInActiveUsers(filteredInActiveData);
  //     const filteredActiveInactiveData = users.filter(
  //       (user) => parseInt(user.status) === 0 && parseInt(user.status) === 1
  //     );
  //     setFilteredActiveInactiveUsers(filteredActiveInactiveData);
  //   }
  //   // console.log("ActiveBlock:" + JSON.stringify(filteredActiveBlockUsers));
  //   // console.log("Inactive:" + JSON.stringify(filteredInActiveUsers));
  //   // console.log(
  //   //   "ActiveInactive:" + JSON.stringify(filteredActiveInactiveUsers)
  //   // );
  // }, [users]);

  const keyField = "id";

  const getTableActions = () => {
    return [
      {
        name: "Create",
        action: setShowAddUser,
        type: "normal",
        icon: "create",
      },
      {
        name: "Upload",
        action: setShowUploadUser,
        type: "dropdown",
        dropdownName: "Upload",
        // icon: "upload",
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
        action: setShowBulkUserSettings,
        type: "dropdown",
        dropdownName: "Actions",
      },
    ];
  };
  // console.log("policy-mso:" + userMsoPolicy);
  return (
    <React.Fragment>
      <ViewUserModal
        isOpen={showViewUser}
        handleViewUser={handleViewUser}
        user={viewUser}
        userType={userType}
        userStatus={userStatus}
        userRole={userRole}
        userDesignation={userDesignation}
      />
      {/* <ViewModal
        isOpen={showViewUser}
        handleViewUser={handleViewUser}
        user={viewUser}
        userType={userType}
        userStatus={userStatus}
        userRole={userRole}
        userDesignation={userDesignation}
      /> */}
      <AddUserModal
        isOpen={showAddUser}
        handleAddUser={handleAddUser}
        userType={userType}
        userStatus={userStatus}
        userRole={userRole}
        userDesignation={userDesignation}
        userMsoPolicy={userMsoPolicy}
        // userRegional={userRegional}
        // userMsoDetails={userMsoDetails}
        // userDistributor={userDistributor}
      />
      <UploadUserModal
        isOpen={showUploadUser}
        handleUploadUser={handleUploadUser}
      />
      <BulkUpdateUserModal
        isOpen={showBulkUpdateUser}
        handleBulkUpdateUser={handleBulkUpdateUser}
      />
      <BulkInactiveUserModal
        isOpen={showInactivateUser}
        handleBulkInactiveUser={handleBulkInactiveUser}
        // filteredActiveBlockUsers={filteredActiveBlockUsers}
        // filteredInActiveUsers={filteredInActiveUsers}
        // filteredActiveInactiveUsers={filteredActiveInactiveUsers}
        users={users}
        // setUsers={setUsers}
      />
      <BulkUserSettings
        isOpen={showBulkUserSettings}
        handleUserSettings={handleUserSettings}
        users={users}
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
                      isShowTableActionButtons={true}
                      tableActions={getTableActions()}
                      handleRowClick={(row) => {
                        // console.log("row:" + JSON.stringify(row));
                        handleViewUser(row);
                      }}
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
