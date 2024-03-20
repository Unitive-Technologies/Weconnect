import React, { useEffect, useState, useRef, useMemo } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import {
  Card,
  CardBody,
  Col,
  Container,
  Row,
  CardTitle,
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
import RevenueShare from "./RevenueShare";
import PieChart from "./PieChart";
import { resetSection } from "redux-form";
import ShowHistoryModal from "./ShowHistoryModal";
import RevenueShareForEdit from "./RevenueShareForEdit";

const ViewBroadCasterBouquet = (props) => {
  const {
    isOpen,
    // selectedRowId,
    // broadcasterBouquetAddchannels,
    broadcasterBouquetType,
    broadcasterBouquetBroadcaster,
    broadcasterBouquetDefinition,
    broadcasterBouquetStatus,
    toggleViewModal,
    broadcast,
  } = props;
  const dispatch = useDispatch();

  const [showHistory, setShowHistory] = useState(false);

  const toggleHistoryModal = () => {
    setShowHistory(!showHistory);
  };

  const API_URL = "https://sms.unitch.in/api/index.php/v1";

  const [showEditBroadcast, setShowEditBroadcast] = useState(false);
  const [revenueData, setRevenueData] = useState({});
  const [broadPercent, setBroadPercent] = useState(80);
  const [msoPercent, setMsoPercent] = useState(20);
  const [discountPercent, setDiscountPercent] = useState(0);
  const [toggleSwitch, settoggleSwitch] = useState(true);

  const [selectedRowDetails, setSelectedRowDetails] = useState({});
  const [channels, setChannels] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const [selectedBroadcaster, setSelectedBroadcaster] = useState("");
  const [selectedRate, setSelectedRate] = useState("");
  const [definition, setDefinition] = useState("");

  console.log("View broadcasttttttttttttttttttt" + JSON.stringify(broadcast));

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      code: broadcast?.code || "",
      name: broadcast?.name || "",
      isHD: broadcast?.isHD || 0,
      description: broadcast?.description || "",
      isFta: broadcast?.isFta || 0,
      broadcaster_id: broadcast?.broadcaster_id || "",
      status: broadcast?.status || "",
      broadcasterRate: broadcast?.broadcasterRate || "",
      // channels: broadcast?.channelsGroup || [],
      // broadcaster_share: broadcast?.revenue_share?.broadcaster_share || "",
      // mso_share: broadcast?.revenue_share?.mso_share || "",
      // mso_discount: broadcast?.revenue_share?.mso_discount || "",
    },

    validationSchema: Yup.object({
      // code: Yup.string().required("Enter Code"),
      name: Yup.string().required("Enter name"),
      isHD: Yup.string().required("Select definition"),
      description: Yup.string().required("Enter description"),
      isFta: Yup.string().required("Select type"),
      broadcaster_id: Yup.string().required("select broadcaster"),
      status: Yup.string().required("Select status"),
      broadcasterRate: Yup.string().required("Enter Rate"),
    }),
    onSubmit: async (values) => {
      try {
        const updateBroadcasterBouque = {
          id: broadcast.id,
          code: values["code"],
          name: values["name"],
          description: values["description"],
          isHD: values["isHD"],
          isFta: values["isFta"],
          broadcaster_id: values["broadcaster_id"],
          status: values["status"],
          broadcasterRate: values["rate"],
          channelsGroup: channels.map((single) => {
            return single.id;
          }),
          revenue_share: {
            mso_share: msoPercent,
            mso_discount: discountPercent,
            broadcaster_share: broadPercent,
          },
          channels: channels.map((single) => {
            return {
              broadcasterRate: single.broadcasterRate,
              broadcaster_lbl: single.broadcaster_lbl,
              channel_type_lbl: single.channel_type_lbl,
              id: single.id,
              isAlacarte: single.isAlacarte,
              isAlacarte_lbl: single.isAlacarte,
              isFta: single.isFta,
              isFta_lbl: single.isFta_lbl,
              isNCF: single.isNCF,
              isNCF_lbl: single.isNCF_lbl,
              name: single.name,
            };
          }),
        };

        console.log(
          "updateBroadcasterBouque:",
          JSON.stringify(updateBroadcasterBouque)
        );
        const token = "Bearer " + localStorage.getItem("temptoken");

        const response = await axios.put(
          `${API_URL}/broadcaster-bouque/${broadcast.id}?vr=web1.0`,
          updateBroadcasterBouque,
          {
            headers: {
              Authorization: token,
            },
          }
        );

        console.log(
          "newBroadcasterBouquetList:" + JSON.stringify(updateBroadcasterBouque)
        );
        console.log("API Response:", response.data);
        // dispatch(onUpdateBroadcasterBouquet(updateBroadcasterBouque));
        validation.resetForm();
        toggleViewModal();
      } catch (error) {
        console.error("Error in onSubmit:", error);
      }
    },
    onReset: (values) => {
      validation.setValues(validation.initialValues);
    },
  });
  const handleCancel = () => {
    setShowEditBroadcast(false);
    resetSection();
    toggleViewModal();
  };
  useEffect(() => {
    if (selectedRowDetails) {
      console.log(
        "selectedRowDetails.channel_type_lbl:" +
          selectedRowDetails.channel_type_lbl
      );
      setChannels(selectedRowDetails.channels);
      setDefinition(selectedRowDetails.isHD);
      setSelectedType(selectedRowDetails.isFta);
      setSelectedBroadcaster(selectedRowDetails.broadcaster_id);
    }
  }, [selectedRowDetails]);
  useEffect(() => {
    const getSelectedRowDetails = async (e) => {
      try {
        const token = "Bearer " + localStorage.getItem("temptoken");

        const response = await axios.get(
          `${API_URL}/broadcaster-bouque/${broadcast.id}?expand=channels&vr=web1.0`,
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
    if (broadcast) {
      getSelectedRowDetails();
    }
  }, [broadcast]);
  console.log("selectedRowDetails:" + JSON.stringify(selectedRowDetails));

  useEffect(() => {
    if (broadcast) {
      setRevenueData(broadcast.revenue_share);
    } else {
      setRevenueData({});
    }
  }, [broadcast]);

  useEffect(() => {
    if (revenueData) {
      setBroadPercent(revenueData.broadcaster_share);
    }
    if (revenueData) {
      setMsoPercent(revenueData.mso_share);
    }
    if (revenueData) {
      console.log(
        "discountPercent:" + typeof revenueData.mso_discount,
        revenueData.mso_discount
      );
      setDiscountPercent(revenueData.mso_discount);
    }
  }, [revenueData]);

  return (
    <>
      {showHistory && (
        <ShowHistoryModal
          isOpen={showHistory}
          toggleHistoryModal={toggleHistoryModal}
          broadcast={broadcast}
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
          {!showEditBroadcast
            ? `View ${(broadcast && broadcast.name) || ""}`
            : `Edit ${(broadcast && broadcast.name) || ""} `}
        </ModalHeader>
        {!showEditBroadcast && (
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
              onClick={() => setShowEditBroadcast(true)}
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
                    // onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    // value={selectedType}
                    // value={validation.values.channel_type_lbl || ""}
                    value={validation.values.isFta || ""}
                    disabled={!showEditBroadcast}
                  >
                    {broadcasterBouquetType &&
                      broadcasterBouquetType.map((channel_type_lbl) => (
                        <option
                          key={channel_type_lbl.id}
                          value={channel_type_lbl.id}
                        >
                          {channel_type_lbl.name}
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
                        <option
                          key={broadcaster_id.id}
                          value={broadcaster_id.id}
                        >
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
                    onChange={validation.handleChange}
                    // onChange={handleInputChange}
                    // onKeyDown={handleArrowKeyPress}
                    placeholder="0"
                    // disabled={selectedType === "1"}
                    // value={selectedRate}

                    value={
                      selectedType === "1"
                        ? 0
                        : parseFloat(validation.values.broadcasterRate).toFixed(
                            2
                          ) || ""
                    }
                    onBlur={validation.handleBlur}
                    disabled={!showEditBroadcast || selectedType === "1"}
                  ></Input>

                  {validation.touched.broadcasterRate &&
                  validation.errors.broadcasterRate ? (
                    <FormFeedback type="invalid">
                      {validation.errors.broadcasterRate}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <div
                  style={{
                    // margin: "20px 0px",
                    marginTop: "20px",
                    marginBottom: "18px",
                    zIndex: 10000,
                    backgroundColor: "#fff",
                    width: "fit-content",
                    marginLeft: "40%",
                    position: "absolute",
                    padding: "0px 10px",
                  }}
                >
                  <h5 style={{}}>MRP Revenue Share</h5>
                </div>
                <Col>
                  <Row
                    style={{
                      position: "relative",
                      border: "1px solid #ced4da",
                      padding: "20px 0px",
                      margin: "30px 0px",
                    }}
                  >
                    <Col lg="6">
                      <RevenueShareForEdit
                        // disabled={!showEditBroadcast}
                        showEditBroadcast={showEditBroadcast}
                        broadPercent={broadPercent}
                        msoPercent={msoPercent}
                        discountPercent={discountPercent}
                        setBroadPercent={setBroadPercent}
                        setMsoPercent={setMsoPercent}
                        setDiscountPercent={setDiscountPercent}
                      />
                    </Col>
                    {broadcast && (
                      <>
                        {broadcast.isFta === 0 &&
                          parseInt(broadcast.broadcasterRate) !== "" && (
                            <Col lg={6}>
                              <Card>
                                <CardBody>
                                  <span>Graphical representation of SHARE</span>
                                  <CardTitle className="mb-4">
                                    (MRP:{" "}
                                    {!showEditBroadcast
                                      ? parseFloat(
                                          broadcast.broadcasterRate
                                        ).toFixed(2)
                                      : parseFloat(
                                          validation.values.broadcasterRate
                                        ).toFixed(2)}
                                    ){" "}
                                    {/* parseFloat(validation.values.rate).toFixed(2) */}
                                  </CardTitle>
                                  <PieChart
                                    broadPercent={broadPercent}
                                    msoPercent={msoPercent}
                                    discountPercent={discountPercent}
                                    // selectedRate={selectedRate}
                                    selectedRate={
                                      !showEditBroadcast
                                        ? parseInt(broadcast.broadcasterRate)
                                        : validation.values.broadcasterRate
                                    }
                                    dataColors='["--bs-success","--bs-primary", "--bs-danger","--bs-info", "--bs-warning"]'
                                  />
                                </CardBody>
                              </Card>
                            </Col>
                          )}
                      </>
                    )}
                  </Row>
                </Col>
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
                  channels={channels}
                  setChannels={setChannels}
                  definition={validation.values.isHD}
                  selectedType={validation.values.isFta}
                  selectedBroadcaster={validation.values.broadcaster_id}
                  // broadcasterBouquetAddchannels={broadcasterBouquetAddchannels}
                />
              </Col>
            </Row>
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
              "broadcaster_id:",
              validation.values.broadcaster_id,
              typeof validation.values.broadcaster_id,
              "status:",
              validation.values.status,
              typeof validation.values.status,
              "broadcasterRate:",
              validation.values.broadcasterRate,
              typeof validation.values.broadcasterRate
            )}
            {console.log(
              "isHD:",
              validation.values.isHD,
              typeof validation.values.isHD
            )}
            {console.log(
              "isFta:",
              validation.values.isFta,
              typeof validation.values.isFta
            )}
            {showEditBroadcast && (
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

ViewBroadCasterBouquet.propTypes = {
  toggleViewModal: PropTypes.func,
  resetSelection: PropTypes.func,
  isOpen: PropTypes.bool,

  broadcast: PropTypes.object,
  // broadcasterBouquetAddchannels: PropTypes.object,
  broadcasterBouquetBroadcaster: PropTypes.array,
  broadcasterBouquetDefinition: PropTypes.array,
  broadcasterBouquetStatus: PropTypes.array,
  broadcasterBouquetType: PropTypes.array,
};

export default ViewBroadCasterBouquet;
