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
      address: "",
      contactperson: "",
      mobile: "",
      status: "",
      phone: "",
      emailaddress: "",
      description: "",
      created_at: "",
      created_by: "Admin",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Select broadcaster name"),
      fullname: Yup.string().required("Select broadcaster full name"),
      address: Yup.string().required("Select address"),
      contactperson: Yup.string().required("Select contact person"),
      mobile: Yup.string().required("Select mobile no"),
      phone: Yup.string().required("Select phone number"),
      emailaddress: Yup.string().required("Select email"),
      status: Yup.string().required("Select status"),
      description: Yup.string().required("Select description"),
    }),
    onSubmit: (values) => {
      const newBroadCaster = {
        id: Math.floor(Math.random() * (30 - 20)) + 20,
        name: values["name"],
        fullname: values["fullname"],
        address: values["address"],
        contactperson: values["contact"],
        mobile: values["mobile"],
        phone: values["phone"],
        emailaddress: values["emailaddress"],
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
                ></Input>
                {validation.touched.name && validation.errors.name ? (
                  <FormFeedback type="invalid">
                    {validation.errors.name}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
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
                  name="contactperson"
                  label="contactperson"
                  type="text"
                  placeholder="Select contact person name"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.contactperson || ""}
                ></Input>
                {validation.touched.contactperson &&
                  validation.errors.contactperson ? (
                  <FormFeedback type="invalid">
                    {validation.errors.contactperson}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
          </Row>
          <Row>
            <Col sm="4">
              <div className="mb-3">
                <Label className="form-label">Mobile No.<span style={{ color: 'red' }}>*</span></Label>
                <Input
                  name="mobile"
                  type="text"
                  placeholder="Enter mobile  number"
                  // className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.mobile || ""}
                ></Input>
                {validation.touched.mobile && validation.errors.mobile ? (
                  <FormFeedback type="invalid">
                    {validation.errors.mobile}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
            <Col sm="4">
              <div className="mb-3">
                <Label className="form-label">Phone No.</Label>
                <Input
                  name="phone"
                  type="text"
                  placeholder="Enter phone number"
                  // className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.phone || ""}
                ></Input>
                {validation.touched.phone && validation.errors.phone ? (
                  <FormFeedback type="invalid">
                    {validation.errors.phone}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
            <Col sm="4">
              <div className="mb-3">
                <Label className="form-label">Email address<span style={{ color: 'red' }}>*</span></Label>
                <Input
                  name="emailaddress"
                  type="text"
                  placeholder="Enter email"
                  // className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.emailaddress || ""}
                ></Input>
                {validation.touched.emailaddress &&
                  validation.errors.emailaddress ? (
                  <FormFeedback type="invalid">
                    {validation.errors.emailaddress}
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
                  name="address"
                  placeholder="Enter address"
                  // className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.address || ""}
                ></Input>
                {validation.touched.address && validation.errors.address ? (
                  <FormFeedback type="invalid">
                    {validation.errors.address}
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
