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

const AddNewOSDTemplateList = (props) => {
    const { isOpen, toggle } = props;
    const dispatch = useDispatch();
    const [user, setUser] = useState();

    const validation = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,

        initialValues: {
            //BroadCaster: "",
            name: "",
            template_for_lbl: "",
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
        >
            <ModalHeader tag="h4" toggle={toggle}>Add New OSD Template</ModalHeader>
            <ModalBody>
                <Form
                    onSubmit={(e) => {
                        e.preventDefault();
                        validation.handleSubmit();
                        return false;
                    }}
                >
                    <Row>
                        <Col sm="12">
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
