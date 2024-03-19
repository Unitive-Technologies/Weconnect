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
import Select from "react-select";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import {
  updateReason as onUpdateReason,
  getReason as onGetReason,
} from "/src/store/reasonlist/actions";
import ShowHistoryModal from "./ShowHistoryModal";

const ViewReason = (props) => {
  const {
    isOpen,
    resetSelection,
    toggleViewModal,
    reason,
    reasonStatus,
    reasonReasonType,
  } = props;
  console.log("View Reasonlist modal:" + JSON.stringify(reason));
  const dispatch = useDispatch();
  const [showEditReason, setShowEditReason] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  const toggleHistoryModal = () => {
    setShowHistory(!showHistory);
  };

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      id: (reason && reason.id) || "",
      name: (reason && reason.name) || "",
      status: (reason && reason.status) || "",
      type_display_lbl: (reason && reason.type_display_lbl) || [],
      // type: (reason && reason.type) || [],
      applicableon: (reason && reason.applicableon) || "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Enter reason"),
      status: Yup.string().required("Select Status"),
      type: Yup.array().min(1, "Select at least one Reason Type"),
      // applicableon: Yup.array().required(""),
    }),
    onSubmit: (values) => {
      const applicableonArray = values["applicableon"] || [];
      const applicableonIntegers = applicableonArray.map((option) =>
        parseInt(option)
      );

      const updateReason = {
        id: reason.id,
        name: values.name,
        status: values.status,
        type_display_lbl: values.type_display_lbl,
        // type: parseInt(values.type),
        applicableon: applicableonIntegers,
      };

      // update user
      dispatch(onUpdateReason(updateReason));
      dispatch(onGetReason());
      validation.resetForm();
      toggleViewModal();
      resetSelection();
    },
  });

  const handleCancel = () => {
    setShowEditReason(false);
    resetSelection();
    toggleViewModal();
  };

  console.log(
    "View Reason List Reason Type Values" + validation.values.type_display_lbl
  );
  return (
    <>
      {showHistory && (
        <ShowHistoryModal
          isOpen={showHistory}
          toggleHistoryModal={toggleHistoryModal}
          reason={reason}
        />
      )}
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
        {console.log("showEditReason :" + showEditReason)}
        <ModalHeader toggle={handleCancel} tag="h4">
          {!showEditReason
            ? `View ${(reason && reason.name) || ""}`
            : `Edit ${(reason && reason.name) || ""}`}
        </ModalHeader>
        {!showEditReason && (
          <>
            <Link
              style={{
                position: "absolute",
                marginLeft: "92%",
                marginTop: "1%",
              }}
              to="#!"
              className="btn btn-light me-1"
              onClick={() => setShowHistory(true)}
            >
              <i className="dripicons-briefcase" />
            </Link>
            <Link
              style={{
                position: "absolute",
                marginLeft: "87%",
                marginTop: "1%",
              }}
              to="#!"
              className="btn btn-light me-1"
              onClick={() => setShowEditReason(true)}
            >
              <i className="mdi mdi-pencil-outline"></i>
            </Link>
          </>
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
                  <Label className="form-label">Reason Type<span style={{ color: "red" }}>*</span></Label>
                  {/* <div className="d-flex align-items-center"> */}
                  <Select
                    name="type_display_lbl"
                    placeholder="Select at least one Reason Type"
                    onChange={(selectedOptions) => {
                      validation.setFieldValue(
                        "type_display_lbl",
                        selectedOptions
                      );
                    }}
                    onBlur={validation.handleBlur}
                    value={validation.values.type_display_lbl}
                    options={reasonReasonType.map((type_display_lbl) => ({
                      value: type_display_lbl.name,
                      label: type_display_lbl.name,
                    }))}
                    isMulti
                    isDisabled={!showEditReason}
                    invalid={
                      validation.touched.type_display_lbl &&
                        validation.errors.type_display_lbl
                        ? true
                        : false
                    }
                    styles={{
                      menu: (provided) => ({ ...provided, maxHeight: "300px" }),
                      menuList: (provided) => ({
                        ...provided,
                        maxHeight: "300px",
                      }),
                    }}
                  />
                </div>
                {validation.touched.type_display_lbl &&
                  validation.errors.type_display_lbl ? (
                  <FormFeedback type="invalid">
                    {validation.errors.type_display_lbl}
                  </FormFeedback>
                ) : null}
                {/* </div> */}
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
                    invalid={
                      validation.touched.status &&
                        validation.errors.status
                        ? true
                        : false
                    }
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
              {console.log(
                "View Reason List type_lbl" + validation.values.type_display_lbl
              )}
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
      </Modal>
    </>
  );
};

ViewReason.propTypes = {
  isOpen: PropTypes.bool,
  toggleViewModal: PropTypes.func,
  resetSelection: PropTypes.func,

  reason: PropTypes.object,
  reasonReasonType: PropTypes.array,
  reasonStatus: PropTypes.array,
};

export default ViewReason;
