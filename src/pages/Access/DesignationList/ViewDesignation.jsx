import React, { useEffect, useState, useRef, useMemo } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
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
import { useDispatch } from "react-redux";
import { updateUser as onUpdateUser } from "/src/store/users/actions";

const ViewDesignation = (props) => {
  const { isOpen, handleViewDesignation, designation } = props;
  const dispatch = useDispatch();
  const [showEditDesignation, setShowEditDesignation] = useState(false);
  // console.log("Designatin in View Designation: ", designation);
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      name: (designation && designation.name) || "",
      type: (designation && designation.type) || "",
      code: (designation && designation.code) || "",
      parent: (designation && designation.parent) || "",
      status: (designation && designation.status) || "",
      description: (designation && designation.description) || "",
      created_at: (designation && designation.created_at) || "",
      created_by: (designation && designation.created_by) || "my mso(mso)",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Enter designation name"),
      type: Yup.string().required("Select Type"),
      code: Yup.string().required("Enter Code"),
      parent: Yup.string().required("Select Parent Designation"),
      status: Yup.string().required("Select status"),
      description: Yup.string().required("Enter Description"),
    }),
    onSubmit: (values) => {
      const updateDesignation = {
        id: Math.floor(Math.random() * (30 - 20)) + 20,
        name: values["name"],
        type: values["type"],
        code: values["code"],
        parent: values["parent"],
        status: values["status"],
        description: values["description"],
        created_at: new Date(),
        created_by: values["created_by"],
      };
      // console.log("new district:" + updateCity);
      dispatch(onAddDistrict(updateDesignation));
      validation.resetForm();
      handleViewDesignation();
    },
  });

  const handleCancel = () => {
    setShowEditDesignation(false);
    handleViewDesignation();
  };

  // console.log("Show Edit city status: ", showEditDesignation);

  return (
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
        {!showEditDesignation
          ? `View ${validation.values.name}`
          : `Edit ${validation.values.name}`}
      </ModalHeader>
      {!showEditDesignation && (
        <Link
          style={{
            position: "absolute",
            marginLeft: "92%",
            marginTop: "1%",
          }}
          to="#!"
          className="btn btn-light me-1"
          onClick={() => setShowEditDesignation(true)}
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
            <Col lg={4}>
              <div className="mb-3">
                <Label className="form-label">Designation</Label>
                <Input
                  name="designation"
                  type="text"
                  placeholder="Enter designation name"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.name || ""}
                  invalid={
                    validation.touched.name && validation.errors.name
                      ? true
                      : false
                  }
                  disabled={!showEditDesignation}
                />
                {validation.touched.name && validation.errors.name ? (
                  <FormFeedback type="invalid">
                    {validation.errors.name}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
            <Col lg={4}>
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
                  disabled={!showEditDesignation}
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
                <Label className="form-label">Status</Label>
                <Input
                  name="status"
                  type="select"
                  placeholder="Select Status"
                  className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.status || ""}
                  disabled={!showEditDesignation}
                >
                  <option value="">Select status</option>
                  <option value="ACTIVE">Active</option>
                  <option value="INACTIVE">Inactive</option>
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
                <Label className="form-label">Type</Label>
                <Input
                  name="type"
                  type="select"
                  placeholder="Select Type"
                  className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.type || ""}
                  disabled={!showEditDesignation}
                >
                  <option value="">Select Type</option>
                  <option value="Staff">Staff</option>
                  <option value="management user">Management User</option>
                  <option value="engineer">Engineer</option>
                  <option value="customer care">customer care</option>
                  <option value="collection">Collection</option>
                  <option value="lco">LCO</option>
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
                <Label className="form-label">Parent designation</Label>
                <Input
                  name="parent"
                  type="select"
                  placeholder="Select Parent designation"
                  className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.parent || ""}
                  disabled={!showEditDesignation}
                >
                  <option value="">Select Parent designation</option>
                  <option value="0">Director</option>
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
                  disabled={!showEditDesignation}
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
          {showEditDesignation && (
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
    </Modal>
  );
};

ViewDesignation.propTypes = {
  handleViewDesignation: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default ViewDesignation;
