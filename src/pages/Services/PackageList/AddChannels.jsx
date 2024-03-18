import React, { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import TableContainer from "../../../components/Common/TableContainer";
import {
  Card,
  CardBody,
  Col,
  Input,
  Row,
  Toast,
  ToastHeader,
  ToastBody,
  Table,
  CardFooter,
} from "reactstrap";
import AddChannelsTableList from "./AddChannelsTableList";
import { Link } from "react-router-dom";

const AddChannels = (props) => {
  const {
    definition,
    selectedType,
    channels,
    setChannels,
    setTotalChannelsInChannels,
    setTotalPackageRateInChannels,
    totalChannelsInChannels,
    totalPackageRateInChannels,
  } = props;
  console.log("type after:" + selectedType, typeof selectedType);
  const [addChannelsList, setAddChannelsList] = useState([]);
  // const [channels, setChannels] = useState([]);
  {
    console.log("Channels:" + JSON.stringify(channels));
  }
  const API_URL = "https://sms.unitch.in/api/index.php/v1";

  const [showAddChannelsPlus, setShowAddChannelsPlus] = useState(false);
  const [showChannelTableList, setShowChannelTableList] = useState(false);

  const handleAddChannelsWarning = () => {
    setShowAddChannelsPlus(!showAddChannelsPlus);
  };

  const handleAddChannelsTable = async (e) => {
    setShowChannelTableList(true);
    try {
      const token = "Bearer " + localStorage.getItem("temptoken");
      // console.log("type in handle:" + selectedType, typeof selectedType);
      const type = parseInt(selectedType);
      console.log("type in handle:" + type, typeof type);

      const response = await axios.get(
        `${API_URL}/channel/list?fields=id,name,broadcasterRate&expand=broadcaster_lbl,channel_type_lbl,isFta_lbl,isAlacarte_lbl&sort=name&filter[isFta]=${type}&vr=web1.0`,

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
  console.log("ShowChannelTableList:" + JSON.stringify(addChannelsList));

  const deleteChannel = (index) => {
    const list = [...channels];
    list.splice(index, 1);
    setChannels(list);
  };
  // const deleteChannel = (index) => {
  //   console.log("delete btn clicked");
  //   const updatedChannels = channels.filter((_, i) => i !== index);
  //   setChannels(updatedChannels);
  // };

  useEffect(() => {
    let totalRate = 0;
    if (channels) {
      channels.forEach((item) => {
        const rate = parseFloat(item.broadcasterRate);

        if (!isNaN(rate)) {
          totalRate += rate;
          setTotalPackageRateInChannels(totalRate);
        }
      });
      setTotalChannelsInChannels(channels.length);
    }
  }, [channels]);
  // console.log("Total Rate:", totalRate);

  return (
    <>
      <AddChannelsTableList
        isOpen={showChannelTableList}
        data={addChannelsList}
        toggleClose={() => setShowChannelTableList(false)}
        channels={channels}
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
              ? "Please select Package Definition"
              : "Please select Package Type"}{" "}
          </ToastBody>
        </Toast>
      </div>

      <Card>
        <CardBody>
          <Row>
            <Col lg={8}></Col>
            <Col lg={4}>
              <div className="mb-3  d-flex justify-content-end">
                <button
                  onClick={
                    selectedType
                      ? handleAddChannelsTable
                      : handleAddChannelsWarning
                  }
                  type="button"
                  className="btn btn-primary"
                >
                  Add Channels
                  {/* <i className="mdi mdi-plus ms-1" style={{ fontSize: 20 }}></i> */}
                </button>
              </div>
            </Col>
          </Row>

          {/* <TableContainer
            columns={columns}
            data={channels && channels}
            tableClass="table align-middle table-nowrap table-hover"
            theadClass="table-light"
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
                <th>$</th>
              </tr>
            </thead>
            <tbody>
              {channels &&
                channels.map((item, index) => (
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
                    <td>
                      <h5>
                        <Link
                          className="text-dark"
                          to="#"
                          onClick={() => deleteChannel(index)}
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
        </CardBody>
        <CardFooter className="fixed">
          <div style={{ display: "flex" }}>
            <Row
              style={{
                border: "1px solid #ced4da",
                padding: "5px 0px",
                margin: "1px 0px",
                width: "450px",
                height: "50px",
                display: "flex",
              }}
            >
              <div
                style={{
                  backgroundColor: "#fff",
                  padding: "10px",
                  width: "100%",
                  boxSizing: "border-box",
                }}
              >
                <h6 style={{ textAlign: "left", margin: 0 }}>
                  {/* Total Channels: {channels.length} */}
                  Total Channels: {totalChannelsInChannels}
                </h6>
              </div>
            </Row>
            <Row
              style={{
                border: "1px solid #ced4da",
                padding: "5px 0px",
                margin: "1px 0px",
                width: "250px",
                display: "flex",
              }}
            >
              <div
                style={{
                  backgroundColor: "#fff",
                  padding: "10px",
                  width: "100%",
                  boxSizing: "border-box",
                }}
              >
                <h6 style={{ textAlign: "center", margin: 0 }}>
                  {/* Total: {parseFloat(totalRate).toFixed(2)} */}
                  Total: {parseFloat(totalPackageRateInChannels).toFixed(2)}
                </h6>
              </div>
            </Row>
          </div>
        </CardFooter>
      </Card>
    </>
  );
};

AddChannels.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default AddChannels;
