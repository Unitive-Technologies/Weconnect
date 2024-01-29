import React from "react";
import PropTypes from "prop-types";
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
import {
  addInventoryStockStb as onAddInventoryStockStb,
  getInventoryStockStb as onGetInventoryStockStb,
} from "/src/store/inventorystock/actions";

const AddStockStb = (props) => {
  const {
    isOpen,
    toggle,
    stocksccastype,
    stockscwarehouse,
    stockscstatetype,
    stockscinventorystate,
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
      is_embeded: false,
      po_date: "",
      po_number: "",
      smartcardno: "",
      state: "",
      warehouse_id: "",
      cas_id: "",
      stbbrand_id: "",
      stbno: "",
      po_id: "",
      cas_id: "",
    },
    validationSchema: Yup.object({
      cas_id: Yup.string().required("Select CAS Type"),
      is_embeded: Yup.boolean(),
      brand_id: Yup.string().test(
        "isRequired",
        "Select smartcard brand",
        function (value) {
          const { is_embeded } = this.parent;
          return is_embeded ? !!value : true;
        }
      ),
      smartcardno: Yup.string().test(
        "isRequired",
        "Enter smartcard no.",
        function (value) {
          const { is_embeded } = this.parent;
          return is_embeded ? !!value : true;
        }
      ),
      // brand_id: Yup.string().required("Select smartcard brand"),
      // smartcardno: Yup.string().required("Enter smartcard no."),
      stbbrand_id: Yup.string().required("Select stb brand"),
      stbno: Yup.string().required("Enter STB no."),
      po_number: Yup.string().required("Enter purchase order"),
      po_date: Yup.string().required("Select purchase date"),
      invoice_no: Yup.string().required("Enter invoice order"),
      invoice_date: Yup.string().required("Select invoice date"),
      warehouse_id: Yup.string().required("Select warehouse"),
      state: Yup.string().required("Select Stock Type"),
      description: Yup.string().required("description"),
      inv_state_id: Yup.string().required("Select inentory state"),
    }),
    onSubmit: (values) => {
      const newStb = {
        id: Math.floor(Math.random() * (30 - 20)) + 20,
        cas_id: values["cas_id"],
        is_embeded: values["is_embeded"],
        brand_id: values["brand_id"],
        smartcardno: values["smartcardno"],
        stbbrand_id: values["stbbrand_id"],
        stbno: values["stbno"],
        po_number: values["po_number"],
        po_date: values["po_date"],
        invoice_no: values["invoice_no"],
        invoice_date: values["invoice_date"],
        warehouse_id: values["warehouse_id"],
        state: values["state"],
        description: values["description"],
        inv_state_id: values["inv_state_id"],
      };
      console.log("New stb: " + JSON.stringify(newStb));
      dispatch(onAddInventoryStockStb(newStb));
      dispatch(onGetInventoryStockStb());
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
        Add New STB
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
                  <option value="">Select CAS Type</option>
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
              <div>
                <Label className="form-label">Is Embedded</Label>
              </div>
              <div>
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
              </div>
            </Col>
          </Row>
          <Row>
            <Col lg={4}>
              <div className="mb-3">
                <Label className="form-label">
                  STB Band<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="stbbrand_id"
                  type="select"
                  placeholder="Select state"
                  className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.stbbrand_id || ""}
                  invalid={
                    validation.touched.stbbrand_id &&
                    validation.errors.stbbrand_id
                      ? true
                      : false
                  }
                >
                  <option value="">Select stb brand</option>
                  {brand1.map((options) => (
                    <option key={options.id} value={options.id}>
                      {options.name}
                    </option>
                  ))}
                </Input>
                {validation.touched.stbbrand_id &&
                validation.errors.stbbrand_id ? (
                  <FormFeedback type="invalid">
                    {validation.errors.stbbrand_id}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
            <Col lg={4}>
              <div className="mb-3">
                <Label className="form-label">
                  STB No<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="stbno"
                  type="text"
                  placeholder="Enter STB no."
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.stbno || ""}
                  disabled={validation.values.stbbrand_id === "" ? true : false}
                  invalid={
                    validation.touched.stbno && validation.errors.stbno
                      ? true
                      : false
                  }
                />
                {validation.touched.stbno && validation.errors.stbno ? (
                  <FormFeedback type="invalid">
                    {validation.errors.stbno}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
          </Row>
          {validation.values.is_embeded ? (
            <Row>
              <Col lg={4}>
                <div className="mb-3">
                  <Label className="form-label">
                    Smartcard Band<span style={{ color: "red" }}>*</span>
                  </Label>
                  <Input
                    name="brand_id"
                    type="select"
                    placeholder="Select smartcard brand"
                    className="form-select"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.brand_id || ""}
                    invalid={
                      validation.touched.brand_id && validation.errors.brand_id
                        ? true
                        : false
                    }
                  >
                    <option value="">Select smartcard brand</option>
                    {brand2.map((options) => (
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
              <Col lg={4}>
                <div className="mb-3">
                  <Label className="form-label">
                    Smartcard No<span style={{ color: "red" }}>*</span>
                  </Label>
                  <Input
                    name="smartcardno"
                    type="text"
                    placeholder="Enter Smartcard no."
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.smartcardno || ""}
                    disabled={validation.values.brand_id === "" ? true : false}
                    invalid={
                      validation.touched.smartcardno_id &&
                      validation.errors.smartcardno_id
                        ? true
                        : false
                    }
                  />
                  {validation.touched.smartcardno &&
                  validation.errors.smartcardno ? (
                    <FormFeedback type="invalid">
                      {validation.errors.smartcardno}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
            </Row>
          ) : null}
          <Row>
            <Col lg={4}>
              <div className="mb-3">
                <Label className="form-label">
                  Purchase Order<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="po_number"
                  type="text"
                  placeholder="Enter Purchase Order"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.po_number || ""}
                  invalid={
                    validation.touched.po_number && validation.errors.po_number
                      ? true
                      : false
                  }
                />
                {validation.touched.po_number && validation.errors.po_number ? (
                  <FormFeedback type="invalid">
                    {validation.errors.po_number}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
            <Col lg={4}>
              <div className="mb-3">
                <Label className="form-label">
                  PO Date<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="po_date"
                  type="Date"
                  placeholder="Select purchase date"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.po_date || ""}
                  invalid={
                    validation.touched.po_date && validation.errors.po_date
                      ? true
                      : false
                  }
                />
                {validation.touched.po_date && validation.errors.po_date ? (
                  <FormFeedback type="invalid">
                    {validation.errors.po_date}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
          </Row>
          <Row>
            <Col lg={4}>
              <div className="mb-3">
                <Label className="form-label">
                  Invoice Order<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="invoice_no"
                  type="text"
                  placeholder="Enter invoice Order"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.invoice_no || ""}
                  invalid={
                    validation.touched.invoice_no &&
                    validation.errors.invoice_no
                      ? true
                      : false
                  }
                />
                {validation.touched.invoice_no &&
                validation.errors.invoice_no ? (
                  <FormFeedback type="invalid">
                    {validation.errors.invoice_no}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
            <Col lg={4}>
              <div className="mb-3">
                <Label className="form-label">
                  Invoice Date<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="invoice_date"
                  type="Date"
                  placeholder="Select invoice date"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.invoice_date || ""}
                  invalid={
                    validation.touched.invoice_date &&
                    validation.errors.invoice_date
                      ? true
                      : false
                  }
                />
                {validation.touched.invoice_date &&
                validation.errors.invoice_date ? (
                  <FormFeedback type="invalid">
                    {validation.errors.invoice_date}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
          </Row>
          <Row>
            <Col lg={4}>
              <div className="mb-3">
                <Label className="form-label">
                  Warehouse<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="warehouse_id"
                  type="select"
                  placeholder="Select warehouse"
                  className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.warehouse_id || ""}
                  invalid={
                    validation.touched.warehouse_id &&
                    validation.errors.warehouse_id
                      ? true
                      : false
                  }
                >
                  <option value="">Select warehouse</option>
                  {stockscwarehouse.map((options) => (
                    <option key={options.id} value={options.id}>
                      {options.name}
                    </option>
                  ))}
                </Input>
                {validation.touched.warehouse_id &&
                validation.errors.warehouse_id ? (
                  <FormFeedback type="invalid">
                    {validation.errors.warehouse_id}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
            <Col lg={4}>
              <div className="mb-3">
                <Label className="form-label">
                  Stock type<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="inv_state_id"
                  type="select"
                  placeholder="Select Stock Type"
                  className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.inv_state_id || ""}
                  invalid={
                    validation.touched.inv_state_id &&
                    validation.errors.inv_state_id
                      ? true
                      : false
                  }
                >
                  <option value="">Select Stock Type</option>
                  {stockscstatetype.map((options) => (
                    <option key={options.id} value={options.id}>
                      {options.name}
                    </option>
                  ))}
                </Input>
                {validation.touched.inv_state_id &&
                validation.errors.inv_state_id ? (
                  <FormFeedback type="invalid">
                    {validation.errors.inv_state_id}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
          </Row>
          <Row>
            <Col lg={4}>
              <div className="mb-3">
                <Label className="form-label">
                  Description<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="description"
                  type="textarea"
                  placeholder="Enter description"
                  rows="3"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.description || ""}
                  invalid={
                    validation.touched.description &&
                    validation.errors.description
                      ? true
                      : false
                  }
                />
                {validation.touched.description &&
                validation.errors.description ? (
                  <FormFeedback type="invalid">
                    {validation.errors.description}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
          </Row>
          <Row>
            <Col lg={4}>
              <div className="mb-3">
                <Label className="form-label">
                  Inentory state<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="state"
                  type="select"
                  placeholder="Select inventory state"
                  className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.state || ""}
                  invalid={
                    validation.touched.state && validation.errors.state
                      ? true
                      : false
                  }
                >
                  <option value="">Select inventory state</option>
                  {stockscinventorystate.map((options) => (
                    <option key={options.id} value={options.id}>
                      {options.name}
                    </option>
                  ))}
                </Input>
                {validation.touched.state && validation.errors.state ? (
                  <FormFeedback type="invalid">
                    {validation.errors.state}
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
};

AddStockStb.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
  stocksccastype: PropTypes.array,
  stockscwarehouse: PropTypes.array,
  stockscstatetype: PropTypes.array,
  stockscinventorystate: PropTypes.array,
  brand1: PropTypes.array,
  brand2: PropTypes.array,
};

export default AddStockStb;
