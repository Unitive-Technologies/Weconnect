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
import { Link } from "react-router-dom";
import AddBroadcasterBouquetsTableList from "./AddBroadcasterBouquetsTableList";
import ViewBroadcasterBouquetsTableList from "./ViewBroadcasterBouquetsTableList";

const ViewBroadcasterBouquets = (props) => {
  const {
    showEditChannel,
    selectedType,
    data,
    setBouquets,
    setTotalChannelsInBouquets,
    setTotalPackageRateInBouquets,
    totalChannelsInBouquets,
    totalPackageRateInBouquets,
  } = props;
  console.log("data in viewbrodcastBouquets:" + JSON.stringify(data));
  const API_URL = "https://sms.unitch.in/api/index.php/v1";
  const [showViewChannelsPlus, setShowViewChannelsPlus] = useState(false);
  const [addChannelsList, setAddChannelsList] = useState([]);
  const [showChannelTableList, setShowChannelTableList] = useState(false);

  const handleViewChannelsPlus = async () => {
    setShowChannelTableList(!showChannelTableList);
    try {
      const token = "Bearer " + localStorage.getItem("temptoken");

      const response = await axios.get(
        `${API_URL}/broadcaster-bouque/list?fields=id,name,broadcasterRate,channelsGroup&expand=broadcaster_lbl,channel_type_lbl,isFta_lbl&sort=name&filter[isFta]=${selectedType}&vr=web1.0`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      setAddChannelsList(response.data.data);
    } catch (error) {
      console.error("Error fetching Channels data:", error);
    }
  };

  const deleteChannel = (id) => {
    console.log("delete btn clicked" + id);
    const updatedChannels = data.filter((channel) => channel.id !== id);
    setBouquets(updatedChannels);
  };
  useEffect(() => {
    let totalRate = 0;
    let totalCount = 0;
    if (data) {
      data.forEach((item) => {
        const rate = parseFloat(item.broadcasterRate);
        const count = parseFloat(item.channelsGroup.length);

        if (!isNaN(rate)) {
          totalRate += rate;
        }

        if (!isNaN(count)) {
          totalCount += count;
        }
      });

      // Update state after the loop
      setTotalPackageRateInBouquets(totalRate);
      setTotalChannelsInBouquets(totalCount);
    }
  }, [data]);
  return (
    <>
      <AddBroadcasterBouquetsTableList
        isOpen={showChannelTableList}
        data={addChannelsList}
        toggleClose={() => setShowChannelTableList(false)}
        bouquets={data}
        setBouquets={setBouquets}
      />
      <Card>
        <CardBody>
          <Row>
            <Col lg={10}></Col>
            <Col lg={2}>
              <div className="mb-3">
                {showEditChannel && (
                  <button
                    onClick={handleViewChannelsPlus}
                    type="button"
                    className="btn btn-primary "
                  >
                    <i className="bx bx-plus" style={{ fontSize: 20 }}></i>
                  </button>
                )}
              </div>
            </Col>
          </Row>
          <ViewBroadcasterBouquetsTableList
            isOpen={showViewChannelsPlus}
            handleAddChannelsTable={() => setShowViewChannelsPlus(false)}
          />
          {/* <div
          className="position-fixed top-0 end-0 p-3"
          style={{ zIndex: "1005" }}
        >
          <Toast isOpen={showAddChannelsPlus}>
            <ToastHeader toggle={handleAddChannelsPlus}>
              <i className="mdi mdi-alert-outline me-2"></i> Warning
            </ToastHeader>
            <ToastBody>Please select package definition</ToastBody>
          </Toast>
        </div> */}

          {/* <TableContainer
          columns={columns}
          data={data}
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
                <th>Chan.Count</th>
                <th>FTA</th>
                <th>Rate</th>
                {showEditChannel && <th>$</th>}
              </tr>
            </thead>
            {data && (
              <tbody>
                {data.map((item, index) => (
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
                    <td>{item.channelsGroup.length}</td>
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
                    {showEditChannel && (
                      <td>
                        <i
                          style={{ cursor: "pointer" }}
                          onClick={() => deleteChannel(item.id)}
                          className="mdi mdi-delete font-size-18"
                          id="deletetooltip"
                        />
                        s
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            )}
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
                  Total Channels: {totalChannelsInBouquets}
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
                  Total: {parseFloat(totalPackageRateInBouquets).toFixed(2)}
                </h6>
              </div>
            </Row>
          </div>
        </CardFooter>
      </Card>
    </>
  );
};

ViewBroadcasterBouquets.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default ViewBroadcasterBouquets;
