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
import { getChannelList as onGetChannelList, addNewChannelList as onAddNewChannelList } from "/src/store/channel/actions";
import { useDispatch } from "react-redux";
import CasList from "./CasList";
import PieChart from "./PieChart";

const AddNewChannelList = (props) => {
  const { isOpen, toggleAddModal, channelListBroadcaster, channelListStatus, channelListType, channelListDefinition, channelListGenre, channelListCascode, channelListLanguage, } = props;
  const dispatch = useDispatch();

  const [casCodeList, setCasCodeList] = useState([]);

  const [selectedType, setSelectedType] = useState("");

  const [selectedRate, setSelectedRate] = useState("");

  const handleInputChange = (e) => {
    const inputValue = parseFloat(e.target.value);
    setSelectedRate(inputValue >= 0 ? inputValue : "");
  };

  const handleArrowKeyPress = (e) => {
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      e.preventDefault(); // Prevent the default behavior of arrow keys in number input

      const increment = e.key === 'ArrowUp' ? 1 : -1;
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
      logo: "",
      name: "",
      description: "",
      definition: "",
      isFta: "",
      broadcaster: "",
      genre: "",
      language: "",
      isalacarte: "",
      rate: "",
      status: "",
      cas: "",
      // type: "",
      cascode: "",
      serviceid: "",
      created_by: "Admin",
    },
    validationSchema: Yup.object({
      code: Yup.string().required("Enter Channel Code"),
      logo: Yup.string().required("upload logo"),
      name: Yup.string().required("Enter channel name"),
      description: Yup.string().required("Enter description"),
      definition: Yup.string().required("Enter channel definition"),
      isFta: Yup.string().required("Enter channel type"),
      // type: Yup.string().required("Enter channel type"),
      broadcaster: Yup.string().required("select broadcaster"),
      genre: Yup.string().required("Enter genre"),
      language: Yup.string().required("Select language"),
      isalacarte: Yup.string().required(""),
      rate: Yup.string().required(""),
      status: Yup.string().required("Enter status"),
      cas: Yup.string().required("Enter cas"),
      casCodes: Yup.string().required("cascode"),
      serviceid: Yup.string().required("serviceid"),
    }),
    onSubmit: (values) => {
      const newChannelList = {
        code: values["code"],
        logo: values["logo"],
        name: values["name"],
        description: values["description"],
        definition: values["definition"],
        isFta: values["isFta"],
        broadcaster: values["broadcaster"],
        genre: values["genre"],
        language: values["language"],
        isalacarte: values["isalacarte"],
        rate: values["rate"],
        // type: values["type"],
        status: values["status"],
        cas: values["cas"],
        casCodes: casCodeList,
        serviceid: values["serviceid"],
        created_at: new Date(),
        created_by: values["created_by"],
      };

      console.log("newChannelList:" + newChannelList);
      // save new user
      dispatch(onAddNewChannelList(newChannelList));
      dispatch(onGetChannelList());
      validation.resetForm();
      toggleAddModal();
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

            <Col lg={2}>
              <div className="form-check form-switch form-switch-lg mb-3">
                NCF:
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
                  No / Yes
                </label>
              </div>
            </Col>
          </Row>
          <Row>
            <Col lg={2}>
              <div className="mb-3">
                <Label className="form-label">Logo</Label>
                <Input
                  style={{
                    width: "170px",
                    height: "150px",
                    borderRadius: "10px",
                  }}
                  name="logo"
                  type="text"
                  // placeholder="Enter channel code"
                  // className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.logo || ""}
                ></Input>
                {validation.touched.logo && validation.errors.logo ? (
                  <FormFeedback type="invalid">
                    {validation.errors.logo}
                  </FormFeedback>
                ) : null}
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
              {/* </Col>
            <Col lg={4}> */}
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

            <Col lg={4}>
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
              {/* </Col>
            <Col sm="4"> */}
              <div className="mb-3">
                <Label className="form-label">
                  Type<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="isFta"
                  type="select"
                  placeholder="Select type"
                  className="form-select"
                  onChange={(e) => {
                    validation.handleChange(e);
                    setSelectedType(e.target.value);
                  }}
                  onBlur={validation.handleBlur}
                  value={validation.values.isFta || ""}
                >
                  <option value="">Select type</option>
                  {channelListType && channelListType.map((isFta) => (
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
                >
                  <option value="">Select Broadcaster</option>
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
                >
                  <option value="">Select Genre</option>
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
                <Input
                  name="language"
                  type="select"
                  placeholder="Select language"
                  // className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.language || ""}
                >
                  <option value="">Select Language</option>
                  {channelListLanguage &&
                    channelListLanguage.map((language) => (
                      <option key={language.id} value={language.id}>
                        {language.name}
                      </option>
                    ))}
                </Input>
                {validation.touched.language && validation.errors.language ? (
                  <FormFeedback type="invalid">
                    {validation.errors.language}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
            <Col sm="4">
              <div className="mb-3">
                <Label className="form-label">IsAlacarte</Label>
                <Input
                  name="isalacarte"
                  type="select"
                  // placeholder="Enter channel code"
                  // className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.isalacarte || ""}
                >
                  <option value="201">Yes</option>
                  <option value="202">No</option>
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
                  value={selectedRate}
                ></Input>
                {/* Validation and error handling code here */}
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
          <div>
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
                  <Col sm="12">
                    <RevenueShare />
                  </Col>
                </Row>
              </div>
            )}
            {selectedRate === "0" && (
              <Row>
                <Col lg={6}>
                  <Card>
                    <CardBody>
                      <span>Graphical representation of SHARE</span>
                      <CardTitle className="mb-4">(MRP: 15) </CardTitle>
                      <PieChart dataColors='["--bs-success","--bs-primary", "--bs-danger","--bs-info", "--bs-warning"]' />
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            )}
          </div>
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
              <CasList isOpen={handleUpdateCasList} data={casCodeList} updateList={setCasCodeList} channelListCascode={channelListCascode} />
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
