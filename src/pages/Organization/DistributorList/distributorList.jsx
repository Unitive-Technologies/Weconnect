import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import withRouter from "../../../components/Common/withRouter";
import TableContainer from "../../../components/Common/TableContainer";
import Spinners from "../../../components/Common/Spinner";
import { Card, CardBody, Col, Container, Row } from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "/src/components/Common/Breadcrumb";

import { getDistributors as onGetDistributors } from "/src/store/actions";
import { goToPage as onGoToPage } from "../../../store/distributor/actions";

//redux
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { ToastContainer } from "react-toastify";
import ViewDistributorModal from "./ViewDistributorModal";
import AddDistributorModal from "./AddDistributorModal";
import UploadDistributorModal from "./UploadDistributorModal";
import SettingModal from "./SettingModal";
import TableContainerX from "../../../components/Common/TableContainerX";

const DistributorList = (props) => {
  const DEFAULT_PAGE_SIZE = 10;
  //meta title
  document.title = "Distributors | VDigital";

  const dispatch = useDispatch();
  const [showSetting, setShowSetting] = useState(false);

  const selectDistributorsState = (state) => state.distributors;
  const DistributorsProperties = createSelector(
    selectDistributorsState,
    (distributors) => ({
      distributor: distributors.distributors,
      loading: distributors.loading,
      totalPage: distributors.totalPages,
      totalCount: distributors.totalCount,
      pageSize: distributors.perPage,
      currentPage: distributors.currentPage,
    })
  );

  const { distributor, loading, totalCount, pageSize, currentPage, totalPage } =
    useSelector(DistributorsProperties);

  console.log("Distributor Value - From UseSelector..", distributor);
  console.log(`TotalCount - ${totalCount}`);
  console.log(`PageSize - ${pageSize}`);
  console.log(`CurrentPage - ${currentPage}`);
  console.log(`TotalPage - ${totalPage}`);
  // const [isLoading, setLoading] = useState(loading);
  const [showDistributor, setShowDistributor] = useState(false);
  const [viewDistributor, setViewDistributor] = useState(false);
  const [showUploadDistributor, setShowUploadDistributor] = useState(false);

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
                  handleViewModal(userData);
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
        accessor: "addr1",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">{cellProps.row.original.addr1}</p>
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
    if (distributor && !distributor.length) {
      dispatch(onGetDistributors());
    }
  }, [distributor]);

  const goToPage = (toPage) => {
    console.log("[GOTO PAGE] Trigger to page - ", toPage);
    dispatch(onGoToPage(toPage));
  };
  const handleAddDistributor = () => {
    setShowDistributor(!showDistributor);
  };
  const handleUploadDistributor = () => {
    setShowUploadDistributor(!showUploadDistributor);
  };

  const [viewDistributors, setViewDistributors] = useState({});

  const handleViewModal = (userData) => {
    setViewDistributor(!viewDistributor);
    setViewDistributors(userData);
  };

  const getTableActions = () => {
    return [
      {
        name: "Create",
        action: setShowDistributor,
        type: "normal",
        icon: "create",
      },
      {
        name: "Upload",
        action: setShowUploadDistributor,
        type: "normal",
        icon: "upload",
      },
      {
        name: "Settings",
        action: setShowSetting,
        type: "normal",
        icon: "upload",
      },
    ];
  };

  const keyField = "id";

  return (
    <React.Fragment>
      <ViewDistributorModal
        isOpen={viewDistributor}
        handleViewModal={handleViewModal}
        distributor={viewDistributors}
        setViewDistributor={setViewDistributor}
      />
      <AddDistributorModal
        isOpen={showDistributor}
        handleAddDistributor={handleAddDistributor}
      />
      <UploadDistributorModal
        isOpen={showUploadDistributor}
        handleUploadDistributor={handleUploadDistributor}
      />
      <SettingModal
        isOpen={showSetting}
        handleShowSetting={() => setShowSetting(false)}
      />
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Organization" breadcrumbItem="Distributors" />
          {
            // isLoading ? (
            //   <Spinners setLoading={setLoading} />
            // ) :
            <Row>
              <Col lg="12">
                <Card>
                  <CardBody>
                    <TableContainerX
                      columns={columns}
                      data={distributor}
                      isLoading={loading}
                      isPagination={true}
                      totalCount={Number(totalCount)}
                      pageSize={Number(pageSize)}
                      currentPage={Number(currentPage)}
                      totalPage={Number(totalPage)}
                      isGlobalFilter={true}
                      isShowingPageLength={true}
                      tableActions={getTableActions()}
                      goToPage={goToPage}
                    />
                  </CardBody>
                </Card>
              </Col>
            </Row>
          }
        </Container>
      </div>
      <ToastContainer />
    </React.Fragment>
  );
};

export default withRouter(DistributorList);
