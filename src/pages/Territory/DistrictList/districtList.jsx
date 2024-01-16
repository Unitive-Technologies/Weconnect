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
  getDistrict as onGetDistrict,
  getDistrictStateList as onGetDistrictStateList,
  getAdministrativeDivisionStatus as onGetAdministrativeDivisionStatus,
} from "/src/store/actions";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { ToastContainer } from "react-toastify";
import AddNewDistrict from "./AddNewDistrict";
import UploadDistrict from "./UploadDistrict";
import ViewDistrict from "./ViewDistrict";

const DistrictList = (props) => {
  //meta title
  document.title = "Districts | VDigital";

  const dispatch = useDispatch();
  const [showAddDistrict, setShowAddDistrict] = useState(false);
  const [showUploadDistrict, setShowUploadDistrict] = useState(false);
  const [showViewDistrict, setShowViewDistrict] = useState(false);
  const [viewDistrictData, setViewDistrictData] = useState({});
  const [selectedId, setSelectedId] = useState();

  const selectDistrictState = (state) => state.district;
  const districtProperties = createSelector(
    selectDistrictState,
    (district) => ({
      districts: district.district,
      loading: district.loading,
      status: district.status,
      statelist: district.statelist,
    })
  );

  const { districts, loading, status, statelist } =
    useSelector(districtProperties);

  console.log("Current District Data ---- ", districts);
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
                  handleViewDistrict(userData);
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
    if (districts && !districts.length) {
      dispatch(onGetDistrict());
      dispatch(onGetAdministrativeDivisionStatus());
      dispatch(onGetDistrictStateList());
    }
  }, [dispatch, districts]);

  const toggleAddModal = () => {
    setShowAddDistrict(!showAddDistrict);
  };
  const toggleUploadModal = () => {
    setShowUploadDistrict(!showUploadDistrict);
  };

  const resetSelection = () => {
    setViewDistrictData({});
  };
  const toggleViewModal = () => {
    setShowViewDistrict(!showViewDistrict);
  };

  const handleViewDistrict = (userData) => {
    setShowViewDistrict(!showViewDistrict);
    setViewDistrictData(userData);
    if (userData.length) {
      console.log("Id: ", userData.id);
      setSelectedId(userData.id);
    }
  };

  const keyField = "id";

  const getTableActions = () => {
    return [
      {
        name: "Create",
        action: setShowAddDistrict,
        type: "normal",
        icon: "create",
      },
      {
        name: "Upload",
        action: setShowUploadDistrict,
        type: "normal",
        icon: "upload",
      },
    ];
  };

  return (
    <React.Fragment>
      <ViewDistrict
        isOpen={showViewDistrict}
        resetSelection={resetSelection}
        // handleViewDistrict={handleViewDistrict}
        toggleModal={toggleViewModal}
        district={viewDistrictData}
        statelist={statelist}
        status={status}
      />
      <AddNewDistrict
        isOpen={showAddDistrict}
        toggleAddModal={toggleAddModal}
        statelist={statelist}
        status={status}
      />
      <UploadDistrict
        isOpen={showUploadDistrict}
        handleUploadDistrict={toggleUploadModal}
        status={status}
        statelist={statelist}
      />
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Territory" breadcrumbItem="Districts" />
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
                    {/* {console.log("Districts:" + JSON.stringify(districts))} */}
                    <TableContainer
                      isPagination={true}
                      columns={columns}
                      data={districts}
                      isGlobalFilter={true}
                      isShowTableActionButtons={true}
                      isShowingPageLength={true}
                      tableActions={getTableActions()}
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

export default withRouter(DistrictList);
