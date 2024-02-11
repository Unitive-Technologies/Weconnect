import React, { useEffect, useState, useRef, useMemo } from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardBody,
  Col,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  CardSubtitle,
  FormFeedback,
  Input,
  Label,
} from "reactstrap";
import { Link } from "react-router-dom";
import Dropzone from "react-dropzone";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";

const UploadSmartcard = (props) => {
  const {
    isOpen,
    toggleUploadModal,
    stocksccastype,
    stockscwarehouse,
    stockscstatetype,
    stockscinventorystate,
    brand1,
    brand2,
  } = props;
  const dispatch = useDispatch();

  const [selectedFiles, setSelectedFiles] = useState([]);

  function handleAcceptedFiles(files) {
    files.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: formatBytes(file.size),
      })
    );
    setSelectedFiles(files);
  }

  function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }

  const handleDownloadSampleFile = () => {
    // Create a sample CSV file with headers
    // field to be get from api as prop
    const headers = ["smartcardno", "other_id"];
    const data = [headers];

    // Convert the data to CSV format
    const csvContent = data.map((row) => row.join(",")).join("\n");

    // Create a Blob containing the data in CSV format
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

    // Create a download link
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = "smartcard.csv";

    // Trigger a click on the link to start the download
    link.click();
  };

  const handleUploadFile = () => {
    if (selectedFiles.length === 0) {
      // No files selected, handle accordingly
      return;
    }

    const file = selectedFiles[0];

    const reader = new FileReader();
    reader.onload = (e) => {
      const csvContent = e.target.result;

      // Process the CSV content (you can use a library like papaparse)
      // For simplicity, let's just log the parsed data
      const parsedData = parseCSV(csvContent);
      console.log("Parsed CSV Data:", parsedData);
    };

    reader.readAsText(file);
  };

  const parseCSV = (csvContent) => {
    // Use a CSV parsing library (e.g., papaparse)
    // For simplicity, we'll split lines and split fields by commas
    const lines = csvContent.split("\n");
    const headers = lines[0].split(",");
    const data = [];

    for (let i = 1; i < lines.length; i++) {
      const fields = lines[i].split(",");
      const rowData = {};
      for (let j = 0; j < headers.length; j++) {
        rowData[headers[j]] = fields[j];
      }
      data.push(rowData);
    }

    // Move dispatch line above the return statement
    // dispatch(onAddNewUser(data));
    toggleUploadModal();
    return data;
  };

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      brand_id: "",
      description: "",
      inv_state_id: "",
      invoice_date: "",
      invoice_no: "",
      is_embeded: false,
      po_date: "",
      po_number: "",
      smartcardno: "",
      state: "",
      warehouse_id: "",
      cas_id: "",
      stbbrand_id: "",
      stbno: "",
      po_id: "",
    },
    validationSchema: Yup.object({
      cas_id: Yup.string().required("Select CAS Type"),
      brand_id: Yup.string().required("Select smartcard brand"),
      smartcardno: Yup.string().required("Enter smartcard no."),
      is_embeded: Yup.boolean(),
      stbbrand_id: Yup.string().test(
        "isRequired",
        "Select stb brand",
        function (value) {
          const { is_embeded } = this.parent;
          return is_embeded ? !!value : true;
        }
      ),
      stbno: Yup.string().test("isRequired", "Enter STB no.", function (value) {
        const { is_embeded } = this.parent;
        return is_embeded ? !!value : true;
      }),
      // stbbrand_id: Yup.string().required("Select stb brand"),
      // stbno: Yup.string().required("Enter STB no."),
      po_number: Yup.string().required("Enter purchase order"),
      po_date: Yup.string().required("Select purchase date"),
      invoice_no: Yup.string().required("Enter invoice order"),
      invoice_date: Yup.string().required("Select invoice date"),
      warehouse_id: Yup.string().required("Select warehouse"),
      state: Yup.string().required("Select Stock Type"),
      description: Yup.string().required("description"),
      inv_state_id: Yup.string().required("Select inentory state"),
    }),
    onSubmit: (values) => {
      const newSmartcard = {
        id: Math.floor(Math.random() * (30 - 20)) + 20,
        cas_id: values["cas_id"],
        is_embeded: values["is_embeded"],
        brand_id: values["brand_id"],
        smartcardno: values["smartcardno"],
        stbbrand_id: values["stbbrand_id"],
        stbno: values["stbno"],
        po_number: values["po_number"],
        po_date: values["po_date"],
        invoice_no: values["invoice_no"],
        invoice_date: values["invoice_date"],
        warehouse_id: values["warehouse_id"],
        state: values["state"],
        description: values["description"],
        inv_state_id: values["inv_state_id"],
      };
      console.log("New smartcard: " + JSON.stringify(newSmartcard));
      //   dispatch(onAddInventoryStockSmartcard(newSmartcard));
      //   dispatch(onGetInventoryStockSmartcard());
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
      toggle={toggleUploadModal}
    >
      <ModalHeader toggle={toggleUploadModal} tag="h4">
        Upload Smartcards
      </ModalHeader>
      <ModalBody>
        <Card>
          <CardBody>
            <div className="text-left mb-4 r-0" style={{ marginLeft: "78%" }}>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleDownloadSampleFile}
              >
                Download Sample Upload File
              </button>
            </div>
            <Form>
              <Row>
                <Col lg={4}>
                  <div className="mb-3">
                    <Label className="form-label">CAS Type</Label>
                    <Input
                      name="cas_id"
                      type="select"
                      placeholder="Select CAS Type"
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.cas_id || ""}
                      invalid={
                        validation.touched.cas_id && validation.errors.cas_id
                          ? true
                          : false
                      }
                    >
                      <option value="">Select CAS Type</option>
                      {stocksccastype.map((castype) => (
                        <option key={castype.id} value={castype.id}>
                          {castype.name}
                        </option>
                      ))}
                    </Input>
                    {validation.touched.cas_id && validation.errors.cas_id ? (
                      <FormFeedback type="invalid">
                        {validation.errors.cas_id}
                      </FormFeedback>
                    ) : null}
                  </div>
                </Col>
                <Col lg={4}>
                  <div>
                    <Label className="form-label">Is Embedded</Label>
                  </div>
                  <div>
                    <Input
                      name="is_embeded"
                      type="checkbox"
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.is_embeded || ""}
                      invalid={
                        validation.touched.is_embeded &&
                        validation.errors.is_embeded
                          ? true
                          : false
                      }
                    />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col lg={4}>
                  <div className="mb-3">
                    <Label className="form-label">Smartcard Band</Label>
                    <Input
                      name="brand_id"
                      type="select"
                      placeholder="Select smartcard brand"
                      className="form-select"
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.brand_id || ""}
                      invalid={
                        validation.touched.brand_id &&
                        validation.errors.brand_id
                          ? true
                          : false
                      }
                    >
                      <option value="">Select smartcard brand</option>
                      {validation.values.cas_id !== "" ? (
                        <>
                          {brand2.map((options) => (
                            <option key={options.id} value={options.id}>
                              {options.name}
                            </option>
                          ))}
                        </>
                      ) : null}
                    </Input>
                    {validation.touched.brand_id &&
                    validation.errors.brand_id ? (
                      <FormFeedback type="invalid">
                        {validation.errors.brand_id}
                      </FormFeedback>
                    ) : null}
                  </div>
                </Col>
              </Row>
              {validation.values.is_embeded ? (
                <Row>
                  <Col lg={4}>
                    <div className="mb-3">
                      <Label className="form-label">STB Band</Label>
                      <Input
                        name="stbbrand_id"
                        type="select"
                        placeholder="Select state"
                        className="form-select"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.stbbrand_id || ""}
                        invalid={
                          validation.touched.stbbrand_id &&
                          validation.errors.stbbrand_id
                            ? true
                            : false
                        }
                      >
                        <option value="">Select stb brand</option>
                        {brand1.map((options) => (
                          <option key={options.id} value={options.id}>
                            {options.name}
                          </option>
                        ))}
                      </Input>
                      {validation.touched.stbbrand_id &&
                      validation.errors.stbbrand_id ? (
                        <FormFeedback type="invalid">
                          {validation.errors.stbbrand_id}
                        </FormFeedback>
                      ) : null}
                    </div>
                  </Col>
                </Row>
              ) : null}
              <Row>
                <Col lg={4}>
                  <div className="mb-3">
                    <Label className="form-label">Purchase Order</Label>
                    <Input
                      name="po_number"
                      type="text"
                      placeholder="Enter Purchase Order"
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.po_number || ""}
                      invalid={
                        validation.touched.po_number &&
                        validation.errors.po_number
                          ? true
                          : false
                      }
                    />
                    {validation.touched.po_number &&
                    validation.errors.po_number ? (
                      <FormFeedback type="invalid">
                        {validation.errors.po_number}
                      </FormFeedback>
                    ) : null}
                  </div>
                </Col>
                <Col lg={4}>
                  <div className="mb-3">
                    <Label className="form-label">PO Date</Label>
                    <Input
                      name="po_date"
                      type="Date"
                      placeholder="Select purchase date"
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.po_date || ""}
                      invalid={
                        validation.touched.po_date && validation.errors.po_date
                          ? true
                          : false
                      }
                    />
                    {validation.touched.po_date && validation.errors.po_date ? (
                      <FormFeedback type="invalid">
                        {validation.errors.po_date}
                      </FormFeedback>
                    ) : null}
                  </div>
                </Col>
              </Row>
              <Row>
                <Col lg={4}>
                  <div className="mb-3">
                    <Label className="form-label">Invoice Order</Label>
                    <Input
                      name="invoice_no"
                      type="text"
                      placeholder="Enter invoice Order"
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.invoice_no || ""}
                      invalid={
                        validation.touched.invoice_no &&
                        validation.errors.invoice_no
                          ? true
                          : false
                      }
                    />
                    {validation.touched.invoice_no &&
                    validation.errors.invoice_no ? (
                      <FormFeedback type="invalid">
                        {validation.errors.invoice_no}
                      </FormFeedback>
                    ) : null}
                  </div>
                </Col>
                <Col lg={4}>
                  <div className="mb-3">
                    <Label className="form-label">Invoice Date</Label>
                    <Input
                      name="invoice_date"
                      type="Date"
                      placeholder="Select invoice date"
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.invoice_date || ""}
                      invalid={
                        validation.touched.invoice_date &&
                        validation.errors.invoice_date
                          ? true
                          : false
                      }
                    />
                    {validation.touched.invoice_date &&
                    validation.errors.invoice_date ? (
                      <FormFeedback type="invalid">
                        {validation.errors.invoice_date}
                      </FormFeedback>
                    ) : null}
                  </div>
                </Col>
              </Row>
              <Row>
                <Col lg={4}>
                  <div className="mb-3">
                    <Label className="form-label">Warehouse</Label>
                    <Input
                      name="warehouse_id"
                      type="select"
                      placeholder="Select warehouse"
                      className="form-select"
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.warehouse_id || ""}
                      invalid={
                        validation.touched.warehouse_id &&
                        validation.errors.warehouse_id
                          ? true
                          : false
                      }
                    >
                      <option value="">Select warehouse</option>
                      {stockscwarehouse.map((options) => (
                        <option key={options.id} value={options.id}>
                          {options.name}
                        </option>
                      ))}
                    </Input>
                    {validation.touched.warehouse_id &&
                    validation.errors.warehouse_id ? (
                      <FormFeedback type="invalid">
                        {validation.errors.warehouse_id}
                      </FormFeedback>
                    ) : null}
                  </div>
                </Col>
                <Col lg={4}>
                  <div className="mb-3">
                    <Label className="form-label">Stock type</Label>
                    <Input
                      name="inv_state_id"
                      type="select"
                      placeholder="Select Stock Type"
                      className="form-select"
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.inv_state_id || ""}
                      invalid={
                        validation.touched.inv_state_id &&
                        validation.errors.inv_state_id
                          ? true
                          : false
                      }
                    >
                      <option value="">Select Stock Type</option>
                      {stockscstatetype.map((options) => (
                        <option key={options.id} value={options.id}>
                          {options.name}
                        </option>
                      ))}
                    </Input>
                    {validation.touched.inv_state_id &&
                    validation.errors.inv_state_id ? (
                      <FormFeedback type="invalid">
                        {validation.errors.inv_state_id}
                      </FormFeedback>
                    ) : null}
                  </div>
                </Col>
              </Row>
              <Row>
                <Col lg={4}>
                  <div className="mb-3">
                    <Label className="form-label">Description</Label>
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
              </Row>
              <Row>
                <Col lg={4}>
                  <div className="mb-3">
                    <Label className="form-label">Inentory state</Label>
                    <Input
                      name="state"
                      type="select"
                      placeholder="Select inventory state"
                      className="form-select"
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.state || ""}
                      invalid={
                        validation.touched.state && validation.errors.state
                          ? true
                          : false
                      }
                    >
                      <option value="">Select inventory state</option>
                      {stockscinventorystate.map((options) => (
                        <option key={options.id} value={options.id}>
                          {options.name}
                        </option>
                      ))}
                    </Input>
                    {validation.touched.state && validation.errors.state ? (
                      <FormFeedback type="invalid">
                        {validation.errors.state}
                      </FormFeedback>
                    ) : null}
                  </div>
                </Col>
              </Row>
              <Row>
                <Col lg={4}>
                  <CardSubtitle className="mb-3">
                    {" "}
                    Select File to Upload
                  </CardSubtitle>
                  <Dropzone
                    onDrop={(acceptedFiles) => {
                      setSelectedFiles(acceptedFiles);
                    }}
                  >
                    {({ getRootProps, getInputProps }) => (
                      <div className="dropzone">
                        <div
                          className="dz-message needsclick mt-2"
                          {...getRootProps()}
                        >
                          <input {...getInputProps()} />
                          <div className="mb-3">
                            <i className="display-4 text-muted bx bxs-cloud-upload" />
                          </div>
                          <h4>Drop files here or click to upload.</h4>
                        </div>
                      </div>
                    )}
                  </Dropzone>
                  <div className="dropzone-previews mt-3" id="file-previews">
                    {selectedFiles.map((f, i) => {
                      return (
                        <Card
                          className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                          key={i + "-file"}
                        >
                          <div className="p-2">
                            <Row className="align-items-center">
                              <Col className="col-auto">
                                <img
                                  data-dz-thumbnail=""
                                  height="80"
                                  className="avatar-sm rounded bg-light"
                                  alt={f.name}
                                  src={f.preview}
                                />
                              </Col>
                              <Col>
                                <Link
                                  to="#"
                                  className="text-muted font-weight-bold"
                                >
                                  {f.name}
                                </Link>
                                <p className="mb-0">
                                  <strong>{f.formattedSize}</strong>
                                </p>
                              </Col>
                            </Row>
                          </div>
                        </Card>
                      );
                    })}
                  </div>
                </Col>
              </Row>
            </Form>

            <div className="text-center mt-4 ">
              <div
                style={{
                  display: "flex",
                  gap: 5,
                  textAlign: "center",
                  justifyContent: "center",
                }}
              >
                <button
                  type="button"
                  className="btn btn-primary mr-2 "
                  onClick={handleUploadFile}
                >
                  Upload File
                </button>
                <button type="button" className="btn btn-primary ml-2 ">
                  Reset
                </button>
                <button type="button" className="btn btn-primary ">
                  Cancel
                </button>
              </div>
            </div>
          </CardBody>
        </Card>
      </ModalBody>
    </Modal>
  );
};

UploadSmartcard.propTypes = {
  toggleUploadModal: PropTypes.func,
  isOpen: PropTypes.bool,
  stocksccastype: PropTypes.array,
  stockscwarehouse: PropTypes.array,
  stockscstatetype: PropTypes.array,
  stockscinventorystate: PropTypes.array,
  brand1: PropTypes.array,
  brand2: PropTypes.array,
};

export default UploadSmartcard;
