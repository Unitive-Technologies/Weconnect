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
  Toast,
  ToastHeader,
  ToastBody,
  Label,
  Input,
} from "reactstrap";
import { Link } from "react-router-dom";
import Dropzone from "react-dropzone";
import { useDispatch } from "react-redux";
import { addInventoryStockPairing as onAddInventoryStockPairing } from "/src/store/inventorystock/actions";
import {
  downloadUploadMaterialstatusTemplate,
  uploadMaterialstatusByToken,
  uploadMaterialstatusSubmit,
} from "../../helpers/backend_helper";
import { getResponse } from "../../helpers/api_helper";

const UploadMaterialstatus = (props) => {
  const { isOpen, toggle, materialstatus, pairingstatus } = props;
  const dispatch = useDispatch();

  const [uploadTrigger, setUploadTrigger] = useState({});
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [successMsg, setSuccessMsg] = useState(false);
  const [materialstatusId, setMaterialstatusId] = useState();
  const [pairingstatusId, setPairingstatusId] = useState();
  const [inventorystateId, setInventorystateId] = useState();
  const [inventorystate, setInventorystate] = useState([]);

  const handleToggle = () => {
    toggle();
    setMaterialstatusId();
    setPairingstatusId();
    setInventorystateId();
    setInventorystate([]);
  };

  const toggleSuccessMsg = () => {
    setSuccessMsg(!successMsg);
  };

  const baseUrl = "https://sms.unitch.in/api/index.php/v1";

  useEffect(() => {
    getResponse(
      `${baseUrl}/inventory-state/list?fields=id,name&filter[state_type]=${parseInt(
        pairingstatusId
      )}&vr=web1.0`
    ).then((response) => {
      setInventorystate(response.data.data);
    });
  }, [pairingstatusId]);

  function handleAcceptedFiles(files) {
    setSelectedFiles(files);
    uploadMaterialstatusByToken(
      uploadTrigger.token,
      uploadMaterialstatusSavedTemplatePayload
    )
      .then((res) => {
        console.log(
          "res in updateSmartcardBulkUpdateByToken: " + JSON.stringify(res)
        );
      })
      .catch((error) => {
        console.log("error in updateSmartcardBulkUpdateByToken: " + error);
      });
  }

  const uploadMaterialstatusSavedTemplatePayload = {
    meta_data: {
      type: null,
      material_type: parseInt(materialstatusId),
      status_code: parseInt(pairingstatusId),
      inventory_state: parseInt(inventorystateId),
    },
    url: "",
  };

  const uploadMaterialstatusDownloadTemplatePayload = {
    meta_data: {
      type: null,
      material_type: parseInt(materialstatusId),
      status_code: parseInt(pairingstatusId),
      inventory_state: parseInt(inventorystateId),
    },
    url: "",
  };

  const handleDownloadSampleFile = () => {
    // Send a POST request to the server, from the json request convert data.fields array of strings as headers in a csv file
    downloadUploadMaterialstatusTemplate(
      uploadMaterialstatusDownloadTemplatePayload
    )
      .then((res) => {
        debugger;
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
        console.log("error in downloadBrandUploadTemplate:" + error);
      });
  };

  const handleUploadFile = () => {
    if (selectedFiles.length === 0) {
      console.log("No files selected to upload, handle accordingly");
      // No files selected, handle accordingly
      return;
    }

    if (!uploadTrigger || !uploadTrigger.token) {
      console.log("No upload trigger found, handle accordingly");
      // No upload trigger found, handle accordingly
      return;
    }
    const formData = new FormData();
    formData.append("qFile", selectedFiles[0]); // appending file

    uploadMaterialstatusSubmit(uploadTrigger.token, formData)
      .then((res) => {
        // debugger;
        toggleSuccessMsg();
        console.log(
          "res in uploadBrandFileForInitiatedUserUpload:" + JSON.stringify(res)
        );

        setUploadTrigger({});
        setSelectedFiles([]);

        console.log("cleared the selected files and upload trigger");
        dispatch(onAddInventoryStockPairing(res.data.data));
        handleToggle();
      })
      .catch((error) => {
        console.log("error in upload:" + error);
      });
  };

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
          <ToastBody>Update Material status Successfully</ToastBody>
        </Toast>
      </div>
      <Modal
        isOpen={isOpen}
        size="xl"
        role="dialog"
        autoFocus={true}
        centered={true}
        className="exampleModal"
        tabIndex="-1"
        toggle={handleToggle}
      >
        <ModalHeader toggle={handleToggle} tag="h4">
          Upload Material Status
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
                  <p>Fields: [{uploadTrigger.fields.join(", ")}]</p>
                </div>
              )}
              <Form>
                <Row>
                  <Col lg={4}>
                    <div className="mb-3">
                      <Label className="form-label">Material Status</Label>
                      <Input
                        name="materialstatus"
                        type="select"
                        placeholder="Select Material Status"
                        onChange={(e) => setMaterialstatusId(e.target.value)}
                        value={materialstatusId}
                      >
                        <option value="">Select Material Status</option>
                        {materialstatus.map((status) => (
                          <option key={status.id} value={status.id}>
                            {status.name}
                          </option>
                        ))}
                      </Input>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col lg={4}>
                    <div className="mb-3">
                      <Label className="form-label">Pairing Status</Label>
                      <Input
                        name="pairingstatus"
                        type="select"
                        placeholder="Select Pairing Status"
                        onChange={(e) => setPairingstatusId(e.target.value)}
                        value={pairingstatusId}
                      >
                        <option value="">Select Pairing Status</option>
                        {pairingstatus.map((status) => (
                          <option key={status.id} value={status.id}>
                            {status.name}
                          </option>
                        ))}
                      </Input>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col lg={4}>
                    <div className="mb-3">
                      <Label className="form-label">Inventory State</Label>
                      <Input
                        name="inventorystate"
                        type="select"
                        placeholder="Select Inventory State"
                        onChange={(e) => setInventorystateId(e.target.value)}
                        value={inventorystateId}
                      >
                        <option value="">Select Inventory State</option>
                        {inventorystate.map((status) => (
                          <option key={status.id} value={status.id}>
                            {status.name}
                          </option>
                        ))}
                      </Input>
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
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => toggle()}
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

UploadMaterialstatus.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
  materialstatus: PropTypes.array,
  pairingstatus: PropTypes.array,
};

export default UploadMaterialstatus;
