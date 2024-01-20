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
import Breadcrumbs from "/src/components/Common/Breadcrumb";
import {
  goToPage as onGoToPage,
  getLocation as onGetLocation,
  getLcoOnLocation as onGetLcoOnLocation,
  getSingleLocation as onGetSingleLocation,
} from "/src/store/location/actions";
import {
  getAdministrativeDivisionStatus as onGetAdministrativeDivisionStatus,
} from "/src/store/district/actions";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { ToastContainer } from "react-toastify";
import AddNewLocation from "./AddNewLocation";
import UploadLocation from "./UploadLocation";
import ViewLocation from "./ViewLocation";
import TableContainerX from "../../../components/Common/TableContainerX";

const LocationList = (props) => {
  //meta title
  document.title = "Locations | VDigital";

  const dispatch = useDispatch();

  const selectLocationState = (state) => state.location;
  const locationProperties = createSelector(
    selectLocationState,
    (location) => ({
      locations: location.location,
      loading: location.loading,
      lcoonlocation: location.lcoonlocation,
      singlelocation: location.singlelocation,
      totalPage: location.totalPages,
      totalCount: location.totalCount,
      pageSize: location.perPage,
      currentPage: location.currentPage,
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
  const { totalPage,
    totalCount,
    pageSize,
    currentPage, locations, loading, lcoonlocation, singlelocation } =
    useSelector(locationProperties);
  const [isLoading, setLoading] = useState(loading);
  const [showAddLocation, setShowAddLocation] = useState(false);
  const [showUploadLocation, setShowUploadLocation] = useState(false);
  const [showViewLocation, setShowViewLocation] = useState(false);
  const [viewLocationData, setViewLocationData] = useState({});

  const handleViewLocation = (userData) => {
    console.log("User Data: ", userData);
    setShowViewLocation(!showViewLocation);
    setViewLocationData(userData);
    dispatch(onGetSingleLocation(userData.id));
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
                  handleViewLocation(userData);
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
    if (locations && !locations.length) {
      dispatch(onGetLocation());
      dispatch(onGetLcoOnLocation());
    }
  }, [dispatch, locations]);

  useEffect(() => {
    dispatch(onGetSingleLocation());
  }, [dispatch]);

  useEffect(() => {
    if (districts && !districts.length) {
      dispatch(onGetAdministrativeDivisionStatus());
    }
  }, [dispatch, districts]);

  const goToPage = (toPage) => {
    console.log("[GOTO PAGE] Trigger to page - ", toPage);
    dispatch(onGoToPage(toPage));
    dispatch(onGetLocation());
  };

  const handleAddLocation = () => {
    setShowAddLocation(!showAddLocation);
  };

  const handleUploadLocation = () => {
    setShowUploadLocation(!showUploadLocation);
  };

  const getTableActions = () => {
    return [
      {
        name: "Create",
        action: setShowAddLocation,
        type: "normal",
        icon: "create",
      },
      {
        name: "Upload",
        action: setShowUploadLocation,
        type: "normal",
        icon: "upload",
      },
    ];
  };

  return (
    <React.Fragment>
      <ViewLocation
        isOpen={showViewLocation}
        handleViewLocation={handleViewLocation}
        location={viewLocationData}
        lcoonlocation={lcoonlocation}
        status={status}
        singlelocation={singlelocation}
      />
      <AddNewLocation
        isOpen={showAddLocation}
        handleAddLocation={handleAddLocation}
        lcoonlocation={lcoonlocation}
        status={status}
      />
      <UploadLocation
        isOpen={showUploadLocation}
        handleUploadLocation={handleUploadLocation}
        lcoonlocation={lcoonlocation}
        status={status}
      />
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Territory" breadcrumbItem="Locations" />
          {isLoading ? (
            <Spinners setLoading={setLoading} />
          ) : (
            <Row>
              <Col lg="12">
                <Card>
                  <CardBody>
                    {/* <TableContainer
                      isPagination={true}
                      columns={columns}
                      data={locations}
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
                      data={locations}
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
                      // handleRowClick={(row) => {
                      //   toggleViewModal(row);
                      // }}
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

export default withRouter(LocationList);
