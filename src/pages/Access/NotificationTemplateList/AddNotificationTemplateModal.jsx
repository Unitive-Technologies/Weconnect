import React, { useEffect, useState, useRef, useMemo } from "react";
import PropTypes from "prop-types";
import { SketchPicker } from "react-color";
import {
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
  FormFeedback,
  UncontrolledTooltip,
  Input,
  Form,
} from "reactstrap";
import * as Yup from "yup";
import { optionsList } from "./optionsList";
import { useFormik } from "formik";
import { addNewNotificationTemplate as onAddNewNotificationTemplate } from "/src/store/notificationtemplate/actions";
import { useSelector, useDispatch } from "react-redux";

const AddNotificationTemplateModal = (props) => {
  const { isOpen, toggle } = props;
  const dispatch = useDispatch();
  const [user, setUser] = useState();
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
      name: "",
      content: "",
      type: "",
      fontsize: "",
      fontcolor: "#000000",
      fontbgcolor: "#000000",
      fontfamily: "",
      status: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please Enter Your Name"),
      content: Yup.string().required("Please Enter Content"),
      type: Yup.string().required("Please Enter Type"),
      fontsize: Yup.string().required("Please Select Font Size"),
      fontcolor: Yup.string().required("Please Select Color"),
      fontbgcolor: Yup.string().required("Please Select Background Color"),
      fontfamily: Yup.string().required("Please Enter Designation"),
      status: Yup.string().required("Please Enter Group Policy"),
    }),
    onSubmit: (values) => {
      const newNotification = {
        id: Math.floor(Math.random() * (30 - 20)) + 20,
        msg_head: values["name"],
        msg_content: values["content"],
        msg_type_lbl: values["type"],
        msg_fontsize: values["fontsize"],
        msg_fontcolor: values["fontcolor"],
        msg_fontbgcolor: values["fontbgcolor"],
        msg_fontfamily: values["fontfamily"],
        status: values["status"],
      };
      console.log("newUser:" + newNotification);
      // save new user
      dispatch(onAddNewNotificationTemplate(newNotification));
      validation.resetForm();
      toggle();
    },
  });
  return (
    <Modal
      isOpen={isOpen}
      role="dialog"
      autoFocus={true}
      centered={true}
      className="exampleModal"
      tabIndex="-1"
      toggle={toggle}
    >
      {/* <Modal isOpen={modal} toggle={toggle}> */}
      <ModalHeader tag="h4" toggle={toggle}>
        Create Notification Template
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
            <Col sm="6">
              <div className="mb-3">
                <Label className="form-label">Name</Label>
                <Input
                  name="name"
                  type="text"
                  placeholder="Insert Name"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.name || ""}
                  invalid={
                    validation.touched.name && validation.errors.name
                      ? true
                      : false
                  }
                />
                {validation.touched.name && validation.errors.name ? (
                  <FormFeedback type="invalid">
                    {validation.errors.name}
                  </FormFeedback>
                ) : null}
              </div>

              <div className="mb-3">
                <Label className="form-label">Type</Label>
                <Input
                  name="type"
                  type="select"
                  placeholder="Select Type"
                  className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.type || ""}
                >
                  <option value="">Select Type</option>
                  <option value="1">Alert</option>
                  <option value="2">Scroll</option>
                </Input>
                {validation.touched.type && validation.errors.type ? (
                  <FormFeedback type="invalid">
                    {validation.errors.type}
                  </FormFeedback>
                ) : null}
              </div>

              <div className="mb-3">
                <Label className="form-label">Font Size</Label>
                <Input
                  name="fontsize"
                  type="select"
                  placeholder="Select Font Size"
                  className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.fontsize || ""}
                >
                  <option value="">Select Font Size</option>
                  {FontSize.map((size, index) => (
                    <option key={index} value={size}>
                      {size}
                    </option>
                  ))}
                </Input>
                {validation.touched.fontsize && validation.errors.fontsize ? (
                  <FormFeedback type="invalid">
                    {validation.errors.fontsize}
                  </FormFeedback>
                ) : null}
              </div>

              <div className="mb-3">
                <Label className="form-label">Font Color</Label>
                <div>
                  <input
                    name="fontcolor"
                    type="color"
                    // placeholder="Select Font Color"
                    className="form-control"
                    onFocus={toggleColorPicker}
                    value={validation.values.fontcolor || "#000000"}
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
                <p>Value: {validation.values.fontcolor}</p>
                {/* <div
                  style={{
                    backgroundColor: validation.values.fontcolor || "#000000",
                    width: "50px",
                    height: "20px",
                  }}
                ></div> */}
                {validation.touched.fontcolor && validation.errors.fontcolor ? (
                  <FormFeedback type="invalid">
                    {validation.errors.fontcolor}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
            <Col sm="6">
              <div className="mb-3">
                <Label className="form-label">Font Background Color</Label>
                <div>
                  <input
                    name="fontbgcolor"
                    type="color"
                    placeholder="Select Font Background Color"
                    className="form-control"
                    onFocus={toggleColorPicker1}
                    onBlur={toggleColorPicker1}
                    value={validation.values.fontbgcolor || "#121314"}
                    onChange={(e) =>
                      validation.setFieldValue("fontbgcolor", e.target.value)
                    }
                  />

                  {showColorPicker1 && (
                    <SketchPicker
                      color={validation.values.fontbgcolor || "#121314"}
                      onChange={(color) =>
                        validation.setFieldValue("fontbgcolor", color.hex)
                      }
                    />
                  )}
                </div>
                <p>Value: {validation.values.fontbgcolor}</p>
                {/* <div
                  style={{
                    backgroundColor: validation.values.fontbgcolor || "#121314",
                    width: "50px",
                    height: "20px",
                  }}
                ></div> */}
                {validation.touched.fontbgcolor &&
                validation.errors.fontbgcolor ? (
                  <FormFeedback type="invalid">
                    {validation.errors.fontbgcolor}
                  </FormFeedback>
                ) : null}
              </div>

              <div className="mb-3">
                <Label className="form-label">Font Family</Label>
                <Input
                  name="fontfamily"
                  type="select"
                  placeholder="Select Font Family"
                  className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.fontfamily || ""}
                >
                  <option value="">Select Font Family</option>
                  {optionsList.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Input>
                {validation.touched.fontfamily &&
                validation.errors.fontfamily ? (
                  <FormFeedback type="invalid">
                    {validation.errors.fontfamily}
                  </FormFeedback>
                ) : null}
              </div>
              <div className="mb-3">
                <Label className="form-label">Status</Label>
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
                  <option value="11">Active</option>
                  <option value="12">In-Active</option>
                </Input>
                {validation.touched.status && validation.errors.status ? (
                  <FormFeedback type="invalid">
                    {validation.errors.status}
                  </FormFeedback>
                ) : null}
              </div>

              <div className="mb-3">
                <Label className="form-label">Content</Label>
                <Input
                  name="content"
                  type="textarea"
                  placeholder="Enter Content"
                  rows="3"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.content || ""}
                  invalid={
                    validation.touched.content && validation.errors.content
                      ? true
                      : false
                  }
                />
                {validation.touched.content && validation.errors.content ? (
                  <FormFeedback type="invalid">
                    {validation.errors.content}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="text-end">
                <button type="submit" className="btn btn-success save-user">
                  Create
                </button>
              </div>
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
