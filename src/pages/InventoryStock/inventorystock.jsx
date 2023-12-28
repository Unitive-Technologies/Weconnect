import React, { useEffect, useState, useRef, useMemo } from "react";
import { Link } from "react-router-dom";
import withRouter from "../../components/Common/withRouter";
import TableContainer from "../../components/Common/TableContainer";
// import "bootstrap/dist/css/bootstrap.min.css";
import {
  Card,
  CardBody,
  Col,
  Container,
  Nav,
  NavItem,
  NavLink,
  Row,
  UncontrolledTooltip,
} from "reactstrap";
import Breadcrumbs from "/src/components/Common/Breadcrumb";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { ToastContainer } from "react-toastify";
import classnames from "classnames";

const InventoryStock = (props) => {
  document.title = "Inventory Stocks | VDigital";
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("1");

  const toggleTab = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  const columns = useMemo(
    () => [
      {
        Header: "*",
        disableFilters: true,
        filterable: true,
        Cell: () => {
          return (
            <>
              <i className="bx bx-bx bx-check"></i>
            </>
          );
        },
      },
      {
        Header: "#",
        // accessor: "name",
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
        Header: "Smartcard No.",
        accessor: "smartcard_no",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <>
              <p className="font-size-14 mb-1">
                {cellProps.row.original.smartcard_no}
              </p>
            </>
          );
        },
      },
      {
        Header: "CAS",
        accessor: "cas",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">{cellProps.row.original.cas}</p>
          );
        },
      },
      {
        Header: "Brand",
        accessor: "brand",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">{cellProps.row.original.brand}</p>
          );
        },
      },
      {
        Header: "Stock Type",
        accessor: "stock_type",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              {cellProps.row.original.stock_type}
            </p>
          );
        },
      },
      {
        Header: "Inventory State",
        accessor: "inventory_state",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              {cellProps.row.original.inventory_state}
            </p>
          );
        },
      },
      {
        Header: "Warehouse",
        accessor: "warehouse",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              {cellProps.row.original.warehouse}
            </p>
          );
        },
      },
      {
        Header: "Status",
        accessor: "status_lbl",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              {cellProps.row.original.status_lbl}
            </p>
          );
        },
      },
      {
        Header: "Created At",
        accessor: "created_at",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              {cellProps.row.original.created_at}
            </p>
          );
        },
      },
      {
        Header: "Created By",
        accessor: "created_by_lbl",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              {cellProps.row.original.created_by_lbl}
            </p>
          );
        },
      },
    ],
    []
  );

  const data = [];

  const getTableActions = () => {
    return [
      {
        name: "Create",
        // action: setShowAddCity,
        type: "normal",
        icon: "create",
      },
      {
        name: "Upload",
        // action: setShowAddCity,
        type: "dropdown",
        // icon: "create",
        dropdownName: "Action",
      },
      {
        name: "Bulk Update",
        // action: setShowAddCity,
        type: "dropdown",
        // icon: "create",
        dropdownName: "Action",
      },
    ];
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Inventory" breadcrumbItem="Stocks" />
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <div className="clearfix" style={{ marginBottom: "10px" }}>
                    <div className="float-start">
                      <div className="input-group input-group-sm">
                        <select
                          className="form-select form-select-sm"
                          // value={seletedMonth}
                          // onChange={(e) => {
                          //   onChangeMonth(e.target.value);
                          // }}
                        >
                          <option value="stock">Stock</option>
                          <option value="blacklisted">Blacklisted</option>
                          <option value="allowed">Allated</option>
                          <option value="faulty">Faulty</option>
                        </select>
                        <label className="input-group-text">In-Stock</label>
                      </div>
                    </div>
                  </div>
                  <Nav
                    pills
                    className="bg-light rounded"
                    style={{
                      width: "30%",
                      display: "flex",
                      justifyContent: "space-evenly",
                    }}
                  >
                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: activeTab === "1",
                        })}
                        onClick={() => {
                          toggleTab("1");
                        }}
                      >
                        Smartcards
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: activeTab === "2",
                        })}
                        onClick={() => {
                          toggleTab("2");
                        }}
                      >
                        STBs
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: activeTab === "3",
                        })}
                        onClick={() => {
                          toggleTab("3");
                        }}
                      >
                        Pairings
                      </NavLink>
                    </NavItem>
                  </Nav>
                  <TableContainer
                    isPagination={true}
                    columns={columns}
                    data={data}
                    isGlobalFilter={true}
                    isShowTableActionButtons={true}
                    isShowingPageLength={true}
                    tableActions={getTableActions()}
                    customPageSize={100}
                    tableClass="table-bordered align-middle nowrap mt-2"
                    paginationDiv="col-sm-12 col-md-7"
                    pagination="pagination justify-content-end pagination-rounded"
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
      <ToastContainer />
    </React.Fragment>
  );
};

export default withRouter(InventoryStock);
