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
import Select from "react-select";
import { updateSublocation as onUpdateSublocation } from "/src/store/sublocation/actions";
import { getSublocation as onGetSublocation } from "/src/store/actions";

const ViewSubLocation = (props) => {
  const {
    isOpen,
    handleViewSubLocation,
    sublocation,
    status,
    locateonsublocate,
  } = props;
  const dispatch = useDispatch();
  const [showEditSubLocation, setShowEditSubLocation] = useState(false);

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
      created_at: (sublocation && sublocation.created_at) || "",
      created_by: (sublocation && sublocation.created_by) || "my mso(mso)",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Enter district name"),
      location_id: Yup.string().required("Select location"),
      status: Yup.string().required("Select status"),
    }),
    onSubmit: (values) => {
      const updateSubLocation = {
        id: values["id"],
        name: values["name"],
        location_id: values["location_id"],
        status: values["status"],
        created_at: new Date(),
        created_by: values["created_by"],
      };
      console.log("Updated Sublocation:" + JSON.stringify(updateSubLocation));
      dispatch(onUpdateSublocation(updateSubLocation));
      dispatch(onGetSublocation());
      validation.resetForm();
      handleViewSubLocation();
    },
  });

  const handleCancel = () => {
    handleViewSubLocation();
    setShowEditSubLocation(false);
  };

  return (
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
        <Link
          style={{
            position: "absolute",
            marginLeft: "92%",
            marginTop: "1%",
          }}
          to="#!"
          className="btn btn-light me-1"
          onClick={() => setShowEditSubLocation(true)}
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
            <Col lg={5}>
              <div className="mb-3">
                <Label className="form-label">Sub Location Name</Label>
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
              <div className="mb-3">
                <Label className="form-label">Status</Label>
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
            <Col lg={5}>
              <div className="mb-3">
                <Label className="form-label">Select Location</Label>
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
  );
};

ViewSubLocation.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default ViewSubLocation;
