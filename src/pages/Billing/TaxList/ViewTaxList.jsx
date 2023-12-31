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
import { addNewTaxList as onAddNewTaxList } from "/src/store/taxlist/actions";

const ViewTaxList = (props) => {
  const { isOpen, handleViewTax, tax } = props;
  //   console.log("user in viewuser modal:" + JSON.stringify(user));
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
      parent_lbl: (tax && tax.parent_lbl) || "",
      applicable: (tax && tax.applicable) || "",
      description: (tax && tax.description) || "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Enter tax title"),
      code: Yup.string().required("Enter tax code"),
      status: Yup.string().required("Select status"),
      taxvalue: Yup.string().required("Exter Tax Value"),
      valuetype_lbl: Yup.string().required("Select value-in"),
      parent_lbl: Yup.string().required(""),
      applicable: Yup.string().required(""),
      description: Yup.string().required("Enter description"),
    }),
    onSubmit: (values) => {
      const newTaxList = {
        id: tax.id,
        name: values.name,
        code: values.code,
        status: values.status,
        taxvalue: values.taxvalue,
        valuetype_lbl: values.valuetype_lbl,
        parent_lbl: values.parent_lbl,
        applicable: values.applicable,
        description: values.description,
      };

      // update user
      dispatch(onAddNewTaxList(newTaxList));
      validation.resetForm();
      handleViewTax();
    },
  });

  const handleCancel = () => {
    setShowEditTax(false);
    handleViewTax();
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
                    <option value="101">Select Status</option>
                    <option value="102">Active</option>
                    <option value="103">In-Active</option>
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
                    name="valuetype_lbl"
                    type="select"
                    placeholder="In Percent"
                    // className="form-select"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.valuetype_lbl || ""}
                  ></Input>
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
                    TaxOnTax<span style={{ color: "red" }}>*</span>
                  </Label>
                  <Input
                    name="parent_lbl"
                    type="select"
                    placeholder=""
                    className="form-select"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.parent_lbl || ""}
                  ></Input>
                  {validation.touched.parent_lbl &&
                  validation.errors.parent_lbl ? (
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
                    placeholder=""
                    className="form-select"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.applicable || ""}
                  ></Input>
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
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default ViewTaxList;
