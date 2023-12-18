import React, { useEffect, useState, useRef, useMemo } from "react";
import PropTypes from "prop-types";
import {
  Col,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
  FormFeedback,
  Input,
  Form,
} from "reactstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import { addNcf as onAddNcf } from "/src/store/ncflist/actions";
import { useSelector, useDispatch } from "react-redux";
import AddMultipleNcf from "./AddMultipleNcf";

const AddNewNcf = (props) => {
  const { isOpen, toggle } = props;
  const dispatch = useDispatch();

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      name: "",
      code: "",
      status: "",
      calculate_per_channel: "",
      from_channel_no: "",
      to_channel_no: "",
      is_refundable: "",
      mrp: "",
      lmo_discount: "",
      lmo_rate: "",
      created_at: "",
      created_by: "my mso(mso)",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Enter name"),
      code: Yup.string().required("Enter code"),
      status: Yup.string().required("Select status"),
      calculate_per_channel: Yup.string().required(
        "Select calculate per channel"
      ),
      from_channel_no: Yup.string().required("Enter from channel"),
      to_channel_no: Yup.string().required("Enter to channel"),
      is_refundable: Yup.string().required("Select refundable"),
      mrp: Yup.string(),
      lmo_discount: Yup.string(),
      lmo_rate: Yup.string(),
    }),
    onSubmit: (values) => {
      const newNcf = {
        id: Math.floor(Math.random() * (30 - 20)) + 20,
        name: values["name"],
        code: values["code"],
        status: values["status"],
        calculate_per_channel: values["calculate_per_channel"],
        from_channel_no: values["from_channel_no"],
        to_channel_no: values["to_channel_no"],
        is_refundable: values["is_refundable"],
        mrp: values["mrp"],
        lmo_discount: values["lmo_discount"],
        lmo_rate: values["lmo_rate"],
        created_at: new Date(),
        created_by: values["created_by"],
      };
      console.log("New NCF:" + JSON.stringify(newNcf));
      // save new user
      dispatch(onAddNcf(newNcf));
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
      size="xl"
    >
      <ModalHeader tag="h4" toggle={toggle}>
        Add New NCF
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
            <Col sm="3">
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
                />
                {validation.touched.name && validation.errors.name ? (
                  <FormFeedback type="invalid">
                    {validation.errors.name}
                  </FormFeedback>
                ) : null}
              </div>

              <div className="mb-3">
                <Label className="form-label">
                  From Channel<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="from_channel_no"
                  type="text"
                  placeholder="Enter from channel"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.from_channel_no || ""}
                  invalid={
                    validation.touched.from_channel_no &&
                      validation.errors.from_channel_no
                      ? true
                      : false
                  }
                />
                {validation.touched.from_channel_no &&
                  validation.errors.from_channel_no ? (
                  <FormFeedback type="invalid">
                    {validation.errors.from_channel_no}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
            <Col sm="3">
              <div className="mb-3">
                <Label className="form-label">
                  Code<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="code"
                  type="text"
                  placeholder="Enter code"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.code || ""}
                  invalid={
                    validation.touched.code && validation.errors.code
                      ? true
                      : false
                  }
                />
                {validation.touched.code && validation.errors.code ? (
                  <FormFeedback type="invalid">
                    {validation.errors.code}
                  </FormFeedback>
                ) : null}
              </div>

              <div className="mb-3">
                <Label className="form-label">
                  To Channel<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="to_channel_no"
                  type="text"
                  placeholder="Enter to channel"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.to_channel_no || ""}
                  invalid={
                    validation.touched.to_channel_no &&
                      validation.errors.to_channel_no
                      ? true
                      : false
                  }
                />
                {validation.touched.to_channel_no &&
                  validation.errors.to_channel_no ? (
                  <FormFeedback type="invalid">
                    {validation.errors.to_channel_no}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
            <Col sm="3">
              <div className="mb-3">
                <Label className="form-label">
                  Status<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="status"
                  type="select"
                  placeholder="Select status"
                  className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.status || ""}
                >
                  <option value="">Select status</option>
                  <option value="Active">Active</option>
                  <option value="In_Active">In-Active</option>
                </Input>
                {validation.touched.status && validation.errors.status ? (
                  <FormFeedback type="invalid">
                    {validation.errors.status}
                  </FormFeedback>
                ) : null}
              </div>

              <div className="mb-3">
                <Label className="form-label">
                  Is Refundable<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="is_refundable"
                  type="select"
                  placeholder="Select refundable"
                  className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.is_refundable || ""}
                >
                  <option value="">Select refundable</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </Input>
                {validation.touched.is_refundable &&
                  validation.errors.is_refundable ? (
                  <FormFeedback type="invalid">
                    {validation.errors.is_refundable}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
            <Col sm="3">
              <div className="mb-3">
                <Label className="form-label">
                  Calculate per channel<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="calculate_per_channel"
                  type="select"
                  placeholder="Select calculate per channel"
                  className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.calculate_per_channel || ""}
                >
                  <option value="">Select calculate per channel</option>
                  <option value="0">Yes</option>
                  <option value="1">No</option>
                </Input>
                {validation.touched.calculate_per_channel &&
                  validation.errors.calculate_per_channel ? (
                  <FormFeedback type="invalid">
                    {validation.errors.calculate_per_channel}
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
                marginBottom: "18px",
                zIndex: 12000,
                backgroundColor: "#fff",
                width: "fit-content",
                marginLeft: "40%",
                position: "absolute",
                padding: "0px 10px",
              }}
            >
              <p style={{ fontWeight: "bold" }}>Default NCF</p>
            </div>
            <Row
              style={{
                position: "relative",
                border: "1px solid #ced4da",
                padding: "20px 0px",
                margin: "30px 0px",
              }}
            >
              <Col sm="4">
                <div className="mb-3">
                  <Label className="form-label">
                    MRP (INR)<span style={{ color: "red" }}>*</span>
                  </Label>
                  <Input
                    name="mrp"
                    type="number"
                    placeholder="0"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.mrp || ""}
                    invalid={
                      validation.touched.mrp && validation.errors.mrp
                        ? true
                        : false
                    }
                  />
                  {validation.touched.mrp && validation.errors.mrp ? (
                    <FormFeedback type="invalid">
                      {validation.errors.mrp}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Col sm="4">
                <div className="mb-3">
                  <Label className="form-label">
                    LCO Discount (%)<span style={{ color: "red" }}>*</span>
                  </Label>
                  <Input
                    name="lmo_discount"
                    type="number"
                    placeholder="0"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.lmo_discount || ""}
                    invalid={
                      validation.touched.lmo_discount &&
                        validation.errors.lmo_discount
                        ? true
                        : false
                    }
                  />
                  {validation.touched.lmo_discount &&
                    validation.errors.lmo_discount ? (
                    <FormFeedback type="invalid">
                      {validation.errors.lmo_discount}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Col sm="4">
                <div className="mb-3">
                  <Label className="form-label">
                    LCO Rate<span style={{ color: "red" }}>*</span>
                  </Label>
                  <Input
                    name="lmo_rate"
                    type="number"
                    placeholder="0"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.mrp || ""}
                    invalid={
                      validation.touched.lmo_rate && validation.errors.lmo_rate
                        ? true
                        : false
                    }
                  />
                  {validation.touched.lmo_rate && validation.errors.lmo_rate ? (
                    <FormFeedback type="invalid">
                      {validation.errors.lmo_rate}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
            </Row>
          </Row>
          <Row>
            <div
              style={{
                // margin: "20px 0px",
                marginTop: "20px",
                marginBottom: "18px",
                zIndex: 12000,
                backgroundColor: "#fff",
                width: "fit-content",
                marginLeft: "40%",
                position: "absolute",
                padding: "0px 10px",
              }}
            >
              <p style={{ fontWeight: "bold" }}>Add Mutiple NCF Rates</p>
            </div>
            <Row
              style={{
                position: "relative",
                border: "1px solid #ced4da",
                padding: "20px 0px",
                margin: "30px 0px",
              }}
            >
              <Col sm="2">
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
                  />
                  {validation.touched.name && validation.errors.name ? (
                    <FormFeedback type="invalid">
                      {validation.errors.name}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Col sm="2">
                <div className="mb-3">
                  <Label className="form-label">
                    MRP (INR)<span style={{ color: "red" }}>*</span>
                  </Label>
                  <Input
                    name="mrp"
                    type="number"
                    placeholder="0"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.mrp || ""}
                    invalid={
                      validation.touched.mrp && validation.errors.mrp
                        ? true
                        : false
                    }
                  />
                  {validation.touched.mrp && validation.errors.mrp ? (
                    <FormFeedback type="invalid">
                      {validation.errors.mrp}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Col sm="2">
                <div className="mb-3">
                  <Label className="form-label">
                    LCO Discount (%)<span style={{ color: "red" }}>*</span>
                  </Label>
                  <Input
                    name="lmo_discount"
                    type="number"
                    placeholder="0"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.lmo_discount || ""}
                    invalid={
                      validation.touched.lmo_discount &&
                        validation.errors.lmo_discount
                        ? true
                        : false
                    }
                  />
                  {validation.touched.lmo_discount &&
                    validation.errors.lmo_discount ? (
                    <FormFeedback type="invalid">
                      {validation.errors.lmo_discount}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Col sm="2">
                <div className="mb-3">
                  <Label className="form-label">
                    LCO Rate<span style={{ color: "red" }}>*</span>
                  </Label>
                  <Input
                    name="lmo_rate"
                    type="number"
                    placeholder="0"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.mrp || ""}
                    invalid={
                      validation.touched.lmo_rate && validation.errors.lmo_rate
                        ? true
                        : false
                    }
                  />
                  {validation.touched.lmo_rate && validation.errors.lmo_rate ? (
                    <FormFeedback type="invalid">
                      {validation.errors.lmo_rate}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Col sm="2">
                <div className="mb-3">
                  <Label className="form-label">
                    Calculate per channel<span style={{ color: "red" }}>*</span>
                  </Label>
                  <Input
                    name="calculate_per_channel"
                    type="select"
                    placeholder="Select calculate per channel"
                    className="form-select"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.calculate_per_channel || ""}
                  >
                    <option value="">Select calculate per channel</option>
                    <option value="0">Yes</option>
                    <option value="1">No</option>
                  </Input>
                  {validation.touched.calculate_per_channel &&
                    validation.errors.calculate_per_channel ? (
                    <FormFeedback type="invalid">
                      {validation.errors.calculate_per_channel}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Col sm="2">
                <div className="mb-3">
                  <Label className="form-label">
                    Is Refundable<span style={{ color: "red" }}>*</span>
                  </Label>
                  <Input
                    name="is_refundable"
                    type="select"
                    placeholder="Select refundable"
                    className="form-select"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.is_refundable || ""}
                  >
                    <option value="">Select refundable</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </Input>
                  {validation.touched.is_refundable &&
                    validation.errors.is_refundable ? (
                    <FormFeedback type="invalid">
                      {validation.errors.is_refundable}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
              <AddMultipleNcf />
            </Row>
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
    </Modal>
  );
};

AddNewNcf.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default AddNewNcf;
