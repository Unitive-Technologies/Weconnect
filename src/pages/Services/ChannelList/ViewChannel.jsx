import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
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
import ShowHistoryModal from "./ShowHistoryModal";
import PieChart from "./PieChart";
import RevenueShare from "./RevenueShare";

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
  const [revenueData, setRevenueData] = useState({});
  const [broadPercent, setBroadPercent] = useState();
  const [msoPercent, setMsoPercent] = useState();
  const [discountPercent, setDiscountPercent] = useState();
  const [showHistory, setShowHistory] = useState(false);
  const [selectedRate, setSelectedRate] = useState();
  const [selectedType, setSelectedType] = useState("");
  const [toggleNcfSwitch, setToggleNcfSwitch] = useState(true);
  const [casCodeList, setCasCodeList] = useState([]);
  const [selectedAlcarte, setSelectedAlcarte] = useState();

  console.log("Selected channel list: ", channel);
  useEffect(() => {
    if (channel && channel.broadcasterRate !== undefined) {
      setSelectedRate(channel.broadcasterRate);
      setCasCodeList(channel.casCodes);
      setSelectedType(channel.isFta);
      setSelectedAlcarte(channel.isAlacarte);
    }
  }, [channel]);
  console.log("channel list type: ", channelListType);

  useEffect(() => {
    if (channel && channel.revenue_share !== undefined) {
      setMsoPercent(channel.revenue_share.mso_share);
      setDiscountPercent(channel.revenue_share.mso_discount);
      setBroadPercent(channel.revenue_share.broadcaster_share);
    }
  }, [channel]);

  const handleChangeLogo = (e) => {
    const file = e.target.files[0];
    if (file) {
      const { name, type } = file;
      const ext = name.split(".").pop();
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const data = reader.result;

        validation.setFieldValue("logo", {
          name,
          type,
          ext,
          data,
        });
      };
    }
  };

  const toggleHistoryModal = () => {
    setShowHistory(!showHistory);
  };

  const handleInputChange = (e) => {
    const inputValue = parseFloat(e.target.value);
    setSelectedRate(isNaN(inputValue) ? 0 : inputValue);
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

  const handleCancel = () => {
    toggleViewModal();
    setShowEditChannel(false);
    resetSelection();
  };

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      id: (channel && channel.id) || "",
      code: (channel && channel.code) || "",
      logo: (channel && channel.logo) || "",
      name: (channel && channel.name) || "",
      description: (channel && channel.description) || "",
      definition: (channel && channel.isHD) || "",
      broadcaster_id: (channel && channel.broadcaster_id) || "",
      genre_id: (channel && channel.genre_id) || "",
      language_id: (channel && channel.language_id) || [],
      isAlacarte: (channel && channel.isAlacarte) || "",
      broadcasterRate: (channel && channel.broadcasterRate) || "",
      status: (channel && channel.status) || "",
      casCodes: (channel && channel.casCodes) || [],
      revenue_share: (channel && channel.revenue_share) || {},
      isFta: (channel && channel.isFta) || "",
      isNcf: (channel && channel.isNcf) || "",
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
      console.log("broadPercent:", broadPercent);
      console.log("msoPercent:", msoPercent);
      console.log("discountPercent:", discountPercent);
      const updateChannelList = {
        id: values.id,
        code: values.code,
        logo: values.logo,
        name: values.name,
        description: values.description,
        broadcaster_id: values.broadcaster_id,
        genre_id: values.genre_id,
        language_id: values.language_id,
        isAlacarte: parseInt(selectedAlcarte),
        broadcasterRate: selectedRate,
        status: values.status,
        casCodes: casCodeList.map((single) => {
          return {
            cas_id: single.cas_id,
            cascode: single.cascode,
            serviceid: single.serviceid,
          };
        }),
        serviceid: values.serviceid,
        created_at: new Date(),
        created_by: values.created_by,
        revenue_share: {
          mso_share: msoPercent,
          mso_discount: discountPercent,
          broadcaster_share: broadPercent,
        },
        isFta: parseInt(selectedType),
        isHD: parseInt(values["definition"]),
        isNcf: toggleNcfSwitch === true ? 1 : 0,
      };
      console.log("newChannelList:" + JSON.stringify(updateChannelList));
      dispatch(onUpdateChannelList(updateChannelList));
      validation.resetForm();
      handleCancel();
      resetSelection();
    },
    onReset: (values) => {
      validation.setValues(validation.initialValues);
    },
  });

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
              <Col sm="3">
                <div className="mb-3">
                  <Label className="form-label">
                    NCF
                    <i className="mdi mdi-information"></i>
                  </Label>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <label style={{ marginRight: "10px" }}>No</label>
                    <div className="form-check form-switch form-switch-lg mb-2">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="customSwitchsizelg"
                        defaultChecked
                        onClick={(e) => {
                          setToggleNcfSwitch(!toggleNcfSwitch);
                        }}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="customSwitchsizelg"
                      >
                        Yes
                      </label>
                    </div>
                  </div>
                  {validation.touched.ifFixNCF && validation.errors.ifFixNCF ? (
                    <FormFeedback type="invalid">
                      {validation.errors.ifFixNCF}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
            </Row>
            <Row>
              <Col lg={2}>
                <div className="mb-3">
                  <Label className="form-label">Logo</Label>
                  <input
                    style={{
                      width: "170px",
                      height: "150px",
                      borderRadius: "10px",
                    }}
                    name="logo"
                    type="file"
                    onChange={handleChangeLogo}
                  ></input>
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
                <div className="mb-3">
                  <Label className="form-label">
                    Type<span style={{ color: "red" }}>*</span>
                  </Label>
                  <Input
                    name="isFta"
                    type="select"
                    placeholder="Select type"
                    className="form-select"
                    onChange={(e) => {
                      validation.handleChange(e);
                      setSelectedType(e.target.value);
                    }}
                    onBlur={validation.handleBlur}
                    value={selectedType}
                    disabled={!showEditChannel}
                  >
                    {channelListType &&
                      channelListType.map((list) => (
                        <option key={list.id} value={list.id}>
                          {list.name}
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
            </Row>
            <Row>
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
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.broadcaster_id || ""}
                    disabled={!showEditChannel}
                  >
                    {channelListBroadcaster.map((list) => (
                      <option key={list.id} value={list.id}>
                        {list.name}
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
                    Genre<span style={{ color: "red" }}>*</span>
                  </Label>
                  <Input
                    name="genre_id"
                    type="select"
                    placeholder="Select genre"
                    className="form-select"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.genre_id || ""}
                    disabled={!showEditChannel}
                  >
                    {channelListGenre.map((list) => (
                      <option key={list.id} value={list.id}>
                        {list.name}
                      </option>
                    ))}
                  </Input>
                  {validation.touched.genre_id && validation.errors.genre_id ? (
                    <FormFeedback type="invalid">
                      {validation.errors.genre_id}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Col sm="4">
                <div className="mb-3">
                  <Label className="form-label">
                    Language<span style={{ color: "red" }}>*</span>
                  </Label>
                  <Select
                    name="language_id"
                    placeholder="Select at least one Reason Type"
                    onChange={(selectedOptions) => {
                      validation.setFieldValue(
                        "language_id",
                        selectedOptions
                          ? selectedOptions.map((option) => option.value)
                          : []
                      );
                    }}
                    onBlur={validation.handleBlur}
                    value={
                      Array.isArray(validation.values.language_id)
                        ? validation.values.language_id.map((id) => ({
                            value: id,
                            label: channelListLanguage.find(
                              (language) => language.id === id
                            )?.name,
                          }))
                        : [
                            {
                              value: validation.values.language_id,
                              label: channelListLanguage.find(
                                (language) =>
                                  language.id === validation.values.language_id
                              )?.name,
                            },
                          ]
                    }
                    options={channelListLanguage.map((language) => ({
                      value: language.id,
                      label: language.name,
                    }))}
                    isMulti
                    isDisabled={!showEditChannel}
                    styles={{
                      menu: (provided) => ({ ...provided, maxHeight: "300px" }),
                      menuList: (provided) => ({
                        ...provided,
                        maxHeight: "300px",
                      }),
                    }}
                  />
                </div>
                {validation.touched.language_id &&
                validation.errors.language_id ? (
                  <FormFeedback type="invalid">
                    {validation.errors.language_id}
                  </FormFeedback>
                ) : null}
              </Col>
              <Col sm="4">
                <div className="mb-3">
                  <Label className="form-label">IsAlacarte</Label>
                  <Input
                    name="isAlacarte"
                    type="select"
                    onChange={(e) => {
                      validation.handleChange(e);
                      setSelectedAlcarte(e.target.value);
                    }}
                    onBlur={validation.handleBlur}
                    value={selectedAlcarte}
                    disabled={!showEditChannel}
                  >
                    <option value="1">Yes</option>
                    <option value="0">No</option>
                  </Input>
                  {validation.touched.isAlacarte &&
                  validation.errors.isAlacarte ? (
                    <FormFeedback type="invalid">
                      {validation.errors.isAlacarte}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Col sm="4">
                <div className="mb-3">
                  <Label className="form-label">MRP Rate(INR)</Label>
                  <Input
                    name="broadcasterRate"
                    type="number"
                    step="0.01"
                    onChange={handleInputChange}
                    onKeyDown={handleArrowKeyPress}
                    placeholder="0"
                    disabled={
                      !showEditChannel ||
                      selectedType === 1 ||
                      selectedAlcarte === 0
                    }
                    value={selectedRate}
                    onBlur={validation.handleBlur}
                  ></Input>
                  {validation.touched.broadcasterRate &&
                  validation.errors.broadcasterRate ? (
                    <FormFeedback type="invalid">
                      {validation.errors.broadcasterRate}
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
                    {channelListStatus.map((list) => (
                      <option key={list.id} value={list.id}>
                        {list.name}
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
            {channel &&
            selectedType === 0 &&
            selectedAlcarte === 1 &&
            selectedRate !== "" ? (
              <>
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
                    <RevenueShare
                      broadPercent={broadPercent}
                      msoPercent={msoPercent}
                      discountPercent={discountPercent}
                      setBroadPercent={setBroadPercent}
                      setMsoPercent={setMsoPercent}
                      setDiscountPercent={setDiscountPercent}
                      showEditChannel={showEditChannel}
                    />
                  </Col>
                  <Col lg={6}>
                    <Card>
                      <CardBody>
                        <span>Graphical representation of SHARE</span>
                        <CardTitle className="mb-4">
                          (MRP: {selectedRate}){" "}
                        </CardTitle>
                        <PieChart
                          broadPercent={broadPercent}
                          msoPercent={msoPercent}
                          discountPercent={discountPercent}
                          selectedRate={selectedRate}
                          dataColors='["--bs-success","--bs-primary", "--bs-danger","--bs-info", "--bs-warning"]'
                        />
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </>
            ) : (
              <></>
            )}
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
                  data={casCodeList}
                  channelListCascode={channelListCascode}
                  updateList={setCasCodeList}
                />
              </Col>
            </Row>
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
