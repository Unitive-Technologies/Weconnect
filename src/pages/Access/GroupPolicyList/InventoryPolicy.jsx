import React from "react";
import { Col, Row } from "reactstrap";
import { useState } from "react";

const InventoryPolicy = () => {
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
        <h4>INVENTORY</h4>
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
            <h5>Stock Smartcard</h5>
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
            <h5>Stock STB</h5>
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
            <h5>Stock Pairing</h5>
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
                Upload
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
                Upload Material Status
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
                Delete Pairing
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
            <h5>Faulty Smartcard</h5>
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
            <h5>Faulty STB</h5>
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
            <h5>Faulty Pairing</h5>
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
                Send to Stock
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
                Blacklist
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
            <h5>Blacklist Smartcard</h5>
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
            <h5>Blacklist STB</h5>
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
            <h5>Blacklist Pairing</h5>
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
            <h5>Allot Pairing</h5>
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
            <h5>Track Pairing</h5>
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
            <h5>Inventory Uploads</h5>
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

export default InventoryPolicy;
