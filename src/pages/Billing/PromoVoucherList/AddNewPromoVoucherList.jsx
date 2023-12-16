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
import { addNewPromoVoucher as onAddNewPromoVoucher } from "/src/store/promovoucherlist/actions";
import { useSelector, useDispatch } from "react-redux";

const AddNewPromoVoucher = (props) => {
  const { isOpen, toggle } = props;
  const dispatch = useDispatch();
  const [user, setUser] = useState();

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      //BroadCaster: "",
      operator: "",
      operator_code: "",
      amount: "",
      mrp: "",
      expiry_date: "",
      bouquets: "",
      applied_on: "",
      recharge_period: "",
      created_at: "",
      created_by: "Admin",
    },
    validationSchema: Yup.object({
      operator: Yup.string().required("Select Ico"),
      operator_code: Yup.string().required("Enter voucher count"),
      amount: Yup.string().required("Enter voucher amount"),
      mrp: Yup.string().required("Exter voucher mrp"),
      expiry_date: Yup.string().required("Select expiry date"),
      bouquets: Yup.string().required("Select bouquet"),
      applied_on: Yup.string().required("Select apply on"),
      recharge_period: Yup.string().required("Select recharge periods"),
    }),
    onSubmit: (values) => {
      const newPromoVoucher = {
        id: Math.floor(Math.random() * (30 - 20)) + 20,
        operator: values["operator"],
        operator_code: values["operator_code"],
        amount: values["amount"],
        mrp: values["mrp"],
        expiry_date: values["expiry_date"],
        bouquets: values["bouquets"],
        applied_on: values["applied_on"],
        recharge_period: values["recharge_period"],
        created_at: new Date(),
        created_by: values["created_by"],
      };
      console.log("newPromoVoucher:" + newPromoVoucher);
      // save new user
      dispatch(onAddNewPromoVoucher(newPromoVoucher));
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
      size="xl"
      role="dialog"
      autoFocus={true}
      centered={true}
      className="exampleModal"
      tabIndex="-1"
      toggle={toggle}
    >
      <ModalHeader tag="h4">Generate Promo Voucher</ModalHeader>
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
                  LCO<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="operator"
                  type="select"
                  placeholder="Select Ico"
                  className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.operator || ""}
                >
                  <option value="101">Sri Hari Satlinks</option>
                  <option value="102">Sri Cable Network</option>
                  <option value="103">Sri Deepa Cable Network</option>
                </Input>
                {validation.touched.operator && validation.errors.operator ? (
                  <FormFeedback type="invalid">
                    {validation.errors.operator}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
            <Col sm="4">
              <div className="mb-3">
                <Label className="form-label">
                  Voucher Count<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="operator_code"
                  type="text"
                  placeholder="Enter Voucher count"
                  // className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.operator_code || ""}
                ></Input>
                {validation.touched.operator_code && validation.errors.operator_code ? (
                  <FormFeedback type="invalid">
                    {validation.errors.operator_code}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
            <Col sm="4">
              <div className="mb-3">
                <Label className="form-label">
                  Voucher Amount<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="amount"
                  type="text"
                  placeholder="Enter voucher amount"
                  // className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.amount || ""}
                >
                </Input>
                {validation.touched.amount && validation.errors.amount ? (
                  <FormFeedback type="invalid">
                    {validation.errors.amount}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
          </Row>
          <Row>
            <Col sm="4">
              <div className="mb-3">
                <Label className="form-label">
                  Voucher MRP<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="mrp"
                  type="text"
                  placeholder="Enter voucher mrp"
                  // className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.mrp || ""}
                ></Input>
                {validation.touched.mrp && validation.errors.mrp ? (
                  <FormFeedback type="invalid">
                    {validation.errors.mrp}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
            <Col sm="4">
              <div className="mb-3">
                <Label className="form-label">
                  Expiry Date<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="expiry_date"
                  type="text"
                  placeholder="Select expiry date"
                  // className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.expiry_date || ""}
                >
                </Input>
                {validation.touched.expiry_date && validation.errors.expiry_date ? (
                  <FormFeedback type="invalid">
                    {validation.errors.expiry_date}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
            <Col sm="4">
              <div className="mb-3">
                <Label className="form-label">
                  Bouquet List
                </Label>
                <Input
                  name="parent_lbl"
                  type="text"
                  placeholder="Select bouquet"
                  className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.parent_lbl || ""}
                >
                  <option value="201">in Percent</option>
                  <option value="202">in Amount</option>
                </Input>
                {validation.touched.parent_lbl && validation.errors.parent_lbll ? (
                  <FormFeedback type="invalid">
                    {validation.errors.parent_lbl}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
          </Row>
          <Row>
            <Col sm="4">
              <div className="mb-3">
                <Label className="form-label">
                  Applicable On<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="applicable"
                  type="select"
                  placeholder="Select Applicable On"
                  className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.applicable || ""}
                >
                  <option value="101">Subsctiption Charge</option>
                  <option value="102">Installation Charge</option>
                  <option value="103">Hardware Charge</option>
                  <option value="104">Rental Charge</option>
                  <option value="105">Debit/Credit Notes</option>
                  <option value="106">TDS</option>
                  <option value="107">Service Charge</option>
                  <option value="108">AGR Charge</option>
                </Input>
                {validation.touched.applicable && validation.errors.applicable ? (
                  <FormFeedback type="invalid">
                    {validation.errors.applicable}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
            <Col sm="8">
              <div className="mb-3">
                <Label className="form-label">
                  Description<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="description"
                  type="textarea"
                  placeholder="Enter Description"
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
    </Modal >
  );
};

AddNewPromoVoucher.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default AddNewPromoVoucher;
