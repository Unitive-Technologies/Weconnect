import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import TableContainer from "../../../components/Common/TableContainer";
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

const ViewMetaData = ({
  data,
  updateList,
  showEditSMS
}) => {
  console.log("Cas List Data" + JSON.stringify(data));

  const updateMetaData = () => {
    if (!type || !field || !label) {
      return;
    }

    const newItem = {
      id: data.length + 1,
      type: type, // Assign the selected type
      field: field, // Assign the entered field
      label: label, // Assign the entered label
    };

    const updatedData = [...data, newItem];
    console.log("Updated Data in CasList" + updatedData);
    updateList(updatedData);

    setType("");
    setField("");
    setLabel("");
  };


  const selectChannelState = (state) => state.channelList;
  const ChannelProperties = createSelector(
    selectChannelState,
    (channelList) => ({
      casSource: channelList.casSource,
    })
  );

  const { casSource } = useSelector(ChannelProperties);

  const [type, setType] = useState("");
  const [field, setField] = useState("");
  const [label, setLabel] = useState("");

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
              name="casSelection"
              type="select"
              placeholder="Select type"
              className="form-select"
              value={type}
              // onChange={(e) => setCasSelection(e.target.value)}
              onChange={(e) => setType(e.target.value)}
              disabled={!showEditSMS}
            >
              <option value="">Select type</option>
              <option value="int">INTEGER</option>
              <option value="str">STRING</option>
            </Input>
          </div>
        </Col>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Col lg={5} style={{ marginRight: "20px" }}>
            <div className="mb-3">
              {/* <TODO>Add handlechange and update cascode</TODO> */}
              <Input
                name="Enter field"
                type="text"
                placeholder="Enter field"
                value={field}
                onChange={(e) => setField(e.target.value)}
                disabled={!showEditSMS}
              />
            </div>
          </Col>
          <Col lg={5} style={{ marginRight: "20px" }}>
            <div className="mb-3">
              <Input
                name="Enter label"
                type="text"
                placeholder="Enter label"
                value={label}
                disabled={!showEditSMS}
                onChange={(e) => setLabel(e.target.value)}
              />
            </div>
          </Col>
          <Col lg={2}>
            <div className="mb-3">
              <button
                type="button"
                className="btn btn-primary "
                onClick={updateMetaData}
              >
                <i
                  className="bx bx-right-arrow-alt"
                  style={{ fontSize: 20 }}
                ></i>
              </button>
            </div>
          </Col>
        </div>
      </Col>
      <Col xl={6}>
        <Card>
          <CardBody>
            <div className="table-responsive">
              <Table className="table mb-0">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Type</th>
                    <th>Field</th>
                    <th>Label</th>
                    <th>$</th>
                  </tr>
                </thead>
                <tbody>
                  {data &&
                    data.map((item, index) => (
                      <tr key={index}>
                        <th scope="row">{item.id}</th>
                        <td>{item.type}</td>
                        <td>{item.field}</td>
                        <td>{item.label}</td>
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

ViewMetaData.propTypes = {
  handleUpdateCasList: PropTypes.func,
  isOpen: PropTypes.bool,
  channelListCascode: PropTypes.array,
  data: PropTypes.array,
};

export default ViewMetaData;
