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
  Toast,
  ToastHeader,
  ToastBody,
} from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "/src/components/Common/Breadcrumb";
import DeleteModal from "/src/components/Common/DeleteModal";

import { getUserHierarchy as onGetUserHierarchy } from "/src/store/actions";
import { isEmpty } from "lodash";

//redux
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { ToastContainer } from "react-toastify";
import AddUserHierarchy from "./AddUserHierarchy";

const UserHierarchyList = (props) => {
  //meta title
  document.title = "User Hierarchies | VDigital";

  const dispatch = useDispatch();
  const [toast, setToast] = useState(false);

  const selectUserHierarchyState = (state) => state.userHierarchy;
  const UserHierarchyProperties = createSelector(
    selectUserHierarchyState,
    (userHierarchy) => ({
      userHier: userHierarchy.userHierarchy,
      loading: userHierarchy.loading,
    })
  );

  const { userHier, loading } = useSelector(UserHierarchyProperties);

  // useEffect(() => {
  //   console.log("Users data in component:", userHier);
  // }, [userHier]);
  const [isLoading, setLoading] = useState(loading);

  const [showAddUserHierarchy, setShowAddUserHierarchy] = useState(false);

  const columns = useMemo(
    () => [
      {
        Header: "#",
        // accessor: "name",
        disableFilters: true,
        filterable: true,
        accessor: (cellProps) => (
          <>
            {!cellProps.img ? (
              <div className="avatar-xs">
                <span className="avatar-title rounded-circle">
                  {cellProps.name.charAt(0)}
                </span>
              </div>
            ) : (
              <div>
                <img
                  className="rounded-circle avatar-xs"
                  src={cellProps.img}
                  alt=""
                />
              </div>
            )}
          </>
        ),
      },
      {
        Header: "Name",
        accessor: "name",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <>
              <h5 className="font-size-14 mb-1">
                <Link className="text-dark" to="#">
                  {cellProps.row.original.name}
                </Link>
              </h5>
              <p className="text-muted mb-0">
                {cellProps.row.original.designation}
              </p>
            </>
          );
        },
      },
      {
        Header: "Code",
        accessor: "code",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">{cellProps.row.original.code}</p>
          );
        },
      },
      {
        Header: "Email",
        accessor: "email",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">{cellProps.row.original.email}</p>
          );
        },
      },
      {
        Header: "Description",
        accessor: "description",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              {cellProps.row.original.description}
            </p>
          );
        },
      },
      {
        Header: "Status",
        accessor: "status",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">{cellProps.row.original.status}</p>
          );
        },
      },
      {
        Header: "Parent",
        accessor: "parent",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">{cellProps.row.original.parent}</p>
          );
        },
      },
      {
        Header: "Designation",
        accessor: "designation",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              {cellProps.row.original.designation}
            </p>
          );
        },
      },
      {
        Header: "Operator Count",
        accessor: "operatorcount",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              {cellProps.row.original.operatorcount}
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
        accessor: "created_By",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              {cellProps.row.original.created_by}
            </p>
          );
        },
      },
      // {
      //   Header: "Action",
      //   Cell: (cellProps) => {
      //     return (
      //       <div className="d-flex gap-3">
      //         <Link
      //           to="#"
      //           className="text-success"
      //           onClick={() => {
      //             const userData = cellProps.row.original;
      //             handleUserClick(userData);
      //           }}
      //         >
      //           <i className="mdi mdi-pencil font-size-18" id="edittooltip" />
      //           <UncontrolledTooltip placement="top" target="edittooltip">
      //             Edit
      //           </UncontrolledTooltip>
      //         </Link>
      //         <Link
      //           to="#"
      //           className="text-danger"
      //           onClick={() => {
      //             const userData = cellProps.row.original;
      //             onClickDelete(userData);
      //           }}
      //         >
      //           <i className="mdi mdi-delete font-size-18" id="deletetooltip" />
      //           <UncontrolledTooltip placement="top" target="deletetooltip">
      //             Delete
      //           </UncontrolledTooltip>
      //         </Link>
      //       </div>
      //     );
      //   },
      // },
    ],
    []
  );

  useEffect(() => {
    if (userHier && !userHier.length) {
      dispatch(onGetUserHierarchy());
    }
  }, [dispatch, userHier]);

  const toggle = () => {
    setShowAddUserHierarchy(!showAddUserHierarchy);
  };

  var node = useRef();

  const toggleToast = () => {
    setToast(!toast);
  };

  const keyField = "id";

  const getTableActions = () => {
    return [
      {
        name: "Create",
        action: setShowAddUserHierarchy,
        type: "normal",
        icon: "create",
      },
      {
        name: "Bulk Assign to Operator",
        action: toggleToast,
        type: "dropdown",
        dropdownName: "Actions",
        // icon: "action",
      },
      {
        name: "Bulk Removel from Operator",
        action: toggleToast,
        type: "dropdown",
        dropdownName: "Actions",
      },
    ];
  };

  return (
    <React.Fragment>
      <AddUserHierarchy isOpen={showAddUserHierarchy} toggle={toggle} />
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Access" breadcrumbItem="User Hierarchies" />
          {isLoading ? (
            <Spinners setLoading={setLoading} />
          ) : (
            <Row>
              <Col lg="12">
                <Card>
                  {/* <CardBody>
                    <div className="d-flex align-items-center justify-content-between">
                      <div
                        className="position-fixed top-0 end-0 p-3"
                        style={{ zIndex: "1005" }}
                      >
                        <Toast isOpen={toast}>
                          <ToastHeader toggle={toggleToast}>
                            Warning
                          </ToastHeader>
                          <ToastBody>
                            Please selcet atleast on user hierarchy.
                          </ToastBody>
                        </Toast>
                      </div>
                    </div>
                  </CardBody> */}
                  <CardBody>
                    {console.log("user hierarchy:" + JSON.stringify(userHier))}
                    <TableContainer
                      isPagination={true}
                      columns={columns}
                      data={userHier}
                      isGlobalFilter={true}
                      isAddUserList={true}
                      isShowingPageLength={true}
                      tableActions={getTableActions()}
                      handleUserHierarchyClick={() =>
                        setShowAddUserHierarchy(true)
                      }
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

export default withRouter(UserHierarchyList);
