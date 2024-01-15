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
import { updateDistrict as onUpdateDistrict } from "/src/store/district/actions";
import { getDistrict as onGetDistrict } from "/src/store/actions";

const ViewDistrict = (props) => {
  const { isOpen, resetSelection, toggleModal, district, statelist, status } =
    props;
  const dispatch = useDispatch();
  const [showEditDistrict, setShowEditDistrict] = useState(false);

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      id: (district && Number(district.id)) || -1,
      code: (district && district.code) || "",
      name: (district && district.name) || "",
      state_id: (district && Number(district.state_id)) || 1,
      status: (district && Number(district.status)) || -1,
      description: (district && district.description) || "",
      type: (district && district.type) || "2",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Enter district name"),
      state_id: Yup.string().required("Select state"),
      status: Yup.string().required("Select status"),
      description: Yup.string().required("Enter description"),
    }),
    onSubmit: (values) => {
      console.log("Update District values: ", values);
      const updatedDistrict = {
        id: values["id"],
        code: values["code"],
        name: values["name"],
        state_id: values["state_id"],
        status: values["status"],
        description: values["description"],
        type: values["type"],
      };
      console.log("Updated district:" + JSON.stringify(updatedDistrict));
      dispatch(onUpdateDistrict(updatedDistrict));
      dispatch(onGetDistrict());
      validation.resetForm();
      setShowEditDistrict(false);
      resetSelection();
      toggleModal();
    },
  });
  const handleCancel = () => {
    setShowEditDistrict(false);
    resetSelection();
    toggleModal();
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
                  name="state_id"
                  type="select"
                  placeholder="Select state"
                  className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.state_id || ""}
                  disabled={!showEditDistrict}
                >
                  {statelist.map((options) => (
                    <option key={options.id} value={options.id}>
                      {options.name}
                    </option>
                  ))}
                </Input>
                {validation.touched.state_id && validation.errors.state_id ? (
                  <FormFeedback type="invalid">
                    {validation.errors.state_id}
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
                    <option key={options.id} value={options.id}>
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
  resetSelection: PropTypes.func,
  toggleModal: PropTypes.func,
  district: PropTypes.object,
  statelist: PropTypes.array,
  status: PropTypes.array,
  isOpen: PropTypes.bool,
};

export default ViewDistrict;
