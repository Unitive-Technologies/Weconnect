import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
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
import { useDispatch } from "react-redux";
import { updateCity as onUpdateCity } from "/src/store/city/actions";

const ViewCity = (props) => {
  const { isOpen, handleViewCity, city } = props;
  const dispatch = useDispatch();
  const [showEditCity, setShowEditCity] = useState(false);

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      id: (city && city.id) || "",
      name: (city && city.name) || "",
      state_lbl: (city && city.state_lbl) || "",
      district_lbl: (city && city.district_lbl) || "",
      status: (city && city.status) || "",
      description: (city && city.description) || "",
      created_at: (city && city.created_at) || "",
      created_by: (city && city.created_by) || "my mso(mso)",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Enter district name"),
      state_lbl: Yup.string().required("Select state"),
      district_lbl: Yup.string().required("Select district"),
      status: Yup.string().required("Select status"),
      description: Yup.string().required("Enter description"),
    }),
    onSubmit: (values) => {
      const updateCity = {
        id: values["id"],
        district_lbl: values["district_lbl"],
        name: values["name"],
        state_lbl: values["state_lbl"],
        status: values["status"],
        description: values["description"],
        created_at: new Date(),
        created_by: values["created_by"],
      };
      console.log("Updated City:" + updateCity);
      dispatch(onUpdateCity(updateCity));
      validation.resetForm();
      handleViewCity();
    },
  });

  const handleCancel = () => {
    setShowEditCity(false);
    handleViewCity();
  };

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
        {!showEditCity
          ? `View ${(city && city.name) || ""}`
          : `Edit ${(city && city.name) || ""}`}
      </ModalHeader>
      {!showEditCity && (
        <Link
          style={{
            position: "absolute",
            marginLeft: "92%",
            marginTop: "1%",
          }}
          to="#!"
          className="btn btn-light me-1"
          onClick={() => setShowEditCity(true)}
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
                  disabled={!showEditCity}
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
                  State<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="state_lbl"
                  type="select"
                  placeholder="Select state"
                  className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.state_lbl || ""}
                  disabled={!showEditCity}
                >
                  {/* {stateNames.map((options) => (
                    <option key={options.id} value={options.name}>
                      {options.name}
                    </option>
                  ))} */}
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
                  District<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="district_lbl"
                  type="select"
                  placeholder="Select state"
                  className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.district_lbl || ""}
                  disabled={!showEditCity}
                >
                  {/* {stateNames.map((options) => (
                    <option key={options.id} value={options.name}>
                      {options.name}
                    </option>
                  ))} */}
                </Input>
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
                  disabled={!showEditCity}
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
                  disabled={!showEditCity}
                >
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
          {showEditCity && (
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
      {/* </Modal> */}
    </Modal>
  );
};

ViewCity.propTypes = {
  handleViewCity: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default ViewCity;
