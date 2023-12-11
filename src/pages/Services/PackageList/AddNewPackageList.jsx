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
import { addNewPackageList as onAddNewPackageList } from "/src/store/packagelist/actions";
import { useSelector, useDispatch } from "react-redux";
import CasList from './CasList';
import AddChannels from './AddChannels';
import AddBroadcasterBouquets from './AddBroadcasterBouquets'

const AddNewPackageList = (props) => {
    const { isOpen, toggle } = props;
    const dispatch = useDispatch();
    const [user, setUser] = useState();

    const validation = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,

        initialValues: {
            //BroadCaster: "",
            code: "",
            name: "",
            description: "",
            definition: "",
            type: "",
            status: "",
            cas: "",
            cascode: "",
            created_by: "Admin",
        },
        validationSchema: Yup.object({
            code: Yup.string().required("Enter Channel Code"),
            name: Yup.string().required("Enter channel name"),
            description: Yup.string().required("Enter description"),
            definition: Yup.string().required("Enter channel definition"),
            type: Yup.string().required("Enter channel type"),
            status: Yup.string().required("Enter status"),
            cas: Yup.string().required("Enter cas"),
            cascode: Yup.string().required("cascode"),
            // serviceid: Yup.string().required("serviceid"),
        }),
        onSubmit: (values) => {
            const newPackageList = {
                id: Math.floor(Math.random() * (30 - 20)) + 20,
                code: values["code"],
                name: values["name"],
                description: values["description"],
                definition: values["definition"],
                type: values["type"],
                status: values["status"],
                cas: values["cas"],
                cascode: values["cascode"],
                // serviceid: values["serviceid"],
                created_at: new Date(),
                created_by: values["created_by"],
            };
            console.log(
                "newPackageList:" + newPackageList
            );
            // save new user
            dispatch(
                onAddNewPackageList(newPackageList)
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
            <ModalHeader tag="h4">Add New Package</ModalHeader>
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
                                <Label className="form-label">Code</Label>
                                <Input
                                    name="code"
                                    type="text"
                                    placeholder="Enter code"
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
                        </Col>

                        <Col lg={2}>
                            <div className="form-check form-switch form-switch-lg mb-3">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="customSwitchsizelg"
                                    defaultChecked
                                />
                                <label
                                    className="form-check-label"
                                    htmlFor="customSwitchsizelg"
                                >
                                    Custom / Auto
                                </label>
                            </div>
                        </Col>

                        <Col sm="4">
                            <div className="mb-3">
                                <Label className="form-label">Name<span style={{ color: 'red' }}>*</span></Label>
                                <Input
                                    name="name"
                                    type="text"
                                    placeholder="Enter name"
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
                                <Label className="form-label">Definition<span style={{ color: 'red' }}>*</span></Label>
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
                        </Col>
                        <Col sm="4">
                            <div className="mb-3">
                                <Label className="form-label">Description<span style={{ color: 'red' }}>*</span></Label>
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

                        <Col sm="4">
                            <div className="mb-3">
                                <Label className="form-label">Type<span style={{ color: 'red' }}>*</span></Label>
                                <Input
                                    name="type"
                                    type="select"
                                    placeholder="Select type"
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
                        </Col>
                        <Col sm="4">
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
                        <Col sm="4">
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
                        </Col>
                        <Col sm="4">
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
                        </Col>
                        <Col sm="4">
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
                    <div
                        style={{
                            // margin: "20px 0px",
                            marginTop: "20px",
                            marginBottom: "18px",
                            zIndex: 12000,
                            backgroundColor: "#fff",
                            width: "fit-content",
                            marginLeft: "40%",
                            position: "absolute",
                            padding: "0px 10px",
                        }}
                    >

                        <h5 style={{}}>CAS LIST</h5>
                    </div>
                    <Row style={{
                        position: "relative",
                        border: "1px solid #ced4da",
                        padding: "20px 0px",
                        margin: "30px 0px",
                    }}>
                        <Col sm="12">
                            <CasList />
                        </Col>
                    </Row>
                    <div
                        style={{
                            display: "flex",
                        }}
                    >
                        <div
                            style={{
                                // margin: "20px 0px",
                                marginTop: "20px",
                                marginBottom: "18px",
                                zIndex: 12000,
                                backgroundColor: "#fff",
                                width: "fit-content",
                                marginLeft: "20%",
                                position: "absolute",
                                padding: "0px 10px",
                            }}
                        >
                            <h5 style={{}}>Add Channels</h5>
                        </div>
                        <Row style={{
                            position: "relative",
                            border: "1px solid #ced4da",
                            padding: "20px 0px",
                            margin: "30px 0px",
                        }}>
                            <Col sm="12" style={{ width: "500px" }}>
                                <AddChannels />
                            </Col>
                        </Row>
                        <div
                            style={{
                                // margin: "20px 0px",
                                marginTop: "20px",
                                marginBottom: "18px",
                                zIndex: 12000,
                                backgroundColor: "#fff",
                                width: "fit-content",
                                marginLeft: "50%",
                                position: "absolute",
                                padding: "0px 10px",
                            }}
                        >

                            <h5 style={{}}>Add Broadcaster Bouquets</h5>
                        </div>
                        <Row style={{
                            position: "relative",
                            border: "1px solid #ced4da",
                            padding: "20px 0px",
                            margin: "30px 0px",
                        }}>
                            <Col sm="12" style={{ width: "500px" }}>
                                <AddBroadcasterBouquets />
                            </Col>
                        </Row>
                    </div>
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

AddNewPackageList.propTypes = {
    toggle: PropTypes.func,
    isOpen: PropTypes.bool,
};

export default AddNewPackageList;
