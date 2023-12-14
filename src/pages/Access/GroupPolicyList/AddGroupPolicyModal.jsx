import React, { useState } from "react";
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
import { addNewGroupPolicy as onAddNewGroupPolicy } from "/src/store/grouppolicy/actions";
import { useSelector, useDispatch } from "react-redux";

const AddGroupPolicyModal = (props) => {
  const { isOpen, handleAddGroupPolicy } = props;
  const dispatch = useDispatch();
  const [user, setUser] = useState();

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      name: "",
      type: "",
      role: "",
      description: "",
      count: "",
      createdat: "",
      createdby: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please Enter Your Name"),
      type: Yup.string().required("Please Select Type"),
      role: Yup.string().required("Please Select Role"),
      description: Yup.string().required("Please Enter Description"),
      count: Yup.string().required("Please Enter Count"),
      createdat: Yup.string().required("Please Enter Created At"),
      createdby: Yup.string().required("Please Enter Created By"),
    }),
    onSubmit: (values) => {
      const newGroupPolicy = {
        id: Math.floor(Math.random() * (30 - 20)) + 20,
        name: values["name"],
        type: values["type"],
        role: values["role"],
        description: values["description"],
        count: values["count"],
        createdat: values["createdat"],
        createdby: values["createdby"],
      };
      console.log("newGroupPolicy:" + newGroupPolicy);
      // save new user
      dispatch(onAddNewGroupPolicy(newGroupPolicy));
      validation.resetForm();
      handleAddGroupPolicy();
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
      toggle={handleAddGroupPolicy}
    >
      <ModalHeader tag="h4" toggle={handleAddGroupPolicy}>
        Create Group Policy
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
            <Col lg={3}>
              <div className="mb-3">
                <Label className="form-label">
                  Name<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="name"
                  type="text"
                  placeholder="Insert Name"
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
            <Col lg={3}>
              <div className="mb-3">
                <Label className="form-label">
                  Operator Type<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="type"
                  type="select"
                  placeholder="Select User Type"
                  className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.type || ""}
                >
                  <option value="">Select User Type</option>
                  <option value="1">MSO</option>
                  <option value="2">RO</option>
                  <option value="3">Distributor</option>
                  <option value="4">LCO</option>
                </Input>
                {validation.touched.type && validation.errors.type ? (
                  <FormFeedback type="invalid">
                    {validation.errors.type}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
            <Col lg={3}>
              <div className="mb-3">
                <Label className="form-label">
                  Role Type<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="role"
                  type="select"
                  placeholder="Select Role"
                  className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.role || ""}
                >
                  <option value="">Select Role</option>
                  <option value="21">Administrator</option>
                  <option value="22">Staff</option>
                  <option value="23">User</option>
                </Input>
                {validation.touched.role && validation.errors.role ? (
                  <FormFeedback type="invalid">
                    {validation.errors.role}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
            <Col lg={3}>
              <div className="mb-3">
                <Label className="form-label">Description</Label>
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
            <Col sm="6">
              <div className="mb-3">
                <Label className="form-label">Count</Label>
                <Input
                  name="count"
                  label="Count"
                  type="text"
                  placeholder="Count"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.count || ""}
                  invalid={
                    validation.touched.count && validation.errors.count
                      ? true
                      : false
                  }
                />
                {validation.touched.count && validation.errors.count ? (
                  <FormFeedback type="invalid">
                    {validation.errors.count}
                  </FormFeedback>
                ) : null}
              </div>
              <div className="mb-3">
                <Label className="form-label">Created At</Label>
                <Input
                  name="createdat"
                  label="Created At"
                  type="text"
                  placeholder="Created At"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.createdat || ""}
                  invalid={
                    validation.touched.createdat && validation.errors.createdat
                      ? true
                      : false
                  }
                />
                {validation.touched.createdat && validation.errors.createdat ? (
                  <FormFeedback type="invalid">
                    {validation.errors.createdat}
                  </FormFeedback>
                ) : null}
              </div>
              <div className="mb-3">
                <Label className="form-label">Created By</Label>
                <Input
                  name="createdby"
                  label="Created By"
                  type="text"
                  placeholder="Created By"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.createdby || ""}
                  invalid={
                    validation.touched.createdby && validation.errors.createdby
                      ? true
                      : false
                  }
                />
                {validation.touched.createdby && validation.errors.createdby ? (
                  <FormFeedback type="invalid">
                    {validation.errors.createdby}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="text-end">
                <button type="submit" className="btn btn-success save-user">
                  Create
                </button>
              </div>
            </Col>
          </Row>
        </Form>
      </ModalBody>
    </Modal>
  );
};

AddGroupPolicyModal.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default AddGroupPolicyModal;
