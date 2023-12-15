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

const ViewReason = (props) => {
    const { isOpen, toggle, reason } = props;
    //   console.log("user in viewuser modal:" + JSON.stringify(user));
    const dispatch = useDispatch();
    const [showEditReason, setShowEditReason] = useState(false);

    const validation = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,

        initialValues: {
            id: (reason && reason.id) || "",
            name: (reason && reason.name) || "",
            status: (reason && reason.status) || "",
            reasontype: (reason && reason.reasontype) || "",
        },
        validationSchema: Yup.object({
            name: Yup.string().required(""),
            status: Yup.string().required(""),
            reasontype: Yup.string().required(""),
        }),
        onSubmit: (values) => {
            const updateUser = {
                id: reason.id,
                name: values.name,
                status: values.status,
                reasontype: values.reasontype,
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
                {!showEditReason
                    ? (
                        <ModalHeader toggle={toggle} tag="h4">
                            View {reason.name}
                            <i
                                className="bx bx bxs-edit"
                                style={{ marginLeft: "20px", cursor: "pointer" }}
                                onClick={() => setShowEditUser(true)}
                            ></i>
                        </ModalHeader>
                    ) : (
                        <ModalHeader toggle={toggle} tag="h4">
                            Edit {reason.name}
                        </ModalHeader>
                    )}
                <ModalBody>
                    <Form
                        // style={{ textAlign: "center" }}
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
                                        name="name"
                                        type="text"
                                        placeholder=""
                                        disabled={!showEditReason}
                                        onChange={validation.handleChange}
                                        onBlur={validation.handleBlur}
                                        value={validation.values.name || ""}
                                        invalid={
                                            validation.touched.name && validation.errors.name
                                                ? true
                                                : false
                                        }
                                    />
                                    {validation.touched.name && validation.errors.name ? (
                                        <FormFeedback type="invalid">
                                            {validation.errors.name}
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
                                        disabled={!showEditReason}
                                        onChange={validation.handleChange}
                                        onBlur={validation.handleBlur}
                                        value={validation.values.status || ""}
                                    >
                                        {/* <option value="">Select Status</option> */}
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
                                    <Label className="form-label">Reason Type</Label>
                                    <Input
                                        name="reasontype"
                                        type="text"
                                        placeholder=""
                                        onChange={validation.handleChange}
                                        onBlur={validation.handleBlur}
                                        value={validation.values.reasontype || ""}
                                        invalid={
                                            validation.touched.reasontype &&
                                                validation.errors.reasontype
                                                ? true
                                                : false
                                        }
                                        disabled={!showEditReason}
                                    />
                                    {validation.touched.reasontype &&
                                        validation.errors.reasontype ? (
                                        <FormFeedback type="invalid">
                                            {validation.errors.reasontype}
                                        </FormFeedback>
                                    ) : null}
                                </div>
                            </Col>
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

ViewReason.propTypes = {
    toggle: PropTypes.func,
    isOpen: PropTypes.bool,
};

export default ViewReason;
