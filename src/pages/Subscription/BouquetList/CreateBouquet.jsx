import React from "react";
import PropTypes from "prop-types";
import {
  Col,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
  FormFeedback,
  Input,
  Form,
  ModalFooter,
  Button,
} from "reactstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import { addBouquet as onAddBouquet } from "/src/store/bouquetlist/actions";
import { useDispatch } from "react-redux";
import AddAlacarte from "./AddAlacarte";
import AddPackages from "./AddPackages";
import Count from "./Count";
import PreviewTable from "./PreviewTable";
import AdditionalMRP from "./AdditionalMRP";
import AddBrands from "./AddBrands";

const CreateBouquet = (props) => {
  const {
    isOpen,
    toggle,
    alacartechannals,
    bouquetboxtype,
    bouquetpackages,
    bouquettaxlist,
    bouquettype,
    bouquex,
    rechargeperiod,
  } = props;
  const dispatch = useDispatch();

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      code: "",
      name: "",
      type_lbl: "",
      boxtype_lbl: "",
      type: "",
      status: "",
      description: "",
      is_promotional: "",
      ifFixNCF: "",
      max_ncf_channels: "",
      showon_portal: "",
      category_lbl: "",
      created_by: "Admin",
    },
    validationSchema: Yup.object({
      code: Yup.string().required("Enter Channel Code"),
      name: Yup.string().required("Enter channel name"),
      type_lbl: Yup.string().required("Enter bouquet type"),
      boxtype_lbl: Yup.string().required("Enter box type"),
      type: Yup.string().required("Enter channel type"),
      status: Yup.string().required("Enter status"),
      description: Yup.string().required("Enter description"),
      is_promotional: Yup.string(),
      ifFixNCF: Yup.string(),
      max_ncf_channels: Yup.string(),
      showon_portal: Yup.string(),
      category_lbl: Yup.string(),
    }),
    onSubmit: (values) => {
      const newbouquet = {
        id: Math.floor(Math.random() * (30 - 20)) + 20,
        code: values["code"],
        name: values["name"],
        type_lbl: values["type_lbl"],
        boxtype_lbl: values["boxtype_lbl"],
        type: values["type"],
        status: values["status"],
        description: values["description"],
        is_promotional: values["is_promotional"],
        ifFixNCF: values["ifFixNCF"],
        max_ncf_channels: values["max_ncf_channels"],
        created_at: new Date(),
        created_by: values["created_by"],
        showon_portal: values["showon_portal"],
        category_lbl: values["category_lbl"],
      };
      console.log("New Bouquet List:" + newbouquet);
      dispatch(onAddBouquet(newbouquet));
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
      autoFocus={true}
      centered={true}
      className="exampleModal"
      tabIndex="-1"
      toggle={toggle}
      size="xl"
    >
      <ModalHeader tag="h4" toggle={toggle}>
        Add New Bouquet
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
            <Col sm="4">
              <div className="mb-3">
                <Label className="form-label">Code</Label>
                <Input
                  name="code"
                  type="text"
                  placeholder="Enter code"
                  // className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.code || ""}
                ></Input>
                {validation.touched.code && validation.errors.code ? (
                  <FormFeedback type="invalid">
                    {validation.errors.code}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>

            <Col lg={2}>
              <label></label>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                }}
              >
                <label>Custom</label>
                <div className="form-check form-switch form-switch-lg mb-2">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="customSwitchsizelg"
                    defaultChecked
                  />
                  <label
                    className="form-check-label"
                    htmlFor="customSwitchsizelg"
                  >
                    Auto
                  </label>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col sm="3">
              <div className="mb-3">
                <Label className="form-label">
                  Name<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="name"
                  type="text"
                  placeholder="Enter name"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.name || ""}
                ></Input>
                {validation.touched.name && validation.errors.name ? (
                  <FormFeedback type="invalid">
                    {validation.errors.name}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
            <Col sm="3">
              <div className="mb-3">
                <Label className="form-label">
                  Box Type<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="boxtype_lbl"
                  type="select"
                  placeholder="Select boxtype_lbl"
                  className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.boxtype_lbl || ""}
                >
                  <option value="">Select box type</option>
                  {bouquetboxtype.map((options) => (
                    <option key={options.id} value={options.id}>
                      {options.name}
                    </option>
                  ))}
                </Input>
                {validation.touched.boxtype_lbl &&
                validation.errors.boxtype_lbl ? (
                  <FormFeedback type="invalid">
                    {validation.errors.boxtype_lbl}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
            <Col sm="3">
              <div className="mb-3">
                <Label className="form-label">
                  Bouquet Type<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="type_lbl"
                  type="select"
                  placeholder="Select bouquet type"
                  rows="3"
                  className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.type_lbl || ""}
                  invalid={
                    validation.touched.type_lbl && validation.errors.type_lbl
                      ? true
                      : false
                  }
                >
                  <option value="">Select bouquet type</option>
                  {bouquettype.map((options) => (
                    <option key={options.id} value={options.id}>
                      {options.name}
                    </option>
                  ))}
                </Input>
                {validation.touched.type_lbl && validation.errors.type_lbl ? (
                  <FormFeedback type="invalid">
                    {validation.errors.type_lbl}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
            <Col sm="3">
              <div className="mb-3">
                <Label className="form-label">
                  Status<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="status"
                  type="select"
                  placeholder="select status"
                  rows="3"
                  className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.status || ""}
                  invalid={
                    validation.touched.status && validation.errors.status
                      ? true
                      : false
                  }
                >
                  <option value="">Select status</option>
                  <option value="1">Active</option>
                  <option value="0">In-active</option>
                </Input>
                {validation.touched.status && validation.errors.status ? (
                  <FormFeedback type="invalid">
                    {validation.errors.status}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
          </Row>
          <Row>
            <Col sm="3">
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
            <Col sm="3">
              <div className="mb-3">
                <Label className="form-label">
                  Is Exclusive<span style={{ color: "red" }}>*</span>{" "}
                  <i className="mdi mdi-information"></i>
                </Label>
                <Input
                  name="is_exclusive_lbl"
                  type="select"
                  placeholder="Select Status"
                  className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.is_exclusive_lbl || ""}
                >
                  {bouquex.map((options) => (
                    <option key={options.id} value={options.id}>
                      {options.name}
                    </option>
                  ))}
                </Input>
                {validation.touched.is_exclusive_lbl &&
                validation.errors.is_exclusive_lbl ? (
                  <FormFeedback type="invalid">
                    {validation.errors.is_exclusive_lbl}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
            <Col sm="3">
              <div className="mb-3">
                <Label className="form-label">
                  Is Promotional<span style={{ color: "red" }}>*</span>
                  <i className="mdi mdi-information"></i>
                </Label>
                <Input
                  name="is_promotional"
                  type="select"
                  placeholder="Select Status"
                  className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.is_promotional || ""}
                  disabled
                >
                  <option value="1">No</option>
                  <option value="0">Yes</option>
                </Input>
                {validation.touched.is_promotional &&
                validation.errors.is_promotional ? (
                  <FormFeedback type="invalid">
                    {validation.errors.is_promotional}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
            <Col sm="3">
              <div className="mb-3">
                <Label className="form-label">
                  NCF<span style={{ color: "red" }}>*</span>{" "}
                  <i className="mdi mdi-information"></i>
                </Label>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <label style={{ marginRight: "10px" }}>Fix NCF</label>
                  <div className="form-check form-switch form-switch-lg mb-2">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="customSwitchsizelg"
                      defaultChecked
                    />
                    <label
                      className="form-check-label"
                      htmlFor="customSwitchsizelg"
                    >
                      Dynamic NCF
                    </label>
                  </div>
                </div>
                {validation.touched.ifFixNCF && validation.errors.ifFixNCF ? (
                  <FormFeedback type="invalid">
                    {validation.errors.ifFixNCF}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
          </Row>
          <Row>
            <Col sm="3">
              <div className="mb-3">
                <Label className="form-label">
                  Max Channels for NCF Charges (0 means ALL CHANNELS)
                  <span style={{ color: "red" }}>*</span>{" "}
                  <i className="mdi mdi-information"></i>
                </Label>
                <Input
                  name="max_ncf_channels"
                  type="number"
                  placeholder="0"
                  // className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.max_ncf_channels || ""}
                />
                {validation.touched.max_ncf_channels &&
                validation.errors.max_ncf_channels ? (
                  <FormFeedback type="invalid">
                    {validation.errors.max_ncf_channels}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
            <Col sm="3">
              <div className="mb-3">
                <Label className="form-label">
                  Show On Portal<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="showon_portal"
                  type="select"
                  placeholder="Select Status"
                  className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.showon_portal || ""}
                >
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </Input>
                {validation.touched.showon_portal &&
                validation.errors.showon_portal ? (
                  <FormFeedback type="invalid">
                    {validation.errors.showon_portal}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
            <Col sm="3">
              <div className="mb-3">
                <Label className="form-label">
                  Bouquet Category<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="category_lbl"
                  type="select"
                  placeholder="Select Status"
                  className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.category_lbl || ""}
                >
                  <option value="MSO Bouquet">MSO Bouquet</option>
                  <option value="Broadcaster Bouquet">
                    Broadcaster Bouquet
                  </option>
                </Input>
                {validation.touched.category_lbl &&
                validation.errors.category_lbl ? (
                  <FormFeedback type="invalid">
                    {validation.errors.category_lbl}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
            <Col sm="3">
              <div className="mb-3">
                <Label className="form-label">
                  Stop other Bouquet Activation
                  <span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="showon_portal"
                  type="select"
                  placeholder="Select Status"
                  className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.showon_portal || ""}
                >
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </Input>
                {validation.touched.showon_portal &&
                validation.errors.showon_portal ? (
                  <FormFeedback type="invalid">
                    {validation.errors.showon_portal}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
          </Row>
          <Row>
            <Col sm="3">
              <div className="mb-3">
                <Label className="form-label">Select EPBX</Label>
                <Input
                  name="epbx"
                  type="select"
                  placeholder="Select Status"
                  className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.epbx || ""}
                >
                  <option value="">Select epbx</option>
                </Input>
                {validation.touched.epbx && validation.errors.epbx ? (
                  <FormFeedback type="invalid">
                    {validation.errors.epbx}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
          </Row>
          <div
            style={{
              display: "flex",
              width: "1000px",
            }}
          >
            <div
              style={{
                // margin: "20px 0px",
                marginTop: "20px",
                marginBottom: "18px",
                zIndex: 12000,
                backgroundColor: "#fff",
                width: "fit-content",
                marginLeft: "20%",

                position: "absolute",
                padding: "0px 10px",
              }}
            >
              <p style={{ fontWeight: "bold" }}>
                Add Alacarte<span style={{ color: "red" }}>*</span>
              </p>
            </div>
            <Row
              style={{
                position: "relative",
                border: "1px solid #ced4da",
                padding: "20px 0px",
                margin: "30px 0px",
              }}
            >
              <Col sm="12" style={{ width: "500px" }}>
                <AddAlacarte />
                <Count />
              </Col>
            </Row>
            <div
              style={{
                marginTop: "20px",
                marginBottom: "18px",
                zIndex: 12000,
                backgroundColor: "#fff",
                width: "fit-content",
                marginLeft: "50%",
                position: "absolute",
                padding: "0px 10px",
              }}
            >
              <p style={{ fontWeight: "bold" }}>
                Add Packages<span style={{ color: "red" }}>*</span>
              </p>
            </div>
            <Row
              style={{
                position: "relative",
                border: "1px solid #ced4da",
                padding: "20px 0px",
                margin: "30px 0px",
              }}
            >
              <Col sm="8" style={{ width: "500px" }}>
                <AddPackages />
                <Count />
              </Col>
            </Row>
          </div>
          <div
            style={{
              marginTop: "20px",
              marginBottom: "18px",
              zIndex: 12000,
              backgroundColor: "#fff",
              width: "fit-content",
              marginLeft: "35%",
              position: "absolute",
              padding: "0px 10px",
            }}
          >
            <p style={{ fontWeight: "bold", display: "contents" }}>
              DEFAULT MRP Pricing / Bouquet Pricing forLCO
              <span style={{ color: "red" }}>*</span>
            </p>
          </div>
          <Row
            style={{
              position: "relative",
              border: "1px solid #ced4da",
              padding: "20px 0px",
              margin: "30px 0px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                border: "1px solid grey",
                width: "50%",
                alignItems: "center",
                padding: "10px",
                marginLeft: "25%",
              }}
            >
              <div
                style={{ borderRight: "1px solid grey", paddingRight: "20px" }}
              >
                <div>Total FTA Count: 0 | Total Pay Channel Count: 0</div>
                <div>Total NCF Channels: 0 | Total Channels: 0</div>
              </div>
              <div>
                <div style={{ marginLeft: "20px" }}>Overall Total: 0**</div>
              </div>
            </div>
            <Row>
              <Col sm="3">
                <Label>MRP**</Label>
                <Input disabled defaultValue={0} />
              </Col>
              <Col sm="3">
                <Label>DRP**</Label>
                <Input type="number" defaultValue={0} />
              </Col>
              <Col sm="3">
                <Label>LCO Discount(%)</Label>
                <Input type="number" defaultValue="20" />
              </Col>
              <Col sm="3">
                <Label>LCO Rate**</Label>
                <Input type="number" defaultValue={0} />
              </Col>
            </Row>
            <Row>
              <PreviewTable />
            </Row>
          </Row>
          <div
            style={{
              marginBottom: "18px",
              zIndex: 12000,
              backgroundColor: "#fff",
              width: "fit-content",
              marginLeft: "35%",
              position: "absolute",
              padding: "0px 10px",
              marginTop: "-10px",
            }}
          >
            <p style={{ fontWeight: "bold" }}>
              ADDITIONAL MRP Pricing / Bouquet Pricing forLCO
              <span style={{ color: "red" }}>*</span>
            </p>
          </div>
          <Row
            style={{
              position: "relative",
              border: "1px solid #ced4da",
              padding: "20px 0px",
              margin: "30px 0px",
            }}
          >
            <Row>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Label style={{ marginRight: "10px" }}>
                    Additional Name:{" "}
                  </Label>
                  <Input
                    placeholder="Enter additional name"
                    type="text"
                    style={{ width: "210px" }}
                  />
                </div>
                <div>
                  <Button>+ Add Pricing</Button>
                </div>
              </div>
            </Row>
            <Row>
              <Col sm="3">
                <Label>MRP**</Label>
                <Input disabled defaultValue={0} />
              </Col>
              <Col sm="3">
                <Label>DRP**</Label>
                <Input type="number" defaultValue={0} />
              </Col>
              <Col sm="3">
                <Label>LCO Discount(%)</Label>
                <Input type="number" defaultValue="20" />
              </Col>
              <Col sm="3">
                <Label>LCO Rate**</Label>
                <Input type="number" defaultValue={0} />
              </Col>
            </Row>
            <Row>
              <PreviewTable />
            </Row>
            <Row>
              <AdditionalMRP />
            </Row>
          </Row>
          <div>**Applicable NCF and Taxes Additional</div>
          <div
            style={{
              marginTop: "20px",
              marginBottom: "18px",
              zIndex: 12000,
              backgroundColor: "#fff",
              width: "fit-content",
              marginLeft: "40%",
              position: "absolute",
              padding: "0px 10px",
            }}
          >
            <p style={{ fontWeight: "bold" }}>
              Add Brands
              <span style={{ color: "red" }}>*</span>
            </p>
          </div>
          <Row
            style={{
              position: "relative",
              border: "1px solid #ced4da",
              padding: "20px 0px",
              margin: "30px 0px",
            }}
          >
            <AddBrands />
            <p>
              *If no brand selected, this bouquet will be available for all STB
              brands
            </p>
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

CreateBouquet.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default CreateBouquet;
