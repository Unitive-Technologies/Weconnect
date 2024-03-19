import React, { useMemo, useState, useEffect } from "react";
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
import ViewChannelsTableList from "./ViewChannelsTableList";
import AddChannelsTableList from "./AddChannelsTableList";

const ViewChannels = (props) => {
  const {
    showEditChannel,
    setChannels,
    data,
    selectedType,
    setTotalChannelsInChannels,
    setTotalPackageRateInChannels,
    totalChannelsInChannels,
    totalPackageRateInChannels,
  } = props;
  const API_URL = "https://sms.unitch.in/api/index.php/v1";
  const [showViewChannelsPlus, setShowViewChannelsPlus] = useState(false);
  const [addChannelsList, setAddChannelsList] = useState([]);
  const [showChannelTableList, setShowChannelTableList] = useState(false);

  const handleViewChannelsPlus = async () => {
    // setShowViewChannelsPlus(!showViewChannelsPlus);
    setShowChannelTableList(!showChannelTableList);
    try {
      const token = "Bearer " + localStorage.getItem("temptoken");

      const response = await axios.get(
        `${API_URL}/channel/list?fields=id,name,broadcasterRate&expand=broadcaster_lbl,channel_type_lbl,isFta_lbl,isAlacarte_lbl&sort=name&filter[isFta]=${selectedType}&vr=web1.0`,
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
    setChannels(updatedChannels);
  };

  useEffect(() => {
    let totalRate = 0;
    if (data) {
      data.forEach((item) => {
        const rate = parseFloat(item.broadcasterRate);

        if (!isNaN(rate)) {
          totalRate += rate;
          setTotalPackageRateInChannels(totalRate);
        }
      });
      setTotalChannelsInChannels(data.length);
    }
  }, [data]);

  return (
    <>
      <AddChannelsTableList
        isOpen={showChannelTableList}
        data={addChannelsList}
        toggleClose={() => setShowChannelTableList(false)}
        channels={data}
        setChannels={setChannels}
        // definition={definition}
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
          <ViewChannelsTableList
            isOpen={showViewChannelsPlus}
            handleAddChannelsTable={() => setShowViewChannelsPlus(false)}
          />
          {/* <div
          className="position-fixed top-0 end-0 p-3"
          style={{ zIndex: "1005" }}
        >
          <Toast isOpen={showViewChannelsPlus}>
            <ToastHeader toggle={handleViewChannelsPlus}>
              <i className="mdi mdi-alert-outline me-2"></i> Warning
            </ToastHeader>
            <ToastBody>Please select package definition</ToastBody>
          </Toast>
        </div> */}

          {/* <TableContainer
            isPagination={true}
            columns={columns}
            data={data}
            tableClass="table align-middle table-nowrap table-hover"
            theadClass="table-light"
            paginationDiv="col-sm-12 col-md-7"
            pagination="pagination pagination-rounded justify-content-end mt-4"
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
                    {showEditChannel && (
                      <td>
                        <i
                          style={{ cursor: "pointer" }}
                          onClick={() => deleteChannel(item.id)}
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

ViewChannels.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default ViewChannels;
