import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import TableContainer from "../../../../components/Common/TableContainer";
import { docsTypeList } from "./docsTypeList";
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
      const { name, type, size } = selectedFile; // Access size property
      const ext = name.split(".").pop();
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onload = () => {
        const data = reader.result;

        // Set the file object along with its size in state
        setFile({
          name,
          type,
          ext,
          data,
          size, // Add size to the file object
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
        <Col lg={8}>
          <div className="mb-3">
            <Input
              name="doctype"
              type="select"
              placeholder="Select Document Type"
              className="form-select"
              value={docType}
              onChange={(e) => setDocType(e.target.value)}
            >
              <option value="">Select Document Type</option>

              {docsTypeList.map((type) => (
                <option key={type.id} value={type.value}>
                  {type.type}
                </option>
              ))}
            </Input>
          </div>
        </Col>
        <Col lg={8}>
          <div
            className="mb-3"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <Label className="form-label">File Upload</Label>
            <input name="file" type="file" onChange={handleChangeUploadFile} />
          </div>
        </Col>
        <Col lg={2}></Col>
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
                        <th scope="row">{index + 1}</th>
                        <td>{item.doctype}</td>
                        <td>{item.document.name}</td>
                        <td>{item.document.type}</td>
                        <td>{item.document.size}</td>
                        <td>
                          <Link>Download</Link>
                        </td>
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
