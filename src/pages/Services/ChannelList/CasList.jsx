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
import RevenueShare from "./RevenueShare";

const CasList = ({
  data,
  updateList,
  handleUpdateCasList,
  channelListCascode,
  showEditChannel,
}) => {
  const updateCasList = () => {
    if (!casSelection || !casCode || !serviceId) {
      return;
    }

    const newItem = {
      cas_id: data.length + 1,
      cas_lbl: casSelection,
      cascode: casCode,
      serviceid: serviceId,
    };

    const updatedData = [...data, newItem];
    updateList(updatedData);
    setCasSelection("");
    setCasCode("");
    setServiceId("");
  };

  const selectChannelState = (state) => state.channelList;
  const ChannelProperties = createSelector(
    selectChannelState,
    (channelList) => ({
      casSource: channelList.casSource,
    })
  );

  const { casSource } = useSelector(ChannelProperties);

  const [casSelection, setCasSelection] = useState("");
  const [casCode, setCasCode] = useState("");
  const [serviceId, setServiceId] = useState("");

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
              placeholder="Select CAS"
              className="form-select"
              value={casSelection}
              // onChange={(e) => setCasSelection(e.target.value)}
              onChange={(e) => setCasSelection(e.target.value)}
              disabled={!data}
            >
              <option value="">Select cascode</option>
              {channelListCascode &&
                channelListCascode.map((options) => (
                  <option key={options.id} value={options.name}>
                    {options.name}
                  </option>
                ))}
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
                name="casCode"
                type="text"
                placeholder="CAS Code"
                value={casCode}
                onChange={(e) => setCasCode(e.target.value)}
              />
            </div>
          </Col>
          <Col lg={5} style={{ marginRight: "20px" }}>
            <div className="mb-3">
              <Input
                name="serviceId"
                type="text"
                placeholder="service id"
                value={serviceId}
                onChange={(e) => setServiceId(e.target.value)}
              />
            </div>
          </Col>
          <Col lg={2}>
            <div className="mb-3">
              <button
                type="button"
                className="btn btn-primary "
                onClick={updateCasList}
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
                    <th>CAS</th>
                    <th>CAS CODE</th>
                    <th>SERVICE ID</th>
                    <th>$</th>
                  </tr>
                </thead>
                <tbody>
                  {data &&
                    data.map((item, index) => (
                      <tr key={index}>
                        <th scope="row">{item.cas_id}</th>
                        <td>{item.cas_lbl}</td>
                        <td>{item.cascode}</td>
                        <td>{item.serviceid}</td>
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

CasList.propTypes = {
  handleUpdateCasList: PropTypes.func,
  isOpen: PropTypes.bool,
  channelListCascode: PropTypes.array,
  data: PropTypes.array,
};

export default CasList;
