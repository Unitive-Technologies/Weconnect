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

const ViewNSTVList = (props) => {
    const { isOpen, toggle, osdConfiguration } = props;
    //   console.log("user in viewuser modal:" + JSON.stringify(user));
    const dispatch = useDispatch();
    const [showEditosdConfiguration, setShowosdConfiguration] = useState(false);

    const validation = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,

        initialValues: {
            id: (osdConfiguration && osdConfiguration.id) || "",
            name: (osdConfiguration && osdConfiguration.name) || "",
            status: (osdConfiguration && osdConfiguration.status) || "",
            type_display_lbl: (osdConfiguration && osdConfiguration.type_display_lbl) || "",
        },
        validationSchema: Yup.object({
            name: Yup.string().required(""),
            status: Yup.string().required(""),
            type_display_lbl: Yup.string().required(""),
        }),
        onSubmit: (values) => {
            const updateUser = {
                id: osdConfiguration.id,
                name: values.name,
                status: values.status,
                type_display_lbl: values.type_display_lbl,
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
                {!showEditosdConfiguration
                    ? (
                        <ModalHeader toggle={toggle} tag="h4">
                            View {osdConfiguration.name}
                            <i
                                className="bx bx bxs-edit"
                                style={{ marginLeft: "20px", cursor: "pointer" }}
                                onClick={() => setShowEditosdConfiguration(true)}
                            ></i>
                        </ModalHeader>
                    ) : (
                        <ModalHeader toggle={toggle} tag="h4">
                            Edit {osdConfiguration.name}
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
                                        disabled={!showEditosdConfiguration}
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
                                        name="type_display_lbl"
                                        type="text"
                                        placeholder=""
                                        onChange={validation.handleChange}
                                        onBlur={validation.handleBlur}
                                        value={validation.values.type_display_lbl || ""}
                                        invalid={
                                            validation.touched.type_display_lbl &&
                                                validation.errors.type_display_lbl
                                                ? true
                                                : false
                                        }
                                        disabled={!showEditosdConfiguration}
                                    />
                                    {validation.touched.type_display_lbl &&
                                        validation.errors.type_display_lbl ? (
                                        <FormFeedback type="invalid">
                                            {validation.errors.type_display_lbl}
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

ViewNSTVList.propTypes = {
    toggle: PropTypes.func,
    isOpen: PropTypes.bool,
};

export default ViewNSTVList;
