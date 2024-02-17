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
  Toast,
  ToastBody,
  ToastHeader,
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
  getPairingSmartcardList as onGetPairingSmartcardList,
  getPairingStbList as onGetPairingStbList,
  getStockActionInventorystate as onGetStockActionInventorystate,
  getStockPairingInventorystate as onGetStockPairingInventoryState,
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
  goToPage as onGoToPage3,
} from "/src/store/inventoryblacklisted/actions";
import {
  getInventoryAllottedSmartcard as onGetInventoryAllottedSmartcard,
  getInventoryAllottedStb as onGetInventoryAllottedStb,
  getInventoryAllottedPairing as onGetInventoryAllottedPairing,
  goToPage as onGoToPage2,
  getInventoryAllottedSmartcardlist as onGetInventoryAllottedSmartcardlist,
  getInventoryAllottedUsertype as onGetInventoryAllottedUsertype,
  getInventoryAllottedOperatorlist as onGetInventoryAllottedOperatorlist,
  getInventoryAllottedStblist as onGetInventoryAllottedStblist,
  getInventoryAllottedDistributor as onGetInventoryAllottedDistributor,
  getInventoryAllottedLco as onGetInventoryAllottedLco,
} from "/src/store/inventoryallotted/actions";
import StockStb from "./StockStb";
import StockPairing from "./StockPairing";
import InventoryTrack from "./InventoryTrack";
import AddStockSmartcard from "./AddStockSmartcard";
import UploadSmartcard from "./UploadSmartcaed";
import StockScMarkfaulty from "./StockScMarkfaulty";
import StockScBlacklist from "./StockScBlacklist";
import StockActionUpdation from "./StockActionUpdation";
import BulkUpdateSmartcard from "./BulkUpdateSmartcard";
import FaultySendToStock from "./FaultySendToStock";
import FaultySmartcardBlacklist from "./FaultySmartcardBlacklist";
import AllottedSmrtcard from "./AllottedSmartcard";
import DeallotSmartcard from "./DeallotSmartcard";

