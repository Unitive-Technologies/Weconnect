import React, { useEffect, useState, useRef, useMemo } from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Modal,
  ModalFooter,
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
import { addNewBroadCaster as onAddNewBroadCaster } from "/src/store/broadcaster/actions";
import { useSelector, useDispatch } from "react-redux";
import { getBroadCaster as onGetBroadCasters } from "/src/store/actions";

const AddNewBroadCaster = (props) => {
  const { isOpen, toggle, brodcastStatus } = props;
  const dispatch = useDispatch();
  const [user, setUser] = useState();

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      //BroadCaster: "",
      name: "",
      fullname: "",
      addr: "",
      contact_person: "",
      mobile_no: "",
      status: "",
      phone_no: "",
      email: "",
      description: "",
      created_at: "",
      created_by: "Admin",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Select name"),
      fullname: Yup.string().required("Select full name"),
      addr: Yup.string().required("Select address"),
      contact_person: Yup.string().required("Select contact person"),
      phone_no: Yup.string()
        .matches(/^[0-9]/, "Enter valid number")
        .min(8, "Min 8 digit number")
        .max(12, "Max 12 digit number"),
      mobile_no: Yup.string()
        .required("Enter mobile number")
        .matches(/^[0-9]/, "Enter valid number")
        .max(10, "Min 10 digit number"),
      email: Yup.string().required("Select email"),
      status: Yup.string().required("Select status"),
      description: Yup.string().required("Select description"),
    }),
    onSubmit: (values) => {
      const newBroadCaster = {
        id: Math.floor(Math.random() * (30 - 20)) + 20,
        name: values["name"],
        fullname: values["fullname"],
        addr: values["addr"],
        contact_person: values["contact_person"],
        mobile_no: values["mobile_no"],
        phone_no: values["phone_no"],
        email: values["email"],
        description: values["description"],
        status: values["status"],
        created_at: new Date(),
        created_by: values["created_by"],
      };
      console.log("newBroadCaster:" + newBroadCaster);
      // save new user
      dispatch(onAddNewBroadCaster(newBroadCaster));
      dispatch(onGetBroadCasters());
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
      size="xl"
      toggle={toggle}
    >
      {/* <Modal isOpen={modal} toggle={toggle}> */}
      <ModalHeader tag="h4" toggle={toggle}>Add New Broadcaster</ModalHeader>
      <ModalBody>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            validation.handleSubmit();
            return false;
          }}
        >
          <Row>
            <Col sm="4">
              <div className="mb-3">
                <Label className="form-label">Name<span style={{ color: 'red' }}>*</span></Label>
                <Input
                  name="name"
                  type="text"
                  placeholder="Enter name"
                  // className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.name || ""}
                  invalid={
                    validation.touched.name && validation.errors.name
                      ? true
                      : false
                  }
                ></Input>
                {validation.touched.name && validation.errors.name ? (
                  <FormFeedback type="invalid">
                    {validation.errors.name}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
            {console.log(
              "Add New BroadCaster name type: " + typeof validation.values.name
            )}
            <Col sm="4">
              <div className="mb-3">
                <Label className="form-label">Full-Name<span style={{ color: 'red' }}>*</span></Label>
                <Input
                  name="fullname"
                  type="text"
                  placeholder="Select fullname"
                  // className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.fullname || ""}
                  invalid={
                    validation.touched.fullname && validation.errors.fullname
                      ? true
                      : false
                  }
                ></Input>
                {validation.touched.fullname && validation.errors.fullname ? (
                  <FormFeedback type="invalid">
                    {validation.errors.fullname}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
            <Col sm="4">
              <div className="mb-3">
                <Label className="form-label">Contact Person<span style={{ color: 'red' }}>*</span></Label>
                <Input
                  name="contact_person"
                  // label="contactperson"
                  type="text"
                  placeholder="Select contact person name"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.contact_person || ""}
                  invalid={
                    validation.touched.contact_person &&
                      validation.errors.contact_person
                      ? true
                      : false
                  }
                ></Input>
                {validation.touched.contact_person &&
                  validation.errors.contact_person ? (
                  <FormFeedback type="invalid">
                    {validation.errors.contact_person}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
            {console.log("Add New BroadCaster Contact_person: " + validation.values.contact_person)}
            {console.log(
              "Add New BroadCaster Contact_person type: " + typeof validation.values.contact_person
            )}
          </Row>
          <Row>
            <Col sm="4">
              <div className="mb-3">
                <Label className="form-label">Mobile No.<span style={{ color: 'red' }}>*</span></Label>
                <Input
                  name="mobile_no"
                  type="text"
                  placeholder="Enter mobile  number"
                  // className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.mobile_no || ""}
                  invalid={
                    validation.touched.mobile_no &&
                      validation.errors.mobile_no
                      ? true
                      : false
                  }
                ></Input>
                {validation.touched.mobile_no && validation.errors.mobile_no ? (
                  <FormFeedback type="invalid">
                    {validation.errors.mobile_no}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
            <Col sm="4">
              <div className="mb-3">
                <Label className="form-label">Phone No.</Label>
                <Input
                  name="phone_no"
                  type="text"
                  placeholder="Enter phone number"
                  // className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.phone_no || ""}
                  invalid={
                    validation.touched.phone_no && validation.errors.phone_no
                      ? true
                      : false
                  }
                ></Input>
                {validation.touched.phone_no && validation.errors.phone_no ? (
                  <FormFeedback type="invalid">
                    {validation.errors.phone_no}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
            <Col sm="4">
              <div className="mb-3">
                <Label className="form-label">Email address<span style={{ color: 'red' }}>*</span></Label>
                <Input
                  name="email"
                  type="text"
                  placeholder="Enter email"
                  // className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.email || ""}
                  invalid={
                    validation.touched.email && validation.errors.email
                      ? true
                      : false
                  }
                ></Input>
                {validation.touched.email &&
                  validation.errors.email ? (
                  <FormFeedback type="invalid">
                    {validation.errors.email}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
          </Row>
          <Row>
            <Col sm="4">
              <div className="mb-3">
                <Label className="form-label">Address<span style={{ color: 'red' }}>*</span></Label>
                <Input
                  name="addr"
                  placeholder="Enter address"
                  // className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.addr || ""}
                  invalid={
                    validation.touched.addr &&
                      validation.errors.addr
                      ? true
                      : false
                  }
                ></Input>
                {validation.touched.addr && validation.errors.add ? (
                  <FormFeedback type="invalid">
                    {validation.errors.addr}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
            <Col sm="4">
              <div className="mb-3">
                <Label className="form-label">Description<span style={{ color: 'red' }}>*</span></Label>
                <Input
                  name="description"
                  type="textarea"
                  placeholder="Enter Description"
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
                />
                {validation.touched.description &&
                  validation.errors.description ? (
                  <FormFeedback type="invalid">
                    {validation.errors.description}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
            <Col sm="4">
              <div className="mb-3">
                <Label className="form-label">Status<span style={{ color: 'red' }}>*</span></Label>
                <Input
                  name="status"
                  type="select"
                  placeholder="Select Status"
                  className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.status || ""}
                  invalid={
                    validation.touched.status && validation.errors.status
                      ? true
                      : false
                  }
                >
                  <option value="">Select Status</option>
                  {brodcastStatus &&
                    brodcastStatus.map((status) => (
                      <option key={status.id} value={status.id}>
                        {status.name}
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
                    toggle();
                  }}
                >
                  Cancel
                </button>
              </ModalFooter>
            </Col>
          </Row>
        </Form>
      </ModalBody>
      {/* </Modal> */}
    </Modal>
  );
};

AddNewBroadCaster.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default AddNewBroadCaster;
