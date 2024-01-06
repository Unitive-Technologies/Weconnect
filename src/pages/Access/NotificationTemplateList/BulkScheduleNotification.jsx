import React from "react";
import { Modal } from "reactstrap";
const BulkScheduleNotification = ({ isOpen, onClose, selectedRow }) => {
  console.log("row in bulk:" + JSON.stringify(selectedRow));
  return (
    <Modal
      isOpen={isOpen}
      role="dialog"
      size="xl"
      autoFocus={true}
      centered={true}
      className="exampleModal"
      tabIndex="-1"
      toggle={onClose}
    >
      <h1>Bulk Schedule Notification Template</h1>
      <p>{selectedRow.name}</p>
    </Modal>
  );
};

export default BulkScheduleNotification;
