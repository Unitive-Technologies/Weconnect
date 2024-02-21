import React, { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import {
  Col,
  Row,
  Modal,
  ModalFooter,
  ModalHeader,
  ModalBody,
  Label,
  FormFeedback,
  Input,
  Form,
} from "reactstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { updateWarehouseList as onUpdateWarehouseList } from "/src/store/warehouse/actions";
import ShowHistoryModal from "./ShowHistoryModal";


const ViewWareHouse = (props) => {

  const { isOpen, handleViewWarehouse, warehouse, warehouseOperator, warehouseStatus } = props;
  console.log("View Ware House in view modal:" + JSON.stringify(warehouse));

  const dispatch = useDispatch();
  const [showEditWarehouse, setShowEditWarehouse] = useState(false);

  const [showHistory, setShowHistory] = useState(false);

  const toggleHistoryModal = () => {
    setShowHistory(!showHistory);
  };

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      id: (warehouse && warehouse.id) || "",
      name: (warehouse && warehouse.name) || "",
      contact_person: (warehouse && warehouse.contact_person) || "",
      mobile_no: (warehouse && warehouse.mobile_no) || "",
      operator_id: (warehouse && warehouse.operator_id) || "",
      description: (warehouse && warehouse.description) || "",
      address: (warehouse && warehouse.address) || "",
      status: (warehouse && warehouse.status) || "",
      created_at: (warehouse && warehouse.created_at) || "",
      created_by: (warehouse && warehouse.created_by) || "NIKHIL REDDY(nikky)",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Enter name"),
      contact_person: Yup.string().required("Enter contact person"),
      mobile_no: Yup.string().required("Enter contact number"),
      operator_id: Yup.string().required("Select operator"),
      description: Yup.string().required("Enter description"),
      address: Yup.string().required("Enter address"),
      status: Yup.string().required("Select status"),
    }),
    onSubmit: (values) => {
      const updateWarehouseList = {
        id: warehouse.id,
        name: values.name,
        contact_person: values.contact_person,
        mobile_no: values.mobile_no,
        status: values.status,
        operator_id: values.operator_id,
        description: values.description,
        address: values.address,
      };
      // console.log("New Warehouse:" + JSON.stringify(updateWarehouseList));
      dispatch(onUpdateWarehouseList(updateWarehouseList));
      validation.resetForm();
      handleViewWarehouse();
    },
    // onReset: (values) => {
    //   validation.setValues(validation.initialValues);
    // },
  });

  const handleCancel = () => {
    setShowEditWarehouse(false);
    handleViewWarehouse();
  };

  return (
    <>
      {showHistory && (
        <ShowHistoryModal
          isOpen={showHistory}
          toggleHistoryModal={toggleHistoryModal}
          warehouse={warehouse}
        />
      )}
      <Modal
        isOpen={isOpen}
        role="dialog"
        autoFocus={true}
        centered={true}
        className="exampleModal"
        tabIndex="-1"
        toggle={handleCancel}
        size="xl"
      >
        <ModalHeader toggle={handleCancel} tag="h4">
          {!showEditWarehouse
            ? `View ${(warehouse && warehouse.name) || ""}`
            : `Edit ${(warehouse && warehouse.name) || ""}`}
        </ModalHeader>
        {!showEditWarehouse && (
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
              onClick={() => setShowEditWarehouse(true)}
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
                    disabled={!showEditWarehouse}
                  />
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
                    Contact Person<span style={{ color: "red" }}>*</span>
                  </Label>
                  <Input
                    name="contact_person"
                    type="text"
                    placeholder="Enter contact person"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.contact_person || ""}
                    invalid={
                      validation.touched.contact_person &&
                        validation.errors.contact_person
                        ? true
                        : false
                    }
                    disabled={!showEditWarehouse}
                  />
                  {validation.touched.contact_person &&
                    validation.errors.contact_person ? (
                    <FormFeedback type="invalid">
                      {validation.errors.contact_person}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Col sm="3">
                <div className="mb-3">
                  <Label className="form-label">
                    Contact No.<span style={{ color: "red" }}>*</span>
                  </Label>
                  <Input
                    name="mobile_no"
                    type="text"
                    placeholder="Enter contact number"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.mobile_no || ""}
                    invalid={
                      validation.touched.mobile_no && validation.errors.mobile_no
                        ? true
                        : false
                    }
                    disabled={!showEditWarehouse}
                  />
                  {validation.touched.mobile_no && validation.errors.mobile_no ? (
                    <FormFeedback type="invalid">
                      {validation.errors.mobile_no}
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
                    placeholder="Select status"
                    className="form-select"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.status || ""}
                    disabled={!showEditWarehouse}
                  >
                    <option value=""></option>
                    {warehouseStatus.map((status) => (
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
              <Col sm="3">
                <div className="mb-3">
                  <Label className="form-label">
                    Operator<span style={{ color: "red" }}>*</span>
                  </Label>
                  <Input
                    name="operator_id"
                    type="select"
                    placeholder="Select operator"
                    className="form-select"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.operator_id || ""}
                    disabled={!showEditWarehouse}
                  >
                    {warehouseOperator.map((operator_id) => (
                      <option key={operator_id.id} value={operator_id.id}>
                        {operator_id.name}
                      </option>
                    ))}
                  </Input>
                  {validation.touched.operator_id && validation.errors.operator_id ? (
                    <FormFeedback type="invalid">
                      {validation.errors.operator_id}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Col sm="3">
                <div className="mb-3">
                  <Label className="form-label">
                    Description<span style={{ color: "red" }}>*</span>
                  </Label>
                  <Input
                    name="description"
                    type="textarea"
                    placeholder="Enter description"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.description || ""}
                    invalid={
                      validation.touched.description &&
                        validation.errors.description
                        ? true
                        : false
                    }
                    disabled={!showEditWarehouse}
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
                    Address<span style={{ color: "red" }}>*</span>
                  </Label>
                  <Input
                    name="address"
                    type="text"
                    placeholder="Enter address"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.address || ""}
                    invalid={
                      validation.touched.address && validation.errors.address
                        ? true
                        : false
                    }
                    disabled={!showEditWarehouse}
                  />
                  {validation.touched.address && validation.errors.address ? (
                    <FormFeedback type="invalid">
                      {validation.errors.address}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
            </Row>
            {showEditWarehouse && (
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

ViewWareHouse.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default ViewWareHouse;
