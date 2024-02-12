import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardBody,
  CardText,
  CardTitle,
  Col,
  Collapse,
  Container,
  Form,
  Input,
  Button,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
  UncontrolledCollapse,
} from "reactstrap";
import classnames from "classnames";
import OperatorAccountDetails from "./TabsComponents/OperatorAccountDetails";
import AllottedBouquet from "./TabsComponents/AllottedBouquet";
import AllottedScheme from "./TabsComponents/AllottedScheme";
import AllottedNCF from "./TabsComponents/AllottedNCF";
import UploadDocuments from "./TabsComponents/UploadDocuments";
import AllottedPairing from "./TabsComponents/AllottedPairing";
import SmsLogs from "./TabsComponents/SmsLogs";

const TapsOfLco = ({
  selectedRowId,
  accountDetails,
  setAccountDetails,
  fromDate,
  toDate,
  setFromDate,
  setToDate,
  selectedRowData,
}) => {
  const [customActiveTab, setcustomActiveTab] = useState("1");
  const API_URL = "https://sms.unitch.in/api/index.php/v1";

  const [allottedBouquetData, setAllottedBouquetData] = useState([]);
  const [allottedSchemeData, setAllottedSchemeData] = useState([]);
  const [allottedPairingData, setAllottedPairingData] = useState([]);
  const [allottedNcfData, setAllottedNcfData] = useState([]);
  const [uploadDocsData, setUploadDocsData] = useState([]);
  const [smsLogsData, setSmsLogsData] = useState([]);

  const toggleCustom = (tab) => {
    if (customActiveTab !== tab) {
      setcustomActiveTab(tab);
    }
  };

  const getOperatorAccountDetails = async (e) => {
    // e.preventDefault();
    // console.log("Form submitted");
    try {
      const token = "Bearer " + localStorage.getItem("temptoken");
      // console.log("Dates: " + fromDate, toDate);
      const response = await axios.get(
        `${API_URL}/operator-account?expand=created_by_lbl,type_lbl,cr_operator_lbl,dr_operator_lbl,credited_by,igst,cgst,sgst,name,balance,credit,debit,balance_h,credit_h,debit_h&filter[operator_id]=${selectedRowId}&filter[wallet_type]=2&filter[FRM_created_at]=${fromDate}&filter[TO_created_at]=${toDate}&page=1&per-page=50&vr=web1.0`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setAccountDetails(response.data.data);
      console.log("response in useEffect:" + JSON.stringify(response));
    } catch (error) {
      console.error("Error fetching bouquet data:", error);
    }
  };

  const getAllottedBouquetDetails = async (e) => {
    if (selectedRowId) {
      try {
        const token = "Bearer " + localStorage.getItem("temptoken");

        const response = await axios.get(
          `${API_URL}/operator-bouque?expand=boxtype_lbl,type_lbl,status_lbl,created_by_lbl&filter[operator_id]=${parseInt(
            selectedRowId
          )}&vr=web1.0`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        setAllottedBouquetData(response.data.data);
        console.log("response in useEffect:" + JSON.stringify(response));
      } catch (error) {
        console.error("Error fetching bouquet data:", error);
      }
    }
  };

  const getAllottedSchemeDetails = async (e) => {
    try {
      const token = "Bearer " + localStorage.getItem("temptoken");

      const response = await axios.get(
        `${API_URL}/operator-scheme?expand=boxtype_lbl,status_lbl,created_by_lbl&filter[operator_id]=${selectedRowId}&vr=web1.0`,
        {
          headers: {
            Authorization: token,
            "content-type": "application/json",
          },
        }
      );
      setAllottedSchemeData(response.data.data);
      console.log("response in useEffect:" + JSON.stringify(response));
    } catch (error) {
      console.error("Error fetching scheme data:", error);
    }
  };

  const getCopyOfPairing = async (e) => {
    try {
      const token = "Bearer " + localStorage.getItem("temptoken");

      const response = await axios.get(
        `${API_URL}/operator-scheme?filter[operator_id]=1996&vr=web1.0`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setAllottedPairingData(response.data.data);
      console.log("response in useEffect:" + JSON.stringify(response));
    } catch (error) {
      console.error("Error fetching pairing data:", error);
    }
  };

  const getAllottedPairingDetails = async (e) => {
    try {
      const token = "Bearer " + localStorage.getItem("temptoken");

      const response = await axios.get(
        `${API_URL}/pairing?expand=created_by_lbl,status_lbl,cas_lbl,brand_lbl,boxtype_lbl,is_embeded_lbl,account_detail&filter[track]=1&filter[operator_id]=${selectedRowId}&page=1&per-page=50&vr=web1.0`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setAllottedPairingData(response.data.data);
      console.log("response in useEffect:" + JSON.stringify(response));
    } catch (error) {
      console.error("Error fetching pairing data:", error);
    }
  };

  const getAllottedNcfDetails = async (e) => {
    try {
      const token = "Bearer " + localStorage.getItem("temptoken");

      const response = await axios.get(
        `${API_URL}/ncf-rates?filter[status]=1&filter[operator_id]=${selectedRowId}&vr=web1.0`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setAllottedNcfData(response.data.data);
      console.log("response in useEffect:" + JSON.stringify(response));
    } catch (error) {
      console.error("Error fetching NCF data:", error);
    }
  };

  const getUploadDocsDetails = async (e) => {
    try {
      const token = "Bearer " + localStorage.getItem("temptoken");

      const response = await axios.get(
        `${API_URL}/operator/view-upload-doc?filter[model_id]=${selectedRowId}&expand=data&vr=web1.0`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setUploadDocsData(response.data.data);
      console.log("response in useEffect:" + JSON.stringify(response));
    } catch (error) {
      console.error("Error fetching Upload data:", error);
    }
  };

  const getSmsLogsDetails = async (e) => {
    try {
      const token = "Bearer " + localStorage.getItem("temptoken");

      const response = await axios.get(
        `${API_URL}/smslog?expand=created_by_lbl,created_on_lbl&filter[is_operator]=1&filter[id]=${selectedRowId}&page=1&per-page=50&vr=web1.0`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setSmsLogsData(response.data.data);
      console.log("response in useEffect:" + JSON.stringify(response));
    } catch (error) {
      console.error("Error fetching smsLogs data:", error);
    }
  };

  // useEffect(() => {
  //   if (selectedRowId) {
  //     getOperatorAccountDetails();
  //   }
  // }, [selectedRowId]);
  return (
    <div>
      <Nav tabs className="nav-tabs-custom nav-justified">
        <NavItem>
          <NavLink
            style={{ cursor: "pointer" }}
            className={classnames({
              active: customActiveTab === "1",
            })}
            onClick={() => {
              toggleCustom("1");
              getOperatorAccountDetails();
            }}
          >
            <span className="d-block d-sm-none">
              <i className="fas fa-home"></i>
            </span>
            <span className="d-none d-sm-block">Operator Account Details</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            style={{ cursor: "pointer" }}
            className={classnames({
              active: customActiveTab === "2",
            })}
            onClick={() => {
              toggleCustom("2");
              getAllottedBouquetDetails();
            }}
          >
            <span className="d-block d-sm-none">
              <i className="far fa-user"></i>
            </span>
            <span className="d-none d-sm-block">Allotted Bouquet</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            style={{ cursor: "pointer" }}
            className={classnames({
              active: customActiveTab === "3",
            })}
            onClick={() => {
              toggleCustom("3");
              // getAllottedSchemeDetails();
              getCopyOfPairing();
            }}
          >
            <span className="d-block d-sm-none">
              <i className="far fa-envelope"></i>
            </span>
            <span className="d-none d-sm-block">Allotted Scheme</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            style={{ cursor: "pointer" }}
            className={classnames({
              active: customActiveTab === "4",
            })}
            onClick={() => {
              toggleCustom("4");
              getAllottedPairingDetails();
            }}
          >
            <span className="d-block d-sm-none">
              <i className="fas fa-cog"></i>
            </span>
            <span className="d-none d-sm-block">Allotted Pairing</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            style={{ cursor: "pointer" }}
            className={classnames({
              active: customActiveTab === "5",
            })}
            onClick={() => {
              toggleCustom("5");
              getAllottedNcfDetails();
            }}
          >
            <span className="d-block d-sm-none">
              <i className="fas fa-cog"></i>
            </span>
            <span className="d-none d-sm-block">Allotted NCF</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            style={{ cursor: "pointer" }}
            className={classnames({
              active: customActiveTab === "6",
            })}
            onClick={() => {
              toggleCustom("6");
              getUploadDocsDetails();
            }}
          >
            <span className="d-block d-sm-none">
              <i className="fas fa-cog"></i>
            </span>
            <span className="d-none d-sm-block">Upload Documents</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            style={{ cursor: "pointer" }}
            className={classnames({
              active: customActiveTab === "7",
            })}
            onClick={() => {
              toggleCustom("7");
              getSmsLogsDetails();
            }}
          >
            <span className="d-block d-sm-none">
              <i className="fas fa-cog"></i>
            </span>
            <span className="d-none d-sm-block">SMS Logs</span>
          </NavLink>
        </NavItem>
      </Nav>

      <TabContent activeTab={customActiveTab} className="p-3 text-muted">
        <TabPane tabId="1">
          <Row>
            <Col sm="12">
              <Form
                // onSubmit={handleSearch}
                onSubmit={(e) => {
                  e.preventDefault();
                  // validation.handleSubmit();
                  // return false;
                  console.log("search btn clicked", fromDate, toDate);
                }}
              >
                <Row>
                  <Col lg={2} className="mt-2">
                    <p>Transaction Date:</p>
                  </Col>
                  <Col lg={2}>
                    <Input
                      value={fromDate}
                      onChange={(e) => setFromDate(e.target.value)}
                      type="date"
                      // onChange={validation.handleChange}
                      // onBlur={validation.handleBlur}
                      // value={validation.values.fromDate || ""}
                    />
                  </Col>
                  <Col lg={2}>
                    <Input
                      value={toDate}
                      onChange={(e) => setToDate(e.target.value)}
                      type="date"
                      // onChange={validation.handleChange}
                      // onBlur={validation.handleBlur}
                      // value={validation.values.toDate || ""}
                    />
                  </Col>
                  <Col lg={2} className="mt-1">
                    <i
                      style={{
                        background: "#556ee6",
                        color: "#fff",
                        width: "25px",
                        height: "25px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "50%",
                      }}
                      className="fas fa-search"
                      onClick={getOperatorAccountDetails}
                    ></i>
                  </Col>
                </Row>
              </Form>
              <OperatorAccountDetails
                selectedRowId={selectedRowId}
                accountDetails={accountDetails}
                setAccountDetails={setAccountDetails}
                selectedRowData={selectedRowData}
              />
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="2">
          <Row>
            <Col sm="12">
              <AllottedBouquet allottedBouquetData={allottedBouquetData} />
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="3">
          <Row>
            <Col sm="12">
              <AllottedScheme allottedSchemeData={allottedSchemeData} />
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="4">
          <Row>
            <Col sm="12">
              <AllottedPairing allottedPairingData={allottedPairingData} />
              {/* <CardText className="mb-0">No Data</CardText> */}
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="5">
          <Row>
            <Col sm="12">
              <AllottedNCF allottedNcfData={allottedNcfData} />
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="6">
          <Row>
            <Col sm="12">
              <UploadDocuments uploadDocsData={uploadDocsData} />
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="7">
          <Row>
            <Col sm="12">
              <SmsLogs smsLogsData={smsLogsData} />
              {/* <CardText className="mb-0">No Data</CardText> */}
            </Col>
          </Row>
        </TabPane>
      </TabContent>
    </div>
  );
};

export default TapsOfLco;
