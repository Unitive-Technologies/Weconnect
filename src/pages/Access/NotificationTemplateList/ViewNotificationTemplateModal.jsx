import React, { useEffect, useState, useRef, useMemo } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
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
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import ShowPreviewModal from "./ShowPreviewModal";
import { optionsList } from "./optionsList";
import {
  getNotificationTemplate as onGetNotificationTemplate,
  updateNotificationTemplate as onUpdateNotificationTemplate,
} from "/src/store/actions";
import ShowHistoryModal from "./ShowHistoryModal";

const ViewNotificationTemplateModal = (props) => {
  const {
    isOpen,
    toggleViewNotificationTemplate,
    resetSelection,
    notiTemplate,
    noTemplateType,
    noTemplateStatus,
  } = props;
  //   console.log("user in viewuser modal:" + JSON.stringify(user));
  const dispatch = useDispatch();
  const FontSize = Array.from({ length: 93 }, (_, index) => index + 8);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showColorPicker1, setShowColorPicker1] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  const toggleHistoryModal = () => {
    setShowHistory(!showHistory);
  };

  const toggleColorPicker = () => {
    setShowColorPicker(!showColorPicker);
  };
  const toggleColorPicker1 = () => {
    setShowColorPicker1(!showColorPicker1);
  };

  const [showEditNotificationTemp, setShowEditNotificationTemp] =
    useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      id: (notiTemplate && notiTemplate.id) || "",
      name: (notiTemplate && notiTemplate.msg_head) || "",
      type: (notiTemplate && notiTemplate.msg_type) || "",
      fontsize: (notiTemplate && notiTemplate.msg_fontsize) || "",
      fontcolor: (notiTemplate && notiTemplate.msg_fontcolor) || "",
      fontbgcolor: (notiTemplate && notiTemplate.msg_fontbackgroundcolor) || "",
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
        msg_head: values.name,
        msg_type: values.type,
        msg_fontsize: values.fontsize,
        msg_fontcolor: values.fontcolor,
        msg_fontbackgroundcolor: values.fontbgcolor,
        msg_fontfamily: values.fontfamily,
        status: values.status,
        msg_content: values.content,
      };

      // update user
      dispatch(onUpdateNotificationTemplate(updateNotification));
      dispatch(onGetNotificationTemplate());
      validation.resetForm();
      resetSelection();
      toggleViewNotificationTemplate();
    },
  });

  const handleCancel = () => {
    setShowEditNotificationTemp(false);
    toggleViewNotificationTemplate();
    onGetNotificationTemplate();
  };

  return (
    <>
      <ShowPreviewModal
        isOpen={showPreview}
        handlePreview={() => setShowPreview(false)}
        message={(notiTemplate && notiTemplate.msg_content) || ""}
      />
      {showHistory && (
        <ShowHistoryModal
          isOpen={showHistory}
          toggleHistoryModal={toggleHistoryModal}
          notiTemplate={notiTemplate}
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
          {!showEditNotificationTemp
            ? `View ${(notiTemplate && notiTemplate.msg_head) || ""}`
            : `Edit ${(notiTemplate && notiTemplate.msg_head) || ""}`}
        </ModalHeader>
        {!showEditNotificationTemp && (
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
              onClick={() => setShowEditNotificationTemp(true)}
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
              <Col lg={3}>
                <div className="mb-3">
                  <Label className="form-label">Name</Label>
                  <Input
                    name="name"
                    type="text"
                    placeholder="Insert Name"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.name || ""}
                    disabled={!showEditNotificationTemp}
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
                    value={validation.values.type || ""}
                    disabled={!showEditNotificationTemp}
                  >
                    {noTemplateType.map((msg_type) => (
                      <option key={msg_type.id} value={msg_type.id}>
                        {msg_type.name}
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
                    value={validation.values.status || ""}
                    disabled={!showEditNotificationTemp}
                  >
                    {noTemplateStatus.map((status) => (
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
                  <Label className="form-label">Font Size</Label>
                  <Input
                    name="fontsize"
                    type="select"
                    placeholder="Select Font Size"
                    className="form-select"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.fontsize || ""}
                    disabled={!showEditNotificationTemp}
                  >
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
              </Col>
              <Col lg={3}>
                <div className="mb-3">
                  <Label className="form-label">Font Color</Label>
                  <div>
                    <Input
                      name="fontcolor"
                      type="color"
                      placeholder="Select Font Color"
                      className="form-select"
                      onFocus={toggleColorPicker}
                      // onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.fontcolor || ""}
                      disabled={!showEditNotificationTemp}
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
                  <div>
                    <Input
                      name="fontbgcolor"
                      type="color"
                      placeholder="Select Font Background Color"
                      className="form-select"
                      onFocus={toggleColorPicker1}
                      // onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.fontbgcolor || ""}
                      disabled={!showEditNotificationTemp}
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
                    value={validation.values.fontfamily || ""}
                    disabled={!showEditNotificationTemp}
                  >
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
                    value={validation.values.content || ""}
                    invalid={
                      validation.touched.content && validation.errors.content
                        ? true
                        : false
                    }
                    disabled={!showEditNotificationTemp}
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
