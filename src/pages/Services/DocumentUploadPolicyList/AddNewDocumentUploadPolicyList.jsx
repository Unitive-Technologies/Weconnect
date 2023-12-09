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
import { addNewDocumentUploadPolicy as onAddNewDocumentUploadPolicy } from "/src/store/documentuploadpolicy/actions";
import { useSelector, useDispatch } from "react-redux";
import UploadDocument from './UploadDocument';

const AddNewDocumentUploadPolicy = (props) => {
    const { isOpen, toggle } = props;
    const dispatch = useDispatch();
    const [user, setUser] = useState();

    const validation = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,

        initialValues: {
            //BroadCaster: "",
            name: "",
            startdate: "",
            enddate: "",
            uploaddate: "",
            initiatedby: "",
            approvedby: "",
            financial: "",
            status: "",
            remark: "",
            uploadfile: "",
            created_by: "Admin",
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Enter policy name"),
            startdate: Yup.string().required("Select policy start date"),
            enddate: Yup.string().required("Select policy end date"),
            uploaddate: Yup.string().required("Select policy upload date"),
            initiatedby: Yup.string().required("Enter initiated by"),
            approvedby: Yup.string().required("Enter approved by"),
            financial: Yup.string().required("select financial year"),
            status: Yup.string().required("Select status"),
            remark: Yup.string().required("Enter remark"),
            uploadfile: Yup.string().required("Select upload file"),
        }),
        onSubmit: (values) => {
            const newDocumentUploadPolicy = {
                id: Math.floor(Math.random() * (30 - 20)) + 20,
                name: values["name"],
                startdate: values["startdate"],
                enddate: values["enddate"],
                uploaddate: values["uploaddate"],
                initiatedby: values["initiatedby"],
                approvedby: values["approvedby"],
                financial: values["financial"],
                status: values["status"],
                remark: values["remark"],
                uploadfile: values["uploadfile"],
                created_at: new Date(),
                created_by: values["created_by"],
            };
            console.log(
                "newDocumentUploadPolicy:" + newDocumentUploadPolicy
            );
            // save new user
            dispatch(
                onAddNewDocumentUploadPolicy(newDocumentUploadPolicy)
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
            size="xl"
        >
            {/* <Modal isOpen={modal} toggle={toggle}> */}
            <ModalHeader tag="h4">Add New Document Upload Policy</ModalHeader>
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
                                <Label className="form-label">Name</Label>
                                <Input
                                    name="name"
                                    type="text"
                                    placeholder="Enter policy name"
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
                                <Label className="form-label">Start Date</Label>
                                <Input
                                    name="startdate"
                                    type="date"
                                    placeholder="Select start date"
                                    // className="form-select"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.startdate || ""}
                                ></Input>
                                {validation.touched.startdate && validation.errors.startdate ? (
                                    <FormFeedback type="invalid">
                                        {validation.errors.startdate}
                                    </FormFeedback>
                                ) : null}
                            </div>
                        </Col>
                        <Col sm="4">
                            <div className="mb-3">
                                <Label className="form-label">End Date</Label>
                                <Input
                                    name="enddate"
                                    type="date"
                                    placeholder="Select end date"
                                    // className="form-select"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.enddate || ""}
                                ></Input>
                                {validation.touched.enddate && validation.errors.enddate ? (
                                    <FormFeedback type="invalid">
                                        {validation.errors.enddate}
                                    </FormFeedback>
                                ) : null}
                            </div>
                        </Col>
                        <Col sm="4">
                            <div className="mb-3">
                                <Label className="form-label">Upload Date</Label>
                                <Input
                                    name="uploaddate"
                                    type="date"
                                    placeholder="Select upload date"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.uploaddate || ""}
                                />
                                {validation.touched.uploaddate &&
                                    validation.errors.uploaddate ? (
                                    <FormFeedback type="invalid">
                                        {validation.errors.uploaddate}
                                    </FormFeedback>
                                ) : null}
                            </div>
                        </Col>
                        <Col sm="4">
                            <div className="mb-3">
                                <Label className="form-label">Initiated By</Label>
                                <Input
                                    name="initiatedby"
                                    type="text"
                                    placeholder="Enter initiated by"
                                    // className="form-select"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.initiatedby || ""}
                                >
                                </Input>
                                {validation.touched.initiatedby && validation.errors.initiatedby ? (
                                    <FormFeedback type="invalid">
                                        {validation.errors.initiatedby}
                                    </FormFeedback>
                                ) : null}
                            </div>
                        </Col>
                        <Col sm="4">
                            <div className="mb-3">
                                <Label className="form-label">Approved By</Label>
                                <Input
                                    name="approvedby"
                                    type="text"
                                    placeholder="Select approved by"
                                    // className="form-select"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.approvedby || ""}
                                >
                                </Input>
                                {validation.touched.approvedby && validation.errors.approvedby ? (
                                    <FormFeedback type="invalid">
                                        {validation.errors.approvedby}
                                    </FormFeedback>
                                ) : null}
                            </div>
                        </Col>
                        <Col sm="4">
                            <div className="mb-3">
                                <Label className="form-label">Financial Year</Label>
                                <Input
                                    name="financial"
                                    type="select"
                                    placeholder="Select Financial"
                                    className="form-select"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.financial || ""}
                                >
                                    <option value="101">Select financial year</option>
                                    <option value="102">2023-2024</option>
                                    <option value="103">2022-2023</option>
                                    <option value="104">2021-2022</option>
                                    <option value="105">2020-2021</option>
                                    <option value="106">2019-2020</option>
                                </Input>
                                {validation.touched.financial && validation.errors.financial ? (
                                    <FormFeedback type="invalid">
                                        {validation.errors.financial}
                                    </FormFeedback>
                                ) : null}
                            </div>
                        </Col>
                        <Col sm="4">
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
                        </Col>

                        <Col sm="4">
                            <div className="mb-3">
                                <Label className="form-label">Remark</Label>
                                <Input
                                    name="remark"
                                    type="textarea"
                                    placeholder="Enter remark"
                                    // className="form-select"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.remark || ""}
                                ></Input>
                                {validation.touched.remark && validation.errors.remark ? (
                                    <FormFeedback type="invalid">
                                        {validation.errors.remark}
                                    </FormFeedback>
                                ) : null}
                            </div>
                        </Col>

                        <Col sm="4">
                            <div className="mb-3">
                                <Label className="form-label">Upload Documents</Label>
                                <Input
                                    name="uploadfile"
                                    type="file"
                                    placeholder="Select Upload file"
                                    // className="form-select"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.uploadfile || ""}
                                >
                                </Input>
                                {validation.touched.uploadfile && validation.errors.uploadfile ? (
                                    <FormFeedback type="invalid">
                                        {validation.errors.uploadfile}
                                    </FormFeedback>
                                ) : null}
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm="12">
                            <UploadDocument />
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
        </Modal >
    );
};

AddNewDocumentUploadPolicy.propTypes = {
    toggle: PropTypes.func,
    isOpen: PropTypes.bool,
};

export default AddNewDocumentUploadPolicy;
