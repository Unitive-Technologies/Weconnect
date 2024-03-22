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
  Spinner,
} from "reactstrap";
import Breadcrumbs from "/src/components/Common/Breadcrumb";
import {
  getDesignation as onGetDesignation,
  getDesignationStatus as onGetDesignationStatus,
  getDesignationType as onGetDesignationType,
  getDesignationParent as onGetDesignationParent,
} from "/src/store/actions";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { ToastContainer } from "react-toastify";
import AddNewDesignation from "./AddNewDesignation";
import ViewDesignation from "./ViewDesignation";

const DesignationList = (props) => {
  //meta title
  document.title = "Designations | VDigital";

  const dispatch = useDispatch();

  const selectDesignationState = (state) => state.designation;

  const designationProperties = createSelector(
    selectDesignationState,
    (designation) => ({
      desigList: designation.designation,
      loading: designation.loading,
      desigStatus: designation.designationStatus,
      desigType: designation.designationType,
      desigParent: designation.designationParent,
    })
  );

  const { desigList, loading, desigStatus, desigType, desigParent } =
    useSelector(designationProperties);

  // const [isLoading, setLoading] = useState(loading);
  const [showAddDesignation, setShowAddDesignation] = useState(false);
  const [showViewDesignation, setShowViewDesignation] = useState(false);
  const [viewDesignationData, setViewDesignationData] = useState({});

  const toggleViewDesignation = (row) => {
    console.log("row: ", row);
    setShowViewDesignation(!showViewDesignation);
    setViewDesignationData(row);
  };

  const columns = useMemo(
    () => [
      {
        Header: "#",
        // accessor: "name",
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
                // onClick={() => {
                //   const userData = cellProps.row.original;
                //   handleViewDesignation(userData);
                // }}
              >
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
        Header: "Parent",
        accessor: "parent",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              {cellProps.row.original.parent_lbl}
            </p>
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
        Header: "Type",
        // accessor: "type",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">{cellProps.row.original.type_lbl}</p>
          );
        },
      },
      {
        Header: "Status",
        accessor: "status",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <h5 className="font-size-14 ">
              <Link className="text-dark" to="#">
                {cellProps.row.original.status === 1 ? (
                  "Active"
                ) : (
                  // cellProps.row.original.status === 0 ?
                  <p
                    style={{
                      background: "#f46a6a",
                      padding: "5px",
                      color: "white",
                      borderRadius: "5px",
                    }}
                  >
                    In-Active
                  </p>
                )}
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
        // accessor: "created_by",
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
    if (desigList && !desigList.length) {
      dispatch(onGetDesignation());
      dispatch(onGetDesignationStatus());
      dispatch(onGetDesignationType());
      dispatch(onGetDesignationParent());
    }
  }, [dispatch, desigList]);

  const toggleAddDesignation = () => {
    setShowAddDesignation(!showAddDesignation);
  };

  const resetSelection = () => {
    setViewDesignationData({});
  };

  const keyField = "id";

  const getTableActions = () => {
    return [
      {
        name: "Create",
        action: setShowAddDesignation,
        type: "normal",
        icon: "create",
      },
    ];
  };

  return (
    <React.Fragment>
      <ViewDesignation
        isOpen={showViewDesignation}
        designation={viewDesignationData}
        desigStatus={desigStatus}
        desigType={desigType}
        desigParent={desigParent}
        resetSelection={resetSelection}
        toggleViewModal={toggleViewDesignation}
      />
      {console.log("desigStatus:" + JSON.stringify(desigStatus))}
      <AddNewDesignation
        isOpen={showAddDesignation}
        toggleAddDesignation={toggleAddDesignation}
        desigStatus={desigStatus}
        desigType={desigType}
        desigParent={desigParent}
      />
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Access" breadcrumbItem="Designations" />
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
                    {console.log("designation" + JSON.stringify(desigList))}
                    <TableContainer
                      isPagination={true}
                      columns={columns}
                      data={desigList}
                      isLoading={loading}
                      isGlobalFilter={true}
                      isShowTableActionButtons={true}
                      isShowingPageLength={true}
                      tableActions={getTableActions()}
                      handleRowClick={(row) => {
                        // console.log("row:" + JSON.stringify(row));
                        toggleViewDesignation(row);
                      }}
                      handleDesignationClick={() => setShowAddDesignation(true)}
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

export default withRouter(DesignationList);
