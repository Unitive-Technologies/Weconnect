import React, { useEffect, useState, useRef, useMemo } from "react";
import { Link } from "react-router-dom";
import withRouter from "../../../components/Common/withRouter";
import TableContainer from "../../../components/Common/TableContainer";
import Spinners from "../../../components/Common/Spinner";
import { Card, CardBody, Col, Container, Row, Spinner } from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "/src/components/Common/Breadcrumb";

import {
  goToPage as onGoToPage,
  getUsers as onGetUsers,
  getUserType as onGetUserType,
  getUserStatus as onGetUserStatus,
  getUserRole as onGetUserRole,
  getUserDesignation as onGetUserDesignation,
  getUserMsoPolicy as onGetUserMsoPolicy,
  getUserBulkSettings as onGetUserBulkSettings,
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
import BulkInactiveUserModal from "./BulkInactiveUserModal";
import BulkUserSettings from "./BulkUserSettings";
import TableContainerX from "../../../components/Common/TableContainerX";

const ContactsList = (props) => {
  //meta title
  document.title = "Users | VDigitals";

  const dispatch = useDispatch();

  const selectContactsState = (state) => state.users;
  // console.log("state:" + JSON.stringify(state.users));
  const ContactsProperties = createSelector(selectContactsState, (Users) => ({
    users: Users.users,
    loading: Users.loading,
    userType: Users.userType,
    userStatus: Users.userStatus,
    userRole: Users.userRole,
    userDesignation: Users.userDesignation,
    userMsoPolicy: Users.userMsoPolicy,
    userBulkSettings: Users.userBulkSettings,
    // userRegional: Users.userRegional,
    // userMsoDetails: Users.userMsoDetails,
    // userDistributor: Users.userDistributor,
    totalPage: Users.totalPages,
    totalCount: Users.totalCount,
    pageSize: Users.perPage,
    currentPage: Users.currentPage,
  }));

  const {
    users,
    userType,
    userStatus,
    userRole,
    userDesignation,
    userMsoPolicy,
    userBulkSettings,
    totalPage,
    totalCount,
    pageSize,
    currentPage,
    // userRegional,
    // userMsoDetails,
    // userDistributor,
    loading,
  } = useSelector(ContactsProperties);

  console.log("Users Value - From UseSelector..", JSON.stringify(users));
  console.log(`TotalCount - ${totalCount}`);
  console.log(`PageSize - ${pageSize}`);
  console.log(`CurrentPage - ${currentPage}`);
  console.log(`TotalPage - ${totalPage}`);

  // useEffect(() => {
  //   console.log("Users data in component:", users);
  // }, [users]);
  // const [isLoading, setLoading] = useState(loading);

  const [showAddUser, setShowAddUser] = useState(false);
  const [showViewUser, setShowViewUser] = useState(false);
  const [showUploadUser, setShowUploadUser] = useState(false);
  const [showBulkUpdateUser, setShowBulkUpdateUser] = useState(false);
  const [showInactivateUser, setShowInactivateUser] = useState(false);
  const [showBulkUserSettings, setShowBulkUserSettings] = useState(false);
  const [viewUser, setViewUser] = useState({});
  const columns = useMemo(
    () => [
      {
        Header: "#",
        disableFilters: true,
        filterable: true,
        Cell: (cellProps) => {
          const startIndex = (currentPage - 1) * pageSize;
          const index = startIndex + cellProps.row.index + 1;

          return (
            <>
              <h5 className="font-size-14 mb-1">
                <Link className="text-dark" to="#">
                  {index}
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
              <h5 className="font-size-14 ">
                <Link className="text-dark" to="#">
                  {cellProps.row.original.status === 1 ? (
                    "Active"
                  ) : cellProps.row.original.status === 0 ? (
                    <p
                      style={{
                        background: "red",
                        padding: "5px",
                        color: "white",
                        borderRadius: "5px",
                      }}
                    >
                      In-Active
                    </p>
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
        accessor: "group_lbl",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <>
              <h5 className="font-size-14 mb-1">
                <Link className="text-dark" to="#">
                  {cellProps.row.original.group_lbl}
                </Link>
              </h5>
            </>
          );
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
      dispatch(onGetUserBulkSettings());
    }
  }, [dispatch, users]);

  const goToPage = (toPage) => {
    console.log("[GOTO PAGE] Trigger to page - ", toPage);
    dispatch(onGoToPage(toPage));
    dispatch(onGetUsers());
  };
  const toggleAddModal = () => {
    setShowAddUser(!showAddUser);
  };
  const toggleUploadModal = () => {
    setShowUploadUser(!showUploadUser);
  };

  const resetSelection = () => {
    setViewUser({});
  };
  // const toggleViewModal = () => {
  //   setShowViewUser(!showViewUser);
  // };

  const handleBulkUpdateUser = () => {
    setShowBulkUpdateUser(!showBulkUpdateUser);
  };

  const handleBulkInactiveUser = () => {
    setShowInactivateUser(!showInactivateUser);
  };

  const handleUserSettings = () => {
    setShowBulkUserSettings(!showBulkUserSettings);
  };

  const toggleViewModal = (row) => {
    // console.log("Row data:", row);
    setShowViewUser(!showViewUser);
    setViewUser(row);
    // if (row.length) {
    //   console.log("Id: ", row.id);
    //   setSelectedId(row.id);
    // }
  };

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
      {showViewUser && (
        <ViewUserModal
          isOpen={Boolean(showViewUser)}
          // handleViewUser={toggleViewModal}
          user={viewUser}
          userType={userType}
          userStatus={userStatus}
          userRole={userRole}
          userDesignation={userDesignation}
          resetSelection={resetSelection}
          toggleModal={toggleViewModal}
        />
      )}
      {showAddUser && (
        <AddUserModal
          isOpen={Boolean(showAddUser)}
          toggleAddModal={toggleAddModal}
          userType={userType}
          userStatus={userStatus}
          userRole={userRole}
          userDesignation={userDesignation}
          userMsoPolicy={userMsoPolicy}
          // userRegional={userRegional}
          // userMsoDetails={userMsoDetails}
          // userDistributor={userDistributor}
        />
      )}
      <UploadUserModal
        title="Upload User"
        isOpen={showUploadUser}
        toggleUploadModal={toggleUploadModal}
        actiontype={"add"}
      />
      <UploadUserModal
        title="Bulk Update User"
        isOpen={showBulkUpdateUser}
        toggleUploadModal={handleBulkUpdateUser}
        actiontype={"update"}
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
      {/* {console.log("BulkUserSettings:" + JSON.stringify(userBulkSettings))} */}
      <BulkUserSettings
        isOpen={showBulkUserSettings}
        toggleUserSettings={handleUserSettings}
        users={users}
        userBulkSettings={userBulkSettings}
      />
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Access" breadcrumbItem="Users" />
          {/* {isLoading ? (
            <Spinners setLoading={setLoading} /> */}
          {loading ? (
            <React.Fragment>
              <Spinner
                color="primary"
                className="position-absolute top-50 start-50"
              />
            </React.Fragment>
          ) : (
            <Row>
              <Col lg="12">
                <Card>
                  <CardBody>
                    <TableContainerX
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
