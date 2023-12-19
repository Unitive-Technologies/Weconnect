import React, { useEffect, useState, useRef, useMemo } from "react";
import { Link } from "react-router-dom";
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
import { getPromoVoucher as onGetPromoVoucher } from "/src/store/actions";

//redux
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { ToastContainer } from "react-toastify";
import AddNewPromoVoucher from "./AddNewPromoVoucherList";

const PromoVoucherList = (props) => {
  //meta title
  document.title = "Promo Vouchers | VDigital";

  const dispatch = useDispatch();

  const selectPromoVoucherState = (state) => state.promovoucher;
  const PromoVoucherProperties = createSelector(
    selectPromoVoucherState,
    (promovoucher) => ({
      provoucher: promovoucher.promovoucher,
      loading: promovoucher.loading,
    })
  );

  const { provoucher, loading } = useSelector(PromoVoucherProperties);

  const [isLoading, setLoading] = useState(loading);

  const [showAddNewPromoVoucher, setShowAddNewPromoVoucher] = useState(false);
  const [showScrapPromoVoucher, setShowScrapPromoVoucher] = useState(false);

  const handleScrapPromoVoucher = () => {
    setShowScrapPromoVoucher(!showScrapPromoVoucher);
  };

  const columns = useMemo(
    () => [
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
        Header: "Operator",
        accessor: "operator",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">{cellProps.row.original.operator}</p>
          );
        },
      },
      {
        Header: "Operator Code",
        accessor: "operator_code",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              {cellProps.row.original.operator_code}
            </p>
          );
        },
      },
      {
        Header: "Voucher Code",
        accessor: "voucher_code",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              {cellProps.row.original.voucher_code}
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
        accessor: "applied_on",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              {cellProps.row.original.applied_on}
            </p>
          );
        },
      },
      {
        Header: "Recharge Period",
        accessor: "recharge_period",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              {cellProps.row.original.recharge_period}
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
            <p className="text-muted mb-0">{cellProps.row.original.amount}</p>
          );
        },
      },
      {
        Header: "MRP",
        accessor: "mrp",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">{cellProps.row.original.mrp}</p>
          );
        },
      },
      {
        Header: "Bouquets",
        accessor: "bouquets",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">{cellProps.row.original.bouquets}</p>
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
        accessor: "smartcard_no",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              {cellProps.row.original.smartcard_no}
            </p>
          );
        },
      },
      {
        Header: "STB No.",
        accessor: "stb_no",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">{cellProps.row.original.stb_no}</p>
          );
        },
      },
      {
        Header: "Created At",
        accessor: "created_at_lbl",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              {cellProps.row.original.created_at_lbl}
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
    }
  }, [dispatch, provoucher]);

  const handleAddNewPromoVoucher = () => {
    setShowAddNewPromoVoucher(!showAddNewPromoVoucher);
  };

  const handleAddPromoVoucher = () => {
    setShowAddNewPromoVoucher(!showAddNewPromoVoucher);
  };

  const keyField = "id";

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
        action: setShowScrapPromoVoucher,
        type: "normal",
        icon: "upload",
      },
    ];
  };

  return (
    <React.Fragment>
      <AddNewPromoVoucher
        isOpen={showAddNewPromoVoucher}
        handleAddPromoVoucher={handleAddPromoVoucher}
      />
      <div
        className="position-fixed top-0 end-0 p-3"
        style={{ zIndex: "1005" }}
      >
        <Toast isOpen={showScrapPromoVoucher}>
          <ToastHeader toggle={handleScrapPromoVoucher}>
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
                    {/* {console.log(
                      "Promo Voucher List:" + JSON.stringify(provoucher)
                    )} */}
                    <TableContainer
                      isPagination={true}
                      columns={columns}
                      data={provoucher}
                      isGlobalFilter={true}
                      isShowTableActionButtons={true}
                      isShowingPageLength={true}
                      // iscustomPageSizeOptions={true}
                      customPageSize={8}
                      tableActions={getTableActions()}
                      tableClass="table align-middle table-nowrap table-hover"
                      theadClass="table-light"
                      paginationDiv="col-sm-12 col-md-7"
                      pagination="pagination pagination-rounded justify-content-end mt-4"
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
