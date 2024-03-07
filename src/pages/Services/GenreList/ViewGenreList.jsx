import React, { useEffect, useState, useRef, useMemo } from "react";
import { Link } from "react-router-dom";
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
    ModalFooter,
    Label,
    FormFeedback,
    UncontrolledTooltip,
    Input,
    Form,
} from "reactstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { updateGenreList as onUpdateGenreList } from "/src/store/genre/actions";
import ShowHistoryModal from "./ShowHistoryModal";


const ViewGenreList = (props) => {
    const { isOpen, handleViewGenreList, genre, genrelistStatus } = props;
    // console.log("user in view Genre List modal:" + JSON.stringify(genre));
    const dispatch = useDispatch();
    const [showEditGenreList, setShowEditGenreList] = useState(false);

    const [showHistory, setShowHistory] = useState(false);

    const toggleHistoryModal = () => {
        setShowHistory(!showHistory);
    };

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
            id: (genre && genre.id) || "",
            name: (genre && genre.name) || "",
            status: (genre && genre.status) || "",
            description: (genre && genre.description) || "",
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Please Enter Title"),
            status: Yup.string().required("Please Enter status"),
            description: Yup.string().required("Please Enter description"),
        }),
        onSubmit: (values) => {
            const updateGenreList = {
                id: genre.id,
                status: parseInt(values.status),
                name: values.name,
                description: values.description,
            };
            // update user
            dispatch(onUpdateGenreList(updateGenreList));
            validation.resetForm();
            setShowEditGenreList(false);
            handleViewGenreList();
        },
    });

    const handleCancel = () => {
        setShowEditGenreList(false);
        handleViewGenreList();
    };

    return (
        <>
            {showHistory && (
                <ShowHistoryModal
                    isOpen={showHistory}
                    toggleHistoryModal={toggleHistoryModal}
                    genre={genre}
                />
            )}
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
                    {!showEditGenreList
                        ? `View ${(genre && genre.name) || ""}`
                        : `Edit ${(genre && genre.name) || ""}`}
                </ModalHeader>

                {!showEditGenreList && (
                    <>
                        <Link
                            style={{
                                position: "absolute",
                                marginLeft: "92%",
                                marginTop: "1%",
                            }}
                            to="#!"
                            className="btn btn-light me-1"
                            onClick={() => setShowHistory(true)}
                        >
                            <i className="dripicons-briefcase" />
                        </Link>
                        <Link
                            style={{
                                position: "absolute",
                                marginLeft: "87%",
                                marginTop: "1%",
                            }}
                            to="#!"
                            className="btn btn-light me-1"
                            onClick={() => setShowEditGenreList(true)}
                        >
                            <i className="mdi mdi-pencil-outline"></i>
                        </Link>
                    </>
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
                            <Col sm="12">
                                <div className="mb-3">
                                    <Label className="form-label">Title<span style={{ color: 'red' }}>*</span></Label>
                                    <Input
                                        name="name"
                                        type="text"
                                        placeholder="Enter title"
                                        disabled={!showEditGenreList}
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
                                        disabled={!showEditGenreList}
                                    >
                                        {genrelistStatus.map((status) => (
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
                                <div className="mb-3">
                                    <Label className="form-label">Description<span style={{ color: "red" }}>*</span></Label>
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
                                        disabled={!showEditGenreList}
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
                        {showEditGenreList && (
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
                {/* </Modal> */}
            </Modal >
        </>

    );
};

ViewGenreList.propTypes = {
    toggle: PropTypes.func,
    isOpen: PropTypes.bool,
};

export default ViewGenreList;
