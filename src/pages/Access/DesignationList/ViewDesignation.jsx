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
import { useSelector, useDispatch } from "react-redux";
import { updateUser as onUpdateUser } from "/src/store/users/actions";

const ViewDesignation = (props) => {
  const { isOpen, toggle, designation } = props;
  const dispatch = useDispatch();
  const [showEditDesignation, setShowEditDesignation] = useState(false);

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      name: (designation && designation.name) || "",
      type_lbl: (designation && designation.type_lbl) || "",
      code: (designation && designation.code) || "",
      parent: (designation && designation.parent) || "",
      status: (designation && designation.status) || "",
      description: (designation && designation.description) || "",
      created_at: (designation && designation.created_at) || "",
      created_by: (designation && designation.created_by) || "my mso(mso)",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Enter designation name"),
      type_lbl: Yup.string().required("Select Type"),
      code: Yup.string().required("Enter Code"),
      parent: Yup.string().required("Select Parent Designation"),
      status: Yup.string().required("Select status"),
      description: Yup.string().required("Enter Description"),
    }),
    onSubmit: (values) => {
      const updateDesignation = {
        id: Math.floor(Math.random() * (30 - 20)) + 20,
        name: values["name"],
        type_lbl: values["type_lbl"],
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
      toggle();
    },
  });

  const editToggle = () => {
    setShowEditDesignation(false);
    toggle();
  };

  console.log("Show Edit city status: ", showEditDesignation);

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
      {!showEditDesignation ? (
        <ModalHeader toggle={toggle} tag="h4">
          View {validation.values.name}
          <i
            className="bx bx bxs-edit"
            style={{
              position: "absolute",
              marginLeft: "55%",
              cursor: "pointer",
              marginTop: "1%",
            }}
            onClick={() => setShowEditDesignation(true)}
          ></i>
        </ModalHeader>
      ) : (
        <ModalHeader toggle={editToggle} tag="h4">
          Edit Designation
        </ModalHeader>
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
            <Col sm="12">
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

              <div className="mb-3">
                <Label className="form-label">Type</Label>
                <Input
                  name="type"
                  type="select"
                  placeholder="Select Type"
                  className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.type_lbl || ""}
                  disabled={!showEditDesignation}
                >
                  <option value="">Select Type</option>
                  <option value="staff">Staff</option>
                  <option value="management user">Management User</option>
                  <option value="engineer">Engineer</option>
                  <option value="customer care">customer care</option>
                  <option value="collection">Collection</option>
                  <option value="lco">LCO</option>
                </Input>
                {validation.touched.type_lbl && validation.errors.type_lbl ? (
                  <FormFeedback type="invalid">
                    {validation.errors.type_lbl}
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
                  disabled={!showEditDesignation}
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
                  <option value="">Select Status</option>
                  <option value="1">Active</option>
                  <option value="2">Inactive</option>
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
          <Row>
            <Col>
              <div className="text-end">
                <button type="submit" className="btn btn-success save-user">
                  Save
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

ViewDesignation.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default ViewDesignation;
