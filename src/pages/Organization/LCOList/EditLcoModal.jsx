import React, { useEffect, useState, useRef, useMemo } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { createSelector } from "reselect";
import {
  Card,
  CardBody,
  Button,
  Col,
  Container,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
  FormFeedback,
  UncontrolledTooltip,
  Input,
  Form,
} from "reactstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import {
  updateLco as onUpdateLco,
  getLco as onGetLco,
} from "/src/store/lcolist/actions";

const EditLcoModal = (props) => {
  const {
    isOpen,
    toggleCloseModal,
    lcoData,
    lcoBilledby,
    lcoStatus,
    lcoPhase,
    lcoStates,
    lcoCustomerPortal,
    lcoParentDistributor,
  } = props;
  console.log("lcoData in editmodal:" + JSON.stringify(lcoParentDistributor));
  const API_URL = "https://sms.unitch.in/api/index.php/v1";
  const [toggleSwitch, settoggleSwitch] = useState(true);
  const dispatch = useDispatch();
  const [districtsList, setDistrictsList] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [cityList, setCityList] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");

  const selectStatesState = (state) => state.stateUsers;

  const StatesProperties = createSelector(selectStatesState, (states) => ({
    statesList: states.stateUsers,
  }));

  const { statesList } = useSelector(StatesProperties);

  const handleChangeUploadFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      const { name, type } = file;
      const ext = name.split(".").pop();
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const data = reader.result;

        validation.setFieldValue("upload", {
          name,
          type,
          ext,
          data,
        });
      };
    }
  };

  const handleChangeLogo = (e) => {
    const file = e.target.files[0];
    if (file) {
      const { name, type } = file;
      const ext = name.split(".").pop();
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const data = reader.result;

        validation.setFieldValue("logo", {
          name,
          type,
          ext,
          data,
        });
      };
    }
  };

  const handleStateChange = async (e) => {
    try {
      const stateName = e.target.value;
      setSelectedState(stateName);

      validation.handleChange(e);
      {
        console.log("selectedState:" + typeof selectedState);
      }

      // Assuming you have a token stored in localStorage
      const token = "Bearer " + localStorage.getItem("temptoken");

      const response = await axios.get(
        `${API_URL}/administrative-division?fields=id,name&filter[state_id]=${selectedState}&filter[type]=2&vr=web1.0`,
        {
          headers: {
            Authorization: token, // Include your token here
          },
        }
      );

      console.log(
        "districtlist after selection : " + JSON.stringify(response.data.data)
      );
      setDistrictsList(response.data.data);
    } catch (error) {
      console.error("Error fetching policy data:", error);
      // Handle error if necessary
    }
    // };
  };

  const handleDistrictChange = async (e) => {
    try {
      const districtName = e.target.value;
      setSelectedDistrict(districtName);

      validation.handleChange(e);
      {
        console.log("selectedDistrict:" + typeof selectedDistrict);
      }

      // Assuming you have a token stored in localStorage
      const token = "Bearer " + localStorage.getItem("temptoken");

      const response = await axios.get(
        `${API_URL}/administrative-division?fields=id,name&filter[state_id]=${selectedState}&filter[district_id]=${selectedDistrict}&filter[type]=3&vr=web1.0`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      console.log(
        "cityList after selection : " + JSON.stringify(response.data.data)
      );
      setCityList(response.data.data);
    } catch (error) {
      console.error("Error fetching policy data:", error);
      // Handle error if necessary
    }
    // };
  };

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      name: (lcoData && lcoData.name) || "",
      code: (lcoData && lcoData.code) || "",
      contact_person: (lcoData && lcoData.contact_person) || "",
      email: (lcoData && lcoData.email) || "",
      mobile_no: (lcoData && lcoData.mobile_no) || "",
      phone_no: (lcoData && lcoData.phone_no) || "",
      fax_no: (lcoData && lcoData.fax_no) || "",
      addr1: (lcoData && lcoData.addr1) || "",
      addr2: (lcoData && lcoData.addr2) || "",
      addr3: (lcoData && lcoData.addr3) || "",
      por_number: (lcoData && lcoData.por_number) || "",
      pincode: (lcoData && lcoData.pincode) || "",
      billed_by: (lcoData && lcoData.billed_by) || "",
      area_id: (lcoData && lcoData.area_id) || "",
      // branch_id: (lcoData && lcoData.branch_id) || "",
      distributor_id: (lcoData && lcoData.distributor_id) || "",
      state: (lcoData && lcoData.state_id) || "",
      district: (lcoData && lcoData.district_id) || "",
      city: (lcoData && lcoData.city_id) || "",
      gstno: (lcoData && lcoData.gstno) || "",
      panno: (lcoData && lcoData.panno) || "",
      status: (lcoData && lcoData.status) || "",
      reg_phase: (lcoData && lcoData.reg_phase) || "",
      reg_startdate: (lcoData && lcoData.reg_startdate) || "",
      reg_enddate: (lcoData && lcoData.reg_enddate) || "",
      gst_date: (lcoData && lcoData.gst_date) || "",
      credit_limit: (lcoData && lcoData.credit_limit) || "",
      collection_enabled: (lcoData && lcoData.collection_enabled) || "",
      customer_portal_config: (lcoData && lcoData.customer_portal_config) || "",
      enable_customer_billing:
        (lcoData && lcoData.enable_customer_billing) || "",
      parent_id: (lcoData && lcoData.branch_id) || "",
      uid: (lcoData && lcoData.uid) || "",
      agreestart:
        (lcoData &&
          lcoData.agreement_data &&
          lcoData.agreement_data.start_date) ||
        "",
      agreeend:
        (lcoData &&
          lcoData.agreement_data &&
          lcoData.agreement_data.end_date) ||
        "",
    },

    validationSchema: Yup.object({
      name: Yup.string().required("Enter name"),
      addr1: Yup.string().required("Enter address 1"),
      contact_person: Yup.string().required("Enter contact person name"),
      mobile_no: Yup.string()
        .required("Enter mobile number")
        .matches(/^[0-9]/, "Enter valid number")
        .max(10, "Min 10 digit number"),
      status: Yup.string().required("Select status"),
      state: Yup.string().required("Select state"),
      district: Yup.string().required("Select District"),
      city: Yup.string().required("Select City"),
      email: Yup.string()
        .email("Your email address must be of the format name@domain.com")
        .required("Enter Email"),
      phone_no: Yup.string()
        .matches(/^[0-9]/, "Enter valid number")
        .min(8, "Min 8 digit number")
        .max(12, "Max 12 digit number"),
      pincode: Yup.string().matches(/^[0-9]{6,}$/, "Length to be 6 digits"),
      fax_no: Yup.string().matches(/^[0-9]{2,}$/, "Minimum length 2 character"),
      gstno: Yup.string().matches(/^[1-9A-Z]{15}$/, "Max length 15 character"),
      panno: Yup.string().matches(
        /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
        "Min 10 digit number"
      ),
      credit_limit: Yup.string()
        .matches(/^[0-9]+$/, "Please enter a value greater than or equal to 0.")
        .required("Enter Credit Limit"),
      area_id: Yup.string()
        .matches(/^\d{1,10}$/, "Enter valid number")
        .required("Enter Area id"),
      billed_by: Yup.string().required("Please Select BilledBy"),
      collection_enabled: Yup.string().required(
        "Please Select Enable Customer Collection"
      ),
      parent_id: Yup.string().required("Select Parent Distributor"),
    }),

    onSubmit: (values) => {
      const updateLco = {
        id: lcoData.id,
        name: values["name"],
        // addr: `${values["addr1"]}, ${values["addr2"]}, ${values["addr3"]}`,
        addr: values["addr1"],
        // addr1: values["addr1"],
        addr2: values["addr2"],
        addr3: values["addr3"],
        agreement_data: {
          name: values["upload"] ? values["upload"].name : "", // Handle undefined case
          type: values["upload"] ? values["upload"].type : "",
          ext: values["upload"] ? values["upload"].ext : "",
          data: values["upload"] ? values["upload"].data : "",
          start_date: values["agreestart"],
          end_date: values["agreeend"],
        },
        area_id: parseInt(values["area_id"]),
        billed_by: parseInt(values["billed_by"]),
        city_id: parseInt(values["city"]),
        code: values["code"],
        collection_enabled: parseInt(values["collection_enabled"]),
        contact_person: values["contact_person"],
        credit_limit: parseInt(values["credit_limit"]),
        customer_portal_config: parseInt(values["customer_portal_config"]),
        district_id: parseInt(values["district"]),
        email: values["email"],
        enable_customer_billing: parseInt(values["enable_customer_billing"]),
        fax_no: values["fax_no"],
        gst_date: values["gst_date"],
        gstno: values["gstno"],
        mobile_no: values["mobile_no"],
        panno: values["panno"],
        parent_id: parseInt(values["parent_id"]),
        phone_no: values["phone_no"],
        pincode: values["pincode"],
        por_number: values["por_number"],
        reg_phase: parseInt(values["reg_phase"]),
        // reg_startdate: values["reg_startdate"],
        // reg_enddate: values["reg_enddate"],
        state_id: parseInt(values["state"]),
        status: parseInt(values["status"]),
        uid: values["uid"],
        type: 3,
      };
      console.log("updateLco:" + updateLco);
      // save new user
      dispatch(onUpdateLco(updateLco));
      dispatch(onGetLco());
      validation.resetForm();
      toggleCloseModal();
    },
  });

  const getDistrictValue = async (e) => {
    try {
      // Assuming you have a token stored in localStorage
      const token = "Bearer " + localStorage.getItem("temptoken");

      const response = await axios.get(
        `${API_URL}/administrative-division?fields=id,name&filter[state_id]=${selectedState}&filter[type]=2&vr=web1.0`,
        {
          headers: {
            Authorization: token, // Include your token here
          },
        }
      );

      console.log(
        "districtlist after selection : " + JSON.stringify(response.data.data)
      );
      setDistrictsList(response.data.data);
    } catch (error) {
      console.error("Error fetching policy data:", error);
      // Handle error if necessary
    }
    // };
  };

  const getCityValue = async (e) => {
    try {
      const token = "Bearer " + localStorage.getItem("temptoken");

      const response = await axios.get(
        `${API_URL}/administrative-division?fields=id,name&filter[state_id]=${selectedState}&filter[district_id]=${selectedDistrict}&filter[type]=3&vr=web1.0`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      console.log(
        "cityList after selection : " + JSON.stringify(response.data.data)
      );
      setCityList(response.data.data);
    } catch (error) {
      console.error("Error fetching policy data:", error);
      // Handle error if necessary
    }
    // };
  };

  useEffect(() => {
    if (lcoData && lcoData.state_id) {
      setSelectedState(lcoData.state_id);
      setSelectedDistrict(lcoData.district_id);
    }
    getDistrictValue();
    getCityValue();
  }, [lcoData]);

  return (
    // <Modal
    //   isOpen={isOpen}
    //   role="dialog"
    //   size="xl"
    //   autoFocus={true}
    //   centered={true}
    //   className="exampleModal"
    //   tabIndex="-1"
    //   toggle={togglelink}
    // >
    <>
      <ModalHeader tag="h4" toggle={toggleCloseModal}>
        <h4>Edit - {lcoData.name}</h4>
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
            <Col lg={4}>
              <div className="mb-3">
                <Label className="form-label">Code</Label>
                <Input
                  disabled
                  name="code"
                  type="text"
                  placeholder="Enter Code"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.code || ""}
                />
              </div>
            </Col>
            <Col lg={2}>
              <div className="mt-3">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <label style={{ marginRight: "10px" }}>Custom</label>
                  <div className="form-check form-switch form-switch-lg mb-2">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="customSwitchsizelg"
                      defaultChecked
                      onClick={(e) => {
                        settoggleSwitch(!toggleSwitch);
                      }}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="customSwitchsizelg"
                    >
                      Auto
                    </label>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col lg={4}>
              <div
                className="mb-3"
                style={{ display: "flex", flexDirection: "column" }}
              >
                <Label className="form-label">Logo</Label>
                <input
                  name="logo"
                  type="file"
                  onChange={handleChangeLogo}
                ></input>
              </div>
            </Col>
            {console.log("logo:" + JSON.stringify(validation.values.logo))}
            <Col lg={4}>
              <div className="mb-3">
                <Label className="form-label">
                  Name<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="name"
                  type="text"
                  placeholder="Enter name"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.name || ""}
                  invalid={
                    validation.touched.name && validation.errors.name
                      ? true
                      : false
                  }
                ></Input>
                {validation.touched.name && validation.errors.name ? (
                  <FormFeedback type="invalid">
                    {validation.errors.name}
                  </FormFeedback>
                ) : null}
              </div>
              <div className="mb-3">
                <Label className="form-label">
                  Contact Person<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="contact_person"
                  label="Contact Person"
                  type="text"
                  placeholder="Enter Contact Person Name"
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

            <Col lg={4}>
              <div className="mb-3">
                <Label className="form-label">
                  Parent Distributor<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="parent_id"
                  type="select"
                  placeholder="Select Parent Distributor"
                  className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.parent_id || ""}
                  invalid={
                    validation.touched.parent_id && validation.errors.parent_id
                      ? true
                      : false
                  }
                >
                  {lcoParentDistributor &&
                    lcoParentDistributor.map((parent) => (
                      <option key={parent.id} value={parent.id}>
                        {parent.name}
                      </option>
                    ))}
                </Input>
                {validation.touched.parent_id && validation.errors.parent_id ? (
                  <FormFeedback type="invalid">
                    {validation.errors.parent_id}
                  </FormFeedback>
                ) : null}
              </div>

              <div className="mb-3">
                <Label className="form-label">
                  Status<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="status"
                  type="select"
                  placeholder="Select Status"
                  className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.status || ""}
                  invalid={
                    validation.touched.status && validation.errors.status
                      ? true
                      : false
                  }
                >
                  <option value="">Select Status</option>
                  {lcoStatus &&
                    lcoStatus.map((status) => (
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

          <Row>
            <Col lg={4}>
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
            </Col>
            <Col lg={4}>
              <div className="mb-3">
                <Label className="form-label">Phone No.</Label>
                <Input
                  name="phone_no"
                  label="Phone No."
                  placeholder="Enter Phone Number"
                  type="text"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.phone_no || ""}
                />
              </div>
            </Col>
            <Col lg={4}>
              <div className="mb-3">
                <Label className="form-label">
                  Email Address<span style={{ color: "red" }}>*</span>
                </Label>
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
            </Col>
          </Row>
          <Row>
            <Col lg={4}>
              <div className="mb-3">
                <Label className="form-label">
                  State<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="state"
                  type="select"
                  placeholder="Select State"
                  className="form-select"
                  onChange={handleStateChange}
                  onBlur={validation.handleBlur}
                  value={selectedState}
                  invalid={
                    validation.touched.state && validation.errors.state
                      ? true
                      : false
                  }
                >
                  {lcoStates &&
                    lcoStates.map((state) => (
                      <option key={state.id} value={state.id}>
                        {state.name}
                      </option>
                    ))}
                </Input>
                {validation.touched.state && validation.errors.state ? (
                  <FormFeedback type="invalid">
                    {validation.errors.state}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
            <Col lg={4}>
              <div className="mb-3">
                <Label className="form-label">
                  District<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="district"
                  type="select"
                  placeholder="Select District"
                  className="form-select"
                  onChange={handleDistrictChange}
                  onBlur={validation.handleBlur}
                  value={selectedDistrict}
                  invalid={
                    validation.touched.district && validation.errors.district
                      ? true
                      : false
                  }
                >
                  {districtsList.map((district) => (
                    <option key={district.id} value={district.id}>
                      {district.name}
                    </option>
                  ))}
                </Input>
                {validation.touched.district && validation.errors.district ? (
                  <FormFeedback type="invalid">
                    {validation.errors.district}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
            <Col lg={4}>
              <div className="mb-3">
                <Label className="form-label">
                  City<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="city"
                  type="select"
                  placeholder="Select City"
                  className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.city || ""}
                  invalid={
                    validation.touched.city && validation.errors.city
                      ? true
                      : false
                  }
                >
                  {cityList.map((city) => (
                    <option key={city.id} value={city.id}>
                      {city.name}
                    </option>
                  ))}
                </Input>
                {validation.touched.city && validation.errors.city ? (
                  <FormFeedback type="invalid">
                    {validation.errors.city}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
          </Row>
          <Row>
            <Col lg={4}>
              <div className="mb-3">
                <Label className="form-label">
                  Address1<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="addr1"
                  label="Address1"
                  type="text"
                  placeholder="Enter Address"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.addr1 || ""}
                  invalid={
                    validation.touched.addr1 && validation.errors.addr1
                      ? true
                      : false
                  }
                />
                {validation.touched.addr1 && validation.errors.addr1 ? (
                  <FormFeedback type="invalid">
                    {validation.errors.addr1}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>

            <Col lg={4}>
              <div className="mb-3">
                <Label className="form-label">Address2</Label>
                <Input
                  name="addr2"
                  label="Address2"
                  type="text"
                  placeholder="Enter Address"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.addr2 || ""}
                />
              </div>
            </Col>

            <Col lg={4}>
              <div className="mb-3">
                <Label className="form-label">Address3</Label>
                <Input
                  name="addr3"
                  label="Address3"
                  type="text"
                  placeholder="Enter Address"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.addr3 || ""}
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col lg={4}>
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
            </Col>
            <Col lg={4}>
              <div className="mb-3">
                <Label className="form-label">
                  Postal Office Registration(POR)
                </Label>
                <Input
                  name="por_number"
                  label="Postal Office Registration"
                  type="text"
                  placeholder="Enter POR Number"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.por_number || ""}
                />
              </div>
            </Col>
            <Col lg={4}>
              <div className="mb-3">
                <Label className="form-label">Phase</Label>
                <Input
                  name="reg_phase"
                  type="select"
                  placeholder="Select Phase"
                  className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.reg_phase || ""}
                >
                  <option value="">Select Phase</option>
                  {lcoPhase &&
                    lcoPhase.map((phase) => (
                      <option key={phase.id} value={phase.id}>
                        {phase.name}
                      </option>
                    ))}
                </Input>
              </div>
            </Col>
          </Row>
          <Row>
            <Col lg={4}>
              <div className="mb-3">
                <Label className="form-label">Registration Start Date</Label>
                <Input
                  name="reg_startdate"
                  type="date"
                  placeholder="Select Start Date"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.reg_startdate || ""}
                />
              </div>
            </Col>

            <Col lg={4}>
              <div className="mb-3">
                <Label className="form-label">Registration End Date</Label>
                <Input
                  name="reg_enddate"
                  type="date"
                  placeholder="Select End Date"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.reg_enddate || ""}
                />
              </div>
            </Col>

            <Col lg={4}>
              <div className="mb-3">
                <Label className="form-label">Fax No.</Label>
                <Input
                  name="fax_no"
                  type="text"
                  placeholder="Select Fax No."
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.fax_no || ""}
                  invalid={
                    validation.touched.fax_no && validation.errors.fax_no
                      ? true
                      : false
                  }
                />
                {validation.touched.fax_no && validation.errors.fax_no ? (
                  <FormFeedback type="invalid">
                    {validation.errors.fax_no}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
          </Row>
          <Row>
            <Col lg={4}>
              <div className="mb-3">
                <Label className="form-label">GST No.</Label>
                <Input
                  name="gstno"
                  type="text"
                  placeholder="Select GST No."
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.gstno || ""}
                  invalid={
                    validation.touched.gstno && validation.errors.gstno
                      ? true
                      : false
                  }
                />
                {validation.touched.gstno && validation.errors.gstno ? (
                  <FormFeedback type="invalid">
                    {validation.errors.gstno}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>

            <Col lg={4}>
              <div className="mb-3">
                <Label className="form-label">GST Reg. Date</Label>
                <Input
                  name="gst_date"
                  type="date"
                  placeholder="Select GST Reg Date"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.gst_date || ""}
                />
              </div>
            </Col>

            <Col lg={4}>
              <div className="mb-3">
                <Label className="form-label">PAN No.</Label>
                <Input
                  name="panno"
                  type="text"
                  placeholder="Select PAN No."
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.panno || ""}
                  invalid={
                    validation.touched.panno && validation.errors.panno
                      ? true
                      : false
                  }
                />
                {validation.touched.panno && validation.errors.panno ? (
                  <FormFeedback type="invalid">
                    {validation.errors.panno}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
          </Row>
          <Row>
            <Col lg={4}>
              <div className="mb-3">
                <Label className="form-label">
                  Billed By<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="billed_by"
                  type="select"
                  placeholder="Select Billed by"
                  className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.billed_by || ""}
                  invalid={
                    validation.touched.billed_by && validation.errors.billed_by
                      ? true
                      : false
                  }
                >
                  {lcoBilledby &&
                    lcoBilledby.map((billedby) => (
                      <option key={billedby.id} value={billedby.id}>
                        {billedby.name}
                      </option>
                    ))}
                </Input>
                {validation.touched.billed_by && validation.errors.billed_by ? (
                  <FormFeedback type="invalid">
                    {validation.errors.billed_by}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
            <Col lg={4}>
              <div className="mb-3">
                <Label className="form-label">Enable Customer Collection</Label>
                <Input
                  name="collection_enabled"
                  type="select"
                  placeholder="Select enable Customer Collection"
                  className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.collection_enabled || ""}
                  invalid={
                    validation.touched.collection_enabled &&
                    validation.errors.collection_enabled
                      ? true
                      : false
                  }
                >
                  <option value="">Select Enable Customer Collection</option>
                  <option value="1">Yes</option>
                  <option value="0">No</option>
                </Input>
                {validation.touched.collection_enabled &&
                validation.errors.collection_enabled ? (
                  <FormFeedback type="invalid">
                    {validation.errors.collection_enabled}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
            <Col lg={4}>
              <div className="mb-3">
                <Label className="form-label">
                  Credit Limit<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="credit_limit"
                  type="text"
                  placeholder="Enter Credit Limit"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.credit_limit || ""}
                  invalid={
                    validation.touched.credit_limit &&
                    validation.errors.credit_limit
                      ? true
                      : false
                  }
                />
                {validation.touched.credit_limit &&
                validation.errors.credit_limit ? (
                  <FormFeedback type="invalid">
                    {validation.errors.credit_limit}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
          </Row>
          <Row>
            <Col lg={4}>
              <div className="mb-3">
                <Label className="form-label">
                  Area ID<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="area_id"
                  type="text"
                  placeholder="Enter Area ID"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.area_id || ""}
                  invalid={
                    validation.touched.area_id && validation.errors.area_id
                      ? true
                      : false
                  }
                />
                {validation.touched.area_id && validation.errors.area_id ? (
                  <FormFeedback type="invalid">
                    {validation.errors.area_id}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
            <Col lg={4}>
              <div className="mb-3">
                <Label className="form-label">Customer Portal Config</Label>
                <Input
                  name="customer_portal_config"
                  type="select"
                  placeholder="Select Customer Portal Config"
                  className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.customer_portal_config || ""}
                >
                  <option value="">Select Customer Portal Config</option>
                  {lcoCustomerPortal &&
                    lcoCustomerPortal.map((customerportal) => (
                      <option key={customerportal.id} value={customerportal.id}>
                        {customerportal.name}
                      </option>
                    ))}
                </Input>
              </div>
            </Col>
            <Col lg={4}>
              <div className="mb-3">
                <Label className="form-label">UID</Label>
                <Input
                  name="uid"
                  type="text"
                  placeholder="Enter UID"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.uid || ""}
                />
              </div>
            </Col>
          </Row>
          <div
            style={{
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
            <h5 style={{}}>Agreement</h5>
          </div>
          <Row
            style={{
              position: "relative",
              border: "1px solid #ced4da",
              padding: "20px 0px",
              margin: "30px 0px",
            }}
          >
            <Col lg={4}>
              <div
                className="mb-3"
                style={{ display: "flex", flexDirection: "column" }}
              >
                <Label className="form-label">Agreement Upload</Label>
                <input
                  name="upload"
                  type="file"
                  onChange={handleChangeUploadFile}
                ></input>
                {validation.touched.upload && validation.errors.upload ? (
                  <FormFeedback type="invalid">
                    {validation.errors.upload}
                  </FormFeedback>
                ) : null}
                <button
                  type="button"
                  className="btn btn-primary "
                  style={{ marginTop: "10px", width: "50%" }}
                >
                  Upload File
                </button>
              </div>
            </Col>
            <Col lg={4}>
              <div className="mb-3">
                <Label className="form-label">Start Date</Label>
                <Input
                  name="agreestart"
                  label="Start Date"
                  type="date"
                  placeholder="Start Date"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.agreestart || ""}
                  invalid={
                    validation.touched.agreestart &&
                    validation.errors.agreestart
                      ? true
                      : false
                  }
                />
                {validation.touched.agreestart &&
                validation.errors.agreestart ? (
                  <FormFeedback type="invalid">
                    {validation.errors.agreestart}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
            <Col lg={4}>
              <div className="mb-3">
                <Label className="form-label">End Date</Label>
                <Input
                  name="agreeend"
                  label="End Date"
                  type="date"
                  placeholder="End Date"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.agreeend || ""}
                  invalid={
                    validation.touched.agreeend && validation.errors.agreeend
                      ? true
                      : false
                  }
                />
                {validation.touched.agreeend && validation.errors.agreeend ? (
                  <FormFeedback type="invalid">
                    {validation.errors.agreeend}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
          </Row>

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
                    toggleCloseModal();
                  }}
                >
                  Cancel
                </button>
              </ModalFooter>
            </Col>
          </Row>
        </Form>
      </ModalBody>
    </>
  );
};

EditLcoModal.propTypes = {
  toggleCloseModal: PropTypes.func,
  isOpen: PropTypes.bool,
  lcoData: PropTypes.func,

  lcoBilledby: PropTypes.array,
  lcoStatus: PropTypes.array,
  lcoPhase: PropTypes.array,
  lcoStates: PropTypes.array,
  lcoCustomerPortal: PropTypes.array,
  lcoParentDistributor: PropTypes.array,
};

export default EditLcoModal;
