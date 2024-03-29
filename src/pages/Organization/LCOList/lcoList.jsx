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

import { Email, Tags, Projects } from "./lcoListCol";

//Import Breadcrumb
import Breadcrumbs from "/src/components/Common/Breadcrumb";
import DeleteModal from "/src/components/Common/DeleteModal";

import {
  goToPage as onGoToPage,
  getLco as onGetLco,
  getLcoBilledby as onGetLcoBilledby,
  getLcoStatus as onGetLcoStatus,
  getLcoStates as onGetLcoStates,
  getLcoPhase as onGetLcoPhase,
  getLcoCustomerPortal as onGetLcoCustomerPortal,
  getLcoParentDistributor as onGetLcoParentDistributor,
} from "/src/store/lcolist/actions";

import { isEmpty } from "lodash";

//redux
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { ToastContainer } from "react-toastify";
import ViewLcoModal from "./ViewLcoModal";
import AddLcoModal from "./AddLcoModal";
import BulkAddCreditModal from "./BulkAddCreditModal";
import UploadModal from "./UploadModal";
import BulkUpdateModal from "./BulkUpdateModal";
import UploadCreditModal from "./UploadCreditModal";
import SettingsModal from "./SettingsModal";
import AdjustColumns from "./AdjustColumns";
import TableContainerX from "../../../components/Common/TableContainerX";

