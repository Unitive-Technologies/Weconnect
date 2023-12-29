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
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { getLco as onGetLco } from "/src/store/actions";
import Select from "react-select";
import { Link } from "react-router-dom";

const ViewLocation = (props) => {
  const { isOpen, handleViewLocation, location, lcoonlocation } = props;
  const dispatch = useDispatch();
  const [showEditLocation, setShowEditLocation] = useState(false);
  const selectLcoState = (state) => state.lco;
  const LcoProperties = createSelector(selectLcoState, (lco) => ({
    lcos: lco.lco,
    loading: lco.loading,
  }));

  const { lcos, loading } = useSelector(LcoProperties);

  useEffect(() => {
    if (lcos && !lcos.length) {
      dispatch(onGetLco());
    }
  }, [dispatch, lcos]);
  // console.log("Lco In add location: ", lcos);

  const options = lcoonlocation.map((option) => ({
    value: option.name,
    label: (
      <div>
        <h6>{option.name}</h6>
        <h6>{option.username}</h6>
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
      name: (location && location.name) || "",
      operator_id: (location && location.operator_id) || "",
      status_lbl: (location && location.status_lbl) || "",
      created_at: (location && location.created_at) || "",
      created_by_lbl: (location && location.created_by_lbl) || "my mso(mso)",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Enter district name"),
      operator_id: Yup.string().required("Select lco"),
      status_lbl: Yup.string().required("Select status"),
    }),
    onSubmit: (values) => {
      const updateLocation = {
        id: Math.floor(Math.random() * (30 - 20)) + 20,
        name: values["name"],
        operator_id: values["operator_id"],
        status_lbl: values["status_lbl"],
        created_at: new Date(),
        created_by_lbl: values["created_by_lbl"],
      };
      console.log("new district:" + updateLocation);
      // save new user
      dispatch(onAddDistrict(updateLocation));
      validation.resetForm();
      handleViewLocation();
    },
  });

  const handleCancel = () => {
    handleViewLocation();
    setShowEditLocation(false);
  };

  return (
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
        <Link
          style={{
            position: "absolute",
            marginLeft: "92%",
            marginTop: "1%",
          }}
          to="#!"
          className="btn btn-light me-1"
          onClick={() => setShowEditLocation(true)}
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
                <Label className="form-label">Location Name</Label>
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
            <Col lg={4}>
              <div className="mb-3">
                <Label className="form-label">Select LCO</Label>
                <Select
                  name="operator_id"
                  options={options}
                  onChange={(selectedOption) =>
                    validation.handleChange(selectedOption.value)
                  }
                  onBlur={validation.handleBlur}
                  value={options.find(
                    (opt) => opt.value === validation.values.operator_id
                  )}
                  styles={customStyles}
                  disabled={!showEditLocation}
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
                <Label className="form-label">Status</Label>
                <Input
                  name="status_lbl"
                  type="select"
                  placeholder="Select Status"
                  className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.status_lbl || ""}
                  disabled={!showEditLocation}
                >
                  <option value="">Select Status</option>
                  <option value="Active">Active</option>
                  <option value="Blocked">BLOCKED</option>
                  <option value="In-Active">In-Active</option>
                </Input>
                {validation.touched.status_lbl &&
                validation.errors.status_lbl ? (
                  <FormFeedback type="invalid">
                    {validation.errors.status_lbl}
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
  );
};

ViewLocation.propTypes = {
  handleViewLocation: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default ViewLocation;
