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
import { getDesignation as onGetDesignation } from "/src/store/actions";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { ToastContainer } from "react-toastify";
import AddNewDesignation from "./AddNewDesignation";
import ViewDesignation from "./ViewDesignation";

const DesignationList = (props) => {
  //meta title
  document.title = "Designation List | VDigital";

  const dispatch = useDispatch();

  const selectDesignationState = (state) => state.designation;
  const designationProperties = createSelector(
    selectDesignationState,
    (designation) => ({
      desigList: designation.designation,
      loading: designation.loading,
    })
  );

  const { desigList, loading } = useSelector(designationProperties);

  useEffect(() => {
    console.log("Designation data in component:", desigList);
  }, [desigList]);
  const [isLoading, setLoading] = useState(loading);
  const [showAddDesignation, setShowAddDesignation] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [showViewDesignation, setShowViewDesignation] = useState(false);
  const [viewDesignationData, setViewDesignationData] = useState({});

  const toggleViewDesignation = (userData) => {
    console.log("User Data: ", userData);
    setShowViewDesignation(!showViewDesignation);
    setViewDesignationData(userData);
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
                  toggleViewDesignation(userData);
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
        Header: "Parent",
        accessor: "parent",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">{cellProps.row.original.parent}</p>
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
        Header: "Type",
        accessor: "type",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">{cellProps.row.original.type}</p>
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
        accessor: "created_by",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              {cellProps.row.original.created_by}
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
    if (desigList && !desigList.length) {
      dispatch(onGetDesignation());
      // setIsEdit(false);
    }
  }, [dispatch, desigList]);

  const toggle = () => {
    setShowAddDesignation(!showAddDesignation);
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
  const keyField = "id";

  const getTableActions = () => {
    return [
      {
        name: "Create",
        action: setShowAddDesignation,
        type: "normal",
        icon: "create",
      },
    ];
  };

  return (
    <React.Fragment>
      <ViewDesignation
        isOpen={showViewDesignation}
        toggle={toggleViewDesignation}
        designation={viewDesignationData}
      />
      <AddNewDesignation isOpen={showAddDesignation} toggle={toggle} />
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Access" breadcrumbItem="Designations" />
          {isLoading ? (
            <Spinners setLoading={setLoading} />
          ) : (
            <Row>
              <Col lg="12">
                <Card>
                  <CardBody>
                    {console.log("designation" + JSON.stringify(desigList))}
                    <TableContainer
                      isPagination={true}
                      columns={columns}
                      data={desigList}
                      isGlobalFilter={true}
                      isAddUserList={true}
                      isShowingPageLength={true}
                      tableActions={getTableActions()}
                      handleDesignationClick={() => setShowAddDesignation(true)}
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

export default withRouter(DesignationList);
