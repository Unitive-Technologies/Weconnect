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
import { addSubLocation as onAddSubLocation } from "/src/store/sublocation/actions";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { getLocation as onGetLocation } from "/src/store/actions";
import Select from "react-select";

const AddSubLocation = (props) => {
  const { isOpen, handleAddSubLocation } = props;
  const dispatch = useDispatch();
  const [selectedLocation, setSelectedLocation] = useState(null);

  const selectLocationState = (state) => state.location;
  const locationProperties = createSelector(
    selectLocationState,
    (location) => ({
      locations: location.location,
      loading: location.loading,
    })
  );

  const { locations, loading } = useSelector(locationProperties);

  useEffect(() => {
    if (locations && !locations.length) {
      dispatch(onGetLocation());
    }
  }, [dispatch, locations]);

  const options = locations.map((option) => ({
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
      location_id: null,
      status: "",
      created_at: "",
      created_by: "Admin",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Enter name"),
      location_id: Yup.string().nullable().required("Select location"),
      status: Yup.string().required("Select status"),
    }),
    onSubmit: (values) => {
      console.log("Entered values in Add sublocation : ", values);
      const newSubLocation = {
        id: Math.floor(Math.random() * (30 - 20)) + 20,
        name: values["name"],
        location_id: values["location_id"],
        status: values["status"],
        created_at: new Date(),
        created_by: values["created_by"],
      };
      console.log("new sub location:" + JSON.stringify(newSubLocation));
      dispatch(onAddSubLocation(newSubLocation));
      validation.resetForm();
      handleAddSubLocation();
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
      toggle={handleAddSubLocation}
    >
      <ModalHeader tag="h4" toggle={handleAddSubLocation}>
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
                  Sub Location Name<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="name"
                  type="text"
                  placeholder="Enter name"
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
                  Select Location<span style={{ color: "red" }}>*</span>
                </Label>
                <Select
                  name="location_id"
                  options={options}
                  onChange={(selectedOption) => {
                    console.log("SelectedOption: ", selectedOption);
                    setSelectedLocation(selectedOption);
                    validation.handleChange({
                      target: {
                        name: "location_id",
                        value: selectedOption.value,
                      },
                    });
                  }}
                  onBlur={validation.handleBlur}
                  value={options.find(
                    (opt) => opt.value === validation.values.location_id
                  )}
                  styles={customStyles}
                />
                {validation.touched.location_id &&
                validation.errors.location_id ? (
                  <FormFeedback type="invalid">
                    {validation.errors.location_id}
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
                >
                  <option value="">Select Status</option>
                  <option value="1">Active</option>
                  <option value="2">In-Active</option>
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
                    handleAddSubLocation();
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
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default AddSubLocation;
