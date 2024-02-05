import React, { useEffect, useState, useRef, useMemo } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import {
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Modal,
  ModalFooter,
  ModalHeader,
  ModalBody,
  Label,
  FormFeedback,
  UncontrolledTooltip,
  Input,
  Form,
} from "reactstrap";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import { updateBroadcasterBouquet as onUpdateBroadcasterBouquet } from "/src/store/broadcasterbouquet/actions";
import { useDispatch } from "react-redux";
import ViewChannels from "./ViewChannels";
import ViewRevenueShare from "./RevenueShare";

const ViewBroadCasterBouquet = (props) => {
  const { isOpen, selectedRowId,
    broadcasterBouquetType, broadcasterBouquetBroadcaster, broadcasterBouquetDefinition, broadcasterBouquetStatus, toggleViewModal, broadcast } = props;
  const dispatch = useDispatch();

  const API_URL = "https://sms.unitch.in/api/index.php/v1";

  const [showEditBroadcast, setShowEditBroadcast] = useState(false);

  const [broadPercent, setBroadPercent] = useState(80);
  const [msoPercent, setMsoPercent] = useState(20);
  const [discountPercent, setDiscountPercent] = useState(0);
  const [toggleSwitch, settoggleSwitch] = useState(true);
  const [channels, setChannels] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const [selectedBroadcaster, setSelectedBroadcaster] = useState("");
  const [selectedRowDetails, setSelectedRowDetails] = useState({});

  const [selectedRate, setSelectedRate] = useState("");

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setSelectedRate(inputValue >= 0 ? inputValue : 0);
  };

  console.log("View broadcast" + JSON.stringify(broadcast))

  const handleArrowKeyPress = (e) => {
    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      e.preventDefault(); // Prevent the default behavior of arrow keys in number input

      const increment = e.key === "ArrowUp" ? 1 : -1;
      const currentRate = parseFloat(selectedRate) || 0;
      const newRate = Math.max(0, currentRate + increment * 0.01);

      setSelectedRate(newRate.toFixed(2));
    }
  };

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      //BroadCaster: "",
      code: (broadcast && broadcast.code) || "",
      name: (broadcast && broadcast.name) || "",
      isHD: (broadcast && broadcast.isHD) || "",
      description: (broadcast && broadcast.description) || "",
      isFta: (broadcast && broadcast.isFta) || "",
      broadcaster_id: (broadcast && broadcast.broadcaster_id) || "",
      status: (broadcast && broadcast.status) || "",
      broadcasterRate: (broadcast && broadcast.broadcasterRate) || "",
      channels: (broadcast && broadcast.channels) || "",
      created_by: "Admin",
    },
    validationSchema: Yup.object({
      // code: Yup.string().required("Enter Code"),
      name: Yup.string().required("Enter name"),
      // definition: Yup.string().required("Select definition"),
      description: Yup.string().required("Enter description"),
      // type: Yup.string().required("Select type"),
      // broadcaster_id: Yup.string().required("select broadcaster_id"),
      // status: Yup.string().required("Enter status"),
      // rate: Yup.string().required(""),
      // channels: Yup.string().required("channels"),
      // serviceid: Yup.string().required("serviceid"),
    }),
    onSubmit: (values) => {
      const updateBroadcasterBouque = {
        id: Math.floor(Math.random() * (30 - 20)) + 20,
        code: values["code"],
        name: values["name"],
        // definition: values["definition"],
        description: values["description"],
        isHD: parseInt(values["isHD"]),
        isFta: parseInt(values["isFta"]),
        broadcaster_id: parseInt(values["broadcaster_id"]),
        status: parseInt(values["status"]),
        broadcasterRate: values["broadcasterRate"],
        channelsGroup: channels.map((single) => {
          return single.id;
        }),
        revenue_share: {
          mso_share: msoPercent,
          mso_discount: discountPercent,
          broadcaster_share: broadPercent,
        },
      };
      console.log(
        "newBroadcasterBouquetList:" + JSON.stringify(updateBroadcasterBouque)
      );
      dispatch(onUpdateBroadcasterBouquet(updateBroadcasterBouque));
      validation.resetForm();
      toggleViewModal();
    },
    onReset: (values) => {
      validation.setValues(validation.initialValues);
    },
  });
  const handleCancel = () => {
    setShowEditBroadcast(false);
    toggleViewModal();
  };

  useEffect(() => {
    const getSelectedRowDetails = async (e) => {
      try {
        const token = "Bearer " + localStorage.getItem("temptoken");

        const response = await axios.get(
          `${API_URL}/broadcaster-bouque/${selectedRowId}?expand=channels&vr=web1.0`,
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
        {!showEditBroadcast
          ? `View ${(broadcast && broadcast.name) || ""}`
          : `Edit ${(broadcast && broadcast.name) || ""} `}
      </ModalHeader>
      {!showEditBroadcast && (
        <Link
          style={{
            position: "absolute",
            marginLeft: "92%",
            marginTop: "1%",
          }}
          to="#!"
          className="btn btn-light me-1"
          onClick={() => setShowEditBroadcast(true)}
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
                  placeholder="Enter code"
                  // className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.code || ""}
                  disabled={!showEditBroadcast}
                ></Input>
                {validation.touched.code && validation.errors.code ? (
                  <FormFeedback type="invalid">
                    {validation.errors.code}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>

            <Col lg={4}>
              <div className="form-check form-switch form-switch-lg mb-3">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="customSwitchsizelg"
                  defaultChecked
                />
                <label
                  className="form-check-label"
                  htmlFor="customSwitchsizelg"
                >
                  Custom / Auto
                </label>
              </div>
            </Col>
            <Col sm="4"></Col>

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
                  disabled={!showEditBroadcast}
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
                  placeholder="Select Definition"
                  className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.isHD || ""}
                  disabled={!showEditBroadcast}
                >
                  {/* <option value="">Select Definition</option> */}
                  {broadcasterBouquetDefinition &&
                    broadcasterBouquetDefinition.map((isHD) => (
                      <option key={isHD.id} value={isHD.id}>
                        {isHD.name}
                      </option>
                    ))}
                </Input>
                {validation.touched.isHD &&
                  validation.errors.isHD ? (
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
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.description || ""}
                  disabled={!showEditBroadcast}
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

            <Col sm="4">
              <div className="mb-3">
                <Label className="form-label">
                  Type<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="isFta"
                  type="select"
                  placeholder="Select Channel type"
                  className="form-select"
                  onChange={(e) => {
                    validation.handleChange(e);
                    setSelectedType(e.target.value);
                  }}
                  onBlur={validation.handleBlur}
                  value={selectedType}
                  // value={validation.values.type || ""}
                  disabled={!showEditBroadcast}
                >
                  {broadcasterBouquetType &&
                    broadcasterBouquetType.map((isFta) => (
                      <option key={isFta.id} value={isFta.id}>
                        {isFta.name}
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
                  Broadcaster<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="broadcaster_id"
                  type="select"
                  placeholder="Select broadcaster"
                  className="form-select"
                  onChange={(e) => {
                    validation.handleChange(e);
                    setSelectedBroadcaster(e.target.value);
                  }}
                  onBlur={validation.handleBlur}
                  // value={selectedBroadcaster}
                  value={validation.values.broadcaster_id || ""}
                  disabled={!showEditBroadcast}
                >
                  {/* <option value="">Select Type</option> */}
                  {broadcasterBouquetBroadcaster &&
                    broadcasterBouquetBroadcaster.map((broadcaster_id) => (
                      <option key={broadcaster_id.id} value={broadcaster_id.id}>
                        {broadcaster_id.name}
                      </option>
                    ))}
                </Input>
                {validation.touched.broadcaster_id &&
                  validation.errors.broadcaster_id ? (
                  <FormFeedback type="invalid">
                    {validation.errors.broadcaster_id}
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
                  disabled={!showEditBroadcast}
                >
                  {broadcasterBouquetStatus &&
                    broadcasterBouquetStatus.map((status) => (
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

            <Col sm="4">
              <div className="mb-3">
                <Label className="form-label">
                  MRP Rate(INR)<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="broadcasterRate"
                  type="number"
                  step="0.01"
                  onChange={handleInputChange}
                  onKeyDown={handleArrowKeyPress}
                  placeholder="0"
                  disabled={selectedType === "1"}
                  value={selectedRate}
                  onBlur={validation.handleBlur}
                // disabled={!showEditBroadcast}
                ></Input>
                {/* {validation.touched.rate && validation.errors.rate ? (
                  <FormFeedback type="invalid">
                    {validation.errors.rate}
                  </FormFeedback>
                ) : null} */}
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
            <h5 style={{}}>MRP Revenue Share</h5>
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
              <ViewRevenueShare
                showEditBroadcast={showEditBroadcast}
                broadPercent={broadPercent}
                msoPercent={msoPercent}
                discountPercent={discountPercent}
                setBroadPercent={setBroadPercent}
                setMsoPercent={setMsoPercent}
                setDiscountPercent={setDiscountPercent} />
            </Col>

            {selectedType === "0" && selectedRate !== "" ? (
              // <Row>
              <Col lg={6}>
                <Card>
                  <CardBody>
                    <span>Graphical representation of SHARE</span>
                    <CardTitle className="mb-4">
                      (MRP: {selectedRate}){" "}
                    </CardTitle>
                    <ViewPieChart
                      broadPercent={broadPercent}
                      msoPercent={msoPercent}
                      discountPercent={discountPercent}
                      selectedRate={selectedRate}
                      dataColors='["--bs-success","--bs-primary", "--bs-danger","--bs-info", "--bs-warning"]'
                    />
                  </CardBody>
                </Card>
              </Col>
            ) : (
              <></>
            )}
          </Row>

          <div
            style={{
              // margin: "20px 0px",
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
            <Col sm="12">
              <ViewChannels
                showEditBroadcast={showEditBroadcast}
                channels={selectedRowDetails.channels}
              />
            </Col>
          </Row>
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
        </Form>
      </ModalBody>
      {/* </Modal> */}
    </Modal>
  );
};

ViewBroadCasterBouquet.propTypes = {
  toggleViewModal: PropTypes.func,
  // resetSelection: PropTypes.func,
  isOpen: PropTypes.bool,

  // broadcast: PropTypes.object,
  // broadcasterBouquetAddchannels: PropTypes.object,
  // broadcasterBouquetBroadcaster: PropTypes.object,
  // broadcasterBouquetDefinition: PropTypes.object,
  // broadcasterBouquetStatus: PropTypes.object,
  // broadcasterBouquetType: PropTypes.object,
};

export default ViewBroadCasterBouquet;
