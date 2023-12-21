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
import { getBouquet as onGetBouquet } from "/src/store/actions";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { ToastContainer } from "react-toastify";
import ViewBouquet from "./ViewBouquet";
import CreateBouquet from "./CreateBouquet";
import BulkAssign from "./BulkAssign";
import BulkRemoval from "./BulkRemoval";
import BulkSettings from "./BulkSettings";

const BouquetList = () => {
  //meta title
  document.title = "Bouquet List | VDigital";

  const dispatch = useDispatch();

  const selectBouquetState = (state) => state.bouquet;
  const BouquetProperties = createSelector(selectBouquetState, (bouquet) => ({
    bouquets: bouquet.bouquet,
    loading: bouquet.loading,
  }));

  const { bouquets, loading } = useSelector(BouquetProperties);

  useEffect(() => {
    console.log("Bouquet list data in component:", bouquets);
  }, [bouquets]);
  const [isLoading, setLoading] = useState(loading);
  const [showCreateBouquet, setShowCreateBouquet] = useState(false);
  const [showBulkAssign, setShowBulkAssign] = useState(false);
  const [showViewBouquet, setShowViewBouquet] = useState(false);
  const [viewBouquetData, setViewBouquetData] = useState({});
  const [showBulkRemoval, setShowBulkRemoval] = useState(false);
  const [showBulkSettings, setShowBulkSettings] = useState(false);

  const toggleViewBouquet = (userData) => {
    console.log("User Data: ", userData);
    setShowViewBouquet(!showViewBouquet);
    setViewBouquetData(userData);
  };

  const toggleCreateBouquet = () => {
    setShowCreateBouquet(!showCreateBouquet);
  };

  const toggleBulkAssign = () => {
    setShowBulkAssign(!showBulkAssign);
  };

  const toggleBulkRemoval = () => {
    setShowBulkRemoval(!showBulkRemoval);
  };

  const toggleBulkSettings = () => {
    setShowBulkSettings(!showBulkSettings);
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
                  toggleViewBouquet(userData);
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
        Header: "Category",
        accessor: "category_lbl",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              {cellProps.row.original.category_lbl}
            </p>
          );
        },
      },
      {
        Header: "Type",
        accessor: "type_lbl",
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
        Header: "Bouquet Type",
        accessor: "bouquettype",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">{cellProps.row.original.type_lbl}</p>
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
              <Link to="#" className="text-success">
                <i className="mdi mdi-pencil font-size-18" id="edittooltip" />
                <UncontrolledTooltip placement="top" target="edittooltip">
                  Edit
                </UncontrolledTooltip>
              </Link>
              <Link to="#" className="text-danger">
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
    if (bouquets && !bouquets.length) {
      dispatch(onGetBouquet());
    }
  }, [dispatch, bouquets]);

  const getTableActions = () => {
    return [
      {
        name: "Create",
        action: setShowCreateBouquet,
        type: "normal",
        icon: "create",
      },
      {
        name: "Bulk assign to Operator",
        action: setShowBulkAssign,
        type: "dropdown",
        dropdownName: "Action",
      },
      {
        name: "Bulk removal from Operator",
        action: setShowBulkRemoval,
        type: "dropdown",
        dropdownName: "Action",
      },
      {
        name: "Bulk Bouquet Settings",
        action: setShowBulkSettings,
        type: "dropdown",
        dropdownName: "Action",
      },
    ];
  };

  return (
    <React.Fragment>
      <ViewBouquet
        isOpen={showViewBouquet}
        toggle={toggleViewBouquet}
        bouquet={viewBouquetData}
      />
      <CreateBouquet isOpen={showCreateBouquet} toggle={toggleCreateBouquet} />
      <BulkAssign isOpen={showBulkAssign} toggle={toggleBulkAssign} />
      <BulkRemoval isOpen={showBulkRemoval} toggle={toggleBulkRemoval} />
      <BulkSettings isOpen={showBulkSettings} toggle={toggleBulkSettings} />
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Subscription" breadcrumbItem="Bouquet List" />
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
                      data={bouquets}
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

export default withRouter(BouquetList);
