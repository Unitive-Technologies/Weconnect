import React, { useEffect, useState, useRef, useMemo } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import {
  // getUserType as onGetUserType,
  // getUserStatus as onGetUserStatus,
  // getUserRole as onGetUserRole,
  // getUserDesignation as onGetUserDesignation,
  // getUserMsoPolicy as onGetUserMsoPolicy,
  getUserRegionalOffice as onGetUserRegionalOffice,
  getUserMsoDetails as onGetUserMsoDetails,
  getUserDistributor as onGetUserDistributor,
  getUserLco as onGetUserLco,
} from "/src/store/users/actions";
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
  Table,
} from "reactstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  addNewUser as onAddNewUser,
  getUsers as onGetUsers,
} from "/src/store/users/actions";

const AddCreditModal = (props) => {
  const {
    isOpen,
    toggleAddModal,
    regionalCreditList,
    regionalOffData,
    regionalBankList,
    selectedRowData,
  } = props;
  // console.log(
  //   "selected Row in Add CreditModal:" + JSON.stringify(regionalOffData)
  // );
  const API_URL = "https://sms.unitch.in/api/index.php/v1";
  const [selectedCreditDetails, setSelectedCreditDetails] = useState({});
  const [selectedDebitDetails, setSelectedDebitDetails] = useState({});
  const [selectedBalance, setSelectedBalance] = useState("");
  const [completeDetails, setCompleteDetails] = useState([]);

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      amount: "",
      mode: "0",
      remark: "",
    },

    validationSchema: Yup.object({
      amount: Yup.string().required("Please Enter Amount"),
      mode: Yup.string().required("Select Payment Mode"),
      remark: Yup.string().required("Please Enter Remark"),
    }),
    onSubmit: async (values) => {
      try {
        const newCredit = {
          amount: values["amount"],
          mode: parseInt(values["mode"]),
          remark: values["remark"],
          operator_id: completeDetails.id,
          wallet_type: 0,
          bankname: values["bankname"],
          chequedate: values["chequedate"],
          chequeno: values["chequeno"],
        };
        console.log("newCredit:" + newCredit);

        const token = "Bearer " + localStorage.getItem("temptoken");

        const response = await axios.post(
          `${API_URL}/operator-account?vr=web1.0`,
          newCredit,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        console.log("response after submit credit:" + JSON.stringify(response));
        // validation.resetForm();
        toggleAddModal();
      } catch (error) {
        console.error("Error in onSubmit:", error);
      }
    },
    // onReset: (values) => {
    //   validation.setValues(validation.initialValues);
    // },
  });
  useEffect(() => {
    const getSelectedRowDetails = async (e) => {
      try {
        const token = "Bearer " + localStorage.getItem("temptoken");

        const response = await axios.get(
          `${API_URL}/operator-account/${regionalOffData.id}?expand=logo,type_lbl,mso_lbl,branch_lbl,distributor_lbl,igst,cgst,sgst,name,balance,credit,debit,balance_h,credit_h,debit_h&vr=web1.0`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        setCompleteDetails(response.data.data);
        console.log("response in useEffect:" + JSON.stringify(response));
      } catch (error) {
        console.error("Error fetching bouquet data:", error);
      }
    };
    // setSelectedCreditDetails(selectedRowData.credit);
    // setSelectedDebitDetails(selectedRowData.debit);
    // setSelectedBalance(selectedRowData.balance);
    getSelectedRowDetails();
  }, [regionalOffData]);
  console.log(
    "complete details @@@@@@@@@@: " + JSON.stringify(completeDetails)
  );
  return (
    <Modal
      isOpen={isOpen}
      role="dialog"
      size="xl"
      autoFocus={true}
      centered={true}
      className="exampleModal"
      tabIndex="-1"
      toggle={toggleAddModal}
    >
      <ModalHeader tag="h4" toggle={toggleAddModal}>
        Add Credit to <strong>{selectedRowData && selectedRowData.name}</strong>{" "}
        account
      </ModalHeader>
      <ModalBody>
        <Row>
          <Col lg={6}>
            <p>
              Operator Name:{" "}
              <strong>{selectedRowData && selectedRowData.name}</strong>
            </p>
          </Col>

          <Col lg={6}>
            <p>
              Contact Person: <strong>{selectedRowData.contact_person}</strong>
            </p>
          </Col>
        </Row>
        <Row>
          <Col lg={12}>
            <Table>
              <thead>
                <tr>
                  <td>#</td>
                  <td>Amount</td>
                  <td>Transaction</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Balance</td>
                  <td>{selectedRowData.balance}</td>
                  <td></td>
                </tr>
                <tr>
                  <td>Credit</td>
                  <td>{selectedRowData.credit?.amt || "N/A"}</td>
                  <td>{selectedRowData.credit?.cnt || "N/A"}</td>
                </tr>
                <tr>
                  <td>Debit</td>
                  <td>{selectedRowData.debit?.amt || "N/A"}</td>
                  <td>{selectedRowData.debit?.cnt || "N/A"}</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            validation.handleSubmit();
            return false;
          }}
        >
          <Row>
            <Col lg={4}>
              <div className="mb-3">
                <Label className="form-label">
                  Credit Amount<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="amount"
                  type="number"
                  placeholder="Insert Credit Amount"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.amount || ""}
                  invalid={
                    validation.touched.amount && validation.errors.amount
                      ? true
                      : false
                  }
                />
                {validation.touched.amount && validation.errors.amount ? (
                  <FormFeedback type="invalid">
                    {validation.errors.amount}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>

            <Col lg={4}>
              <div className="mb-3">
                <Label className="form-label">
                  Payment Mode<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="mode"
                  type="select"
                  placeholder="Select Mode"
                  className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.mode || ""}
                  // invalid={
                  //   validation.touched.amount && validation.errors.amount
                  //     ? true
                  //     : false
                  // }
                >
                  {/* <option value="">Select Payment Mode</option> */}
                  {regionalCreditList.map((mode) => (
                    <option key={mode.id} value={mode.id}>
                      {mode.name}
                    </option>
                  ))}
                </Input>
                {validation.touched.mode && validation.errors.mode ? (
                  <FormFeedback type="invalid">
                    {validation.errors.mode}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
          </Row>
          {console.log(
            "validation.values.mode:" + validation.values.mode,
            typeof validation.values.mode
          )}
          {!(
            validation.values.mode === "0" || validation.values.mode === "-1"
          ) && (
            <Row>
              <Col lg={4}>
                <div className="mb-3">
                  <Label className="form-label">
                    Bank<span style={{ color: "red" }}>*</span>
                  </Label>
                  <Input
                    name="bankname"
                    type="select"
                    placeholder="Select Bank"
                    className="form-select"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.bankname || ""}
                    // invalid={
                    //   validation.touched.amount && validation.errors.amount
                    //     ? true
                    //     : false
                    // }
                  >
                    <option value="">Select Bank</option>
                    {regionalBankList.map((bank) => (
                      <option key={bank.id} value={bank.id}>
                        {bank.name}
                      </option>
                    ))}
                  </Input>
                  {validation.touched.bankname && validation.errors.bankname ? (
                    <FormFeedback type="invalid">
                      {validation.errors.bankname}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>

              <Col lg={4}>
                <div className="mb-3">
                  <Label className="form-label">
                    Cheque/Instrument No.
                    <span style={{ color: "red" }}>*</span>
                  </Label>
                  <Input
                    name="chequeno"
                    type="text"
                    placeholder="Insert Cheque Number"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.chequeno || ""}
                    invalid={
                      validation.touched.chequeno && validation.errors.chequeno
                        ? true
                        : false
                    }
                  />
                  {validation.touched.chequeno && validation.errors.chequeno ? (
                    <FormFeedback type="invalid">
                      {validation.errors.chequeno}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Col lg={4}>
                <div className="mb-3">
                  <Label className="form-label">
                    Cheque/Instrument Date
                    <span style={{ color: "red" }}>*</span>
                  </Label>
                  <Input
                    name="chequedate"
                    type="date"
                    placeholder="Insert Cheque Date"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.chequedate || ""}
                    invalid={
                      validation.touched.chequedate &&
                      validation.errors.chequedate
                        ? true
                        : false
                    }
                  />
                  {validation.touched.chequedate &&
                  validation.errors.chequedate ? (
                    <FormFeedback type="invalid">
                      {validation.errors.chequedate}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
            </Row>
          )}
          <Row>
            <Col lg={12}>
              <div className="mb-3">
                <Label className="form-label">
                  Remarks<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="remark"
                  type="textarea"
                  placeholder="Enter Remarks"
                  rows="3"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.remark || ""}
                  invalid={
                    validation.touched.remark && validation.errors.remark
                      ? true
                      : false
                  }
                />
                {validation.touched.remark && validation.errors.remark ? (
                  <FormFeedback type="invalid">
                    {validation.errors.remark}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
          </Row>

          <Row>
            <Col>
              <ModalFooter>
                <button
                  type="submit"
                  className="btn btn-success save-user"
                  onClick={() => {
                    validation.handleSubmit();
                  }}
                >
                  Credit
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
    </Modal>
  );
};

AddCreditModal.propTypes = {
  isOpen: PropTypes.bool,
  toggleAddModal: PropTypes.func,
};
export default AddCreditModal;
