import React from "react";
import { Row, Col } from "reactstrap";
import Slider from "react-rangeslider";
import "react-rangeslider/lib/index.css";

const RevenueShare = ({ def, def1, def2, setdef1, setdef2, setdef }) => {
  const handleBroadCastShare = (newValue) => {
    setdef(newValue);
    const MsoShareValue = def1;
    const DiscountValue = def2;

    const RevisedMsoValue = 100 - newValue - DiscountValue;
    setdef1(RevisedMsoValue);
    // const RevisedDisCountValue = 100 - newValue - MsoShareValue;
    // setdef2(RevisedDisCountValue);
  };

  const handleMsoShare = (newValue) => {
    setdef1(newValue);
    const MsoShareValue = def1;
    const DiscountValue = def2;

    const RevisedBroadCastValue = 100 - newValue - DiscountValue;
    setdef(RevisedBroadCastValue);
    // const RevisedDisCountValue = 100 - newValue - MsoShareValue;
    // setdef2(RevisedDisCountValue);
  };

  const handleDiscount = (newValue) => {
    setdef2(newValue);
    const MsoShareValue = def1;
    const BroadCastValue = def;
    const BalanceValue = 100 - BroadCastValue;

    if (MsoShareValue > newValue) {
      const RevisedMsoShare = BalanceValue - newValue;
      setdef1(RevisedMsoShare);
    } else {
      const RevisedMsoShare = 0;
      setdef1(RevisedMsoShare);
      const RevisedBroadCastValue = 100 - newValue;
      setdef(RevisedBroadCastValue);
    }
  };

  console.log("def value:" + def, def1, def2);
  return (
    <div>
      <Row>
        <Col md={6}>
          <div className="p-3">
            <h5 className="font-size-14 mb-3 mt-0">Brodcaster Share</h5>

            <Slider
              value={def}
              min={65}
              max={100}
              orientation="horizontal"
              onChange={(newValue) => handleBroadCastShare(newValue)}
              // onChange={(newValue) => {
              //   setdef(newValue);
              // }}
            />
            <span className="float-right  mt-4">Value: {def} %</span>
          </div>
          <div className="p-3">
            <h5 className="font-size-14 mb-3 mt-0">MSO Share</h5>

            <Slider
              value={def1}
              min={0}
              max={35}
              orientation="horizontal"
              onChange={(newValue) => handleMsoShare(newValue)}
              // onChange={(newValue) => {
              //   setdef1(newValue);
              // }}
            />
            <span className="float-right  mt-4">Value: {def1} %</span>
          </div>
          <div className="p-3">
            <h5 className="font-size-14 mb-3 mt-0">MSO Discount</h5>

            <Slider
              value={def2}
              min={0}
              max={15}
              orientation="horizontal"
              onChange={(newValue) => handleDiscount(newValue)}
              // onChange={(newValue) => {
              //   setdef2(newValue);
              // }}
            />
            <span className="float-right  mt-4">Value: {def2} %</span>
          </div>
          <span>Note: Discount won't be shared with LCO</span>
        </Col>
      </Row>
    </div>
  );
};

export default RevenueShare;
