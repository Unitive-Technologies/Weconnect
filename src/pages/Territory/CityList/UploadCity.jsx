// import React, { useEffect, useState, useRef, useMemo } from "react";
// import PropTypes from "prop-types";
// import {
//   Card,
//   CardBody,
//   Col,
//   Container,
//   Row,
//   Modal,
//   ModalHeader,
//   ModalBody,
//   Label,
//   FormFeedback,
//   UncontrolledTooltip,
//   Input,
//   Form,
//   CardTitle,
//   CardSubtitle,
// } from "reactstrap";
// import { Link } from "react-router-dom";
// import Dropzone from "react-dropzone";
// import { updateUser as onUpdateUser } from "/src/store/users/actions";

// const UploadCity = (props) => {
//   const { isOpen, handleUploadCity } = props;

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
//       "description",
//       "status",
//       "status_code",
//       "district_code",
//     ];
//     const data = [headers];

//     // Convert the data to CSV format
//     const csvContent = data.map((row) => row.join(",")).join("\n");

//     // Create a Blob containing the data in CSV format
//     const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

//     // Create a download link
//     const link = document.createElement("a");
//     link.href = window.URL.createObjectURL(blob);
//     link.download = "AdministrativeDivision.csv";

//     // Trigger a click on the link to start the download
//     link.click();
//   };
//   return (
//     <Modal
//       isOpen={isOpen}
//       role="dialog"
//       size="xl"
//       autoFocus={true}
//       centered={true}
//       className="exampleModal"
//       tabIndex="-1"
//       toggle={handleUploadCity}
//     >
//       <ModalHeader toggle={handleUploadCity} tag="h4">
//         Upload Cities
//       </ModalHeader>
//       <ModalBody>
//         <Card>
//           <CardBody>
//             <div className="text-left mb-4 r-0" style={{ marginLeft: "78%" }}>
//               <button
//                 type="button"
//                 className="btn btn-primary"
//                 onClick={handleDownloadSampleFile}
//               >
//                 Download Sample Upload File
//               </button>
//             </div>
//             <Row>
//               <Col lg={4}>
//                 <div className="mb-3">
//                   <Label className="form-label">District Name</Label>
//                   <Input
//                     name="district_lbl"
//                     type="text"
//                     placeholder="Enter district name"
//                     // onChange={validation.handleChange}
//                     // onBlur={validation.handleBlur}
//                     // value={validation.values.district_lbl || ""}
//                     // invalid={
//                     //   validation.touched.district_lbl &&
//                     //   validation.errors.district_lbl
//                     //     ? true
//                     //     : false
//                     // }
//                   />
//                   {/* {validation.touched.district_lbl &&
//               validation.errors.district_lbl ? (
//                 <FormFeedback type="invalid">
//                   {validation.errors.district_lbl}
//                 </FormFeedback>
//               ) : null} */}
//                 </div>
//               </Col>
//               <Col lg={4}>
//                 <div className="mb-3">
//                   <Label className="form-label">Select State</Label>
//                   <Input
//                     name="state_lbl"
//                     type="select"
//                     placeholder="Select state"
//                     className="form-select"
//                     // onChange={validation.handleChange}
//                     // onBlur={validation.handleBlur}
//                     // value={validation.values.state_lbl || ""}
//                   >
//                     <option value="">Select state</option>
//                     <option value="1">Delhi</option>
//                     <option value="2">Puducherry</option>
//                     <option value="3">Ladakh</option>
//                     <option value="4">Andaman and Nicobar Islands</option>
//                     <option value="5">Lakshadweep</option>
//                     <option value="6">Daman and Diu</option>
//                     <option value="7">Dadra and Nagar Haveli</option>
//                     <option value="8">Chandigarh</option>
//                     <option value="9">West Bengal</option>
//                     <option value="10">Uttarakhand</option>
//                     <option value="11">Utter Pradesh</option>
//                     <option value="12">Tripura</option>
//                     <option value="13">Telangana</option>
//                     <option value="14">Tamil Nadu</option>
//                     <option value="15">Sikkim</option>
//                     <option value="16">Rajasthan</option>
//                     <option value="17">Punjab</option>
//                     <option value="18">Odisha</option>
//                     <option value="19">Nagaland</option>
//                     <option value="20">Mizoram</option>
//                     <option value="21">Meghalaya</option>
//                     <option value="22">Manipur</option>
//                     <option value="23">Maharashtra</option>
//                     <option value="24">Madhya Pradesh</option>
//                     <option value="25">Kerala</option>
//                     <option value="26">Karnataka</option>
//                     <option value="27">Jharkhand</option>
//                     <option value="28">Jammu and Kashmir</option>
//                     <option value="29">Himachal Pradesh</option>
//                     <option value="30">Haryana</option>
//                     <option value="31">Gujarat</option>
//                     <option value="32">Goa</option>
//                     <option value="33">Chattisgarh</option>
//                     <option value="34">Bihar</option>
//                     <option value="35">Assam</option>
//                     <option value="36">Arunachal Pradesh</option>
//                     <option value="37">Andhra Pradesh</option>
//                   </Input>
//                   {/* {validation.touched.state_lbl && validation.errors.state_lbl ? (
//                   <FormFeedback type="invalid">
//                     {validation.errors.state_lbl}
//                   </FormFeedback>
//                 ) : null} */}
//                 </div>
//               </Col>
//               <Col lg={4}>
//                 <div className="mb-3">
//                   <Label className="form-label">Status</Label>
//                   <Input
//                     name="status"
//                     type="select"
//                     placeholder="Select Status"
//                     className="form-select"
//                     // onChange={validation.handleChange}
//                     // onBlur={validation.handleBlur}
//                     // value={validation.values.status || ""}
//                   >
//                     <option value="">Select Status</option>
//                     <option value="11">Active</option>
//                     <option value="12">BLOCKED</option>
//                     <option value="13">In-Active</option>
//                   </Input>
//                   {/* {validation.touched.status && validation.errors.status ? (
//                   <FormFeedback type="invalid">
//                     {validation.errors.status}
//                   </FormFeedback>
//                 ) : null} */}
//                 </div>
//               </Col>
//             </Row>
//           </CardBody>
//           <CardBody>
//             {/* <CardTitle>Dropzone</CardTitle> */}
//             <CardSubtitle className="mb-3">
//               {" "}
//               Select File to Upload<span style={{ color: "red" }}>*</span>
//             </CardSubtitle>
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
//       {/* </Modal> */}
//     </Modal>
//   );
// };

