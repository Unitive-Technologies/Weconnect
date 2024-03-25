import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
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
  Badge,
} from "reactstrap";

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
  const API_URL = "https://sms.unitch.in/api/index.php/v1";

  const [isChecked, setIsChecked] = useState(true);
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  // const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRow, setSelectedRow] = useState({});
  console.log(
    "selectedRow in handleTurnOnActive: " + JSON.stringify(selectedRow)
  );
  const handleWarning = () => {
    setShowWarning(!showWarning);
  };

  // const handleCheckboxClick = (row) => {
  //   console.log(
  //     "Before state update - selectedRows:",
  //     JSON.stringify(selectedRows)
  //   );
  //   const isSelected = selectedRows.some(
  //     (selectedRow) => selectedRow.id === row.id
  //   );

  //   if (isSelected) {
  //     // If already selected, remove it
  //     setSelectedRows((prevSelectedRows) =>
  //       prevSelectedRows.filter((selectedRow) => selectedRow.id !== row.id)
  //     );
  //   } else {
  //     // If not selected, add it
  //     setSelectedRows((prevSelectedRows) => [...prevSelectedRows, row]);
  //   }
  //   console.log(
  //     "After state update - selectedRows:",
  //     JSON.stringify(selectedRows)
  //   );
  // };

  const handleCheckboxClick = (row) => {
    setSelectedRow(row);
  };

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
  // const [isLoading, setLoading] = useState(loading);
  const columns = useMemo(
    () => [
      {
        Header: "*",
        disableFilters: true,
        filterable: true,
        disabled: true,
        Cell: (cellProps) => (
          <input
            type="checkbox"
            // checked={isChecked}
            // onClick={() => handleCheckboxClick(cellProps.row.original)}
            // disabled={!isChecked}
            onChange={() => handleCheckboxClick(cellProps.row.original)}
          />
        ),
      },
      {
        Header: "#",
        filterable: true,
        Cell: (cellProps) => {
          const totalRows = cellProps.rows.length;
          const serialNumber = totalRows - cellProps.row.index;

          return (
            <>
              <h5 className="font-size-14 mb-1">
                <Link className="text-dark" to="#">
                  {serialNumber}
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
                  {cellProps.row.original.announcement_templ_lbl.msg_head}
                </Link>
              </h5>
              {/* <p className="text-muted mb-0">
                {cellProps.row.original.designation}
              </p> */}
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
            <p
              className="text-muted mb-0"
              style={{
                maxWidth: 200,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {cellProps.row.original.announcement_templ_lbl.msg_content}
            </p>
          );
        },
      },
      {
        Header: "Type",
        accessor: "type",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              {cellProps.row.original.announcement_templ_lbl.msg_type}
            </p>
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
              {cellProps.row.original.start_time_lbl}
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
            <p className="text-muted mb-0">
              {cellProps.row.original.end_time_lbl}
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
            <>
              <h5 className="font-size-14 ">
                <Link className="text-dark" to="#">
                  {cellProps.row.original.status === 1 ? (
                    "Active"
                  ) : (
                    <Badge className="bg-danger font-size-14">In-Active</Badge>
                  )}
                </Link>
              </h5>
            </>
          );
        },
      },
      {
        Header: "Broadcast Status",
        accessor: "broadcast_status",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <>
              <h5 className="font-size-14 ">
                <Link className="text-dark" to="#">
                  {cellProps.row.original.broadcast_status_lbl === "Stopped" ? (
                    <Badge className="bg-danger font-size-14">STOPPED</Badge>
                  ) : (
                    <span style={{ animation: "blinking 1s infinite" }}>
                      RUNNING
                    </span>
                  )}
                </Link>
              </h5>
              <style>
                {`
          @keyframes blinking {
            0% { opacity: 1; }
            50% { opacity: 0; }
            100% { opacity: 1; }
          }
        `}
              </style>
            </>
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
              {cellProps.row.original.user_count}
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
              {cellProps.row.original.created_at_lbl}
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
              {cellProps.row.original.created_by_lbl}
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

  const handleTurnOnActive = async () => {
    try {
      console.log(
        "selectedRow in handleTurnOnActive: " + JSON.stringify(selectedRow)
      );
      const newAssign = {
        id: selectedRow.id,
        status: 1,
      };
      const token = "Bearer " + localStorage.getItem("temptoken");
      const response = await axios.put(
        `${API_URL}/schedule-announcement/${selectedRow.id}?vr=web1.0`,
        newAssign,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      console.log("Axios Response:", response);
      dispatch(onGetScheduledNotification());
    } catch (error) {
      console.error("Error in handleTurnOnActive:", error);
    }
  };

  const handleTurnOnInActive = async () => {
    try {
      console.log(
        "selectedRow in handleTurnOnActive: " + JSON.stringify(selectedRow)
      );
      const newAssign = {
        id: selectedRow.id,
        status: 0,
      };
      const token = "Bearer " + localStorage.getItem("temptoken");
      const response = await axios.put(
        `${API_URL}/schedule-announcement/${selectedRow.id}?vr=web1.0`,
        newAssign,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      console.log("Axios Response:", response);
      dispatch(onGetScheduledNotification());
    } catch (error) {
      console.error("Error in handleTurnOnActive:", error);
    }
  };

  const getTableActions = () => {
    return [
      {
        name: "Turn Active/InActive",
        action:
          selectedRow.status === 0 ? handleTurnOnActive : handleTurnOnInActive,
        type: "normal",
        // icon: "create",
      },
    ];
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Access" breadcrumbItem="Scheduled Notification" />
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
                      data={schedulednotify}
                      isGlobalFilter={true}
                      isShowingPageLength={true}
                      isShowTableActionButtons={selectedRow && true}
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

export default withRouter(ScheduledNotificationList);
