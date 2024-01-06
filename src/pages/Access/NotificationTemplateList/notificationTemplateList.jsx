import React, { useEffect, useState, useRef, useMemo } from "react";
import { Link } from "react-router-dom";
import withRouter from "../../../components/Common/withRouter";
import TableContainer from "../../../components/Common/TableContainer";
import Spinners from "../../../components/Common/Spinner";
import ColorPicker from "@vtaits/react-color-picker";
import {
  Card,
  CardBody,
  Col,
  Container,
  Row,
  UncontrolledTooltip,
  Toast,
  ToastHeader,
  ToastBody,
} from "reactstrap";
import Breadcrumbs from "/src/components/Common/Breadcrumb";
import {
  getNotificationTemplate as onGetNotificationTemplate,
  getNotificationTemplateType as onGetNotificationTemplateType,
  getNotificationTemplateStatus as onGetNotificationTemplateStatus,
  getNotificationTemplateAddUser as onGetNotificationTemplateAddUser,
} from "/src/store/actions";

import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { ToastContainer } from "react-toastify";
import AddNotificationTemplateModal from "./AddNotificationTemplateModal";
import ViewNotificationTemplateModal from "./ViewNotificationTemplateModal";
import BulkScheduleNotification from "./BulkScheduleNotification";
import ShowPreviewModal from "./ShowPreviewModal";

