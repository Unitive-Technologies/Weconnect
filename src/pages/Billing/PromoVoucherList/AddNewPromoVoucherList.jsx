import React, { useEffect, useState, useRef, useMemo } from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Modal,
  ModalFooter,
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
      <ModalHeader tag="h4" toggle={toggle}>Generate Promo Voucher</ModalHeader>
      <ModalBody>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            validation.handleSubmit();
            return false;
          }}
        >
          <Row>
            <Col sm="3">
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
                  <option value="101">Select Ico</option>
                  <option value="102">Sri Hari Satlinks</option>
                  <option value="103">Sri Cable Network</option>
                  <option value="104">Sri Deepa Cable Network</option>
                </Input>
                {validation.touched.operator && validation.errors.operator ? (
                  <FormFeedback type="invalid">
                    {validation.errors.operator}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
            <Col sm="3">
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
            <Col sm="3">
              <div className="mb-3">
                <Label className="form-label">
                  Voucher Amount
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
            <Col sm="3">
              <div className="mb-3">
                <Label className="form-label">
                  Voucher MRP
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
          </Row>
          <Row>
            <Col sm="3">
              <div className="mb-3">
                <Label className="form-label">
                  Expiry Date<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="expiry_date"
                  type="date"
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
            <Col sm="6">
              <div className="mb-3">
                <Label className="form-label">
                  Bouquet List<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="bouquets"
                  type="text"
                  placeholder="Select bouquet"
                  // className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.bouquets || ""}
                >
                </Input>
                {validation.touched.bouquets && validation.errors.bouquets ? (
                  <FormFeedback type="invalid">
                    {validation.errors.bouquets}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
            <Col sm="3">
              <div className="mb-3">
                <Label className="form-label">
                  Apply On<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="applied_on"
                  type="select"
                  placeholder="Select Apply on"
                  className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.applied_on || ""}
                >
                  <option value="201">Select Apply On</option>
                  <option value="201">Fresh Activation</option>
                  <option value="202">Renewal</option>
                  <option value="203">BOTH</option>
                </Input>
                {validation.touched.applied_on && validation.errors.applied_on ? (
                  <FormFeedback type="invalid">
                    {validation.errors.applied_on}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
          </Row>
          <Row>
            <Col sm="3">
              <div className="mb-3">
                <Label className="form-label">
                  Recharge Period<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="recharge_period"
                  type="select"
                  placeholder="Select recharge period"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.recharge_period || ""}
                >
                  <option value="21">Select recharge period</option>
                  <option value="22">1day</option>
                  <option value="23">1month</option>
                  <option value="23">2month</option>
                  <option value="23">3month</option>
                  <option value="23">6month</option>
                  <option value="23">1Year</option>

                </Input>
                {validation.touched.recharge_period &&
                  validation.errors.recharge_period ? (
                  <FormFeedback type="invalid">
                    {validation.errors.recharge_period}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
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
                    toggle();
                  }}
                >
                  Cancel
                </button>
              </ModalFooter>
            </Col>
          </Row>
        </Form>
      </ModalBody>
    </Modal >
  );
};

AddNewPromoVoucher.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default AddNewPromoVoucher;
