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
// import { addNewTaxList as onAddNewTaxList } from "/src/store/taxlist/actions";
import { useSelector, useDispatch } from "react-redux";

const AddNewTaxList = (props) => {
  const { isOpen, toggle } = props;
  const dispatch = useDispatch();
  const [user, setUser] = useState();

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      //BroadCaster: "",
      title: "",
      code: "",
      status: "",
      taxvalue: "",
      valuein: "",
      taxontax: "",
      applicable: "",
      description: "",
      created_at: "",
      created_by: "Admin",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Enter tax title"),
      code: Yup.string().required("Enter tax code"),
      status: Yup.string().required("Select status"),
      taxvalue: Yup.string().required("Exter Tax Value"),
      valuein: Yup.string().required("Select value-in"),
      taxontax: Yup.string().required(""),
      applicable: Yup.string().required(""),
      description: Yup.string().required("Enter description"),
    }),
    onSubmit: (values) => {
      const newTaxList = {
        id: Math.floor(Math.random() * (30 - 20)) + 20,
        title: values["title"],
        code: values["code"],
        status: values["status"],
        taxvalue: values["taxvalue"],
        valuein: values["valuein"],
        taxontax: values["taxontax"],
        applicable: values["applicable"],
        description: values["description"],
        created_at: new Date(),
        created_by: values["created_by"],
      };
      console.log("newTaxList:" + newTaxList);
      // save new user
      dispatch(onAddNewTaxList(newTaxList));
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
      <ModalHeader tag="h4">Add New Tax</ModalHeader>
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
                  Title<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="title"
                  type="text"
                  placeholder="Enter title"
                  // className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.title || ""}
                ></Input>
                {validation.touched.title && validation.errors.title ? (
                  <FormFeedback type="invalid">
                    {validation.errors.title}
                  </FormFeedback>
                ) : null}
              </div>

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

AddNewTaxList.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default AddNewTaxList;
