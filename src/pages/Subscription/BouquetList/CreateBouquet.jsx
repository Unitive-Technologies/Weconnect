import React, { useState, useEffect } from "react";
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
    toggleCreateBouquet,
    // alacartechannels,
    bouquetboxtype,
    bouquetstatus,
    // bouquetpackages,
    bouquettaxlist,
    bouquettype,
    bouquex,
    rechargeperiod,
  } = props;
  // console.log("bouquettaxlist in create:" + JSON.stringify(bouquettaxlist));
  const dispatch = useDispatch();
  const [toggleSwitch, settoggleSwitch] = useState(true);
  const [toggleNcfSwitch, setToggleNcfSwitch] = useState(true);
  const [selectedType, setSelectedType] = useState("");
  const [selectedIsHD, setSelectedIsHD] = useState("");
  const [alacarteData, setAlacarteData] = useState([]);
  const [packagesData, setPackagesData] = useState([]);
  const [stbbrands, setStbbrands] = useState([]);
  const [ftaCountAlacar, setFtaCountAlacar] = useState(0);
  const [paychannelCountAlacar, setPaychannelCountAlacar] = useState(0);
  const [ncfCountAlacar, setNcfCountAlacar] = useState(0);
  const [totalChannelAlacar, setTotalChannelAlacar] = useState(0);
  const [totalRateAlacar, setTotalRateAlacar] = useState(0);
  const [ftaCountPackage, setFtaCountPackage] = useState(0);
  const [paychannelCountPackage, setPaychannelCountPackage] = useState(0);
  const [ncfCountPackage, setNcfCountPackage] = useState(0);
  const [totalChannelPackage, setTotalChannelPackage] = useState(0);
  const [totalRatePackage, setTotalRatePackage] = useState(0);
  const [mrp, setMrp] = useState(0);
  const [drp, setDrp] = useState(0);

  const [lcoDiscount, setLcoDiscount] = useState(20);
  const [lcoRate, setLcoRate] = useState(0);
  console.log(
    "mrp, drp, lcoDiscount, lcoRate:" + mrp,
    drp,
    lcoDiscount,
    lcoRate
  );
  const handleIsHDChange = async (e) => {
    const selectValue = e.target.value;
    setSelectedIsHD(selectValue);
  };

  const handleTypeChange = async (e) => {
    const selectValue = e.target.value;
    setSelectedType(selectValue);
  };
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      code: "",
      name: "",
      type: "",
      isHD: "",
      status: "",
      description: "",
      is_promotional: "",
      // ifFixNCF: "",
      max_ncf_channels: "",
      is_online_app: "",
      sort_by: "",
    },
    validationSchema: Yup.object({
      // code: Yup.string().required("Enter Channel Code"),
      // name: Yup.string().required("Enter channel name"),
      // type: Yup.string().required("Enter bouquet type"),
      // isHD: Yup.string().required("Enter box type"),
      // type: Yup.string().required("Enter channel type"),
      // status: Yup.string().required("Enter status"),
      // description: Yup.string().required("Enter description"),
      // is_promotional: Yup.string(),
      // ifFixNCF: Yup.string(),
      // max_ncf_channels: Yup.string(),
      // is_online_app: Yup.string(),
      // sort_by: Yup.string(),
    }),
    onSubmit: (values) => {
      const newbouquet = {
        // id: Math.floor(Math.random() * (30 - 20)) + 20,
        // code: values["code"],
        // name: values["name"],
        // type: values["type"],
        // isHD: values["isHD"],
        // type: values["type"],
        // status: values["status"],
        // description: values["description"],
        // is_promotional: values["is_promotional"],
        // ifFixNCF: values["ifFixNCF"],
        // max_ncf_channels: values["max_ncf_channels"],
        // created_at: new Date(),
        // created_by: values["created_by"],
        // is_online_app: values["is_online_app"],
        // sort_by: values["sort_by"],
      };
      console.log("New Bouquet List:" + newbouquet);
      dispatch(onAddBouquet(newbouquet));
      validation.resetForm();
      toggleCreateBouquet();
    },
    onReset: (values) => {
      validation.setValues(validation.initialValues);
    },
  });

  useEffect(() => {
    if (totalRateAlacar || totalRatePackage) {
      const mrpTotal = totalRateAlacar + totalRatePackage;
      setMrp(mrpTotal);
      setDrp(mrpTotal);
    }
  }, [totalRateAlacar, totalRatePackage]);

  useEffect(() => {
    const totalLcoRate = (drp * lcoDiscount) / 100;

    setLcoRate(drp - totalLcoRate);
  }, [drp, lcoDiscount]);

  return (
    <Modal
      isOpen={isOpen}
      role="dialog"
      autoFocus={true}
      centered={true}
      className="exampleModal"
      tabIndex="-1"
      toggle={toggleCreateBouquet}
      size="xl"
    >
      <ModalHeader tag="h4" toggle={toggleCreateBouquet}>
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
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.code || ""}
                  disabled={toggleSwitch}
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
                    onClick={(e) => {
                      settoggleSwitch(!toggleSwitch);
                    }}
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
                  name="isHD"
                  type="select"
                  placeholder="Select BoxType"
                  className="form-select"
                  // onChange={validation.handleChange}
                  // onBlur={validation.handleBlur}
                  // value={validation.values.isHD || ""}
                  onChange={handleIsHDChange}
                  value={selectedIsHD}
                >
                  <option value="">Select Box type</option>
                  {bouquetboxtype &&
                    bouquetboxtype.map((options) => (
                      <option key={options.id} value={options.id}>
                        {options.name}
                      </option>
                    ))}
                </Input>
                {validation.touched.isHD && validation.errors.isHD ? (
                  <FormFeedback type="invalid">
                    {validation.errors.isHD}
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
                  name="type"
                  type="select"
                  placeholder="Select Bouquet type"
                  rows="3"
                  className="form-select"
                  // onChange={validation.handleChange}
                  // onBlur={validation.handleBlur}
                  // value={validation.values.type || ""}
                  invalid={
                    validation.touched.type && validation.errors.type
                      ? true
                      : false
                  }
                  onChange={handleTypeChange}
                  value={selectedType}
                >
                  <option value="">Select bouquet type</option>
                  {bouquettype &&
                    bouquettype.map((options) => (
                      <option key={options.id} value={options.id}>
                        {options.name}
                      </option>
                    ))}
                </Input>
                {validation.touched.type && validation.errors.type ? (
                  <FormFeedback type="invalid">
                    {validation.errors.type}
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
                  placeholder="Select Status"
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
                  {bouquetstatus &&
                    bouquetstatus.map((options) => (
                      <option key={options.id} value={options.id}>
                        {options.name}
                      </option>
                    ))}
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
                  name="is_exclusive"
                  type="select"
                  placeholder="Select Is Exclusive"
                  className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.is_exclusive || ""}
                >
                  {bouquex.map((options) => (
                    <option key={options.id} value={options.id}>
                      {options.name}
                    </option>
                  ))}
                </Input>
                {validation.touched.is_exclusive &&
                validation.errors.is_exclusive ? (
                  <FormFeedback type="invalid">
                    {validation.errors.is_exclusive}
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
                  placeholder="Select Is Promotional"
                  className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.is_promotional || ""}
                  // disabled
                >
                  <option value="1">Yes</option>
                  <option value="0">No</option>
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
                      onClick={(e) => {
                        setToggleNcfSwitch(!toggleNcfSwitch);
                      }}
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
                  disabled={!toggleNcfSwitch}
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
                  name="is_online_app"
                  type="select"
                  placeholder="Select Show On Portal"
                  className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.is_online_app || ""}
                >
                  <option value="1">Yes</option>
                  <option value="0">No</option>
                </Input>
                {validation.touched.is_online_app &&
                validation.errors.is_online_app ? (
                  <FormFeedback type="invalid">
                    {validation.errors.is_online_app}
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
                  name="sort_by"
                  type="select"
                  placeholder="Select Status"
                  className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.sort_by || ""}
                >
                  <option value="1">MSO Bouquet</option>
                  <option value="2">Broadcaster Bouquet</option>
                </Input>
                {validation.touched.sort_by && validation.errors.sort_by ? (
                  <FormFeedback type="invalid">
                    {validation.errors.sort_by}
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
                  name="is_loner"
                  type="select"
                  placeholder="Select Stop Other"
                  className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.is_loner || ""}
                >
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </Input>
                {validation.touched.is_loner && validation.errors.is_loner ? (
                  <FormFeedback type="invalid">
                    {validation.errors.is_loner}
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
                <AddAlacarte
                  alacarteData={alacarteData}
                  setAlacarteData={setAlacarteData}
                  selectedType={selectedType}
                  selectedIsHD={selectedIsHD}
                  ftaCount={ftaCountAlacar}
                  paychannelCount={paychannelCountAlacar}
                  ncfCount={ncfCountAlacar}
                  totalChannel={totalChannelAlacar}
                  totalRate={totalRateAlacar}
                  setFtaCount={setFtaCountAlacar}
                  setPaychannelCount={setPaychannelCountAlacar}
                  setNcfCount={setNcfCountAlacar}
                  setTotalChannel={setTotalChannelAlacar}
                  setTotalRate={setTotalRateAlacar}
                />
                <Count
                  ftaCount={ftaCountAlacar}
                  paychannelCount={paychannelCountAlacar}
                  ncfCount={ncfCountAlacar}
                  totalChannel={totalChannelAlacar}
                  totalRate={totalRateAlacar}
                />
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
                <AddPackages
                  packagesData={packagesData}
                  selectedType={selectedType}
                  selectedIsHD={selectedIsHD}
                  setPackagesData={setPackagesData}
                  ftaCount={ftaCountPackage}
                  paychannelCount={paychannelCountPackage}
                  ncfCount={ncfCountPackage}
                  totalChannel={totalChannelPackage}
                  totalRate={totalRatePackage}
                  setFtaCount={setFtaCountPackage}
                  setPaychannelCount={setPaychannelCountPackage}
                  setNcfCount={setNcfCountPackage}
                  setTotalChannel={setTotalChannelPackage}
                  setTotalRate={setTotalRatePackage}
                />
                <Count
                  ftaCount={ftaCountPackage}
                  paychannelCount={paychannelCountPackage}
                  ncfCount={ncfCountPackage}
                  totalChannel={totalChannelPackage}
                  totalRate={totalRatePackage}
                />
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
                <div>
                  Total FTA Count: {ftaCountAlacar + ftaCountPackage} | Total
                  Pay Channel Count:
                  {paychannelCountAlacar + paychannelCountPackage}
                </div>
                <div>
                  Total NCF Channels: {ncfCountAlacar + ncfCountPackage} | Total
                  Channels: {totalChannelAlacar + totalChannelPackage}
                </div>
              </div>
              <div>
                <div style={{ marginLeft: "20px" }}>
                  Overall Total: {totalRateAlacar + totalRatePackage}
                </div>
              </div>
            </div>
            <Row>
              <Col sm="3">
                <Label>MRP**</Label>
                <Input disabled defaultValue={0} value={mrp} />
              </Col>
              <Col sm="3">
                <Label>DRP**</Label>
                <Input type="number" defaultValue={0} value={drp} />
              </Col>
              <Col sm="3">
                <Label>LCO Discount(%)</Label>
                <Input type="number" defaultValue="20" value={lcoDiscount} />
              </Col>
              <Col sm="3">
                <Label>LCO Rate**</Label>
                <Input type="number" defaultValue={0} value={lcoRate} />
              </Col>
            </Row>
            <Row>
              <PreviewTable rechargeperiod={rechargeperiod} />
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
            <AddBrands
              stbbrands={stbbrands}
              setStbbrands={setStbbrands}
              selectedType={selectedType}
            />
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
                    toggleCreateBouquet();
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
  toggleCreateBouquet: PropTypes.func,
  isOpen: PropTypes.bool,

  bouquetboxtype: PropTypes.array,
  bouquetstatus: PropTypes.array,
  bouquettype: PropTypes.array,
  bouquex: PropTypes.array,
};

export default CreateBouquet;