// UploadCity.propTypes = {
//   handleUploadCity: PropTypes.func,
//   isOpen: PropTypes.bool,
// };

// export default UploadCity;


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
import { addCity as onAddCity } from "/src/store/city/actions";

import { useDispatch } from "react-redux";
import {
  downloadCityUploadTemplate,
  updateCityUploadByToken,
  uploadCitySubmit,
} from "../../../helpers/backend_helper";

const UploadCity = (props) => {
  const { isOpen, toggleUploadCity, status, statelist, districtlist, actiontype } = props;

  const dispatch = useDispatch();
  const [uploadTrigger, setUploadTrigger] = useState({});
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [districtList, setDistrictList] = useState("");
  const [cityStatus, setCityStatus] = useState("");
  const [stateList, setStateList] = useState("");
  const [successMsg, setSuccessMsg] = useState(false);

  const toggleSuccessMsg = () => {
    setSuccessMsg(!successMsg);
  };

  function handleAcceptedFiles(files) {
    setSelectedFiles(files);

    updateCityUploadByToken(uploadTrigger.token, districtSavedTemplatePayload)
      .then((res) => {
        console.log("res in updateDistrictUploadByToken:" + JSON.stringify(res));
      })
      .catch((error) => {
        console.log("error in updateDistrictUploadByToken:" + error);
      });
  }

  const districtSavedTemplatePayload = {
    meta_data: { type: 3, status: parseInt(cityStatus), state_id: parseInt(stateList), district_id: parseInt(districtList) },
    url: "",
  };

  const cityDownloadTemplatePayload = {
    meta_data: { type: 3, status: parseInt(cityStatus), state_id: parseInt(stateList), district_id: parseInt(districtList) },
    url: "",
  };

  const handleDownloadSampleFile = () => {
    // Send a POST request to the server, from the json request convert data.fields array of strings as headers in a csv file
    downloadCityUploadTemplate(cityDownloadTemplatePayload)
      .then((res) => {
        // debugger;
        const fileName = res.data.data.type;
        const fieldStringArray = res.data.data.fields;
        console.log("Upload District response" + res.data.data.fields)
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
        console.log("error in downloadCityUploadTemplate:" + error);
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

    uploadCitySubmit(uploadTrigger.token, formData)
      .then((res) => {
        // debugger;
        toggleSuccessMsg();
        console.log(
          "res in uploadCityFileForInitiatedUserUpload:" + JSON.stringify(res)
        );

        setUploadTrigger({});
        setSelectedFiles([]);

        console.log("cleared the selected files and upload trigger");
        dispatch(onAddCity(res.data.data));
        toggleUploadCity();
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
          <ToastBody>Upload City Successfully</ToastBody>
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
        toggle={toggleUploadCity}
      >
        {/* <Modal isOpen={modal} toggle={toggle}> */}
        <ModalHeader toggle={toggleUploadCity} tag="h4">
          Upload Cities
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
                <Label className="form-label">State</Label>
                <Input
                  name="state_id"
                  type="select"
                  placeholder="Select State"
                  className="form-select"
                  value={stateList}
                  onChange={(e) => setStateList(e.target.value)}
                >
                  <option value="">Select State</option>
                  {statelist &&
                    statelist.map((state_id) => (
                      <option key={state_id.id} value={state_id.id}>
                        {state_id.name}
                      </option>
                    ))}
                </Input>
              </div>
              <div className="mb-3">
                <Label className="form-label">District</Label>
                <Input
                  name="district_id"
                  type="select"
                  placeholder="Select District"
                  className="form-select"
                  value={districtList}
                  onChange={(e) => setDistrictList(e.target.value)}
                >
                  <option value="">Select District</option>
                  {districtlist &&
                    districtlist.map((district_id) => (
                      <option key={district_id.id} value={district_id.id}>
                        {district_id.name}
                      </option>
                    ))}
                </Input>
              </div>
              <div className="mb-3">
                <Label className="form-label">Status</Label>
                <Input
                  name="status"
                  type="select"
                  placeholder="Select status"
                  className="form-select"
                  value={cityStatus}
                  onChange={(e) => setCityStatus(e.target.value)}
                >
                  <option value="">Select Status</option>
                  {status &&
                    status.map((status) => (
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
                    onClick={() => toggleUploadCity()}
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

UploadCity.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default UploadCity;



