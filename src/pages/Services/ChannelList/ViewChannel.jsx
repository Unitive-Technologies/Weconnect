import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import ViewRevenueShare from "./ViewRevenueShare";
import Select from "react-select";
import {
  Col,
  Card,
  CardTitle,
  CardBody,
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
import { updateChannelList as onUpdateChannelList } from "/src/store/channel/actions";
import { useDispatch } from "react-redux";
import CasList from "./CasList";
import ViewPieChart from "./ViewPieChart";
import ShowHistoryModal from "./ShowHistoryModal";

const ViewChannel = (props) => {
  const {
    isOpen,
    resetSelection,
    toggleViewModal,
    channel,
    channelListBroadcaster,
    channelListStatus,
    channelListType,
    channelListDefinition,
    channelListGenre,
    channelListCascode,
    channelListLanguage,
  } = props;
  const dispatch = useDispatch();
  const [showEditChannel, setShowEditChannel] = useState(false);
  console.log("selected row in view:" + JSON.stringify(channel));
  const [casCodeList, setCasCodeList] = useState([]);
  const [revenueData, setRevenueData] = useState({});
  const [broadPercent, setBroadPercent] = useState();
  const [msoPercent, setMsoPercent] = useState();
  const [discountPercent, setDiscountPercent] = useState();
  const [showHistory, setShowHistory] = useState(false);
  const [selectedRate, setSelectedRate] = useState("");
  const [selectedType, setSelectedType] = useState("");


  const toggleHistoryModal = () => {
    setShowHistory(!showHistory);
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setSelectedRate(inputValue >= 0 ? inputValue : 0);
  };

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
      code: (channel && channel.code) || "",
      // logo: (channel && channel.logo) || "",
      name: (channel && channel.name) || "",
      description: (channel && channel.description) || "",
      definition: (channel && channel.isHD) || "",
      type: (channel && channel.isFta) || "",
      broadcaster: (channel && channel.broadcaster) || "",
      genre: (channel && channel.genre) || "",
      language: (channel && channel.language_lbl) || "",
      isalacarte: (channel && channel.isalacarte) || "",
      rate: (channel && channel.broadcasterRate) || "",
      status: (channel && channel.status) || "",
      // revenue: (channel && channel.revenue_share) || {},
    },
    validationSchema: Yup.object({
      code: Yup.string().required("Enter Channel Code"),
      // logo: Yup.string().required("upload logo"),
      name: Yup.string().required("Enter channel name"),
      // description: Yup.string().required("Enter description"),
      // definition: Yup.string().required("Enter channel definition"),
      // type: Yup.string().required("Enter channel type"),
      // broadcaster: Yup.string().required("select broadcaster"),
      // genre: Yup.string().required("Enter genre"),
      // language: Yup.string().required("Select language"),
      // isalacarte: Yup.string().required(""),
      // rate: Yup.string().required(""),
      status: Yup.string().required("Enter status"),
      // cas: Yup.string().required("Enter cas"),
      // cascode: Yup.string().required("cascode"),
      // serviceid: Yup.string().required("serviceid"),
    }),
    onSubmit: (values) => {
      const updateChannelList = {
        id: values.id,
        code: values.code,
        // logo: values.logo,
        name: values.name,
        description: values.description,
        definition: values.definition,
        // type: values.type,
        broadcaster: values.broadcaster,
        genre: values.genre,
        language: values.language,
        isalacarte: values.isalacarte,
        rate: values.rate,
        status: values.status,
        cas: values.cas,
        cascode: values.cascode,
        serviceid: values.serviceid,
        created_at: new Date(),
        created_by: values.created_by,
      };
      console.log("newChannelList:" + updateChannelList);
      // save new user
      dispatch(onUpdateChannelList(updateChannelList));
      validation.resetForm();
      toggleViewModal();
      resetSelection();
    },
    onReset: (values) => {
      validation.setValues(validation.initialValues);
    },
  });

  const handleCancel = () => {
    setShowEditChannel(false);
    resetSelection();
    toggleViewModal();
  };

  useEffect(() => {
    if (channel) {
      setRevenueData(channel.revenue_share);
    } else {
      setRevenueData({});
    }
  }, [channel]);

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
          channel={channel}
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
            ? `View ${(channel && channel.name) || ""}`
            : `Edit ${(channel && channel.name) || ""}`}
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

              <Col lg={2}>
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

              <Col lg={2}>
                <div className="form-check form-switch form-switch-lg mb-3">
                  NCF:
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
                    No / Yes
                  </label>
                </div>
              </Col>
            </Row>
            <Row>
              <Col lg={2}>
                <div className="mb-3">
                  <Label className="form-label">Logo</Label>
                  <Input
                    style={{
                      width: "170px",
                      height: "150px",
                      borderRadius: "10px",
                    }}
                    name="logo"
                    type="text"
                    disabled={!showEditChannel}
                    // placeholder="Enter channel code"
                    // className="form-select"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.logo || ""}
                  ></Input>
                  {validation.touched.logo && validation.errors.logo ? (
                    <FormFeedback type="invalid">
                      {validation.errors.logo}
                    </FormFeedback>
                  ) : null}
                  <button
                    type="button"
                    className="btn btn-primary "
                    style={{ marginTop: "10px" }}
                  >
                    Upload Logo
                  </button>
                </div>
                {/* <div className="mb-3">
                <img
                  src={`data:${logo.type};base64,${logo.data}`}
                  alt={logo.name}
                />
              </div> */}
              </Col>
              <Col lg={4}>
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
                {/* </Col>
            <Col lg={4}> */}
                <div className="mb-3">
                  <Label className="form-label">
                    Description<span style={{ color: "red" }}>*</span>
                  </Label>
                  <Input
                    name="description"
                    type="textarea"
                    placeholder="Enter Description"
                    disabled={!showEditChannel}
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

              <Col lg={4}>
                <div className="mb-3">
                  <Label className="form-label">
                    Definition<span style={{ color: "red" }}>*</span>
                  </Label>
                  <Input
                    name="definition"
                    type="select"
                    placeholder="Select Definition"
                    disabled={!showEditChannel}
                    className="form-select"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.definition || ""}
                  >
                    {channelListDefinition.map((definition) => (
                      <option key={definition.id} value={definition.id}>
                        {definition.name}
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
                {/* </Col>
            <Col sm="4"> */}
                <div className="mb-3">
                  <Label className="form-label">
                    Type<span style={{ color: "red" }}>*</span>
                  </Label>
                  <Input
                    name="type"
                    type="select"
                    placeholder="Select type"
                    className="form-select"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.channel_type_lbl || ""}
                    disabled={!showEditChannel}
                  >
                    {channelListType &&
                      channelListType.map((channel_type_lbl) => (
                        <option
                          key={channel_type_lbl.id}
                          value={channel_type_lbl.id}
                        >
                          {channel_type_lbl.name}
                        </option>
                      ))}
                  </Input>
                  {validation.touched.channel_type_lbl &&
                    validation.errors.channel_type_lbl ? (
                    <FormFeedback type="invalid">
                      {validation.errors.channel_type_lbl}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
            </Row>
            <Row>
              <Col sm="4">
                <div className="mb-3">
                  <Label className="form-label">
                    Broadcaster<span style={{ color: "red" }}>*</span>
                  </Label>
                  <Input
                    name="broadcaster"
                    type="select"
                    placeholder="Select broadcaster"
                    className="form-select"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.broadcaster || ""}
                    disabled={!showEditChannel}
                  >
                    {channelListBroadcaster.map((broadcaster) => (
                      <option key={broadcaster.id} value={broadcaster.id}>
                        {broadcaster.name}
                      </option>
                    ))}
                  </Input>
                  {validation.touched.broadcaster &&
                    validation.errors.broadcaster ? (
                    <FormFeedback type="invalid">
                      {validation.errors.broadcaster}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Col sm="4">
                <div className="mb-3">
                  <Label className="form-label">
                    Genre<span style={{ color: "red" }}>*</span>
                  </Label>
                  <Input
                    name="genre"
                    type="select"
                    placeholder="Select genre"
                    className="form-select"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.genre || ""}
                    disabled={!showEditChannel}
                  >
                    {channelListGenre.map((genre) => (
                      <option key={genre.id} value={genre.id}>
                        {genre.name}
                      </option>
                    ))}
                  </Input>
                  {validation.touched.genre && validation.errors.genre ? (
                    <FormFeedback type="invalid">
                      {validation.errors.genre}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
              {/* <Col sm="4">
                <div className="mb-3">
                  <Label className="form-label">
                    Language<span style={{ color: "red" }}>*</span>
                  </Label>
                  <Input
                    name="language"
                    type="text"
                    placeholder="Select language"
                    // className="form-select"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.language || ""}
                    disabled={!showEditChannel}
                  >
                    {channelListLanguage.map((language) => (
                      <option key={language.id} value={language.id}>
                        {language.name}
                      </option>
                    ))}
                  </Input>
                  {validation.touched.language && validation.errors.language ? (
                    <FormFeedback type="invalid">
                      {validation.errors.language}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col> */}
              <Col sm="4">
                <div className="mb-3">
                  <Label className="form-label">Language<span style={{ color: "red" }}>*</span></Label>
                  <Select
                    name="language"
                    placeholder="Select at least one Reason Type"
                    onChange={(selectedOptions) => {
                      validation.setFieldValue(
                        "language",
                        selectedOptions
                      );
                    }}
                    onBlur={validation.handleBlur}
                    value={validation.values.language}
                    options={channelListLanguage.map((language) => ({
                      value: language.name,
                      label: language.name,
                    }))}
                    isMulti
                    isDisabled={!showEditChannel}
                  />
                </div>
                {validation.touched.language &&
                  validation.errors.language ? (
                  <FormFeedback type="invalid">
                    {validation.errors.language}
                  </FormFeedback>
                ) : null}
                {/* </div> */}
              </Col>
              <Col sm="4">
                <div className="mb-3">
                  <Label className="form-label">IsAlacarte</Label>
                  <Input
                    name="isalacarte"
                    type="select"
                    // placeholder="Enter channel code"
                    // className="form-select"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.isalacarte || ""}
                    disabled={!showEditChannel}
                  >
                    <option value="201">Yes</option>
                    <option value="202">No</option>
                  </Input>
                  {validation.touched.isalacarte &&
                    validation.errors.isalacarte ? (
                    <FormFeedback type="invalid">
                      {validation.errors.isalacarte}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Col sm="4">
                <div className="mb-3">
                  <Label className="form-label">MRP Rate(INR)</Label>
                  <Input
                    name="rate"
                    type="number"
                    step="0.01"
                    // placeholder="Enter channel code"
                    // className="form-select"
                    // onChange={validation.handleChange}
                    // onBlur={validation.handleBlur}
                    // value={validation.values.rate || ""}
                    onChange={handleInputChange}
                    onKeyDown={handleArrowKeyPress}
                    placeholder="0"
                    disabled={!showEditChannel || selectedType === "1"}
                    value={selectedRate}
                  // disabled={!showEditChannel}
                  ></Input>
                  {validation.touched.rate && validation.errors.rate ? (
                    <FormFeedback type="invalid">
                      {validation.errors.rate}
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
                    disabled={!showEditChannel}
                  >
                    {channelListStatus.map((status) => (
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
              <Col lg={6}>
                <ViewRevenueShare
                  broadPercent={broadPercent}
                  msoPercent={msoPercent}
                  discountPercent={discountPercent}
                  setBroadPercent={setBroadPercent}
                  setMsoPercent={setMsoPercent}
                  setDiscountPercent={setDiscountPercent}
                  showEditChannel={showEditChannel}
                />
              </Col>
              {/* {console.log(
              "XXXXXXXX:" + channel.isFta,
              channel.broadcasterRate,
              channel.mso_discount
            )}
            {console.log(
              "XXXTYPE:" + typeof channel.isFta,
              typeof parseInt(channel.broadcasterRate)
            )} */}
              {/* {channel &&
                channel.isFta === 0 &&
                parseInt(channel.broadcasterRate) !== "" ? (
                <Col lg={6}>
                  <Card>
                    <CardBody>
                      <span>Graphical representation of SHARE</span>
                      <CardTitle className="mb-4">
                        (MRP: {channel.broadcasterRate}){" "}
                      </CardTitle>
                      <ViewPieChart
                        broadPercent={broadPercent}
                        msoPercent={msoPercent}
                        discountPercent={discountPercent}
                        selectedRate={parseInt(channel.broadcasterRate)}
                        dataColors='["--bs-success","--bs-primary", "--bs-danger","--bs-info", "--bs-warning"]'
                      />
                    </CardBody>
                  </Card>
                </Col>
              ) : (
                <></>
              )} */}
              {/* {channel &&
                channel.isFta === 0 &&
                parseInt(channel.broadcasterRate) !== "" ? (
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
              )} */}
              {channel &&
                channel.isFta === 0 &&
                parseInt(channel.broadcasterRate) !== "" ? (
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
              <h5>CAS LIST</h5>
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
                  showEditChannel={showEditChannel}
                  data={channel && channel.casCodes}
                />
              </Col>
            </Row>
            {console.log("" + showEditChannel)}
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

ViewChannel.propTypes = {
  toggleViewModal: PropTypes.func,
  resetSelection: PropTypes.func,
  isOpen: PropTypes.bool,
  channel: PropTypes.object,
  channelListBroadcaster: PropTypes.array,
  channelListDefinition: PropTypes.array,
  channelListGenre: PropTypes.array,
  channelListLanguage: PropTypes.array,
  channelListStatus: PropTypes.array,
  channelListType: PropTypes.array,
};

export default ViewChannel;
