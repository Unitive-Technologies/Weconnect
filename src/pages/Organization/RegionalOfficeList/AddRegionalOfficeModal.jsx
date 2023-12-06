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
import { addNewUser as onAddNewUser } from "/src/store/users/actions";
import { useSelector, useDispatch } from "react-redux";

const AddRegionalOfficeModal = (props) => {
  const { isOpen, toggle } = props;
  const dispatch = useDispatch();
  const [user, setUser] = useState();

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
      console.log("newUser:" + newUser);
      // save new user
      dispatch(onAddNewUser(newUser));
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
      <ModalHeader tag="h4">Add New Regional Office</ModalHeader>
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
              <div className="form-check form-switch form-switch-lg mb-3">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="customSwitchsizelg"
                  defaultChecked
                />
                <label
                  className="form-check-label"
                  htmlFor="customSwitchsizelg"
                >
                  Custom / Auto
                </label>
              </div>
              <div className="mb-3">
                <Label className="form-label">Regional Office Code</Label>
                <Input
                  name="code"
                  type="text"
                  placeholder="Enter Code"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.code || ""}
                  invalid={
                    validation.touched.code && validation.errors.code
                      ? true
                      : false
                  }
                />
                {validation.touched.code && validation.errors.code ? (
                  <FormFeedback type="invalid">
                    {validation.errors.code}
                  </FormFeedback>
                ) : null}
              </div>

              <div className="mb-3">
                <Label className="form-label">Regional Office Name</Label>
                <Input
                  name="name"
                  label="Regional Office Name"
                  type="text"
                  placeholder="Enter Name"
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
                <Label className="form-label">Contact Person</Label>
                <Input
                  name="contact"
                  label="Contact Person"
                  type="text"
                  placeholder="Enter Contact Person Name"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.contact || ""}
                  invalid={
                    validation.touched.contact && validation.errors.contact
                      ? true
                      : false
                  }
                />
                {validation.touched.contact && validation.errors.contact ? (
                  <FormFeedback type="invalid">
                    {validation.errors.contact}
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
                  <option value="12">In-Active</option>
                </Input>
                {validation.touched.status && validation.errors.status ? (
                  <FormFeedback type="invalid">
                    {validation.errors.status}
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
                <Label className="form-label">Phone No.</Label>
                <Input
                  name="phone"
                  label="Phone No."
                  placeholder="Enter Phone Number"
                  type="text"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.phone || ""}
                  invalid={
                    validation.touched.phone && validation.errors.phone
                      ? true
                      : false
                  }
                />
                {validation.touched.phone && validation.errors.phone ? (
                  <FormFeedback type="invalid">
                    {validation.errors.phone}
                  </FormFeedback>
                ) : null}
              </div>
              <div className="mb-3">
                <Label className="form-label">Email Address</Label>
                <Input
                  name="email"
                  label="Email Address"
                  placeholder="Enter email"
                  type="text"
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
                <Label className="form-label">State</Label>
                <Input
                  name="state"
                  type="select"
                  placeholder="Select State"
                  className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.state || ""}
                >
                  <option value="">Select State</option>
                  <option value="1">Tamilnadu</option>
                  <option value="2">Kerala</option>
                  <option value="3">Assam</option>
                  <option value="4">Karnataka</option>
                </Input>
                {validation.touched.state && validation.errors.state ? (
                  <FormFeedback type="invalid">
                    {validation.errors.state}
                  </FormFeedback>
                ) : null}
              </div>
              <div className="mb-3">
                <Label className="form-label">District</Label>
                <Input
                  name="district"
                  type="select"
                  placeholder="Select District"
                  className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.district || ""}
                >
                  <option value="">Select District</option>
                  <option value="1">Virudhunagar</option>
                  <option value="2">Tuticori</option>
                  <option value="3">Chennai</option>
                  <option value="4">Erode</option>
                </Input>
                {validation.touched.district && validation.errors.district ? (
                  <FormFeedback type="invalid">
                    {validation.errors.district}
                  </FormFeedback>
                ) : null}
              </div>
              <div className="mb-3">
                <Label className="form-label">City</Label>
                <Input
                  name="city"
                  type="select"
                  placeholder="Select City"
                  className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.city || ""}
                >
                  <option value="">Select City</option>
                  <option value="1">Virudhunagar</option>
                  <option value="2">Sivakasi</option>
                  <option value="3">Kovilpatti</option>
                  <option value="4">Erode</option>
                </Input>
                {validation.touched.city && validation.errors.city ? (
                  <FormFeedback type="invalid">
                    {validation.errors.city}
                  </FormFeedback>
                ) : null}
              </div>

              <div className="mb-3">
                <Label className="form-label">Address1</Label>
                <Input
                  name="address1"
                  label="Address1"
                  type="text"
                  placeholder="Enter Address"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.address1 || ""}
                  invalid={
                    validation.touched.address1 && validation.errors.address1
                      ? true
                      : false
                  }
                />
                {validation.touched.address1 && validation.errors.address1 ? (
                  <FormFeedback type="invalid">
                    {validation.errors.address1}
                  </FormFeedback>
                ) : null}
              </div>
              <div className="mb-3">
                <Label className="form-label">Address2</Label>
                <Input
                  name="address2"
                  label="Address2"
                  type="text"
                  placeholder="Enter Address"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.address2 || ""}
                  invalid={
                    validation.touched.address2 && validation.errors.address2
                      ? true
                      : false
                  }
                />
                {validation.touched.address2 && validation.errors.address2 ? (
                  <FormFeedback type="invalid">
                    {validation.errors.address2}
                  </FormFeedback>
                ) : null}
              </div>
              <div className="mb-3">
                <Label className="form-label">Address3</Label>
                <Input
                  name="address3"
                  label="Address3"
                  type="text"
                  placeholder="Enter Address"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.address3 || ""}
                  invalid={
                    validation.touched.address3 && validation.errors.address3
                      ? true
                      : false
                  }
                />
                {validation.touched.address3 && validation.errors.address3 ? (
                  <FormFeedback type="invalid">
                    {validation.errors.address3}
                  </FormFeedback>
                ) : null}
              </div>
              <div className="mb-3">
                <Label className="form-label">Pincode</Label>
                <Input
                  name="pincode"
                  label="Pincode"
                  type="text"
                  placeholder="Enter Pincode"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.pincode || ""}
                  invalid={
                    validation.touched.pincode && validation.errors.pincode
                      ? true
                      : false
                  }
                />
                {validation.touched.pincode && validation.errors.pincode ? (
                  <FormFeedback type="invalid">
                    {validation.errors.pincode}
                  </FormFeedback>
                ) : null}
              </div>
              <div className="mb-3">
                <Label className="form-label">
                  Postal Office Registration(POR)
                </Label>
                <Input
                  name="por"
                  label="Postal Office Registration"
                  type="text"
                  placeholder="Enter POR Number"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.por || ""}
                  invalid={
                    validation.touched.por && validation.errors.por
                      ? true
                      : false
                  }
                />
                {validation.touched.por && validation.errors.por ? (
                  <FormFeedback type="invalid">
                    {validation.errors.por}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
            <Col sm="6">
              <div className="mb-3">
                <Label className="form-label">Phase</Label>
                <Input
                  name="phase"
                  type="select"
                  placeholder="Select Phase"
                  className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.phase || ""}
                >
                  <option value="">Select Phase</option>
                  <option value="1">Phase 1</option>
                  <option value="2">Phase 2</option>
                  <option value="3">Phase 3</option>
                  <option value="4">Phase 4</option>
                </Input>
                {validation.touched.phase && validation.errors.phase ? (
                  <FormFeedback type="invalid">
                    {validation.errors.phase}
                  </FormFeedback>
                ) : null}
              </div>
              <div className="mb-3">
                <Label className="form-label">Registration Start Date</Label>
                <Input
                  name="startdate"
                  type="date"
                  placeholder="Select Start Date"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.startdate || ""}
                  invalid={
                    validation.touched.startdate && validation.errors.startdate
                      ? true
                      : false
                  }
                />
                {validation.touched.startdate && validation.errors.startdate ? (
                  <FormFeedback type="invalid">
                    {validation.errors.startdate}
                  </FormFeedback>
                ) : null}
              </div>
              <div className="mb-3">
                <Label className="form-label">Registration End Date</Label>
                <Input
                  name="enddate"
                  type="date"
                  placeholder="Select End Date"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.enddate || ""}
                  invalid={
                    validation.touched.enddate && validation.errors.enddate
                      ? true
                      : false
                  }
                />
                {validation.touched.enddate && validation.errors.enddate ? (
                  <FormFeedback type="invalid">
                    {validation.errors.enddate}
                  </FormFeedback>
                ) : null}
              </div>
              <div className="mb-3">
                <Label className="form-label">Fax No.</Label>
                <Input
                  name="fax"
                  type="text"
                  placeholder="Select Fax No."
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.fax || ""}
                  invalid={
                    validation.touched.fax && validation.errors.fax
                      ? true
                      : false
                  }
                />
                {validation.touched.fax && validation.errors.fax ? (
                  <FormFeedback type="invalid">
                    {validation.errors.fax}
                  </FormFeedback>
                ) : null}
              </div>
              <div className="mb-3">
                <Label className="form-label">GST No.</Label>
                <Input
                  name="gst"
                  type="text"
                  placeholder="Select GST No."
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.gst || ""}
                  invalid={
                    validation.touched.gst && validation.errors.gst
                      ? true
                      : false
                  }
                />
                {validation.touched.gst && validation.errors.gst ? (
                  <FormFeedback type="invalid">
                    {validation.errors.gst}
                  </FormFeedback>
                ) : null}
              </div>
              <div className="mb-3">
                <Label className="form-label">GST Reg. Date</Label>
                <Input
                  name="gstdate"
                  type="date"
                  placeholder="Select GST Reg Date"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.gstdate || ""}
                  invalid={
                    validation.touched.gstdate && validation.errors.gstdate
                      ? true
                      : false
                  }
                />
                {validation.touched.gstdate && validation.errors.gstdate ? (
                  <FormFeedback type="invalid">
                    {validation.errors.gstdate}
                  </FormFeedback>
                ) : null}
              </div>
              <div className="mb-3">
                <Label className="form-label">PAN No.</Label>
                <Input
                  name="pan"
                  type="text"
                  placeholder="Select PAN No."
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.pan || ""}
                  invalid={
                    validation.touched.pan && validation.errors.pan
                      ? true
                      : false
                  }
                />
                {validation.touched.pan && validation.errors.pan ? (
                  <FormFeedback type="invalid">
                    {validation.errors.pan}
                  </FormFeedback>
                ) : null}
              </div>
              <div className="mb-3">
                <Label className="form-label">Credit Limit</Label>
                <Input
                  name="credit"
                  type="text"
                  placeholder="Enter Credit Limit"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.credit || ""}
                  invalid={
                    validation.touched.credit && validation.errors.credit
                      ? true
                      : false
                  }
                />
                {validation.touched.credit && validation.errors.credit ? (
                  <FormFeedback type="invalid">
                    {validation.errors.credit}
                  </FormFeedback>
                ) : null}
              </div>
              <div className="mb-3">
                <Label className="form-label">Area ID</Label>
                <Input
                  name="area"
                  type="text"
                  placeholder="Enter Area ID"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.area || ""}
                  invalid={
                    validation.touched.area && validation.errors.area
                      ? true
                      : false
                  }
                />
                {validation.touched.area && validation.errors.area ? (
                  <FormFeedback type="invalid">
                    {validation.errors.area}
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
                <Label className="form-label">Password</Label>
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
                <Label className="form-label">Confirm-Password</Label>
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
              <div className="text-end">
                <button type="submit" className="btn btn-success save-user">
                  Create
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

AddRegionalOfficeModal.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default AddRegionalOfficeModal;
