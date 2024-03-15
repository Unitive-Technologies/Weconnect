import React, { useState, useEffect } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import {
  updateUser as onUpdateUser,
  getUsers as onGetUsers,
} from "/src/store/users/actions";
import { createSelector } from "reselect";
import {
  getUserRegionalOffice as onGetUserRegionalOffice,
  getUserMsoDetails as onGetUserMsoDetails,
  getUserDistributor as onGetUserDistributor,
  getUserLco as onGetUserLco,
} from "/src/store/users/actions";
import axios from "axios";
import ShowHistoryModal from "./ShowHistoryModal";

const ViewUserModal = (props) => {
  const {
    isOpen,
    user,
    userType,
    userStatus,
    userRole,
    userDesignation,
    resetSelection,
    toggleModal,
  } = props;
  // console.log("Userdata in viewuser modal:" + JSON.stringify(user));
  const dispatch = useDispatch();
  const [showEditUser, setShowEditUser] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedMso, setSelectedMso] = useState("");
  const [selectedRegional, setSelectedRegional] = useState("");
  const [selectedDistributor, setSelectedDistributor] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [policyList, setPolicyList] = useState([]);
  const [distributorList, setDistributorList] = useState([]);
  const [lcoList, setLcoList] = useState([]);
  const [showGroupPolicy, setShowGroupPolicy] = useState(false);
  const API_URL = "https://sms.unitch.in/api/index.php/v1";

  const [showHistory, setShowHistory] = useState(false);

  const toggleHistoryModal = () => {
    setShowHistory(!showHistory);
  };

  const selectContactsState = (state) => state.users;
  const ContactsProperties = createSelector(selectContactsState, (Users) => ({
    loading: Users.loading,
    userRegional: Users.userRegional,
    userMsoDetails: Users.userMsoDetails,
    userDistributor: Users.userDistributor,
    userLco: Users.userLco,
  }));

  const { userRegional, userMsoDetails, userDistributor, userLco, loading } =
    useSelector(ContactsProperties);

  const handleStatusChange = (e) => {
    const status = e.target.value;
    setSelectedStatus(status);
    validation.handleChange(e);
  };

  const handleTypeChange = (e) => {
    // setShowGroupPolicy(false);
    const type = e.target.value;
    setSelectedType(type);
    validation.handleChange(e);
    dispatch(onGetUserMsoDetails());
    console.log("type changed:" + type);
  };

  const handleMsoChange = (e) => {
    const mso = e.target.value;
    setSelectedMso(mso);
    validation.handleChange(e);
    dispatch(onGetUserRegionalOffice());
  };

  const handleRegionalChange = async (e) => {
    try {
      const regional = e.target.value;
      setSelectedRegional(regional);

      validation.handleChange(e);
      {
        console.log("selectedType:" + selectedType);
      }
      {
        console.log("selectedRole:" + regional);
      }
      // Assuming you have a token stored in localStorage
      const token = "Bearer " + localStorage.getItem("temptoken");

      const response = await axios.get(
        `${API_URL}/operator/list?fields=id,name,type,mso_id,branch_id,distributor_id&per-page=100&filter[mso_id]=1&filter[branch_id]=${parseInt(
          regional
        )}&filter[type]=${parseInt(selectedType)}&vr=web1.0`,
        {
          headers: {
            Authorization: token, // Include your token here
          },
        }
      );

      console.log(
        "distributorList after selection : " +
        JSON.stringify(response.data.data)
      );
      setDistributorList(response.data.data);
    } catch (error) {
      console.error("Error fetching policy data:", error);
      // Handle error if necessary
    }
    // };
  };

  const handleDistributorChange = async (e) => {
    try {
      const distributor = e.target.value;
      setSelectedDistributor(distributor);

      validation.handleChange(e);
      // {
      //   console.log("selectedType:" + typeof selectedType);
      // }
      // {
      //   console.log("selectedDistributor:" + typeof distributor);
      // }
      // Assuming you have a token stored in localStorage
      const token = "Bearer " + localStorage.getItem("temptoken");

      const response = await axios.get(
        `${API_URL}/operator/list?fields=id,name,type,mso_id,branch_id,distributor_id&per-page=100&filter[mso_id]=1&filter[branch_id]=${parseInt(
          selectedRegional
        )}&filter[distributor_id]=${parseInt(
          distributor
        )}&filter[type]=${parseInt(selectedType)}&vr=web1.0`,
        {
          headers: {
            Authorization: token, // Include your token here
          },
        }
      );

      console.log(
        "distributorList after selection : " +
        JSON.stringify(response.data.data)
      );
      setLcoList(response.data.data);
    } catch (error) {
      console.error("Error fetching policy data:", error);
      // Handle error if necessary
    }
    // };
  };

  const handleRoleChange = async (e) => {
    // setShowGroupPolicy(false);
    try {
      const role = e.target.value;
      setSelectedRole(role);

      validation.handleChange(e);
      {
        console.log("selectedType:" + typeof selectedType);
      }
      {
        console.log("selectedRole:" + typeof role);
      }
      // Assuming you have a token stored in localStorage
      const token = "Bearer " + localStorage.getItem("temptoken");

      const response = await axios.get(
        `${API_URL}/menu-access-right/list?expand=user_type_lbl&fields=_id,user_id,user_type,role&filter[type][]=1&filter[type][]=2&filter[user_type]=${parseInt(
          selectedType
        )}&filter[role_id]=${parseInt(role)}&vr=web1.0`,
        {
          headers: {
            Authorization: token, // Include your token here
          },
        }
      );

      console.log(
        "policy after selection : " + JSON.stringify(response.data.data)
      );
      setPolicyList(response.data.data);
    } catch (error) {
      console.error("Error fetching policy data:", error);
      // Handle error if necessary
    }
  };
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      // id: (user && user.id) || "",
      id: (user && Number(user.id)) || -1,
      name: (user && user.name) || "",
      email: (user && user.email) || "",
      mobile: (user && user.mobile_no) || "",
      type: (user && user.type) || "",
      // mso: user.type === 0 && user.operator_id,
      // regional: user.type === 1 && user.operator_id,
      // distributor: user.type === 2 && user.operator_id,
      // lco: user.type === 3 && user.operator_id,
      status: (user && user.status) || "",
      block_message: (user && user.block_message) || "",
      role: (user && user.role) || "",
      designation: (user && user.designation_id) || "",
      policy: (user && user.access_policy_id) || "",
      username: (user && user.username) || "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required("Enter name")
        .min(2, "Minimum length 2 character"),
      email: Yup.string()
        .email("Your email address must be of the format name@domain.com")
        .required("Enter Email"),
      mobile: Yup.string()
        .required("Enter mobile number")
        .matches(/^[0-9]/, "Enter valid number")
        .min(8, "Min 10 digit number")
        .max(12, "Max 12 digit number"),
      type: Yup.string().required("Please Enter User Type"),
      status: Yup.string().required("Please Enter Status"),
      role: Yup.string().required("Please Enter Role"),
      designation: Yup.string().required("Please Enter Designation"),
      confirmpassword: Yup.string().required("Please Enter Confirm Password"),
      password: Yup.string().required("Please Enter Password"),
    }),
    onSubmit: (values) => {
      const updateUser = {
        id: user.id,
        access_policy_id: parseInt(values["policy"]),
        block_message: values["block_message"],
        designation_id: parseInt(values["designation"]),
        name: values["name"],
        email: values["email"],
        mobile_no: values["mobile"],
        operator_type: parseInt(values["type"]),
        operator_id:
          parseInt(values["type"]) === 0
            ? parseInt(values["mso"])
            : parseInt(values["type"]) === 1
              ? parseInt(values["regional"])
              : parseInt(values["type"]) === 2
                ? parseInt(values["distributor"])
                : parseInt(values["lco"]),
        status: parseInt(values["status"]),
        role: parseInt(values["role"]),
        username: values["username"],
        password: values["password"],
        // created_at: new Date(),
        // created_by_lbl: values["created_by_lbl"],
      };

      // update user
      dispatch(onUpdateUser(updateUser));
      dispatch(onGetUsers());
      validation.resetForm();
      setShowEditUser(false);
      resetSelection();
      toggleModal();
    },
  });

  const handleCancel = () => {
    setShowEditUser(false);
    resetSelection();
    toggleModal();
  };
  useEffect(() => {
    if (user) {
      dispatch(onGetUsers());
    }
    setShowEditUser(false);
  }, [dispatch, user]);
  return (
    <>
      {showHistory && (
        <ShowHistoryModal
          isOpen={showHistory}
          toggleHistoryModal={toggleHistoryModal}
          user={user}
        />
      )}
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
          {!showEditUser
            ? `View ${(user && user.name) || ""}`
            : `Edit ${(user && user.name) || ""}`}
        </ModalHeader>
        {!showEditUser && (
          <>
            <Link
              style={{
                position: "absolute",
                marginLeft: "92%",
                marginTop: "1%",
              }}
              to="#!"
              className="btn btn-light me-1"
              onClick={() => setShowHistory(true)}
            >
              <i className="dripicons-briefcase" />
            </Link>
            <Link
              style={{
                position: "absolute",
                marginLeft: "87%",
                marginTop: "1%",
              }}
              to="#!"
              className="btn btn-light me-1"
              onClick={() => setShowEditUser(true)}
            >
              <i className="mdi mdi-pencil-outline"></i>
            </Link>
          </>
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
              <Col lg={4}>
                <div className="mb-3">
                  <Label className="form-label">Name<span style={{ color: "red" }}>*</span></Label>
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
              <Col lg={4}>
                <div className="mb-3">
                  <Label className="form-label">Email<span style={{ color: "red" }}>*</span></Label>
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
              <Col lg={4}>
                <div className="mb-3">
                  <Label className="form-label">Mobile No.<span style={{ color: "red" }}>*</span></Label>
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
            </Row>
            <Row>
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
                <h5 style={{}}>User Details</h5>
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
                    <Label className="form-label">
                      User Type<span style={{ color: "red" }}>*</span>
                    </Label>
                    <Input
                      name="type"
                      type="select"
                      placeholder="Select Type"
                      className="form-select"
                      onChange={handleTypeChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.type || ""}
                      disabled={!showEditUser}
                    >
                      {/* <option value="">Select User Type</option> */}

                      {userType.map((type) => (
                        <option key={type.id} value={type.id}>
                          {type.name}
                        </option>
                      ))}
                    </Input>
                    {validation.touched.type && validation.errors.type ? (
                      <FormFeedback type="invalid">
                        {validation.errors.type}
                      </FormFeedback>
                    ) : null}
                  </div>
                </Col>
                {/* {!showEditUser && !selectedType && ( */}
                {/* {console.log("selected type: " + selectedType)} */}
                {!selectedType && (
                  <Col lg={4}>
                    <div className="mb-3">
                      <Label className="form-label">
                        User of {user && user.type_lbl}<span style={{ color: "red" }}>*</span>
                      </Label>
                      <Input
                        name="mso"
                        type="select"
                        placeholder="Select MSO"
                        className="form-select"
                        value={user && user.operator_lbl}
                        disabled={!showEditUser}
                      >
                        <option value="">{user && user.operator_lbl}</option>
                      </Input>
                    </div>
                  </Col>
                )}
                {/* )} */}
                {showEditUser && (
                  <>
                    <Col lg={4}>
                      {selectedType && (
                        <div className="mb-3">
                          <Label className="form-label">
                            Select MSO<span style={{ color: "red" }}>*</span>
                          </Label>
                          <Input
                            name="mso"
                            type="select"
                            placeholder="Select MSO"
                            className="form-select"
                            onChange={handleMsoChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.mso || ""}
                          >
                            <option value="">Select MSO</option>
                            {userMsoDetails.map((mso) => (
                              <option key={mso.id} value={mso.id}>
                                {mso.name}
                              </option>
                            ))}
                          </Input>
                          {validation.touched.mso && validation.errors.mso ? (
                            <FormFeedback type="invalid">
                              {validation.errors.mso}
                            </FormFeedback>
                          ) : null}
                        </div>
                      )}
                    </Col>
                    {/* {console.log("selectedType: " + typeof selectedType)}
              {console.log("msoValue: " + typeof validation.values.mso)} */}
                    <Col lg={4}>
                      {(parseInt(selectedType) === 1 ||
                        parseInt(selectedType) === 2 ||
                        parseInt(selectedType) === 3) &&
                        parseInt(validation.values.mso) == 1 ? (
                        <div className="mb-3">
                          <Label className="form-label">
                            Select Regional Office
                            <span style={{ color: "red" }}>*</span>
                          </Label>
                          <Input
                            name="regional"
                            type="select"
                            placeholder="Select Regional Office"
                            className="form-select"
                            onChange={handleRegionalChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.regional || ""}
                          >
                            <option value="">Select Regional Office</option>
                            {userRegional &&
                              userRegional.map((regional) => (
                                <option key={regional.id} value={regional.id}>
                                  {regional.name}
                                </option>
                              ))}
                          </Input>
                          {validation.touched.regional &&
                            validation.errors.regional ? (
                            <FormFeedback type="invalid">
                              {validation.errors.regional}
                            </FormFeedback>
                          ) : null}
                        </div>
                      ) : (
                        <></>
                      )}
                    </Col>
                    {/* {console.log(
                "regional value:" + typeof parseInt(validation.values.regional)
              )} */}
                    <Col lg={4}>
                      {validation.values.regional &&
                        // (parseInt(selectedType) === 1 ||
                        (parseInt(selectedType) === 2 ||
                          parseInt(selectedType) === 3) &&
                        parseInt(validation.values.mso) == 1 ? (
                        <div className="mb-3">
                          <Label className="form-label">
                            Select Distributor
                            <span style={{ color: "red" }}>*</span>
                          </Label>
                          <Input
                            name="distributor"
                            type="select"
                            placeholder="Select Distributor"
                            className="form-select"
                            onChange={handleDistributorChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.distributor || ""}
                          >
                            <option value="">Select Distributor</option>
                            {distributorList &&
                              distributorList.map((distributor) => (
                                <option
                                  key={distributor.id}
                                  value={distributor.id}
                                >
                                  {distributor.name}
                                </option>
                              ))}
                          </Input>
                          {validation.touched.distributor &&
                            validation.errors.distributor ? (
                            <FormFeedback type="invalid">
                              {validation.errors.distributor}
                            </FormFeedback>
                          ) : null}
                        </div>
                      ) : (
                        <></>
                      )}
                    </Col>
                    <Col lg={4}>
                      {validation.values.distributor &&
                        validation.values.regional &&
                        parseInt(selectedType) === 3 && (
                          <div className="mb-3">
                            <Label className="form-label">
                              Select LCO
                              <span style={{ color: "red" }}>*</span>
                            </Label>
                            <Input
                              name="lco"
                              type="select"
                              placeholder="Select LCO"
                              className="form-select"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.lco || ""}
                            >
                              <option value="">Select LCO</option>
                              {lcoList &&
                                lcoList.map((lco) => (
                                  <option key={lco.id} value={lco.id}>
                                    {lco.name}
                                  </option>
                                ))}
                            </Input>
                            {validation.touched.lco && validation.errors.lco ? (
                              <FormFeedback type="invalid">
                                {validation.errors.lco}
                              </FormFeedback>
                            ) : null}
                          </div>
                          // ) : (
                          //   <></>
                        )}
                    </Col>
                  </>
                )}
              </Row>
            </Row>

            <Row>
              <Col lg={4}>
                <div className="mb-3">
                  <Label className="form-label">
                    Role<span style={{ color: "red" }}>*</span>
                  </Label>
                  <Input
                    name="role"
                    type="select"
                    placeholder="Select Role"
                    className="form-select"
                    // onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    // value={validation.values.role || ""}
                    onChange={handleRoleChange}
                    value={selectedRole}
                    disabled={!showEditUser}
                  >
                    {/* <option value="">Select Role</option> */}
                    {userRole.map((role) => (
                      <option key={role.id} value={role.id}>
                        {role.name}
                      </option>
                    ))}
                  </Input>
                  {validation.touched.role && validation.errors.role ? (
                    <FormFeedback type="invalid">
                      {validation.errors.role}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
              {!selectedType && !selectedRole ? (
                <Col lg={4}>
                  <div className="mb-3">
                    <Label className="form-label">Group Policy</Label>
                    <Input
                      name="group_lbl"
                      type="select"
                      // placeholder="Select MSO"
                      className="form-select"
                      value={user && user.group_lbl}
                      disabled
                    >
                      <option value="">{user && user.group_lbl}</option>
                    </Input>
                  </div>
                </Col>
              ) : (
                <Col lg={4}>
                  <div className="mb-3">
                    <Label className="form-label">Group Policy</Label>
                    <Input
                      name="policy"
                      type="select"
                      placeholder="Select Group Policy"
                      className="form-select"
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.policy || ""}
                    // disabled={!selectedType && !selectedRole}
                    >
                      <option value="">Select Group Policy</option>
                      {selectedType &&
                        selectedRole &&
                        policyList &&
                        policyList.map((policy) => (
                          <option key={policy._id} value={policy._id}>
                            {policy.user_id}
                          </option>
                        ))}
                    </Input>

                    {validation.touched.policy && validation.errors.policy ? (
                      <FormFeedback type="invalid">
                        {validation.errors.policy}
                      </FormFeedback>
                    ) : null}
                  </div>
                </Col>
              )}
              <Col lg={4}>
                <div className="mb-3">
                  <Label className="form-label">
                    Designation<span style={{ color: "red" }}>*</span>
                  </Label>
                  <Input
                    name="designation"
                    type="select"
                    placeholder="Select Designation"
                    className="form-select"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.designation || ""}
                    disabled={!showEditUser}
                  >
                    {/* <option value="">Select Designation</option> */}
                    {userDesignation &&
                      userDesignation.map((desig) => (
                        <option key={desig.id} value={desig.id}>
                          {desig.name}
                        </option>
                      ))}
                  </Input>
                  {validation.touched.designation &&
                    validation.errors.designation ? (
                    <FormFeedback type="invalid">
                      {validation.errors.designation}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
            </Row>
            <Row>
              <Col lg={4}>
                <div className="mb-3">
                  <Label className="form-label">
                    Status<span style={{ color: "red" }}>*</span>
                  </Label>
                  <Input
                    name="status"
                    type="select"
                    placeholder="Select Status"
                    className="form-select"
                    onChange={handleStatusChange}
                    onBlur={validation.handleBlur}
                    value={selectedStatus}
                    disabled={!showEditUser}
                  >
                    {/* <option value="">Select Status</option> */}
                    {userStatus.map((status) => (
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
              <Col lg={4}>
                <div className="mb-3">
                  <Label className="form-label">
                    Inactive/Block Message
                    <span style={{ color: "red" }}>*</span>
                  </Label>
                  <Input
                    name="block_message"
                    type="textarea"
                    placeholder="Enter Message"
                    rows="3"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.block_message || ""}
                    invalid={
                      validation.touched.block_message &&
                        validation.errors.block_message
                        ? true
                        : false
                    }
                    disabled={
                      selectedStatus === "0" || selectedStatus === "-7"
                        ? false
                        : true
                    }
                  />
                  {validation.touched.block_message &&
                    validation.errors.block_message ? (
                    <FormFeedback type="invalid">
                      {validation.errors.block_message}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
            </Row>
            <Row>
              <Col lg={4}>
                <div className="mb-3">
                  <Label className="form-label">
                    Login ID
                  </Label>
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
                    disabled
                  />
                  {validation.touched.username && validation.errors.username ? (
                    <FormFeedback type="invalid">
                      {validation.errors.username}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
              {showEditUser && (
                <>
                  {" "}
                  <Col lg={4}>
                    <div className="mb-3">
                      <Label className="form-label">
                        Password<span style={{ color: "red" }}>*</span>
                      </Label>
                      <Input
                        name="password"
                        label="Password"
                        type="text"
                        placeholder="Password"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.password || ""}
                        invalid={
                          validation.touched.password &&
                            validation.errors.password
                            ? true
                            : false
                        }
                      />
                      {validation.touched.password &&
                        validation.errors.password ? (
                        <FormFeedback type="invalid">
                          {validation.errors.password}
                        </FormFeedback>
                      ) : null}
                    </div>
                  </Col>
                  <Col lg={4}>
                    <div className="mb-3">
                      <Label className="form-label">
                        Confirm-Password<span style={{ color: "red" }}>*</span>
                      </Label>
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
                </>
              )}
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
    </>
  );
};

ViewUserModal.propTypes = {
  isOpen: PropTypes.bool,
  resetSelection: PropTypes.func,
  toggleModal: PropTypes.func,

  user: PropTypes.object,
  userType: PropTypes.array,
  userStatus: PropTypes.array,
  userRole: PropTypes.array,
  userDesignation: PropTypes.array,
};

export default ViewUserModal;
