import React, { useEffect, useState, useRef, useMemo } from "react";
import { Link } from "react-router-dom";
import withRouter from "../../../components/Common/withRouter";
import Spinners from "../../../components/Common/Spinner";
import { Card, CardBody, Col, Container, Row, Table } from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "/src/components/Common/Breadcrumb";

// import { getRegionalOffice as onGetRegionalOffice } from "/src/store/regionaloffice/actions";

//redux
import { createSelector } from "reselect";
import { ToastContainer } from "react-toastify";
import ViewRegionalOfficeModal from "./ViewRegionalOfficeModal";
import AddRegionalOfficeModal from "./AddRegionalOfficeModal";
import UploadRegionalOfficeModal from "./UploadRegionalOfficeModal";
import NewTableContainer from "../../../components/Common/NewTableContainer";
import { getRegionalOffice } from "../../../helpers/fakebackend_helper";
import {
  RESPONSE_HEADER_CURRENT_PAGE,
  RESPONSE_HEADER_PAGE_COUNT,
  RESPONSE_HEADER_PER_PAGE,
  RESPONSE_HEADER_TOTAL_COUNT,
} from "../../../constants/strings";
import NewPagination from "../../../components/Common/NewPagination";
import RegionalTable from "./RegionalTable";

const RegionalOfficeList = (props) => {
  //meta title
  document.title = "Regional Offices | VDigital";

  // const dispatch = useDispatch();

  // const selectRegionalOfficeState = (state) => state.regionaloffice;

  // const RegionalOfficeProperties = createSelector(
  //   selectRegionalOfficeState,

  //   (regionalOfficesState) => ({
  //     regOffices: regionalOfficesState.regionaloffice,
  //     loading: regionalOfficesState.loading,
  //     perPage: regionalOfficesState.perPage,
  //     totalCount: regionalOfficesState.totalCount,
  //     currentPage: regionalOfficesState.currentPage,
  //     pageCount: regionalOfficesState.pageCount,
  //   })
  // );

  // const { regOffices, loading, perPage, totalCount, currentPage, pageCount } =
  //   useSelector(RegionalOfficeProperties);

  const [isLoading, setLoading] = useState(false);
  const [currPage, setCurrPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [regionaloffices, setRegionalOffices] = useState([]);

  // useEffect(() => {
  //   console.log("DataList updated:", JSON.stringify(dataList));
  // }, [dataList]);

  useEffect(() => {
    console.log("In UseEffect.. currentPage", currPage);
    // console.log("Regional Office data in component:", regionaloffices);

    // if (!regionaloffices.length) {
    //   setLoading(true);

    getRegionalOffice(currPage, perPage).then((response) => {
      const pageCount = response.headers[RESPONSE_HEADER_PAGE_COUNT];
      const perPage = response.headers[RESPONSE_HEADER_PER_PAGE];
      const totalCount = response.headers[RESPONSE_HEADER_TOTAL_COUNT];
      const regOffices = response.data.data;

      // console.log("API Response Data:", JSON.stringify(regOffices));

      setPageCount(parseInt(pageCount));
      setPerPage(parseInt(perPage));
      setTotalCount(parseInt(totalCount));
      setRegionalOffices(regOffices);

      // console.log("Updated Regional Offices:", JSON.stringify(regOffices));
    });
  }, [currPage, perPage]);

  // useEffect(() => {
  //   setLoading(true);
  //   dispatch(onGetRegionalOffice(currPage, perPage));
  //   setDataList(regOffices);
  // }, [dispatch, currPage]);

  const [showRegionalOffice, setShowRegionalOffice] = useState(false);
  const [viewRegionalOffice, setViewRegionalOffice] = useState(false);
  const [showUploadRegionalOffice, setShowUploadRegionalOffice] =
    useState(false);

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
        Header: "Address",
        accessor: "addr",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">{cellProps.row.original.addr}</p>
          );
        },
      },
      {
        Header: "Contact Person",
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
        Header: "Mobile",
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
        Header: "State",
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
        Header: "District",
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
        Header: "City",
        accessor: "city_lbl",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">{cellProps.row.original.city_lbl}</p>
          );
        },
      },
      {
        Header: "GST",
        accessor: "gstno",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">{cellProps.row.original.gstno}</p>
          );
        },
      },
      {
        Header: "PAN",
        accessor: "panno",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">{cellProps.row.original.panno}</p>
          );
        },
      },
      {
        Header: "Login ID",
        accessor: "username",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">{cellProps.row.original.username}</p>
          );
        },
      },
      {
        Header: "Status",
        accessor: "status",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">{cellProps.row.original.status}</p>
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

  const handleAddRegionalOffice = () => {
    setShowRegionalOffice(!showRegionalOffice);
  };
  const handleUploadRegionalOffice = () => {
    setShowUploadRegionalOffice(!showUploadRegionalOffice);
  };

  // const handlePerPageChange = (perPage) => {
  //   dispatch(setPerPageAction(perPage));
  //   // Optionally, you can also dispatch fetchDataAction here to trigger data fetching
  // };

  // const handleCurrentPageChange = (currentPage) => {
  //   setCurrPage(currentPage);
  //   // dispatch(setCurrentPageAction(currentPage));
  //   // dispatch(onGetRegionalOffice({perPage, currentPage}));
  // };

  const [regOffData, setRegOffData] = useState({});

  const handleViewRegionalOffice = (regOffData) => {
    setViewRegionalOffice(!viewRegionalOffice);
    setRegOffData(regOffData);
  };

  const getTableActions = () => {
    return [
      {
        name: "Create",
        action: setShowRegionalOffice,
        type: "normal",
        icon: "create",
      },
      {
        name: "Upload",
        action: setShowUploadRegionalOffice,
        type: "normal",
        icon: "upload",
      },
    ];
  };

  return (
    <React.Fragment>
      <ViewRegionalOfficeModal
        isOpen={viewRegionalOffice}
        handleViewRegionalOffice={handleViewRegionalOffice}
        regionalOffData={regOffData}
        setViewRegionalOffice={setViewRegionalOffice}
      />
      <AddRegionalOfficeModal
        isOpen={showRegionalOffice}
        handleAddRegionalOffice={handleAddRegionalOffice}
      />
      <UploadRegionalOfficeModal
        isOpen={showUploadRegionalOffice}
        handleUploadRegionalOffice={handleUploadRegionalOffice}
      />
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Organization" breadcrumbItem="Regional Offices" />
          {isLoading ? (
            <Spinners setLoading={setLoading} />
          ) : (
            <Row>
              <Col lg="12">
                <Card>
                  <CardBody>
                    {/* {console.log("currpage:" + currPage, perPage)} */}
                    {console.log(
                      "RRRRRRRRRRRRRRRRRRRRRRRRegionalOffices:" +
                        JSON.stringify(regionaloffices)
                    )}
                    <RegionalTable />
                    {/* <NewTableContainer
                      isPagination={true}
                      isLoading={isLoading}
                      columns={columns}
                      data={regionaloffices}
                      isGlobalFilter={true}
                      isShowTableActionButtons={true}
                      isShowingPageLength={true}
                      iscustomPageSizeOptions={true}
                      tableActions={getTableActions()}
                      customPageSize={perPage}
                      // setCustomPageSize={handlePerPageChange}
                      currentPage={currPage}
                      totalRows={totalCount}
                      totalPageCount={pageCount}
                      rowsPerPage={perPage}
                      pageChangeHandler={(num) => setCurrPage(num)}
                      tableClass="table align-middle table-nowrap table-hover"
                      theadClass="table-light"
                      paginationDiv="col-sm-12 col-md-7"
                      pagination="pagination pagination-rounded justify-content-end mt-4"
                    /> */}
                    <div className="table-responsive">
                      <Table className="table mb-0">
                        <thead className="table-light">
                          <tr>
                            <th>#</th>
                            <th> Name</th>
                            <th>Code</th>
                            <th>Address</th>
                          </tr>
                        </thead>
                        <tbody>
                          {regionaloffices.map((row) => (
                            <tr key={row.id}>
                              <th scope="row">{row.id}</th>
                              <td>{row.name}</td>
                              <td>{row.code}</td>
                              <td>{row.addr}</td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </div>
                    <NewPagination
                      pageChangeHandler={(num) => setCurrPage(num)}
                      rowsPerPage={perPage}
                      totalRows={totalCount}
                      currentPage={parseInt(currPage)}
                      paginationDiv="col-sm-12 col-md-7"
                      pagination="pagination pagination-rounded justify-content-end mt-4"
                      pageCount={pageCount}
                      // pageIndex={state.pageIndex}
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

export default withRouter(RegionalOfficeList);
