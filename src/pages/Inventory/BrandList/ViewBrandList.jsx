import React, { useState } from "react";
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
import ShowHistoryModal from "./ShowHistoryModal";
import { useDispatch } from "react-redux";
import { updateBrandList as onUpdateBrandList } from "/src/store/brandlist/actions";
import brandList from "./brandList";


const ViewBrandList = (props) => {
  const { isOpen, handleViewBrand, brand, brandBoxType, brandBrandType, brandCasType, brandCharacters, brandStatus } = props;
  console.log("view Brnad in view modal:" + JSON.stringify(brand));

  const dispatch = useDispatch();
  const [showEditBrand, setShowEditBrand] = useState(false);

  const [showHistory, setShowHistory] = useState(false);

  const toggleHistoryModal = () => {
    setShowHistory(!showHistory);
  };

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      id: (brand && brand.id) || "",
      name: (brand && brand.name) || "",
      //   code: "",
      box_type_lbl: (brand && brand.box_type_lbl) || "",
      brand_type_lbl: (brand && brand.brand_type_lbl) || "",
      length: (brand && brand.length) || "",
      significant_length: (brand && brand.significant_length) || "",
      char_allowed_lbl: (brand && brand.char_allowed_lbl) || "",
      cas_lbl: (brand && brand.cas_lbl) || "",
      status: (brand && brand.status) || "",
      created_at: (brand && brand.created_at) || "",
      created_by: (brand && brand.created_by) || "my mso(mso)",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Enter name"),
      box_type_lbl: Yup.string().required("Select box type"),
      brand_type_lbl: Yup.string().required("Select brand type"),
      cas_lbl: Yup.string().required("Select CAS"),
      length: Yup.string().required("Enter character length"),
      significant_length: Yup.string().required("Enter significant length"),
      char_allowed_lbl: Yup.string().required("Enter allowed characters"),
      status: Yup.string().required("Select status"),
    }),
    onSubmit: (values) => {
      const updateBrandList = {
        id: values["id"],
        name: values["name"],
        box_type_lbl: values["box_type_lbl"],
        brand_type_lbl: values["brand_type_lbl"],
        status: parseInt(values["status"]),
        cas_lbl: values["cas_lbl"],
        length: values["length"],
        significant_length: parseInt(values["significant_length"]),
        char_allowed_lbl: values["char_allowed_lbl"],
        created_at: new Date(),
        created_by: values["created_by"],
      };
      // console.log("Update Brand:" + JSON.stringify(updateBrandList));
      dispatch(onUpdateBrandList(updateBrandList));
      validation.resetForm();
      handleViewBrand();
    },
    onReset: (values) => {
      validation.setValues(validation.initialValues);
    },
  });

  const handleCancel = () => {
    setShowEditBrand(false);
    handleViewBrand();
  };

  return (
    <>
      {showHistory && (
        <ShowHistoryModal
          isOpen={showHistory}
          toggleHistoryModal={toggleHistoryModal}
          brand={brand}
        />
      )}
      <Modal
        isOpen={isOpen}
        role="dialog"
        autoFocus={true}
        centered={true}
        className="exampleModal"
        tabIndex="-1"
        size="xl"
        toggle={handleCancel}
      >
        <ModalHeader toggle={handleCancel} tag="h4">
          {!showEditBrand
            ? `View ${(brand && brand.name) || ""}`
            : `Edit ${(brand && brand.name) || ""}`}
        </ModalHeader>
        {!showEditBrand && (
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
              onClick={() => setShowEditBrand(true)}
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
              <Col sm="4">
                <div className="mb-3">
                  <Label className="form-label">
                    Brand Name<span style={{ color: "red" }}>*</span>
                  </Label>
                  <Input
                    name="name"
                    type="text"
                    placeholder="Enter brand name"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.name || ""}
                    invalid={
                      validation.touched.name && validation.errors.name
                        ? true
                        : false
                    }
                    disabled={!showEditBrand}
                  />
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
                    Brand Type<span style={{ color: "red" }}>*</span>
                  </Label>
                  <Input
                    name="brand_type_lbl"
                    type="select"
                    placeholder="Select brand type"
                    className="form-select"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.brand_type_lbl || ""}
                    disabled={!showEditBrand}
                    invalid={
                      validation.touched.brand_type_lbl && validation.errors.brand_type_lbl
                        ? true
                        : false
                    }
                  >
                    {brandBrandType.map((brand_type_lbl) => (
                      <option key={brand_type_lbl.id} value={brand_type_lbl.id}>
                        {brand_type_lbl.name}
                      </option>
                    ))}
                  </Input>
                  {validation.touched.brand_type_lbl &&
                    validation.errors.brand_type_lbl ? (
                    <FormFeedback type="invalid">
                      {validation.errors.brand_type_lbl}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Col sm="4">
                <div className="mb-3">
                  <Label className="form-label">
                    Box Type<span style={{ color: "red" }}>*</span>
                  </Label>
                  <Input
                    name="box_type_lbl"
                    type="select"
                    placeholder="Select box type"
                    className="form-select"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.box_type_lbl || ""}
                    disabled={!showEditBrand}
                    invalid={
                      validation.touched.box_type_lbl && validation.errors.box_type_lbl
                        ? true
                        : false
                    }
                  >
                    {brandBoxType.map((box_type_lbl) => (
                      <option key={box_type_lbl.id} value={box_type_lbl.id}>
                        {box_type_lbl.name}
                      </option>
                    ))}
                  </Input>
                  {validation.touched.box_type_lbl &&
                    validation.errors.box_type_lbl ? (
                    <FormFeedback type="invalid">
                      {validation.errors.box_type_lbl}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
            </Row>
            <Row>
              <Col sm="4">
                <div className="mb-3">
                  <Label className="form-label">
                    CAS Type
                  </Label>
                  <Input
                    name="cas_lbl"
                    type="select"
                    placeholder="Select CAS"
                    className="form-select"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.cas_lbl || ""}
                    disabled={!showEditBrand}
                    invalid={
                      validation.touched.cas_lbl && validation.errors.cas_lbl
                        ? true
                        : false
                    }
                  >
                    {brandCasType.map((cas_lbl) => (
                      <option key={cas_lbl.id} value={cas_lbl.id}>
                        {cas_lbl.name}
                      </option>
                    ))}
                  </Input>
                  {validation.touched.cas_lbl && validation.errors.cas_lbl ? (
                    <FormFeedback type="invalid">
                      {validation.errors.cas_lbl}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Col sm="4">
                <div className="mb-3">
                  <Label className="form-label">
                    Character Length<span style={{ color: "red" }}>*</span>
                  </Label>
                  <Input
                    name="length"
                    type="text"
                    placeholder="Enter character length"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.length || ""}
                    invalid={
                      validation.touched.length && validation.errors.length
                        ? true
                        : false
                    }
                    disabled={!showEditBrand}
                  />
                  {validation.touched.length && validation.errors.length ? (
                    <FormFeedback type="invalid">
                      {validation.errors.length}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Col sm="4">
                <div className="mb-3">
                  <Label className="form-label">
                    Significant Length<span style={{ color: "red" }}>*</span>
                  </Label>
                  <Input
                    name="significant_length"
                    type="text"
                    placeholder="Enter significant length"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.significant_length || ""}
                    invalid={
                      validation.touched.significant_length &&
                        validation.errors.significant_length
                        ? true
                        : false
                    }
                    disabled={!showEditBrand}
                  />
                  {validation.touched.significant_length &&
                    validation.errors.significant_length ? (
                    <FormFeedback type="invalid">
                      {validation.errors.significant_length}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
            </Row>
            <Row>
              <Col sm="4">
                <div className="mb-3">
                  <Label className="form-label">
                    Allowed Characters<span style={{ color: "red" }}>*</span>
                  </Label>
                  <Input
                    name="char_allowed_lbl"
                    type="select"
                    placeholder="Select allowed characters"
                    className="form-select"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.char_allowed_lbl || ""}
                    disabled={!showEditBrand}
                    invalid={
                      validation.touched.char_allowed_lbl && validation.errors.char_allowed_lbl
                        ? true
                        : false
                    }
                  >
                    {brandCharacters.map((char_allowed_lbl) => (
                      <option key={char_allowed_lbl.id} value={char_allowed_lbl.id}>
                        {char_allowed_lbl.name}
                      </option>
                    ))}
                  </Input>
                  {validation.touched.char_allowed_lbl &&
                    validation.errors.char_allowed_lbl ? (
                    <FormFeedback type="invalid">
                      {validation.errors.char_allowed_lbl}
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
                    disabled={!showEditBrand}
                    invalid={
                      validation.touched.status && validation.errors.status
                        ? true
                        : false
                    }
                  >
                    {brandStatus.map((status) => (
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
            {showEditBrand && (
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

ViewBrandList.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default ViewBrandList;
