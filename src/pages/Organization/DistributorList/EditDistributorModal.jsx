import React, { useEffect, useState, useRef, useMemo } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import {
  Col,
  Row,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
  FormFeedback,
  Input,
  Form,
} from "reactstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { getRegionalOffice as onGetRegionalOffices } from "/src/store/regionaloffice/actions";
import {
  updateDistributors as onUpdateDistributor,
  getDistributors as onGetDistributors,
} from "/src/store/distributor/actions";
import { getStateUsers as onGetStateUsers } from "../../../store/stateusers/actions";
import { createSelector } from "reselect";

const EditDistributorModal = (props) => {
  const {
    toggleCloseModal,
    distributor,
    distributorsPhase,
    distributorsStatus,
  } = props;
  // console.log("distributor in edit modal:" + JSON.stringify(distributor));
  const API_URL = "https://sms.unitch.in/api/index.php/v1";
  const dispatch = useDispatch();

  const handleCancel = () => {
    toggleCloseModal();
  };

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

  useEffect(() => {
    dispatch(onGetStateUsers());
    dispatch(onGetRegionalOffices());
  }, [dispatch]);

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
      // id: (distributor && distributor.id) || "",
      name: (distributor && distributor.name) || "",
      code: (distributor && distributor.code) || "",
      branch_lbl: (distributor && distributor.branch_id) || "",
      addr1: (distributor && distributor.addr1) || "",
      addr2: (distributor && distributor.addr2) || "",
      addr3: (distributor && distributor.addr3) || "",
      contact_person: (distributor && distributor.contact_person) || "",
      mobile_no: (distributor && distributor.mobile_no) || "",
      phone_no: (distributor && distributor.phone_no) || "",
      fax_no: (distributor && distributor.fax_no) || "",
      state_lbl: (distributor && distributor.state_id) || "",
      district_lbl: (distributor && distributor.district_id) || "",
      city_lbl: (distributor && distributor.city_id) || "",
      gstno: (distributor && distributor.gstno) || "",
      panno: (distributor && distributor.panno) || "",
      username: (distributor && distributor.username) || "",
      status_lbl: (distributor && distributor.status) || "",
      email: (distributor && distributor.email) || "",
      pincode: (distributor && distributor.pincode) || "",
      por_number: (distributor && distributor.por_number) || "",
      reg_phase: (distributor && distributor.reg_phase) || "",
      reg_startdate: (distributor && distributor.reg_startdate) || "",
      reg_enddate: (distributor && distributor.reg_enddate) || "",
      gst_date: (distributor && distributor.gst_date) || "",
      credit_limit: (distributor && distributor.credit_limit) || "",
      area_id: (distributor && distributor.area_id) || "",
      // agreestart:
      //   (distributor &&
      //     distributor.agreement_data &&
      //     distributor.agreement_data.start_date) ||
      //   "",
      // agreeend:
      //   (distributor &&
      //     distributor.agreement_data &&
      //     distributor.agreement_data.end_date) ||
      //   "",
    },
    validationSchema: Yup.object({
      // name: Yup.string().required("Please Enter Your Name"),
      // email: Yup.string()
      // .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Please Enter Valid Email")
      // .required("Please Enter Your Email"),
      // mobile: Yup.array().required("Please Enter mobile"),
      // mobile: Yup.string().required("Please Enter mobile Number"),
      // usertype: Yup.string().required("Please Enter User Type"),
      // status: Yup.string().required("Please Enter Status"),
      // message: Yup.string().required("Please Enter Message"),
      // role: Yup.string().required("Please Enter Role"),
      // designation: Yup.string().required("Please Enter Designation"),
      // grouppolicy: Yup.string().required("Please Enter Group Policy"),
      // loginid: Yup.string().required("Please Enter Login ID"),
      // password: Yup.string().required("Please Enter Password"),
      // confirmpassword: Yup.string().required("Please Enter Confirm Password"),
    }),
    onSubmit: async (values) => {
      try {
        console.log("name in initially:" + values.name);
        const updateDistributor = {
          id: distributor.id,
          name: values["name"],
          code: values["code"],
          // agreement_data: {
          //   name: values["upload"] ? values["upload"].name : "",
          //   type: values["upload"] ? values["upload"].type : "",
          //   ext: values["upload"] ? values["upload"].ext : "",
          //   data: values["upload"] ? values["upload"].data : "",
          //   start_date: values["agreestart"],
          //   end_date: values["agreeend"],
          // },

          parent_id: parseInt(values["branch_lbl"]),
          addr: values["addr1"],
          // addr1: values["addr1"],
          addr2: values["addr2"],
          addr3: values["addr3"],
          contact_person: values["contact_person"],
          status: parseInt(values["status_lbl"]),
          mobile_no: values["mobile_no"],
          phone_no: values["phone_no"],
          email: values["email"],
          state_id: parseInt(values["state_lbl"]),
          district_id: parseInt(values["district_lbl"]),
          city_id: parseInt(values["city_lbl"]),
          gstno: values["gstno"],
          panno: values["panno"],
          // pincode: values["pincode"],
          por_number: values["por_number"],
          // reg_phase: values["reg_phase"],
          // reg_startdate: values["reg_startdate"],
          // reg_enddate: values["reg_enddate"],
          // gst_date: values["gst_date"],
          credit_limit: parseInt(values["credit_limit"]),
          area_id: parseInt(values["area_id"]),
          type: 2,
        };

        console.log("Axios Response:", updateDistributor);
        dispatch(onUpdateDistributor(updateDistributor));
        dispatch(onGetDistributors());
        validation.resetForm();
        handleCancel();
      } catch (error) {
        console.error("Error in onSubmit:", error);
      }
    },
    // onReset: () => {
    //   validation.setValues(validation.initialValues);
    // },
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
    if (distributor && distributor.state_id) {
      setSelectedState(distributor.state_id);
      setSelectedDistrict(distributor.district_id);
    }
    getDistrictValue();
    getCityValue();
  }, [distributor]);

  return (
    <>
      <ModalHeader tag="h4" toggle={handleCancel}>
        <h4>Edit - {distributor.name}</h4>
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
            </Col>
          </Row>
          <Row>
            <Col lg={4}>
              <div className="mb-3">
                <Label className="form-label">
                  Name<span style={{ color: "red" }}>*</span>
                </Label>
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
            {console.log("name validationvalue:" + validation.values.name)}
            <Col lg={4}>
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
            {console.log(
              "contact person validationvalue:" +
                validation.values.contact_person
            )}
            <Col lg={4}>
              <div className="mb-3">
                <Label className="form-label">
                  Parent Regional Office<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="branch_lbl"
                  type="select"
                  placeholder="Select Parent Regional Office"
                  className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.branch_lbl || ""}
                  disabled
                >
                  {/* <option value="">{validation.values.branch_lbl}</option> */}
                  {/* {console.log("regoff:" + JSON.stringify(regOff))} */}
                  {regOff.map((item) => (
                    <option key={item.id} value={item.code}>
                      {item.name}
                    </option>
                  ))}
                </Input>
                {validation.touched.branch_lbl &&
                validation.errors.branch_lbl ? (
                  <FormFeedback type="invalid">
                    {validation.errors.branch_lbl}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
            {console.log(
              "branch validationvalue:" + validation.values.branch_lbl
            )}
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
            {console.log(
              "mobileno validationvalue:" + validation.values.mobile_no
            )}
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
            {console.log(
              "phoneno validationvalue:" + validation.values.phone_no
            )}
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
            {console.log("email validationvalue:" + validation.values.email)}
          </Row>
          <Row>
            <Col lg={4}>
              <div className="mb-3">
                <Label className="form-label">
                  Status<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="status_lbl"
                  type="select"
                  placeholder="Select Status"
                  className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.status_lbl || ""}
                >
                  {/* <option value="">Select Status</option> */}
                  {distributorsStatus &&
                    distributorsStatus.map((status) => (
                      <option key={status.id} value={status.id}>
                        {status.name}
                      </option>
                    ))}
                </Input>
                {validation.touched.status_lbl &&
                validation.errors.status_lbl ? (
                  <FormFeedback type="invalid">
                    {validation.errors.status_lbl}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
            {console.log(
              "status validationvalue:" + validation.values.status_lbl
            )}
          </Row>
          <Row>
            <Col lg={4}>
              <div className="mb-3">
                <Label className="form-label">
                  State<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="state_lbl"
                  type="select"
                  placeholder="Select State"
                  className="form-select"
                  onChange={handleStateChange}
                  onBlur={validation.handleBlur}
                  value={selectedState}
                  // value={validation.values.state_lbl || ""}
                >
                  {/* <option value="">Select State</option> */}
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
                <Label className="form-label">
                  District<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="district_lbl"
                  type="select"
                  placeholder="Select District"
                  className="form-select"
                  onChange={handleDistrictChange}
                  onBlur={validation.handleBlur}
                  value={selectedDistrict}
                >
                  {/* <option value="">Select District</option> */}
                  {districtsList.map((district) => (
                    <option key={district.id} value={district.id}>
                      {district.name}
                    </option>
                  ))}
                </Input>
                {validation.touched.district_lbl &&
                validation.errors.district_lbl ? (
                  <FormFeedback type="invalid">
                    {validation.errors.district_lbl}
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
                  name="city_lbl"
                  type="select"
                  placeholder="Select City"
                  className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.city_lbl || ""}
                >
                  {/* <option value="">Select City</option> */}
                  {cityList.map((city) => (
                    <option key={city.id} value={city.id}>
                      {city.name}
                    </option>
                  ))}
                </Input>
                {validation.touched.city_lbl && validation.errors.city_lbl ? (
                  <FormFeedback type="invalid">
                    {validation.errors.city_lbl}
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
                  {/* <option value="">Select Phase</option> */}
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
                  name="reg_enddate"
                  type="date"
                  placeholder="Select End Date"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.reg_enddate || ""}
                  invalid={
                    validation.touched.reg_enddate &&
                    validation.errors.reg_enddate
                      ? true
                      : false
                  }
                />
                {validation.touched.reg_enddate &&
                validation.errors.reg_enddate ? (
                  <FormFeedback type="invalid">
                    {validation.errors.reg_enddate}
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
              {console.log(
                "creditlimit validationvalue:" + validation.values.credit_limit
              )}
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
              {console.log(
                "areaID validationvalue:" + validation.values.area_id
              )}
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
                {/* <Label className="form-label">Upload</Label> */}
                <input
                  style={{
                    width: "170px",
                    height: "150px",
                    borderRadius: "10px",
                  }}
                  name="upload"
                  type="file"
                  onChange={handleChangeUploadFile}
                ></input>
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
        </Form>
      </ModalBody>
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
    </>
  );
};

EditDistributorModal.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default EditDistributorModal;
