import React, { useMemo, useState, useEffect } from "react";
import PropTypes from "prop-types";
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
import { Link } from "react-router-dom";
import { getOperatorForBouquet as onGetOperatorForBouquet } from "/src/store/actions";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";

const AddOperators = (props) => {
  const { isOpen, toggle, id } = props;
  // console.log("Selected row id: ", id);

  const dispatch = useDispatch();

  const selectOperatorState = (state) => state.operatorforbouquet;
  const OperatorProperties = createSelector(
    selectOperatorState,
    (operatorforbouquet) => ({
      operatorforbulkbouquet: operatorforbouquet.operatorforbouquet,
      loading: operatorforbouquet.loading,
    })
  );

  const { operatorforbulkbouquet, loading } = useSelector(OperatorProperties);

  useEffect(() => {
    if (operatorforbulkbouquet && !operatorforbulkbouquet.length) {
      dispatch(onGetOperatorForBouquet(id));
    }
  }, [dispatch, operatorforbulkbouquet, id]);

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
        accessor: "name",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">{cellProps.row.original.name}</p>
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
        accessor: "type_lbl",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">{cellProps.row.original.type_lbl}</p>
          );
        },
      },
      {
        Header: "Reginal Officer",
        accessor: "branch_lbl",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              {cellProps.row.original.branch_lbl}
            </p>
          );
        },
      },
      {
        Header: "Distributor",
        accessor: "distributor_lbl",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              {cellProps.row.original.distributor_lbl}
            </p>
          );
        },
      },
    ],
    []
  );

  return (
    <Modal
      isOpen={isOpen}
      role="dialog"
      autoFocus={true}
      centered={true}
      className="exampleModal"
      tabIndex="-1"
      toggle={toggle}
      size="xl"
    >
      <ModalHeader toggle={toggle}>Add Operator</ModalHeader>
      <ModalBody>
        <Card>
          <CardBody>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <TableContainer
                isPagination={true}
                columns={columns}
                data={operatorforbulkbouquet}
                isGlobalFilter={true}
                isShowingPageLength={true}
                tableClass="table align-middle table-nowrap table-hover"
                theadClass="table-light"
                paginationDiv="col-sm-12 col-md-7"
                pagination="pagination pagination-rounded justify-content-end mt-4"
              />
            )}
          </CardBody>
        </Card>
        <div className="text-center mt-4 ">
          <div
            style={{
              display: "flex",
              gap: 5,
              textAlign: "center",
              justifyContent: "center",
            }}
          >
            <button type="submit" className="btn btn-success ml-2 ">
              Add
            </button>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};

AddOperators.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default AddOperators;
