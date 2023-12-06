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
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Input,
  Form,
} from "reactstrap";
import * as Yup from "yup";
import { useFormik } from "formik";

import {
  Name,
  FullName,
  Address,
  ContactPerson,
  Description,
  Mobile,
  Status,
  CreatedAt,
  CreatedBy,
  Email,
  Tags,
  Projects,
  Img,
} from "./broadcasterListCol";

//Import Breadcrumb
import Breadcrumbs from "/src/components/Common/Breadcrumb";
import DeleteModal from "/src/components/Common/DeleteModal";

import { getBroadCaster as onGetBroadCasters } from "/src/store/broadcaster/actions";
import { isEmpty } from "lodash";


//redux
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { ToastContainer } from "react-toastify";
import AddNewBroadCaster from './AddNewBroadCaster'
import UploadBroadCaster from './UploadBroadCaster'
import BulkUpdateBroadCaster from "./BulkUpdateBroadCaster";

const BroadcasterList = (props) => {
  //meta title
  document.title = "Broadcaster List | VDigital";

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

  const selectBroadCasterState = (state) => state.broadCasters;
  const BroadCasterProperties = createSelector(
    selectBroadCasterState,
    (broadCasters) => ({
      brodcast: broadCasters.broadCasters,
      loading: broadCasters.loading,
    })
  );

  const { brodcast, loading } = useSelector(BroadCasterProperties);

  useEffect(() => {
    console.log("BroadCaster data in component:", brodcast);
  }, [brodcast]);
  const [isLoading, setLoading] = useState(loading);

  const [userList, setUserList] = useState([]);
  const [modal, setModal] = useState(false);
  const [modal1, setModal1] = useState(false);
  const [modal2, setModal2] = useState(false);
  // const [modal3, setModal3] = useState(false);

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
            <h5 className="font-size-14 mb-1">
              <Link className="text-dark" to="#">
                {cellProps.row.original.name}
              </Link>
            </h5>
          );
        },
      },
      {
        Header: "Full Name",
        accessor: "fullname",
        filterable: true,
        Cell: (cellProps) => {
          return <FullName {...cellProps} />;
        },
      },
      {
        Header: "Address",
        accessor: "address",
        filterable: true,
        Cell: (cellProps) => {
          return <Address {...cellProps} />;
        },
      },
      {
        Header: "Contact Person",
        accessor: "contactperson",
        filterable: true,
        Cell: (cellProps) => {
          return <ContactPerson {...cellProps} />;
        },
      },
      {
        Header: "Mobile",
        accessor: "mobile",
        filterable: true,
        Cell: (cellProps) => {
          return <Mobile {...cellProps} />;
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
        Header: "Description",
        accessor: "description",
        filterable: true,
        Cell: (cellProps) => {
          return <Description {...cellProps} />;
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
    if (brodcast && !brodcast.length) {
      dispatch(onGetBroadCasters());
      setIsEdit(false);
    }
  }, [dispatch, brodcast]);

  // useEffect(() => {
  //   setContact(brodcast);
  //   setIsEdit(false);
  // }, [broadcast]);

  // useEffect(() => {
  //   if (!isEmpty(brodcast) && !!isEdit) {
  //     setContact(brodcast);
  //     setIsEdit(false);
  //   }
  // }, [brodcast]);

  const toggle = () => {
    setModal(!modal);
  };

  const toggle1 = () => {
    setModal1(!modal1);
  };

  const toggle2 = () => {
    setModal2(!modal2);
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
      <AddNewBroadCaster isOpen={modal} toggle={toggle} />
      <UploadBroadCaster isOpen={modal1} toggle={toggle1} />
      <BulkUpdateBroadCaster isOpen={modal2} toggle={toggle2} />

      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Services" breadcrumbItem="Broadcaster List" />
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
                        <Link
                          to="#!"
                          onClick={() => setModal(true)}
                          className="btn btn-primary me-1"
                        >
                          Create Broadcaster
                        </Link>
                        <UncontrolledDropdown className="dropdown d-inline-block me-1">
                          <DropdownToggle
                            type="menu"
                            className="btn btn-success"
                            id="dropdownMenuButton1"
                          >
                            Upload Broadcaster
                            {/* <i className="bx bx-upload"></i> */}
                          </DropdownToggle>
                          <DropdownMenu>
                            <li onClick={() => setModal1(true)}>
                              <DropdownItem href="#">Upload User</DropdownItem>
                            </li>
                            <li onClick={() => setModal2(true)}>
                              <DropdownItem href="#">
                                Bulk Update User
                              </DropdownItem>
                            </li>
                          </DropdownMenu>
                        </UncontrolledDropdown>

                        <UncontrolledDropdown className="dropdown d-inline-block me-1">

                          {/* <DropdownMenu>
                            <li onClick={() => setModal2(true)}>
                              <DropdownItem href="#">Upload User</DropdownItem>
                            </li>
                            <li onClick={() => setModal3(true)}>
                              <DropdownItem href="#">
                                Bulk Update User
                              </DropdownItem>
                            </li>
                          </DropdownMenu> */}
                        </UncontrolledDropdown>
                        {/* <UncontrolledDropdown className="dropdown d-inline-block me-1">
                          <DropdownToggle
                            type="menu"
                            className="btn btn-success"
                            id="dropdownMenuButton1"
                          >
                            Action &nbsp;
                            <i className="mdi mdi-dots-vertical"></i>
                          </DropdownToggle>
                          <DropdownMenu>
                            <li onClick={() => setModal4(true)}>
                              <DropdownItem href="#">
                                Bulk Active/Inactive User
                              </DropdownItem>
                            </li>
                            <li onClick={() => setModal5(true)}>
                              <DropdownItem href="#">
                                Bulk User Settings
                              </DropdownItem>
                            </li>
                          </DropdownMenu>
                        </UncontrolledDropdown> */}

                      </div>
                    </div>
                  </CardBody>
                  <CardBody>
                    {console.log("broadcasterlist:" + JSON.stringify(brodcast))}
                    <TableContainer
                      isPagination={true}
                      columns={columns}
                      data={brodcast}
                      isGlobalFilter={true}
                      // isAddBroadCaster={true}
                      isShowingPageLength={true}
                      // iscustomPageSizeOptions={true}
                      handleUserClick={() => { }}
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
          )}
        </Container>
      </div>
      <ToastContainer />
    </React.Fragment >
  );
};

export default withRouter(BroadcasterList);
