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

const UploadDocsFile = ({ data, updateList }) => {
  console.log("Cas List Data" + JSON.stringify(data));

  const updateCasList = () => {
    if (!docType) {
      return;
    }

    const newItem = {
      model_id: data.length + 1,
      doctype: docType,
      //   cascode: casCode,
      //   serviceid: serviceId,
    };

    const updatedData = [...data, newItem];
    console.log("Updated Data:" + updatedData);
    updateList(updatedData);

    setDocType("");
    // setCasCode("");
    // setServiceId("");
  };

  const [docType, setDocType] = useState("");
  //   const [casCode, setCasCode] = useState("");
  //   const [serviceId, setServiceId] = useState("");

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
        <Col lg={12}>
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
              <option value="">Post Office_Registration</option>
              <option value="">Hand Over and take over letter</option>
              <option value="">PAN Card</option>
              <option value="">GST Registration</option>
              <option value="">Aadhar Card</option>
              <option value="">Address Proof</option>
              <option value="">Agreement</option>
              <option value="">Others</option>
            </Input>
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
                  {data &&
                    data.map((item, index) => (
                      <tr key={index}>
                        <th scope="row">{item.model_id}</th>
                        <td>{item.doctype}</td>
                        {/* <td>{item.cascode}</td>
                        <td>{item.serviceid}</td> */}
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
