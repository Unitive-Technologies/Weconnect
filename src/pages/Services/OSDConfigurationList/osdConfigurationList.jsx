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
  Modal,
  ModalHeader,
  ModalBody,
  Label,
  FormFeedback,
  UncontrolledTooltip,
  Input,
  Form,
  Spinner,
} from "reactstrap";
import * as Yup from "yup";
import { useFormik } from "formik";

import { Email, Tags, Projects } from "./osdConfigurationListCol";

//Import Breadcrumb
import Breadcrumbs from "/src/components/Common/Breadcrumb";
import DeleteModal from "/src/components/Common/DeleteModal";

import {
  getOSDConfiguration as onGetOSDConfiguration,
  getOSDConfigurationEnable as onGetOSDConfigurationEnable,
  getOSDConfigurationForcedDisplay as onGetOSDConfigurationForcedDisplay,
  getOSDConfigurationDisplay as onGetOSDConfigurationDisplay,
  getOSDConfigurationFontColor as onGetOSDConfigurationFontColor,
  getOSDConfigurationBackgroundColor as onGetOSDConfigurationBackgroundColor,
  getOSDConfigurationFontSize as onGetOSDConfigurationFontSize,
  getOSDConfigurationBackgroundArea as onGetOSDConfigurationBackgroundArea,
  getOSDConfigurationStatus as onGetOSDConfigurationStatus,
} from "/src/store/actions";

import { isEmpty } from "lodash";

//redux
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { ToastContainer } from "react-toastify";
import NSTVList from "./NSTVList";
import ViewNSTVList from "./ViewNSTVList";

const OSDConfigurationList = (props) => {
  //meta title
  document.title = "OSD Configurations | VDigital";

  const dispatch = useDispatch();

  const selectOSDConfigurationState = (state) => state.osdConfiguration;
  const osdConfigurationProperties = createSelector(
    selectOSDConfigurationState,
    (osdConfiguration) => ({
      osdConfig: osdConfiguration.osdConfiguration,
      osdConfigEnable: osdConfiguration.osdConfigurationEnable,
      osdConfigForcedDisplay: osdConfiguration.osdConfigurationForcedDisplay,
      osdConfigDisplay: osdConfiguration.osdConfigurationDisplay,
      osdConfigFontColor: osdConfiguration.osdConfigurationFontColor,
      osdConfigBackgroundColor:
        osdConfiguration.osdConfigurationBackgroundColor,
      osdConfigFontSize: osdConfiguration.osdConfigurationFontSize,
      osdConfigBackgroundArea: osdConfiguration.osdConfigurationBackgroundArea,
      osdConfigStatus: osdConfiguration.osdConfigurationStatus,
      loading: osdConfiguration.loading,
    })
  );

  const {
    osdConfig,
    osdConfigStatus,
    osdConfigBackgroundArea,
    osdConfigBackgroundColor,
    osdConfigDisplay,
    osdConfigEnable,
    osdConfigFontColor,
    osdConfigFontSize,
    osdConfigForcedDisplay,
    loading,
  } = useSelector(osdConfigurationProperties);

  useEffect(() => {
    console.log("OSD Configuration data in component:", osdConfig);
  }, [osdConfig]);

  const [isLoading, setLoading] = useState(loading);

  const [showNSTV, setShowNSTV] = useState(false);
  const [showViewNSTVList, setShowViewNSTVList] = useState(false);

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
                  toggleViewNSTVList(userData);
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
        Header: "CAS",
        accessor: "cas_code",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">{cellProps.row.original.cas_code}</p>
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
        Header: "Is Reserved",
        accessor: "is_reserved_lbl",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              {cellProps.row.original.is_reserved_lbl}
            </p>
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
        Header: "Start Time",
        accessor: "start_time",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              {cellProps.row.original.start_time}
            </p>
          );
        },
      },
      {
        Header: "End Time",
        accessor: "end_time",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">{cellProps.row.original.end_time}</p>
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
    if (osdConfig && !osdConfig.length) {
      dispatch(onGetOSDConfiguration());
      dispatch(onGetOSDConfigurationBackgroundArea());
      dispatch(onGetOSDConfigurationBackgroundColor());
      dispatch(onGetOSDConfigurationDisplay());
      dispatch(onGetOSDConfigurationEnable());
      dispatch(onGetOSDConfigurationFontColor());
      dispatch(onGetOSDConfigurationFontSize());
      dispatch(onGetOSDConfigurationForcedDisplay());
      dispatch(onGetOSDConfigurationStatus());
    }
  }, [dispatch, osdConfig]);

  const toggleAddNSTV = () => {
    setShowNSTV(!showNSTV);
  };

  const [viewNSTVList, setViewNSTVList] = useState({});

  const toggleViewNSTVList = (userNSTVData) => {
    setShowViewNSTVList(!showViewNSTVList);
    setViewNSTVList(userNSTVData);
  };

  const resetSelection = () => {
    setViewNSTVList({});
  };
  const getTableActions = () => {
    return [
      {
        name: "NSTV",
        action: setShowNSTV,
        type: "dropdown",
        dropdownName: "create",
        // icon: "create"
      },
      {
        name: "AADHAREKYC",
        // action: setShowBulkUpdateChannelList,
        type: "dropdown",
        dropdownName: "create",
      },
    ];
  };

  return (
    <React.Fragment>
      <ViewNSTVList
        isOpen={showViewNSTVList}
        toggle={toggleViewNSTVList}
        osdConfiguration={viewNSTVList}
        osdConfigBackgroundArea={osdConfigBackgroundArea}
        osdConfigBackgroundColor={osdConfigBackgroundColor}
        osdConfigDisplay={osdConfigDisplay}
        osdConfigEnable={osdConfigEnable}
        osdConfigFontColor={osdConfigFontColor}
        osdConfigFontSize={osdConfigFontSize}
        osdConfigForcedDisplay={osdConfigForcedDisplay}
        osdConfigStatus={osdConfigStatus}
        resetSelection={resetSelection}
      />
      <NSTVList
        isOpen={showNSTV}
        toggle={toggleAddNSTV}
        osdConfigBackgroundArea={osdConfigBackgroundArea}
        osdConfigBackgroundColor={osdConfigBackgroundColor}
        osdConfigDisplay={osdConfigDisplay}
        osdConfigEnable={osdConfigEnable}
        osdConfigFontColor={osdConfigFontColor}
        osdConfigFontSize={osdConfigFontSize}
        osdConfigForcedDisplay={osdConfigForcedDisplay}
        osdConfigStatus={osdConfigStatus}
      />
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs
            title="Services"
            breadcrumbItem="OSD Configuration List"
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
                    {/* {console.log("OSD Configuration:" + JSON.stringify(osdConfig))} */}
                    <TableContainer
                      isPagination={true}
                      columns={columns}
                      data={osdConfig}
                      isGlobalFilter={true}
                      isShowTableActionButtons={true}
                      isShowingPageLength={true}
                      tableActions={getTableActions()}
                      handleNSTV={() => setShowNSTV(true)}
                      customPageSize={8}
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

export default withRouter(OSDConfigurationList);
