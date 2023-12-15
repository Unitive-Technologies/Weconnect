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
            <Col sm="12">
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
                  Brand Type<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="brand_type_lbl"
                  type="select"
                  placeholder="Select brand type"
                  className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.brand_type_lbl || ""}
                >
                  <option value="">Select brand type</option>
                  <option value="STB">STB</option>
                  <option value="Smartcard">Smartcard</option>
                </Input>
                {validation.touched.brand_type_lbl &&
                validation.errors.brand_type_lbl ? (
                  <FormFeedback type="invalid">
                    {validation.errors.brand_type_lbl}
                  </FormFeedback>
                ) : null}
              </div>

              <div className="mb-3">
                <Label className="form-label">
                  Box Type<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="box_type_lbl"
                  type="select"
                  placeholder="Select box type"
                  className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.box_type_lbl || ""}
                >
                  <option value="">Select box type</option>
                  <option value="SD">Standard Definition(SD)</option>
                  <option value="HD">High Definition(HD)</option>
                </Input>
                {validation.touched.box_type_lbl &&
                validation.errors.box_type_lbl ? (
                  <FormFeedback type="invalid">
                    {validation.errors.box_type_lbl}
                  </FormFeedback>
                ) : null}
              </div>

              <div className="mb-3">
                <Label className="form-label">
                  CAS Type<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="cas_lbl"
                  type="select"
                  placeholder="Select CAS"
                  className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.cas_lbl || ""}
                >
                  <option value="">Select CAS</option>
                  <option value="NSTV">NSTV</option>
                </Input>
                {validation.touched.cas_lbl && validation.errors.cas_lbl ? (
                  <FormFeedback type="invalid">
                    {validation.errors.cas_lbl}
                  </FormFeedback>
                ) : null}
              </div>

              <div className="mb-3">
                <Label className="form-label">
                  Character Length<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="length"
                  type="text"
                  placeholder="Enter character length"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.length || ""}
                  invalid={
                    validation.touched.length && validation.errors.length
                      ? true
                      : false
                  }
                />
                {validation.touched.length && validation.errors.length ? (
                  <FormFeedback type="invalid">
                    {validation.errors.length}
                  </FormFeedback>
                ) : null}
              </div>

              <div className="mb-3">
                <Label className="form-label">
                  Significant Length<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="significant_length"
                  type="text"
                  placeholder="Enter significant length"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.significant_length || ""}
                  invalid={
                    validation.touched.significant_length &&
                    validation.errors.significant_length
                      ? true
                      : false
                  }
                />
                {validation.touched.significant_length &&
                validation.errors.significant_length ? (
                  <FormFeedback type="invalid">
                    {validation.errors.significant_length}
                  </FormFeedback>
                ) : null}
              </div>

              <div className="mb-3">
                <Label className="form-label">
                  Allowed Characters<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="char_allowed_lbl"
                  type="select"
                  placeholder="Select allowed characters"
                  className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.char_allowed_lbl || ""}
                >
                  <option value="">Select allowed characters</option>
                  <option value="Numeric">Numeric</option>
                  <option value="Alphabets">Alphabets</option>
                  <option value="Hexadecimal">Hexadecimal</option>
                  <option value="Alphanumeric">Alphanumeric</option>
                </Input>
                {validation.touched.char_allowed_lbl &&
                validation.errors.char_allowed_lbl ? (
                  <FormFeedback type="invalid">
                    {validation.errors.char_allowed_lbl}
                  </FormFeedback>
                ) : null}
              </div>

              <div className="mb-3">
                <Label className="form-label">
                  Status<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="status"
                  type="select"
                  placeholder="Select Status"
                  className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.status || ""}
                >
                  <option value="">Select status</option>
                  <option value="Active">Active</option>
                  <option value="blocked">BLOCKED</option>
                  <option value="In_Active">In-Active</option>
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

AddNewNcf.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default AddNewNcf;
