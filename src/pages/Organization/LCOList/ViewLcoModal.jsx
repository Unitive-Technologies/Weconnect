import React, { useEffect, useState, useRef, useMemo } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import axios from "axios";
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
import { getSingleLco as onGetSingleLco } from "/src/store/lcolist/actions";
import TapsOfLco from "./TapsOfLco";
import EditLcoModal from "./EditLcoModal";
import { createSelector } from "reselect";

const ViewLcoModal = (props) => {
  const {
    isOpen,
    toggleViewLco,
    lcoData,
    setViewLco,
    lcoBilledby,
    lcoStatus,
    lcoPhase,
    lcoStates,
    lcoCustomerPortal,
    lcoParentDistributor,
  } = props;
  // console.log("lco in view modal:" + JSON.stringify(lcoData));
  const API_URL = "https://sms.unitch.in/api/index.php/v1";
  const dispatch = useDispatch();
  const [showEditLco, setShowEditLco] = useState(false);
  const [showOperatorDetails, setShowOperatorDetails] = useState(true);
  const [selectedRowData, setSelectedRowData] = useState({});
  const [accountDetails, setAccountDetails] = useState([]);
  const currentDate = new Date().toISOString().split("T")[0];
  const [fromDate, setFromDate] = useState(currentDate);
  const [toDate, setToDate] = useState(currentDate);
  // const selectLcoState = (state) => state.lco;
  // const LcoProperties = createSelector(selectLcoState, (lco) => ({
  //   lco: lco.lco,
  // }));

  // const { lco } = useSelector(LcoProperties);
  // console.log("single Lco000000000:" + JSON.stringify(lco));
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      id: (lcoData && lcoData.id) || "",
      name: (lcoData && lcoData.name) || "",
      code: lcoData.code,
      addr: lcoData.addr,
      addr2: lcoData.addr2,
      addr3: lcoData.addr3,
      contact_person: lcoData.contact_person,
      mobile_no: lcoData.mobile_no,
      mso_lbl: (lcoData && lcoData.mso_lbl) || "",
      branch_lbl: (lcoData && lcoData.branch_lbl) || "",
      distributor_lbl: (lcoData && lcoData.distributor_lbl) || "",
      phone_no: lcoData.phone_no,
      fax_no: lcoData.fax_no,
      state_lbl: lcoData.state_lbl,
      district_lbl: lcoData.district_lbl,
      city_lbl: lcoData.city_lbl,
      gstno: lcoData.gstno,
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
      toggleViewLco();
    },
  });

  const handleEditRegionalOffice = () => {
    setShowEditLco(!showEditLco);
  };
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
  const getSelectedRowDetails = async (e) => {
    try {
      const token = "Bearer " + localStorage.getItem("temptoken");

      const response = await axios.get(
        `${API_URL}/operator-account/${lcoData.id}?expand=logo,type_lbl,mso_lbl,branch_lbl,distributor_lbl,igst,cgst,sgst,name,balance,credit,debit,balance_h,credit_h,debit_h&vr=web1.0`,
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
        `${API_URL}/operator-account?expand=created_by_lbl,type_lbl,cr_operator_lbl,dr_operator_lbl,credited_by,igst,cgst,sgst,name,balance,credit,debit,balance_h,credit_h,debit_h&filter[operator_id]=${lcoData.id}&filter[wallet_type]=2&filter[FRM_created_at]=${fromDate}&filter[TO_created_at]=${toDate}&page=1&per-page=50&vr=web1.0`,
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
    if (lcoData) {
      getSelectedRowDetails();
      getOperatorAccountDetails();
    }
  }, [lcoData]);

  const handleClose = () => {
    setViewLco(false);
    setShowEditLco(false);
  };
  console.log("selectedRowData:" + JSON.stringify(selectedRowData));
  return (
    <>
      {/* <EditRegionalOfficeModal
        isOpen={showEditRegionalOffice}
        togglelink={handleEditRegionalOffice}
        regionalOffData={regionalOffData}
      /> */}

      <Modal
        isOpen={isOpen}
        role="dialog"
        size="xl"
        autoFocus={true}
        centered={true}
        className="exampleModal"
        tabIndex="-1"
        toggle={toggleViewLco}
      >
        {!showEditLco ? (
          <>
            <ModalHeader toggle={toggleViewLco} tag="h4">
              <h4>View - {lcoData.name}</h4>
            </ModalHeader>
            <Link
              style={{
                position: "absolute",
                marginLeft: "92%",
                marginTop: "1%",
              }}
              to="#!"
              className="btn btn-light me-1"
              onClick={() => setShowEditLco(true)}
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
                      <Col lg={4}>
                        <div className="mb-3">
                          <Label className="form-label">MSO</Label>
                          <Input
                            name="mso_lbl"
                            label="Parent"
                            type="text"
                            placeholder="Enter MSO"
                            disabled
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.mso_lbl || ""}
                            invalid={
                              validation.touched.mso_lbl &&
                              validation.errors.mso_lbl
                                ? true
                                : false
                            }
                          />
                          {validation.touched.mso_lbl &&
                          validation.errors.mso_lbl ? (
                            <FormFeedback type="invalid">
                              {validation.errors.mso_lbl}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </Col>
                      <Col lg={4}>
                        <div className="mb-3">
                          <Label className="form-label">Regional Office</Label>
                          <Input
                            name="branch_lbl"
                            label="Parent"
                            type="text"
                            placeholder="Enter Regional Office"
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
                      <Col lg={4}>
                        <div className="mb-3">
                          <Label className="form-label">Distributor</Label>
                          <Input
                            name="distributor_lbl"
                            label="Parent"
                            type="text"
                            placeholder="Enter Parent"
                            disabled
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.distributor_lbl || ""}
                            invalid={
                              validation.touched.distributor_lbl &&
                              validation.errors.distributor_lbl
                                ? true
                                : false
                            }
                          />
                          {validation.touched.distributor_lbl &&
                          validation.errors.distributor_lbl ? (
                            <FormFeedback type="invalid">
                              {validation.errors.distributor_lbl}
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
                    <TapsOfLco
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
          <EditLcoModal
            lcoData={lcoData}
            toggleCloseModal={handleClose}
            // closeViewModal={() => setViewLco(false)}
            // closeEditModal={() => setShowEditLco(false)}
            lcoBilledby={lcoBilledby}
            lcoStatus={lcoStatus}
            lcoPhase={lcoPhase}
            lcoStates={lcoStates}
            lcoCustomerPortal={lcoCustomerPortal}
            lcoParentDistributor={lcoParentDistributor}
          />
        )}
      </Modal>
    </>
  );
};

ViewLcoModal.propTypes = {
  toggleViewLco: PropTypes.func,
  isOpen: PropTypes.bool,

  lcoBilledby: PropTypes.array,
  lcoStatus: PropTypes.array,
  lcoPhase: PropTypes.array,
  lcoStates: PropTypes.array,
  lcoCustomerPortal: PropTypes.array,
  lcoParentDistributor: PropTypes.array,
};

export default ViewLcoModal;
