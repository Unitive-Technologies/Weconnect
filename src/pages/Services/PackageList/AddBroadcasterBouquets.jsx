import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
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
} from "reactstrap";
import AddBroadcasterBouquetsTableList from "./AddBroadcasterBouquetsTableList";
import { Link } from "react-router-dom";

const AddBroadcasterBouquets = (props) => {
  const {
    selectedType,
    bouquets,
    setBouquets,
    setTotalChannelsInBouquets,
    setTotalPackageRateInBouquets,
  } = props;
  const [addBouquetsList, setAddBouquetsList] = useState([]);
  // const [channels, setChannels] = useState([]);
  {
    console.log("bouquets:" + JSON.stringify(bouquets));
  }
  const API_URL = "https://sms.unitch.in/api/index.php/v1";
  const columns = useMemo(
    () => [
      {
        Header: "#",
        disableFilters: true,
        filterable: true,
        Cell: (cellProps) => {
          const totalRows = cellProps.rows.length;
          const reverseIndex = totalRows - cellProps.row.index;

          return (
            <>
              <h5 className="font-size-14 mb-1">
                <Link className="text-dark" to="#">
                  {reverseIndex}
                </Link>
              </h5>
            </>
          );
        },
      },

      {
        Header: "Name",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <>
              <h5
                style={{
                  maxWidth: 200,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
                className="font-size-14 mb-1"
              >
                <Link className="text-dark" to="#">
                  {"Name"}
                </Link>
              </h5>
            </>
          );
        },
      },
      {
        Header: "Broadcaster",
        // accessor: "login",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <>
              <h5
                style={{
                  maxWidth: 200,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
                className="font-size-14 mb-1"
              >
                <Link className="text-dark" to="#">
                  {"Broadcaster"}
                </Link>
              </h5>
            </>
          );
        },
      },
      {
        Header: "Type",
        // accessor: "status",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <>
              <h5
                style={{
                  maxWidth: 200,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
                className="font-size-14 mb-1"
              >
                <Link className="text-dark" to="#">
                  {"Type"}
                </Link>
              </h5>
            </>
          );
        },
      },
      {
        Header: "Channel Count",
        // accessor: "status",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <>
              <h5
                style={{
                  maxWidth: 200,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
                className="font-size-14 mb-1"
              >
                <Link className="text-dark" to="#">
                  {"Channel Count"}
                </Link>
              </h5>
            </>
          );
        },
      },
      {
        Header: "FTA",
        // accessor: "status",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <>
              <h5
                style={{
                  maxWidth: 200,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
                className="font-size-14 mb-1"
              >
                <Link className="text-dark" to="#">
                  {"FTA"}
                </Link>
              </h5>
            </>
          );
        },
      },
      {
        Header: "Rate",
        // accessor: "status",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <>
              <h5
                style={{
                  maxWidth: 200,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
                className="font-size-14 mb-1"
              >
                <Link className="text-dark" to="#">
                  {"rate"}
                </Link>
              </h5>
            </>
          );
        },
      },
      {
        Header: "$",
        // accessor: "type",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <>
              <h5
                style={{
                  maxWidth: 200,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
                className="font-size-14 mb-1"
              >
                <Link className="text-dark" to="#">
                  {"$"}
                </Link>
              </h5>
            </>
          );
        },
      },
    ],
    []
  );

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
        `${API_URL}/broadcaster-bouque/list?fields=id,name,broadcasterRate,channelsGroup&expand=broadcaster_lbl,channel_type_lbl,isFta_lbl&sort=name&filter[isFta]=${type}&vr=web1.0`,

        {
          headers: {
            Authorization: token,
          },
        }
      );
      setAddBouquetsList(response.data.data);
    } catch (error) {
      console.error("Error fetching addChannels data:", error);
    }
  };

  const deleteChannel = (index) => {
    const list = [...bouquets];
    list.splice(index, 1);
    setBouquets(list);
  };
  // let totalRate = 0;
  // let totalCount = 0;

  useEffect(() => {
    let totalRate = 0;
    let totalCount = 0;
    if (bouquets) {
      bouquets.forEach((item) => {
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
  }, [bouquets]); // Add bouquets to the dependency array

  // console.log("Total Rate:", totalRate);

  return (
    <>
      <AddBroadcasterBouquetsTableList
        isOpen={showChannelTableList}
        data={addBouquetsList}
        toggleClose={() => setShowChannelTableList(false)}
        setBouquets={setBouquets}
      />
      <div
        className="position-fixed top-0 end-0 p-3"
        style={{ zIndex: "1005" }}
      >
        <Toast isOpen={showAddChannelsPlus}>
          <ToastHeader toggle={handleAddChannelsWarning}>
            <i className="mdi mdi-alert-outline me-2"></i> Warning
          </ToastHeader>
          <ToastBody>Please select package definition</ToastBody>
        </Toast>
      </div>
      <Card>
        <CardBody>
          <Row>
            <Col lg={6}></Col>
            <Col lg={6}>
              <div className="mb-3 d-flex justify-content-end">
                <button
                  onClick={
                    selectedType
                      ? handleAddChannelsTable
                      : handleAddChannelsWarning
                  }
                  type="button"
                  className="btn btn-primary d-flex justify-content-end"
                >
                  Add Broadcaster Bouquets
                  {/* <i className="mdi mdi-plus ms-1" style={{ fontSize: 20 }}></i> */}
                </button>
              </div>
            </Col>
          </Row>
          {/* <TableContainer
            columns={columns}
            data={casData}
            tableClass="table align-middle table-nowrap table-hover"
            theadClass="table-light"
          /> */}
          <Table className="table mb-0">
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
                <th>Channel Count</th>
                <th>FTA</th>
                <th>Rate</th>
                <th>$</th>
              </tr>
            </thead>
            <tbody>
              {bouquets.map((item, index) => (
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
                {/* Total Channels: {totalCount} */}
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
              </h6>
            </div>
          </Row>
        </div>
      </Card>
    </>
  );
};

AddBroadcasterBouquets.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default AddBroadcasterBouquets;
