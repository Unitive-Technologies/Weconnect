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
import { addCity as onAddCity } from "/src/store/city/actions";
import { useDispatch } from "react-redux";

const AddNewCity = (props) => {
  const { isOpen, handleShowCity } = props;
  const dispatch = useDispatch();

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      name: "",
      state_lbl: "",
      district_lbl: "",
      status: "",
      description: "",
      created_at: "",
      created_by: "my mso(mso)",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Enter city name"),
      state_lbl: Yup.string().required("Select state"),
      district_lbl: Yup.string().required("select district"),
      status: Yup.string().required("Select status"),
      description: Yup.string().required("Enter description"),
    }),
    onSubmit: (values) => {
      const newCity = {
        id: Math.floor(Math.random() * (30 - 20)) + 20,
        name: values["name"],
        state_lbl: values["state_lbl"],
        district_lbl: values["district_lbl"],
        status: values["status"],
        description: values["description"],
        created_at: new Date(),
        created_by: values["created_by"],
      };
      console.log("new city:" + newCity);
      // save new user
      dispatch(onAddCity(newCity));
      validation.resetForm();
      handleShowCity();
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
                  District Name<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="district_lbl"
                  type="text"
                  placeholder="Enter district name"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.district_lbl || ""}
                  invalid={
                    validation.touched.district_lbl &&
                    validation.errors.district_lbl
                      ? true
                      : false
                  }
                />
                {validation.touched.district_lbl &&
                validation.errors.district_lbl ? (
                  <FormFeedback type="invalid">
                    {validation.errors.district_lbl}
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
                  name="state_lbl"
                  type="select"
                  placeholder="Select state"
                  className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.state_lbl || ""}
                >
                  <option value="">Select state</option>
                  <option value="1">Delhi</option>
                  <option value="2">Puducherry</option>
                  <option value="3">Ladakh</option>
                  <option value="4">Andaman and Nicobar Islands</option>
                  <option value="5">Lakshadweep</option>
                  <option value="6">Daman and Diu</option>
                  <option value="7">Dadra and Nagar Haveli</option>
                  <option value="8">Chandigarh</option>
                  <option value="9">West Bengal</option>
                  <option value="10">Uttarakhand</option>
                  <option value="11">Utter Pradesh</option>
                  <option value="12">Tripura</option>
                  <option value="13">Telangana</option>
                  <option value="14">Tamil Nadu</option>
                  <option value="15">Sikkim</option>
                  <option value="16">Rajasthan</option>
                  <option value="17">Punjab</option>
                  <option value="18">Odisha</option>
                  <option value="19">Nagaland</option>
                  <option value="20">Mizoram</option>
                  <option value="21">Meghalaya</option>
                  <option value="22">Manipur</option>
                  <option value="23">Maharashtra</option>
                  <option value="24">Madhya Pradesh</option>
                  <option value="25">Kerala</option>
                  <option value="26">Karnataka</option>
                  <option value="27">Jharkhand</option>
                  <option value="28">Jammu and Kashmir</option>
                  <option value="29">Himachal Pradesh</option>
                  <option value="30">Haryana</option>
                  <option value="31">Gujarat</option>
                  <option value="32">Goa</option>
                  <option value="33">Chattisgarh</option>
                  <option value="34">Bihar</option>
                  <option value="35">Assam</option>
                  <option value="36">Arunachal Pradesh</option>
                  <option value="37">Andhra Pradesh</option>
                </Input>
                {validation.touched.state_lbl && validation.errors.state_lbl ? (
                  <FormFeedback type="invalid">
                    {validation.errors.state_lbl}
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
                >
                  <option value="">Select Status</option>
                  <option value="11">Active</option>
                  <option value="12">BLOCKED</option>
                  <option value="13">In-Active</option>
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
};

export default AddNewCity;
