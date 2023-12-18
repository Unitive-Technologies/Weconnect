import React, { useEffect, useState, useRef, useMemo } from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
  FormFeedback,
  UncontrolledTooltip,
  Input,
  Form,
} from "reactstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import { addLocation as onAddLocation } from "/src/store/location/actions";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { getLco as onGetLco } from "/src/store/actions";
import Select from "react-select";

const AddNewLocation = (props) => {
  const { isOpen, toggle } = props;
  const dispatch = useDispatch();
  const [selectedLco, setSelectedLco] = useState(null);

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

  const options = lcos.map((option) => ({
    value: option.id,
    label: (
      <div>
        <h6>{option.name}</h6>
        <h6>{option.username}</h6>
        <p>Regional Office: {option.branch_lbl}</p>
        <p>Distributor: {option.distributor_lbl}</p>
      </div>
    ),
  }));

  // console.log("LCO Options: ", options);

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
      operator_id: null,
      status_lbl: "",
      created_at: "",
      created_by: "my mso(mso)",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Enter location name"),
      operator_id: Yup.string().nullable().required("Select LCO"),
      status_lbl: Yup.string().required("Select status"),
    }),
    onSubmit: (values) => {
      console.log("Submittted values: ", values);
      const newLocation = {
        id: Math.floor(Math.random() * (30 - 20)) + 20,
        name: values["name"],
        operator_id: values["operator_id"],
        status_lbl: values["status"],
        created_at: new Date(),
        created_by: values["created_by"],
      };
      console.log("new location:" + newLocation);
      dispatch(onAddLocation(newLocation));
      validation.resetForm();
      toggle();
    },
    onReset: (values) => {
      validation.setValues(validation.initialValues);
    },
  });

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
      <ModalHeader tag="h4" toggle={toggle}>
        Add New Location
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
            <Col sm="12">
              <div className="mb-3">
                <Label className="form-label">
                  Location Name<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="name"
                  type="text"
                  placeholder="Enter location name"
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

              <div className="mb-3">
                <Label className="form-label">
                  Select LCO<span style={{ color: "red" }}>*</span>
                </Label>
                <Select
                  name="operator_id"
                  options={options}
                  onChange={(selectedOption) => {
                    console.log("SelectedOption: ", selectedOption);
                    setSelectedLco(selectedOption);
                    validation.handleChange({
                      target: {
                        name: "operator_id",
                        value: selectedOption.value,
                      },
                    });
                  }}
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

              <div className="mb-3">
                <Label className="form-label">
                  Status<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="status_lbl"
                  type="select"
                  placeholder="Select Status"
                  className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.status_lbl || ""}
                >
                  <option value="">Select Status</option>
                  <option value="Active">Active</option>
                  <option value="Blocked">BLOCKED</option>
                  <option value="Inactive">In-Active</option>
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
          <Row>
            <Col sm="8">
              <div className="d-flex flex-wrap gap-2">
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
                    toggle();
                  }}
                >
                  Cancel
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

AddNewLocation.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default AddNewLocation;
