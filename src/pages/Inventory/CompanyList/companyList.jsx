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

import {
  Code,
  Contact,
  Mobile,
  Phone,
  Email,
  Address,
  Description,
  GST,
  TAN,
  PAN,
  Status,
  CreatedAt,
  CreatedBy,
} from "./companyListCol";

//Import Breadcrumb
import Breadcrumbs from "/src/components/Common/Breadcrumb";

import { getCompanyList as onGetCompanyList } from "/src/store/companylist/actions";

//redux
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { ToastContainer } from "react-toastify";
import AddNewCompanyList from "./AddNewCompanyList";

const CompanyList = (props) => {
  //meta title
  document.title = "Companies | VDigital";

  const dispatch = useDispatch();

  const selectComapanyListState = (state) => state.companylist;
  const CompanyListProperties = createSelector(
    selectComapanyListState,
    (companylist) => ({
      company: companylist.companylist,
      loading: companylist.loading,
    })
  );

  const { company, loading } = useSelector(CompanyListProperties);

  const [isLoading, setLoading] = useState(loading);

  const [showAddNewCompanyList, setShowAddNewCompanyList] = useState(false);

  const handleAddCompany = () => {
    setShowAddNewCompanyList(!showAddNewCompanyList);
  };

  const columns = useMemo(
    () => [
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
        Header: "Name",
        accessor: "name",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <>
              <h5 className="font-size-14 mb-1">
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
          return <Code {...cellProps} />;
        },
      },
      {
        Header: "Contact Person",
        accessor: "contact",
        filterable: true,
        Cell: (cellProps) => {
          return <Contact {...cellProps} />;
        },
      },
      {
        Header: "Mobile No.",
        accessor: "mobile",
        filterable: true,
        Cell: (cellProps) => {
          return <Mobile {...cellProps} />;
        },
      },
      {
        Header: "Phone No.",
        accessor: "phone",
        filterable: true,
        Cell: (cellProps) => {
          return <Phone {...cellProps} />;
        },
      },
      {
        Header: "Email",
        accessor: "email",
        filterable: true,
        Cell: (cellProps) => {
          return <Email {...cellProps} />;
        },
      },
      {
        Header: "Address",
        accessor: "address",
        filterable: true,
        Cell: (cellProps) => {
          return <Address {...cellProps} />;
        },
      },
      {
        Header: "Description",
        accessor: "description",
        filterable: true,
        Cell: (cellProps) => {
          return <Description {...cellProps} />;
        },
      },
      {
        Header: "GST No.",
        accessor: "gst_no",
        filterable: true,
        Cell: (cellProps) => {
          return <GST {...cellProps} />;
        },
      },
      {
        Header: "TAN No.",
        accessor: "tan_no",
        filterable: true,
        Cell: (cellProps) => {
          return <TAN {...cellProps} />;
        },
      },
      {
        Header: "PAN No.",
        accessor: "pan_no",
        filterable: true,
        Cell: (cellProps) => {
          return <PAN {...cellProps} />;
        },
      },
      {
        Header: "Staus",
        accessor: "status",
        filterable: true,
        Cell: (cellProps) => {
          return <Status {...cellProps} />;
        },
      },
      {
        Header: "Created At",
        accessor: "created_at",
        filterable: true,
        Cell: (cellProps) => {
          return <CreatedAt {...cellProps} />;
        },
      },
      {
        Header: "Created By",
        accessor: "created_by",
        filterable: true,
        Cell: (cellProps) => {
          return <CreatedBy {...cellProps} />;
        },
      },
    ],
    []
  );

  useEffect(() => {
    if (company && !company.length) {
      dispatch(onGetCompanyList());
    }
  }, [dispatch, company]);

  const keyField = "id";

  const getTableActions = () => {
    return [
      {
        name: "Create",
        action: setShowAddNewCompanyList,
        type: "normal",
        icon: "create",
      },
    ];
  };

  return (
    <React.Fragment>
      <AddNewCompanyList
        isOpen={showAddNewCompanyList}
        handleAddCompany={handleAddCompany}
      />
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Inventory" breadcrumbItem="Companies" />
          {isLoading ? (
            <Spinners setLoading={setLoading} />
          ) : (
            <Row>
              <Col lg="12">
                <Card>
                  <CardBody>
                    {console.log("CompanyList:" + JSON.stringify(company))}
                    <TableContainer
                      isPagination={true}
                      columns={columns}
                      data={company}
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

export default withRouter(CompanyList);
