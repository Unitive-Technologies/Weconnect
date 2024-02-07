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

//Import Breadcrumb
import Breadcrumbs from "/src/components/Common/Breadcrumb";
import DeleteModal from "/src/components/Common/DeleteModal";

import {
  goToPage as onGoToPage,
  getConfigurationUploadLogs as onGetConfigurationUploadLogs,
} from "/src/store/configurationuploadlogs/actions";

//redux
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { ToastContainer } from "react-toastify";
import TableContainerX from "../../../components/Common/TableContainerX";

const ConfigurationUploadLogs = (props) => {
  //meta title
  document.title = "Configuration Upload Logs | VDigital";

  const dispatch = useDispatch();

  const selectConfigurationUplodLogsState = (state) =>
    state.configurationuploadlogs;
  const ConfigurationUploadLogsProperties = createSelector(
    selectConfigurationUplodLogsState,
    (configurationuploadlogs) => ({
      configuplog: configurationuploadlogs.configurationuploadlogs,
      loading: configurationuploadlogs.loading,
      totalPage: configurationuploadlogs.totalPages,
      totalCount: configurationuploadlogs.totalCount,
      pageSize: configurationuploadlogs.perPage,
      currentPage: configurationuploadlogs.currentPage,
    })
  );

  const { configuplog, loading, totalPage, totalCount, pageSize, currentPage } =
    useSelector(ConfigurationUploadLogsProperties);

  useEffect(() => {
    console.log("configuplog data in component:", configuplog);
  }, [configuplog]);
  const [isLoading, setLoading] = useState(loading);

  const [userList, setUserList] = useState([]);
  const [modal, setModal] = useState(false);
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
        Header: "Job ID",
        accessor: "job_id",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">{cellProps.row.original.job_id}</p>
          );
        },
      },
      {
        Header: "Uploaded Type",
        accessor: "type",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">{cellProps.row.original.type}</p>
          );
        },
      },
      {
        Header: "File Name",
        accessor: "uploaded_file",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              {cellProps.row.original.uploaded_file}
            </p>
          );
        },
      },
      {
        Header: "File Count",
        accessor: "file_count",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              {cellProps.row.original.file_count}
            </p>
          );
        },
      },
      {
        Header: "Row Count",
        accessor: "row_count",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              {cellProps.row.original.row_count}
            </p>
          );
        },
      },
      {
        Header: "Processed",
        accessor: "processed_count",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              {cellProps.row.original.processed_count}
            </p>
          );
        },
      },
      {
        Header: "Success",
        accessor: "success_count",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              {cellProps.row.original.success_count}
            </p>
          );
        },
      },
      {
        Header: "Error",
        accessor: "error_count",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              {cellProps.row.original.error_count}
            </p>
          );
        },
      },
      {
        Header: "Processed Status",
        accessor: "processedstatus",
        filterable: true,
        Cell: (cellProps) => {
          // return <Projects {...cellProps} />
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
        Header: "Processed link",
        accessor: "processed_rows_file",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              {cellProps.row.original.processed_rows_file}
            </p>
          );
        },
      },
      {
        Header: "Uploaded At",
        accessor: "updated_at",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              {cellProps.row.original.updated_at}
            </p>
          );
        },
      },
      {
        Header: "Uploaded By",
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
    ],
    []
  );

  useEffect(() => {
    if (configuplog && !configuplog.length) {
      dispatch(onGetConfigurationUploadLogs());
      setIsEdit(false);
    }
  }, [dispatch, configuplog]);

  const goToPage = (toPage) => {
    console.log("[GOTO PAGE] Trigger to page - ", toPage);
    dispatch(onGoToPage(toPage));
    dispatch(onGetConfigurationUploadLogs());
  };

  const toggle = () => {
    setModal(!modal);
  };

  const handleUserClick = (arg) => {
    const user = arg;

    setContact({
      id: user.id,
      name: user.name,
      designation: user.designation,
      email: user.email,
      tags: user.tags,
      projects: user.projects,
    });
    setIsEdit(true);

    toggle();
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

  //delete customer
  const [deleteModal, setDeleteModal] = useState(false);

  const onClickDelete = (users) => {
    setContact(users);
    setDeleteModal(true);
  };

  const handleDeleteUser = () => {
    if (contact && contact.id) {
      dispatch(onDeleteUser(contact.id));
    }
    setContact("");
    onPaginationPageChange(1);
    setDeleteModal(false);
  };

  const handleUserClicks = () => {
    setUserList("");
    setIsEdit(false);
    toggle();
  };

  const keyField = "id";

  const getTableActions = () => {
    return [];
  };
  return (
    <React.Fragment>
      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteUser}
        onCloseClick={() => setDeleteModal(false)}
      />
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs
            title="Upload Logs"
            breadcrumbItem="Configuration Upload Logs"
          />
          {isLoading ? (
            <Spinners setLoading={setLoading} />
          ) : (
            <Row>
              <Col lg="12">
                <Card>
                  <CardBody>
                    {console.log(
                      "Configuration upload logs:" + JSON.stringify(configuplog)
                    )}
                    {/* <TableContainer
                      isPagination={true}
                      columns={columns}
                      data={configuplog}
                      isGlobalFilter={true}
                      isAddUserList={true}
                      isShowingPageLength={true}
                      iscustomPageSizeOptions={true}
                      handleUserClick={handleUserClicks}
                      customPageSize={8}
                      tableClass="table align-middle table-nowrap table-hover"
                      theadClass="table-light"
                      paginationDiv="col-sm-12 col-md-7"
                      pagination="pagination pagination-rounded justify-content-end mt-4"
                    /> */}
                    <TableContainerX
                      columns={columns}
                      data={configuplog}
                      isShowTableActionButtons={true}
                      isLoading={loading}
                      isPagination={true}
                      totalCount={Number(totalCount)}
                      pageSize={Number(pageSize)}
                      currentPage={Number(currentPage)}
                      totalPage={Number(totalPage)}
                      isGlobalFilter={true}
                      isShowingPageLength={true}
                      tableActions={getTableActions()}
                      handleUserClick={handleUserClicks}
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

export default withRouter(ConfigurationUploadLogs);
