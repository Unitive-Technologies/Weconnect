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
import Select from "react-select";
import * as Yup from "yup";
import { useFormik } from "formik";
import { addNewPromoVoucher as onAddNewPromoVoucher } from "/src/store/promovoucherlist/actions";
import { useDispatch } from "react-redux";
import { getPromoVoucher as onGetPromoVoucher } from "/src/store/actions";

const AddNewPromoVoucher = (props) => {
  const {
    isOpen,
    handleAddPromoVoucher,
    promovoucherApply,
    promovoucherBouquet,
    promovoucherLCO,
    promovoucherRecharge,
  } = props;
  const dispatch = useDispatch();

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      operator: "",
      operator_code: "",
      amount: "",
      mrp: "",
      expiry_date: "",
      bouquets_ids: [],
      applied_on: "",
      recharge_period: "",
    },
    validationSchema: Yup.object({
      operator: Yup.string().required("Select Ico"),
      operator_code: Yup.string().required("Enter voucher count"),
      expiry_date: Yup.string().required("Select expiry date"),
      bouquets_ids: Yup.string().required("Select bouquet"),
      applied_on: Yup.string().required("Select apply on"),
      recharge_period: Yup.string().required("Select recharge periods"),
    }),
    onSubmit: (values) => {
      const BouquetArray = values["bouquets_ids"] || [];
      const BouquetIntegers = BouquetArray.map((option) => parseInt(option));
      console.log("bourquet:" + BouquetIntegers);

      const selectedBouquets = validation.values.bouquets_ids || [];


      const newPromoVoucher = {
        id: Math.floor(Math.random() * (30 - 20)) + 20,
        operator_id: parseInt(values["operator"]),
        voucher_count: values["operator_code"],
        amount: values["amount"],
        mrp: values["mrp"],
        // bouque_ids: promovoucherBouquet.map((single) => parseInt(single.id)),
        bouque_ids: values["bouquets_ids"],
        expiry_date: values["expiry_date"],
        apply_on: parseInt(values["applied_on"]),
        rperiod_id: parseInt(values["recharge_period"]),
        // created_at: new Date(),
        // created_by: values["created_by"],
      };
      console.log("newPromoVoucher:" + newPromoVoucher);
      // save new user
      dispatch(onAddNewPromoVoucher(newPromoVoucher));
      dispatch(onGetPromoVoucher());
      validation.resetForm();
      handleAddPromoVoucher();
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
      toggle={handleAddPromoVoucher}
    >
      <ModalHeader tag="h4" toggle={handleAddPromoVoucher}>
        Generate Promo Voucher
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
                  invalid={
                    validation.touched.operator &&
                      validation.errors.operator
                      ? true
                      : false
                  }
                >
                  <option value="">Select LCO</option>
                  {promovoucherLCO &&
                    promovoucherLCO.map((operator) => (
                      <option key={operator.id} value={operator.id}>
                        {operator.name}
                      </option>
                    ))}
                </Input>
                {validation.touched.operator && validation.errors.operator ? (
                  <FormFeedback type="invalid">
                    {validation.errors.operator}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
            {console.log("operator-lco: " + validation.values.operator)}
            {console.log(
              "operator-lco type: " + typeof validation.values.operator
            )}
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
                  invalid={
                    validation.touched.operator_code &&
                      validation.errors.operator_code
                      ? true
                      : false
                  }
                ></Input>
                {validation.touched.operator_code &&
                  validation.errors.operator_code ? (
                  <FormFeedback type="invalid">
                    {validation.errors.operator_code}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
            {console.log("voucher-count: " + validation.values.operator_code)}
            {console.log(
              "voucher-count type: " + typeof validation.values.operator_code
            )}
            <Col sm="3">
              <div className="mb-3">
                <Label className="form-label">Voucher Amount</Label>
                <Input
                  name="amount"
                  type="text"
                  placeholder="Enter voucher amount"
                  // className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.amount || ""}
                ></Input>
                {validation.touched.amount && validation.errors.amount ? (
                  <FormFeedback type="invalid">
                    {validation.errors.amount}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
            {console.log("amount: " + validation.values.amount)}
            {console.log("amount-type: " + typeof validation.values.amount)}
            <Col sm="3">
              <div className="mb-3">
                <Label className="form-label">Voucher MRP</Label>
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
            {console.log("mrp: " + validation.values.mrp)}
            {console.log("mrp-type: " + typeof validation.values.mrp)}
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
                  invalid={
                    validation.touched.expiry_date &&
                      validation.errors.expiry_date
                      ? true
                      : false
                  }
                ></Input>
                {validation.touched.expiry_date &&
                  validation.errors.expiry_date ? (
                  <FormFeedback type="invalid">
                    {validation.errors.expiry_date}
                  </FormFeedback>
                ) : null}
              </div>
              {console.log("expiry date: " + validation.values.expiry_date)}
              {console.log(
                "expiry date-type: " + typeof validation.values.expiry_date
              )}
            </Col>
            <Col sm="6">
              <div className="mb-3">
                <Label className="form-label">
                  Bouquet List<span style={{ color: "red" }}>*</span>
                </Label>
                <Select
                  name="bouquets_ids"
                  placeholder="Select bouquet"
                  onChange={(selectedOptions) => {
                    validation.setFieldValue(
                      "bouquets_ids",
                      selectedOptions.map((option) => option.value)
                    );
                  }}
                  onBlur={validation.handleBlur}
                  value={promovoucherBouquet.filter((bouquet) =>
                    validation.values.bouquets_ids.includes(bouquet.id)
                  ).map((bouquet) => ({
                    value: bouquet.id,
                    label: bouquet.name
                  }))}
                  isMulti
                  options={promovoucherBouquet.map((bouquet) => ({
                    value: bouquet.id,
                    label: bouquet.name
                  }))}
                  invalid={
                    validation.touched.bouquets_ids &&
                      validation.errors.bouquets_ids
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
                {
                  validation.touched.bouquets_ids &&
                  validation.errors.bouquets_ids && (
                    <FormFeedback type="invalid">
                      {validation.errors.bouquets_ids}
                    </FormFeedback>
                  )
                }
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
                  invalid={
                    validation.touched.applied_on &&
                      validation.errors.applied_on
                      ? true
                      : false
                  }
                >
                  <option value="">Select apply on</option>
                  {promovoucherApply &&
                    promovoucherApply.map((applied_on) => (
                      <option key={applied_on.id} value={applied_on.id}>
                        {applied_on.name}
                      </option>
                    ))}
                </Input>
                {validation.touched.applied_on &&
                  validation.errors.applied_on ? (
                  <FormFeedback type="invalid">
                    {validation.errors.applied_on}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
            {console.log("apply_on: " + validation.values.applied_on)}
            {console.log(
              "apply_on-type: " + typeof validation.values.applied_on
            )}
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
                  invalid={
                    validation.touched.recharge_period &&
                      validation.errors.recharge_period
                      ? true
                      : false
                  }
                >
                  <option value="">Select Recharge</option>
                  {promovoucherRecharge &&
                    promovoucherRecharge.map((recharge_period) => (
                      <option
                        key={recharge_period.id}
                        value={recharge_period.id}
                      >
                        {recharge_period.name}
                      </option>
                    ))}
                </Input>
                {validation.touched.recharge_period &&
                  validation.errors.recharge_period ? (
                  <FormFeedback type="invalid">
                    {validation.errors.recharge_period}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
            {console.log(
              "recharge period: " + validation.values.recharge_period
            )}
            {console.log(
              "recharge period-type: " +
              typeof validation.values.recharge_period
            )}
          </Row>
          <Row>
            <Col>
              <ModalFooter>
                <button
                  type="submit"
                  className="btn btn-success save-user"
                  onClick={(e) => {
                    e.preventDefault();
                    validation.handleSubmit();
                    return false;
                  }}
                >
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
                    handleAddPromoVoucher();
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

AddNewPromoVoucher.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default AddNewPromoVoucher;
