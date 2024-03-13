import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import withRouter from "../../../components/Common/withRouter";
import TableContainer from "../../../components/Common/TableContainer";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  Card,
  CardBody,
  Col,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  Table,
  Input,
  Form,
} from "reactstrap";
import { getBouquet as onGetBouquet } from "/src/store/actions";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { ToastContainer } from "react-toastify";
import SelectedBouquets from "./SelectedBouquets";
import SettingTable from "./SettingTable";
import { faHandsAmericanSignLanguageInterpreting } from "@fortawesome/free-solid-svg-icons";

const BulkSettings = (props) => {
  const { isOpen, toggle, bouquets } = props;
  //meta title
  document.title = "Bouquets | VDigital";
  const API_URL = "https://sms.unitch.in/api/index.php/v1";
  const [settingTableList, setSettingTableList] = useState({});
  const [tableList, setTableList] = useState([]);
  const [selectedBouquets, setSelectedBouquets] = useState([]);
  const [settingTable, setSettingTable] = useState([]);
  const [setting, setSetting] = useState({
    family_id: "",
    is_exclusive: "",
    is_promotional: "",
    is_online_app: "",
  });

  const handleChangeSettingValue = (event) => {
    const { name, value } = event.target;
    setSetting({ ...setting, [name]: value });
  };

  const handleActive = (row) => {
    const isRowSelected = selectedBouquets.some((user) => user.id === row.id);
    setTableList((prevTableList) =>
      prevTableList.filter((user) => user.id !== row.id)
    );
    if (isRowSelected) {
      setSelectedBouquets((prevSelectedUsers) =>
        prevSelectedUsers.filter((user) => user.id !== row.id)
      );
    } else {
      setSelectedBouquets((prevSelectedUsers) => [...prevSelectedUsers, row]);
    }
    // Ensure that row.original exists before accessing its properties
    if (row.original) {
      row.original.isSelected = !isRowSelected;
    }
  };

  const columns = useMemo(
    () => [
      // {
      //   Header: "*",
      //   disableFilters: true,
      //   filterable: true,
      //   Cell: (cellProps) => (
      //     <input
      //       type="checkbox"
      //       onChange={() => handleCheckboxClick(cellProps.row.original)}
      //     />
      //   ),
      // },
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
            <>
              <h5 className="font-size-14 mb-1">
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
        accessor: "bouquettype",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">{cellProps.row.original.type_lbl}</p>
          );
        },
      },
      {
        Header: "Status",
        accessor: "status",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              {cellProps.row.original.status_lbl}
            </p>
          );
        },
      },
      {
        Header: "Settings",
        filterable: true,
        Cell: (cellProps) => {
          const settingData = cellProps.row.original.setting;
          const settingString = Object.keys(settingData)
            .map((key) => `${key}: ${settingData[key]}`)
            .join(" ");

          return (
            <p
              className="text-muted mb-0"
              style={{
                maxWidth: 200,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {settingString}
            </p>
          );
        },
      },
    ],
    []
  );

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      setting: setting,
    },
    validationSchema: Yup.object({
      // setting: Yup.object({
      //   bulk_limit: Yup.string().required("Please Enter Bulk Limit"),
      //   allowed_ips: Yup.string().required("Please Enter allowed client ips"),
      //   enabled_pay_modes: Yup.array()
      //     .of(Yup.number().required("Please Select Pay Modes"))
      //     .min(1, "Please Select at least one Pay Mode"),
      // }),
    }),

    onSubmit: async (values) => {
      try {
        const nonEmptySettings = Object.entries(values.setting).reduce(
          (acc, [key, value]) => {
            if (value !== "") {
              acc[key] = value;
            }
            return acc;
          },
          {}
        );

        const newSetting = {
          ids: selectedBouquets.map((bouquet) => bouquet.id),
          setting: nonEmptySettings,
        };

        console.log("newSetting:", JSON.stringify(newSetting));
        const token = "Bearer " + localStorage.getItem("temptoken");

        const response = await axios.put(
          `${API_URL}/bouque/setting?vr=web1.0`,
          newSetting,
          {
            headers: {
              Authorization: token,
            },
          }
        );

        console.log("Axios Response:", response);
        toggle();
        dispatch(onGetBouquet());

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
    const getSettingData = async () => {
      try {
        const token = "Bearer " + localStorage.getItem("temptoken");
        const response = await axios.get(
          `${API_URL}/bouque/setting?fields=id,name&vr=web1.0`,

          {
            headers: {
              Authorization: token,
            },
          }
        );
        console.log(
          "tableList in useEffect: " + JSON.stringify(response.data.data)
        );
        setSettingTableList(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getSettingData();
  }, []);

  useEffect(() => {
    if (bouquets) {
      setTableList(bouquets);
    }
    if (settingTableList) {
      const bulkArray = [
        {
          key: "family_id",
          value: settingTableList.family_id,
          placeholder: "Enter Family ID",
        },
        {
          key: "is_exclusive",
          value: settingTableList.is_exclusive,
          placeholder: "Select Is Exclusive",
        },
        {
          key: "is_promotional",
          value: settingTableList.is_promotional,
          placeholder: "Select Is Promotional",
        },
        {
          key: "is_online_app",
          value: settingTableList.is_online_app,
          placeholder: "Select Is Online App",
        },
      ];
      setSettingTable(bulkArray);
    }
    console.log("settingTable:" + JSON.stringify(settingTable));
  }, [settingTableList, bouquets]);
  return (
    <React.Fragment>
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
        <ModalHeader toggle={toggle} tag="h4">
          Bulk Bouquet Settings
        </ModalHeader>
        <ModalBody>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              validation.handleSubmit();
              return false;
            }}
          >
            <Row>
              <Col lg="12">
                <Card>
                  <CardBody>
                    {console.log(
                      "tableList in bulksettings:" + JSON.stringify(tableList)
                    )}

                    <TableContainer
                      isPagination={true}
                      columns={columns}
                      data={tableList}
                      isGlobalFilter={true}
                      isShowingPageLength={true}
                      handleRowClick={(row) => handleActive(row)}
                      customPageSize={8}
                      tableClass="table align-middle table-nowrap table-hover"
                      theadClass="table-light"
                      paginationDiv="col-sm-12 col-md-7"
                      pagination="pagination pagination-rounded justify-content-end mt-4"
                    />
                  </CardBody>
                </Card>
              </Col>
            </Row>
            <div
              style={{
                marginTop: "20px",
                marginBottom: "18px",
                zIndex: 12000,
                backgroundColor: "#fff",
                width: "fit-content",
                marginLeft: "40%",
                position: "absolute",
                padding: "0px 10px",
              }}
            >
              <p style={{ fontWeight: "bold" }}>Selected Bouquets</p>
            </div>
            <Row
              style={{
                position: "relative",
                border: "1px solid #ced4da",
                padding: "20px 0px",
                margin: "30px 0px",
              }}
            >
              <Table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Code</th>
                    <th>Type</th>
                    <th>Settings</th>
                  </tr>
                </thead>
                <tbody>
                  {console.log(
                    "selectedBouquets : " + JSON.stringify(selectedBouquets)
                  )}
                  {selectedBouquets &&
                    selectedBouquets.map((row, i) => (
                      <tr key={i}>
                        <td>{i + 1}</td>
                        <td>{row && row.name}</td>
                        <td>{row && row.code}</td>
                        <td>{row && row.type_lbl}</td>
                        <td>
                          {row && (
                            <p
                              className="text-muted mb-0"
                              style={{
                                maxWidth: 200,
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {Object.keys(row.setting)
                                .map((key) => `${key}: ${row.setting[key]}`)
                                .join(" ")}
                            </p>
                          )}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </Row>
            <div
              style={{
                marginTop: "-10px",
                marginBottom: "18px",
                zIndex: 12000,
                backgroundColor: "#fff",
                width: "fit-content",
                marginLeft: "40%",
                position: "absolute",
                padding: "0px 10px",
              }}
            >
              <p style={{ fontWeight: "bold" }}>Bouquet settings</p>
            </div>
            <Row
              style={{
                position: "relative",
                border: "1px solid #ced4da",
                padding: "20px 0px",
                margin: "30px 0px",
              }}
            >
              {/* <SettingTable settingTableList={settingTableList} /> */}
              <Table>
                <thead>
                  <tr>
                    <th>#</th>
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
                              onChange={() => {
                                debugger;
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
                          {row.key === "family_id" ? (
                            <Input
                              type="text"
                              name="family_id"
                              placeholder={row.placeholder}
                              onChange={handleChangeSettingValue}
                              value={setting.family_id}
                            />
                          ) : row.key === "is_exclusive" ? (
                            <Input
                              name="is_exclusive"
                              type="select"
                              placeholder={row.placeholder}
                              className="form-select"
                              onChange={handleChangeSettingValue}
                              value={setting.is_exclusive}
                            >
                              <option value="">Select Is Exclusive</option>
                              {row.value &&
                                row.value.data.map((exclusive) => (
                                  <option
                                    key={exclusive.id}
                                    value={exclusive.id}
                                  >
                                    {exclusive.name}
                                  </option>
                                ))}
                            </Input>
                          ) : row.key === "is_promotional" ? (
                            <Input
                              name="is_promotional"
                              type="select"
                              placeholder={row.placeholder}
                              className="form-select"
                              onChange={handleChangeSettingValue}
                              value={setting.is_promotional}
                            >
                              <option value="">Select Is Promotional</option>
                              {row.value &&
                                row.value.data.map((promotional) => (
                                  <option
                                    key={promotional.id}
                                    value={promotional.id}
                                  >
                                    {promotional.name}
                                  </option>
                                ))}
                            </Input>
                          ) : (
                            <Input
                              name="is_online_app"
                              type="select"
                              placeholder={row.placeholder}
                              className="form-select"
                              onChange={handleChangeSettingValue}
                              value={setting.is_online_app}
                            >
                              <option value="">Select Is Online App</option>
                              {row.value &&
                                row.value.data.map((online) => (
                                  <option key={online.id} value={online.id}>
                                    {online.name}
                                  </option>
                                ))}
                            </Input>
                          )}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </Row>
            <Row>
              <Col sm="12">
                <div className="d-flex flex-wrap gap-2">
                  <button type="submit" className="btn btn-success save-user">
                    Save
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={() => {
                      validation.resetForm();
                      toggle();
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </Col>
            </Row>
          </Form>
        </ModalBody>
      </Modal>
      <ToastContainer />
    </React.Fragment>
  );
};

export default withRouter(BulkSettings);
