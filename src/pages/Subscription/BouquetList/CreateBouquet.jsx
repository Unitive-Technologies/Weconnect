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
  Toast,
  ToastBody,
  ToastHeader,
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
import AdditionalMrpTable from "./AdditionalMrpTable";

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
  const [ifFixNCF, setIfFixNCF] = useState(false);
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
  const [ncfdrp, setNcfdrp] = useState(130);
  const [newArray, setNewArray] = useState([]);
  const [lcoDiscount, setLcoDiscount] = useState(20);
  const [ncfLcoDiscount, setNcfLcoDiscount] = useState(20);
  const [lcoRate, setLcoRate] = useState(0);
  const [ncfLcoRate, setNcfLcoRate] = useState(0);
  const [additionalName, setAdditionalName] = useState("");
  const [additionalLcoDiscount, setAdditionalLcoDiscount] = useState("");
  const [additionalLcoRate, setAdditionalLcoRate] = useState("");
  // const [ncfAdditionaldrp, setNcfAdditionaldrp] = useState(130);
  // const [ncfAdditionalLcoDiscount, setNcfAdditionalLcoDiscount] = useState("");
  // const [ncfAdditionalLcoRate, setNcfAdditionalLcoRate] = useState("");
  const [additionalRates, setAdditionalRates] = useState([]);
  const [rate, setRate] = useState([]);
  const [showValidate, setShowValidate] = useState(false);
  const handleValidate = () => {
    setShowValidate(!showValidate);
  };

  const handleIsHDChange = async (e) => {
    const selectValue = e.target.value;
    validation.handleChange(e);
    setSelectedIsHD(selectValue);
  };

  const handleTypeChange = async (e) => {
    const selectValue = e.target.value;
    validation.handleChange(e);
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
      is_exclusive: "0",
      is_promotional: "0",
      is_loner: "0",
      ifFixNCF: "",
      max_ncf_channels: "0",
      is_online_app: "0",
      sort_by: "1",
      alacarte: [],
      package: [],
      rate: [],
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Enter Bouquet name"),
      type: Yup.string().required("Select Bouquet Type"),
      isHD: Yup.string().required("Select Box Type"),
      status: Yup.string().required("Select Status"),
      description: Yup.string().required("Enter description"),
      is_exclusive: Yup.string().required("Select Is Exclusive"),
      is_promotional: Yup.string().required("Select Is Promotional"),
      max_ncf_channels: Yup.string().required(
        "Enter Max Channels for NCf Charges"
      ),
      is_online_app: Yup.string().required("select Show On Portal"),
      sort_by: Yup.string().required("Select Bouquet Category"),
      is_loner: Yup.string().required("Select Stop Other Bouquet Activation"),
      // alacarte: Yup.array().min(1, "Select Atleast one Alacarte"),
      // package: Yup.array().min(1, "Select Atleast one Package"),
      // rate: Yup.array().min(1, "Select Atleast one MRP price"),
    }),
    onSubmit: (values) => {
      // if (alacarteData.length === 0) {
      //   setShowValidate(true);
      // }
      if (alacarteData.length === 0) {
        window.alert("Please Select one alacarte");
        return;
      }
      if (packagesData.length === 0) {
        window.alert("Please Select one package");
        return;
      }
      if (rate.length === 0) {
        window.alert("Please Select one default Mrp pricing");
        return;
      }
      const rateArray = newArray.map((row, i) => {
        const price =
          parseFloat(row.months) === 0 ? lcoRate / 30 : lcoRate * row.months;

        const ncfPrice =
          parseFloat(row.months) === 0
            ? ncfLcoRate / 30
            : ncfLcoRate * row.months;
        const totalAmount = price + (price * 30.3) / 100;
        const totalwithNcf = price + ncfPrice;
        const ncfTotalAmount = totalwithNcf + (totalwithNcf * 30.3) / 100;
        const isRefundable = row.is_refundable || false;

        const freeDays = parseInt(row.free_days) || 0;

        // Calculate cashback amount (assuming it's 0 for now)
        const cashbackAmount = 0;

        return {
          id: row.id,
          price: parseFloat(price.toFixed(2)),
          rent: parseFloat(ncfPrice.toFixed(2)) || 0,
          is_refundable: isRefundable ? 1 : 0,
          free_days: freeDays,
          cashback_amount: cashbackAmount,
          total_amount:
            ifFixNCF === true
              ? parseFloat(ncfTotalAmount.toFixed(2))
              : parseFloat(totalAmount.toFixed(2)),
        };
      });
      const newbouquet = {
        alacarte: alacarteData.map((single) => {
          return single.id;
        }),
        package: packagesData.map((single) => {
          return single.id;
        }),
        stbbrands: stbbrands.map((single) => {
          return single.id;
        }),
        name: values["name"],
        code: values["code"],
        description: values["description"],
        isHD: parseInt(values["isHD"]),
        is_exclusive: parseInt(values["is_exclusive"]),
        is_online_app: parseInt(values["is_online_app"]),
        sort_by: parseInt(values["sort_by"]),
        status: parseInt(values["status"]),
        type: parseInt(values["type"]),
        ifFixNCF: values["ifFixNCF"],
        mrp:
          ifFixNCF !== true ? parseInt(mrp) + parseInt(ncfdrp) : parseInt(mrp),
        mrp_data: {
          pcc: parseInt(mrp),
          drp: parseInt(drp),
          ncf: parseInt(ncfdrp),
          dis_pcc: parseInt(lcoDiscount),
          lmo_pcc: parseInt(lcoRate),
          dis_ncf: parseInt(ncfLcoDiscount),
          lmo_ncf: parseInt(ncfLcoRate),
          is_promotional: parseInt(values["is_promotional"]),
          max_ncf_channels: parseInt(values["max_ncf_channels"]),
          is_loner: parseInt(values["is_loner"]),
        },

        rate: rateArray,

        additional_rates: additionalRates,
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
    const totalNcfLcoRate = (ncfdrp * ncfLcoDiscount) / 100;

    setLcoRate(drp - totalLcoRate);
    setNcfLcoRate(ncfdrp - totalNcfLcoRate);
  }, [drp, lcoDiscount, ncfdrp, ncfLcoDiscount]);

  useEffect(() => {
    const totalAdditionalLcoRate = (drp * additionalLcoDiscount) / 100;

    setAdditionalLcoRate(drp - totalAdditionalLcoRate);
  }, [drp, additionalLcoDiscount]);
  return (
    <>
      <div
        className="position-fixed top-0 end-0 p-3"
        style={{ zIndex: "1005" }}
      >
        <Toast isOpen={showValidate}>
          <ToastHeader toggle={handleValidate}>
            <i className="mdi mdi-alert-outline me-2"></i> Warning
          </ToastHeader>
          <ToastBody>Please select atleast One Bouquet</ToastBody>
        </Toast>
      </div>
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
                    invalid={
                      validation.touched.name && validation.errors.name
                        ? true
                        : false
                    }
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
                    invalid={
                      validation.touched.isHD && validation.errors.isHD
                        ? true
                        : false
                    }
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
                        name="ifFixNCF"
                        type="checkbox"
                        className="form-check-input"
                        id="customSwitchsizelg"
                        value={ifFixNCF}
                        // checked={ifFixNCF === true ? false : true}
                        defaultChecked={ifFixNCF !== true}
                        onChange={(e) => setIfFixNCF(!e.target.checked)}
                        onClick={() => {
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
            {console.log("value of ifFixNCF : " + ifFixNCF)}
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
                    disabled={ifFixNCF !== true}
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
            {console.log("fixNCF Value:" + ifFixNCF)}
            <div
              style={{
                display: "flex",
                // width: "1000px",
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
                <Col sm="12">
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
                    isOpen={isOpen}
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
                  marginLeft: "65%",
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
                <Col sm="12">
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
                    isOpen={isOpen}
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
                  style={{
                    borderRight: "1px solid grey",
                    paddingRight: "20px",
                  }}
                >
                  <div>
                    Total FTA Count: {ftaCountAlacar + ftaCountPackage} | Total
                    Pay Channel Count:
                    {paychannelCountAlacar + paychannelCountPackage}
                  </div>
                  <div>
                    Total NCF Channels: {ncfCountAlacar + ncfCountPackage} |
                    Total Channels: {totalChannelAlacar + totalChannelPackage}
                  </div>
                </div>
                <div>
                  <div style={{ marginLeft: "20px" }}>
                    Overall Total:{" "}
                    {parseFloat(totalRateAlacar + totalRatePackage).toFixed(2)}
                  </div>
                </div>
              </div>
              {ifFixNCF === true && (
                <Row className="mb-3 mt-3">
                  <Col sm="3">
                    {/* <Label>MRP**</Label>
                <Input
                  disabled
                  defaultValue={0}
                  value={parseFloat(mrp).toFixed(2)}
                /> */}
                    <h4>FIX NCF</h4>
                  </Col>
                  <Col sm="3">
                    <Label>Rate**</Label>
                    <Input
                      type="number"
                      defaultValue="130"
                      value={parseFloat(ncfdrp).toFixed(2)}
                      onChange={(e) => setNcfdrp(e.target.value)}
                    />
                  </Col>
                  <Col sm="3">
                    <Label>LCO Discount(%)</Label>
                    <Input
                      type="number"
                      defaultValue="20"
                      value={ncfLcoDiscount}
                      onChange={(e) => setNcfLcoDiscount(e.target.value)}
                    />
                  </Col>
                  <Col sm="3">
                    <Label>LCO Rate**</Label>
                    <Input
                      type="number"
                      // defaultValue={0}
                      value={parseFloat(ncfLcoRate).toFixed(2)}
                      onChange={(e) => setNcfLcoRate(e.target.value)}
                    />
                  </Col>
                </Row>
              )}
              <Row>
                <Col sm="3">
                  <Label>MRP**</Label>
                  <Input
                    disabled
                    defaultValue={0}
                    value={parseFloat(mrp).toFixed(2)}
                  />
                </Col>
                <Col sm="3">
                  <Label>DRP**</Label>
                  <Input
                    type="number"
                    defaultValue={0}
                    value={parseFloat(drp).toFixed(2)}
                  />
                </Col>
                <Col sm="3">
                  <Label>LCO Discount(%)</Label>
                  <Input
                    type="number"
                    defaultValue="20"
                    value={lcoDiscount}
                    onChange={(e) => setLcoDiscount(e.target.value)}
                  />
                </Col>
                <Col sm="3">
                  <Label>LCO Rate**</Label>
                  <Input
                    type="number"
                    defaultValue={0}
                    value={parseFloat(lcoRate).toFixed(2)}
                  />
                </Col>
              </Row>
              <Row>
                <PreviewTable
                  toggleNcfSwitch={toggleNcfSwitch}
                  rechargeperiod={rechargeperiod}
                  lcoRate={lcoRate}
                  ncfLcoRate={ncfLcoRate}
                  rate={rate}
                  setRate={setRate}
                  newArray={newArray}
                  setNewArray={setNewArray}
                  ifFixNCF={ifFixNCF}
                />
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
                <AdditionalMrpTable
                  isOpen={isOpen}
                  toggleNcfSwitch={toggleNcfSwitch}
                  rechargeperiod={rechargeperiod}
                  additionalLcoDiscount={additionalLcoDiscount}
                  additionalLcoRate={additionalLcoRate}
                  additionalRates={additionalRates}
                  setAdditionalRates={setAdditionalRates}
                  setAdditionalName={setAdditionalName}
                  setAdditionalLcoDiscount={setAdditionalLcoDiscount}
                  setAdditionalLcoRate={setAdditionalLcoRate}
                  mrp={mrp}
                  drp={drp}
                  ncfdrp={ncfdrp}
                  ifFixNCF={ifFixNCF}
                  // ncfAdditionaldrp={ncfAdditionaldrp}
                  // setNcfAdditionaldrp={setNcfAdditionaldrp}
                  // ncfAdditionalLcoDiscount={ncfAdditionalLcoDiscount}
                  // setNcAdditionalLcoDiscount={setNcfAdditionalLcoDiscount}
                  // ncfAdditionalLcoRate={ncfAdditionalLcoRate}
                  // setNcfAdditionalLcoRate={setNcfAdditionalLcoRate}
                />
              </Row>
              <Row>
                <AdditionalMRP
                  additionalRates={additionalRates}
                  rechargeperiod={rechargeperiod}
                />
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
              <p style={{ fontWeight: "bold" }}>Add Brands</p>
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
                isOpen={isOpen}
              />
              <p>
                *If no brand selected, this bouquet will be available for all
                STB brands
              </p>
            </Row>
            <Row>
              <Col>
                <ModalFooter>
                  <button type="submit" className="btn btn-success save-user">
                    Create
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
    </>
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
