import React, { useEffect, useState, useRef, useMemo } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import TableContainer from "../../../../components/Common/TableContainer";
import Spinners from "../../../../components/Common/Spinner";
import { Card, CardBody, Col, Container, Row } from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "/src/components/Common/Breadcrumb";

import { getRegionalOffice as onGetRegionalOffice } from "/src/store/actions";

//redux
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { ToastContainer } from "react-toastify";

const AllottedScheme = ({ allottedSchemeData }) => {
  //meta title
  document.title = "LCO | VDigital";

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
                  handleViewRegionalOffice(userData);
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
          return (
            <p className="text-muted mb-0">{cellProps.row.original.code}</p>
          );
        },
      },
      {
        Header: "Type",
        accessor: "addr",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">{cellProps.row.original.addr}</p>
          );
        },
      },
      {
        Header: "Type",
        accessor: "contact_person",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              {cellProps.row.original.contact_person}
            </p>
          );
        },
      },
      {
        Header: "Hardware Charge",
        accessor: "mobile_no",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              {cellProps.row.original.mobile_no}
            </p>
          );
        },
      },
      {
        Header: "Installation Charge",
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
        Header: "Status",
        accessor: "District_lbl",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              {cellProps.row.original.district_lbl}
            </p>
          );
        },
      },
      {
        Header: "Allotted By",
        accessor: "city_lbl",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">{cellProps.row.original.city_lbl}</p>
          );
        },
      },
    ],
    []
  );

  const getTableActions = () => {
    return [
      {
        name: "Remove",
        // action: setShowRegionalOffice,
        type: "normal",
        icon: "create",
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
                data={allottedSchemeData}
                isGlobalFilter={true}
                isAddRegionalOffice={true}
                isShowingPageLength={true}
                tableActions={getTableActions()}
                isShowTableActionButtons={true}
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

export default AllottedScheme;
