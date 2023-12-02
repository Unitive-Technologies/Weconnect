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
import { addNewUser as onAddNewUser } from "/src/store/users/actions";
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
      parent_designation: "",
      status: "",
      description: "",
    },
    validationSchema: Yup.object({
      designation: Yup.string().required("Enter designation Name"),
      type: Yup.string().required("Select Type"),
      code: Yup.string().required("Enter Code"),
      parent_designation: Yup.string().required("Select Parent Designation"),
      status: Yup.string().required("Select status"),
      description: Yup.string().required("Enter Description"),
    }),
    onSubmit: (values) => {
      const newDesignation = {
        id: Math.floor(Math.random() * (30 - 20)) + 20,
        designation: values["designation"],
        type: values["type"],
        code: values["code"],
        parent_designation: values["parent_designation"],
        status: values["status"],
        description: values["description"],
      };
      console.log("newDesignation:" + newDesignation);
      // save new user
      dispatch(onAddNewUser(newDesignation));
      validation.resetForm();
      toggle();
    },
  });
  return (
    <Modal
      isOpen={isOpen}
      Parent
      designation="dialog"
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
            <Col sm="6">
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
            <Col sm="6">
              <div className="mb-3">
                <Label className="form-label">Parent designation</Label>
                <Input
                  name="Parent designation"
                  type="select"
                  placeholder="Select Parent designation"
                  className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.parent_designation || ""}
                >
                  <option value="">Select Parent designation</option>
                  <option value="21">Administrator</option>
                  <option value="22">Staff</option>
                  <option value="23">User</option>
                </Input>
                {validation.touched.parent_designation &&
                validation.errors.parent_designation ? (
                  <FormFeedback type="invalid">
                    {validation.errors.parent_designation}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="text-end">
                <button type="submit" className="btn btn-success save-user">
                  Save
                </button>
                <button type="submit" className="btn btn-success save-user">
                  Reset
                </button>
                <button type="submit" className="btn btn-success save-user">
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
