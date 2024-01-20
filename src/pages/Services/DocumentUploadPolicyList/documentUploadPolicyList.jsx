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
  Name,
  Code,
  PolicyStart,
  PolicyUpload,
  Status,
  Financial,
  Remark,
  Initiated,
  Approved,
  CreatedAt,
  CreatedBy,
} from "./documentUploadPolicyListCol";

//Import Breadcrumb
import Breadcrumbs from "/src/components/Common/Breadcrumb";

// import {
//   getUsers as onGetUsers,
//   addNewUser as onAddNewUser,
//   updateUser as onUpdateUser,
//   deleteUser as onDeleteUser,
// } from "/src/store/users/actions";

// import { getdocumentUploadpolicy as onGetDocumentUploadPolicy } from "src/store/documentuploadpolicy/actions";
import { getdocumentUploadpolicy as onGetDocumentUploadPolicy } from "../../../store/documentuploadpolicy/actions";
//redux
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { ToastContainer } from "react-toastify";
import AddNewDocumentUploadPolicy from "./AddNewDocumentUploadPolicyList";
import UploadDocument from "./UploadDocument";
import TableContainerX from "../../../components/Common/TableContainerX";

const DocumentUploadPolicyList = (props) => {
  //meta title
  document.title = "Document Upload Policy List | VDigital";

  const dispatch = useDispatch();

  const selectDocumentPolicyState = (state) => state.documentUploadPolicy;
  const DocumentUploadProperties = createSelector(
    selectDocumentPolicyState,
    (documentUploadPolicy) => ({
      docupload: documentUploadPolicy.documentUploadPolicy,
      loading: documentUploadPolicy.loading,
      totalPage: documentUploadPolicy.totalPages,
      totalCount: documentUploadPolicy.totalCount,
      pageSize: documentUploadPolicy.perPage,
      currentPage: documentUploadPolicy.currentPage,
    })
  );

  const { docupload, loading, totalPage,
    totalCount,
    pageSize,
    currentPage } = useSelector(DocumentUploadProperties);

  useEffect(() => {
    console.log("Doc Upload data in component:", docupload);
  }, [docupload]);
  const [isLoading, setLoading] = useState(loading);

  const [userList, setUserList] = useState([]);
  const [showAddNewDocumentUploadPolicyList, setShowAddNewDocumentUploadPolicyList] = useState(false);
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
            <>
              <h5 className="font-size-14 mb-1">
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
        Header: "Policy Start Date",
        accessor: "policystartdate",
        filterable: true,
        Cell: (cellProps) => {
          return <PolicyStart {...cellProps} />;
        },
      },
      {
        Header: "Policy Upload Date",
        accessor: "policyuploaddate",
        filterable: true,
        Cell: (cellProps) => {
          return <PolicyUpload {...cellProps} />;
        },
      },
      {
        Header: "Initiated By",
        accessor: "initiatedby",
        filterable: true,
        Cell: (cellProps) => {
          return <Initiated {...cellProps} />;
        },
      },
      {
        Header: "Approved By",
        accessor: "approvedby",
        filterable: true,
        Cell: (cellProps) => {
          return <Approved {...cellProps} />;
        },
      },
      {
        Header: "Financial Year",
        accessor: "financialyear",
        filterable: true,
        Cell: (cellProps) => {
          return <Financial {...cellProps} />;
        },
      },
      {
        Header: "Remark",
        accessor: "remark",
        filterable: true,
        Cell: (cellProps) => {
          return <Remark {...cellProps} />;
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
        Header: "Created At",
        accessor: "createdat",
        filterable: true,
        Cell: (cellProps) => {
          return <CreatedAt {...cellProps} />;
        },
      },
      {
        Header: "Created By",
        accessor: "createdby",
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
    if (docupload && !docupload.length) {
      dispatch(onGetDocumentUploadPolicy());
      setIsEdit(false);
    }
  }, [dispatch, docupload]);

  const goToPage = (toPage) => {
    console.log("[GOTO PAGE] Trigger to page - ", toPage);
    dispatch(onGoToPage(toPage));
    dispatch(onGetDocumentUploadPolicy());
  };

  const toggle = () => {
    setShowAddNewDocumentUploadPolicyList(!showAddNewDocumentUploadPolicyList);
  };

  const keyField = "id";

  const getTableActions = () => {
    return [
      {
        name: "Create",
        action: setShowAddNewDocumentUploadPolicyList,
        type: "normal",
        icon: "create"
      },
    ];
  };

  return (
    <React.Fragment>
      <AddNewDocumentUploadPolicy isOpen={showAddNewDocumentUploadPolicyList} toggle={toggle} />
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs
            title="Services"
            breadcrumbItem="Document Upload Policy List"
          />
          {isLoading ? (
            <Spinners setLoading={setLoading} />
          ) : (
            <Row>
              <Col lg="12">
                <Card>
                  <CardBody>
                    {console.log(
                      "DocUploadPolicy:" + JSON.stringify(docupload)
                    )}
                    {/* <TableContainer
                      isPagination={true}
                      columns={columns}
                      data={docupload}
                      isGlobalFilter={true}
                      isShowTableActionButtons={true}
                      isShowingPageLength={true}
                      tableActions={getTableActions()}
                      handleAddNewDocumentUploadPolicyList={() => setShowAddNewDocumentUploadPolicyList(true)}
                      customPageSize={8}
                      tableClass="table align-middle table-nowrap table-hover"
                      theadClass="table-light"
                      paginationDiv="col-sm-12 col-md-7"
                      pagination="pagination pagination-rounded justify-content-end mt-4"
                    /> */}
                    <TableContainerX
                      columns={columns}
                      data={docupload}
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
                      handleAddNewDocumentUploadPolicyList={() => setShowAddNewDocumentUploadPolicyList(true)}
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
    </React.Fragment >
  );
};

export default withRouter(DocumentUploadPolicyList);
