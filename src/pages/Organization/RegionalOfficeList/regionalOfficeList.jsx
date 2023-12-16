import React, { useEffect, useState, useRef, useMemo } from "react";
import { Link } from "react-router-dom";
import withRouter from "../../../components/Common/withRouter";
import TableContainer from "../../../components/Common/TableContainer";
import Spinners from "../../../components/Common/Spinner";
import { Card, CardBody, Col, Container, Row } from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "/src/components/Common/Breadcrumb";

import { getRegionalOffice as onGetRegionalOffice } from "/src/store/actions";

//redux
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { ToastContainer } from "react-toastify";
import ViewRegionalOfficeModal from "./ViewRegionalOfficeModal";
import AddRegionalOfficeModal from "./AddRegionalOfficeModal";
import UploadRegionalOfficeModal from "./UploadRegionalOfficeModal";

const RegionalOfficeList = (props) => {
  //meta title
  document.title = "Regional Offices | VDigital";

  const dispatch = useDispatch();

  const selectRegionalOfficeState = (state) => state.regionaloffice;
  const RegionalOfficeProperties = createSelector(
    selectRegionalOfficeState,
    (regionaloffice) => ({
      regOff: regionaloffice.regionaloffice,
      loading: regionaloffice.loading,
    })
  );

  const { regOff, loading } = useSelector(RegionalOfficeProperties);

  useEffect(() => {
    console.log("Regional Office data in component:", regOff);
  }, [regOff]);
  const [isLoading, setLoading] = useState(loading);

  const [userList, setUserList] = useState([]);
  const [showRegionalOffice, setShowRegionalOffice] = useState(false);
  const [viewRegionalOffice, setViewRegionalOffice] = useState(false);
  const [showUploadRegionalOffice, setShowUploadRegionalOffice] =
    useState(false);
  const [isEdit, setIsEdit] = useState(false);

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

  useEffect(() => {
    if (regOff && !regOff.length) {
      dispatch(onGetRegionalOffice());
      setIsEdit(false);
    }
  }, [dispatch, regOff]);

  const handleAddRegionalOffice = () => {
    setShowRegionalOffice(!showRegionalOffice);
  };
  const handleUploadRegionalOffice = () => {
    setShowUploadRegionalOffice(!showUploadRegionalOffice);
  };

  const [regOffData, setRegOffData] = useState({});

  const handleViewRegionalOffice = (regOffData) => {
    setViewRegionalOffice(!viewRegionalOffice);
    setRegOffData(regOffData);
  };

  var node = useRef();

  const keyField = "id";

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
        toggle={handleViewRegionalOffice}
        regionalOffData={regOffData}
        setViewRegionalOffice={setViewRegionalOffice}
      />
      <AddRegionalOfficeModal
        isOpen={showRegionalOffice}
        toggle={handleAddRegionalOffice}
      />
      <UploadRegionalOfficeModal
        isOpen={showUploadRegionalOffice}
        toggle={handleUploadRegionalOffice}
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
                    {console.log("regoff:" + JSON.stringify(regOff))}
                    <TableContainer
                      isPagination={true}
                      columns={columns}
                      data={regOff}
                      isGlobalFilter={true}
                      isAddRegionalOffice={true}
                      isShowingPageLength={true}
                      // iscustomPageSizeOptions={true}
                      handleAddRegionalOffice={() =>
                        setShowRegionalOffice(true)
                      }
                      handleUploadRegionalOffice={() =>
                        setShowUploadRegionalOffice(true)
                      }
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
          )}
        </Container>
      </div>
      <ToastContainer />
    </React.Fragment>
  );
};

export default withRouter(RegionalOfficeList);
