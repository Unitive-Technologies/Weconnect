import React, { useEffect, useState, useRef, useMemo } from "react";
import PropTypes from "prop-types";
import { createSelector } from "reselect";
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
  Toast,
  ToastHeader,
  ToastBody,
} from "reactstrap";
import { Link } from "react-router-dom";
import Dropzone from "react-dropzone";
import { useSelector, useDispatch } from "react-redux";
import { getDistributors as onGetDistributors } from "/src/store/distributor/actions";
import {
  downloadUpdateLcoUploadTemplate,
  updateBulkLcoUploadByToken,
  uploadBulkUpdateLcoSubmit,
} from "../../../helpers/backend_helper";
import { updateLco as onUpdateLco } from "/src/store/lcolist/actions";

const BulkUpdateModal = (props) => {
  const { isOpen, handleBulkUpdateLco } = props;
  const dispatch = useDispatch();
  const [uploadTrigger, setUploadTrigger] = useState({});
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [successMsg, setSuccessMsg] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const toggleSuccessMsg = () => {
    setSuccessMsg(!successMsg);
  };

  function handleAcceptedFiles(files) {
    setSelectedFiles(files);

    updateBulkLcoUploadByToken(
      uploadTrigger.token,
      BulkUpdatelcoSavedTemplatePayload
    )
      .then((res) => {
        console.log(
          "res in updateDistributorUploadByToken:" + JSON.stringify(res)
        );
      })
      .catch((error) => {
        console.log("error in updateDistributorUploadByToken:" + error);
      });
  }

  const BulkUpdatelcoSavedTemplatePayload = {
    meta_data: {
      type: 3,
    },
    url: "",
  };

  const BulkUpdatelcoDownloadTemplatePayload = {
    meta_data: {
      type: 3,
    },
    url: "",
  };

  const handleDownloadSampleFile = () => {
    // Send a POST request to the server, from the json request convert data.fields array of strings as headers in a csv file
    downloadUpdateLcoUploadTemplate(BulkUpdatelcoDownloadTemplatePayload)
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
        console.log("error in downloadDistributorUploadTemplate:" + error);
      });
  };

  const handleUploadFile = () => {
    if (selectedFiles.length === 0) {
      console.log("No files selected to upload, handle accordingly");
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

    uploadBulkUpdateLcoSubmit(uploadTrigger.token, formData)
      .then((res) => {
        // debugger;
        toggleSuccessMsg();
        console.log(
          "res in uploadDistributorFileForInitiatedUserUpload:" +
            JSON.stringify(res)
        );
        setUploadTrigger({});
        setSelectedFiles([]);
        console.log("cleared the selected files and upload trigger");
        dispatch(onUpdateLco(res.data.data));
        handleBulkUpdateLco();
      })
      .catch((error) => {
        console.log("error in upload:" + error);
      });
  };

  const selectDistributorsState = (state) => state.distributors;
  const DistributorsProperties = createSelector(
    selectDistributorsState,
    (distributors) => ({
      distributor: distributors.distributors,
      // loading: distributors.loading,
    })
  );

  const { distributor } = useSelector(DistributorsProperties);
  useEffect(() => {
    if (distributor && !distributor.length) {
      dispatch(onGetDistributors());
    }
  }, [dispatch, distributor]);

  return (
    <>
      <div
        className="position-fixed top-0 end-0 p-3"
        style={{ zIndex: "1005" }}
      >
        <Toast isOpen={successMsg}>
          <ToastHeader toggle={toggleSuccessMsg}>
            <i className="mdi mdi-alert-outline me-2"></i> Upload
          </ToastHeader>
          <ToastBody>Update LCO Successfully</ToastBody>
        </Toast>
      </div>
      <Modal
        isOpen={isOpen}
        role="dialog"
        size="xl"
        autoFocus={true}
        centered={true}
        className="exampleModal"
        tabIndex="-1"
        toggle={handleBulkUpdateLco}
      >
        <ModalHeader toggle={handleBulkUpdateLco} tag="h4">
          Bulk Update LCO
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
              <CardSubtitle className="mb-3">
                {" "}
                Select File to Upload<span style={{ color: "red" }}>*</span>
              </CardSubtitle>
              {selectedFiles.length === 0 && errorMessage && (
                <div className="text-danger mt-2">{errorMessage}</div>
              )}
              <Form>
                <Dropzone
                  maxFiles={1}
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
                  <button
                    type="button"
                    className="btn btn-primary mr-2"
                    onClick={handleUploadFile}
                  >
                    Upload File
                  </button>
                  <button type="button" className="btn btn-primary ml-2">
                    Reset
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => handleBulkUpdateLco()}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </CardBody>
          </Card>
        </ModalBody>
      </Modal>
    </>
  );
};

BulkUpdateModal.propTypes = {
  handleBulkUpdateLco: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default BulkUpdateModal;
