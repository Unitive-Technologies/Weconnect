import React, { useState } from "react";
import { Row, Col, Card, CardBody, CardTitle, Container } from "reactstrap";
import Slider from "react-rangeslider";
import PieChart from "./PieChart";
import "react-rangeslider/lib/index.css";

const RevenueShareForEdit = ({
  broadPercent,
  msoPercent,
  discountPercent,
  setBroadPercent,
  setMsoPercent,
  setDiscountPercent,
  showEditChannel,
}) => {
  console.log(
    "broadPercent, msoPercent, discountPercent:" + broadPercent,
    msoPercent,
    discountPercent,
    showEditChannel
  );
  const handleBroadCastShare = (newValue) => {
    setBroadPercent(newValue);

    const RevisedMsoValue = 100 - newValue - discountPercent;
    setMsoPercent(RevisedMsoValue);
  };

  const handleMsoShare = (newValue) => {
    setMsoPercent(newValue);

    const RevisedBroadCastValue = 100 - newValue - discountPercent;
    setBroadPercent(RevisedBroadCastValue);
  };

  const handleDiscount = (newValue) => {
    setDiscountPercent(newValue);

    const BalanceValue = 100 - broadPercent;

    if (msoPercent > newValue) {
      const RevisedMsoShare = BalanceValue - newValue;
      setMsoPercent(RevisedMsoShare);
    } else {
      const RevisedMsoShare = 0;
      setMsoPercent(RevisedMsoShare);
      const RevisedBroadCastValue = 100 - newValue;
      setBroadPercent(RevisedBroadCastValue);
    }
  };

  return (
    <div>
      <Row>
        <Col md={6}>
          <div className="p-3">
            <h5 className="font-size-14 mb-3 mt-0">Brodcaster Share</h5>

            <Slider
              value={broadPercent}
              min={65}
              max={100}
              orientation="horizontal"
              onChange={(newValue) =>
                showEditChannel && handleBroadCastShare(newValue)
              }
              disabled={!showEditChannel}
            />
            <span className="float-right  mt-4">Value: {broadPercent} %</span>
          </div>
          <div className="p-3">
            <h5 className="font-size-14 mb-3 mt-0">MSO Share</h5>

            <Slider
              value={msoPercent}
              min={0}
              max={35}
              orientation="horizontal"
              onChange={(newValue) =>
                showEditChannel && handleMsoShare(newValue)
              }
              disabled={!showEditChannel}
            />
            <span className="float-right  mt-4">Value: {msoPercent} %</span>
          </div>
          <div className="p-3">
            <h5 className="font-size-14 mb-3 mt-0">MSO Discount</h5>

            <Slider
              value={discountPercent}
              min={0}
              max={15}
              orientation="horizontal"
              onChange={(newValue) =>
                showEditChannel && handleDiscount(newValue)
              }
              disabled={!showEditChannel}
            />
            <span className="float-right  mt-4">
              Value: {discountPercent} %
            </span>
          </div>
          <span>Note: Discount won't be shared with LCO</span>
        </Col>
      </Row>
    </div>
  );
};

export default RevenueShareForEdit;
