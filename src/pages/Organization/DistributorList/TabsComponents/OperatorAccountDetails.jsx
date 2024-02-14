import React, { useEffect, useState, useRef, useMemo } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import TableContainer from "../../../../components/Common/TableContainer";
import Spinners from "../../../../components/Common/Spinner";
import {
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Form,
  Input,
  Table,
} from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "/src/components/Common/Breadcrumb";

import { getRegionalOffice as onGetRegionalOffice } from "/src/store/actions";

//redux
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { ToastContainer } from "react-toastify";
import AddCreditModal from "./AddCreditModal";
import {
  getRegionalCreditList as onGetRegionalCreditList,
  getRegionalBankList as onGetRegionalBankList,
} from "/src/store/regionaloffice/actions";
import SetOffAmountModal from "./SetOffAmountModal";
import TableContainerX from "../../../../components/Common/TableContainerX";

const OperatorAccountDetails = ({
  accountDetails,
  setAccountDetails,
  selectedRowId,
  selectedRowData,
}) => {
  //meta title
  document.title = "Distributors | VDigital";
  const dispatch = useDispatch();
  const API_URL = "https://sms.unitch.in/api/index.php/v1";
  const [showAddCreditModal, setShowAddCreditModal] = useState(false);
  const [showSetOffAmountModal, setShowSetOffAmountModal] = useState(false);

  const selectRegionalOfficeState = (state) => state.regionaloffice;

  const RegionalOfficeProperties = createSelector(
    selectRegionalOfficeState,
    (regionalOfficesState) => ({
      regionalCreditList: regionalOfficesState.regionalCreditList,
      regionalBankList: regionalOfficesState.regionalBankList,
    })
  );
  const { regionalCreditList, regionalBankList } = useSelector(
    RegionalOfficeProperties
  );

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
        Header: "Transaction Date",
        accessor: "created_at",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <>
              <h5
                className="font-size-14 mb-1"
                // onClick={() => {
                //   const userData = cellProps.row.original;
                //   handleViewRegionalOffice(userData);
                // }}
              >
                <Link className="text-dark" to="#">
                  {cellProps.row.original.created_at}
                </Link>
              </h5>
            </>
          );
        },
      },
      {
        Header: "Receipt No.",
        accessor: "reciept_no",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              {cellProps.row.original.reciept_no}
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
        Header: "SGST",
        // accessor: "contact_person",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">{cellProps.row.original.sgst}</p>
          );
        },
      },
      {
        Header: "CGST",
        // accessor: "mobile_no",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">{cellProps.row.original.cgst}</p>
          );
        },
      },
      {
        Header: "IGST",
        // accessor: "state_lbl",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">{cellProps.row.original.igst}</p>
          );
        },
      },
      {
        Header: "TDS",
        // accessor: "state_lbl",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">{cellProps.row.original.tds}</p>
          );
        },
      },
      {
        Header: "MRP",
        // accessor: "state_lbl",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">{cellProps.row.original.mrp}</p>
          );
        },
      },
      {
        Header: "Total Tax",
        // accessor: "District_lbl",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">{cellProps.row.original.tax}</p>
          );
        },
      },
      {
        Header: "Total Amount",
        // accessor: "city_lbl",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              {cellProps.row.original.total_amount}
            </p>
          );
        },
      },
      {
        Header: "Debit Amount",
        // accessor: "gstno",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              {cellProps.row.original.debit_amount}
            </p>
          );
        },
      },
      {
        Header: "Credit Amount",
        // accessor: "panno",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              {cellProps.row.original.credit_amount}
            </p>
          );
        },
      },
      {
        Header: "Type",
        // accessor: "username",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">{cellProps.row.original.type_lbl}</p>
          );
        },
      },
      {
        Header: "Remark",
        // accessor: "status",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">{cellProps.row.original.remark}</p>
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
              {cellProps.row.original.created_by_lbl}
            </p>
          );
        },
      },
    ],
    []
  );

  const toggleAddCreditModal = () => {
    setShowAddCreditModal(!showAddCreditModal);
  };

  const toggleSetOffModal = () => {
    setShowSetOffAmountModal(!showSetOffAmountModal);
  };

  useEffect(() => {
    dispatch(onGetRegionalCreditList());
    dispatch(onGetRegionalBankList());
  }, [dispatch]);

  const paymentTableSchema = {
    subTableArrayKeyName: "payment_details",
    keyColumn: "mode",
    columns: [
      {
        header: "Payment Mode",
        accessor: "mode",
      },
      {
        header: "Bank Name",
        accessor: "bankname",
      },
      {
        header: "Cheque/Instrument No.",
        accessor: "chequeno",
      },
      {
        header: "Cheque/Instrument Date",
        accessor: "chequedate",
      },
    ],
  };

  const renderPaymentTable = (row) => {
    return (
      <Table className="table mb-0">
        <thead>
          <tr>
            {paymentTableSchema.columns.map((column) => {
              return <th key={column.accessor}>{column.header}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {row[paymentTableSchema.subTableArrayKeyName].map((object) => {
            return (
              <tr key={object[paymentTableSchema.keyColumn]}>
                {paymentTableSchema.columns.map((column) => {
                  return (
                    <td key={column.accessor}>{object[column.accessor]}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </Table>
    );
  };
  const getTableActions = () => {
    return [
      {
        name: "Pay Online",
        // action: setShowRegionalOffice,
        type: "normal",
        // icon: "create",
      },
      {
        name: "Add Credit",
        action: setShowAddCreditModal,
        type: "normal",
        icon: "create",
      },
      {
        name: "Setoff Amount",
        action: setShowSetOffAmountModal,
        type: "normal",
        // icon: "create",
      },
    ];
  };

  return (
    <React.Fragment>
      <AddCreditModal
        isOpen={showAddCreditModal}
        toggleAddModal={toggleAddCreditModal}
        selectedRowId={selectedRowId}
        selectedRowData={selectedRowData}
        regionalCreditList={regionalCreditList}
        regionalBankList={regionalBankList}
        setAccountDetails={setAccountDetails}
      />
      <SetOffAmountModal
        isOpen={showSetOffAmountModal}
        toggleSetOffModal={toggleSetOffModal}
        selectedRowData={selectedRowData}
      />

      <Row>
        <Col lg="12">
          <Card>
            <CardBody>
              {console.log("Account Details:" + JSON.stringify(accountDetails))}
              <TableContainer
                isPagination={true}
                columns={columns}
                data={accountDetails && accountDetails}
                isTransactionDate={true}
                // isGlobalFilter={true}
                isShowTableActionButtons={true}
                isAddRegionalOffice={true}
                isShowingPageLength={true}
                tableActions={getTableActions()}
                customPageSize={50}
                tableClass="table align-middle table-nowrap table-hover"
                theadClass="table-light"
                paginationDiv="col-sm-12 col-md-7"
                pagination="pagination pagination-rounded justify-content-end mt-4"
                // subTableEnabled={true}
                // getRenderedSubTable={renderPaymentTable}
                // isSubTableContentExists={(rowData) => rowData.rate.length > 0}
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default OperatorAccountDetails;
