import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Col,
  Row,
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Label,
  FormFeedback,
  Input,
  Form,
} from "reactstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { updateComplaintCategory as onUpdateComplaintCategory } from "/src/store/complaintcategorylist/actions";

const ViewComplaintCategoryList = (props) => {
  const { isOpen, handleViewComplaintCategory, complaintcategory, complaintcateStatus } = props;
  console.log("View Complaint Category modal:" + JSON.stringify(complaintcategory));

  const dispatch = useDispatch();
  const [showEditComplaintCategory, setShowEditComplaintCategory] =
    useState(false);

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      id: (complaintcategory && complaintcategory.id) || "",
      name: (complaintcategory && complaintcategory.name) || "",
      status: (complaintcategory && complaintcategory.status) || "",
      showonweb_lbl:
        (complaintcategory && complaintcategory.showonweb_lbl) || "",
      description: (complaintcategory && complaintcategory.description) || "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Enter Name"),
      status: Yup.string().required("Select status"),
      showonweb_lbl: Yup.string().required("Enter Show"),
      description: Yup.string().required("Enter description"),
    }),
    onSubmit: (values) => {
      const updateComplaintCategory = {
        id: complaintcategory.id,
        name: values.name,
        status: values.status,
        showonweb_lbl: values.showonweb_lbl,
        description: values.description,
      };

      // update user
      dispatch(onUpdateComplaintCategory(updateComplaintCategory));
      validation.resetForm();
      handleViewComplaintCategory();
    },
  });

  const handleCancel = () => {
    setShowEditComplaintCategory(false);
    handleViewComplaintCategory();
  };
  return (
    <>
      <Modal
        isOpen={isOpen}
        size="xl"
        role="dialog"
        autoFocus={true}
        centered={true}
        className="exampleModal"
        tabIndex="-1"
        toggle={handleViewComplaintCategory}
      >
        <ModalHeader toggle={handleCancel} tag="h4">
          {!showEditComplaintCategory
            ? `View ${(complaintcategory && complaintcategory.name) || ""}`
            : `Edit ${(complaintcategory && complaintcategory.name) || ""}`}
        </ModalHeader>
        {!showEditComplaintCategory && (
          <Link
            style={{
              position: "absolute",
              marginLeft: "92%",
              marginTop: "1%",
            }}
            to="#!"
            className="btn btn-light me-1"
            onClick={() => setShowEditComplaintCategory(true)}
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
              <Col sm="6">
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
                    disabled={!showEditComplaintCategory}
                    value={validation.values.name || ""}
                  ></Input>
                  {validation.touched.name && validation.errors.name ? (
                    <FormFeedback type="invalid">
                      {validation.errors.name}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Col sm="6">
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
                    disabled={!showEditComplaintCategory}
                    value={validation.values.status || ""}
                  >
                    {complaintcateStatus.map((status) => (
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
              <Col sm="6">
                <div className="mb-3">
                  <Label className="form-label">
                    Show on-Portal<span style={{ color: "red" }}>*</span>
                  </Label>
                  <Input
                    name="showonweb_lbl"
                    type="select"
                    placeholder=""
                    className="form-select"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    disabled={!showEditComplaintCategory}
                    value={validation.values.showonweb_lbl || ""}
                  >
                    {/* <option value="0"></option> */}
                    <option value="1">Active</option>
                    <option value="2">In-Active</option>
                  </Input>
                  {validation.touched.showonweb_lbl &&
                    validation.errors.showonweb_lbl ? (
                    <FormFeedback type="invalid">
                      {validation.errors.showonweb_lbl}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Col sm="6">
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
                    disabled={!showEditComplaintCategory}
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
            {showEditComplaintCategory && (
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
            )}
          </Form>
        </ModalBody>
        {/* </Modal> */}
      </Modal>
    </>
  );
};

ViewComplaintCategoryList.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default ViewComplaintCategoryList;
