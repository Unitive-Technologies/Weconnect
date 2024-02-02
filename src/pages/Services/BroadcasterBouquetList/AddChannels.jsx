import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import TableContainer from "../../../components/Common/TableContainer";
import {
  Card, CardBody, Row,
  Toast,
  Col,
  ToastHeader,
  ToastBody,
  Table,
} from "reactstrap";
import { Link } from "react-router-dom";
import AddChannelsTableList from "./AddChannelsTableList";

const AddChannels = (props) => {
  const { selectedType, selectedBroadcaster, channels, setChannels, data, updateList, broadcasterBouquetAddchannels, showEditBroadcast } = props;

  console.log("type after:" + selectedType, typeof selectedType);
  console.log("broadcaster after:" + selectedBroadcaster, typeof selectedBroadcaster);

  const [addChannelsList, setAddChannelsList] = useState([]);
  // const [channels, setChannels] = useState([]);
  {
    console.log("Channels:" + JSON.stringify(channels));
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
        Header: "Channel Name",
        accessor: "name",
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
                  {cellProps.row.original.name}
                </Link>
              </h5>
            </>
          );
        },
      },
      {
        Header: "Broadcaster",
        accessor: "brocaster_lbl",
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
                  {cellProps.row.original.broadcaster_lbl}
                </Link>
              </h5>
            </>
          );
        },
      },
      {
        Header: "Type",
        accessor: "channel_type_lbl",
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
                  {cellProps.row.original.channel_type_lbl}
                </Link>
              </h5>
            </>
          );
        },
      },
      {
        Header: "Alacarte",
        accessor: "isAlacarte_lbl",
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
                  {cellProps.row.original.isAlacarte_lbl}
                </Link>
              </h5>
            </>
          );
        },
      },
      {
        Header: "FTA",
        accessor: "isFta_lbl",
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
                  {cellProps.row.original.isFta_lbl}
                </Link>
              </h5>
            </>
          );
        },
      },
      {
        Header: "Rate",
        accessor: "broadcasterRate",
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
                  {cellProps.row.original.broadcasterRate}
                </Link>
              </h5>
            </>
          );
        },
      },
      {
        Header: "$",
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


  const addChannelsData = [];

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
        // `${API_URL}/channel/list?fields=id,name,broadcasterRate&expand=broadcaster_lbl,channel_type_lbl,isFta_lbl,isAlacarte_lbl&sort=name&filter[isFta]=${type}&vr=web1.0`,

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

  return (

    <>
      <AddChannelsTableList
        isOpen={showChannelTableList}
        data={addChannelsList}
        toggleClose={() => setShowChannelTableList(false)}
        setChannels={setChannels}
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
            <Col lg={8}></Col>
            <Col lg={4}>
              <div className="mb-3  d-flex justify-content-end">
                <button
                  onClick={
                    // {handleAddChannelsTable}
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

          <Card>
            <CardBody>
              {/* <TableContainer
                isPagination={true}
                columns={columns}
                data={addChannelsData}
                // isGlobalFilter={true}
                // isShowingPageLength={true}
                // customPageSize={50}
                tableClass="table align-middle table-nowrap table-hover"
                theadClass="table-light"
                paginationDiv="col-sm-12 col-md-7"
                pagination="pagination pagination-rounded justify-content-end mt-4"
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
                    <th>Alacarte</th>
                    <th>FTA</th>
                    <th>Rate</th>
                    <th>$</th>
                  </tr>
                </thead>
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
          </Card>
        </CardBody>
      </Card>
    </>
  );
}

AddChannels.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default AddChannels;