const LCOList = (props) => {
  //meta title
  document.title = "LCO | VDigital";

  const dispatch = useDispatch();
  const [contact, setContact] = useState();

  const toggleAddCreditModal = () => {
    setShowBulkCredit(!showBulkCredit);
  };
  // validation
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      name: (contact && contact.name) || "",
      designation: (contact && contact.designation) || "",
      tags: (contact && contact.tags) || "",
      email: (contact && contact.email) || "",
      projects: (contact && contact.projects) || "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please Enter Your Name"),
      designation: Yup.string().required("Please Enter Your Designation"),
      tags: Yup.array().required("Please Enter Tag"),
      email: Yup.string()
        .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Please Enter Valid Email")
        .required("Please Enter Your Email"),
      projects: Yup.string().required("Please Enter Your Project"),
    }),
    onSubmit: (values) => {
      if (isEdit) {
        const updateUser = {
          id: contact.id,
          name: values.name,
          designation: values.designation,
          tags: values.tags,
          email: values.email,
          projects: values.projects,
        };

        // update user
        // dispatch(onUpdateUser(updateUser));
        validation.resetForm();
        setIsEdit(false);
      } else {
        const newUser = {
          id: Math.floor(Math.random() * (30 - 20)) + 20,
          name: values["name"],
          designation: values["designation"],
          email: values["email"],
          tags: values["tags"],
          projects: values["projects"],
        };
        // save new user
        // dispatch(onAddNewUser(newUser));
        validation.resetForm();
      }
      toggle();
    },
  });

  const selectLcoState = (state) => state.lco;
  const LcoProperties = createSelector(selectLcoState, (lco) => ({
    lcos: lco.lco,
    lcoBilledby: lco.lcoBilledby,
    lcoStatus: lco.lcoStatus,
    lcoPhase: lco.lcoPhase,
    lcoStates: lco.lcoStates,
    lcoCustomerPortal: lco.lcoCustomerPortal,
    lcoParentDistributor: lco.lcoParentDistributor,
    loading: lco.loading,
    totalPage: lco.totalPages,
    totalCount: lco.totalCount,
    pageSize: lco.perPage,
    currentPage: lco.currentPage,
  }));

  const {
    lcos,
    lcoBilledby,
    lcoStatus,
    lcoPhase,
    lcoStates,
    lcoCustomerPortal,
    lcoParentDistributor,
    loading,
    totalPage,
    totalCount,
    pageSize,
    currentPage,
  } = useSelector(LcoProperties);

  useEffect(() => {
    console.log("lcos data in component:", lcos);
  }, [lcos]);
  const [isLoading, setLoading] = useState(loading);

  const [modal, setModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [showLco, setShowLco] = useState(false);
  const [viewLco, setViewLco] = useState(false);
  const [showBulkCredit, setShowBulkCredit] = useState(false);
  const [showUploadLco, setShowUploadLco] = useState(false);
  const [showBulkUpdateLco, setShowBulkUpdateLco] = useState(false);
  const [showUploadCredit, setShowUploadCredit] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showAdjustColumnDownload, setShowAdjustColumnDownload] =
    useState(false);

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
              <h5
                className="font-size-14 mb-1"
                onClick={() => {
                  const lcoData = cellProps.row.original;
                  toggleViewLco(lcoData);
                }}
                style={{
                  maxWidth: 150,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
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
        Header: "Code",
        accessor: "code",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">{cellProps.row.original.code}</p>
          );
        },
      },
      {
        Header: "Distributor",
        accessor: "distributor_lbl",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p
              className="text-muted mb-0"
              style={{
                maxWidth: 100,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {cellProps.row.original.distributor_lbl}
            </p>
          );
        },
      },
      {
        Header: "Regional Office",
        accessor: "branch_lbl",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              {cellProps.row.original.branch_lbl}
            </p>
          );
        },
      },
      {
        Header: "Regional Office Code",
        accessor: "branch_code_lbl",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              {cellProps.row.original.branch_code_lbl}
            </p>
          );
        },
      },
      {
        Header: "Address",
        accessor: "addr",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p
              className="text-muted mb-0"
              style={{
                maxWidth: 100,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {cellProps.row.original.addr}
            </p>
          );
        },
      },
      {
        Header: "Contact Person",
        accessor: "contact_person",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p
              className="text-muted mb-0"
              style={{
                maxWidth: 100,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {cellProps.row.original.contact_person}
            </p>
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
        Header: "State",
        accessor: "state_lbl",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              {cellProps.row.original.state_lbl}
            </p>
          );
        },
      },
      {
        Header: "District",
        accessor: "District_lbl",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              {cellProps.row.original.district_lbl}
            </p>
          );
        },
      },
      {
        Header: "City",
        accessor: "city_lbl",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">{cellProps.row.original.city_lbl}</p>
          );
        },
      },
      {
        Header: "GST",
        accessor: "gstno",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">{cellProps.row.original.gstno}</p>
          );
        },
      },
      {
        Header: "PAN",
        accessor: "panno",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">{cellProps.row.original.panno}</p>
          );
        },
      },
      {
        Header: "Login ID",
        accessor: "username",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">{cellProps.row.original.username}</p>
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
        Header: "Balance",
        accessor: "balance",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">{cellProps.row.original.balance}</p>
          );
        },
      },
      {
        Header: "Created At",
        accessor: "created_at",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p
              className="text-muted mb-0"
              style={{
                maxWidth: 100,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
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
            <p
              className="text-muted mb-0"
              style={{
                maxWidth: 100,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {cellProps.row.original.created_by_lbl}
            </p>
          );
        },
      },
    ],
    []
  );

  useEffect(() => {
    if (lcos && !lcos.length) {
      dispatch(onGetLco());
      dispatch(onGetLcoBilledby());
      dispatch(onGetLcoCustomerPortal());
      dispatch(onGetLcoParentDistributor());
      dispatch(onGetLcoPhase());
      dispatch(onGetLcoStates());
      dispatch(onGetLcoStatus());
      setIsEdit(false);
    }
  }, [dispatch, lcos]);

  const goToPage = (toPage) => {
    console.log("[GOTO PAGE] Trigger to page - ", toPage);
    dispatch(onGoToPage(toPage));
    dispatch(onGetLco());
  };

  const toggle = () => {
    setModal(!modal);
  };

  const toggleAddLco = () => {
    setShowLco(!showLco);
  };
  const handleUploadRegionalOffice = () => {
    setShowUploadLco(!showUploadLco);
  };

  const [lcoData, setLcoData] = useState({});

  const toggleViewLco = (lco) => {
    setViewLco(!viewLco);
    setLcoData(lco);
  };

  const getTableActions = () => {
    return [
      {
        name: "Create",
        action: setShowLco,
        type: "normal",
        icon: "create",
      },
      {
        name: "Bulk Add Credit",
        action: setShowBulkCredit,
        type: "normal",
        icon: "create",
      },
      {
        name: "Upload",
        action: setShowUploadLco,
        type: "dropdown",
        dropdownName: "Upload",
      },
      {
        name: "Bulk Update",
        action: setShowBulkUpdateLco,
        type: "dropdown",
        dropdownName: "Upload",
      },
      {
        name: "Upload Credit",
        action: setShowUploadCredit,
        type: "dropdown",
        dropdownName: "Upload",
      },
      {
        name: "Settings",
        action: setShowSettings,
        type: "normal",
        icon: "upload",
      },
      {
        name: "Download",
        action: setShowAdjustColumnDownload,
        type: "normal",
        icon: "download",
      },
    ];
  };
  return (
    <React.Fragment>
      <ViewLcoModal
        isOpen={Boolean(viewLco)}
        toggleViewLco={toggleViewLco}
        lcoData={lcoData}
        setViewLco={setViewLco}
        lcoBilledby={lcoBilledby}
        lcoStatus={lcoStatus}
        lcoPhase={lcoPhase}
        lcoStates={lcoStates}
        lcoCustomerPortal={lcoCustomerPortal}
        lcoParentDistributor={lcoParentDistributor}
      />

      <AddLcoModal
        isOpen={Boolean(showLco)}
        toggleAddLco={toggleAddLco}
        lcoBilledby={lcoBilledby}
        lcoStatus={lcoStatus}
        lcoPhase={lcoPhase}
        lcoStates={lcoStates}
        lcoCustomerPortal={lcoCustomerPortal}
        lcoParentDistributor={lcoParentDistributor}
      />
      <BulkAddCreditModal
        isOpen={showBulkCredit}
        toggleAddCreditModal={toggleAddCreditModal}
        lco={lcos}
        totalCount={totalCount}
        pageSize={pageSize}
        currentPage={currentPage}
        totalPage={totalPage}
        loading={loading}
      />
      <UploadModal
        isOpen={showUploadLco}
        handleUploadLco={() => setShowUploadLco(false)}
        lcoStatus={lcoStatus}
      />
      <BulkUpdateModal
        isOpen={showBulkUpdateLco}
        handleBulkUpdateLco={() => setShowBulkUpdateLco(false)}
      />
      <UploadCreditModal
        isOpen={showUploadCredit}
        handleUploadCredit={() => setShowUploadCredit(false)}
      />
      <SettingsModal
        isOpen={showSettings}
        handleSettings={() => setShowSettings(false)}
      />
      <AdjustColumns
        isOpen={showAdjustColumnDownload}
        handleAdjustColumn={() => setShowAdjustColumnDownload(false)}
      />
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Organization" breadcrumbItem="LCO" />
          {isLoading ? (
            <Spinners setLoading={setLoading} />
          ) : (
            <Row>
              <Col lg="12">
                <Card>
                  <CardBody>
                    {/* {console.log("lcos:" + JSON.stringify(lcos))} */}

                    <TableContainerX
                      columns={columns}
                      data={lcos}
                      isLoading={loading}
                      isShowTableActionButtons={true}
                      isPagination={true}
                      totalCount={Number(totalCount)}
                      pageSize={Number(pageSize)}
                      currentPage={Number(currentPage)}
                      totalPage={Number(totalPage)}
                      isGlobalFilter={true}
                      isShowingPageLength={true}
                      tableActions={getTableActions()}
                      goToPage={goToPage}
                      handleRowClick={(row) => {
                        toggleViewLco(row);
                      }}
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

export default withRouter(LCOList);
