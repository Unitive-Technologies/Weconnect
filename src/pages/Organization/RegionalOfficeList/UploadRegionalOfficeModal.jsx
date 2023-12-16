import React, { useState } from "react";
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

import { useDispatch } from "react-redux";
import { updateUser as onUpdateUser } from "/src/store/users/actions";

const UploadRegionalOfficeModal = (props) => {
  const { isOpen, handleUploadRegionalOffice } = props;
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
  return (
    <Modal
      isOpen={isOpen}
      role="dialog"
      size="xl"
      autoFocus={true}
      centered={true}
      className="exampleModal"
      tabIndex="-1"
      toggle={handleUploadRegionalOffice}
    >
      {/* <Modal isOpen={modal} toggle={toggle}> */}
      <ModalHeader toggle={handleUploadRegionalOffice} tag="h4">
        Upload Regional Office
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
                placeholder="Select Group Policy"
                className="form-select"
                // onChange={validation.handleChange}
                // onBlur={validation.handleBlur}
                // value={validation.values.grouppolicy || ""}
              >
                <option value="">Select Status</option>
                <option value="A">Active</option>
                <option value="C">In-Active</option>
              </Input>
              {/* {validation.touched.grouppolicy &&
              validation.errors.grouppolicy ? (
                <FormFeedback type="invalid">
                  {validation.errors.grouppolicy}
                </FormFeedback>
              ) : null} */}
            </div>
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
    </Modal>
  );
};

UploadRegionalOfficeModal.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default UploadRegionalOfficeModal;
