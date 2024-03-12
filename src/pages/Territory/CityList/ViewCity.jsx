import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  Col,
  Row,
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Label,
  FormFeedback,
  Input,
  Form,
} from "reactstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { updateCity as onUpdateCity } from "/src/store/city/actions";
import {
  getCity as onGetCity,
  getDistrictByStateid as onGetDistrictByStateid,
} from "/src/store/actions";
import ShowHistoryModal from "./ShowHistoryModal";

const ViewCity = (props) => {
  const { isOpen, handleViewCity, city, status, statelist, districtlist } =
    props;
  const dispatch = useDispatch();
  const [showEditCity, setShowEditCity] = useState(false);

  const [showHistory, setShowHistory] = useState(false);

  const toggleHistoryModal = () => {
    setShowHistory(!showHistory);
  };

  const handleCancel = () => {
    setShowEditCity(false);
    handleViewCity();
  };

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      id: (city && city.id) || "",
      name: (city && city.name) || "",
      state_lbl: (city && city.state_lbl) || "",
      district_lbl: (city && city.district_lbl) || "",
      status: (city && city.status) || "",
      description: (city && city.description) || "",
      created_at: (city && city.created_at) || "",
      created_by: (city && city.created_by) || "my mso(mso)",
      state_id: (city && city.state_id) || "",
      type: (city && city.type) || 3,
      district_id: (city && city.district_id) || "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Enter district name"),
      state_id: Yup.string().required("Select state"),
      district_id: Yup.string().required("Select district"),
      status: Yup.string().required("Select status"),
      description: Yup.string().required("Enter description"),
    }),
    onSubmit: (values) => {
      const updateCity = {
        id: values["id"],
        district_lbl: values["district_lbl"],
        name: values["name"],
        state_lbl: values["state_lbl"],
        status: values["status"],
        description: values["description"],
        created_at: new Date(),
        created_by: values["created_by"],
        state_id: values["state_id"],
        type: values["type"],
        district_id: values["district_id"],
      };
      console.log("Updated City:" + updateCity);
      dispatch(onUpdateCity(updateCity));
      dispatch(onGetCity());
      validation.resetForm();
      handleCancel();
    },
  });

  useEffect(() => {
    dispatch(onGetDistrictByStateid(validation.values.state_id));
  }, [dispatch, validation.values.state_id]);

  return (
    <>
      {showHistory && (
        <ShowHistoryModal
          isOpen={showHistory}
          toggleHistoryModal={toggleHistoryModal}
          city={city}
        />
      )}
      <Modal
        isOpen={isOpen}
        role="dialog"
        size="xl"
        autoFocus={true}
        centered={true}
        className="exampleModal"
        tabIndex="-1"
        toggle={handleCancel}
      >
        <ModalHeader toggle={handleCancel} tag="h4">
          {!showEditCity
            ? `View ${(city && city.name) || ""}`
            : `Edit ${(city && city.name) || ""}`}
        </ModalHeader>
        {!showEditCity && (
          <>
            <Link
              style={{
                position: "absolute",
                marginLeft: "92%",
                marginTop: "1%",
              }}
              to="#!"
              className="btn btn-light me-1"
              onClick={() => setShowHistory(true)}
            >
              <i className="dripicons-briefcase" />
            </Link>
            <Link
              style={{
                position: "absolute",
                marginLeft: "87%",
                marginTop: "1%",
              }}
              to="#!"
              className="btn btn-light me-1"
              onClick={() => setShowEditCity(true)}
            >
              <i className="mdi mdi-pencil-outline"></i>
            </Link>
          </>
        )}
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
                    City Name<span style={{ color: "red" }}>*</span>
                  </Label>
                  <Input
                    name="name"
                    type="text"
                    placeholder="Enter city name"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.name || ""}
                    disabled={!showEditCity}
                    invalid={
                      validation.touched.name && validation.errors.name
                        ? true
                        : false
                    }
                  />
                  {validation.touched.name && validation.errors.name ? (
                    <FormFeedback type="invalid">
                      {validation.errors.name}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Col lg={4}>
                <div className="mb-3">
                  <Label className="form-label">
                    State<span style={{ color: "red" }}>*</span>
                  </Label>
                  <Input
                    name="state_id"
                    type="select"
                    placeholder="Select state"
                    className="form-select"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.state_id || ""}
                    disabled={!showEditCity}
                  >
                    {statelist.map((options) => (
                      <option key={options.id} value={options.id}>
                        {options.name}
                      </option>
                    ))}
                  </Input>
                  {validation.touched.state_id && validation.errors.state_id ? (
                    <FormFeedback type="invalid">
                      {validation.errors.state_id}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Col lg={4}>
                <div className="mb-3">
                  <Label className="form-label">
                    District<span style={{ color: "red" }}>*</span>
                  </Label>
                  <Input
                    name="district_id"
                    type="select"
                    placeholder="Select state"
                    className="form-select"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.district_id || ""}
                    disabled={!showEditCity}
                  >
                    {districtlist.map((options) => (
                      <option key={options.id} value={options.id}>
                        {options.name}
                      </option>
                    ))}
                  </Input>
                  {validation.touched.district_id &&
                  validation.errors.district_id ? (
                    <FormFeedback type="invalid">
                      {validation.errors.district_id}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
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
                    disabled={!showEditCity}
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
                    disabled={!showEditCity}
                  >
                    {status.map((options) => (
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
            {showEditCity && (
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
                        handleCancel();
                      }}
                    >
                      Cancel
                    </button>
                  </ModalFooter>
                </Col>
              </Row>
            )}
          </Form>
        </ModalBody>
        {/* </Modal> */}
      </Modal>
    </>
  );
};

ViewCity.propTypes = {
  handleViewCity: PropTypes.func,
  isOpen: PropTypes.bool,
  city: PropTypes.array,
  status: PropTypes.array,
  statelist: PropTypes.array,
  districtlist: PropTypes.array,
};

export default ViewCity;
