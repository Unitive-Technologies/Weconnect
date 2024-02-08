import React, { useEffect, useState, useRef, useMemo } from "react";
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

const SmsLogs = (props) => {
  const { smsLogs } = props;
  //meta title
  document.title = "Regional Offices | VDigital";
  console.log("smsLogs:" + JSON.stringify(smsLogs));

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
        Header: "Mobile No.",
        // accessor: "name",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <>
              <p className="text-muted mb-0">
                {cellProps.row.original.mobileno}
              </p>
            </>
          );
        },
      },
      {
        Header: "Message",
        // accessor: "code",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p
              style={{
                maxWidth: 200,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
              className="text-muted mb-0"
            >
              {cellProps.row.original.message}
            </p>
          );
        },
      },
      {
        Header: "Response",
        // accessor: "commision",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">{cellProps.row.original.response}</p>
          );
        },
      },
      {
        Header: "Type",
        // accessor: "boxtype_lbl",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">{cellProps.row.original.type}</p>
          );
        },
      },
      {
        Header: "Created On",
        // accessor: "type_lbl",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              {cellProps.row.original.created_on_lbl}
            </p>
          );
        },
      },
      {
        Header: "Created By",
        // accessor: "status_lbl",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              {cellProps.row.original.created_by_lbl}
            </p>
          );
        },
      },
      {
        Header: "LCO",
        // accessor: "is_refundable",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              {cellProps.row.original.operator_lbl}
            </p>
          );
        },
      },
      {
        Header: "LCO Code",
        // accessor: "created_by_lbl",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              {cellProps.row.original.operator_code_lbl}
            </p>
          );
        },
      },
      {
        Header: "Distributor",
        // accessor: "created_by_lbl",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              {/* {cellProps.row.original.created_by_lbl} */}
            </p>
          );
        },
      },
      {
        Header: "Distributor Code",
        // accessor: "created_by_lbl",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              {/* {cellProps.row.original.created_by_lbl} */}
            </p>
          );
        },
      },
      {
        Header: "Regional Office",
        // accessor: "created_by_lbl",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              {/* {cellProps.row.original.created_by_lbl} */}
            </p>
          );
        },
      },
      {
        Header: "Regional Office Code",
        // accessor: "created_by_lbl",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              {/* {cellProps.row.original.created_by_lbl} */}
            </p>
          );
        },
      },
    ],
    []
  );

  return (
    <React.Fragment>
      <Row>
        <Col lg="12">
          <Card>
            <CardBody>
              <TableContainer
                isPagination={true}
                columns={columns}
                data={smsLogs}
                // isGlobalFilter={true}
                isShowingPageLength={true}
                // tableActions={getTableActions()}
                // isShowTableActionButtons={true}
                customPageSize={5}
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

export default SmsLogs;
