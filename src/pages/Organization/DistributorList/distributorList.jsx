import React, { useEffect, useState, useMemo } from "react";
import { Link, json } from "react-router-dom";
import withRouter from "../../../components/Common/withRouter";
import { Card, CardBody, Col, Container, Row, Spinner } from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "/src/components/Common/Breadcrumb";

import {
  goToPage as onGoToPage,
  getDistributors as onGetDistributors,
  getDistributorsPhase as onGetDistributorsPhase,
  getDistributorsStatus as onGetDistributorsStatus,
  getDistributorsSettings as onGetDistributorsSettings,
  getDistributorsOperator as onGetDistributorsOperator,
} from "../../../store/distributor/actions";

//redux
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { ToastContainer } from "react-toastify";
import ViewDistributorModal from "./ViewDistributorModal";
import AddDistributorModal from "./AddDistributorModal";
import UploadDistributorModal from "./UploadDistributorModal";
import SettingModal from "./SettingModal";
import TableContainerX from "../../../components/Common/TableContainerX";
import { current } from "@reduxjs/toolkit";

const DistributorList = (props) => {
  //meta title
  document.title = "Distributors | VDigital";

  const dispatch = useDispatch();
  const [showSetting, setShowSetting] = useState(false);

  const selectDistributorsState = (state) => state.distributors;

  const DistributorsProperties = createSelector(
    selectDistributorsState,
    (distributors) => ({
      distributor: distributors.distributors,
      distributorsPhase: distributors.distributorsPhase,
      distributorsStatus: distributors.distributorsStatus,
      distributorsSettings: distributors.distributorsSettings,
      distributorsOperator: distributors.distributorsOperator,
      loading: distributors.loading,
      totalPage: distributors.totalPages,
      totalCount: distributors.totalCount,
      pageSize: distributors.perPage,
      currentPage: distributors.currentPage,
    })
  );

  const {
    distributor,
    loading,
    totalCount,
    pageSize,
    currentPage,
    totalPage,
    distributorsPhase,
    distributorsStatus,
    distributorsSettings,
    distributorsOperator,
  } = useSelector(DistributorsProperties);

  const [showDistributor, setShowDistributor] = useState(false);
  const [viewDistributor, setViewDistributor] = useState(false);
  const [showUploadDistributor, setShowUploadDistributor] = useState(false);

  const columns = useMemo(
    () => [
      {
        Header: "#",
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
                className="font-size-14 mb-1"
                onClick={() => {
                  const userData = cellProps.row.original;
                  toggleViewModal(userData);
                }}
                style={{
                  maxWidth: 150,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                <Link className="text-dark" to="#">
                  {cellProps.row.original.name}
                </Link>
              </h5>
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
        Header: "Address",
        accessor: "addr1",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p
              className="text-muted mb-0"
              style={{
                maxWidth: 150,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {cellProps.row.original.addr1}
            </p>
          );
        },
      },
      {
        Header: "Contact Person",
        accessor: "contact_person",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p
              className="text-muted mb-0"
              style={{
                maxWidth: 100,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {cellProps.row.original.contact_person}
            </p>
          );
        },
      },
      {
        Header: "Mobile",
        accessor: "mobile_no",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              {cellProps.row.original.mobile_no}
            </p>
          );
        },
      },
      {
        Header: "State",
        accessor: "state_lbl",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p
              className="text-muted mb-0"
              style={{
                maxWidth: 100,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {cellProps.row.original.state_lbl}
            </p>
          );
        },
      },
      {
        Header: "District",
        accessor: "District_lbl",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p
              className="text-muted mb-0"
              style={{
                maxWidth: 100,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {cellProps.row.original.district_lbl}
            </p>
          );
        },
      },
      {
        Header: "City",
        accessor: "city_lbl",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p
              className="text-muted mb-0"
              style={{
                maxWidth: 100,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {cellProps.row.original.city_lbl}
            </p>
          );
        },
      },
      {
        Header: "GST",
        accessor: "gstno",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p
              className="text-muted mb-0"
              style={{
                maxWidth: 50,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {cellProps.row.original.gstno}
            </p>
          );
        },
      },
      {
        Header: "PAN",
        accessor: "panno",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p
              className="text-muted mb-0"
              style={{
                maxWidth: 50,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {cellProps.row.original.panno}
            </p>
          );
        },
      },
      {
        Header: "Login ID",
        accessor: "username",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">{cellProps.row.original.username}</p>
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
            <p
              className="text-muted mb-0"
              style={{
                maxWidth: 100,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
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
            <p
              className="text-muted mb-0"
              style={{
                maxWidth: 100,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {cellProps.row.original.created_by_lbl}
            </p>
          );
        },
      },
    ],
    [pageSize, currentPage]
  );

  useEffect(() => {
    if (distributor && !distributor.length) {
      dispatch(onGetDistributors());
      dispatch(onGetDistributorsPhase());
      dispatch(onGetDistributorsStatus());
      dispatch(onGetDistributorsSettings());
      dispatch(onGetDistributorsOperator());
    }
  }, [distributor]);

  const goToPage = (toPage) => {
    dispatch(onGoToPage(toPage));
    dispatch(onGetDistributors());
    dis;
  };

  const toggleAddDistributor = () => {
    setShowDistributor(!showDistributor);
  };

  const toggleUploadDistributor = () => {
    setShowUploadDistributor(!showUploadDistributor);
  };

  const [selectedDistributor, setSelectedDistributor] = useState({});
  const [selectedRowId, setSelectedRowId] = useState("");
  const toggleViewModal = (userData) => {
    setViewDistributor(!viewDistributor);
    setSelectedDistributor(userData);
  };
  const resetSelection = () => {
    setSelectedDistributor({});
  };
  const toggleShowSetting = () => {
    setShowSetting(!showSetting);
  };
  const getTableActions = () => {
    return [
      {
        name: "Create",
        action: setShowDistributor,
        type: "normal",
        icon: "create",
      },
      {
        name: "Upload",
        action: setShowUploadDistributor,
        type: "normal",
        icon: "upload",
      },
      {
        name: "Settings",
        action: setShowSetting,
        type: "normal",
        icon: "upload",
      },
    ];
  };

  const keyField = "id";

  return (
    <React.Fragment>
      {viewDistributor && (
        <ViewDistributorModal
          isOpen={viewDistributor}
          toggleViewModal={toggleViewModal}
          resetSelection={resetSelection}
          distributor={selectedDistributor}
          setViewDistributor={setViewDistributor}
          selectedRowId={selectedDistributor.id}
          distributorsPhase={distributorsPhase}
          distributorsStatus={distributorsStatus}
        />
      )}
      {showDistributor && (
        <AddDistributorModal
          isOpen={Boolean(showDistributor)}
          toggleAddDistributor={toggleAddDistributor}
          distributorsPhase={distributorsPhase}
          distributorsStatus={distributorsStatus}
        />
      )}
      {showUploadDistributor && (
        <UploadDistributorModal
          isOpen={showUploadDistributor}
          toggleUploadDistributor={toggleUploadDistributor}
          distributorsPhase={distributorsPhase}
          distributorsStatus={distributorsStatus}
        />
      )}
      {showSetting && (
        <SettingModal
          isOpen={Boolean(showSetting)}
          toggleShowSetting={toggleShowSetting}
          distributorsSettings={distributorsSettings}
          distributorsOperator={distributorsOperator}
        />
      )}
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Organization" breadcrumbItem="Distributors" />

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
                    <TableContainerX
                      columns={columns}
                      data={distributor}
                      isLoading={loading}
                      isPagination={true}
                      totalCount={Number(totalCount)}
                      pageSize={Number(pageSize)}
                      currentPage={Number(currentPage)}
                      totalPage={Number(totalPage)}
                      isGlobalFilter={true}
                      isShowingPageLength={true}
                      tableActions={getTableActions()}
                      goToPage={goToPage}
                      handleRowClick={(row) => {
                        toggleViewModal(row);
                      }}
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

export default withRouter(DistributorList);
