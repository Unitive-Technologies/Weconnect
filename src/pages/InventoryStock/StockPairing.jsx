import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, Col, Row } from "reactstrap";
import TableContainerX from "../../components/Common/TableContainerX";
import PropTypes from "prop-types";
import CreatePairing from "./CreatePairing";
import StockPairingMarkfaulty from "./StockPairingMarkfaulty";
import StockPairingBlacklist from "./StockPairingBlacklist";
import DeleteStockPairing from "./DeleteStockPairing";

const StockPairing = (props) => {
  const {
    stockpairing,
    totalCount,
    totalPage,
    pageSize,
    currentPage,
    goToPage,
    loading,
    tableActions,
    isOpen,
    toggle,
    smartcardlist,
    stblist,
    stocksccastype,
    showStockPairingMarkfaulty,
    setShowStockPairingMarkfaulty,
    showStockPairingBlacklist,
    setShowStockPairingBlacklist,
    handleSelectedPairings,
    selectedPairings,
    pairinginventorystate,
    showDeleteStockPairing,
    setShowDeleteStockPairing,
    getFilteredHandleRowClicks,
  } = props;

  if (
    !stockpairing ||
    !totalCount ||
    !pageSize ||
    !currentPage ||
    !totalPage ||
    !goToPage ||
    loading === undefined
  ) {
    return (
      <div>
        <i className="mdi mdi-spin mdi-loading"></i>Loading...
      </div>
    );
  }

  const handleStockPairingMarkfaulty = () => {
    setShowStockPairingMarkfaulty(!showStockPairingMarkfaulty);
  };

  const handleStockPairingBlacklist = () => {
    setShowStockPairingBlacklist(!showStockPairingBlacklist);
  };

  const handleDeleteStockPairing = () => {
    setShowDeleteStockPairing(!showDeleteStockPairing);
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
        disableFilters: true,
        filterable: true,
        Cell: (cellProps) => {
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
        Header: "Smartcard No.",
        accessor: "smartcardno",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <>
              <h5 className="font-size-14 mb-1">
                <Link className="text-dark" to="#">
                  {cellProps.row.original.smartcardno}
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
            <p className="text-muted mb-0">{cellProps.row.original.stbno}</p>
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
        Header: "IsEmbedded",
        accessor: "is_embeded_lbl",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              {cellProps.row.original.is_embeded_lbl}
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
        Header: "Created by",
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
      <CreatePairing
        isOpen={isOpen}
        toggle={toggle}
        smartcardlist={smartcardlist}
        stblist={stblist}
        stocksccastype={stocksccastype}
      />
      <StockPairingMarkfaulty
        isOpen={showStockPairingMarkfaulty}
        toggle={handleStockPairingMarkfaulty}
        selectedPairings={selectedPairings}
        pairinginventorystate={pairinginventorystate}
      />
      <StockPairingBlacklist
        isOpen={showStockPairingBlacklist}
        toggle={handleStockPairingBlacklist}
        selectedPairings={selectedPairings}
      />
      <DeleteStockPairing
        isOpen={showDeleteStockPairing}
        toggle={handleDeleteStockPairing}
        selectedPairings={selectedPairings}
      />
      <Row>
        <Col lg="12">
          <Card>
            <CardBody>
              <TableContainerX
                columns={columns}
                data={stockpairing}
                isLoading={loading}
                isPagination={true}
                totalCount={Number(totalCount)}
                pageSize={Number(pageSize)}
                currentPage={Number(currentPage)}
                totalPage={Number(totalPage)}
                isGlobalFilter={true}
                isShowingPageLength={true}
                tableActions={tableActions}
                goToPage={goToPage}
                handleRowClick={(row) => {
                  handleSelectedPairings(row);
                }}
                // handleRowClick={(row) => {
                //   getFilteredHandleRowClicks(row);
                // }}
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

StockPairing.propTypes = {
  stockpairing: PropTypes.array,
  tableActions: PropTypes.array,
  smartcardlist: PropTypes.array,
  stblist: PropTypes.array,
  totalCount: PropTypes.string,
  totalPage: PropTypes.string,
  pageSize: PropTypes.string,
  currentPage: PropTypes.string,
  goToPage: PropTypes.func,
  loading: PropTypes.bool,
  isOpen: PropTypes.bool,
  toggle: PropTypes.func,
  stocksccastype: PropTypes.array,
  showStockPairingMarkfaulty: PropTypes.bool,
  setShowStockPairingMarkfaulty: PropTypes.func,
  showStockPairingBlacklist: PropTypes.bool,
  setShowStockPairingBlacklist: PropTypes.func,
  handleSelectedPairings: PropTypes.func,
  selectedPairings: PropTypes.array,
  pairinginventorystate: PropTypes.array,
  showDeleteStockPairing: PropTypes.bool,
  setShowDeleteStockPairing: PropTypes.func,
};

export default StockPairing;
