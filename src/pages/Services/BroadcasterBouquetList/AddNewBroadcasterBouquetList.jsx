import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Col,
  Row,
  Modal,
  ModalFooter,
  ModalHeader,
  ModalBody,
  Card,
  CardBody,
  CardTitle,
  Label,
  FormFeedback,
  Input,
  Form,
} from "reactstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import { addNewBroadcasterBouquetList as onAddNewBroadcasterBouquetList, getBroadcasterBouquetList as onGetBroadcasterBouquetList } from "/src/store/broadcasterbouquet/actions";
import { useDispatch } from "react-redux";
import AddChannels from "./AddChannels";
import RevenueShare from "./RevenueShare";
import PieChart from "./PieChart";

const AddNewBroadcasterBouquetList = (props) => {
  const { isOpen, toggleAddModal, broadcasterBouquetAddchannels, broadcasterBouquetType, broadcasterBouquetBroadcaster, broadcasterBouquetDefinition, broadcasterBouquetStatus } = props;
  const dispatch = useDispatch();


  const [broadPercent, setBroadPercent] = useState(80);
  const [msoPercent, setMsoPercent] = useState(20);
  const [discountPercent, setDiscountPercent] = useState(0);
  const [toggleSwitch, settoggleSwitch] = useState(true);
  const [channels, setChannels] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const [selectedBroadcaster, setSelectedBroadcaster] = useState("");

  const [selectedRate, setSelectedRate] = useState("");


  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setSelectedRate(inputValue >= 0 ? inputValue : 0);
  };

  const handleChangeLogo = (e) => {
    const file = e.target.files[0];
    if (file) {
      const { name, type } = file;
      const ext = name.split(".").pop();
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const data = reader.result;

        validation.setFieldValue("logo", {
          name,
          type,
          ext,
          data,
        });
      };
    }
  };

  const [selectedLanguages, setSelectedLanguages] = useState([]);

  const handleChangeLanguages = (e) => {
    const selectedOptions = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );

    setSelectedLanguages(selectedOptions);
  };
  console.log("lang handle:" + selectedLanguages);
  const handleArrowKeyPress = (e) => {
    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      e.preventDefault(); // Prevent the default behavior of arrow keys in number input

      const increment = e.key === "ArrowUp" ? 1 : -1;
      const currentRate = parseFloat(selectedRate) || 0;
      const newRate = Math.max(0, currentRate + increment * 0.01);

      setSelectedRate(newRate.toFixed(2));
    }
  };

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      //BroadCaster: "",
      code: "",
      name: "",
      definition: "",
      description: "",
      isFta: "",
      broadcaster: "",
      status: "",
      rate: "",
      created_by: "Admin",
    },
    validationSchema: Yup.object({
      code: Yup.string().required("Enter Code"),
      name: Yup.string().required("Enter name"),
      definition: Yup.string().required("Select definition"),
      description: Yup.string().required("Enter description"),
      isFta: Yup.string().required("Select type"),
      broadcaster: Yup.string().required("select broadcaster"),
      status: Yup.string().required("Enter status"),
      rate: Yup.string().required(""),
      // serviceid: Yup.string().required("serviceid"),
    }),
    onSubmit: (values) => {
      const newBroadcasterBouquetList = {
        id: Math.floor(Math.random() * (30 - 20)) + 20,
        code: values["code"],
        name: values["name"],
        definition: values["definition"],
        description: values["description"],
        isFta: values["isFta"],
        broadcaster: values["broadcaster"],
        status: parseInt(values["status"]), rate: values["rate"],
        channels: channels.map((single) => {
          return {
            broadcasterRate: single.broadcasterRate,
            broadcaster_lbl: single.broadcaster_lbl,
            channel_type_lbl: single.channel_type_lbl,
            id: single.id,
            isAlacarte: single.isAlacarte,
            isAlacarte_lbl: single.isAlacarte,
            isFta: single.isFta,
            isFta_lbl: single.isFta_lbl,
            isNCF: single.isNCF,
            isNCF_lbl: single.isNCF_lbl,
            name: single.name,
          };
        }),
        revenue_share: {
          mso_share: msoPercent,
          mso_discount: discountPercent,
          broadcaster_share: broadPercent,
        },
      };
      console.log(
        "newBroadcasterBouquetList:" + JSON.stringify(newBroadcasterBouquetList)
      );
      dispatch(onAddNewBroadcasterBouquetList(newBroadcasterBouquetList));
      dispatch(onGetBroadcasterBouquetList());
      validation.resetForm();
      toggleAddModal();
    },
    onReset: (values) => {
      validation.setValues(validation.initialValues);
    },
  });

  const handleUpdateChannels = (channels) => {
    setChannels(channels);
  };

  const [isCustomEnabled, setIsCustomEnabled] = useState(false);

  const handleChange = (e) => {
    // Handle switch change
    setIsCustomEnabled(e.target.checked);
  };


  return (
    <Modal
      isOpen={isOpen}
      role="dialog"
      autoFocus={true}
      centered={true}
      className="exampleModal"
      tabIndex="-1"
      toggle={toggleAddModal}
      size="xl"
    >
      <ModalHeader tag="h4" toggle={toggleAddModal}>
        Add New Broadcaster Bouquet
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
                  disabled={!isCustomEnabled}
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

            <Col lg={4}>
              <div className="form-check form-switch form-switch-lg mb-3">
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
                  Custom / Auto
                </label>
              </div>
            </Col>
            <Col sm="4"></Col>

            <Col sm="4">
              <div className="mb-3">
                <Label className="form-label">
                  Name<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="name"
                  type="text"
                  placeholder="Enter name"
                  // className="form-select"
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

            <Col sm="4">
              <div className="mb-3">
                <Label className="form-label">
                  Definition<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="definition"
                  type="select"
                  placeholder="Select Definition"
                  className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.definition || ""}
                >
                  <option value="">Select Definition</option>
                  {broadcasterBouquetDefinition &&
                    broadcasterBouquetDefinition.map((definition) => (
                      <option key={definition.id} value={definition.id}>
                        {definition.name}
                      </option>
                    ))}
                </Input>
                {validation.touched.definition &&
                  validation.errors.definition ? (
                  <FormFeedback type="invalid">
                    {validation.errors.definition}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>

            <Col sm="4">
              <div className="mb-3">
                <Label className="form-label">
                  Description<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="description"
                  type="textarea"
                  placeholder="Enter Description"
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

            <Col sm="4">
              <div className="mb-3">
                <Label className="form-label">
                  Type<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="isFTA"
                  type="select"
                  placeholder="Select Channel type"
                  className="form-select"
                  onChange={(e) => {
                    validation.handleChange(e);
                    setSelectedType(e.target.value);
                  }}
                  onBlur={validation.handleBlur}
                  value={validation.values.isFta || ""}
                >
                  <option value="">Select Type</option>
                  {broadcasterBouquetType &&
                    broadcasterBouquetType.map((isFta) => (
                      <option key={isFta.id} value={isFta.id}>
                        {isFta.name}
                      </option>
                    ))}
                </Input>
                {validation.touched.isFta && validation.errors.isFta ? (
                  <FormFeedback type="invalid">
                    {validation.errors.isFta}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
            <Col sm="4">
              <div className="mb-3">
                <Label className="form-label">
                  Broadcaster<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="broadcaster"
                  type="select"
                  placeholder="Select broadcaster"
                  className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.broadcaster || ""}
                >
                  <option value="">Select Type</option>
                  {broadcasterBouquetBroadcaster &&
                    broadcasterBouquetBroadcaster.map((broadcaster) => (
                      <option key={broadcaster.id} value={broadcaster.id}>
                        {broadcaster.name}
                      </option>
                    ))}
                </Input>
                {validation.touched.broadcaster &&
                  validation.errors.broadcaster ? (
                  <FormFeedback type="invalid">
                    {validation.errors.broadcaster}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
            <Col sm="4">
              <div className="mb-3">
                <Label className="form-label">
                  Status<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="status"
                  type="select"
                  placeholder="Select Status"
                  className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.status || ""}
                >
                  <option value="">Select Status</option>
                  {broadcasterBouquetStatus &&
                    broadcasterBouquetStatus.map((status) => (
                      <option key={status.id} value={status.id}>
                        {status.name}
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

            <Col sm="4">
              <div className="mb-3">
                <Label className="form-label">MRP Rate(INR)</Label>
                <Input
                  name="rate"
                  type="number"
                  step="0.01"
                  onChange={handleInputChange}
                  onKeyDown={handleArrowKeyPress}
                  placeholder="0"
                  disabled={selectedType === "1"}
                  value={selectedRate}
                  onBlur={validation.handleBlur}
                ></Input>
              </div>
            </Col>
          </Row>
          <Row>
            {selectedType === "0" && (
              <div>
                <div
                  style={{
                    // margin: "20px 0px",
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
                  <h5 style={{}}>MRP Revenue Share</h5>
                </div>
                <Row
                  style={{
                    position: "relative",
                    border: "1px solid #ced4da",
                    padding: "20px 0px",
                    margin: "30px 0px",
                  }}
                >
                  <Col lg={6}>
                    <RevenueShare
                      broadPercent={broadPercent}
                      msoPercent={msoPercent}
                      discountPercent={discountPercent}
                      setBroadPercent={setBroadPercent}
                      setMsoPercent={setMsoPercent}
                      setDiscountPercent={setDiscountPercent}
                    />
                  </Col>

                  {/* {console.log("select rate value" + validation.values.rate, selectedRate, selectedType)} */}
                  {selectedType === "0" && selectedRate !== "" ? (
                    // <Row>
                    <Col lg={6}>
                      <Card>
                        <CardBody>
                          <span>Graphical representation of SHARE</span>
                          <CardTitle className="mb-4">
                            (MRP: {selectedRate}){" "}
                          </CardTitle>
                          <PieChart
                            broadPercent={broadPercent}
                            msoPercent={msoPercent}
                            discountPercent={discountPercent}
                            selectedRate={selectedRate}
                            dataColors='["--bs-success","--bs-primary", "--bs-danger","--bs-info", "--bs-warning"]'
                          />
                        </CardBody>
                      </Card>
                    </Col>
                  ) : (
                    <></>
                  )}
                </Row>
              </div>
            )}
          </Row>

          <div
            style={{
              // margin: "20px 0px",
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
            <h5 style={{}}>Selected Channels</h5>
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
              <AddChannels
                channels={channels}
                setChannels={setChannels}
                selectedType={selectedType}
                selectedBroadcaster={selectedBroadcaster}
                updateList={setChannels}
                broadcasterBouquetAddchannels={broadcasterBouquetAddchannels}
                definition={validation.values.definition}
              />
            </Col>
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
                    toggleAddModal();
                  }}
                >
                  Cancel
                </button>
              </ModalFooter>
            </Col>
          </Row>
        </Form>
      </ModalBody>
      {/* </Modal> */}
    </Modal>
  );
};

AddNewBroadcasterBouquetList.propTypes = {
  toggleAddModal: PropTypes.func,
  isOpen: PropTypes.bool,

  broadcasterBouquetAddchannels: PropTypes.array,
  broadcasterBouquetType: PropTypes.array,
  broadcasterBouquetBroadcaster: PropTypes.array,
  broadcasterBouquetStatus: PropTypes.array,
  broadcasterBouquetDefinition: PropTypes.array,

};

export default AddNewBroadcasterBouquetList;
