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
    data,
    setData,
    selectedRows,
    selectedUsers,
    setSelectedUsers,
  } = props;
  //   const [selectedUsers, setSelectedUsers] = useState([]);
  const API_URL = "https://sms.unitch.in/api/index.php/v1";
  console.log("data in addoperators:" + JSON.stringify(data));
  const [tableList, setTableList] = useState([]);

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

  const handleSubmit = () => {
    console.log("add button clicked");
    const newSelectedOperators = selectedUsers.map((user) => user.id);
    console.log("newTargetUsers:", JSON.stringify(newSelectedOperators));
    setData(selectedUsers);
    toggleClose();
  };

  useEffect(() => {
    const getFilteredData = async () => {
      try {
        const token = "Bearer " + localStorage.getItem("temptoken");
        const schemeIds = selectedRows.map((row) => row.id).join(",");
        const response = await axios.get(
          `${API_URL}/operator/list?fields=id,name,code&expand=type_lbl,status_lbl,branch_lbl,distributor_lbl&notfilter[type]=0&notfilter[scheme_id]=${schemeIds}&page=1&per-page=500&vr=web1.0`,
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
  }, [selectedRows]);

  const deleteSelectedUser = (index) => {
    const list = [...selectedUsers];
    list.splice(index, 1);
    setSelectedUsers(list);
  };

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
                      </tr>
                    </thead>
                    <tbody>
                      {console.log(
                        "...................selectedUsers:" +
                          JSON.stringify(selectedUsers)
                      )}
                      {selectedUsers &&
                        selectedUsers.map((row, i) => (
                          <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{row && row.name}</td>
                            <td>{row && row.code}</td>
                            <td>{row && row.type_lbl}</td>
                            <td>
                              <h5>
                                <Link
                                  className="text-dark"
                                  to="#"
                                  onClick={() => deleteSelectedUser(index)}
                                >
                                  <i
                                    className="mdi mdi-delete font-size-18"
                                    id="deletetooltip"
                                  />
                                </Link>
                              </h5>
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
