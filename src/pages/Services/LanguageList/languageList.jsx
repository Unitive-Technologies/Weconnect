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

import { goToPage as onGoToPage, getlanguageList as onGetLanguageList, getLanguageListStatus as onGetLanguageListStatus } from "/src/store/language/actions";

//redux
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { ToastContainer } from "react-toastify";
import AddNewLanguageList from './AddNewLanguageList'
import UploadLanguageList from './UploadLanguageList'
import ViewLanguageList from './ViewLanguageList'
import TableContainerX from "../../../components/Common/TableContainerX";

import {
  Description,
  Name,
  Code,
  Status,
  CreatedAt,
  CreatedBy,
} from "./languageListCol";

const LanguageList = (props) => {
  //meta title
  document.title = "Language List | VDigital";

  const dispatch = useDispatch();
  const selectLanguageState = (state) => state.languageList;

  const LanguageProperties = createSelector(
    selectLanguageState,
    (languageList) => ({
      langlist: languageList.languageList,
      langlistStatus: languageList.languageListStatus,
      loading: languageList.loading,
      totalPage: languageList.totalPages,
      totalCount: languageList.totalCount,
      pageSize: languageList.perPage,
      currentPage: languageList.currentPage,
    })
  );

  const { langlist, loading, langlistStatus, totalPage,
    totalCount,
    pageSize,
    currentPage } = useSelector(LanguageProperties);

  useEffect(() => {
    console.log("Language List data in component:", langlist);
  }, [langlist]);
  const [isLoading, setLoading] = useState(loading);

  const [userList, setUserList] = useState([]);
  const [showAddNewLanguageList, setShowAddNewLanguageList] = useState(false);
  const [showUploadLanguageList, setShowUploadLanguageList] = useState(false);
  const [showViewLanguageList, setShowLanguageList] = useState(false);


  const [isEdit, setIsEdit] = useState(false);

  const columns = useMemo(
    () => [
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
              <h5 className="font-size-14 mb-1" onClick={() => {
                const userData = cellProps.row.original;
                handleViewLanguageList(userData);
              }}>
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
        Header: "Description",
        accessor: "description",
        filterable: true,
        Cell: (cellProps) => {
          return <Description {...cellProps} />;
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
    if (langlist && !langlist.length) {
      dispatch(onGetLanguageList());
      dispatch(onGetLanguageListStatus());
      setIsEdit(false);
    }
  }, [dispatch, langlist]);

  const goToPage = (toPage) => {
    console.log("[GOTO PAGE] Trigger to page - ", toPage);
    dispatch(onGoToPage(toPage));
    dispatch(onGetLanguageList());
  };

  const handleAddNewLanguage = () => {
    setShowAddNewLanguageList(!showAddNewLanguageList);
  };

  const toggle1 = () => {
    setShowUploadLanguageList(!showUploadLanguageList);
  };

  const [viewLanguageList, setViewLanguageList] = useState({});

  const handleViewLanguageList = (userLanguageData) => {
    setShowLanguageList(!showViewLanguageList);
    setViewLanguageList(userLanguageData);
    // toggle();
  };



  // const handleUserClick = (arg) => {
  //   const user = arg;

  //   setContact({
  //     id: user.id,
  //     name: user.name,
  //     designation: user.designation,
  //     email: user.email,
  //     tags: user.tags,
  //     projects: user.projects,
  //   });
  //   setIsEdit(true);

  //   toggle();
  // };

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
  // const [deleteModal, setDeleteModal] = useState(false);

  // const onClickDelete = (users) => {
  //   setContact(users);
  //   setDeleteModal(true);
  // };

  // const handleDeleteUser = () => {
  //   if (contact && contact.id) {
  //     dispatch(onDeleteUser(contact.id));
  //   }
  //   setContact("");
  //   onPaginationPageChange(1);
  //   setDeleteModal(false);
  // };

  // const handleUserClicks = () => {
  //   setUserList("");
  //   setIsEdit(false);
  //   toggle();
  // };

  const keyField = "id";

  const getTableActions = () => {
    return [
      {
        name: "Create",
        action: setShowAddNewLanguageList,
        type: "normal",
        icon: "create"
      },
      {
        name: "Upload",
        action: setShowUploadLanguageList,
        type: "normal",
        icon: "upload",
      },

    ];
  };


  return (
    <React.Fragment>
      <ViewLanguageList isOpen={showViewLanguageList}
        handleViewLanguageList={handleViewLanguageList}
        language={viewLanguageList} langlistStatus={langlistStatus} />
      <AddNewLanguageList isOpen={showAddNewLanguageList} handleAddNewLanguage={handleAddNewLanguage} langlistStatus={langlistStatus} />
      <UploadLanguageList isOpen={showUploadLanguageList} toggle={toggle1} />

      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Services" breadcrumbItem="Lanugage List" />
          {isLoading ? (
            <Spinners setLoading={setLoading} />
          ) : (
            <Row>
              <Col lg="12">
                <Card>
                  <CardBody>
                    {/* {console.log("languagelist:" + JSON.stringify(langlist))}
                    <TableContainer
                      isPagination={true}
                      columns={columns}
                      data={langlist}
                      isGlobalFilter={true}
                      isShowTableActionButtons={true}
                      isShowingPageLength={true}
                      tableActions={getTableActions()}
                      handleAddNewLanguageList={() => setShowAddNewLanguageList(true)}
                      handleUploadLanguageList={() => setShowUploadLanguageList(true)}
                      customPageSize={50}
                      handleRowClick={(userLanguageData) => {
                        handleViewLanguageList(userLanguageData);
                      }}
                      tableClass="table align-middle table-nowrap table-hover"
                      theadClass="table-light"
                      paginationDiv="col-sm-12 col-md-7"
                      pagination="pagination pagination-rounded justify-content-end mt-4"
                    /> */}
                    <TableContainerX
                      columns={columns}
                      data={langlist}
                      isLoading={loading}
                      isPagination={true}
                      totalCount={Number(totalCount)}
                      pageSize={Number(pageSize)}
                      currentPage={Number(currentPage)}
                      totalPage={Number(totalPage)}
                      isGlobalFilter={true}
                      isShowingPageLength={true}
                      tableActions={getTableActions()}
                      handleAddNewLanguageList={() => setShowAddNewLanguageList(true)}
                      handleUploadLanguageList={() => setShowUploadLanguageList(true)}
                      handleRowClick={(userLanguageData) => {
                        handleViewLanguageList(userLanguageData);
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

export default withRouter(LanguageList);
