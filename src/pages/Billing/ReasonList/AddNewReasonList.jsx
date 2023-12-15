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
import { addNewReason as onAddNewReason } from "/src/store/reasonlist/actions";
import { useSelector, useDispatch } from "react-redux";

const AddNewReason = (props) => {
    const { isOpen, toggle } = props;
    const dispatch = useDispatch();
    const [user, setUser] = useState();

    const validation = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,

        initialValues: {
            //BroadCaster: "",
            reason: "",
            reasontype: "",
            status: "",
            created_at: "",
            created_by: "Admin",
        },
        validationSchema: Yup.object({
            reason: Yup.string().required("Enter reason"),
            reasontype: Yup.string().required("Enter reason type"),
            status: Yup.string().required("Select status"),
        }),
        onSubmit: (values) => {
            const newReason = {
                id: Math.floor(Math.random() * (30 - 20)) + 20,
                reason: values["reason"],
                reasontype: values["reasontype"],
                status: values["status"],
                created_at: new Date(),
                created_by: values["created_by"],
            };
            console.log(
                "newReason:" + newReason
            );
            // save new user
            dispatch(
                onAddNewReason(newReason)
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
            size="xl"
            autoFocus={true}
            centered={true}
            className="exampleModal"
            tabIndex="-1"
            toggle={toggle}
        >
            <ModalHeader tag="h4">Add New Reason</ModalHeader>
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
                                <Label className="form-label">Reason<span style={{ color: 'red' }}>*</span></Label>
                                <Input
                                    name="reason"
                                    type="text"
                                    placeholder="Enter reason"
                                    // className="form-select"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.reason || ""}
                                ></Input>
                                {validation.touched.reason && validation.errors.reason ? (
                                    <FormFeedback type="invalid">
                                        {validation.errors.reason}
                                    </FormFeedback>
                                ) : null}
                            </div>

                            <div className="mb-3">
                                <Label className="form-label">Reason Type<span style={{ color: 'red' }}>*</span></Label>
                                <Input
                                    name="reasontype"
                                    type="text"
                                    placeholder="Enter reason type"
                                    // className="form-select"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.reasontype || ""}
                                ></Input>
                                {validation.touched.reasontype && validation.errors.reasontype ? (
                                    <FormFeedback type="invalid">
                                        {validation.errors.reasontype}
                                    </FormFeedback>
                                ) : null}
                            </div>

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

AddNewReason.propTypes = {
    toggle: PropTypes.func,
    isOpen: PropTypes.bool,
};

export default AddNewReason;
