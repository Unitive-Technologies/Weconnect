import React from "react";
import { Toast, ToastBody, ToastHeader } from "reactstrap";
import PropTypes from "prop-types";

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

function DeallotToast(props) {
  const { deallotWarning, handleDeallotWarning } = props;
  return (
    <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: "1005" }}>
      <Toast isOpen={deallotWarning}>
        <ToastHeader toggle={handleDeallotWarning}>
          <i className="mdi mdi-alert-outline me-2"></i> Warning
        </ToastHeader>
        <ToastBody>Please select atleast one Data without My Mso</ToastBody>
      </Toast>
    </div>
  );
}

export { AllotToast, DeallotToast };

ToastFunction.propTypes = {
  showWarning: PropTypes.bool,
  handleWarning: PropTypes.func,
};

AllotToast.propTypes = {
  allotWarning: PropTypes.bool,
  handleAllotWarning: PropTypes.func,
};

DeallotToast.propTypes = {
  deallotWarning: PropTypes.bool,
  handleDeallotWarning: PropTypes.func,
};
