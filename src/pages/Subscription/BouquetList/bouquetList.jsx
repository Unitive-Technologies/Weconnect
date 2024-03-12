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
} from "reactstrap";
import Breadcrumbs from "/src/components/Common/Breadcrumb";
import {
  goToPage as onGoToPage,
  getBouquet as onGetBouquet,
  getAlacarteChannels as onGetAlacarteChannels,
  getBouquetBoxtype as onGetBouquetBoxtype,
  getBouquetStatus as onGetBouquetStatus,
  getBouquetPackages as onGetBouquetPackages,
  getBouquetTaxlist as onGetBouquetTaxlist,
  getBouquetType as onGetBouquetType,
  getBouquex as onGetBouquex,
  getRechargePeriod as onGetRechargePeriod,
} from "/src/store/bouquetlist/actions";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { ToastContainer } from "react-toastify";
import ViewBouquet from "./ViewBouquet";
import CreateBouquet from "./CreateBouquet";
import BulkAssign from "./BulkAssign";
import BulkRemoval from "./BulkRemoval";
import BulkSettings from "./BulkSettings";
import TableContainerX from "../../../components/Common/TableContainerX";

const BouquetList = () => {
  //meta title
  document.title = "Bouquets | VDigital";

  const dispatch = useDispatch();

  const selectBouquetState = (state) => state.bouquet;
  const BouquetProperties = createSelector(selectBouquetState, (bouquet) => ({
    bouquets: bouquet.bouquet,
    loading: bouquet.loading,
    alacartechannels: bouquet.alacartechannels,
    bouquetstatus: bouquet.bouquetstatus,
    bouquetboxtype: bouquet.bouquetboxtype,
    bouquetpackages: bouquet.bouquetpackages,
    bouquettaxlist: bouquet.bouquettaxlist,
    bouquettype: bouquet.bouquettype,
    bouquex: bouquet.bouquex,
    rechargeperiod: bouquet.rechargeperiod,
    totalPage: bouquet.totalPages,
    totalCount: bouquet.totalCount,
    pageSize: bouquet.perPage,
    currentPage: bouquet.currentPage,
  }));

  const {
    bouquets,
    loading,
    alacartechannels,
    bouquetboxtype,
    bouquetstatus,
    bouquetpackages,
    bouquettaxlist,
    bouquettype,
    bouquex,
    rechargeperiod,
    totalPage,
    totalCount,
    pageSize,
    currentPage,
  } = useSelector(BouquetProperties);
  console.log("Bouquet list data in component:", JSON.stringify(bouquets));

  const [isLoading, setLoading] = useState(loading);
  const [showCreateBouquet, setShowCreateBouquet] = useState(false);
  const [showBulkAssign, setShowBulkAssign] = useState(false);
  const [showViewBouquet, setShowViewBouquet] = useState(false);
  const [viewBouquetData, setViewBouquetData] = useState({});
  const [showBulkRemoval, setShowBulkRemoval] = useState(false);
  const [showBulkSettings, setShowBulkSettings] = useState(false);
  const [isChecked, setIsChecked] = useState(true);
  const [selectedRow, setSelectedRow] = useState({});
  const [showWarning, setShowWarning] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const handleCheckboxClick = (row) => {
    console.log(
      "Before state update - selectedRows:",
      JSON.stringify(selectedRows)
    );
    const isSelected = selectedRows.some(
      (selectedRow) => selectedRow.id === row.id
    );

    if (isSelected) {
      // If already selected, remove it
      setSelectedRows((prevSelectedRows) =>
        prevSelectedRows.filter((selectedRow) => selectedRow.id !== row.id)
      );
    } else {
      // If not selected, add it
      setSelectedRows((prevSelectedRows) => [...prevSelectedRows, row]);
    }
    console.log(
      "After state update - selectedRows:",
      JSON.stringify(selectedRows)
    );
  };

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

  const rateTableSchema = {
    subTableArrayKeyName: "rate",
    keyColumn: "id",
    columns: [
      {
        header: "Period",
        accessor: (rowData) => rowData.name,
      },
      {
        header: "Price",
        accessor: (rowData) => rowData.price,
      },
      {
        header: "Rent/NCF",
        accessor: (rowData) => rowData.rental,
      },
      {
        header: "Tax",
        accessor: (rowData) => rowData.tax_amount,
      },
      {
        header: "Total",
        accessor: (rowData) => rowData.amount,
      },
      {
        header: "Refundable",
        accessor: (rowData) => (rowData.is_refundable == 0 ? "NO" : "YES"),
      },
      {
        header: "Free Days",
        accessor: (rowData) => rowData.free_days,
      },
      {
        header: "MRP(Tax Incl.)",
        accessor: (rowData) => rowData.mrp,
      },
    ],
  };

  const getRateTableRendered = (rowData) => {
    return (
      <Table className="table mb-0">
        <thead>
          <tr>
            {rateTableSchema.columns.map((column) => {
              return <th key={column.header}>{column.header}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {rowData[rateTableSchema.subTableArrayKeyName].map((object) => {
            return (
              <tr key={object.id}>
                {rateTableSchema.columns.map((column) => {
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
        Cell: (cellProps) => (
          <input
            type="checkbox"
            onChange={() => handleCheckboxClick(cellProps.row.original)}
          />
        ),
      },
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
                style={{
                  maxWidth: 200,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
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
            <p
              className="text-muted mb-0"
              style={{
                maxWidth: 150,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
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
        Header: "Broadcaster MRP",
        // accessor: "status_lbl",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              {parseFloat(cellProps.row.original.br_mrp).toFixed(2)}
            </p>
          );
        },
      },
      {
        Header: "MRP/DRP",
        // accessor: "status_lbl",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              {parseFloat(cellProps.row.original.mrp).toFixed(2)}
            </p>
          );
        },
      },
      {
        Header: "Customer MRP",
        // accessor: "status_lbl",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              {parseFloat(
                parseInt(cellProps.row.original.mrp) +
                  parseInt(cellProps.row.original.tax)
              ).toFixed(2)}
            </p>
          );
        },
      },
      {
        Header: "LCO Price",
        // accessor: "status_lbl",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              {parseFloat(cellProps.row.original.lco_rate).toFixed(2)}
            </p>
          );
        },
      },
      {
        Header: "Is Exclusive",
        // accessor: "status_lbl",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              {cellProps.row.original.is_exclusive_lbl}
            </p>
          );
        },
      },
      {
        Header: "Is Promotional",
        // accessor: "status_lbl",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              {cellProps.row.original.is_promotional_lbl}
            </p>
          );
        },
      },
      {
        Header: "NCF Type",
        // accessor: "status_lbl",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              {cellProps.row.original.ifFixNCF === true
                ? "Fix NCF"
                : "Dynamic NCF"}
            </p>
          );
        },
      },
      {
        Header: "Settings",
        filterable: true,
        Cell: (cellProps) => {
          const settingData = cellProps.row.original.setting;
          const settingString = Object.keys(settingData)
            .map((key) => `${key}: ${settingData[key]}`)
            .join(" ");

          return (
            <p
              className="text-muted mb-0"
              style={{
                maxWidth: 200,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {settingString}
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
    if (bouquets && !bouquets.length) {
      dispatch(onGetBouquet());
      dispatch(onGetAlacarteChannels());
      dispatch(onGetBouquetBoxtype());
      dispatch(onGetBouquetPackages());
      dispatch(onGetBouquetTaxlist());
      dispatch(onGetBouquex());
      dispatch(onGetBouquetType());
      dispatch(onGetBouquetStatus());
      dispatch(onGetRechargePeriod());
    }
  }, [dispatch, bouquets]);

  const goToPage = (toPage) => {
    console.log("[GOTO PAGE] Trigger to page - ", toPage);
    dispatch(onGoToPage(toPage));
    dispatch(onGetBouquet());
  };

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
        action: selectedRow.length === 0 ? setShowWarning : setShowBulkAssign,
        type: "dropdown",
        dropdownName: "Action",
      },
      {
        name: "Bulk removal from Operator",
        action: selectedRow.length === 0 ? setShowWarning : setShowBulkRemoval,
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
      {showViewBouquet && (
        <ViewBouquet
          isOpen={Boolean(showViewBouquet)}
          toggle={toggleViewBouquet}
          bouquet={viewBouquetData}
          alacartechannels={alacartechannels}
          bouquetstatus={bouquetstatus}
          bouquetboxtype={bouquetboxtype}
          bouquetpackages={bouquetpackages}
          bouquettaxlist={bouquettaxlist}
          bouquettype={bouquettype}
          bouquex={bouquex}
          rechargeperiod={rechargeperiod}
          selectedRowId={viewBouquetData && viewBouquetData.id}
          showCreateBouquet={showCreateBouquet}
          showViewBouquet={showViewBouquet}
        />
      )}
      {showCreateBouquet && (
        <CreateBouquet
          isOpen={Boolean(showCreateBouquet)}
          toggleCreateBouquet={toggleCreateBouquet}
          alacartechannels={alacartechannels}
          bouquetstatus={bouquetstatus}
          bouquetboxtype={bouquetboxtype}
          bouquetpackages={bouquetpackages}
          bouquettaxlist={bouquettaxlist}
          bouquettype={bouquettype}
          bouquex={bouquex}
          rechargeperiod={rechargeperiod}
          showCreateBouquet={showCreateBouquet}
          showViewBouquet={showViewBouquet}
        />
      )}
      {selectedRow && showBulkAssign && (
        <BulkAssign
          isOpen={Boolean(showBulkAssign)}
          toggle={toggleBulkAssign}
          selectedRows={selectedRows}
        />
      )}
      {showBulkRemoval && (
        <BulkRemoval
          isOpen={Boolean(showBulkRemoval)}
          toggle={toggleBulkRemoval}
          selectedRows={selectedRows}
        />
      )}
      {showBulkSettings && (
        <BulkSettings
          isOpen={Boolean(showBulkSettings)}
          toggle={toggleBulkSettings}
          bouquets={bouquets}
        />
      )}
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
                    {/* <TableContainer
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
                    /> */}
                    <TableContainerX
                      columns={columns}
                      data={bouquets}
                      isLoading={loading}
                      isPagination={true}
                      totalCount={Number(totalCount)}
                      pageSize={Number(pageSize)}
                      currentPage={Number(currentPage)}
                      totalPage={Number(totalPage)}
                      isGlobalFilter={true}
                      isShowingPageLength={true}
                      tableActions={getTableActions()}
                      // handleRowClick={(row) => {
                      //   handleViewUser(row);
                      // }}
                      goToPage={goToPage}
                      subTableEnabled={true}
                      getRenderedSubTable={getRateTableRendered}
                      isSubTableContentExists={(rowData) =>
                        rowData.rate.length > 0
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

export default withRouter(BouquetList);
