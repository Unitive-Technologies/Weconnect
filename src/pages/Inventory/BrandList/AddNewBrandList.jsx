import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Col,
  Row,
  Modal,
  ModalFooter,
  ModalHeader,
  ModalBody,
  Label,
  FormFeedback,
  Input,
  Form,
} from "reactstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import { addBrandList as onAddBrandList } from "/src/store/brandlist/actions";
import { useDispatch } from "react-redux";

const AddNewBrandList = (props) => {
  const { isOpen, handleAddBrand } = props;
  const dispatch = useDispatch();

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      name: "",
      //   code: "",
      box_type_lbl: "",
      brand_type_lbl: "",
      length: "",
      significant_length: "",
      char_allowed_lbl: "",
      cas_lbl: "",
      status: "",
      created_at: "",
      created_by: "my mso(mso)",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Enter name"),
      box_type_lbl: Yup.string().required("Select box type"),
      brand_type_lbl: Yup.string().required("Select brand type"),
      cas_lbl: Yup.string().required("Select CAS"),
      length: Yup.string().required("Enter character length"),
      significant_length: Yup.string().required("Enter significant length"),
      char_allowed_lbl: Yup.string().required("Enter allowed characters"),
      status: Yup.string().required("Select status"),
    }),
    onSubmit: (values) => {
      const newBrand = {
        id: Math.floor(Math.random() * (30 - 20)) + 20,
        name: values["name"],
        box_type_lbl: values["box_type_lbl"],
        brand_type_lbl: values["brand_type_lbl"],
        status: values["status"],
        cas_lbl: values["cas_lbl"],
        length: values["length"],
        significant_length: values["significant_length"],
        char_allowed_lbl: values["char_allowed_lbl"],
        created_at: new Date(),
        created_by: values["created_by"],
      };
      console.log("New Brand:" + JSON.stringify(newBrand));
      // save new user
      dispatch(onAddBrandList(newBrand));
      validation.resetForm();
      handleAddBrand();
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
      size="xl"
      toggle={handleAddBrand}
    >
      <ModalHeader tag="h4" toggle={handleAddBrand}>
        Add New Brand
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
            <Col sm="4">
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
            <Col sm="4">
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
            </Col>
            <Col sm="4">
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
            </Col>
          </Row>
          <Row>
            <Col sm="4">
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
            </Col>
            <Col sm="4">
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
            </Col>
            <Col sm="4">
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
            </Col>
          </Row>
          <Row>
            <Col sm="4">
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
            </Col>
            <Col sm="4">
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
            <Col sm="4"></Col>
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
                    handleAddBrand();
                  }}
                >
                  Cancel
                </button>
              </ModalFooter>
            </Col>
          </Row>
        </Form>
      </ModalBody>
    </Modal>
  );
};

AddNewBrandList.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default AddNewBrandList;
