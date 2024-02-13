import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import TableContainer from "../../../../components/Common/TableContainer";
import {
  Card,
  CardBody,
  Row,
  Col,
  Label,
  Input,
  Form,
  CardTitle,
  Table,
  FormFeedback,
} from "reactstrap";
import { Link } from "react-router-dom";

import { createSelector } from "reselect";
import { useSelector, useDispatch } from "react-redux";

const UploadDocsFile = ({ data, updateList, selectedRowId }) => {
  console.log("upload List Data" + JSON.stringify(data));
  const [docType, setDocType] = useState("");
  const [file, setFile] = useState(null);

  const handleChangeUploadFile = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const { name, type } = selectedFile;
      const ext = name.split(".").pop();
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onload = () => {
        const data = reader.result;

        // Set the file object directly in state
        setFile({
          name,
          type,
          ext,
          data,
        });
      };
    }
  };
  const updateUploadFiles = () => {
    if (!docType) {
      return;
    }

    const newItem = {
      doctype: docType,
      document: {
        name: file.name,
        type: file.type,
        ext: file.ext,
        data: file.data,
      },
      model_id: selectedRowId,
    };
    console.log("New upload Data:" + newItem);
    const updatedData = [...data, newItem];
    console.log("Updated Data:" + updatedData);
    updateList(updatedData);

    setDocType("");
    // setCasCode("");
    // setServiceId("");
  };

  const deleteCasList = (index) => {
    const list = [...data];
    list.splice(index, 1);
    updateList(list);
  };

  return (
    <Row>
      <Col
        lg={6}
        style={{
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        <Col lg={5}>
          <div className="mb-3">
            <Input
              name="doctype"
              type="select"
              placeholder="Select Document Type"
              className="form-select"
              value={docType}
              // onChange={(e) => setCasSelection(e.target.value)}
              onChange={(e) => setDocType(e.target.value)}
              //   disabled={!data}
            >
              <option value="">Select Document Type</option>
              <option value="Post Office_Registration">
                Post Office_Registration
              </option>
              <option value="Hand Over and take over letter">
                Hand Over and take over letter
              </option>
              <option value="PAN Card">PAN Card</option>
              <option value="GST Registration">GST Registration</option>
              <option value="Aadhar Card">Aadhar Card</option>
              <option value="Address Proof">Address Proof</option>
              <option value="Agreement">Agreement</option>
              <option value="Others">Others</option>
            </Input>
          </div>
        </Col>
        <Col lg={5}>
          <div
            className="mb-3"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <Label className="form-label">File Upload</Label>
            <input name="file" type="file" onChange={handleChangeUploadFile} />
          </div>
        </Col>
        <Col lg={2}>
          <div className="mb-3">
            <button
              type="button"
              className="btn btn-primary "
              onClick={updateUploadFiles}
            >
              <i className="bx bx-right-arrow-alt" style={{ fontSize: 20 }}></i>
            </button>
          </div>
        </Col>
      </Col>
      <Col xl={6}>
        <Card>
          <CardBody>
            <div className="table-responsive">
              <Table className="table mb-0">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Proof Type</th>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Size</th>
                    <th>Download</th>
                    <th>$</th>
                  </tr>
                </thead>
                <tbody>
                  {console.log("data:" + JSON.stringify(data))}
                  {data &&
                    data.map((item, index) => (
                      <tr key={index}>
                        <th scope="row">{item.model_id}</th>
                        <td>{item.doctype}</td>
                        <td>{item.document.name}</td>
                        <td>{item.document.type}</td>
                        <td>
                          <h5>
                            <Link
                              className="text-dark"
                              to="#"
                              onClick={() => deleteCasList(index)}
                            >
                              <i
                                className="mdi mdi-delete font-size-18"
                                id="deletetooltip"
                              />
                            </Link>
                          </h5>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </div>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

UploadDocsFile.propTypes = {
  handleUpdateCasList: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default UploadDocsFile;
