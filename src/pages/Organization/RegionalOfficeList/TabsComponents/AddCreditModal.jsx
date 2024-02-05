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
  const { isOpen, toggleAddModal } = props;

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
        Add Credit to
      </ModalHeader>
      <ModalBody>
        <Row>
          <Col lg={6}>
            <p>Operator Name:</p>
          </Col>

          <Col lg={6}>
            <p>Contact Person:</p>
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
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>Credit</td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>Debit</td>
                  <td></td>
                  <td></td>
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
            <Col lg={6}>
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

            <Col lg={6}>
              <div className="mb-3">
                <Label className="form-label">
                  Payment Mode<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="type"
                  type="select"
                  placeholder="Select Type"
                  className="form-select"
                  onChange={handleTypeChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.type || ""}
                >
                  <option value="">Select Payment Mode</option>
                  {/* {userType.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.name}
                    </option>
                  ))} */}
                </Input>
                {validation.touched.type && validation.errors.type ? (
                  <FormFeedback type="invalid">
                    {validation.errors.type}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>

            <Col lg={12}>
              <div className="mb-3">
                <Label className="form-label">
                  Remarks<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="block_message"
                  type="textarea"
                  placeholder="Enter Message"
                  rows="3"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.block_message || ""}
                  invalid={
                    validation.touched.block_message &&
                    validation.errors.block_message
                      ? true
                      : false
                  }
                  disabled={
                    selectedStatus === "0" || selectedStatus === "-7"
                      ? false
                      : true
                  }
                />
                {validation.touched.block_message &&
                validation.errors.block_message ? (
                  <FormFeedback type="invalid">
                    {validation.errors.block_message}
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
