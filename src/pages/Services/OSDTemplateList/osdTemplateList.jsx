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
  DropdownMenu,
  DropdownItem,
  Toast,
  ToastHeader,
  ToastBody,

  UncontrolledTooltip,
  Input,
  Form,
} from "reactstrap";
import * as Yup from "yup";
import { useFormik } from "formik";

import { Email, Tags, Projects } from "./osdTemplateListCol";

//Import Breadcrumb
import Breadcrumbs from "/src/components/Common/Breadcrumb";
import DeleteModal from "/src/components/Common/DeleteModal";

import { getOSDTemplate as onGetOSDTemplate } from "/src/store/OSDTemplate/actions";

import { isEmpty } from "lodash";

//redux
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { ToastContainer } from "react-toastify";
import AddNewOSDTemplate from './AddOSDTemplateList';
import ViewOSDTemplateList from './ViewOSDTemplateList';


const OSDTemplateList = (props) => {
  //meta title
  document.title = "OSD Template List | VDigital";

  const dispatch = useDispatch();

  const [toast, setToast] = useState(false);

  const selectOSDTemplateState = (state) => state.osdTemplate;
  const osdTemplateProperties = createSelector(
    selectOSDTemplateState,
    (osdTemplate) => ({
      osdTemp: osdTemplate.osdTemplate,
      loading: osdTemplate.loading,
    })
  );

  const { osdTemp, loading } = useSelector(osdTemplateProperties);

  useEffect(() => {
    console.log("OSD Temp data in component:", osdTemp);
  }, [osdTemp]);

  const [isLoading, setLoading] = useState(loading);

  const [userList, setUserList] = useState([]);
  const [showAddOSDTemplateList, setShowAddOSDTemplateList] = useState(false);
  const [showViewOSDTemplateList, setShowViewOSDTemplateList] = useState(false);


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
        accessor: "name",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <>
              <h5 className="font-size-14 mb-1" onClick={() => {
                const userData = cellProps.row.original;
                handleViewOSDTemplateList(userData);
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
        Header: "Templates For",
        accessor: "template_for_lbl",
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              {cellProps.row.original.template_for_lbl}
            </p>
          );
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
        Header: "Opeartor Count",
        accessor: "operator_count",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              {cellProps.row.original.operator_count}
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
    if (osdTemp && !osdTemp.length) {
      dispatch(onGetOSDTemplate());
      setIsEdit(false);
    }
  }, [dispatch, osdTemp]);

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
    setShowAddOSDTemplateList(!showAddOSDTemplateList);
  };

  const [viewOSDTemplateList, setViewOSDTemplateList] = useState({});

  const handleViewOSDTemplateList = (userOSDTemplateData) => {
    setShowViewOSDTemplateList(!showViewOSDTemplateList);
    setViewOSDTemplateList(userOSDTemplateData);
    // toggle();
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

  const toggleToast = () => {
    // console.log("button clicked");
    setToast(!toast);
  };


  const keyField = "id";

  const getTableActions = () => {
    return [
      {
        name: "Create",
        action: setShowAddOSDTemplateList,
        type: "normal",
        icon: "create"
      },
      {
        name: "Bulk Assign to Operator",
        action: toggleToast,
        type: "dropdown",
        dropdownName: "Actions",
        // onClick={toggleToast}
      },
      {
        name: "Bulk Removel from Operator",
        action: toggleToast,
        type: "dropdown",
        dropdownName: "Actions",
      },
    ];
  };



  return (
    <React.Fragment>
      <ViewOSDTemplateList isOpen={showViewOSDTemplateList}
        toggle={handleViewOSDTemplateList}
        osdTemplate={viewOSDTemplateList} />
      <AddNewOSDTemplate isOpen={showAddOSDTemplateList} toggle={toggle} />

      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Services" breadcrumbItem="OSD Template List" />
          {isLoading ? (
            <Spinners setLoading={setLoading} />
          ) : (
            <Row>
              <Col lg="12">
                <Card>
                  <CardBody>
                    <div className="d-flex align-items-center justify-content-between">
                      <div
                        className="position-fixed top-0 end-0 p-3"
                        style={{ zIndex: "1005" }}
                      >
                        <Toast isOpen={toast}>
                          <ToastHeader toggle={toggleToast}>
                            Warning
                          </ToastHeader>
                          <ToastBody>
                            Please selcet atleast one osd template.
                          </ToastBody>
                        </Toast>
                      </div>
                    </div>
                  </CardBody>

                  <CardBody>
                    {console.log("OSDTemp:" + JSON.stringify(osdTemp))}
                    <TableContainer
                      isPagination={true}
                      columns={columns}
                      isGlobalFilter={true}
                      data={osdTemp}
                      isShowTableActionButtons={true}
                      isShowingPageLength={true}
                      tableActions={getTableActions()}
                      handleAddOSDTemplateList={() => setShowAddOSDTemplateList(true)}
                      handleUserClick={handleUserClicks}
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
    </React.Fragment>
  );
};

export default withRouter(OSDTemplateList);
