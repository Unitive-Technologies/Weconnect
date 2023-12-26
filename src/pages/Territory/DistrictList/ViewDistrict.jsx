import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
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
import { updateUser as onUpdateUser } from "/src/store/users/actions";

const ViewDistrict = (props) => {
  const { isOpen, handleViewDistrict, district, statelist, status } = props;
  const dispatch = useDispatch();
  const [showEditDistrict, setShowEditDistrict] = useState(false);

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      name: (district && district.name) || "",
      state_lbl: (district && district.state_lbl) || "",
      status: (district && district.status) || "",
      description: (district && district.description) || "",
      created_at: (district && district.created_at) || "",
      created_by: (district && district.created_by) || "Admin",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Enter district name"),
      state_lbl: Yup.string().required("Select state"),
      status: Yup.string().required("Select status"),
      description: Yup.string().required("Enter description"),
    }),
    onSubmit: (values) => {
      const newDistrict = {
        id: Math.floor(Math.random() * (30 - 20)) + 20,
        designation: values["designation"],
        name: values["name"],
        state_lbl: values["state_lbl"],
        status: values["status"],
        description: values["description"],
        created_at: new Date(),
        created_by: values["created_by"],
      };
      // console.log("new district:" + newDistrict);
      // save new user
      dispatch(onAddDistrict(newDistrict));
      validation.resetForm();
      handleViewDistrict();
    },
  });
  const handleCancel = () => {
    setShowEditDistrict(false);
    handleViewDistrict();
  };
  return (
    <Modal
      isOpen={isOpen}
      role="dialog"
      size="xl"
      autoFocus={true}
      centered={true}
      className="exampleModal"
      tabIndex="-1"
      toggle={handleCancel}
    >
      <ModalHeader toggle={handleCancel} tag="h4">
        {!showEditDistrict
          ? `View ${(district && district.name) || ""}`
          : `Edit ${(district && district.name) || ""}`}
      </ModalHeader>
      {!showEditDistrict && (
        <Link
          style={{
            position: "absolute",
            marginLeft: "92%",
            marginTop: "1%",
          }}
          to="#!"
          className="btn btn-light me-1"
          onClick={() => setShowEditDistrict(true)}
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
            <Col lg={6}>
              <div className="mb-3">
                <Label className="form-label">District Name</Label>
                <Input
                  name="name"
                  type="text"
                  placeholder="Enter district name"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.name || ""}
                  disabled={!showEditDistrict}
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
            <Col lg={6}>
              <div className="mb-3">
                <Label className="form-label">Select State</Label>
                <Input
                  name="state_lbl"
                  type="select"
                  placeholder="Select state"
                  className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.state_lbl || ""}
                  disabled={!showEditDistrict}
                >
                  {statelist.map((options) => (
                    <option key={options.id} value={options.name}>
                      {options.name}
                    </option>
                  ))}
                </Input>
                {validation.touched.state_lbl && validation.errors.state_lbl ? (
                  <FormFeedback type="invalid">
                    {validation.errors.state_lbl}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
            <Col lg={6}>
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
                  disabled={!showEditDistrict}
                />
                {validation.touched.description &&
                validation.errors.description ? (
                  <FormFeedback type="invalid">
                    {validation.errors.description}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
            <Col lg={6}>
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
                  disabled={!showEditDistrict}
                >
                  {status.map((options) => (
                    <option key={options.id} value={options.name}>
                      {options.name}
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
          {showEditDistrict && (
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
    </Modal>
  );
};

ViewDistrict.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default ViewDistrict;
