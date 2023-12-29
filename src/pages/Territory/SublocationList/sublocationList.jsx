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
import { getSublocation as onGetSublocation } from "/src/store/actions";
import { getDistrictStatus as onGetDistrictStatus } from "/src/store/actions";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { ToastContainer } from "react-toastify";
import AddSubLocation from "./AddSubLocation";
import UploadSubLocation from "./UploadSubLocation";
import ViewSubLocation from "./ViewSubLocation";

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
  const { subloc, loading } = useSelector(sublocationProperties);
  const [isLoading, setLoading] = useState(loading);
  const [showAddSubLocation, setShowAddSubLocation] = useState(false);
  const [showUploadSubLocation, setShowUploadSubLocation] = useState(false);
  const [showViewSubLocation, setShowViewSubLocation] = useState(false);
  const [viewSubLocationData, setViewSubLocationData] = useState({});

  const handleViewSubLocation = (userData) => {
    // console.log("User Data: ", userData);
    setShowViewSubLocation(!showViewSubLocation);
    setViewSubLocationData(userData);
  };

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
                  handleViewSubLocation(userData);
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
    if (subloc && !subloc.length) {
      dispatch(onGetSublocation());
    }
  }, [dispatch, subloc]);

  useEffect(() => {
    if (districts && !districts.length) {
      dispatch(onGetDistrictStatus());
    }
  }, [dispatch, districts]);

  const handleAddSubLocation = () => {
    setShowAddSubLocation(!showAddSubLocation);
  };

  const handleUploadSubLocation = () => {
    setShowUploadSubLocation(!showUploadSubLocation);
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
        handleViewSubLocation={handleViewSubLocation}
        sublocation={viewSubLocationData}
        status={status}
      />
      <AddSubLocation
        isOpen={showAddSubLocation}
        handleAddSubLocation={handleAddSubLocation}
        status={status}
      />
      <UploadSubLocation
        isOpen={showUploadSubLocation}
        handleUploadSubLocation={handleUploadSubLocation}
        status={status}
      />
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Territory" breadcrumbItem="Sublocations" />
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
                      data={subloc}
                      isGlobalFilter={true}
                      isShowTableActionButtons={true}
                      isShowingPageLength={true}
                      tableActions={getTableActions()}
                      customPageSize={20}
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

export default withRouter(SublocationList);
