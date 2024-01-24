import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import RevenueShare from "./RevenueShare";
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
import { updateChannelList as onUpdateChannelList, addNewChannelList as onAddNewChannelList } from "/src/store/channel/actions";
import { useDispatch } from "react-redux";
import CasList from "./CasList";

const ViewChannel = (props) => {
  const { isOpen, resetSelection, toggleViewModal, channel, channelListBroadcaster, channelListStatus, channelListType, channelListDefinition, channelListGenre, channelListCascode, channelListLanguage } = props;
  const dispatch = useDispatch();
  const [showEditChannel, setShowEditChannel] = useState(false);
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      //BroadCaster: "",
      code: "",
      logo: "",
      name: "",
      description: "",
      definition: "",
      type: "",
      broadcaster: "",
      genre: "",
      language: "",
      isalacarte: "",
      rate: "",
      status: "",
      cas: "",
      cascode: "",
      serviceid: "",
      created_by: "Admin",
    },
    validationSchema: Yup.object({
      code: Yup.string().required("Enter Channel Code"),
      logo: Yup.string().required("upload logo"),
      name: Yup.string().required("Enter channel name"),
      description: Yup.string().required("Enter description"),
      definition: Yup.string().required("Enter channel definition"),
      type: Yup.string().required("Enter channel type"),
      broadcaster: Yup.string().required("select broadcaster"),
      genre: Yup.string().required("Enter genre"),
      language: Yup.string().required("Select language"),
      isalacarte: Yup.string().required(""),
      rate: Yup.string().required(""),
      status: Yup.string().required("Enter status"),
      cas: Yup.string().required("Enter cas"),
      cascode: Yup.string().required("cascode"),
      serviceid: Yup.string().required("serviceid"),
    }),
    onSubmit: (values) => {
      const updateChannelList = {
        id: values["id"],
        code: values["code"],
        logo: values["logo"],
        name: values[" name"],
        description: values["description"],
        definition: values["definition"],
        type: values["type"],
        broadcaster: values["broadcaster"],
        genre: values["genre"],
        language: values["language"],
        isalacarte: values["isalacarte"],
        rate: values["rate"],
        status: values["status"],
        cas: values["cas"],
        cascode: values["cascode"],
        serviceid: values["serviceid"],
        created_at: new Date(),
        created_by: values["created_by"],
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
          ? `View ${(channel && channel.name) || ""}`
          : `Edit ${(channel && channel.name) || ""}`}
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
                  value={validation.values.type || ""}
                  disabled={!showEditChannel}
                >
                  {channelListType.map((type) => (
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
            <Col sm="4">
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
                  // placeholder="Enter channel code"
                  // className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.rate || ""}
                  disabled={!showEditChannel}
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
            <Col sm="12">
              <RevenueShare />
            </Col>
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
              <CasList showEditChannel={showEditChannel} />
            </Col>
          </Row>
          {!showEditChannel && (
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
