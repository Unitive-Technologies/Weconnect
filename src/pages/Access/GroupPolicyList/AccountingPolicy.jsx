import React from "react";
import { Col, Row } from "reactstrap";
import { useState } from "react";

const AccountingPolicy = () => {
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
        <h4>ACCOUNTING</h4>
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
      <Row>
        <Col
          lg={4}
          className="mt-3"
          style={{
            border: "1px solid #ced4da",
            // padding: "20px 0px",
            // margin: "30px 0px",
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
            <h5>Billing & Accounting</h5>
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
                LCO Credit
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
                LCO Top-Up
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
                LCO Effective Collection
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
                LCO Balance
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
                LCO Online Recharge
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
                Online Payment Reconcile
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
                Set Off
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
                LCO Ledger
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
                LCO Ledger Print
              </label>
            </Col>
          </Row>
        </Col>
        <Col
          lg={4}
          className="mt-3"
          style={{
            border: "1px solid #ced4da",
            // padding: "20px 0px",
            // margin: "30px 0px",
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
            <h5>Customer</h5>
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
                Customer Ledger
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
                Customer Transaction Detail
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
                Customer Payment
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
                Advance Renewals
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
                Monthly Bill Statement
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
                Customer Billing
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
                Customer Collection
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
                Upload Customer Collection
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
                Collection Report
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
                Customer Discount
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
                Discount Report
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
                Recurring Discount Report
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
                Customer Additional Charges
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
                Additional Charges Report
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
                Recurring Additional Charges Report
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
                Customer Previous Dues
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
                Upload Customer Previous Dues
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
                Previous Dues Report
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
                Customer Bad Debt
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
                Collection Bad Debt Report
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
                Payment Deposit List
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
                Payment Deposit
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
                Payment Cancel
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
                Payment Reconcile List
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
                Payment Reconcile
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
                Payment Un-Reconcile List
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
                Payment Un-Reconcile
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
                Reconciliation Report
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
                Online Payment Reconcile
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
                Customer Renewal Report
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
                Customer Outstanding Report
              </label>
            </Col>
          </Row>
        </Col>
      </Row>
    </Row>
  );
};

export default AccountingPolicy;
