import React, { useEffect, useState, useRef, useMemo } from "react";
import { Link } from "react-router-dom";
import withRouter from "../../../components/Common/withRouter";
import TableContainer from "../../../components/Common/TableContainer";
import Spinners from "../../../components/Common/Spinner";
import { Card, CardBody, Col, Container, Row, Spinner } from "reactstrap";

import {
  Code,
  Broadcaster,
  Genre,
  Language,
  Type,
  Alacarte,
  FTA,
  NCF,
  CasCodes,
  Status,
  Rate,
  CreatedAt,
  CreatedBy,
} from "./channelListCol";

//Import Breadcrumb
import Breadcrumbs from "/src/components/Common/Breadcrumb";

import {
  goToPage as onGoToPage,
  getChannelListStatus as onGetChannelListStatus,
  getChannelListDefinition as onGetChannelListDefinition,
  getChannelListType as onGetChannelListType,
  getChannelListCascode as onGetChannelListCascode,
  getChannelListGenre as onGetChannelListGenre,
  getChannelListBroadcaster as onGetChannelListBroadcaster,
  getChannelListLanguage as onGetChannelListLanguage,
  getChannelList as onGetChannelList,
  // getCASSource as onGetCASSource,
} from "/src/store/channel/actions";

//redux
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { ToastContainer } from "react-toastify";
import AddNewChannelList from "./AddNewChannelList";
import BulkUpdateCasCodeChannelList from "./BulkUpdateCasCodeChannelList";
import BulkUpdateChannelList from "./BulkUpdateChannelList";
import UploadChannelList from "./UploadChannelList";
import ViewChannel from "./ViewChannel";
import TableContainerX from "../../../components/Common/TableContainerX";

