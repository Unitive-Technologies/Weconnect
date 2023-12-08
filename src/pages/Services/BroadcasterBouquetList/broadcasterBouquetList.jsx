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
} from "reactstrap";
import * as Yup from "yup";
import { useFormik } from "formik";

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
import DeleteModal from "/src/components/Common/DeleteModal";

import { getBroadcasterBouquetList as onGetBroadcasterBouquet } from "/src/store/broadcasterbouquet/actions";
import { isEmpty } from "lodash";

//redux
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { ToastContainer } from "react-toastify";
import AddNewBroadcasterBouquetList from './AddNewBroadcasterBouquetList'

const BroadcasterBouquetList = (props) => {
  //meta title
  document.title = "Broadcaster Bouquet List | VDigital";

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
    console.log("Broadcaster Bouquet data in component:", brodcastbouquet);
  }, [brodcastbouquet]);
  const [isLoading, setLoading] = useState(loading);

  const [userList, setUserList] = useState([]);
  const [isEdit, setIsEdit] = useState(false);

  const [showAddNewBroadcasterBouquetList, setShowAddNewBroadcasterBouquetList] = useState(false);


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
          return <Channels {...cellProps} />;
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
      setIsEdit(false);
    }
  }, [dispatch, brodcastbouquet]);

  // useEffect(() => {
  //   setContact(brodcastbouquet);
  //   setIsEdit(false);
  // }, [brodcastbouquet]);

  // useEffect(() => {
  //   if (!isEmpty(brodcastbouquet) && !!isEdit) {
  //     setContact(brodcastbouquet);
  //     setIsEdit(false);
  //   }
  // }, [brodcastbouquet]);

  const toggle = () => {
    setShowAddNewBroadcasterBouquetList(!showAddNewBroadcasterBouquetList);
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
        action: setShowAddNewBroadcasterBouquetList,
        type: "normal",
        icon: "create"
      },
    ];
  };

  return (
    <React.Fragment>
      {/* <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteUser}
        onCloseClick={() => setDeleteModal(false)}
      /> */}
      <AddNewBroadcasterBouquetList isOpen={showAddNewBroadcasterBouquetList} toggle={toggle} />
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs
            title="Services"
            breadcrumbItem="Broadcaster Bouquet List"
          />
          {isLoading ? (
            <Spinners setLoading={setLoading} />
          ) : (
            <Row>
              <Col lg="12">
                <Card>
                  <CardBody>
                    {console.log(
                      "broadcasterBouquet:" + JSON.stringify(brodcastbouquet)
                    )}
                    <TableContainer
                      isPagination={true}
                      columns={columns}
                      data={brodcastbouquet}
                      isGlobalFilter={true}
                      isAddUserList={true}
                      isShowingPageLength={true}
                      tableActions={getTableActions()}
                      handleAddNewBroadcasterBouquetList={() => setShowAddNewBroadcasterBouquetList(true)}

                      customPageSize={50}
                      // sisChannel={true}
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
