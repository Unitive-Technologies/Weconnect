import React, { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Card, CardBody, Col, Row } from "reactstrap";
import TableContainer from "../../components/Common/TableContainer";
import EditStb from "./EditStb";
import AddStockStb from "./AddStockStb";
import StockStbMarkfaulty from "./StockStbMarkfaulty";
import StockStbBlacklist from "./StockStbBlacklist";
import StbActionUpdation from "./StbActionUpdation";

const StockStb = (props) => {
  const {
    stockstb,
    tableActions,
    stocksccastype,
    stockscwarehouse,
    stockscstatetype,
    stockscinventorystate,
    brand1,
    brand2,
    isOpen,
    toggle,
    showStockStbBlacklist,
    setShowStockStbBlacklist,
    showStbActionupdated,
    setShowStbActionupdated,
    showStockStbMarkfaulty,
    setShowStockStbMarkfaulty,
    handleSelectedStbs,
    selectedStbs,
    actioninventorystate,
  } = props;
  const [showEditStb, setShowEditStb] = useState(false);
  const [editStbData, setEditStbData] = useState({});

  const toggleEditStb = (row) => {
    setShowEditStb(!showEditStb);
    setEditStbData(row);
  };

  const handleStockStbMarkfaulty = () => {
    setShowStockStbMarkfaulty(!showStockStbMarkfaulty);
  };

  const handleStockStbBlacklist = () => {
    setShowStockStbBlacklist(!showStockStbBlacklist);
  };

  const handleStbActionUpdated = () => {
    setShowStbActionupdated(!showStbActionupdated);
  };

  const columns = useMemo(
    () => [
      {
        Header: "*",
        disableFilters: true,
        filterable: true,
        Cell: (cellProps) => {
          return (
            <>
              <input type="checkbox" />
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
        Header: "STB No.",
        accessor: "stbno",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <>
              <h5
                className="font-size-14 mb-1"
                onClick={() => {
                  const row = cellProps.row.original;
                  console.log("Selected row: ", row);
                  toggleEditStb(row);
                }}
              >
                <Link className="text-dark" to="#">
                  {cellProps.row.original.stbno}
                </Link>
              </h5>
            </>
          );
        },
      },
      {
        Header: "Box Type",
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
        Header: "CAS",
        accessor: "cas_lbl",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">{cellProps.row.original.cas_lbl}</p>
          );
        },
      },
      {
        Header: "Brand",
        accessor: "brand_lbl",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              {cellProps.row.original.brand_lbl}
            </p>
          );
        },
      },
      {
        Header: "Stock Type",
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
        Header: "Inventory State",
        accessor: "inv_state_lbl",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              {cellProps.row.original.inv_state_lbl}
            </p>
          );
        },
      },
      {
        Header: "Warehouse",
        accessor: "warehouse_lbl",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              {cellProps.row.original.warehouse_lbl}
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
        Header: "Added by",
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

  return (
    <React.Fragment>
      <EditStb
        isOpen={showEditStb}
        toggle={toggleEditStb}
        stbData={editStbData}
      />
      <AddStockStb
        isOpen={isOpen}
        toggle={toggle}
        stocksccastype={stocksccastype}
        stockscwarehouse={stockscwarehouse}
        stockscstatetype={stockscstatetype}
        stockscinventorystate={stockscinventorystate}
        brand1={brand1}
        brand2={brand2}
      />
      <StockStbMarkfaulty
        isOpen={showStockStbMarkfaulty}
        toggle={handleStockStbMarkfaulty}
        selectedStbs={selectedStbs}
      />
      <StockStbBlacklist
        isOpen={showStockStbBlacklist}
        toggle={handleStockStbBlacklist}
        selectedStbs={selectedStbs}
      />
      <StbActionUpdation
        isOpen={showStbActionupdated}
        toggle={handleStbActionUpdated}
        selectedStbs={selectedStbs}
        brand1={brand1}
        stockscwarehouse={stockscwarehouse}
        actioninventorystate={actioninventorystate}
      />
      <Row>
        <Col lg="12">
          <Card>
            <CardBody>
              <TableContainer
                isPagination={true}
                columns={columns}
                data={stockstb}
                isGlobalFilter={true}
                isAddRegionalOffice={true}
                isShowTableActionButtons={true}
                isShowingPageLength={true}
                tableActions={tableActions}
                customPageSize={50}
                tableClass="table align-middle table-nowrap table-hover"
                theadClass="table-light"
                paginationDiv="col-sm-12 col-md-7"
                pagination="pagination pagination-rounded justify-content-end mt-4"
                // handleRowClick={(row) => {
                //   toggleEditStb(row);
                // }}
                handleRowClick={(row) => {
                  handleSelectedStbs(row);
                }}
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

StockStb.propTypes = {
  stockstb: PropTypes.array,
  tableActions: PropTypes.array,
  stocksccastype: PropTypes.array,
  stockscwarehouse: PropTypes.array,
  stockscstatetype: PropTypes.array,
  stockscinventorystate: PropTypes.array,
  brand1: PropTypes.array,
  brand2: PropTypes.array,
  isOpen: PropTypes.bool,
  toggle: PropTypes.func,
  showStockStbBlacklist: PropTypes.bool,
  setShowStockStbBlacklist: PropTypes.func,
  showStbActionupdated: PropTypes.bool,
  setShowStbActionupdated: PropTypes.func,
  showStockStbMarkfaulty: PropTypes.bool,
  setShowStockStbMarkfaulty: PropTypes.func,
  handleSelectedStbs: PropTypes.func,
  selectedStbs: PropTypes.array,
  actioninventorystate: PropTypes.array,
};

export default StockStb;
