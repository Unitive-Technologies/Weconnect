import React, { useState } from "react";
import PropTypes from "prop-types";
import { Col, Row, Modal, ModalHeader, ModalBody, Form } from "reactstrap";
import AddMultipleNcf from "./AddMultipleNcf";
import Operators from "./Operators";

const BulkRemovalFromOperator = (props) => {
  const { isOpen, toggle, ncf, selectedRow } = props;

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
        Bulk Removal NCF
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
            <Operators id={selectedRow.id} />
          </Row>
          <Row>
            <div
              style={{
                marginTop: "20px",
                zIndex: 12000,
                backgroundColor: "#fff",
                width: "fit-content",
                marginLeft: "40%",
                position: "absolute",
                padding: "0px 10px",
              }}
            >
              <p style={{ fontWeight: "bold" }}>Default NCF</p>
            </div>
            <Row
              style={{
                padding: "20px 0px",
                margin: "20px 0px",
              }}
            >
              <AddMultipleNcf />
            </Row>
          </Row>
          <Row>
            <Col sm="12">
              <div className="d-flex flex-wrap gap-2">
                <button type="submit" className="btn btn-success save-user">
                  Remove
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
    </Modal>
  );
};

BulkRemovalFromOperator.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default BulkRemovalFromOperator;
