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

const ViewLanguageList = (props) => {
    const { isOpen, toggle, language } = props;
    //   console.log("user in viewuser modal:" + JSON.stringify(user));
    const dispatch = useDispatch();
    const [showEditLanguage, setShowEditLanguage] = useState(false);

    const validation = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,

        initialValues: {
            id: (language && language.id) || "",
            language: (language && language.name) || "",
            code: (language && language.code) || "",
            status: (language && language.status) || "",
            description: (language && language.description) || "",
        },
        validationSchema: Yup.object({
            language: Yup.string().required("Please Enter Language"),
            code: Yup.string().required("Please Enter Code"),
            status: Yup.string().required("Please Enter status"),
            description: Yup.string().required("Please Enter description"),
        }),
        onSubmit: (values) => {
            const updateUser = {
                id: language.id,
                language: values.language,
                code: values.code,
                status: values.status,
                description: values.description,
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
                {!showEditLanguage ? (
                    <ModalHeader toggle={toggle} tag="h4">
                        View {language.name}
                        <i
                            className="bx bx bxs-edit"
                            style={{ marginLeft: "20px", cursor: "pointer" }}
                            onClick={() => setShowEditLanguage(true)}
                        ></i>
                    </ModalHeader>
                ) : (
                    <ModalHeader toggle={toggle} tag="h4">
                        Edit {language.name}
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
                                    <Label className="form-label">Language<span style={{ color: 'red' }}>*</span></Label>
                                    <Input
                                        name="language"
                                        type="text"
                                        placeholder="Enter Language"
                                        disabled={!showEditLanguage}
                                        onChange={validation.handleChange}
                                        onBlur={validation.handleBlur}
                                        value={validation.values.language || ""}
                                        invalid={
                                            validation.touched.language && validation.errors.language
                                                ? true
                                                : false
                                        }
                                    />
                                    {validation.touched.language && validation.errors.language ? (
                                        <FormFeedback type="invalid">
                                            {validation.errors.language}
                                        </FormFeedback>
                                    ) : null}
                                </div>
                                <div className="mb-3">
                                    <Label className="form-label">Code<span style={{ color: 'red' }}>*</span></Label>
                                    <Input
                                        name="code"
                                        type="text"
                                        placeholder="Enter Language Code"
                                        disabled={!showEditLanguage}
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
                                    <Label className="form-label">Status<span style={{ color: 'red' }}>*</span></Label>
                                    <Input
                                        name="status"
                                        type="select"
                                        placeholder="Select Status"
                                        className="form-select"
                                        disabled={!showEditLanguage}
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
                                    <Label className="form-label">Description</Label>
                                    <Input
                                        name="description"
                                        type="textarea"
                                        placeholder="Enter description"
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
                                        disabled={!showEditLanguage}
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

ViewLanguageList.propTypes = {
    toggle: PropTypes.func,
    isOpen: PropTypes.bool,
};

export default ViewLanguageList;
