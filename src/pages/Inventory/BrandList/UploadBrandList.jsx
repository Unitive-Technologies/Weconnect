import React, { useEffect, useState, useRef, useMemo } from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
  FormFeedback,
  UncontrolledTooltip,
  Input,
  Form,
  CardTitle,
  CardSubtitle,
  ModalFooter,
} from "reactstrap";
import { Link } from "react-router-dom";
import Dropzone from "react-dropzone";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { updateUser as onUpdateUser } from "/src/store/users/actions";

const UploadBrandList = (props) => {
  const { isOpen, toggle } = props;
  //   console.log("user in viewuser modal:" + JSON.stringify(user));
  const dispatch = useDispatch();

  const [selectedFiles, setselectedFiles] = useState([]);

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
    const headers = [
      "name",
      "isHd",
      "type",
      "cas_id",
      "length",
      "significant_length",
      "char_allowed",
      "status",
    ];
    const data = [headers];

    // Convert the data to CSV format
    const csvContent = data.map((row) => row.join(",")).join("\n");

    // Create a Blob containing the data in CSV format
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

    // Create a download link
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = "Brand.csv";

    // Trigger a click on the link to start the download
    link.click();
  };
  return (
    <Modal
      isOpen={isOpen}
      role="dialog"
      autoFocus={true}
      centered={true}
      className="exampleModal"
      tabIndex="-1"
      size="xl"
      toggle={toggle}
    >
      <ModalHeader toggle={toggle} tag="h4">
        Upload Brands
      </ModalHeader>
      <ModalBody>
        <Card>
          <CardBody>
            <div className="text-left mb-4 r-0" style={{ marginLeft: "78%" }}>
              <button
                type="button"
                className="btn btn-primary"
              // onClick={handleDownloadSampleFile}
              >
                Download Sample Upload File
              </button>
            </div>
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
                <option value="Active">Active</option>
                <option value="Inactive">In-Active</option>
              </Input>
              {/* {validation.touched.status && validation.errors.status ? (
                  <FormFeedback type="invalid">
                    {validation.errors.status}
                  </FormFeedback>
                ) : null} */}
            </div>
          </CardBody>
          <CardBody>
            {/* <CardTitle>Dropzone</CardTitle> */}
            <CardSubtitle className="mb-3"> Select File to Upload</CardSubtitle>
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
            <Col>
              <ModalFooter>
                <button type="button" className="btn btn-primary ">
                  Upload File
                </button>
                <button
                  type="reset"
                  className="btn btn-warning"
                //   onClick={() => validation.resetForm()}
                >
                  Reset
                </button>

                <button
                  type="button"
                  className="btn btn-outline-danger"
                //   onClick={() => {
                //     validation.resetForm();
                //     toggle();
                //   }}
                >
                  Cancel
                </button>
              </ModalFooter>
            </Col>
          </CardBody>
        </Card>
      </ModalBody>
      {/* </Modal> */}
    </Modal>
  );
};

UploadBrandList.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default UploadBrandList;
