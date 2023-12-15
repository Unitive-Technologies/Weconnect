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
} from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "/src/components/Common/Breadcrumb";

import { getScheduleCustomerNotification as onGetScheduleCustomerNotification } from "/src/store/actions";

//redux
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { ToastContainer } from "react-toastify";
import AddNewScheduleCustomerNotification from "./AddNewScheduleCustomerNotification";

const ScheduleCustomerNotificationList = (props) => {
  //meta title
  document.title = "Schedule Customer Notification | VDigital";

  const dispatch = useDispatch();

  const selectScheduleCustomerNotificationState = (state) =>
    state.scheduleCustomerNotification;
  const scheduleCustomerNotificationProperties = createSelector(
    selectScheduleCustomerNotificationState,
    (scheduleCustomerNotification) => ({
      schCusNotification:
        scheduleCustomerNotification.scheduleCustomerNotification,
      loading: scheduleCustomerNotification.loading,
    })
  );

  const { schCusNotification, loading } = useSelector(
    scheduleCustomerNotificationProperties
  );
  const [isLoading, setLoading] = useState(loading);

  const [showAddNewScheduleCustNoti, setShowAddNewScheduleCustNoti] =
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
        Header: "Type",
        accessor: "type_lbl",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">{cellProps.row.original.type_lbl}</p>
          );
        },
      },
      {
        Header: "Schedule Days",
        accessor: "schedule_days",
        filterable: true,
        Cell: (cellProps) => {
          const scheduleDaysArray = cellProps.row.original.schedule_days;

          if (Array.isArray(scheduleDaysArray)) {
            const scheduleDaysString = scheduleDaysArray.join(",");
            return <p className="text-muted mb-0">{scheduleDaysString}</p>;
          } else {
            // Handle the case when schedule_days is not an array
            return <p className="text-muted mb-0">Invalid Schedule Days</p>;
          }
        },
      },

      {
        Header: "OSD Template",
        accessor: "osd_template_id_lbl",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              {cellProps.row.original.osd_template_id_lbl}
            </p>
          );
        },
      },
      {
        Header: "OSD configuration",
        accessor: "osd_configuration_id_lbl",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              {cellProps.row.original.osd_configuration_id_lbl}
            </p>
          );
        },
      },
      {
        Header: "Bmail Template",
        accessor: "bmail_template_id_lbl",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              {cellProps.row.original.bmail_template_id_lbl}
            </p>
          );
        },
      },
      {
        Header: "SMS Template",
        accessor: "sms_template_id_lbl",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              {cellProps.row.original.sms_template_id_lbl}
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
        Header: "End Date",
        accessor: "end_date",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">{cellProps.row.original.end_date}</p>
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
        Header: "Created BY",
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
      {
        Header: "Action",
        Cell: (cellProps) => {
          return (
            <div className="d-flex gap-3">
              <Link
                to="#"
                className="text-success"
                onClick={() => {
                  const userData = cellProps.row.original;
                  handleUserClick(userData);
                }}
              >
                <i className="mdi mdi-pencil font-size-18" id="edittooltip" />
                <UncontrolledTooltip placement="top" target="edittooltip">
                  Edit
                </UncontrolledTooltip>
              </Link>
              <Link
                to="#"
                className="text-danger"
                onClick={() => {
                  const userData = cellProps.row.original;
                  onClickDelete(userData);
                }}
              >
                <i className="mdi mdi-delete font-size-18" id="deletetooltip" />
                <UncontrolledTooltip placement="top" target="deletetooltip">
                  Delete
                </UncontrolledTooltip>
              </Link>
            </div>
          );
        },
      },
    ],
    []
  );

  useEffect(() => {
    if (schCusNotification && !schCusNotification.length) {
      dispatch(onGetScheduleCustomerNotification());
    }
  }, [dispatch, schCusNotification]);

  const handleAddNewScheduleCustNoti = () => {
    setShowAddNewScheduleCustNoti(!showAddNewScheduleCustNoti);
  };

  const keyField = "id";

  return (
    <React.Fragment>
      <AddNewScheduleCustomerNotification
        isOpen={showAddNewScheduleCustNoti}
        toggle={handleAddNewScheduleCustNoti}
      />
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs
            title="Access"
            breadcrumbItem="Schedule Customer Notification List"
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
                      data={schCusNotification}
                      isGlobalFilter={true}
                      // isShowTableActionButtons={true}
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

export default withRouter(ScheduleCustomerNotificationList);
