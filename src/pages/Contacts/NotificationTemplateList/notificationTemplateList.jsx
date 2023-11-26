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
    Row, UncontrolledTooltip
} from "reactstrap";
import Breadcrumbs from "/src/components/Common/Breadcrumb";
import DeleteModal from "/src/components/Common/DeleteModal";
import { getNotificationTemplate as onGetNotificationTemplate } from "/src/store/actions";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { ToastContainer } from "react-toastify";

const NotificationTemplateList = (props) => {
    //meta title
    document.title = "Notification Template List | VDigital";

    const dispatch = useDispatch();

    const selectNotificationTemplateState = (state) => state.notificationTemplate;
    const notificationTemplateProperties = createSelector(
        selectNotificationTemplateState,
        (notificationTemplate) => ({
            noTemplate: notificationTemplate.notificationTemplate,
            loading: notificationTemplate.loading,
        })
    );

    const { noTemplate, loading } = useSelector(notificationTemplateProperties);

    useEffect(() => {
        console.log("Notificaiton Template data in component:", noTemplate);
    }, [noTemplate]);


    const [isLoading, setLoading] = useState(loading);


    const [userList, setUserList] = useState([]);
    const [modal, setModal] = useState(false);
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
                Header: "Name",
                accessor: "msg_head",
                filterable: true,
                Cell: (cellProps) => {
                    return (
                        <>
                            <h5 className="font-size-14 mb-1">
                                <Link className="text-dark" to="#">
                                    {cellProps.row.original.msg_head}
                                </Link>
                            </h5>
                        </>
                    );
                },
            },
            {
                Header: "Content",
                accessor: "msg_content",
                filterable: true,
                Cell: (cellProps) => {
                    return (
                        <p className="text-muted mb-0">{cellProps.row.original.msg_content}</p>
                    );
                },
            },
            {
                Header: "Type",
                accessor: "msg_type_lbl",
                filterable: true,
                Cell: (cellProps) => {
                    return (
                        <p className="text-muted mb-0">{cellProps.row.original.msg_type_lbl}</p>
                    );
                },
            },
            {
                Header: "Font Size",
                accessor: "msg_fontsize",
                filterable: true,
                Cell: (cellProps) => {
                    return (
                        <p className="text-muted mb-0">{cellProps.row.original.msg_fontsize}</p>
                    );
                },
            },
            {
                Header: "Font Color",
                accessor: "msg_fontcolor",
                filterable: true,
                Cell: (cellProps) => {
                    return (
                        <p className="text-muted mb-0">{cellProps.row.original.msg_fontcolor}</p>
                    );
                },
            },
            {
                Header: "Font Background",
                accessor: "msg_fontbackgroundcolor",
                filterable: true,
                Cell: (cellProps) => {
                    return (
                        <p className="text-muted mb-0">{cellProps.row.original.msg_fontbackgroundcolor}</p>
                    );
                },
            },
            {
                Header: "Font Family",
                accessor: "msg_fontfamily",
                filterable: true,
                Cell: (cellProps) => {
                    return (
                        <p className="text-muted mb-0">{cellProps.row.original.msg_fontfamily}</p>
                    );
                },
            },
            {
                Header: "status",
                accessor: "status",
                filterable: true,
                Cell: (cellProps) => {
                    return (
                        <p className="text-muted mb-0">{cellProps.row.original.status}</p>
                    );
                },
            },
            {
                Header: "Created At",
                accessor: "created_at_lbl",
                filterable: true,
                Cell: (cellProps) => {
                    return (
                        <p className="text-muted mb-0">{cellProps.row.original.created_at_lbl}</p>
                    );
                },
            },
            {
                Header: "Created By",
                accessor: "created_by_lbl",
                filterable: true,
                Cell: (cellProps) => {
                    return (
                        <p className="text-muted mb-0">{cellProps.row.original.created_by_lbl}</p>
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
        if (noTemplate && !noTemplate.length) {
            dispatch(onGetNotificationTemplate());
            setIsEdit(false);
        }
    }, [dispatch, noTemplate]);

    // useEffect(() => {
    //   setContact(notificationTemplate);
    //   setIsEdit(false);
    // }, [notificationTemplate]);
    // useEffect(() => {
    //   if (!isEmpty(users) && !!isEdit) {
    //     setContact(users);
    //     setIsEdit(false);
    //   }
    // }, [users]);
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
        if (node &&
            node.current &&
            node.current.props &&
            node.current.props.pagination &&
            node.current.props.pagination.options) {
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
            <DeleteModal
                show={deleteModal}
                onDeleteClick={handleDeleteUser}
                onCloseClick={() => setDeleteModal(false)} />
            <div className="page-content">
                <Container fluid>
                    {/* Render Breadcrumbs */}
                    <Breadcrumbs
                        title="Access"
                        breadcrumbItem="Notification Template List" />
                    {isLoading ? (
                        <Spinners setLoading={setLoading} />
                    ) : (
                        <Row>
                            <Col lg="12">
                                <Card>
                                    <CardBody>
                                        {console.log("template:" + JSON.stringify(noTemplate))}
                                        <TableContainer
                                            isPagination={true}
                                            columns={columns}
                                            data={noTemplate}
                                            isGlobalFilter={true}
                                            isAddUserList={true}
                                            isShowingPageLength={true}
                                            // iscustomPageSizeOptions={true}
                                            handleUserClick={handleUserClicks}
                                            customPageSize={50}
                                            tableClass="table align-middle table-nowrap table-hover"
                                            theadClass="table-light"
                                            paginationDiv="col-sm-12 col-md-7"
                                            pagination="pagination pagination-rounded justify-content-end mt-4" />
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
        </React.Fragment>
    );
};

export default withRouter(NotificationTemplateList);

