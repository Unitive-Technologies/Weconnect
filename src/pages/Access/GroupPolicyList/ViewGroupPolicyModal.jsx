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
import { updateUser as onUpdateUser } from "/src/store/users/actions";

const ViewGroupPolicyModal = (props) => {
  const { isOpen, toggle, user } = props;
  // console.log("Customeruser in view modal:" + JSON.stringify(user));
  const dispatch = useDispatch();

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      name: user.name,
      login: user.username,
      mobile: user.mobile_no,
      email: user.email,
      status: user.status,
      lco: user.lco,
      lcocode: user.lco_code,
      lastlogin: user.last_login_at,
      createdat: user.created_at,
      createdby: user.created_by,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please Enter Your Name"),
      login: Yup.string().required("Please Enter Login ID"),
      mobile: Yup.string().required("Please Enter mobile Number"),
      email: Yup.string()
        .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Please Enter Valid Email")
        .required("Please Enter Your Email"),
      // mobile: Yup.array().required("Please Enter mobile"),

      status: Yup.string().required("Please Enter Status"),
      lco: Yup.string().required("Please Enter LCO"),
      lcocode: Yup.string().required("Please Enter LCO Code"),
      lastlogin: Yup.string().required("Please Enter Last Login Time"),
      createdat: Yup.string().required("Please Enter Created At"),

      createdby: Yup.string().required("Please Enter Created By"),
    }),
    onSubmit: (values) => {
      const updateUser = {
        id: user.id,
        name: values.name,
        login: values.username,
        mobile: values.mobile,
        email: values.email,
        status: values.status,
        lco: values.lco,
        lcocode: values.lcocode,
        lastlogin: values.lastlogin,
        createdat: values.createdat,
        createdby: values.createdby,
      };

      // update user
      dispatch(onUpdateUser(updateUser));
      validation.resetForm();
      toggle();
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
      <ModalHeader toggle={toggle} tag="h4">
        View Group Policy
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
            <Col sm="6">
              <div className="mb-3">
                <Label className="form-label">Name</Label>
                <Input
                  name="name"
                  type="text"
                  placeholder="Insert Name"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.initialValues.name || ""}
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
                <Label className="form-label">Login ID</Label>
                <Input
                  name="login"
                  label="Login ID"
                  type="text"
                  placeholder="Login ID"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.initialValues.login || ""}
                  invalid={
                    validation.touched.login && validation.errors.login
                      ? true
                      : false
                  }
                />
                {validation.touched.login && validation.errors.login ? (
                  <FormFeedback type="invalid">
                    {validation.errors.login}
                  </FormFeedback>
                ) : null}
              </div>

              <div className="mb-3">
                <Label className="form-label">Mobile No.</Label>
                <Input
                  name="mobile"
                  label="Mobile No."
                  placeholder="Insert Mobile Number"
                  type="text"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.initialValues.mobile || ""}
                  invalid={
                    validation.touched.mobile && validation.errors.mobile
                      ? true
                      : false
                  }
                />
                {validation.touched.mobile && validation.errors.mobile ? (
                  <FormFeedback type="invalid">
                    {validation.errors.mobile}
                  </FormFeedback>
                ) : null}
              </div>

              <div className="mb-3">
                <Label className="form-label">Email</Label>
                <Input
                  name="email"
                  label="Email"
                  type="email"
                  placeholder="Insert Email"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.initialValues.email || ""}
                  invalid={
                    validation.touched.email && validation.errors.email
                      ? true
                      : false
                  }
                />
                {validation.touched.email && validation.errors.email ? (
                  <FormFeedback type="invalid">
                    {validation.errors.email}
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
                  value={validation.initialValues.status || ""}
                >
                  {/* <option value="">Select Status</option> */}
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
            <Col sm="6">
              <div className="mb-3">
                <Label className="form-label">LCO</Label>
                <Input
                  name="lco"
                  type="text"
                  placeholder="LCO"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.initialValues.lco || ""}
                  invalid={
                    validation.touched.lco && validation.errors.lco
                      ? true
                      : false
                  }
                />
                {validation.touched.lco && validation.errors.lco ? (
                  <FormFeedback type="invalid">
                    {validation.errors.lco}
                  </FormFeedback>
                ) : null}
              </div>

              <div className="mb-3">
                <Label className="form-label">LCO Code</Label>
                <Input
                  name="lcocode"
                  label="LCO Code"
                  type="text"
                  placeholder="LCO Code"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.initialValues.lcocode || ""}
                  invalid={
                    validation.touched.lcocode && validation.errors.lcocode
                      ? true
                      : false
                  }
                />
                {validation.touched.lcocode && validation.errors.lcocode ? (
                  <FormFeedback type="invalid">
                    {validation.errors.lcocode}
                  </FormFeedback>
                ) : null}
              </div>

              <div className="mb-3">
                <Label className="form-label">Last Login Time</Label>
                <Input
                  name="lastlogin"
                  label="Last Login Time"
                  placeholder="Last Login Time"
                  type="text"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.initialValues.lastlogin || ""}
                  invalid={
                    validation.touched.lastlogin && validation.errors.lastlogin
                      ? true
                      : false
                  }
                />
                {validation.touched.lastlogin && validation.errors.lastlogin ? (
                  <FormFeedback type="invalid">
                    {validation.errors.lastlogin}
                  </FormFeedback>
                ) : null}
              </div>

              <div className="mb-3">
                <Label className="form-label">Created At</Label>
                <Input
                  name="createdat"
                  label="Created At"
                  type="text"
                  placeholder="Created At"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.initialValues.createdat || ""}
                  invalid={
                    validation.touched.createdat && validation.errors.createdat
                      ? true
                      : false
                  }
                />
                {validation.touched.createdat && validation.errors.createdat ? (
                  <FormFeedback type="invalid">
                    {validation.errors.createdat}
                  </FormFeedback>
                ) : null}
              </div>

              <div className="mb-3">
                <Label className="form-label">Created By</Label>
                <Input
                  name="createdby"
                  label="Created By"
                  type="text"
                  placeholder="Created By"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.initialValues.createdby || ""}
                  invalid={
                    validation.touched.createdby && validation.errors.createdby
                      ? true
                      : false
                  }
                />
                {validation.touched.createdby && validation.errors.createdby ? (
                  <FormFeedback type="invalid">
                    {validation.errors.createdby}
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

ViewGroupPolicyModal.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default ViewGroupPolicyModal;
