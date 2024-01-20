import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, Col, Row } from "reactstrap";
import TableContainer from "../../components/Common/TableContainer";
import TableContainerX from "../../components/Common/TableContainerX";

const StockPairing = (props) => {
  const {
    stockpairing,
    totalCount,
    totalPage,
    pageSize,
    currentPage,
    goToPage,
    loading,
  } = props;

  const columns = useMemo(
    () => [
      {
        Header: "#",
        disableFilters: true,
        filterable: true,
        Cell: (cellProps) => {
          const startIndex = (currentPage - 1) * pageSize;
          debugger;
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

  const getTableActions = () => {
    return [
      {
        name: "Create",
        // action: setShowAddCity,
        type: "normal",
        icon: "create",
      },
      {
        name: "Upload",
        // action: setShowAddCity,
        type: "dropdown",
        // icon: "create",
        dropdownName: "Bulk",
      },
      {
        name: "Update",
        // action: setShowAddCity,
        type: "dropdown",
        // icon: "create",
        dropdownName: "Bulk",
      },
      {
        name: "Mark Faulty",
        // action: setShowAddCity,
        type: "dot",
        icon: "action",
        dropdownName: "",
      },
      {
        name: "Blacklist",
        // action: setShowAddCity,
        type: "dot",
        icon: "action",
        dropdownName: "",
      },
      {
        name: "update Brand/Warehouse/Inventory state",
        // action: setShowAddCity,
        type: "dot",
        icon: "action",
        dropdownName: "",
      },
    ];
  };

  return (
    <React.Fragment>
      <Row>
        <Col lg="12">
          <Card>
            <CardBody>
              {/* <TableContainer
                isPagination={true}
                columns={columns}
                data={stockpairing}
                isGlobalFilter={true}
                isAddRegionalOffice={true}
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
                data={stockpairing}
                isLoading={loading}
                isPagination={true}
                totalCount={totalCount}
                pageSize={pageSize}
                currentPage={currentPage}
                totalPage={totalPage}
                isGlobalFilter={true}
                isShowingPageLength={true}
                tableActions={getTableActions()}
                goToPage={goToPage}
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default StockPairing;
