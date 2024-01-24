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
import { addCity as onAddCity } from "/src/store/city/actions";
import { useSelector, useDispatch } from "react-redux";
import { updateInventoryStockStb as onUpdateInventoryStockStb } from "/src/store/inventorystock/actions";
import { createSelector } from "reselect";

const EditStb = (props) => {
  const { isOpen, stbData, toggle } = props;
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      id: (stbData && stbData.id) || "",
      stbno: (stbData && stbData.stbno) || "",
    },
    validationSchema: Yup.object({
      stbno: Yup.string().required("Enter New STB No."),
    }),
    onSubmit: (values) => {
      const updatedStb = {
        id: values["id"],
        stbno: values["stbno"],
      };
      dispatch(onUpdateInventoryStockStb(updatedStb));
      validation.resetForm();
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
                  name="name"
                  type="text"
                  placeholder="Enter New STB No."
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
                    handleShowCity();
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
