import React from "react";
import { Row, Col } from "reactstrap";
import Slider from "react-rangeslider";
import "react-rangeslider/lib/index.css";

const RevenueShare = ({ def, def1, def2, setDef1, setDef2, setDef }) => {

  const handleSliderChange = (value, stateSetter) => {
    stateSetter(value);
  };

  return (
    <div>
      <Row>
        <Col md={6}>
          <div className="p-3">
            <h5 className="font-size-14 mb-3 mt-0">Brodcaster Share</h5>

            <Slider
              value={def}
              orientation="horizontal"
              onChange={(value) => {
                handleSliderChange(value, setDef);
              }}
            />
            <span className="float-right  mt-4">Value: {def} %</span>
          </div>
          <div className="p-3">
            <h5 className="font-size-14 mb-3 mt-0">MSO Share</h5>

            <Slider
              value={def1}
              orientation="horizontal"
              onChange={(value) => {
                handleSliderChange(value, setDef1);
              }}
            />
            <span className="float-right  mt-4">Value: {def1} %</span>
          </div>
          <div className="p-3">
            <h5 className="font-size-14 mb-3 mt-0">MSO Discount</h5>

            <Slider
              value={def2}
              orientation="horizontal"
              onChange={(value) => {
                handleSliderChange(value, setDef2);
              }}
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
