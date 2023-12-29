import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardBody,
  Col,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
  Input,
  Form,
  CardSubtitle,
} from "reactstrap";
import { Link } from "react-router-dom";
import Dropzone from "react-dropzone";
import Select from "react-select";
import { useDispatch } from "react-redux";

const UploadLocation = (props) => {
  const { isOpen, handleUploadLocation, status, lcoonlocation } = props;
  const dispatch = useDispatch();
  const [selectedFiles, setselectedFiles] = useState([]);

  const options = lcoonlocation.map((option) => ({
    value: option.code,
    label: (
      <div>
        <h6>{option.name}</h6>
        <h6>{option.username}</h6>
        <p>Regional Office: {option.branch_lbl}</p>
        <p>Distributor: {option.distributor_lbl}</p>
      </div>
    ),
  }));

  const customStyles = {
    option: (provided) => ({
      ...provided,
      backgroundColor: "white",
    }),
  };

  function handleAcceptedFiles(files) {
    files.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: formatBytes(file.size),
      })
    );
    setselectedFiles(files);
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
    const headers = ["name", "lmo_code", "status"];
    const data = [headers];

    // Convert the data to CSV format
    const csvContent = data.map((row) => row.join(",")).join("\n");

    // Create a Blob containing the data in CSV format
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

    // Create a download link
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = "Location.csv";

    // Trigger a click on the link to start the download
    link.click();
  };

  return (
    <Modal
      isOpen={isOpen}
      role="dialog"
      size="xl"
      autoFocus={true}
      centered={true}
      className="exampleModal"
      tabIndex="-1"
      toggle={handleUploadLocation}
    >
      <ModalHeader toggle={handleUploadLocation} tag="h4">
        Upload Locations
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
            <Row>
              <Col lg={6}>
                <div className="mb-3">
                  <Label className="form-label"> LCO</Label>
                  <Select
                    name="lco"
                    options={options}
                    // onChange={(selectedOption) =>
                    //   validation.handleChange(selectedOption.value)
                    // }
                    // onBlur={validation.handleBlur}
                    // value={options.find(
                    //   (opt) => opt.value === validation.values.lco
                    // )}
                    styles={customStyles}
                  />
                  {/* {validation.touched.state_lbl && validation.errors.state_lbl ? (
                  <FormFeedback type="invalid">
                    {validation.errors.state_lbl}
                  </FormFeedback>
                ) : null} */}
                </div>
              </Col>
              <Col lg={6}>
                <div className="mb-3">
                  <Label className="form-label">Status</Label>
                  <Input
                    name="status"
                    type="select"
                    placeholder="Select Status"
                    className="form-select"
                    // onChange={validation.handleChange}
                    // onBlur={validation.handleBlur}
                    // value={validation.values.status || ""}
                  >
                    <option value="">Select Status</option>
                    {status.map((options) => (
                      <option key={options.id} value={options.id}>
                        {options.name}
                      </option>
                    ))}
                  </Input>
                  {/* {validation.touched.status && validation.errors.status ? (
                  <FormFeedback type="invalid">
                    {validation.errors.status}
                  </FormFeedback>
                ) : null} */}
                </div>
              </Col>
            </Row>
          </CardBody>
          <CardBody>
            <CardSubtitle className="mb-3">
              {" "}
              Select File to Upload<span style={{ color: "red" }}>*</span>
            </CardSubtitle>
            <Form>
              <Dropzone
                onDrop={(acceptedFiles) => {
                  handleAcceptedFiles(acceptedFiles);
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
                              height="30"
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
                <button type="button" className="btn btn-primary mr-2 ">
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
      {/* </Modal> */}
    </Modal>
  );
};

UploadLocation.propTypes = {
  handleUploadLocation: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default UploadLocation;
