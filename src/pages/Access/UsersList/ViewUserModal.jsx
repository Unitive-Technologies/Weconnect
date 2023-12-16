import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
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
import { useDispatch } from "react-redux";
import { updateUser as onUpdateUser } from "/src/store/users/actions";

const ViewUserModal = (props) => {
  const { isOpen, handleViewUser, user } = props;
  // console.log("isOpen in viewuser modal:" + isOpen);

  const dispatch = useDispatch();
  const [showEditUser, setShowEditUser] = useState(false);
  // console.log("edit in viewuser modal:" + showEditUser);
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      id: (user && user.id) || "",
      name: (user && user.name) || "",
      email: (user && user.email) || "",
      mobile: (user && user.mobile_no) || "",
      usertype: (user && user.usertype) || "",
      status: (user && user.status) || "",
      message: (user && user.message) || "",
      role: (user && user.role) || "",
      designation: (user && user.designation) || "",
      grouppolicy: (user && user.grouppolicy) || "",
      loginid: (user && user.username) || "",
      password: (user && user.password) || "",
      confirmpassword: (user && user.confirmpassword) || "",
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
      const updateUser = {
        id: user.id,
        name: values.name,
        email: values.email,
        mobile: values.mobile,
        usertype: values.usertype,
        status: values.status,
        message: values.message,
        role: values.role,
        designation: values.designation,
        grouppolicy: values.grouppolicy,
        loginid: values.loginid,
        password: values.password,
        confirmpassword: values.confirmpassword,
      };

      // update user
      dispatch(onUpdateUser(updateUser));
      validation.resetForm();
      handleViewUser();
    },
  });

  const handleCancel = () => {
    setShowEditUser(false);
    handleViewUser();
  };
  return (
    <>
      <Modal
        isOpen={isOpen}
        size="xl"
        role="dialog"
        autoFocus={true}
        centered={true}
        className="exampleModal"
        tabIndex="-1"
        toggle={handleCancel}
      >
        <ModalHeader toggle={handleCancel} tag="h4">
          {!showEditUser
            ? `View ${(user && user.name) || ""}`
            : `Edit ${(user && user.name) || ""}`}
        </ModalHeader>
        {!showEditUser && (
          <Link
            style={{
              position: "absolute",
              marginLeft: "92%",
              marginTop: "1%",
            }}
            to="#!"
            className="btn btn-light me-1"
            onClick={() => setShowEditUser(true)}
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
              <Col sm="4">
                <div className="mb-3">
                  <Label className="form-label">Name</Label>
                  <Input
                    name="name"
                    type="text"
                    placeholder="Insert Name"
                    disabled={!showEditUser}
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
                  <Label className="form-label">Email</Label>
                  <Input
                    name="email"
                    label="Email"
                    type="email"
                    placeholder="Insert Email"
                    disabled={!showEditUser}
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
                  <Label className="form-label">Mobile No.</Label>
                  <Input
                    name="mobile"
                    label="Mobile No."
                    placeholder="Insert Mobile Number"
                    type="text"
                    disabled={!showEditUser}
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
                  <Label className="form-label">User Type</Label>
                  <Input
                    name="usertype"
                    type="select"
                    placeholder="Select User Type"
                    disabled={!showEditUser}
                    className="form-select"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.usertype || ""}
                  >
                    {/* <option value="">Select User Type</option> */}
                    <option value="1">MSO</option>
                    <option value="2">RO</option>
                    <option value="3">Distributor</option>
                    <option value="4">LCO</option>
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
                  <Label className="form-label">Status</Label>
                  <Input
                    name="status"
                    type="select"
                    placeholder="Select Status"
                    className="form-select"
                    disabled={!showEditUser}
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.status || ""}
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
                <div className="mb-3">
                  <Label className="form-label">InActive/Block Message</Label>
                  <Input
                    name="message"
                    type="textarea"
                    placeholder="Enter Message"
                    rows="3"
                    disabled={!showEditUser}
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
                  <Label className="form-label">Role</Label>
                  <Input
                    name="role"
                    type="select"
                    placeholder="Select Role"
                    className="form-select"
                    disabled={!showEditUser}
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.role || ""}
                  >
                    {/* <option value="">Select Role</option> */}
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
              </Col>
              <Col sm="4">
                <div className="mb-3">
                  <Label className="form-label">Designation</Label>
                  <Input
                    name="designation"
                    type="select"
                    placeholder="Select Designation"
                    className="form-select"
                    disabled={!showEditUser}
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.designation || ""}
                  >
                    {/* <option value="">Select Designation</option> */}
                    <option value="dir">Director</option>
                  </Input>
                  {validation.touched.designation &&
                  validation.errors.designation ? (
                    <FormFeedback type="invalid">
                      {validation.errors.designation}
                    </FormFeedback>
                  ) : null}
                </div>
                <div className="mb-3">
                  <Label className="form-label">Group Policy</Label>
                  <Input
                    name="grouppolicy"
                    type="select"
                    placeholder="Select Group Policy"
                    className="form-select"
                    disabled={!showEditUser}
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
                  <Label className="form-label">Login ID</Label>
                  <Input
                    name="loginid"
                    label="Login ID"
                    type="text"
                    placeholder="Login ID"
                    disabled={!showEditUser}
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
              </Col>
            </Row>

            {showEditUser && (
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
      </Modal>
    </>
  );
};

ViewUserModal.propTypes = {
  handleViewUser: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default ViewUserModal;
