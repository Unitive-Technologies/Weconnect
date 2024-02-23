import React, { useState } from "react";
import PropTypes from "prop-types";
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
} from "reactstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import { addConnectionscheme as onAddConnectionscheme } from "/src/store/connectionschemelist/actions";
import { useDispatch } from "react-redux";
import AddBrands from "../BouquetList/AddBrands";

const ViewConnectionScheme = (props) => {
  const { isOpen, toggle, Connectionscheme, connectboxtype, connectstatus } =
    props;
  console.log(
    "Connectionscheme in view modal:" + JSON.stringify(Connectionscheme)
  );
  const dispatch = useDispatch();
  const [showEditConnectionScheme, setShowEditConnectionScheme] =
    useState(false);
  const [brands, setBrands] = useState(
    (Connectionscheme && Connectionscheme.stbbrands) || []
  );
  const editToggle = () => {
    setShowEditConnectionScheme(false);
    toggle();
  };

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      name: (Connectionscheme && Connectionscheme.name) || "",
      isHD: (Connectionscheme && Connectionscheme.boxtype_lbl) || "",
      hardware_charge:
        (Connectionscheme && Connectionscheme.hardware_charge) || "",
      installation_charge:
        (Connectionscheme && Connectionscheme.installation_charge) || "",
      description: (Connectionscheme && Connectionscheme.description) || "",
      status: (Connectionscheme && Connectionscheme.status) || "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Enter name"),
      // code: Yup.string().required("Enter code"),
      // boxtype_lbl: Yup.string().required("Select scheme type"),
      // hardware_charge: Yup.string().required("Enter hardware charge"),
      // installation_charge: Yup.string().required("Enter installation charge"),
      // description: Yup.string().required("Enter description"),
      // status: Yup.string().required("select status"),
    }),
    onSubmit: (values) => {
      console.log("Post values: ", values);
      const newConnectionScheme = {
        id: Connectionscheme.id,
        name: values["name"],
        isHD: parseInt(values["isHD"]),
        status: parseInt(values["status"]),
        hardware_charge: values["hardware_charge"],
        installation_charge: values["installation_charge"],
        description: values["description"],
        stbbrands: brands.map((single) => single.id),
      };
      console.log("newConnectionScheme:" + newConnectionScheme);
      dispatch(onAddConnectionscheme(newConnectionScheme));
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
      size="xl"
      role="dialog"
      autoFocus={true}
      centered={true}
      className="exampleModal"
      tabIndex="-1"
      toggle={toggle}
    >
      {!showEditConnectionScheme ? (
        <ModalHeader toggle={toggle} tag="h4">
          View Connection Scheme Details
          <i
            className="bx bx bxs-edit"
            style={{
              position: "absolute",
              marginLeft: "65%",
              cursor: "pointer",
              marginTop: ".5%",
            }}
            onClick={() => setShowEditConnectionScheme(true)}
          ></i>
        </ModalHeader>
      ) : (
        <ModalHeader toggle={editToggle} tag="h4">
          Edit Connection Scheme
        </ModalHeader>
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
          </Row>
          <Row>
            <Col sm="8">
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
                brands={brands}
                setBrands={setBrands}
                isHD={validation.values.isHD}
              />
            </Col>
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

ViewConnectionScheme.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default ViewConnectionScheme;
