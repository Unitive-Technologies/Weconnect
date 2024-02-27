// import React, { useState } from "react";
// import PropTypes from "prop-types";
// import {
//   Card,
//   CardBody,
//   Col,
//   Row,
//   Modal,
//   ModalHeader,
//   ModalBody,
//   Label,
//   Input,
//   Form,
//   CardSubtitle,
// } from "reactstrap";
// import { Link } from "react-router-dom";
// import Dropzone from "react-dropzone";
// import { updateUser as onUpdateUser } from "/src/store/users/actions";

// const UploadBrandList = (props) => {
//   const { isOpen, handleUploadBrand } = props;

//   const [selectedFiles, setselectedFiles] = useState([]);

//   function handleAcceptedFiles(files) {
//     files.map((file) =>
//       Object.assign(file, {
//         preview: URL.createObjectURL(file),
//         formattedSize: formatBytes(file.size),
//       })
//     );
//     setselectedFiles(files);
//   }

//   function formatBytes(bytes, decimals = 2) {
//     if (bytes === 0) return "0 Bytes";
//     const k = 1024;
//     const dm = decimals < 0 ? 0 : decimals;
//     const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

//     const i = Math.floor(Math.log(bytes) / Math.log(k));
//     return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
//   }

//   const handleDownloadSampleFile = () => {
//     // Create a sample CSV file with headers
//     // field to be get from api as prop
//     const headers = [
//       "name",
//       "isHd",
//       "type",
//       "cas_id",
//       "length",
//       "significant_length",
//       "char_allowed",
//       "status",
//     ];
//     const data = [headers];

//     // Convert the data to CSV format
//     const csvContent = data.map((row) => row.join(",")).join("\n");

//     // Create a Blob containing the data in CSV format
//     const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

//     // Create a download link
//     const link = document.createElement("a");
//     link.href = window.URL.createObjectURL(blob);
//     link.download = "Brand.csv";

//     // Trigger a click on the link to start the download
//     link.click();
//   };
//   return (
//     <Modal
//       isOpen={isOpen}
//       role="dialog"
//       autoFocus={true}
//       centered={true}
//       className="exampleModal"
//       tabIndex="-1"
//       size="xl"
//       toggle={handleUploadBrand}
//     >
//       <ModalHeader toggle={handleUploadBrand} tag="h4">
//         Upload Brands
//       </ModalHeader>
//       <ModalBody>
//         <Card>
//           <CardBody>
//             <div className="text-left mb-4 r-0" style={{ marginLeft: "78%" }}>
//               <button
//                 type="button"
//                 className="btn btn-primary"
//                 // onClick={handleDownloadSampleFile}
//               >
//                 Download Sample Upload File
//               </button>
//             </div>
//             <div className="mb-3">
//               <Label className="form-label">Status</Label>
//               <Input
//                 name="status"
//                 type="select"
//                 placeholder="Select Status"
//                 className="form-select"
//                 // onChange={validation.handleChange}
//                 // onBlur={validation.handleBlur}
//                 // value={validation.values.status || ""}
//               >
//                 <option value="">Select Status</option>
//                 <option value="Active">Active</option>
//                 <option value="Inactive">In-Active</option>
//               </Input>
//               {/* {validation.touched.status && validation.errors.status ? (
//                   <FormFeedback type="invalid">
//                     {validation.errors.status}
//                   </FormFeedback>
//                 ) : null} */}
//             </div>
//           </CardBody>
//           <CardBody>
//             {/* <CardTitle>Dropzone</CardTitle> */}
//             <CardSubtitle className="mb-3"> Select File to Upload</CardSubtitle>
//             <Form>
//               <Dropzone
//                 onDrop={(acceptedFiles) => {
//                   handleAcceptedFiles(acceptedFiles);
//                 }}
//               >
//                 {({ getRootProps, getInputProps }) => (
//                   <div className="dropzone">
//                     <div
//                       className="dz-message needsclick mt-2"
//                       {...getRootProps()}
//                     >
//                       <input {...getInputProps()} />
//                       <div className="mb-3">
//                         <i className="display-4 text-muted bx bxs-cloud-upload" />
//                       </div>
//                       <h4>Drop files here or click to upload.</h4>
//                     </div>
//                   </div>
//                 )}
//               </Dropzone>
//               <div className="dropzone-previews mt-3" id="file-previews">
//                 {selectedFiles.map((f, i) => {
//                   return (
//                     <Card
//                       className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
//                       key={i + "-file"}
//                     >
//                       <div className="p-2">
//                         <Row className="align-items-center">
//                           <Col className="col-auto">
//                             <img
//                               data-dz-thumbnail=""
//                               height="30"
//                               className="avatar-sm rounded bg-light"
//                               alt={f.name}
//                               src={f.preview}
//                             />
//                           </Col>
//                           <Col>
//                             <Link
//                               to="#"
//                               className="text-muted font-weight-bold"
//                             >
//                               {f.name}
//                             </Link>
//                             <p className="mb-0">
//                               <strong>{f.formattedSize}</strong>
//                             </p>
//                           </Col>
//                         </Row>
//                       </div>
//                     </Card>
//                   );
//                 })}
//               </div>
//             </Form>
//             <div className="text-center mt-4 ">
//               <div
//                 style={{
//                   display: "flex",
//                   gap: 5,
//                   textAlign: "center",
//                   justifyContent: "center",
//                 }}
//               >
//                 <button type="button" className="btn btn-primary mr-2 ">
//                   Upload File
//                 </button>
//                 <button type="button" className="btn btn-primary ml-2 ">
//                   Reset
//                 </button>
//                 <button type="button" className="btn btn-primary ">
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           </CardBody>
//         </Card>
//       </ModalBody>
//     </Modal>
//   );
// };