const InventoryStock = (props) => {
  document.title = "Inventory | VDigital";
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("1");
  const [selectedOption, setSelectedOption] = useState("In-stock");
  const [showAddStockSmartcard, setShowAddStockSmartcard] = useState(false);
  const [showAddStockStb, setShowAddStockStb] = useState(false);
  const [showCreatePairing, setShowCreatePairing] = useState(false);
  const [showUploadSmartcard, setShowUploadSmartcard] = useState(false);
  const [showStockScMarkfaulty, setShowStockScMarkfaulty] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [showStockScBlacklist, setShowStockScBlacklist] = useState(false);
  const [showStockActionupdated, setShowStockActionupdated] = useState(false);
  const [selectedStbs, setSelectedStbs] = useState([]);
  const [showStockStbMarkfaulty, setShowStockStbMarkfaulty] = useState(false);
  const [showStockStbBlacklist, setShowStockStbBlacklist] = useState(false);
  const [showStbActionupdated, setShowStbActionupdated] = useState(false);
  const [selectedPairings, setSelectedPairings] = useState([]);
  const [showStockPairingMarkfaulty, setShowStockPairingMarkfaulty] =
    useState(false);
  const [showStockPairingBlacklist, setShowStockPairingBlacklist] =
    useState(false);
  const [showDeleteStockPairing, setShowDeleteStockPairing] = useState(false);
  const [showBulkUpdateSmartcard, setShowBulkUpdateSmartcard] = useState(false);
  const [selectedFaultyScs, setSelectedFaultyScs] = useState([]);
  const [showFaultySmartcardSendsc, setShowFaultySmartcardSendsc] =
    useState(false);
  const [showFaultySmartcardBlacklist, setShowFaultySmartcardBlacklist] =
    useState(false);
  const [selectedFaultyStbs, setSelectedFaultyStbs] = useState([]);
  const [showFaultyStbSendstb, setShowFaultyStbSendstb] = useState(false);
  const [showFaultyStbBlacklist, setShowFaultyStbBlacklist] = useState(false);
  const [selectedFaultyPairings, setSelectedFaultyPairings] = useState([]);
  const [showFaultyPairingSendpair, setShowFaultyPairingSendpair] =
    useState(false);
  const [showFaultyPairingBlacklist, setShowFaultyPairingBlacklist] =
    useState(false);
  const [showAllottedSmartcard, setShowAllottedSmartcard] = useState(false);
  const [selectedAllottedSmartcards, setSelectedAllottedSmartcards] = useState(
    []
  );
  const [showDeallotSmartcard, setShowDeallotSmartcard] = useState(false);
  const [showDeallotStb, setShowDeallotStb] = useState(false);
  const [showAllottedStb, setShowAllottedStb] = useState(false);
  const [selectedAllottedStbs, setSelectedAllottedStbs] = useState([]);

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
      smartcardlist: stockpairing.smartcardlist,
      stblist: stockpairing.stblist,
      actioninventorystate: stockpairing.actioninventorystate,
      pairinginventorystate: stockpairing.pairinginventorystate,
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
    smartcardlist,
    stblist,
    actioninventorystate,
    pairinginventorystate,
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
      dispatch(onGetPairingSmartcardList());
      dispatch(onGetPairingStbList());
      dispatch(onGetStockActionInventorystate());
      dispatch(onGetStockPairingInventoryState());
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
      allottedsmartcardlist: allottedpairing.allottedsmartcardlist,
      allottedusertype: allottedpairing.allottedusertype,
      allottedoperatorlist: allottedpairing.allottedoperatorlist,
      allotteddistributor: allottedpairing.allotteddistributor,
      allottedstblist: allottedpairing.allottedstblist,
      allottedlco: allottedpairing.allottedlco,
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
    allottedsmartcardlist,
    allottedusertype,
    allottedoperatorlist,
    allotteddistributor,
    allottedlco,
    allottedstblist,
  } = useSelector(inventoryallottedProperties);

  useEffect(() => {
    if (allottedpairing && !allottedpairing.length) {
      dispatch(onGetInventoryAllottedSmartcard());
      dispatch(onGetInventoryAllottedStb());
      dispatch(onGetInventoryAllottedPairing());
      dispatch(onGetInventoryAllottedOperatorlist());
      dispatch(onGetInventoryAllottedSmartcardlist());
      dispatch(onGetInventoryAllottedUsertype());
      dispatch(onGetInventoryAllottedDistributor());
      dispatch(onGetInventoryAllottedLco());
      dispatch(onGetInventoryAllottedStblist());
    }
  }, [dispatch, allottedpairing]);

  const selectInventoryBlacklistedState = (state) => state.blacklistedsmartcard;
  const inventoryblacklistedProperties = createSelector(
    selectInventoryBlacklistedState,
    (blaclistedsmartcard) => ({
      blacklistedsmartcard: blaclistedsmartcard.blacklistedsmartcard,
      blacklistedstb: blaclistedsmartcard.blacklistedstb,
      blacklistedpairing: blaclistedsmartcard.blacklistedpairing,
      blacklistedtotalPage: blaclistedsmartcard.totalPages,
      blacklistedtotalCount: blaclistedsmartcard.totalCount,
      blacklistedpageSize: blaclistedsmartcard.perPage,
      blacklistedcurrentPage: blaclistedsmartcard.currentPage,
    })
  );

  const {
    blacklistedsmartcard,
    blacklistedstb,
    blacklistedpairing,
    blacklistedcurrentPage,
    blacklistedpageSize,
    blacklistedtotalCount,
    blacklistedtotalPage,
  } = useSelector(inventoryblacklistedProperties);

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

  const goToPage3 = (toPage) => {
    dispatch(onGoToPage3(toPage));
    dispatch(onGetInventoryBlacklistedPairing());
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
    } else if (selectedOption === "Blacklisted") {
      if (activeTab === "3") {
        return blacklistedtotalPage;
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
    } else if (selectedOption === "Blacklisted") {
      if (activeTab === "3") {
        return blacklistedtotalCount;
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
    } else if (selectedOption === "Blacklisted") {
      if (activeTab === "3") {
        return blacklistedpageSize;
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
    } else if (selectedOption === "Blacklisted") {
      if (activeTab === "3") {
        return blacklistedcurrentPage;
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
    } else if (selectedOption === "Blacklisted") {
      if (activeTab === "3") {
        return goToPage3;
      }
    }
  };

  useEffect(() => {
    // console.log("Selected Allotted smartcard: ", selectedAllottedSmartcards);
    console.log("Allotted stb list: ", allottedstblist);
    // }, [selectedAllottedSmartcards]);
  }, []);

  const handleSelectedRows = (row) => {
    const isSelected = selectedRows.some(
      (selectedRow) => selectedRow.id === row.id
    );
    if (isSelected) {
      const updatedSelectedRows = selectedRows.filter(
        (selectedRow) => selectedRow.id !== row.id
      );
      setSelectedRows(updatedSelectedRows);
    } else {
      setSelectedRows([...selectedRows, row]);
    }
  };

  const handleSelectedStbs = (row) => {
    const isSelected = selectedStbs.some(
      (selectedStb) => selectedStb.id === row.id
    );
    if (isSelected) {
      const updatedSelectedStbs = selectedStbs.filter(
        (selectedStb) => selectedStb.id !== row.id
      );
      setSelectedStbs(updatedSelectedStbs);
    } else {
      setSelectedStbs([...selectedStbs, row]);
    }
  };

  const handleSelectedPairings = (row) => {
    const isSelected = selectedPairings.some(
      (selectedPairing) => selectedPairing.id === row.id
    );
    if (isSelected) {
      const updatedSelectedPairings = selectedPairings.filter(
        (selectedPairing) => selectedPairing.id !== row.id
      );
      setSelectedPairings(updatedSelectedPairings);
    } else {
      setSelectedPairings([...selectedPairings, row]);
    }
  };

  const handleSelectedFaultySc = (row) => {
    const isSelected = selectedFaultyScs.some(
      (selectedFaultySc) => selectedFaultySc.id === row.id
    );
    if (isSelected) {
      const updatedSelectedFaultyScs = selectedFaultyScs.filter(
        (selectedFaultySc) => selectedFaultySc.id !== row.id
      );
      setSelectedFaultyScs(updatedSelectedFaultyScs);
    } else {
      setSelectedFaultyScs([...selectedFaultyScs, row]);
    }
  };

  const handleSelectedFaultyStb = (row) => {
    const isSelected = selectedFaultyStbs.some(
      (selectedFaultyStb) => selectedFaultyStb.id === row.id
    );
    if (isSelected) {
      const updatedSelectedFaultyStbs = selectedFaultyStbs.filter(
        (selectedFaultyStb) => selectedFaultyStb.id !== row.id
      );
      setSelectedFaultyStbs(updatedSelectedFaultyStbs);
    } else {
      setSelectedFaultyStbs([...selectedFaultyStbs, row]);
    }
  };

  const handleSelectedFaultyPairing = (row) => {
    const isSelected = selectedFaultyPairings.some(
      (selectedFaultyPairing) => selectedFaultyPairing.id === row.id
    );
    if (isSelected) {
      const updatedSelectedFaultyPairings = selectedFaultyPairings.filter(
        (selectedFaultyPairing) => selectedFaultyPairing.id !== row.id
      );
      setSelectedFaultyPairings(updatedSelectedFaultyPairings);
    } else {
      setSelectedFaultyPairings([...selectedFaultyPairings, row]);
    }
  };

  const handleSelectedAllottedSmartcards = (row) => {
    const isSelected = selectedAllottedSmartcards.some(
      (selectedAllottedSmartcard) => selectedAllottedSmartcard.id === row.id
    );
    if (isSelected) {
      const updatedSelectedAllottedSmartcards =
        selectedAllottedSmartcards.filter(
          (selectedAllottedSmartcard) => selectedAllottedSmartcard.id !== row.id
        );
      setSelectedAllottedSmartcards(updatedSelectedAllottedSmartcards);
    } else {
      setSelectedAllottedSmartcards([...selectedAllottedSmartcards, row]);
    }
  };

  const handleSelectedAllottedStbs = (row) => {
    const isSelected = selectedAllottedStbs.some(
      (selectedAllottedStb) => selectedAllottedStb.id === row.id
    );
    if (isSelected) {
      const updatedSelectedAllottedStbs = selectedAllottedStbs.filter(
        (selectedAllottedStb) => selectedAllottedStb.id !== row.id
      );
      setSelectedAllottedStbs(updatedSelectedAllottedStbs);
    } else {
      setSelectedAllottedStbs([...selectedAllottedStbs, row]);
    }
  };

  const columns = useMemo(() => {
    const commonColumns = [
      {
        Header: "*",
        disableFilters: true,
        filterable: true,
        Cell: (cellProps) => {
          return (
            <>
              <input type="checkbox" />
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
    ];

    const columnsWithAllottedTo = [
      {
        Header: "*",
        disableFilters: true,
        filterable: true,
        Cell: (cellProps) => {
          return (
            <>
              <input type="checkbox" />
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
        Header: "Allotted To",
        accessor: "operator_lbl",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              {cellProps.row.original.operator_lbl}
            </p>
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
    ];

    return selectedOption === "Allotted"
      ? columnsWithAllottedTo
      : commonColumns;
  }, [selectedOption]);

  const handleAddStockSmartcard = () => {
    setShowAddStockSmartcard(!showAddStockSmartcard);
  };

  const handleAddStockStb = () => {
    setShowAddStockStb(!showAddStockStb);
  };

  const handleCreatePairing = () => {
    setShowCreatePairing(!showCreatePairing);
  };

  const handleUploadSmartcard = () => {
    setShowUploadSmartcard(!showUploadSmartcard);
  };

  const handleBulkUpdateSmartcard = () => {
    setShowBulkUpdateSmartcard(!showBulkUpdateSmartcard);
  };

  const handleStockScMarkfaulty = () => {
    setShowStockScMarkfaulty(!showStockScMarkfaulty);
  };

  const handleFaultySmartcardSendSc = () => {
    setShowFaultySmartcardSendsc(!showFaultySmartcardSendsc);
  };

  const handleFaultySmartcardBlacklist = () => {
    setShowFaultySmartcardBlacklist(!showFaultySmartcardBlacklist);
  };

  const handleWarning = () => {
    setShowWarning(!showWarning);
  };

  const handleStockScBlacklist = () => {
    setShowStockScBlacklist(!showStockScBlacklist);
  };

  const handleStockScActionUpdated = () => {
    setShowStockActionupdated(!showStockActionupdated);
  };

  const handleAllottedSmartcard = () => {
    setShowAllottedSmartcard(!showAllottedSmartcard);
  };

  const handleDeallottedSmartcard = () => {
    setShowDeallotSmartcard(!showDeallotSmartcard);
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
            action: setShowUploadSmartcard,
          },
          {
            name: "Update",
            type: "dropdown",
            dropdownName: "Bulk",
            action: setShowBulkUpdateSmartcard,
          },
          {
            name: "Mark Faulty",
            type: "dot",
            icon: "action",
            dropdownName: "",
            action:
              Object.keys(selectedRows).length === 0
                ? () => setShowWarning(true)
                : () => setShowStockScMarkfaulty(true),
          },
          {
            name: "Blacklist",
            type: "dot",
            icon: "action",
            dropdownName: "",
            action:
              Object.keys(selectedRows).length === 0
                ? () => setShowWarning(true)
                : () => setShowStockScBlacklist(true),
          },
          {
            name: "Update Brand/Warehouse/Inventory state",
            type: "dot",
            icon: "action",
            dropdownName: "",
            action:
              Object.keys(selectedRows).length === 0
                ? () => setShowWarning(true)
                : () => setShowStockActionupdated(true),
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
            action:
              Object.keys(selectedStbs).length === 0
                ? () => setShowWarning(true)
                : () => setShowStockStbMarkfaulty(true),
          },
          {
            name: "Blacklist",
            type: "dot",
            icon: "action",
            dropdownName: "",
            action:
              Object.keys(selectedStbs).length === 0
                ? () => setShowWarning(true)
                : () => setShowStockStbBlacklist(true),
          },
          {
            name: "Update Brand/Warehouse/Inventory state",
            type: "dot",
            icon: "action",
            dropdownName: "",
            action:
              Object.keys(selectedStbs).length === 0
                ? () => setShowWarning(true)
                : () => setShowStbActionupdated(true),
          },
        ];
        return actions;
      } else if (activeTab === "3") {
        actions = [
          {
            name: "Create",
            type: "normal",
            icon: "create",
            action: setShowCreatePairing,
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
            action:
              Object.keys(selectedPairings).length === 0
                ? () => setShowWarning(true)
                : () => setShowStockPairingMarkfaulty(true),
          },
          {
            name: "Blacklist",
            type: "dot",
            icon: "action",
            dropdownName: "",
            action:
              Object.keys(selectedPairings).length === 0
                ? () => setShowWarning(true)
                : () => setShowStockPairingBlacklist(true),
          },
          {
            name: "Delete pairing",
            type: "dot",
            icon: "action",
            dropdownName: "",
            action:
              Object.keys(selectedPairings).length === 0
                ? () => setShowWarning(true)
                : () => setShowDeleteStockPairing(true),
          },
        ];
        return actions;
      }
    } else if (selectedOption === "Allotted") {
      if (activeTab === "1") {
        actions = [
          {
            name: "Allot",
            type: "normal",
            icon: "create",
            action: setShowAllottedSmartcard,
          },
          {
            name: "Upload",
            type: "dropdown",
            dropdownName: "Bulk",
          },
          {
            name: "De-Allot",
            type: "normal",
            action:
              Object.keys(selectedAllottedSmartcards).length === 0
                ? () => setShowWarning(true)
                : () => setShowDeallotSmartcard(true),
          },
        ];
        return actions;
      } else if (activeTab === "2") {
        actions = [
          {
            name: "Allot",
            type: "normal",
            icon: "create",
            action: setShowAllottedStb,
          },
          {
            name: "Upload",
            type: "dropdown",
            dropdownName: "Bulk",
          },
          {
            name: "De-Allot",
            type: "dot",
            icon: "action",
            dropdownName: "",
            action:
              Object.keys(selectedAllottedStbs).length === 0
                ? () => setShowWarning(true)
                : () => setShowDeallotStb(true),
          },
        ];
        return actions;
      } else if (activeTab === "3") {
        actions = [
          {
            name: "Allot",
            type: "normal",
            icon: "create",
          },
          {
            name: "Upload",
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
      }
    } else if (selectedOption === "Faulty") {
      if (activeTab === "1") {
        actions = [
          {
            name: "Send to Smartcard Stock",
            type: "dot",
            icon: "action",
            dropdownName: "Action",
            action:
              Object.keys(selectedFaultyScs).length === 0
                ? () => setShowWarning(true)
                : () => setShowFaultySmartcardSendsc(true),
          },
          {
            name: "Blacklist",
            type: "dot",
            icon: "action",
            dropdownName: "Action",
            action:
              Object.keys(selectedFaultyScs).length === 0
                ? () => setShowWarning(true)
                : () => setShowFaultySmartcardBlacklist(true),
          },
        ];
        return actions;
      } else if (activeTab === "2") {
        actions = [
          {
            name: "Send to STB Stock",
            type: "dot",
            icon: "action",
            dropdownName: "Action",
            action:
              Object.keys(selectedFaultyStbs).length === 0
                ? () => setShowWarning(true)
                : () => setShowFaultyStbSendstb(true),
          },
          {
            name: "Blacklist",
            type: "dot",
            icon: "action",
            dropdownName: "Action",
            action:
              Object.keys(selectedFaultyStbs).length === 0
                ? () => setShowWarning(true)
                : () => setShowFaultyStbBlacklist(true),
          },
        ];
        return actions;
      } else if (activeTab === "3") {
        actions = [
          {
            name: "Send to Pairing Stock",
            type: "dot",
            icon: "action",
            dropdownName: "Action",
            action:
              Object.keys(selectedFaultyPairings).length === 0
                ? () => setShowWarning(true)
                : () => setShowFaultyPairingSendpair(true),
          },
          {
            name: "Blacklist",
            type: "dot",
            icon: "action",
            dropdownName: "Action",
            action:
              Object.keys(selectedFaultyPairings).length === 0
                ? () => setShowWarning(true)
                : () => setShowFaultyPairingBlacklist(true),
          },
        ];
        return actions;
      }
    } else if (selectedOption === "Blacklisted") {
      actions = [];
      return actions;
    }
    return [];
  };

  const getFilteredHandleRowClicks = (Row) => {
    if (selectedOption === "In-stock") {
      if (activeTab === "1") {
        return handleSelectedRows(Row);
      }
    } else if (selectedOption === "Faulty") {
      if (activeTab === "1") {
        return handleSelectedFaultySc(Row);
      }
    } else if (selectedOption === "Allotted") {
      if (activeTab === "1") {
        return handleSelectedAllottedSmartcards(Row);
      }
    }
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
      <UploadSmartcard
        isOpen={showUploadSmartcard}
        toggleUploadModal={handleUploadSmartcard}
        stocksccastype={stocksccastype}
        stockscwarehouse={stockscwarehouse}
        stockscstatetype={stockscstatetype}
        stockscinventorystate={stockscinventorystate}
        brand1={brand1}
        brand2={brand2}
      />
      <BulkUpdateSmartcard
        isOpen={showBulkUpdateSmartcard}
        toggle={handleBulkUpdateSmartcard}
      />
      <StockScMarkfaulty
        isOpen={showStockScMarkfaulty}
        toggle={handleStockScMarkfaulty}
        selectedRows={selectedRows}
      />
      <StockScBlacklist
        isOpen={showStockScBlacklist}
        toggle={handleStockScBlacklist}
        selectedRows={selectedRows}
      />
      <StockActionUpdation
        isOpen={showStockActionupdated}
        toggle={handleStockScActionUpdated}
        selectedRows={selectedRows}
        brand2={brand2}
        stockscwarehouse={stockscwarehouse}
        actioninventorystate={actioninventorystate}
      />
      <FaultySendToStock
        isOpen={showFaultySmartcardSendsc}
        toggle={handleFaultySmartcardSendSc}
        selectedFaultyScs={selectedFaultyScs}
      />
      <FaultySmartcardBlacklist
        isOpen={showFaultySmartcardBlacklist}
        toggle={handleFaultySmartcardBlacklist}
        selectedFaultyScs={selectedFaultyScs}
      />
      <AllottedSmrtcard
        isOpen={showAllottedSmartcard}
        toggle={handleAllottedSmartcard}
        allottedsmartcardlist={allottedsmartcardlist}
        allottedoperatorlist={allottedoperatorlist}
        allottedusertype={allottedusertype}
      />
      <DeallotSmartcard
        isOpen={showDeallotSmartcard}
        toggle={handleDeallottedSmartcard}
        selectedAllottedSmartcards={selectedAllottedSmartcards}
      />
      <div
        className="position-fixed top-0 end-0 p-3"
        style={{ zIndex: "1005" }}
      >
        <Toast isOpen={showWarning}>
          <ToastHeader toggle={handleWarning}>
            <i className="mdi mdi-alert-outline me-2"></i> Warning
          </ToastHeader>
          <ToastBody>Please select atleast one Data</ToastBody>
        </Toast>
      </div>
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
                              // handleRowClick={(row) => {
                              //   getFilteredHandleRowClicks(row);
                              // }}
                              handleRowClick={(row) => {
                                getFilteredHandleRowClicks(row);
                              }}
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
                              showStockStbMarkfaulty={showStockStbMarkfaulty}
                              setShowStockStbMarkfaulty={
                                setShowStockStbMarkfaulty
                              }
                              showStockStbBlacklist={showStockStbBlacklist}
                              setShowStockStbBlacklist={
                                setShowStockStbBlacklist
                              }
                              showStbActionupdated={showStbActionupdated}
                              setShowStbActionupdated={setShowStbActionupdated}
                              handleSelectedStbs={handleSelectedStbs}
                              selectedStbs={selectedStbs}
                              actioninventorystate={actioninventorystate}
                              selectedFaultyStbs={selectedFaultyStbs}
                              showFaultyStbSendstb={showFaultyStbSendstb}
                              setShowFaultyStbSendstb={setShowFaultyStbSendstb}
                              showFaultyStbBlacklist={showFaultyStbBlacklist}
                              setShowFaultyStbBlacklist={
                                setShowFaultyStbBlacklist
                              }
                              handleSelectedFaultyStb={handleSelectedFaultyStb}
                              selectedOption={selectedOption}
                              activeTab={activeTab}
                              showDeallotStb={showDeallotStb}
                              setShowDeallotStb={setShowDeallotStb}
                              showAllottedStb={showAllottedStb}
                              setShowAllottedStb={setShowAllottedStb}
                              selectedAllottedStbs={selectedAllottedStbs}
                              handleSelectedAllottedStbs={
                                handleSelectedAllottedStbs
                              }
                              allottedstblist={allottedstblist}
                              allottedusertype={allottedusertype}
                              allotteddistributor={allotteddistributor}
                              allottedoperatorlist={allottedoperatorlist}
                              allottedlco={allottedlco}
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
                              isOpen={showCreatePairing}
                              toggle={handleCreatePairing}
                              smartcardlist={smartcardlist}
                              stblist={stblist}
                              stocksccastype={stocksccastype}
                              showStockPairingMarkfaulty={
                                showStockPairingMarkfaulty
                              }
                              setShowStockPairingMarkfaulty={
                                setShowStockPairingMarkfaulty
                              }
                              showStockPairingBlacklist={
                                showStockPairingBlacklist
                              }
                              setShowStockPairingBlacklist={
                                setShowStockPairingBlacklist
                              }
                              handleSelectedPairings={handleSelectedPairings}
                              selectedPairings={selectedPairings}
                              pairinginventorystate={pairinginventorystate}
                              showDeleteStockPairing={showDeleteStockPairing}
                              setShowDeleteStockPairing={
                                setShowDeleteStockPairing
                              }
                              selectedFaultyPairings={selectedFaultyPairings}
                              showFaultyPairingSendpair={
                                showFaultyPairingSendpair
                              }
                              setShowFaultyPairingSendpair={
                                setShowFaultyPairingSendpair
                              }
                              showFaultyPairingBlacklist={
                                showFaultyPairingBlacklist
                              }
                              setShowFaultyPairingBlacklist={
                                setShowFaultyPairingBlacklist
                              }
                              handleSelectedFaultyPairing={
                                handleSelectedFaultyPairing
                              }
                              selectedOption={selectedOption}
                              activeTab={activeTab}
                              stockscinventorystate={stockscinventorystate}
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
