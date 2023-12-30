import React, { useState } from "react";
import PropTypes from "prop-types";
import { SketchPicker } from "react-color";
import {
  Col,
  Row,
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Label,
  FormFeedback,
  Input,
  Form,
} from "reactstrap";
import * as Yup from "yup";
import { optionsList } from "./optionsList";
import { useFormik } from "formik";
import { addNewNotificationTemplate as onAddNewNotificationTemplate } from "/src/store/notificationtemplate/actions";
import { useDispatch } from "react-redux";
import {
  getNotificationTemplate as onGetNotificationTemplate,
} from "/src/store/actions";


const AddNotificationTemplateModal = (props) => {
  const { isOpen, handleAddNotificationTemplate, noTemplateType, noTemplateStatus, noTemplateSize, noTemplateFamily } = props;
  const dispatch = useDispatch();
  const FontSize = Array.from({ length: 93 }, (_, index) => index + 8);

  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showColorPicker1, setShowColorPicker1] = useState(false);
  const toggleColorPicker = () => {
    setShowColorPicker(!showColorPicker);
  };
  const toggleColorPicker1 = () => {
    setShowColorPicker1(!showColorPicker1);
  };
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      msg_head: "",
      msg_content: "",
      msg_type: "",
      msg_fontsize: "",
      msg_fontcolor: "#000000",
      msg_fontbgcolor: "#000000",
      msg_fontbackgroundcolor: "",
      status: "",
    },
    validationSchema: Yup.object({
      msg_head: Yup.string().required("Please Enter Your Name"),
      msg_content: Yup.string().required("Please Enter Content"),
      msg_type: Yup.string().required("Please Enter Type"),
      msg_fontsize: Yup.string().required("Please Select Font Size"),
      msg_fontcolor: Yup.string().required("Please Select Color"),
      msg_fontbgcolor: Yup.string().required("Please Select Background Color"),
      msg_fontbackgroundcolor: Yup.string().required("Please Select Background Color"),
      msg_fontfamily: Yup.string().required("Please Enter Designation"),
      status: Yup.string().required("Please Enter Group Policy"),
    }),
    onSubmit: (values) => {
      console.log("post values in notification Template" + values)
      const newNotification = {
        id: Math.floor(Math.random() * (30 - 20)) + 20,
        msg_head: values["msg_head"],
        msg_content: values["msg_content"],
        msg_type: values["msg_type"],
        msg_fontsize: values["msg_fontsize"],
        msg_fontcolor: values["msg_fontcolor"],
        msg_fontbgcolor: values["msg_fontbgcolor"],
        msg_fontfamily: values["msg_fontfamily"],
        msg_fontbackgroundcolor: values["msg_fontbackgroundcolor"],
        status: values["status"],
      };
      console.log("newNotification:" + newNotification);
      dispatch(onAddNewNotificationTemplate(newNotification));
      dispatch(onGetNotificationTemplate());
      validation.resetForm();
      handleAddNotificationTemplate();
    },
    onReset: (values) => {
      validation.setValues(validation.initialValues);
    },
  });

  // console.log("addnoTemplateStatus" + noTemplateStatus)
  return (
    <Modal
      isOpen={isOpen}
      role="dialog"
      size="xl"
      autoFocus={true}
      centered={true}
      className="exampleModal"
      tabIndex="-1"
      toggle={handleAddNotificationTemplate}
    >
      <ModalHeader tag="h4" toggle={handleAddNotificationTemplate}>
        Create Notification Template
      </ModalHeader>
      <ModalBody>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            console.log("create button clicked")
            validation.handleSubmit();
            return false;
          }}
        >
          <Row>
            <Col lg={3}>
              <div className="mb-3">
                <Label className="form-label">
                  Name<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="msg_head"
                  type="text"
                  placeholder="Insert Name"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.msg_head || ""}
                  invalid={
                    validation.touched.msg_head && validation.errors.msg_head
                      ? true
                      : false
                  }
                />
                {validation.touched.msg_head && validation.errors.msg_head ? (
                  <FormFeedback type="invalid">
                    {validation.errors.msg_head}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
            <Col lg={3}>
              <div className="mb-3">
                <Label className="form-label">
                  Type<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="msg_type"
                  type="select"
                  placeholder="Select Type"
                  className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.msg_type || ""}
                >
                  <option value="">Select Type</option>
                  {noTemplateType.map((msg_type) => (
                    <option key={msg_type.id} value={msg_type.id}>
                      {msg_type.name}
                    </option>
                  ))}
                </Input>
                {validation.touched.msg_type && validation.errors.msg_type ? (
                  <FormFeedback type="invalid">
                    {validation.errors.msg_type}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
            <Col lg={3}>
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
                >
                  <option value="">Select Status</option>
                  {
                    noTemplateStatus.map((status) => (
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
          <Row>
            <Col lg={3}>
              <div className="mb-3">
                <Label className="form-label">
                  Font Size<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="msg_fontsize"
                  type="select"
                  placeholder="Select Font Size"
                  className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.msg_fontsize || ""}
                >
                  <option value="">Select Font Size</option>
                  {FontSize.map((size, index) => (
                    <option key={index} value={size}>
                      {size}
                    </option>
                  ))}
                </Input>
                {validation.touched.msg_fontsize && validation.errors.msg_fontsize ? (
                  <FormFeedback type="invalid">
                    {validation.errors.msg_fontsize}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
            <Col lg={3}>
              <div className="mb-3">
                <Label className="form-label">
                  Font Color<span style={{ color: "red" }}>*</span>
                </Label>
                <div>
                  <input
                    name="msg_fontcolor"
                    type="color"
                    // placeholder="Select Font Color"
                    className="form-control"
                    onFocus={toggleColorPicker}
                    value={validation.values.msg_fontcolor || "#000000"}
                    // style={{
                    //   color: validation.values.fontcolor || "#000000", // Set initial color as background
                    // }}
                    onChange={(e) =>
                      validation.setFieldValue("fontcolor", e.target.value)
                    }
                  />
                  {showColorPicker && (
                    <SketchPicker
                      color={validation.values.fontcolor || "#000000"}
                      onChange={(color) =>
                        validation.setFieldValue("fontcolor", color.hex)
                      }
                    />
                  )}
                </div>
                <p>Value: {validation.values.msg_fontcolor}</p>
                {/* <div
                  style={{
                    backgroundColor: validation.values.fontcolor || "#000000",
                    width: "50px",
                    height: "20px",
                  }}
                ></div> */}
                {validation.touched.msg_fontcolor && validation.errors.msg_fontcolor ? (
                  <FormFeedback type="invalid">
                    {validation.errors.msg_fontcolor}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
            <Col lg={3}>
              <div className="mb-3">
                <Label className="form-label">
                  Font Background Color<span style={{ color: "red" }}>*</span>
                </Label>
                <div>
                  <input
                    name="msg_fontbackgroundcolor"
                    type="color"
                    placeholder="Select Font Background Color"
                    className="form-control"
                    onFocus={toggleColorPicker1}
                    onBlur={toggleColorPicker1}
                    value={validation.values.msg_fontbackgroundcolor || "#121314"}
                    onChange={(e) =>
                      validation.setFieldValue("fontbgcolor", e.target.value)
                    }
                  />

                  {showColorPicker1 && (
                    <SketchPicker
                      color={validation.values.msg_fontbackgroundcolor || "#121314"}
                      onChange={(color) =>
                        validation.setFieldValue("fontbgcolor", color.hex)
                      }
                    />
                  )}
                </div>
                <p>Value: {validation.values.msg_fontbackgroundcolor}</p>
                {/* <div
                  style={{
                    backgroundColor: validation.values.fontbgcolor || "#121314",
                    width: "50px",
                    height: "20px",
                  }}
                ></div> */}
                {validation.touched.msg_fontbackgroundcolor &&
                  validation.errors.msg_fontbackgroundcolor ? (
                  <FormFeedback type="invalid">
                    {validation.errors.msg_fontbackgroundcolor}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
            <Col lg={3}>
              <div className="mb-3">
                <Label className="form-label">
                  Font Family<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="msg_fontfamily"
                  type="select"
                  placeholder="Select Font Family"
                  className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.msg_fontfamily || ""}
                >
                  <option value="">Select Font Family</option>
                  {optionsList.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Input>
                {validation.touched.msg_fontfamily &&
                  validation.errors.msg_fontfamily ? (
                  <FormFeedback type="invalid">
                    {validation.errors.msg_fontfamily}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
          </Row>

          <Row>
            <Col lg={6}>
              <div className="mb-3">
                <Label className="form-label">
                  Content<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="msg_content"
                  type="textarea"
                  placeholder="Enter Content"
                  rows="3"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.msg_content || ""}
                  invalid={
                    validation.touched.msg_content && validation.errors.msg_content
                      ? true
                      : false
                  }
                />
                {validation.touched.msg_content && validation.errors.msg_content ? (
                  <FormFeedback type="invalid">
                    {validation.errors.msg_content}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <ModalFooter>
                <button type="submit" className="btn btn-success save-user">
                  Create
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
                    handleAddNotificationTemplate();
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

AddNotificationTemplateModal.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default AddNotificationTemplateModal;
