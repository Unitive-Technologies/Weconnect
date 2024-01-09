import React, { useEffect, useState, useRef, useMemo } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
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
  ModalFooter,
  UncontrolledTooltip,
  Input,
  Form,
} from "reactstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  getBroadCaster as onGetBroadCasters, updateBroadCaster as onUpdateBroadCaster
} from "/src/store/broadcaster/actions";
import { useSelector, useDispatch } from "react-redux";

const ViewBroadcasterModal = (props) => {
  const { isOpen, toggleViewBroadcaster, brodcastStatus, viewBroadcaster, } = props;
  console.log("Broad Caster modal:" + JSON.stringify(viewBroadcaster));
  const dispatch = useDispatch();
  const [showEditViewBroadCaster, setShowEditViewBroadCaster] = useState(false);

  const [selectedStatus, setSelectedStatus] = useState("");

  const handleStatusChange = (e) => {
    const status = e.target.value;
    setSelectedStatus(status);
    validation.handleChange(e);
  };


  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      id: (viewBroadcaster && viewBroadcaster.id) || "",
      name: (viewBroadcaster && viewBroadcaster.name) || "",
      fullname: (viewBroadcaster && viewBroadcaster.fullname) || "",
      contact_person: (viewBroadcaster && viewBroadcaster.contact_person) || "",
      mobile_no: (viewBroadcaster && viewBroadcaster.mobile_no) || "",
      phone_no: (viewBroadcaster && viewBroadcaster.phone_no) || "",
      email: (viewBroadcaster && viewBroadcaster.email) || "",
      addr: (viewBroadcaster && viewBroadcaster.addr) || "",
      description: (viewBroadcaster && viewBroadcaster.description) || "",
      status: (viewBroadcaster && viewBroadcaster.status) || "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please Enter Your Name"),
      fullname: Yup.string().required("Please Enter Full Name"),
      contact_person: Yup.string().required("Please Enter Contact Person"),
      mobile_no: Yup.string().required("Please Enter mobile Number"),
      phone_no: Yup.string().required("Please Enter Phone"),
      email: Yup.string()
        .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Please Enter Valid Email")
        .required("Please Enter Your Email"),
      // mobile: Yup.array().required("Please Enter mobile"),
      addr: Yup.string().required("Please Enter Address"),
      description: Yup.string().required("Please Enter description"),
      status: Yup.string().required("Please Enter status"),
    }),
    onSubmit: (values) => {
      const updateBroadCaster = {
        id: viewBroadcaster.id,
        name: values.name,
        fullname: values.fullname,
        contact_person: values.contact_person,
        mobile_no: values.mobile_no,
        phone_no: values.phone_no,
        email: values.email,
        addr: values.addr,
        description: values.description,
        status: parseInt(values.status),
      };

      // update viewBroadcaster
      dispatch(onUpdateBroadCaster(updateBroadCaster));
      dispatch(onGetBroadCasters());
      validation.resetForm();
      toggleViewBroadcaster();
    },
  });

  const handleCancel = () => {
    setShowEditViewBroadCaster(false);
    toggleViewBroadcaster();
  };

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
        toggle={handleCancel}
      >
        <ModalHeader toggle={handleCancel} tag="h4">
          {!showEditViewBroadCaster
            ? `View ${(viewBroadcaster && viewBroadcaster.name) || ""}`
            : `Edit ${(viewBroadcaster && viewBroadcaster.name) || ""}`}
        </ModalHeader>
        {!showEditViewBroadCaster && (
          <Link
            style={{
              position: "absolute",
              marginLeft: "92%",
              marginTop: "1%",
            }}
            to="#!"
            className="btn btn-light me-1"
            onClick={() => setShowEditViewBroadCaster(true)}
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
                  <Label className="form-label">
                    Name<span style={{ color: "red" }}>*</span>
                  </Label>
                  <Input
                    name="name"
                    type="text"
                    placeholder="Insert Name"
                    disabled={!showEditViewBroadCaster}
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
                  <Label className="form-label">
                    Full-Name<span style={{ color: "red" }}>*</span>
                  </Label>
                  <Input
                    name="fullname"
                    label="fullname"
                    type="fullname"
                    placeholder="Insert Full Name"
                    disabled={!showEditViewBroadCaster}
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
                  <Label className="form-label">
                    Contact Person<span style={{ color: "red" }}>*</span>
                  </Label>
                  <Input
                    name="contact_person"
                    label="contactperson"
                    type="contactperson"
                    placeholder="Insert Contact Person"
                    disabled={!showEditViewBroadCaster}
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.contact_person || ""}
                    invalid={
                      validation.touched.contact_person &&
                        validation.errors.contact_person
                        ? true
                        : false
                    }
                  />
                  {validation.touched.contact_person &&
                    validation.errors.contact_person ? (
                    <FormFeedback type="invalid">
                      {validation.errors.contact_person}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
            </Row>
            <Row>
              <Col sm="4">
                <div className="mb-3">
                  <Label className="form-label">
                    Mobile No.<span style={{ color: "red" }}>*</span>
                  </Label>
                  <Input
                    name="mobile_no"
                    label="Mobile No."
                    placeholder="Insert Mobile Number"
                    type="text"
                    disabled={!showEditViewBroadCaster}
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
              </Col>
              <Col sm="4">
                <div className="mb-3">
                  <Label className="form-label">Phone No.</Label>
                  <Input
                    name="phone_no"
                    type="phone"
                    placeholder="Enter Phone No."
                    disabled={!showEditViewBroadCaster}
                    // className="form-select"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.phone_no || ""}
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
                  <Label className="form-label">
                    Email address<span style={{ color: "red" }}>*</span>
                  </Label>
                  <Input
                    name="email"
                    label="Email"
                    type="email"
                    placeholder="Insert Email"
                    disabled={!showEditViewBroadCaster}
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
                  <Label className="form-label">
                    Address<span style={{ color: "red" }}>*</span>
                  </Label>
                  <Input
                    name="addr"
                    label="address"
                    type="address"
                    placeholder="Enter Address"
                    disabled={!showEditViewBroadCaster}
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.addr || ""}
                    invalid={
                      validation.touched.addr && validation.errors.addr
                        ? true
                        : false
                    }
                  />
                  {validation.touched.addr && validation.errors.addr ? (
                    <FormFeedback type="invalid">
                      {validation.errors.addr}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Col sm="4">
                <div className="mb-3">
                  <Label className="form-label">
                    Description<span style={{ color: "red" }}>*</span>
                  </Label>
                  <Input
                    name="description"
                    label="Description"
                    type="description"
                    placeholder="Insert Description"
                    disabled={!showEditViewBroadCaster}
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.description || ""}
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
                  <Label className="form-label">
                    Status<span style={{ color: "red" }}>*</span>
                  </Label>
                  <Input
                    name="status"
                    type="select"
                    placeholder="Select Status"
                    className="form-select"
                    disabled={!showEditViewBroadCaster}
                    onChange={handleStatusChange}
                    onBlur={validation.handleBlur}
                    value={selectedStatus}
                  >
                    {brodcastStatus.map((status) => (
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
            {showEditViewBroadCaster && (
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
        {/* </Modal> */}
      </Modal>
    </>
  );
};

ViewBroadcasterModal.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default ViewBroadcasterModal;
