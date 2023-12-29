import React, { useState, useEffect } from "react";
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
import {
  updateUser as onUpdateUser,
  getUsers as onGetUsers,
} from "/src/store/users/actions";

const ViewUserModal = (props) => {
  const {
    isOpen,
    handleViewUser,
    user,
    userType,
    userStatus,
    userRole,
    userDesignation,
  } = props;
  // console.log("Userdata in viewuser modal:" + JSON.stringify(user));
  const dispatch = useDispatch();
  const [showEditUser, setShowEditUser] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");

  const handleStatusChange = (e) => {
    const status = e.target.value;
    setSelectedStatus(status);
    validation.handleChange(e);
  };
  // console.log("edit in viewuser modal:" + showEditUser);
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      id: (user && user.id) || "",
      name: (user && user.name) || "",
      email: (user && user.email) || "",
      mobile_no: (user && user.mobile_no) || "",
      type: (user && user.type) || "",
      status: (user && user.status) || "",
      block_message: (user && user.block_message) || "",
      role: (user && user.role) || "",
      designation: (user && user.designation) || "",
      // grouppolicy: (user && user.grouppolicy) || "",
      username: (user && user.username) || "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please Enter Your Name"),
      email: Yup.string()
        .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Please Enter Valid Email")
        .required("Please Enter Your Email"),
      // mobile: Yup.array().required("Please Enter mobile"),
      mobile_no: Yup.string().required("Please Enter mobile Number"),
      type: Yup.string().required("Please Enter User Type"),
      status: Yup.string().required("Please Enter Status"),
      // block_message: Yup.string().required("Please Enter Message"),
      role: Yup.string().required("Please Enter Role"),
      // designation: Yup.string().required("Please Enter Designation"),
      // grouppolicy: Yup.string().required("Please Enter Group Policy"),
      username: Yup.string().required("Please Enter Login ID"),
      // password: Yup.string().required("Please Enter Password"),
      // confirmpassword: Yup.string().required("Please Enter Confirm Password"),
    }),
    onSubmit: (values) => {
      const updateUser = {
        id: user.id,
        name: values.name,
        email: values.email,
        mobile_no: values.mobile_no,
        type: values.type,
        status: values.status,
        block_message: values.block_message,
        role: values.role,
        // designation: values.designation,
        // grouppolicy: values.grouppolicy,
        username: values.username,
        // password: values.password,
        // confirmpassword: values.confirmpassword,
      };

      // update user
      dispatch(onUpdateUser(updateUser));
      dispatch(onGetUsers());
      validation.resetForm();
      handleViewUser();
    },
  });

  const handleCancel = () => {
    setShowEditUser(false);
    handleViewUser();
  };
  useEffect(() => {
    if (user) {
      dispatch(onGetUsers());
    }
    setShowEditUser(false);
  }, [dispatch, user]);
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
                    name="mobile_no"
                    label="Mobile No."
                    placeholder="Insert Mobile Number"
                    type="text"
                    disabled={!showEditUser}
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.mobile_no || ""}
                    invalid={
                      validation.touched.mobile_no &&
                      validation.errors.mobile_no
                        ? true
                        : false
                    }
                  />
                  {validation.touched.mobile_no &&
                  validation.errors.mobile_no ? (
                    <FormFeedback type="invalid">
                      {validation.errors.mobile_no}
                    </FormFeedback>
                  ) : null}
                </div>

                <div className="mb-3">
                  <Label className="form-label">Type</Label>
                  <Input
                    name="type"
                    type="select"
                    placeholder="Select Type"
                    disabled={!showEditUser}
                    className="form-select"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.type || ""}
                  >
                    {/* <option value="">Select User Type</option> */}
                    {userType.map((type) => (
                      <option key={type.id} value={type.id}>
                        {type.name}
                      </option>
                    ))}
                  </Input>
                  {validation.touched.type && validation.errors.type ? (
                    <FormFeedback type="invalid">
                      {validation.errors.type}
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
                    // onChange={validation.handleChange}
                    // onBlur={validation.handleBlur}
                    // value={validation.values.status || ""}
                    onChange={handleStatusChange}
                    onBlur={validation.handleBlur}
                    value={selectedStatus}
                  >
                    {/* <option value="">Select Status</option> */}
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
                  <Label className="form-label">InActive/Block Message</Label>
                  <Input
                    name="block_message"
                    type="textarea"
                    placeholder="Enter Message"
                    rows="3"
                    // disabled={!showEditUser}
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.block_message || ""}
                    invalid={
                      validation.touched.block_message &&
                      validation.errors.block_message
                        ? true
                        : false
                    }
                    disabled={
                      selectedStatus === "0" || selectedStatus === "-7"
                        ? false
                        : true
                    }
                  />
                  {validation.touched.block_message &&
                  validation.errors.block_message ? (
                    <FormFeedback type="invalid">
                      {validation.errors.block_message}
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
                    {userRole.map((role) => (
                      <option key={role.id} value={role.id}>
                        {role.name}
                      </option>
                    ))}
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
                    {userDesignation.map((desig) => (
                      <option key={desig.id} value={desig.id}>
                        {desig.name}
                      </option>
                    ))}
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
                    name="username"
                    label="Login ID"
                    type="text"
                    placeholder="Login ID"
                    disabled
                    // disabled={!showEditUser}
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.username || ""}
                    invalid={
                      validation.touched.username && validation.errors.username
                        ? true
                        : false
                    }
                  />
                  {validation.touched.username && validation.errors.username ? (
                    <FormFeedback type="invalid">
                      {validation.errors.username}
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
