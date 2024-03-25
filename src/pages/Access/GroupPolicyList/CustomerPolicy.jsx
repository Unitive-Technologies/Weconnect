import React from "react";
import { Col, Row } from "reactstrap";
import { useState } from "react";

const CustomerPolicy = () => {
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
        <h4>CUSTOMER</h4>
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
            <h5>Subscriber</h5>
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
                View
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
                Edit
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
                Create
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
                Change LCO
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
                Ticket
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
                History
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
                Upload
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
                Bulk Update
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
                Download CAF
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
            <h5>Digital Connection</h5>
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
                Digital Connection
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
                Activate
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
                Deactivate
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
                Add More Connection
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
                View Bouquet
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
                Remove Bouquet
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
                Add Bouquet
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
                Renew Bouquet
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
                Terminate
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
                Modify
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
                Release
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
                Mark Faulty
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
                Blacklist
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
                Suspend
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
                Resume
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
                Refresh
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
                Send Activate Card
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
                Send Entitlement
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
                Send Bouquet Entitlement
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
                Reset PIN
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
                Reboot STB
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
                Re-Add Card
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
                Re-Pair Card
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
                Delete Pairing
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
                Hard Refresh
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
                Terminated Account Refresh
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
                Command Logs
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
                Account History
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
                Add Collection
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
                Extend Days
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
                Set-Unset Auto Renewal
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
                Change AreaId Command
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
                Stock Re-Add Card
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
                Stock Re-Deactivate Card
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
            <h5>Bulk Operations</h5>
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
                Bulk Account Renewal
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
                Bulk Bouquet Renewal
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
                Bulk Bouquet Assignment
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
                Upload Bulk Bouquet Assignment
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
                Bulk Base Bouquet Removal
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
                Bulk Addon Bouquet Replacement
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
                Bulk Bouquet Replacement
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
                Bulk Suspend
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
                Bulk Resume
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
                Bulk Deactivate
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
                Bulk Activate
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
                Bulk Terminate
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
                Bulk Refresh
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
                Bulk Terminated Refresh
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
                Subscriber Shifting
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
                Upload Subscriber Shifting
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
                Set Auto Renewal
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
                Un-Set Auto Renewal
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
                STB Replacement
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
                Scheduled Jobs Logs
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
                Select All
              </label>
            </Col>
          </Row>
        </Col>
      </Row>
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
            <h5>Subscriber Uploads</h5>
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
                View
              </label>
            </Col>
          </Row>
        </Col>
      </Row>
    </Row>
  );
};

export default CustomerPolicy;
