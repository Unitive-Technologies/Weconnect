import React, { useState } from "react";
import PropTypes from "prop-types";
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
import { addNewBank as onAddNewBank } from "/src/store/banklist/actions";
import { useDispatch } from "react-redux";
import { getBank as onGetBank } from "/src/store/actions";

const AddNewBankList = (props) => {
  const { isOpen, toggleAddModal, bankStatus } = props;

  const dispatch = useDispatch();

  const [showAdditionalField, setShowAdditionalField] = useState(false);

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      //BroadCaster: "",
      name: "",
      ifscode: "",
      branch: "",
      address: "",
      ismso: "",
      status: "",
      account_no: "",
      // created_at: "",
      // created_by: "Admin",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Enter name"),
      // ifscode: Yup.string().required("Enter IFSC code"),
      // branch: Yup.string().required("Enter branch"),
      account_no: Yup.string().required("Enter account no"),
      // address: Yup.string().required("Enter branch address"),
      ismso: Yup.string().required("Select for mso"),
      status: Yup.string().required("Select status"),
    }),
    onSubmit: (values) => {
      const newBank = {
        id: Math.floor(Math.random() * (30 - 20)) + 20,
        name: values["name"],
        ifscode: values["ifscode"],
        status: values["status"],
        branch: values["branch"],
        address: values["address"],
        ismso: values["ismso"],
        account_no: values["account_no"],
        // created_at: new Date(),
        // created_by: values["created_by"],
      };
      console.log("newBank:" + newBank);
      // {
      //   console.log("status type: " + typeof newBank.status);
      // }
      // save new user
      dispatch(onAddNewBank(newBank));
      dispatch(onGetBank());
      setShowAdditionalField(false);
      validation.resetForm();
      toggleAddModal();
    },
    onReset: (values) => {
      validation.setValues(validation.initialValues);
    },
  });

  return (
    <Modal
      isOpen={isOpen}
      size="xl"
      role="dialog"
      autoFocus={true}
      centered={true}
      className="exampleModal"
      tabIndex="-1"
      toggle={toggleAddModal}
    >
      <ModalHeader tag="h4" toggle={toggleAddModal}>
        Add New Bank
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
            <Col sm="4">
              <div className="mb-3">
                <Label className="form-label">
                  Name<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="name"
                  type="text"
                  placeholder="Enter name"
                  // className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.name || ""}
                  invalid={
                    validation.touched.name &&
                      validation.errors.name
                      ? true
                      : false
                  }
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
                  IFSC Code
                </Label>
                <Input
                  name="ifscode"
                  type="text"
                  placeholder="Enter IFSC Code"
                  // className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.ifscode || ""}
                ></Input>
                {validation.touched.ifscode && validation.errors.ifscode ? (
                  <FormFeedback type="invalid">
                    {validation.errors.ifscode}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
            <Col sm="4">
              <div className="mb-3">
                <Label className="form-label">
                  Branch
                </Label>
                <Input
                  name="branch"
                  type="text"
                  placeholder="Enter branch"
                  // className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.branch || ""}
                ></Input>
                {validation.touched.branch && validation.errors.branch ? (
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
                  name="status"
                  type="select"
                  placeholder="Select Status"
                  className="form-select"
                  // onChange={handleStatusChange}
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
                  <option value="">Select Status</option>
                  {bankStatus &&
                    bankStatus.map((status) => (
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
                <Label className="form-label">
                  Branch Address
                </Label>
                <Input
                  name="address"
                  type="text"
                  placeholder="Enter branch address"
                  // className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.address || ""}
                ></Input>
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
                  placeholder="Select for MSO"
                  className="form-select"
                  onChange={(e) => {
                    validation.handleChange(e);
                    // Toggle visibility based on the selected value
                    setShowAdditionalField(e.target.value === "102");
                  }}
                  onBlur={validation.handleBlur}
                  value={validation.values.ismso || ""}
                  invalid={
                    validation.touched.ismso &&
                      validation.errors.ismso
                      ? true
                      : false
                  }
                >
                  <option value="101">Select for MSO</option>
                  <option value="102">Yes</option>
                  <option value="103">No</option>
                </Input>
                {validation.touched.ismso && validation.errors.ismso && (
                  <FormFeedback type="invalid">
                    {validation.errors.ismso}
                  </FormFeedback>
                )}
              </div>
            </Col>

            {showAdditionalField && (
              <Col sm="4">
                <div className="mb-3">
                  <Label className="form-label">
                    Account No<span style={{ color: "red" }}>*</span>
                  </Label>
                  <Input
                    name="account_no"
                    type="text"
                    placeholder="Enter account no"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.account_no || ""}
                    invalid={
                      validation.touched.account_no &&
                        validation.errors.account_no
                        ? true
                        : false
                    }
                  ></Input>
                  {validation.touched.account_no &&
                    validation.errors.account_no && (
                      <FormFeedback type="invalid">
                        {validation.errors.account_no}
                      </FormFeedback>
                    )}
                </div>
              </Col>
            )}
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
                    toggleAddModal();
                  }}
                >
                  Cancel
                </button>
              </ModalFooter>
            </Col>
          </Row>
        </Form>
      </ModalBody>
      {/* </Modal> */}
    </Modal>
  );
};

AddNewBankList.propTypes = {
  toggleAddModal: PropTypes.func,
  isOpen: PropTypes.bool,

  bankStatus: PropTypes.array,

};

export default AddNewBankList;
