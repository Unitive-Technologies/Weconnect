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
} from "reactstrap";
import { Link } from "react-router-dom";
import Dropzone from "react-dropzone";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { updateUser as onUpdateUser } from "/src/store/users/actions";

const UploadDistrict = (props) => {
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
  return (
    <Modal
      isOpen={isOpen}
      role="dialog"
      autoFocus={true}
      centered={true}
      className="exampleModal"
      tabIndex="-1"
      toggle={toggle}
    >
      {/* <Modal isOpen={modal} toggle={toggle}> */}
      <ModalHeader toggle={toggle} tag="h4">
        Upload Districts
      </ModalHeader>
      <ModalBody>
        <Card>
          <CardBody>
            <div className="mb-3">
              <Label className="form-label">Select State</Label>
              <Input
                name="state_lbl"
                type="select"
                placeholder="Select state"
                className="form-select"
                // onChange={validation.handleChange}
                // onBlur={validation.handleBlur}
                // value={validation.values.state_lbl || ""}
              >
                <option value="">Select state</option>
                <option value="1">Delhi</option>
                <option value="2">Puducherry</option>
                <option value="3">Ladakh</option>
                <option value="4">Andaman and Nicobar Islands</option>
                <option value="5">Lakshadweep</option>
                <option value="6">Daman and Diu</option>
                <option value="7">Dadra and Nagar Haveli</option>
                <option value="8">Chandigarh</option>
                <option value="9">West Bengal</option>
                <option value="10">Uttarakhand</option>
                <option value="11">Utter Pradesh</option>
                <option value="12">Tripura</option>
                <option value="13">Telangana</option>
                <option value="14">Tamil Nadu</option>
                <option value="15">Sikkim</option>
                <option value="16">Rajasthan</option>
                <option value="17">Punjab</option>
                <option value="18">Odisha</option>
                <option value="19">Nagaland</option>
                <option value="20">Mizoram</option>
                <option value="21">Meghalaya</option>
                <option value="22">Manipur</option>
                <option value="23">Maharashtra</option>
                <option value="24">Madhya Pradesh</option>
                <option value="25">Kerala</option>
                <option value="26">Karnataka</option>
                <option value="27">Jharkhand</option>
                <option value="28">Jammu and Kashmir</option>
                <option value="29">Himachal Pradesh</option>
                <option value="30">Haryana</option>
                <option value="31">Gujarat</option>
                <option value="32">Goa</option>
                <option value="33">Chattisgarh</option>
                <option value="34">Bihar</option>
                <option value="35">Assam</option>
                <option value="36">Arunachal Pradesh</option>
                <option value="37">Andhra Pradesh</option>
              </Input>
              {/* {validation.touched.state_lbl && validation.errors.state_lbl ? (
                  <FormFeedback type="invalid">
                    {validation.errors.state_lbl}
                  </FormFeedback>
                ) : null} */}
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
                <option value="11">Active</option>
                <option value="12">BLOCKED</option>
                <option value="13">In-Active</option>
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
            <Col sm="8">
              <div className="d-flex flex-wrap gap-2">
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
              </div>
            </Col>
          </CardBody>
        </Card>
      </ModalBody>
      {/* </Modal> */}
    </Modal>
  );
};

UploadDistrict.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default UploadDistrict;