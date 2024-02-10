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
import { getBank as onGetBank, updateBank as onUpdateBank } from "/src/store/banklist/actions";

const ViewBankList = (props) => {
  const { isOpen, toggleViewModal, banks, bankStatus } = props;
  console.log("view Bank in view modal:" + JSON.stringify(banks));

  const [showAccountNo, setShowAccountNo] = useState(false);

  const dispatch = useDispatch();
  const [showEditBank, setShowEditBank] = useState(false);

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      id: (banks && banks.id) || "",
      name: (banks && banks.name) || "",
      //   code: "",
      ifscode: (banks && banks.ifscode) || "",
      branch: (banks && banks.branch) || "",
      address: (banks && banks.address) || "",
      ismso: (banks && banks.ismso) || "",
      account_no: (banks && banks.account_no) || "",
      status_lbl: (banks && banks.status_lbl) || "",
      created_at: (banks && banks.created_at) || "",
      created_by: (banks && banks.created_by) || "my mso(mso)",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Enter name"),
      ifscode: Yup.string().required(""),
      branch: Yup.string().required("Select branch type"),
      address: Yup.string().required("Enter address"),
      ismso: Yup.string().required("selecct for mso"),
      status_lbl: Yup.string().required("Select status"),
    }),
    onSubmit: (values) => {
      const updateBank = {
        id: values["id"],
        name: values["name"],
        ifscode: values["ifscode"],
        branch: values["branch"],
        status_lbl: parseInt(values["status_lbl"]),
        address: values["address"],
        account_no: values["account_no"],
        ismso: values["ismso"],
        created_at: new Date(),
        created_by: values["created_by"],
      };
      // console.log("Update Brand:" + JSON.stringify(updateBank));
      dispatch(onUpdateBank(updateBank));
      dispatch(onGetBank());
      validation.resetForm();
      toggleViewModal();
      // setShowEditUser(false);
      resetSelection();

    },
  });

  const handleCancel = () => {
    setShowEditBank(false);
    resetSelection();
    toggleViewModal();
  };

  return (
    <Modal
      isOpen={isOpen}
      role="dialog"
      autoFocus={true}
      centered={true}
      className="exampleModal"
      tabIndex="-1"
      size="xl"
      toggle={handleCancel}
    >
      <ModalHeader toggle={handleCancel} tag="h4">
        {!showEditBank
          ? `View ${(banks && banks.name) || ""}`
          : `Edit ${(banks && banks.name) || ""}`}
      </ModalHeader>
      {!showEditBank && (
        <Link
          style={{
            position: "absolute",
            marginLeft: "92%",
            marginTop: "1%",
          }}
          to="#!"
          className="btn btn-light me-1"
          onClick={() => setShowEditBank(true)}
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
                  placeholder="Enter name"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.name || ""}
                  invalid={
                    validation.touched.name && validation.errors.name
                      ? true
                      : false
                  }
                  disabled={!showEditBank}
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
                  IFSC Code<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="ifscode"
                  type="text"
                  placeholder="Enter IFSC code"
                  // className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.ifscode || ""}
                  disabled={!showEditBank}
                />
                {validation.touched.ifscode &&
                  validation.errors.ifscode ? (
                  <FormFeedback type="invalid">
                    {validation.errors.ifscode}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
            <Col sm="4">
              <div className="mb-3">
                <Label className="form-label">
                  Branch<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="branch"
                  type="text"
                  placeholder="Enter branch"
                  // className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.branch || ""}
                  disabled={!showEditBank}
                >
                </Input>
                {validation.touched.branch &&
                  validation.errors.branch ? (
                  <FormFeedback type="invalid">
                    {validation.errors.branch}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
          </Row>
          <Row>
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
                  disabled={!showEditBank}
                >
                  {bankStatus.map((status_lbl) => (
                    <option key={status_lbl.id} value={status_lbl.id}>
                      {status_lbl.name}
                    </option>
                  ))}
                </Input>
                {validation.touched.status_lbl && validation.errors.status_lbl ? (
                  <FormFeedback type="invalid">
                    {validation.errors.status_lbl}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
            <Col sm="4">
              <div className="mb-3">
                <Label className="form-label">
                  Branch Address<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="address"
                  type="textarea"
                  placeholder="Enter character length"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.address || ""}

                  disabled={!showEditBank}
                />
                {validation.touched.address && validation.errors.address ? (
                  <FormFeedback type="invalid">
                    {validation.errors.address}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
            <Col sm="4">
              <div className="mb-3">
                <Label className="form-label">
                  For MSO<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="ismso"
                  type="select"
                  placeholder="Select for mso"
                  onChange={(e) => {
                    validation.handleChange(e);
                    setShowAccountNo(e.target.value === '11'); // Set showAccountNo based on the selected value
                  }}
                  onBlur={validation.handleBlur}
                  value={validation.values.ismso || ""}
                  invalid={validation.touched.ismso && validation.errors.ismso ? true : false}
                  disabled={!showEditBank}
                >
                  <option value=""></option>
                  <option value="11">Yes</option>
                  <option value="22">No</option>
                </Input>
                {validation.touched.ismso && validation.errors.ismso ? (
                  <FormFeedback type="invalid">
                    {validation.errors.ismso}
                  </FormFeedback>
                ) : null}
              </div>

              {/* Conditionally render Account No field based on showAccountNo state */}
              {showAccountNo && (
                <div className="mb-3">
                  <Label className="form-label">
                    Account No
                  </Label>
                  <Input
                    name="account_no"
                    type="text"
                    placeholder="Enter Account No"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.account_no || ""}
                    invalid={validation.touched.account_no && validation.errors.account_no ? true : false}
                    disabled={!showEditBank}
                  />
                  {validation.touched.account_no && validation.errors.account_no ? (
                    <FormFeedback type="invalid">
                      {validation.errors.account_no}
                    </FormFeedback>
                  ) : null}
                </div>
              )}
            </Col>
          </Row>
          {showEditBank && (
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

ViewBankList.propTypes = {
  toggleViewModal: PropTypes.func,
  resetSelection: PropTypes.func,
  isOpen: PropTypes.bool,

  banks: PropTypes.object,
  bankStatus: PropTypes.array,
};

export default ViewBankList;
