import React from "react";
import {
  Col,
  Form,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from "reactstrap";
import PropTypes from "prop-types";

function CreatePairing(props) {
  const { isOpen, toggle, smartcardlist, stblist, stocksccastype } = props;
  return (
    <Modal
      isOpen={isOpen}
      role="dialog"
      size="xl"
      autoFocus={true}
      centered={true}
      className="exampleModal"
      tabIndex="-1"
      toggle={toggle}
    >
      <ModalHeader tag="h4" toggle={toggle}>
        Create New Pairing
      </ModalHeader>
      <ModalBody>
        <Form>
          <Row>
            <Col lg={4}>
              <div className="mb-3">
                <Label className="form-label">
                  CAS Type<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="cas_id"
                  type="select"
                  placeholder="Select CAS Type"
                  //   onChange={validation.handleChange}
                  //   onBlur={validation.handleBlur}
                  //   value={validation.values.cas_id || ""}
                  //   invalid={
                  //     validation.touched.cas_id && validation.errors.cas_id
                  //       ? true
                  //       : false
                  //   }
                >
                  <option value="">Select CAS Type</option>
                  {stocksccastype.map((castype) => (
                    <option key={castype.id} value={castype.id}>
                      {castype.name}
                    </option>
                  ))}
                </Input>
                {/* {validation.touched.cas_id && validation.errors.cas_id ? (
                  <FormFeedback type="invalid">
                    {validation.errors.cas_id}
                  </FormFeedback>
                ) : null} */}
              </div>
            </Col>
          </Row>
        </Form>
      </ModalBody>
    </Modal>
  );
}

CreatePairing.propTypes = {
  smartcardlist: PropTypes.array,
  stblist: PropTypes.array,
  isOpen: PropTypes.bool,
  toggle: PropTypes.func,
  stocksccastype: PropTypes.array,
};

export default CreatePairing;
