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
  UncontrolledDropdown,
  DropdownToggle,
  UncontrolledTooltip,
  Input,
  Form,
} from "reactstrap";
import * as Yup from "yup";
import { useFormik } from "formik";

import { Email, Tags, Projects } from "./localChannelNumberListCol";

//Import Breadcrumb
import Breadcrumbs from "/src/components/Common/Breadcrumb";
import DeleteModal from "/src/components/Common/DeleteModal";

import { getLocalChannelNumber as onGetLocalChannelNumber } from "/src/store/localchannelnumber/actions";

import { isEmpty } from "lodash";

//redux
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { ToastContainer } from "react-toastify";
import UploadLocalChannelNumberList from './UploadLocalChannelNumberList'

const LocalChannelNumberList = (props) => {
  //meta title
  document.title = "Local Channel Number List | VDigital";

  const dispatch = useDispatch();

  // const selectLocalChannelNumberState = (state) => {
  //   state.localChannelNumber;
  //   console.log("lcn state in UI:" + JSON.stringify(state.localChannelNumber));
  // };

  const selectLocalChannelNumberState = (state) => state.localChannelNumber;
  const localChannelNumberProperties = createSelector(
    selectLocalChannelNumberState,
    (localChannelNo) => ({
      localNum: localChannelNo.localChannelNumber,
      loading: localChannelNo.loading,
    })
  );

  const { localNum, loading } = useSelector(localChannelNumberProperties);

  useEffect(() => {
    console.log("LCN data in component:", localNum);
  }, [localNum]);
  const [isLoading, setLoading] = useState(loading);

  const [userList, setUserList] = useState([]);
  const [modal, setModal] = useState(false);
  const [modal1, setModal1] = useState(false);

  const [isEdit, setIsEdit] = useState(false);

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
        Header: "Channel Name",
        accessor: "channelname",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              {cellProps.row.original.channelname},
            </p>
          );
        },
      },
      {
        Header: "Genre Name",
        accessor: "genrename",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              {cellProps.row.original.genrename}
            </p>
          );
        },
      },
      {
        Header: "Local Channel Number",
        accessor: "localchannelnumber",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              {cellProps.row.original.localchannelnumber}
            </p>
          );
        },
      },
      {
        Header: "Rank",
        accessor: "rank",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">{cellProps.row.original.rank}</p>
          );
        },
      },
      {
        Header: "Created At",
        accessor: "createdat",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              {cellProps.row.original.createdat}
            </p>
          );
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
    if (localNum && !localNum.length) {
      dispatch(onGetLocalChannelNumber());
      setIsEdit(false);
    }
  }, [dispatch, localNum]);

  // useEffect(() => {
  //   setContact(users);
  //   setIsEdit(false);
  // }, [users]);

  // useEffect(() => {
  //   if (!isEmpty(users) && !!isEdit) {
  //     setContact(users);
  //     setIsEdit(false);
  //   }
  // }, [users]);

  const toggle = () => {
    setModal(!modal);
  };

  const toggleUploadModal = () => {
    setModal1(!modal1);
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


  return (
    <React.Fragment>
      <UploadLocalChannelNumberList isOpen={modal1} toggleUploadModal={toggleUploadModal} />
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs
            title="Services"
            breadcrumbItem="Local Channel Number List"
          />
          {isLoading ? (
            <Spinners setLoading={setLoading} />
          ) : (
            <Row>
              <Col lg="12">
                <Card>
                  <CardBody>

                    <div className="d-flex align-items-center justify-content-between">
                      <h5 className="mb-0 card-title flex-grow-1">
                        {/* Jobs Lists */}
                      </h5>
                      <div className="flex-shrink-0">

                        <UncontrolledDropdown className="dropdown d-inline-block me-1">
                          <DropdownToggle
                            type="menu"
                            className="btn btn-success"
                            id="dropdownMenuButton1"
                            onClick={() => setModal1(true)}
                          >
                            Bulk Update LCN
                            {/* <i className="bx bx-upload"></i> */}
                          </DropdownToggle>
                        </UncontrolledDropdown>
                      </div>
                    </div>
                  </CardBody>
                  <CardBody>
                    {console.log("LCN List:" + JSON.stringify(localNum))}
                    <TableContainer
                      isPagination={true}
                      columns={columns}
                      data={localNum}
                      // isGlobalFilter={true}
                      // isShowTableActionButtons={true}
                      isShowingPageLength={true}
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

export default withRouter(LocalChannelNumberList);
