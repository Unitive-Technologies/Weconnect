import React, { useEffect, useState, useRef, useMemo } from "react";
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
import { updateSublocation as onUpdateSublocation } from "/src/store/sublocation/actions";
import { getSublocation as onGetSublocation } from "/src/store/actions";
import ShowHistoryModal from "./ShowHistoryModal";


const ViewSubLocation = (props) => {
  const {
    isOpen,
    toggleViewModal,
    sublocation,
    status,
    resetSelection,
    locateonsublocate,
    singleSubLocation,
  } = props;
  const dispatch = useDispatch();
  console.log("rowdata on view:" + JSON.stringify(sublocation));
  const [showEditSubLocation, setShowEditSubLocation] = useState(false);

  const [showHistory, setShowHistory] = useState(false);

  const toggleHistoryModal = () => {
    setShowHistory(!showHistory);
  };

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
      id: (sublocation && sublocation.id) || "",
      name: (sublocation && sublocation.name) || "",
      location_id: (sublocation && sublocation.location_id) || "",
      status: (sublocation && sublocation.status) || "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required("Enter Sublocation")
        .min(2, "Minimum length 2 characters")
        .max(12, "Maximum length 12 characters"),
      // location_id: Yup.string().required("Select location"),
      // status: Yup.string().required("Select status"),
    }),

    onSubmit: (values) => {
      const updateSubLocation = {
        id: values["id"],
        code: values["code"],
        discount_value: {},
        name: values["name"],
        location_id: values["location_id"],
        status: values["status"],
      };
      console.log("Updated Sublocation:" + JSON.stringify(updateSubLocation));
      dispatch(onUpdateSublocation(updateSubLocation));
      dispatch(onGetSublocation());
      validation.resetForm();
      setShowEditSubLocation(false);
      resetSelection();
      toggleViewModal();
    },
  });

  const handleCancel = () => {
    setShowEditSubLocation(false);
    resetSelection();
    toggleViewModal();
  };

  return (
    <>
      {showHistory && (
        <ShowHistoryModal
          isOpen={showHistory}
          toggleHistoryModal={toggleHistoryModal}
          sublocation={sublocation}
        />
      )}
      <Modal
        isOpen={isOpen}
        role="dialog"
        autoFocus={true}
        size="xl"
        centered={true}
        className="exampleModal"
        tabIndex="-1"
        toggle={handleCancel}
      >
        <ModalHeader toggle={handleCancel} tag="h4">
          {!showEditSubLocation
            ? `View ${(sublocation && sublocation.name) || ""}`
            : `Edit ${(sublocation && sublocation.name) || ""}`}
        </ModalHeader>
        {!showEditSubLocation && (
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
              onClick={() => setShowEditSubLocation(true)}
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
                  <Label className="form-label">Sublocation Name<span style={{ color: "red" }}>*</span></Label>
                  <Input
                    name="name"
                    type="text"
                    placeholder="Enter sublocation name"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.name || ""}
                    invalid={
                      validation.touched.name && validation.errors.name
                        ? true
                        : false
                    }
                    disabled={!showEditSubLocation}
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
                  <Label className="form-label">Location<span style={{ color: "red" }}>*</span></Label>
                  {/* <Select
                  name="location_id"
                  options={options}
                  onChange={(selectedOption) =>
                    validation.handleChange(selectedOption.value)
                  }
                  // onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={options.find(
                    (opt) => opt.value === validation.values.location_id
                  )}
                  styles={customStyles}
                  // value={validation.values.location_id || ""}
                /> */}
                  <Input
                    name="location_id"
                    type="select"
                    placeholder="Select location"
                    className="form-select"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.location_id || ""}
                    disabled={!showEditSubLocation}
                  >
                    {/* <option value="">Select lco</option> */}
                    {locateonsublocate.map((options) => (
                      <option key={options.id} value={options.id}>
                        {options.name}
                      </option>
                    ))}
                  </Input>
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
                  <Label className="form-label">Status<span style={{ color: "red" }}>*</span></Label>
                  <Input
                    name="status"
                    type="select"
                    placeholder="Select Status"
                    className="form-select"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.status || ""}
                    disabled={!showEditSubLocation}
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
            {showEditSubLocation && (
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
      </Modal>
    </>
  );
};

ViewSubLocation.propTypes = {
  toggleViewModal: PropTypes.func,
  resetSelection: PropTypes.func,
  isOpen: PropTypes.bool,

  sublocation: PropTypes.object,
  status: PropTypes.array,
};

export default ViewSubLocation;
