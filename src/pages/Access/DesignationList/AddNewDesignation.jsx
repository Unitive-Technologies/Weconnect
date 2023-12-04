import React, { useEffect, useState, useRef, useMemo } from "react";
import PropTypes from "prop-types";
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
import { useFormik } from "formik";
import { addNewDesignation as onAddNewDesignation } from "/src/store/designation/actions";
import { useSelector, useDispatch } from "react-redux";

const AddNewDesignation = (props) => {
  const { isOpen, toggle } = props;
  const dispatch = useDispatch();
  const [user, setUser] = useState();

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      designation: "",
      type: "",
      code: "",
      parent: "",
      status: "",
      description: "",
      created_at: "",
      created_by: "Admin",
    },
    validationSchema: Yup.object({
      designation: Yup.string().required("Enter designation Name"),
      type: Yup.string().required("Select Type"),
      code: Yup.string().required("Enter Code"),
      parent: Yup.string().required("Select Parent Designation"),
      status: Yup.string().required("Select status"),
      description: Yup.string().required("Enter Description"),
    }),
    onSubmit: (values) => {
      const newDesignation = {
        id: Math.floor(Math.random() * (30 - 20)) + 20,
        designation: values["designation"],
        type: values["type"],
        code: values["code"],
        parent: values["parent"],
        status: values["status"],
        description: values["description"],
        created_at: new Date(),
        created_by: values["created_by"],
      };
      console.log("newDesignation:" + newDesignation);
      // save new user
      dispatch(onAddNewDesignation(newDesignation));
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
      role="dialog"
      autoFocus={true}
      centered={true}
      className="exampleModal"
      tabIndex="-1"
      toggle={toggle}
    >
      {/* <Modal isOpen={modal} toggle={toggle}> */}
      <ModalHeader tag="h4">Add New Designation</ModalHeader>
      <ModalBody>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            validation.handleSubmit();
            return false;
          }}
        >
          <Row>
            <Col sm="12">
              <div className="mb-3">
                <Label className="form-label">Designation</Label>
                <Input
                  name="designation"
                  type="text"
                  placeholder="Enter designation name"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.designation || ""}
                  invalid={
                    validation.touched.designation &&
                    validation.errors.designation
                      ? true
                      : false
                  }
                />
                {validation.touched.designation &&
                validation.errors.designation ? (
                  <FormFeedback type="invalid">
                    {validation.errors.designation}
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
                  <option value="1">MSO</option>
                  <option value="2">RO</option>
                  <option value="3">Distributor</option>
                  <option value="4">LCO</option>
                </Input>
                {validation.touched.type && validation.errors.type ? (
                  <FormFeedback type="invalid">
                    {validation.errors.type}
                  </FormFeedback>
                ) : null}
              </div>

              <div className="mb-3">
                <Label className="form-label">Code</Label>
                <Input
                  name="code"
                  label="code"
                  type="text"
                  placeholder="Enter Code"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.code || ""}
                  invalid={
                    validation.touched.code && validation.errors.code
                      ? true
                      : false
                  }
                />
                {validation.touched.code && validation.errors.code ? (
                  <FormFeedback type="invalid">
                    {validation.errors.code}
                  </FormFeedback>
                ) : null}
              </div>
              <div className="mb-3">
                <Label className="form-label">Parent designation</Label>
                <Input
                  name="parent"
                  type="select"
                  placeholder="Select Parent designation"
                  className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.parent || ""}
                >
                  <option value="">Select Parent designation</option>
                  <option value="21">Administrator</option>
                  <option value="22">Staff</option>
                  <option value="23">User</option>
                </Input>
                {validation.touched.parent && validation.errors.parent ? (
                  <FormFeedback type="invalid">
                    {validation.errors.parent}
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
                  <option value="12">BLOCKED</option>
                  <option value="13">In-Active</option>
                </Input>
                {validation.touched.status && validation.errors.status ? (
                  <FormFeedback type="invalid">
                    {validation.errors.status}
                  </FormFeedback>
                ) : null}
              </div>
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
            <Col sm="8">
              <div className="d-flex flex-wrap gap-2">
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
                    validation.resetForm(); // Optionally reset the form when cancel is clicked
                    toggle(); // Close the popup
                  }}
                >
                  Cancel
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

AddNewDesignation.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default AddNewDesignation;
