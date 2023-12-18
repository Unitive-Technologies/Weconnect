import React, { useEffect, useState, useRef, useMemo } from "react";
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
} from "reactstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { getLocation as onGetLocation } from "/src/store/actions";
import Select from "react-select";

const ViewSubLocation = (props) => {
  const { isOpen, toggle, sublocation } = props;
  const dispatch = useDispatch();
  const [showEditSubLocation, setShowEditSubLocation] = useState(false);
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
        id: Math.floor(Math.random() * (30 - 20)) + 20,
        name: values["name"],
        location_id: values["location_id"],
        status: values["status"],
        created_at: new Date(),
        created_by: values["created_by"],
      };
      console.log("new district:" + updateSubLocation);
      // save new user
      dispatch(onAddDistrict(updateSubLocation));
      validation.resetForm();
      toggle();
    },
  });

  const editToggle = () => {
    toggle();
    setShowEditSubLocation(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      role="dialog"
      autoFocus={true}
      centered={true}
      className="exampleModal"
      tabIndex="-1"
      toggle={toggle}
    >
      {!showEditSubLocation ? (
        <ModalHeader toggle={toggle} tag="h4">
          View {validation.values.name}
          <i
            className="bx bx bxs-edit"
            style={{ marginLeft: "300px", cursor: "pointer" }}
            onClick={() => setShowEditSubLocation(true)}
          ></i>
        </ModalHeader>
      ) : (
        <ModalHeader toggle={editToggle} tag="h4">
          Edit Sublocation
        </ModalHeader>
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
            <Col sm="12">
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
                <Label className="form-label">Select Location</Label>
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
                  <option value="Active">Active</option>
                  <option value="In-Active">In-Active</option>
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
              <div className="text-end">
                <button type="submit" className="btn btn-success save-user">
                  Save
                </button>
              </div>
            </Col>
          </Row>
        </Form>
      </ModalBody>
      {/* </Modal> */}
    </Modal>
  );
};

ViewSubLocation.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default ViewSubLocation;