// UploadBrandList.propTypes = {
//   toggle: PropTypes.func,
//   isOpen: PropTypes.bool,
// };

// export default UploadBrandList;

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
  Toast,
  ToastBody,
  ToastHeader,
} from "reactstrap";
import { Link } from "react-router-dom";
import Dropzone from "react-dropzone";
import { addBrandList as onAddBrandList } from "/src/store/brandlist/actions";

import { useDispatch } from "react-redux";
import {
  downloadBrandUploadTemplate,
  updateBrandUploadByToken,
  uploadBrandSubmit,
} from "../../../helpers/backend_helper";

const UploadBrandList = (props) => {
  const { isOpen, toggleUploadBrand, brandStatus, actiontype } = props;

  const dispatch = useDispatch();
  const [uploadTrigger, setUploadTrigger] = useState({});
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [status, setStatus] = useState("");
  const [successMsg, setSuccessMsg] = useState(false);

  const toggleSuccessMsg = () => {
    setSuccessMsg(!successMsg);
  };

  function handleAcceptedFiles(files) {
    setSelectedFiles(files);

    updateBrandUploadByToken(uploadTrigger.token, brandSavedTemplatePayload)
      .then((res) => {
        console.log("res in updateBrandUploadByToken:" + JSON.stringify(res));
      })
      .catch((error) => {
        console.log("error in updateBrandUploadByToken:" + error);
      });
  }

  const brandSavedTemplatePayload = {
    meta_data: { type: 1, status: parseInt(status) },
    url: "",
  };

  const brandDownloadTemplatePayload = {
    meta_data: { type: 1 },
    url: "",
  };

  const handleDownloadSampleFile = () => {
    // Send a POST request to the server, from the json request convert data.fields array of strings as headers in a csv file
    downloadBrandUploadTemplate(brandDownloadTemplatePayload)
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

    uploadBrandSubmit(uploadTrigger.token, formData)
      .then((res) => {
        // debugger;
        toggleSuccessMsg();
        console.log(
          "res in uploadBrandFileForInitiatedUserUpload:" + JSON.stringify(res)
        );

        setUploadTrigger({});
        setSelectedFiles([]);

        console.log("cleared the selected files and upload trigger");
        dispatch(onAddBrandList(res.data.data));
        toggleUploadBrand();
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
          <ToastBody>Upload Brand Successfully</ToastBody>
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
        toggle={toggleUploadBrand}
      >
        {/* <Modal isOpen={modal} toggle={toggle}> */}
        <ModalHeader toggle={toggleUploadBrand} tag="h4">
          Upload Brands
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
              <div className="mb-3">
                <Label className="form-label">Status</Label>
                <Input
                  name="status"
                  type="select"
                  placeholder="Select Group Policy"
                  className="form-select"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="">Select Status</option>
                  {brandStatus &&
                    brandStatus.map((status) => (
                      <option key={status.id} value={status.id}>
                        {status.name}
                      </option>
                    ))}
                </Input>
              </div>
              <CardSubtitle className="mb-3">
                {" "}
                Select File to Upload
              </CardSubtitle>
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
                    className="btn btn-primary "
                    onClick={() => toggleUploadBrand()}
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

UploadBrandList.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default UploadBrandList;

