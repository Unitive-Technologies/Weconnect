import React, { useEffect, useState, useRef, useMemo } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import TableContainer from "../../../../components/Common/TableContainer";
import Spinners from "../../../../components/Common/Spinner";
import { Card, CardBody, Col, Container, Row, Form, Input } from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "/src/components/Common/Breadcrumb";

import { getRegionalOffice as onGetRegionalOffice } from "/src/store/actions";

//redux
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { ToastContainer } from "react-toastify";

const OperatorAccountDetails = ({ selectedRowId }) => {
  //meta title
  document.title = "Regional Offices | VDigital";
  const API_URL = "https://sms.unitch.in/api/index.php/v1";
  const [accountDetails, setAccountDetails] = useState([]);
  const currentDate = new Date().toISOString().split("T")[0];
  const [fromDate, setFromDate] = useState(currentDate);
  const [toDate, setToDate] = useState(currentDate);
  // const operatorAccount = [];

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
        accessor: "name",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <>
              <h5
                className="font-size-14 mb-1"
                onClick={() => {
                  const userData = cellProps.row.original;
                  handleViewRegionalOffice(userData);
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
        Header: "Receipt No.",
        accessor: "code",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">{cellProps.row.original.code}</p>
          );
        },
      },
      {
        Header: "Amount",
        accessor: "addr",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">{cellProps.row.original.addr}</p>
          );
        },
      },
      {
        Header: "SGST",
        accessor: "contact_person",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              {cellProps.row.original.contact_person}
            </p>
          );
        },
      },
      {
        Header: "CGST",
        accessor: "mobile_no",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              {cellProps.row.original.mobile_no}
            </p>
          );
        },
      },
      {
        Header: "IGST",
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
        Header: "Total Tax",
        accessor: "District_lbl",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              {cellProps.row.original.district_lbl}
            </p>
          );
        },
      },
      {
        Header: "Total Amount",
        accessor: "city_lbl",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">{cellProps.row.original.city_lbl}</p>
          );
        },
      },
      {
        Header: "Debit Amount",
        accessor: "gstno",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">{cellProps.row.original.gstno}</p>
          );
        },
      },
      {
        Header: "Credit Amount",
        accessor: "panno",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">{cellProps.row.original.panno}</p>
          );
        },
      },
      {
        Header: "Type",
        accessor: "username",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">{cellProps.row.original.username}</p>
          );
        },
      },
      {
        Header: "Remark",
        accessor: "status",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">{cellProps.row.original.status}</p>
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
        // action: setShowUploadRegionalOffice,
        type: "normal",
        icon: "create",
      },
    ];
  };

  const getOperatorAccountDetails = async (e) => {
    e.preventDefault();
    console.log("Form submitted");
    try {
      const token = "Bearer " + localStorage.getItem("temptoken");
      console.log("Dates: " + fromDate, toDate);
      const response = await axios.get(
        `${API_URL}/operator-account?expand=created_by_lbl,type_lbl,cr_operator_lbl,dr_operator_lbl,credited_by,igst,cgst,sgst,name,balance,credit,debit,balance_h,credit_h,debit_h&filter[operator_id]=${selectedRowId}&filter[wallet_type]=2&filter[FRM_created_at]=${fromDate}&filter[TO_created_at]=${toDate}&page=1&per-page=50&vr=web1.0`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setAccountDetails(response.data.data);
      console.log("response in useEffect:" + JSON.stringify(response));
    } catch (error) {
      console.error("Error fetching bouquet data:", error);
    }
  };
  useEffect(() => {
    if (selectedRowId) {
      getOperatorAccountDetails();
    }
  }, [selectedRowId]);

  return (
    <React.Fragment>
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
              {" "}
              Search
            </button>
          </Col>
        </Row>
      </Form>
      <form onSubmit={getOperatorAccountDetails}>
        <input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
        />
        <input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <Row>
        <Col lg="12">
          <Card>
            <CardBody>
              {console.log("Account Details:" + JSON.stringify(accountDetails))}
              <TableContainer
                isPagination={true}
                columns={columns}
                data={accountDetails}
                isTransactionDate={true}
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
