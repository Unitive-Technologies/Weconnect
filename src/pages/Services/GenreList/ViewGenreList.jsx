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
import { useSelector, useDispatch } from "react-redux";
import { updateUser as onUpdateUser } from "/src/store/users/actions";

const ViewGenreList = (props) => {
    const { isOpen, toggle, genre } = props;
    //   console.log("user in viewuser modal:" + JSON.stringify(user));
    const dispatch = useDispatch();
    const [showEditUser, setShowEditUser] = useState(false);

    const validation = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,

        initialValues: {
            id: (genre && genre.id) || "",
            title: (genre && genre.name) || "",
            status: (genre && genre.status) || "",
            description: (genre && genre.description) || "",
        },
        validationSchema: Yup.object({
            title: Yup.string().required("Please Enter Title"),
            status: Yup.string().required("Please Enter status"),
            description: Yup.string().required("Please Enter description"),
        }),
        onSubmit: (values) => {
            const updateUser = {
                id: genre.id,
                title: values.title,
                status: values.status,
                description: values.description,
            };

            // update user
            dispatch(onUpdateUser(updateUser));
            validation.resetForm();
            toggle();
        },
    });
    return (
        <>
            {/* <EditUserModal
        isOpen={showEditUser}
        // onClose={() => setShowEditUser(false)}
      /> */}
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
                {!showEditUser ? (
                    <ModalHeader toggle={toggle} tag="h4">
                        View {genre.name}
                        <i
                            className="bx bx bxs-edit"
                            style={{ marginLeft: "20px", cursor: "pointer" }}
                            onClick={() => setShowEditUser(true)}
                        ></i>
                    </ModalHeader>
                ) : (
                    <ModalHeader toggle={toggle} tag="h4">
                        Edit {genre.name}
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
                            <Col sm="12">
                                <div className="mb-3">
                                    <Label className="form-label">Title<span style={{ color: 'red' }}>*</span></Label>
                                    <Input
                                        name="title"
                                        type="text"
                                        placeholder="Enter title"
                                        disabled={!showEditUser}
                                        onChange={validation.handleChange}
                                        onBlur={validation.handleBlur}
                                        value={validation.values.title || ""}
                                        invalid={
                                            validation.touched.title && validation.errors.title
                                                ? true
                                                : false
                                        }
                                    />
                                    {validation.touched.title && validation.errors.title ? (
                                        <FormFeedback type="invalid">
                                            {validation.errors.title}
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
                                        disabled={!showEditUser}
                                        onChange={validation.handleChange}
                                        onBlur={validation.handleBlur}
                                        value={validation.values.status || ""}
                                    >
                                        {/* <option value="">Select Status</option> */}
                                        <option value="11">Active</option>
                                        <option value="12">BLOCKED</option>
                                        <option value="13">In-Active</option>
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
                                        disabled={!showEditUser}
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
                                <div className="text-end">
                                    <button type="submit" className="btn btn-success save-user">
                                        Save
                                    </button>
                                </div>
                            </Col>

                        </Row>
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
