import React from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import PropTypes from "prop-types";

function StockScMarkfaulty(props) {
  const { isOpen, toggle } = props;
  return (
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
      <ModalHeader toggle={toggle}>Mark Faulty Smartcard</ModalHeader>
      <ModalBody></ModalBody>
    </Modal>
  );
}

StockScMarkfaulty.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default StockScMarkfaulty;
