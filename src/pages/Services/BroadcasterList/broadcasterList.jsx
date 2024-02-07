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
  FullName,
  Address,
  ContactPerson,
  Description,
  Mobile,
  Status,
  CreatedAt,
  CreatedBy,
} from "./broadcasterListCol";

//Import Breadcrumb
import Breadcrumbs from "/src/components/Common/Breadcrumb";

import {
  goToPage as onGoToPage,
  getBroadCaster as onGetBroadCasters,
  getBroadCasterStatus as onGetBroadCastersStatus,
} from "/src/store/broadcaster/actions";

//redux
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { ToastContainer } from "react-toastify";
import AddNewBroadCaster from "./AddNewBroadCaster";
import UploadBroadCaster from "./UploadBroadCaster";
import TableContainerX from "../../../components/Common/TableContainerX";
import ViewBroadcasterModal from "./ViewBroadcasterModal";
import ViewGenreList from "../GenreList/ViewGenreList";

const BroadcasterList = (props) => {
  //meta title
  document.title = "Broadcaster List | VDigital";

  const dispatch = useDispatch();

  const selectBroadCasterState = (state) => state.broadCasters;

  const BroadCasterProperties = createSelector(
    selectBroadCasterState,
    (broadCasters) => ({
      brodcast: broadCasters.broadCasters,
      brodcastStatus: broadCasters.broadCastersStatus,
      loading: broadCasters.loading,
      totalPage: broadCasters.totalPages,
      totalCount: broadCasters.totalCount,
      pageSize: broadCasters.perPage,
      currentPage: broadCasters.currentPage,
    })
  );

  const {
    brodcast,
    brodcastStatus,
    totalPage,
    totalCount,
    pageSize,
    currentPage,
    loading,
  } = useSelector(BroadCasterProperties);

  useEffect(() => {
    console.log("BroadCaster data in component:", brodcast);
  }, [brodcast]);
  const [isLoading, setLoading] = useState(loading);

  const [userList, setUserList] = useState([]);
  const [showAddNewBroadCaster, setShowAddNewBroadCaster] = useState(false);
  const [showUploadBroadCaster, setShowUploadBroadCaster] = useState(false);
  const [showViewBroadcaster, setShowViewBroadcaster] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

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
            <h5
              style={{
                maxWidth: 200,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
              className="font-size-14 mb-1"
              // onClick={() => {
              //   const userData = cellProps.row.original;
              //   toggleViewBroadcaster(userData);
              // }}
            >
              <Link className="text-dark" to="#">
                {cellProps.row.original.name}
              </Link>
            </h5>
          );
        },
      },
      {
        Header: "Full Name",
        accessor: "fullname",
        filterable: true,
        Cell: (cellProps) => {
          return <FullName {...cellProps} />;
        },
      },
      {
        Header: "Address",
        accessor: "addr",
        filterable: true,
        Cell: (cellProps) => {
          return <Address {...cellProps} />;
        },
      },
      {
        Header: "Contact Person",
        accessor: "contact_person",
        filterable: true,
        Cell: (cellProps) => {
          return <ContactPerson {...cellProps} />;
        },
      },
      {
        Header: "Mobile",
        accessor: "mobile_no",
        filterable: true,
        Cell: (cellProps) => {
          return <Mobile {...cellProps} />;
        },
      },
      {
        Header: "Status",
        accessor: "status_lbl",
        filterable: true,
        Cell: (cellProps) => {
          return <Status {...cellProps} />;
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
        Header: "Created At",
        accessor: "created_at",
        filterable: true,
        Cell: (cellProps) => {
          return <CreatedAt {...cellProps} />;
        },
      },
      {
        Header: "Created By",
        accessor: "created_by_lbl",
        filterable: true,
        Cell: (cellProps) => {
          return <CreatedBy {...cellProps} />;
        },
      },
    ],
    []
  );

  useEffect(() => {
    if (brodcast && !brodcast.length) {
      dispatch(onGetBroadCasters());
      dispatch(onGetBroadCastersStatus());
      setIsEdit(false);
    }
  }, [dispatch, brodcast]);

  const goToPage = (toPage) => {
    console.log("[GOTO PAGE] Trigger to page - ", toPage);
    dispatch(onGoToPage(toPage));
    dispatch(onGetBroadCasters());
  };

  const toggle = () => {
    setShowAddNewBroadCaster(!showAddNewBroadCaster);
  };

  const toggle1 = () => {
    setShowUploadBroadCaster(!showUploadBroadCaster);
  };

  const [viewBroadcaster, setViewBroadcaster] = useState({});
  // const toggleViewModal = () => setModal(modal);
  // const handleUserClick = (arg) => {

  const toggleViewBroadcaster = (row) => {
    setShowViewBroadcaster(!showViewBroadcaster);
    setViewBroadcaster(row);
    // toggle();
  };

  var node = useRef();
  const onPaginationPageChange = (page) => {
    if (
      node &&
      node.current &&
      node.current.props &&
      node.current.props.pagination &&
      node.current.props.pagination.options
    ) {
      node.current.props.pagination.options.onPageChange(page);
    }
  };

  const keyField = "id";

  const getTableActions = () => {
    return [
      {
        name: "Create",
        action: setShowAddNewBroadCaster,
        type: "normal",
        icon: "create",
      },
      {
        name: "Upload",
        action: setShowUploadBroadCaster,
        type: "normal",
        icon: "upload",
      },
    ];
  };

  return (
    <React.Fragment>
      <ViewBroadcasterModal
        isOpen={showViewBroadcaster}
        toggleViewBroadcaster={toggleViewBroadcaster}
        viewBroadcaster={viewBroadcaster}
        brodcastStatus={brodcastStatus}
      />

      <AddNewBroadCaster
        isOpen={showAddNewBroadCaster}
        toggle={toggle}
        brodcastStatus={brodcastStatus}
      />
      <UploadBroadCaster isOpen={showUploadBroadCaster} toggle={toggle1} />

      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Services" breadcrumbItem="Broadcaster List" />
          {isLoading ? (
            <Spinners setLoading={setLoading} />
          ) : (
            <Row>
              <Col lg="12">
                <Card>
                  <CardBody>
                    {/* <TableContainer
                      isPagination={true}
                      columns={columns}
                      data={brodcast}
                      handleRowClick={(row) => {
                        toggleViewBroadcaster(row);
                      }}
                      isGlobalFilter={true}
                      isShowTableActionButtons={true}
                      isShowingPageLength={true}
                      tableActions={getTableActions()}
                      handleAddNewBroadCasterClick={() =>
                        setShowAddNewBroadCaster(true)
                      }
                      handleUploadUser={() => setShowUploadBroadCaster(true)}
                      customPageSize={50}
                      tableClass="table align-middle table-nowrap table-hover"
                      theadClass="table-light"
                      paginationDiv="col-sm-12 col-md-7"
                      pagination="pagination pagination-rounded justify-content-end mt-4"
                    /> */}
                    <TableContainerX
                      columns={columns}
                      data={brodcast}
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
                        toggleViewBroadcaster(row);
                      }}
                      handleAddNewBroadCasterClick={() =>
                        setShowAddNewBroadCaster(true)
                      }
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

export default withRouter(BroadcasterList);
