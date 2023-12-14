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
import { addWareHouseList as onAddWareHouseList } from "/src/store/warehouse/actions";
import { useSelector, useDispatch } from "react-redux";

const AddNewWareHouse = (props) => {
  const { isOpen, toggle } = props;
  const dispatch = useDispatch();
  const [user, setUser] = useState();

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      name: "",
      contact_person: "",
      mobile_no: "",
      operator: "",
      description: "",
      address: "",
      status: "",
      created_at: "",
      created_by: "NIKHIL REDDY(nikky)",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Enter name"),
      contact_person: Yup.string().required("Enter contact person"),
      mobile_no: Yup.string().required("Enter contact number"),
      operator: Yup.string().required("Select operator"),
      description: Yup.string().required("Enter description"),
      address: Yup.string().required("Enter address"),
      status: Yup.string().required("Select status"),
    }),
    onSubmit: (values) => {
      const newWareHouse = {
        id: Math.floor(Math.random() * (30 - 20)) + 20,
        name: values["name"],
        contact_person: values["contact_person"],
        mobile_no: values["mobile_no"],
        status: values["status"],
        operator: values["operator"],
        description: values["description"],
        address: values["address"],
        created_at: new Date(),
        created_by: values["created_by"],
      };
      console.log("New Warehouse:" + JSON.stringify(newWareHouse));
      // save new user
      dispatch(onAddWareHouseList(newWareHouse));
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
      <ModalHeader toggle={toggle} tag="h4">
        Add New Warehouse
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
                  Name<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="name"
                  type="text"
                  placeholder="Enter name"
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
                  Contact Person<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="contact_person"
                  type="text"
                  placeholder="Enter contact person"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.contact_person || ""}
                  invalid={
                    validation.touched.contact_person &&
                    validation.errors.contact_person
                      ? true
                      : false
                  }
                />
                {validation.touched.contact_person &&
                validation.errors.contact_person ? (
                  <FormFeedback type="invalid">
                    {validation.errors.contact_person}
                  </FormFeedback>
                ) : null}
              </div>

              <div className="mb-3">
                <Label className="form-label">
                  Contact No.<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="mobile_no"
                  type="text"
                  placeholder="Enter contact number"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.mobile_no || ""}
                  invalid={
                    validation.touched.mobile_no && validation.errors.mobile_no
                      ? true
                      : false
                  }
                />
                {validation.touched.mobile_no && validation.errors.mobile_no ? (
                  <FormFeedback type="invalid">
                    {validation.errors.mobile_no}
                  </FormFeedback>
                ) : null}
              </div>

              <div className="mb-3">
                <Label className="form-label">
                  Status<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="status"
                  type="select"
                  placeholder="Select status"
                  className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.status || ""}
                >
                  <option value="">Select status</option>
                  <option value="Active">Active</option>
                  <option value="In_Active">In-Active</option>
                </Input>
                {validation.touched.status && validation.errors.status ? (
                  <FormFeedback type="invalid">
                    {validation.errors.status}
                  </FormFeedback>
                ) : null}
              </div>

              <div className="mb-3">
                <Label className="form-label">
                  Operator<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="operator"
                  type="select"
                  placeholder="Select brand type"
                  className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.operator || ""}
                >
                  <option value="">Select brand type</option>
                  <option value="STB">STB</option>
                  <option value="Smartcard">Smartcard</option>
                </Input>
                {validation.touched.operator && validation.errors.operator ? (
                  <FormFeedback type="invalid">
                    {validation.errors.operator}
                  </FormFeedback>
                ) : null}
              </div>

              <div className="mb-3">
                <Label className="form-label">
                  Description<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="description"
                  type="textarea"
                  placeholder="Enter description"
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

              <div className="mb-3">
                <Label className="form-label">
                  Address<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="address"
                  type="text"
                  placeholder="Enter address"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.address || ""}
                  invalid={
                    validation.touched.address && validation.errors.address
                      ? true
                      : false
                  }
                />
                {validation.touched.address && validation.errors.address ? (
                  <FormFeedback type="invalid">
                    {validation.errors.address}
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
    </Modal>
  );
};

AddNewWareHouse.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default AddNewWareHouse;