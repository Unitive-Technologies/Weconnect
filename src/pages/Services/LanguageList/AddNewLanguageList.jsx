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
import { addNewLanguageList as onAddNewLanguageList } from "/src/store/language/actions";
import { useSelector, useDispatch } from "react-redux";

const AddNewLanguageList = (props) => {
    const { isOpen, toggle } = props;
    const dispatch = useDispatch();
    const [user, setUser] = useState();

    const validation = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,

        initialValues: {
            //BroadCaster: "",
            language: "",
            languagecode: "",
            description: "",
            status: "",
            created_at: "",
            created_by: "Admin",
        },
        validationSchema: Yup.object({
            language: Yup.string().required("Enter language"),
            languagecode: Yup.string().required("Enter language code"),
            status: Yup.string().required("Select status"),
            description: Yup.string().required("Enter description"),
        }),
        onSubmit: (values) => {
            const newLanguageList = {
                id: Math.floor(Math.random() * (30 - 20)) + 20,
                language: values["language"],
                languagecode: values["languagecode"],
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
            <ModalHeader tag="h4">Add New Language</ModalHeader>
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
                                <Label className="form-label">Language</Label>
                                <Input
                                    name="language"
                                    type="text"
                                    placeholder="Enter language"
                                    // className="form-select"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.language || ""}
                                ></Input>
                                {validation.touched.language && validation.errors.language ? (
                                    <FormFeedback type="invalid">
                                        {validation.errors.language}
                                    </FormFeedback>
                                ) : null}
                            </div>

                            <div className="mb-3">
                                <Label className="form-label">Code</Label>
                                <Input
                                    name="languagecode"
                                    type="text"
                                    placeholder="Enter code"
                                    // className="form-select"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.languagecode || ""}
                                >
                                </Input>
                                {validation.touched.languagecode && validation.errors.languagecode ? (
                                    <FormFeedback type="invalid">
                                        {validation.errors.languagecode}
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

AddNewLanguageList.propTypes = {
    toggle: PropTypes.func,
    isOpen: PropTypes.bool,
};

export default AddNewLanguageList;
