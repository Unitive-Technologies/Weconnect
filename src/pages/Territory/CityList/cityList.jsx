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
  Spinner,
  UncontrolledTooltip,
} from "reactstrap";
import Breadcrumbs from "/src/components/Common/Breadcrumb";
import {
  goToPage as onGoToPage,
  getCity as onGetCity,
  getDistrictByStateid as onGetDistrictByStateid,
} from "/src/store/city/actions";
import {
  getDistrictStateList as onGetDistrictStateList,
  getAdministrativeDivisionStatus as onGetAdministrativeDivisionStatus,
} from "/src/store/district/actions";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { ToastContainer } from "react-toastify";
import AddNewCity from "./AddNewCity";
import UploadCity from "./UploadCity";
import ViewCity from "./ViewCity";
import TableContainerX from "../../../components/Common/TableContainerX";

const CityList = (props) => {
  //meta title
  document.title = "Cities | VDigital";

  const dispatch = useDispatch();

  const selectCityState = (state) => state.city;
  const cityProperties = createSelector(selectCityState, (city) => ({
    cits: city.city,
    loading: city.loading,
    districtlist: city.districtlist,
    totalPage: city.totalPages,
    totalCount: city.totalCount,
    pageSize: city.perPage,
    currentPage: city.currentPage,
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
  const {
    cits,
    loading,
    districtlist,
    totalPage,
    totalCount,
    pageSize,
    currentPage,
  } = useSelector(cityProperties);
  // const [isLoading, setLoading] = useState(loading);
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
              // onClick={() => {
              //   const userData = cellProps.row.original;
              //   handleViewCity(userData);
              // }}
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
    ],
    []
  );

  useEffect(() => {
    if (cits && !cits.length) {
      dispatch(onGetCity());
    }
  }, [dispatch, cits]);

  useEffect(() => {
    dispatch(onGetDistrictByStateid());
  }, [dispatch]);

  useEffect(() => {
    if (districts && !districts.length) {
      dispatch(onGetAdministrativeDivisionStatus());
      dispatch(onGetDistrictStateList());
    }
  }, [dispatch, districts]);

  const goToPage = (toPage) => {
    console.log("[GOTO PAGE] Trigger to page - ", toPage);
    dispatch(onGoToPage(toPage));
    dispatch(onGetCity());
  };

  const handleShowCity = () => {
    setShowAddCity(!showAddCity);
  };

  const toggleUploadCity = () => {
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
        toggleUploadCity={toggleUploadCity}
        status={status}
        statelist={statelist}
        actiontype={"add"}
        districtlist={districtlist}
      />
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Territory" breadcrumbItem="Cities" />
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
                    /> */}
                    <TableContainerX
                      columns={columns}
                      data={cits}
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
                        handleViewCity(row);
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

export default withRouter(CityList);
