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
import { createSelector } from "reselect";
import { getLco as onGetLco } from "/src/store/actions";
import Select from "react-select";
import { useSelector, useDispatch } from "react-redux";

const UploadLocation = (props) => {
  const { isOpen, toggle } = props;
  const dispatch = useDispatch();
  const [selectedFiles, setselectedFiles] = useState([]);

  const selectLcoState = (state) => state.lco;
  const LcoProperties = createSelector(selectLcoState, (lco) => ({
    lcos: lco.lco,
    loading: lco.loading,
  }));

  const { lcos, loading } = useSelector(LcoProperties);

  useEffect(() => {
    if (lcos && !lcos.length) {
      dispatch(onGetLco());
    }
  }, [dispatch, lcos]);
  console.log("Lco In add location: ", lcos);

  const options = lcos.map((option) => ({
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
        Upload Locations
      </ModalHeader>
      <ModalBody>
        <Card>
          <CardBody>
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

UploadLocation.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default UploadLocation;