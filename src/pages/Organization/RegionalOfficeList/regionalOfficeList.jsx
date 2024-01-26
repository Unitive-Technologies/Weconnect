import React, { useEffect, useState, useRef, useMemo } from "react";
import { Link } from "react-router-dom";
import withRouter from "../../../components/Common/withRouter";
import Spinners from "../../../components/Common/Spinner";
import {
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Table,
  Spinner,
} from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "/src/components/Common/Breadcrumb";
import {
  getDistributorsPhase as onGetDistributorsPhase,
  getDistributorsStatus as onGetDistributorsStatus,
} from "/src/store/distributor/actions";
import {
  getRegionalOffice as onGetRegionalOffice,
  goToPage as onGoToPage,
} from "/src/store/regionaloffice/actions";

//redux
import { createSelector } from "reselect";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import ViewRegionalOfficeModal from "./ViewRegionalOfficeModal";
import AddRegionalOfficeModal from "./AddRegionalOfficeModal";
import UploadRegionalOfficeModal from "./UploadRegionalOfficeModal";
import TableContainerX from "../../../components/Common/TableContainerX";

const RegionalOfficeList = (props) => {
  //meta title
  document.title = "Regional Offices | VDigital";

  const dispatch = useDispatch();

  const selectRegionalOfficeState = (state) => state.regionaloffice;
  const selectDistributorsState = (state) => state.distributors;
  const RegionalOfficeProperties = createSelector(
    selectRegionalOfficeState,

    (regionalOfficesState) => ({
      regOffices: regionalOfficesState.regionaloffice,
      loading: regionalOfficesState.loading,
      totalPage: regionalOfficesState.totalPages,
      totalCount: regionalOfficesState.totalCount,
      pageSize: regionalOfficesState.perPage,
      currentPage: regionalOfficesState.currentPage,
    })
  );
  const DistributorsProperties = createSelector(
    selectDistributorsState,
    (distributors) => ({
      phaseList: distributors.distributorsPhase,
      statusList: distributors.distributorsStatus,
    })
  );
  const { regOffices, loading, totalPage, totalCount, currentPage, pageSize } =
    useSelector(RegionalOfficeProperties);

  const { phaseList, statusList } = useSelector(DistributorsProperties);
  // const [isLoading, setLoading] = useState(loading);
  const [showRegionalOffice, setShowRegionalOffice] = useState(false);
  const [viewRegionalOffice, setViewRegionalOffice] = useState(false);
  const [showUploadRegionalOffice, setShowUploadRegionalOffice] =
    useState(false);

  const columns = useMemo(
    () => [
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
                  toggleViewRegionalOffice(userData);
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

  useEffect(() => {
    if (regOffices && !regOffices.length) {
      dispatch(onGetRegionalOffice());
      dispatch(onGetDistributorsPhase());
      dispatch(onGetDistributorsStatus());
    }
  }, [dispatch, regOffices]);

  const goToPage = (toPage) => {
    console.log("[GOTO PAGE] Trigger to page - ", toPage);
    dispatch(onGoToPage(toPage));
    dispatch(onGetRegionalOffice());
  };

  const toggleAddRegionalOffice = () => {
    setShowRegionalOffice(!showRegionalOffice);
  };
  const handleUploadRegionalOffice = () => {
    setShowUploadRegionalOffice(!showUploadRegionalOffice);
  };

  const [regOffData, setRegOffData] = useState({});

  const toggleViewRegionalOffice = (regOffData) => {
    setViewRegionalOffice(!viewRegionalOffice);
    setRegOffData(regOffData);
  };

  const resetSelection = () => {
    setRegOffData({});
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
        toggleViewRegionalOffice={toggleViewRegionalOffice}
        resetSelection={resetSelection}
        regionalOffData={regOffData}
        setViewRegionalOffice={setViewRegionalOffice}
      />
      <AddRegionalOfficeModal
        isOpen={showRegionalOffice}
        toggleAddRegionalOffice={toggleAddRegionalOffice}
        phaseList={phaseList}
        statusList={statusList}
      />
      <UploadRegionalOfficeModal
        isOpen={showUploadRegionalOffice}
        handleUploadRegionalOffice={handleUploadRegionalOffice}
      />
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Organization" breadcrumbItem="Regional Offices" />
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
                    {/* {console.log("currpage:" + currPage, perPage)} */}
                    {/* {console.log(
                      "RRRRRRRRRRRRRRRRRRRRRRRRegionalOffices:" +
                        JSON.stringify(regOffices)
                    )} */}
                    <TableContainerX
                      columns={columns}
                      data={regOffices}
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
                        toggleViewRegionalOffice(row);
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

export default withRouter(RegionalOfficeList);
