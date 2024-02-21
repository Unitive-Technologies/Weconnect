import React, { useState } from "react";
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
import { useDispatch } from "react-redux";
import {
  updateCustomerUser as onUpdateCustomerUser,
  getCustomerUsers as onGetCustomerUsers,
} from "/src/store/customerusers/actions";
import ShowHistoryModal from "./ShowHistoryModal";

const ViewCustomerUserModal = (props) => {
  const { isOpen, toggleViewModal, customeruser, userStatus } = props;
  console.log("customerUser in view modal:" + JSON.stringify(customeruser));
  const dispatch = useDispatch();
  const [showEditCustomerUser, setShowEditCustomerUser] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");

  const [showHistory, setShowHistory] = useState(false);

  const toggleHistoryModal = () => {
    setShowHistory(!showHistory);
  };

  const handleStatusChange = (e) => {
    const status = e.target.value;
    setSelectedStatus(status);
    validation.handleChange(e);
  };

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      id: (customeruser && customeruser.id) || "",
      name: (customeruser && customeruser.name) || "",
      login: (customeruser && customeruser.username) || "",
      mobile: (customeruser && customeruser.mobile_no) || "",
      email: (customeruser && customeruser.email) || "",
      status: (customeruser && customeruser.status) || "",
      // lco: (customeruser && customeruser.operator.name) || "",
      // lcocode: (customeruser && customeruser.operator.code) || "",
      block_message: (customeruser && customeruser.block_message) || "",
    },
    validationSchema: Yup.object({
      status: Yup.string().required("Please Enter Status"),
      // block_message: Yup.string().required("Please Enter Block Message"),
    }),
    onSubmit: (values) => {
      const updateCustomerUser = {
        id: customeruser.id,

        status: parseInt(values.status),
        block_message: values.block_message,
        password: values.password,
      };

      // update user
      dispatch(onUpdateCustomerUser(updateCustomerUser));
      dispatch(onGetCustomerUsers);
      validation.resetForm();
      resetSelection();
      toggleViewModal();
    },
  });

  const handleCancel = () => {
    setShowEditCustomerUser(false);
    toggleViewModal();
  };
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
          {!showEditCustomerUser
            ? `View ${(customeruser && customeruser.name) || ""}`
            : `Edit ${(customeruser && customeruser.name) || ""}`}
        </ModalHeader>
        {!showEditCustomerUser && (
          <Link
            style={{
              position: "absolute",
              marginLeft: "92%",
              marginTop: "1%",
            }}
            to="#!"
            className="btn btn-light me-1"
            onClick={() => setShowEditCustomerUser(true)}
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
              <Col lg={4}>
                <div className="mb-3">
                  <Label className="form-label">Name</Label>
                  <Input
                    name="name"
                    type="text"
                    placeholder="Insert Name"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.initialValues.name || ""}
                    disabled
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
                  <Label className="form-label">Email</Label>
                  <Input
                    name="email"
                    label="Email"
                    type="email"
                    placeholder="Insert Email"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.initialValues.email || ""}
                    disabled
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
                  <Label className="form-label">Mobile No.</Label>
                  <Input
                    name="mobile"
                    label="Mobile No."
                    placeholder="Insert Mobile Number"
                    type="text"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.initialValues.mobile || ""}
                    disabled
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
              <Col lg={4}>
                <div className="mb-3">
                  <Label className="form-label">LCO</Label>
                  <Input
                    name="lco"
                    type="text"
                    placeholder="LCO"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.initialValues.lco || ""}
                    disabled
                    invalid={
                      validation.touched.lco && validation.errors.lco
                        ? true
                        : false
                    }
                  />
                  {validation.touched.lco && validation.errors.lco ? (
                    <FormFeedback type="invalid">
                      {validation.errors.lco}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Col lg={4}>
                <div className="mb-3">
                  <Label className="form-label">LCO Code</Label>
                  <Input
                    name="lcocode"
                    label="LCO Code"
                    type="text"
                    placeholder="LCO Code"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.initialValues.lcocode || ""}
                    disabled
                    invalid={
                      validation.touched.lcocode && validation.errors.lcocode
                        ? true
                        : false
                    }
                  />
                  {validation.touched.lcocode && validation.errors.lcocode ? (
                    <FormFeedback type="invalid">
                      {validation.errors.lcocode}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Col lg={4}>
                <div className="mb-3">
                  <Label className="form-label">Status</Label>
                  <Input
                    name="status"
                    type="select"
                    placeholder="Select Status"
                    className="form-select"
                    onChange={handleStatusChange}
                    onBlur={validation.handleBlur}
                    value={selectedStatus}
                    disabled={!showEditCustomerUser}
                  >
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
                  <Label className="form-label">Login ID</Label>
                  <Input
                    name="login"
                    label="Login ID"
                    type="text"
                    placeholder="Login ID"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.initialValues.login || ""}
                    disabled={!showEditCustomerUser}
                    invalid={
                      validation.touched.login && validation.errors.login
                        ? true
                        : false
                    }
                  />
                  {validation.touched.login && validation.errors.login ? (
                    <FormFeedback type="invalid">
                      {validation.errors.login}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
              {showEditCustomerUser && (
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
            {showEditCustomerUser && (
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

ViewCustomerUserModal.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default ViewCustomerUserModal;
