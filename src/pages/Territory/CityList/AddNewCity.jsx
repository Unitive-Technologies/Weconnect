import React, { useState, useEffect } from "react";
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
import { addCity as onAddCity } from "/src/store/city/actions";
import { useSelector, useDispatch } from "react-redux";
import {
  getCity as onGetCity,
  getDistrictByStateid as onGetDistrictByStateid,
} from "/src/store/actions";
import { createSelector } from "reselect";

const AddNewCity = (props) => {
  const { isOpen, handleShowCity, status, statelist } = props;
  const selectCityState = (state) => state.city;
  const cityProperties = createSelector(selectCityState, (city) => ({
    cits: city.city,
    loading: city.loading,
    districtlist: city.districtlist,
  }));
  const { cits, loading, districtlist } = useSelector(cityProperties);
  const dispatch = useDispatch();

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      name: "",
      state_id: "",
      district_id: "",
      status: "",
      description: "",
      created_at: "",
      created_by: "my mso(mso)",
      type: 3,
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required("Enter District")
        .min(2, "Minimum length 2 character"),

      state_id: Yup.string().required("Select state"),
      district_id: Yup.string().required("select district"),
      status: Yup.string().required("Select status"),
      description: Yup.string().required("Enter description"),
    }),
    onSubmit: (values) => {
      const newCity = {
        // id: Math.floor(Math.random() * (30 - 20)) + 20,
        name: values["name"],
        state_id: values["state_id"],
        district_id: values["district_id"],
        status: values["status"],
        description: values["description"],
        // created_at: new Date(),
        // created_by: values["created_by"],
        type: values["type"],
      };
      console.log("new city:" + JSON.stringify(newCity));
      dispatch(onAddCity(newCity));
      dispatch(onGetCity());
      validation.resetForm();
      handleShowCity();
    },
    onReset: (values) => {
      validation.setValues(validation.initialValues);
    },
  });
  useEffect(() => {
    dispatch(onGetDistrictByStateid(validation.values.state_id));
  }, [dispatch, validation.values.state_id]);

  return (
    <Modal
      isOpen={isOpen}
      role="dialog"
      size="xl"
      autoFocus={true}
      centered={true}
      className="exampleModal"
      tabIndex="-1"
      toggle={handleShowCity}
    >
      <ModalHeader tag="h4" toggle={handleShowCity}>
        Add New City
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
                  City Name<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="name"
                  type="text"
                  placeholder="Enter city name"
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
            <Col lg={4}>
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
                  invalid={
                    validation.touched.state_id && validation.errors.state_id
                      ? true
                      : false
                  }
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
            <Col lg={4}>
              <div className="mb-3">
                <Label className="form-label">
                  District Name<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="district_id"
                  type="select"
                  placeholder="Enter district name"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.district_id || ""}
                  invalid={
                    validation.touched.district_id &&
                      validation.errors.district_id
                      ? true
                      : false
                  }
                >
                  <option>Select district</option>
                  {districtlist.map((options) => (
                    <option key={options.id} value={options.id}>
                      {options.name}
                    </option>
                  ))}
                </Input>
                {validation.touched.district_id &&
                  validation.errors.district_id ? (
                  <FormFeedback type="invalid">
                    {validation.errors.district_id}
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
                  invalid={
                    validation.touched.status && validation.errors.status
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
                    handleShowCity();
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

AddNewCity.propTypes = {
  handleShowCity: PropTypes.func,
  isOpen: PropTypes.bool,
  statelist: PropTypes.array,
  status: PropTypes.array,
};

export default AddNewCity;
