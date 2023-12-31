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
  // getUserType as onGetUserType,
  // getUserStatus as onGetUserStatus,
  // getUserRole as onGetUserRole,
  // getUserDesignation as onGetUserDesignation,
  // getUserMsoPolicy as onGetUserMsoPolicy,
  getUserRegionalOffice as onGetUserRegionalOffice,
  getUserMsoDetails as onGetUserMsoDetails,
  getUserDistributor as onGetUserDistributor,
  getUserLco as onGetUserLco,
} from "/src/store/users/actions";
import EditModal from "./EditModal";

const ViewModal = (props) => {
  const {
    isOpen,
    handleViewUser,
    user,
    userType,
    userStatus,
    userRole,
    userDesignation,
  } = props;
  console.log("Userdata in view modal:" + JSON.stringify(user));
  const dispatch = useDispatch();
  const [showEditUser, setShowEditUser] = useState(false);

  const API_URL = "https://sms.unitch.in/api/index.php/v1";

  const handleCancel = () => {
    setShowEditUser(false);
    handleViewUser();
  };
  useEffect(() => {
    if (user) {
      dispatch(onGetUsers());
    }
    setShowEditUser(false);
  }, [dispatch, user]);
  return (
    <>
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
        {!showEditUser ? (
          <>
            <ModalHeader toggle={handleCancel} tag="h4">
              View {user && user.name}
            </ModalHeader>
            <Link
              style={{
                position: "absolute",
                marginLeft: "92%",
                marginTop: "1%",
              }}
              to="#!"
              className="btn btn-light me-1"
              onClick={() => setShowEditUser(true)}
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
                  <Col lg={4}>
                    <div className="mb-3">
                      <Label className="form-label">Name</Label>
                      <Input
                        name="name"
                        type="text"
                        placeholder="Insert Name"
                        disabled
                        value={user.name}
                      />
                    </div>
                  </Col>
                  <Col lg={4}>
                    <div className="mb-3">
                      <Label className="form-label">Email</Label>
                      <Input
                        name="email"
                        label="Email"
                        type="email"
                        placeholder="Insert Email"
                        disabled
                        value={user.email}
                      />
                    </div>
                  </Col>
                  <Col lg={4}>
                    <div className="mb-3">
                      <Label className="form-label">Mobile No.</Label>
                      <Input
                        name="mobile"
                        label="Mobile No."
                        placeholder="Insert Mobile Number"
                        type="text"
                        disabled
                        value={user.mobile_no}
                      />
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
                          value={user.type_lbl}
                          disabled
                        >
                          <option value="">{user.type_lbl}</option>
                        </Input>
                      </div>
                    </Col>

                    <Col lg={4}>
                      <div className="mb-3">
                        <Label className="form-label">
                          Select {user.type_lbl}
                        </Label>
                        <Input
                          name="mso"
                          type="select"
                          placeholder="Select MSO"
                          className="form-select"
                          value={user.operator_lbl}
                        >
                          <option value="">{user.operator_lbl}</option>
                        </Input>
                      </div>
                    </Col>
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
                        value={user.role_lbl}
                        disabled
                      >
                        <option value="">{user.role_lbl}</option>
                      </Input>
                    </div>
                  </Col>

                  <Col lg={4}>
                    <div className="mb-3">
                      <Label className="form-label">Group Policy</Label>
                      <Input
                        name="policy"
                        type="select"
                        placeholder="Select Group Policy"
                        className="form-select"
                        // value={access_policy_lbl}
                        disabled
                      >
                        {/* <option value="">Select Group Policy</option> */}
                      </Input>
                    </div>
                  </Col>
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
                        value={user.designation}
                        disabled
                      >
                        {/* <option value="">{user.}</option> */}
                      </Input>
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
                        value={user.status_lbl}
                        disabled
                      >
                        <option value="">{user.status_lbl}</option>
                      </Input>
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
                        value={user.block_message}
                        disabled
                      />
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col lg={4}>
                    <div className="mb-3">
                      <Label className="form-label">
                        Login ID<span style={{ color: "red" }}>*</span>
                      </Label>
                      <Input
                        name="username"
                        label="Login ID"
                        type="text"
                        placeholder="Login ID"
                        value={user.username}
                        disabled
                      />
                    </div>
                  </Col>
                </Row>
              </Form>
            </ModalBody>
          </>
        ) : (
          <EditModal
            userType={userType}
            userStatus={userStatus}
            userRole={userRole}
            userDesignation={userDesignation}
          />
        )}
      </Modal>
    </>
  );
};

ViewModal.propTypes = {
  handleViewUser: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default ViewModal;
