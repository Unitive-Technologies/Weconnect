import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap";
import { useDispatch } from "react-redux";

const PromoVoucherListStatus = (props) => {
  const {
    isOpen,
    selectedData,
    handlePromoVoucherScrap,
    voucher_type,
  } = props;
  console.log("PPPPPPromo Voucher Scrap Data" + JSON.stringify(selectedData))

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
        *  Voucher Scrapped
      </ModalBody>
    </Modal>
  );
};

PromoVoucherListStatus.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default PromoVoucherListStatus;
