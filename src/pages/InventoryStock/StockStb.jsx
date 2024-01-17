import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, Col, Row } from "reactstrap";
import TableContainer from "../../components/Common/TableContainer";

const StockStb = (props) => {
  const { stockstb } = props;

  const columns = useMemo(
    () => [
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
              <h5 className="font-size-14 mb-1">
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
              <TableContainer
                isPagination={true}
                columns={columns}
                data={stockstb}
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
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default StockStb;
