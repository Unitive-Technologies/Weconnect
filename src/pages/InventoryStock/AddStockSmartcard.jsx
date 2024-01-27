import React from "react";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import {
  Col,
  Form,
  FormFeedback,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";
import * as Yup from "yup";

function AddStockSmartcard(props) {
  const {
    stocksccastype,
    stockscwarehouse,
    stockscstatetype,
    stockscinventorystate,
    isOpen,
    toggle,
    brand1,
    brand2,
  } = props;

  const dispatch = useDispatch();

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      brand_id: "",
      description: "",
      inv_state_id: "",
      invoice_date: "",
      invoice_no: "",
      is_embeded: "",
      po_date: "",
      po_number: "",
      smartcardno: "",
      state: "",
      warehouse_id: "",
      cas_id: "",
      stbbrand_id: "",
      stbno: "",
      po_id: "",
    },
    validationSchema: Yup.object({}),
    onSubmit: (values) => {
      const newSmartcard = {
        id: Math.floor(Math.random() * (30 - 20)) + 20,
      };
      console.log("New smartcard: " + JSON.stringify(newSmartcard));
      // dispatch(onAddCity(newSmartcard));
      // dispatch(onGetCity());
      validation.resetForm();
      toggle();
    },
    onReset: (values) => {
      validation.setValues(validation.initialValues);
    },
  });

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
        Add New Smartcard
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
            <Col lg={4}>
              <div className="mb-3">
                <Label className="form-label">
                  CAS Type<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="cas_id"
                  type="select"
                  placeholder="Select CAS Type"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.cas_id || ""}
                  invalid={
                    validation.touched.cas_id && validation.errors.cas_id
                      ? true
                      : false
                  }
                >
                  {stocksccastype.map((castype) => (
                    <option key={castype.id} value={castype.id}>
                      {castype.name}
                    </option>
                  ))}
                </Input>
                {validation.touched.cas_id && validation.errors.cas_id ? (
                  <FormFeedback type="invalid">
                    {validation.errors.cas_id}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
            <Col lg={4}>
              <div className="mb-3">
                <Label className="form-label">
                  Is Embedded<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="is_embeded"
                  type="checkbox"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.is_embeded || ""}
                  invalid={
                    validation.touched.is_embeded &&
                    validation.errors.is_embeded
                      ? true
                      : false
                  }
                />
                {validation.touched.is_embeded &&
                validation.errors.is_embeded ? (
                  <FormFeedback type="invalid">
                    {validation.errors.is_embeded}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
            <Col lg={4}>
              <div className="mb-3">
                <Label className="form-label">
                  Smartcard Band<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="brand_id"
                  type="select"
                  placeholder="Select state"
                  className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.brand_id || ""}
                >
                  <option value="">Select smartcard brand</option>
                  {brand1.map((options) => (
                    <option key={options.id} value={options.id}>
                      {options.name}
                    </option>
                  ))}
                </Input>
                {validation.touched.brand_id && validation.errors.brand_id ? (
                  <FormFeedback type="invalid">
                    {validation.errors.brand_id}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <ModalFooter>
                <button type="submit" className="btn btn-success save-user">
                  Save
                </button>
                <button
                  type="reset"
                  className="btn btn-warning"
                  onClick={() => validation.resetForm()}
                >
                  Reset
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
              </ModalFooter>
            </Col>
          </Row>
        </Form>
      </ModalBody>
    </Modal>
  );
}

// AddStockSmartcard.propTypes = {
//   toggle: PropTypes.func,
//   isOpen: PropTypes.bool,
//   stocksccastype: PropTypes.array,
//   stockscwarehouse: PropTypes.array,
//   stockscstatetype: PropTypes.array,
//   stockscinventorystate: PropTypes.array,
// };

export default AddStockSmartcard;

// "data": {
//   "id": 323341,
//   "smartcardno": "a123453456780898",
//   "is_embeded": 1,
//   "brand_id": 2,
//   "cas_id": 1,
//   "po_id": 46,
//   "meta_data": [],
//   "status": 1,
//   "stb_id": 323336,
//   "warehouse_id": 4,
//   "state": 2,
//   "account_id": null,
//   "created_at": "2024-01-27 12:57:54",
//   "updated_at": "2024-01-27 12:57:54",
//   "created_by": 2,
//   "updated_by": 2,
//   "scheme_id": null,
//   "scheme_name": null,
//   "other_id": null,
//   "locked_at": null,
//   "locked_token": null
// }
