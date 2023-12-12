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
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { getLco as onGetLco } from "/src/store/actions";
import Select from "react-select";

const ViewLocation = (props) => {
  const { isOpen, toggle, location } = props;
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

  const options = lcos.map((option) => ({
    value: option.code,
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
      lco: (location && location.lco) || "",
      status_lbl: (location && location.status_lbl) || "",
      created_at: (location && location.created_at) || "",
      created_by: (location && location.created_by) || "my mso(mso)",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Enter district name"),
      lco: Yup.string().required("Select lco"),
      status_lbl: Yup.string().required("Select status"),
    }),
    onSubmit: (values) => {
      const updateLocation = {
        id: Math.floor(Math.random() * (30 - 20)) + 20,
        name: values["name"],
        lco: values["lco"],
        status_lbl: values["status_lbl"],
        created_at: new Date(),
        created_by: values["created_by"],
      };
      console.log("new district:" + updateLocation);
      // save new user
      dispatch(onAddDistrict(updateLocation));
      validation.resetForm();
      toggle();
    },
  });

  const editToggle = () => {
    toggle();
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
      toggle={toggle}
    >
      {!showEditLocation ? (
        <ModalHeader toggle={toggle} tag="h4">
          View {validation.values.name}
          <i
            className="bx bx bxs-edit"
            style={{ marginLeft: "300px", cursor: "pointer" }}
            onClick={() => setShowEditLocation(true)}
          ></i>
        </ModalHeader>
      ) : (
        <ModalHeader toggle={editToggle} tag="h4">
          Edit District
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

              <div className="mb-3">
                <Label className="form-label">Select LCO</Label>
                <Select
                  name="lco"
                  options={options}
                  onChange={(selectedOption) =>
                    validation.handleChange(selectedOption.value)
                  }
                  onBlur={validation.handleBlur}
                  value={options.find(
                    (opt) => opt.value === validation.values.lco
                  )}
                  styles={customStyles}
                  disabled={!showEditLocation}
                />
                {validation.touched.lco && validation.errors.lco ? (
                  <FormFeedback type="invalid">
                    {validation.errors.lco}
                  </FormFeedback>
                ) : null}
              </div>

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

ViewLocation.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default ViewLocation;
