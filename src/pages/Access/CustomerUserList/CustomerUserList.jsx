import React, { useEffect, useState, useRef, useMemo } from "react";
import { Link } from "react-router-dom";
import withRouter from "../../../components/Common/withRouter";
import TableContainer from "../../../components/Common/TableContainer";
import { Card, CardBody, Col, Container, Row, Spinner } from "reactstrap";
import Spinners from "../../../components/Common/Spinner";
import { Email } from "./customerUserlistCol";

//Import Breadcrumb
import Breadcrumbs from "/src/components/Common/Breadcrumb";

import {
  goToPage as onGoToPage,
  getCustomerUsers as onGetCustomerUsers,
  getCustomerUsersSettings as onGetCustomerUsersSettings,
} from "/src/store/customerusers/actions";

//redux
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { ToastContainer } from "react-toastify";
import ViewCustomerUserModal from "./ViewCustomerListModal";
import BulkInactiveCustomerList from "./BulkInactiveCustomerList";
import { getUserStatus as onGetUserStatus } from "/src/store/users/actions";
import TableContainerX from "../../../components/Common/TableContainerX";

const CustomerUserList = (props) => {
  //meta title
  document.title = "Customer Users | VDigital";
  const [viewCustomerUserModal, setViewCustomerUserModal] = useState(false);
  const [showBulkActiveModal, setShowBulkActiveModal] = useState(false);
  const dispatch = useDispatch();

  const selectCustomerUsersState = (state) => state.customerUsers;
  const customerUsersProperties = createSelector(
    selectCustomerUsersState,
    (customerUsers) => ({
      cusUsers: customerUsers.customerUsers,
      loading: customerUsers.loading,
      cusUsersSettings: customerUsers.customerUsersSettings,
      totalPage: customerUsers.totalPages,
      totalCount: customerUsers.totalCount,
      pageSize: customerUsers.perPage,
      currentPage: customerUsers.currentPage,
    })
  );

  const selectUsersState = (state) => state.users;
  const UsersProperties = createSelector(selectUsersState, (Users) => ({
    userStatus: Users.userStatus,
    // userRegional: Users.userRegional,
    // userMsoDetails: Users.userMsoDetails,
    // userDistributor: Users.userDistributor,
  }));
  const {
    cusUsers,
    loading,
    cusUsersSettings,
    totalPage,
    totalCount,
    pageSize,
    currentPage,
  } = useSelector(customerUsersProperties);
  const { userStatus } = useSelector(UsersProperties);
  console.log("customer: " + JSON.stringify(cusUsers));

  // const [isLoading, setLoading] = useState(loading);
  const columns = useMemo(
    () => [
      {
        Header: "#",
        disableFilters: true,
        filterable: true,
        Cell: (cellProps) => {
          // const totalRows = cellProps.rows.length;
          // const reverseIndex = totalRows - cellProps.row.index;
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
                className="font-size-14 mb-1"
                // onClick={() => {
                //   const userData = cellProps.row.original;
                //   handleViewCustomerUser(userData);
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
        Header: "Login ID",
        accessor: "login_id",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">{cellProps.row.original.login_id}</p>
          );
        },
      },
      {
        Header: "Mobile",
        accessor: "mobile_no",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              {cellProps.row.original.mobile_no}
            </p>
          );
        },
      },
      {
        Header: "Email ID",
        accessor: "email",
        filterable: true,
        Cell: (cellProps) => {
          return <Email {...cellProps} />;
        },
      },
      {
        Header: "Status",
        accessor: "status",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <h5 className="font-size-14 mb-1">
              <Link className="text-dark" to="#">
                {cellProps.row.original.status === 1
                  ? "Active"
                  : cellProps.row.original.status === 0
                  ? "In-Active"
                  : "Blocked"}
              </Link>
            </h5>
          );
        },
      },
      {
        Header: "LCO",
        accessor: "lco", //"operator_lbl",
        filterable: true,
        Cell: (cellProps) => {
          // {
          //   console.log("lco:" + JSON.stringify(cellProps.row.original));
          // }
          // {
          //   console.log("lco2:" + JSON.stringify(cellProps.row.original.lco));
          // }
          return (
            <p className="text-muted mb-0">{cellProps.row.original.lco}</p>
          );
        },
      },
      {
        Header: "LCO Code",
        accessor: "lco_code",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">{cellProps.row.original.lco_code}</p>
          );
        },
      },
      {
        Header: "LAST LOGIN TIME",
        accessor: "last_login_at",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="font-size-14 mb-1">
              <Link className="text-dark" to="#">
                {cellProps.row.original.last_login_at === null
                  ? "Never Logged In"
                  : cellProps.row.original.last_login_at}
              </Link>
            </p>
          );
        },
      },
      {
        Header: "Created At",
        accessor: "created_at",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              {cellProps.row.original.created_at}
            </p>
          );
        },
      },
      {
        Header: "Created By",
        accessor: "created_by_lbl",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              {cellProps.row.original.created_by_lbl}
            </p>
          );
        },
      },
    ],
    []
  );

  useEffect(() => {
    if (cusUsers && !cusUsers.length) {
      dispatch(onGetCustomerUsers());
      dispatch(onGetUserStatus());
      dispatch(onGetCustomerUsersSettings());
    }
  }, [dispatch, cusUsers]);

  const goToPage = (toPage) => {
    console.log("[GOTO PAGE] Trigger to page - ", toPage);
    dispatch(onGoToPage(toPage));
    dispatch(onGetCustomerUsers());
  };

  const handleShowBulkActiveUser = () => {
    setShowBulkActiveModal(!showBulkActiveModal);
  };
  const [viewCustomerUser, setViewCustomerUser] = useState({});

  const toggleViewModal = (row) => {
    setViewCustomerUserModal(!viewCustomerUserModal);
    setViewCustomerUser(row);
  };
  const resetSelection = () => {
    setViewUser({});
  };
  const [filteredUsers, setFilteredUsers] = useState([]);
  useEffect(() => {
    // Filter users based on status values "Bulk" and "Inactive"
    const filteredData = cusUsers.filter(
      (user) => user.status_lbl === "Bulk" || user.status_lbl === "Inactive"
    );

    setFilteredUsers(filteredData);
    console.log("Filtered Users - ".filteredData);
  }, [dispatch, cusUsers]);

  var node = useRef();

  const keyField = "id";

  const getTableActions = () => {
    return [
      {
        name: "Bulk Active/Inactive User",
        action: setShowBulkActiveModal,
        type: "dropdown",
        dropdownName: "Action",
        icon: "create",
      },
    ];
  };
  console.log("Fetched Customer Users - ", cusUsers);
  return (
    <React.Fragment>
      <ViewCustomerUserModal
        isOpen={viewCustomerUserModal}
        resetSelection={resetSelection}
        toggleViewModal={toggleViewModal}
        customeruser={viewCustomerUser}
        userStatus={userStatus}
      />
      <BulkInactiveCustomerList
        isOpen={showBulkActiveModal}
        handleShowBulkActiveUser={handleShowBulkActiveUser}
        users={filteredUsers}
        cusUsersSettings={cusUsersSettings}
      />
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Access" breadcrumbItem="Customer Users" />
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
                    {/* <TableContainer
                      isPagination={true}
                      columns={columns}
                      data={cusUsers}
                      isGlobalFilter={true}
                      isShowTableActionButtons={true}
                      isShowingPageLength={true}
                      tableActions={getTableActions()}
                      handleRowClick={(row) => {
                        handleViewCustomerUser(row);
                      }}
                      // iscustomPageSizeOptions={true}
                      customPageSize={5}
                      tableClass="table align-middle table-nowrap table-hover"
                      theadClass="table-light"
                      paginationDiv="col-sm-12 col-md-7"
                      pagination="pagination pagination-rounded justify-content-end mt-4"
                    /> */}
                    <TableContainerX
                      columns={columns}
                      data={cusUsers}
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

export default withRouter(CustomerUserList);
