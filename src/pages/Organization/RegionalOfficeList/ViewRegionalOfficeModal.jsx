import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import axios from "axios";
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
import { updateRegionalOffice as onUpdateRegionalOffice } from "/src/store/regionaloffice/actions";
import TapsOfViewRegionalOffice from "./TapsOfViewRegionalOffice";
import EditRegionalOfficeModal from "./EditRegionalOfficeModal";
import {
  goToPage as onGoToPage,
  getRegionalAllottedBouquet as onGetRegionalAllottedBouquet,
} from "../../../store/regionaloffice/actions";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";

const ViewRegionalOfficeModal = (props) => {
  const {
    isOpen,
    toggleViewRegionalOffice,
    resetSelection,
    regionalOffData,
    setViewRegionalOffice,
    selectedRowId,
  } = props;
  console.log(
    "@@@@@@@@@regionalOffData in view modal:" + JSON.stringify(regionalOffData)
  );
  const dispatch = useDispatch();
  const API_URL = "https://sms.unitch.in/api/index.php/v1";
  const [allottedBouquets, setAllottedBouquets] = useState([]);

  // const selectRegionalOfficeState = (state) => state.regionaloffice;
  // const RegionalOfficeProperties = createSelector(
  //   selectRegionalOfficeState,

  //   (regionalStates) => ({
  //     allottedBouquet: regionalStates.regionalBouquet,
  //     loading: regionalStates.loading,
  //     totalPage: regionalStates.totalPages,
  //     totalCount: regionalStates.totalCount,
  //     pageSize: regionalStates.perPage,
  //     currentPage: regionalStates.currentPage,
  //   })
  // );

  // const {
  //   allottedBouquet,
  //   loading,
  //   totalPage,
  //   totalCount,
  //   currentPage,
  //   pageSize,
  // } = useSelector(RegionalOfficeProperties);

  // useEffect(() => {
  //   if (regionalOffData && !regionalOffData.length) {
  //     dispatch(onGetRegionalAllottedBouquet());
  //   }
  // }, [dispatch, regionalOffData]);

  // const goToPage = (toPage) => {
  //   console.log("[GOTO PAGE] Trigger to page - ", toPage);
  //   dispatch(onGoToPage(toPage));
  //   dispatch(onGetRegionalAllottedBouquet());
  // };
  const [showEditRegionalOffice, setShowEditRegionalOffice] = useState(false);
  const [showOperatorDetails, setShowOperatorDetails] = useState(true);
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      // id: (regionalOffData && regionalOffData.id) || "",
      name: (regionalOffData && regionalOffData.name) || "",
      code: (regionalOffData && regionalOffData.code) || "",
      addr: (regionalOffData && regionalOffData.addr) || "",
      addr1: (regionalOffData && regionalOffData.addr1) || "",
      addr2: (regionalOffData && regionalOffData.addr2) || "",
      addr3: (regionalOffData && regionalOffData.addr3) || "",
      contact_person: (regionalOffData && regionalOffData.contact_person) || "",
      mobile_no: (regionalOffData && regionalOffData.mobile_no) || "",
      phone_no: (regionalOffData && regionalOffData.phone_no) || "",
      mso_lbl: (regionalOffData && regionalOffData.mso_lbl) || "",
      username: (regionalOffData && regionalOffData.username) || "",
      // fax_no: regionalOffData.fax_no,
      // state_lbl: regionalOffData.state_lbl,
      // district_lbl: regionalOffData.district_lbl,
      // city_lbl: regionalOffData.city_lbl,
      // gstno: regionalOffData.gstno,

      // panno: "",

      // status_lbl: "",
      // email: "",
      // pincode: "",
      // por_number: "",
      // reg_phase: "",
      // reg_startdate: "",
      // reg_enddate: "",
      // gst_date: "",
      // credit_limit: "",
      // area_id: "",
      // agreement_data: [],
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
      resetSelection();
      toggleViewRegionalOffice();
    },
  });

  const handleCancel = () => {
    setShowEditRegionalOffice(false);
    resetSelection();
    toggleViewRegionalOffice();
  };

  useEffect(() => {
    const getAllottedBouquets = async (e) => {
      try {
        const token = "Bearer " + localStorage.getItem("temptoken");

        const response = await axios.get(
          `${API_URL}/operator-bouque?expand=boxtype_lbl,type_lbl,status_lbl,created_by_lbl&filter[operator_id]=${selectedRowId}&vr=web1.0`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        setAllottedBouquets(response.data.data);
        console.log("response in useEffect:" + JSON.stringify(response));
      } catch (error) {
        console.error("Error fetching addChannels data:", error);
      }
    };
    if (selectedRowId) {
      getAllottedBouquets();
    }
  }, [selectedRowId]);

  console.log("allotted:" + JSON.stringify(allottedBouquets));
  return (
    <>
      <Modal
        isOpen={isOpen}
        role="dialog"
        size="xl"
        autoFocus={true}
        centered={true}
        className="exampleModal"
        tabIndex="-1"
        toggle={handleCancel}
      >
        {!showEditRegionalOffice ? (
          <>
            <ModalHeader toggle={handleCancel} tag="h4" position="relative">
              <h4>View - {regionalOffData.name}</h4>
            </ModalHeader>
            <Link
              style={{
                position: "absolute",
                marginLeft: "92%",
                marginTop: "1%",
              }}
              to="#!"
              className="btn btn-light me-1"
              onClick={() => setShowEditRegionalOffice(true)}
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
                            name="mso_lbl"
                            label="Parent"
                            type="text"
                            placeholder="Enter Parent"
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
                    </Row>
                  </>
                ) : (
                  <></>
                )}
                <Row>
                  <Col lg={12}>
                    <TapsOfViewRegionalOffice
                      allottedBouquets={allottedBouquets}
                    />
                  </Col>
                </Row>
              </Form>
            </ModalBody>
          </>
        ) : (
          <EditRegionalOfficeModal
            regionalOffData={regionalOffData}
            closeViewModal={() => setViewRegionalOffice(false)}
            closeEditModal={() => setShowEditRegionalOffice(false)}
          />
        )}
      </Modal>
    </>
  );
};

ViewRegionalOfficeModal.propTypes = {
  isOpen: PropTypes.bool,
  toggleViewRegionalOffice: PropTypes.func,
  resetSelection: PropTypes.func,
  regionalOffData: PropTypes.object,
  setViewRegionalOffice: PropTypes.func,
};

export default ViewRegionalOfficeModal;
