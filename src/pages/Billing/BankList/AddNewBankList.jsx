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
import { addNewBank as onAddNewBank } from "/src/store/banklist/actions";
import { useSelector, useDispatch } from "react-redux";

const AddNewBankList = (props) => {
  const { isOpen, toggle } = props;
  const dispatch = useDispatch();
  const [user, setUser] = useState();

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      //BroadCaster: "",
      name: "",
      ifsc_code: "",
      branch: "",
      branch_address: "",
      formso: "",
      status_lbl: "",
      created_at: "",
      created_by: "Admin",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Enter name"),
      ifsc_code: Yup.string().required("Enter IFSC code"),
      branch: Yup.string().required("Enter branch"),
      branch_address: Yup.string().required("Enter branch address"),
      formso: Yup.string().required("Select for mso"),
      status_lbl: Yup.string().required("Select status"),

    }),
    onSubmit: (values) => {
      const newBank = {
        id: Math.floor(Math.random() * (30 - 20)) + 20,
        name: values["name"],
        ifsc_code: values["ifsc_code"],
        status_lbl: values["status_lbl"],
        branch: values["branch"],
        branch_address: values["branch_address"],
        formso: values["formso"],
        created_at: new Date(),
        created_by: values["created_by"],
      };
      console.log("newBank:" + newBank);
      // save new user
      dispatch(onAddNewBank(newBank));
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
      {/* <Modal isOpen={modal} toggle={toggle}> */}
      <ModalHeader tag="h4">Add New Tax</ModalHeader>
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
                  IFSC Code<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="ifsc_code"
                  type="text"
                  placeholder="Enter IFSC Code"
                  // className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.ifsc_code || ""}
                ></Input>
                {validation.touched.ifsc_code && validation.errors.ifsc_code ? (
                  <FormFeedback type="invalid">
                    {validation.errors.ifsc_code}
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
                ></Input>
                {validation.touched.branch && validation.errors.branch ? (
                  <FormFeedback type="invalid">
                    {validation.errors.branch}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
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
                >
                  <option value="101">Select Status</option>
                  <option value="102">Active</option>
                  <option value="103">In-Active</option>
                </Input>
                {validation.touched.status_lbl && validation.errors.status_lbl ? (
                  <FormFeedback type="invalid">
                    {validation.errors.status_lbl}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
          </Row>
          <Row>
            <Col sm="4">
              <div className="mb-3">
                <Label className="form-label">
                  Branch Address<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="branch_address"
                  type="text"
                  placeholder="Enter branch address"
                  // className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.branch_address || ""}
                ></Input>
                {validation.touched.branch_address && validation.errors.branch_address ? (
                  <FormFeedback type="invalid">
                    {validation.errors.branch_address}
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
                  name="formso"
                  type="select"
                  placeholder="Select for mso"
                  className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.formso || ""}
                >
                  <option value="101">Select for mso</option>
                  <option value="102">Yes</option>
                  <option value="103">No</option>
                </Input>
                {validation.touched.formso && validation.errors.formso ? (
                  <FormFeedback type="invalid">
                    {validation.errors.formso}
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

AddNewBankList.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default AddNewBankList;