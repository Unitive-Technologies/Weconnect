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
import { useSelector, useDispatch } from "react-redux";
import { updateUser as onUpdateUser } from "/src/store/users/actions";

const ViewNSTVList = (props) => {
    const { isOpen, toggle, osdConfiguration } = props;
    //   console.log("user in viewuser modal:" + JSON.stringify(user));
    const dispatch = useDispatch();
    const [showEditosdConfiguration, setShowosdConfiguration] = useState(false);

    const validation = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,

        initialValues: {
            id: (osdConfiguration && osdConfiguration.id) || "",
            name: (osdConfiguration && osdConfiguration.name) || "",
            status_lbl: (osdConfiguration && osdConfiguration.status_lbl) || "",
            start_time: (osdConfiguration && osdConfiguration.start_time) || "",
            end_time: (osdConfiguration && osdConfiguration.end_time) || "",
            enable: (osdConfiguration && osdConfiguration.enable) || "",
            forced: (osdConfiguration && osdConfiguration.forced) || "",
            type: (osdConfiguration && osdConfiguration.type) || "",
            duration: (osdConfiguration && osdConfiguration.duration) || "",
            interval: (osdConfiguration && osdConfiguration.interval) || "",
            repetition: (osdConfiguration && osdConfiguration.repetition) || "",
            fontsize: (osdConfiguration && osdConfiguration.fontsize) || "",
            fontcolor: (osdConfiguration && osdConfiguration.fontcolor) || "",
            backgroundcolor: (osdConfiguration && osdConfiguration.backgroundcolor) || "",
            backgroundarea: (osdConfiguration && osdConfiguration.backgroundarea) || "",
        },
        validationSchema: Yup.object({
            name: Yup.string().required(""),
            status_lbl: Yup.string().required(""),
            start_time: Yup.string().required(""),
            end_time: Yup.string().required(""),
            enable: Yup.string().required(""),
            forced: Yup.string().required(""),
            type: Yup.string().required(""),
            duration: Yup.string().required(""),
            interval: Yup.string().required(""),
            repetition: Yup.string().required(""),
            fontsize: Yup.string().required(""),
            fontcolor: Yup.string().required(""),
            backgroundcolor: Yup.string().required(""),
            backgroundarea: Yup.string().required(""),
        }),
        onSubmit: (values) => {
            const updateUser = {
                id: osdConfiguration.id,
                name: values.name,
                status_lbl: values.status_lbl,
                start_time: values.start_time,
                end_time: values.end_time,
                enable: values.enable,
                forced: values.forced,
                type: values.type,
                duration: values.duration,
                interval: values.interval,
                repetition: values.repetition,
                fontsize: values.fontsize,
                fontcolor: values.fontcolor,
                backgroundcolor: values.backgroundcolor,
                backgroundarea: values.backgroundarea,
            };

            // update user
            dispatch(onUpdateUser(updateUser));
            validation.resetForm();
            toggle();
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
                {!showEditosdConfiguration
                    ? (
                        <ModalHeader toggle={toggle} tag="h4">
                            View {osdConfiguration.name}
                            <i
                                className="bx bx bxs-edit"
                                style={{ marginLeft: "20px", cursor: "pointer" }}
                                onClick={() => setShowosdConfiguration(true)}
                            ></i>
                        </ModalHeader>
                    ) : (
                        <ModalHeader toggle={toggle} tag="h4">
                            Edit {osdConfiguration.name}
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
                            <Col>
                                <ModalFooter>
                                    <button type="submit" className="btn btn-success save-user">
                                        Save
                                    </button>

                                    {/* <button
                                        type="button"
                                        className="btn btn-outline-danger"
                                        onClick={() => {
                                            validation.resetForm();
                                            toggle();
                                        }}
                                    >
                                        Cancel
                                    </button> */}
                                </ModalFooter>
                            </Col>
                        </Row>
                    </Form>
                </ModalBody>
                {/* </Modal> */}
            </Modal >
        </>
    );
};

ViewNSTVList.propTypes = {
    toggle: PropTypes.func,
    isOpen: PropTypes.bool,
};

export default ViewNSTVList;
