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
import { updateRegionalOffice as onUpdateRegionalOffice } from "/src/store/regionaloffice/actions";
import TapsOfViewRegionalOffice from "./TapsOfViewRegionalOffice";

const ViewRegionalOfficeModal = (props) => {
  const { isOpen, toggle, regionalOffData } = props;
  //   console.log("user in viewuser modal:" + JSON.stringify(user));
  const dispatch = useDispatch();
  const [showEditRegionalOffice, setShowEditRegionalOffice] = useState(false);
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      id: (regionalOffData && regionalOffData.id) || "",
      name: regionalOffData.name,
      code: regionalOffData.code,
      addr1: regionalOffData.addr1,
      addr2: regionalOffData.addr2,
      addr3: regionalOffData.addr3,
      contact_person: regionalOffData.contact_person,
      mobile_no: regionalOffData.mobile_no,
      phone_no: regionalOffData.phone_no,
      fax_no: regionalOffData.fax_no,
      state_lbl: regionalOffData.state_lbl,
      district_lbl: regionalOffData.district_lbl,
      city_lbl: regionalOffData.city_lbl,
      gstno: regionalOffData.gstno,
      panno: "",
      username: "",
      status_lbl: "",
      email: "",
      pincode: "",
      por_number: "",
      reg_phase: "",
      reg_startdate: "",
      reg_enddate: "",
      gst_date: "",
      credit_limit: "",
      area_id: "",
      agreement_data: [],
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
      const updateRegionalOffice = {
        id: Math.floor(Math.random() * (30 - 20)) + 20,
        name: values["name"],
        code: values["code"],
        addr1: values["addr1"],
        addr2: values["addr2"],
        addr3: values["addr3"],
        contact_person: values["contact_person"],
        mobile_no: values["mobile_no"],
        phone_no: values["phone_no"],
        faxno: values["fax_no"],
        message: values["message"],
        state_lbl: values["state_lbl"],
        district_lbl: values["district_lbl"],
        city_lbl: values["city_lbl"],
        gstno: values["gstno"],
        panno: values["panno"],
        username: values["username"],
        status_lbl: values["status_lbl"],
        email: values["email"],
        pincode: values["pincode"],
        por_number: values["por_number"],
        reg_phase: values["reg_phase"],
        reg_startdate: values["reg_startdate"],
        reg_enddate: values["reg_enddate"],
        gst_date: values["gst_date"],
        credit_limit: values["credit_limit"],
        area_id: values["area_id"],
        agreement_data: values["agreement_data"],
      };

      // update user
      dispatch(onUpdateUser(updateRegionalOffice));
      validation.resetForm();
      toggle();
    },
  });

  // const getTableActions = () => {
  //   return [
  //     {
  //       name: "Create",
  //       // action: setShowRegionalOffice,
  //       type: "normal",
  //       icon: "create",
  //     },
  //     {
  //       name: "Upload",
  //       // action: setShowUploadRegionalOffice,
  //       type: "normal",
  //       icon: "upload",
  //     },
  //   ];
  // };

  // useEffect(() => {
  //   getTableActions();
  // }, []);
  return (
    <Modal
      isOpen={isOpen}
      role="dialog"
      size="xl"
      autoFocus={true}
      centered={true}
      className="exampleModal"
      tabIndex="-1"
      toggle={toggle}
    >
      {!showEditRegionalOffice ? (
        <ModalHeader toggle={toggle} tag="h4">
          <div
            style={{
              width: "350%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h4>View - {regionalOffData.name}</h4>
            {/* <i
            className="bx bx bxs-edit"
            style={{ marginLeft: "20px", cursor: "pointer" }}
            onClick={() => setShowEditRegionalOffice(true)}
          ></i> */}
            <button
              onClick={() => setShowEditRegionalOffice(true)}
              type="submit"
              className="btn btn-success save-user"
              style={{ display: "flex", alignItems: "center", gap: "10px" }}
            >
              <i className="bx bx bxs-edit"></i>Edit
            </button>
          </div>
        </ModalHeader>
      ) : (
        <ModalHeader toggle={toggle} tag="h4">
          Edit - {regionalOffData.name}
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
            <Col lg={2}>
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
                  View Details
                </label>
              </div>
            </Col>
          </Row>
          <div
            style={{
              // margin: "20px 0px",
              marginTop: "20px",
              marginBottom: "-18px",
              zIndex: 12000,
              backgroundColor: "#fff",
              width: "fit-content",
              marginLeft: "40%",
              position: "absolute",
              padding: "0px 10px",
            }}
          >
            {" "}
            <h5 style={{}}>Operator Information</h5>
          </div>
          <Row
            style={{
              position: "relative",
              border: "1px solid #ced4da",
              padding: "20px 0px",
              margin: "30px 0px",
            }}
          >
            <Col lg={3}>
              <div className="mb-3">
                <Label className="form-label">Name</Label>
                <Input
                  name="name"
                  label="Name"
                  type="text"
                  placeholder="Name"
                  disabled
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.upload || ""}
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
            <Col lg={3}>
              <div className="mb-3">
                <Label className="form-label">Contact Person</Label>
                <Input
                  name="contact_person"
                  label="Contact Person"
                  type="text"
                  placeholder="Contact Person"
                  disabled
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
            <Col lg={3}>
              <div className="mb-3">
                <Label className="form-label">Mobil No.</Label>
                <Input
                  name="mobile_no"
                  label="Mobile No."
                  type="text"
                  placeholder="Mobile No."
                  disabled
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
            <Col lg={3}>
              <div className="mb-3">
                <Label className="form-label">Code</Label>
                <Input
                  name="code"
                  label="Code"
                  type="text"
                  placeholder="Code"
                  disabled
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
            </Col>
            <Col lg={12}>
              <div className="mb-3">
                <Label className="form-label">Address</Label>
                <Input
                  name="address"
                  label="Address"
                  type="text"
                  placeholder="Enter Address"
                  disabled
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
            <Col lg={12}>
              <div className="mb-3">
                <Label className="form-label">Parent</Label>
                <Input
                  name="parent"
                  label="Parent"
                  type="text"
                  placeholder="Enter Parent"
                  disabled
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.parent || ""}
                  invalid={
                    validation.touched.parent && validation.errors.parent
                      ? true
                      : false
                  }
                />
                {validation.touched.parent && validation.errors.parent ? (
                  <FormFeedback type="invalid">
                    {validation.errors.parent}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
          </Row>
          <Row>
            <Col lg={12}>
              <TapsOfViewRegionalOffice />
            </Col>
          </Row>
        </Form>
      </ModalBody>
      {/* </Modal> */}
    </Modal>
  );
};

ViewRegionalOfficeModal.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default ViewRegionalOfficeModal;
