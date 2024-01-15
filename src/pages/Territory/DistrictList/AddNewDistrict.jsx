import React, { useState } from "react";
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
import { addDistrict as onAddDistrict } from "/src/store/district/actions";
import { getDistrict as onGetDistrict } from "/src/store/actions";
import { useDispatch } from "react-redux";

const AddNewDistrict = (props) => {
  const { isOpen, toggleAddModal, statelist, status } = props;
  const dispatch = useDispatch();

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      name: "",
      status: "",
      description: "",
      type: "2",
      state_id: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Enter district name"),
      state_id: Yup.string().required("Select state"),
      status: Yup.string().required("Select status"),
      description: Yup.string().required("Enter description"),
    }),
    onSubmit: (values) => {
      console.log("Post values: ", values);
      const newDistrict = {
        name: values["name"],
        status: Number(values["status"]),
        description: values["description"],
        type: values["type"],
        state_id: Number(values["state_id"]),
      };
      console.log("new district:" + JSON.stringify(newDistrict));
      dispatch(onAddDistrict(newDistrict));
      dispatch(onGetDistrict());
      validation.resetForm();
      toggleAddModal();
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
      toggle={toggleAddModal}
    >
      <ModalHeader tag="h4" toggle={toggleAddModal}>
        Add New District
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
            <Col lg={6}>
              <div className="mb-3">
                <Label className="form-label">
                  District Name<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="name"
                  type="text"
                  placeholder="Enter district name"
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
            <Col lg={6}>
              <div className="mb-3">
                <Label className="form-label">
                  Select State<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="state_id"
                  type="select"
                  placeholder="Select state"
                  className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.state_id || ""}
                >
                  <option value="">Select state</option>
                  {statelist.map((options) => (
                    <option key={options.id} value={options.id}>
                      {options.name}
                    </option>
                  ))}
                </Input>
                {validation.touched.state_id && validation.errors.state_id ? (
                  <FormFeedback type="invalid">
                    {validation.errors.state_id}
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
            <Col lg={6}>
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
                  {status.map((options) => (
                    <option key={options.id} value={options.id}>
                      {options.name}
                    </option>
                  ))}
                </Input>
                {validation.touched.status_lbl &&
                validation.errors.status_lbl ? (
                  <FormFeedback type="invalid">
                    {validation.errors.status_lbl}
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
                    toggleAddModal();
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

AddNewDistrict.propTypes = {
  toggleAddModal: PropTypes.func,
  isOpen: PropTypes.bool,
  statelist: PropTypes.array,
  status: PropTypes.array,
};

export default AddNewDistrict;
