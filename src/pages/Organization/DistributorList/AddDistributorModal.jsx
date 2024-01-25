import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { createSelector } from "reselect";
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
import { getRegionalOffice as onGetRegionalOffice } from "/src/store/regionaloffice/actions";
import { addNewDistributor as onAddNewDistributor } from "/src/store/distributor/actions";
import { getStateUsers as onGetStateUsers } from "../../../store/stateusers/actions";
import { useSelector, useDispatch } from "react-redux";

const AddDistributorModal = (props) => {
  const API_URL = "https://sms.unitch.in/api/index.php/v1";
  const { isOpen, toggleAddDistributor, distributorsPhase } = props;
  console.log("distributorsPhase" + JSON.stringify(distributorsPhase));
  const dispatch = useDispatch();
  const [toggleSwitch, settoggleSwitch] = useState(true);
  const [districtsList, setDistrictsList] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [cityList, setCityList] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");

  const selectRegionalOfficeState = (state) => state.regionaloffice;
  const selectStatesState = (state) => state.stateUsers;

  const RegionalOfficeProperties = createSelector(
    selectRegionalOfficeState,
    (regionaloffice) => ({
      regOff: regionaloffice.regionaloffice,
    })
  );
  const StatesProperties = createSelector(selectStatesState, (states) => ({
    statesList: states.stateUsers,
  }));
  const { regOff } = useSelector(RegionalOfficeProperties);
  const { statesList } = useSelector(StatesProperties);
  console.log("statesList:" + JSON.stringify(statesList));

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
  useEffect(() => {
    if (regOff && !regOff.length) {
      dispatch(onGetRegionalOffice());
      dispatch(onGetStateUsers());
    }
  }, [dispatch, regOff]);
  // console.log("regOfficelist:" + JSON.stringify(regOff));
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      name: "",
      code: "",
      addr1: "",
      addr2: "",
      addr3: "",
      contact_person: "",
      // parent_regoff: "",
      mobile_no: "",
      phone_no: "",
      email: "",
      state_lbl: "",
      district_lbl: "",
      city_lbl: "",
      gstno: "",
      panno: "",
      status_lbl: "",
      pincode: "",
      por_number: "",
      reg_phase: "",
      reg_startdate: "",
      reg_enddate: "",
      gst_date: "",
      credit_limit: "",
      area_id: "",
      // agreement_data: [],
      username: "",
      password: "",
      confirmpassword: "",
      // created_at: "",
      // created_by: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please Enter Your Name"),
      // code: Yup.string().required("Please Enter Code"),
      addr1: Yup.string().required("Please Address"),
      contact_person: Yup.string().required("Please Enter Contact Person"),
      mobile_no: Yup.string().required("Please Enter Mobile"),
      // state_lbl: Yup.string().required("Please Enter State"),
      // district_lbl: Yup.string().required("Please Enter District"),
      // city_lbl: Yup.string().required("Please Enter City"),
      // gstno: Yup.string().required("Please Enter GST"),
      // panno: Yup.string().required("Please Enter PAN"),
      // username: Yup.string().required("Please Enter LoginID"),
      // status: Yup.string().required("Please Enter Status"),
    }),
    onSubmit: (values) => {
      const newDistributor = {
        id: Math.floor(Math.random() * (30 - 20)) + 20,
        name: values["name"],
        code: values["code"],
        addr1: values["addr1"],
        addr2: values["addr2"],
        addr3: values["addr3"],
        contact_person: values["contact_person"],
        mobile_no: values["mobile_no"],
        phone_no: values["phone_no"],
        email: values["email"],
        state_lbl: values["state_lbl"],
        district_lbl: values["district_lbl"],
        city_lbl: values["city_lbl"],
        gstno: values["gstno"],
        panno: values["panno"],

        // status_lbl: values["status_lbl"],

        pincode: values["pincode"],
        por_number: values["por_number"],
        reg_phase: values["reg_phase"],
        reg_startdate: values["reg_startdate"],
        reg_enddate: values["reg_enddate"],
        gst_date: values["gst_date"],
        credit_limit: values["credit_limit"],
        area_id: values["area_id"],
        // agreement_data: values["agreement_data"],
        username: values["username"],
        password: values["password"],
        confirmpassword: values["confirmpassword"],
      };
      console.log("Distributor values:" + newDistributor);
      // save new user
      dispatch(onAddNewDistributor(newDistributor));
      validation.resetForm();
      toggleAddDistributor();
    },
  });
  return (
    <Modal
      isOpen={isOpen}
      size="xl"
      role="dialog"
      autoFocus={true}
      centered={true}
      className="exampleModal"
      tabIndex="-1"
      toggle={toggleAddDistributor}
    >
      <ModalHeader tag="h4" toggle={toggleAddDistributor}>
        Add New Distributor
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
                  disabled
                />
                {validation.touched.code && validation.errors.code ? (
                  <FormFeedback type="invalid">
                    {validation.errors.code}
                  </FormFeedback>
                ) : null}
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
                {validation.touched.ifFixNCF && validation.errors.ifFixNCF ? (
                  <FormFeedback type="invalid">
                    {validation.errors.ifFixNCF}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
          </Row>
          <Row>
            <Col lg={4}>
              <div className="mb-3">
                <Label className="form-label">Name</Label>
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
            </Col>
            <Col lg={4}>
              <div className="mb-3">
                <Label className="form-label">Contact Person</Label>
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
                <Label className="form-label">Parent Regional Office</Label>
                <Input
                  name="parentRO"
                  type="select"
                  placeholder="Select Parent Regional Office"
                  className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.parentRO || ""}
                >
                  <option value="">Select Parent Regional Office</option>
                  {/* {regOff.map((item) => (
                    <optgroup
                      key={item.id}
                      value={item.id}
                      label={`${item.name}`}
                    >
                      <option value={item.parentRO}>{item.code}</option>
                    </optgroup>
                  ))}
                  {regOff.map((item) => (
                    <option key={item.id} value={item.code}>
                      {item.name}
                    </option>
                  ))} */}
                  {regOff.map((item) => (
                    <option key={item.id} value={item.parentRO}>
                      {item.name}
                    </option>
                  ))}
                </Input>
                {validation.touched.parentRO && validation.errors.parentRO ? (
                  <FormFeedback type="invalid">
                    {validation.errors.parentRO}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
          </Row>
          <Row>
            <Col lg={4}>
              <div className="mb-3">
                <Label className="form-label">Mobile No.</Label>
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
                  invalid={
                    validation.touched.phone_no && validation.errors.phone_no
                      ? true
                      : false
                  }
                />
                {validation.touched.phone_no && validation.errors.phone_no ? (
                  <FormFeedback type="invalid">
                    {validation.errors.phone_no}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
            <Col lg={4}>
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
            </Col>
          </Row>
          <Row>
            <Col lg={4}>
              <div className="mb-3">
                <Label className="form-label">State</Label>
                <Input
                  name="state"
                  type="select"
                  placeholder="Select State"
                  className="form-select"
                  // onChange={validation.handleChange}
                  // onBlur={validation.handleBlur}
                  // value={validation.values.state || ""}
                  onChange={handleStateChange}
                  onBlur={validation.handleBlur}
                  value={selectedState}
                >
                  <option value="">Select State</option>
                  {statesList.map((state) => (
                    <option key={state.id} value={state.id}>
                      {state.name}
                    </option>
                  ))}
                </Input>
                {validation.touched.state_lbl && validation.errors.state_lbl ? (
                  <FormFeedback type="invalid">
                    {validation.errors.state_lbl}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
            <Col lg={4}>
              <div className="mb-3">
                <Label className="form-label">District</Label>
                <Input
                  name="district"
                  type="select"
                  placeholder="Select District"
                  className="form-select"
                  onChange={handleDistrictChange}
                  onBlur={validation.handleBlur}
                  value={selectedDistrict}
                >
                  <option value="">Select District</option>
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
                <Label className="form-label">Address1</Label>
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
                  invalid={
                    validation.touched.addr2 && validation.errors.addr2
                      ? true
                      : false
                  }
                />
                {validation.touched.addr2 && validation.errors.addr2 ? (
                  <FormFeedback type="invalid">
                    {validation.errors.addr2}
                  </FormFeedback>
                ) : null}
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
                  invalid={
                    validation.touched.addr3 && validation.errors.addr3
                      ? true
                      : false
                  }
                />
                {validation.touched.addr3 && validation.errors.addr3 ? (
                  <FormFeedback type="invalid">
                    {validation.errors.addr3}
                  </FormFeedback>
                ) : null}
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
                  invalid={
                    validation.touched.por_number &&
                    validation.errors.por_number
                      ? true
                      : false
                  }
                />
                {validation.touched.por_number &&
                validation.errors.por_number ? (
                  <FormFeedback type="invalid">
                    {validation.errors.por_number}
                  </FormFeedback>
                ) : null}
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
                  {distributorsPhase &&
                    distributorsPhase.map((phase) => (
                      <option key={phase.id} value={phase.id}>
                        {phase.name}
                      </option>
                    ))}
                </Input>
                {validation.touched.reg_phase && validation.errors.reg_phase ? (
                  <FormFeedback type="invalid">
                    {validation.errors.reg_phase}
                  </FormFeedback>
                ) : null}
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
                  invalid={
                    validation.touched.reg_startdate &&
                    validation.errors.reg_startdate
                      ? true
                      : false
                  }
                />
                {validation.touched.reg_startdate &&
                validation.errors.reg_startdate ? (
                  <FormFeedback type="invalid">
                    {validation.errors.reg_startdate}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>

            <Col lg={4}>
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
            </Col>
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
          </Row>
          <Row>
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
                  invalid={
                    validation.touched.gst_date && validation.errors.gst_date
                      ? true
                      : false
                  }
                />
                {validation.touched.gst_date && validation.errors.gst_date ? (
                  <FormFeedback type="invalid">
                    {validation.errors.gst_date}
                  </FormFeedback>
                ) : null}
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
            <Col lg={4}>
              <div className="mb-3">
                <Label className="form-label">Credit Limit</Label>
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
                <Label className="form-label">Area ID</Label>
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
              <div className="mb-3">
                <Label className="form-label">Upload</Label>
                <Input
                  name="upload"
                  label="Upload"
                  type="file"
                  placeholder="Upload"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.upload || ""}
                  invalid={
                    validation.touched.upload && validation.errors.upload
                      ? true
                      : false
                  }
                />
                {validation.touched.upload && validation.errors.upload ? (
                  <FormFeedback type="invalid">
                    {validation.errors.upload}
                  </FormFeedback>
                ) : null}
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
            <Col lg={4}>
              <div className="mb-3">
                <Label className="form-label">Login ID</Label>
                <Input
                  name="username"
                  label="Login ID"
                  type="text"
                  placeholder="Login ID"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.username || ""}
                  invalid={
                    validation.touched.username && validation.errors.username
                      ? true
                      : false
                  }
                />
                {validation.touched.username && validation.errors.username ? (
                  <FormFeedback type="invalid">
                    {validation.errors.username}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
            <Col lg={4}>
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
            </Col>
            <Col lg={4}>
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
                    toggleAddDistributor();
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

AddDistributorModal.propTypes = {
  toggleAddDistributor: PropTypes.bool,
  isOpen: PropTypes.bool,
  distributorsPhase: PropTypes.array,
};

export default AddDistributorModal;
