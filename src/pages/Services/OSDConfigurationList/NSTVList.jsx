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
import { addNewOSDConfiguration as onAddNewOSDConfiguration } from "/src/store/OSDConfiguration/actions";
import { useSelector, useDispatch } from "react-redux";

const NSTVList = (props) => {
    const { isOpen, toggle } = props;
    const dispatch = useDispatch();
    const [user, setUser] = useState();

    const validation = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,

        initialValues: {
            name: "",
            status: "",
            starttime: "10:40",
            endtime: "11:00",
            enable: "",
            forced: "",
            type: "",
            duration: "",
            interval: "",
            repetition: "",
            fontsize: "",
            fontcolor: "",
            backgroundcolor: "",
            backgroundarea: "",
            created_by: "Admin",
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Enter  Code"),
            status: Yup.string().required("Select status"),
            starttime: Yup.string().required("10:40"),
            endtime: Yup.string().required("11:00"),
            enable: Yup.string().required("Send OSD"),
            forced: Yup.string().required("Select forced display"),
            type: Yup.string().required("Select display type"),
            duration: Yup.string().required("duration"),
            interval: Yup.string().required("interval"),
            repetition: Yup.string().required("repetition"),
            fontsize: Yup.string().required("Select font size"),
            fontcolor: Yup.string().required("Select font color"),
            backgroundcolor: Yup.string().required("Select back color"),
            backgroundarea: Yup.string().required("Select background area"),
        }),
        onSubmit: (values) => {
            const newOSDConfiguration = {
                id: Math.floor(Math.random() * (30 - 20)) + 20,
                name: values["name"],
                status: values["status"],
                starttime: values["10:40"],
                endtime: values["11:00"],
                enable: values["enable"],
                forced: values["forced"],
                type: values["type"],
                duration: values["duration"],
                interval: values["interval"],
                repetition: values["repetition"],
                fontsize: values["fontsize"],
                fontcolor: values["fontcolor"],
                backgroundcolor: values["backgroundcolor"],
                backgroundarea: values["backgroundarea"],
                created_at: new Date(),
                created_by: values["created_by"],
            };
            console.log(
                "newOSDConfiguration:" + JSON.stringify(newOSDConfiguration)
            );
            // save new user
            dispatch(
                onAddNewOSDConfiguration(newOSDConfiguration)
            );
            validation.resetForm();
            toggle();
        },
        onReset: (values) => {
            validation.setValues(validation.initialValues);
        },
    });

    const [rangeValue, setRangeValue] = useState(1);

    const handleRangeChange = (event) => {
        setRangeValue(parseInt(event.target.value, 10));
    };

    const handleRangeClick = () => {
        // Increment the range value by 1 when clicked
        setRangeValue((prevValue) => prevValue + 1);
    };


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
            <ModalHeader tag="h4">Add New NSTV OSD Configuration</ModalHeader>
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
                                <Label className="form-label">Start Time<span style={{ color: 'red' }}>*</span></Label>
                                <Input
                                    name="starttime"
                                    type="time"
                                    // placeholder="Enter channel code"
                                    // className="form-select"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.starttime || ""}
                                ></Input>
                                {validation.touched.starttime && validation.errors.starttime ? (
                                    <FormFeedback type="invalid">
                                        {validation.errors.starttime}
                                    </FormFeedback>
                                ) : null}
                            </div>
                        </Col>
                        <Col sm="4">
                            <div className="mb-3">
                                <Label className="form-label">End Time<span style={{ color: 'red' }}>*</span></Label>
                                <Input
                                    name="endtime"
                                    type="time"
                                    // placeholder="Enter name"
                                    // className="form-select"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.endtime || ""}
                                ></Input>
                                {validation.touched.endtime && validation.errors.endtime ? (
                                    <FormFeedback type="invalid">
                                        {validation.errors.endtime}
                                    </FormFeedback>
                                ) : null}
                            </div>
                        </Col>
                        <Col sm="4">
                            <div className="mb-3">
                                <Label className="form-label">Enable<span style={{ color: 'red' }}>*</span></Label>
                                <Input
                                    name="enable"
                                    type="select"
                                    placeholder="Send OSD"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.enable || ""}
                                >
                                    <option value="101">Send OSD</option>
                                    <option value="102">Send OSD</option>
                                    <option value="103">Cancel OSD</option>
                                </Input>
                                {validation.touched.enable &&
                                    validation.errors.enable ? (
                                    <FormFeedback type="invalid">
                                        {validation.errors.enable}
                                    </FormFeedback>
                                ) : null}
                            </div>
                        </Col>
                        <Col sm="4">

                            <div className="mb-3">
                                <Label className="form-label">Forced Display<span style={{ color: 'red' }}>*</span></Label>
                                <Input
                                    name="forced"
                                    type="select"
                                    placeholder="Select forced display"
                                    className="form-select"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.forced || ""}
                                >
                                    <option value="101">Select forced display</option>
                                    <option value="102">Not Forced</option>
                                    <option value="103">Forced</option>
                                </Input>
                                {validation.touched.forced && validation.errors.forced ? (
                                    <FormFeedback type="invalid">
                                        {validation.errors.forced}
                                    </FormFeedback>
                                ) : null}
                            </div>
                        </Col>
                        <Col sm="4">
                            <div className="mb-3">
                                <Label className="form-label">Display Type<span style={{ color: 'red' }}>*</span></Label>
                                <Input
                                    name="type"
                                    type="select"
                                    placeholder="Select type"
                                    className="form-select"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.type || ""}
                                >
                                    <option value="104">Select display type</option>
                                    <option value="105">Central Display</option>
                                    <option value="106">Top Scroll</option>
                                    <option value="106">Bottom Scroll</option>
                                    <option value="106">Central Display With FP</option>
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
                                <Label className="form-label">Duration</Label>
                                <Input
                                    name="duration"
                                    type="number"
                                    placeholder="1"
                                    // className="form-select"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.duration || ""}
                                >
                                </Input>
                                {validation.touched.duration && validation.errors.duration ? (
                                    <FormFeedback type="invalid">
                                        {validation.errors.duration}
                                    </FormFeedback>
                                ) : null}
                            </div>
                        </Col>
                        <Col sm="4">
                            <div className="mb-3">
                                <Label className="form-label">Interval (in seconds) (should be greater than duration)</Label>
                                <Input
                                    name="" interval
                                    type="number"
                                    placeholder="1"
                                    // className="form-select"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.interval || ""}
                                >
                                </Input>
                                {validation.touched.interval && validation.errors.interval ? (
                                    <FormFeedback type="invalid">
                                        {validation.errors.interval}
                                    </FormFeedback>
                                ) : null}
                            </div>
                        </Col>
                        <Col sm="4">
                            <div>
                                <Label htmlFor="customRange1" className="form-label">
                                    Repetition
                                </Label>
                                <Input
                                    type="range"
                                    className="form-range"
                                    id="customRange1"
                                    value={rangeValue}
                                    onChange={handleRangeChange}
                                    onClick={handleRangeClick}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        border: 'solid 3px blue',
                                        cursor: 'pointer',
                                        borderRadius: '5px',
                                    }}
                                />
                                <div style={{ marginTop: '10px' }}>Value: {rangeValue}</div>
                            </div>
                        </Col>

                        <Col sm="4">
                            <div className="mb-3">
                                <Label className="form-label">Font Size<span style={{ color: 'red' }}>*</span></Label>
                                <Input
                                    name="fontsize"
                                    type="select"
                                    placeholder="Select font size"
                                    className="form-select"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.fontsize || ""}
                                >
                                    <option value="201">Default</option>
                                    <option value="202">Large</option>
                                    <option value="202">Small</option>
                                </Input>
                                {validation.touched.fontsize && validation.errors.fontsize ? (
                                    <FormFeedback type="invalid">
                                        {validation.errors.fontsize}
                                    </FormFeedback>
                                ) : null}
                            </div>
                        </Col>
                        <Col sm="4">
                            <div className="mb-3">
                                <Label className="form-label">Font Color<span style={{ color: 'red' }}>*</span></Label>
                                <Input
                                    name="fontcolor"
                                    type="select"
                                    placeholder="Select font color"
                                    className="form-select"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.fontcolor || ""}
                                >
                                    <option value="301">Black</option>
                                    <option value="302">Navy Blue</option>
                                    <option value="303">Blue</option>
                                    <option value="304">Green</option>
                                    <option value="305">Teal Green</option>
                                    <option value="306">Lime</option>
                                </Input>
                                {validation.touched.fontcolor && validation.errors.fontcolor ? (
                                    <FormFeedback type="invalid">
                                        {validation.errors.fontcolor}
                                    </FormFeedback>
                                ) : null}
                            </div>
                        </Col>

                        <Col sm="4">
                            <div className="mb-3">
                                <Label className="form-label">Background Color<span style={{ color: 'red' }}>*</span></Label>
                                <Input
                                    name="backgroundcolor"
                                    type="select"
                                    placeholder="Select background color"
                                    className="form-select"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.backgroundcolor || ""}
                                >
                                    <option value="11">Black</option>
                                    <option value="12">Navy Blue</option>
                                    <option value="13">Blue</option>
                                    <option value="14">Green</option>
                                    <option value="15">Teal Green</option>
                                    <option value="16">Lime</option>
                                </Input>
                                {validation.touched.backgroundcolor && validation.errors.backgroundcolor ? (
                                    <FormFeedback type="invalid">
                                        {validation.errors.backgroundcolor}
                                    </FormFeedback>
                                ) : null}
                            </div>
                        </Col>
                        <Col sm="4">
                            <div className="mb-3">
                                <Label className="form-label">Background Area<span style={{ color: 'red' }}>*</span></Label>
                                <Input
                                    name="backgroundarea"
                                    type="select"
                                    placeholder="backgroundarea"
                                    className="form-select"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.backgroundarea || ""}
                                >
                                    <option value="21">20</option>
                                    <option value="22">30</option>
                                    <option value="23">40</option>
                                    <option value="24">50</option>
                                    <option value="25">60</option>
                                    <option value="26">70</option>
                                    <option value="27">80</option>
                                    <option value="28">90</option>
                                    <option value="29">100</option>
                                </Input>
                                {validation.touched.backgroundcolor && validation.errors.backgroundcolor ? (
                                    <FormFeedback type="invalid">
                                        {validation.errors.backgroundcolor}
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

NSTVList.propTypes = {
    toggle: PropTypes.func,
    isOpen: PropTypes.bool,
};

export default NSTVList;
