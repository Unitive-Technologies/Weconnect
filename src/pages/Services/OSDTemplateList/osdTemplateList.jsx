import React, { useEffect, useState, useRef, useMemo } from "react";
import { Link } from "react-router-dom";
import withRouter from "../../../components/Common/withRouter";
// import TableContainer from "../../../components/Common/TableContainer";
// import Spinners from "../../../components/Common/Spinner";
import {
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Toast,
  ToastHeader,
  ToastBody,
  Spinner,
} from "reactstrap";
import * as Yup from "yup";

//Import Breadcrumb
import Breadcrumbs from "/src/components/Common/Breadcrumb";

import {
  goToPage as onGoToPage,
  getOSDTemplate as onGetOSDTemplate,
  getOSDTemplateOSD as onGetOSDTemplateOSD,
  getOSDTemplateStatus as onGetOSDTemplateStatus,
  getOSDTemplateTemplateFor as onGetOSDTemplateTemplateFor,
} from "/src/store/OSDTemplate/actions";


//redux
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { ToastContainer } from "react-toastify";
import AddNewOSDTemplate from "./AddOSDTemplateList";
import ViewOSDTemplateList from "./ViewOSDTemplateList";
import TableContainerX from "../../../components/Common/TableContainerX";

const OSDTemplateList = (props) => {
  //meta title
  document.title = "OSD Template List | VDigital";

  const dispatch = useDispatch();

  const [toast, setToast] = useState(false);

  const selectOSDTemplateState = (state) => state.osdTemplate;

  const osdTemplateProperties = createSelector(
    selectOSDTemplateState,
    (osdTemplate) => ({
      osdTemp: osdTemplate.osdTemplate,
      loading: osdTemplate.loading,
      osdTempTemplateFor: osdTemplate.osdTemplateTemplateFor,
      osdTempOSD: osdTemplate.osdTemplateOSD,
      osdTempStatus: osdTemplate.osdTemplateStatus,
      totalPage: osdTemplate.totalPages,
      totalCount: osdTemplate.totalCount,
      pageSize: osdTemplate.perPage,
      currentPage: osdTemplate.currentPage,
    })
  );

  const { osdTemp, osdTempOSD, osdTempTemplateFor, osdTempStatus, loading, totalPage,
    totalCount,
    pageSize,
    currentPage } =
    useSelector(osdTemplateProperties);

  useEffect(() => {
    console.log("OSD Temp data in component:", osdTemp);
  }, [osdTemp]);

  const [isLoading, setLoading] = useState(loading);

  const [userList, setUserList] = useState([]);
  const [showAddOSDTemplateList, setShowAddOSDTemplateList] = useState(false);
  const [showViewOSDTemplateList, setShowViewOSDTemplateList] = useState(false);

  const [isEdit, setIsEdit] = useState(false);

  const columns = useMemo(
    () => [
      {
        Header: "#",
        // accessor: "name",
        disableFilters: true,
        filterable: true,
        Cell: (cellProps) => {
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
                className="font-size-14 mb-1">
                <Link className="text-dark" to="#">
                  {cellProps.row.original.name}
                </Link>
              </h5>
            </>
          );
        },
      },
      {
        Header: "Templates For",
        accessor: "template_for_lbl",
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              {cellProps.row.original.template_for_lbl}
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
        Header: "Opeartor Count",
        accessor: "operator_count",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              {cellProps.row.original.operator_count}
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
    if (osdTemp && !osdTemp.length) {
      dispatch(onGetOSDTemplate());
      dispatch(onGetOSDTemplateStatus());
      dispatch(onGetOSDTemplateOSD());
      dispatch(onGetOSDTemplateTemplateFor());
      // setIsEdit(false);
    }
  }, [dispatch, osdTemp]);

  const goToPage = (toPage) => {
    console.log("[GOTO PAGE] Trigger to page - ", toPage);
    dispatch(onGoToPage(toPage));
    dispatch(onGetOSDTemplate());
  };

  const toggleAddModal = () => {
    setShowAddOSDTemplateList(!showAddOSDTemplateList);
  };

  const [viewOSDTemplateList, setViewOSDTemplateList] = useState({});

  const toggleViewModal = (userOSDTemplateData) => {
    setShowViewOSDTemplateList(!showViewOSDTemplateList);
    setViewOSDTemplateList(userOSDTemplateData);
    // toggle();
  };

  const resetSelection = () => {
    setViewOSDTemplateList({});
  };

  const toggleToast = () => {
    // console.log("button clicked");
    setToast(!toast);
  };

  const keyField = "id";

  const getTableActions = () => {
    return [
      {
        name: "Create",
        action: setShowAddOSDTemplateList,
        type: "normal",
        icon: "create",
      },
      {
        name: "Bulk Assign to Operator",
        action: toggleToast,
        type: "dropdown",
        dropdownName: "Actions",
      },
      {
        name: "Bulk Removel from Operator",
        action: toggleToast,
        type: "dropdown",
        dropdownName: "Actions",
      },
    ];
  };

  return (
    <React.Fragment>
      <ViewOSDTemplateList
        isOpen={showViewOSDTemplateList}
        toggleViewModal={toggleViewModal}
        osdTemplate={viewOSDTemplateList}
        osdTempOSD={osdTempOSD}
        osdTempStatus={osdTempStatus}
        osdTempTemplateFor={osdTempTemplateFor}
        resetSelection={resetSelection}
      />
      <AddNewOSDTemplate
        isOpen={showAddOSDTemplateList}
        toggleAddModal={toggleAddModal}
        osdTempOSD={osdTempOSD}
        osdTempStatus={osdTempStatus}
        osdTempTemplateFor={osdTempTemplateFor}
      />

      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Service" breadcrumbItem="OSD TEMPLATE LIST" />
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
                    <div className="d-flex align-items-center justify-content-between">
                      <div
                        className="position-fixed top-0 end-0 p-3"
                        style={{ zIndex: "1005" }}
                      >
                        <Toast isOpen={toast}>
                          <ToastHeader toggle={toggleToast}>
                            Warning
                          </ToastHeader>
                          <ToastBody>
                            Please selcet atleast one osd template.
                          </ToastBody>
                        </Toast>
                      </div>
                    </div>
                  </CardBody>

                  <CardBody>
                    {console.log("OSDTemp:" + JSON.stringify(osdTemp))}
                    <TableContainerX
                      columns={columns}
                      data={osdTemp}
                      isShowTableActionButtons={true}
                      isLoading={loading}
                      isPagination={true}
                      totalCount={Number(totalCount)}
                      pageSize={Number(pageSize)}
                      currentPage={Number(currentPage)}
                      totalPage={Number(totalPage)}
                      isGlobalFilter={true}
                      isShowingPageLength={true}
                      tableActions={getTableActions()}
                      handleAddOSDTemplateList={() =>
                        setShowAddOSDTemplateList(true)
                      }
                      handleRowClick={(row) => {
                        toggleViewModal(row);
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

export default withRouter(OSDTemplateList);
