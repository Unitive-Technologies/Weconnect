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
  Toast,
  ToastHeader,
  ToastBody,
} from "reactstrap";
import { Link } from "react-router-dom";
import Dropzone from "react-dropzone";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { addInventoryAllottedSmartcard as onAddInventoryAllottedSmartcard } from "/src/store/inventoryallotted/actions";
import {
  downloadSmartcardAllotmentUploadTemplate,
  updateSmartcardAllotmentUploadByToken,
  uploadSmartcardAllotmentSubmit,
} from "../../helpers/backend_helper";

const UploadAllottedSmartcard = (props) => {
  const { isOpen, toggleUploadModal, allottedusertype, allottedoperatorlist } =
    props;
  const dispatch = useDispatch();

  const [uploadTrigger, setUploadTrigger] = useState({});
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [successMsg, setSuccessMsg] = useState(false);
  const [usertype, setUsertype] = useState("");
  const [branch_id, setBranch_id] = useState(""); //Regional office id
  const [distributor_id, setDistributor_id] = useState(""); //Distributor id
  const [operator, setOperator] = useState(""); //Lco id
  const [allotteddistributor, setAllotteddistributor] = useState([]);
  const [allottedlco, setAllottedlco] = useState([]);

  const baseUrl = "https://sms.unitch.in/api/index.php/v1";

  useEffect(() => {
    console.log("Selected branch id: ", branch_id);
    getResponse(
      `${baseUrl}/operator/list?fields=id,name,type,mso_id,branch_id,distributor_id&per-page=100&filter[branch_id]=${parseInt(
        branch_id
      )}&filter[type]=2&vr=web1.0`
    ).then((response) => {
      console.log("distributor response data: ", response.data);
      setAllotteddistributor(response.data.data);
    });
  }, [branch_id]);

  useEffect(() => {
    console.log("Selected distributor id: ", distributor_id);
    getResponse(
      `${baseUrl}/operator/list?fields=id,name,type,mso_id,branch_id,distributor_id&per-page=100&filter[branch_id]=${branch_id}&filter[distributor_id]=${distributor_id}&filter[type]=3&vr=web1.0`
    ).then((response) => {
      // console.log("lco response data: ", response.data.data);
      setAllottedlco(response.data.data);
    });
  }, [distributor_id]);

  useEffect(() => {
    setBranch_id("");
    setDistributor_id("");
    setOperator("");
    setAllotteddistributor([]);
    setAllottedlco([]);
  }, [usertype]);

  const toggleSuccessMsg = () => {
    setSuccessMsg(!successMsg);
  };

  function handleAcceptedFiles(files) {
    setSelectedFiles(files);
    updateSmartcardAllotmentUploadByToken(
      uploadTrigger.token,
      smartcardBulkUpdateSavedTemplatePayload
    )
      .then((res) => {
        console.log(
          "res in updateSmartcardUploadByToken: " + JSON.stringify(res)
        );
      })
      .catch((error) => {
        console.log("error in updateSmartcardUploadByToken: " + error);
      });
  }

  let id = {};
  if (usertype === "1") {
    id = branch_id;
  } else if (usertype === "2") {
    id = distributor_id;
  } else if (usertype === "3") {
    id = operator;
  }

  const smartcardBulkUpdateDownloadTemplatePayload = {
    meta_data: {
      type: parseInt(usertype),
      operator_id: id,
    },
    url: "",
  };

  const smartcardBulkUpdateSavedTemplatePayload = {
    meta_data: {
      type: parseInt(usertype),
      operator_id: id,
    },
    url: "",
  };

  const handleDownloadSampleFile = () => {
    // Send a POST request to the server, from the json request convert data.fields array of strings as headers in a csv file
    downloadSmartcardAllotmentUploadTemplate(
      smartcardBulkUpdateDownloadTemplatePayload
    )
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

    uploadSmartcardAllotmentSubmit(uploadTrigger.token, formData)
      .then((res) => {
        toggleSuccessMsg();
        console.log(
          "res in uploadBrandFileForInitiatedUserUpload:" + JSON.stringify(res)
        );
        setUploadTrigger({});
        setSelectedFiles([]);
        console.log("cleared the selected files and upload trigger");
        dispatch(onAddInventoryAllottedSmartcard(res.data.data));
        toggleUploadModal();
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
          <ToastBody>Upload Smartcard Successfully</ToastBody>
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
        toggle={toggleUploadModal}
      >
        <ModalHeader toggle={toggleUploadModal} tag="h4">
          Upload Smartcards to Operator
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
                  <Col lg={3}>
                    <div className="mb-3">
                      <Label className="form-label">
                        User Type<span style={{ color: "red" }}>*</span>
                      </Label>
                      <Input
                        name="usertype"
                        type="select"
                        placeholder="Select User Type"
                        onChange={(e) => setUsertype(e.target.value)}
                        value={usertype}
                      >
                        <option value="">Select user Type</option>
                        {allottedusertype.map((usertype) => (
                          <option key={usertype.id} value={usertype.id}>
                            {usertype.name}
                          </option>
                        ))}
                      </Input>
                    </div>
                  </Col>
                  {usertype === "1" ? (
                    <Col lg={3}>
                      <div className="mb-3">
                        <Label className="form-label">
                          Select REGIONAL OFFICE
                          <span style={{ color: "red" }}>*</span>
                        </Label>
                        <Input
                          name="branch_id"
                          type="select"
                          placeholder="Select Reginal office"
                          onChange={(e) => setBranch_id(e.target.value)}
                          value={branch_id}
                        >
                          <option value="">Select Reginal office</option>
                          {allottedoperatorlist.map((operatorlist) => (
                            <option
                              key={operatorlist.id}
                              value={operatorlist.id}
                            >
                              {operatorlist.name}
                            </option>
                          ))}
                        </Input>
                      </div>
                    </Col>
                  ) : null}
                  {usertype === "2" ? (
                    <>
                      <Col lg={3}>
                        <div className="mb-3">
                          <Label className="form-label">
                            Select REGIONAL OFFICE
                            <span style={{ color: "red" }}>*</span>
                          </Label>
                          <Input
                            name="branch_id"
                            type="select"
                            placeholder="Select Reginal office"
                            onChange={(e) => setBranch_id(e.target.value)}
                            value={branch_id}
                          >
                            <option value="">Select Reginal office</option>
                            {allottedoperatorlist.map((operatorlist) => (
                              <option
                                key={operatorlist.id}
                                value={operatorlist.id}
                              >
                                {operatorlist.name}
                              </option>
                            ))}
                          </Input>
                        </div>
                      </Col>
                      {branch_id !== "" ? (
                        <Col lg={3}>
                          <div className="mb-3">
                            <Label className="form-label">
                              Select DISTRIBUTOR
                              <span style={{ color: "red" }}>*</span>
                            </Label>
                            <Input
                              name="distributor_id"
                              type="select"
                              placeholder="Select Distributor"
                              onChange={(e) =>
                                setDistributor_id(e.target.value)
                              }
                              value={distributor_id}
                            >
                              <option value="">Select Distributor</option>
                              {allotteddistributor.map((operatorlist) => (
                                <option
                                  key={operatorlist.id}
                                  value={operatorlist.id}
                                >
                                  {operatorlist.name}
                                </option>
                              ))}
                            </Input>
                          </div>
                        </Col>
                      ) : null}
                    </>
                  ) : null}
                  {usertype === "3" ? (
                    <>
                      <Col lg={3}>
                        <div className="mb-3">
                          <Label className="form-label">
                            Select REGIONAL OFFICE
                            <span style={{ color: "red" }}>*</span>
                          </Label>
                          <Input
                            name="branch_id"
                            type="select"
                            placeholder="Select Reginal office"
                            onChange={(e) => setBranch_id(e.target.value)}
                            value={branch_id}
                          >
                            <option value="">Select Reginal office</option>
                            {allottedoperatorlist.map((operatorlist) => (
                              <option
                                key={operatorlist.id}
                                value={operatorlist.id}
                              >
                                {operatorlist.name}
                              </option>
                            ))}
                          </Input>
                        </div>
                      </Col>
                      {branch_id !== "" ? (
                        <Col lg={3}>
                          <div className="mb-3">
                            <Label className="form-label">
                              Select DISTRIBUTOR
                              <span style={{ color: "red" }}>*</span>
                            </Label>
                            <Input
                              name="distributor_id"
                              type="select"
                              placeholder="Select Distributor"
                              onChange={(e) =>
                                setDistributor_id(e.target.value)
                              }
                              value={distributor_id}
                            >
                              <option value="">Select Distributor</option>
                              {allotteddistributor.map((operatorlist) => (
                                <option
                                  key={operatorlist.id}
                                  value={operatorlist.id}
                                >
                                  {operatorlist.name}
                                </option>
                              ))}
                            </Input>
                          </div>
                        </Col>
                      ) : null}
                      {distributor_id !== "" ? (
                        <Col lg={3}>
                          <div className="mb-3">
                            <Label className="form-label">
                              Select Lco
                              <span style={{ color: "red" }}>*</span>
                            </Label>
                            <Input
                              name="operator"
                              type="select"
                              placeholder="Select Lco"
                              onChange={(e) => setOperator(e.target.value)}
                              value={operator}
                            >
                              <option value="">Select Distributor</option>
                              {allottedlco.map((operatorlist) => (
                                <option
                                  key={operatorlist.id}
                                  value={operatorlist.id}
                                >
                                  {operatorlist.name}
                                </option>
                              ))}
                            </Input>
                          </div>
                        </Col>
                      ) : null}
                    </>
                  ) : null}
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
                  <button type="button" className="btn btn-primary ml-2">
                    Reset
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => toggleUploadModal()}
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

UploadAllottedSmartcard.propTypes = {
  toggleUploadModal: PropTypes.func,
  isOpen: PropTypes.bool,
  allottedusertype: PropTypes.array,
  allottedoperatorlist: PropTypes.array,
};

export default UploadAllottedSmartcard;
