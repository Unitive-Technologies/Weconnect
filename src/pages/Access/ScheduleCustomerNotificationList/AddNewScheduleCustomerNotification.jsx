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
  ModalFooter,
} from "reactstrap";
import Select from "react-select";
import * as Yup from "yup";
import { useFormik } from "formik";
import { addNewScheduleCustomerNotification as onAddNewScheduleCustomerNotification } from "/src/store/schedulecustomernotification/actions";
import { useSelector, useDispatch } from "react-redux";
import { getScheduleCustomerNotification as onGetScheduleCustomerNotification } from "/src/store/actions";

const AddNewScheduleCustomerNotification = (props) => {
  const {
    isOpen,
    toggleAddNewScheduleCustNoti,
    SchCusNotStatus,
    SchCusNotType,
    SchCusNotSMS,
    SchCusNotOSD,
    SchCusNotBmail,
  } = props;
  console.log("SchCusNotStatus:" + JSON.stringify(SchCusNotStatus));
  console.log("SchCusNotType:" + JSON.stringify(SchCusNotType));
  console.log("SchCusNotSMS:" + JSON.stringify(SchCusNotSMS));
  console.log("SchCusNotOSD:" + JSON.stringify(SchCusNotOSD));
  console.log("SchCusNotBmail:" + JSON.stringify(SchCusNotBmail));
  const dispatch = useDispatch();
  const [user, setUser] = useState();
  const [selectedOSDValues, setSelectedOSDValues] = useState([]);

  const options = SchCusNotBmail.map((option) => ({
    value: option.id,
    label: (
      <div>
        <h6>{option.name}</h6>
        <p>CAS: {option.cas_code}</p>
      </div>
    ),
  }));

  const handleChangeOSD = (e) => {
    const selectedOptions = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setSelectedOSDValues(selectedOptions);
  };

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      schedulecustomernotification: "",
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
      name: Yup.string()
        .required("Enter name")
        .min(2, "Minimum length 2 character"),
      type_lbl: Yup.string().required("Select type"),
      // schedule_days: Yup.string().required("Select schedule days"),
      start_date: Yup.string().required("Select start date"),
      end_date: Yup.string().required("Select end date"),
      description: Yup.string()
        .required("Enter description")
        .min(2, "Minimum length 2 character"),
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
        osd_template_id_lbl: selectedOSDValues,
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
      dispatch(onGetScheduleCustomerNotification());
      validation.resetForm();
      toggleAddNewScheduleCustNoti();
    },
    onReset: (values) => {
      validation.setValues(validation.initialValues);
    },
  });

  return (
    <Modal
      isOpen={isOpen}
      role="dialog"
      size="xl"
      autoFocus={true}
      centered={true}
      className="exampleModal"
      tabIndex="-1"
      toggle={toggleAddNewScheduleCustNoti}
    >
      {/* <Modal isOpen={modal} toggle={toggle}> */}
      <ModalHeader tag="h4" toggle={toggleAddNewScheduleCustNoti}>
        Add New Schedule Customer Notification
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
            <Col lg={3}>
              <div className="mb-3">
                <Label className="form-label">
                  Name<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="name"
                  type="text"
                  placeholder="Enter name"
                  // className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.name || ""}
                  invalid={
                    validation.touched.name &&
                      validation.errors.name
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
            </Col>
            <Col lg={3}>
              <div className="mb-3">
                <Label className="form-label">
                  Type<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="type_lbl"
                  type="select"
                  placeholder="Select type"
                  className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.type_lbl || ""}
                  invalid={
                    validation.touched.type_lbl &&
                      validation.errors.type_lbl
                      ? true
                      : false
                  }
                >
                  <option value="">Select type</option>
                  {SchCusNotType &&
                    SchCusNotType.map((type_lbl) => (
                      <option key={type_lbl.id} value={type_lbl.id}>
                        {type_lbl.name}
                      </option>
                    ))}
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
                <Label className="form-label">
                  Schedule Days<span style={{ color: "red" }}>*</span>
                </Label>
                <select
                  name="schedule_days"
                  className="form-select"
                  multiple
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.schedule_days || []}
                  invalid={validation.touched.schedule_days && validation.errors.schedule_days}
                >
                  <option value="">Select schedule days</option>
                  {/* Populate options dynamically */}
                  {[...Array(28)].map((_, index) => (
                    <option key={index + 1} value={index + 1}>{index + 1}</option>
                  ))}
                </select>
                {validation.touched.schedule_days && validation.errors.schedule_days && (
                  <FormFeedback type="invalid">
                    {validation.errors.schedule_days}
                  </FormFeedback>
                )}
              </div>
            </Col>
            <Col lg={4}>
              <div className="mb-3">
                <Label className="form-label">
                  OSD Config (Select 1 config per CAS)<span style={{ color: "red" }}>*</span>
                </Label>
                <Select
                  name="osd_configuration_id_lbl"
                  options={options}
                  onChange={(selectedOption) => {
                    validation.setFieldValue('osd_configuration_id_lbl', selectedOption ? selectedOption.value : ''); // Set the value of operator_id
                  }}
                  isMulti
                  onBlur={validation.handleBlur}
                  styles={{
                    control: (provided, state) => ({
                      ...provided,
                      borderColor: state.isFocused ? (validation.touched.osd_configuration_id_lbl && validation.errors.osd_configuration_id_lbl ? 'red' : '') : (validation.touched.osd_configuration_id_lbl && validation.errors.osd_configuration_id_lbl ? 'red' : ''),
                      // boxShadow: state.isFocused ? (validation.touched.operator_id && validation.errors.operator_id ? '0 0 0 0.2rem rgba(220, 53, 69, 0.25)' : '') : (validation.touched.operator_id && validation.errors.operator_id ? '0 0 0 0.2rem rgba(220, 53, 69, 0.25)' : ''),
                    }),
                    option: (provided) => ({
                      ...provided,
                      backgroundColor: "white",
                    }),
                  }}
                />
                {validation.touched.osd_configuration_id_lbl && validation.errors.osd_configuration_id_lbl && (
                  <FormFeedback style={{ display: 'block' }}>
                    {validation.errors.osd_configuration_id_lbl}
                  </FormFeedback>
                )}
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
                  <option value="">Select osd template</option>
                  {SchCusNotOSD &&
                    SchCusNotOSD.map((osd_template_id_lbl) => (
                      <option
                        key={osd_template_id_lbl.id}
                        value={osd_template_id_lbl.id}
                      >
                        {osd_template_id_lbl.name}
                      </option>
                    ))}
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
                  <option value="">Select bmail template</option>
                  {SchCusNotBmail &&
                    SchCusNotBmail.map((bmail_template_id_lbl) => (
                      <option
                        key={bmail_template_id_lbl.id}
                        value={bmail_template_id_lbl.id}
                      >
                        {bmail_template_id_lbl.name}
                      </option>
                    ))}
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
                  <option value="">Select sms template</option>
                  {SchCusNotSMS &&
                    SchCusNotSMS.map((sms_template_id_lbl) => (
                      <option
                        key={sms_template_id_lbl.id}
                        value={sms_template_id_lbl.id}
                      >
                        {sms_template_id_lbl.name}
                      </option>
                    ))}
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
                <Label className="form-label">
                  Start Date<span style={{ color: "red" }}>*</span>
                </Label>
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
                <Label className="form-label">
                  End date<span style={{ color: "red" }}>*</span>
                </Label>
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
                <Label className="form-label">
                  Description<span style={{ color: "red" }}>*</span>
                </Label>
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
                  invalid={
                    validation.touched.status_lbl &&
                      validation.errors.status_lbl
                      ? true
                      : false
                  }
                >
                  <option value="">Select Status</option>
                  {SchCusNotStatus &&
                    SchCusNotStatus.map((status_lbl) => (
                      <option key={status_lbl.id} value={status_lbl.id}>
                        {status_lbl.name}
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
                    toggleAddNewScheduleCustNoti();
                  }}
                >
                  Cancel
                </button>
              </ModalFooter>
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
