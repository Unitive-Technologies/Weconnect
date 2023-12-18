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
  ModalFooter,
} from "reactstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import { addNewComplaintSubCategory as onAddNewComplaintSubCategory } from "/src/store/complaintsubcategorylist/actions";
import { useSelector, useDispatch } from "react-redux";
import AddNewMatrix from "./AddNewMatrix";

const AddNewSubCategoryList = (props) => {
  const { isOpen, toggle } = props;
  const dispatch = useDispatch();
  const [user, setUser] = useState();

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      //BroadCaster: "",
      name: "",
      category_lbl: "",
      status_lbl: "",
      showonweb_lbl: "",
      description: "",
      created_at: "",
      created_by: "Admin",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Enter name"),
      category_lbl: Yup.string().required("Select Category"),
      status_lbl: Yup.string().required("Select status"),
      showonweb_lbl: Yup.string().required("Select showonweb"),
      description: Yup.string().required("Enter description"),
    }),
    onSubmit: (values) => {
      const newComplaintSubCategory = {
        id: Math.floor(Math.random() * (30 - 20)) + 20,
        name: values["name"],
        category_lbl: values["category_lbl"],
        status_lbl: values["status_lbl"],
        showonweb_lbl: values["showonweb_lbl"],
        description: values["description"],
        created_at: new Date(),
        created_by: values["created_by"],
      };
      console.log(
        "ComplaintSubCategory:" + newComplaintSubCategory
      );
      // save new user
      dispatch(
        onAddNewComplaintSubCategory(newComplaintSubCategory)
      );
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
      size="xl"
      autoFocus={true}
      centered={true}
      className="exampleModal"
      tabIndex="-1"
      toggle={toggle}
    >
      {/* <Modal isOpen={modal} toggle={toggle}> */}
      <ModalHeader tag="h4" toggle={toggle}>Add New Complaint Sub-Category</ModalHeader>
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
                <Label className="form-label">Name<span style={{ color: 'red' }}>*</span></Label>
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
                <Label className="form-label">Category<span style={{ color: 'red' }}>*</span></Label>
                <Input
                  name="category_lbl"
                  type="select"
                  placeholder="Select Category"
                  className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.category_lbl || ""}
                >
                  <option value="101">Select Category</option>
                  <option value="102">STB Power Issue</option>
                </Input>
                {validation.touched.category_lbl && validation.errors.category_lbl ? (
                  <FormFeedback type="invalid">
                    {validation.errors.category_lbl}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
            <Col sm="4">

              <div className="mb-3">
                <Label className="form-label">Status<span style={{ color: 'red' }}>*</span></Label>
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
          </Row>
          <Row>
            <Col sm="4">
              <div className="mb-3">
                <Label className="form-label">Show on Web<span style={{ color: 'red' }}>*</span></Label>
                <Input
                  name="showonweb_lbl"
                  type="select"
                  placeholder="Select showonweb"
                  className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.showonweb_lbl || ""}
                >
                  <option value="101">Select showonweb</option>
                  <option value="102">Active</option>
                  <option value="103">In-Active</option>
                </Input>
                {validation.touched.showonweb_lbl && validation.errors.showonweb_lbl ? (
                  <FormFeedback type="invalid">
                    {validation.errors.showonweb_lbl}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
            <Col sm="4">
              <div className="mb-3">
                <Label className="form-label">Description<span style={{ color: 'red' }}>*</span></Label>
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
            <Col sm="4"></Col>
          </Row>

          <div
            style={{
              // margin: "20px 0px",
              marginTop: "20px",
              marginBottom: "18px",
              zIndex: 12000,
              backgroundColor: "#fff",
              width: "fit-content",
              marginLeft: "40%",
              position: "absolute",
              padding: "0px 10px",
            }}
          >
            <h5 style={{}}>Escalation Matrix<span style={{ color: 'red' }}>*</span></h5>
          </div>
          <Row style={{
            position: "relative",
            border: "1px solid #ced4da",
            padding: "20px 0px",
            margin: "30px 0px",
          }}>
            <Col sm="12">
              <AddNewMatrix />
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
    </Modal>
  );
};

AddNewSubCategoryList.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default AddNewSubCategoryList;
