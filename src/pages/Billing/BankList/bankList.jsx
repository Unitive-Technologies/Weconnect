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
  Spinner
} from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "/src/components/Common/Breadcrumb";
import {
  goToPage as onGoToPage,
  getBank as onGetBank,
  getBankStatus as onGetBankStatus,
} from "/src/store/banklist/actions";

//redux
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { ToastContainer } from "react-toastify";
import AddNewBankList from "./AddNewBankList";
import UploadBankList from "./UploadBankList";
import ViewBankList from "./ViewBankList";
import TableContainerX from "../../../components/Common/TableContainerX";

const BankList = (props) => {
  //meta title
  document.title = "Banks | VDigital";

  const dispatch = useDispatch();

  const selectBankState = (state) => state.bank;

  const BankProperties = createSelector(selectBankState, (bank) => ({
    banks: bank.bank,
    loading: bank.loading,
    bankStatus: bank.bankStatus,
    totalPage: bank.totalPages,
    totalCount: bank.totalCount,
    pageSize: bank.perPage,
    currentPage: bank.currentPage,
  }));

  const { banks, loading, bankStatus, totalPage,
    totalCount,
    pageSize,
    currentPage } = useSelector(BankProperties);

  // const [isLoading, setLoading] = useState(loading);

  // const reversedData = banks.slice().reverse();
  const columns = useMemo(
    () => [
      {
        Header: "#",
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
        Header: "IFSC Code",
        accessor: "ifscode",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">{cellProps.row.original.ifscode}</p>
          );
        },
      },
      {
        Header: "Branch",
        accessor: "branch",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">{cellProps.row.original.branch}</p>
          );
        },
      },
      {
        Header: "Branch Address",
        accessor: "address",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">{cellProps.row.original.address}</p>
          );
        },
      },
      {
        Header: "For MSO",
        accessor: "ismso",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              {cellProps.row.original.ismso === 1 ? "Yes" : "No"}
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

  const [showAddNewBankList, setShowAddNewBankList] = useState(false);
  const [showUploadBankList, setShowUploadBankList] = useState(false);
  const [showViewBankList, setShowViewBankList] = useState(false);
  const [viewBankListData, setViewBankListData] = useState({});

  const toggleViewModal = (bankData) => {
    console.log("User Data: ", bankData);
    setShowViewBankList(!showViewBankList);
    setViewBankListData(bankData);
  };

  const goToPage = (toPage) => {
    console.log("[GOTO PAGE] Trigger to page - ", toPage);
    dispatch(onGoToPage(toPage));
    dispatch(onGetBank());
  };


  useEffect(() => {
    if (banks && !banks.length) {
      dispatch(onGetBank());
      dispatch(onGetBankStatus());
    }
  }, [dispatch, banks]);

  const toggleAddModal = () => {
    setShowAddNewBankList(!showAddNewBankList);
  };

  const toggleUploadModal = () => {
    setShowUploadBankList(!showUploadBankList);
  };

  const resetSelection = () => {
    setViewBankListData({});
  };

  const keyField = "id";

  const getTableActions = () => {
    return [
      {
        name: "Create",
        action: setShowAddNewBankList,
        type: "normal",
        icon: "create",
      },
      {
        name: "Upload",
        action: setShowUploadBankList,
        type: "normal",
        icon: "upload",
      },
    ];
  };

  return (
    <React.Fragment>
      <ViewBankList
        isOpen={showViewBankList}
        toggleViewModal={toggleViewModal}
        banks={viewBankListData}
        bankStatus={bankStatus}
        resetSelection={resetSelection}
      />
      <AddNewBankList
        isOpen={showAddNewBankList}
        toggleAddModal={toggleAddModal}
        bankStatus={bankStatus}
      />
      <UploadBankList
        isOpen={showUploadBankList}
        actiontype={"add"}
        toggleUploadModal={toggleUploadModal}
      />

      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Billing" breadcrumbItem="Banks" />
          {/* {isLoading ? (
            <Spinners setLoading={setLoading} />
          ) : ( */}
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
                    <TableContainerX
                      columns={columns}
                      data={banks}
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

export default withRouter(BankList);
