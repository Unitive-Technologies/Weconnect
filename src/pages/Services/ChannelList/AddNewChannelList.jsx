import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Col,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  CardBody,
  Label,
  FormFeedback,
  Input,
  CardTitle,
  Card,
  Form,
} from "reactstrap";
import RevenueShare from "./RevenueShare";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  getChannelList as onGetChannelList,
  addNewChannelList as onAddNewChannelList,
} from "/src/store/channel/actions";
import { useDispatch } from "react-redux";
import CasList from "./CasList";
import PieChart from "./PieChart";
import Select from "react-select";

const AddNewChannelList = (props) => {
  const {
    isOpen,
    toggleAddModal,
    channelListBroadcaster,
    channelListStatus,
    channelListType,
    channelListDefinition,
    channelListGenre,
    channelListCascode,
    channelListLanguage,
  } = props;
  const dispatch = useDispatch();

  const [broadPercent, setBroadPercent] = useState(80);
  const [msoPercent, setMsoPercent] = useState(20);
  const [discountPercent, setDiscountPercent] = useState(0);
  const [toggleSwitch, settoggleSwitch] = useState(true);
  const [casCodeList, setCasCodeList] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const [toggleNcfSwitch, setToggleNcfSwitch] = useState(true);
  const [selectedRate, setSelectedRate] = useState(0);

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    // setSelectedRate(inputValue >= 0 ? inputValue : 0);
    console.log("Input value: ", inputValue);
    setSelectedRate(inputValue);
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
    const selectedOptions = Array.from(e.target.selectedOptions, (option) =>
      parseInt(option.value)
    );

    setSelectedLanguages(selectedOptions);
  };

  const handleArrowKeyPress = (e) => {
    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      e.preventDefault(); // Prevent the default behavior of arrow keys in number input

      const increment = e.key === "ArrowUp" ? 1 : -1;
      const currentRate = parseFloat(selectedRate) || 0;
      const newRate = Math.max(0, currentRate + increment * 0.01);
      console.log("Rate: ", newRate.toFixed(2));
      setSelectedRate(newRate.toFixed(2));
    }
  };

  const handleToggle = () => {
    toggleAddModal();
    // toggleNcfSwitch()
  };

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      code: "",
      type: "",
      logo: { name: "", type: "", ext: "", data: "" },
      name: "",
      description: "",
      definition: "",
      isFta: "",
      isNCF: "",
      broadcaster: "",
      genre: "",
      language_id: [],
      isalacarte: 1,
      rate: "",
      status: "",
      isHD: "",
      revenue_share: {},
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required("Enter channel name")
        .min(2, "Minimum length 2 character"),
      description: Yup.string()
        .required("Enter channel description")
        .min(2, "Please enter at least 2 characters"),
      definition: Yup.string().required("Select channel definition"),
      isFta: Yup.string().required("Select channel type"),
      broadcaster: Yup.string().required("Select broadcaster"),
      genre: Yup.string().required("Select genre"),
      // language: Yup.array().min(1, "Select Atleat one language"),
      status: Yup.string().required("Select status"),
    }),
    onSubmit: (values) => {
      const newChannelList = {
        broadcasterRate: parseInt(selectedRate),
        broadcaster_id: parseInt(values["broadcaster"]),
        casCodes: casCodeList.map((single) => {
          return {
            cas_id: single.cas_id,
            cascode: single.cascode,
            serviceid: single.serviceid,
          };
        }),
        code: values["code"],
        description: values["description"],
        genre_id: parseInt(values["genre"]),
        isAlacarte: parseInt(values["isalacarte"]),
        isFta: parseInt(values["isFta"]),
        isHD: parseInt(values["definition"]),
        isNCF: toggleNcfSwitch === true ? 1 : 0,
        language_id: values["language_id"],
        logo: values["logo"],
        name: values["name"],
        revenue_share: {
          mso_share: msoPercent,
          mso_discount: discountPercent,
          broadcaster_share: broadPercent,
        },
        status: parseInt(values["status"]),
      };
      console.log("newChannelList:" + JSON.stringify(newChannelList));
      dispatch(onAddNewChannelList(newChannelList));
      dispatch(onGetChannelList());
      validation.resetForm();
      toggleAddModal();
      settoggleSwitch(!toggleSwitch);
    },
    onReset: (values) => {
      validation.setValues(validation.initialValues);
    },
  });

  const handleUpdateCasList = (casList) => {
    setCasCodeList(casList);
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
        Add New Channel
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
                <Label className="form-label">Channel Code</Label>
                <Input
                  name="code"
                  type="text"
                  placeholder="Enter channnel code"
                  disabled={toggleSwitch}
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
            <Col sm="3">
              <div className="mb-3">
                <Label className="form-label"></Label>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <label style={{ marginRight: "10px" }}>Custom</label>
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
              </div>
            </Col>
            <Col sm="3">
              <div className="mb-3">
                <Label className="form-label">
                  NCF
                  <i className="mdi mdi-information"></i>
                </Label>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <label style={{ marginRight: "10px" }}>No</label>
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
                      Yes
                    </label>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col lg={2}>
              <div className="mb-3">
                <Label className="form-label">Logo</Label>
                <input
                  style={{
                    width: "170px",
                    height: "150px",
                    borderRadius: "10px",
                  }}
                  name="logo"
                  type="file"
                  onChange={handleChangeLogo}
                ></input>
                <button
                  type="button"
                  className="btn btn-primary "
                  style={{ marginTop: "10px" }}
                >
                  Upload Logo
                </button>
              </div>
            </Col>
            <Col lg={4}>
              <div className="mb-3">
                <Label className="form-label">
                  Channel Name<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="name"
                  type="text"
                  placeholder="Enter channel name"
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

            <Col lg={4}>
              <div className="mb-3">
                <Label className="form-label">
                  Channel Definition<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="definition"
                  type="select"
                  placeholder="Select channel definition"
                  className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.definition || ""}
                  invalid={
                    validation.touched.definition &&
                    validation.errors.definition
                      ? true
                      : false
                  }
                >
                  <option value="">Select channel definition</option>
                  {channelListDefinition &&
                    channelListDefinition.map((definition) => (
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
              <div className="mb-3">
                <Label className="form-label">
                  Channel Type<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="isFta"
                  type="select"
                  placeholder="Select channel type"
                  className="form-select"
                  onChange={(e) => {
                    validation.handleChange(e);
                    setSelectedType(e.target.value);
                  }}
                  onBlur={validation.handleBlur}
                  value={validation.values.isFta || ""}
                  invalid={
                    validation.touched.isFta && validation.errors.isFta
                      ? true
                      : false
                  }
                >
                  <option>Select channel type</option>
                  {channelListType &&
                    channelListType.map((isFta) => (
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
          </Row>
          <Row>
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
                  invalid={
                    validation.touched.broadcaster &&
                    validation.errors.broadcaster
                      ? true
                      : false
                  }
                >
                  <option value="">Select broadcaster</option>
                  {channelListBroadcaster &&
                    channelListBroadcaster.map((broadcaster) => (
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
                  Genre<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="genre"
                  type="select"
                  placeholder="Select genre"
                  className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.genre || ""}
                  invalid={
                    validation.touched.genre && validation.errors.genre
                      ? true
                      : false
                  }
                >
                  <option value="">Select genre</option>
                  {channelListGenre &&
                    channelListGenre.map((genre) => (
                      <option key={genre.id} value={genre.id}>
                        {genre.name}
                      </option>
                    ))}
                </Input>
                {validation.touched.genre && validation.errors.genre ? (
                  <FormFeedback type="invalid">
                    {validation.errors.genre}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
            <Col sm="4">
              <div className="mb-3">
                <Label className="form-label">
                  Language<span style={{ color: "red" }}>*</span>
                </Label>
                <Select
                  name="language_id"
                  placeholder="Select language"
                  onChange={(selectedOptions) => {
                    validation.setFieldValue(
                      "language_id",
                      selectedOptions
                        ? selectedOptions.map((option) => option.value)
                        : []
                    );
                  }}
                  onBlur={validation.handleBlur}
                  options={channelListLanguage.map((language) => ({
                    value: language.id,
                    label: language.name,
                  }))}
                  isMulti
                  styles={{
                    menu: (provided) => ({ ...provided, maxHeight: "300px" }),
                    menuList: (provided) => ({
                      ...provided,
                      maxHeight: "300px",
                    }),
                  }}
                  invalid={
                    validation.touched.language_id &&
                    validation.errors.language_id
                      ? true
                      : false
                  }
                />
              </div>
              {validation.touched.language_id &&
              validation.errors.language_id ? (
                <FormFeedback type="invalid">
                  {validation.errors.language_id}
                </FormFeedback>
              ) : null}
            </Col>
            {console.log("language_id:" + validation.values.language_id)}
            <Col sm="4">
              <div className="mb-3">
                <Label className="form-label">IsAlacarte</Label>
                <Input
                  name="isalacarte"
                  type="select"
                  // placeholder="Enter channel code"
                  className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.isalacarte || ""}
                >
                  <option value="1">Yes</option>
                  <option value="0">No</option>
                </Input>
                {validation.touched.isalacarte &&
                validation.errors.isalacarte ? (
                  <FormFeedback type="invalid">
                    {validation.errors.isalacarte}
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
                  disabled={
                    selectedType === "1" || validation.values.isalacarte === "0"
                  }
                  value={selectedRate}
                  onBlur={validation.handleBlur}
                ></Input>
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
                  placeholder="Select status"
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
                  {channelListStatus &&
                    channelListStatus.map((status) => (
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
          {/* <PieChart /> */}
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
            <h5 style={{}}>CAS LIST</h5>
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
              <CasList
                isOpen={Boolean(handleUpdateCasList)}
                data={casCodeList}
                updateList={setCasCodeList}
                channelListCascode={channelListCascode}
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
    </Modal>
  );
};

AddNewChannelList.propTypes = {
  toggleAddModal: PropTypes.func,
  isOpen: PropTypes.bool,
  channelListBroadcaster: PropTypes.array,
  channelListDefinition: PropTypes.array,
  channelListGenre: PropTypes.array,
  channelListLanguage: PropTypes.array,
  channelListCascode: PropTypes.array,
  channelListStatus: PropTypes.array,
  channelListType: PropTypes.array,
};

export default AddNewChannelList;
