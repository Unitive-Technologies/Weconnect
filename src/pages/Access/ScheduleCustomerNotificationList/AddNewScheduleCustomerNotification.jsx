import React, { useEffect, useState, useRef, useMemo } from "react";
import PropTypes from "prop-types";
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
import { addNewScheduleCustomerNotification as onAddNewScheduleCustomerNotification } from "/src/store/schedulecustomernotification/actions";
import { useSelector, useDispatch } from "react-redux";

const AddNewScheduleCustomerNotification = (props) => {
  const { isOpen, toggle } = props;
  const dispatch = useDispatch();
  const [user, setUser] = useState();

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      // schedulecustomernotification: "",
      name: "",
      type_lbl: "",
      schedule_days: "",
      osd_configuration_id_lbl: "",
      osd_template_id_lbl: "",
      bmail_template_id_lbl: "",
      sms_template_id_lbl: "",
      start_date: "",
      end_date: "",
      status_lbl: "",
      description: "",
      created_at: "",
      created_by: "Admin",
    },
    validationSchema: Yup.object({
      // schedulecustomernotification: Yup.string().required("Enter schedulecustomernotification Name"),
      name: Yup.string().required("Select name"),
      type_lbl: Yup.string().required("Select type"),
      schedule_days: Yup.string().required("Select schedule days"),
      osd_configuration_id_lbl: Yup.string().required(
        "Select osd configuaration"
      ),
      osd_template_id_lbl: Yup.string().required("Select osd template"),
      // bmail_template_id_lbl: Yup.string().required("Select bmail template"),
      sms_template_id_lbl: Yup.string().required("Select sms template"),
      // start_date: Yup.string().required("Select start date"),
      // end_date: Yup.string().required("Select end date"),
      description: Yup.string().required("Select description"),
      status_lbl: Yup.string().required("Select status"),
    }),
    onSubmit: (values) => {
      const newScheduleCustomerNotification = {
        id: Math.floor(Math.random() * (30 - 20)) + 20,
        // schedulecustomernotification: values["schedulecustomernotification"],
        name: values["name"],
        type_lbl: values["type_lbl"],
        schedule_days: values["schedule_days"],
        osd_configuration_id_lbl: values["osd_configuration_id_lbl"],
        osd_template_id_lbl: values["osd_template_id_lbl"],
        bmail_template_id_lbl: values["bmail_template_id_lbl"],
        sms_template_id_lbl: values["sms_template_id_lbl"],
        start_date: values["start_date"],
        end_date: values["end_date"],
        description: values["description"],
        status_lbl: values["status_lbl"],
        created_at: new Date(),
        created_by: values["created_by"],
      };
      console.log(
        "newScheduleCustomerNotification:" + newScheduleCustomerNotification
      );
      // save new user
      dispatch(
        onAddNewScheduleCustomerNotification(newScheduleCustomerNotification)
      );
      validation.resetForm();
      toggle();
    },
    onReset: (values) => {
      validation.setValues(validation.initialValues);
    },
  });

  return (
    <Modal
      isOpen={isOpen}
      role="dialog"
      autoFocus={true}
      centered={true}
      className="exampleModal"
      tabIndex="-1"
      toggle={toggle}
    >
      {/* <Modal isOpen={modal} toggle={toggle}> */}
      <ModalHeader tag="h4">Add New Schedule Customer Notification</ModalHeader>
      <ModalBody>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            validation.handleSubmit();
            return false;
          }}
        >
          <Row>
            <Col sm="12">
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

              <div className="mb-3">
                <Label className="form-label">
                  OSD Config (Select only 1 config per CAS)
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
                {validation.touched.status_lbl && validation.errors.status_lbl ? (
                  <FormFeedback type="invalid">
                    {validation.errors.status_lbl}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
          </Row>
          <Row>
            <Col sm="8">
              <div className="d-flex flex-wrap gap-2">
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
                    toggle();
                  }}
                >
                  Cancel
                </button>
              </div>
            </Col>
          </Row>
        </Form>
      </ModalBody>
      {/* </Modal> */}
    </Modal>
  );
};

AddNewScheduleCustomerNotification.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default AddNewScheduleCustomerNotification;