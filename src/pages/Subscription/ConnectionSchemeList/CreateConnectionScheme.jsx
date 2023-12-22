import React, { useState } from "react";
import PropTypes from "prop-types";
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
import { addConnectionscheme as onAddConnectionscheme } from "/src/store/connectionschemelist/actions";
import { useDispatch } from "react-redux";

const CreateConnectionScheme = (props) => {
  const { isOpen, toggle } = props;
  const dispatch = useDispatch();

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      //BroadCaster: "",
      name: "",
      code: "",
      boxtype_lbl: "",
      hardware_charge: "",
      installation_charge: "",
      description: "",
      status: "",
      created_at: "",
      created_by: "Admin",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Enter name"),
      code: Yup.string().required("Enter code"),
      boxtype_lbl: Yup.string().required("Select scheme type"),
      hardware_charge: Yup.string().required("Enter hardware charge"),
      installation_charge: Yup.string().required("Enter installation charge"),
      description: Yup.string().required("Enter description"),
      status: Yup.string().required("select status"),
    }),
    onSubmit: (values) => {
      const newConnectionScheme = {
        id: Math.floor(Math.random() * (30 - 20)) + 20,
        name: values["name"],
        code: values["code"],
        boxtype_lbl: values["boxtype_lbl"],
        hardware_charge: values["hardware_charge"],
        installation_charge: values["installation_charge"],
        description: values["description"],
        status: values["status"],
        created_at: new Date(),
        created_by: values["created_by"],
      };
      console.log("newConnectionScheme:" + newConnectionScheme);
      dispatch(onAddConnectionscheme(newConnectionScheme));
      validation.resetForm();
      toggle();
    },
    onReset: (values) => {
      validation.setValues(validation.initialValues);
    },
  });

  return (
    <Modal
      isOpen={isOpen}
      size="xl"
      role="dialog"
      autoFocus={true}
      centered={true}
      className="exampleModal"
      tabIndex="-1"
      toggle={toggle}
    >
      <ModalHeader tag="h4" toggle={toggle}>
        Add New Connection Scheme
      </ModalHeader>
      <ModalBody>
        <Form
          onSubmit={(e) => {
            console.log("Submitted in connection scheme");
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
                  Type<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="boxtype_lbl"
                  type="select"
                  placeholder="Enter code"
                  className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.boxtype_lbl || ""}
                >
                  <option value="11">Select Scheme type</option>
                  <option value="12">Standard Definition(SD)</option>
                  <option value="13">High Definition(HD)</option>
                </Input>
                {validation.touched.boxtype_lbl &&
                validation.errors.boxtype_lbl ? (
                  <FormFeedback type="invalid">
                    {validation.errors.boxtype_lbl}
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
                  placeholder="Select status"
                  className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.status || ""}
                >
                  <option value="">Select Status</option>
                  <option value="1">Active</option>
                  <option value="2">In-Active</option>
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
            <Col sm="4">
              <div className="mb-3">
                <Label className="form-label">
                  Hardware Charge<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="hardware_charge"
                  type="text"
                  placeholder="Enter hardware charge"
                  // className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.hardware_charge || ""}
                ></Input>
                {validation.touched.hardware_charge &&
                validation.errors.hardware_charge ? (
                  <FormFeedback type="invalid">
                    {validation.errors.hardware_charge}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
            <Col sm="4">
              <div className="mb-3">
                <Label className="form-label">
                  Installation Charge<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="installation_charge"
                  type="text"
                  placeholder="Enter installation charge"
                  // className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.installation_charge || ""}
                ></Input>
                {validation.touched.installation_charge &&
                validation.errors.installation_charge ? (
                  <FormFeedback type="invalid">
                    {validation.errors.installation_charge}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
          </Row>
          <Row>
            <Col sm="8">
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
                    toggle();
                  }}
                >
                  Cancel
                </button>
              </ModalFooter>
            </Col>
          </Row>
        </Form>
      </ModalBody>
    </Modal>
  );
};

CreateConnectionScheme.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default CreateConnectionScheme;
