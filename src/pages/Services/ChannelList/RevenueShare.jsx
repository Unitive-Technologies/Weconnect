import React from "react";
import { Row, Col } from "reactstrap";
import Slider from "react-rangeslider";
import "react-rangeslider/lib/index.css";

const RevenueShare = ({ def, def1, def2, setdef1, setdef2, setdef }) => {
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
              onChange={(newValue) => {
                setdef(newValue);
              }}
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
              onChange={(newValue) => {
                setdef1(newValue);
              }}
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
              onChange={(newValue) => {
                setdef2(newValue);
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
