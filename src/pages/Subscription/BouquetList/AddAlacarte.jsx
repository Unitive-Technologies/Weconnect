import React, { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import TableContainer from "../../../components/Common/TableContainer";
import {
  Card,
  CardBody,
  Table,
  Toast,
  ToastHeader,
  Row,
  Col,
  ToastBody,
} from "reactstrap";
import { Link } from "react-router-dom";
import AddAlacarteTableList from "./AddAlacarteTableList";
import Count from "./Count";

const AddAlacarte = ({
  isOpen,
  showEditBouquet,
  alacarteData,
  setAlacarteData,
  selectedType,
  selectedIsHD,
  ftaCount,
  paychannelCount,
  ncfCount,
  totalChannel,
  totalRate,
  setFtaCount,
  setPaychannelCount,
  setNcfCount,
  setTotalChannel,
  setTotalRate,
  toggleNcfSwitch,
}) => {
  console.log(
    "Alacarte channels in add alacarte:",
    JSON.stringify(alacarteData)
  );
  const API_URL = "https://sms.unitch.in/api/index.php/v1";
  const [addAlacarteList, setAddAlacarteList] = useState([]);
  const [showAddAlacartePlus, setShowAddAlacartePlus] = useState(false);
  const [showAlacarteTableList, setShowAlacarteTableList] = useState(false);

  {
    console.log("showAlacarteTableList: " + showAlacarteTableList);
  }
  const handleAddAlacarteWarning = () => {
    setShowAddAlacartePlus(!showAddAlacartePlus);
  };

  const handleAddAlacarteTable = async (e) => {
    try {
      setShowAlacarteTableList(true); // Ensure modal is set to open before API call
      const token = "Bearer " + localStorage.getItem("temptoken");
      const type = parseInt(selectedType);

      const response = await axios.get(
        `${API_URL}/channel/list?fields=id,name,code,broadcasterRate&expand=broadcaster_lbl,channel_type_lbl,isFta_lbl,isNCF_lbl&filter[isAlacarte]=1&sort=name&vr=web1.0`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log("response :" + JSON.stringify(response));
      setAddAlacarteList(response.data.data);
    } catch (error) {
      console.error("Error fetching addChannels data:", error);
    }
  };

  const deleteAlacarte = (index) => {
    const list = [...alacarteData];
    list.splice(index, 1);
    setAlacarteData(list);
  };
  useEffect(() => {
    if (alacarteData) {
      let ftaCount = 0;
      let paychannelCount = 0;
      let ncfCount = 0;
      let totalRate = 0;

      alacarteData.forEach((item) => {
        if (item.isFta_lbl === "Yes") {
          ftaCount++;
        } else {
          paychannelCount++;
        }
        if (item.isNCF_lbl === "Yes") {
          ncfCount++;
        }
        const rate = parseFloat(item.broadcasterRate);

        if (!isNaN(rate)) {
          totalRate += rate;
        }
      });

      setTotalChannel(alacarteData.length || 0);
      setFtaCount(ftaCount);
      setNcfCount(ncfCount);
      setPaychannelCount(paychannelCount);
      setTotalRate(totalRate);
    }
  }, [alacarteData]);

  return (
    <React.Fragment>
      {showAlacarteTableList && (
        <AddAlacarteTableList
          isOpen={Boolean(showAlacarteTableList)}
          data={addAlacarteList}
          toggleClose={() => setShowAlacarteTableList(!showAlacarteTableList)}
          setAlacarteData={setAlacarteData}
          selectedIsHD={selectedIsHD}
          selectedType={selectedType}
        />
      )}
      <div
        className="position-fixed top-0 end-0 p-3"
        style={{ zIndex: "1005" }}
      >
        <Toast isOpen={showAddAlacartePlus}>
          <ToastHeader toggle={handleAddAlacarteWarning}>
            <i className="mdi mdi-alert-outline me-2"></i> Warning
          </ToastHeader>
          <ToastBody>
            {!selectedType
              ? "Please select Box Type"
              : "Please select Bouquet Type"}
          </ToastBody>
        </Toast>
      </div>

      <Card>
        <CardBody>
          <Row>
            <Col lg={8}></Col>
            <Col lg={4}>
              <div className="mb-3 d-flex justify-content-end">
                {console.log("selectedIsHD: " + selectedIsHD)}
                {console.log("selectedType: " + selectedType)}
                {(showEditBouquet || isOpen) && (
                  <button
                    // disabled={!showEditBouquet && !isOpen}
                    onClick={
                      !selectedType
                        ? handleAddAlacarteWarning
                        : handleAddAlacarteTable
                    }
                    type="button"
                    className="btn btn-primary"
                  >
                    Add Alacarte
                  </button>
                )}
              </div>
            </Col>
          </Row>

          <Table
            className="table mb-0"
            style={{
              minHeight: "200px",
              maxHeight: "200px",
              overflowY: "hidden",
              marginLeft: "-20px",
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
                <th>Code</th>
                <th>BroadCaster</th>
                <th>Type</th>
                <th>FTA</th>
                <th>NCF</th>
                <th>Rate**</th>
                <th>$</th>
              </tr>
            </thead>
            {console.log(
              "alacarteData after add:" + JSON.stringify(alacarteData)
            )}
            <tbody>
              {alacarteData &&
                alacarteData.map((item, index) => (
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
                        maxWidth: 50,
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
                      {item.code}
                    </td>
                    <td
                      style={{
                        maxWidth: 40,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {item.broadcaster_lbl}
                    </td>
                    <td>{item.channel_type_lbl}</td>
                    <td
                      style={{
                        maxWidth: 50,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {item.isFta_lbl === "Yes" ? "FTA" : "Pay Channel"}
                    </td>
                    <td>{item.isNCF_lbl}</td>
                    <td
                      style={{
                        maxWidth: 50,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {/* <td>{item.broadcasterRate}</td> */}
                      <td>{parseFloat(item.broadcasterRate).toFixed(2)}</td>
                    </td>
                    <td>
                      <h5>
                        <Link
                          className="text-dark"
                          to="#"
                          onClick={() => deleteAlacarte(index)}
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

          {/* <Count
            ftaCount={ftaCount}
            paychannelCount={paychannelCount}
            ncfCount={ncfCount}
            totalChannel={totalChannel}
            totalRate={totalRate}
          /> */}
        </CardBody>
        {/* <CardFooter className="fixed">
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
        </CardFooter> */}
      </Card>
    </React.Fragment>
  );
};

AddAlacarte.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default AddAlacarte;
