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
  ModalFooter,
  Label,
  FormFeedback,
  UncontrolledTooltip,
  Input,
  Form,
} from "reactstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import { addNewCompanyList as onAddNewCompanyList } from "/src/store/companylist/actions";
import { useSelector, useDispatch } from "react-redux";


const AddNewCompanyListt = (props) => {
  const { isOpen, toggle } = props;
  const dispatch = useDispatch();
  const [user, setUser] = useState();

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      //BroadCaster: "",
      name: "",
      code: "",
      contact: "",
      mobile: "",
      phone: "",
      email: "",
      address: "",
      description: "",
      gst_no: "",
      tan_no: "",
      pan_no: "",
      status: "",
      created_by: "Admin",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Enter name"),
      code: Yup.string().required("Enter code"),
      contact: Yup.string().required("Enter contat person"),
      mobile: Yup.string().required("Enter mobile number"),
      phone: Yup.string().required("Enter phone number"),
      email: Yup.string().required("Enter email"),
      address: Yup.string().required("select address"),
      description: Yup.string().required("Enter description"),
      gst_no: Yup.string().required("Enter GST no "),
      tan_no: Yup.string().required("Enter TAN no"),
      pan_no: Yup.string().required("Enter PAN no"),
      status: Yup.string().required("Enter status"),

    }),
    onSubmit: (values) => {
      const newCompanyList = {
        id: Math.floor(Math.random() * (30 - 20)) + 20,
        name: values["name"],
        code: values["code"],
        contact: values["contact"],
        mobile: values["mobile"],
        phone: values["phone"],
        email: values["email"],
        address: values["address"],
        description: values["description"],
        gst_no: values["gst_no"],
        tan_no: values["tan_no"],
        pan_no: values["pan_no"],
        status: values["status"],
        created_at: new Date(),
        created_by: values["created_by"],
      };
      console.log("newCompanyList:" + newCompanyList);
      // save new user
      dispatch(onAddNewCompanyList(newCompanyList));
      validation.resetForm();
      toggle();
    },
    onReset: (values) => {
      validation.setValues(validation.initialValues);
    },
  });

  const [modal4, setModal4] = useState(false);

  const toggle4 = () => {
    setModal4(!modal4);
  };

  return (
    <Modal
      isOpen={isOpen}
      role="dialog"
      autoFocus={true}
      centered={true}
      className="exampleModal"
      tabIndex="-1"
      toggle={toggle}
      size="xl"
    >
      <ModalHeader tag="h4" toggle={toggle}>Add New Channel</ModalHeader>
      <ModalBody>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            validation.handleSubmit();
            return false;
          }}
        >
          <Row>

            <Col sm="3">
              <div className="mb-3">
                <Label className="form-label">Name<span style={{ color: "red" }}>*</span></Label>
                <Input
                  name="name"
                  type="text"
                  placeholder="Enter name"
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

            <Col sm="3">
              <div className="mb-3">
                <Label className="form-label">Code<span style={{ color: "red" }}>*</span></Label>
                <Input
                  name="code"
                  type="text"
                  placeholder="Enter code"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.code || ""}
                ></Input>
                {validation.touched.code && validation.errors.code ? (
                  <FormFeedback type="invalid">
                    {validation.errors.code}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>

            <Col sm="3">
              <div className="mb-3">
                <Label className="form-label">Contact Person<span style={{ color: "red" }}>*</span></Label>
                <Input
                  name="contact"
                  type="text"
                  placeholder="Enter contact person"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.contact || ""}
                ></Input>
                {validation.touched.contact && validation.errors.contact ? (
                  <FormFeedback type="invalid">
                    {validation.errors.contact}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>

            <Col sm="3">
              <div className="mb-3">
                <Label className="form-label">Mobile No.<span style={{ color: "red" }}>*</span></Label>
                <Input
                  name="mobile"
                  type="text"
                  placeholder="Enter Mobile number"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.mobile || ""}
                ></Input>
                {validation.touched.mobile && validation.errors.mobile ? (
                  <FormFeedback type="invalid">
                    {validation.errors.mobile}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
          </Row>
          <Row>
            <Col sm="3">
              <div className="mb-3">
                <Label className="form-label">
                  Phone No.<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="phone"
                  type="text"
                  placeholder="Enter Phone number"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.phone || ""}
                ></Input>
                {validation.touched.phone && validation.errors.phone ? (
                  <FormFeedback type="invalid">
                    {validation.errors.phone}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>

            <Col sm="3">
              <div className="mb-3">
                <Label className="form-label">Email<span style={{ color: "red" }}>*</span></Label>
                <Input
                  name="email"
                  type="text"
                  placeholder="Enter email"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.email || ""}
                ></Input>
                {validation.touched.email && validation.errors.email ? (
                  <FormFeedback type="invalid">
                    {validation.errors.email}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>

            <Col sm="3">
              <div className="mb-3">
                <Label className="form-label">Address<span style={{ color: "red" }}>*</span></Label>
                <Input
                  name="address"
                  type="text"
                  placeholder="Enter address"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.address || ""}
                ></Input>
                {validation.touched.address && validation.errors.address ? (
                  <FormFeedback type="invalid">
                    {validation.errors.address}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>

            <Col sm="3">
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
          </Row>
          <Row>
            <Col sm="3">
              <div className="mb-3">
                <Label className="form-label">
                  GST No.<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="gst_no"
                  type="text"
                  placeholder="Enter GST No."
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.gst_no || ""}
                >
                </Input>
                {validation.touched.gst_no &&
                  validation.errors.gst_no ? (
                  <FormFeedback type="invalid">
                    {validation.errors.gst_no}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
            <Col sm="3">
              <div className="mb-3">
                <Label className="form-label">
                  TAN No.<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="tan_no"
                  type="text"
                  placeholder="Enter TAN no"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.tan_no || ""}
                >
                </Input>
                {validation.touched.tan_no && validation.errors.tan_no ? (
                  <FormFeedback type="invalid">
                    {validation.errors.tan_no}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
            <Col sm="3">
              <div className="mb-3">
                <Label className="form-label">
                  PAN No.<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="pan_no"
                  type="text"
                  placeholder="Enter Pan no."
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.pan_no || ""}
                >
                </Input>
                {validation.touched.pan_no &&
                  validation.errors.pan_no ? (
                  <FormFeedback type="invalid">
                    {validation.errors.pan_no}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
            <Col sm="3">
              <div className="mb-3">
                <Label className="form-label">Status</Label>
                <Input
                  name="status"
                  type="select"
                  placeholder="Select status"
                  className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.status || ""}
                >
                  <option value="21">Select status</option>
                  <option value="22">Active</option>
                  <option value="22">In-Active</option>
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
                    toggle();
                  }}
                >
                  Cancel
                </button>
              </ModalFooter>
            </Col>
          </Row>
        </Form>
      </ModalBody>
    </Modal >
  );
};

AddNewCompanyListt.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default AddNewCompanyListt;
