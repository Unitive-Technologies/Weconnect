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
import DeleteModal from "/src/components/Common/DeleteModal";
import { getConnectionScheme as onGetConnectionScheme } from "/src/store/actions";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { ToastContainer } from "react-toastify";
import ViewConnectionScheme from "./ViewConnectionScheme";
import CreateConnectionScheme from "./CreateConnectionScheme";
import BulkAssign from "./BulkAssign";
import BulkRemoval from "./BulkRemoval";

const ConnectionSchemeList = (props) => {
  //meta title
  document.title = "Connection Scheme List | VDigital";

  const dispatch = useDispatch();

  const selectConnectionSchemeState = (state) => state.connectionscheme;
  const ConnectionSchemeProperties = createSelector(
    selectConnectionSchemeState,
    (connectionscheme) => ({
      connectscheme: connectionscheme.connectionscheme,
      loading: connectionscheme.loading,
    })
  );

  const { connectscheme, loading } = useSelector(ConnectionSchemeProperties);

  useEffect(() => {
    // console.log("connectionscheme data in component:", connectscheme);
  }, [connectscheme]);
  const [isLoading, setLoading] = useState(loading);
  const [modal, setModal] = useState(false);
  const [showCreateConnectionScheme, setShowCreateConnectionScheme] =
    useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [showBulkAssign, setShowBulkAssign] = useState(false);
  const [showViewConnectionScheme, setShowViewConnectionScheme] =
    useState(false);
  const [viewConnectionSchemeData, setViewConnectionSchemeData] = useState({});
  const [showBulkRemoval, setShowBulkRemoval] = useState(false);

  const toggleViewConnectionScheme = (userData) => {
    console.log("User Data: ", userData);
    setShowViewConnectionScheme(!showViewConnectionScheme);
    setViewConnectionSchemeData(userData);
  };

  const toggleCreateConnectionScheme = () => {
    setShowCreateConnectionScheme(!showCreateConnectionScheme);
  };

  const toggleBulkAssign = () => {
    setShowBulkAssign(!showBulkAssign);
  };

  const toggleBulkRemoval = () => {
    setShowBulkRemoval(!showBulkRemoval);
  };

  const columns = useMemo(
    () => [
      {
        Header: "#",
        // accessor: "name",
        disableFilters: true,
        filterable: true,
        accessor: (cellProps) => (
          <>
            {!cellProps.img ? (
              <div className="avatar-xs">
                <span className="avatar-title rounded-circle">
                  {cellProps.name.charAt(0)}
                </span>
              </div>
            ) : (
              <div>
                <img
                  className="rounded-circle avatar-xs"
                  src={cellProps.img}
                  alt=""
                />
              </div>
            )}
          </>
        ),
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
                  toggleViewConnectionScheme(userData);
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
        Header: "Type",
        accessor: "boxtype_lbl",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              {cellProps.row.original.boxtype_lbl}
            </p>
          );
        },
      },
      {
        Header: "Hardware Charge",
        accessor: "hardware_charge",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              {cellProps.row.original.hardware_charge}
            </p>
          );
        },
      },
      {
        Header: "Installation Charge",
        accessor: "installation_charge",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              {cellProps.row.original.installation_charge}
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
    if (connectscheme && !connectscheme.length) {
      dispatch(onGetConnectionScheme());
      setIsEdit(false);
    }
  }, [dispatch, connectscheme]);

  const toggle = () => {
    setModal(!modal);
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

  const [deleteModal, setDeleteModal] = useState(false);

  const onClickDelete = (connectionscheme) => {
    setContact(connectionscheme);
    setDeleteModal(true);
  };

  const keyField = "id";
  const getTableActions = () => {
    return [
      {
        name: "Create",
        action: setShowCreateConnectionScheme,
        type: "normal",
        icon: "create",
      },
      {
        name: "Bulk Assign to Operator",
        action: setShowBulkAssign,
        type: "dropdown",
        dropdownName: "Action",
      },
      {
        name: "Bulk Removal from Operator",
        action: setShowBulkRemoval,
        type: "dropdown",
        dropdownName: "Action",
      },
    ];
  };

  return (
    <React.Fragment>
      <ViewConnectionScheme
        isOpen={showViewConnectionScheme}
        toggle={toggleViewConnectionScheme}
        Connectionscheme={viewConnectionSchemeData}
      />
      <CreateConnectionScheme
        isOpen={showCreateConnectionScheme}
        toggle={toggleCreateConnectionScheme}
      />
      <BulkAssign isOpen={showBulkAssign} toggle={toggleBulkAssign} />
      <BulkRemoval isOpen={showBulkRemoval} toggle={toggleBulkRemoval} />
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs
            title="Subscription"
            breadcrumbItem="Connection Scheme List"
          />
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
                      data={connectscheme}
                      isGlobalFilter={true}
                      isAddUserList={true}
                      isShowingPageLength={true}
                      tableActions={getTableActions()}
                      handleUserClick={() =>
                        setShowCreateConnectionScheme(true)
                      }
                      handleUploadUser={() => setShowBulkAssign(true)}
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

export default withRouter(ConnectionSchemeList);
