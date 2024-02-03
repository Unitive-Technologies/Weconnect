import React, { useEffect, useState, useRef, useMemo } from "react";
import { Link } from "react-router-dom";
import withRouter from "../../../components/Common/withRouter";
import {
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Spinner,
  UncontrolledTooltip,
} from "reactstrap";

import {
  Code,
  Broadcaster,
  Type,
  FTA,
  Channels,
  Status,
  Rate,
  CreatedAt,
  CreatedBy,
} from "./broadcasterBouquetListCol";

//Import Breadcrumb
import Breadcrumbs from "/src/components/Common/Breadcrumb";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import {
  goToPage as onGoToPage,
  getBroadcasterBouquetList as onGetBroadcasterBouquet,
  getBroadcasterBouquetStatus as onGetBroadcasterBouquetStatus,
  getBroadcasterBouquetType as onGetBroadcasterBouquetType,
  getBroadcasterBouquetBroadcaster as onGetBroadcasterBouquetBroadcaster,
  getBroadcasterBouquetAddchannel as onGetBroadcasterBouquetAddchannel,
  getBroadcasterBouquetDefinition as onGetBroadcasterBouquetDefinition,
} from "/src/store/broadcasterbouquet/actions";

//redux
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { ToastContainer } from "react-toastify";
import AddNewBroadcasterBouquetList from "./AddNewBroadcasterBouquetList";
import ViewBroadCasterBouquet from "./ViewBroadCasterBouquet";
import TableContainerX from "../../../components/Common/TableContainerX";

