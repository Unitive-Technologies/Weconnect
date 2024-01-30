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
  getComplaintSubCategory as onGetComplaintSubCategory,
  getComplaintSubCategoryStatus as onGetComplaintSubCategoryStatus,
  getComplaintSubCategoryCategory as onGetComplaintSubCategoryCategory,
  getComplaintSubCategoryDesignation as onGetComplaintSubCategoryDesignation,
} from "/src/store/actions";

//redux
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { ToastContainer } from "react-toastify";
import AddNewSubCategoryList from "./AddNewSubCategoryList";
import ViewSubCategoryList from "./ViewSubCategoryList";

const ComplaintSubCategoryList = (props) => {
  //meta title
  document.title = "Complaint Sub-Categories | VDigital";

  const dispatch = useDispatch();

  const selectComplaintSubCategoryState = (state) => state.complaintsubcategory;
  const ComplaintSubCategoryProperties = createSelector(
    selectComplaintSubCategoryState,
    (complaintsubcategory) => ({
      complaintsubcate: complaintsubcategory.complaintsubcategory,
      complaintsubcateStatus: complaintsubcategory.complaintsubcategoryStatus,
      complaintsubcateCategory:
        complaintsubcategory.complaintsubcategoryCategory,
      complaintsubcateDesignation:
        complaintsubcategory.complaintsubcategoryDesignation,
      loading: complaintsubcategory.loading,
    })
  );

  const {
    complaintsubcate,
    complaintsubcateStatus,
    complaintsubcateCategory,
    complaintsubcateDesignation,
    loading,
  } = useSelector(ComplaintSubCategoryProperties);

  // const [isLoading, setLoading] = useState(loading);

  const [showAddNewSubCategoryList, setShowAddNewSubCategoryList] =
    useState(false);
  const [showViewSubCategoryList, setShowViewSubCategoryList] = useState(false);

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
                onClick={() => {
                  const userData = cellProps.row.original;
                  toggleViewSubCategory(userData);
                }}
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
    if (complaintsubcate && !complaintsubcate.length) {
      dispatch(onGetComplaintSubCategory());
      dispatch(onGetComplaintSubCategoryStatus());
      dispatch(onGetComplaintSubCategoryCategory());
      dispatch(onGetComplaintSubCategoryDesignation());
    }
  }, [dispatch, complaintsubcate]);

  const toggleAddSubCategory = () => {
    setShowAddNewSubCategoryList(!showAddNewSubCategoryList);
  };

  const [viewSubCategoryList, setViewSubCategoryList] = useState({});

  const toggleViewSubCategory = (userSubCategoryData) => {
    setShowViewSubCategoryList(!showViewSubCategoryList);
    setViewSubCategoryList(userSubCategoryData);
  };

  const keyField = "id";

  const getTableActions = () => {
    return [
      {
        name: "Create",
        action: setShowAddNewSubCategoryList,
        type: "normal",
        icon: "create",
      },
    ];
  };

  return (
    <React.Fragment>
      <ViewSubCategoryList
        isOpen={showViewSubCategoryList}
        toggleViewSubCategory={toggleViewSubCategory}
        complaintsubcategory={viewSubCategoryList}
      />
      <AddNewSubCategoryList
        isOpen={Boolean(showAddNewSubCategoryList)}
        toggleAddSubCategory={toggleAddSubCategory}
        complaintsubcateStatus={complaintsubcateStatus}
        complaintsubcateCategory={complaintsubcateCategory}
        complaintsubcateDesignation={complaintsubcateDesignation}
      />
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs
            title="Complaint"
            breadcrumbItem="Complaint Sub-Categories"
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
                    {/* {console.log(
                      "Complaint sub category list:" +
                        JSON.stringify(complaintsubcate)
                    )} */}
                    <TableContainer
                      isPagination={true}
                      columns={columns}
                      data={complaintsubcate}
                      isGlobalFilter={true}
                      isShowTableActionButtons={true}
                      isShowingPageLength={true}
                      // iscustomPageSizeOptions={true}
                      customPageSize={8}
                      tableActions={getTableActions()}
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

export default withRouter(ComplaintSubCategoryList);
