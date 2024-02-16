import React, { useEffect, useState, useRef, useMemo } from "react";
import PropTypes from "prop-types";
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
import { addNewOSDConfiguration as onAddNewOSDConfiguration } from "/src/store/OSDConfiguration/actions";
import { useSelector, useDispatch } from "react-redux";
import { getOSDConfiguration as onGetOSDConfiguration } from "/src/store/actions";

const NSTVList = (props) => {
    const { isOpen, toggle, osdConfigBackgroundArea, osdConfigBackgroundColor, osdConfigDisplay, osdConfigEnable, osdConfigFontColor, osdConfigFontSize, osdConfigForcedDisplay, osdConfigStatus } = props;
    const dispatch = useDispatch();

    const [rangeValue, setRangeValue] = useState(1);

    const validation = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,

        initialValues: {
            name: "",
            status: "",
            start_time: "10:00",
            // start_time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            end_time: "11:00",
            enable: "",
            forceddisplay: "",
            displaytype: "",
            duration: "",
            interval: "",
            repetition: rangeValue,
            fontSize: "",
            fontcolor: "",
            backgroundColor: "",
            backgroundarea: "",
            created_by: "Admin",
            cas_code: "NSTV",

        },
        validationSchema: Yup.object({
            name: Yup.string().required("Enter  Code"),
            status: Yup.string().required("Select status"),
            // start_time: Yup.string().required(""),
            // end_time: Yup.string().required(""),
            enable: Yup.string().required("Send OSD"),
            forceddisplay: Yup.string().required("Select forced display"),
            displaytype: Yup.string().required("Select display type"),
            duration: Yup.string().required("duration"),
            interval: Yup.string().required("interval"),
            repetition: Yup.string().required("repetition"),
            fontSize: Yup.string().required("Select font size"),
            fontcolor: Yup.string().required("Select font color"),
            backgroundColor: Yup.string().required("Select back color"),
            backgroundarea: Yup.string().required("Select background area"),
        }),
        onSubmit: (values) => {
            const newOSDConfiguration = {
                id: Math.floor(Math.random() * (30 - 20)) + 20,
                name: values["name"],
                status: values["status"],
                start_time: values["start_time"],
                end_time: values["end_time"],
                enable: values["enable"],
                forceddisplay: values["forceddisplay"],
                displaytype: parseInt(values["displaytype"]),
                duration: parseInt(values["duration"]),
                interval: parseInt(values["interval"]),
                repetition: parseInt(values["repetition"]),
                fontSize: parseInt(values["fontSize"]),
                fontcolor: parseInt(values["fontcolor"]),
                backgroundColor: values["backgroundColor"],
                backgroundarea: values["backgroundarea"],
                cas_code: values["cas_code"],
                created_at: new Date(),
                created_by: values["created_by"],
            };
            console.log(
                "newOSDConfiguration:" + JSON.stringify(newOSDConfiguration)
            );
            // save new user
            dispatch(
                onAddNewOSDConfiguration(newOSDConfiguration));
            dispatch(onGetOSDConfiguration());
            validation.resetForm();
            toggle();
        },
        onReset: (values) => {
            validation.setValues(validation.initialValues);
        },
    });


    const handleRangeChange = (event) => {
        setRangeValue(parseInt(event.target.value));
    };

    const handleRangeClick = () => {
        // Increment the range value by 1, but limit it to 10
        setRangeValue((prevValue) => Math.min(prevValue + 1, 10));
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
            <ModalHeader tag="h4" toggle={toggle}>Add New NSTV OSD Configuration</ModalHeader>
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
                        {/* {console.log("Name:", validation.values.name)} */}
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
                                    <option value="">Select Status</option>
                                    {osdConfigStatus &&
                                        osdConfigStatus.map((status) => (
                                            <option key={status.id} value={status.name}>
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
                        {/* {console.log("Status:", validation.values.status)} */}
                        <Col sm="4">
                            <div className="mb-3">
                                <Label className="form-label">Start Time<span style={{ color: 'red' }}>*</span></Label>
                                <Input
                                    name="start_time"
                                    type="time"
                                    // placeholder="Enter channel code"
                                    // className="form-select"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.start_time || ""}
                                ></Input>
                                {validation.touched.start_time && validation.errors.start_time ? (
                                    <FormFeedback type="invalid">
                                        {validation.errors.start_time}
                                    </FormFeedback>
                                ) : null}
                            </div>
                        </Col>
                        {/* {console.log("Start time:", validation.values.start_time)} */}
                        <Col sm="4">
                            <div className="mb-3">
                                <Label className="form-label">End Time<span style={{ color: 'red' }}>*</span></Label>
                                <Input
                                    name="end_time"
                                    type="time"
                                    // placeholder="Enter name"
                                    // className="form-select"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.end_time || ""}
                                ></Input>
                                {validation.touched.end_time && validation.errors.end_time ? (
                                    <FormFeedback type="invalid">
                                        {validation.errors.end_time}
                                    </FormFeedback>
                                ) : null}
                            </div>
                        </Col>
                        {/* {console.log("end time", validation.values.end_time)} */}
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
                                    <option value=""></option>
                                    {osdConfigEnable &&
                                        osdConfigEnable.map((enable) => (
                                            <option key={enable.id} value={enable.id}>
                                                {enable.name}
                                            </option>
                                        ))}
                                </Input>
                                {validation.touched.enable &&
                                    validation.errors.enable ? (
                                    <FormFeedback type="invalid">
                                        {validation.errors.enable}
                                    </FormFeedback>
                                ) : null}
                            </div>
                        </Col>
                        {/* {console.log("Enable:", validation.values.enable)} */}
                        <div>
                            {validation.values.enable === "00" && (
                                <Row>
                                    <Col sm="4">
                                        <div className="mb-3">
                                            <Label className="form-label">Forced Display<span style={{ color: 'red' }}>*</span></Label>
                                            <Input
                                                name="forceddisplay"
                                                type="select"
                                                placeholder="Select forced display"
                                                className="form-select"
                                                onChange={validation.handleChange}
                                                onBlur={validation.handleBlur}
                                                value={validation.values.forceddisplay || ""}
                                            >
                                                <option value="">Select forced display</option>
                                                {osdConfigForcedDisplay &&
                                                    osdConfigForcedDisplay.map((forceddisplay) => (
                                                        <option key={forceddisplay.id} value={forceddisplay.name}>
                                                            {forceddisplay.name}
                                                        </option>
                                                    ))}
                                            </Input>
                                            {validation.touched.forceddisplay && validation.errors.forceddisplay ? (
                                                <FormFeedback type="invalid">
                                                    {validation.errors.forceddisplay}
                                                </FormFeedback>
                                            ) : null}
                                        </div>
                                    </Col>

                                    {/* {console.log("ForcedDisplay:", validation.values.forceddisplay)}
                        {console.log("forced display: " + validation.values.forceddisplay)}
                        {console.log(
                            "forced display: " + typeof validation.values.forceddisplay)} */}
                                    <Col sm="4">
                                        <div className="mb-3">
                                            <Label className="form-label">Display Type<span style={{ color: 'red' }}>*</span></Label>
                                            <Input
                                                name="displaytype"
                                                type="select"
                                                placeholder="Select display type"
                                                className="form-select"
                                                onChange={validation.handleChange}
                                                onBlur={validation.handleBlur}
                                                value={validation.values.displaytype || ""}
                                            >
                                                <option value="">Select Display Type</option>
                                                {osdConfigDisplay &&
                                                    osdConfigDisplay.map((displaytype) => (
                                                        <option key={displaytype.id} value={displaytype.name}>
                                                            {displaytype.name}
                                                        </option>
                                                    ))}
                                            </Input>
                                            {validation.touched.displaytype && validation.errors.displaytype ? (
                                                <FormFeedback type="invalid">
                                                    {validation.errors.displaytype}
                                                </FormFeedback>
                                            ) : null}
                                        </div>
                                    </Col>
                                    {/* {console.log("Display Type:", validation.values.displaytype)} */}

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
                                    {/* {console.log("Duration:", validation.values.duration)} */}
                                    <Col sm="4">
                                        <div className="mb-3">
                                            <Label className="form-label">Interval (in seconds) (should be greater than duration)</Label>
                                            <Input
                                                name="interval"
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
                                    {/* {console.log("Interval:", validation.values.interval)} */}
                                    {/* <Col sm="4">
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
                                                min={1}
                                                max={10}
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    border: `solid 3px ${rangeValue === validation.values.repetition ? 'green' : 'blue'}`,
                                                    cursor: 'pointer',
                                                    borderRadius: '5px',
                                                }}
                                            />
                                            <div style={{ marginTop: '10px' }}>Value: {rangeValue}</div>
                                            <div>
                                                {validation.touched.repetition && validation.errors.repetition ? (
                                                    <FormFeedback type="invalid">
                                                        {validation.errors.repetition}
                                                    </FormFeedback>
                                                ) : null}
                                            </div>
                                        </div>
                                    </Col> */}
                                    {/* {console.log("Repetition:", validation.values.repetition)} */}

                                    <Col sm="4">
                                        <div className="mb-3">
                                            <Label className="form-label">Font Size<span style={{ color: 'red' }}>*</span></Label>
                                            <Input
                                                name="fontSize"
                                                type="select"
                                                placeholder="Select font size"
                                                className="form-select"
                                                onChange={validation.handleChange}
                                                onBlur={validation.handleBlur}
                                                value={validation.values.fontSize || ""}
                                            >
                                                <option value="">Select Font Size</option>
                                                {osdConfigFontSize &&
                                                    osdConfigFontSize.map((fontSize) => (
                                                        <option key={fontSize.id} value={fontSize.name}>
                                                            {fontSize.name}
                                                        </option>
                                                    ))}
                                            </Input>
                                            {validation.touched.fontSize && validation.errors.fontSize ? (
                                                <FormFeedback type="invalid">
                                                    {validation.errors.fontSize}
                                                </FormFeedback>
                                            ) : null}
                                        </div>
                                    </Col>
                                    {/* {console.log("Font Size:", validation.values.fontSize)}
                        {console.log("font size: " + validation.values.fontSize)}
                        {console.log(
                            "font size: " + typeof validation.values.fontSize
                        )} */}
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
                                                <option value="">Select Font Color</option>
                                                {osdConfigFontColor &&
                                                    osdConfigFontColor.map((fontcolor) => (
                                                        <option key={fontcolor.id} value={fontcolor.name}>
                                                            {fontcolor.name}
                                                        </option>
                                                    ))}
                                            </Input>
                                            {validation.touched.fontcolor && validation.errors.fontcolor ? (
                                                <FormFeedback type="invalid">
                                                    {validation.errors.fontcolor}
                                                </FormFeedback>
                                            ) : null}
                                        </div>
                                    </Col>
                                    {/* {console.log("Font Color:", validation.values.fontcolor)}
                        {console.log("font color: " + validation.values.fontcolor)}
                        {console.log(
                            "font color: " + typeof validation.values.fontcolor
                        )} */}

                                    <Col sm="4">
                                        <div className="mb-3">
                                            <Label className="form-label">Background Color<span style={{ color: 'red' }}>*</span></Label>
                                            <Input
                                                name="backgroundColor"
                                                type="select"
                                                placeholder="Select background color"
                                                className="form-select"
                                                onChange={validation.handleChange}
                                                onBlur={validation.handleBlur}
                                                value={validation.values.backgroundColor || ""}
                                            >
                                                <option value="">Select back color</option>
                                                {osdConfigBackgroundColor &&
                                                    osdConfigBackgroundColor.map((backgroundColor) => (
                                                        <option key={backgroundColor.id} value={backgroundColor.name}>
                                                            {backgroundColor.name}
                                                        </option>
                                                    ))}
                                            </Input>
                                            {validation.touched.backgroundColor && validation.errors.backgroundColor ? (
                                                <FormFeedback type="invalid">
                                                    {validation.errors.backgroundColor}
                                                </FormFeedback>
                                            ) : null}
                                        </div>
                                    </Col>
                                    {/* {console.log("Background Color:", validation.values.backgroundColor)}
                        {console.log("back color: " + validation.values.backgroundColor)}
                        {console.log(
                            "back color type: " + typeof validation.values.backgroundColor
                        )} */}
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
                                                <option value="">Select background area</option>
                                                {osdConfigBackgroundArea &&
                                                    osdConfigBackgroundArea.map((backgroundarea) => (
                                                        <option key={backgroundarea.id} value={backgroundarea.id}>
                                                            {backgroundarea.name}
                                                        </option>
                                                    ))}
                                            </Input>
                                            {validation.touched.backgroundarea && validation.errors.backgroundarea ? (
                                                <FormFeedback type="invalid">
                                                    {validation.errors.backgroundarea}
                                                </FormFeedback>
                                            ) : null}
                                        </div>
                                    </Col>
                                    {/* {console.log("Background Area:", validation.values.backgroundarea)}
                        {console.log("background area: " + validation.values.backgroundarea)}
                        {console.log(
                            "background area: " + typeof validation.values.backgroundarea
                        )} */}
                                </Row>
                            )}
                        </div>
                    </Row>
                    <Row>
                        <Col>
                            <ModalFooter>
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
                            </ModalFooter>
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
