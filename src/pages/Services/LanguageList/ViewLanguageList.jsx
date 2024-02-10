import React, { useEffect, useState, useRef, useMemo } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
    Card,
    CardBody,
    Col,
    Container,
    Row,
    Modal,
    ModalFooter,
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
import { updateLanguageList as onUpdateLanguageList } from "/src/store/language/actions";

const ViewLanguageList = (props) => {
    const { isOpen, toggle, handleViewLanguageList, language, langlistStatus } = props;

    console.log("user in view Language List:" + JSON.stringify(language));
    const dispatch = useDispatch();
    const [showEditLanguageList, setShowEditLanguageList] = useState(false);

    const [selectedStatus, setSelectedStatus] = useState("");

    const handleStatusChange = (e) => {
        const status = e.target.value;
        setSelectedStatus(status);
        validation.handleChange(e);
    };

    const validation = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,

        initialValues: {
            id: (language && language.id) || "",
            name: (language && language.name) || "",
            code: (language && language.code) || "",
            status: (language && language.status) || "",
            description: (language && language.description) || "",
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Please Enter Language"),
            code: Yup.string().required("Please Enter Code"),
            status: Yup.string().required("Please Enter status"),
            description: Yup.string().required("Please Enter description"),
        }),
        onSubmit: (values) => {
            const updateLanguageList = {
                id: language.id,
                name: values.language,
                code: values.code,
                status: parseInt(values.status),
                description: values.description,
            };

            // update user
            dispatch(onUpdateLanguageList(updateLanguageList));
            validation.resetForm();
            handleViewLanguageList();
        },
    });

    const handleCancel = () => {
        setShowEditLanguageList(false);
        handleViewLanguageList();
    };

    return (
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
                {!showEditLanguageList
                    ? `View ${(language && language.name) || ""}`
                    : `Edit ${(language && language.name) || ""}`}
            </ModalHeader>

            {!showEditLanguageList && (
                <Link
                    style={{
                        position: "absolute",
                        marginLeft: "92%",
                        marginTop: "1%",
                    }}
                    to="#!"
                    className="btn btn-light me-1"
                    onClick={() => setShowEditLanguageList(true)}
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
                        <Col sm="6">
                            <div className="mb-3">
                                <Label className="form-label">Language<span style={{ color: 'red' }}>*</span></Label>
                                <Input
                                    name="name"
                                    type="text"
                                    placeholder="Enter Language"
                                    disabled={!showEditLanguageList}
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
                        </Col>
                        <Col sm="6">
                            <div className="mb-3">
                                <Label className="form-label">Code<span style={{ color: 'red' }}>*</span></Label>
                                <Input
                                    name="code"
                                    type="text"
                                    placeholder="Enter Language Code"
                                    disabled={!showEditLanguageList}
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
                        </Col>
                    </Row>
                    <Row>
                        <Col sm="6">
                            <div className="mb-3">
                                <Label className="form-label">Status<span style={{ color: 'red' }}>*</span></Label>
                                <Input
                                    name="status"
                                    type="select"
                                    placeholder="Select Status"
                                    className="form-select"
                                    onChange={handleStatusChange}
                                    onBlur={validation.handleBlur}
                                    value={selectedStatus}
                                    disabled={!showEditLanguageList}
                                >
                                    {langlistStatus.map((status) => (
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
                        <Col sm="6">
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
                                    disabled={!showEditLanguageList}
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
                    {showEditLanguageList && (
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
        </Modal >
    );
};

ViewLanguageList.propTypes = {
    toggle: PropTypes.func,
    isOpen: PropTypes.bool,
};

export default ViewLanguageList;
