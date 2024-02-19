import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  Col,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
  FormFeedback,
  Input,
  Form,
} from "reactstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";

import TapsOfViewDistributor from "./TapsOfViewDistributor";
import EditDistributorModal from "./EditDistributorModal";

const ViewDistributorModal = (props) => {
  const {
    isOpen,
    toggleViewModal,
    distributor,
    setViewDistributor,
    distributorsPhase,
    distributorsStatus,
  } = props;
  // console.log("distributor in viewuser modal:" + JSON.stringify(distributor));
  const dispatch = useDispatch();
  const API_URL = "https://sms.unitch.in/api/index.php/v1";
  const [showEditDistributor, setShowEditDistributor] = useState(false);

  const [showOperatorDetails, setShowOperatorDetails] = useState(true);
  const [selectedRowData, setSelectedRowData] = useState({});
  const [accountDetails, setAccountDetails] = useState([]);
  const currentDate = new Date().toISOString().split("T")[0];
  const [fromDate, setFromDate] = useState(currentDate);
  const [toDate, setToDate] = useState(currentDate);

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      id: (distributor && distributor.id) || "",
      name: (distributor && distributor.name) || "",
      code: (distributor && distributor.code) || "",
      addr: (distributor && distributor.addr) || "",
      addr1: (distributor && distributor.addr1) || "",
      addr2: (distributor && distributor.addr2) || "",
      addr3: (distributor && distributor.addr3) || "",
      contact_person: (distributor && distributor.contact_person) || "",
      mobile_no: (distributor && distributor.mobile_no) || "",
      phone_no: (distributor && distributor.phone_no) || "",
      faxno: (distributor && distributor.faxno) || "",
      state_lbl: (distributor && distributor.state_lbl) || "",
      district_lbl: (distributor && distributor.district_lbl) || "",
      city_lbl: (distributor && distributor.city_lbl) || "",
      gstno: (distributor && distributor.gstno) || "",
      panno: (distributor && distributor.panno) || "",
      username: (distributor && distributor.username) || "",
      status_lbl: (distributor && distributor.status_lbl) || "",
      email: (distributor && distributor.email) || "",
      pincode: (distributor && distributor.pincode) || "",
      por_number: (distributor && distributor.por_number) || "",
      reg_phase: (distributor && distributor.reg_phase) || "",
      reg_startdate: (distributor && distributor.reg_startdate) || "",
      reg_enddate: (distributor && distributor.reg_enddate) || "",
      gst_date: (distributor && distributor.gst_date) || "",
      credit_limit: (distributor && distributor.credit_limit) || "",
      area_id: (distributor && distributor.area_id) || "",
      branch_lbl: (distributor && distributor.branch_lbl) || "",
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
      const updateDistributor = {
        id: Math.floor(Math.random() * (30 - 20)) + 20,
        name: values["name"],
        code: values["code"],
        addr1: values["addr1"],
        addr2: values["addr2"],
        addr3: values["addr3"],
        contact_person: values["contact_person"],
        mobile_no: values["mobile_no"],
        phone_no: values["phone_no"],
        faxno: values["faxno"],
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
      dispatch(onUpdateUser(updateDistributor));
      validation.resetForm();
      toggleViewModal();
    },
  });

  const getSelectedRowDetails = async (e) => {
    try {
      const token = "Bearer " + localStorage.getItem("temptoken");

      const response = await axios.get(
        `${API_URL}/operator-account/${distributor.id}?expand=logo,type_lbl,mso_lbl,branch_lbl,distributor_lbl,igst,cgst,sgst,name,balance,credit,debit,balance_h,credit_h,debit_h&vr=web1.0`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setSelectedRowData(response.data.data);
      console.log("response in useEffect:" + JSON.stringify(response));
    } catch (error) {
      console.error("Error fetching bouquet data:", error);
    }
  };
  const getOperatorAccountDetails = async (e) => {
    // e.preventDefault();
    // console.log("Form submitted");
    try {
      const token = "Bearer " + localStorage.getItem("temptoken");
      // console.log("Dates: " + fromDate, toDate);
      const response = await axios.get(
        `${API_URL}/operator-account?expand=created_by_lbl,type_lbl,cr_operator_lbl,dr_operator_lbl,credited_by,igst,cgst,sgst,name,balance,credit,debit,balance_h,credit_h,debit_h&filter[operator_id]=${distributor.id}&filter[wallet_type]=2&filter[FRM_created_at]=${fromDate}&filter[TO_created_at]=${toDate}&page=1&per-page=50&vr=web1.0`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setAccountDetails(response.data.data);
      console.log("response in useEffect:" + JSON.stringify(response));
    } catch (error) {
      console.error("Error fetching bouquet data:", error);
    }
  };
  useEffect(() => {
    // if (Object.keys(distributor).length === 0) {
    if (distributor) {
      // debugger;
      getSelectedRowDetails();
      getOperatorAccountDetails();
    }
  }, [distributor]);

  const handleClose = () => {
    setViewDistributor(false);
    setShowEditDistributor(false);
  };
  // console.log("selectedRowData:" + JSON.stringify(selectedRowData));
  // console.log(
  //   "ParentId of selectedRowData:" + selectedRowData.parent_id,
  //   selectedRowData.city_id,
  //   selectedRowData.district_id,
  //   selectedRowData.distributor_id
  // );
  return (
    <Modal
      isOpen={isOpen}
      role="dialog"
      size="xl"
      autoFocus={true}
      centered={true}
      className="exampleModal"
      tabIndex="-1"
      toggle={toggleViewModal}
    >
      {!showEditDistributor ? (
        <>
          <ModalHeader toggle={toggleViewModal} tag="h4" position="relative">
            <h4>
              View - {distributor.name}, Balance: {selectedRowData.balance},
              Credit Limit: {selectedRowData.credit_limit}
            </h4>
          </ModalHeader>
          <Link
            style={{
              position: "absolute",
              marginLeft: "92%",
              marginTop: "1%",
            }}
            to="#!"
            className="btn btn-light me-1"
            onClick={() => setShowEditDistributor(true)}
          >
            <i className="mdi mdi-pencil-outline"></i>
          </Link>

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
                      onClick={() =>
                        setShowOperatorDetails(!showOperatorDetails)
                      }
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
              {showOperatorDetails ? (
                <>
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
                          name="addr"
                          label="Address"
                          type="text"
                          placeholder="Enter Address"
                          disabled
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
                    <Col lg={12}>
                      <div className="mb-3">
                        <Label className="form-label">Parent</Label>
                        <Input
                          name="branch_lbl"
                          label="Parent"
                          type="text"
                          placeholder="Enter Parent"
                          disabled
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.branch_lbl || ""}
                          invalid={
                            validation.touched.branch_lbl &&
                            validation.errors.branch_lbl
                              ? true
                              : false
                          }
                        />
                        {validation.touched.branch_lbl &&
                        validation.errors.branch_lbl ? (
                          <FormFeedback type="invalid">
                            {validation.errors.branch_lbl}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </Col>
                  </Row>
                </>
              ) : (
                <></>
              )}
              <Row>
                <Col lg={12}>
                  <TapsOfViewDistributor
                    selectedRowId={selectedRowData.id}
                    accountDetails={accountDetails}
                    setAccountDetails={setAccountDetails}
                    setFromDate={setFromDate}
                    setToDate={setToDate}
                    fromDate={fromDate}
                    toDate={toDate}
                    selectedRowData={selectedRowData}
                  />
                </Col>
              </Row>
            </Form>
          </ModalBody>
        </>
      ) : (
        <EditDistributorModal
          distributor={distributor}
          toggleCloseModal={handleClose}
          distributorsPhase={distributorsPhase}
          distributorsStatus={distributorsStatus}
        />
      )}
    </Modal>
  );
};

ViewDistributorModal.propTypes = {
  toggleViewModal: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default ViewDistributorModal;
