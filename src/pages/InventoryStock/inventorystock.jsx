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
  TabContent,
  TabPane,
  UncontrolledTooltip,
} from "reactstrap";
import Breadcrumbs from "/src/components/Common/Breadcrumb";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { ToastContainer } from "react-toastify";
import classnames from "classnames";
import {
  getInventoryStockSmartcard as onGetInventoryStockSmartcard,
  getInventoryStockStb as onGetInventoryStockStb,
  getInventoryStockPairing as onGetInventoryStockPairing,
  goToPage as onGoToPage,
  getInventoryStockScCastype as onGetInventoryStockScCastype,
  getInventoryStockScInventorystate as onGetInventoryStockScInventorystate,
  getInventoryStockScStatetype as onGetInventoryStockScStatetype,
  getInventoryStockScWarehouse as onGetInventoryStockScWarehouse,
  getInventoryStockScBrand1 as onGetInventoryStockScBrand1,
  getInventoryStockScBrand2 as onGetInventoryStockScBrand2,
} from "/src/store/inventorystock/actions";
import {
  getInventoryFaultySmartcard as onGetInventoryFaultySmartcard,
  getInventoryFaultyStb as onGetInventoryFaultyStb,
  getInventoryFaultyPairing as onGetInventoryFaultyPairing,
  goToPage as onGoToPage1,
} from "/src/store/inventoryfaulty/actions";
import {
  getInventoryBlacklistedSmartcard as onGetInventoryBlacklistedSmartcard,
  getInventoryBlacklistedStb as onGetInventoryBlacklistedStb,
  getInventoryBlacklistedPairing as onGetInventoryBlacklistedPairing,
} from "/src/store/inventoryblacklisted/actions";
import {
  getInventoryAllottedSmartcard as onGetInventoryAllottedSmartcard,
  getInventoryAllottedStb as onGetInventoryAllottedStb,
  getInventoryAllottedPairing as onGetInventoryAllottedPairing,
  goToPage as onGoToPage2,
} from "/src/store/inventoryallotted/actions";
import StockStb from "./StockStb";
import StockPairing from "./StockPairing";
import InventoryTrack from "./InventoryTrack";
import AddStockSmartcard from "./AddStockSmartcard";
import AddStockStb from "./AddStockStb";

