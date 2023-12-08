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
import { addSubLocation as onAddSublocation } from "/src/store/sublocation/actions";
import { useSelector, useDispatch } from "react-redux";

const AddSubLocation = (props) => {
  const { isOpen, toggle } = props;
  const dispatch = useDispatch();
  const [user, setUser] = useState();

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      name: "",
      location_id: "",
      status: "",
      created_at: "",
      created_by: "Admin",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Enter sublocation name"),
      location_id: Yup.string().required("Select location"),
      status: Yup.string().required("Select status"),
    }),
    onSubmit: (values) => {
      const newSubLocation = {
        id: Math.floor(Math.random() * (30 - 20)) + 20,
        name: values["name"],
        location_id: values["location_id"],
        status: values["status"],
        created_at: new Date(),
        created_by: values["created_by"],
      };
      console.log("new sub location:" + JSON.stringify(newSubLocation));
      // save new user
      dispatch(onAddSublocation(newSubLocation));
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
      {/* <Modal isOpen={modal} toggle={toggle}> */}
      <ModalHeader tag="h4">Add New Sub Location</ModalHeader>
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
                />
                {validation.touched.name && validation.errors.name ? (
                  <FormFeedback type="invalid">
                    {validation.errors.name}
                  </FormFeedback>
                ) : null}
              </div>

              <div className="mb-3">
                <Label className="form-label">Select Location</Label>
                <Input
                  name="location_id"
                  type="select"
                  placeholder="Select location"
                  className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.location_id || ""}
                >
                  <option value="">Select location</option>
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
                </Input>
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

AddSubLocation.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default AddSubLocation;