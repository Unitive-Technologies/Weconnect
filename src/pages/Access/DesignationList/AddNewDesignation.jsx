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
import { addNewDesignation as onAddNewDesignation } from "/src/store/designation/actions";
import { useDispatch } from "react-redux";
import { getDesignation as onGetDesignation } from "/src/store/actions";

const AddNewDesignation = (props) => {
  const { isOpen, handleAddDesignation, desigStatus, desigParent, desigType } =
    props;

  console.log("desigStatus:" + JSON.stringify(desigStatus));

  const dispatch = useDispatch();
  const [selectedStatus, setSelectedStatus] = useState("");

  const handleStatusChange = (e) => {
    const status = e.target.value;
    setSelectedStatus(status);
    validation.handleChange(e);
  };

  const handleTypeChange = (e) => {
    const type = e.target.value;
    setSelectedType(type);
    validation.handleChange(e);
  };

  const handleParentChange = (e) => {
    const parent = e.target.value;
    setSelectedParent(parent);
    validation.handleChange(e);
  };

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
        name: values["designation"],
        type: values["type"],
        code: values["code"],
        parent_id: values["parent"],
        status: values["status"],
        description: values["description"],
      };
      console.log("newDesignation:" + newDesignation);
      // save new user
      dispatch(onAddNewDesignation(newDesignation));
      dispatch(onGetDesignation());
      validation.resetForm();
      handleAddDesignation();
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
      toggle={handleAddDesignation}
    >
      <ModalHeader tag="h4" toggle={handleAddDesignation}>
        Add New Designation
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
            <Col lg={4}>
              <div className="mb-3">
                <Label className="form-label">
                  Designation<span style={{ color: "red" }}>*</span>
                </Label>
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
            </Col>
            <Col lg={4}>
              <div className="mb-3">
                <Label className="form-label">
                  Code<span style={{ color: "red" }}>*</span>
                </Label>
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
            </Col>
            <Col lg={4}>
              <div className="mb-3">
                <Label className="form-label">
                  Status<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="status"
                  type="select"
                  placeholder="Select Status"
                  className="form-select"
                  // onChange={handleStatusChange}
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.status || ""}
                >
                  <option value="">Select Status</option>
                  {desigStatus &&
                    desigStatus.map((status) => (
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
            <Col lg={4}>
              <div className="mb-3">
                <Label className="form-label">
                  Type<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="type"
                  type="select"
                  placeholder="Select Type"
                  className="form-select"
                  // onChange={handleTypeChange}
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.type || ""}
                >
                  <option value="">Select Type</option>
                  {desigType &&
                    desigType.map((type) => (
                      <option key={type.id} value={type.id}>
                        {type.value}
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
            <Col lg={4}>
              <div className="mb-3">
                <Label className="form-label">
                  Parent designation<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="parent"
                  type="select"
                  placeholder="Select Parent designation"
                  className="form-select"
                  // onChange={handleParentChange}
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.parent || ""}
                >
                  <option value="">Select Parent designation</option>
                  {desigParent &&
                    desigParent.map((parent) => (
                      <option key={parent.id} value={parent.id}>
                        {parent.name}
                      </option>
                    ))}
                </Input>
                {validation.touched.parent && validation.errors.parent ? (
                  <FormFeedback type="invalid">
                    {validation.errors.parent}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
            <Col lg={4}>
              <div className="mb-3">
                <Label className="form-label">
                  Description<span style={{ color: "red" }}>*</span>
                </Label>
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
                    handleAddDesignation();
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

AddNewDesignation.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default AddNewDesignation;
