import React, { useMemo } from "react";
import PropTypes from "prop-types";
import TableContainer from "../../../components/Common/TableContainer";
import { Card, CardBody, Input } from "reactstrap";
import { Link } from "react-router-dom";

const ViewMatrix = ({ complaintsubcateDesignation, escalations }) => {
  console.log("data in view" + JSON.stringify(escalations));
  console.log(
    "datadetails in view" + JSON.stringify(complaintsubcateDesignation)
  );

  const columns = useMemo(
    () => [
      {
        Header: "Enabled",
        // disableFilters: true,
        // filterable: true,
        Cell: (cellProps) => {
          const matchingEscalation = escalations.find(
            (single) => single.designation === cellProps.row.original.id
          );
          return matchingEscalation ? (
            <>
              <input
                type="checkbox"
                disabled
                checked={matchingEscalation.designation}
              />
            </>
          ) : (
            <>
              <input type="checkbox" disabled />
            </>
          );
        },
      },

      {
        Header: "Designation",
        accessor: "designation",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <>
              <h5
                style={{
                  maxWidth: 200,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
                className="font-size-14 mb-1"
              >
                <p className="text-muted mb-0">{cellProps.row.original.name}</p>
              </h5>
            </>
          );
        },
      },
      {
        Header: "TAT(HH:mm:ss)",
        filterable: true,
        Cell: (cellProps) => {
          const matchingEscalation = escalations.find(
            (single) => single.designation === cellProps.row.original.id
          );
          return matchingEscalation ? (
            <>
              <input type="text" placeholder={matchingEscalation.tat_time} />
            </>
          ) : (
            <>
              <input type="text" placeholder="" />
            </>
          );
        },
      },
    ],
    []
  );

  const complaintsubcateData = [
    {
      designation: "Director",
    },
  ];

  return (
    <Card>
      <CardBody>
        <TableContainer
          isPagination={true}
          columns={columns}
          data={complaintsubcateDesignation}
          // isGlobalFilter={true}
          // isShowingPageLength={true}
          customPageSize={50}
          tableClass="table align-middle table-nowrap table-hover"
          theadClass="table-light"
          paginationDiv="col-sm-12 col-md-7"
          pagination="pagination pagination-rounded justify-content-end mt-4"
        />
      </CardBody>
    </Card>
  );
};

ViewMatrix.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default ViewMatrix;
