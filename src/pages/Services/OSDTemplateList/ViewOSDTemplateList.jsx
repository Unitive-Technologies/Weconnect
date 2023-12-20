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
import { useSelector, useDispatch } from "react-redux";
import { updateUser as onUpdateUser } from "/src/store/users/actions";

const ViewOSDTemplateList = (props) => {
    const { isOpen, toggle, osdTemplate } = props;
    //   console.log("user in viewuser modal:" + JSON.stringify(user));
    const dispatch = useDispatch();
    const [showEditosdTemplate, setShowEditosdTemplate] = useState(false);

    const validation = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,

        initialValues: {
            id: (osdTemplate && osdTemplate.id) || "",
            name: (osdTemplate && osdTemplate.name) || "",
            template_for_lbl: (osdTemplate && osdTemplate.template_for_lbl) || "",
            status_lbl: (osdTemplate && osdTemplate.status) || "",
            operator_count: (osdTemplate && osdTemplate.operator_count) || "",
            casconfig: (osdTemplate && osdTemplate.casconfig) || "",

        },
        validationSchema: Yup.object({
            name: Yup.string().required("Please Enter Name"),
            template_for_lbl: Yup.string().required("Please Enter template"),
            status_lbl: Yup.string().required("Please Enter status"),
            operator_count: Yup.string().required("Please Enter content"),
            casconfig: Yup.string().required("Please Enter cas config"),
        }),
        onSubmit: (values) => {
            const updateUser = {
                id: osdTemplate.id,
                name: values.name,
                template_for_lbl: values.template_for_lbl,
                status_lbl: values.status_lbl,
                operator_count: values.operator_count,
                casconfig: values.casconfig,
            };

            // update user
            dispatch(onUpdateUser(updateUser));
            validation.resetForm();
            toggle();
        },
    });
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
                toggle={toggle}
            >
                {!showEditosdTemplate ? (
                    <ModalHeader toggle={toggle} tag="h4">
                        View {osdTemplate.name}
                        <i
                            className="bx bx bxs-edit"
                            style={{ marginLeft: "20px", cursor: "pointer" }}
                            onClick={() => setShowEditosdTemplate(true)}
                        ></i>
                    </ModalHeader>
                ) : (
                    <ModalHeader toggle={toggle} tag="h4">
                        Edit {osdTemplate.name}
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
                                        <option value="101">Select template for</option>
                                        <option value="102">SMS</option>
                                        <option value="103">OSD</option>
                                        <option value="104">Bmail</option>
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
                                    <Label className="form-label">OSD Show Content<span style={{ color: 'red' }}>*</span></Label>
                                    <Input
                                        name="operator_count"
                                        type="textarea"
                                        row="3"
                                        placeholder=""
                                        // className="form-select"
                                        onChange={validation.handleChange}
                                        onBlur={validation.handleBlur}
                                        value={validation.values.operator_count || ""}
                                    >
                                    </Input>
                                    {validation.touched.operator_count && validation.errors.operator_count ? (
                                        <FormFeedback type="invalid">
                                            {validation.errors.operator_count}
                                        </FormFeedback>
                                    ) : null}
                                </div>
                            </Col>
                            <Col sm="4">
                                <div className="mb-3">
                                    <Label className="form-label">CAS Config (Select only 1 config per CAS)<span style={{ color: 'red' }}>*</span></Label>
                                    <Input
                                        name="casconfig"
                                        type="select"
                                        placeholder="Select Status"
                                        className="form-select"
                                        onChange={validation.handleChange}
                                        onBlur={validation.handleBlur}
                                        value={validation.values.casconfig || ""}
                                    >
                                    </Input>
                                    {validation.touched.casconfig && validation.errors.casconfig ? (
                                        <FormFeedback type="invalid">
                                            {validation.errors.casconfig}
                                        </FormFeedback>
                                    ) : null}
                                </div>
                            </Col>
                            <Col sm="4"></Col>
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
            </Modal >
        </>
    );
};

ViewOSDTemplateList.propTypes = {
    toggle: PropTypes.func,
    isOpen: PropTypes.bool,
};

export default ViewOSDTemplateList;
