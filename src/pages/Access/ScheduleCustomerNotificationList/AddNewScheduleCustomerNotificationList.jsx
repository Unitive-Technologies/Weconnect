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
import { addNewScheduleCustomerNotification as onAddNewScheduleCustomerNotification } from "/src/store/schedulecustomernotification/actions";
import { useSelector, useDispatch } from "react-redux";

const AddNewScheduleCustomerNotification = (props) => {
    const { isOpen, toggle } = props;
    const dispatch = useDispatch();
    const [user, setUser] = useState();

    const validation = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,

        initialValues: {
            schedulecustomernotification: "",
            name: "",
            type: "",
            scheduledays: "",
            osdconfig: "",
            osdtemplate: "",
            bmailtemplate: "",
            smstemplate: "",
            startdate: "",
            enddate: "",
            status: "",
            description: "",
            created_at: "",
            created_by: "Admin",
        },
        validationSchema: Yup.object({
            schedulecustomernotification: Yup.string().required("Enter schedulecustomernotification Name"),
            name: Yup.string().required("Select name"),
            type: Yup.string().required("Select type"),
            scheduledays: Yup.string().required("Select schedule days"),
            osdconfig: Yup.string().required("Select osd configuaration"),
            osdtemplate: Yup.string().required("Select osd template"),
            bmailtemplate: Yup.string().required("Select bmail template"),
            smstemplate: Yup.string().required("Select sms template"),
            startdate: Yup.string().required("Select start date"),
            enddate: Yup.string().required("Select end date"),
            description: Yup.string().required("Select description"),
            status: Yup.string().required("Select status"),
        }),
        onSubmit: (values) => {
            const newDesignation = {
                id: Math.floor(Math.random() * (30 - 20)) + 20,
                schedulecustomernotification: values["schedulecustomernotification"],
                name: values["name"],
                type: values["type"],
                scheduledays: values["scheduledays"],
                osdconfig: values["osdconfig"],
                osdtemplate: values["osdtemplate"],
                bmailtemplate: values["bmailtemplate"],
                smstemplate: values["smstemplate"],
                startdate: values["startdate"],
                enddate: values["enddate"],
                description: values["description"],
                status: values["status"],
                created_at: new Date(),
                created_by: values["created_by"],
            };
            console.log("newScheduleCustomerNotification:" + newScheduleCustomerNotification);
            // save new user
            dispatch(onAddNewScheduleCustomerNotification(newScheduleCustomerNotification));
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
            {/* <Modal isOpen={modal} toggle={toggle}> */}
            <ModalHeader tag="h4">Add New Schedule Customer Notification</ModalHeader>
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
                                <Label className="form-label">Schedule Customer Notification</Label>
                                <Input
                                    name="schedulecustomernotification"
                                    type="text"
                                    placeholder="Enter Schedule Customer Notification name"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.schedulecustomernotification || ""}
                                    invalid={
                                        validation.touched.schedulecustomernotification &&
                                            validation.errors.schedulecustomernotification
                                            ? true
                                            : false
                                    }
                                />
                                {validation.touched.schedulecustomernotification &&
                                    validation.errors.schedulecustomernotification ? (
                                    <FormFeedback type="invalid">
                                        {validation.errors.schedulecustomernotification}
                                    </FormFeedback>
                                ) : null}
                            </div>

                            <div className="mb-3">
                                <Label className="form-label">Name</Label>
                                <Input
                                    name="type"
                                    type="select"
                                    placeholder="Enter name"
                                    className="form-select"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.name || ""}
                                >
                                </Input>
                                {validation.touched.name && validation.errors.name ? (
                                    <FormFeedback type="invalid">
                                        {validation.errors.name}
                                    </FormFeedback>
                                ) : null}
                            </div>


                            <div className="mb-3">
                                <Label className="form-label">Type</Label>
                                <Input
                                    name="type"
                                    type="select"
                                    placeholder="Select Type"
                                    className="form-select"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.type || ""}
                                >
                                    <option value="">Select Type</option>
                                    <option value="1">MSO</option>
                                    <option value="2">RO</option>
                                    <option value="3">Distributor</option>
                                    <option value="4">LCO</option>
                                </Input>
                                {validation.touched.type && validation.errors.type ? (
                                    <FormFeedback type="invalid">
                                        {validation.errors.type}
                                    </FormFeedback>
                                ) : null}
                            </div>

                            <div className="mb-3">
                                <Label className="form-label">Code</Label>
                                <Input
                                    name="code"
                                    label="code"
                                    type="text"
                                    placeholder="Enter Code"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.code || ""}
                                    invalid={
                                        validation.touched.code && validation.errors.code
                                            ? true
                                            : false
                                    }
                                />
                                {validation.touched.code && validation.errors.code ? (
                                    <FormFeedback type="invalid">
                                        {validation.errors.code}
                                    </FormFeedback>
                                ) : null}
                            </div>
                            <div className="mb-3">
                                <Label className="form-label">Parent designation</Label>
                                <Input
                                    name="parent"
                                    type="select"
                                    placeholder="Select Parent designation"
                                    className="form-select"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.parent || ""}
                                >
                                    <option value="">Select Parent designation</option>
                                    <option value="21">Administrator</option>
                                    <option value="22">Staff</option>
                                    <option value="23">User</option>
                                </Input>
                                {validation.touched.parent && validation.errors.parent ? (
                                    <FormFeedback type="invalid">
                                        {validation.errors.parent}
                                    </FormFeedback>
                                ) : null}
                            </div>
                            <div className="mb-3">
                                <Label className="form-label">Status</Label>
                                <Input
                                    name="status"
                                    type="select"
                                    placeholder="Select Status"
                                    className="form-select"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.status || ""}
                                >
                                    <option value="">Select Status</option>
                                    <option value="11">Active</option>
                                    <option value="12">BLOCKED</option>
                                    <option value="13">In-Active</option>
                                </Input>
                                {validation.touched.status && validation.errors.status ? (
                                    <FormFeedback type="invalid">
                                        {validation.errors.status}
                                    </FormFeedback>
                                ) : null}
                            </div>
                            <div className="mb-3">
                                <Label className="form-label">Description</Label>
                                <Input
                                    name="description"
                                    type="textarea"
                                    placeholder="Enter Description"
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
                    </Row>
                    <Row>
                        <Col sm="8">
                            <div className="d-flex flex-wrap gap-2">
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
                            </div>
                        </Col>
                    </Row>
                </Form>
            </ModalBody>
            {/* </Modal> */}
        </Modal>
    );
};

AddNewDesignation.propTypes = {
    toggle: PropTypes.func,
    isOpen: PropTypes.bool,
};

export default AddNewScheduleCustomerNotification;