const NotificationTemplateList = (props) => {
  //meta title
  document.title = "Notification Templates | VDigital";

  const dispatch = useDispatch();
  const [isChecked, setIsChecked] = useState(true);
  const [selectedRow, setSelectedRow] = useState({});
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const handleCheckboxClick = (row) => {
    console.log("button clicked");
    setViewNotificationTemplate(false);
    setIsChecked(!isChecked);
    setSelectedRow(row);
  };
  console.log("selectedRow:" + JSON.stringify(selectedRow));
  const selectNotificationTemplateState = (state) => state.notificationTemplate;
  const notificationTemplateProperties = createSelector(
    selectNotificationTemplateState,
    (notificationTemplate) => ({
      noTemplate: notificationTemplate.notificationTemplate,
      loading: notificationTemplate.loading,
      noTemplateType: notificationTemplate.noTemplateType,
      noTemplateStatus: notificationTemplate.noTemplateStatus,
      addUser: notificationTemplate.addUser,
    })
  );

  const { noTemplate, loading, noTemplateStatus, noTemplateType, addUser } =
    useSelector(notificationTemplateProperties);

  const [isLoading, setLoading] = useState(loading);

  const [showAddNotificationTemplate, setShowAddNotificationTemplate] =
    useState(false);
  const [viewNotificationTemplate, setViewNotificationTemplate] =
    useState(false);
  const [modal2, setModal2] = useState(false);
  const [showActionNotificationModal, setShowActionNotificationModal] =
    useState(false);

  const handleActionNotification = () => {
    setShowActionNotificationModal(!showActionNotificationModal);
  };
  const handleWarning = () => {
    setShowWarning(!showWarning);
  };
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
        accessor: "msg_head",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <>
              <h5
                className="font-size-14 mb-1"
                onClick={() => {
                  const userData = cellProps.row.original;
                  handleViewNotificationTemplate(userData);
                }}
              >
                <Link className="text-dark" to="#">
                  {cellProps.row.original.msg_head}
                </Link>
              </h5>
            </>
          );
        },
      },
      {
        Header: "Content",
        accessor: "msg_content",
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
              {cellProps.row.original.msg_content}
            </p>
          );
        },
      },
      {
        Header: "Type",
        accessor: "msg_type",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              {cellProps.row.original.msg_type_lbl}
            </p>
          );
        },
      },
      {
        Header: "Font Size",
        accessor: "msg_fontsize",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              {cellProps.row.original.msg_fontsize}
            </p>
          );
        },
      },
      {
        Header: "Font Color",
        accessor: "msg_fontcolor",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ColorPicker
                saturationHeight={20}
                saturationWidth={50}
                value={cellProps.row.original.msg_fontcolor}
                // onDrag={onDragRgb}
              />
            </div>
          );
        },
      },
      {
        Header: "Font Background",
        accessor: "msg_fontbackgroundcolor",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ColorPicker
                saturationHeight={20}
                saturationWidth={50}
                value={cellProps.row.original.msg_fontbackgroundcolor}
                // onDrag={onDragRgb}
              />
            </div>
          );
        },
      },
      {
        Header: "Font Family",
        accessor: "msg_fontfamily",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              {cellProps.row.original.msg_fontfamily}
            </p>
          );
        },
      },
      {
        Header: "status",
        accessor: "status",
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
    if (noTemplate && !noTemplate.length) {
      dispatch(onGetNotificationTemplate());
      dispatch(onGetNotificationTemplateStatus());
      dispatch(onGetNotificationTemplateType());
      dispatch(onGetNotificationTemplateAddUser());
    }
  }, [dispatch, noTemplate]);

  const handleAddNotificationTemplate = () => {
    setShowAddNotificationTemplate(!showAddNotificationTemplate);
  };

  const toggle2 = () => {
    setModal2(!modal2);
  };
  const [viewNotiTemp, setViewUser] = useState({});

  const handleViewNotificationTemplate = (row) => {
    setViewNotificationTemplate(!viewNotificationTemplate);
    setViewUser(row);
  };

  const getTableActions = () => {
    return [
      {
        name: "Create",
        action: setShowAddNotificationTemplate,
        type: "normal",
        icon: "create",
      },

      {
        name: "Schedule Notification",
        action:
          selectedRow.status === 0
            ? setShowWarning
            : selectedRow.status === 1
            ? setShowBulkModal
            : setShowActionNotificationModal,
        type: "dropdown",
        dropdownName: "Actions",
      },
    ];
  };

  const keyField = "id";
  console.log("noTemplateType" + JSON.stringify(noTemplateType));

  return (
    <React.Fragment>
      <div
        className="position-fixed top-0 end-0 p-3"
        style={{ zIndex: "1005" }}
      >
        <Toast isOpen={showActionNotificationModal}>
          <ToastHeader toggle={handleActionNotification}>
            <i className="mdi mdi-alert-outline me-2"></i> Warning
          </ToastHeader>
          <ToastBody>Please select atleast one Notification Template</ToastBody>
        </Toast>
      </div>
      <div
        className="position-fixed top-0 end-0 p-3"
        style={{ zIndex: "1005" }}
      >
        <Toast isOpen={showWarning}>
          <ToastHeader toggle={handleWarning}>
            <i className="mdi mdi-alert-outline me-2"></i> Warning
          </ToastHeader>
          <ToastBody>Cannot select InActive Notification Template</ToastBody>
        </Toast>
      </div>
      <BulkScheduleNotification
        isOpen={showBulkModal}
        onClose={() => setShowBulkModal(false)}
        selectedRow={selectedRow}
      />

      <AddNotificationTemplateModal
        isOpen={showAddNotificationTemplate}
        handleAddNotificationTemplate={handleAddNotificationTemplate}
        noTemplateStatus={noTemplateStatus}
        noTemplateType={noTemplateType}
      />
      <ViewNotificationTemplateModal
        isOpen={viewNotificationTemplate}
        handleViewNotificationTemplate={handleViewNotificationTemplate}
        notiTemplate={viewNotiTemp}
        noTemplateStatus={noTemplateStatus}
        noTemplateType={noTemplateType}
      />
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Access" breadcrumbItem="Notification Templates" />
          {isLoading ? (
            <Spinners setLoading={setLoading} />
          ) : (
            <Row>
              <Col lg="12">
                <Card>
                  <CardBody>
                    {console.log("template:" + JSON.stringify(noTemplate))}
                    <TableContainer
                      isPagination={true}
                      columns={columns}
                      data={noTemplate}
                      isGlobalFilter={true}
                      isShowTableActionButtons={true}
                      isShowingPageLength={true}
                      tableActions={getTableActions()}
                      // handleRowClick={(row) => {
                      //   handleViewNotificationTemplate(row);
                      // }}
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

export default withRouter(NotificationTemplateList);
