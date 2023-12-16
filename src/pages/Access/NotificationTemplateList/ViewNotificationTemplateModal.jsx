import React, { useEffect, useState, useRef, useMemo } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
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
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import ShowPreviewModal from "./ShowPreviewModal";
// import { updateNotificationTemplate as onUpdateNotificationTemplate } from "/src/store/users/actions";

const ViewNotificationTemplateModal = (props) => {
  const { isOpen, handleViewNotificationTemplate, notiTemplate } = props;
  //   console.log("user in viewuser modal:" + JSON.stringify(user));
  const dispatch = useDispatch();
  const [showEditNotificationTemp, setShowEditNotificationTemp] =
    useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      id: (notiTemplate && notiTemplate.id) || "",
      name: (notiTemplate && notiTemplate.msg_head) || "",
      type: (notiTemplate && notiTemplate.msg_type_lbl) || "",
      fontsize: (notiTemplate && notiTemplate.msg_fontsize) || "",
      fontcolor: (notiTemplate && notiTemplate.msg_fontcolor) || "",
      fontbgcolor: (notiTemplate && notiTemplate.msg_fontbgcolor) || "",
      fontfamily: (notiTemplate && notiTemplate.msg_fontfamily) || "",
      status: (notiTemplate && notiTemplate.status) || "",
      content: (notiTemplate && notiTemplate.msg_content) || "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please Enter Your Name"),
      type: Yup.string().required("Please Select Type"),
      fontsize: Yup.string().required("Please Select Font Size"),
      fontcolor: Yup.string().required("Please Select Font Color"),
      fontbgcolor: Yup.string().required("Please Select Font Background Color"),
      fontfamily: Yup.string().required("Please Select Font Family"),
      status: Yup.string().required("Please Enter Status"),
      content: Yup.string().required("Please Enter Content"),
    }),
    onSubmit: (values) => {
      const updateNotification = {
        id: notiTemplate.id,
        name: values.name,
        type: values.type,
        fontsize: values.fontsize,
        fontcolor: values.fontcolor,
        fontbgcolor: values.fontbgcolor,
        fontfamily: values.fontfamily,
        status: values.status,
        content: values.content,
      };

      // update user
      dispatch(onUpdateNotificationTemplate(updateNotification));
      validation.resetForm();
      handleViewNotificationTemplate();
    },
  });

  const handleCancel = () => {
    setShowEditNotificationTemp(false);
    handleViewNotificationTemplate();
  };

  return (
    <>
      <ShowPreviewModal
        isOpen={showPreview}
        handlePreview={() => setShowPreview(false)}
        message={(notiTemplate && notiTemplate.msg_content) || ""}
      />
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
          {!showEditNotificationTemp
            ? `View ${(notiTemplate && notiTemplate.msg_head) || ""}`
            : `Edit ${(notiTemplate && notiTemplate.msg_head) || ""}`}
        </ModalHeader>
        {!showEditNotificationTemp && (
          <Link
            style={{
              position: "absolute",
              marginLeft: "92%",
              marginTop: "1%",
            }}
            to="#!"
            className="btn btn-light me-1"
            onClick={() => setShowEditNotificationTemp(true)}
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
              <Col lg={3}>
                <div className="mb-3">
                  <Label className="form-label">Name</Label>
                  <Input
                    name="name"
                    type="text"
                    placeholder="Insert Name"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.initialValues.name || ""}
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
              </Col>
              <Col lg={3}>
                <div className="mb-3">
                  <Label className="form-label">Type</Label>
                  <Input
                    name="type"
                    type="select"
                    placeholder="Select Type"
                    className="form-select"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.initialValues.type || ""}
                  >
                    {/* <option value="">Select Type</option> */}
                    <option value="1">Alert</option>
                    <option value="2">Scroll</option>
                  </Input>
                  {validation.touched.type && validation.errors.type ? (
                    <FormFeedback type="invalid">
                      {validation.errors.type}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>

              <Col lg={3}>
                <div className="mb-3">
                  <Label className="form-label">Status</Label>
                  <Input
                    name="status"
                    type="select"
                    placeholder="Select Status"
                    className="form-select"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.initialValues.status || ""}
                  >
                    {/* <option value="">Select Status</option> */}
                    <option value="11">Active</option>
                    <option value="12">In-Active</option>
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
                  <Label className="form-label">Font Size</Label>
                  <Input
                    name="fontsize"
                    type="select"
                    placeholder="Select Font Size"
                    className="form-select"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.initialValues.fontsize || ""}
                  >
                    {/* <option value="">Select Font Size</option> */}
                    <option value="1">8</option>
                    <option value="2">9</option>
                    <option value="3">10</option>
                    <option value="4">11</option>
                    <option value="5">12</option>
                    <option value="6">13</option>
                    <option value="7">14</option>
                    <option value="8">15</option>
                    <option value="9">16</option>
                    <option value="10">17</option>
                    <option value="11">18</option>
                  </Input>
                  {validation.touched.fontsize && validation.errors.fontsize ? (
                    <FormFeedback type="invalid">
                      {validation.errors.fontsize}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Col lg={3}>
                <div className="mb-3">
                  <Label className="form-label">Font Color</Label>
                  <Input
                    name="fontcolor"
                    type="select"
                    placeholder="Select Font Color"
                    className="form-select"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.initialValues.fontcolor || ""}
                  >
                    {/* <option value="">Select Font Color</option> */}
                    <option value="1">8</option>
                    <option value="2">9</option>
                    <option value="3">10</option>
                    <option value="4">11</option>
                    <option value="5">12</option>
                    <option value="6">13</option>
                    <option value="7">14</option>
                    <option value="8">15</option>
                    <option value="9">16</option>
                    <option value="10">17</option>
                    <option value="11">18</option>
                  </Input>
                  {validation.touched.fontcolor &&
                  validation.errors.fontcolor ? (
                    <FormFeedback type="invalid">
                      {validation.errors.fontcolor}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>

              <Col lg={3}>
                <div className="mb-3">
                  <Label className="form-label">Font Background Color</Label>
                  <Input
                    name="fontbgcolor"
                    type="select"
                    placeholder="Select Font Background Color"
                    className="form-select"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.initialValues.fontcolor || ""}
                  >
                    {/* <option value="">Select Font Background Color</option> */}
                    <option value="1">8</option>
                    <option value="2">9</option>
                    <option value="3">10</option>
                    <option value="4">11</option>
                    <option value="5">12</option>
                    <option value="6">13</option>
                    <option value="7">14</option>
                    <option value="8">15</option>
                    <option value="9">16</option>
                    <option value="10">17</option>
                    <option value="11">18</option>
                  </Input>
                  {validation.touched.fontbgcolor &&
                  validation.errors.fontbgcolor ? (
                    <FormFeedback type="invalid">
                      {validation.errors.fontbgcolor}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Col lg={3}>
                <div className="mb-3">
                  <Label className="form-label">Font Family</Label>
                  <Input
                    name="fontfamily"
                    type="select"
                    placeholder="Select Font Family"
                    className="form-select"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.initialValues.fontfamily || ""}
                  >
                    {/* <option value="">Select Font Family</option> */}
                    <option value="1">Times New Roman</option>
                    <option value="2">Georgia</option>
                    <option value="3">Arial</option>
                    <option value="4">Verdana</option>
                    <option value="5">Courier New</option>
                    <option value="6">Arial</option>
                    <option value="7">Tahoma</option>
                  </Input>
                  {validation.touched.fontfamily &&
                  validation.errors.fontfamily ? (
                    <FormFeedback type="invalid">
                      {validation.errors.fontfamily}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
            </Row>
            <Row>
              <Col lg={6}>
                <div className="mb-3">
                  <Label className="form-label">Content</Label>
                  <Input
                    name="content"
                    type="textarea"
                    placeholder="Enter Content"
                    rows="3"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.initialValues.content || ""}
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
              <Col
                lg={2}
                style={{
                  paddingTop: "25px",
                }}
              >
                <button
                  type="submit"
                  className="btn btn-primary w-md"
                  onClick={() => setShowPreview(true)}
                >
                  Show Preview
                </button>
              </Col>
            </Row>
            {showEditNotificationTemp && (
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
        {/* </Modal> */}
      </Modal>
    </>
  );
};

ViewNotificationTemplateModal.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default ViewNotificationTemplateModal;
