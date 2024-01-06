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
    ModalFooter,
    ModalBody,
    Label,
    FormFeedback,
    UncontrolledTooltip,
    Input,
    Form,
} from "reactstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import { addNewLanguageList as onAddNewLanguageList } from "/src/store/language/actions";
import { useSelector, useDispatch } from "react-redux";
import { getlanguageList as onGetlanguageList } from "/src/store/actions";

const AddNewLanguageList = (props) => {
    const { isOpen, handleAddNewLanguage, langlistStatus } = props;
    const dispatch = useDispatch();
    const [user, setUser] = useState();

    const validation = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,

        initialValues: {
            //BroadCaster: "",
            name: "",
            code: "",
            description: "",
            status: "",
            created_at: "",
            created_by: "Admin",
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Enter language"),
            code: Yup.string().required("Enter language code"),
            status: Yup.string().required("Select status"),
            description: Yup.string().required("Enter description"),
        }),
        onSubmit: (values) => {
            const newLanguageList = {
                id: Math.floor(Math.random() * (30 - 20)) + 20,
                name: values["name"],
                code: values["code"],
                status: values["status"],
                description: values["description"],
                created_at: new Date(),
                created_by: values["created_by"],
            };
            console.log(
                "newList:" + newLanguageList
            );
            // save new user
            dispatch(
                onAddNewLanguageList(newLanguageList)
            );
            dispatch(onGetlanguageList());
            validation.resetForm();
            handleAddNewLanguage();
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
            toggle={handleAddNewLanguage}
        >
            {/* <Modal isOpen={modal} toggle={toggle}> */}
            <ModalHeader tag="h4" toggle={handleAddNewLanguage}>Add New Language</ModalHeader>
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
                                    placeholder="Enter language"
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
                        <Col sm="6">
                            <div className="mb-3">
                                <Label className="form-label">Code<span style={{ color: 'red' }}>*</span></Label>
                                <Input
                                    name="code"
                                    type="text"
                                    placeholder="Enter code"
                                    // className="form-select"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.code || ""}
                                >
                                </Input>
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
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.status || ""}
                                >
                                    <option value="">Select Status</option>
                                    {langlistStatus &&
                                        langlistStatus.map((status) => (
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
                                        handleAddNewLanguage();
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

AddNewLanguageList.propTypes = {
    toggle: PropTypes.func,
    isOpen: PropTypes.bool,
};

export default AddNewLanguageList;
