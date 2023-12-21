import React, { useState } from "react";
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
import { addBouquet as onAddBouquet } from "/src/store/bouquetlist/actions";
import { useDispatch } from "react-redux";

const CreateBouquet = (props) => {
  const { isOpen, toggle } = props;
  const dispatch = useDispatch();

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      //BroadCaster: "",
      code: "",
      name: "",
      type_lbl: "",
      boxtype_lbl: "",
      type: "",
      status: "",
      description: "",
      is_promotional: "",
      ifFixNCF: "",
      created_by: "Admin",
    },
    validationSchema: Yup.object({
      code: Yup.string().required("Enter Channel Code"),
      name: Yup.string().required("Enter channel name"),
      type_lbl: Yup.string().required("Enter bouquet type"),
      boxtype_lbl: Yup.string().required("Enter box type"),
      type: Yup.string().required("Enter channel type"),
      status: Yup.string().required("Enter status"),
      description: Yup.string().required("Enter description"),
      is_promotional: Yup.string(),
      ifFixNCF: Yup.string(),
    }),
    onSubmit: (values) => {
      const newbouquet = {
        id: Math.floor(Math.random() * (30 - 20)) + 20,
        code: values["code"],
        name: values["name"],
        type_lbl: values["type_lbl"],
        boxtype_lbl: values["boxtype_lbl"],
        type: values["type"],
        status: values["status"],
        description: values["description"],
        is_promotional: values["is_promotional"],
        ifFixNCF: values["ifFixNCF"],
        created_at: new Date(),
        created_by: values["created_by"],
      };
      console.log("New Bouquet List:" + newbouquet);
      // save new user
      dispatch(onAddBouquet(newbouquet));
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
      autoFocus={true}
      centered={true}
      className="exampleModal"
      tabIndex="-1"
      toggle={toggle}
      size="xl"
    >
      <ModalHeader tag="h4" toggle={toggle}>
        Add New Bouquet
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
                <Label className="form-label">Code</Label>
                <Input
                  name="code"
                  type="text"
                  placeholder="Enter code"
                  // className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.code || ""}
                ></Input>
                {validation.touched.code && validation.errors.code ? (
                  <FormFeedback type="invalid">
                    {validation.errors.code}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>

            <Col lg={2}>
              <div className="form-check form-switch form-switch-lg mb-3">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="customSwitchsizelg"
                  defaultChecked
                />
                <label
                  className="form-check-label"
                  htmlFor="customSwitchsizelg"
                >
                  Custom / Auto
                </label>
              </div>
            </Col>
          </Row>
          <Row>
            <Col sm="3">
              <div className="mb-3">
                <Label className="form-label">
                  Name<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="name"
                  type="text"
                  placeholder="Enter name"
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
            <Col sm="3">
              <div className="mb-3">
                <Label className="form-label">
                  Box Type<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="boxtype_lbl"
                  type="select"
                  placeholder="Select boxtype_lbl"
                  className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.boxtype_lbl || ""}
                >
                  <option value="">Select box type</option>
                  <option value="SD">Standard boxtype_lbl(SD)</option>
                  <option value="HD">High boxtype_lbl(HD)</option>
                </Input>
                {validation.touched.boxtype_lbl &&
                validation.errors.boxtype_lbl ? (
                  <FormFeedback type="invalid">
                    {validation.errors.boxtype_lbl}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
            <Col sm="3">
              <div className="mb-3">
                <Label className="form-label">
                  Bouquet Type<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="type_lbl"
                  type="select"
                  placeholder="Select bouquet type"
                  rows="3"
                  className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.type_lbl || ""}
                  invalid={
                    validation.touched.type_lbl && validation.errors.type_lbl
                      ? true
                      : false
                  }
                >
                  <option value="">Select bouquet type</option>
                  <option value="Base">Base</option>
                  <option value="Addon">Addon</option>
                  <option value="Alacarte">Alacarte</option>
                </Input>
                {validation.touched.type_lbl && validation.errors.type_lbl ? (
                  <FormFeedback type="invalid">
                    {validation.errors.type_lbl}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
            <Col sm="3">
              <div className="mb-3">
                <Label className="form-label">
                  Status<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="status"
                  type="select"
                  placeholder="select status"
                  rows="3"
                  className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.status || ""}
                  invalid={
                    validation.touched.status && validation.errors.status
                      ? true
                      : false
                  }
                >
                  <option value="">Select status</option>
                  <option value="1">Active</option>
                  <option value="0">In-active</option>
                </Input>
                {validation.touched.status && validation.errors.status ? (
                  <FormFeedback type="invalid">
                    {validation.errors.status}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
          </Row>
          <Row>
            <Col sm="3">
              <div className="mb-3">
                <Label className="form-label">
                  Description<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="description"
                  type="textarea"
                  placeholder="Enter description"
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
            <Col sm="3">
              <div className="mb-3">
                <Label className="form-label">
                  Is Exclusive<span style={{ color: "red" }}>*</span>{" "}
                  <i className="mdi mdi-information"></i>
                </Label>
                <Input
                  name="is_exclusive_lbl"
                  type="select"
                  placeholder="Select Status"
                  className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.is_exclusive_lbl || ""}
                >
                  <option value="Not Exclusive">Not Exclusive</option>
                  <option value="Only MSO user can Assign and Renew">
                    Only MSO user can Assign and Renew
                  </option>
                  <option value="LCO can Renew">LCO can Renew </option>
                </Input>
                {validation.touched.is_exclusive_lbl &&
                validation.errors.is_exclusive_lbl ? (
                  <FormFeedback type="invalid">
                    {validation.errors.is_exclusive_lbl}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
            <Col sm="3">
              <div className="mb-3">
                <Label className="form-label">
                  Is Promotional<span style={{ color: "red" }}>*</span>
                  <i className="mdi mdi-information"></i>
                </Label>
                <Input
                  name="is_promotional"
                  type="select"
                  placeholder="Select Status"
                  className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.is_promotional || ""}
                  disabled
                >
                  <option value="1">No</option>
                  <option value="0">Yes</option>
                </Input>
                {validation.touched.is_promotional &&
                validation.errors.is_promotional ? (
                  <FormFeedback type="invalid">
                    {validation.errors.is_promotional}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
            <Col sm="3">
              <div className="mb-3">
                <Label className="form-label">
                  NCF<span style={{ color: "red" }}>*</span>{" "}
                  <i className="mdi mdi-information"></i>
                </Label>
                <div className="form-check form-switch form-switch-lg mb-3">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="customSwitchsizelg"
                    defaultChecked
                  />
                  <label
                    className="form-check-label"
                    htmlFor="customSwitchsizelg"
                  >
                    Fix NCF / Dynamic NCF
                  </label>
                </div>
                {validation.touched.ifFixNCF && validation.errors.ifFixNCF ? (
                  <FormFeedback type="invalid">
                    {validation.errors.ifFixNCF}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
          </Row>
          <div
            style={{
              // margin: "20px 0px",
              marginTop: "20px",
              marginBottom: "18px",
              zIndex: 12000,
              backgroundColor: "#fff",
              width: "fit-content",
              marginLeft: "40%",
              position: "absolute",
              padding: "0px 10px",
            }}
          >
            <h5 style={{}}>CAS LIST</h5>
          </div>
          <Row
            style={{
              position: "relative",
              border: "1px solid #ced4da",
              padding: "20px 0px",
              margin: "30px 0px",
            }}
          >
            <Col lg={6}>
              <div className="mb-3">
                {/* <Label className="form-label">Status</Label> */}
                <Input
                  name="cas"
                  type="select"
                  placeholder="Select CAS"
                  className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.cas || ""}
                >
                  <option value="21">Select CAS</option>
                  <option value="22">NSTV</option>
                </Input>
                {validation.touched.cas && validation.errors.cas ? (
                  <FormFeedback type="invalid">
                    {validation.errors.cas}
                  </FormFeedback>
                ) : null}
              </div>

              <div className="mb-3">
                {/* <Label className="form-label">Status</Label> */}
                <Input
                  name="cascode"
                  // type="select"
                  placeholder="Cascode"
                  // className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.cascode || ""}
                ></Input>
                {validation.touched.cascode && validation.errors.cascode ? (
                  <FormFeedback type="invalid">
                    {validation.errors.cascode}
                  </FormFeedback>
                ) : null}
              </div>

              <div className="mb-3">
                {/* <Label className="form-label">Status</Label> */}
                <Input
                  name="serviceid"
                  // type="select"
                  placeholder="Service id"
                  // className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.serviceid || ""}
                ></Input>
                {validation.touched.serviceid && validation.errors.serviceid ? (
                  <FormFeedback type="invalid">
                    {validation.errors.serviceid}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>

            <Col sm="6">{/* <CasList /> */}</Col>
          </Row>
          <div
            style={{
              display: "flex",
              width: "1000px",
            }}
          >
            <div
              style={{
                // margin: "20px 0px",
                marginTop: "20px",
                marginBottom: "18px",
                zIndex: 12000,
                backgroundColor: "#fff",
                width: "fit-content",
                marginLeft: "20%",

                position: "absolute",
                padding: "0px 10px",
              }}
            >
              <h5 style={{}}>Add Channels</h5>
            </div>
            <Row
              style={{
                position: "relative",
                border: "1px solid #ced4da",
                padding: "20px 0px",
                margin: "30px 0px",
              }}
            >
              <Col sm="12" style={{ width: "500px" }}>
                {/* <AddChannels /> */}
              </Col>
            </Row>
            <div
              style={{
                // margin: "20px 0px",
                marginTop: "20px",
                marginBottom: "18px",
                zIndex: 12000,
                backgroundColor: "#fff",
                width: "fit-content",
                marginLeft: "50%",
                position: "absolute",
                padding: "0px 10px",
              }}
            >
              <h5 style={{}}>Add Broadcaster Bouquets</h5>
            </div>
            <Row
              style={{
                position: "relative",
                border: "1px solid #ced4da",
                padding: "20px 0px",
                margin: "30px 0px",
              }}
            >
              <Col sm="12" style={{ width: "500px" }}>
                {/* <AddBroadcasterBouquets /> */}
              </Col>
            </Row>
          </div>
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
    </Modal>
  );
};

CreateBouquet.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default CreateBouquet;
