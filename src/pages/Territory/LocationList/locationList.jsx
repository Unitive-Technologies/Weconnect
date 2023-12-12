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
import { getLocation as onGetLocation } from "/src/store/actions";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { ToastContainer } from "react-toastify";
import AddNewLocation from "./AddNewLocation";
import UploadLocation from "./UploadLocation";
import ViewLocation from "./ViewLocation";

const LocationList = (props) => {
  //meta title
  document.title = "Location List | VDigital";

  const dispatch = useDispatch();

  const selectLocationState = (state) => state.location;
  const locationProperties = createSelector(
    selectLocationState,
    (location) => ({
      locations: location.location,
      loading: location.loading,
    })
  );

  const { locations, loading } = useSelector(locationProperties);

  useEffect(() => {
    // console.log("Customer Users data in component:", locations);
  }, [locations]);

  const [isLoading, setLoading] = useState(loading);
  const [userList, setUserList] = useState([]);
  const [showAddLocation, setShowAddLocation] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [showUploadLocation, setShowUploadLocation] = useState(false);
  const [showViewLocation, setShowViewLocation] = useState(false);
  const [viewLocationData, setViewLocationData] = useState({});

  const toggleViewLocation = (userData) => {
    // console.log("User Data: ", userData);
    setShowViewLocation(!showViewLocation);
    setViewLocationData(userData);
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
                  toggleViewLocation(userData);
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
      setIsEdit(false);
    }
  }, [dispatch, locations]);

  // useEffect(() => {
  //   setContact(users);
  //   setIsEdit(false);
  // }, [users]);

  // useEffect(() => {
  //   if (!isEmpty(users) && !!isEdit) {
  //     setContact(users);
  //     setIsEdit(false);
  //   }
  // }, [users]);

  const toggle = () => {
    setShowAddLocation(!showAddLocation);
  };

  const toggle1 = () => {
    setShowUploadLocation(!showUploadLocation);
  };

  const handleUserClick = (arg) => {
    const user = arg;

    setContact({
      id: user.id,
      name: user.name,
      designation: user.designation,
      email: user.email,
      tags: user.tags,
      projects: user.projects,
    });
    setIsEdit(true);

    toggle();
  };

  var node = useRef();
  const onPaginationPageChange = (page) => {
    if (
      node &&
      node.current &&
      node.current.props &&
      node.current.props.pagination &&
      node.current.props.pagination.options
    ) {
      node.current.props.pagination.options.onPageChange(page);
    }
  };

  //delete customer
  const [deleteModal, setDeleteModal] = useState(false);

  const onClickDelete = (users) => {
    setContact(users);
    setDeleteModal(true);
  };

  const handleDeleteUser = () => {
    if (contact && contact.id) {
      dispatch(onDeleteUser(contact.id));
    }
    setContact("");
    onPaginationPageChange(1);
    setDeleteModal(false);
  };

  const handleUserClicks = () => {
    setUserList("");
    setIsEdit(false);
    toggle();
  };

  const keyField = "id";

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
        toggle={toggleViewLocation}
        location={viewLocationData}
      />
      <AddNewLocation isOpen={showAddLocation} toggle={toggle} />
      <UploadLocation isOpen={showUploadLocation} toggle={toggle1} />
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Territory" breadcrumbItem="Location List" />
          {isLoading ? (
            <Spinners setLoading={setLoading} />
          ) : (
            <Row>
              <Col lg="12">
                <Card>
                  <CardBody>
                    {/* {console.log("Locations:" + JSON.stringify(locations))} */}
                    <TableContainer
                      isPagination={true}
                      columns={columns}
                      data={locations}
                      isGlobalFilter={true}
                      isAddUserList={true}
                      isShowingPageLength={true}
                      tableActions={getTableActions()}
                      handleLocationClick={() => setShowAddLocation(true)}
                      handleUploadLocation={() => setShowUploadLocation(true)}
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

export default withRouter(LocationList);
