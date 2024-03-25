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
import { updateTax as onUpdateTax } from "/src/store/taxlist/actions";

const ViewTaxList = (props) => {
  const { isOpen, resetSelection, toggleViewModal, tax, taxValues, taxStatus, taxTaxOnTax, taxApply } = props;
  console.log("View in  Tax List :" + JSON.stringify(tax));
  const dispatch = useDispatch();
  const [showEditTax, setShowEditTax] = useState(false);

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      id: (tax && tax.id) || "",
      name: (tax && tax.name) || "",
      code: (tax && tax.code) || "",
      status: (tax && tax.status) || "",
      taxvalue: (tax && tax.taxvalue) || "",
      valuetype_lbl: (tax && tax.valuetype_lbl) || "",
      parent_id: (tax && tax.parent_id) || "",
      applicableon: (tax && tax.applicableon) || "",
      description: (tax && tax.description) || "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required("Enter title")
        .min(2, "Minimum length 2 character"),
      code: Yup.string().
        required("Enter code")
        .min(2, "Minimum length 2 character"),
      taxvalue: Yup.string().required("Exter tax Value"),
    }),
    onSubmit: (values) => {
      const applicableonArray = values["applicableon"] || [];
      const applicableonIntegers = applicableonArray.map((option) =>
        parseInt(option)
      );

      const updateTax = {
        id: tax.id,
        name: values.name,
        code: values.code,
        status: values.status,
        taxvalue: values.taxvalue,
        valuetype_lbl: values.valuetype_lbl,
        parent_id: values.parent_id,
        applicableon: applicableonIntegers,
        description: values.description,
      };

      // update user
      dispatch(onUpdateTax(updateTax));
      validation.resetForm();
      toggleViewModal();
      resetSelection();
    },
  });

  const handleCancel = () => {
    setShowEditTax(false);
    resetSelection();
    toggleViewModal();
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
          {!showEditTax
            ? `View ${(tax && tax.name) || ""}`
            : `Edit ${(tax && tax.name) || ""}`}
        </ModalHeader>
        {!showEditTax && (
          <Link
            style={{
              position: "absolute",
              marginLeft: "92%",
              marginTop: "1%",
            }}
            to="#!"
            className="btn btn-light me-1"
            onClick={() => setShowEditTax(true)}
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
              <Col sm="4">
                <div className="mb-3">
                  <Label className="form-label">
                    Tax Title<span style={{ color: "red" }}>*</span>
                  </Label>
                  <Input
                    name="name"
                    type="text"
                    placeholder="Enter tax title"
                    // className="form-select"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.name || ""}
                    disabled={!showEditTax}
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
              <Col sm="4">
                <div className="mb-3">
                  <Label className="form-label">
                    Tax Code<span style={{ color: "red" }}>*</span>
                  </Label>
                  <Input
                    name="code"
                    type="text"
                    placeholder="Enter tax code"
                    // className="form-select"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.code || ""}
                    disabled={!showEditTax}
                    invalid={
                      validation.touched.name &&
                        validation.errors.name
                        ? true
                        : false
                    }
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
                    disabled={!showEditTax}
                  >
                    {taxStatus.map((status) => (
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
                    disabled={!showEditTax}
                    invalid={
                      validation.touched.name &&
                        validation.errors.name
                        ? true
                        : false
                    }
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
                    Value In
                  </Label>
                  <Input
                    name="valuetype_lbl"
                    type="select"
                    placeholder="In Percent"
                    // className="form-select"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.valuetype_lbl || ""}
                    disabled={!showEditTax}
                  >
                    {taxValues.map((valuetype_lbl) => (
                      <option key={valuetype_lbl.id} value={valuetype_lbl.id}>
                        {valuetype_lbl.name}
                      </option>
                    ))}
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
                  <Label className="form-label">
                    TaxOn Tax
                  </Label>
                  <Input
                    name="parent_id"
                    type="select"
                    placeholder=""
                    className="form-select"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.parent_id || ""}
                    disabled={!showEditTax}
                  >
                    {taxTaxOnTax.map((parent_id) => (
                      <option key={parent_id.id} value={parent_id.id}>
                        {parent_id.name}
                      </option>
                    ))}
                  </Input>
                  {validation.touched.parent_id &&
                    validation.errors.parent_id ? (
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
                    placeholder=""
                    className="form-select"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.applicableon || []}
                    disabled={!showEditTax}
                    multiple
                    invalid={
                      validation.touched.applicableon &&
                        validation.errors.applicableon
                        ? true
                        : false
                    }
                  >
                    {taxApply.map((applicableon) => (
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
                    Description
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
                    disabled={!showEditTax}
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
            {showEditTax && (
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

ViewTaxList.propTypes = {
  toggleViewModal: PropTypes.func,
  resetSelection: PropTypes.func,
  isOpen: PropTypes.bool,

  tax: PropTypes.object,
  taxApply: PropTypes.array,
  taxStatus: PropTypes.array,
  taxTaxOnTax: PropTypes.array,
  taxValues: PropTypes.array,
  taxvalue: PropTypes.array,
};

export default ViewTaxList;
