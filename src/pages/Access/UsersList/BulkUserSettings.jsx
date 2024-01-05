import React, { useEffect, useState, useRef, useMemo } from "react";
import PropTypes from "prop-types";
import TableContainer from "../../../components/Common/TableContainer";
import {
  Card,
  CardBody,
  Col,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  Input,
} from "reactstrap";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateUser as onUpdateUser } from "/src/store/users/actions";

const BulkUserSettings = (props) => {
  const { isOpen, handleUserSettings, users, userBulkSettings } = props;
  // console.log("settings in bulkuser modal:" + JSON.stringify(userBulkSettings));
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [tableList, setTableList] = useState([]);
  const [settingTable, setSettingTable] = useState([]);

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
        Header: ".",
        disableFilters: true,
        filterable: true,

        Cell: (cellProps) => (
          <input
            type="checkbox"
            disabled
            checked
            // onClick={() => handleActive(cellProps.row.original)}
          />
        ),
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
        // accessor: "name",
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
                onClick={() => {
                  const userData = cellProps.row.original;
                  toggleViewModal(userData);
                }}
              >
                <Link className="text-dark" to="#">
                  {cellProps.row.original.name}
                </Link>
              </h5>
            </>
          );
        },
      },
      {
        Header: "Login ID",
        // accessor: "login",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <>
              <h5 className="font-size-14 mb-1" style={{ maxWidth: 80 }}>
                <Link className="text-dark" to="#">
                  {cellProps.row.original.username}
                </Link>
              </h5>
            </>
          );
        },
      },
      {
        Header: "Status",
        // accessor: "status",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <>
              <h5 className="font-size-14 mb-1">
                <Link className="text-dark" to="#">
                  {cellProps.row.original.status === 1
                    ? "Active"
                    : cellProps.row.original.status === 0
                    ? "In-Active"
                    : "Blocked"}
                </Link>
              </h5>
            </>
          );
        },
      },
      {
        Header: "Type",
        // accessor: "type",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <>
              <h5 className="font-size-14 mb-1">
                <Link className="text-dark" to="#">
                  {cellProps.row.original.status === 0
                    ? "MSO"
                    : cellProps.row.original.status === 1
                    ? "RO"
                    : cellProps.row.original.status === 2
                    ? "DISTRIBUTOR"
                    : "LCO"}
                </Link>
              </h5>
            </>
          );
        },
      },
      {
        Header: "Role",
        // accessor: "role",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <>
              <h5 className="font-size-14 mb-1">
                <Link className="text-dark" to="#">
                  {cellProps.row.original.status === 1
                    ? "Administrator"
                    : cellProps.row.original.status === 2
                    ? "Staff"
                    : "User"}
                </Link>
              </h5>
            </>
          );
        },
      },
      {
        Header: "Organization",
        // accessor: "organization",
        // width: 100,
        filterable: true,
        Cell: (cellProps) => {
          return (
            <>
              <h5
                className="font-size-14 mb-1"
                style={{
                  maxWidth: 200,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                <Link className="text-dark" to="#">
                  {cellProps.row.original.operator_lbl}
                </Link>
              </h5>
            </>
          );
        },
      },
      {
        Header: "Settings",
        accessor: "settings", // Assuming this is the key in your user object containing the settings
        filterable: true,
        Cell: (cellProps) => {
          const settingsObject = cellProps.row.original.setting;
          // Assuming settingsObject is an object with properties like "Bulk Limit", "Allowed Client IPs", etc.

          return (
            <div>
              <p>Bulk Limit: {settingsObject["Bulk Limit"]}</p>
              <p>Allowed Client IPs: {settingsObject["Allowed Client IPs"]}</p>
              <p>Pay mode Allowed: {settingsObject["Pay mode Allowed"]}</p>
              {/* Add more properties as needed */}
            </div>
          );
        },
      },
    ],
    []
  );

  const selOperColumn = useMemo(
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
        // accessor: "name",
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
                onClick={() => {
                  const userData = cellProps.row.original;
                  toggleViewModal(userData);
                }}
              >
                <Link className="text-dark" to="#">
                  {cellProps.row.original.name}
                </Link>
              </h5>
            </>
          );
        },
      },
      {
        Header: "Type",
        // accessor: "login",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <>
              <h5 className="font-size-14 mb-1">
                <Link className="text-dark" to="#">
                  {cellProps.row.original.type_lbl}
                </Link>
              </h5>
            </>
          );
        },
      },
      {
        Header: "Role",
        // accessor: "status",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <>
              <h5 className="font-size-14 mb-1">
                <Link className="text-dark" to="#">
                  {cellProps.row.original.role_lbl}
                </Link>
              </h5>
            </>
          );
        },
      },
      {
        Header: "Organization",
        // accessor: "type",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <>
              <h5 className="font-size-14 mb-1">
                <Link className="text-dark" to="#">
                  {cellProps.row.original.operator_lbl}
                </Link>
              </h5>
            </>
          );
        },
      },
      {
        Header: "Settings",
        accessor: "settings",
        filterable: true,
        Cell: (cellProps) => {
          const settingsObject = cellProps.row.original.setting;

          return (
            <div>
              <p>Bulk Limit: {settingsObject["Bulk Limit"]}</p>
              <p>Allowed Client IPs: {settingsObject["Allowed Client IPs"]}</p>
              <p>Pay mode Allowed: {settingsObject["Pay mode Allowed"]}</p>
            </div>
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

  const userSettingColumn = useMemo(
    () => [
      {
        Header: "#",
        disableFilters: true,
        filterable: true,
        disableSortBy: true, // Disable sorting for this column
        Cell: (cellProps) => {
          const totalRows = settingTable.length;
          return (
            <>
              <h5 className="font-size-14 mb-1">
                <Link className="text-dark" to="#">
                  {totalRows - cellProps.row.id}
                </Link>
              </h5>
            </>
          );
        },
      },

      {
        Header: "Enabled",
        // accessor: "name",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <>
              <input type="checkbox" />
            </>
          );
        },
      },
      {
        Header: "Setting Name",
        // accessor: "login",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <>
              <h5 className="font-size-14 mb-1">
                <Link className="text-dark" to="#">
                  {cellProps.row.original.value.label}
                </Link>
              </h5>
            </>
          );
        },
      },
      {
        Header: "Description",
        // accessor: "status",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <>
              <h5 className="font-size-14 mb-1">
                <Link className="text-dark" to="#">
                  {cellProps.row.original.value.description}
                </Link>
              </h5>
            </>
          );
        },
      },
      {
        Header: "Note",
        // accessor: "type",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <>
              <h5 className="font-size-14 mb-1">
                <Link className="text-dark" to="#">
                  {cellProps.row.original.value.comment}
                </Link>
              </h5>
            </>
          );
        },
      },
      {
        Header: "SetData",
        // accessor: "type",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <>
              <Input
                type="text"
                placeholder={cellProps.row.original.placeholder}
              />
            </>
          );
        },
      },
    ],
    [settingTable]
  );

  useEffect(() => {
    if (users) {
      setTableList(users);
    }
    if (userBulkSettings) {
      const bulkArray = [
        {
          key: "bulkLimit",
          value: userBulkSettings.bulk_limit,
          placeholder: "Enter Bulk Operation Limit",
        },
        {
          key: "allowedIps",
          value: userBulkSettings.allowed_ips,
          placeholder: "Enter allowed client ips",
        },
        {
          key: "enabledPayModes",
          value: userBulkSettings.enabled_pay_modes,
          placeholder: "Select Pay Mode Allowed",
        },
      ];
      setSettingTable(bulkArray);
    }
    console.log("settingTable:" + JSON.stringify(settingTable));
  }, [userBulkSettings, users]);
  return (
    <Modal
      isOpen={isOpen}
      size="xl"
      role="dialog"
      autoFocus={true}
      centered={true}
      className="exampleModal"
      tabIndex="-1"
      toggle={handleUserSettings}
    >
      <ModalHeader toggle={handleUserSettings} tag="h4">
        Bulk User Settings
      </ModalHeader>
      <ModalBody>
        <Card>
          <CardBody>
            {/* {console.log("user in bulk:" + JSON.stringify(user))} */}
            <TableContainer
              isPagination={true}
              columns={columns}
              data={tableList}
              handleRowClick={(row) => {
                // console.log("row:" + JSON.stringify(row));
                handleActive(row);
              }}
              isGlobalFilter={true}
              isShowingPageLength={true}
              customPageSize={5}
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
              <h5 style={{}}>Selected Users</h5>
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
                  columns={selOperColumn}
                  data={selectedUsers}
                  isGlobalFilter={selectedUsers ? true : false}
                  isShowingPageLength={true}
                  customPageSize={50}
                  tableClass="table align-middle table-nowrap table-hover"
                  theadClass="table-light"
                  paginationDiv="col-sm-12 col-md-7"
                  pagination="pagination pagination-rounded justify-content-end mt-4"
                />
              </Col>
            </Row>
            <div
              style={{
                // margin: "20px 0px",
                marginTop: "-10px",
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
              <h5 style={{}}>User Settings</h5>
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
                  columns={userSettingColumn}
                  data={settingTable && settingTable}
                  isShowingPageLength={true}
                  customPageSize={5}
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
                <button type="button" className="btn btn-primary ml-2 ">
                  Save
                </button>
                <button
                  type="button"
                  className="btn btn-primary "
                  onClick={handleUserSettings}
                >
                  Cancel
                </button>
              </div>
            </div>
          </CardBody>
        </Card>
      </ModalBody>
    </Modal>
  );
};

BulkUserSettings.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default BulkUserSettings;
