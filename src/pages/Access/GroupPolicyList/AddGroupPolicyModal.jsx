import React, { useState } from "react";
import PropTypes from "prop-types";
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
import { addNewGroupPolicy as onAddNewGroupPolicy } from "/src/store/grouppolicy/actions";
import { useDispatch } from "react-redux";
import DashboardPolicy from "./DashboardPolicy";

const AddGroupPolicyModal = (props) => {
  const { isOpen, toggleAddPolicyModal, policyRole, policyType } = props;
  console.log("typeeeeeeeeee:" + JSON.stringify(policyType));
  console.log("Roleeeeeeeeee:" + JSON.stringify(policyRole));
  const dispatch = useDispatch();

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      name: "",
      type: "",
      role: "",
      description: "",
      count: "",
      createdat: "",
      createdby: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please Enter Your Name"),
      type: Yup.string().required("Please Select Type"),
      role: Yup.string().required("Please Select Role"),
      description: Yup.string().required("Please Enter Description"),
      count: Yup.string().required("Please Enter Count"),
      createdat: Yup.string().required("Please Enter Created At"),
      createdby: Yup.string().required("Please Enter Created By"),
    }),
    onSubmit: (values) => {
      const newGroupPolicy = {
        id: Math.floor(Math.random() * (30 - 20)) + 20,
        name: values["name"],
        type: values["type"],
        role: values["role"],
        description: values["description"],
        count: values["count"],
        createdat: values["createdat"],
        createdby: values["createdby"],
      };
      console.log("newGroupPolicy:" + newGroupPolicy);
      // save new user
      dispatch(onAddNewGroupPolicy(newGroupPolicy));
      validation.resetForm();
      toggleAddPolicyModal();
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
      toggle={toggleAddPolicyModal}
    >
      <ModalHeader tag="h4" toggle={toggleAddPolicyModal}>
        Create Group Policy
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
                  Name<span style={{ color: "red" }}>*</span>
                </Label>
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
            </Col>
            <Col lg={3}>
              <div className="mb-3">
                <Label className="form-label">
                  Operator Type<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="type"
                  type="select"
                  placeholder="Select User Type"
                  className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.type || ""}
                >
                  <option value="">Select User Type</option>
                  {policyType &&
                    policyType.map((type) => (
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
            <Col lg={3}>
              <div className="mb-3">
                <Label className="form-label">
                  Role Type<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="role"
                  type="select"
                  placeholder="Select Role"
                  className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.role || ""}
                >
                  <option value="">Select Role</option>
                  {policyRole &&
                    policyRole.map((role) => (
                      <option key={role.id} value={role.id}>
                        {role.name}
                      </option>
                    ))}
                </Input>
                {validation.touched.role && validation.errors.role ? (
                  <FormFeedback type="invalid">
                    {validation.errors.role}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
            <Col lg={3}>
              <div className="mb-3">
                <Label className="form-label">Description</Label>
                <Input
                  name="description"
                  type="textarea"
                  placeholder="Enter Description"
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
                {/* <Label className="form-label">Description</Label> */}
                <Input
                  name="search"
                  type="text"
                  placeholder="Search all Permissions"
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
            <Col lg={3}>
              <div className="form-check form-switch form-switch-lg mb-3">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="customSwitchsizelg"
                  // defaultChecked
                />
                <label
                  className="form-check-label"
                  htmlFor="customSwitchsizelg"
                >
                  Select All
                </label>
              </div>
            </Col>
            <Col lg={3}>
              <div className="form-check form-switch form-switch-lg mb-3">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="customSwitchsizelg"
                  // defaultChecked
                />
                <label
                  className="form-check-label"
                  htmlFor="customSwitchsizelg"
                >
                  View Only
                </label>
              </div>
            </Col>
            <Col lg={3}>
              <button type="submit" className="btn btn-primary w-md">
                Undo All Changes
              </button>
            </Col>
          </Row>
          <Row>
            <Col lg={3}>
              <div>
                <h6>
                  Total Permission tab count:
                  <b> 48</b>
                </h6>
              </div>
            </Col>
            <Col lg={3}>
              <div>
                <h6>
                  Available Permissions:
                  <b> 159</b>
                </h6>
              </div>
            </Col>
            <Col lg={3}>
              <div>
                <h6>
                  Selected Permissions:
                  <b> 155</b>
                </h6>
              </div>
            </Col>
          </Row>
          <Row>
            <DashboardPolicy />
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
                    toggleAddPolicyModal();
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

AddGroupPolicyModal.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default AddGroupPolicyModal;