const InventoryStock = (props) => {
  document.title = "Inventory | VDigital";
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("1");
  const [selectedOption, setSelectedOption] = useState("In-stock");
  const [showAddStockSmartcard, setShowAddStockSmartcard] = useState(false);
  const [showAddStockStb, setShowAddStockStb] = useState(false);

  const selectInventoryStockState = (state) => state.stockpairing;
  const inventorystockProperties = createSelector(
    selectInventoryStockState,
    (stockpairing) => ({
      stocksmartcard: stockpairing.inventorystock,
      loading: stockpairing.loading,
      stockstb: stockpairing.stockstb,
      stockpairing: stockpairing.stockpairing,
      stocktotalPage: stockpairing.totalPages,
      stocktotalCount: stockpairing.totalCount,
      stockpageSize: stockpairing.perPage,
      stockcurrentPage: stockpairing.currentPage,
      stocksccastype: stockpairing.stocksccastype,
      stockscwarehouse: stockpairing.stockscwarehouse,
      stockscstatetype: stockpairing.stockscstatetype,
      stockscinventorystate: stockpairing.stockscinventorystate,
      brand1: stockpairing.brand1,
      brand2: stockpairing.brand2,
    })
  );

  const {
    stocksmartcard,
    loading,
    stockstb,
    stockpairing,
    stocktotalPage,
    stocktotalCount,
    stockpageSize,
    stockcurrentPage,
    stocksccastype,
    stockscwarehouse,
    stockscstatetype,
    stockscinventorystate,
    brand1,
    brand2,
  } = useSelector(inventorystockProperties);

  useEffect(() => {
    if (stockpairing && !stockpairing.length) {
      dispatch(onGetInventoryStockSmartcard());
      dispatch(onGetInventoryStockStb());
      dispatch(onGetInventoryStockPairing());
      dispatch(onGetInventoryStockScCastype());
      dispatch(onGetInventoryStockScInventorystate());
      dispatch(onGetInventoryStockScStatetype());
      dispatch(onGetInventoryStockScWarehouse());
      dispatch(onGetInventoryStockScBrand1());
      dispatch(onGetInventoryStockScBrand2());
    }
  }, [dispatch, stockpairing]);

  const selectInventoryFaultyState = (state) => state.faultysmartcard;
  const inventoryfaultyProperties = createSelector(
    selectInventoryFaultyState,
    (faultysmartcard) => ({
      faultysmartcard: faultysmartcard.faultysmartcard,
      faultystb: faultysmartcard.faultystb,
      faultypairing: faultysmartcard.faultypairing,
      faultytotalPage: faultysmartcard.totalPages,
      faultytotalCount: faultysmartcard.totalCount,
      faultypageSize: faultysmartcard.perPage,
      faultycurrentPage: faultysmartcard.currentPage,
    })
  );

  const {
    faultysmartcard,
    faultystb,
    faultypairing,
    faultycurrentPage,
    faultypageSize,
    faultytotalCount,
    faultytotalPage,
  } = useSelector(inventoryfaultyProperties);

  useEffect(() => {
    if (faultysmartcard && !faultysmartcard.length) {
      dispatch(onGetInventoryFaultySmartcard());
      dispatch(onGetInventoryFaultyStb());
      dispatch(onGetInventoryFaultyPairing());
    }
  }, [dispatch, faultysmartcard]);

  const selectInventoryAllottedState = (state) => state.allottedpairing;
  const inventoryallottedProperties = createSelector(
    selectInventoryAllottedState,
    (allottedpairing) => ({
      allottedsmartcard: allottedpairing.allottedsmartcard,
      allottedstb: allottedpairing.allottedstb,
      allottedpairing: allottedpairing.allottedpairing,
      allottedtotalPage: allottedpairing.totalPages,
      allottedtotalCount: allottedpairing.totalCount,
      allottedpageSize: allottedpairing.perPage,
      allottedcurrentPage: allottedpairing.currentPage,
    })
  );

  const {
    allottedsmartcard,
    allottedstb,
    allottedpairing,
    allottedcurrentPage,
    allottedpageSize,
    allottedtotalCount,
    allottedtotalPage,
  } = useSelector(inventoryallottedProperties);

  useEffect(() => {
    if (allottedpairing && !allottedpairing.length) {
      dispatch(onGetInventoryAllottedSmartcard());
      dispatch(onGetInventoryAllottedStb());
      dispatch(onGetInventoryAllottedPairing());
    }
  }, [dispatch, allottedpairing]);

  const selectInventoryBlacklistedState = (state) => state.blacklistedsmartcard;
  const inventoryblacklistedProperties = createSelector(
    selectInventoryBlacklistedState,
    (blaclistedsmartcard) => ({
      blacklistedsmartcard: blaclistedsmartcard.blacklistedsmartcard,
      blacklistedstb: blaclistedsmartcard.blacklistedstb,
      blacklistedpairing: blaclistedsmartcard.blacklistedpairing,
    })
  );

  const { blacklistedsmartcard, blacklistedstb, blacklistedpairing } =
    useSelector(inventoryblacklistedProperties);

  useEffect(() => {
    dispatch(onGetInventoryBlacklistedSmartcard());
    dispatch(onGetInventoryBlacklistedStb());
    dispatch(onGetInventoryBlacklistedPairing());
  }, [dispatch]);

  const goToPage = (toPage) => {
    dispatch(onGoToPage(toPage));
    dispatch(onGetInventoryStockPairing());
  };

  const goToPage1 = (toPage) => {
    dispatch(onGoToPage1(toPage));
    dispatch(onGetInventoryFaultyPairing());
  };

  const goToPage2 = (toPage) => {
    dispatch(onGoToPage2(toPage));
    dispatch(onGetInventoryAllottedPairing());
  };

  const toggleTab = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  const getFilteredData = () => {
    if (selectedOption === "In-stock") {
      if (activeTab === "1") {
        return stocksmartcard;
      } else if (activeTab === "2") {
        return stockstb;
      } else if (activeTab === "3") {
        return stockpairing;
      }
    } else if (selectedOption === "Faulty") {
      if (activeTab === "1") {
        return faultysmartcard;
      } else if (activeTab === "2") {
        return faultystb;
      } else if (activeTab === "3") {
        return faultypairing;
      }
    } else if (selectedOption === "Blacklisted") {
      if (activeTab === "1") {
        return blacklistedsmartcard;
      } else if (activeTab === "2") {
        return blacklistedstb;
      } else if (activeTab === "3") {
        return blacklistedpairing;
      }
    } else if (selectedOption === "Allotted") {
      if (activeTab === "1") {
        return allottedsmartcard;
      } else if (activeTab === "2") {
        return allottedstb;
      } else if (activeTab === "3") {
        return allottedpairing;
      }
    }
    return [];
  };

  const getFilteredTotalPage = () => {
    if (selectedOption === "In-stock") {
      if (activeTab === "3") {
        return stocktotalPage;
      }
    } else if (selectedOption === "Faulty") {
      if (activeTab === "3") {
        return faultytotalPage;
      }
    } else if (selectedOption === "Allotted") {
      if (activeTab === "3") {
        return allottedtotalPage;
      }
    }
  };

  const getFilteredTotalCount = () => {
    if (selectedOption === "In-stock") {
      if (activeTab === "3") {
        return stocktotalCount;
      }
    } else if (selectedOption === "Faulty") {
      if (activeTab === "3") {
        return faultytotalCount;
      }
    } else if (selectedOption === "Allotted") {
      if (activeTab === "3") {
        return allottedtotalCount;
      }
    }
  };

  const getFilteredPageSize = () => {
    if (selectedOption === "In-stock") {
      if (activeTab === "3") {
        return stockpageSize;
      }
    } else if (selectedOption === "Faulty") {
      if (activeTab === "3") {
        return faultypageSize;
      }
    } else if (selectedOption === "Allotted") {
      if (activeTab === "3") {
        return allottedpageSize;
      }
    }
  };

  const getFilteredCurrentPage = () => {
    if (selectedOption === "In-stock") {
      if (activeTab === "3") {
        return stockcurrentPage;
      }
    } else if (selectedOption === "Faulty") {
      if (activeTab === "3") {
        return faultycurrentPage;
      }
    } else if (selectedOption === "Allotted") {
      if (activeTab === "3") {
        return allottedcurrentPage;
      }
    }
  };

  const getFilteredGoToPage = () => {
    if (selectedOption === "In-stock") {
      if (activeTab === "3") {
        return goToPage;
      }
    } else if (selectedOption === "Faulty") {
      if (activeTab === "3") {
        return goToPage1;
      }
    } else if (selectedOption === "Allotted") {
      if (activeTab === "3") {
        return goToPage2;
      }
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
        accessor: "smartcardno",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <>
              <p className="font-size-14 mb-1">
                {cellProps.row.original.smartcardno}
              </p>
            </>
          );
        },
      },
      {
        Header: "CAS",
        accessor: "cas_lbl",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">{cellProps.row.original.cas_lbl}</p>
          );
        },
      },
      {
        Header: "Brand",
        accessor: "brand_lbl",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              {cellProps.row.original.brand_lbl}
            </p>
          );
        },
      },
      {
        Header: "Stock Type",
        accessor: "state_lbl",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              {cellProps.row.original.state_lbl}
            </p>
          );
        },
      },
      {
        Header: "Inventory State",
        accessor: "inv_state_lbl",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              {cellProps.row.original.inv_state_lbl}
            </p>
          );
        },
      },
      {
        Header: "Warehouse",
        accessor: "warehouse_lbl",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              {cellProps.row.original.warehouse_lbl}
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

  const handleAddStockSmartcard = () => {
    setShowAddStockSmartcard(!showAddStockSmartcard);
  };

  const handleAddStockStb = () => {
    setShowAddStockStb(!showAddStockStb);
  };
  const getFilteredTableActions = () => {
    let actions = [];
    if (selectedOption === "In-stock") {
      if (activeTab === "1") {
        actions = [
          {
            name: "Create",
            type: "normal",
            icon: "create",
            action: setShowAddStockSmartcard,
          },
          {
            name: "Upload",
            type: "dropdown",
            dropdownName: "Bulk",
          },
          {
            name: "Update",
            type: "dropdown",
            dropdownName: "Bulk",
          },
          {
            name: "Mark Faulty",
            type: "dot",
            icon: "action",
            dropdownName: "",
          },
          {
            name: "Blacklist",
            type: "dot",
            icon: "action",
            dropdownName: "",
          },
          {
            name: "Update Brand/Warehouse/Inventory state",
            type: "dot",
            icon: "action",
            dropdownName: "",
          },
        ];
        return actions;
      } else if (activeTab === "2") {
        actions = [
          {
            name: "Create",
            type: "normal",
            icon: "create",
            action: setShowAddStockStb,
          },
          {
            name: "Upload",
            type: "dropdown",
            dropdownName: "Bulk",
          },
          {
            name: "Update",
            type: "dropdown",
            dropdownName: "Bulk",
          },
          {
            name: "Mark Faulty",
            type: "dot",
            icon: "action",
            dropdownName: "",
          },
          {
            name: "Blacklist",
            type: "dot",
            icon: "action",
            dropdownName: "",
          },
          {
            name: "Update Brand/Warehouse/Inventory state",
            type: "dot",
            icon: "action",
            dropdownName: "",
          },
        ];
        return actions;
      } else if (activeTab === "3") {
        actions = [
          {
            name: "Create",
            type: "normal",
            icon: "create",
          },
          {
            name: "Upload",
            type: "dropdown",
            dropdownName: "Bulk",
          },
          {
            name: "Update",
            type: "dropdown",
            dropdownName: "Bulk",
          },
          {
            name: "Mark Faulty",
            type: "dot",
            icon: "action",
            dropdownName: "",
          },
          {
            name: "Blacklist",
            type: "dot",
            icon: "action",
            dropdownName: "",
          },
          {
            name: "Delete pairing",
            type: "dot",
            icon: "action",
            dropdownName: "",
          },
        ];
        return actions;
      }
    } else if (selectedOption === "Allotted") {
      actions = [
        {
          name: "Create",
          type: "normal",
          icon: "create",
        },
        {
          name: "Upload",
          type: "dropdown",
          dropdownName: "Bulk",
        },
        {
          name: "Update",
          type: "dropdown",
          dropdownName: "Bulk",
        },
        {
          name: "De-Allot",
          type: "dot",
          icon: "action",
          dropdownName: "",
        },
      ];
      return actions;
    } else if (selectedOption === "Faulty") {
      if (activeTab === "1") {
        actions = [
          {
            name: "Create",
            type: "normal",
            icon: "create",
          },
          {
            name: "Upload",
            type: "dropdown",
            dropdownName: "Bulk",
          },
          {
            name: "Update",
            type: "dropdown",
            dropdownName: "Bulk",
          },
          {
            name: "Send to Smartcard Stock",
            type: "dot",
            icon: "action",
            dropdownName: "",
          },
          {
            name: "Blacklist",
            type: "dot",
            icon: "action",
            dropdownName: "",
          },
        ];
        return actions;
      } else if (activeTab === "2") {
        actions = [
          {
            name: "Create",
            type: "normal",
            icon: "create",
          },
          {
            name: "Upload",
            type: "dropdown",
            dropdownName: "Bulk",
          },
          {
            name: "Update",
            type: "dropdown",
            dropdownName: "Bulk",
          },
          {
            name: "Send to STB Stock",
            type: "dot",
            icon: "action",
            dropdownName: "",
          },
          {
            name: "Blacklist",
            type: "dot",
            icon: "action",
            dropdownName: "",
          },
        ];
        return actions;
      } else if (activeTab === "3") {
        actions = [
          {
            name: "Create",
            type: "normal",
            icon: "create",
          },
          {
            name: "Upload",
            type: "dropdown",
            dropdownName: "Bulk",
          },
          {
            name: "Update",
            type: "dropdown",
            dropdownName: "Bulk",
          },
          {
            name: "Send to Pairing Stock",
            type: "dot",
            icon: "action",
            dropdownName: "",
          },
          {
            name: "Blacklist",
            type: "dot",
            icon: "action",
            dropdownName: "",
          },
        ];
        return actions;
      }
    } else if (selectedOption === "Blacklisted") {
      actions = [
        {
          name: "Create",
          type: "normal",
          icon: "create",
        },
        {
          name: "Upload",
          type: "dropdown",
          dropdownName: "Bulk",
        },
        {
          name: "Update",
          type: "dropdown",
          dropdownName: "Bulk",
        },
        {
          name: "",
          type: "dot",
          icon: "action",
          dropdownName: "",
        },
      ];
      return actions;
    }
    return [];
  };

  return (
    <React.Fragment>
      <AddStockSmartcard
        isOpen={showAddStockSmartcard}
        toggle={handleAddStockSmartcard}
        stocksccastype={stocksccastype}
        stockscwarehouse={stockscwarehouse}
        stockscstatetype={stockscstatetype}
        stockscinventorystate={stockscinventorystate}
        brand1={brand1}
        brand2={brand2}
      />
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
                          <option value="In-stock">In-stock</option>
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
                    <TabContent
                      activeTab={activeTab}
                      className="p-3 text-muted"
                    >
                      <TabPane tabId="1">
                        <Row>
                          <Col sm="12">
                            <TableContainer
                              isPagination={true}
                              columns={columns}
                              data={getFilteredData()}
                              isGlobalFilter={true}
                              isShowTableActionButtons={true}
                              isShowingPageLength={true}
                              tableActions={getFilteredTableActions()}
                              customPageSize={100}
                              tableClass="table align-middle table-nowrap table-hover"
                              theadClass="table-light"
                              paginationDiv="col-sm-12 col-md-7"
                              pagination="pagination pagination-rounded justify-content-end mt-4"
                            />
                          </Col>
                        </Row>
                      </TabPane>
                      <TabPane tabId="2">
                        <Row>
                          <Col sm="12">
                            <StockStb
                              stockstb={getFilteredData()}
                              tableActions={getFilteredTableActions()}
                              stocksccastype={stocksccastype}
                              stockscwarehouse={stockscwarehouse}
                              stockscstatetype={stockscstatetype}
                              stockscinventorystate={stockscinventorystate}
                              brand1={brand1}
                              brand2={brand2}
                              isOpen={showAddStockStb}
                              toggle={handleAddStockStb}
                            />
                          </Col>
                        </Row>
                      </TabPane>
                      <TabPane tabId="3">
                        <Row>
                          <Col sm="12">
                            <StockPairing
                              stockpairing={getFilteredData()}
                              goToPage={getFilteredGoToPage()}
                              totalCount={getFilteredTotalCount()}
                              pageSize={getFilteredPageSize()}
                              currentPage={getFilteredCurrentPage()}
                              totalPage={getFilteredTotalPage()}
                              loading={loading}
                              tableActions={getFilteredTableActions()}
                              isOpen={showAddStockStb}
                              toggle={handleAddStockStb}
                            />
                          </Col>
                        </Row>
                      </TabPane>
                      <TabPane tabId="4">
                        <Row>
                          <Col sm="12">
                            <InventoryTrack />
                          </Col>
                        </Row>
                      </TabPane>
                    </TabContent>
                  </div>
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
