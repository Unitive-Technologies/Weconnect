import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
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
import { updateSMSMessageTempList as onUpdateSMSMessageTempList } from "/src/store/smsmessage/actions";
import { useDispatch } from "react-redux";
import ViewMetaData from "./ViewMetaData";

const ViewSMSMessageTemplateList = (props) => {
  const {
    isOpen,
    resetSelection,
    toggleViewModal,
    SMSMsgTemp,
    smsmessagetempSubCategory,
    smsmessagetempCategory,
    smsmessagetempStatus,
    smsmessagetempSender,
  } = props;

  console.log(
    "View in  SMS Message Template List :" + JSON.stringify(SMSMsgTemp)
  );
  console.log(
    "View in  SMS Message Template List :" +
    JSON.stringify(smsmessagetempSubCategory)
  );
  const dispatch = useDispatch();

  const [showEditSMS, setShowEditSMS] = useState(false);

  const [metaData, setMetaData] = useState([]);

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      code: (SMSMsgTemp && SMSMsgTemp.code) || "",
      name: (SMSMsgTemp && SMSMsgTemp.name) || "",
      template: (SMSMsgTemp && SMSMsgTemp.template) || "",
      template_id: (SMSMsgTemp && SMSMsgTemp.template_id) || "",
      cat_id: (SMSMsgTemp && SMSMsgTemp.cat_id) || "",
      sub_cat_id: (SMSMsgTemp && SMSMsgTemp.sub_cat_id) || "",
      status_lbl: (SMSMsgTemp && SMSMsgTemp.status_lbl) || "",
      sender_id: (SMSMsgTemp && SMSMsgTemp.sender_id) || "",
      created_at: (SMSMsgTemp && SMSMsgTemp.created_at) || "",
      created_by: (SMSMsgTemp && SMSMsgTemp.created_by) || "my mso(mso)",
      status: (SMSMsgTemp && SMSMsgTemp.status) || "",
      meta_data: (SMSMsgTemp && SMSMsgTemp.meta_data) || "",
    },
    validationSchema: Yup.object({
      code: Yup.string().required("Enter template Code"),
      name: Yup.string().required("Enter template name"),
      status: Yup.string().required("Enter status"),
    }),
    onSubmit: (values) => {
      const updateSMSMessageTemplateList = {
        id: SMSMsgTemp.id,
        code: values.code,
        name: values.name,
        template: values.template,
        template_id: values.template_id,
        cat_id: values.cat_id,
        sub_cat_id: values.sub_cat_id,
        status_lbl: values.status_lbl,
        sender_id: values.sender_id,
        meta_data: values.meta_data,
        // serviceid: values["serviceid"],
        status: values.status,
        created_at: new Date(),
        created_by: values["created_by"],
      };
      console.log("newSMSMessageTemplateList:" + updateSMSMessageTemplateList);
      // save new user
      dispatch(onUpdateSMSMessageTempList(updateSMSMessageTemplateList));
      validation.resetForm();
      toggleViewModal();
      resetSelection();
    },
  });

  const handleCancel = () => {
    setShowEditSMS(false);
    resetSelection();
    toggleViewModal();
  };

  const handleUpdateMetaData = (metaData) => {
    setMetaData(metaData);
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
        {!showEditSMS
          ? `View ${(SMSMsgTemp && SMSMsgTemp.name) || ""}`
          : `Edit ${(SMSMsgTemp && SMSMsgTemp.name) || ""}`}
      </ModalHeader>
      {!showEditSMS && (
        <Link
          style={{
            position: "absolute",
            marginLeft: "92%",
            marginTop: "1%",
          }}
          to="#!"
          className="btn btn-light me-1"
          onClick={() => setShowEditSMS(true)}
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
                  disabled={!showEditSMS}
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
                  disabled={!showEditSMS}
                  // className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.template_id || ""}
                ></Input>
                {validation.touched.template_id &&
                  validation.errors.template_id ? (
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
                  disabled={!showEditSMS}
                  placeholder="Select Definition"
                  className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.cat_id || ""}
                >
                  {smsmessagetempCategory.map((cat_id) => (
                    <option key={cat_id.id} value={cat_id.id}>
                      {cat_id.name}
                    </option>
                  ))}
                </Input>
                {validation.touched.cat_id && validation.errors.cat_id ? (
                  <FormFeedback type="invalid">
                    {validation.errors.cat_id}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
            {console.log(
              "SMS Messgage Temp Status" + smsmessagetempSubCategory
            )}
            <Col sm="4">
              <div className="mb-3">
                <Label className="form-label">
                  Sub-Category<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="sub_cat_id"
                  type="select"
                  placeholder="Enter sub category"
                  disabled={!showEditSMS}
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.sub_cat_id || ""}
                >
                  {smsmessagetempSubCategory &&
                    smsmessagetempSubCategory.map((sub_cat_id) => (
                      <option key={sub_cat_id.id} value={sub_cat_id.id}>
                        {sub_cat_id.name}
                      </option>
                    ))}
                </Input>
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
                  disabled={!showEditSMS}
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.sender_id || ""}
                >
                  {smsmessagetempSender.map((sender_id) => (
                    <option key={sender_id.id} value={sender_id.id}>
                      {sender_id.attribute}
                    </option>
                  ))}
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
                  disabled={!showEditSMS}
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.status || ""}
                >
                  {smsmessagetempStatus.map((status_lbl) => (
                    <option key={status_lbl.id} value={status_lbl.id}>
                      {status_lbl.name}
                    </option>
                  ))}
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
              <ViewMetaData
                isOpen={Boolean(handleUpdateMetaData)}
                updateList={setMetaData}
                data={metaData}
                showEditSMS={showEditSMS} />
            </Col>
          </Row>

          {!showEditSMS && (
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
          )}
        </Form>
      </ModalBody>
    </Modal>
  );
};

ViewSMSMessageTemplateList.propTypes = {
  toggleViewModal: PropTypes.func,
  resetSelection: PropTypes.func,
  isOpen: PropTypes.bool,

  SMSMsgTemp: PropTypes.object,
  smsmessagetempCategory: PropTypes.array,
  smsmessagetempSubcategory: PropTypes.array,
  smsmessagetempSender: PropTypes.array,
  smsmessagetempStatus: PropTypes.array,
};

export default ViewSMSMessageTemplateList;
