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
import { updateReason as onUpdateReason } from "/src/store/reasonlist/actions";

const ViewReason = (props) => {
  const { isOpen, resetSelection,
    toggleViewModal, reason, reasonStatus, reasonReasonType } =
    props;
  // console.log("View Reasonlist modal:" + JSON.stringify(reason));
  const dispatch = useDispatch();
  const [showEditReason, setShowEditReason] = useState(false);

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      id: (reason && reason.id) || "",
      name: (reason && reason.name) || "",
      status: (reason && reason.status) || "",
      type_display_lbl: (reason && reason.type_display_lbl) || "",
      type: (reason && reason.type) || "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required(""),
      status: Yup.string().required("Select Status"),
      // type_display_lbl: Yup.string().required(""),
      // type_display_lbl: Yup.array().min(1, "Select at least one Reason Type"),
      type: Yup.array().min(1, "Select at least one Reason Type"),
    }),
    onSubmit: (values) => {
      // const type_display_lblArray = values["type_display_lbl"] || [];
      // const type_display_lblIntegers = type_display_lblArray.map((option) =>
      //   parseInt(option)
      // );
      console.log("Updated values" + JSON.stringify(values));

      const updateReason = {
        id: reason.id,
        name: values.name,
        status: values.status,
        type_display_lbl: values.type_display_lbl,
        type: values.type,
        // type_display_lbl: type_display_lblIntegers,
        // type_display_lbl: values.type_display_lbl,
      };

      // update user
      dispatch(onUpdateReason(updateReason));
      validation.resetForm();
      resetSelection();
      toggleViewModal();
    },
  });

  const handleCancel = () => {
    setShowEditReason(false);
    resetSelection();
    toggleViewModal();
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
        toggle={handleCancel}
      >
        <ModalHeader toggle={handleCancel} tag="h4">
          {!showEditReason
            ? `View ${(reason && reason.name) || ""}`
            : `Edit ${(reason && reason.name) || ""}`}
        </ModalHeader>
        {!showEditReason && (
          <Link
            style={{
              position: "absolute",
              marginLeft: "92%",
              marginTop: "1%",
            }}
            to="#!"
            className="btn btn-light me-1"
            onClick={() => setShowEditReason(true)}
          >
            <i className="mdi mdi-pencil-outline"></i>
          </Link>
        )}
        <ModalBody>
          <Form
            // style={{ textAlign: "center" }}
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
                    Reason<span style={{ color: "red" }}>*</span>
                  </Label>
                  <Input
                    name="name"
                    type="text"
                    placeholder=""
                    disabled={!showEditReason}
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.name || ""}
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
                    disabled={!showEditReason}
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.status || ""}
                  >
                    {reasonStatus.map((status) => (
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
              <Col sm="4">
                <div className="mb-3">
                  <Label className="form-label">Reason Type</Label>
                  <Input
                    name="type"
                    type="select"
                    placeholder="Select at least one Reason Type"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.type || ""}
                    multiple
                    disabled={!showEditReason}
                  >
                    {reasonReasonType.map((type) => (
                      <option key={type.id} value={type.id}>
                        {type.name}
                      </option>
                    ))}
                  </Input>
                  {validation.touched.type && validation.errors.type ? (
                    <FormFeedback type="invalid">
                      {validation.errors.type}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
            </Row>
            {showEditReason && (
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

ViewReason.propTypes = {
  toggleViewModal: PropTypes.func,
  isOpen: PropTypes.bool,
  resetSelection: PropTypes.func,

  reason: PropTypes.object,
  reasonReasonType: PropTypes.array,
  reasonStatus: PropTypes.array,
};

export default ViewReason;
