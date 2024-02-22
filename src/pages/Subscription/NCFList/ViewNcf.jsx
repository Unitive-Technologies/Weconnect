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
  Card,
  CardBody,
  Table,
} from "reactstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import AddMultipleNcf from "./AddMultipleNcf";

const ViewNcf = (props) => {
  const { isOpen, toggle, ncf } = props;
  console.log("ncf:" + JSON.stringify(ncf));
  const dispatch = useDispatch();
  const [showEditNcf, setShowEditNcf] = useState(false);
  const [additionalRates, setAdditionalRates] = useState(
    (ncf && ncf.additional_rates) || []
  );
  console.log("additionalRates in view :" + JSON.stringify(additionalRates));
  const editToggle = () => {
    setShowEditNcf(false);
    toggle();
  };

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      name: (ncf && ncf.name) || "",
      code: (ncf && ncf.code) || "",
      status: (ncf && ncf.status) || "",
      calculate_per_channel: (ncf && ncf.calculate_per_channel) || "",
      from_channel_no: (ncf && ncf.from_channel_no) || "",
      to_channel_no: (ncf && ncf.to_channel_no) || "",
      is_refundable: (ncf && ncf.is_refundable) || "",
      mrp: (ncf && ncf.mrp) || "",
      lmo_discount: (ncf && ncf.lmo_discount) || "",
      lmo_rate: (ncf && ncf.lmo_rate) || "",
      status_lbl: (ncf && ncf.status_lbl) || "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Enter name"),
      code: Yup.string().required("Enter code"),
      status: Yup.string().required("Select status"),
      calculate_per_channel: Yup.string().required(
        "Select calculate per channel"
      ),
      from_channel_no: Yup.string().required("Enter from channel"),
      to_channel_no: Yup.string().required("Enter to channel"),
      is_refundable: Yup.string().required("Select refundable"),
      mrp: Yup.string(),
      lmo_discount: Yup.string(),
      lmo_rate: Yup.string(),
    }),
    onSubmit: (values) => {
      const updateNcf = {
        id: Math.floor(Math.random() * (30 - 20)) + 20,
        name: values["name"],
        code: values["code"],
        status: values["status"],
        calculate_per_channel: values["calculate_per_channel"],
        from_channel_no: values["from_channel_no"],
        to_channel_no: values["to_channel_no"],
        is_refundable: values["is_refundable"],
        mrp: values["mrp"],
        lmo_discount: values["lmo_discount"],
        lmo_rate: values["lmo_rate"],
        created_at: new Date(),
        created_by: values["created_by"],
      };
      console.log("Update NCF:" + JSON.stringify(updateNcf));
      dispatch(onAddNcf(updateNcf));
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
      {!showEditNcf ? (
        <ModalHeader toggle={toggle} tag="h4">
          View NCF Details
          <i
            className="bx bx bxs-edit"
            style={{
              position: "absolute",
              marginLeft: "78%",
              cursor: "pointer",
              marginTop: ".5%",
            }}
            onClick={() => setShowEditNcf(true)}
          ></i>
        </ModalHeader>
      ) : (
        <ModalHeader toggle={editToggle} tag="h4">
          Edit NCF
        </ModalHeader>
      )}
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
                  Name<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="name"
                  type="text"
                  placeholder="Enter name"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.name || ""}
                  invalid={
                    validation.touched.name && validation.errors.name
                      ? true
                      : false
                  }
                  disabled={!showEditNcf}
                />
                {validation.touched.name && validation.errors.name ? (
                  <FormFeedback type="invalid">
                    {validation.errors.name}
                  </FormFeedback>
                ) : null}
              </div>

              <div className="mb-3">
                <Label className="form-label">
                  From Channel<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="from_channel_no"
                  type="text"
                  placeholder="Enter from channel"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.from_channel_no || ""}
                  invalid={
                    validation.touched.from_channel_no &&
                    validation.errors.from_channel_no
                      ? true
                      : false
                  }
                  disabled={!showEditNcf}
                />
                {validation.touched.from_channel_no &&
                validation.errors.from_channel_no ? (
                  <FormFeedback type="invalid">
                    {validation.errors.from_channel_no}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
            <Col sm="3">
              <div className="mb-3">
                <Label className="form-label">
                  Code<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="code"
                  type="text"
                  placeholder="Enter code"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.code || ""}
                  invalid={
                    validation.touched.code && validation.errors.code
                      ? true
                      : false
                  }
                  disabled={!showEditNcf}
                />
                {validation.touched.code && validation.errors.code ? (
                  <FormFeedback type="invalid">
                    {validation.errors.code}
                  </FormFeedback>
                ) : null}
              </div>

              <div className="mb-3">
                <Label className="form-label">
                  To Channel<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="to_channel_no"
                  type="text"
                  placeholder="Enter to channel"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.to_channel_no || ""}
                  invalid={
                    validation.touched.to_channel_no &&
                    validation.errors.to_channel_no
                      ? true
                      : false
                  }
                  disabled={!showEditNcf}
                />
                {validation.touched.to_channel_no &&
                validation.errors.to_channel_no ? (
                  <FormFeedback type="invalid">
                    {validation.errors.to_channel_no}
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
                  placeholder="Select status"
                  className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.status || ""}
                  disabled={!showEditNcf}
                >
                  <option value="">Select status</option>
                  <option value="Active">Active</option>
                  <option value="In_active">In-Active</option>
                </Input>
                {validation.touched.status && validation.errors.status ? (
                  <FormFeedback type="invalid">
                    {validation.errors.status}
                  </FormFeedback>
                ) : null}
              </div>

              <div className="mb-3">
                <Label className="form-label">
                  Is Refundable<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="is_refundable"
                  type="select"
                  placeholder="Select refundable"
                  className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.is_refundable || ""}
                  disabled={!showEditNcf}
                >
                  <option value="">Select refundable</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </Input>
                {validation.touched.is_refundable &&
                validation.errors.is_refundable ? (
                  <FormFeedback type="invalid">
                    {validation.errors.is_refundable}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
            <Col sm="3">
              <div className="mb-3">
                <Label className="form-label">
                  Calculate per channel<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="calculate_per_channel"
                  type="select"
                  placeholder="Select calculate per channel"
                  className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.calculate_per_channel || ""}
                  disabled={!showEditNcf}
                >
                  <option value="">Select calculate per channel</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </Input>
                {validation.touched.calculate_per_channel &&
                validation.errors.calculate_per_channel ? (
                  <FormFeedback type="invalid">
                    {validation.errors.calculate_per_channel}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
          </Row>
          <Row>
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
              <p style={{ fontWeight: "bold" }}>Default NCF</p>
            </div>
            <Row
              style={{
                position: "relative",
                border: "1px solid #ced4da",
                padding: "20px 0px",
                margin: "30px 0px",
              }}
            >
              <Col sm="4">
                <div className="mb-3">
                  <Label className="form-label">
                    MRP (INR)<span style={{ color: "red" }}>*</span>
                  </Label>
                  <Input
                    name="mrp"
                    type="number"
                    placeholder="0"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.mrp || ""}
                    invalid={
                      validation.touched.mrp && validation.errors.mrp
                        ? true
                        : false
                    }
                    disabled={!showEditNcf}
                  />
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
                    LCO Discount (%)<span style={{ color: "red" }}>*</span>
                  </Label>
                  <Input
                    name="lmo_discount"
                    type="number"
                    placeholder="0"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.lmo_discount || ""}
                    invalid={
                      validation.touched.lmo_discount &&
                      validation.errors.lmo_discount
                        ? true
                        : false
                    }
                    disabled={!showEditNcf}
                  />
                  {validation.touched.lmo_discount &&
                  validation.errors.lmo_discount ? (
                    <FormFeedback type="invalid">
                      {validation.errors.lmo_discount}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Col sm="4">
                <div className="mb-3">
                  <Label className="form-label">
                    LCO Rate<span style={{ color: "red" }}>*</span>
                  </Label>
                  <Input
                    name="lmo_rate"
                    type="number"
                    placeholder="0"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.lmo_rate || ""}
                    invalid={
                      validation.touched.lmo_rate && validation.errors.lmo_rate
                        ? true
                        : false
                    }
                    disabled={!showEditNcf}
                  />
                  {validation.touched.lmo_rate && validation.errors.lmo_rate ? (
                    <FormFeedback type="invalid">
                      {validation.errors.lmo_rate}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
            </Row>
          </Row>
          <Row>
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
              <p style={{ fontWeight: "bold" }}>Add Mutiple NCF Rates</p>
            </div>
            {!showEditNcf ? (
              <Row
                style={{
                  position: "relative",
                  border: "1px solid #ced4da",
                  padding: "20px 0px",
                  margin: "30px 0px",
                }}
              >
                <Card>
                  <CardBody>
                    <div className="table-responsive">
                      <Table className="table mb-0">
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>MRP</th>
                            <th>LCO Discount(%)</th>
                            <th>LCO Rate</th>
                            <th>Calcuate Per Channel</th>
                            <th>Is Refundable</th>
                            <th>$</th>
                          </tr>
                        </thead>
                        <tbody>
                          {additionalRates &&
                            additionalRates.map((item, index) => (
                              <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{item.name}</td>
                                <td>{item.mrp}</td>
                                <td>{item.lmo_discount}</td>
                                <td>{item.lmo_rate}</td>
                                <td>
                                  {parseInt(item.calculate_per_channel) === 1
                                    ? "Yes"
                                    : "No"}
                                </td>
                                <td>
                                  {parseInt(item.is_refundable) === 1
                                    ? "Yes"
                                    : "No"}
                                </td>
                                {/* <td>
                                  <h5>
                                    <Link
                                      className="text-dark"
                                      to="#"
                                      onClick={() => deleteMultipleNcf(index)}
                                    >
                                      <i
                                        className="mdi mdi-delete font-size-18"
                                        id="deletetooltip"
                                      />
                                    </Link>
                                  </h5>
                                </td> */}
                              </tr>
                            ))}
                        </tbody>
                      </Table>
                    </div>
                  </CardBody>
                </Card>
              </Row>
            ) : (
              <Row
                style={{
                  position: "relative",
                  border: "1px solid #ced4da",
                  padding: "20px 0px",
                  margin: "30px 0px",
                }}
              >
                {console.log("showEditNcf before:" + showEditNcf)}
                <AddMultipleNcf
                  additionalRates={additionalRates}
                  setAdditionalRates={setAdditionalRates}
                  mrp={validation.values.mrp}
                  showEditNcf={showEditNcf}
                />
              </Row>
            )}
          </Row>
          <Row>
            <Col>
              <div className="text-end">
                <button type="submit" className="btn btn-success save-user">
                  Save
                </button>
              </div>
            </Col>
          </Row>
        </Form>
      </ModalBody>
      {/* </Modal> */}
    </Modal>
  );
};

ViewNcf.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default ViewNcf;
