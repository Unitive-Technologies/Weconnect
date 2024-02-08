import React, { useEffect, useState, useRef, useMemo } from "react";
import { Link } from "react-router-dom";
import TableContainer from "../../../../components/Common/TableContainer";
import Spinners from "../../../../components/Common/Spinner";
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Form,
  Input,
  Row,
} from "reactstrap";
import { createSelector } from "reselect";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import AddCreditModal from "./AddCreditModal";
import {
  getRegionalCreditList as onGetRegionalCreditList,
  getRegionalBankList as onGetRegionalBankList,
} from "/src/store/regionaloffice/actions";
import { useFormik } from "formik";
import * as Yup from "yup";
const OperatorAccountDetails = (props) => {
  const {
    accountDetails,
    setFromDate,
    setToDate,
    fromDate,
    toDate,
    handleSearch,
    regionalOffData,
    selectedRowData,
  } = props;
  // console.log(
  //   "data in operatoraccountdetails:" + JSON.stringify(regionalOffData)
  // );
  document.title = "Regional Offices | VDigital";
  const [showAddCreditModal, setShowAddCreditModal] = useState(false);
  // const [accountsData, setAccountsData] = useState([]);
  // const currentDate = new Date().toISOString().split("T")[0];
  // const [fromDate, setFromDate] = useState(currentDate);
  // const [toDate, setToDate] = useState(currentDate);
  const dispatch = useDispatch();

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
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      fromDate: "",
      toDate: "",
    },

    validationSchema: Yup.object({
      // amount: Yup.string().required("Please Enter Amount"),
      // mode: Yup.string().required("Select Payment Mode"),
    }),
    onSubmit: async (values) => {
      try {
        const newCredit = {
          fromDate: values["fromDate"],
          toDate: parseInt(values["toDate"]),
        };
        console.log("newCredit:" + newCredit);

        const token = "Bearer " + localStorage.getItem("temptoken");

        const response = await axios.get(
          `${API_URL}/operator-account?expand=created_by_lbl,type_lbl,cr_operator_lbl,dr_operator_lbl,credited_by,igst,cgst,sgst,name,balance,credit,debit,balance_h,credit_h,debit_h&filter[operator_id]=${regionalOffData.id}&filter[wallet_type]=2&filter[FRM_created_at]=${fromDate}&filter[TO_created_at]=${toDate}&page=1&per-page=50&vr=web1.0`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        setAccountsData(response.data.data);
        console.log("response in useEffect:" + JSON.stringify(response));
        validation.resetForm();
      } catch (error) {
        console.error("Error fetching bouquet data:", error);
      }
    },
    onReset: (values) => {
      validation.setValues(validation.initialValues);
    },
  });
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
      // {
      //   Header: "Action",
      //   Cell: (cellProps) => {
      //     return (
      //       <div className="d-flex gap-3">
      //         <Link
      //           to="#"
      //           className="text-success"
      //           onClick={() => {
      //             const userData = cellProps.row.original;
      //             handleUserClick(userData);
      //           }}
      //         >
      //           <i className="mdi mdi-pencil font-size-18" id="edittooltip" />
      //           <UncontrolledTooltip placement="top" target="edittooltip">
      //             Edit
      //           </UncontrolledTooltip>
      //         </Link>
      //         <Link
      //           to="#"
      //           className="text-danger"
      //           onClick={() => {
      //             const userData = cellProps.row.original;
      //             onClickDelete(userData);
      //           }}
      //         >
      //           <i className="mdi mdi-delete font-size-18" id="deletetooltip" />
      //           <UncontrolledTooltip placement="top" target="deletetooltip">
      //             Delete
      //           </UncontrolledTooltip>
      //         </Link>
      //       </div>
      //     );
      //   },
      // },
    ],
    []
  );
  useEffect(() => {
    dispatch(onGetRegionalCreditList());
    dispatch(onGetRegionalBankList());
  }, [dispatch]);

  const toggleAddCreditModal = () => {
    setShowAddCreditModal(!showAddCreditModal);
  };
  const getTableActions = () => {
    return [
      {
        name: "Pay Online",
        // action: setShowRegionalOffice,
        type: "normal",
        icon: "create",
      },
      {
        name: "Add Credit",
        action: setShowAddCreditModal,
        type: "normal",
        icon: "create",
      },
      {
        name: "Setoff Account",
        // action: setShowUploadRegionalOffice,
        type: "normal",
        icon: "create",
      },
    ];
  };

  return (
    <React.Fragment>
      <AddCreditModal
        isOpen={showAddCreditModal}
        toggleAddModal={toggleAddCreditModal}
        regionalCreditList={regionalCreditList}
        regionalBankList={regionalBankList}
        regionalOffData={regionalOffData}
        selectedRowData={selectedRowData}
      />
      <Form
        // onSubmit={handleSearch}
        onSubmit={(e) => {
          e.preventDefault();
          validation.handleSubmit();
          return false;
        }}
      >
        <Row>
          <Col lg={2} className="mt-2">
            <p>Transaction Date:</p>
          </Col>
          <Col lg={2}>
            <Input
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              type="date"
              // onChange={validation.handleChange}
              // onBlur={validation.handleBlur}
              // value={validation.values.fromDate || ""}
            />
          </Col>
          <Col lg={2}>
            <Input
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              type="date"
              // onChange={validation.handleChange}
              // onBlur={validation.handleBlur}
              // value={validation.values.toDate || ""}
            />
          </Col>
          <Col lg={2}>
            <button type="submit" className="btn btn-success save-user">
              Search
            </button>
          </Col>
        </Row>
      </Form>
      <Row>
        <Col lg="12">
          <Card>
            <CardBody>
              <TableContainer
                isPagination={true}
                columns={columns}
                data={accountDetails}
                isTransactionDate={true}
                isShowTableActionButtons={true}
                // isGlobalFilter={true}
                isAddRegionalOffice={true}
                isShowingPageLength={true}
                tableActions={getTableActions()}
                customPageSize={50}
                tableClass="table align-middle table-nowrap table-hover"
                theadClass="table-light"
                paginationDiv="col-sm-12 col-md-7"
                pagination="pagination pagination-rounded justify-content-end mt-4"
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default OperatorAccountDetails;
