import React, { useEffect, useState, useRef, useMemo } from "react";
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
import {
  getSublocation as onGetSublocation,
  addSubLocation as onAddSubLocation,
} from "/src/store/sublocation/actions";
import { useSelector, useDispatch } from "react-redux";
import Select from "react-select";

const AddSubLocation = (props) => {
  const { isOpen, toggleAddModal, status, locateonsublocate } = props;
  const dispatch = useDispatch();
  const [selectedLocation, setSelectedLocation] = useState(null);

  const options = locateonsublocate.map((option) => ({
    value: option.id,
    label: (
      <div>
        <h6>{option.name}</h6>
        <p>LCO {option.operator_lbl}</p>
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
      location_id: "",
      // location_id: null,
      status: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Enter sublocation"),
      location_id: Yup.string().required("Select location"),
      status: Yup.string().required("Select status"),
    }),
    onSubmit: (values) => {
      console.log("Entered values in Add sublocation : ", values);
      const newSubLocation = {
        name: values["name"],
        location_id: values["location_id"],
        status: parseInt(values["status"]),
      };
      console.log("new sub location:" + JSON.stringify(newSubLocation));
      dispatch(onAddSubLocation(newSubLocation));
      dispatch(onGetSublocation());
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
        Add New Sub Location
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
                  Sublocation Name<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="name"
                  type="text"
                  placeholder="Enter sublocation name"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.name}
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
            <Col lg={4}>
              <div className="mb-3">
                <Label className="form-label">
                  Location<span style={{ color: "red" }}>*</span>
                </Label>
                <Select
                  name="location_id"
                  options={options}
                  onChange={(selectedOption) => {
                    validation.setFieldValue('location_id', selectedOption ? selectedOption.value : ''); // Set the value of operator_id
                  }}
                  onBlur={validation.handleBlur}
                  styles={{
                    control: (provided, state) => ({
                      ...provided,
                      borderColor: state.isFocused ? (validation.touched.location_id && validation.errors.location_id ? 'red' : '') : (validation.touched.location_id && validation.errors.location_id ? 'red' : ''),
                    }),
                    option: (provided) => ({
                      ...provided,
                      backgroundColor: "white",
                    }),

                  }}
                // classNamePrefix="react-select"
                />
                {validation.touched.location_id && validation.errors.location_id && (
                  <FormFeedback style={{ display: 'block' }}>
                    {validation.errors.location_id}
                  </FormFeedback>
                )}
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
                  placeholder="Select status"
                  className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.status || ""}
                  invalid={
                    validation.touched.status
                      && validation.errors.status
                      ? true
                      : false
                  }
                >
                  <option value="">Select Status</option>
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
    </Modal>
  );
};

AddSubLocation.propTypes = {
  toggleAddModal: PropTypes.func,
  isOpen: PropTypes.bool,

  status: PropTypes.array,
  locateonsublocate: PropTypes.array,
};

export default AddSubLocation;
