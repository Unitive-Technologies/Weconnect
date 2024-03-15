import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  Col,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
  FormFeedback,
  Input,
  Form,
  Card,
  CardBody,
  Table,
} from "reactstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  updateConnectionScheme as onUpdateConnectionscheme,
  getConnectionScheme as onGetConnectionScheme,
} from "/src/store/connectionschemelist/actions";
import { useDispatch } from "react-redux";
import AddBrands from "./AddBrands";
import ShowHistoryModal from "./ShowHistoryModal";

const ViewConnectionScheme = (props) => {
  const { isOpen, toggle, Connectionscheme, connectboxtype, connectstatus } =
    props;
  console.log(
    "Connectionscheme in view modal:" + JSON.stringify(Connectionscheme)
  );
  const dispatch = useDispatch();
  const [showEditConnectionScheme, setShowEditConnectionScheme] =
    useState(false);
  const [brands, setBrands] = useState();
  const [showHistory, setShowHistory] = useState(false);

  const toggleHistoryModal = () => {
    setShowHistory(!showHistory);
  };

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      name: (Connectionscheme && Connectionscheme.name) || "",
      isHD: (Connectionscheme && Connectionscheme.isHD) || "",
      hardware_charge:
        (Connectionscheme && Connectionscheme.hardware_charge) || "",
      installation_charge:
        (Connectionscheme && Connectionscheme.installation_charge) || "",
      description: (Connectionscheme && Connectionscheme.description) || "",
      status: (Connectionscheme && Connectionscheme.status) || "",
      brands: (Connectionscheme && Connectionscheme.stbbrands) || [],
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Enter Scheme name"),
      isHD: Yup.string().required("Select type"),
      description: Yup.string().required("Enter Scheme description"),
      status: Yup.string().required("Select Status"),
    }),
    onSubmit: (values) => {
      const stbBrands = Array.isArray(values["brands"])
        ? values["brands"].map((single) => single.id)
        : [];
      console.log("Post values: ", values);
      const updateConnectionScheme = {
        id: Connectionscheme.id,
        name: values["name"],
        isHD: parseInt(values["isHD"]),
        status: parseInt(values["status"]),
        hardware_charge: values["hardware_charge"],
        installation_charge: values["installation_charge"],
        description: values["description"],
        stbbrands: stbBrands,
      };

      console.log("UPDATED ConnectionScheme:" + updateConnectionScheme);
      dispatch(onUpdateConnectionscheme(updateConnectionScheme));
      dispatch(onGetConnectionScheme());
      validation.resetForm();
      handleCancel();
    },
    onReset: (values) => {
      validation.setValues(validation.initialValues);
    },
  });

  const handleCancel = () => {
    setShowEditConnectionScheme(false);
    toggle();
  };
  return (
    <>
      {showHistory && (
        <ShowHistoryModal
          isOpen={showHistory}
          toggleHistoryModal={toggleHistoryModal}
          Connectionscheme={Connectionscheme}
        />
      )}
      <Modal
        isOpen={isOpen}
        size="xl"
        role="dialog"
        autoFocus={true}
        centered={true}
        className="exampleModal"
        tabIndex="-1"
        toggle={handleCancel}
      >
        <ModalHeader toggle={handleCancel} tag="h4">
          {!showEditConnectionScheme
            ? `View ${(Connectionscheme && Connectionscheme.name) || ""}`
            : `Edit ${(Connectionscheme && Connectionscheme.name) || ""}`}
        </ModalHeader>
        {!showEditConnectionScheme && (
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
              onClick={() => setShowEditConnectionScheme(true)}
            >
              <i className="mdi mdi-pencil-outline"></i>
            </Link>
          </>
        )}
        <ModalBody>
          <Form
            onSubmit={(e) => {
              // console.log("Submitted in connection scheme");
              e.preventDefault();
              validation.handleSubmit();
              return false;
            }}
          >
            <Row>
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
                    disabled={!showEditConnectionScheme}
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
              <Col sm="4">
                <div className="mb-3">
                  <Label className="form-label">
                    Type<span style={{ color: "red" }}>*</span>
                  </Label>
                  <Input
                    name="isHD"
                    type="select"
                    placeholder="Enter code"
                    className="form-select"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.isHD || ""}
                    disabled={!showEditConnectionScheme}
                    invalid={
                      validation.touched.type && validation.errors.type
                        ? true
                        : false
                    }
                  >
                    {connectboxtype &&
                      connectboxtype.map((type) => (
                        <option key={type.id} value={type.id}>
                          {type.name}
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
                    disabled={!showEditConnectionScheme}
                    invalid={
                      validation.touched.status && validation.errors.status
                        ? true
                        : false
                    }
                  >
                    {connectstatus &&
                      connectstatus.map((status) => (
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
              <Col sm="4">
                <div className="mb-3">
                  <Label className="form-label">
                    Hardware Charge<span style={{ color: "red" }}>*</span>
                  </Label>
                  <Input
                    name="hardware_charge"
                    type="text"
                    placeholder="Enter hardware charge"
                    // className="form-select"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.hardware_charge || ""}
                    disabled={!showEditConnectionScheme}
                  ></Input>
                  {validation.touched.hardware_charge &&
                  validation.errors.hardware_charge ? (
                    <FormFeedback type="invalid">
                      {validation.errors.hardware_charge}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Col sm="4">
                <div className="mb-3">
                  <Label className="form-label">
                    Installation Charge<span style={{ color: "red" }}>*</span>
                  </Label>
                  <Input
                    name="installation_charge"
                    type="text"
                    placeholder="Enter installation charge"
                    // className="form-select"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.installation_charge || ""}
                    disabled={!showEditConnectionScheme}
                  ></Input>
                  {validation.touched.installation_charge &&
                  validation.errors.installation_charge ? (
                    <FormFeedback type="invalid">
                      {validation.errors.installation_charge}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
              {/* </Row>
          <Row> */}
              <Col sm="4">
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
                    disabled={!showEditConnectionScheme}
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
            <div
              style={{
                // margin: "20px 0px",
                marginTop: "20px",
                marginBottom: "18px",
                zIndex: 12000,
                backgroundColor: "#fff",
                width: "fit-content",
                marginLeft: "42%",

                position: "absolute",
                padding: "0px 10px",
              }}
            >
              <h5 style={{}}>Add Brands</h5>
            </div>
            {!showEditConnectionScheme ? (
              <Row
                style={{
                  position: "relative",
                  border: "1px solid #ced4da",
                  padding: "20px 0px",
                  margin: "30px 0px",
                }}
              >
                <Card>
                  <CardBody>
                    <div className="table-responsive">
                      <Table className="table mb-0">
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Brand Name</th>
                            <th>Box Type</th>
                            <th>CAS</th>
                            <th>Brand Type</th>
                            <th>$</th>
                          </tr>
                        </thead>
                        <tbody>
                          {validation.values.brands &&
                            validation.values.brands.map((item, index) => (
                              <tr key={index} className="disabled-row">
                                <th scope="row">{index + 1}</th>
                                <td>{item.name}</td>
                                <td>{item.box_type_lbl}</td>
                                <td>{item.cas_lbl}</td>
                                <td>{item.type_lbl}</td>
                                <td>
                                  <Link
                                    className="text-dark disabled"
                                    // onClick={() => deleteMultipleNcf(index)}
                                  >
                                    <i
                                      className="mdi mdi-delete font-size-18"
                                      id="deletetooltip"
                                    />
                                  </Link>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </Table>
                    </div>
                  </CardBody>
                </Card>
              </Row>
            ) : (
              <Row
                style={{
                  position: "relative",
                  border: "1px solid #ced4da",
                  padding: "20px 0px",
                  margin: "30px 0px",
                }}
              >
                <Col sm="12">
                  <AddBrands
                    brands={validation.values.brands}
                    setBrands={setBrands}
                    isHD={validation.values.isHD}
                  />
                </Col>
                <p>
                  *If no brand selected, this bouquet will be available for all
                  STB brands
                </p>
              </Row>
            )}
            {showEditConnectionScheme && (
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
      </Modal>
    </>
  );
};

ViewConnectionScheme.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default ViewConnectionScheme;
