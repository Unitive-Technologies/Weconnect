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
  Modal,
  ModalHeader,
  ModalBody,
  Label,
  FormFeedback,
  UncontrolledTooltip,
  Input,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Form,
} from "reactstrap";
import * as Yup from "yup";
import { useFormik } from "formik";

import {
  Name,
  Description,
  Code,
  CreatedAt,
  CreatedBy,
  Status,
} from "./genreListCol";

//Import Breadcrumb
import Breadcrumbs from "/src/components/Common/Breadcrumb";
import DeleteModal from "/src/components/Common/DeleteModal";

import { getGenreList as onGetGenreList, getGenreListStatus as onGetGenreListStatus } from "/src/store/genre/actions";
import { isEmpty } from "lodash";

//redux
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { ToastContainer } from "react-toastify";
import AddNewGenreList from './AddNewGenreList'
import UploadGenreList from './UploadGenreList'
import ViewGenreList from './ViewGenreList'

const GenreList = (props) => {
  //meta title
  document.title = "Genre List | VDigital";

  const dispatch = useDispatch();

  const selectGenreState = (state) => state.genreList;
  const GenreProperties = createSelector(selectGenreState, (Genre) => ({
    genrelist: Genre.genreList,
    genrelistStatus: Genre.genreListStatus,
    loading: Genre.loading,
  }));

  const { genrelist, genrelistStatus, loading } = useSelector(GenreProperties);

  useEffect(() => {
    console.log("GenreList data in component:", genrelist);
  }, [genrelist]);
  const [isLoading, setLoading] = useState(loading);

  const [userList, setUserList] = useState([]);
  const [showAddNewGenreList, setShowAddNewGenreList] = useState(false);
  const [showUploadGenreList, setShowUploadGenreList] = useState(false);
  const [showViewGenreList, setShowGenreList] = useState(false);

  const [isEdit, setIsEdit] = useState(false);

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
            <h5 className="font-size-14 mb-1" onClick={() => {
              const userData = cellProps.row.original;
              handleViewGenreList(userData);
            }}>
              <Link className="text-dark" to="#">
                {cellProps.row.original.name}
              </Link>
            </h5>
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
        accessor: "status",
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
    if (genrelist && !genrelist.length) {
      dispatch(onGetGenreList());
      dispatch(onGetGenreListStatus());
      setIsEdit(false);
    }
  }, [dispatch, genrelist]);

  const handleAddGenreList = () => {
    setShowAddNewGenreList(!showAddNewGenreList);
  };

  const toggle1 = () => {
    setShowUploadGenreList(!showUploadGenreList);
  };

  const [viewGenreList, setViewGenreList] = useState({});

  const handleViewGenreList = (userGenreData) => {
    setShowGenreList(!showViewGenreList);
    setViewGenreList(userGenreData);
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
        action: setShowAddNewGenreList,
        type: "normal",
        icon: "create"
      },
      {
        name: "Upload",
        action: setShowUploadGenreList,
        type: "normal",
        icon: "upload",
      },

    ];
  };

  return (
    <React.Fragment>
      <ViewGenreList
        isOpen={showViewGenreList}
        handleViewGenreList={handleViewGenreList}
        genre={viewGenreList}
        genrelist={genrelist} />
      <AddNewGenreList isOpen={showAddNewGenreList} handleAddGenreList={handleAddGenreList} genreListStatus={genrelistStatus} />
      <UploadGenreList isOpen={showUploadGenreList} toggle={toggle1} />

      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Services" breadcrumbItem="Genre List" />
          {isLoading ? (
            <Spinners setLoading={setLoading} />
          ) : (
            <Row>
              <Col lg="12">
                <Card>
                  <CardBody>
                    {console.log("Genre List:" + JSON.stringify(genrelist))}
                    <TableContainer
                      isPagination={true}
                      columns={columns}
                      data={genrelist}
                      isGlobalFilter={true}
                      isShowTableActionButtons={true}
                      isShowingPageLength={true}
                      tableActions={getTableActions()}
                      handleAddNewGenreList={() => setShowAddNewGenreList(true)}
                      handleUploadGenreList={() => setShowUploadGenreList(true)}
                      handleRowClick={(row) => {
                        handleViewGenreList(row);
                      }}
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

export default withRouter(GenreList);
