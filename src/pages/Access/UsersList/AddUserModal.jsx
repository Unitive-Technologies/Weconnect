import React, { useEffect, useState, useRef, useMemo } from "react";
import axios from "axios";
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
import { JsonRequestError } from "@fullcalendar/core";

const AddUserModal = (props) => {
  const {
    isOpen,
    handleAddUser,
    userType,
    userStatus,
    userRole,
    userDesignation,
    userMsoPolicy,
    userMsoDetails,
    userRegional,
  } = props;
  console.log("userMsoPolicy in add:" + JSON.stringify(userMsoPolicy));
  const dispatch = useDispatch();
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedType, setSelectedType] = useState("");
  // const [mso, setMso] = useState([]);
  const API_URL = "https://sms.unitch.in/api/index.php/v1";

  const handleStatusChange = (e) => {
    const status = e.target.value;
    setSelectedStatus(status);
    validation.handleChange(e);
  };

  const handleTypeChange = (e) => {
    const type = e.target.value;
    setSelectedType(type);
    validation.handleChange(e);
  };
  // const getMsoDetail = () => {
  //   axios
  //     .get(
  //       `${API_URL}/operator/list?fields=id,name,type,mso_id,branch_id,distributor_id&per-page=100&filter[type]=0&vr=web1.0}`
  //     )
  //     .then((response) => {
  //       // console.log(response);

  //       console.log("getMso : " + JSON.stringify(response.data));
  //       setMso(response.data);
  //     });
  // };

  // const handleTypeChange = async (e) => {
  //   try {
  //     const usertype = e.target.value;
  //     setSelectedType(usertype);

  //     validation.handleChange(e);

  //     // Assuming you have a token stored in localStorage
  //     const token = "Bearer " + localStorage.getItem("temptoken");

  //     const response = await axios.get(
  //       `${API_URL}/operator/list?fields=id,name,type,mso_id,branch_id,distributor_id&per-page=100&filter[type]=0&vr=web1.0}`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`, // Include your token here
  //         },
  //       }
  //     );

  //     console.log("getMso : " + JSON.stringify(response.data));
  //     setMso(response.data);
  //   } catch (error) {
  //     console.error("Error fetching MSO data:", error);
  //     // Handle error if necessary
  //   }
  // };

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      name: "",
      email: "",
      mobile_no: "",
      type: "",
      status: "",
      block_message: "",
      mso: "",
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
      mobile_no: Yup.string().required("Please Enter mobile Number"),
      type: Yup.string().required("Please Enter User Type"),
      status: Yup.string().required("Please Enter Status"),
      mso: Yup.string().required("Please Select MSO"),
      block_message: Yup.string().required("Please Enter Message"),
      role: Yup.string().required("Please Enter Role"),
      designation: Yup.string().required("Please Enter Designation"),
      grouppolicy: Yup.string().required("Please Enter Group Policy"),
      username: Yup.string().required("Please Enter Login ID"),
      password: Yup.string().required("Please Enter Password"),
      confirmpassword: Yup.string().required("Please Enter Confirm Password"),
    }),
    onSubmit: (values) => {
      const newUser = {
        id: Math.floor(Math.random() * (30 - 20)) + 20,
        name: values["name"],
        email: values["email"],
        mobile_no: values["mobile_no"],
        type: values["type"],
        status: values["status"],
        block_message: values["block_message"],
        mso: values["mso"],
        role: values["role"],
        designation: values["designation"],
        grouppolicy: values["grouppolicy"],
        username: values["username"],
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
                  name="mobile_no"
                  label="Mobile No."
                  placeholder="Insert Mobile Number"
                  type="text"
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
                  User Type<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="type"
                  type="select"
                  placeholder="Select Type"
                  className="form-select"
                  onChange={handleTypeChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.type || ""}
                >
                  <option value="">Select User Type</option>
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

              {validation.values.type && (
                <div className="mb-3">
                  <Label className="form-label">
                    Select MSO<span style={{ color: "red" }}>*</span>
                  </Label>
                  <Input
                    name="mso"
                    type="select"
                    placeholder="Select MSO"
                    className="form-select"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.mso || ""}
                  >
                    <option value="">Select Role</option>
                    {userMsoDetails.map((mso) => (
                      <option key={mso.id} value={mso.id}>
                        {mso.name}
                      </option>
                    ))}
                  </Input>
                  {validation.touched.mso && validation.errors.mso ? (
                    <FormFeedback type="invalid">
                      {validation.errors.mso}
                    </FormFeedback>
                  ) : null}
                </div>
              )}
              {console.log("selectedType: " + typeof selectedType)}
              {console.log("msoValue: " + typeof validation.values.mso)}
              {parseInt(selectedType) === 1 &&
              parseInt(validation.values.mso) == 1 ? (
                <div className="mb-3">
                  <Label className="form-label">
                    Select Regional Office
                    <span style={{ color: "red" }}>*</span>
                  </Label>
                  <Input
                    name="regional"
                    type="select"
                    placeholder="Select Regional Office"
                    className="form-select"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.regional || ""}
                  >
                    <option value="">Select Regional Office</option>
                    {userRegional &&
                      userRegional.map((regional) => (
                        <option key={regional.id} value={regional.id}>
                          {regional.name}
                        </option>
                      ))}
                  </Input>
                  {validation.touched.regional && validation.errors.regional ? (
                    <FormFeedback type="invalid">
                      {validation.errors.regional}
                    </FormFeedback>
                  ) : null}
                </div>
              ) : (
                <></>
              )}
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
                  onChange={handleStatusChange}
                  onBlur={validation.handleBlur}
                  value={selectedStatus}
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
                  Inactive/Block Message<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="block_message"
                  type="textarea"
                  placeholder="Enter Message"
                  rows="3"
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
                <Label className="form-label">
                  Role<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="role"
                  type="select"
                  placeholder="Select Role"
                  className="form-select"
                  // onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  // value={validation.values.role || ""}
                  value={selectedType}
                >
                  <option value="">Select Role</option>
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
                  disabled={!selectedType}
                >
                  <option value="">Select Group Policy</option>

                  {selectedType === 0 &&
                    validation.values.mso == 1 &&
                    userMsoPolicy &&
                    userMsoPolicy.map((policy) => (
                      <option key={policy._id} value={policy._id}>
                        {policy.user_id}
                      </option>
                    ))}
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
