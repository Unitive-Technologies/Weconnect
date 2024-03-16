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
  Modal,
  ModalBody,
  ModalHeader,
  ToastBody,
  ModalFooter,
  Table,
  Form,
} from "reactstrap";
import { Link } from "react-router-dom";

const ViewChannelsTableList = (props) => {
  // const { isOpen } = props
  const { isOpen, toggle, selectedBroadcaster, selectedType, definition } =
    props;
  const API_URL = "https://sms.unitch.in/api/index.php/v1";
  const [addChannelsList, setAddChannelsList] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  const handleSelectRows = (row) => {
    const isSelected = selectedRows.some(
      (selectedRow) => selectedRow.id === row.id
    );

    const channel_type_lbl = row.channel_type_lbl;

    if (
      (isSelected && channel_type_lbl === "HD" && definition === 1) ||
      !isSelected
    ) {
      const updatedSelectedRows = isSelected
        ? selectedRows.filter((selectedRow) => selectedRow.id !== row.id)
        : [...selectedRows, row];

      setSelectedRows(updatedSelectedRows);
    }
  };
  console.log(
    "selectedRows on addChannelTableList:" + JSON.stringify(selectedRows)
  );
  const [showAddChannelsPlus, setShowAddChannelsPlus] = useState(false);

  const handleAddChannelsPlus = () => {
    setShowAddChannelsPlus(!showAddChannelsPlus);
  };

  useEffect(() => {
    const getAddChannelsTable = async (e) => {
      try {
        const token = "Bearer " + localStorage.getItem("temptoken");
        // console.log("type in handle:" + selectedType, typeof selectedType);
        const type = parseInt(selectedType);
        const broadcaster = parseInt(selectedBroadcaster);
        console.log("checking of broadcaster" + JSON.stringify(broadcaster));
        console.log("type in handle:" + type, typeof type);
        console.log("broadcaster in handle:" + type, typeof broadcaster);

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
    getAddChannelsTable();
  }, [selectedType, selectedBroadcaster]);

  return (
    <Modal
      isOpen={isOpen}
      role="dialog"
      autoFocus={true}
      centered={true}
      className="exampleModal"
      tabIndex="-1"
      size="xl"
      toggle={toggle}
      // toggle={toggle}
    >
      <ModalHeader toggle={toggle} tag="h4">
        Add Channels
      </ModalHeader>
      <ModalHeader tag="h6">
        **To Select row, Click <i className="bx bx-bx bx-check"></i>
      </ModalHeader>
      <ModalBody>
        <Card>
          <CardBody>
            <div
              className="position-fixed top-0 end-0 p-3"
              style={{ zIndex: "1005" }}
            >
              <Toast isOpen={showAddChannelsPlus}>
                <ToastHeader toggle={handleAddChannelsPlus}>
                  <i className="mdi mdi-alert-outline me-2"></i> Warning
                </ToastHeader>
                <ToastBody>Please select package definition</ToastBody>
              </Toast>
            </div>
            {console.log("addChannelsList:" + JSON.stringify(addChannelsList))}

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
                </tr>
              </thead>
              {addChannelsList && (
                <tbody>
                  {addChannelsList.map((item, index) => (
                    <tr key={index}>
                      <th>
                        <input
                          type="checkbox"
                          onChange={handleSelectRows(item)}
                        />
                      </th>
                      <td
                        scope="row"
                        style={{
                          maxWidth: 10,
                        }}
                      >
                        {index + 1}
                      </td>
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
                        {parseFloat(item.broadcasterRate).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              )}
            </Table>
          </CardBody>

          <div
            style={{
              backgroundColor: "#fff",
              padding: "10px",
              width: "100%",
              boxSizing: "border-box",
            }}
          >
            <h6 style={{ textAlign: "left", margin: 0 }}>Total Items:</h6>
          </div>
          <div
            style={{
              backgroundColor: "#fff",
              padding: "10px",
              width: "100%",
              boxSizing: "border-box",
            }}
          >
            <h6 style={{ textAlign: "left", margin: 0 }}>
              *Click tick to select channels
            </h6>
          </div>
          <div
            style={{
              backgroundColor: "#fff",
              padding: "10px",
              width: "100%",
              boxSizing: "border-box",
            }}
          >
            <h6 style={{ textAlign: "left", margin: 0 }}>
              **HD packages can contain both types(HD & SD)
            </h6>
          </div>
          <Row>
            <Col>
              <ModalFooter>
                <button type="submit" className="btn btn-success save-user">
                  ADD
                </button>
              </ModalFooter>
            </Col>
          </Row>
        </Card>
      </ModalBody>
    </Modal>
  );
};

ViewChannelsTableList.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default ViewChannelsTableList;
