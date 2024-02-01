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
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import { updateBroadcasterBouquet as onUpdateBroadcasterBouquet, addNewBroadcasterBouquetList as onAddNewBroadcasterBouquetList } from "/src/store/broadcasterbouquet/actions";
import { useSelector, useDispatch } from "react-redux";
import AddChannels from "./AddChannels";
import RevenueShare from "./RevenueShare";

const ViewBroadCasterBouquet = (props) => {
  const { isOpen, broadcasterBouquetAddchannels, broadcasterBouquetType, broadcasterBouquetBroadcaster, broadcasterBouquetDefinition, broadcasterBouquetStatus, resetSelection, toggleViewModal, broadcast } = props;
  const dispatch = useDispatch();

  const [showEditBroadcast, setShowEditBroadcast] = useState(false);
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      //BroadCaster: "",
      code: (broadcast && broadcast.code) || "",
      name: (broadcast && broadcast.name) || "",
      definition: (broadcast && broadcast.definition) || "",
      description: (broadcast && broadcast.description) || "",
      type: (broadcast && broadcast.type) || "",
      broadcaster: (broadcast && broadcast.broadcaster) || "",
      status: (broadcast && broadcast.status) || "",
      rate: (broadcast && broadcast.rate) || "",
      channels: (broadcast && broadcast.channels) || "",
      created_by: "Admin",
    },
    validationSchema: Yup.object({
      code: Yup.string().required("Enter Code"),
      name: Yup.string().required("Enter name"),
      definition: Yup.string().required("Select definition"),
      description: Yup.string().required("Enter description"),
      type: Yup.string().required("Select type"),
      broadcaster: Yup.string().required("select broadcaster"),
      status: Yup.string().required("Enter status"),
      rate: Yup.string().required(""),
      channels: Yup.string().required("channels"),
      // serviceid: Yup.string().required("serviceid"),
    }),
    onSubmit: (values) => {
      const updateBroadcasterBouque = {
        id: values.id,
        code: values.code,
        name: values.name,
        definition: values.definition,
        description: values.description,
        type: values.type,
        broadcaster: values.broadcaster,
        status: values.status,
        rate: values.rate,
        channels: values.channels,
        created_at: new Date(),
        created_by: values.created_by,
      };
      console.log(
        "newBroadcasterBouquetList:" + JSON.stringify(updateBroadcasterBouque)
      );
      dispatch(onUpdateBroadcasterBouquet(updateBroadcasterBouque));
      validation.resetForm();
      toggleViewModal();
      resetSelection();
    },
    onReset: (values) => {
      validation.setValues(validation.initialValues);
    },
  });
  const handleCancel = () => {
    setShowEditBroadcast(false);
    resetSelection();
    toggleViewModal();
  };
  return (
    <Modal
      isOpen={isOpen}
      role="dialog"
      autoFocus={true}
      centered={true}
      className="exampleModal"
      tabIndex="-1"
      toggle={handleCancel}
      size="xl"
    >
      <ModalHeader toggle={handleCancel} tag="h4">
        {!showEditBroadcast
          ? `View ${(broadcast && broadcast.name) || ""}`
          : `Edit ${(broadcast && broadcast.name) || ""}`}
      </ModalHeader>
      {!showEditBroadcast && (
        <Link
          style={{
            position: "absolute",
            marginLeft: "92%",
            marginTop: "1%",
          }}
          to="#!"
          className="btn btn-light me-1"
          onClick={() => setShowEditBroadcast(true)}
        >
          <i className="mdi mdi-pencil-outline"></i>
        </Link>
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
                  disabled={!showEditBroadcast}
                ></Input>
                {validation.touched.code && validation.errors.code ? (
                  <FormFeedback type="invalid">
                    {validation.errors.code}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>

            <Col lg={4}>
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
            <Col sm="4"></Col>

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
                  disabled={!showEditBroadcast}
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
                  Definition<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="definition"
                  type="select"
                  placeholder="Select Definition"
                  className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.definition || ""}
                  disabled={!showEditBroadcast}
                >
                  <option value="101">Select definition</option>
                  <option value="102">Standard Definition(SD)</option>
                  <option value="103">High Definition(HD)</option>
                </Input>
                {validation.touched.definition &&
                  validation.errors.definition ? (
                  <FormFeedback type="invalid">
                    {validation.errors.definition}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>

            <Col sm="4">
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
                  disabled={!showEditBroadcast}
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

            <Col sm="4">
              <div className="mb-3">
                <Label className="form-label">
                  Type<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="type"
                  type="select"
                  placeholder="Select Channel type"
                  className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.type || ""}
                  disabled={!showEditBroadcast}
                >
                  <option value="104">Select channel type</option>
                  <option value="105">Pay Channel</option>
                  <option value="106">FTA</option>
                </Input>
                {validation.touched.type && validation.errors.type ? (
                  <FormFeedback type="invalid">
                    {validation.errors.type}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
            <Col sm="4">
              <div className="mb-3">
                <Label className="form-label">
                  Broadcaster<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="broadcaster"
                  type="select"
                  placeholder="Select broadcaster"
                  className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.broadcaster || ""}
                  disabled={!showEditBroadcast}
                >
                  <option value="110">Select broadcaster</option>
                  <option value="111">Lex Sportal Vision Pvt Ltd.</option>
                  <option value="112">Jangama Media Pvt Ltd.</option>
                </Input>
                {validation.touched.broadcaster &&
                  validation.errors.broadcaster ? (
                  <FormFeedback type="invalid">
                    {validation.errors.broadcaster}
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
                  name="status"
                  type="select"
                  placeholder="Select Status"
                  className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.status || ""}
                  disabled={!showEditBroadcast}
                >
                  <option value="101">Select Status</option>
                  <option value="102">Active</option>
                  <option value="103">In-Active</option>
                </Input>
                {validation.touched.status && validation.errors.status ? (
                  <FormFeedback type="invalid">
                    {validation.errors.status}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>

            <Col sm="4">
              <div className="mb-3">
                <Label className="form-label">
                  MRP Rate(INR)<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="rate"
                  type="number"
                  // placeholder="Enter channel code"
                  // className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.rate || ""}
                  disabled={!showEditBroadcast}
                ></Input>
                {validation.touched.rate && validation.errors.rate ? (
                  <FormFeedback type="invalid">
                    {validation.errors.rate}
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
            <h5 style={{}}>MRP Revenue Share</h5>
          </div>
          <Row
            style={{
              position: "relative",
              border: "1px solid #ced4da",
              padding: "20px 0px",
              margin: "30px 0px",
            }}
          >
            <Col sm="12">
              <RevenueShare showEditBroadcast={showEditBroadcast} />
            </Col>
          </Row>

          <div
            style={{
              // margin: "20px 0px",
              marginTop: "-10px",
              marginBottom: "18px",
              zIndex: 12000,
              backgroundColor: "#fff",
              width: "fit-content",
              marginLeft: "40%",
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
            <Col sm="12">
              <AddChannels showEditBroadcast={showEditBroadcast} />
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
                    handleCancel();
                  }}
                >
                  Cancel
                </button>
              </ModalFooter>
            </Col>
          </Row>
        </Form>
      </ModalBody>
      {/* </Modal> */}
    </Modal>
  );
};

ViewBroadCasterBouquet.propTypes = {
  toggleViewModal: PropTypes.func,
  resetSelection: PropTypes.func,
  isOpen: PropTypes.bool,

  broadcast: PropTypes.object,
  broadcasterBouquetAddchannels: PropTypes.object,
  broadcasterBouquetBroadcaster: PropTypes.object,
  broadcasterBouquetDefinition: PropTypes.object,
  broadcasterBouquetStatus: PropTypes.object,
  broadcasterBouquetType: PropTypes.object,
};

export default ViewBroadCasterBouquet;
