import React, { useMemo, useState, useEffect } from "react";
import PropTypes from "prop-types";
import TableContainer from "../../../components/Common/TableContainer";
import { Card, CardBody, Modal } from "reactstrap";
import { Link } from "react-router-dom";
import { getOperatorForBulkAssign as onGetOperatorForBulkAssign } from "/src/store/actions";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";

const AddOperators = (props) => {
  const { isOpen, toggle } = props;

  const dispatch = useDispatch();

  const selectOperatorState = (state) => state.operatorforassign;
  const OperatorProperties = createSelector(
    selectOperatorState,
    (operatorforassign) => ({
      operatorforbulkassign: operatorforassign.operatorforassign,
      loading: operatorforassign.loading,
    })
  );

  const { operatorforbulkassign, loading } = useSelector(OperatorProperties);

  useEffect(() => {
    // if (operatorforbulkassign && !operatorforbulkassign.length) {
    dispatch(onGetOperatorForBulkAssign());
    // }
  }, [dispatch, operatorforbulkassign]);

  const columns = useMemo(
    () => [
      {
        Header: "*",
        disableFilters: true,
        id: "*",
        filterable: true,
        Cell: (cellProps) => {
          return <input type="checkbox" />;
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
                  {"Type"}
                </Link>
              </h5>
            </>
          );
        },
      },
      {
        Header: "Reginal Officer",
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
                  {"Reginal Officer"}
                </Link>
              </h5>
            </>
          );
        },
      },
      {
        Header: "Distributor",
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
                  {"distributor"}
                </Link>
              </h5>
            </>
          );
        },
      },
    ],
    []
  );

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <Card toggle={toggle}>
        <CardBody>
          {console.log("Operators for Bulk Asign: ", operatorforbulkassign)}
          <TableContainer
            isPagination={true}
            columns={columns}
            data={operatorforbulkassign}
            isShowingPageLength={true}
            tableClass="table align-middle table-nowrap table-hover"
            theadClass="table-light"
            paginationDiv="col-sm-12 col-md-7"
            pagination="pagination pagination-rounded justify-content-end mt-4"
          />
        </CardBody>
      </Card>
    </Modal>
  );
};

AddOperators.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default AddOperators;
