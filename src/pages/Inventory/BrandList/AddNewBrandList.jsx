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
import { getBrandList as onGetBrandList } from "/src/store/actions";

const AddNewBrandList = (props) => {
  const { isOpen, handleAddBrand, brandBoxType, brandBrandType, brandCasType, brandCharacters, brandStatus } = props;
  const dispatch = useDispatch();

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      name: "",
      //   code: "",
      type: "",
      // type: "",
      length: "",
      significant_length: "",
      char_allowed: "",
      cas_id: "",
      status: "",
      created_at: "",
      created_by: "my mso(mso)",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Enter name"),
      // box_type_lbl: Yup.string().required("Select box type"),
      type: Yup.string().required("Select brand"),
      cas_id: Yup.string().required("Select CAS"),
      length: Yup.string().required("Enter character length"),
      significant_length: Yup.string().required("Enter significant length"),
      char_allowed: Yup.string().required("Enter allowed characters"),
      status: Yup.string().required("Select status"),
    }),
    onSubmit: (values) => {
      const newBrand = {
        id: Math.floor(Math.random() * (30 - 20)) + 20,
        name: values["name"],
        // box_type_lbl: values["type"],
        type: parseInt(values["type"]),
        status: values["status"],
        cas_id: values["cas_id"],
        length: values["length"],
        significant_length: parseInt(values["significant_length"]),
        char_allowed: values["char_allowed"],
        created_at: new Date(),
        created_by: values["created_by"],
      };
      console.log("New Brand:" + JSON.stringify(newBrand));
      // save new user
      dispatch(onAddBrandList(newBrand));
      dispatch(onGetBrandList());
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
                  Brand Name<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="name"
                  type="text"
                  placeholder="Enter brand name"
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
                  name="type"
                  type="select"
                  placeholder="Select brand type"
                  className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.type || ""}
                  invalid={
                    validation.touched.type && validation.errors.type
                      ? true
                      : false
                  }
                >
                  <option value="">Select brand type</option>
                  {brandBrandType &&
                    brandBrandType.map((type) => (
                      <option key={type.id} value={type.id}>
                        {type.name}
                      </option>
                    ))}
                </Input>
                {validation.touched.type &&
                  validation.errors.type ? (
                  <FormFeedback type="invalid">
                    {validation.errors.type}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
            {console.log("Brand Type: " + validation.values.type)}
            {console.log(
              "Brand type: " + typeof validation.values.type
            )}
            <Col sm="4">
              <div className="mb-3">
                <Label className="form-label">
                  Box Type<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="type"
                  type="select"
                  placeholder="Select box type"
                  className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.type || ""}
                  invalid={
                    validation.touched.type && validation.errors.type
                      ? true
                      : false
                  }
                >
                  <option value="">Select box type</option>
                  {brandBoxType &&
                    brandBoxType.map((type) => (
                      <option key={type.id} value={type.id}>
                        {type.name}
                      </option>
                    ))}
                </Input>
                {validation.touched.type &&
                  validation.errors.type ? (
                  <FormFeedback type="invalid">
                    {validation.errors.type}
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
                  name="cas_id"
                  type="select"
                  placeholder="Select CAS"
                  className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.cas_id || ""}
                  invalid={
                    validation.touched.cas_id && validation.errors.cas_id
                      ? true
                      : false
                  }
                >
                  <option value="">Select Cas</option>
                  {brandCasType &&
                    brandCasType.map((cas_id) => (
                      <option key={cas_id.id} value={cas_id.id}>
                        {cas_id.name}
                      </option>
                    ))}
                </Input>
                {validation.touched.cas_id && validation.errors.cas_id ? (
                  <FormFeedback type="invalid">
                    {validation.errors.cas_id}
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
                  name="char_allowed"
                  type="select"
                  placeholder="Select allowed characters"
                  className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.char_allowed || ""}
                  invalid={
                    validation.touched.char_allowed && validation.errors.char_allowed
                      ? true
                      : false
                  }
                >
                  <option value="">Select allowed characters</option>
                  {brandCharacters &&
                    brandCharacters.map((char_allowed) => (
                      <option key={char_allowed.id} value={char_allowed.id}>
                        {char_allowed.name}
                      </option>
                    ))}
                </Input>
                {validation.touched.char_allowed &&
                  validation.errors.char_allowed ? (
                  <FormFeedback type="invalid">
                    {validation.errors.char_allowed}
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
                  invalid={
                    validation.touched.status && validation.errors.status
                      ? true
                      : false
                  }
                >
                  <option value="">Select Status</option>
                  {brandStatus &&
                    brandStatus.map((status) => (
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
    </Modal >
  );
};

AddNewBrandList.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,

  brandBoxType: PropTypes.array,
  brandBrandType: PropTypes.array,
  brandCasType: PropTypes.array,
  brandCharacters: PropTypes.array,
  brandStatus: PropTypes.array,
};

export default AddNewBrandList;
