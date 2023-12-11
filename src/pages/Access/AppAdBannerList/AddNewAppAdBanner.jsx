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
import { addAppAdBanner as onAddAppAdBanner } from "/src/store/appadbannerlist/actions";
import { useSelector, useDispatch } from "react-redux";

const AddNewAppAdBanner = (props) => {
  const { isOpen, toggle } = props;
  const dispatch = useDispatch();
  const [user, setUser] = useState();

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      title: "",
      start_date: "",
      end_date: "",
      //   img: "",
      caption: "",
      description: "",
      status: "",
      created_at: "",
      created_by: "Admin",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Enter title"),
      start_date: Yup.string().required("Select from date"),
      end_date: Yup.string().required("Select end date"),
      //   img: Yup.string().required("Select file"),
      caption: Yup.string().required("Enter caption"),
      description: Yup.string().required("Enter description"),
      status: Yup.string().required("Select status"),
    }),
    onSubmit: (values) => {
      const newAppAdBanner = {
        id: Math.floor(Math.random() * (30 - 20)) + 20,
        title: values["title"],
        start_date: values["start_date"],
        end_date: values["end_date"],
        // img: values["img"],
        caption: values["caption"],
        status: values["status"],
        description: values["description"],
        created_at: new Date(),
        created_by: values["created_by"],
      };
      console.log("new App Ad banner list:" + JSON.stringify(newAppAdBanner));
      // save new user
      dispatch(onAddAppAdBanner(newAppAdBanner));
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
      {/* <Modal isOpen={modal} toggle={toggle}> */}
      <ModalHeader tag="h4" toggle={toggle}>
        Add New App Advertisement Banner
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
                <Label className="form-label">Title</Label>
                <Input
                  name="title"
                  type="text"
                  placeholder="Enter title"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.title || ""}
                  invalid={
                    validation.touched.title && validation.errors.title
                      ? true
                      : false
                  }
                />
                {validation.touched.title && validation.errors.title ? (
                  <FormFeedback type="invalid">
                    {validation.errors.title}
                  </FormFeedback>
                ) : null}
              </div>

              <div className="mb-3">
                <Label className="form-label">Select start date</Label>
                <Input
                  name="start_date"
                  label="start_date"
                  type="date"
                  placeholder="Select from date"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.start_date || ""}
                  invalid={
                    validation.touched.start_date &&
                    validation.errors.start_date
                      ? true
                      : false
                  }
                />
                {validation.touched.start_date &&
                validation.errors.start_date ? (
                  <FormFeedback type="invalid">
                    {validation.errors.start_date}
                  </FormFeedback>
                ) : null}
              </div>

              <div className="mb-3">
                <Label className="form-label">Select end date</Label>
                <Input
                  name="end_date"
                  label="end_date"
                  type="date"
                  placeholder="Select end date"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.end_date || ""}
                  invalid={
                    validation.touched.end_date && validation.errors.end_date
                      ? true
                      : false
                  }
                />
                {validation.touched.end_date && validation.errors.end_date ? (
                  <FormFeedback type="invalid">
                    {validation.errors.end_date}
                  </FormFeedback>
                ) : null}
              </div>

              {/* <div className="mb-3">
                <Label className="form-label">Select image(MAX 1MB)</Label>
                <Input
                  name="img"
                  type="img"
                  placeholder="Select file"
                  rows="3"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.img || ""}
                  invalid={
                    validation.touched.img && validation.errors.img
                      ? true
                      : false
                  }
                />
                {validation.touched.img && validation.errors.img ? (
                  <FormFeedback type="invalid">
                    {validation.errors.img}
                  </FormFeedback>
                ) : null}
              </div> */}

              <div className="mb-3">
                <Label className="form-label">Caption</Label>
                <Input
                  name="caption"
                  type="textarea"
                  placeholder="Enter caption"
                  rows="3"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.caption || ""}
                  invalid={
                    validation.touched.caption && validation.errors.caption
                      ? true
                      : false
                  }
                />
                {validation.touched.caption && validation.errors.caption ? (
                  <FormFeedback type="invalid">
                    {validation.errors.caption}
                  </FormFeedback>
                ) : null}
              </div>

              <div className="mb-3">
                <Label className="form-label">Description</Label>
                <Input
                  name="description"
                  type="textarea"
                  placeholder="Enter description"
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

              <div className="mb-3">
                <Label className="form-label">Status</Label>
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
                  <option value="11">Active</option>
                  <option value="12">BLOCKED</option>
                  <option value="13">In-Active</option>
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
              </div>
            </Col>
          </Row>
        </Form>
      </ModalBody>
      {/* </Modal> */}
    </Modal>
  );
};

AddNewAppAdBanner.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default AddNewAppAdBanner;
