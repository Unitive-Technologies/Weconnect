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
import { updateUser as onUpdateUser } from "/src/store/users/actions";
import ViewMatrix from "./ViewMatrix";

const ViewSubCategoryList = (props) => {
  const { isOpen, toggleViewSubCategory, complaintsubcategory } = props;
  //   console.log("user in viewuser modal:" + JSON.stringify(user));
  const dispatch = useDispatch();
  const [showEditSubCategory, setShowEditSubCategory] = useState(false);

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      id: (complaintsubcategory && complaintsubcategory.id) || "",
      name: (complaintsubcategory && complaintsubcategory.name) || "",
      category_lbl:
        (complaintsubcategory && complaintsubcategory.category_lbl) || "",
      showonweb_lbl:
        (complaintsubcategory && complaintsubcategory.showonweb_lbl) || "",
      status_lbl:
        (complaintsubcategory && complaintsubcategory.status_lbl) || "",
      description:
        (complaintsubcategory && complaintsubcategory.description) || "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please Enter Name"),
      category_lbl: Yup.string().required("Please Enter category"),
      showonweb_lbl: Yup.string().required("Please Enter Showonweb"),
      status_lbl: Yup.string().required("Please Enter status_lbl"),
      description: Yup.string().required("Please Enter description"),
    }),
    onSubmit: (values) => {
      const updateUser = {
        id: complaintsubcategory.id,
        name: values.name,
        category_lbl: values.category_lbl,
        showonweb_lbl: values.showonweb_lbl,
        status_lbl: values.status_lbl,
        description: values.description,
      };
      // update user
      dispatch(onUpdateUser(updateUser));
      validation.resetForm();
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
                    <option value="101"></option>
                    <option value="102">STB Power Issue</option>
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
                  {validation.touched.status_lbl &&
                  validation.errors.status_lbl ? (
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
                  <Label className="form-label">
                    Show on Web<span style={{ color: "red" }}>*</span>
                  </Label>
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
                  {validation.touched.showonweb_lbl &&
                  validation.errors.showonweb_lbl ? (
                    <FormFeedback type="invalid">
                      {validation.errors.showonweb_lbl}
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
                <ViewMatrix />
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
