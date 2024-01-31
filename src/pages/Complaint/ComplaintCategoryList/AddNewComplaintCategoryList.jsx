import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Col,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
  ModalFooter,
  FormFeedback,
  Input,
  Form,
} from "reactstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import { addNewComplaintCategory as onAddNewComplaintCategory } from "/src/store/complaintcategorylist/actions";
import { useDispatch } from "react-redux";
import { getComplaintCategory as onGetComplaintCategory } from "/src/store/actions";

const AddNewComplaintCategoryList = (props) => {
  const { isOpen, toggleAddModal, complaintcateStatus } = props;
  const dispatch = useDispatch();

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      //BroadCaster: "",
      name: "",
      status: "",
      showonweb_lbl: "",
      description: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Enter category name"),
      status: Yup.string().required("Select status"),
      showonweb_lbl: Yup.string().required("Select show on portal"),
      description: Yup.string().required("Enter description"),
    }),
    onSubmit: (values) => {
      const newComplaintCategory = {
        name: values["name"],
        status: parseInt(values["status"]),
        showonweb: parseInt(values["showonweb_lbl"]),
        description: values["description"],
      };
      console.log("newComplaintCategory:" + newComplaintCategory);
      // save new user
      dispatch(onAddNewComplaintCategory(newComplaintCategory));
      // dispatch(onGetComplaintCategory());
      validation.resetForm();
      toggleAddModal();
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
      toggle={toggleAddModal}
    >
      <ModalHeader tag="h4" toggle={toggleAddModal}>
        Add New Complaint Category
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
                  placeholder="Enter Category name"
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
                  {complaintcateStatus &&
                    complaintcateStatus.map((status) => (
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

            <Col sm="4">
              <div className="mb-3">
                <Label className="form-label">
                  Show on-Portal<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="showonweb_lbl"
                  type="select"
                  placeholder="Select to show on portal"
                  className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.showonweb_lbl || ""}
                >
                  <option value="">Select to show on portal</option>
                  <option value="1">Active</option>
                  <option value="0">In-Active</option>
                </Input>
                {validation.touched.showonweb_lbl &&
                validation.errors.showonweb_lbl ? (
                  <FormFeedback type="invalid">
                    {validation.errors.showonweb_lbl}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
          </Row>
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
                    toggleAddModal();
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

AddNewComplaintCategoryList.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default AddNewComplaintCategoryList;
