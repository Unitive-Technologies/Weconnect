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

const ViewCustomerUserModal = (props) => {
  const { isOpen, handleViewCustomerUser, customeruser } = props;
  console.log("isOpen in view modal:" + isOpen);
  const dispatch = useDispatch();
  const [showEditUser, setShowEditUser] = useState(false);
  console.log("edit in view modal:" + showEditUser);

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      id: (customeruser && customeruser.id) || "",
      name: (customeruser && customeruser.name) || "",
      login: (customeruser && customeruser.username) || "",
      mobile: (customeruser && customeruser.mobile_no) || "",
      email: (customeruser && customeruser.email) || "",
      status: (customeruser && customeruser.status) || "",
      lco: (customeruser && customeruser.lco) || "",
      lcocode: (customeruser && customeruser.lco_code) || "",
      lastlogin: (customeruser && customeruser.last_login_at) || "",
      createdat: (customeruser && customeruser.created_at) || "",
      createdby: (customeruser && customeruser.created_by) || "",
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
        id: customeruser.id,
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
      handleViewCustomerUser();
    },
  });

  const handleCancel = () => {
    setShowEditUser(false);
    handleViewCustomerUser();
  };
  return (
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
        {!showEditUser ? "View Customer User" : "Edit Customer User"}
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
                  disabled={!showEditUser}
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
                  disabled={!showEditUser}
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
                  disabled={!showEditUser}
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
                  disabled={!showEditUser}
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
                  disabled={!showEditUser}
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
                  disabled={!showEditUser}
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
                  disabled={!showEditUser}
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
                  disabled={!showEditUser}
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
                  disabled={!showEditUser}
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
                  disabled={!showEditUser}
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
  );
};

ViewCustomerUserModal.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default ViewCustomerUserModal;
