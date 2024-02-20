import React, { useMemo, useState, useEffect } from "react";
import PropTypes from "prop-types";
import TableContainer from "../../../components/Common/TableContainer";
import axios from "axios";
import {
  Card,
  CardBody,
  Col,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  Table,
  Input,
  Form,
} from "reactstrap";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { getDistributors as onGetDistributors } from "../../../store/distributor/actions";

const SettingModal = (props) => {
  const {
    isOpen,
    toggleShowSetting,
    distributorsSettings,
    distributorsOperator,
  } = props;

  console.log(
    "distributorsSettings in settings modal:" +
      JSON.stringify(distributorsSettings)
  );
  console.log(
    "distributorsOperator in settings modal:" +
      JSON.stringify(distributorsOperator)
  );
  const API_URL = "https://sms.unitch.in/api/index.php/v1";
  const [selectedOperators, setSelectedOperators] = useState([]);
  const [tableList, setTableList] = useState([]);
  const [settingTable, setSettingTable] = useState([]);
  const dispatch = useDispatch();
  const [checkedRows, setCheckedRows] = useState({});
  const [settings, setSettings] = useState({
    area_id: "",
    stop_cheque_payment: "",
    min_recharge_amt: "",
    collection_enabled: "",
    customer_portal_config: "",
    billed_by: "",
    enable_customer_billing: "",
    credit_limit: "",
    customer_billed_by: "",
  });
  console.log("settings:" + JSON.stringify(settings));
  const handleChangeSettingValue = (e) => {
    // debugger;
    console.log("handleChangeSettingValue called");
    const { name, value } = e.target;
    console.log(`Setting ${name} to ${value}`);
    setSettings((prevSettings) => ({
      ...prevSettings,
      [name]: value,
    }));
  };

  const handleActive = (row) => {
    const isRowSelected = selectedOperators.some(
      (opertor) => opertor.id === row.id
    );
    setTableList((prevTableList) =>
      prevTableList.filter((operator) => operator.id !== row.id)
    );
    console.log("isRowSelected::::::" + isRowSelected);
    if (isRowSelected) {
      setSelectedOperators((prevSelectedOperators) =>
        prevSelectedOperators.filter((operator) => operator.id !== row.id)
      );
    } else {
      setSelectedOperators((prevSelectedOperators) => [
        ...prevSelectedOperators,
        row,
      ]);
    }
    // Ensure that row.original exists before accessing its properties
    if (row.original) {
      row.original.isSelected = !isRowSelected;
    }
  };

  const handleRemove = (row) => {
    if (selectedOperators) {
      setSelectedOperators((prevSelectedDistributors) =>
        prevSelectedDistributors.filter((operator) => operator.id !== row.id)
      );
      setTableList((prevTableList) =>
        prevTableList.map((operator) => {
          if (operator.id === row.id && operator.original) {
            operator.original.isSelected = false;
          }
          return operator;
        })
      );
    }
  };
  const columns = useMemo(
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
                // onClick={() => {
                //   const userData = cellProps.row.original;
                //   toggleViewModal(userData);
                // }}
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
        Header: "Code",
        // accessor: "login",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <>
              <h5 className="font-size-14 mb-1">
                <Link className="text-dark" to="#">
                  {cellProps.row.original.code}
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
        Header: "LoginId",
        // accessor: "type",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <>
              <h5 className="font-size-14 mb-1">
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
        // accessor: "role",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <>
              <h5 className="font-size-14 mb-1">
                <Link className="text-dark" to="#">
                  {cellProps.row.original.status_lbl}
                </Link>
              </h5>
            </>
          );
        },
      },
      {
        Header: "Settings",
        // accessor: "role",
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
                {/* <Link className="text-dark" to="#"> */}
                CUSTOMER BILLED BY: AREA ID: ENABLE CUSTOMER COLLECTION:
                CUSTOMER PORTAL CONFIG: BILLED BY: MINIMUM ONLINE TOPUP AMOUNT:
                {/* {cellProps.row.original.setting.Customer Billed By} */}
                {/* </Link> */}
              </h5>
            </>
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
        Header: "Code",
        // accessor: "login",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <>
              <h5 className="font-size-14 mb-1">
                <Link className="text-dark" to="#">
                  {cellProps.row.original.code}
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
        Header: "Settings",
        // accessor: "type",
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
                {/* <Link className="text-dark" to="#"> */}
                CUSTOMER BILLED BY: AREA ID: ENABLE CUSTOMER COLLECTION:
                CUSTOMER PORTAL CONFIG: BILLED BY: MINIMUM ONLINE TOPUP AMOUNT:
                {/* </Link> */}
              </h5>
            </>
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

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      settings: settings,
    },
    validationSchema: Yup.object({}),

    onSubmit: async (values) => {
      try {
        console.log(
          "selectedOperators in onsubmit:" + JSON.stringify(selectedOperators)
        );

        // Filter out the empty settings
        const nonEmptySettings = Object.entries(values.settings).reduce(
          (acc, [key, value]) => {
            if (value !== "") {
              acc[key] = value;
            }
            return acc;
          },
          {}
        );

        const newSetting = {
          ids: selectedOperators.map((operator) => operator.id),
          setting: nonEmptySettings,
        };

        console.log("newSetting:", JSON.stringify(newSetting));
        const token = "Bearer " + localStorage.getItem("temptoken");

        const response = await axios.put(
          `${API_URL}/operator/setting?vr=web1.0`,
          newSetting,
          {
            headers: {
              Authorization: token,
            },
          }
        );

        console.log("Axios Response:", response);
        toggleShowSetting();
        dispatch(onGetDistributors());
        validation.resetForm();
      } catch (error) {
        console.error("Error in onSubmit:", error);
      }
    },

    onReset: () => {
      validation.setValues(validation.initialValues);
    },
  });

  useEffect(() => {
    if (distributorsOperator) {
      setTableList(distributorsOperator);
    }
    if (distributorsSettings) {
      const bulkArray = [
        {
          key: "area_id",
          value: distributorsSettings.area_id,
          placeholder: "Enter Area ID",
        },
        {
          key: "stop_cheque_payment",
          value: distributorsSettings.stop_cheque_payment,
          placeholder: "Select Stop Cheque Payment",
        },
        {
          key: "min_recharge_amt",
          value: distributorsSettings.min_recharge_amt,
          placeholder: "Enter Minimum Online Topup Amount",
        },
        {
          key: "collection_enabled",
          value: distributorsSettings.collection_enabled,
          placeholder: "Select enable Customer Collection",
        },
        {
          key: "customer_portal_config",
          value: distributorsSettings.customer_portal_config,
          placeholder: "Select Customer Portal Config",
        },
        {
          key: "billed_by",
          value: distributorsSettings.billed_by,
          placeholder: "Select Billed By",
        },
        {
          key: "enable_customer_billing",
          value: distributorsSettings.enable_customer_billing,
          placeholder: "Select enable Customer Billing",
        },
        {
          key: "credit_limit",
          value: distributorsSettings.credit_limit,
          placeholder: "Enter Credit Limit",
        },
        {
          key: "customer_billed_by",
          value: distributorsSettings.customer_billed_by,
          placeholder: "Select Customer Billed By",
        },
      ];
      setSettingTable(bulkArray);
    }
  }, [distributorsSettings, distributorsOperator]);
  return (
    <Modal
      // onClick={() => console.log("modal clicked")}
      isOpen={isOpen}
      size="xl"
      role="dialog"
      autoFocus={true}
      centered={true}
      // trapFocus={true}
      className="exampleModal"
      // tabIndex="-1"
      toggle={toggleShowSetting}
    >
      <ModalHeader toggle={toggleShowSetting} tag="h4">
        Bulk Operator Settings
      </ModalHeader>
      <ModalBody>
        <Card>
          <CardBody>
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                validation.handleSubmit();
                return false;
              }}
            >
              <TableContainer
                isPagination={true}
                columns={columns}
                data={tableList}
                //   isGlobalFilter={true}
                handleRowClick={(row) => {
                  handleActive(row);
                }}
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
                {console.log(
                  "selectedOperators after select from 1st table: " +
                    JSON.stringify(selectedOperators)
                )}
                <Col lg={12}>
                  <TableContainer
                    isPagination={true}
                    columns={selOperColumn}
                    data={selectedOperators}
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
                <h5 style={{}}>Operator Settings</h5>
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
                        {/* <th>Enabled</th> */}
                        <th>Setting Name</th>
                        <th>Description</th>
                        <th>Note</th>
                        <th>Set Data</th>
                      </tr>
                    </thead>
                    <tbody>
                      {console.log(
                        "...................settingTable:" +
                          JSON.stringify(settingTable)
                      )}
                      {settingTable &&
                        settingTable.map((row, i) => (
                          <tr key={i}>
                            <td>{i + 1}</td>
                            {/* <td>
                              <input
                                type="checkbox"
                                onClick={handleSelectRow(row)}
                                onChange={() => {

                                  console.log("Clicked the checkbox");
                                  handleCheckboxChange(row.id);
                                }}
                                checked={isRowChecked(row.id)}
                              />
                            </td> */}
                            <td>{row.value && row.value.label}</td>
                            <td>{row.value && row.value.description}</td>
                            <td>{row.value && row.value.comment}</td>
                            <td>
                              {row.key === "area_id" ? (
                                <Input
                                  type="text"
                                  name="area_id"
                                  placeholder={row.placeholder}
                                  onChange={handleChangeSettingValue}
                                  value={validation.values.settings.area_id}
                                />
                              ) : row.key === "stop_cheque_payment" ? (
                                <Input
                                  name="stop_cheque_payment"
                                  type="select"
                                  placeholder={row.placeholder}
                                  className="form-select"
                                  onChange={handleChangeSettingValue}
                                  value={
                                    validation.values.settings
                                      .stop_cheque_payment
                                  }
                                >
                                  <option value="">
                                    Select Stop Cheque Payment
                                  </option>
                                  {row.value.data.map((paymode) => (
                                    <option key={paymode.id} value={paymode.id}>
                                      {paymode.name}
                                    </option>
                                  ))}
                                </Input>
                              ) : row.key === "min_recharge_amt" ? (
                                <Input
                                  type="text"
                                  name="min_recharge_amt"
                                  placeholder={row.placeholder}
                                  onChange={handleChangeSettingValue}
                                  value={
                                    validation.values.settings.min_recharge_amt
                                  }
                                />
                              ) : row.key === "collection_enabled" ? (
                                <Input
                                  name="collection_enabled"
                                  type="select"
                                  placeholder={row.placeholder}
                                  className="form-select"
                                  onChange={handleChangeSettingValue}
                                  value={
                                    validation.values.settings
                                      .collection_enabled
                                  }
                                >
                                  <option value="">
                                    Select Enable Customer Collection
                                  </option>
                                  {row.value.data.map((paymode) => (
                                    <option key={paymode.id} value={paymode.id}>
                                      {paymode.name}
                                    </option>
                                  ))}
                                </Input>
                              ) : row.key === "customer_portal_config" ? (
                                <Input
                                  name="customer_portal_config"
                                  type="select"
                                  placeholder={row.placeholder}
                                  className="form-select"
                                  onChange={handleChangeSettingValue}
                                  value={
                                    validation.values.settings
                                      .customer_portal_config
                                  }
                                >
                                  <option value="">
                                    Select Customer Portal Config
                                  </option>
                                  {row.value.data.map((paymode) => (
                                    <option key={paymode.id} value={paymode.id}>
                                      {paymode.name}
                                    </option>
                                  ))}
                                </Input>
                              ) : row.key === "billed_by" ? (
                                <Input
                                  name="billed_by"
                                  type="select"
                                  placeholder={row.placeholder}
                                  className="form-select"
                                  onChange={handleChangeSettingValue}
                                  value={validation.values.settings.billed_by}
                                >
                                  <option value="">Select Billed By</option>
                                  {row.value.data.map((paymode) => (
                                    <option key={paymode.id} value={paymode.id}>
                                      {paymode.name}
                                    </option>
                                  ))}
                                </Input>
                              ) : row.key === "enable_customer_billing" ? (
                                <Input
                                  name="enable_customer_billing"
                                  type="select"
                                  placeholder={row.placeholder}
                                  className="form-select"
                                  onChange={handleChangeSettingValue}
                                  value={
                                    validation.values.settings
                                      .enable_customer_billing
                                  }
                                >
                                  <option value="">
                                    Select Enable Customer Billing
                                  </option>
                                  {row.value.data.map((paymode) => (
                                    <option key={paymode.id} value={paymode.id}>
                                      {paymode.name}
                                    </option>
                                  ))}
                                </Input>
                              ) : row.key === "credit_limit" ? (
                                <Input
                                  type="text"
                                  name="credit_limit"
                                  placeholder={row.placeholder}
                                  onChange={handleChangeSettingValue}
                                  value={
                                    validation.values.settings.credit_limit
                                  }
                                />
                              ) : (
                                // row.key === "enable_customer_billing" ? (
                                <Input
                                  name="customer_billed_by"
                                  type="select"
                                  placeholder={row.placeholder}
                                  className="form-select"
                                  onChange={handleChangeSettingValue}
                                  value={
                                    validation.values.settings
                                      .customer_billed_by
                                  }
                                >
                                  <option value="">
                                    Select Customer Billed By
                                  </option>
                                  {row.value.data.map((paymode) => (
                                    <option key={paymode.id} value={paymode.id}>
                                      {paymode.name}
                                    </option>
                                  ))}
                                </Input>
                              )}
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
                  <button type="submit" className="btn btn-success save-user">
                    Save
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary "
                    onClick={toggleShowSetting}
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

SettingModal.propTypes = {
  toggleShowSetting: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default SettingModal;
