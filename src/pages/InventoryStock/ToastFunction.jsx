import React from "react";
import { Toast, ToastBody, ToastHeader } from "reactstrap";

function ToastFunction(props) {
  const { showWarning, handleWarning } = props;
  return (
    <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: "1005" }}>
      <Toast isOpen={showWarning}>
        <ToastHeader toggle={handleWarning}>
          <i className="mdi mdi-alert-outline me-2"></i> Warning
        </ToastHeader>
        <ToastBody>Please select atleast one Data</ToastBody>
      </Toast>
    </div>
  );
}

export default ToastFunction;

function AllotToast(props) {
  const { allotWarning, handleAllotWarning } = props;
  return (
    <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: "1005" }}>
      <Toast isOpen={allotWarning}>
        <ToastHeader toggle={handleAllotWarning}>
          <i className="mdi mdi-alert-outline me-2"></i> Warning
        </ToastHeader>
        <ToastBody>Please select atleast one Data with My Mso</ToastBody>
      </Toast>
    </div>
  );
}

export { AllotToast };
