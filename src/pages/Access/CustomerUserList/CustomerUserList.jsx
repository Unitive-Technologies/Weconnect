import React, { useEffect, useState, useRef, useMemo } from "react";
import { Link } from "react-router-dom";
import withRouter from "../../../components/Common/withRouter";
import TableContainer from "../../../components/Common/TableContainer";
import {
  Card,
  CardBody,
  Col,
  Container,
  Row,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

import { Email } from "./customerUserlistCol";

//Import Breadcrumb
import Breadcrumbs from "/src/components/Common/Breadcrumb";

import { getCustomerUsers as onGetCustomerUsers } from "/src/store/actions";

//redux
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { ToastContainer } from "react-toastify";
import ViewCustomerUserModal from "./ViewCustomerListModal";
import BulkInactiveCustomerList from "./BulkInactiveCustomerList";

const CustomerUserList = (props) => {
  //meta title
  document.title = "Customer User List | VDigital";
  const [showCustomerUserModal, setShowCustomerUserModal] = useState(false);
  const [showBulkActiveModal, setBulkActiveModal] = useState(false);
  const dispatch = useDispatch();

  const selectCustomerUsersState = (state) => state.customerUsers;
  const customerUsersProperties = createSelector(
    selectCustomerUsersState,
    (customerUsers) => ({
      cusUsers: customerUsers.customerUsers,
      loading: customerUsers.loading,
    })
  );

  const { cusUsers, loading } = useSelector(customerUsersProperties);

  useEffect(() => {
    console.log("Customer Users data in component:", cusUsers);
  }, [cusUsers]);

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
                className="font-size-14 mb-1"
                onClick={() => {
                  const userData = cellProps.row.original;
                  viewCustomerUser(userData);
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
    }
  }, [dispatch, cusUsers]);

  const showBulkActiveUser = () => {
    setBulkActiveModal(!showBulkActiveModal);
  };
  const [viewUser, setViewUser] = useState({});

  const viewCustomerUser = (userData) => {
    setShowCustomerUserModal(!showCustomerUserModal);
    setViewUser(userData);
    // toggle();
  };

  const [filteredUsers, setFilteredUsers] = useState([]);
  useEffect(() => {
    // Filter users based on status values "Bulk" and "Inactive"
    const filteredData = cusUsers.filter(
      (user) => user.status_lbl === "Bulk" || user.status_lbl === "Inactive"
    );

    setFilteredUsers(filteredData);
  }, [cusUsers]);

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

  const keyField = "id";

  const getTableActions = () => {
    return [
      {
        name: "Bulk Active/Inactive User",
        action: showBulkActiveUser,
        type: "dropdown",
        dropdownName: "Action",
      },
    ];
  };
  return (
    <React.Fragment>
      <ViewCustomerUserModal
        isOpen={showCustomerUserModal}
        toggle={viewCustomerUser}
        user={viewUser}
      />
      <BulkInactiveCustomerList
        isOpen={showBulkActiveModal}
        toggle={showBulkActiveUser}
        user={filteredUsers}
      />
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Access" breadcrumbItem="Customer User List" />
          {/* {isLoading ? (
            <Spinners setLoading={setLoading} />
          ) : ( */}
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <div className="d-flex align-items-center justify-content-between">
                    <h5 className="mb-0 card-title flex-grow-1">
                      {/* Jobs Lists */}
                    </h5>
                    <div className="flex-shrink-0">
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
                          <li onClick={() => setBulkActiveModal(true)}>
                            <DropdownItem href="#">
                              Bulk Active/Inactive User
                            </DropdownItem>
                          </li>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </div>
                  </div>
                </CardBody>
                <CardBody>
                  {console.log("Customer users:" + JSON.stringify(cusUsers))}
                  <TableContainer
                    isPagination={true}
                    columns={columns}
                    data={cusUsers}
                    isGlobalFilter={true}
                    // isAddUserList={true}
                    isShowingPageLength={true}
                    // iscustomPageSizeOptions={true}
                    handleUserClick={() => {}}
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
          {/* )} */}
        </Container>
      </div>
      <ToastContainer />
    </React.Fragment>
  );
};

export default withRouter(CustomerUserList);
