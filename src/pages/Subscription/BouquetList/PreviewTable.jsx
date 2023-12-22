import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import TableContainer from "../../../components/Common/TableContainer";
import { Card, CardBody, Input } from "reactstrap";
import { Link } from "react-router-dom";

const PreviewTable = (props) => {
  const TableData = [
    {
      id: 1,
      period: "1Year",
    },
    {
      id: 2,
      period: "6Months",
    },
    {
      id: 3,
      period: "3Months",
    },
    {
      id: 4,
      period: "2Months",
    },
    {
      id: 5,
      period: "1Month",
    },
    {
      id: 6,
      period: "1day",
    },
  ];
  const columns = useMemo(
    () => [
      {
        Header: "Enabled",
        disableFilters: true,
        filterable: true,
        Cell: (cellProps) => {
          return <Input type="checkbox" checked />;
        },
      },
      {
        Header: "Period",
        accessor: "period",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <>
              <p className="text-muted mb-0">{cellProps.row.original.period}</p>
            </>
          );
        },
      },
      {
        Header: "Pay Channel Rate",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <>
              <Input type="number" />
            </>
          );
        },
      },
      {
        Header: "Tax",
        // accessor: "status",
        filterable: true,
        Cell: (cellProps) => {
          return <Input type="number" />;
        },
      },
      {
        Header: "Total AMT",
        // accessor: "status",
        filterable: true,
        Cell: (cellProps) => {
          return <Input type="number" />;
        },
      },
      {
        Header: "Refundable",
        // accessor: "status",
        filterable: true,
        Cell: (cellProps) => {
          return <Input type="checkbox" checked />;
        },
      },
      {
        Header: "Action",
        Cell: (cellProps) => {
          return (
            <div className="d-flex gap-3">
              <Link to="#" className="text-success">
                <i
                  className="mdi mdi-content-copy font-size-18"
                  id="edittooltip"
                />
              </Link>
            </div>
          );
        },
      },
    ],
    []
  );

  return (
    <Card>
      <CardBody>
        {console.log("TableData: ", TableData)}
        <TableContainer
          isPagination={true}
          columns={columns}
          data={TableData}
          //   isShowTableActionButtons={true}
          isShowingPageLength={true}
          theadClass="table-light"
          tableClass="table-bordered align-middle nowrap mt-2"
          paginationDiv="col-sm-12 col-md-7"
          pagination="pagination justify-content-end pagination-rounded"
        />
      </CardBody>
    </Card>
  );
};

PreviewTable.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default PreviewTable;
