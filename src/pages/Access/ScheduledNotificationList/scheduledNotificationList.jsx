import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import withRouter from "../../../components/Common/withRouter";
import TableContainer from "../../../components/Common/TableContainer";
import Spinners from "../../../components/Common/Spinner";
import { Card, CardBody, Col, Container, Row } from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "/src/components/Common/Breadcrumb";

import { getScheduledNotification as onGetScheduledNotification } from "/src/store/actions";

//redux
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { ToastContainer } from "react-toastify";

const ScheduledNotificationList = (props) => {
  //meta title
  document.title = "Scheduled Notification | VDigital";

  const dispatch = useDispatch();

  const selectScheduledNotificationState = (state) =>
    state.schedulednotification;
  const ScheduledNotificationProperties = createSelector(
    selectScheduledNotificationState,
    (schedulednotification) => ({
      schedulednotify: schedulednotification.schedulednotification,
      loading: schedulednotification.loading,
    })
  );

  const { schedulednotify, loading } = useSelector(
    ScheduledNotificationProperties
  );
  const [isLoading, setLoading] = useState(loading);
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
        Header: "Content",
        accessor: "content",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">{cellProps.row.original.content}</p>
          );
        },
      },
      {
        Header: "Type",
        accessor: "type",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">{cellProps.row.original.type}</p>
          );
        },
      },
      {
        Header: "START TIME",
        accessor: "starttime",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              {cellProps.row.original.starttime}
            </p>
          );
        },
      },
      {
        Header: "END TIME",
        accessor: "endtime",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">{cellProps.row.original.endtime}</p>
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
        Header: "Broadcast Status",
        accessor: "broadcast_status",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              {cellProps.row.original.broadcast_status}
            </p>
          );
        },
      },
      {
        Header: "User Count",
        accessor: "usercount",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              {cellProps.row.original.usercount}
            </p>
          );
        },
      },
      {
        Header: "Scheduled At",
        accessor: "scheduledat",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              {cellProps.row.original.scheduledat}
            </p>
          );
        },
      },
      {
        Header: "Scheduled By",
        accessor: "scheduledby",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              {cellProps.row.original.sheduledby}
            </p>
          );
        },
      },
    ],
    []
  );

  useEffect(() => {
    if (schedulednotify && !schedulednotify.length) {
      dispatch(onGetScheduledNotification());
    }
  }, [dispatch, schedulednotify]);

  const keyField = "id";

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Access" breadcrumbItem="Scheduled Notification" />
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
                      data={schedulednotify}
                      isGlobalFilter={true}
                      isShowingPageLength={true}
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

export default withRouter(ScheduledNotificationList);
