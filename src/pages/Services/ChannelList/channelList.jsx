import React, { useEffect, useState, useRef, useMemo } from "react";
import { Link } from "react-router-dom";
import withRouter from "../../../components/Common/withRouter";
import TableContainer from "../../../components/Common/TableContainer";
import Spinners from "../../../components/Common/Spinner";
import { Card, CardBody, Col, Container, Row } from "reactstrap";

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

import { getChannelList as onGetChannelList } from "/src/store/channel/actions";

//redux
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { ToastContainer } from "react-toastify";
import AddNewChannelList from "./AddNewChannelList";
import BulkUpdateCasCodeChannelList from "./BulkUpdateCasCodeChannelList";
import BulkUpdateChannelList from "./BulkUpdateChannelList";
import UploadChannelList from "./UploadChannelList";
import ViewChannel from "./ViewChannel";

const ChannelList = (props) => {
  //meta title
  document.title = "Channels | VDigital";

  const dispatch = useDispatch();

  const selectChannelState = (state) => state.channelList;
  const ChannelProperties = createSelector(
    selectChannelState,
    (channelList) => ({
      channel: channelList.channelList,
      loading: channelList.loading,
    })
  );

  const { channel, loading } = useSelector(ChannelProperties);

  useEffect(() => {
    // console.log("Channel List data in component:", channel);
  }, [channel]);
  const [isLoading, setLoading] = useState(loading);
  const [viewChannelList, setViewChannelList] = useState(false);
  const [showAddNewChannelList, setShowAddNewChannelList] = useState(false);
  const [showUploadChannelList, setShowUploadChannelList] = useState(false);
  const [showsBulkUpdateChannelList, setShowBulkUpdateChannelList] =
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
                  const channelData = cellProps.row.original;
                  handleViewChannel(channelData);
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
    }
  }, [dispatch, channel]);

  const handleAddChannel = () => {
    setShowAddNewChannelList(!showAddNewChannelList);
  };

  const handleUploadChannel = () => {
    setShowUploadChannelList(!showUploadChannelList);
  };

  const handleUpdateChannel = () => {
    setShowBulkUpdateChannelList(!showBulkUpdateChannelList);
  };

  const handleUpdateCasCode = () => {
    setShowBulkUpdateCasCodeChannelList(!showBulkUpdateCasCodeChannelList);
  };

  const [viewChanel, setViewChanel] = useState({});
  const handleViewChannel = (channelData) => {
    setViewChannelList(!viewChannelList);
    setViewChanel(channelData);
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

  return (
    <React.Fragment>
      <AddNewChannelList
        isOpen={showAddNewChannelList}
        handleAddChannel={handleAddChannel}
      />
      <UploadChannelList
        isOpen={showUploadChannelList}
        handleUploadChannel={handleUploadChannel}
      />
      <BulkUpdateChannelList
        isOpen={showBulkUpdateChannelList}
        handleUpdateChannel={handleUpdateChannel}
      />
      <BulkUpdateCasCodeChannelList
        isOpen={showBulkUpdateCasCodeChannelList}
        handleUpdateCasCode={handleUpdateCasCode}
      />
      <ViewChannel
        isOpen={viewChannelList}
        handleViewChannel={handleViewChannel}
        channel={viewChanel}
      />

      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Services" breadcrumbItem="Channels" />
          {isLoading ? (
            <Spinners setLoading={setLoading} />
          ) : (
            <Row>
              <Col lg="12">
                <Card>
                  <CardBody>
                    {/* {console.log("Channel List:" + JSON.stringify(channel))} */}
                    <TableContainer
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
