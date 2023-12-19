import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Col,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
  FormFeedback,
  Input,
  Form,
} from "reactstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import { addNewTaxList as onAddNewTaxList } from "/src/store/taxlist/actions";
import { useDispatch } from "react-redux";

const AddNewTaxList = (props) => {
  const { isOpen, handleAddTax } = props;
  const dispatch = useDispatch();

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      //BroadCaster: "",
      name: "",
      code: "",
      status_lbl: "",
      taxvalue: "",
      valuetype_lbl: "",
      parent_lbl: "",
      applicable: "",
      description: "",
      created_at: "",
      created_by: "Admin",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Enter tax title"),
      code: Yup.string().required("Enter tax code"),
      status_lbl: Yup.string().required("Select status"),
      taxvalue: Yup.string().required("Exter Tax Value"),
      valuetype_lbl: Yup.string().required("Select value-in"),
      parent_lbl: Yup.string().required(""),
      applicable: Yup.string().required(""),
      description: Yup.string().required("Enter description"),
    }),
    onSubmit: (values) => {
      const newTaxList = {
        id: Math.floor(Math.random() * (30 - 20)) + 20,
        name: values["name"],
        code: values["code"],
        status_lbl: values["status_lbl"],
        taxvalue: values["taxvalue"],
        valuetype_lbl: values["valuetype_lbl"],
        parent_lbl: values["parent_lbl"],
        applicable: values["applicable"],
        description: values["description"],
        created_at: new Date(),
        created_by: values["created_by"],
      };
      console.log("newTaxList:" + newTaxList);
      // save new user
      dispatch(onAddNewTaxList(newTaxList));
      validation.resetForm();
      handleAddTax();
    },
    onReset: (values) => {
      validation.setValues(validation.initialValues);
    },
  });

  return (
    <Modal
      isOpen={isOpen}
      size="xl"
      role="dialog"
      autoFocus={true}
      centered={true}
      className="exampleModal"
      tabIndex="-1"
      toggle={handleAddTax}
    >
      <ModalHeader tag="h4" toggle={handleAddTax}>
        Add New Tax
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
                  Title<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="name"
                  type="text"
                  placeholder="Enter title"
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
            <Col sm="4">
              <div className="mb-3">
                <Label className="form-label">
                  Code<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="code"
                  type="text"
                  placeholder="Enter code"
                  // className="form-select"
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
            <Col sm="4">
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
          <Row>
            <Col sm="4">
              <div className="mb-3">
                <Label className="form-label">
                  Tax Value<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="taxvalue"
                  type="text"
                  placeholder="Enter tax value"
                  // className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.taxvalue || ""}
                ></Input>
                {validation.touched.taxvalue && validation.errors.taxvalue ? (
                  <FormFeedback type="invalid">
                    {validation.errors.taxvalue}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
            <Col sm="4">
              <div className="mb-3">
                <Label className="form-label">
                  Value In<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="valuetype_lbl"
                  type="select"
                  placeholder="Select value-in"
                  className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.valuetype_lbl || ""}
                >
                  <option value="101">No Parent</option>
                  <option value="102">SGST</option>
                  <option value="103">CGST</option>
                </Input>
                {validation.touched.valuetype_lbl &&
                validation.errors.valuetype_lbl ? (
                  <FormFeedback type="invalid">
                    {validation.errors.valuetype_lbl}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
            <Col sm="4">
              <div className="mb-3">
                <Label className="form-label">TaxOn Tax</Label>
                <Input
                  name="parent_lbl"
                  type="select"
                  placeholder="Select value-in"
                  className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.parent_lbl || ""}
                >
                  <option value="201">in Percent</option>
                  <option value="202">in Amount</option>
                </Input>
                {validation.touched.parent_lbl &&
                validation.errors.parent_lbll ? (
                  <FormFeedback type="invalid">
                    {validation.errors.parent_lbl}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
          </Row>
          <Row>
            <Col sm="4">
              <div className="mb-3">
                <Label className="form-label">
                  Applicable On<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="applicable"
                  type="select"
                  placeholder="Select Applicable On"
                  className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.applicable || ""}
                >
                  <option value="101">Subsctiption Charge</option>
                  <option value="102">Installation Charge</option>
                  <option value="103">Hardware Charge</option>
                  <option value="104">Rental Charge</option>
                  <option value="105">Debit/Credit Notes</option>
                  <option value="106">TDS</option>
                  <option value="107">Service Charge</option>
                  <option value="108">AGR Charge</option>
                </Input>
                {validation.touched.applicable &&
                validation.errors.applicable ? (
                  <FormFeedback type="invalid">
                    {validation.errors.applicable}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
            <Col sm="8">
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
                    handleAddTax();
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

AddNewTaxList.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default AddNewTaxList;
