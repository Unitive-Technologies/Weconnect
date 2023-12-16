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

import { Email, Tags, Projects } from "./groupPolicyListCol";

//Import Breadcrumb
import Breadcrumbs from "/src/components/Common/Breadcrumb";
import DeleteModal from "/src/components/Common/DeleteModal";

import { getGroupPolicy as onGetGroupPolicy } from "/src/store/actions";

import { isEmpty } from "lodash";

//redux
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { ToastContainer } from "react-toastify";
import ViewGroupPolicyModal from "./ViewGroupPolicyModal";
import AddGroupPolicyModal from "./AddGroupPolicyModal";

const GroupPolicyList = (props) => {
  //meta title
  document.title = "Group Policies | VDigital";

  const dispatch = useDispatch();

  const selectGroupPolicyState = (state) => state.groupPolicy;
  const groupPolicyProperties = createSelector(
    selectGroupPolicyState,
    (groupPolicy) => ({
      gpPolicy: groupPolicy.groupPolicy,
      loading: groupPolicy.loading,
    })
  );
  const { gpPolicy, loading } = useSelector(groupPolicyProperties);

  const [isLoading, setLoading] = useState(loading);

  const [showAddGroupPolicy, setShowAddGroupPolicy] = useState(false);
  const [viewGroupPolicyModal, setViewGroupPolicyModal] = useState(false);
  const [showAssignGroupPolicy, setShowAssignGroupPolicy] = useState(false);

  const handleAssignGroupPolicy = () => {
    setShowAssignGroupPolicy(!showAssignGroupPolicy);
  };

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
                  handleViewGroupPolicy(userData);
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
        Header: "Description",
        accessor: "description",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p
              className="text-muted mb-0"
              style={{
                maxWidth: 200,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {cellProps.row.original.description}
            </p>
          );
        },
      },
      {
        Header: "Count",
        accessor: "count",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">{cellProps.row.original.count}</p>
          );
        },
      },
      {
        Header: "View Users",
        accessor: "viewusers", //"operator_lbl",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <h5 className="font-size-14 mb-1">
              <Link className="text-dark" to="#">
                <p className="text-muted mb-0">View User</p>
              </Link>
            </h5>
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
        accessor: "created_by",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              {cellProps.row.original.created_by}
            </p>
          );
        },
      },
    ],
    []
  );

  useEffect(() => {
    if (gpPolicy && !gpPolicy.length) {
      dispatch(onGetGroupPolicy());
    }
  }, [dispatch, gpPolicy]);

  const handleAddGroupPolicy = () => {
    setShowAddGroupPolicy(!showAddGroupPolicy);
  };
  const [viewGroupPolicy, setViewGroupPolicy] = useState({});

  const handleViewGroupPolicy = (groupPolicy) => {
    setViewGroupPolicyModal(!viewGroupPolicyModal);
    setViewGroupPolicy(groupPolicy);
  };

  var node = useRef();

  const keyField = "id";

  const getTableActions = () => {
    return [
      {
        name: "Create",
        action: setShowAddGroupPolicy,
        type: "normal",
        icon: "create",
      },
      {
        name: "Assign",
        action: setShowAssignGroupPolicy,
        type: "normal",
        icon: "upload",
      },
    ];
  };
  return (
    <React.Fragment>
      <ViewGroupPolicyModal
        isOpen={viewGroupPolicyModal}
        handleViewGroupPolicy={handleViewGroupPolicy}
        groupPolicy={viewGroupPolicyModal}
      />
      <AddGroupPolicyModal
        isOpen={showAddGroupPolicy}
        handleAddGroupPolicy={handleAddGroupPolicy}
      />
      <div
        className="position-fixed top-0 end-0 p-3"
        style={{ zIndex: "1005" }}
      >
        <Toast isOpen={showAssignGroupPolicy}>
          <ToastHeader toggle={handleAssignGroupPolicy}>
            <i className="mdi mdi-alert-outline me-2"></i> Warning
          </ToastHeader>
          <ToastBody>Please select Group Policy to apply</ToastBody>
        </Toast>
      </div>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Access" breadcrumbItem="Group Policies" />
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
                      data={gpPolicy}
                      isGlobalFilter={true}
                      isShowTableActionButtons={true}
                      isShowingPageLength={true}
                      tableActions={getTableActions()}
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

export default withRouter(GroupPolicyList);
