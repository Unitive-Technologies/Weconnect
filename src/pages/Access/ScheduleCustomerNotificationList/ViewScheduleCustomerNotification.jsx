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
import { updateUser as onUpdateUser } from "/src/store/users/actions";

const ViewScheduleCustomerNotification = (props) => {
  const {
    isOpen,
    handleViewUser: handleViewCustomerNotification,
    viewScheduleNoti,
  } = props;
  // console.log("isOpen in viewuser modal:" + isOpen);

  const dispatch = useDispatch();
  const [showEditSchedule, setShowEditSchedule] = useState(false);
  // console.log("edit in viewuser modal:" + showEditUser);
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      id: (viewScheduleNoti && viewScheduleNoti.id) || "",
      name: (viewScheduleNoti && viewScheduleNoti.name) || "",
      email: (viewScheduleNoti && viewScheduleNoti.email) || "",
      mobile: (viewScheduleNoti && viewScheduleNoti.mobile_no) || "",
      usertype: (viewScheduleNoti && viewScheduleNoti.usertype) || "",
      status: (viewScheduleNoti && viewScheduleNoti.status) || "",
      message: (viewScheduleNoti && viewScheduleNoti.message) || "",
      role: (viewScheduleNoti && viewScheduleNoti.role) || "",
      designation: (viewScheduleNoti && viewScheduleNoti.designation) || "",
      grouppolicy: (viewScheduleNoti && viewScheduleNoti.grouppolicy) || "",
      loginid: (viewScheduleNoti && viewScheduleNoti.username) || "",
      password: (viewScheduleNoti && viewScheduleNoti.password) || "",
      confirmpassword:
        (viewScheduleNoti && viewScheduleNoti.confirmpassword) || "",
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
      const updateUser = {
        id: viewScheduleNoti.id,
        name: values.name,
        email: values.email,
        mobile: values.mobile,
        usertype: values.usertype,
        status: values.status,
        message: values.message,
        role: values.role,
        designation: values.designation,
        grouppolicy: values.grouppolicy,
        loginid: values.loginid,
        password: values.password,
        confirmpassword: values.confirmpassword,
      };

      // update user
      dispatch(onUpdateUser(updateUser));
      validation.resetForm();
      handleViewCustomerNotification();
    },
  });

  const handleCancel = () => {
    setShowEditSchedule(false);
    handleViewCustomerNotification();
  };
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
        <ModalHeader toggle={handleCancel} tag="h4">
          {!showEditSchedule ? "View User" : "Edit User"}
        </ModalHeader>
        {!showEditSchedule && (
          <Link
            style={{
              position: "absolute",
              marginLeft: "92%",
              marginTop: "1%",
            }}
            to="#!"
            className="btn btn-light me-1"
            onClick={() => setShowEditSchedule(true)}
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
              <Col lg={3}>
                <div className="mb-3">
                  <Label className="form-label">Name</Label>
                  <Input
                    name="name"
                    type="text"
                    placeholder="Enter name"
                    // className="form-select"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.name || ""}
                  ></Input>
                  {validation.touched.name && validation.errors.name ? (
                    <FormFeedback type="invalid">
                      {validation.errors.name}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Col lg={3}>
                <div className="mb-3">
                  <Label className="form-label">Type</Label>
                  <Input
                    name="type_lbl"
                    type="select"
                    placeholder="Select type"
                    className="form-select"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.type_lbl || ""}
                  >
                    <option value="">Account Expiring</option>
                    <option value="1">Bill Payment</option>
                  </Input>
                  {validation.touched.type_lbl && validation.errors.type_lbl ? (
                    <FormFeedback type="invalid">
                      {validation.errors.type_lbl}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Col lg={3}>
                <div className="mb-3">
                  <Label className="form-label">Schedule Days</Label>
                  <Input
                    name="schedule_days"
                    label="scheduledays"
                    type="select"
                    placeholder="Select schedule days"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.schedule_days || ""}
                  >
                    <option value="11">Select schedule days</option>
                    <option value="12">1</option>
                    <option value="13">2</option>
                    <option value="14">3</option>
                    <option value="15">4</option>
                    <option value="16">5</option>
                    <option value="17">6</option>
                    <option value="18">7</option>
                    <option value="19">8</option>
                    <option value="20">9</option>
                    <option value="21">10</option>
                    <option value="22">11</option>
                    <option value="23">12</option>
                    <option value="24">13</option>
                    <option value="25">14</option>
                    <option value="26">15</option>
                    <option value="27">16</option>
                    <option value="28">17</option>
                    <option value="29">18</option>
                    <option value="30">19</option>
                    <option value="31">20</option>
                    <option value="32">21</option>
                    <option value="33">22</option>
                    <option value="34">23</option>
                    <option value="35">24</option>
                    <option value="36">25</option>
                    <option value="37">26</option>
                    <option value="38">27</option>
                    <option value="39">28</option>
                  </Input>
                  {validation.touched.schedule_days &&
                  validation.errors.schedule_days ? (
                    <FormFeedback type="invalid">
                      {validation.errors.schedule_days}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Col lg={3}>
                <div className="mb-3">
                  <Label className="form-label">
                    OSD Config (Select 1 config per CAS)
                  </Label>
                  <Input
                    name="osd_configuration_id_lbl"
                    type="select"
                    placeholder="Select osd configuration"
                    className="form-select"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.osd_configuration_id_lbl || ""}
                  >
                    <option value="51">Select osd configuration</option>
                    <option value="52">TEST OSD</option>
                    <option value="53">CAS: NSTV</option>
                    <option value="54">OSD</option>
                    <option value="55">CAS: NSTV</option>
                  </Input>
                  {validation.touched.osd_configuration_id_lbl &&
                  validation.errors.osd_configuration_id_lbl ? (
                    <FormFeedback type="invalid">
                      {validation.errors.osd_configuration_id_lbl}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
            </Row>
            <Row>
              <Col lg={3}>
                <div className="mb-3">
                  <Label className="form-label">OSD Template</Label>
                  <Input
                    name="osd_template_id_lbl"
                    type="select"
                    placeholder="Select osd template"
                    className="form-select"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.osd_template_id_lbl || ""}
                  >
                    <option value="61">Select osd template</option>
                    <option value="62">Expiring STB</option>
                    <option value="63">NXT</option>
                  </Input>
                  {validation.touched.osd_template_id_lbl &&
                  validation.errors.osd_template_id_lbl ? (
                    <FormFeedback type="invalid">
                      {validation.errors.osd_template_id_lbl}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Col lg={3}>
                <div className="mb-3">
                  <Label className="form-label">Bmail Template</Label>
                  <Input
                    name="bmail_template_id_lbl"
                    type="select"
                    placeholder="Select bmail template"
                    className="form-select"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.bmail_template_id_lbl || ""}
                  >
                    <option value="71">Select bmail template</option>
                  </Input>
                  {validation.touched.bmail_template_id_lbl &&
                  validation.errors.bmail_template_id_lbl ? (
                    <FormFeedback type="invalid">
                      {validation.errors.bmail_template_id_lbl}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Col lg={6}>
                <div className="mb-3">
                  <Label className="form-label">SMS Template</Label>
                  <Input
                    name="sms_template_id_lbl"
                    type="select"
                    placeholder="Select sms template"
                    className="form-select"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.sms_template_id_lbl || ""}
                  >
                    <option value="81">Select sms template</option>
                    <option value="82">Administrator</option>
                    <option value="83">Staff</option>
                    <option value="84">User</option>
                  </Input>
                  {validation.touched.sms_template_id_lbl &&
                  validation.errors.sms_template_id_lbl ? (
                    <FormFeedback type="invalid">
                      {validation.errors.sms_template_id_lbl}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
            </Row>
            <Row>
              <Col lg={3}>
                <div className="mb-3">
                  <Label className="form-label">Start Date</Label>
                  <Input
                    name="start_date"
                    label="start_date"
                    type="date"
                    placeholder="Select start date"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.start_date || ""}
                    invalid={
                      validation.touched.start_date &&
                      validation.errors.start_date
                        ? true
                        : false
                    }
                  />
                  {validation.touched.start_date &&
                  validation.errors.start_date ? (
                    <FormFeedback type="invalid">
                      {validation.errors.start_date}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Col lg={3}>
                <div className="mb-3">
                  <Label className="form-label">End date</Label>
                  <Input
                    name="end_date"
                    label="end_date"
                    type="date"
                    placeholder="Select end date"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.end_date || ""}
                    invalid={
                      validation.touched.end_date && validation.errors.end_date
                        ? true
                        : false
                    }
                  />
                  {validation.touched.end_date && validation.errors.end_date ? (
                    <FormFeedback type="invalid">
                      {validation.errors.end_date}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Col lg={3}>
                <div className="mb-3">
                  <Label className="form-label">Description</Label>
                  <Input
                    name="description"
                    type="textarea"
                    placeholder="Enter Description"
                    rows="3"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.description || ""}
                    invalid={
                      validation.touched.description &&
                      validation.errors.description
                        ? true
                        : false
                    }
                  />
                  {validation.touched.description &&
                  validation.errors.description ? (
                    <FormFeedback type="invalid">
                      {validation.errors.description}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Col lg={3}>
                <div className="mb-3">
                  <Label className="form-label">Status</Label>
                  <Input
                    name="status_lbl"
                    type="select"
                    placeholder="Select Status"
                    className="form-select"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.status_lbl || ""}
                  >
                    <option value="101">Select Status</option>
                    <option value="102">Active</option>
                    <option value="103">In-Active</option>
                  </Input>
                  {validation.touched.status_lbl &&
                  validation.errors.status_lbl ? (
                    <FormFeedback type="invalid">
                      {validation.errors.status_lbl}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
            </Row>

            {showEditSchedule && (
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

ViewScheduleCustomerNotification.propTypes = {
  handleViewUser: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default ViewScheduleCustomerNotification;
