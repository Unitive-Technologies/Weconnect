import React, { useEffect, useState, useRef, useMemo } from "react";
import PropTypes from "prop-types";
import {
  Col,
  Row,
  Modal,
  ModalFooter,
  ModalHeader,
  ModalBody,
  Label,
  FormFeedback,
  Input,
  Form,
} from "reactstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import { addNewUser as onAddNewUser } from "/src/store/users/actions";
import { useDispatch } from "react-redux";

const AddUserModal = (props) => {
  const { isOpen, handleAddUser, userType, userStatus } = props;
  console.log("userType in add:" + JSON.stringify(userStatus));
  const dispatch = useDispatch();

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      name: "",
      email: "",
      mobile: "",
      usertype: "",
      status: "",
      message: "",
      role: "",
      designation: "",
      grouppolicy: "",
      loginid: "",
      password: "",
      confirmpassword: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please Enter Your Name"),
      email: Yup.string()
        .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Please Enter Valid Email")
        .required("Please Enter Your Email"),
      // mobile: Yup.array().required("Please Enter mobile"),
      mobile: Yup.string().required("Please Enter mobile Number"),
      usertype: Yup.string().required("Please Enter User Type"),
      status: Yup.string().required("Please Enter Status"),
      message: Yup.string().required("Please Enter Message"),
      role: Yup.string().required("Please Enter Role"),
      designation: Yup.string().required("Please Enter Designation"),
      grouppolicy: Yup.string().required("Please Enter Group Policy"),
      loginid: Yup.string().required("Please Enter Login ID"),
      password: Yup.string().required("Please Enter Password"),
      confirmpassword: Yup.string().required("Please Enter Confirm Password"),
    }),
    onSubmit: (values) => {
      const newUser = {
        id: Math.floor(Math.random() * (30 - 20)) + 20,
        name: values["name"],
        email: values["email"],
        mobile: values["mobile"],
        usertype: values["usertype"],
        status: values["status"],
        message: values["message"],
        role: values["role"],
        designation: values["designation"],
        grouppolicy: values["grouppolicy"],
        loginid: values["loginid"],
        password: values["password"],
        confirmpassword: values["confirmpassword"],
      };
      console.log("newUser:" + JSON.stringify(newUser));
      // save new user
      dispatch(onAddNewUser(newUser));
      validation.resetForm();
      handleAddUser();
    },
  });
  return (
    <Modal
      isOpen={isOpen}
      role="dialog"
      size="xl"
      autoFocus={true}
      centered={true}
      className="exampleModal"
      tabIndex="-1"
      toggle={handleAddUser}
    >
      <ModalHeader tag="h4" toggle={handleAddUser}>
        Add User
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
            <Col sm="4">
              <div className="mb-3">
                <Label className="form-label">
                  Name<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="name"
                  type="text"
                  placeholder="Insert Name"
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
                  Email<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="email"
                  label="Email"
                  type="email"
                  placeholder="Insert Email"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.email || ""}
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
                <Label className="form-label">
                  Mobile No.<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="mobile"
                  label="Mobile No."
                  placeholder="Insert Mobile Number"
                  type="text"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.mobile || ""}
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
                <Label className="form-label">
                  User Type<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="usertype"
                  type="select"
                  placeholder="Select User Type"
                  className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.usertype || ""}
                >
                  <option value="">Select User Type</option>
                  {userType.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.name}
                    </option>
                  ))}
                </Input>
                {validation.touched.usertype && validation.errors.usertype ? (
                  <FormFeedback type="invalid">
                    {validation.errors.usertype}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
            <Col sm="4">
              <div className="mb-3">
                <Label className="form-label">
                  Status<span style={{ color: "red" }}>*</span>
                </Label>
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
                  {userStatus.map((status) => (
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

              <div className="mb-3">
                <Label className="form-label">
                  InActive/Block Message<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="message"
                  type="textarea"
                  placeholder="Enter Message"
                  rows="3"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.message || ""}
                  invalid={
                    validation.touched.message && validation.errors.message
                      ? true
                      : false
                  }
                />
                {validation.touched.message && validation.errors.message ? (
                  <FormFeedback type="invalid">
                    {validation.errors.message}
                  </FormFeedback>
                ) : null}
              </div>
              <div className="mb-3">
                <Label className="form-label">
                  Role<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="role"
                  type="select"
                  placeholder="Select Role"
                  className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.role || ""}
                >
                  <option value="">Select Role</option>
                  <option value="21">Administrator</option>
                  <option value="22">Staff</option>
                  <option value="23">User</option>
                </Input>
                {validation.touched.role && validation.errors.role ? (
                  <FormFeedback type="invalid">
                    {validation.errors.role}
                  </FormFeedback>
                ) : null}
              </div>
              <div className="mb-3">
                <Label className="form-label">
                  Designation<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="designation"
                  type="select"
                  placeholder="Select Designation"
                  className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.designation || ""}
                >
                  <option value="">Select Designation</option>
                  <option value="dir">Director</option>
                </Input>
                {validation.touched.designation &&
                validation.errors.designation ? (
                  <FormFeedback type="invalid">
                    {validation.errors.designation}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
            <Col sm="4">
              <div className="mb-3">
                <Label className="form-label">Group Policy</Label>
                <Input
                  name="grouppolicy"
                  type="select"
                  placeholder="Select Group Policy"
                  className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.grouppolicy || ""}
                >
                  <option value="">Select Group Policy</option>
                  <option value="A">Active</option>
                  <option value="B">BLOCKED</option>
                  <option value="C">In-Active</option>
                </Input>
                {validation.touched.grouppolicy &&
                validation.errors.grouppolicy ? (
                  <FormFeedback type="invalid">
                    {validation.errors.grouppolicy}
                  </FormFeedback>
                ) : null}
              </div>
              <div className="mb-3">
                <Label className="form-label">
                  Login ID<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="loginid"
                  label="Login ID"
                  type="text"
                  placeholder="Login ID"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.loginid || ""}
                  invalid={
                    validation.touched.loginid && validation.errors.loginid
                      ? true
                      : false
                  }
                />
                {validation.touched.loginid && validation.errors.loginid ? (
                  <FormFeedback type="invalid">
                    {validation.errors.loginid}
                  </FormFeedback>
                ) : null}
              </div>
              <div className="mb-3">
                <Label className="form-label">
                  Password<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="password"
                  label="Password"
                  type="text"
                  placeholder="Password"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.password || ""}
                  invalid={
                    validation.touched.password && validation.errors.password
                      ? true
                      : false
                  }
                />
                {validation.touched.password && validation.errors.password ? (
                  <FormFeedback type="invalid">
                    {validation.errors.password}
                  </FormFeedback>
                ) : null}
              </div>
              <div className="mb-3">
                <Label className="form-label">
                  Confirm-Password<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="confirmpassword"
                  label="Confirm Password"
                  type="text"
                  placeholder="Retype Password"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.confirmpassword || ""}
                  invalid={
                    validation.touched.confirmpassword &&
                    validation.errors.confirmpassword
                      ? true
                      : false
                  }
                />
                {validation.touched.confirmpassword &&
                validation.errors.confirmpassword ? (
                  <FormFeedback type="invalid">
                    {validation.errors.confirmpassword}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
          </Row>

          <Row>
            <Col>
              <ModalFooter>
                <button type="submit" className="btn btn-success save-user">
                  Create
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
                    handleAddUser();
                  }}
                >
                  Cancel
                </button>
              </ModalFooter>
            </Col>
          </Row>
        </Form>
      </ModalBody>
    </Modal>
  );
};

AddUserModal.propTypes = {
  handleAddUser: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default AddUserModal;
