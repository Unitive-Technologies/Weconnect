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
  ModalFooter,
} from "reactstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import { addNewComplaintSubCategory as onAddNewComplaintSubCategory } from "/src/store/complaintsubcategorylist/actions";
import { useDispatch } from "react-redux";
import AddNewMatrix from "./AddNewMatrix";
import { getComplaintSubCategory as onGetComplaintSubCategory } from "/src/store/actions";

const AddNewSubCategoryList = (props) => {
  const {
    isOpen,
    toggleAddSubCategory,
    complaintsubcateDesignation,
    complaintsubcateCategory,
    complaintsubcateStatus,
  } = props;
  const dispatch = useDispatch();
  const [timeArray, setTimeArray] = useState([]);
  console.log("timeArray: " + JSON.stringify(timeArray));
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      //BroadCaster: "",
      name: "",
      category_lbl: "",
      status: "",
      showonweb: "",
      description: "",
      // escalations: [],
      // escalations: [{ designation: "", tat_time: "" }],
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Enter name"),
      category_lbl: Yup.string().required("Select Category"),
      status: Yup.string().required("Select status"),
      showonweb: Yup.string().required("Select showonweb"),
      description: Yup.string().required("Enter description"),
    }),
    onSubmit: (values) => {
      const newComplaintSubCategory = {
        name: values["name"],
        category_id: parseInt(values["category_lbl"]),
        status: parseInt(values["status"]),
        showonweb: parseInt(values["showonweb"]),
        description: values["description"],
        escalations: timeArray,
      };
      console.log("ComplaintSubCategory:" + newComplaintSubCategory);
      // save new user
      dispatch(onAddNewComplaintSubCategory(newComplaintSubCategory));
      dispatch(onGetComplaintSubCategory());
      validation.resetForm();
      toggleAddSubCategory();
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
      toggle={toggleAddSubCategory}
    >
      <ModalHeader tag="h4" toggle={toggleAddSubCategory}>
        Add New Complaint Sub-Category
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
                  Category<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="category_lbl"
                  type="select"
                  placeholder="Select Category"
                  className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.category_lbl || ""}
                >
                  <option value="">Select Category</option>
                  {complaintsubcateCategory &&
                    complaintsubcateCategory.map((category_lbl) => (
                      <option key={category_lbl.id} value={category_lbl.id}>
                        {category_lbl.name}
                      </option>
                    ))}
                </Input>
                {validation.touched.category_lbl &&
                validation.errors.category_lbl ? (
                  <FormFeedback type="invalid">
                    {validation.errors.category_lbl}
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
                  {complaintsubcateStatus &&
                    complaintsubcateStatus.map((status) => (
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
                  Show on Web<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="showonweb"
                  type="select"
                  placeholder="Select showonweb"
                  className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.showonweb || ""}
                >
                  <option value="">Select Status</option>
                  <option value="1">Active</option>
                  <option value="0">In-Active</option>
                </Input>
                {validation.touched.showonweb && validation.errors.showonweb ? (
                  <FormFeedback type="invalid">
                    {validation.errors.showonweb}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
            <Col sm="4">
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
            <h5 style={{}}>
              Escalation Matrix<span style={{ color: "red" }}>*</span>
            </h5>
          </div>
          <Row
            style={{
              position: "relative",
              border: "1px solid #ced4da",
              padding: "20px 0px",
              margin: "30px 0px",
            }}
          >
            <Col sm="12">
              <AddNewMatrix
                timeArray={timeArray}
                setTimeArray={setTimeArray}
                complaintsubcateDesignation={complaintsubcateDesignation}
              />
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
                    toggleAddSubCategory();
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

AddNewSubCategoryList.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
  complaintsubcateDesignation: PropTypes.array,
  complaintsubcateCategory: PropTypes.array,
  complaintsubcateStatus: PropTypes.array,
};

export default AddNewSubCategoryList;
