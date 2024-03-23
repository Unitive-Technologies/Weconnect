import React from "react";
import { Col, Row } from "reactstrap";
import { useState } from "react";

const DashboardPolicy = () => {
  const [toggleSwitch, settoggleSwitch] = useState(true);
  return (
    <Row
      style={{
        border: "1px solid #ced4da",
        // padding: "20px 0px",
        margin: "30px 0px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          borderBottom: "1px solid #ced4da",
        }}
      >
        <h4>DASHBOARD</h4>
        <div
          style={{
            display: "flex",
            gap: "20px",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h6>Tabs: 1, Total: 19, Selected: 19</h6>
          <div>
            <div className="form-check form-switch">
              <input
                type="checkbox"
                className="form-check-input"
                id="customSwitch2"
                // defaultChecked
                onClick={(e) => {
                  settoggleSwitch(!toggleSwitch);
                }}
              />
            </div>
            {/* <label className="form-check-label" htmlFor="customSwitch2">
              Smartcard Search
            </label> */}
          </div>

          <div className="form-check form-switch">
            <input
              type="checkbox"
              className="form-check-input"
              id="customSwitch2"
              // defaultChecked
              onClick={(e) => {
                settoggleSwitch(!toggleSwitch);
              }}
            />

            <label className="form-check-label" htmlFor="customSwitch2">
              View Only
            </label>
          </div>
        </div>
      </div>
      <Col
        lg={4}
        className="mt-3"
        style={{
          border: "1px solid #ced4da",
          // padding: "20px 0px",
          margin: "30px 0px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            borderBottom: "1px solid #ced4da",
          }}
        >
          <h5>Dashboard</h5>
          <div
            style={{
              display: "flex",
              gap: "20px",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <h6>Tabs: 1, Total: 19, Selected: 19</h6>

            <div className="form-check form-switch">
              <input
                type="checkbox"
                className="form-check-input"
                id="customSwitch2"
                // defaultChecked
                onClick={(e) => {
                  settoggleSwitch(!toggleSwitch);
                }}
              />
            </div>
          </div>
        </div>
        <Row>
          <Col lg={3} className=" mb-3">
            <div className="form-check form-switch">
              <input
                type="checkbox"
                className="form-check-input"
                id="customSwitch2"
                defaultChecked
                onClick={(e) => {
                  settoggleSwitch(!toggleSwitch);
                }}
              />
            </div>
            <label className="form-check-label" htmlFor="customSwitch2">
              Smartcard Search
            </label>
          </Col>
          <Col lg={3} className=" mb-3">
            <div className="form-check form-switch">
              <input
                type="checkbox"
                className="form-check-input"
                id="customSwitch2"
                defaultChecked
                onClick={(e) => {
                  settoggleSwitch(!toggleSwitch);
                }}
              />
            </div>
            <label className="form-check-label" htmlFor="customSwitch2">
              Connections
            </label>
          </Col>
          <Col lg={3} className=" mb-3">
            <div className="form-check form-switch">
              <input
                type="checkbox"
                className="form-check-input"
                id="customSwitch2"
                defaultChecked
                onClick={(e) => {
                  settoggleSwitch(!toggleSwitch);
                }}
              />
            </div>
            <label className="form-check-label" htmlFor="customSwitch2">
              Pending Commands
            </label>
          </Col>
          <Col lg={3} className=" mb-3">
            <div className="form-check form-switch">
              <input
                type="checkbox"
                className="form-check-input"
                id="customSwitch2"
                defaultChecked
                onClick={(e) => {
                  settoggleSwitch(!toggleSwitch);
                }}
              />
            </div>
            <label className="form-check-label" htmlFor="customSwitch2">
              Total Connections
            </label>
          </Col>
        </Row>
        <Row>
          <Col lg={3} className=" mb-3">
            <div className="form-check form-switch">
              <input
                type="checkbox"
                className="form-check-input"
                id="customSwitch2"
                defaultChecked
                onClick={(e) => {
                  settoggleSwitch(!toggleSwitch);
                }}
              />
            </div>
            <label className="form-check-label" htmlFor="customSwitch2">
              Logged In Users
            </label>
          </Col>
          <Col lg={3} className=" mb-3">
            <div className="form-check form-switch">
              <input
                type="checkbox"
                className="form-check-input"
                id="customSwitch2"
                defaultChecked
                onClick={(e) => {
                  settoggleSwitch(!toggleSwitch);
                }}
              />
            </div>
            <label className="form-check-label" htmlFor="customSwitch2">
              Balance
            </label>
          </Col>
          <Col lg={3} className=" mb-3">
            <div className="form-check form-switch">
              <input
                type="checkbox"
                className="form-check-input"
                id="customSwitch2"
                defaultChecked
                onClick={(e) => {
                  settoggleSwitch(!toggleSwitch);
                }}
              />
            </div>
            <label className="form-check-label" htmlFor="customSwitch2">
              Pay Online
            </label>
          </Col>
          <Col lg={3} className=" mb-3">
            <div className="form-check form-switch">
              <input
                type="checkbox"
                className="form-check-input"
                id="customSwitch2"
                defaultChecked
                onClick={(e) => {
                  settoggleSwitch(!toggleSwitch);
                }}
              />
            </div>
            <label className="form-check-label" htmlFor="customSwitch2">
              Inventory Details
            </label>
          </Col>
        </Row>
        <Row>
          <Col lg={3} className=" mb-3">
            <div className="form-check form-switch">
              <input
                type="checkbox"
                className="form-check-input"
                id="customSwitch2"
                defaultChecked
                onClick={(e) => {
                  settoggleSwitch(!toggleSwitch);
                }}
              />
            </div>
            <label className="form-check-label" htmlFor="customSwitch2">
              Complaints Status
            </label>
          </Col>
          <Col lg={3} className=" mb-3">
            <div className="form-check form-switch">
              <input
                type="checkbox"
                className="form-check-input"
                id="customSwitch2"
                defaultChecked
                onClick={(e) => {
                  settoggleSwitch(!toggleSwitch);
                }}
              />
            </div>
            <label className="form-check-label" htmlFor="customSwitch2">
              Subscriber Status Counts
            </label>
          </Col>
          <Col lg={3} className=" mb-3">
            <div className="form-check form-switch">
              <input
                type="checkbox"
                className="form-check-input"
                id="customSwitch2"
                defaultChecked
                onClick={(e) => {
                  settoggleSwitch(!toggleSwitch);
                }}
              />
            </div>
            <label className="form-check-label" htmlFor="customSwitch2">
              Bouquets expiring in 7 days
            </label>
          </Col>
          <Col lg={3} className=" mb-3">
            <div className="form-check form-switch">
              <input
                type="checkbox"
                className="form-check-input"
                id="customSwitch2"
                defaultChecked
                onClick={(e) => {
                  settoggleSwitch(!toggleSwitch);
                }}
              />
            </div>
            <label className="form-check-label" htmlFor="customSwitch2">
              User Monthly Collection
            </label>
          </Col>
        </Row>
        <Row>
          <Col lg={3} className=" mb-3">
            <div className="form-check form-switch">
              <input
                type="checkbox"
                className="form-check-input"
                id="customSwitch2"
                defaultChecked
                onClick={(e) => {
                  settoggleSwitch(!toggleSwitch);
                }}
              />
            </div>
            <label className="form-check-label" htmlFor="customSwitch2">
              LCO Subscriber Count
            </label>
          </Col>
          <Col lg={3} className=" mb-3">
            <div className="form-check form-switch">
              <input
                type="checkbox"
                className="form-check-input"
                id="customSwitch2"
                defaultChecked
                onClick={(e) => {
                  settoggleSwitch(!toggleSwitch);
                }}
              />
            </div>
            <label className="form-check-label" htmlFor="customSwitch2">
              LCO Auto Renew Count
            </label>
          </Col>
          <Col lg={3} className=" mb-3">
            <div className="form-check form-switch">
              <input
                type="checkbox"
                className="form-check-input"
                id="customSwitch2"
                defaultChecked
                onClick={(e) => {
                  settoggleSwitch(!toggleSwitch);
                }}
              />
            </div>
            <label className="form-check-label" htmlFor="customSwitch2">
              LCO Expiry Count
            </label>
          </Col>
          <Col lg={3} className=" mb-3">
            <div className="form-check form-switch">
              <input
                type="checkbox"
                className="form-check-input"
                id="customSwitch2"
                defaultChecked
                onClick={(e) => {
                  settoggleSwitch(!toggleSwitch);
                }}
              />
            </div>
            <label className="form-check-label" htmlFor="customSwitch2">
              Inventory Analysis
            </label>
          </Col>
        </Row>
        <Row>
          <Col lg={3} className=" mb-3">
            <div className="form-check form-switch">
              <input
                type="checkbox"
                className="form-check-input"
                id="customSwitch2"
                defaultChecked
                onClick={(e) => {
                  settoggleSwitch(!toggleSwitch);
                }}
              />
            </div>
            <label className="form-check-label" htmlFor="customSwitch2">
              CRM
            </label>
          </Col>
          <Col lg={3} className=" mb-3">
            <div className="form-check form-switch">
              <input
                type="checkbox"
                className="form-check-input"
                id="customSwitch2"
                defaultChecked
                onClick={(e) => {
                  settoggleSwitch(!toggleSwitch);
                }}
              />
            </div>
            <label className="form-check-label" htmlFor="customSwitch2">
              Subscriber Daily Collection
            </label>
          </Col>
          <Col lg={3} className=" mb-3">
            <div className="form-check form-switch">
              <input
                type="checkbox"
                className="form-check-input"
                id="customSwitch2"
                defaultChecked
                onClick={(e) => {
                  settoggleSwitch(!toggleSwitch);
                }}
              />
            </div>
            <label className="form-check-label" htmlFor="customSwitch2">
              Recent Payments
            </label>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default DashboardPolicy;
