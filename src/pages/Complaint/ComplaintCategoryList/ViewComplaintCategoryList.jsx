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
import { useSelector, useDispatch } from "react-redux";
import { addNewComplaintCategory as onAddNewComplaintCategory } from "/src/store/complaintcategorylist/actions";

const ViewComplaintCategoryList = (props) => {
  const { isOpen, toggle, complaintcategory } = props;
  //   console.log("user in viewuser modal:" + JSON.stringify(user));
  const dispatch = useDispatch();
  const [showEditUser, setShowEditUser] = useState(false);

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      id: (complaintcategory && complaintcategory.id) || "",
      name: (complaintcategory && complaintcategory.name) || "",
      status: (complaintcategory && complaintcategory.status) || "",
      showonweb_lbl: (complaintcategory && complaintcategory.showonweb_lbl) || "",
      description: (complaintcategory && complaintcategory.description) || "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Enter Name"),
      status: Yup.string().required("Select status"),
      showonweb_lbl: Yup.string().required("Enter Show"),
      description: Yup.string().required("Enter description"),
    }),
    onSubmit: (values) => {
      const newComplaintCategory = {
        id: complaintcategory.id,
        name: values.name,
        status: values.status,
        showonweb_lbl: values.showonweb_lbl,
        description: values.description,
      };

      // update user
      dispatch(onAddNewComplaintCategory(newComplaintCategory));
      validation.resetForm();
      toggle();
    },
  });
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
        toggle={toggle}
      >
        {!showEditUser ? (
          <ModalHeader toggle={toggle} tag="h4">
            View  {complaintcategory.name}
            <i
              className="bx bx bxs-edit"
              style={{ marginLeft: "20px", cursor: "pointer" }}
              onClick={() => setShowEditUser(true)}
            ></i>
          </ModalHeader>
        ) : (
          <ModalHeader toggle={toggle} tag="h4">
            Edit {complaintcategory.name}
          </ModalHeader>
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
                    value={validation.values.status || ""}
                  >
                    <option value="101">Select Status</option>
                    <option value="102">Active</option>
                    <option value="103">In-Active</option>
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
                    value={validation.values.showonweb_lbl || ""}
                  ></Input>
                  {validation.touched.showonweb_lbl && validation.errors.showonweb_lbl ? (
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
