import React, { useMemo, useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import TableContainer from "../../../components/Common/TableContainer";
import {
  Card,
  CardBody,
  Col,
  Row,
  Table,
  Toast,
  ToastBody,
  ToastHeader,
} from "reactstrap";
import { Link } from "react-router-dom";
import ViewChannelsTableList from "./ViewChannelsTableList";
import AddChannels from "./AddChannels";
import AddChannelsTableList from "./AddChannelsTableList";

const ViewChannels = (props) => {
  const {
    channels,
    setChannels,
    showEditBroadcast,
    definition,
    selectedType,
    selectedBroadcaster,
    broadcasterBouquetAddchannels,
  } = props;
  // console.log("data in viewchannels:" + JSON.stringify(channels));
  console.log(
    "definition, selectedType, selectedBroadcaster :" + definition,
    selectedType,
    selectedBroadcaster
  );
  const API_URL = "https://sms.unitch.in/api/index.php/v1";
  const [showViewChannelsPlus, setShowViewChannelsPlus] = useState(false);
  const [showChannelTableList, setShowChannelTableList] = useState(false);
  const [showAddChannelsPlus, setShowAddChannelsPlus] = useState(false);
  const [addChannelsList, setAddChannelsList] = useState([]);
  const handleViewChannelsPlus = () => {
    setShowViewChannelsPlus(!showViewChannelsPlus);
  };

  const toggleShowChannelTableList = () => {
    setShowChannelTableList(!showChannelTableList);
  };

  // const deleteChannel = (index) => {
  //   console.log("delete btn clicked");
  //   const list = [...channels];
  //   list.splice(index, 1);
  //   setChannels(list);
  // };
  const deleteChannel = (index) => {
    console.log("delete btn clicked");
    const updatedChannels = channels.filter((_, i) => i !== index);
    setChannels(updatedChannels);
  };

  const handleAddChannelsWarning = () => {
    setShowAddChannelsPlus(!showAddChannelsPlus);
  };

  const handleAddChannelsTable = async (e) => {
    setShowChannelTableList(true);
    try {
      const token = "Bearer " + localStorage.getItem("temptoken");
      // console.log("type in handle:" + selectedType, typeof selectedType);
      const type = parseInt(selectedType);
      const broadcaster = parseInt(selectedBroadcaster);
      // console.log("checking of broadcaster" + JSON.stringify(broadcaster));
      // console.log("type in handle:" + type, typeof type);
      console.log(
        "broadcaster in handle:" + type,
        typeof type,
        broadcaster,
        typeof broadcaster
      );

      const response = await axios.get(
        `${API_URL}/channel/list?fields=id,name,broadcasterRate&expand=broadcaster_lbl,channel_type_lbl,isFta_lbl,isAlacarte_lbl&sort=name&filter[isFta]=${type}&filter[broadcaster_id]=${broadcaster}&vr=web1.0`,

        {
          headers: {
            Authorization: token,
          },
        }
      );
      setAddChannelsList(response.data.data);
    } catch (error) {
      console.error("Error fetching addChannels data:", error);
    }
  };
  return (
    <>
      <AddChannelsTableList
        isOpen={showChannelTableList}
        data={addChannelsList}
        toggleClose={toggleShowChannelTableList}
        setChannels={setChannels}
        definition={definition}
      />
      <div
        className="position-fixed top-0 end-0 p-3"
        style={{ zIndex: "1005" }}
      >
        <Toast isOpen={showAddChannelsPlus}>
          <ToastHeader toggle={handleAddChannelsWarning}>
            <i className="mdi mdi-alert-outline me-2"></i> Warning
          </ToastHeader>
          <ToastBody>
            {!definition
              ? "Please select Channel Definition"
              : !selectedType
              ? "Please select Channel Type"
              : "Please select Broadcaster"}
          </ToastBody>
        </Toast>
      </div>
      <Card>
        <CardBody>
          <Row>
            <Col lg={10}></Col>
            <Col lg={2}>
              <div className="mb-3">
                {showEditBroadcast && (
                  <button
                    type="button"
                    // onClick={toggleShowChannelTableList}
                    onClick={
                      definition && selectedType && selectedBroadcaster
                        ? handleAddChannelsTable
                        : handleAddChannelsWarning
                    }
                    className="btn btn-primary d-flex justify-content-end"
                  >
                    <i
                      className="mdi mdi-plus ms-1"
                      style={{ fontSize: 20 }}
                    ></i>
                  </button>
                )}
              </div>
            </Col>
          </Row>
          {/* <ViewChannelsTableList
          isOpen={showViewChannelsPlus}
          toggle={handleViewChannelsPlus}
          selectedType={selectedType}
          selectedBroadcaster={selectedBroadcaster}
          definition={definition}
        /> */}
          {/* <AddChannels
          channels={channels}
          setChannels={setChannels}
          broadcasterBouquetAddchannels={broadcasterBouquetAddchannels}
          definition={definition}
          selectedType={selectedType}
          selectedBroadcaster={selectedBroadcaster}
        /> */}
          <Table
            className="table mb-0"
            style={{
              minHeight: "200px",
              maxHeight: "200px",
              overflowY: "hidden",
            }}
          >
            <thead>
              <tr>
                <th
                  style={{
                    maxWidth: 10,
                  }}
                >
                  #
                </th>
                <th>Name</th>
                <th>BroadCaster</th>
                <th>Type</th>
                <th>Alacarte</th>
                <th>FTA</th>
                <th>Rate</th>
                {showEditBroadcast && <th>$</th>}
              </tr>
            </thead>
            {channels && (
              <tbody>
                {channels.map((item, index) => (
                  <tr key={index}>
                    <th
                      scope="row"
                      style={{
                        maxWidth: 10,
                      }}
                    >
                      {index + 1}
                    </th>
                    <td
                      style={{
                        maxWidth: 100,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {item.name}
                    </td>
                    <td
                      style={{
                        maxWidth: 50,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {item.broadcaster_lbl}
                    </td>
                    <td>{item.channel_type_lbl}</td>
                    <td>{item.isAlacarte_lbl}</td>
                    <td>{item.isFta_lbl}</td>
                    <td
                      style={{
                        maxWidth: 50,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {" "}
                      <td>{parseFloat(item.broadcasterRate).toFixed(2)}</td>
                    </td>
                    {showEditBroadcast && (
                      <td>
                        <i
                          style={{ cursor: "pointer" }}
                          onClick={() => deleteChannel(index)}
                          className="mdi mdi-delete font-size-18"
                          id="deletetooltip"
                        />
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            )}
          </Table>
        </CardBody>
      </Card>
    </>
  );
};

ViewChannels.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default ViewChannels;
