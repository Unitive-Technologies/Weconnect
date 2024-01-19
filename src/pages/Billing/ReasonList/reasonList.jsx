import React, { useEffect, useState, useRef, useMemo } from "react";
import { Link } from "react-router-dom";
import withRouter from "../../../components/Common/withRouter";
import TableContainer from "../../../components/Common/TableContainer";
import Spinners from "../../../components/Common/Spinner";
import { Card, CardBody, Col, Container, Row } from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "/src/components/Common/Breadcrumb";

import { goToPage as onGoToPage, getReason as onGetReason, getReasonStatus as onGetReasonStatus, getReasonReasonType as onGetReasonReasonType } from "/src/store/actions";

//redux
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { ToastContainer } from "react-toastify";
import AddNewReasonList from "./AddNewReasonList";
import ViewReasonList from "./ViewReasonList";
import UploadReasonList from "./UploadReasonList";
import TableContainerX from "../../../components/Common/TableContainerX";

const ReasonList = (props) => {
  //meta title
  document.title = "Reasons | VDigital";

  const dispatch = useDispatch();

  const selectReasonState = (state) => state.reason;
  const ReasonProperties = createSelector(selectReasonState, (reason) => ({
    reasons: reason.reason,
    reasonStatus: reason.reasonStatus,
    reasonReasonType: reason.reasonReasonType,
    loading: reason.loading,
    totalPage: reason.totalPages,
    totalCount: reason.totalCount,
    pageSize: reason.perPage,
    currentPage: reason.currentPage,
  }));

  const { reasons, loading, reasonStatus,
    reasonReasonType, totalPage,
    totalCount,
    pageSize,
    currentPage, } = useSelector(ReasonProperties);

  const [isLoading, setLoading] = useState(loading);
  const [showAddNewReasonList, setShowAddNewReasonList] = useState(false);
  const [showUploadReasonList, setShowUploadReasonList] = useState(false);
  const [showViewReasonList, setShowReasonList] = useState(false);

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
              //   handleViewReason(userData);
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
        Header: "Type",
        accessor: "type_display_lbl",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              {cellProps.row.original.type_display_lbl}
            </p>
          );
        },
      },
      {
        Header: "Status",
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
        Header: "Created At",
        accessor: "created_at_lbl",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              {cellProps.row.original.created_at_lbl}
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
    if (reasons && !reasons.length) {
      dispatch(onGetReason());
      dispatch(onGetReasonStatus());
      dispatch(onGetReasonReasonType());
    }
  }, [dispatch, reasons]);

  const goToPage = (toPage) => {
    console.log("[GOTO PAGE] Trigger to page - ", toPage);
    dispatch(onGoToPage(toPage));
    dispatch(onGetReason());
  };

  const handleAddReason = () => {
    setShowAddNewReasonList(!showAddNewReasonList);
  };

  const handleUploadReason = () => {
    setShowUploadReasonList(!showUploadReasonList);
  };
  const [viewReasonList, setViewReasonList] = useState({});

  const handleViewReason = (row) => {
    setShowReasonList(!showViewReasonList);
    setViewReasonList(row);
  };

  const keyField = "id";

  const getTableActions = () => {
    return [
      {
        name: "Create",
        action: setShowAddNewReasonList,
        type: "normal",
        icon: "create",
      },
      {
        name: "Upload",
        action: setShowUploadReasonList,
        type: "normal",
        icon: "upload",
      },
    ];
  };

  return (
    <React.Fragment>
      <ViewReasonList
        isOpen={showViewReasonList}
        handleViewReason={handleViewReason}
        reason={viewReasonList}
        reasonReasonType={reasonReasonType}
        reasonStatus={reasonStatus}
      />
      <AddNewReasonList
        isOpen={showAddNewReasonList}
        handleAddReason={handleAddReason}
        reasonReasonType={reasonReasonType}
        reasonStatus={reasonStatus}
      />
      <UploadReasonList
        isOpen={showUploadReasonList}
        handleUploadReason={handleUploadReason}
      />
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Billing" breadcrumbItem="Reasons" />
          {isLoading ? (
            <Spinners setLoading={setLoading} />
          ) : (
            <Row>
              <Col lg="12">
                <Card>
                  <CardBody>
                    {/* {console.log("Tax list:" + JSON.stringify(reasons))} */}
                    {/* <TableContainer
                      isPagination={true}
                      columns={columns}
                      data={reasons}
                      isGlobalFilter={true}
                      isShowTableActionButtons={true}
                      isShowingPageLength={true}
                      tableActions={getTableActions()}
                      handleRowClick={(row) => {
                        handleViewReason(row);
                      }}
                      customPageSize={8}
                      tableClass="table align-middle table-nowrap table-hover"
                      theadClass="table-light"
                      paginationDiv="col-sm-12 col-md-7"
                      pagination="pagination pagination-rounded justify-content-end mt-4"
                    /> */}
                    <TableContainerX
                      columns={columns}
                      data={reasons}
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
                        handleViewReason(row);
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

export default withRouter(ReasonList);
