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
  const [selectedUsers, setSelectedUsers] = useState([]);

  const handleActive = (row) => {
    const isRowSelected = selectedUsers.some((user) => user.id === row.id);

    setTableList((prevTableList) =>
      prevTableList.filter((user) => user.id !== row.id)
    );

    if (isRowSelected) {
      setSelectedUsers((prevSelectedUsers) =>
        prevSelectedUsers.filter((user) => user.id !== row.id)
      );
    } else {
      setSelectedUsers((prevSelectedUsers) => [...prevSelectedUsers, row]);
    }

    // Ensure that row.original exists before accessing its properties
    if (row.original) {
      row.original.isSelected = !isRowSelected;
    }
  };

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

  const handleRemove = (row) => {
    if (selectedUsers) {
      setSelectedUsers((prevSelectedUsers) =>
        prevSelectedUsers.filter((user) => user.id !== row.id)
      );
      setTableList((prevTableList) =>
        prevTableList.map((user) => {
          if (user.id === row.id && user.original) {
            user.original.isSelected = false;
          }
          return user;
        })
      );
    }
  };

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

  const userColumns = useMemo(
    () => [
      //   {
      //     Header: "*",
      //     disableFilters: true,
      //     id: "*",
      //     filterable: true,
      //     Cell: (cellProps) => {
      //       return <input type="checkbox" />;
      //     },
      //   },
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
      {
        Header: "..",
        Cell: (cellProps) => {
          return (
            <i
              className="dripicons-tag-delete"
              onClick={() => handleRemove(cellProps.row.original)}
            />
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
                handleRowClick={(row) => {
                  handleActive(row);
                }}
                isShowingPageLength={true}
                tableClass="table align-middle table-nowrap table-hover"
                theadClass="table-light"
                paginationDiv="col-sm-12 col-md-7"
                pagination="pagination pagination-rounded justify-content-end mt-4"
              />
            )}
          </CardBody>
        </Card>
        <div
          style={{
            // margin: "20px 0px",
            marginTop: "20px",
            marginBottom: "-18px",
            zIndex: 12000,
            backgroundColor: "#fff",
            width: "fit-content",
            marginLeft: "40%",
            position: "absolute",
            padding: "0px 10px",
          }}
        >
          {" "}
          <h5 style={{}}>Selected Operators</h5>
        </div>
        <Row
          style={{
            position: "relative",
            border: "1px solid #ced4da",
            padding: "20px 0px",
            margin: "30px 0px",
          }}
        >
          <Col lg={12}>
            <TableContainer
              isPagination={true}
              columns={userColumns}
              data={selectedUsers}
              //   isGlobalFilter={true}
              isShowingPageLength={true}
              customPageSize={50}
              tableClass="table align-middle table-nowrap table-hover"
              theadClass="table-light"
              paginationDiv="col-sm-12 col-md-7"
              pagination="pagination pagination-rounded justify-content-end mt-4"
            />
          </Col>
        </Row>
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
