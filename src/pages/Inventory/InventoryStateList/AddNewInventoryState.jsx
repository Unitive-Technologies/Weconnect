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
import { addInventoryStateList as onAddInventoryStateList } from "/src/store/inventorystate/actions";
import { useSelector, useDispatch } from "react-redux";

const AddNewInventoryState = (props) => {
  const { isOpen, toggle } = props;
  const dispatch = useDispatch();

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      name: "",
      code: "",
      state_type_lbl: "",
      status: "",
      description: "",
      created_at: "",
      created_by: "my mso(mso)",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Enter name"),
      code: Yup.string().required("Enter code"),
      state_type_lbl: Yup.string().required("Select state type"),
      description: Yup.string().required("Enter description"),
      status: Yup.string().required("Select status"),
    }),
    onSubmit: (values) => {
      const newInventoryState = {
        id: Math.floor(Math.random() * (30 - 20)) + 20,
        name: values["name"],
        code: values["code"],
        state_type_lbl: values["state_type_lbl"],
        status: values["status"],
        description: values["description"],
        created_at: new Date(),
        created_by: values["created_by"],
      };
      console.log("New Inventory state:" + JSON.stringify(newInventoryState));
      dispatch(onAddInventoryStateList(newInventoryState));
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
        Add New Inventory State
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
                  State Type<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="state_type_lbl"
                  type="select"
                  placeholder="Select state type"
                  className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.state_type_lbl || ""}
                >
                  <option value="">Select state type</option>
                  <option value="release">Release</option>
                  <option value="mark faulty">Mark Faulty</option>
                  <option value="blacklist">Blacklist</option>
                </Input>
                {validation.touched.state_type_lbl &&
                validation.errors.state_type_lbl ? (
                  <FormFeedback type="invalid">
                    {validation.errors.state_type_lbl}
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
                  placeholder="Enter description"
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

AddNewInventoryState.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default AddNewInventoryState;
