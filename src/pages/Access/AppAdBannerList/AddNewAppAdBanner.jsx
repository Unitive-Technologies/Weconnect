import React, { useEffect, useState, useRef, useMemo } from "react";
import PropTypes from "prop-types";
import {
  Col,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
  FormFeedback,
  Input,
  Form,
  ModalFooter,
} from "reactstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import { addAppAdBanner as onAddAppAdBanner } from "/src/store/appadbannerlist/actions";
import { useDispatch } from "react-redux";

const AddNewAppAdBanner = (props) => {
  const { isOpen, handleAddAppAdBanner } = props;
  const dispatch = useDispatch();

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      title: "",
      start_date: "",
      end_date: "",
      //   img: "",
      caption: "",
      description: "",
      status: "",
      created_at: "",
      created_by: "Admin",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Enter title"),
      start_date: Yup.string().required("Select from date"),
      end_date: Yup.string().required("Select end date"),
      //   img: Yup.string().required("Select file"),
      caption: Yup.string().required("Enter caption"),
      description: Yup.string().required("Enter description"),
      status: Yup.string().required("Select status"),
    }),
    onSubmit: (values) => {
      const newAppAdBanner = {
        id: Math.floor(Math.random() * (30 - 20)) + 20,
        title: values["title"],
        start_date: values["start_date"],
        end_date: values["end_date"],
        // img: values["img"],
        caption: values["caption"],
        status: values["status"],
        description: values["description"],
        created_at: new Date(),
        created_by: values["created_by"],
      };
      console.log("new App Ad banner list:" + JSON.stringify(newAppAdBanner));
      // save new user
      dispatch(onAddAppAdBanner(newAppAdBanner));
      validation.resetForm();
      handleAddAppAdBanner();
    },
    onReset: (values) => {
      validation.setValues(validation.initialValues);
    },
  });

  return (
    <Modal
      isOpen={isOpen}
      role="dialog"
      size="xl"
      autoFocus={true}
      centered={true}
      className="exampleModal"
      tabIndex="-1"
      toggle={handleAddAppAdBanner}
    >
      <ModalHeader tag="h4" toggle={handleAddAppAdBanner}>
        Add New App Advertisement Banner
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
            <Col lg={3}>
              <div className="mb-3">
                <Label className="form-label">
                  Title<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="title"
                  type="text"
                  placeholder="Enter title"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.title || ""}
                  invalid={
                    validation.touched.title && validation.errors.title
                      ? true
                      : false
                  }
                />
                {validation.touched.title && validation.errors.title ? (
                  <FormFeedback type="invalid">
                    {validation.errors.title}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
            <Col lg={3}>
              <div className="mb-3">
                <Label className="form-label">
                  Select start date<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="start_date"
                  label="start_date"
                  type="date"
                  placeholder="Select from date"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.start_date || ""}
                  invalid={
                    validation.touched.start_date &&
                    validation.errors.start_date
                      ? true
                      : false
                  }
                />
                {validation.touched.start_date &&
                validation.errors.start_date ? (
                  <FormFeedback type="invalid">
                    {validation.errors.start_date}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
            <Col lg={3}>
              <div className="mb-3">
                <Label className="form-label">
                  Select end date<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="end_date"
                  label="end_date"
                  type="date"
                  placeholder="Select end date"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.end_date || ""}
                  invalid={
                    validation.touched.end_date && validation.errors.end_date
                      ? true
                      : false
                  }
                />
                {validation.touched.end_date && validation.errors.end_date ? (
                  <FormFeedback type="invalid">
                    {validation.errors.end_date}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
            <Col lg={3}>
              <div className="mb-3">
                <Label className="form-label">
                  Select Image (Max 1MB)<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="title"
                  type="file"
                  placeholder="Select Image"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.title || ""}
                  invalid={
                    validation.touched.title && validation.errors.title
                      ? true
                      : false
                  }
                />
                {validation.touched.title && validation.errors.title ? (
                  <FormFeedback type="invalid">
                    {validation.errors.title}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
          </Row>
          <Row>
            <Col lg={6}>
              <div className="mb-3">
                <Label className="form-label">
                  Caption<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="caption"
                  type="textarea"
                  placeholder="Enter caption"
                  rows="3"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.caption || ""}
                  invalid={
                    validation.touched.caption && validation.errors.caption
                      ? true
                      : false
                  }
                />
                {validation.touched.caption && validation.errors.caption ? (
                  <FormFeedback type="invalid">
                    {validation.errors.caption}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
            <Col lg={6}>
              <div className="mb-3">
                <Label className="form-label">
                  Description<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="description"
                  type="textarea"
                  placeholder="Enter description"
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
          </Row>
          <Row>
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
                    handleAddAppAdBanner();
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

AddNewAppAdBanner.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default AddNewAppAdBanner;
