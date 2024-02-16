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

const BulkUpdateSmartcard = (props) => {
  const { isOpen, toggle } = props;
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
    const headers = ["smartcardno", "state", "inv_state_code", "brand_code"];
    const data = [headers];

    // Convert the data to CSV format
    const csvContent = data.map((row) => row.join(",")).join("\n");

    // Create a Blob containing the data in CSV format
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

    // Create a download link
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = "SmartcardUpdate.csv";

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
    toggle();
    return data;
  };

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {},
    validationSchema: Yup.object({}),
    onSubmit: (values) => {
      const newSmartcard = {
        id: Math.floor(Math.random() * (30 - 20)) + 20,
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
      toggle={toggle}
    >
      <ModalHeader toggle={toggle} tag="h4">
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

BulkUpdateSmartcard.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default BulkUpdateSmartcard;
