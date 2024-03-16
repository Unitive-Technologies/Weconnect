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
import { useDispatch } from "react-redux";
import Select from "react-select";
import { getLocation as onGetLocation } from "/src/store/actions";

const AddNewLocation = (props) => {
  const { isOpen, toggleAddLocation, lcoonlocation, status } = props;

  const dispatch = useDispatch();
  const [selectedLocation, setSelectedLocation] = useState(null);

  const options = lcoonlocation.map((option) => ({
    value: option.id,
    label: (
      <div>
        <h6>{option.name}</h6>
        <p>{option.code}</p>
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
    enableReinitialize: true,
    initialValues: {
      name: "",
      operator_id: "",
      status: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Enter location name"),
      operator_id: Yup.string().required("Select LCO"),
      status: Yup.string().required("Select status"),
    }),
    onSubmit: (values) => {
      console.log("values", values);
      const newLocation = {
        name: values["name"],
        operator_id: values["operator_id"],
        status: parseInt(values["status"]),
      };
      console.log("new location:" + JSON.stringify(newLocation));
      dispatch(onAddLocation(newLocation));
      dispatch(onGetLocation());
      validation.resetForm();
      toggleAddLocation();
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
      toggle={toggleAddLocation}
    >
      <ModalHeader tag="h4" toggle={toggleAddLocation}>
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
            <Col lg={4}>
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
                  }
                />
                <FormFeedback type="invalid">
                  {validation.errors.name}
                </FormFeedback>
              </div>
            </Col>
            <Col lg={4}>
              <div className="mb-3">
                <Label className="form-label">
                  Select LCO<span style={{ color: "red" }}>*</span>
                </Label>
                <Select
                  name="operator_id"
                  options={options}
                  onChange={(selectedOption) => {
                    validation.setFieldValue('operator_id', selectedOption.value);
                  }}
                  onBlur={validation.handleBlur}
                  styles={customStyles}
                  isInvalid={
                    validation.touched.operator_id &&
                    validation.errors.operator_id
                  }
                />
                <FormFeedback type="invalid">
                  {validation.errors.operator_id}
                </FormFeedback>
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
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.status || ""}
                  invalid={
                    validation.touched.status && validation.errors.status
                  }
                >
                  <option value="">Select status</option>
                  {status.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.name}
                    </option>
                  ))}
                </Input>
                <FormFeedback type="invalid">
                  {validation.errors.status}
                </FormFeedback>
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
                    toggleAddLocation();
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
  toggleAddLocation: PropTypes.func,
  isOpen: PropTypes.bool,
  lcoonlocation: PropTypes.array,
  status: PropTypes.array,
};

export default AddNewLocation;
