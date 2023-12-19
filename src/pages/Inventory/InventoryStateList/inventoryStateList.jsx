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
import {
  Code,
  StateType,
  Description,
  Status,
  CreatedAt,
  CreatedBy,
} from "./inventoryStateListCol";
import Breadcrumbs from "/src/components/Common/Breadcrumb";
import { getInventoryStateList as onGetInventoryStateList } from "/src/store/inventorystate/actions";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { ToastContainer } from "react-toastify";
import ViewInventoryState from "./ViewInventoryState";
import AddNewInventoryState from "./AddNewInventoryState";

const InventoryStateList = (props) => {
  //meta title
  document.title = "Inventory States | VDigital";

  const dispatch = useDispatch();
  const selectInventoryState = (state) => state.inventorystatelist;
  const InventoryStateProperties = createSelector(
    selectInventoryState,
    (inventorystatelist) => ({
      inventstate: inventorystatelist.inventorystatelist,
      loading: inventorystatelist.loading,
    })
  );

  const { inventstate, loading } = useSelector(InventoryStateProperties);

  const [isLoading, setLoading] = useState(loading);
  const [showAddInventoryState, setShowAddInventoryState] = useState(false);

  const [showViewInventoryState, setShowViewInventoryView] = useState(false);
  const [viewInventoryStateData, setViewInventoryStateData] = useState({});

  const handleViewInventoryState = (userData) => {
    console.log("User Data: ", userData);
    setShowViewInventoryView(!showViewInventoryState);
    setViewInventoryStateData(userData);
  };

  const handleAddInventoryState = () => {
    setShowAddInventoryState(!showAddInventoryState);
  };

  const columns = useMemo(
    () => [
      {
        Header: "#",
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
                  handleViewInventoryState(userData);
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
          return <Code {...cellProps} />;
        },
      },
      {
        Header: "State Type",
        accessor: "state_type_lbl",
        filterable: true,
        Cell: (cellProps) => {
          return <StateType {...cellProps} />;
        },
      },
      {
        Header: "Staus",
        accessor: "status",
        filterable: true,
        Cell: (cellProps) => {
          return <Status {...cellProps} />;
        },
      },
      {
        Header: "Description",
        accessor: "description",
        filterable: true,
        Cell: (cellProps) => {
          return <Description {...cellProps} />;
        },
      },
      {
        Header: "Created At",
        accessor: "created_at",
        filterable: true,
        Cell: (cellProps) => {
          return <CreatedAt {...cellProps} />;
        },
      },
      {
        Header: "Created By",
        accessor: "created_by",
        filterable: true,
        Cell: (cellProps) => {
          return <CreatedBy {...cellProps} />;
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
    if (inventstate && !inventstate.length) {
      dispatch(onGetInventoryStateList());
    }
  }, [dispatch, inventstate]);

  const keyField = "id";

  const getTableActions = () => {
    return [
      {
        name: "Create",
        action: setShowAddInventoryState,
        type: "normal",
        icon: "create",
      },
    ];
  };

  return (
    <React.Fragment>
      <ViewInventoryState
        isOpen={showViewInventoryState}
        handleViewInventoryState={handleViewInventoryState}
        inventorystate={viewInventoryStateData}
      />
      <AddNewInventoryState
        isOpen={showAddInventoryState}
        handleAddInventroyState={handleAddInventoryState}
      />
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Inventory" breadcrumbItem="Inventory States" />
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
                      data={inventstate}
                      isGlobalFilter={true}
                      isShowTableActionButtons={true}
                      isShowingPageLength={true}
                      tableActions={getTableActions()}
                      customPageSize={10}
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

export default withRouter(InventoryStateList);
