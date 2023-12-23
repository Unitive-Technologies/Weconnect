import React, { useState } from "react";
import PropTypes from "prop-types";
import { Col, Row, Modal, ModalHeader, ModalBody, Form } from "reactstrap";
import OperatorList from "../BouquetList/OperatorList";
import SchemesList from "./SchemesList";

const BulkAssign = (props) => {
  const { isOpen, toggle } = props;

  return (
    <Modal
      isOpen={isOpen}
      role="dialog"
      autoFocus={true}
      centered={true}
      className="exampleModal"
      tabIndex="-1"
      toggle={toggle}
      size="xl"
    >
      <ModalHeader toggle={toggle} tag="h4">
        Bulk Assign Connection Scheme
      </ModalHeader>
      <ModalBody>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            validation.handleSubmit();
            return false;
          }}
        >
          <Row>
            <div
              style={{
                // margin: "20px 0px",
                marginTop: "20px",
                // marginBottom: "18px",
                zIndex: 12000,
                backgroundColor: "#fff",
                width: "fit-content",
                marginLeft: "40%",
                position: "absolute",
                padding: "0px 10px",
              }}
            >
              <p style={{ fontWeight: "bold" }}>
                Operators<span style={{ color: "red" }}>*</span>
              </p>
            </div>
            <Row
              style={{
                // border: "1px solid #ced4da",
                padding: "20px 0px",
                margin: "20px 0px",
              }}
            >
              <OperatorList />
            </Row>
          </Row>
          <Row>
            <h6
              style={{
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              Schemes<span style={{ color: "red" }}>*</span>
            </h6>
            <p>
              ** To select row, click <i className="mdi mdi-check"></i>{" "}
            </p>
            <SchemesList />
          </Row>
          <Row>
            <Col sm="12">
              <div className="d-flex flex-wrap gap-2">
                <button type="submit" className="btn btn-success save-user">
                  Assign
                </button>
                <button
                  type="button"
                  className="btn btn-outline-danger"
                  onClick={() => {
                    validation.resetForm();
                    toggle();
                  }}
                >
                  Cancel
                </button>
              </div>
            </Col>
          </Row>
        </Form>
      </ModalBody>
      {/* </Modal> */}
    </Modal>
  );
};

BulkAssign.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default BulkAssign;
