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
} from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "/src/components/Common/Breadcrumb";
import { getBank as onGetBank } from "/src/store/actions";

//redux
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { ToastContainer } from "react-toastify";
import AddNewBankList from "./AddNewBankList";
import UploadBankList from "./UploadBankList";

const BankList = (props) => {
  //meta title
  document.title = "Banks | VDigital";

  const dispatch = useDispatch();

  const selectBankState = (state) => state.bank;
  const BankProperties = createSelector(selectBankState, (bank) => ({
    banks: bank.bank,
    loading: bank.loading,
  }));

  const { banks, loading } = useSelector(BankProperties);

  const [isLoading, setLoading] = useState(loading);

  const [showAddNewBankList, setShowAddNewBankList] = useState(false);
  const [showUploadBankList, setShowUploadBankList] = useState(false);

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
        Header: "Name",
        accessor: "name",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <>
              <h5
                className="font-size-14 mb-1"
                onClick={() => {
                  const userData = cellProps.row.original;
                  handleViewBankList(userData);
                }}
              >
                <Link className="text-dark" to="#">
                  {cellProps.row.original.name}
                </Link>
              </h5>
              <p className="text-muted mb-0">
                {cellProps.row.original.designation}
              </p>
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
        accessor: "ifsc_code",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              {cellProps.row.original.ifsc_code}
            </p>
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
        accessor: "branch_address",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              {cellProps.row.original.branch_address}
            </p>
          );
        },
      },
      {
        Header: "For MSO",
        accessor: "formso",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">{cellProps.row.original.formso}</p>
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
        accessor: "created_by",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              {cellProps.row.original.created_by}
            </p>
          );
        },
      },
    ],
    []
  );

  useEffect(() => {
    if (banks && !banks.length) {
      dispatch(onGetBank());
    }
  }, [dispatch, banks]);

  const handleAddBank = () => {
    setShowAddNewBankList(!showAddNewBankList);
  };

  const handleUploadBank = () => {
    setShowUploadBankList(!showUploadBankList);
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
      <AddNewBankList
        isOpen={showAddNewBankList}
        handleAddBank={handleAddBank}
      />
      <UploadBankList
        isOpen={showUploadBankList}
        handleUploadBank={handleUploadBank}
      />

      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Billing" breadcrumbItem="Banks" />
          {isLoading ? (
            <Spinners setLoading={setLoading} />
          ) : (
            <Row>
              <Col lg="12">
                <Card>
                  <CardBody>
                    {/* {console.log("Tax list:" + JSON.stringify(banks))} */}
                    <TableContainer
                      isPagination={true}
                      columns={columns}
                      data={banks}
                      isGlobalFilter={true}
                      isShowTableActionButtons={true}
                      isShowingPageLength={true}
                      tableActions={getTableActions()}
                      customPageSize={8}
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

export default withRouter(BankList);
