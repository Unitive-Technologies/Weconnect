import React, { useEffect, useState, useRef, useMemo } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
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
import { useDispatch } from "react-redux";
import {
  updateComplaintSubCategory as onUpdateComplaintSubCategory,
  getComplaintSubCategory as onGetComplaintSubCategory,
} from "/src/store/complaintsubcategorylist/actions";
import ViewMatrix from "./ViewMatrix";
import AddNewMatrix from "./AddNewMatrix";
import { resetSection } from "redux-form";

const ViewSubCategoryList = (props) => {
  const {
    isOpen,
    resetSelection,
    toggleViewSubCategory,
    complaintsubcategory,
    complaintsubcateDesignation,
    complaintsubcateCategory,
    complaintsubcateStatus,
  } = props;
  console.log("list in view modal:" + JSON.stringify(complaintsubcategory));
  const [timeArray, setTimeArray] = useState([]);
  const dispatch = useDispatch();
  const [showEditSubCategory, setShowEditSubCategory] = useState(false);

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      id: (complaintsubcategory && complaintsubcategory.id) || "",
      name: (complaintsubcategory && complaintsubcategory.name) || "",
      category:
        (complaintsubcategory && complaintsubcategory.category_id) || "",
      showonweb: (complaintsubcategory && complaintsubcategory.showonweb) || "",
      status: (complaintsubcategory && complaintsubcategory.status) || "",
      description:
        (complaintsubcategory && complaintsubcategory.description) || "",
      escalations:
        (complaintsubcategory && complaintsubcategory.escalations) || [],
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please Enter Name"),
      category: Yup.string().required("Please Enter category"),
      showonweb: Yup.string().required("Please Enter Showonweb"),
      status: Yup.string().required("Please Enter status"),
      description: Yup.string().required("Please Enter description"),
    }),
    onSubmit: (values) => {
      console.log("values:" + JSON.stringify(values));
      const updatedSubCategory = {
        id: complaintsubcategory.id,
        name: values["name"],
        category_id: parseInt(values["category"]),
        status: parseInt(values["status"]),
        showonweb: parseInt(values["showonweb"]),
        description: values["description"],
        escalations: timeArray,
      };
      console.log("ComplaintSubCategory:" + JSON.stringify(updatedSubCategory));
      // save new user
      dispatch(onUpdateComplaintSubCategory(updatedSubCategory));
      dispatch(onGetComplaintSubCategory());
      validation.resetForm();
      resetSection();
      setShowEditSubCategory(false);
      toggleViewSubCategory();
    },
  });

  const handleCancel = () => {
    setShowEditSubCategory(false);
    toggleViewSubCategory();
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        role="dialog"
        size="xl"
        autoFocus={true}
        centered={true}
        className="exampleModal"
        tabIndex="-1"
        toggle={toggleViewSubCategory}
      >
        <ModalHeader toggle={handleCancel} tag="h4">
          {!showEditSubCategory
            ? `View ${
                (complaintsubcategory && complaintsubcategory.name) || ""
              }`
            : `Edit ${
                (complaintsubcategory && complaintsubcategory.name) || ""
              }`}
        </ModalHeader>
        {!showEditSubCategory && (
          <Link
            style={{
              position: "absolute",
              marginLeft: "92%",
              marginTop: "1%",
            }}
            to="#!"
            className="btn btn-light me-1"
            onClick={() => setShowEditSubCategory(true)}
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
                    disabled={!showEditSubCategory}
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
                    name="category"
                    type="select"
                    placeholder="Select Category"
                    className="form-select"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.category || ""}
                    disabled={!showEditSubCategory}
                  >
                    {complaintsubcateCategory &&
                      complaintsubcateCategory.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                  </Input>
                  {validation.touched.category && validation.errors.category ? (
                    <FormFeedback type="invalid">
                      {validation.errors.category}
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
                    disabled={!showEditSubCategory}
                  >
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
                    disabled={!showEditSubCategory}
                  >
                    {/* {!showEditSubCategory ? (
                      <option>{validation.values.showonweb_lbl}</option>
                    ) : (
                      <> */}
                    {/* <option value="">{validation.values.showonweb}</option> */}
                    <option value="1">Active</option>
                    <option value="0">In-Active</option>
                    {/* </>
                    )} */}
                  </Input>
                  {validation.touched.showonweb &&
                  validation.errors.showonweb ? (
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
                    disabled={!showEditSubCategory}
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
                {/* {!showEditSubCategory ? (
                  <ViewMatrix
                    complaintsubcateDesignation={complaintsubcateDesignation}
                    escalations={
                      complaintsubcategory && complaintsubcategory.escalations
                    }
                  />
                ) : ( */}
                <AddNewMatrix
                  timeArray={timeArray}
                  setTimeArray={setTimeArray}
                  complaintsubcateDesignation={complaintsubcateDesignation}
                  escalations={
                    complaintsubcategory && complaintsubcategory.escalations
                  }
                  showEditSubCategory={showEditSubCategory}
                />
                {/* )} */}
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
                      handleCancel();
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
    </>
  );
};

ViewSubCategoryList.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default ViewSubCategoryList;
