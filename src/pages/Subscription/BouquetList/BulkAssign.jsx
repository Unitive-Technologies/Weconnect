import React, { useState } from "react";
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
} from "reactstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
// import AddMultipleNcf from "./AddMultipleNcf";
import Operators from "./Operators";
import OperatorList from "./OperatorList";
import BulkAssignBouquet from "./BulkAssignBouquets";

const BulkAssign = (props) => {
  const { isOpen, toggle, bouquet } = props;
  const dispatch = useDispatch();
  const [showEditBouquet, setShowEditBouquet] = useState(false);

  const editToggle = () => {
    setShowEditBouquet(false);
    toggle();
  };

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      name: (bouquet && bouquet.name) || "",
      code: (bouquet && bouquet.code) || "",
      status: (bouquet && bouquet.status) || "",
      type_lbl: (bouquet && bouquet.type_lbl) || "",
      boxtype_lbl: (bouquet && bouquet.boxtype_lbl) || "",
      description: (bouquet && bouquet.description) || "",
      created_at: (bouquet && bouquet.created_at) || "",
      created_by: (bouquet && bouquet.created_by) || "my mso(mso)",
      status_lbl: (bouquet && bouquet.status_lbl) || "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Enter name"),
      code: Yup.string().required("Enter code"),
      status: Yup.string().required("Select status"),
      calculate_per_channel: Yup.string().required(
        "Select calculate per channel"
      ),
      from_channel_no: Yup.string().required("Enter from channel"),
      to_channel_no: Yup.string().required("Enter to channel"),
      is_refundable: Yup.string().required("Select refundable"),
      mrp: Yup.string(),
      lmo_discount: Yup.string(),
      lmo_rate: Yup.string(),
    }),
    onSubmit: (values) => {
      const updateNcf = {
        id: Math.floor(Math.random() * (30 - 20)) + 20,
        name: values["name"],
        code: values["code"],
        status: values["status"],
        calculate_per_channel: values["calculate_per_channel"],
        from_channel_no: values["from_channel_no"],
        to_channel_no: values["to_channel_no"],
        is_refundable: values["is_refundable"],
        mrp: values["mrp"],
        lmo_discount: values["lmo_discount"],
        lmo_rate: values["lmo_rate"],
        created_at: new Date(),
        created_by: values["created_by"],
      };
      console.log("Update NCF:" + JSON.stringify(updateNcf));
      dispatch(onAddNcf(updateNcf));
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
      role="dialog"
      autoFocus={true}
      centered={true}
      className="exampleModal"
      tabIndex="-1"
      toggle={toggle}
      size="xl"
    >
      <ModalHeader toggle={toggle} tag="h4">
        Bulk Assign Bouquet
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
            <Operators />
          </Row>
          <Row>
            <div
              style={{
                // margin: "20px 0px",
                marginTop: "20px",
                // marginBottom: "18px",
                zIndex: 12000,
                backgroundColor: "#fff",
                width: "fit-content",
                marginLeft: "40%",
                position: "absolute",
                padding: "0px 10px",
              }}
            >
              <p style={{ fontWeight: "bold" }}>
                Operators<span style={{ color: "red" }}>*</span>
              </p>
            </div>
            <Row
              style={{
                // border: "1px solid #ced4da",
                padding: "20px 0px",
                margin: "20px 0px",
              }}
            >
              <OperatorList />
            </Row>
          </Row>
          <Row>
            <div
              style={{
                // margin: "20px 0px",
                marginTop: "20px",
                // marginBottom: "18px",
                zIndex: 12000,
                backgroundColor: "#fff",
                width: "fit-content",
                marginLeft: "40%",
                position: "absolute",
                padding: "0px 10px",
              }}
            >
              <p style={{ fontWeight: "bold" }}>
                Bouquets<span style={{ color: "red" }}>*</span>
              </p>
            </div>
            <Row
              style={{
                // border: "1px solid #ced4da",
                padding: "20px 0px",
                margin: "20px 0px",
              }}
            >
              <p style={{}}>**To select row, click</p>
              <BulkAssignBouquet />
            </Row>
          </Row>
          <Row>
            <Col sm="12">
              <div className="d-flex flex-wrap gap-2">
                <button type="submit" className="btn btn-success save-user">
                  Assign
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
              </div>
            </Col>
          </Row>
        </Form>
      </ModalBody>
      {/* </Modal> */}
    </Modal>
  );
};

BulkAssign.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default BulkAssign;
