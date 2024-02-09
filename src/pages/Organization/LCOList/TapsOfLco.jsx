import React, { useState } from "react";
import {
  Card,
  CardBody,
  CardText,
  CardTitle,
  Col,
  Collapse,
  Container,
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

const TapsOfLco = ({ selectedRowId }) => {
  const [customActiveTab, setcustomActiveTab] = useState("1");

  const toggleCustom = (tab) => {
    if (customActiveTab !== tab) {
      setcustomActiveTab(tab);
    }
  };

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
              <OperatorAccountDetails selectedRowId={selectedRowId} />
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="2">
          <Row>
            <Col sm="12">
              <AllottedBouquet />
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="3">
          <Row>
            <Col sm="12">
              <AllottedScheme />
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="4">
          <Row>
            <Col sm="12">
              <CardText className="mb-0">No Data</CardText>
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="5">
          <Row>
            <Col sm="12">
              <AllottedNCF />
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="6">
          <Row>
            <Col sm="12">
              <UploadDocuments />
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="7">
          <Row>
            <Col sm="12">
              <CardText className="mb-0">No Data</CardText>
            </Col>
          </Row>
        </TabPane>
      </TabContent>
    </div>
  );
};

export default TapsOfLco;
