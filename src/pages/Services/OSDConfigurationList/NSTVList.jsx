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
            forceddisplay: "",
            displaytype: "",
            duration: "",
            interval: "",
            repetition: "",
            fontSize: "",
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
            forceddisplay: Yup.string().required("Select forced display"),
            displaytype: Yup.string().required("Select display type"),
            duration: Yup.string().required("duration"),
            interval: Yup.string().required("interval"),
            repetition: Yup.string().required("repetition"),
            fontSize: Yup.string().required("Select font size"),
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
                forceddisplay: values["forceddisplay"],
                displaytype: values["displaytype"],
                duration: values["duration"],
                interval: values["interval"],
                repetition: values["repetition"],
                fontSize: values["fontSize"],
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
                onAddNewOSDConfiguration(newOSDConfiguration));
            dispatch(onGetOSDConfiguration());
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
                                    <option value="">Select Enable</option>
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
                                            <option key={forceddisplay.id} value={forceddisplay.id}>
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
                                            <option key={displaytype.id} value={displaytype.id}>
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
                                            <option key={fontSize.id} value={fontSize.id}>
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
                                            <option key={fontcolor.id} value={fontcolor.id}>
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
                                    <option value="">Select back color</option>
                                    {osdConfigBackgroundColor &&
                                        osdConfigBackgroundColor.map((backgroundcolor) => (
                                            <option key={backgroundcolor.id} value={backgroundcolor.id}>
                                                {backgroundcolor.name}
                                            </option>
                                        ))}
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
