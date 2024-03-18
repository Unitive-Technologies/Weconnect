import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import TableContainer from "../../../components/Common/TableContainer";
import {
  Card,
  CardBody,
  Row,
  Col,
  Label,
  Input,
  Form,
  FormFeedback,
  Table,
} from "reactstrap";
import * as Yup from "yup";

import { useFormik } from "formik";
import { addNewPackageList as onAddNewPackageList } from "/src/store/packagelist/actions";
import { Link } from "react-router-dom";

const ViewCasList = (props) => {
  const {
    data,
    showEditChannel,
    updateList,
    casSelectList,
    selectedType,
    setCasSelectList,
  } = props;
  console.log("casSelectList in ViewCasList:" + JSON.stringify(casSelectList));
  const API_URL = "https://sms.unitch.in/api/index.php/v1";
  const [casSelection, setCasSelection] = useState("");
  const [casCode, setCasCode] = useState("");
  console.log("data in viewcaslist:" + JSON.stringify(data));

  const updateCasList = () => {
    if (!casSelection || !casCode) {
      return;
    }

    const newItem = {
      cas_id: data.length + 1,
      cas_lbl: casSelection,
      cascode: casCode,
    };

    const updatedData = [...data, newItem];
    console.log("Updated Data in CasList" + updatedData);
    updateList(updatedData);

    setCasSelection("");
    setCasCode("");
  };

  // const deleteCasList = (index) => {
  //   const list = [...data];
  //   list.splice(index, 1);
  //   updateList(list);
  // };
  const deleteCasList = async (index) => {
    console.log("delete btn clicked");
    console.log(
      "selectedType on deleteCasList:" + selectedType,
      typeof selectedType
    );
    const updatedCasList = data.filter((_, i) => i !== index);
    updateList(updatedCasList);

    try {
      const token = "Bearer " + localStorage.getItem("temptoken");

      const response = await axios.get(
        `${API_URL}/casvendor/list?fields=id,name&filter[package_type]=${selectedType}&vr=web1.0`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      // Assuming `setCasSelectList` is a function that updates the state or performs the necessary action based on the response data.
      setCasSelectList(response.data.data);
    } catch (error) {
      console.error("Error fetching CasSelectList data:", error);
    }
  };

  return (
    <Card>
      <CardBody>
        <Row>
          <Col
            lg={6}
            style={{
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            <Col lg={12}>
              <div className="mb-3">
                <Input
                  name="casSelection"
                  type="select"
                  placeholder="Select CAS"
                  className="form-select"
                  value={casSelection}
                  onChange={(e) => setCasSelection(e.target.value)}
                  // disabled={data.length === 0 ? false : true}
                  // value={validation.values.cas || casSelection}
                  disabled={!showEditChannel}
                >
                  <option value="">Select cascode</option>
                  {casSelectList &&
                    casSelectList.map((options) => (
                      <option key={options.id} value={options.name}>
                        {options.name}
                      </option>
                    ))}
                </Input>
              </div>
            </Col>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Col lg={5} style={{ marginRight: "20px" }}>
                <div className="mb-3">
                  {/* <TODO>Add handlechange and update cascode</TODO> */}
                  <Input
                    name="casCode"
                    type="text"
                    placeholder="CAS Code"
                    value={casCode}
                    onChange={(e) => setCasCode(e.target.value)}
                    // value={validation.values.cascode || casCode}
                    disabled={!showEditChannel}
                  />
                </div>
              </Col>

              <Col lg={2}>
                <div className="mb-3">
                  <button
                    onClick={updateCasList}
                    type="button"
                    className="btn btn-primary "
                    disabled={!showEditChannel}
                  >
                    <i
                      className="bx bx-right-arrow-alt"
                      style={{ fontSize: 20 }}
                    ></i>
                  </button>
                </div>
              </Col>
            </div>
          </Col>

          <Col lg={6}>
            {/* <TableContainer
              isPagination={true}
              columns={columns}
              data={data}
              // isGlobalFilter={true}
              // isShowingPageLength={true}
              // customPageSize={50}
              tableClass="table align-middle table-nowrap table-hover"
              theadClass="table-light"
              paginationDiv="col-sm-12 col-md-7"
              pagination="pagination pagination-rounded justify-content-end mt-4"
            /> */}
            <Table className="table mb-0">
              <thead>
                <tr>
                  <th>#</th>
                  <th>CAS</th>
                  <th>CAS CODE</th>
                  {showEditChannel && <th>$</th>}
                </tr>
              </thead>
              {data && (
                <tbody>
                  {data.map((item, index) => (
                    <tr key={index}>
                      <th
                        scope="row"
                        style={{
                          maxWidth: 10,
                        }}
                      >
                        {item.cas_id}
                      </th>
                      <td>{item.cas_lbl}</td>
                      <td>{item.cascode}</td>

                      {showEditChannel && (
                        <td>
                          <i
                            style={{ cursor: "pointer" }}
                            onClick={() => deleteCasList(index)}
                            className="mdi mdi-delete font-size-18"
                            id="deletetooltip"
                          />
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              )}
            </Table>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

ViewCasList.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default ViewCasList;
