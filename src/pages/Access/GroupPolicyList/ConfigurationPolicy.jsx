import React from "react";
import { Col, Row } from "reactstrap";
import { useState } from "react";

const ConfigurationPolicy = () => {
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
        <h4>CONFIGURATION</h4>
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
            <h5>User</h5>
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
                History
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
            <h5>Customer User</h5>
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
                History
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
            <h5>Group Policy</h5>
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
            <h5>LCO</h5>
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
                History
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
            <h5>Location</h5>
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
                History
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
            <h5>Sub Location</h5>
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
                History
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
            <h5>Osd Configuration</h5>
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
            <h5>OSD Template</h5>
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
            <h5>Promo Voucher</h5>
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
      <Row>
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
            <h5>NCF</h5>
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
                History
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
            <h5>Configuration Uploads</h5>
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

export default ConfigurationPolicy;
