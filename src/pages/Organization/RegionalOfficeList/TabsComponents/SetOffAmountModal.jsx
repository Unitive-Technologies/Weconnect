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

const SetOffAmountModal = (props) => {
  const { isOpen, toggleSetOffModal, selectedRowData } = props;
  // console.log(
  //   "selected Row in Add CreditModal:" + JSON.stringify(regionalOffData)
  // );
  const API_URL = "https://sms.unitch.in/api/index.php/v1";

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      amount: "",
      remark: "",
    },

    validationSchema: Yup.object({
      amount: Yup.string().required("Please Enter Amount"),
      remark: Yup.string().required("Please Enter Remark"),
    }),
    onSubmit: async (values) => {
      try {
        const newSetOff = {
          amount: values["amount"],
          remark: values["remark"],
        };
        console.log("newCredit:" + newSetOff);

        const token = "Bearer " + localStorage.getItem("temptoken");

        const response = await axios.put(
          `${API_URL}/operator-account/${selectedRowData.id}?vr=web1.0`,
          newSetOff,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        // setAccountDetails(response.data.data);
        console.log("response after submit credit:" + JSON.stringify(response));
        toggleSetOffModal();
      } catch (error) {
        console.error("Error in onSubmit:", error);
      }
    },
    onReset: (values) => {
      validation.setValues(validation.initialValues);
    },
  });

  return (
    <Modal
      isOpen={isOpen}
      role="dialog"
      size="xl"
      autoFocus={true}
      centered={true}
      className="exampleModal"
      tabIndex="-1"
      toggle={toggleSetOffModal}
    >
      <ModalHeader tag="h4" toggle={toggleSetOffModal}>
        SetOff Amount
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
                  SetOff Amount<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="amount"
                  type="number"
                  placeholder="Enter SetOff Amount"
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
          </Row>
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
                <button type="submit" className="btn btn-success save-user">
                  SetOff
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

SetOffAmountModal.propTypes = {
  isOpen: PropTypes.bool,
  toggleAddModal: PropTypes.func,
};
export default SetOffAmountModal;
