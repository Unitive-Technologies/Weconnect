import React, { useEffect, useState, useRef, useMemo } from "react";
import { Link } from "react-router-dom";
import withRouter from "../../components/Common/withRouter";
import TableContainer from "../../components/Common/TableContainer";
import "bootstrap/dist/css/bootstrap.min.css";
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
  document.title = "Inventory | VDigital";
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("1");
  const [selectedOption, setSelectedOption] = useState("Stock");

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
      {
        Header: "Action",
        accessor: "action",
        disableFilters: true,
        Cell: (cellProps) => {
          return (
            <ul className="list-unstyled hstack gap-1 mb-0">
              <li data-bs-toggle="tooltip" data-bs-placement="top" title="View">
                <Link to="/job-details" className="btn btn-sm btn-soft-primary">
                  <i className="mdi mdi-eye-outline" id="viewtooltip"></i>
                </Link>
              </li>
              <UncontrolledTooltip placement="top" target="viewtooltip">
                View
              </UncontrolledTooltip>

              <li>
                <Link
                  to="#"
                  className="btn btn-sm btn-soft-info"
                  onClick={() => {
                    const jobData = cellProps.row.original;
                    handleJobClick(jobData);
                  }}
                >
                  <i className="mdi mdi-pencil-outline" id="edittooltip" />
                  <UncontrolledTooltip placement="top" target="edittooltip">
                    Edit
                  </UncontrolledTooltip>
                </Link>
              </li>

              <li>
                <Link
                  to="#"
                  className="btn btn-sm btn-soft-danger"
                  onClick={() => {
                    const jobData = cellProps.row.original;
                    onClickDelete(jobData);
                  }}
                >
                  <i className="mdi mdi-delete-outline" id="deletetooltip" />
                  <UncontrolledTooltip placement="top" target="deletetooltip">
                    Delete
                  </UncontrolledTooltip>
                </Link>
              </li>
            </ul>
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
        dropdownName: "Bulk",
      },
      {
        name: "Update",
        // action: setShowAddCity,
        type: "dropdown",
        // icon: "create",
        dropdownName: "Bulk",
      },
      {
        name: "Mark Faulty",
        // action: setShowAddCity,
        type: "dot",
        icon: "action",
        dropdownName: "",
      },
      {
        name: "Blacklist",
        // action: setShowAddCity,
        type: "dot",
        icon: "action",
        dropdownName: "",
      },
      {
        name: "update Brand/Warehouse/Inventory state",
        // action: setShowAddCity,
        type: "dot",
        icon: "action",
        dropdownName: "",
      },
    ];
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs breadcrumbItem="Inventory" />
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <div>
                    <div className="float-end">
                      <div className="input-group input-group-sm">
                        <select
                          className="form-select form-select-sm"
                          value={selectedOption}
                          onChange={(e) => {
                            setSelectedOption(e.target.value);
                          }}
                        >
                          <option value="Stock">In-stock</option>
                          <option value="Blacklisted">Blacklisted</option>
                          <option value="Allotted">Allotted</option>
                          <option value="Faulty">Faulty</option>
                        </select>
                        <label className="input-group-text">Status</label>
                      </div>
                    </div>
                    <Nav
                      pills
                      className="bg-light rounded"
                      style={{
                        width: "40%",
                        display: "flex",
                        justifyContent: "space-between",
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
                          Smartcard
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
                          STB
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
                          Pairing
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames({
                            active: activeTab === "4",
                          })}
                          onClick={() => {
                            toggleTab("4");
                          }}
                        >
                          Track
                        </NavLink>
                      </NavItem>
                    </Nav>
                  </div>
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
