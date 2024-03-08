import React, { useMemo, useState, useEffect } from "react";
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
import AddPackagesTableList from "./AddPackagesTableList";
import Count from "./Count";

const AddPackages = ({
  isOpen,
  showEditBouquet,
  packagesData,
  setPackagesData,
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
}) => {
  const API_URL = "https://sms.unitch.in/api/index.php/v1";
  const [addPackageList, setAddPackageList] = useState([]);
  const [showAddPackagePlus, setShowAddPackagePlus] = useState(false);
  const [showPackageTableList, setShowPackageTableList] = useState(false);
  // const [ftaCount, setFtaCount] = useState(0);
  // const [paychannelCount, setPaychannelCount] = useState(0);
  // const [ncfCount, setNcfCount] = useState(0);
  // const [totalChannel, setTotalChannel] = useState(0);
  // const [totalRate, setTotalRate] = useState(0);
  {
    console.log("showPackageTableList: " + showPackageTableList);
  }
  const handleAddPackageWarning = () => {
    setShowAddPackagePlus(!showAddPackagePlus);
  };

  const handleAddPackageTable = async (e) => {
    try {
      setShowPackageTableList(true); // Ensure modal is set to open before API call
      const token = "Bearer " + localStorage.getItem("temptoken");
      const type = parseInt(selectedType);

      const response = await axios.get(
        `${API_URL}/package/list?fields=id,name,code,broadcasterRate&expand=package_type_lbl,isFta_lbl,channelIds,brdBouqueIds,ftaChannelCount,payChannelCount,ncfChannelCount,totalChannelCount&sort=name&vr=web1.0`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log("response :" + JSON.stringify(response));
      setAddPackageList(response.data.data);
    } catch (error) {
      console.error("Error fetching addChannels data:", error);
    }
  };

  const deleteAlacarte = (index) => {
    const list = [...packagesData];
    list.splice(index, 1);
    setPackagesData(list);
  };

  useEffect(() => {
    if (packagesData) {
      let totalNcf = 0;
      let totalPaychannel = 0;
      let totalFta = 0;
      let totalRate = 0;
      let totalChannel = 0;

      packagesData.forEach((item) => {
        if (item.isFta_lbl === "FTA") {
          const count = parseFloat(item.totalChannelCount);
          if (!isNaN(count)) {
            totalFta += count;
          }
        } else {
          const count = parseFloat(item.totalChannelCount);
          if (!isNaN(count)) {
            totalPaychannel += count;
          }
        }

        const count = parseFloat(item.ncfChannelCount);
        if (!isNaN(count)) {
          totalNcf += count;
        }

        const channel = parseFloat(item.totalChannelCount);
        if (!isNaN(channel)) {
          totalChannel += channel;
        }

        const rate = parseFloat(item.broadcasterRate);
        if (!isNaN(rate)) {
          totalRate += rate;
        }
      });

      setTotalChannel(totalChannel);
      setTotalRate(totalRate);
      setNcfCount(totalNcf);
      setFtaCount(totalFta);
      setPaychannelCount(totalPaychannel);
    }
  }, [packagesData]);

  return (
    <React.Fragment>
      {showPackageTableList && (
        <AddPackagesTableList
          isOpen={Boolean(showPackageTableList)}
          data={addPackageList}
          toggleClose={() => setShowPackageTableList(!showPackageTableList)}
          setPackagesData={setPackagesData}
          selectedIsHD={selectedIsHD}
          selectedType={selectedType}
        />
      )}
      <div
        className="position-fixed top-0 end-0 p-3"
        style={{ zIndex: "1005" }}
      >
        <Toast isOpen={showAddPackagePlus}>
          <ToastHeader toggle={handleAddPackageWarning}>
            <i className="mdi mdi-alert-outline me-2"></i> Warning
          </ToastHeader>
          <ToastBody>
            {!selectedType
              ? "Please select Box Type"
              : "Please select Bouquet Type"}
          </ToastBody>
        </Toast>
      </div>
      <Row>
        <Col lg={12}>
          <Card>
            <CardBody>
              <Row>
                <Col lg={8}></Col>
                <Col lg={4}>
                  <div className="mb-3 d-flex justify-content-end">
                    {/* {console.log("selectedIsHD: " + selectedIsHD)}
                {console.log("selectedType: " + selectedType)} */}
                    {(showEditBouquet || isOpen) && (
                      <button
                        onClick={
                          !selectedType
                            ? handleAddPackageWarning
                            : handleAddPackageTable
                        }
                        type="button"
                        className="btn btn-primary"
                        disabled={parseInt(selectedType) === 3}
                      >
                        Add Package
                      </button>
                    )}
                  </div>
                </Col>
              </Row>
              <Row>
                {" "}
                <Col lg={12}>
                  <Table
                    className="table mb-0"
                    style={{
                      minHeight: "200px",
                      maxHeight: "200px",
                      overflowY: "hidden",
                      overflowX: "scroll",
                      maxWidth: "500px",
                      marginLeft: "-30px",
                    }}
                  >
                    <thead>
                      <tr>
                        <th
                          style={{
                            maxWidth: 5,
                          }}
                        >
                          #
                        </th>
                        <th
                          style={{
                            maxWidth: 50,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          Name
                        </th>
                        <th
                          style={{
                            maxWidth: 50,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          Code
                        </th>

                        <th
                          style={{
                            maxWidth: 50,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          Type
                        </th>
                        <th
                          style={{
                            maxWidth: 50,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          Package Type
                        </th>
                        <th
                          style={{
                            maxWidth: 50,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          Channel Count
                        </th>
                        <th
                          style={{
                            maxWidth: 50,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          BBQ Count
                        </th>
                        <th
                          style={{
                            maxWidth: 50,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          NCF Count
                        </th>
                        <th
                          style={{
                            maxWidth: 50,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          Total Channel Count
                        </th>
                        <th
                          style={{
                            maxWidth: 50,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          Rate**
                        </th>
                        <th
                          style={{
                            maxWidth: 50,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          $
                        </th>
                      </tr>
                    </thead>
                    {/* {console.log(
              "packagesData after add:" + JSON.stringify(packagesData)
            )} */}
                    <tbody>
                      {packagesData &&
                        packagesData.map((item, index) => (
                          <tr key={index}>
                            <th
                              scope="row"
                              style={{
                                maxWidth: 5,
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
                            <td>{item.package_type_lbl}</td>
                            <td
                              style={{
                                maxWidth: 50,
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {item.isFta_lbl}
                            </td>
                            <td>{item.channelIds.length}</td>
                            <td>{item.brdBouqueIds.length}</td>
                            <td>{item.ncfChannelCount}</td>
                            <td>{item.totalChannelCount}</td>
                            <td
                              style={{
                                maxWidth: 50,
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                              }}
                            >
                              <td>
                                {parseFloat(item.broadcasterRate).toFixed(2)}
                              </td>
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
                </Col>
              </Row>
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
        </Col>
      </Row>
    </React.Fragment>
  );
};

// AddAlacarte.propTypes = {
//   toggle: PropTypes.func,
//   isOpen: PropTypes.bool,
// };

export default AddPackages;
