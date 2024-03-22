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
import {
  updateDesignation as onUpdateDesignation,
  getDesignation as onGetDesignation,
} from "/src/store/designation/actions";
import ShowHistoryModal from "./ShowHistoryModal";

const ViewDesignation = (props) => {
  const {
    isOpen,
    toggleViewModal,
    resetSelection,
    designation,
    desigStatus,
    desigType,
    desigParent,
  } = props;
  const dispatch = useDispatch();
  const [showEditDesignation, setShowEditDesignation] = useState(false);
  // console.log("Designatin in View Designation: ", designation);

  const [showHistory, setShowHistory] = useState(false);

  const toggleHistoryModal = () => {
    setShowHistory(!showHistory);
  };

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      name: (designation && designation.name) || "",
      type: (designation && designation.type) || "",
      code: (designation && designation.code) || "",
      parent_id: (designation && designation.parent_id) || "",
      status: (designation && designation.status) || 0,
      description: (designation && designation.description) || "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Enter designation Name"),
      type: Yup.string().required("Select Type"),
      code: Yup.string().required("Enter Code"),
      parent_id: Yup.string().required("Select Parent Designation"),
      status: Yup.string().required("Select status"),
      description: Yup.string().required("Enter Description"),
    }),
    onSubmit: (values) => {
      const updateDesignation = {
        id: designation.id,
        name: values["name"],
        type: values["type"],
        code: values["code"],
        parent_id: values["parent_id"],
        status: values["status"],
        description: values["description"],
      };

      dispatch(onUpdateDesignation(updateDesignation));
      dispatch(onGetDesignation());
      validation.resetForm();
      resetSelection();
      toggleViewModal();
    },
  });

  const handleCancel = () => {
    setShowEditDesignation(false);
    toggleViewModal();
    dispatch(onGetDesignation());
  };

  return (
    <>
      {showHistory && (
        <ShowHistoryModal
          isOpen={showHistory}
          toggleHistoryModal={toggleHistoryModal}
          designation={designation}
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
          {!showEditDesignation
            ? `View ${validation.values.name}`
            : `Edit ${validation.values.name}`}
        </ModalHeader>
        {!showEditDesignation && (
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
              onClick={() => setShowEditDesignation(true)}
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
              <Col lg={4}>
                <div className="mb-3">
                  <Label className="form-label">
                    Designation<span style={{ color: "red" }}>*</span>
                  </Label>
                  <Input
                    name="name"
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
                    disabled={!showEditDesignation}
                    invalid={
                      validation.touched.status && validation.errors.status
                        ? true
                        : false
                    }
                  >
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
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.type || ""}
                    disabled={!showEditDesignation}
                    invalid={
                      validation.touched.type && validation.errors.type
                        ? true
                        : false
                    }
                  >
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
                    name="parent_id"
                    type="select"
                    placeholder="Select Parent designation"
                    className="form-select"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.parent_id || ""}
                    disabled={!showEditDesignation}
                  >
                    {desigParent &&
                      desigParent.map((parent) => (
                        <option key={parent.id} value={parent.id}>
                          {parent.name}
                        </option>
                      ))}
                  </Input>
                  {validation.touched.parent_id &&
                  validation.errors.parent_id ? (
                    <FormFeedback type="invalid">
                      {validation.errors.parent_id}
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
            {console.log(
              "Validationnnnnnnnn: " + validation.values.name,
              validation.values.type,
              typeof validation.values.type,
              validation.values.code,
              validation.values.parent_id,
              typeof validation.values.parent_id,
              validation.values.status,
              typeof validation.values.status,
              validation.values.description
            )}
            {showEditDesignation && (
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
      </Modal>
    </>
  );
};

ViewDesignation.propTypes = {
  handleViewDesignation: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default ViewDesignation;
