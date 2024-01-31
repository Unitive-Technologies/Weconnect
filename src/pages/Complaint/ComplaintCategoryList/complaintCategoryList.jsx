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
  Spinner,
  UncontrolledTooltip,
} from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "/src/components/Common/Breadcrumb";
import {
  getComplaintCategory as onGetComplaintCategory,
  getComplaintCategoryStatus as onGetComplaintCategoryStatus,
} from "/src/store/actions";

//redux
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { ToastContainer } from "react-toastify";
import AddNewComplaintCategoryList from "./AddNewComplaintCategoryList";
import ViewComplaintCategoryList from "./ViewComplaintCategoryList";

const ComplaintCategoryList = (props) => {
  //meta title
  document.title = "Complaint Categories | VDigital";

  const dispatch = useDispatch();

  const selectComplaintCategoryState = (state) => state.complaintcategory;
  const ComplaintCategoryProperties = createSelector(
    selectComplaintCategoryState,
    (complaintcategory) => ({
      complaintcate: complaintcategory.complaintcategory,
      complaintcateStatus: complaintcategory.complaintcategoryStatus,
      loading: complaintcategory.loading,
    })
  );

  const { complaintcate, loading, complaintcateStatus } = useSelector(
    ComplaintCategoryProperties
  );

  // const [isLoading, setLoading] = useState(loading);

  const [showAddNewComplaintCategoryList, setShowAddNewComplaintCategoryList] =
    useState(false);
  const [showViewComplaintCategoryList, setShowViewComplaintCategoryList] =
    useState(false);

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
                //   handleViewComplaintCategory(userData);
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
        Header: "status",
        accessor: "status_lbl",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              {cellProps.row.original.status_lbl}
            </p>
          );
        },
      },
      {
        Header: "ShowOnWeb",
        accessor: "showonweb_lbl",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              {cellProps.row.original.showonweb_lbl}
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
    if (complaintcate && !complaintcate.length) {
      dispatch(onGetComplaintCategory());
      dispatch(onGetComplaintCategoryStatus());
    }
  }, [dispatch, complaintcate]);

  const toggleAddModal = () => {
    setShowAddNewComplaintCategoryList(!showAddNewComplaintCategoryList);
  };

  const [viewComplaintCategoryList, setViewComplaintCategoryList] = useState(
    {}
  );

  const toggleViewModal = (userComplaintData) => {
    setShowViewComplaintCategoryList(!showViewComplaintCategoryList);
    setViewComplaintCategoryList(userComplaintData);
  };

  const resetSelection = () => {
    setViewComplaintCategoryList({});
  };
  const keyField = "id";

  const getTableActions = () => {
    return [
      {
        name: "Create",
        action: setShowAddNewComplaintCategoryList,
        type: "normal",
        icon: "create",
      },
    ];
  };

  return (
    <React.Fragment>
      <ViewComplaintCategoryList
        isOpen={showViewComplaintCategoryList}
        toggleViewModal={toggleViewModal}
        complaintcategory={viewComplaintCategoryList}
        complaintcateStatus={complaintcateStatus}
        resetSelection={resetSelection}
      />
      <AddNewComplaintCategoryList
        isOpen={showAddNewComplaintCategoryList}
        toggleAddModal={toggleAddModal}
        complaintcateStatus={complaintcateStatus}
      />
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs
            title="Complaint"
            breadcrumbItem="Complaint Categories"
          />
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
                    <TableContainer
                      isPagination={true}
                      columns={columns}
                      data={complaintcate}
                      isGlobalFilter={true}
                      isShowTableActionButtons={true}
                      isShowingPageLength={true}
                      tableActions={getTableActions()}
                      customPageSize={8}
                      handleRowClick={(userComplaintData) => {
                        toggleViewModal(userComplaintData);
                      }}
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

export default withRouter(ComplaintCategoryList);