const ChannelList = (props) => {
  //meta title
  document.title = "Channels | VDigital";

  const dispatch = useDispatch();

  const selectChannelState = (state) => state.channelList;
  const ChannelProperties = createSelector(
    selectChannelState,
    (channelList) => ({
      channel: channelList.channelList,
      channelListStatus: channelList.channellistStatus,
      channelListDefinition: channelList.channellistDefinition,
      channelListType: channelList.channellistType,
      channelListCascode: channelList.channellistCascode,
      channelListGenre: channelList.channellistGenre,
      channelListBroadcaster: channelList.channellistBroadcaster,
      channelListLanguage: channelList.channellistLanguage,
      loading: channelList.loading,
      totalPage: channelList.totalPages,
      totalCount: channelList.totalCount,
      pageSize: channelList.perPage,
      currentPage: channelList.currentPage,
    })
  );

  const { channel, channelListBroadcaster, channelListCascode, channelListDefinition, channelListGenre, channelListLanguage, channelListStatus, channelListType, loading, totalPage, totalCount, pageSize, currentPage } =
    useSelector(ChannelProperties);

  useEffect(() => {
    // console.log("Channel List data in component:", channel);
  }, [channel]);

  const [viewChannelList, setViewChannelList] = useState(false);
  const [showAddNewChannelList, setShowAddNewChannelList] = useState(false);
  const [showUploadChannelList, setShowUploadChannelList] = useState(false);
  const [showBulkUpdateChannelList, setShowBulkUpdateChannelList] =
    useState(false);
  const [
    showBulkUpdateCasCodeChannelList,
    setShowBulkUpdateCasCodeChannelList,
  ] = useState(false);

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
                  const channelData = cellProps.row.original;
                  toggleViewModal(channelData);
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
        Header: "Genre",
        accessor: "genre_lbl",
        filterable: true,
        Cell: (cellProps) => {
          return <Genre {...cellProps} />;
        },
      },
      {
        Header: "Language",
        accessor: "language_lbl",
        filterable: true,
        Cell: (cellProps) => {
          return <Language {...cellProps} />;
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
        Header: "Alacarte",
        accessor: "isAlacarte_lbl",
        filterable: true,
        Cell: (cellProps) => {
          return <Alacarte {...cellProps} />;
        },
      },
      {
        Header: "FTA",
        accessor: "isFta_lbl",
        filterable: true,
        Cell: (cellProps) => {
          return <FTA {...cellProps} />;
        },
      },
      {
        Header: "NCF",
        accessor: "isNCF_lbl",
        filterable: true,
        Cell: (cellProps) => {
          return <NCF {...cellProps} />;
        },
      },
      {
        Header: "CAS CODES",
        accessor: "cascode",
        filterable: true,
        Cell: (cellProps) => {
          return <CasCodes {...cellProps} />;
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
        accessor: "drp",
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
    if (channel && !channel.length) {
      dispatch(onGetChannelList());
      dispatch(onGetChannelListStatus());
      dispatch(onGetChannelListCascode());
      dispatch(onGetChannelListBroadcaster());
      dispatch(onGetChannelListDefinition());
      dispatch(onGetChannelListGenre());
      dispatch(onGetChannelListLanguage());
      dispatch(onGetChannelListType());
      // dispatch(onGetCASSource());
    }
  }, [dispatch, channel]);

  const goToPage = (toPage) => {
    console.log("[GOTO PAGE] Trigger to page - ", toPage);
    dispatch(onGoToPage(toPage));
    dispatch(onGetChannelList());
  };

  const toggleAddModal = () => {
    setShowAddNewChannelList(!showAddNewChannelList);
  };

  const toggleUploadModal = () => {
    setShowUploadChannelList(!showUploadChannelList);
  };

  const toggleUpdateModal = () => {
    setShowBulkUpdateChannelList(!showBulkUpdateChannelList);
  };

  const handleUpdateCasCode = () => {
    setShowBulkUpdateCasCodeChannelList(!showBulkUpdateCasCodeChannelList);
  };

  const [viewChanel, setViewChanel] = useState({});

  const toggleViewModal = (channelData) => {
    setViewChannelList(!viewChannelList);
    setViewChanel(channelData);
  };

  const resetSelection = () => {
    setViewChanel({});
  };
  const keyField = "id";

  const getTableActions = () => {
    return [
      {
        name: "Create",
        action: setShowAddNewChannelList,
        type: "normal",
        icon: "create",
      },
      {
        name: "Upload Channel",
        action: setShowUploadChannelList,
        type: "dropdown",
        dropdownName: "Upload",
      },
      {
        name: "Bulk Update Channel",
        action: setShowBulkUpdateChannelList,
        type: "dropdown",
        dropdownName: "Upload",
      },
      {
        name: "Bulk Update Channel Cas Code",
        action: setShowBulkUpdateCasCodeChannelList,
        type: "dropdown",
        dropdownName: "Upload",
      },
    ];
  };

  console.log("View in Channel List Type " + channelListType)

  return (
    <React.Fragment>
      <AddNewChannelList
        isOpen={showAddNewChannelList}
        toggleAddModal={toggleAddModal}
        channelListBroadcaster={channelListBroadcaster}
        channelListCascode={channelListCascode}
        channelListDefinition={channelListDefinition}
        channelListGenre={channelListGenre}
        channelListLanguage={channelListLanguage}
        channelListStatus={channelListStatus}
        channelListType={channelListType}
      />
      <UploadChannelList
        isOpen={showUploadChannelList}
        toggleUploadModal={toggleUploadModal}
      />
      <BulkUpdateChannelList
        isOpen={showBulkUpdateChannelList}
        toggleUpdateModal={toggleUpdateModal}
      />
      <BulkUpdateCasCodeChannelList
        isOpen={showBulkUpdateCasCodeChannelList}
        handleUpdateCasCode={handleUpdateCasCode}
      />
      <ViewChannel
        isOpen={viewChannelList}
        toggleViewModal={toggleViewModal}
        channel={viewChanel}
        channelListBroadcaster={channelListBroadcaster}
        channelListCascode={channelListCascode}
        channelListDefinition={channelListDefinition}
        channelListGenre={channelListGenre}
        channelListLanguage={channelListLanguage}
        channelListStatus={channelListStatus}
        channelListType={channelListType}
        resetSelection={resetSelection}
      />

      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Services" breadcrumbItem="Channels" />
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
                    {/* {console.log("Channel List:" + JSON.stringify(channel))} */}
                    {/* <TableContainer
                      isPagination={true}
                      columns={columns}
                      data={channel}
                      isGlobalFilter={true}
                      isShowTableActionButtons={true}
                      isShowingPageLength={true}
                      tableActions={getTableActions()}
                      handleAddNewChannelList={() =>
                        setShowAddNewChannelList(true)
                      }
                      handleUploadChannelList={() =>
                        setShowUploadChannelList(true)
                      }
                      handleBulkUpdateCasCodeChannelList={() =>
                        setShowBulkUpdateCasCodeChannelList(true)
                      }
                      handleBulkUpdateChannelList={() =>
                        setShowBulkUpdateChannelList(true)
                      }
                      customPageSize={50}
                      tableClass="table align-middle table-nowrap table-hover"
                      theadClass="table-light"
                      paginationDiv="col-sm-12 col-md-7"
                      pagination="pagination pagination-rounded justify-content-end mt-4"
                    /> */}
                    <TableContainerX
                      columns={columns}
                      data={channel}
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
                      toggleAddModal={() =>
                        setShowAddNewChannelList(true)
                      }
                      toggleUploadModal={() =>
                        setShowUploadChannelList(true)
                      }
                      handleUpdateCasCode={() =>
                        setShowBulkUpdateCasCodeChannelList(true)
                      }
                      toggleUpdateModal={() =>
                        setShowBulkUpdateChannelList(true)
                      }
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

export default withRouter(ChannelList);
