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
import { getTax as onGetTax } from "/src/store/actions";

const AddNewTaxList = (props) => {
  const { isOpen, handleAddTax, taxValues, taxStatus, taxTaxOnTax, taxApply } =
    props;

  const dispatch = useDispatch();

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      // tax: "",
      name: "",
      code: "",
      status: "",
      taxvalue: "",
      valuetype: "",
      parent_id: "",
      applicableon: "",
      description: "",
      created_at: "",
      created_by: "Admin",
    },
    validationSchema: Yup.object({
      // tax: Yup.string().required("Enter tax Name"),
      name: Yup.string().required("Enter tax title"),
      code: Yup.string().required("Enter tax code"),
      status: Yup.string().required("Select status"),
      taxvalue: Yup.string().required("Exter Tax Value"),
      valuetype: Yup.string().required("Select value-in"),
      parent_id: Yup.string().required(""),
      // applicableon: Yup.string().required(""),
      applicableon: Yup.array().required(
        "Select at least one Applicable On option"
      ),
      description: Yup.string().required("Enter description"),
    }),
    onSubmit: (values) => {
      const applicableonArray = values["applicableon"] || [];
      const applicableonIntegers = applicableonArray.map((option) =>
        parseInt(option)
      );

      const newTaxList = {
        id: Math.floor(Math.random() * (30 - 20)) + 20,
        name: values["name"],
        code: values["code"],
        status: values["status"],
        taxvalue: values["taxvalue"],
        valuetype: values["valuetype"],
        parent_id: parseInt(values["parent_id"]),
        applicableon: applicableonIntegers,
        // applicableon: values["applicableon"],
        description: values["description"],
        created_at: new Date(),
        created_by: parseInt(values["created_by"]),
      };
      console.log("newTaxList:" + newTaxList);
      {
        console.log("parent type: " + typeof newTaxList.parent_id);
        console.log("value type: " + typeof newTaxList.valuetype);
      }
      // save new user
      dispatch(onAddNewTaxList(newTaxList));
      dispatch(onGetTax());
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
                  name="status"
                  type="select"
                  placeholder="Select Status"
                  className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.status || ""}
                >
                  <option value="">Select Status</option>
                  {taxStatus &&
                    taxStatus.map((status) => (
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
                  name="valuetype"
                  type="select"
                  placeholder="Select value-in"
                  className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.valuetype || ""}
                >
                  <option value="">Select value-in</option>
                  {taxValues &&
                    taxValues.map((valuetype) => (
                      <option key={valuetype.id} value={valuetype.id}>
                        {valuetype.name}
                      </option>
                    ))}
                </Input>
                {validation.touched.valuetype && validation.errors.valuetype ? (
                  <FormFeedback type="invalid">
                    {validation.errors.valuetype}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
            <Col sm="4">
              <div className="mb-3">
                <Label className="form-label">TaxOn Tax</Label>
                <Input
                  name="parent_id"
                  type="select"
                  placeholder="Select value-in"
                  className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.parent_id || ""}
                >
                  <option value="">No Parent</option>
                  {taxTaxOnTax &&
                    taxTaxOnTax.map((parent_id) => (
                      <option key={parent_id.id} value={parent_id.id}>
                        {parent_id.name}
                      </option>
                    ))}
                </Input>
                {validation.touched.parent_id && validation.errors.parent_id ? (
                  <FormFeedback type="invalid">
                    {validation.errors.parent_id}
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
                  name="applicableon"
                  type="select"
                  placeholder="Select Applicable On"
                  className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.applicableon || []}
                  multiple
                >
                  <option value=""></option>
                  {taxApply &&
                    taxApply.map((applicableon) => (
                      <option key={applicableon.id} value={applicableon.id}>
                        {applicableon.name}
                      </option>
                    ))}
                </Input>
                {validation.touched.applicableon &&
                  validation.errors.applicableon ? (
                  <FormFeedback type="invalid">
                    {validation.errors.applicableon}
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
