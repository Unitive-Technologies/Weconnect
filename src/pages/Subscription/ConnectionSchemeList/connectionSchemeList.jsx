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
  Table,
  UncontrolledTooltip,
  Spinner,
} from "reactstrap";
import Breadcrumbs from "/src/components/Common/Breadcrumb";
import DeleteModal from "/src/components/Common/DeleteModal";
import {
  getConnectionScheme as onGetConnectionScheme,
  getConnectionSchemeBoxType as onGetConnectionBoxType,
  getConnectionSchemeStatus as onGetConnectionStatus,
} from "/src/store/actions";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { ToastContainer } from "react-toastify";
import ViewConnectionScheme from "./ViewConnectionScheme";
import CreateConnectionScheme from "./CreateConnectionScheme";
import BulkAssign from "./BulkAssign";
import BulkRemoval from "./BulkRemoval";

const ConnectionSchemeList = (props) => {
  //meta title
  document.title = "Connection Schemes | VDigital";

  const dispatch = useDispatch();

  const selectConnectionSchemeState = (state) => state.connectionscheme;
  const ConnectionSchemeProperties = createSelector(
    selectConnectionSchemeState,
    (connectionscheme) => ({
      connectscheme: connectionscheme.connectionscheme,
      connectboxtype: connectionscheme.connectionBoxType,
      connectstatus: connectionscheme.connectionStatus,
      loading: connectionscheme.loading,
    })
  );

  const { connectscheme, connectboxtype, connectstatus, loading } = useSelector(
    ConnectionSchemeProperties
  );

  const [modal, setModal] = useState(false);
  const [showCreateConnectionScheme, setShowCreateConnectionScheme] =
    useState(false);

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

  const stbBrandTableSchema = {
    subTableArrayKeyName: "stbbrands",
    keyColumn: "id",
    columns: [
      {
        header: "Brand Name",
        accessor: (rowData) => rowData.name,
      },
      {
        header: "Box Type",
        accessor: (rowData) => rowData.box_type_lbl,
      },
      {
        header: "CAS",
        accessor: (rowData) => rowData.cas_lbl,
      },
      {
        header: "Type",
        accessor: (rowData) => rowData.type_lbl,
      },
    ],
  };

  const getStbBrandListRendered = (rowData) => {
    return (
      <Table className="table mb-0">
        <thead>
          <tr>
            {stbBrandTableSchema.columns.map((column) => {
              return <th key={column.header}>{column.header}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {rowData[stbBrandTableSchema.subTableArrayKeyName].map((object) => {
            return (
              <tr key={object.id}>
                {stbBrandTableSchema.columns.map((column) => {
                  return <td key={column.header}>{column.accessor(object)}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </Table>
    );
  };

  const columns = useMemo(
    () => [
      {
        Header: "*",
        disableFilters: true,
        filterable: true,
        Cell: () => {
          return (
            <>
              <i className="mdi mdi-check"></i>
            </>
          );
        },
      },
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
    ],
    []
  );

  useEffect(() => {
    if (connectscheme && !connectscheme.length) {
      dispatch(onGetConnectionScheme());
      dispatch(onGetConnectionBoxType());
      dispatch(onGetConnectionStatus());
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
      {showViewConnectionScheme && (
        <ViewConnectionScheme
          isOpen={showViewConnectionScheme}
          toggle={toggleViewConnectionScheme}
          Connectionscheme={viewConnectionSchemeData}
          connectboxtype={connectboxtype}
          connectstatus={connectstatus}
        />
      )}
      {showCreateConnectionScheme && (
        <CreateConnectionScheme
          isOpen={showCreateConnectionScheme}
          toggle={toggleCreateConnectionScheme}
          connectboxtype={connectboxtype}
          connectstatus={connectstatus}
        />
      )}
      <BulkAssign isOpen={showBulkAssign} toggle={toggleBulkAssign} />
      <BulkRemoval isOpen={showBulkRemoval} toggle={toggleBulkRemoval} />
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs
            title="Subscription"
            breadcrumbItem="Connection Schemes"
          />
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
                    <TableContainer
                      isPagination={true}
                      columns={columns}
                      data={connectscheme}
                      isGlobalFilter={true}
                      isShowTableActionButtons={true}
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
                      subTableEnabled={true}
                      getRenderedSubTable={getStbBrandListRendered}
                      isSubTableContentExists={(rowData) =>
                        rowData.stbbrands.length > 0
                      }
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
