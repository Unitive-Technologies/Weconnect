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
  const { isOpen, toggle, SMSMsgTemp } = props;
  const dispatch = useDispatch();
  const [showEditChannel, setShowEditChannel] = useState(false);
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      code: (SMSMsgTemp && SMSMsgTemp.name) || "",
      name: (SMSMsgTemp && SMSMsgTemp.name) || "",
      template: (SMSMsgTemp && SMSMsgTemp.template) || "",
      template_id: (SMSMsgTemp && SMSMsgTemp.template_id) || "",
      cat_id: (SMSMsgTemp && SMSMsgTemp.cat_id) || "",
      sub_cat_id: (SMSMsgTemp && SMSMsgTemp.sub_cat_id) || "",
      status_lbl: (SMSMsgTemp && SMSMsgTemp.status_lbl) || "",
      sender_id: (SMSMsgTemp && SMSMsgTemp.sender_id) || "",
      created_at: (SMSMsgTemp && SMSMsgTemp.created_at) || "",
      created_by: (SMSMsgTemp && SMSMsgTemp.created_by) || "my mso(mso)",
    },
    validationSchema: Yup.object({
      code: Yup.string().required("Enter template Code"),
      name: Yup.string().required("Enter template name"),
      template: Yup.string().required("Enter template"),
      template_id: Yup.string().required("Enter template id"),
      cat_id: Yup.string().required("Enter category id"),
      sub_cat_id: Yup.string().required("Enter subcategory id"),
      status_lbl: Yup.string().required("Enter status"),
      sender_id: Yup.string().required("Enter sender"),

      // serviceid: Yup.string().required("serviceid"),
    }),
    onSubmit: (values) => {
      const newSMSMessageTemplateList = {
        id: Math.floor(Math.random() * (30 - 20)) + 20,
        code: values["code"],
        name: values["name"],
        template: values["template"],
        template_id: values["template_id"],
        cat_id: Yup.string().required("cat_id"),
        sub_cat_id: Yup.string().required("sub_cat_id"),
        status_lbl: values["status_lbl"],
        sender_id: Yup.string().required("sender_id"),
        // serviceid: values["serviceid"],
        created_at: new Date(),
        created_by: values["created_by"],
      };
      console.log("newSMSMessageTemplateList:" + newSMSMessageTemplateList);
      // save new user
      dispatch(onAddNewSMSMessageTempList(newSMSMessageTemplateList));
      validation.resetForm();
      toggle();
    },
    onReset: (values) => {
      validation.setValues(validation.initialValues);
    },
  });

  const handleCancel = () => {
    setShowEditChannel(false);
    toggle();
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
          ? `View `
          : `Edit `}
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
                <Label className="form-label">Template</Label>
                <Input
                  name="Template"
                  type="text"
                  disabled={!showEditChannel}
                  placeholder="Enter template"
                  // className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.template || ""}
                ></Input>
                {validation.touched.template && validation.errors.template ? (
                  <FormFeedback type="invalid">
                    {validation.errors.template}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>

          </Row>
          <Row>
            <Col sm="4">
              <div className="mb-3">
                <Label className="form-label">
                  Template ID<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="Template ID"
                  type="text"
                  placeholder="Enter template ID"
                  disabled={!showEditChannel}
                  // className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.template_id || ""}
                ></Input>
                {validation.touched.template_id && validation.errors.template_id ? (
                  <FormFeedback type="invalid">
                    {validation.errors.template_id}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
            <Col sm="4">
              <div className="mb-3">
                <Label className="form-label">
                  Category<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="Category"
                  type="select"
                  disabled={!showEditChannel}
                  placeholder="Select Definition"
                  className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.cat_id || ""}
                >
                  <option value="101">Select channel definition</option>
                  <option value="102">Standard Definition(SD)</option>
                  <option value="103">High Definition(HD)</option>
                </Input>
                {validation.touched.cat_id &&
                  validation.errors.cat_id ? (
                  <FormFeedback type="invalid">
                    {validation.errors.cat_id}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
            <Col sm="4">
              <div className="mb-3">
                <Label className="form-label">
                  Sub-Category<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="Sub-Category"
                  type="select"
                  placeholder="Enter sub category"
                  disabled={!showEditChannel}
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.sub_cat_id || ""}
                  invalid={
                    validation.touched.sub_cat_id &&
                      validation.errors.sub_cat_id
                      ? true
                      : false
                  }
                />
                {validation.touched.sub_cat_id &&
                  validation.errors.sub_cat_id ? (
                  <FormFeedback type="invalid">
                    {validation.errors.sub_cat_id}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
          </Row>
          <Row>
            <Col sm="4">
              <div className="mb-3">
                <Label className="form-label">
                  Sender ID<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="Sender ID"
                  type="select"
                  placeholder="Select Sender"
                  className="form-select"
                  disabled={!showEditChannel}
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.sender_id || ""}
                >
                  <option value="104">Select channel type</option>
                  <option value="105">Pay Channel</option>
                  <option value="106">FTA</option>
                </Input>
                {validation.touched.sender_id && validation.errors.sender_id ? (
                  <FormFeedback type="invalid">
                    {validation.errors.sender_id}
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
            <h5 style={{}}>Meta Data</h5>
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
