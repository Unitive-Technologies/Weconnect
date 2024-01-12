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
    ModalFooter,
    Label,
    FormFeedback,
    UncontrolledTooltip,
    Input,
    Form,
} from "reactstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import { addNewOSDTemplate as onAddNewOSDTemplate } from "/src/store/OSDTemplate/actions";
import { useSelector, useDispatch } from "react-redux";
import { getOSDTemplate as onGetOSDTemplate } from "/src/store/actions";

const AddNewOSDTemplateList = (props) => {
    const { isOpen, toggle, handleAddOSDTemplateList, osdTempOSD, osdTempStatus, osdTempTemplateFor } = props;

    const dispatch = useDispatch();
    const [user, setUser] = useState();

    const validation = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,

        initialValues: {
            //BroadCaster: "",
            name: "",
            title: "",
            status_lbl: "",
            created_at: "",
            created_by: "Admin",
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Enter name"),
            template_for_lbl: Yup.string().required("Select template for"),
            status_lbl: Yup.string().required("Select status"),
        }),
        onSubmit: (values) => {
            const newOSDTemplate = {
                id: Math.floor(Math.random() * (30 - 20)) + 20,
                name: values["name"],
                template_for_lbl: values["template_for_lbl"],
                status_lbl: values["status_lbl"],
                created_at: new Date(),
                created_by: values["created_by"],
            };
            console.log(
                "newOSDTemplate:" + newOSDTemplate
            );
            // save new user
            dispatch(
                onAddNewOSDTemplate(newOSDTemplate)
            );
            dispatch(onGetOSDTemplate());
            validation.resetForm();
            handleAddOSDTemplateList();
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
            size="xl"
            toggle={handleAddOSDTemplateList}
        >
            <ModalHeader tag="h4" toggle={handleAddOSDTemplateList}>Add New OSD Template</ModalHeader>
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
                                    name="template_for_lbl"
                                    type="select"
                                    placeholder="Select template for"
                                    className="form-select"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.template_for_lbl || ""}
                                >
                                    <option value="">Select Template For</option>
                                    {osdTempTemplateFor &&
                                        osdTempTemplateFor.map((template_for_lbl) => (
                                            <option key={template_for_lbl.id} value={template_for_lbl.id}>
                                                {template_for_lbl.name}
                                            </option>
                                        ))}
                                </Input>
                                {validation.touched.template_for_lbl && validation.errors.template_for_lbl ? (
                                    <FormFeedback type="invalid">
                                        {validation.errors.template_for_lbl}
                                    </FormFeedback>
                                ) : null}
                            </div>
                        </Col>
                        <Col sm="4">
                            <div className="mb-3">
                                <Label className="form-label">Status<span style={{ color: 'red' }}>*</span></Label>
                                <Input
                                    name="status_lbl"
                                    type="select"
                                    placeholder="Select Status"
                                    className="form-select"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.status_lbl || ""}
                                >
                                    <option value="">Select Status</option>
                                    {osdTempStatus &&
                                        osdTempStatus.map((status_lbl) => (
                                            <option key={status_lbl.id} value={status_lbl.id}>
                                                {status_lbl.name}
                                            </option>
                                        ))}
                                </Input>
                                {validation.touched.status_lbl && validation.errors.status_lbl ? (
                                    <FormFeedback type="invalid">
                                        {validation.errors.status_lbl}
                                    </FormFeedback>
                                ) : null}
                            </div>
                        </Col>
                        <Col sm="4">
                            <div className="mb-3">
                                <Label className="form-label">SMS Template (max 140 characters)<span style={{ color: 'red' }}>*</span></Label>
                                <Input
                                    name="smstemplate"
                                    type="textarea"
                                    placeholder="Enter SMS template"
                                    // className="form-select"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.status_lbl || ""}
                                    row="3"
                                >
                                </Input>
                                {validation.touched.smstemplate && validation.errors.smstemplate ? (
                                    <FormFeedback type="invalid">
                                        {validation.errors.smstemplate}
                                    </FormFeedback>
                                ) : null}
                            </div>
                        </Col>
                        <Col sm="4">
                            <div className="mb-3">
                                <Label className="form-label">OSD Show Content<span style={{ color: 'red' }}>*</span></Label>
                                <Input
                                    name="showcontent"
                                    type="textarea"
                                    placeholder="Enter SMS template"
                                    // className="form-select"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.showcontent || ""}
                                    row="3"
                                >
                                </Input>
                                {validation.touched.showcontent && validation.errors.showcontent ? (
                                    <FormFeedback type="invalid">
                                        {validation.errors.showcontent}
                                    </FormFeedback>
                                ) : null}
                            </div>
                        </Col>
                        <Col sm="4">
                            <div className="mb-3">
                                <Label className="form-label">CAS Config (Select only 1 config per CAS)<span style={{ color: 'red' }}>*</span></Label>
                                <Input
                                    name="cas_code"
                                    type="select"
                                    placeholder="Select Status"
                                    className="form-select"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.cas_code || ""}
                                >
                                    <option value="">Select cas config</option>
                                    {osdTempOSD &&
                                        osdTempOSD.map((cas_code) => (
                                            <option key={cas_code.id} value={cas_code.id}>
                                                {cas_code.name}
                                            </option>
                                        ))}
                                </Input>
                                {validation.touched.cas_code && validation.errors.cas_code ? (
                                    <FormFeedback type="invalid">
                                        {validation.errors.cas_code}
                                    </FormFeedback>
                                ) : null}
                            </div>
                        </Col>
                        <Col sm="4">
                            <div className="mb-3">
                                <Label className="form-label">Title<span style={{ color: 'red' }}>*</span></Label>
                                <Input
                                    name="title"
                                    type="text"
                                    placeholder="Enter title"
                                    // className="form-select"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.title || ""}
                                >
                                </Input>
                                {validation.touched.title && validation.errors.title ? (
                                    <FormFeedback type="invalid">
                                        {validation.errors.title}
                                    </FormFeedback>
                                ) : null}
                            </div>
                        </Col>
                        <Col sm="4">
                            <div className="mb-3">
                                <Label className="form-label">Content<span style={{ color: 'red' }}>*</span></Label>
                                <Input
                                    name="content"
                                    type="text"
                                    placeholder="Enter content"
                                    // className="form-select"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.content || ""}
                                >
                                </Input>
                                {validation.touched.content && validation.errors.content ? (
                                    <FormFeedback type="invalid">
                                        {validation.errors.content}
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
            {/* </Modal> */}
        </Modal>
    );
};

AddNewOSDTemplateList.propTypes = {
    toggle: PropTypes.func,
    isOpen: PropTypes.bool,
};

export default AddNewOSDTemplateList;
