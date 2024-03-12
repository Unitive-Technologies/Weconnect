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
} from "reactstrap";
import { Link } from "react-router-dom";
import Dropzone from "react-dropzone";

import { useDispatch } from "react-redux";
import { addNewUser as onAddNewUser } from "/src/store/users/actions";
import {
  downloadUserUploadTemplate,
  updateUserUploadByToken,
  uploadUserFileForInitiatedUserUpload,
} from "../../../helpers/backend_helper";

const UploadUserModal = (props) => {
  const [uploadTrigger, setUploadTrigger] = useState({});
  const { title, isOpen, toggleUploadModal, actiontype } = props;
  //   console.log("user in viewuser modal:" + JSON.stringify(user));
  const dispatch = useDispatch();

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [errorMessage, setErrorMessage] = useState();

  function handleAcceptedFiles(files) {
    setSelectedFiles(files);

    updateUserUploadByToken(uploadTrigger.token, userDownloadTemplatePayload)
      .then((res) => {
        console.log("res in updateUserUploadByToken:" + JSON.stringify(res));
      })
      .catch((error) => {
        console.log("error in updateUserUploadByToken:" + error);
      });
  }

  const userDownloadTemplatePayload = {
    meta_data: { action_type: actiontype },
    url: "",
  };

  const handleDownloadSampleFile = () => {
    // Send a POST request to the server, from the json request convert data.fields array of strings as headers in a csv file
    downloadUserUploadTemplate(userDownloadTemplatePayload)
      .then((res) => {
        // debugger;
        const fileName = res.data.data.type;
        const fieldStringArray = res.data.data.fields;
        //combine fieldStringArray contents into a single string seperated by commas
        const headers = fieldStringArray.join(",");
        // const csvContent = data.map((row) => row.join(",")).join("\n");
        const blob = new Blob([headers], {
          type: "text/csv;charset=utf-8;",
        });

        setUploadTrigger(res.data.data);
        // Create a download link
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = fileName + ".csv";

        // Trigger a click on the link to start the download
        link.click();
      })
      .catch((error) => {
        console.log("error in downloadUserUploadTemplate:" + error);
      });
  };

  const handleUploadFile = () => {
    if (selectedFiles.length === 0) {
      console.log("No files selected to upload, handle accordingly");
      // No files selected, handle accordingly
      setErrorMessage("No files selected to upload, handle accordingly");
      return;
    }

    if (!uploadTrigger || !uploadTrigger.token) {
      console.log("No upload trigger found, handle accordingly");
      // No upload trigger found, handle accordingly
      return;
    }
    const formData = new FormData();
    formData.append("qFile", selectedFiles[0]); // appending file

    uploadUserFileForInitiatedUserUpload(uploadTrigger.token, formData)
      .then((res) => {
        // debugger;

        console.log(
          "res in uploadUserFileForInitiatedUserUpload:" + JSON.stringify(res)
        );

        setUploadTrigger({});
        setSelectedFiles([]);

        console.log("cleared the selected files and upload trigger");
        dispatch(onAddNewUser(data));
        toggleUploadModal();
      })
      .catch((error) => {
        console.log("error in " + title + ":" + error);
      });
  };

  return (
    <Modal
      isOpen={isOpen}
      size="xl"
      role="dialog"
      autoFocus={true}
      centered={true}
      className={title}
      tabIndex="-1"
      toggle={toggleUploadModal}
    >
      <ModalHeader toggle={toggleUploadModal} tag="h4">
        {title}
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
            {uploadTrigger && uploadTrigger._id && (
              <div>
                <p>Token ID: {uploadTrigger.token}</p>
                <p>Fields: {uploadTrigger.fields.join(", ")}</p>
              </div>
            )}
            <CardSubtitle className="mb-3"> Select File to Upload<span style={{ color: "red" }}>*</span></CardSubtitle>

            {selectedFiles.length === 0 && errorMessage && (
              <div className="text-danger mt-2">{errorMessage}</div>
            )}
            <Form>
              <Dropzone
                maxFiles={1}
                onDrop={(acceptedFiles) => handleAcceptedFiles(acceptedFiles)}
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

UploadUserModal.propTypes = {
  title: PropTypes.string,
  isOpen: PropTypes.bool,
  toggleUploadModal: PropTypes.func,
  actiontype: PropTypes.string,
};

export default UploadUserModal;
