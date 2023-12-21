import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import withRouter from "../../../components/Common/withRouter";
import TableContainer from "../../../components/Common/TableContainer";
import {
  Card,
  CardBody,
  Col,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from "reactstrap";

const SelectedBouquets = () => {
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
              <h5 className="font-size-14 mb-1">
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
        Header: "Settings",
        accessor: "setting",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">{cellProps.row.original.setting}</p>
          );
        },
      },
      {
        Header: "$",
        // accessor: "is_exclusive_lbl",
        filterable: true,
        Cell: (cellProps) => {
          return <i className="mdi mdi-delete"></i>;
        },
      },
    ],
    []
  );

  // {
  //   name: "check",
  //   hex: "F012C",
  //   version: "1.5.54"
  // mdi-check   mdi-delete
  // },

  const selectedBouquet = [];

  return (
    <Card>
      <CardBody>
        <TableContainer
          isPagination={true}
          columns={columns}
          data={selectedBouquet}
          // isGlobalFilter={true}
          isShowingPageLength={true}
          // customPageSize={50}
          tableClass="table align-middle table-nowrap table-hover"
          theadClass="table-light"
          paginationDiv="col-sm-12 col-md-7"
          pagination="pagination pagination-rounded justify-content-end mt-4"
        />
      </CardBody>
    </Card>
  );
};

export default withRouter(SelectedBouquets);
