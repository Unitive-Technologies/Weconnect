import React, { useEffect, useState, useRef, useMemo } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import withRouter from "../../../components/Common/withRouter";
import TableContainer from "../../../components/Common/TableContainer";
import Spinners from "../../../components/Common/Spinner";
import {
  Card,
  CardBody,
  Col,
  Container,
  Row,
  UncontrolledTooltip,
  Toast,
  ToastHeader,
  ToastBody,
} from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "/src/components/Common/Breadcrumb";
import {
  goToPage as onGoToPage,
  getPromoVoucher as onGetPromoVoucher,
  getPromoVoucherApply as onGetPromoVoucherApply,
  getPromoVoucherLCO as onGetPromoVoucherLCO,
  getPromoVoucherBouquet as onGetPromoVoucherBouquet,
  getPromoVoucherRecharge as onGetPromoVoucherRecharge,
} from "/src/store/promovoucherlist/actions";

//redux
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { ToastContainer } from "react-toastify";
import AddNewPromoVoucher from "./AddNewPromoVoucherList";
import TableContainerX from "../../../components/Common/TableContainerX";
import PromoVoucherListStatus from "./PromoVoucherListStatus";

const PromoVoucherList = (props) => {
  //meta title
  document.title = "Promo Vouchers | VDigital";
  const API_URL = "https://sms.unitch.in/api/index.php/v1";
  const dispatch = useDispatch();

  const selectPromoVoucherState = (state) => state.promovoucher;
  const PromoVoucherProperties = createSelector(
    selectPromoVoucherState,
    (promovoucher) => ({
      provoucher: promovoucher.promovoucher,
      provoucherApply: promovoucher.promovoucherApply,
      provoucherLCO: promovoucher.promovoucherLCO,
      provoucherRecharge: promovoucher.promovoucherRecharge,
      provoucherBouquet: promovoucher.promovoucherBouquet,
      loading: promovoucher.loading,
      totalPage: promovoucher.totalPages,
      totalCount: promovoucher.totalCount,
      pageSize: promovoucher.perPage,
      currentPage: promovoucher.currentPage,
    })
  );

  const {
    provoucher,
    loading,
    provoucherApply,
    provoucherBouquet,
    provoucherRecharge,
    provoucherLCO,
    totalPage,
    totalCount,
    pageSize,
    currentPage,
  } = useSelector(PromoVoucherProperties);

  const [isLoading, setLoading] = useState(loading);

  const [showAddNewPromoVoucher, setShowAddNewPromoVoucher] = useState(false);
  const [showScrapPromoVoucher, setShowScrapPromoVoucher] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  const [filterVouchers, setFilterVouchers] = useState([]);
  const handleWarning = () => {
    setShowWarning(!showWarning);
  };

  const [selectedRows, setSelectedRows] = useState([]);

  const handleSelectedRows = (row) => {
    // debugger;
    setSelectedRows([]);

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

  const handleClickScrap = async () => {
    try {
      const activeVouchers = selectedRows.filter(
        (row) => row.status_lbl === "Active"
      );
      setFilterVouchers(activeVouchers);
      const voucherIds = activeVouchers.map((voucher) => voucher.id);

      const newStatus = {
        voucher_id: voucherIds,
        remark: "Scrapping Vouchers",
      };

      const token = "Bearer " + localStorage.getItem("temptoken");

      const response = await axios.post(
        `${API_URL}/promo-voucher/scrap-voucher?vr=web1.0`,
        newStatus,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      console.log("Axios Response:", response);
      dispatch(onGetPromoVoucher());
      setShowScrapPromoVoucher(true);
    } catch (error) {
      console.error("Error in handleClickScrap:", error);
    }
  };

  const columns = useMemo(
    () => [
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
          // const totalRows = cellProps.rows.length;
          // const reverseIndex = totalRows - cellProps.row.index;
          const startIndex = (currentPage - 1) * pageSize;
          const index = startIndex + cellProps.row.index + 1;

          return (
            <>
              <h5 className="font-size-14 mb-1">
                <Link className="text-dark" to="#">
                  {index}
                </Link>
              </h5>
            </>
          );
        },
      },
      {
        Header: "Operator",
        accessor: "operator_lbl",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p
              className="text-muted mb-0"
              style={{
                maxWidth: 100,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {cellProps.row.original.operator_lbl}
            </p>
          );
        },
      },
      {
        Header: "Operator Code",
        accessor: "operator_code_lbl",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              {cellProps.row.original.operator_code_lbl}
            </p>
          );
        },
      },
      {
        Header: "Voucher Code",
        accessor: "voucher_type",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p
              className="text-muted mb-0"
              style={{
                maxWidth: 100,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {cellProps.row.original.code}
            </p>
          );
        },
      },
      {
        Header: "Expiry Date",
        accessor: "expiry_date",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              {cellProps.row.original.expiry_date}
            </p>
          );
        },
      },
      {
        Header: "Applied On",
        accessor: "apply_on_lbl",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p
              className="text-muted mb-0"
              style={{
                maxWidth: 50,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {cellProps.row.original.apply_on_lbl}
            </p>
          );
        },
      },
      {
        Header: "Recharge Period",
        accessor: "rperiod_lbl",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p
              className="text-muted mb-0"
              style={{
                maxWidth: 50,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {cellProps.row.original.rperiod_lbl}
            </p>
          );
        },
      },
      {
        Header: "Amount",
        accessor: "amount",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p
              className="text-muted mb-0"
              style={{
                maxWidth: 50,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {cellProps.row.original.amount}
            </p>
          );
        },
      },
      {
        Header: "MRP",
        accessor: "mrp",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p
              className="text-muted mb-0"
              style={{
                maxWidth: 50,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {cellProps.row.original.mrp}
            </p>
          );
        },
      },
      {
        Header: "Bouquets",
        accessor: "bouque_lbl",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p
              className="text-muted mb-0"
              style={{
                maxWidth: 100,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {cellProps.row.original.bouque_lbl}
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
        Header: "Smartcard No",
        accessor: "smartcardno",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              {cellProps.row.original.smartcardno}
            </p>
          );
        },
      },
      {
        Header: "STB No.",
        accessor: "stbno",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">{cellProps.row.original.stbno}</p>
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

  useEffect(() => {
    if (provoucher && !provoucher.length) {
      dispatch(onGetPromoVoucher());
      dispatch(onGetPromoVoucherLCO());
      dispatch(onGetPromoVoucherApply());
      dispatch(onGetPromoVoucherBouquet());
      dispatch(onGetPromoVoucherRecharge());
    }
  }, [dispatch, provoucher]);

  const goToPage = (toPage) => {
    console.log("[GOTO PAGE] Trigger to page - ", toPage);
    dispatch(onGoToPage(toPage));
    dispatch(onGetPromoVoucher());
  };

  const handleAddPromoVoucher = () => {
    setShowAddNewPromoVoucher(!showAddNewPromoVoucher);
  };

  const handlePromoVoucherScrap = () => {
    setShowScrapPromoVoucher(!showScrapPromoVoucher);
  };

  const getTableActions = () => {
    return [
      {
        name: "Create",
        action: setShowAddNewPromoVoucher,
        type: "normal",
        icon: "create",
      },
      {
        name: "Scrap",
        // action: setShowScrapPromoVoucher,
        type: "normal",
        icon: "upload",
        action:
          Object.keys(selectedRows).length === 0
            ? () => setShowWarning(true)
            : handleClickScrap,
      },
    ];
  };

  return (
    <React.Fragment>
      <AddNewPromoVoucher
        isOpen={showAddNewPromoVoucher}
        handleAddPromoVoucher={handleAddPromoVoucher}
        promovoucherApply={provoucherApply}
        promovoucherBouquet={provoucherBouquet}
        promovoucherLCO={provoucherLCO}
        promovoucherRecharge={provoucherRecharge}
      />
      <PromoVoucherListStatus
        isOpen={showScrapPromoVoucher}
        handlePromoVoucherScrap={handlePromoVoucherScrap}
        selectedData={filterVouchers}
        selectedRows={selectedRows}
      />

      <div
        className="position-fixed top-0 end-0 p-3"
        style={{ zIndex: "1005" }}
      >
        <Toast isOpen={showWarning}>
          <ToastHeader toggle={handleWarning}>
            <i className="mdi mdi-alert-outline me-2"></i> Warning
          </ToastHeader>
          <ToastBody>Please select atleast one promo voucher </ToastBody>
        </Toast>
      </div>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Billing" breadcrumbItem="Promo Vouchers" />
          {isLoading ? (
            <Spinners setLoading={setLoading} />
          ) : (
            <Row>
              <Col lg="12">
                <Card>
                  <CardBody>
                    <TableContainerX
                      columns={columns}
                      data={provoucher}
                      isLoading={loading}
                      isPagination={true}
                      totalCount={Number(totalCount)}
                      pageSize={Number(pageSize)}
                      currentPage={Number(currentPage)}
                      totalPage={Number(totalPage)}
                      isGlobalFilter={true}
                      isShowingPageLength={true}
                      tableActions={getTableActions()}
                      goToPage={goToPage}
                      handleRowClick={(row) => {
                        handleSelectedRows(row);
                      }}
                    />
                  </CardBody>
                </Card>
              </Col>
            </Row>
          )}
        </Container>
      </div>
      <ToastContainer />
    </React.Fragment>
  );
};

export default withRouter(PromoVoucherList);
