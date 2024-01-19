import React, { useEffect, useState, useMemo } from "react";
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
import { goToPage as onGoToPage, getWarehouseList as onGetWarehouseList, getWarehouseListOperator as onGetWarehouseListOperator, getWarehouseListStatus as onGetWarehouseListStatus } from "/src/store/warehouse/actions";

import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { ToastContainer } from "react-toastify";
import ViewWareHouse from "./ViewWareHouse";
import AddNewWareHouse from "./AddNewWareHouse";
import UploadWareHouse from "./UploadWareHouse";
import TableContainerX from "../../../components/Common/TableContainerX";

const WarehouseList = (props) => {
  //meta title
  document.title = "Warehouses | VDigital";

  const dispatch = useDispatch();

  const selectWarehouseState = (state) => state.warehouselist;
  const WarehouseProperties = createSelector(
    selectWarehouseState,
    (warehouselist) => ({
      warehouse: warehouselist.warehouselist,
      warehouseStatus: warehouselist.warehouselistStatus,
      warehouseOperator: warehouselist.warehouselistOperator,
      loading: warehouselist.loading,
      totalPage: warehouselist.totalPages,
      totalCount: warehouselist.totalCount,
      pageSize: warehouselist.perPage,
      currentPage: warehouselist.currentPage,
    })
  );

  const { warehouse, warehouseOperator, warehouseStatus, loading, totalPage,
    totalCount,
    pageSize,
    currentPage } = useSelector(WarehouseProperties);

  const [isLoading, setLoading] = useState(loading);
  const [showAddWareHouse, setShowAddWareHouse] = useState(false);
  const [showUploadWareHouse, setShowUploadWareHouse] = useState(false);
  const [showViewWareHouse, setShowViewWareHouse] = useState(false);
  const [viewWareHouseData, setViewWareHouseData] = useState({});

  const handleViewWarehouse = (row) => {
    setShowViewWareHouse(!showViewWareHouse);
    setViewWareHouseData(row);
  };

  const handleAddWarehouse = () => {
    setShowAddWareHouse(!showAddWareHouse);
  };

  const handleUploadWarehouse = () => {
    setShowUploadWareHouse(!showUploadWareHouse);
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
              //   handleViewWarehouse(userData);
              // }}
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
        accessor: "contact_person",
        filterable: true,
        Cell: (cellProps) => {
          return <Contact {...cellProps} />;
        },
      },
      {
        Header: "Mobile No.",
        accessor: "mobile_no",
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
        accessor: "status_lbl",
        filterable: true,
        Cell: (cellProps) => {
          return <Status {...cellProps} />;
        },
      },
      {
        Header: "Regional Office",
        accessor: "city_lbl",
        filterable: true,
        Cell: (cellProps) => {
          return <RegionalOffice {...cellProps} />;
        },
      },
      {
        Header: "LCO",
        accessor: "operator_lbl",
        filterable: true,
        Cell: (cellProps) => {
          return <LCO {...cellProps} />;
        },
      },
      {
        Header: "LCO Code",
        accessor: "operator_code_lbl",
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
        accessor: "created_by_lbl",
        filterable: true,
        Cell: (cellProps) => {
          return <CreatedBy {...cellProps} />;
        },
      },
    ],
    []
  );

  useEffect(() => {
    if (warehouse && !warehouse.length) {
      dispatch(onGetWarehouseList());
      dispatch(onGetWarehouseListStatus());
      dispatch(onGetWarehouseListOperator());
    }
  }, [dispatch, warehouse]);

  const goToPage = (toPage) => {
    console.log("[GOTO PAGE] Trigger to page - ", toPage);
    dispatch(onGoToPage(toPage));
    dispatch(onGetWarehouseList());
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
        handleViewWarehouse={handleViewWarehouse}
        warehouse={viewWareHouseData}
        warehouseOperator={warehouseOperator}
        warehouseStatus={warehouseStatus}
      />
      <AddNewWareHouse
        isOpen={showAddWareHouse}
        handleAddWarehouse={handleAddWarehouse}
        warehouseOperator={warehouseOperator}
        warehouseStatus={warehouseStatus}
      />
      <UploadWareHouse
        isOpen={showUploadWareHouse}
        handleUploadWarehouse={handleUploadWarehouse}
      />
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Inventory" breadcrumbItem="Warhouses" />
          {isLoading ? (
            <Spinners setLoading={setLoading} />
          ) : (
            <Row>
              <Col lg="12">
                <Card>
                  <CardBody>
                    {/* <TableContainer
                      isPagination={true}
                      columns={columns}
                      data={warehouse}
                      isGlobalFilter={true}
                      isShowTableActionButtons={true}
                      isShowingPageLength={true}
                      tableActions={getTableActions()}
                      customPageSize={50}
                      handleRowClick={(warehouseData) => {
                        handleViewWarehouse(warehouseData);
                      }}
                      tableClass="table align-middle table-nowrap table-hover"
                      theadClass="table-light"
                      paginationDiv="col-sm-12 col-md-7"
                      pagination="pagination pagination-rounded justify-content-end mt-4"
                    /> */}
                    <TableContainerX
                      columns={columns}
                      data={warehouse}
                      isLoading={loading}
                      isPagination={true}
                      totalCount={Number(totalCount)}
                      pageSize={Number(pageSize)}
                      currentPage={Number(currentPage)}
                      totalPage={Number(totalPage)}
                      isGlobalFilter={true}
                      isShowingPageLength={true}
                      tableActions={getTableActions()}
                      handleRowClick={(warehouseData) => {
                        handleViewWarehouse(warehouseData);
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

export default withRouter(WarehouseList);
