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
  Name,
  Code,
  Contact,
  Mobile,
  Address,
  Description,
  RegionalOffice,
  LCO,
  LcoCode,
  Status,
  CreatedAt,
  CreatedBy,
} from "./warehouseListCol";
import Breadcrumbs from "/src/components/Common/Breadcrumb";
import {
  getWarehouseList as onGetWarehouseList,
  // addNewUser as onAddNewUser,
  // updateUser as onUpdateUser,
  // deleteUser as onDeleteUser,
} from "/src/store/warehouse/actions";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { ToastContainer } from "react-toastify";
import ViewWareHouse from "./ViewWareHouse";
import AddNewWareHouse from "./AddNewWareHouse";
import UploadWareHouse from "./UploadWareHouse";

const WarehouseList = (props) => {
  //meta title
  document.title = "Warehouse List | VDigital";

  const dispatch = useDispatch();

  const selectWarehouseState = (state) => state.warehouselist;
  const WarehouseProperties = createSelector(
    selectWarehouseState,
    (warehouselist) => ({
      warehouse: warehouselist.warehouselist,
      loading: warehouselist.loading,
    })
  );

  const { warehouse, loading } = useSelector(WarehouseProperties);

  useEffect(() => {
    console.log("WarehouseList data in component:", warehouse);
  }, [warehouse]);
  const [isLoading, setLoading] = useState(loading);
  const [showAddWareHouse, setShowAddWareHouse] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [showUploadWareHouse, setShowUploadWareHouse] = useState(false);
  const [showViewWareHouse, setShowViewWareHouse] = useState(false);
  const [viewWareHouseData, setViewWareHouseData] = useState({});

  const toggleViewWareHouse = (userData) => {
    console.log("User Data: ", userData);
    setShowViewWareHouse(!showViewWareHouse);
    setViewWareHouseData(userData);
  };

  const toggleAddWareHouse = () => {
    setShowAddWareHouse(!showAddWareHouse);
  };

  const toggleUploadWareHouse = () => {
    setShowUploadWareHouse(!showUploadWareHouse);
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
                  toggleViewWareHouse(userData);
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
        Header: "Contact Person",
        accessor: "contactperson",
        filterable: true,
        Cell: (cellProps) => {
          return <Contact {...cellProps} />;
        },
      },
      {
        Header: "Mobile No.",
        accessor: "mobileno",
        filterable: true,
        Cell: (cellProps) => {
          return <Mobile {...cellProps} />;
        },
      },
      {
        Header: "Address",
        accessor: "address",
        filterable: true,
        Cell: (cellProps) => {
          return <Address {...cellProps} />;
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
        Header: "Status",
        accessor: "status",
        filterable: true,
        Cell: (cellProps) => {
          return <Status {...cellProps} />;
        },
      },
      {
        Header: "Regional Office",
        accessor: "regionaloffice",
        filterable: true,
        Cell: (cellProps) => {
          return <RegionalOffice {...cellProps} />;
        },
      },
      {
        Header: "LCO",
        accessor: "lco",
        filterable: true,
        Cell: (cellProps) => {
          return <LCO {...cellProps} />;
        },
      },
      {
        Header: "LCO Code",
        accessor: "lcocode",
        filterable: true,
        Cell: (cellProps) => {
          return <LcoCode {...cellProps} />;
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
    if (warehouse && !warehouse.length) {
      dispatch(onGetWarehouseList());
      setIsEdit(false);
    }
  }, [dispatch, warehouse]);

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

  const keyField = "id";

  const getTableActions = () => {
    return [
      {
        name: "Create",
        action: setShowAddWareHouse,
        type: "normal",
        icon: "create",
      },
      {
        name: "Upload",
        action: setShowUploadWareHouse,
        type: "normal",
        icon: "upload",
      },
    ];
  };

  return (
    <React.Fragment>
      <ViewWareHouse
        isOpen={showViewWareHouse}
        toggle={toggleViewWareHouse}
        warehouse={viewWareHouseData}
      />
      <AddNewWareHouse isOpen={showAddWareHouse} toggle={toggleAddWareHouse} />
      <UploadWareHouse
        isOpen={showUploadWareHouse}
        toggle={toggleUploadWareHouse}
      />
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Inventory" breadcrumbItem="Warhouse List" />
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
                      data={warehouse}
                      isGlobalFilter={true}
                      isAddUserList={true}
                      isShowingPageLength={true}
                      tableActions={getTableActions()}
                      handleUserClick={() => setShowAddWareHouse(true)}
                      handleUploadUser={() => setShowUploadWareHouse(true)}
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

export default withRouter(WarehouseList);
