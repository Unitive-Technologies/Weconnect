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
  Spinner,
} from "reactstrap";
import Breadcrumbs from "/src/components/Common/Breadcrumb";
import {
  goToPage as onGoToPage,
  getSublocation as onGetSublocation,
  getLocationOnSublocation as onGetLocationOnSublocation,
} from "/src/store/sublocation/actions";
import { getAdministrativeDivisionStatus as onGetAdministrativeDivisionStatus } from "/src/store/district/actions";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { ToastContainer } from "react-toastify";
import AddSubLocation from "./AddSubLocation";
import UploadSubLocation from "./UploadSubLocation";
import ViewSubLocation from "./ViewSubLocation";
import TableContainerX from "../../../components/Common/TableContainerX";

const SublocationList = (props) => {
  //meta title
  document.title = "Sublocations | VDigital";

  const dispatch = useDispatch();

  const selectSublocationState = (state) => state.sublocation;
  const sublocationProperties = createSelector(
    selectSublocationState,
    (sublocation) => ({
      subloc: sublocation.sublocation,
      loading: sublocation.loading,
      locateonsublocate: sublocation.locateonsublocate,
      totalPage: sublocation.totalPages,
      totalCount: sublocation.totalCount,
      pageSize: sublocation.perPage,
      currentPage: sublocation.currentPage,
    })
  );

  const selectDistrictState = (state) => state.district;
  const districtProperties = createSelector(
    selectDistrictState,
    (district) => ({
      districts: district.district,
      status: district.status,
    })
  );

  const { districts, status } = useSelector(districtProperties);
  const {
    subloc,
    loading,
    locateonsublocate,
    totalPage,
    totalCount,
    pageSize,
    currentPage,
  } = useSelector(sublocationProperties);
  // const [isLoading, setLoading] = useState(loading);
  const [showAddSubLocation, setShowAddSubLocation] = useState(false);
  const [showUploadSubLocation, setShowUploadSubLocation] = useState(false);
  const [showViewSubLocation, setShowViewSubLocation] = useState(false);
  const [viewSubLocationData, setViewSubLocationData] = useState({});

  const toggleViewModal = (userData) => {
    // console.log("User Data: ", userData);
    setShowViewSubLocation(!showViewSubLocation);
    setViewSubLocationData(userData);
  };

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
                onClick={() => {
                  const userData = cellProps.row.original;
                  toggleViewModal(userData);
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
        Header: "Location",
        accessor: "location_lbl",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              {cellProps.row.original.location_lbl}
            </p>
          );
        },
      },
      {
        Header: "Location Code",
        accessor: "location_code",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              {cellProps.row.original.location_code}
            </p>
          );
        },
      },
      {
        Header: "LCO",
        accessor: "operator_lbl",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              {cellProps.row.original.operator_lbl}
            </p>
          );
        },
      },
      {
        Header: "LCO Code",
        accessor: "operator_code",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              {cellProps.row.original.operator_code}
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
    if (subloc && !subloc.length) {
      dispatch(onGetSublocation());
      dispatch(onGetLocationOnSublocation());
    }
  }, [dispatch, subloc]);

  useEffect(() => {
    if (districts && !districts.length) {
      dispatch(onGetAdministrativeDivisionStatus());
    }
  }, [dispatch, districts]);

  const goToPage = (toPage) => {
    console.log("[GOTO PAGE] Trigger to page - ", toPage);
    dispatch(onGoToPage(toPage));
    dispatch(onGetSublocation());
  };

  const toggleAddModal = () => {
    setShowAddSubLocation(!showAddSubLocation);
  };

  const toggleUploadModal = () => {
    setShowUploadSubLocation(!showUploadSubLocation);
  };

  const resetSelection = () => {
    setViewSubLocationData({});
  };

  const getTableActions = () => {
    return [
      {
        name: "Create",
        action: setShowAddSubLocation,
        type: "normal",
        icon: "create",
      },
      {
        name: "Upload",
        action: setShowUploadSubLocation,
        type: "normal",
        icon: "upload",
      },
    ];
  };

  return (
    <React.Fragment>
      <ViewSubLocation
        isOpen={showViewSubLocation}
        toggleViewModal={toggleViewModal}
        sublocation={viewSubLocationData}
        status={status}
        resetSelection={resetSelection}
        locateonsublocate={locateonsublocate}
      />
      <AddSubLocation
        isOpen={showAddSubLocation}
        toggleAddModal={toggleAddModal}
        status={status}
        locateonsublocate={locateonsublocate}
      />
      <UploadSubLocation
        isOpen={showUploadSubLocation}
        toggleUploadModal={toggleUploadModal}
        status={status}
        locateonsublocate={locateonsublocate}
      />
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Territory" breadcrumbItem="Sublocations" />
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
                    {/* <TableContainer
                      isPagination={true}
                      columns={columns}
                      data={subloc}
                      isGlobalFilter={true}
                      isShowTableActionButtons={true}
                      isShowingPageLength={true}
                      tableActions={getTableActions()}
                      customPageSize={100}
                      tableClass="table align-middle table-nowrap table-hover"
                      theadClass="table-light"
                      paginationDiv="col-sm-12 col-md-7"
                      pagination="pagination pagination-rounded justify-content-end mt-4"
                    /> */}
                    <TableContainerX
                      columns={columns}
                      data={subloc}
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

export default withRouter(SublocationList);
