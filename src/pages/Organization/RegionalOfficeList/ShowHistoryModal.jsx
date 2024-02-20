import React from "react";
import { Modal } from "reactstrap";

const ShowHistoryModal = () => {
  return (
    <Modal
      isOpen={isOpen}
      role="dialog"
      size="xl"
      autoFocus={true}
      centered={true}
      className="exampleModal"
      tabIndex="-1"
      toggle={handleCancel}
    ></Modal>
  );
};

export default ShowHistoryModal;
