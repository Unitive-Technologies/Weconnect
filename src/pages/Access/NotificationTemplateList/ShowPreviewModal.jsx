import React, { useEffect, useState, useRef, useMemo } from "react";
import PropTypes from "prop-types";
import {
  Col,
  Row,
  Modal,
  ModalFooter,
  ModalHeader,
  ModalBody,
  Label,
  FormFeedback,
  Input,
  Form,
} from "reactstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import { addNewUser as onAddNewUser } from "/src/store/users/actions";
import { useDispatch } from "react-redux";

const ShowPreviewModal = (props) => {
  const { isOpen, handlePreview, message } = props;
  const dispatch = useDispatch();

  return (
    <Modal
      isOpen={isOpen}
      role="dialog"
      autoFocus={true}
      centered={true}
      className="exampleModal"
      tabIndex="-1"
      toggle={handlePreview}
    >
      <ModalHeader tag="h4">Important Message</ModalHeader>
      <ModalBody>
        <div>{message}</div>
      </ModalBody>
      <ModalFooter>
        <button
          type="submit"
          className="btn btn-success save-user"
          onClick={handlePreview}
        >
          OK
        </button>
      </ModalFooter>
    </Modal>
  );
};

ShowPreviewModal.propTypes = {
  handleAddUser: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default ShowPreviewModal;