const BroadcasterBouquetList = (props) => {
  //meta title
  document.title = "Broadcaster Bouquets | VDigital";

  const dispatch = useDispatch();
  const [viewBroadcastBouq, setViewBroadcastBouq] = useState(false);

  const selectBroadcasterBouquetState = (state) => state.broadcasterBouquetList;

  const BroadcasterBouquetProperties = createSelector(
    selectBroadcasterBouquetState,
    (broadcasterBouquetList) => ({
      brodcastbouquet: broadcasterBouquetList.broadcasterBouquetList,
      brodcastbouquetStatus: broadcasterBouquetList.broadbouquetStatus,
      brodcastbouquetType: broadcasterBouquetList.broadbouquetType,
      brodcastbouquetAddchannels:
        broadcasterBouquetList.broadbouquetAddchannels,
      brodcastbouquetDefinition:
        broadcasterBouquetList.broadbouquetDefinition,
      brodcastbouquetBroadcaster:
        broadcasterBouquetList.broadbouquetBroadcaster,
      loading: broadcasterBouquetList.loading,
      totalPage: broadcasterBouquetList.totalPages,
      totalCount: broadcasterBouquetList.totalCount,
      pageSize: broadcasterBouquetList.perPage,
      currentPage: broadcasterBouquetList.currentPage,
    })
  );

  const {
    brodcastbouquet,
    brodcastbouquetAddchannels,
    brodcastbouquetDefinition,
    brodcastbouquetBroadcaster,
    brodcastbouquetStatus,
    brodcastbouquetType,
    loading,
    totalPage,
    totalCount,
    pageSize,
    currentPage,
  } = useSelector(BroadcasterBouquetProperties);

  useEffect(() => {
    // console.log("Broadcaster Bouquet data in component:", brodcastbouquet);
  }, [brodcastbouquet]);
  const [isLoading, setLoading] = useState(loading);

  const [
    showAddNewBroadcasterBouquetList,
    setShowAddNewBroadcasterBouquetList,
  ] = useState(false);

  const columns = useMemo(
    () => [
      {
        Header: "    ",
        disableFilters: true,
        filterable: true,
        Cell: (cellProps) => (
          <div>
            <FontAwesomeIcon
              icon={faPlus}
              style={{
                cursor: "pointer",
                border: "solid 1px",
                padding: "4px",
                background: "#151b1e",
                color: "white",
              }}
            // onClick={handlePlusClick}
            />
          </div>
        ),
      },
      {
        Header: "#",
        disableFilters: true,
        filterable: true,
        Cell: (cellProps) => {
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
                  const broadData = cellProps.row.original;
                  toggleViewModal(broadData);
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
          return <Code {...cellProps} />;
        },
      },
      {
        Header: "Broadcaster",
        accessor: "broadcaster_lbl",
        filterable: true,
        Cell: (cellProps) => {
          return <Broadcaster {...cellProps} />;
        },
      },
      {
        Header: "Type",
        accessor: "channel_type_lbl",
        filterable: true,
        Cell: (cellProps) => {
          return <Type {...cellProps} />;
        },
      },
      {
        Header: "FTA",
        accessor: "isNCF_lbl",
        filterable: true,
        Cell: (cellProps) => {
          return <FTA {...cellProps} />;
        },
      },
      {
        Header: "CHANNELS",
        accessor: "channels",
        filterable: true,
        Cell: (cellProps) => {
          // { console.log("channels Data" + JSON.stringify(cellProps.row.original.channels)) }
          return (
            <p
              className="text-muted mb-0"
              style={{
                maxWidth: 200,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {cellProps.row.original.channels &&
                cellProps.row.original.channels
                  .map(
                    (channel) =>
                      channel.name + "(" + channel.channel_type_lbl + ")"
                  )
                  .join(", ")}
            </p>
          );
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
        Header: "Rate",
        accessor: "broadcasterRate",
        filterable: true,
        Cell: (cellProps) => {
          return <Rate {...cellProps} />;
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
    if (brodcastbouquet && !brodcastbouquet.length) {
      dispatch(onGetBroadcasterBouquet());
      dispatch(onGetBroadcasterBouquetAddchannel());
      dispatch(onGetBroadcasterBouquetBroadcaster());
      dispatch(onGetBroadcasterBouquetDefinition());
      dispatch(onGetBroadcasterBouquetStatus());
      dispatch(onGetBroadcasterBouquetType());
    }
  }, [dispatch, brodcastbouquet]);

  const goToPage = (toPage) => {
    console.log("[GOTO PAGE] Trigger to page - ", toPage);
    dispatch(onGoToPage(toPage));
    dispatch(onGetBroadcasterBouquet());
  };

  const toggleAddModal = () => {
    setShowAddNewBroadcasterBouquetList(!showAddNewBroadcasterBouquetList);
  };
  const [viewBrocast, setViewBrocast] = useState({});
  const toggleViewModal = (broadData) => {
    setViewBroadcastBouq(!viewBroadcastBouq);
    setViewBrocast(broadData);
  };

  const resetSelection = () => {
    setViewBrocast({});
  };

  console.log("broadcaster bouquet List Status" + brodcastbouquetStatus);

  const keyField = "id";

  const getTableActions = () => {
    return [
      {
        name: "Create",
        action: setShowAddNewBroadcasterBouquetList,
        type: "normal",
        icon: "create",
      },
    ];
  };

  return (
    <React.Fragment>
      <AddNewBroadcasterBouquetList
        isOpen={showAddNewBroadcasterBouquetList}
        toggleAddModal={toggleAddModal}
        broadcasterBouquetAddchannels={brodcastbouquetAddchannels}
        broadcasterBouquetBroadcaster={brodcastbouquetBroadcaster}
        broadcasterBouquetDefinition={brodcastbouquetDefinition}
        broadcasterBouquetStatus={brodcastbouquetStatus}
        broadcasterBouquetType={brodcastbouquetType}
      />
      <ViewBroadCasterBouquet
        isOpen={viewBroadcastBouq}
        toggleViewModal={toggleViewModal}
        broadcast={viewBrocast}
        broadcasterBouquetAddchannels={brodcastbouquetAddchannels}
        broadcasterBouquetBroadcaster={brodcastbouquetBroadcaster}
        broadcasterBouquetDefinition={brodcastbouquetDefinition}
        broadcasterBouquetStatus={brodcastbouquetStatus}
        broadcasterBouquetType={brodcastbouquetType}
        resetSelection={resetSelection}
      />
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Services" breadcrumbItem="Broadcaster Bouquets" />
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
                    {/* {console.log(
                      "broadcasterBouquet" + JSON.stringify(brodcastbouquet)
                    )} */}
                    {/* <TableContainer
                      isPagination={true}
                      columns={columns}
                      data={brodcastbouquet}
                      isGlobalFilter={true}
                      isShowTableActionButtons={true}
                      isShowingPageLength={true}
                      tableActions={getTableActions()}
                      handleAddNewBroadcasterBouquetList={() =>
                        setShowAddNewBroadcasterBouquetList(true)
                      }
                      customPageSize={50}
                      tableClass="table align-middle table-nowrap table-hover"
                      theadClass="table-light"
                      paginationDiv="col-sm-12 col-md-7"
                      pagination="pagination pagination-rounded justify-content-end mt-4"
                    /> */}
                    <TableContainerX
                      columns={columns}
                      data={brodcastbouquet}
                      isLoading={loading}
                      isPagination={true}
                      totalCount={Number(totalCount)}
                      pageSize={Number(pageSize)}
                      currentPage={Number(currentPage)}
                      totalPage={Number(totalPage)}
                      isGlobalFilter={true}
                      isShowingPageLength={true}
                      tableActions={getTableActions()}
                      toggleAddModal={() =>
                        setShowAddNewBroadcasterBouquetList(true)
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

export default withRouter(BroadcasterBouquetList);
