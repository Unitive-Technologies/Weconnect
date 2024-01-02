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
  getCity as onGetCity,
  getDistrictByStateid as onGetDistrictByStateid,
} from "/src/store/actions";
import {
  getDistrictStateList as onGetDistrictStateList,
  getAdministrativeDivisionStatus as onGetAdministrativeDivisionStatus,
} from "/src/store/actions";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { ToastContainer } from "react-toastify";
import AddNewCity from "./AddNewCity";
import UploadCity from "./UploadCity";
import ViewCity from "./ViewCity";

const CityList = (props) => {
  //meta title
  document.title = "Cities | VDigital";

  const dispatch = useDispatch();

  const selectCityState = (state) => state.city;
  const cityProperties = createSelector(selectCityState, (city) => ({
    cits: city.city,
    loading: city.loading,
    districtlist: city.districtlist,
  }));

  const selectDistrictState = (state) => state.district;
  const districtProperties = createSelector(
    selectDistrictState,
    (district) => ({
      districts: district.district,
      status: district.status,
      statelist: district.statelist,
    })
  );

  const { districts, status, statelist } = useSelector(districtProperties);
  const { cits, loading, districtlist } = useSelector(cityProperties);
  const [isLoading, setLoading] = useState(loading);
  const [showAddCity, setShowAddCity] = useState(false);
  const [showUploadCity, setShowUploadCity] = useState(false);
  const [showViewCity, setShowViewCity] = useState(false);
  const [viewCityData, setViewCityData] = useState({});

  const handleViewCity = (selectedData) => {
    console.log("User Data id: ", selectedData);
    setShowViewCity(!showViewCity);
    setViewCityData(selectedData);
    dispatch(onGetDistrictByStateid(selectedData.state_id));
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
                  handleViewCity(userData);
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
        Header: "State",
        accessor: "state_lbl",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              {cellProps.row.original.state_lbl}
            </p>
          );
        },
      },
      {
        Header: "State Code",
        accessor: "state_code_lbl",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              {cellProps.row.original.state_code_lbl}
            </p>
          );
        },
      },
      {
        Header: "District",
        accessor: "district_lbl",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              {cellProps.row.original.district_lbl}
            </p>
          );
        },
      },
      {
        Header: "District Code",
        accessor: "district_code_lbl",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              {cellProps.row.original.district_code_lbl}
            </p>
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
                  const selectedData = cellProps.row.original;
                  handleUserClick(selectedData);
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
    if (cits && !cits.length) {
      dispatch(onGetCity());
      // dispatch(onGetDistrictByStateid(viewCityData.state_id));
    }
  }, [dispatch, cits]);

  useEffect(() => {
    dispatch(onGetDistrictByStateid(0));
  }, [dispatch]);

  useEffect(() => {
    if (districts && !districts.length) {
      dispatch(onGetAdministrativeDivisionStatus());
      dispatch(onGetDistrictStateList());
    }
  }, [dispatch, districts]);

  const handleShowCity = () => {
    setShowAddCity(!showAddCity);
  };

  const handleUploadCity = () => {
    setShowUploadCity(!showUploadCity);
  };

  const getTableActions = () => {
    return [
      {
        name: "Create",
        action: setShowAddCity,
        type: "normal",
        icon: "create",
      },
      {
        name: "Upload",
        action: setShowUploadCity,
        type: "normal",
        icon: "upload",
      },
    ];
  };

  return (
    <React.Fragment>
      <ViewCity
        isOpen={showViewCity}
        handleViewCity={handleViewCity}
        city={viewCityData}
        status={status}
        statelist={statelist}
        districtlist={districtlist}
      />
      <AddNewCity
        isOpen={showAddCity}
        handleShowCity={handleShowCity}
        status={status}
        statelist={statelist}
        districtlist={districtlist}
      />
      <UploadCity
        isOpen={showUploadCity}
        handleUploadCity={handleUploadCity}
        status={status}
        statelist={statelist}
        districtlist={districtlist}
      />
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Territory" breadcrumbItem="Cities" />
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
                      data={cits}
                      isGlobalFilter={true}
                      isShowTableActionButtons={true}
                      isShowingPageLength={true}
                      tableActions={getTableActions()}
                      customPageSize={100}
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

export default withRouter(CityList);
