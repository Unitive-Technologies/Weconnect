import React, { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import {
  Col,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
  FormFeedback,
  Input,
  Form,
  ModalFooter,
} from "reactstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import { addNewPackageList as onAddNewPackageList } from "/src/store/packagelist/actions";
import { useDispatch } from "react-redux";
import CasList from "./CasList";
import AddChannels from "./AddChannels";
import AddBroadcasterBouquets from "./AddBroadcasterBouquets";
import AddBroadcasterBouquetsTableList from "./AddBroadcasterBouquetsTableList";

const AddNewPackageList = (props) => {
  const { isOpen, toggleAddModal, packageType, packageBoxType, packageStatus } =
    props;

  console.log("type:" + JSON.stringify(packageType));
  // console.log("Boxtype:" + JSON.stringify(packageBoxType));
  // console.log("status:" + JSON.stringify(packageStatus));
  const dispatch = useDispatch();
  const [casCodeList, setCasCodeList] = useState([]);
  const [channels, setChannels] = useState([]);
  const [bouquets, setBouquets] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const [casSelectList, setCasSelectList] = useState([]);
  const [totalChannelsInChannels, setTotalChannelsInChannels] = useState(0);
  const [totalPackageRateInChannels, setTotalPackageRateInChannels] =
    useState(0);
  const [totalChannelsInBouquets, setTotalChannelsInBouquets] = useState(0);
  const [totalPackageRateInBouquets, setTotalPackageRateInBouquets] =
    useState(0);
  const [toggleSwitch, setToggleSwitch] = useState(true);

  const API_URL = "https://sms.unitch.in/api/index.php/v1";
  console.log(
    "Totals in Channel" + totalChannelsInChannels,
    totalPackageRateInChannels
  );
  console.log(
    "Totals in Bouquets" + totalChannelsInBouquets,
    totalPackageRateInBouquets
  );
  const handleTypeChange = async (e) => {
    const selectValue = e.target.value;
    setSelectedType(selectValue);
    console.log(
      "SSSSSSSSSSSSSSSSSSSSelectedType:" + selectedType,
      typeof selectedType
    );

    try {
      validation.handleChange(e);
      // console.log("type of selectType:" + typeof selectedType);
      const token = "Bearer " + localStorage.getItem("temptoken");
      if (selectValue === "1") {
        const response = await axios.get(
          `${API_URL}/casvendor/list?fields=id,name&filter[package_type]=1&vr=web1.0`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        setCasSelectList(response.data.data);
      } else if (selectValue === "0") {
        const response = await axios.get(
          `${API_URL}/casvendor/list?fields=id,name&filter[package_type]=0&vr=web1.0`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        setCasSelectList(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching CasSelectList data:", error);
    }
  };
  // console.log("casSelectList:" + JSON.stringify(casSelectList));
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      code: "",
      name: "",
      description: "",
      definition: "",
      type: "",
      status: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Enter package name"),
      description: Yup.string().required("Enter package description"),
      definition: Yup.string().required("Select package definition"),
      type: Yup.string().required("Select package type"),
      status: Yup.string().required("Select status"),
    }),
    onSubmit: (values) => {
      const newPackageList = {
        code: values["code"],
        name: values["name"],
        description: values["description"],
        isHD: parseInt(values["definition"]),
        isFta: parseInt(values["type"]),
        status: parseInt(values["status"]),

        broadcasterRate:
          totalPackageRateInChannels + totalPackageRateInBouquets,
        casCodes: casCodeList.map((single) => {
          return {
            cas_id: single.cas_id,
            cascode: single.cascode,
          };
        }),
        channels: channels.map((single) => {
          return single.id;
        }),
        brd_bouques: bouquets.map((single) => {
          return single.id;
        }),
      };
      console.log("newPackageList:" + newPackageList);
      // save new user
      dispatch(onAddNewPackageList(newPackageList));
      validation.resetForm();
      toggleAddModal();
    },
    onReset: (values) => {
      validation.setValues(validation.initialValues);
    },
  });

  const handleUpdateCasList = (casList) => {
    setCasCodeList(casList);
  };
  return (
    <Modal
      isOpen={isOpen}
      role="dialog"
      autoFocus={true}
      centered={true}
      className="exampleModal"
      tabIndex="-1"
      toggle={toggleAddModal}
      size="xl"
    >
      <ModalHeader tag="h4" toggle={toggleAddModal}>
        Add New Package
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
            <Col sm="4">
              <div className="mb-3">
                <Label className="form-label">Code</Label>
                <Input
                  name="code"
                  type="text"
                  placeholder="Enter code"
                  // className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.code || ""}
                  disabled={toggleSwitch}
                ></Input>
                {validation.touched.code && validation.errors.code ? (
                  <FormFeedback type="invalid">
                    {validation.errors.code}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>

            <Col lg={2}>
              <div className="mt-3">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <label style={{ marginRight: "10px" }}>Custom</label>
                  <div className="form-check form-switch form-switch-lg mb-2">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="customSwitchsizelg"
                      defaultChecked
                      onClick={(e) => {
                        settoggleSwitch(!toggleSwitch);
                      }}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="customSwitchsizelg"
                    >
                      Auto
                    </label>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col sm="4">
              <div className="mb-3">
                <Label className="form-label">
                  Name<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="name"
                  type="text"
                  placeholder="Enter name"
                  // className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.name || ""}
                  invalid={
                    validation.touched.name && validation.errors.name
                      ? true
                      : false
                  }
                ></Input>
                {validation.touched.name && validation.errors.name ? (
                  <FormFeedback type="invalid">
                    {validation.errors.name}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
            <Col sm="4">
              <div className="mb-3">
                <Label className="form-label">
                  Definition<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="definition"
                  type="select"
                  placeholder="Select Definition"
                  className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.definition || ""}
                  invalid={
                    validation.touched.definition &&
                    validation.errors.definition
                      ? true
                      : false
                  }
                >
                  <option value="">Select channel definition</option>
                  {packageBoxType &&
                    packageBoxType.map((boxtype) => (
                      <option key={boxtype.id} value={boxtype.id}>
                        {boxtype.name}
                      </option>
                    ))}
                </Input>
                {validation.touched.definition &&
                validation.errors.definition ? (
                  <FormFeedback type="invalid">
                    {validation.errors.definition}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
            <Col sm="4">
              <div className="mb-3">
                <Label className="form-label">
                  Description<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="description"
                  type="textarea"
                  placeholder="Enter Description"
                  rows="3"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.description || ""}
                  invalid={
                    validation.touched.description &&
                    validation.errors.description
                      ? true
                      : false
                  }
                />
                {validation.touched.description &&
                validation.errors.description ? (
                  <FormFeedback type="invalid">
                    {validation.errors.description}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
          </Row>
          <Row>
            <Col sm="4">
              <div className="mb-3">
                <Label className="form-label">
                  Type<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="type"
                  type="select"
                  placeholder="Select type"
                  className="form-select"
                  // onChange={validation.handleChange}
                  // onBlur={validation.handleBlur}
                  // value={validation.values.type || ""}
                  onChange={handleTypeChange}
                  onBlur={validation.handleBlur}
                  value={selectedType}
                  invalid={
                    validation.touched.type && validation.errors.type
                      ? true
                      : false
                  }
                >
                  <option value="">Select channel type</option>
                  {packageType &&
                    packageType.map((type) => (
                      <option key={type.id} value={type.id}>
                        {type.name}
                      </option>
                    ))}
                </Input>
                {validation.touched.type && validation.errors.type ? (
                  <FormFeedback type="invalid">
                    {validation.errors.type}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
            <Col sm="4">
              <div className="mb-3">
                <Label className="form-label">
                  Status<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="status"
                  type="select"
                  placeholder="Select Status"
                  className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.status || ""}
                  invalid={
                    validation.touched.status && validation.errors.status
                      ? true
                      : false
                  }
                >
                  <option value="">Select Status</option>
                  {packageStatus &&
                    packageStatus.map((status) => (
                      <option key={status.id} value={status.id}>
                        {status.name}
                      </option>
                    ))}
                </Input>
                {validation.touched.status && validation.errors.status ? (
                  <FormFeedback type="invalid">
                    {validation.errors.status}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
          </Row>
          <div
            style={{
              // margin: "20px 0px",
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
            <h5 style={{}}>CAS LIST</h5>
          </div>
          <Row
            style={{
              position: "relative",
              border: "1px solid #ced4da",
              padding: "20px 0px",
              margin: "30px 0px",
            }}
          >
            <Col sm="12">
              <CasList
                isOpen={Boolean(handleUpdateCasList)}
                data={casCodeList}
                updateList={setCasCodeList}
                casSelectList={casSelectList}
              />
            </Col>
          </Row>
          <div
            style={{
              display: "flex",
            }}
          >
            <div
              style={{
                // margin: "20px 0px",
                marginTop: "20px",
                marginBottom: "18px",
                zIndex: 12000,
                backgroundColor: "#fff",
                width: "fit-content",
                marginLeft: "15%",

                position: "absolute",
                padding: "0px 10px",
              }}
            >
              <h5 style={{}}>Selected Channels</h5>
            </div>
            <Row
              style={{
                position: "relative",
                border: "1px solid #ced4da",
                padding: "20px 0px",
                margin: "30px 0px",
              }}
            >
              <Col sm="12" style={{ width: "550px" }}>
                {/* {console.log(
                  "type before:" + selectedType,
                  validation.values.definition
                )} */}
                <AddChannels
                  channels={channels}
                  setChannels={setChannels}
                  selectedType={selectedType}
                  definition={validation.values.definition}
                  setTotalChannelsInChannels={setTotalChannelsInChannels}
                  setTotalPackageRateInChannels={setTotalPackageRateInChannels}
                  totalChannelsInChannels={totalChannelsInChannels}
                  totalPackageRateInChannels={totalPackageRateInChannels}
                />
              </Col>
            </Row>
            <div
              style={{
                // margin: "20px 0px",
                marginTop: "20px",
                marginBottom: "18px",
                zIndex: 12000,
                backgroundColor: "#fff",
                width: "fit-content",
                marginLeft: "60%",
                position: "absolute",
                padding: "0px 10px",
              }}
            >
              <h5 style={{}}>Selected Broadcaster Bouquets</h5>
            </div>
            <Row
              style={{
                position: "relative",
                border: "1px solid #ced4da",
                padding: "20px 0px",
                margin: "30px 0px",
              }}
            >
              <Col sm="12" style={{ width: "550px" }}>
                {/* {console.log(
                  "type, definition:" + validation.values.type,
                  validation.values.definition
                )} */}
                <AddBroadcasterBouquets
                  bouquets={bouquets}
                  setBouquets={setBouquets}
                  selectedType={selectedType}
                  definition={validation.values.definition}
                  setTotalChannelsInBouquets={setTotalChannelsInBouquets}
                  setTotalPackageRateInBouquets={setTotalPackageRateInBouquets}
                  totalChannelsInBouquets={totalChannelsInBouquets}
                  totalPackageRateInBouquets={totalPackageRateInBouquets}
                />
              </Col>
            </Row>
          </div>
          <div
            style={{
              display: "flex",
            }}
          >
            <Row
              style={{
                position: "relative",
                border: "1px solid #ced4da",
                padding: "5px 0px",
                margin: "10px 0px",
                width: "550px",
                height: "50px",
                display: "flex",
              }}
            >
              <div
                style={{
                  marginTop: "20px",
                  marginBottom: "18px",
                  backgroundColor: "#fff",
                  padding: "0px 10px",
                }}
              >
                <h6 style={{ textAlign: "center" }}>
                  TOTAL CHANNELS:
                  {totalChannelsInChannels + totalChannelsInBouquets}
                </h6>
              </div>
            </Row>
            <Row
              style={{
                position: "relative",
                border: "1px solid #ced4da",
                padding: "5px 0px",
                margin: "10px 0px",
                width: "550px",
                height: "50px",
                display: "flex",
              }}
            >
              <div
                style={{
                  marginTop: "20px",
                  marginBottom: "18px",
                  backgroundColor: "#fff",
                  padding: "0px 10px",
                }}
              >
                <h6 style={{ textAlign: "center" }}>
                  PACKAGE RATE:
                  {totalPackageRateInChannels + totalPackageRateInBouquets}
                </h6>
              </div>
            </Row>
          </div>
          <Row>
            <Col>
              <ModalFooter>
                <button type="submit" className="btn btn-success save-user">
                  Save
                </button>
                <button
                  type="reset"
                  className="btn btn-warning"
                  onClick={() => validation.resetForm()}
                >
                  Reset
                </button>

                <button
                  type="button"
                  className="btn btn-outline-danger"
                  onClick={() => {
                    validation.resetForm();
                    toggleAddModal();
                  }}
                >
                  Cancel
                </button>
              </ModalFooter>
            </Col>
          </Row>
        </Form>
      </ModalBody>
      {/* </Modal> */}
    </Modal>
  );
};

AddNewPackageList.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default AddNewPackageList;
