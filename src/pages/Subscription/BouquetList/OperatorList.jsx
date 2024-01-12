import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import TableContainer from "../../../components/Common/TableContainer";
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";

const OperatorList = (props) => {
  const { id } = props;
  const [showAddOperator, setShowAddOperator] = useState(false);
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
                <Link className="text-dark" to="#">
                  {"Name"}
                </Link>
              </h5>
            </>
          );
        },
      },
      {
        Header: "Code",
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
                <Link className="text-dark" to="#">
                  {"Code"}
                </Link>
              </h5>
            </>
          );
        },
      },
      {
        Header: "Type",
        // accessor: "status",
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
                <Link className="text-dark" to="#">
                  {"LCO Discount"}
                </Link>
              </h5>
            </>
          );
        },
      },
    ],
    []
  );

  const getTableActions = () => {
    return [
      {
        name: "Add Operator",
        action: setShowAddOperator,
        type: "normal",
      },
    ];
  };

  const OperatorListData = [];
  return (
    <Card>
      <CardBody>
        <TableContainer
          isPagination={true}
          columns={columns}
          data={OperatorListData}
          isShowTableActionButtons={true}
          isShowingPageLength={true}
          tableActions={getTableActions()}
          handleUserClick={() => setShowAddOperator(true)}
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

OperatorList.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default OperatorList;
