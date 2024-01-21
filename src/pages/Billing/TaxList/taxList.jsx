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
  Spinner,
} from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "/src/components/Common/Breadcrumb";
import {
  goToPage as onGoToPage,
  getTax as onGetTax, getTaxStatus as onGetTaxStatus, getTaxValues as onGetTaxValues, getTaxTaxOnTax as onGetTaxTaxOnTax, getTaxApply as onGetTaxApply,
} from "/src/store/taxlist/actions";

//redux
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { ToastContainer } from "react-toastify";
import AddNewTaxList from "./AddNewTaxList";
import ViewTaxList from "./ViewTaxList";
import TableContainerX from "../../../components/Common/TableContainerX";

const TaxList = (props) => {
  //meta title
  document.title = "Taxes | VDigital";

  const dispatch = useDispatch();

  const selectTaxState = (state) => state.tax;

  const TaxProperties = createSelector(selectTaxState, (tax) => ({
    taxes: tax.tax,
    loading: tax.loading,
    taxStatus: tax.taxStatus,
    taxApply: tax.taxApply,
    taxTaxOnTax: tax.taxTaxOnTax,
    taxValues: tax.taxValues,
    totalPage: tax.totalPages,
    totalCount: tax.totalCount,
    pageSize: tax.perPage,
    currentPage: tax.currentPage,
  }));

  const { taxes, loading, taxStatus, taxApply, taxTaxOnTax, taxValues, totalPage,
    totalCount,
    pageSize,
    currentPage } = useSelector(TaxProperties);


  const [showAddNewTaxList, setShowAddNewTaxList] = useState(false);
  const [showViewTaxList, setShowTaxList] = useState(false);

  const columns = useMemo(
    () => [
      {
        Header: "#",
        disableFilters: true,
        filterable: true,
        Cell: (cellProps) => {
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
        Header: "Name",
        accessor: "name",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <>
              <h5
                className="font-size-14 mb-1"
              >
                <Link className="text-dark" to="#">
                  {cellProps.row.original.name}
                </Link>
              </h5>
            </>
          );
        },
      },
      {
        Header: "Code",
        accessor: "code",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">{cellProps.row.original.code}</p>
          );
        },
      },
      {
        Header: "Tax Value",
        accessor: "taxvalue",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">{cellProps.row.original.taxvalue}</p>
          );
        },
      },
      {
        Header: "Valuetype",
        accessor: "valuetype_lbl",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              {cellProps.row.original.valuetype_lbl}
            </p>
          );
        },
      },
      {
        Header: "Tax On Tax",
        accessor: "parent_lbl",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              {cellProps.row.original.parent_lbl}
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

  useEffect(() => {
    if (taxes && !taxes.length) {
      dispatch(onGetTax());
      dispatch(onGetTaxStatus());
      dispatch(onGetTaxApply());
      dispatch(onGetTaxTaxOnTax());
      dispatch(onGetTaxValues());
    }
  }, [dispatch, taxes]);

  const goToPage = (toPage) => {
    console.log("[GOTO PAGE] Trigger to page - ", toPage);
    dispatch(onGoToPage(toPage));
    dispatch(onGetTax());
  };

  const toggleAddModal = () => {
    setShowAddNewTaxList(!showAddNewTaxList);
  };

  const [viewTaxList, setViewTaxList] = useState({});

  const toggleViewModal = (userTaxData) => {
    setShowTaxList(!showViewTaxList);
    setViewTaxList(userTaxData);
    // toggle();
  };

  const resetSelection = () => {
    setViewTaxList({});
  };

  const keyField = "id";

  const getTableActions = () => {
    return [
      {
        name: "Create",
        action: setShowAddNewTaxList,
        type: "normal",
        icon: "create",
      },
    ];
  };

  return (
    <React.Fragment>
      <ViewTaxList
        isOpen={showViewTaxList}
        toggleViewModal={toggleViewModal}
        tax={viewTaxList}
        taxApply={taxApply}
        taxStatus={taxStatus}
        taxTaxOnTax={taxTaxOnTax}
        taxValues={taxValues}
        resetSelection={resetSelection}
      />
      <AddNewTaxList isOpen={showAddNewTaxList} toggleAddModal={toggleAddModal} taxApply={taxApply} taxStatus={taxStatus} taxTaxOnTax={taxTaxOnTax} taxValues={taxValues} />
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Billing" breadcrumbItem="Taxes" />
          {loading ? (
            <React.Fragment>
              <Spinner
                color="primary"
                className="position-absolute top-50 start-50"
              />
            </React.Fragment>
          ) : (
            <Row>
              <Col lg="12">
                <Card>
                  <CardBody>
                    {console.log("Tax list:" + JSON.stringify(taxes))}
                    {/* <TableContainer
                      isPagination={true}
                      columns={columns}
                      data={taxes}
                      isLoading={loading}
                      isGlobalFilter={true}
                      isShowTableActionButtons={true}
                      isShowingPageLength={true}
                      tableActions={getTableActions()}
                      customPageSize={8}
                      handleRowClick={(row) => {
                        handleViewTax(row);
                      }}
                      tableClass="table align-middle table-nowrap table-hover"
                      theadClass="table-light"
                      paginationDiv="col-sm-12 col-md-7"
                      pagination="pagination pagination-rounded justify-content-end mt-4"
                    /> */}
                    <TableContainerX
                      columns={columns}
                      data={taxes}
                      isShowTableActionButtons={true}
                      isLoading={loading}
                      isPagination={true}
                      totalCount={Number(totalCount)}
                      pageSize={Number(pageSize)}
                      currentPage={Number(currentPage)}
                      totalPage={Number(totalPage)}
                      isGlobalFilter={true}
                      isShowingPageLength={true}
                      tableActions={getTableActions()}
                      handleRowClick={(row) => {
                        toggleViewModal(row);
                      }}
                      goToPage={goToPage}
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

export default withRouter(TaxList);
