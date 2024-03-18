import React, { useEffect, useState, useRef, useMemo } from "react";
import PropTypes from "prop-types";
import "flatpickr/dist/themes/material_blue.css";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import moment from "moment";
import { Link } from "react-router-dom";
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
import * as Yup from "yup";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import {
  getOSDConfiguration as onGetOSDConfiguration,
  updateOSDConfiguration as onUpdateOSDConfiguration,
} from "/src/store/OSDConfiguration/actions";
import ShowHistoryModal from "./ShowHistoryModal";

const ViewNSTVList = (props) => {
  const {
    isOpen,
    toggle,
    resetSelection,
    osdConfiguration,
    osdConfigBackgroundArea,
    osdConfigBackgroundColor,
    osdConfigDisplay,
    osdConfigEnable,
    osdConfigFontColor,
    osdConfigFontSize,
    osdConfigForcedDisplay,
    osdConfigStatus,
  } = props;
  //   console.log("user in viewuser modal:" + JSON.stringify(user));
  const dispatch = useDispatch();
  const [showEditosdConfiguration, setShowosdConfiguration] = useState(false);

  const [showHistory, setShowHistory] = useState(false);

  const toggleHistoryModal = () => {
    setShowHistory(!showHistory);
  };

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      id: (osdConfiguration && osdConfiguration.id) || "",
      name: (osdConfiguration && osdConfiguration.name) || "",
      status: (osdConfiguration && osdConfiguration.status) || "",
      start_time: (osdConfiguration && osdConfiguration.start_time) || "",
      cas_code: (osdConfiguration && osdConfiguration.cas_code) || "",
      end_time: (osdConfiguration && osdConfiguration.end_time) || "",
      enable:
        (osdConfiguration &&
          osdConfiguration.config &&
          osdConfiguration.config.enable) ||
        "",
      forceddisplay:
        (osdConfiguration &&
          osdConfiguration.config &&
          osdConfiguration.config.forceddisplay) ||
        "",
      displaytype:
        (osdConfiguration &&
          osdConfiguration.config &&
          osdConfiguration.config.displaytype) ||
        "",
      duration:
        (osdConfiguration &&
          osdConfiguration.config &&
          osdConfiguration.config.duration) ||
        "",
      interval:
        (osdConfiguration &&
          osdConfiguration.config &&
          osdConfiguration.config.interval) ||
        "",
      repetition:
        (osdConfiguration &&
          osdConfiguration.config &&
          osdConfiguration.config.repetition) ||
        "",
      fontSize:
        (osdConfiguration &&
          osdConfiguration.config &&
          osdConfiguration.config.fontSize) ||
        "",
      fontcolor:
        (osdConfiguration &&
          osdConfiguration.config &&
          osdConfiguration.config.fontcolor) ||
        "",
      backgroundColor:
        (osdConfiguration &&
          osdConfiguration.config &&
          osdConfiguration.config.backgroundColor) ||
        "",
      backgroundarea:
        (osdConfiguration &&
          osdConfiguration.config &&
          osdConfiguration.config.backgroundarea) ||
        "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Enter conf name"),
      //   status_lbl: Yup.string().required(""),
      //   start_time: Yup.string().required(""),
      //   end_time: Yup.string().required(""),
      //   enable: Yup.string().required(""),
      //   forced: Yup.string().required(""),
      //   type: Yup.string().required(""),
      //   duration: Yup.string().required(""),
      //   interval: Yup.string().required(""),
      //   repetition: Yup.string().required(""),
      //   fontsize: Yup.string().required(""),
      //   fontcolor: Yup.string().required(""),
      //   backgroundcolor: Yup.string().required(""),
      //   backgroundarea: Yup.string().required(""),
    }),
    onSubmit: (values) => {
      const updateNSTV = {
        id: osdConfiguration.id,
        name: values["name"],
        status: parseInt(values["status"]),
        start_time: values["start_time"],
        end_time: values["end_time"],
        cas_code: values["cas_code"],
        config: {
          enable: values["enable"],
          forceddisplay: parseInt(values["forceddisplay"]),
          displaytype: parseInt(values["displaytype"]),
          duration: parseInt(values["duration"]),
          interval: parseInt(values["interval"]),
          repetition: parseInt(values["repetition"]),
          fontSize: parseInt(values["fontSize"]),
          fontcolor: parseInt(values["fontcolor"]),
          backgroundarea: parseInt(values["backgroundarea"]),
          backgroundColor: parseInt(values["backgroundColor"]),
        },
      };
      // update user
      dispatch(onUpdateOSDConfiguration(updateNSTV));
      dispatch(onGetOSDConfiguration());
      validation.resetForm();
      toggle();
    },
  });

  const [rangeValue, setRangeValue] = useState(1);

  const handleCancel = () => {
    setShowosdConfiguration(false);
    toggle();
    resetSelection();
  };

  return (
    <>
      {showHistory && (
        <ShowHistoryModal
          isOpen={showHistory}
          toggleHistoryModal={toggleHistoryModal}
          osdConfiguration={osdConfiguration}
        />
      )}
      <Modal
        isOpen={isOpen}
        role="dialog"
        size="xl"
        autoFocus={true}
        centered={true}
        className="exampleModal"
        tabIndex="-1"
        toggle={handleCancel}
      >
        <ModalHeader toggle={handleCancel} tag="h4">
          {!showEditosdConfiguration
            ? `View ${(osdConfiguration && osdConfiguration.name) || ""}`
            : `Edit ${(osdConfiguration && osdConfiguration.name) || ""}`}
        </ModalHeader>
        {!showEditosdConfiguration && (
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
              onClick={() => setShowosdConfiguration(true)}
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
                    disabled={!showEditosdConfiguration}
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
              {/* {console.log("Name:", validation.values.name)} */}
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
                    disabled={!showEditosdConfiguration}
                  >
                    {/* <option value="">Select Status</option> */}
                    {osdConfigStatus &&
                      osdConfigStatus.map((status) => (
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
              {/* {console.log("Status:", validation.values.status)} */}
              <Col sm="4">
                <div className="form-group mb-0">
                  <label>Start Time</label>
                  <div className="input-group">
                    <Flatpickr
                      className="form-control d-block"
                      placeholder="Select time"
                      options={{
                        enableTime: true,
                        noCalendar: true,
                        dateFormat: "H:i:S",
                        time_24hr: true,
                      }}
                      onChange={(selectedDates) => {
                        const startTime = moment(selectedDates[0]).format(
                          "HH:mm:ss"
                        );
                        validation.setFieldValue("start_time", startTime); // Update the field value
                      }}
                      onBlur={validation.handleBlur}
                      value={validation.values.start_time || ""}
                      name="start_time"
                      disabled={!showEditosdConfiguration}
                    />
                    <div className="input-group-append">
                      <span className="input-group-text">
                        <i className="mdi mdi-clock-outline" />
                      </span>
                    </div>
                  </div>
                </div>

                {/* <div className="mb-3">
                <Label className="form-label">
                  Start Time<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="start_time"
                  type="time"
                  // placeholder="Enter channel code"
                  // className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.start_time || ""}
                ></Input>
                {validation.touched.start_time &&
                validation.errors.start_time ? (
                  <FormFeedback type="invalid">
                    {validation.errors.start_time}
                  </FormFeedback>
                ) : null}
              </div> */}
              </Col>
              {/* {console.log("Start time:", validation.values.start_time)} */}
              <Col sm="4">
                <div className="form-group mb-0">
                  <label>End Time</label>
                  <div className="input-group">
                    <Flatpickr
                      className="form-control d-block"
                      placeholder="Select time"
                      options={{
                        enableTime: true,
                        noCalendar: true,
                        dateFormat: "H:i:S",
                        time_24hr: true,
                      }}
                      onChange={(selectedDates) => {
                        const endTime = moment(selectedDates[0]).format(
                          "HH:mm:ss"
                        );
                        validation.setFieldValue("end_time", endTime); // Update the field value
                      }}
                      onBlur={validation.handleBlur}
                      value={validation.values.end_time || ""}
                      name="end_time"
                      disabled={!showEditosdConfiguration}
                    />
                    <div className="input-group-append">
                      <span className="input-group-text">
                        <i className="mdi mdi-clock-outline" />
                      </span>
                    </div>
                  </div>
                </div>
                {/* <div className="mb-3">
                <Label className="form-label">
                  End Time<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="end_time"
                  type="time"
                  // placeholder="Enter name"
                  // className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.end_time || ""}
                ></Input>
                {validation.touched.end_time && validation.errors.end_time ? (
                  <FormFeedback type="invalid">
                    {validation.errors.end_time}
                  </FormFeedback>
                ) : null}
              </div> */}
              </Col>
              {console.log("endeeeeeeeeeee time", validation.values.end_time)}
              {console.log("startsssssssss time", validation.values.start_time)}
              <Col sm="4">
                <div className="mb-3">
                  <Label className="form-label">
                    Enable<span style={{ color: "red" }}>*</span>
                  </Label>
                  <Input
                    name="enable"
                    type="select"
                    placeholder="Send OSD"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.enable || ""}
                    disabled={!showEditosdConfiguration}
                  >
                    {/* <option value=""></option> */}
                    {osdConfigEnable &&
                      osdConfigEnable.map((enable) => (
                        <option key={enable.id} value={enable.id}>
                          {enable.name}
                        </option>
                      ))}
                  </Input>
                  {validation.touched.enable && validation.errors.enable ? (
                    <FormFeedback type="invalid">
                      {validation.errors.enable}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
              {/* {console.log("Enable:", validation.values.enable)} */}
              <div>
                {validation.values.enable === "00" && (
                  <Row>
                    <Col sm="4">
                      <div className="mb-3">
                        <Label className="form-label">
                          Forced Display<span style={{ color: "red" }}>*</span>
                        </Label>
                        <Input
                          name="forceddisplay"
                          type="select"
                          placeholder="Select forced display"
                          className="form-select"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.forceddisplay || ""}
                          disabled={!showEditosdConfiguration}
                        >
                          {/* <option value="">Select forced display</option> */}
                          {osdConfigForcedDisplay &&
                            osdConfigForcedDisplay.map((forceddisplay) => (
                              <option
                                key={forceddisplay.id}
                                value={forceddisplay.id}
                              >
                                {forceddisplay.name}
                              </option>
                            ))}
                        </Input>
                        {validation.touched.forceddisplay &&
                          validation.errors.forceddisplay ? (
                          <FormFeedback type="invalid">
                            {validation.errors.forceddisplay}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </Col>

                    {/* {console.log("ForcedDisplay:", validation.values.forceddisplay)}
                        {console.log("forced display: " + validation.values.forceddisplay)}
                        {console.log(
                            "forced display: " + typeof validation.values.forceddisplay)} */}
                    <Col sm="4">
                      <div className="mb-3">
                        <Label className="form-label">
                          Display Type<span style={{ color: "red" }}>*</span>
                        </Label>
                        <Input
                          name="displaytype"
                          type="select"
                          placeholder="Select display type"
                          className="form-select"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.displaytype || ""}
                          disabled={!showEditosdConfiguration}
                        >
                          {/* <option value="">Select Display Type</option> */}
                          {osdConfigDisplay &&
                            osdConfigDisplay.map((displaytype) => (
                              <option
                                key={displaytype.id}
                                value={displaytype.id}
                              >
                                {displaytype.name}
                              </option>
                            ))}
                        </Input>
                        {validation.touched.displaytype &&
                          validation.errors.displaytype ? (
                          <FormFeedback type="invalid">
                            {validation.errors.displaytype}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </Col>
                    {/* {console.log("Display Type:", validation.values.displaytype)} */}

                    <Col sm="4">
                      <div className="mb-3">
                        <Label className="form-label">Duration</Label>
                        <Input
                          name="duration"
                          type="number"
                          placeholder="1"
                          // className="form-select"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.duration || ""}
                          disabled={!showEditosdConfiguration}
                        ></Input>
                        {validation.touched.duration &&
                          validation.errors.duration ? (
                          <FormFeedback type="invalid">
                            {validation.errors.duration}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </Col>
                    {/* {console.log("Duration:", validation.values.duration)} */}
                    <Col sm="4">
                      <div className="mb-3">
                        <Label className="form-label">
                          Interval (in seconds) (should be greater than
                          duration)
                        </Label>
                        <Input
                          name="interval"
                          type="number"
                          placeholder="1"
                          // className="form-select"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.interval || ""}
                          disabled={!showEditosdConfiguration}
                        ></Input>
                        {validation.touched.interval &&
                          validation.errors.interval ? (
                          <FormFeedback type="invalid">
                            {validation.errors.interval}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </Col>
                    {/* {console.log("Interval:", validation.values.interval)} */}
                    <Col sm="4">
                      <div>
                        <Label htmlFor="customRange1" className="form-label">
                          Repetition
                        </Label>
                        <Input
                          type="range"
                          className="form-range"
                          id="customRange1"
                          name="repetition"
                          value={rangeValue}
                          onChange={(event) => {
                            setRangeValue(parseInt(event.target.value));
                            validation.handleChange(event); // Update Formik state
                          }}
                          onBlur={validation.handleBlur} // Handle onBlur event
                          min={1}
                          max={10}
                          style={{
                            width: "100%",
                            height: "100%",
                            border: `solid 3px ${rangeValue === validation.values.repetition
                              ? "green"
                              : "blue"
                              }`,
                            cursor: "pointer",
                            borderRadius: "5px",
                          }}
                          disabled={!showEditosdConfiguration}
                        />
                        <div style={{ marginTop: "10px" }}>
                          Value: {rangeValue}
                        </div>
                        <div>
                          {validation.touched.repetition &&
                            validation.errors.repetition ? (
                            <FormFeedback type="invalid">
                              {validation.errors.repetition}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </div>
                    </Col>

                    {console.log(
                      "Repetition value:RRRRRRRRRR",
                      validation.values.repetition
                    )}

                    <Col sm="4">
                      <div className="mb-3">
                        <Label className="form-label">
                          Font Size<span style={{ color: "red" }}>*</span>
                        </Label>
                        <Input
                          name="fontSize"
                          type="select"
                          placeholder="Select font size"
                          className="form-select"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.fontSize || ""}
                          disabled={!showEditosdConfiguration}
                        >
                          {/* <option value="">Select Font Size</option> */}
                          {osdConfigFontSize &&
                            osdConfigFontSize.map((fontSize) => (
                              <option key={fontSize.id} value={fontSize.id}>
                                {fontSize.name}
                              </option>
                            ))}
                        </Input>
                        {validation.touched.fontSize &&
                          validation.errors.fontSize ? (
                          <FormFeedback type="invalid">
                            {validation.errors.fontSize}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </Col>
                    {/* {console.log("Font Size:", validation.values.fontSize)}
                        {console.log("font size: " + validation.values.fontSize)}
                        {console.log(
                            "font size: " + typeof validation.values.fontSize
                        )} */}
                    <Col sm="4">
                      <div className="mb-3">
                        <Label className="form-label">
                          Font Color<span style={{ color: "red" }}>*</span>
                        </Label>
                        <Input
                          name="fontcolor"
                          type="select"
                          placeholder="Select font color"
                          className="form-select"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.fontcolor || ""}
                          disabled={!showEditosdConfiguration}
                        >
                          {/* <option value="">Select Font Color</option> */}
                          {osdConfigFontColor &&
                            osdConfigFontColor.map((fontcolor) => (
                              <option key={fontcolor.id} value={fontcolor.id}>
                                {fontcolor.name}
                              </option>
                            ))}
                        </Input>
                        {validation.touched.fontcolor &&
                          validation.errors.fontcolor ? (
                          <FormFeedback type="invalid">
                            {validation.errors.fontcolor}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </Col>
                    {/* {console.log("Font Color:", validation.values.fontcolor)}
                        {console.log("font color: " + validation.values.fontcolor)}
                        {console.log(
                            "font color: " + typeof validation.values.fontcolor
                        )} */}

                    <Col sm="4">
                      <div className="mb-3">
                        <Label className="form-label">
                          Background Color
                          <span style={{ color: "red" }}>*</span>
                        </Label>
                        <Input
                          name="backgroundColor"
                          type="select"
                          placeholder="Select background color"
                          className="form-select"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.backgroundColor || ""}
                          disabled={!showEditosdConfiguration}
                        >
                          {/* <option value="">Select back color</option> */}
                          {osdConfigBackgroundColor &&
                            osdConfigBackgroundColor.map((backgroundColor) => (
                              <option
                                key={backgroundColor.id}
                                value={backgroundColor.id}
                              >
                                {backgroundColor.name}
                              </option>
                            ))}
                        </Input>
                        {validation.touched.backgroundColor &&
                          validation.errors.backgroundColor ? (
                          <FormFeedback type="invalid">
                            {validation.errors.backgroundColor}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </Col>
                    {/* {console.log("Background Color:", validation.values.backgroundColor)}
                        {console.log("back color: " + validation.values.backgroundColor)}
                        {console.log(
                            "back color type: " + typeof validation.values.backgroundColor
                        )} */}
                    <Col sm="4">
                      <div className="mb-3">
                        <Label className="form-label">
                          Background Area<span style={{ color: "red" }}>*</span>
                        </Label>
                        <Input
                          name="backgroundarea"
                          type="select"
                          placeholder="backgroundarea"
                          className="form-select"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.backgroundarea || ""}
                          disabled={!showEditosdConfiguration}
                        >
                          {/* <option value="">Select background area</option> */}
                          {osdConfigBackgroundArea &&
                            osdConfigBackgroundArea.map((backgroundarea) => (
                              <option
                                key={backgroundarea.id}
                                value={backgroundarea.id}
                              >
                                {backgroundarea.name}
                              </option>
                            ))}
                        </Input>
                        {validation.touched.backgroundarea &&
                          validation.errors.backgroundarea ? (
                          <FormFeedback type="invalid">
                            {validation.errors.backgroundarea}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </Col>
                    {/* {console.log("Background Area:", validation.values.backgroundarea)}
                        {console.log("background area: " + validation.values.backgroundarea)}
                        {console.log(
                            "background area: " + typeof validation.values.backgroundarea
                        )} */}
                  </Row>
                )}
              </div>
            </Row>
            {showEditosdConfiguration && (
              <Row>
                <Col>
                  <ModalFooter>
                    <button type="submit" className="btn btn-success save-user">
                      Save
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
        {/* </Modal> */}
      </Modal>
    </>
  );
};

ViewNSTVList.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default ViewNSTVList;
