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
import { addNewChannelList as onAddNewChannelList } from "/src/store/channel/actions";
import { useSelector, useDispatch } from "react-redux";

const AddNewChannelList = (props) => {
    const { isOpen, toggle } = props;
    const dispatch = useDispatch();
    const [user, setUser] = useState();

    const validation = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,

        initialValues: {
            //BroadCaster: "",
            code: "",
            logo: "",
            name: "",
            description: "",
            definition: "",
            type: "",
            broadcaster: "",
            genre: "",
            language: "",
            isalacarte: "",
            rate: "",
            status: "",
            cas: "",
            cascode: "",
            serviceid: "",
            created_by: "Admin",
        },
        validationSchema: Yup.object({
            code: Yup.string().required("Enter Channel Code"),
            logo: Yup.string().required("upload logo"),
            name: Yup.string().required("Enter channel name"),
            description: Yup.string().required("Enter description"),
            definition: Yup.string().required("Enter channel definition"),
            type: Yup.string().required("Enter channel type"),
            broadcaster: Yup.string().required("select broadcaster"),
            genre: Yup.string().required("Enter genre"),
            language: Yup.string().required("Select language"),
            isalacarte: Yup.string().required(""),
            rate: Yup.string().required(""),
            status: Yup.string().required("Enter status"),
            cas: Yup.string().required("Enter cas"),
            cascode: Yup.string().required("cascode"),
            serviceid: Yup.string().required("serviceid"),

        }),
        onSubmit: (values) => {
            const newChannelList = {
                id: Math.floor(Math.random() * (30 - 20)) + 20,
                code: values["code"],
                logo: values["logo"],
                name: values["name"],
                description: values["description"],
                definition: values["definition"],
                type: values["type"],
                broadcaster: values["broadcaster"],
                genre: values["genre"],
                language: values["language"],
                isalacarte: values["isalacarte"],
                rate: values["rate"],
                status: values["status"],
                cas: values["cas"],
                cascode: values["cascode"],
                serviceid: values["serviceid"],
                created_at: new Date(),
                created_by: values["created_by"],
            };
            console.log(
                "newChannelList:" + newChannelList
            );
            // save new user
            dispatch(
                onAddNewChannelList(newChannelList)
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
            <ModalHeader tag="h4">Add New Channel</ModalHeader>
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
                                <Label className="form-label">Channel Code</Label>
                                <Input
                                    name="code"
                                    type="text"
                                    placeholder="Enter channel code"
                                    // className="form-select"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.code || ""}
                                ></Input>
                                {validation.touched.code && validation.errors.code ? (
                                    <FormFeedback type="invalid">
                                        {validation.errors.code}
                                    </FormFeedback>
                                ) : null}
                            </div>
                            <div className="mb-3">
                                <Label className="form-label">Channel Logo</Label>
                                <Input
                                    name="logo"
                                    type="text"
                                    // placeholder="Enter channel code"
                                    // className="form-select"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.logo || ""}
                                ></Input>
                                {validation.touched.logo && validation.errors.logo ? (
                                    <FormFeedback type="invalid">
                                        {validation.errors.logo}
                                    </FormFeedback>
                                ) : null}
                            </div>

                            <div className="mb-3">
                                <Label className="form-label">Channel Name</Label>
                                <Input
                                    name="name"
                                    type="text"
                                    placeholder="Enter channel name"
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

                            <div className="mb-3">
                                <Label className="form-label">Channel Definition</Label>
                                <Input
                                    name="definition"
                                    type="select"
                                    placeholder="Select Definition"
                                    className="form-select"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.definition || ""}
                                >
                                    <option value="101">Select channel definition</option>
                                    <option value="102">Standard Definition(SD)</option>
                                    <option value="103">High Definition(HD)</option>
                                </Input>
                                {validation.touched.definition && validation.errors.definition ? (
                                    <FormFeedback type="invalid">
                                        {validation.errors.definition}
                                    </FormFeedback>
                                ) : null}
                            </div>

                            <div className="mb-3">
                                <Label className="form-label">Channel Type</Label>
                                <Input
                                    name="type"
                                    type="select"
                                    placeholder="Select Channel type"
                                    className="form-select"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.type || ""}
                                >
                                    <option value="104">Select channel type</option>
                                    <option value="105">Pay Channel</option>
                                    <option value="106">FTA</option>
                                </Input>
                                {validation.touched.type && validation.errors.type ? (
                                    <FormFeedback type="invalid">
                                        {validation.errors.type}
                                    </FormFeedback>
                                ) : null}
                            </div>

                            <div className="mb-3">
                                <Label className="form-label">Broadcaster</Label>
                                <Input
                                    name="broadcaster"
                                    type="select"
                                    placeholder="Select broadcaster"
                                    className="form-select"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.broadcaster || ""}
                                >
                                    <option value="110">Select broadcaster</option>
                                    <option value="111">Lex Sportal Vision Pvt Ltd.</option>
                                    <option value="112">Jangama Media Pvt Ltd.</option>
                                </Input>
                                {validation.touched.broadcaster && validation.errors.broadcaster ? (
                                    <FormFeedback type="invalid">
                                        {validation.errors.broadcaster}
                                    </FormFeedback>
                                ) : null}
                            </div>

                            <div className="mb-3">
                                <Label className="form-label">Genre</Label>
                                <Input
                                    name="genre"
                                    type="select"
                                    placeholder="Select genre"
                                    className="form-select"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.genre || ""}
                                >
                                    <option value="101">Select genre</option>
                                    <option value="102">TRAVEL</option>
                                    <option value="103">TELUGU NEWS</option>
                                    <option value="103">TELUGU GEC</option>
                                </Input>
                                {validation.touched.genre && validation.errors.genre ? (
                                    <FormFeedback type="invalid">
                                        {validation.errors.genre}
                                    </FormFeedback>
                                ) : null}
                            </div>

                            <div className="mb-3">
                                <Label className="form-label">Language</Label>
                                <Input
                                    name="language"
                                    type="text"
                                    placeholder="Select language"
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
                                <Label className="form-label">IsAlacarte</Label>
                                <Input
                                    name="isalacarte"
                                    type="select"
                                    // placeholder="Enter channel code"
                                    // className="form-select"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.isalacarte || ""}
                                >
                                    <option value="201">Yes</option>
                                    <option value="202">No</option>
                                </Input>
                                {validation.touched.isalacarte && validation.errors.isalacarte ? (
                                    <FormFeedback type="invalid">
                                        {validation.errors.isalacarte}
                                    </FormFeedback>
                                ) : null}
                            </div>

                            <div className="mb-3">
                                <Label className="form-label">MRP Rate(INR)</Label>
                                <Input
                                    name="rate"
                                    type="text"
                                    // placeholder="Enter channel code"
                                    // className="form-select"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.rate || ""}
                                ></Input>
                                {validation.touched.rate && validation.errors.rate ? (
                                    <FormFeedback type="invalid">
                                        {validation.errors.rate}
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
                                {/* <Label className="form-label">Status</Label> */}
                                <Input
                                    name="cas"
                                    type="select"
                                    placeholder="Select CAS"
                                    className="form-select"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.cas || ""}
                                >
                                    <option value="21">Select CAS</option>
                                    <option value="22">NSTV</option>
                                </Input>
                                {validation.touched.cas && validation.errors.cas ? (
                                    <FormFeedback type="invalid">
                                        {validation.errors.cas}
                                    </FormFeedback>
                                ) : null}
                            </div>
                            <div className="mb-3">
                                {/* <Label className="form-label">Status</Label> */}
                                <Input
                                    name="cascode"
                                    // type="select"
                                    placeholder="Cascode"
                                    // className="form-select"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.cascode || ""}
                                >
                                </Input>
                                {validation.touched.cascode && validation.errors.cascode ? (
                                    <FormFeedback type="invalid">
                                        {validation.errors.cascode}
                                    </FormFeedback>
                                ) : null}
                            </div>
                            <div className="mb-3">
                                {/* <Label className="form-label">Status</Label> */}
                                <Input
                                    name="serviceid"
                                    // type="select"
                                    placeholder="Service id"
                                    // className="form-select"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.serviceid || ""}
                                >
                                </Input>
                                {validation.touched.serviceid && validation.errors.serviceid ? (
                                    <FormFeedback type="invalid">
                                        {validation.errors.serviceid}
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

AddNewChannelList.propTypes = {
    toggle: PropTypes.func,
    isOpen: PropTypes.bool,
};

export default AddNewChannelList;
