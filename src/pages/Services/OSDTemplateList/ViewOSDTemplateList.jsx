import React, { useEffect, useState, useRef, useMemo } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
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
import * as Yup from "yup";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { updateUser as onUpdateUser } from "/src/store/users/actions";

const ViewOSDTemplateList = (props) => {
    const { isOpen, resetSelection, toggleViewModal, osdTemplate, osdTempOSD, osdTempStatus, osdTempTemplateFor } = props;
    //   console.log("user in viewuser modal:" + JSON.stringify(user));
    const dispatch = useDispatch();
    const [showEditosdTemplate, setShowEditosdTemplate] = useState(false);

    const validation = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,

        initialValues: {
            id: (osdTemplate && osdTemplate.id) || "",
            name: (osdTemplate && osdTemplate.name) || "",
            title: (osdTemplate && osdTemplate.title) || "",
            template_for: (osdTemplate && osdTemplate.template_for) || "",
            template: (osdTemplate && osdTemplate.template) || { template_message: "", template_title: "" },
            template_config_id: (osdTemplate && osdTemplate.template_config_id) || [],
            status: (osdTemplate && osdTemplate.status) || "",
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Enter name"),
            status: Yup.string().required("Select status"),
        }),
        onSubmit: (values) => {
            let template = {};
            if (values.template_for === "1") {
                template = {
                    template_message: values.template.template_message,
                    // No need to include template_title for SMS
                };
            } else if (values.template_for === "2") {
                template = {
                    template_message: values.template_message,
                    // No need to include template_title for SMS
                };
            } else if (values.template_for === "3") {
                template = {
                    template_message: values.template_message, // Assuming content goes to template_message
                    template_title: values.template_title,
                };
            }

            const updateOSDTemplate = {
                id: osdTemplate.id,
                name: values["name"],
                template_for: values["template_for"],
                template: template,
                showcontent: values["showcontent"],
                bmailtitle: values["bmailtitle"],
                content: values["content"],
                status: values["status"],
                template_config_id: values.template_config_id.map(option => option.id),
                created_at: new Date(),
                created_by: values["created_by"],
            };
            // update user
            dispatch(onUpdateUser(updateOSDTemplate));
            validation.resetForm();
            toggleViewModal();
            resetSelection();
        },
    });

    const handleCancel = () => {
        setShowEditosdTemplate(false);
        resetSelection();
        toggleViewModal();
    };

    return (
        <>
            <Modal
                isOpen={isOpen}
                role="dialog"
                size="xl"
                autoFocus={true}
                centered={true}
                className="exampleModal"
                tabIndex="-1"
                toggle={handleCancel}
            >
                <ModalHeader toggle={handleCancel} tag="h4">
                    {!showEditosdTemplate
                        ? `View ${(osdTemplate && osdTemplate.name) || ""}`
                        : `Edit ${(osdTemplate && osdTemplate.name) || ""}`}
                </ModalHeader>
                {!showEditosdTemplate && (
                    <Link
                        style={{
                            position: "absolute",
                            marginLeft: "92%",
                            marginTop: "1%",
                        }}
                        to="#!"
                        className="btn btn-light me-1"
                        onClick={() => setShowEditosdTemplate(true)}
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
                                    <Label className="form-label">Name<span style={{ color: 'red' }}>*</span></Label>
                                    <Input
                                        name="name"
                                        type="text"
                                        placeholder="Enter name"
                                        // className="form-select"
                                        onChange={validation.handleChange}
                                        onBlur={validation.handleBlur}
                                        value={validation.values.name || ""}
                                        disabled={!showEditosdTemplate}
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
                                    <Label className="form-label">Template For<span style={{ color: 'red' }}>*</span></Label>
                                    <Input
                                        name="template_for"
                                        type="select"
                                        placeholder="Select template for"
                                        className="form-select"
                                        onChange={validation.handleChange}
                                        onBlur={validation.handleBlur}
                                        value={validation.values.template_for || ""}
                                        disabled={!showEditosdTemplate}
                                    >
                                        <option value="">Select Template For</option>
                                        {osdTempTemplateFor &&
                                            osdTempTemplateFor.map((template_for) => (
                                                <option key={template_for.id} value={template_for.id}>
                                                    {template_for.name}
                                                </option>
                                            ))}
                                    </Input>
                                    {validation.touched.template_for && validation.errors.template_for ? (
                                        <FormFeedback type="invalid">
                                            {validation.errors.template_for}
                                        </FormFeedback>
                                    ) : null}
                                </div>
                            </Col>
                            <Col sm="4">
                                <div className="mb-3">
                                    <Label className="form-label">Status<span style={{ color: 'red' }}>*</span></Label>
                                    <Input
                                        name="status"
                                        type="select"
                                        placeholder="Select Status"
                                        className="form-select"
                                        onChange={validation.handleChange}
                                        onBlur={validation.handleBlur}
                                        value={validation.values.status || ""}
                                        disabled={!showEditosdTemplate}
                                    >
                                        <option value="">Select Status</option>
                                        {osdTempStatus &&
                                            osdTempStatus.map((status) => (
                                                <option key={status.id} value={status.id}>
                                                    {status.name}
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

                            <div>
                                {validation.values.template_for === "1" && (
                                    < Col sm="4">
                                        <div className="mb-3">
                                            <Label className="form-label">SMS Template (max 140 characters)<span style={{ color: 'red' }}>*</span></Label>
                                            <Input
                                                name="template_message"
                                                type="textarea"
                                                placeholder="Enter SMS template"
                                                // className="form-select"
                                                onChange={validation.handleChange}
                                                onBlur={validation.handleBlur}
                                                value={validation.values.template_message || ""}
                                                row="3"
                                                disabled={!showEditosdTemplate}
                                            >
                                            </Input>
                                            {validation.touched.template_message && validation.errors.template_message ? (
                                                <FormFeedback type="invalid">
                                                    {validation.errors.template_message}
                                                </FormFeedback>
                                            ) : null}
                                        </div>
                                    </Col>
                                )}
                            </div>
                            <div>
                                {validation.values.template_for === "2" && (
                                    <Row>
                                        <Col sm="4">
                                            <div className="mb-3">
                                                <Label className="form-label">OSD Show Content<span style={{ color: 'red' }}>*</span></Label>
                                                <Input
                                                    name="template_message"
                                                    type="textarea"
                                                    placeholder="Enter SMS template"
                                                    // className="form-select"
                                                    onChange={validation.handleChange}
                                                    onBlur={validation.handleBlur}
                                                    value={validation.values.template_message || ""}
                                                    row="3"
                                                    disabled={!showEditosdTemplate}
                                                >
                                                </Input>
                                                {validation.touched.template_message && validation.errors.template_message ? (
                                                    <FormFeedback type="invalid">
                                                        {validation.errors.template_message}
                                                    </FormFeedback>
                                                ) : null}
                                            </div>
                                        </Col>
                                        <Col sm="4">
                                            <div className="mb-3">
                                                <Label className="form-label">CAS Config (Select only 1 config per CAS)<span style={{ color: 'red' }}>*</span></Label>
                                                <Input
                                                    name="template_config_id"
                                                    type="select"
                                                    placeholder="Select Status"
                                                    className="form-select"
                                                    onChange={validation.handleChange}
                                                    onBlur={validation.handleBlur}
                                                    value={validation.values.template_config_id || []}
                                                    multiple
                                                    disabled={!showEditosdTemplate}
                                                >
                                                    <option value="">Select cas config</option>
                                                    {osdTempOSD &&
                                                        osdTempOSD.map((template_config_id) => (
                                                            <option key={template_config_id.id} value={template_config_id.id}>
                                                                {template_config_id.name},{template_config_id.cas_code}
                                                            </option>
                                                        ))}
                                                </Input>
                                                {validation.touched.template_config_id && validation.errors.template_config_id ? (
                                                    <FormFeedback type="invalid">
                                                        {validation.errors.template_config_id}
                                                    </FormFeedback>
                                                ) : null}
                                            </div>
                                        </Col>
                                    </Row>
                                )}
                            </div>

                            <div>
                                {validation.values.template_for === "3" && (
                                    <>
                                        <Col sm="8">
                                            <div className="mb-3">
                                                <Label className="form-label">Title<span style={{ color: 'red' }}>*</span></Label>
                                                <Input
                                                    name="template_title"
                                                    type="text"
                                                    placeholder="Enter title"
                                                    // className="form-select"
                                                    onChange={validation.handleChange}
                                                    onBlur={validation.handleBlur}
                                                    value={validation.values.template_title || ""}
                                                    disabled={!showEditosdTemplate}
                                                >
                                                </Input>
                                                {validation.touched.template_title && validation.errors.template_title ? (
                                                    <FormFeedback type="invalid">
                                                        {validation.errors.template_title}
                                                    </FormFeedback>
                                                ) : null}
                                            </div>
                                        </Col>
                                        <Col sm="12">
                                            <div className="mb-3">
                                                <Label className="form-label">Content<span style={{ color: 'red' }}>*</span></Label>
                                                <Input
                                                    name="template_message"
                                                    type="textarea"
                                                    placeholder="Enter content"
                                                    // className="form-select"
                                                    onChange={validation.handleChange}
                                                    onBlur={validation.handleBlur}
                                                    value={validation.values.template_message || ""}
                                                    row="3"
                                                    disabled={!showEditosdTemplate}
                                                >
                                                </Input>
                                                {validation.touched.template_message && validation.errors.template_message ? (
                                                    <FormFeedback type="invalid">
                                                        {validation.errors.template_message}
                                                    </FormFeedback>
                                                ) : null}
                                            </div>
                                        </Col>
                                    </>
                                )}
                            </div>
                        </Row>

                        {showEditosdTemplate && (
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
                {/* </Modal> */}
            </Modal >
        </>
    );
};

ViewOSDTemplateList.propTypes = {
    toggle: PropTypes.func,
    isOpen: PropTypes.bool,
};

export default ViewOSDTemplateList;
