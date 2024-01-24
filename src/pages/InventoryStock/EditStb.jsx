import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Col,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
  FormFeedback,
  Input,
  Form,
  ModalFooter,
} from "reactstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import {
  updateInventoryStockStb as onUpdateInventoryStockStb,
  // getInventoryStockStb as onGetInventoryStockStb,
} from "/src/store/inventorystock/actions";
import { getInventoryStockStb as onGetInventoryStockStb } from "/src/store/actions";

const EditStb = (props) => {
  const { isOpen, stbData, toggle } = props;

  const dispatch = useDispatch();
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      id: (stbData && stbData.id) || "",
      stbno: (stbData && stbData.stbno) || "",
      stbno1: "",
    },
    validationSchema: Yup.object({
      stbno1: Yup.string().required("Enter New STB No."),
    }),
    onSubmit: (values) => {
      const updatedStb = {
        id: values["id"],
        stbno: values["stbno1"],
      };
      console.log("Updated stb: ", updatedStb);
      dispatch(onUpdateInventoryStockStb(updatedStb));
      dispatch(onGetInventoryStockStb());
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
      role="dialog"
      size="xl"
      autoFocus={true}
      centered={true}
      className="exampleModal"
      tabIndex="-1"
      toggle={toggle}
    >
      <ModalHeader tag="h4" toggle={toggle}>
        Change STB Number
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
            <Col lg={4}>
              <div className="mb-3">
                <Label className="form-label">Current STB No.</Label>
                <Input
                  name="stbno"
                  type="text"
                  // placeholder="Enter city name"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.stbno || ""}
                  invalid={
                    validation.touched.stbno && validation.errors.stbno
                      ? true
                      : false
                  }
                  disabled
                />
                {validation.touched.stbno && validation.errors.stbno ? (
                  <FormFeedback type="invalid">
                    {validation.errors.stbno}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
            <Col lg={4}>
              <div className="mb-3">
                <Label className="form-label">
                  New STB No.<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="stbno1"
                  type="text"
                  placeholder="Enter New STB No."
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.stbno1 || ""}
                  invalid={
                    validation.touched.stbno1 && validation.errors.stbno1
                      ? true
                      : false
                  }
                />
                {validation.touched.stbno1 && validation.errors.stbno1 ? (
                  <FormFeedback type="invalid">
                    {validation.errors.stbno1}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <ModalFooter>
                <button type="submit" className="btn btn-success save-user">
                  Change
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
    </Modal>
  );
};

EditStb.propTypes = {
  handleShowCity: PropTypes.func,
  isOpen: PropTypes.bool,
  statelist: PropTypes.array,
  status: PropTypes.array,
};

export default EditStb;
