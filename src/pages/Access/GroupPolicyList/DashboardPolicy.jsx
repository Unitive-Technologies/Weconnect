import React from "react";
import { Col, Row } from "reactstrap";
import { useState } from "react";

const DashboardPolicy = () => {
  const [toggleSwitch, settoggleSwitch] = useState(true);
  return (
    <Row>
      <Col lg={6}>
        <Row>
          <Col lg={3}>
            <div
              className="form-check form-switch mb-3"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "left",
                justifyContent: "left",
                margin: 0,
                padding: 0,
              }}
            >
              <input
                type="checkbox"
                className="form-check-input"
                id="customSwitch2"
                defaultChecked
                onClick={(e) => {
                  settoggleSwitch(!toggleSwitch);
                }}
              />
              <label className="form-check-label" htmlFor="customSwitch2">
                Smartcard Search
              </label>
            </div>
          </Col>
          <Col lg={3}>
            <div className="form-check form-switch mb-3">
              <input
                type="checkbox"
                className="form-check-input"
                id="customSwitch2"
                defaultChecked
                onClick={(e) => {
                  settoggleSwitch(!toggleSwitch);
                }}
              />
              <label className="form-check-label" htmlFor="customSwitch2">
                Connections
              </label>
            </div>
          </Col>
          <Col lg={3}>
            <div className="form-check form-switch mb-3">
              <input
                type="checkbox"
                className="form-check-input"
                id="customSwitch2"
                defaultChecked
                onClick={(e) => {
                  settoggleSwitch(!toggleSwitch);
                }}
              />
              <label className="form-check-label" htmlFor="customSwitch2">
                Pending Commands
              </label>
            </div>
          </Col>
          <Col lg={3}>
            <div className="form-check form-switch mb-3">
              <input
                type="checkbox"
                className="form-check-input"
                id="customSwitch2"
                defaultChecked
                onClick={(e) => {
                  settoggleSwitch(!toggleSwitch);
                }}
              />
              <label className="form-check-label" htmlFor="customSwitch2">
                Total Connections
              </label>
            </div>
          </Col>
        </Row>
        <Row>
          <Col lg={3}>
            <div className="form-check form-switch mb-3">
              <input
                type="checkbox"
                className="form-check-input"
                id="customSwitch2"
                defaultChecked
                onClick={(e) => {
                  settoggleSwitch(!toggleSwitch);
                }}
              />
              <label className="form-check-label" htmlFor="customSwitch2">
                Logged In Users
              </label>
            </div>
          </Col>
          <Col lg={3}>
            <div className="form-check form-switch mb-3">
              <input
                type="checkbox"
                className="form-check-input"
                id="customSwitch2"
                defaultChecked
                onClick={(e) => {
                  settoggleSwitch(!toggleSwitch);
                }}
              />
              <label className="form-check-label" htmlFor="customSwitch2">
                Balance
              </label>
            </div>
          </Col>
          <Col lg={3}>
            <div className="form-check form-switch mb-3">
              <input
                type="checkbox"
                className="form-check-input"
                id="customSwitch2"
                defaultChecked
                onClick={(e) => {
                  settoggleSwitch(!toggleSwitch);
                }}
              />
              <label className="form-check-label" htmlFor="customSwitch2">
                Pay Online
              </label>
            </div>
          </Col>
          <Col lg={3}>
            <div className="form-check form-switch mb-3">
              <input
                type="checkbox"
                className="form-check-input"
                id="customSwitch2"
                defaultChecked
                onClick={(e) => {
                  settoggleSwitch(!toggleSwitch);
                }}
              />
              <label className="form-check-label" htmlFor="customSwitch2">
                Inventory Details
              </label>
            </div>
          </Col>
        </Row>
        <Row>
          <Col lg={3}>
            <div className="form-check form-switch mb-3">
              <input
                type="checkbox"
                className="form-check-input"
                id="customSwitch2"
                defaultChecked
                onClick={(e) => {
                  settoggleSwitch(!toggleSwitch);
                }}
              />
              <label className="form-check-label" htmlFor="customSwitch2">
                Complaints Status
              </label>
            </div>
          </Col>
          <Col lg={3}>
            <div className="form-check form-switch mb-3">
              <input
                type="checkbox"
                className="form-check-input"
                id="customSwitch2"
                defaultChecked
                onClick={(e) => {
                  settoggleSwitch(!toggleSwitch);
                }}
              />
              <label className="form-check-label" htmlFor="customSwitch2">
                Subscriber Status Counts
              </label>
            </div>
          </Col>
          <Col lg={3}>
            <div className="form-check form-switch mb-3">
              <input
                type="checkbox"
                className="form-check-input"
                id="customSwitch2"
                defaultChecked
                onClick={(e) => {
                  settoggleSwitch(!toggleSwitch);
                }}
              />
              <label className="form-check-label" htmlFor="customSwitch2">
                Bouquets expiring in 7 days
              </label>
            </div>
          </Col>
          <Col lg={3}>
            <div className="form-check form-switch mb-3">
              <input
                type="checkbox"
                className="form-check-input"
                id="customSwitch2"
                defaultChecked
                onClick={(e) => {
                  settoggleSwitch(!toggleSwitch);
                }}
              />
              <label className="form-check-label" htmlFor="customSwitch2">
                User Monthly Collection
              </label>
            </div>
          </Col>
        </Row>
        <Row>
          <Col lg={3}>
            <div className="form-check form-switch mb-3">
              <input
                type="checkbox"
                className="form-check-input"
                id="customSwitch2"
                defaultChecked
                onClick={(e) => {
                  settoggleSwitch(!toggleSwitch);
                }}
              />
              <label className="form-check-label" htmlFor="customSwitch2">
                LCO Subscriber Count
              </label>
            </div>
          </Col>
          <Col lg={3}>
            <div className="form-check form-switch mb-3">
              <input
                type="checkbox"
                className="form-check-input"
                id="customSwitch2"
                defaultChecked
                onClick={(e) => {
                  settoggleSwitch(!toggleSwitch);
                }}
              />
              <label className="form-check-label" htmlFor="customSwitch2">
                LCO Auto Renew Count
              </label>
            </div>
          </Col>
          <Col lg={3}>
            <div className="form-check form-switch mb-3">
              <input
                type="checkbox"
                className="form-check-input"
                id="customSwitch2"
                defaultChecked
                onClick={(e) => {
                  settoggleSwitch(!toggleSwitch);
                }}
              />
              <label className="form-check-label" htmlFor="customSwitch2">
                LCO Expiry Count
              </label>
            </div>
          </Col>
          <Col lg={3}>
            <div className="form-check form-switch mb-3">
              <input
                type="checkbox"
                className="form-check-input"
                id="customSwitch2"
                defaultChecked
                onClick={(e) => {
                  settoggleSwitch(!toggleSwitch);
                }}
              />
              <label className="form-check-label" htmlFor="customSwitch2">
                Inventory Analysis
              </label>
            </div>
          </Col>
        </Row>
        <Row>
          <Col lg={3}>
            <div className="form-check form-switch mb-3">
              <input
                type="checkbox"
                className="form-check-input"
                id="customSwitch2"
                defaultChecked
                onClick={(e) => {
                  settoggleSwitch(!toggleSwitch);
                }}
              />
              <label className="form-check-label" htmlFor="customSwitch2">
                CRM
              </label>
            </div>
          </Col>
          <Col lg={3}>
            <div className="form-check form-switch mb-3">
              <input
                type="checkbox"
                className="form-check-input"
                id="customSwitch2"
                defaultChecked
                onClick={(e) => {
                  settoggleSwitch(!toggleSwitch);
                }}
              />
              <label className="form-check-label" htmlFor="customSwitch2">
                Subscriber Daily Collection
              </label>
            </div>
          </Col>
          <Col lg={3}>
            <div className="form-check form-switch mb-3">
              <input
                type="checkbox"
                className="form-check-input"
                id="customSwitch2"
                defaultChecked
                onClick={(e) => {
                  settoggleSwitch(!toggleSwitch);
                }}
              />
              <label className="form-check-label" htmlFor="customSwitch2">
                Recent Payments
              </label>
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default DashboardPolicy;
