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

const ViewBroadcasterModal = (props) => {
  const { isOpen, toggle, user, viewUser, setViewUser } = props;
  //   console.log("user in viewuser modal:" + JSON.stringify(user));
  const dispatch = useDispatch();
  const [showEditUser, setShowEditUser] = useState(false);

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      id: (user && user.id) || "",
      name: (user && user.name) || "",
      fullname: (user && user.fullname) || "",
      contactperson: (user && user.contactperson) || "",
      mobile: (user && user.mobile_no) || "",
      phone: (user && user.phone) || "",
      email: (user && user.email) || "",
      address: (user && user.address) || "",
      description: (user && user.description) || "",
      status: (user && user.status) || "",

    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please Enter Your Name"),
      fullname: Yup.string().required("Please Enter Full Name"),
      contactperson: Yup.string().required("Please Enter Contact Person"),
      mobile: Yup.string().required("Please Enter mobile Number"),
      phone: Yup.string().required("Please Enter Phone"),
      email: Yup.string()
        .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Please Enter Valid Email")
        .required("Please Enter Your Email"),
      // mobile: Yup.array().required("Please Enter mobile"),      
      address: Yup.string().required("Please Enter Address"),
      description: Yup.string().required("Please Enter description"),
      status: Yup.string().required("Please Enter status"),
    }),
    onSubmit: (values) => {
      const updateUser = {
        id: user.id,
        name: values.name,
        fullname: values.fullname,
        contactperson: values.contactperson,
        mobile: values.mobile,
        phone: values.phone,
        email: values.email,
        address: values.address,
        description: values.description,
        status: values.status,
      };

      // update user
      dispatch(onUpdateUser(updateUser));
      validation.resetForm();
      toggle();
    },
  });
  return (
    <>
      {/* <EditUserModal
        isOpen={showEditUser}
        // onClose={() => setShowEditUser(false)}
      /> */}
      <Modal
        isOpen={isOpen}
        size="xl"
        role="dialog"
        autoFocus={true}
        centered={true}
        className="exampleModal"
        tabIndex="-1"
        toggle={toggle}
      >
        {!showEditUser ? (
          <ModalHeader toggle={toggle} tag="h4">
            View  {user.name}
            <i
              className="bx bx bxs-edit"
              style={{ marginLeft: "20px", cursor: "pointer" }}
              onClick={() => setShowEditUser(true)}
            ></i>
          </ModalHeader>
        ) : (
          <ModalHeader toggle={toggle} tag="h4">
            Edit {user.name}
          </ModalHeader>
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
                  <Label className="form-label">Name<span style={{ color: 'red' }}>*</span></Label>
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
              </Col>
              <Col sm="4">
                <div className="mb-3">
                  <Label className="form-label">Full-Name<span style={{ color: 'red' }}>*</span></Label>
                  <Input
                    name="fullname"
                    label="fullname"
                    type="fullname"
                    placeholder="Insert Full Name"
                    disabled={!showEditUser}
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.fullname || ""}
                    invalid={
                      validation.touched.fullname && validation.errors.fullname
                        ? true
                        : false
                    }
                  />
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
                    type="contactperson"
                    placeholder="Insert Contact Person"
                    disabled={!showEditUser}
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.contactperson || ""}
                    invalid={
                      validation.touched.contactperson && validation.errors.contactperson
                        ? true
                        : false
                    }
                  />
                  {validation.touched.contactperson && validation.errors.contactperson ? (
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
              </Col>
              <Col sm="4">
                <div className="mb-3">
                  <Label className="form-label">Phone No.</Label>
                  <Input
                    name="phone"
                    type="phone"
                    placeholder="Enter Phone No."
                    disabled={!showEditUser}
                    // className="form-select"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.phone || ""}
                  >
                  </Input>
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
              </Col>
            </Row>
            <Row>
              <Col sm="4">
                <div className="mb-3">
                  <Label className="form-label">Address<span style={{ color: 'red' }}>*</span></Label>
                  <Input
                    name="address"
                    label="address"
                    type="address"
                    placeholder="Enter Address"
                    disabled={!showEditUser}
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
              <Col sm="4">
                <div className="mb-3">
                  <Label className="form-label">Description<span style={{ color: 'red' }}>*</span></Label>
                  <Input
                    name="description"
                    label="Description"
                    type="description"
                    placeholder="Insert Description"
                    disabled={!showEditUser}
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.description || ""}
                  />
                  {validation.touched.description && validation.errors.description ? (
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
      </Modal >
    </>
  );
};

ViewBroadcasterModal.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default ViewBroadcasterModal;
