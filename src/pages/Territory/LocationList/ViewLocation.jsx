import React, { useEffect, useState } from "react";
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
import { useDispatch } from "react-redux";
import Select from "react-select";
import { Link } from "react-router-dom";
import { updateLocation as onUpdateLocation } from "/src/store/location/actions";
import {
  getLocation as onGetLocation,
  // getSingleLocation as onGetSingleLocation,
} from "/src/store/actions";
import ShowHistoryModal from "./ShowHistoryModal";

const ViewLocation = (props) => {
  const {
    isOpen,
    toggleViewLocation,
    location,
    lcoonlocation,
    status,
    singlelocation,
  } = props;
  const dispatch = useDispatch();
  const [showEditLocation, setShowEditLocation] = useState(false);

  const [showHistory, setShowHistory] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);


  const toggleHistoryModal = () => {
    setShowHistory(!showHistory);
  };

  console.log("Single location: ", JSON.stringify(location));

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
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      id: (location && location.id) || "",
      name: (location && location.name) || "",
      operator_id: (location && location.operator_id) || "",
      status: (location && location.status) || "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required("Enter location")
        .min(2, "Minimum length 2 character"),
      // name: Yup.string().required("Enter district name"),
      operator_id: Yup.string().required("Select lco"),
      status: Yup.string().required("Select status"),
    }),
    onSubmit: (values) => {
      const updateLocation = {
        id: values["id"],
        name: values["name"],
        operator_id: values["operator_id"],
        status: values["status"],
      };
      console.log("Updated Location:" + updateLocation);
      dispatch(onUpdateLocation(updateLocation));
      dispatch(onGetLocation());
      validation.resetForm();
      toggleViewLocation();
    },
  });

  const handleCancel = () => {
    toggleViewLocation();
    setShowEditLocation(false);
  };

  return (
    <>
      {showHistory && (
        <ShowHistoryModal
          isOpen={showHistory}
          toggleHistoryModal={toggleHistoryModal}
          location={location}
        />
      )}
      <Modal
        isOpen={isOpen}
        role="dialog"
        autoFocus={true}
        centered={true}
        className="exampleModal"
        tabIndex="-1"
        toggle={handleCancel}
        size="xl"
      >
        <ModalHeader toggle={handleCancel} tag="h4">
          {!showEditLocation
            ? `View ${(location && location.name) || ""}`
            : `Edit ${(location && location.name) || ""}`}
        </ModalHeader>
        {!showEditLocation && (
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
              onClick={() => setShowEditLocation(true)}
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
                  <Label className="form-label">Location Name<span style={{ color: "red" }}>*</span></Label>
                  <Input
                    name="name"
                    type="text"
                    placeholder="Enter location name"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.name || ""}
                    disabled={!showEditLocation}
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
              {/* <Col lg={4}>
                <div className="mb-3">
                  <Label className="form-label">Select LCO<span style={{ color: "red" }}>*</span></Label>

                  <Input
                    name="operator_id"
                    type="select"
                    placeholder="Select lco"
                    className="form-select"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.operator_id || ""}
                    disabled={!showEditLocation}
                  >
                    <option value="">Select lco</option>
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
              </Col> */}
              <Col lg={4}>
                <div className="mb-3">
                  <Label className="form-label">
                    Select Leo<span style={{ color: "red" }}>*</span>
                  </Label>
                  <Select
                    name="operator_id"
                    options={options}
                    onChange={(selectedOption) => {
                      console.log("SelectedOption: ", selectedOption);
                      setSelectedLocation(selectedOption);
                      validation.handleChange({
                        target: {
                          name: "operator_id",
                          value: selectedOption.value,
                        },
                      });
                    }}
                    disabled={!showEditLocation}
                    invalid={
                      validation.touched.operator_id && validation.errors.operator_id
                        ? true
                        : false
                    }
                    onBlur={validation.handleBlur}
                    value={options.find(
                      (opt) => opt.value === validation.values.operator_id
                    )}
                    styles={customStyles}
                  />

                  {validation.touched.operator_id &&
                    validation.errors.operator_id ? (
                    <FormFeedback type="invalid">
                      {validation.errors.operator_id}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Col lg={4}>
                <div className="mb-3">
                  <Label className="form-label">Status<span style={{ color: "red" }}>*</span></Label>
                  <Input
                    name="status"
                    type="select"
                    placeholder="Select Status"
                    className="form-select"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.status || ""}
                    disabled={!showEditLocation}
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
            {showEditLocation && (
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
    </>
  );
};

ViewLocation.propTypes = {
  toggleViewLocation: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default ViewLocation;
