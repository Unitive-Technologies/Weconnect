import React, { useState } from "react";
import { Row, Col, Card, CardBody, CardTitle, Container } from "reactstrap";
import Slider from "react-rangeslider";

const RevenueShare = () => {
  const [def, setdef] = useState(50);
  return (
    <div>
      <Row>
        <Col md={6}>
          <div className="p-3">
            <h5 className="font-size-14 mb-3 mt-0">Default</h5>
            <span className="float-left mt-4">0</span>{" "}
            <span className="float-right  mt-4">100</span>
            <Slider
              value={def}
              orientation="horizontal"
              onChange={(value) => {
                setdef(value);
              }}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default RevenueShare;
