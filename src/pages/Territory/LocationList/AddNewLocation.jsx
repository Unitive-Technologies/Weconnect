import React, { useEffect, useState } from "react";
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
import { addLocation as onAddLocation } from "/src/store/location/actions";
import { useSelector, useDispatch } from "react-redux";
import Select from "react-select";

const AddNewLocation = (props) => {
  const { isOpen, handleAddLocation, lcoonlocation, status } = props;
  const dispatch = useDispatch();

  const options = lcoonlocation.map((option) => ({
    value: option.id,
    label: (
      <div>
        <h6>{option.name}</h6>
        <h6>{option.username}</h6>
        <p>Regional Office: {option.branch_lbl}</p>
        <p>Distributor: {option.distributor_lbl}</p>
      </div>
    ),
  }));

  const customStyles = {
    option: (provided) => ({
      ...provided,
      backgroundColor: "white",
    }),
  };

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      name: "",
      operator_id: "",
      status_lbl: "",
      created_at: "",
      created_by_lbl: "NIKHIL REDDY(nikky)",
      status: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Enter location name"),
      operator_id: Yup.string().required("Select LCO"),
      status: Yup.string().required("Select status"),
    }),
    onSubmit: (values) => {
      console.log("Submittted values: ", values);
      const newLocation = {
        id: Math.floor(Math.random() * (30 - 20)) + 20,
        name: values["name"],
        operator_id: values["operator_id"],
        status: values["status"],
        created_at: new Date(),
        created_by_lbl: values["created_by_lbl"],
      };
      console.log("new location:" + JSON.stringify(newLocation));
      dispatch(onAddLocation(newLocation));
      validation.resetForm();
      handleAddLocation();
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
      toggle={handleAddLocation}
    >
      <ModalHeader tag="h4" toggle={handleAddLocation}>
        Add New Location
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
            <Col lg={5}>
              <div className="mb-3">
                <Label className="form-label">
                  Location Name<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="name"
                  type="text"
                  placeholder="Enter location name"
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
                  <option value="">Select status</option>
                  {status.map((options) => (
                    <option key={options.id} value={options.id}>
                      {options.name}
                    </option>
                  ))}
                </Input>
                {validation.touched.status && validation.errors.status ? (
                  <FormFeedback type="invalid">
                    {validation.errors.status}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>{" "}
            <Col lg={5}>
              <div className="mb-3">
                <Label className="form-label">
                  Select LCO<span style={{ color: "red" }}>*</span>
                </Label>
                {/* <Select
                  name="operator_id"
                  placeholder="select LCO"
                  options={options}
                  onChange={(selectedOption) => {
                    console.log("selected option: ", selectedOption.value);
                    validation.handleChange(selectedOption.value);
                  }}
                  onBlur={validation.handleBlur}
                  value={options.find(
                    (opt) => opt.value === validation.values.operator_id
                  )}
                  styles={customStyles}
                /> */}
                <Input
                  name="operator_id"
                  type="select"
                  placeholder="Select LCO"
                  className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.operator_id || ""}
                >
                  <option value="">Select LCO</option>
                  {lcoonlocation.map((options) => (
                    <option key={options.id} value={options.id}>
                      {options.name}
                    </option>
                  ))}
                </Input>
                {validation.touched.operator_id &&
                validation.errors.operator_id ? (
                  <FormFeedback type="invalid">
                    {validation.errors.operator_id}
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
                    handleAddLocation();
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

AddNewLocation.propTypes = {
  handleAddLocation: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default AddNewLocation;
