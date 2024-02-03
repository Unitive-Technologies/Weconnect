import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
// import RevenueShare from "./RevenueShare";
import {
  Col,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
  FormFeedback,
  Input,
  Form,
} from "reactstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import { updatePackage as onUpdatePackage } from "/src/store/packagelist/actions";
import { useDispatch } from "react-redux";
import ViewCasList from "./ViewCasList";
import ViewBroadcasterBouquets from "./ViewBroadcasterBouquets";
import ViewChannels from "./ViewChannels";
import CasList from "./CasList";

const ViewPackageList = (props) => {
  const {
    isOpen,
    handleViewPackageList,
    packageList,
    selectedRowId,
    packageType,
    packageBoxType,
    packageStatus,
  } = props;
  // console.log("selectedRowId:" + selectedRowId);
  // console.log("selectedRow by useEffect:" + JSON.stringify(selectedRowDetails));
  const API_URL = "https://sms.unitch.in/api/index.php/v1";
  const dispatch = useDispatch();
  const [showEditChannel, setShowEditChannel] = useState(false);
  const [selectedRowDetails, setSelectedRowDetails] = useState({});
  const [casCodeList, setCasCodeList] = useState([]);

  const [casSelectList, setCasSelectList] = useState([]);

  const [totalChannelsInChannels, setTotalChannelsInChannels] = useState(0);
  const [totalPackageRateInChannels, setTotalPackageRateInChannels] =
    useState(0);
  const [totalChannelsInBouquets, setTotalChannelsInBouquets] = useState(0);
  const [totalPackageRateInBouquets, setTotalPackageRateInBouquets] =
    useState(0);

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      code: (selectedRowDetails && selectedRowDetails.code) || "",
      name: (selectedRowDetails && selectedRowDetails.name) || "",
      description: (selectedRowDetails && selectedRowDetails.description) || "",
      definition: (selectedRowDetails && selectedRowDetails.isHD) || "",
      type: (selectedRowDetails && selectedRowDetails.isFta) || "",
      status: (selectedRowDetails && selectedRowDetails.status) || "",
      // casCodeArray: (selectedRowDetails && selectedRowDetails.casCodes) || [],
    },
    validationSchema: Yup.object({
      code: Yup.string().required("Enter Channel Code"),
      name: Yup.string().required("Enter channel name"),
      description: Yup.string().required("Enter description"),
      // definition: Yup.string().required("Enter channel definition"),
      // packagetype: Yup.string().required("Enter channel type"),
      // status: Yup.string().required("Enter status"),
    }),
    onSubmit: (values) => {
      const updatedPackage = {
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
      console.log("newPackageList:" + updatedPackage);
      // save new user
      dispatch(onUpdatePackage(updatedPackage));
      validation.resetForm();
      handleViewPackageList();
    },
    onReset: (values) => {
      validation.setValues(validation.initialValues);
    },
  });

  const handleCancel = () => {
    setShowEditChannel(false);
    handleViewPackageList();
  };

  const handleUpdateCasList = (casList) => {
    setCasCodeList(casList);
  };

  useEffect(() => {
    const getSelectedRowDetails = async (e) => {
      try {
        const token = "Bearer " + localStorage.getItem("temptoken");

        const response = await axios.get(
          `${API_URL}/package/${selectedRowId}?expand=channels,brdBouques&vr=web1.0`,

          {
            headers: {
              Authorization: token,
            },
          }
        );
        setSelectedRowDetails(response.data.data);
        console.log("response in useEffect:" + JSON.stringify(response));
      } catch (error) {
        console.error("Error fetching addChannels data:", error);
      }
    };
    if (selectedRowId) {
      getSelectedRowDetails();
    }
  }, [selectedRowId]);
  console.log("selectedRowDetails:" + JSON.stringify(selectedRowDetails));
  return (
    <Modal
      isOpen={isOpen}
      role="dialog"
      autoFocus={true}
      centered={true}
      className="exampleModal"
      tabIndex="-1"
      toggle={handleCancel}
      size="xl"
    >
      <ModalHeader toggle={handleCancel} tag="h4">
        {!showEditChannel
          ? `View ${(packageList && packageList.name) || ""}`
          : `Edit ${(packageList && packageList.name) || ""}`}
      </ModalHeader>
      {!showEditChannel && (
        <Link
          style={{
            position: "absolute",
            marginLeft: "92%",
            marginTop: "1%",
          }}
          to="#!"
          className="btn btn-light me-1"
          onClick={() => setShowEditChannel(true)}
        >
          <i className="mdi mdi-pencil-outline"></i>
        </Link>
      )}
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
                  disabled={!showEditChannel}
                  placeholder="Enter code"
                  // className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.code || ""}
                ></Input>
                {validation.touched.code && validation.errors.code ? (
                  <FormFeedback type="invalid">
                    {validation.errors.code}
                  </FormFeedback>
                ) : null}
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
                  disabled={!showEditChannel}
                  // className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.name || ""}
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
                  disabled={!showEditChannel}
                  placeholder="Select Definition"
                  className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.definition || ""}
                >
                  {/* <option value="101">Select channel definition</option>
                  <option value="102">Standard Definition(SD)</option>
                  <option value="103">High Definition(HD)</option> */}
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
                  disabled={!showEditChannel}
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
                  disabled={!showEditChannel}
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.type || ""}
                >
                  {/* <option value="104">Select channel type</option>
                  <option value="105">Pay Channel</option>
                  <option value="106">FTA</option> */}
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
                  disabled={!showEditChannel}
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.status || ""}
                >
                  {/* <option value="101">Select Status</option>
                  <option value="102">Active</option>
                  <option value="103">In-Active</option> */}
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
              {console.log("casCodeList:" + JSON.stringify(casCodeList))}
              <ViewCasList
                data={selectedRowDetails.casCodes}
                showEditChannel={showEditChannel}
                updateList={setCasCodeList}
                casSelectList={casSelectList}
              />
              {/* <CasList
                isOpen={Boolean(handleUpdateCasList)}
                data={
                  !selectedRowDetails
                    ? casCodeList
                    : selectedRowDetails.casCodes
                }
                updateList={setCasCodeList}
                casSelectList={casSelectList}
              /> */}
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
                marginLeft: "20%",

                position: "absolute",
                padding: "0px 10px",
              }}
            >
              <h5 style={{}}>Add Channels</h5>
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
                <ViewChannels
                  showEditChannel={showEditChannel}
                  data={selectedRowDetails.channels}
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
                marginLeft: "50%",
                position: "absolute",
                padding: "0px 10px",
              }}
            >
              <h5 style={{}}>Add Broadcaster Bouquets</h5>
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
                <ViewBroadcasterBouquets
                  showEditChannel={showEditChannel}
                  data={selectedRowDetails.brdBouques}
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
                  TOTAL CHANNELS:{" "}
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
                  PACKAGE RATE:{" "}
                  {totalPackageRateInChannels + totalPackageRateInBouquets}
                </h6>
              </div>
            </Row>
          </div>

          {/* {!showEditChannel && ( */}
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
                    handleCancel();
                  }}
                >
                  Cancel
                </button>
              </ModalFooter>
            </Col>
          </Row>
          {/* )} */}
        </Form>
      </ModalBody>
    </Modal>
  );
};

ViewPackageList.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default ViewPackageList;
