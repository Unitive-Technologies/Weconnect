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
} from "/src/store/users/actions";
import { isEmpty } from "lodash";

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
  }));

  const { users, userType, userStatus, loading } =
    useSelector(ContactsProperties);

  // useEffect(() => {
  //   console.log("Users data in component:", users);
  // }, [users]);
  const [isLoading, setLoading] = useState(loading);

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
    setBulkUserSettings(!showBulkUserSettings);
  };
  const [viewUser, setViewUser] = useState({});

  const handleViewUser = (userData) => {
    setShowViewUser(!showViewUser);
    setViewUser(userData);
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
        action: setBulkUserSettings,
        type: "dropdown",
        dropdownName: "Actions",
      },
    ];
  };

  return (
    <React.Fragment>
      <ViewUserModal
        isOpen={showViewUser}
        handleViewUser={handleViewUser}
        user={viewUser}
      />
      <AddUserModal
        isOpen={showAddUser}
        handleAddUser={handleAddUser}
        userType={userType}
        userStatus={userStatus}
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
        user={filteredUsers}
      />
      <BulkUserSettings
        isOpen={showBulkUserSettings}
        handleUserSettings={handleUserSettings}
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
                      isShowTableActionButtons={true}
                      tableActions={getTableActions()}
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
