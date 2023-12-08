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
  Form,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,

} from "reactstrap";
import * as Yup from "yup";
import { useFormik } from "formik";

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
import DeleteModal from "/src/components/Common/DeleteModal";

// import {
//   getUsers as onGetUsers,
//   addNewUser as onAddNewUser,
//   updateUser as onUpdateUser,
//   deleteUser as onDeleteUser,
// } from "/src/store/users/actions";

// import { getdocumentUploadpolicy as onGetDocumentUploadPolicy } from "src/store/documentuploadpolicy/actions";
import { isEmpty } from "lodash";
import { getdocumentUploadpolicy as onGetDocumentUploadPolicy } from "../../../store/documentuploadpolicy/actions";
//redux
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { ToastContainer } from "react-toastify";
import AddNewDocumentUploadPolicy from "./AddNewDocumentUploadPolicyList";
import UploadDocument from "./UploadDocument";

const DocumentUploadPolicyList = (props) => {
  //meta title
  document.title = "Document Upload Policy List | VDigital";

  const dispatch = useDispatch();
  // const [contact, setContact] = useState();
  // validation
  // const validation = useFormik({
  //   // enableReinitialize : use this flag when initial values needs to be changed
  //   enableReinitialize: true,

  //   initialValues: {
  //     name: (contact && contact.name) || "",
  //     designation: (contact && contact.designation) || "",
  //     tags: (contact && contact.tags) || "",
  //     email: (contact && contact.email) || "",
  //     projects: (contact && contact.projects) || "",
  //   },
  //   validationSchema: Yup.object({
  //     name: Yup.string().required("Please Enter Your Name"),
  //     designation: Yup.string().required("Please Enter Your Designation"),
  //     tags: Yup.array().required("Please Enter Tag"),
  //     email: Yup.string()
  //       .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Please Enter Valid Email")
  //       .required("Please Enter Your Email"),
  //     projects: Yup.string().required("Please Enter Your Project"),
  //   }),
  //   onSubmit: (values) => {
  //     if (isEdit) {
  //       const updateUser = {
  //         id: contact.id,
  //         name: values.name,
  //         designation: values.designation,
  //         tags: values.tags,
  //         email: values.email,
  //         projects: values.projects,
  //       };

  //       // update user
  //       dispatch(onUpdateUser(updateUser));
  //       validation.resetForm();
  //       setIsEdit(false);
  //     } else {
  //       const newUser = {
  //         id: Math.floor(Math.random() * (30 - 20)) + 20,
  //         name: values["name"],
  //         designation: values["designation"],
  //         email: values["email"],
  //         tags: values["tags"],
  //         projects: values["projects"],
  //       };
  //       // save new user
  //       dispatch(onAddNewUser(newUser));
  //       validation.resetForm();
  //     }
  //     toggle();
  //   },
  // });

  const selectDocumentPolicyState = (state) => state.documentUploadPolicy;
  const DocumentUploadProperties = createSelector(
    selectDocumentPolicyState,
    (documentUploadPolicy) => ({
      docupload: documentUploadPolicy.documentUploadPolicy,
      loading: documentUploadPolicy.loading,
    })
  );

  const { docupload, loading } = useSelector(DocumentUploadProperties);

  useEffect(() => {
    console.log("Doc Upload data in component:", docupload);
  }, [docupload]);
  const [isLoading, setLoading] = useState(loading);

  const [userList, setUserList] = useState([]);
  const [modal, setModal] = useState(false);
  const [modal1, setModal1] = useState(false);
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

  // useEffect(() => {
  //   setContact(docupload);
  //   setIsEdit(false);
  // }, [docupload]);

  // useEffect(() => {
  //   if (!isEmpty(docupload) && !!isEdit) {
  //     setContact(docupload);
  //     setIsEdit(false);
  //   }
  // }, [docupload]);

  const toggle = () => {
    setModal(!modal);
  };

  const toggle1 = () => {
    setModal1(!modal1);
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

  return (
    <React.Fragment>
      {/* <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteUser}
        onCloseClick={() => setDeleteModal(false)}
      /> */}
      <AddNewDocumentUploadPolicy isOpen={modal} toggle={toggle} />
      <UploadDocument isOpen={modal1} toggle={toggle1} />
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
                    <div className="d-flex align-items-center justify-content-between">
                      <h5 className="mb-0 card-title flex-grow-1">
                        {/* Jobs Lists */}
                      </h5>
                      <div className="flex-shrink-0">
                        <Link
                          to="#!"
                          onClick={() => setModal(true)}
                          className="btn btn-primary me-1"
                        >
                          Create
                        </Link>
                      </div>
                    </div>
                  </CardBody>
                  <CardBody>
                    {console.log(
                      "DocUploadPolicy:" + JSON.stringify(docupload)
                    )}
                    <TableContainer
                      isPagination={true}
                      columns={columns}
                      data={docupload}
                      // isGlobalFilter={true}
                      // isAddUserList={true}
                      isShowingPageLength={true}
                      // iscustomPageSizeOptions={true}
                      handleUserClick={() => { }}
                      customPageSize={8}
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
    </React.Fragment >
  );
};

export default withRouter(DocumentUploadPolicyList);
