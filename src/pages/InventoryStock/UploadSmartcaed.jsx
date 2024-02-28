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
import { addInventoryStockSmartcard as onAddInventoryStockSmartcard } from "/src/store/inventorystock/actions";
import {
  downloadSmartcardUploadTemplate,
  updateSmartcardUploadByToken,
  uploadSmartcardSubmit,
} from "../../helpers/backend_helper";

const UploadSmartcard = (props) => {
  const {
    isOpen,
    toggleUploadModal,
    stocksccastype,
    stockscwarehouse,
    stockscstatetype,
    stockscinventorystate,
    brand1,
    brand2,
  } = props;
  const dispatch = useDispatch();

  const [uploadTrigger, setUploadTrigger] = useState({});
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [successMsg, setSuccessMsg] = useState(false);
  const [brand_id, setBrand_id] = useState();
  const [cas_id, setCas_id] = useState("");
  const [description, setDescription] = useState();
  const [inv_state_id, setInv_state_id] = useState();
  const [invoice_date, setInvoice_date] = useState();
  const [invoice_no, setInvoice_no] = useState();
  const [po_date, setPo_date] = useState();
  const [po_number, setPo_number] = useState();
  const [state, setState] = useState();
  const [stb_brand, setStb_brand] = useState(null);
  const [stbbrand_id, setStbbrand_id] = useState(null);
  const [warehouse_id, setWarehouse_id] = useState();
  const [is_embeded, setIs_embeded] = useState(false);

  const toggleSuccessMsg = () => {
    setSuccessMsg(!successMsg);
  };

  function handleAcceptedFiles(files) {
    setSelectedFiles(files);
    updateSmartcardUploadByToken(
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

  const smartcardBulkUpdateDownloadTemplatePayload = {
    meta_data: {
      brand_id: parseInt(brand_id),
      cas_id: parseInt(cas_id),
      description: description,
      inv_state_id: parseInt(inv_state_id),
      invoice_date: invoice_date,
      invoice_no: invoice_no,
      po_date: po_date,
      po_number: po_number,
      state: parseInt(state),
      stb_brand: stb_brand,
      stbbrand_id: parseInt(stbbrand_id),
      type: null,
      warehouse_id: parseInt(warehouse_id),
    },
    url: "",
  };

  const smartcardBulkUpdateSavedTemplatePayload = {
    meta_data: {
      brand_id: parseInt(brand_id),
      cas_id: parseInt(cas_id),
      description: description,
      inv_state_id: parseInt(inv_state_id),
      invoice_date: invoice_date,
      invoice_no: invoice_no,
      po_date: po_date,
      po_number: po_number,
      state: parseInt(state),
      stb_brand: stb_brand,
      stbbrand_id: parseInt(stbbrand_id),
      type: null,
      warehouse_id: parseInt(warehouse_id),
    },
    url: "",
  };

  const handleDownloadSampleFile = () => {
    // Send a POST request to the server, from the json request convert data.fields array of strings as headers in a csv file
    downloadSmartcardUploadTemplate(smartcardBulkUpdateDownloadTemplatePayload)
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

    uploadSmartcardSubmit(uploadTrigger.token, formData)
      .then((res) => {
        // debugger;
        toggleSuccessMsg();
        console.log(
          "res in uploadBrandFileForInitiatedUserUpload:" + JSON.stringify(res)
        );

        setUploadTrigger({});
        setSelectedFiles([]);

        console.log("cleared the selected files and upload trigger");
        dispatch(onAddInventoryStockSmartcard(res.data.data));
        toggle();
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
                      <Label className="form-label">CAS Type</Label>
                      <Input
                        name="cas_id"
                        type="select"
                        placeholder="Select CAS Type"
                        onChange={(e) => setCas_id(e.target.value)}
                        value={cas_id}
                      >
                        <option value="">Select CAS Type</option>
                        {stocksccastype.map((castype) => (
                          <option key={castype.id} value={castype.id}>
                            {castype.name}
                          </option>
                        ))}
                      </Input>
                    </div>
                  </Col>
                  <Col lg={4}>
                    <div>
                      <Label className="form-label">Is Embedded</Label>
                    </div>
                    <div>
                      <Input
                        name="is_embeded"
                        type="checkbox"
                        onChange={(e) => setIs_embeded(e.target.value)}
                        value={is_embeded}
                      />
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col lg={4}>
                    <div className="mb-3">
                      <Label className="form-label">Smartcard Band</Label>
                      <Input
                        name="brand_id"
                        type="select"
                        placeholder="Select smartcard brand"
                        className="form-select"
                        onChange={(e) => setBrand_id(e.target.value)}
                        value={brand_id}
                      >
                        <option value="">Select smartcard brand</option>
                        {cas_id !== "" ? (
                          <>
                            {brand2.map((options) => (
                              <option key={options.id} value={options.id}>
                                {options.name}
                              </option>
                            ))}
                          </>
                        ) : null}
                      </Input>
                    </div>
                  </Col>
                </Row>
                {is_embeded ? (
                  <Row>
                    <Col lg={4}>
                      <div className="mb-3">
                        <Label className="form-label">STB Band</Label>
                        <Input
                          name="stbbrand_id"
                          type="select"
                          placeholder="Select state"
                          className="form-select"
                          onChange={(e) => setStbbrand_id(e.target.value)}
                          value={stbbrand_id}
                        >
                          <option value="">Select stb brand</option>
                          {brand1.map((options) => (
                            <option key={options.id} value={options.id}>
                              {options.name}
                            </option>
                          ))}
                        </Input>
                      </div>
                    </Col>
                  </Row>
                ) : null}
                <Row>
                  <Col lg={4}>
                    <div className="mb-3">
                      <Label className="form-label">Purchase Order</Label>
                      <Input
                        name="po_number"
                        type="text"
                        placeholder="Enter Purchase Order"
                        onChange={(e) => setPo_number(e.target.value)}
                        value={po_number}
                      />
                    </div>
                  </Col>
                  <Col lg={4}>
                    <div className="mb-3">
                      <Label className="form-label">PO Date</Label>
                      <Input
                        name="po_date"
                        type="Date"
                        placeholder="Select purchase date"
                        onChange={(e) => setPo_date(e.target.value)}
                        value={po_date}
                      />
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col lg={4}>
                    <div className="mb-3">
                      <Label className="form-label">Invoice Order</Label>
                      <Input
                        name="invoice_no"
                        type="text"
                        placeholder="Enter invoice Order"
                        onChange={(e) => setInvoice_no(e.target.value)}
                        value={invoice_no}
                      />
                    </div>
                  </Col>
                  <Col lg={4}>
                    <div className="mb-3">
                      <Label className="form-label">Invoice Date</Label>
                      <Input
                        name="invoice_date"
                        type="Date"
                        placeholder="Select invoice date"
                        onChange={(e) => setInvoice_date(e.target.value)}
                        value={invoice_date}
                      />
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col lg={4}>
                    <div className="mb-3">
                      <Label className="form-label">Warehouse</Label>
                      <Input
                        name="warehouse_id"
                        type="select"
                        placeholder="Select warehouse"
                        className="form-select"
                        onChange={(e) => setWarehouse_id(e.target.value)}
                        value={warehouse_id}
                      >
                        <option value="">Select warehouse</option>
                        {stockscwarehouse.map((options) => (
                          <option key={options.id} value={options.id}>
                            {options.name}
                          </option>
                        ))}
                      </Input>
                    </div>
                  </Col>
                  <Col lg={4}>
                    <div className="mb-3">
                      <Label className="form-label">Stock type</Label>
                      <Input
                        name="inv_state_id"
                        type="select"
                        placeholder="Select Stock Type"
                        className="form-select"
                        onChange={(e) => setInv_state_id(e.target.value)}
                        value={inv_state_id}
                      >
                        <option value="">Select Stock Type</option>
                        {stockscstatetype.map((options) => (
                          <option key={options.id} value={options.id}>
                            {options.name}
                          </option>
                        ))}
                      </Input>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col lg={4}>
                    <div className="mb-3">
                      <Label className="form-label">Description</Label>
                      <Input
                        name="description"
                        type="textarea"
                        placeholder="Enter description"
                        rows="3"
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                      />
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col lg={4}>
                    <div className="mb-3">
                      <Label className="form-label">Inentory state</Label>
                      <Input
                        name="state"
                        type="select"
                        placeholder="Select inventory state"
                        className="form-select"
                        onChange={(e) => setState(e.target.value)}
                        value={state}
                      >
                        <option value="">Select inventory state</option>
                        {stockscinventorystate.map((options) => (
                          <option key={options.id} value={options.id}>
                            {options.name}
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
                  <button type="button" className="btn btn-primary ">
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

UploadSmartcard.propTypes = {
  toggleUploadModal: PropTypes.func,
  isOpen: PropTypes.bool,
  stocksccastype: PropTypes.array,
  stockscwarehouse: PropTypes.array,
  stockscstatetype: PropTypes.array,
  stockscinventorystate: PropTypes.array,
  brand1: PropTypes.array,
  brand2: PropTypes.array,
};

export default UploadSmartcard;
