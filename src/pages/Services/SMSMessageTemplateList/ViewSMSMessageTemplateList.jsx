import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
// import RevenueShare from "./RevenueShare";
import {
  Col,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
  FormFeedback,
  Input,
  Form,
} from "reactstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import { addNewSMSMessageTempList as onAddNewSMSMessageTempList } from "/src/store/smsmessage/actions";
import { useDispatch } from "react-redux";
import ViewMetaData from "./ViewMetaData"

const ViewSMSMessageTemplateList = (props) => {
  const { isOpen, handleViewSMSMessageTemplateList, SMSMsgTemp } = props;
  const dispatch = useDispatch();
  const [showEditChannel, setShowEditChannel] = useState(false);
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      code: "",
      name: "",
      description: "",
      definition: "",
      type: "",
      status: "",
      cas: "",
      cascode: "",
      created_by: "Admin",
    },
    validationSchema: Yup.object({
      code: Yup.string().required("Enter Channel Code"),
      name: Yup.string().required("Enter channel name"),
      description: Yup.string().required("Enter description"),
      definition: Yup.string().required("Enter channel definition"),
      type: Yup.string().required("Enter channel type"),
      status: Yup.string().required("Enter status"),
      cas: Yup.string().required("Enter cas"),
      cascode: Yup.string().required("cascode"),
      // serviceid: Yup.string().required("serviceid"),
    }),
    onSubmit: (values) => {
      const newSMSMessageTemplateList = {
        id: Math.floor(Math.random() * (30 - 20)) + 20,
        code: values["code"],
        name: values["name"],
        description: values["description"],
        definition: values["definition"],
        type: values["type"],
        status: values["status"],
        cas: values["cas"],
        cascode: values["cascode"],
        // serviceid: values["serviceid"],
        created_at: new Date(),
        created_by: values["created_by"],
      };
      console.log("newSMSMessageTemplateList:" + newSMSMessageTemplateList);
      // save new user
      dispatch(onAddNewSMSMessageTempList(newSMSMessageTemplateList));
      validation.resetForm();
      handleViewSMSMessageTemplateList();
    },
    onReset: (values) => {
      validation.setValues(validation.initialValues);
    },
  });

  const handleCancel = () => {
    setShowEditChannel(false);
    handleViewSMSMessageTemplateList();
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
        {!showEditChannel
          ? `View ${(SMSMsgTemp && SMSMsgTemp.name) || ""}`
          : `Edit ${(SMSMsgTemp && SMSMsgTemp.name) || ""}`}
      </ModalHeader>
      {!showEditChannel && (
        <Link
          style={{
            position: "absolute",
            marginLeft: "92%",
            marginTop: "1%",
          }}
          to="#!"
          className="btn btn-light me-1"
          onClick={() => setShowEditChannel(true)}
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
                  disabled={!showEditChannel}
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

          </Row>
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
                  disabled={!showEditChannel}
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
                  Definition<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="definition"
                  type="select"
                  disabled={!showEditChannel}
                  placeholder="Select Definition"
                  className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.definition || ""}
                >
                  <option value="101">Select channel definition</option>
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
                  disabled={!showEditChannel}
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
            <Col sm="4">
              <div className="mb-3">
                <Label className="form-label">
                  Type<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="type"
                  type="select"
                  placeholder="Select type"
                  className="form-select"
                  disabled={!showEditChannel}
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.type || ""}
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
                  Status<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="status"
                  type="select"
                  placeholder="Select Status"
                  className="form-select"
                  disabled={!showEditChannel}
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.status || ""}
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
            <Col sm="12">
              <ViewMetaData />
            </Col>
          </Row>
          < div
            style={{
              display: "flex",
            }
            }
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
              <Col sm="12" style={{ width: "550px" }}>
                <ViewMetaData />
              </Col>
            </Row>

          </div >
          <div style={{
            display: "flex"
          }}>
            <Row
              style={{
                position: "relative",
                border: "1px solid #ced4da",
                padding: "5px 0px",
                margin: "10px 0px",
                width: "550px", height: "50px",
                display: "flex",
              }}
            >
              <div
                style={{
                  marginTop: "20px",
                  marginBottom: "18px",
                  backgroundColor: "#fff",
                  padding: "0px 10px",
                }}
              >
                <h6 style={{ textAlign: "center" }}>TOTAL CHANNELS:</h6>
              </div>
            </Row>
            <Row
              style={{
                position: "relative",
                border: "1px solid #ced4da",
                padding: "5px 0px",
                margin: "10px 0px",
                width: "550px",
                height: "50px",
                display: "flex",
              }}
            >
              <div
                style={{
                  marginTop: "20px",
                  marginBottom: "18px",
                  backgroundColor: "#fff",
                  padding: "0px 10px",
                }}
              >
                <h6 style={{ textAlign: "center" }}>PACKAGE RATE:</h6>
              </div>
            </Row>
          </div>

          {/* {!showEditChannel && ( */}
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
          {/* )} */}
        </Form>
      </ModalBody>
    </Modal>
  );
};

ViewSMSMessageTemplateList.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default ViewSMSMessageTemplateList;
