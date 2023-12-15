import React, { useEffect, useState, useRef, useMemo } from "react";
import { Link } from "react-router-dom";
import withRouter from "../../../components/Common/withRouter";
import TableContainer from "../../../components/Common/TableContainer";
import Spinners from "../../../components/Common/Spinner";
import { Card, CardBody, Col, Container, Row } from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "/src/components/Common/Breadcrumb";

import { getAppAdBanner as onGetAppAdBanner } from "/src/store/actions";

//redux
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { ToastContainer } from "react-toastify";
import AddNewAppAdBanner from "./AddNewAppAdBanner";

const AppAdBannerList = (props) => {
  //meta title
  document.title = "App Advertisement Banners | VDigital";

  const dispatch = useDispatch();

  const selectAppAdBannerState = (state) => state.appadbanner;
  const AppAdBannerProperties = createSelector(
    selectAppAdBannerState,
    (appadbanner) => ({
      appAdvertiseBan: appadbanner.appadbanner,
      loading: appadbanner.loading,
    })
  );

  const { appAdvertiseBan, loading } = useSelector(AppAdBannerProperties);

  const [isLoading, setLoading] = useState(loading);

  const [showAddAppAdBanner, setShowAddAppAdBanner] = useState(false);

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
        Header: "Title",
        accessor: "title",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">{cellProps.row.original.title}</p>
          );
        },
      },
      {
        Header: "Caption",
        accessor: "caption",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">{cellProps.row.original.caption}</p>
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
        Header: "Start Date",
        accessor: "start_date",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              {cellProps.row.original.start_date}
            </p>
          );
        },
      },
      {
        Header: "End date",
        accessor: "end_date",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">{cellProps.row.original.end_date}</p>
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
    if (appAdvertiseBan && !appAdvertiseBan.length) {
      dispatch(onGetAppAdBanner());
    }
  }, [dispatch, appAdvertiseBan]);

  const handleAddAppAdBanner = () => {
    setShowAddAppAdBanner(!showAddAppAdBanner);
  };

  const keyField = "id";

  const getTableActions = () => {
    return [
      {
        name: "Create",
        action: setShowAddAppAdBanner,
        type: "normal",
        icon: "create",
      },
    ];
  };

  return (
    <React.Fragment>
      <AddNewAppAdBanner
        isOpen={showAddAppAdBanner}
        handleAddAppAdBanner={handleAddAppAdBanner}
      />
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs
            title="Access"
            breadcrumbItem="App Advertisement Banners"
          />
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
                      data={appAdvertiseBan}
                      isGlobalFilter={true}
                      isShowTableActionButtons={true}
                      isShowingPageLength={true}
                      tableActions={getTableActions()}
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

export default withRouter(AppAdBannerList);
