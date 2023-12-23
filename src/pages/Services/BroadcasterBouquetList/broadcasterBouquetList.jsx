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

import { getBroadcasterBouquetList as onGetBroadcasterBouquet } from "/src/store/broadcasterbouquet/actions";

//redux
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { ToastContainer } from "react-toastify";
import AddNewBroadcasterBouquetList from "./AddNewBroadcasterBouquetList";
import ViewBroadCasterBouquet from "./ViewBroadCasterBouquet";

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
      loading: broadcasterBouquetList.loading,
    })
  );

  const { brodcastbouquet, loading } = useSelector(
    BroadcasterBouquetProperties
  );

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
                  const broadData = cellProps.row.original;
                  handleViewBroadcast(broadData);
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
        accessor: "broadcaster",
        filterable: true,
        Cell: (cellProps) => {
          return <Broadcaster {...cellProps} />;
        },
      },
      {
        Header: "Type",
        accessor: "type",
        filterable: true,
        Cell: (cellProps) => {
          return <Type {...cellProps} />;
        },
      },
      {
        Header: "FTA",
        accessor: "FTA",
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
          return (
            <p className="text-muted mb-0">{cellProps.row.original.channels}</p>
          );
        },
      },
      {
        Header: "Status",
        accessor: "status",
        filterable: true,
        Cell: (cellProps) => {
          return <Status {...cellProps} />;
        },
      },
      {
        Header: "Rate",
        accessor: "rate",
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
      {
        Header: "Action",
        Cell: (cellProps) => {
          return (
            <div className="d-flex gap-3">
              <Link
                to="#"
                className="text-success"
                onClick={() => {
                  const userData = cellProps.row.original;
                  handleUserClick(userData);
                }}
              >
                <i className="mdi mdi-pencil font-size-18" id="edittooltip" />
                <UncontrolledTooltip placement="top" target="edittooltip">
                  Edit
                </UncontrolledTooltip>
              </Link>
              <Link
                to="#"
                className="text-danger"
                onClick={() => {
                  const userData = cellProps.row.original;
                  onClickDelete(userData);
                }}
              >
                <i className="mdi mdi-delete font-size-18" id="deletetooltip" />
                <UncontrolledTooltip placement="top" target="deletetooltip">
                  Delete
                </UncontrolledTooltip>
              </Link>
            </div>
          );
        },
      },
    ],
    []
  );

  useEffect(() => {
    if (brodcastbouquet && !brodcastbouquet.length) {
      dispatch(onGetBroadcasterBouquet());
    }
  }, [dispatch, brodcastbouquet]);

  const handleAddBroadcaster = () => {
    setShowAddNewBroadcasterBouquetList(!showAddNewBroadcasterBouquetList);
  };
  const [viewBrocast, setViewBrocast] = useState({});
  const handleViewBroadcast = (broadData) => {
    setViewBroadcastBouq(!viewBroadcastBouq);
    setViewBrocast(broadData);
  };

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
        handleAddBroadcaster={handleAddBroadcaster}
      />
      <ViewBroadCasterBouquet
        isOpen={viewBroadcastBouq}
        handleViewBroadcast={handleViewBroadcast}
        broadcast={viewBrocast}
      />
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Services" breadcrumbItem="Broadcaster Bouquets" />
          {isLoading ? (
            <Spinners setLoading={setLoading} />
          ) : (
            <Row>
              <Col lg="12">
                <Card>
                  <CardBody>
                    {console.log(
                      "broadcasterBouquet" + JSON.stringify(brodcastbouquet)
                    )}
                    <TableContainer
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
