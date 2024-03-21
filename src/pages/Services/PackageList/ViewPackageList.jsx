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
import { getPackageList as onGetPackageList } from "/src/store/actions";
import { updatePackage as onUpdatePackage } from "/src/store/packagelist/actions";
import { useDispatch } from "react-redux";
import ViewCasList from "./ViewCasList";
import ViewBroadcasterBouquets from "./ViewBroadcasterBouquets";
import ViewChannels from "./ViewChannels";
import ShowHistoryModal from "./ShowHistoryModal";

const ViewPackageList = (props) => {
  const {
    isOpen,
    toggleViewModal,
    packageList,
    selectedRowId,
    packageType,
    packageBoxType,
    packageStatus,
    resetSelection,
  } = props;
  // console.log("selectedRowId:" + selectedRowId);
  console.log("packageList by Props:" + JSON.stringify(packageList));

  const API_URL = "https://sms.unitch.in/api/index.php/v1";
  const dispatch = useDispatch();
  const [showEditChannel, setShowEditChannel] = useState(false);
  const [selectedRowDetails, setSelectedRowDetails] = useState({});
  const [casCodeList, setCasCodeList] = useState([]);
  const [casSelectList, setCasSelectList] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const [channels, setChannels] = useState([]);
  const [bouquets, setBouquets] = useState([]);
  console.log("Channelssssssssssssssssssssssssss: " + JSON.stringify(channels));
  const [totalChannelsInChannels, setTotalChannelsInChannels] = useState(0);
  const [totalPackageRateInChannels, setTotalPackageRateInChannels] =
    useState(0);
  const [totalChannelsInBouquets, setTotalChannelsInBouquets] = useState(0);
  const [totalPackageRateInBouquets, setTotalPackageRateInBouquets] =
    useState(0);

  const [showHistory, setShowHistory] = useState(false);

  const toggleHistoryModal = () => {
    setShowHistory(!showHistory);
  };

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

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      code: packageList?.code || "",
      name: packageList?.name || "",
      description: packageList?.description || "",
      isHD: packageList?.isHD || 0,
      isFta: packageList?.isFta || 0,
      status: packageList?.status || "",
      broadcasterRate: packageList?.broadcasterRate || "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Enter package name"),
      description: Yup.string().required("Enter package description"),
      isHD: Yup.string().required("Select package definition"),
      isFta: Yup.string().required("Select package type"),
      status: Yup.string().required("Select status"),
    }),
    onSubmit: async (values) => {
      console.log("packageListID: " + packageList.id);
      const updatedPackage = {
        id: packageList.id,
        name: values["name"],
        code: values["code"],
        description: values["description"],
        isHD: values["isHD"],
        isFta: values["isFta"],
        status: values["status"],
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
      console.log("ViewPackageList:" + updatedPackage);
      const token = "Bearer " + localStorage.getItem("temptoken");

      const response = await axios.put(
        `${API_URL}/package/${packageList.id}?vr=web1.0`,
        updatedPackage,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      // save new user
      // dispatch(onUpdatePackage(updatedPackage));
      // dispatch(onGetPackageList());
      console.log("API Response:", response.data);
      validation.resetForm();
      handleCancel();
    },
  });

  const handleCancel = () => {
    setShowEditChannel(false);
    resetSelection();
    toggleViewModal();
  };

  const handleUpdateCasList = (casList) => {
    setCasCodeList(casList);
  };

  useEffect(() => {
    if (packageList) {
      setCasCodeList(packageList.casCodes);
      setSelectedType(parseInt(packageList.isFta));
      setChannels(packageList.channels);
      setBouquets(packageList.brdBouques);
    }
  }, [packageList]);
  // useEffect(() => {
  //   const getSelectedRowDetails = async (e) => {
  //     try {
  //       const token = "Bearer " + localStorage.getItem("temptoken");

  //       const response = await axios.get(
  //         `${API_URL}/package/${selectedRowId}?expand=channels,brdBouques&vr=web1.0`,

  //         {
  //           headers: {
  //             Authorization: token,
  //           },
  //         }
  //       );
  //       setSelectedRowDetails(response.data.data);
  //       console.log("response in useEffect:" + JSON.stringify(response));
  //     } catch (error) {
  //       console.error("Error fetching addChannels data:", error);
  //     }
  //   };
  //   if (selectedRowId) {
  //     getSelectedRowDetails();
  //   }
  // }, [selectedRowId]);
  console.log("casCodeList:" + JSON.stringify(casCodeList));
  console.log("casSelectList:" + JSON.stringify(casSelectList));
  // console.log(
  //   "selectedRowDetails by API:" + JSON.stringify(selectedRowDetails)
  // );
  return (
    <>
      {showHistory && (
        <ShowHistoryModal
          isOpen={showHistory}
          toggleHistoryModal={toggleHistoryModal}
          packageList={packageList}
        />
      )}
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
          <>
            <Link
              style={{
                position: "absolute",
                marginLeft: "92%",
                marginTop: "1%",
              }}
              to="#!"
              className="btn btn-light me-1"
              onClick={() => setShowHistory(true)}
            >
              <i className="dripicons-briefcase" />
            </Link>
            <Link
              style={{
                position: "absolute",
                marginLeft: "87%",
                marginTop: "1%",
              }}
              to="#!"
              className="btn btn-light me-1"
              onClick={() => setShowEditChannel(true)}
            >
              <i className="mdi mdi-pencil-outline"></i>
            </Link>
          </>
        )}
        <ModalBody>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              // debugger;
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
                    name="isHD"
                    type="select"
                    disabled={!showEditChannel}
                    placeholder="Select Definition"
                    className="form-select"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.isHD || ""}
                  >
                    {packageBoxType &&
                      packageBoxType.map((boxtype) => (
                        <option key={boxtype.id} value={boxtype.id}>
                          {boxtype.name}
                        </option>
                      ))}
                  </Input>
                  {validation.touched.isHD && validation.errors.isHD ? (
                    <FormFeedback type="invalid">
                      {validation.errors.isHD}
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
                    name="isFta"
                    type="select"
                    placeholder="Select type"
                    className="form-select"
                    disabled={!showEditChannel}
                    onChange={handleTypeChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.isFta || selectedType}
                    // value={selectedType}
                  >
                    {packageType &&
                      packageType.map((type) => (
                        <option key={type.id} value={type.id}>
                          {type.name}
                        </option>
                      ))}
                  </Input>
                  {validation.touched.isFta && validation.errors.isFta ? (
                    <FormFeedback type="invalid">
                      {validation.errors.isFta}
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
                  isOpen={Boolean(handleUpdateCasList)}
                  data={casCodeList}
                  showEditChannel={showEditChannel}
                  updateList={setCasCodeList}
                  casSelectList={casSelectList}
                  setCasSelectList={setCasSelectList}
                  selectedType={selectedType}
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
                    data={channels}
                    setChannels={setChannels}
                    selectedType={selectedType}
                    definition={packageList.isHD}
                    setTotalChannelsInChannels={setTotalChannelsInChannels}
                    setTotalPackageRateInChannels={
                      setTotalPackageRateInChannels
                    }
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
                    data={bouquets}
                    setBouquets={setBouquets}
                    selectedType={selectedType}
                    setTotalChannelsInBouquets={setTotalChannelsInBouquets}
                    setTotalPackageRateInBouquets={
                      setTotalPackageRateInBouquets
                    }
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
            {console.log(
              "validation values:",
              "name:",
              validation.values.name,
              typeof validation.values.name,
              "isHD:",
              validation.values.isHD,
              typeof validation.values.isHD,
              "description:",
              validation.values.description,
              typeof validation.values.description,
              "isFta:",
              validation.values.isFta,
              typeof validation.values.isFta,

              "status:",
              validation.values.status,
              typeof validation.values.status,
              "broadcasterRate:",
              validation.values.broadcasterRate,
              typeof validation.values.broadcasterRate
            )}
            {showEditChannel && (
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
            )}
          </Form>
        </ModalBody>
      </Modal>
    </>
  );
};

ViewPackageList.propTypes = {
  toggleViewModal: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default ViewPackageList;
