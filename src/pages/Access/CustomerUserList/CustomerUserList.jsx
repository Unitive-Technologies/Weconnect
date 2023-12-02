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

import { Email, Tags, Projects } from "./customerUserlistCol";

//Import Breadcrumb
import Breadcrumbs from "/src/components/Common/Breadcrumb";
import DeleteModal from "/src/components/Common/DeleteModal";

import { getCustomerUsers as onGetCustomerUsers } from "/src/store/actions";

import { isEmpty } from "lodash";

//redux
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { ToastContainer } from "react-toastify";
import ViewCustomerUserModal from "./ViewCustomerListModal";
import BulkInactiveCustomerList from "./BulkInactiveCustomerList";

const CustomerUserList = (props) => {
  //meta title
  document.title = "Customer User List | VDigital";
  const [modal, setModal] = useState(false);
  const [modal1, setModal1] = useState(false);
  const dispatch = useDispatch();

  const selectCustomerUsersState = (state) => state.customerUsers;
  const customerUsersProperties = createSelector(
    selectCustomerUsersState,
    (customerUsers) => ({
      cusUsers: customerUsers.customerUsers,
      loading: customerUsers.loading,
    })
  );

  const { cusUsers, loading } = useSelector(customerUsersProperties);

  useEffect(() => {
    console.log("Customer Users data in component:", cusUsers);
  }, [cusUsers]);

  const [isLoading, setLoading] = useState(loading);

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
              <h5
                className="font-size-14 mb-1"
                onClick={() => {
                  const userData = cellProps.row.original;
                  toggleViewModal(userData);
                }}
              >
                <Link className="text-dark" to="#">
                  {cellProps.row.original.name}
                </Link>
              </h5>
            </>
          );
        },
      },
      {
        Header: "Login ID",
        accessor: "login_id",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">{cellProps.row.original.login_id}</p>
          );
        },
      },
      {
        Header: "Mobile",
        accessor: "mobile_no",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              {cellProps.row.original.mobile_no}
            </p>
          );
        },
      },
      {
        Header: "Email ID",
        accessor: "email",
        filterable: true,
        Cell: (cellProps) => {
          return <Email {...cellProps} />;
        },
      },
      {
        Header: "Status",
        accessor: "status",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <h5 className="font-size-14 mb-1">
              <Link className="text-dark" to="#">
                {cellProps.row.original.status === 1
                  ? "Active"
                  : cellProps.row.original.status === 0
                  ? "In-Active"
                  : "Blocked"}
              </Link>
            </h5>
          );
        },
      },
      {
        Header: "LCO",
        accessor: "lco", //"operator_lbl",
        filterable: true,
        Cell: (cellProps) => {
          // {
          //   console.log("lco:" + JSON.stringify(cellProps.row.original));
          // }
          // {
          //   console.log("lco2:" + JSON.stringify(cellProps.row.original.lco));
          // }
          return (
            <p className="text-muted mb-0">{cellProps.row.original.lco}</p>
          );
        },
      },
      {
        Header: "LCO Code",
        accessor: "lco_code",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">{cellProps.row.original.lco_code}</p>
          );
        },
      },
      {
        Header: "LAST LOGIN TIME",
        accessor: "last_login_at",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="font-size-14 mb-1">
              <Link className="text-dark" to="#">
                {cellProps.row.original.last_login_at === null
                  ? "Never Logged In"
                  : cellProps.row.original.last_login_at}
              </Link>
            </p>
          );
        },
      },
      {
        Header: "Created At",
        accessor: "created_at",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              {cellProps.row.original.created_at}
            </p>
          );
        },
      },
      {
        Header: "Created By",
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
      // {
      //   Header: "Action",
      //   Cell: (cellProps) => {
      //     return (
      //       <div className="d-flex gap-3">
      //         <Link
      //           to="#"
      //           className="text-success"
      //           onClick={() => {
      //             const userData = cellProps.row.original;
      //             // handleUserClick(userData);
      //           }}
      //         >
      //           <i className="mdi mdi-pencil font-size-18" id="edittooltip" />
      //           <UncontrolledTooltip placement="top" target="edittooltip">
      //             Edit
      //           </UncontrolledTooltip>
      //         </Link>
      //         <Link
      //           to="#"
      //           className="text-danger"
      //           onClick={() => {
      //             const userData = cellProps.row.original;
      //             // onClickDelete(userData);
      //           }}
      //         >
      //           <i className="mdi mdi-delete font-size-18" id="deletetooltip" />
      //           <UncontrolledTooltip placement="top" target="deletetooltip">
      //             Delete
      //           </UncontrolledTooltip>
      //         </Link>
      //       </div>
      //     );
      //   },
      // },
    ],
    []
  );

  useEffect(() => {
    if (cusUsers && !cusUsers.length) {
      dispatch(onGetCustomerUsers());
      setIsEdit(false);
    }
  }, [dispatch, cusUsers]);

  // useEffect(() => {
  //   setContact(cusUsers);
  //   setIsEdit(false);
  // }, [cusUsers]);

  // useEffect(() => {
  //   if (!isEmpty(cusUsers) && !!isEdit) {
  //     setContact(cusUsers);
  //     setIsEdit(false);
  //   }
  // }, [cusUsers]);

  const toggle = () => {
    setModal(!modal);
  };

  const toggle1 = () => {
    setModal1(!modal1);
  };
  const [viewUser, setViewUser] = useState({});
  // const toggleViewModal = () => setModal(modal);
  // const handleUserClick = (arg) => {
  const toggleViewModal = (userData) => {
    setModal(!modal);
    setViewUser(userData);
    // toggle();
  };

  const [filteredUsers, setFilteredUsers] = useState([]);
  useEffect(() => {
    // Filter users based on status values "Bulk" and "Inactive"
    const filteredData = cusUsers.filter(
      (user) => user.status_lbl === "Bulk" || user.status_lbl === "Inactive"
    );

    // Update the filteredUsers state
    setFilteredUsers(filteredData);
  }, [cusUsers]);
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
      <ViewCustomerUserModal
        isOpen={modal}
        toggle={toggleViewModal}
        user={viewUser}
      />
      <BulkInactiveCustomerList
        isOpen={modal1}
        toggle={toggle1}
        user={filteredUsers}
      />
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Access" breadcrumbItem="Customer User List" />
          {/* {isLoading ? (
            <Spinners setLoading={setLoading} />
          ) : ( */}
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <div className="d-flex align-items-center justify-content-between">
                    <h5 className="mb-0 card-title flex-grow-1">
                      {/* Jobs Lists */}
                    </h5>
                    {/* <form className="app-search d-none d-lg-block">
                        <div className="position-relative">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Search..."
                          />
                          <span className="bx bx-search-alt" />
                        </div>
                      </form> */}
                    <div className="flex-shrink-0">
                      <UncontrolledDropdown className="dropdown d-inline-block me-1">
                        <DropdownToggle
                          type="menu"
                          className="btn btn-success"
                          id="dropdownMenuButton1"
                        >
                          Action &nbsp;
                          <i className="mdi mdi-dots-vertical"></i>
                        </DropdownToggle>
                        <DropdownMenu>
                          <li onClick={() => setModal1(true)}>
                            <DropdownItem href="#">
                              Bulk Active/Inactive User
                            </DropdownItem>
                          </li>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </div>
                  </div>
                </CardBody>
                <CardBody>
                  {console.log("Customer users:" + JSON.stringify(cusUsers))}
                  <TableContainer
                    isPagination={true}
                    columns={columns}
                    data={cusUsers}
                    isGlobalFilter={true}
                    // isAddUserList={true}
                    isShowingPageLength={true}
                    // iscustomPageSizeOptions={true}
                    handleUserClick={() => {}}
                    customPageSize={50}
                    tableClass="table align-middle table-nowrap table-hover"
                    theadClass="table-light"
                    paginationDiv="col-sm-12 col-md-7"
                    pagination="pagination pagination-rounded justify-content-end mt-4"
                  />
                  {/* <Modal isOpen={modal} toggle={toggle}>
                      <ModalHeader toggle={toggle} tag="h4">
                        {!!isEdit ? "Edit User" : "Add User"}
                      </ModalHeader>
                      <ModalBody>
                        <Form
                          onSubmit={(e) => {
                            e.preventDefault();
                            validation.handleSubmit();
                            return false;
                          }}
                        >
                          <Row>
                            <Col xs={12}>
                              <div className="mb-3">
                                <Label className="form-label">Name</Label>
                                <Input
                                  name="name"
                                  type="text"
                                  placeholder="Insert Name"
                                  onChange={validation.handleChange}
                                  onBlur={validation.handleBlur}
                                  value={validation.values.name || ""}
                                  invalid={
                                    validation.touched.name &&
                                      validation.errors.name
                                      ? true
                                      : false
                                  }
                                />
                                {validation.touched.name &&
                                  validation.errors.name ? (
                                  <FormFeedback type="invalid">
                                    {validation.errors.name}
                                  </FormFeedback>
                                ) : null}
                              </div>
                              <div className="mb-3">
                                <Label className="form-label">
                                  Designation
                                </Label>
                                <Input
                                  name="designation"
                                  label="Designation"
                                  placeholder="Insert Designation"
                                  type="text"
                                  onChange={validation.handleChange}
                                  onBlur={validation.handleBlur}
                                  value={validation.values.designation || ""}
                                  invalid={
                                    validation.touched.designation &&
                                      validation.errors.designation
                                      ? true
                                      : false
                                  }
                                />
                                {validation.touched.designation &&
                                  validation.errors.designation ? (
                                  <FormFeedback type="invalid">
                                    {validation.errors.designation}
                                  </FormFeedback>
                                ) : null}
                              </div>
                              <div className="mb-3">
                                <Label className="form-label">Email</Label>
                                <Input
                                  name="email"
                                  label="Email"
                                  type="email"
                                  placeholder="Insert Email"
                                  onChange={validation.handleChange}
                                  onBlur={validation.handleBlur}
                                  value={validation.values.email || ""}
                                  invalid={
                                    validation.touched.email &&
                                      validation.errors.email
                                      ? true
                                      : false
                                  }
                                />
                                {validation.touched.email &&
                                  validation.errors.email ? (
                                  <FormFeedback type="invalid">
                                    {validation.errors.email}
                                  </FormFeedback>
                                ) : null}
                              </div>
                              <div className="mb-3">
                                <Label className="form-label">Option</Label>
                                <Input
                                  type="select"
                                  name="tags"
                                  className="form-select"
                                  multiple={true}
                                  onChange={validation.handleChange}
                                  onBlur={validation.handleBlur}
                                  value={validation.values.tags || []}
                                  invalid={
                                    validation.touched.tags &&
                                      validation.errors.tags
                                      ? true
                                      : false
                                  }
                                >
                                  <option>Photoshop</option>
                                  <option>illustrator</option>
                                  <option>Html</option>
                                  <option>Php</option>
                                  <option>Java</option>
                                  <option>Python</option>
                                  <option>UI/UX Designer</option>
                                  <option>Ruby</option>
                                  <option>Css</option>
                                </Input>
                                {validation.touched.tags &&
                                  validation.errors.tags ? (
                                  <FormFeedback type="invalid">
                                    {validation.errors.tags}
                                  </FormFeedback>
                                ) : null}
                              </div>
                              <div className="mb-3">
                                <Label className="form-label">Projects</Label>
                                <Input
                                  name="projects"
                                  label="Projects"
                                  type="text"
                                  placeholder="Insert Projects"
                                  onChange={validation.handleChange}
                                  onBlur={validation.handleBlur}
                                  value={validation.values.projects || ""}
                                  invalid={
                                    validation.touched.projects &&
                                      validation.errors.projects
                                      ? true
                                      : false
                                  }
                                />
                                {validation.touched.projects &&
                                  validation.errors.projects ? (
                                  <FormFeedback type="invalid">
                                    {validation.errors.projects}
                                  </FormFeedback>
                                ) : null}
                              </div>
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <div className="text-end">
                                <button
                                  type="submit"
                                  className="btn btn-success save-user"
                                >
                                  Save
                                </button>
                              </div>
                            </Col>
                          </Row>
                        </Form>
                      </ModalBody>
                    </Modal> */}
                </CardBody>
              </Card>
            </Col>
          </Row>
          {/* )} */}
        </Container>
      </div>
      <ToastContainer />
    </React.Fragment>
  );
};

export default withRouter(CustomerUserList);
