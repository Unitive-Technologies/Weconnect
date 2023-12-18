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
  ModalFooter,
  FormFeedback,
  UncontrolledTooltip,
  Input,
  Form,
} from "reactstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import { addNewComplaintCategory as onAddNewComplaintCategory } from "/src/store/complaintcategorylist/actions";
import { useSelector, useDispatch } from "react-redux";

const AddNewComplaintCategoryList = (props) => {
  const { isOpen, toggle, complaintcategory } = props;
  const dispatch = useDispatch();
  const [user, setUser] = useState();

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      //BroadCaster: "",
      name: "",
      status_lbl: "",
      showonweb_lbl: "",
      description: "",
      created_at: "",
      created_by: "Admin",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Enter category name"),
      status_lbl: Yup.string().required("Select status"),
      showonweb_lbl: Yup.string().required("Select show on portal"),
      description: Yup.string().required("Enter description"),

    }),
    onSubmit: (values) => {
      const newComplaintCategory = {
        id: Math.floor(Math.random() * (30 - 20)) + 20,
        name: values["name"],
        status_lbl: values["status_lbl"],
        showonweb_lbl: values["showonweb_lbl"],
        description: values["description"],
        created_at: new Date(),
        created_by: values["created_by"],
      };
      console.log("newComplaintCategory:" + newComplaintCategory);
      // save new user
      dispatch(onAddNewComplaintCategory(newComplaintCategory));
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
      size="xl"
      role="dialog"
      autoFocus={true}
      centered={true}
      className="exampleModal"
      tabIndex="-1"
      toggle={toggle}
    >
      <ModalHeader tag="h4" toggle={toggle}>Add New Complaint Category</ModalHeader>
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
                {validation.touched.status_lbl && validation.errors.status_lbl ? (
                  <FormFeedback type="invalid">
                    {validation.errors.status_lbl}
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
                  <option value="11">Select to show on portal</option>
                  <option value="12">Active</option>
                  <option value="13">In-Active</option>
                </Input>
                {validation.touched.showonweb_lbl && validation.errors.showonweb_lbl ? (
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
                    toggle();
                  }}
                >
                  Cancel
                </button>
              </ModalFooter>
            </Col>
          </Row>
        </Form>
      </ModalBody>
      {/* </Modal> */}
    </Modal >
  );
};

AddNewComplaintCategoryList.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default AddNewComplaintCategoryList;
