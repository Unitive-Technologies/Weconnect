import React, { useMemo, useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import TableContainer from "../../../components/Common/TableContainer";
import {
  Table,
  Input,
  Card,
  CardBody,
  Col,
  Modal,
  ModalBody,
  ModalHeader,
  Form,
  Row,
} from "reactstrap";
import { Link } from "react-router-dom";
import { getOperatorForBulkAssign as onGetOperatorForBulkAssign } from "/src/store/actions";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";

const AddOperators = (props) => {
  const {
    isOpen,
    toggleClose,
    id,
    setData,
    selectedRowId,
    expiryDates,
    setExpiryDates,
    selectedUsers,
    setSelectedUsers,
  } = props;
  // const [selectedUsers, setSelectedUsers] = useState([]);
  const API_URL = "https://sms.unitch.in/api/index.php/v1";

  const [tableList, setTableList] = useState([]);
  // const [expirydate, setExpiryDate] = useState("");

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
                {cellProps.row.original.name}
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
                {cellProps.row.original.code}
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
                {cellProps.row.original.type_lbl}
              </h5>
            </>
          );
        },
      },
      {
        Header: "Regional Office",
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
                {cellProps.row.original.branch_lbl}
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
                {cellProps.row.original.distributor_lbl}
              </h5>
            </>
          );
        },
      },
    ],
    []
  );

  const userColumns = useMemo(
    () => [
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
        Header: "Expiry Date",
        // accessor: "branch_lbl",
        filterable: true,
        Cell: (cellProps) => {
          return <input type="date" />;
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

  const handleExpiryDateChange = (index, value) => {
    // Update the expiry date for the specific row
    const updatedExpiryDates = [...expiryDates];
    updatedExpiryDates[index] = value;
    setExpiryDates(updatedExpiryDates);
  };
  const handleSubmit = () => {
    console.log("add button clicked");

    // Map selectedUsers and expiryDates to create newSelectedOperators array
    const newSelectedOperators = selectedUsers.map((user, index) => ({
      id: user.id,
      name: user.name || "",
      code: user.code || "",
      type_lbl: user.type_lbl || "",
      expiryDate: expiryDates[index] || "", // Using the expiryDate for the specific row
    }));

    console.log("newSelectedOperators:", JSON.stringify(newSelectedOperators));

    // setData with newSelectedOperators
    setData(newSelectedOperators);

    // Close the modal
    toggleClose();
  };

  useEffect(() => {
    const getFilteredData = async () => {
      try {
        const token = "Bearer " + localStorage.getItem("temptoken");

        const response = await axios.get(
          `${API_URL}/operator/list?fields=id,name,code&expand=type_lbl,status_lbl,branch_lbl,distributor_lbl&notfilter[type]=0&filter[type]=3&notfilter[ncf_id]=${parseInt(
            selectedRowId
          )}&page=1&per-page=500&vr=web1.0`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        console.log(
          "tableList in useEffect: " + JSON.stringify(response.data.data)
        );
        setTableList(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getFilteredData();
  }, [selectedRowId]);
  return (
    <Modal
      isOpen={isOpen}
      size="xl"
      role="dialog"
      autoFocus={true}
      centered={true}
      className="exampleModal"
      tabIndex="-1"
      toggle={toggleClose}
    >
      <ModalHeader toggle={toggleClose} tag="h4">
        Add Operator
      </ModalHeader>
      <ModalBody>
        <Card>
          <CardBody>
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
                return false;
              }}
            >
              {/* {console.log("tableList: " + JSON.stringify(tableList))} */}
              <TableContainer
                isPagination={true}
                columns={columns}
                data={tableList}
                handleRowClick={(row) => {
                  handleActive(row);
                }}
                isGlobalFilter={true}
                isShowingPageLength={true}
                customPageSize={10}
                tableClass="table align-middle table-nowrap table-hover"
                theadClass="table-light"
                paginationDiv="col-sm-12 col-md-7"
                pagination="pagination pagination-rounded justify-content-end mt-4"
              />
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
                  <Table>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Code</th>
                        <th>Type</th>
                        <th>Expiry Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedUsers.map((row, i) => (
                        <tr key={i}>
                          <td>{i + 1}</td>
                          <td>{row && row.name}</td>
                          <td>{row && row.code}</td>
                          <td>{row && row.type_lbl}</td>
                          <td>
                            <input
                              type="date"
                              placeholder="Select Expiry Date"
                              value={expiryDates[i]}
                              onChange={(e) =>
                                handleExpiryDateChange(i, e.target.value)
                              }
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
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
                  <button type="submit" className="btn btn-primary ml-2 ">
                    Add
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary "
                    onClick={toggleClose}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </Form>
          </CardBody>
        </Card>
      </ModalBody>
    </Modal>
  );
};

AddOperators.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default AddOperators;
