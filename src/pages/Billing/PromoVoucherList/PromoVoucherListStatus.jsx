import React, { useState } from "react";
import PropTypes from "prop-types";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { useDispatch } from "react-redux";

const PromoVoucherListStatus = (props) => {
  const { isOpen, selectedRows, selectedData, handlePromoVoucherScrap } = props;
  console.log("PPPPPPromo Voucher Scrap Data" + JSON.stringify(selectedData));
  console.log(
    "Selected Rows on Promovoucherliststatus:" + JSON.stringify(selectedRows)
  );
  const dispatch = useDispatch();

  return (
    <Modal
      isOpen={isOpen}
      size="l"
      role="dialog"
      autoFocus={true}
      centered={true}
      className="exampleModal"
      tabIndex="-1"
      toggle={handlePromoVoucherScrap}
    >
      <ModalHeader tag="h4" toggle={handlePromoVoucherScrap}>
        Voucher Scrapped for 1 out 1
      </ModalHeader>
      <ModalBody>
        <ul>
          {selectedData.map((single, index) => (
            <li key={index} style={{ paddingBottom: "10px" }}>
              {index > 0 && " "} {single.code} Voucher Scrapped
            </li>
          ))}
        </ul>
      </ModalBody>
    </Modal>
  );
};

PromoVoucherListStatus.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default PromoVoucherListStatus;
