import React, { useState } from "react";
import { Row, Col, Card, CardBody, CardTitle, Container } from "reactstrap";
import Slider from "react-rangeslider";
import PieChart from "./PieChart";
import "react-rangeslider/lib/index.css";

const RevenueShare = () => {
  const [def, setdef] = useState(50);
  const [def1, setdef1] = useState(20);
  const [def2, setdef2] = useState(0);
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
                setdef(value);
              }}
            />
            <span className="float-right  mt-4">Value: {def} %</span>
          </div>
          <div className="p-3">
            <h5 className="font-size-14 mb-3 mt-0">MSO Share</h5>

            <Slider
              value={def}
              orientation="horizontal"
              onChange={(value) => {
                setdef1(value);
              }}
            />
            <span className="float-right  mt-4">Value: {def1} %</span>
          </div>
          <div className="p-3">
            <h5 className="font-size-14 mb-3 mt-0">MSO Discount</h5>

            <Slider
              value={def}
              orientation="horizontal"
              onChange={(value) => {
                setdef2(value);
              }}
            />
            <span className="float-right  mt-4">Value: {def2} %</span>
          </div>
          <span>Note: Discount won't be shared with LCO</span>
        </Col>
        {/* <Col lg={6}>
          <Card>
            <CardBody>
              <span>Graphical representation of SHARE</span>
              <CardTitle className="mb-4">(MRP: 15) </CardTitle>
              <PieChart dataColors='["--bs-success","--bs-primary", "--bs-danger","--bs-info", "--bs-warning"]' />
            </CardBody>
          </Card>
        </Col> */}
      </Row>
    </div>
  );
};

export default RevenueShare;
