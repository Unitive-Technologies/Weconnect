import React, { useEffect, useState, useRef, useMemo } from "react";
import { Link } from "react-router-dom";
import withRouter from "../../../components/Common/withRouter";
import { Card, CardBody, Col, Container, Row, Spinner } from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "/src/components/Common/Breadcrumb";

import {
  goToPage as onGoToPage,
  getSMSMessageTempList as onGetSMSMessageTemplate,
  getSMSMessageTempListStatus as onGetSMSMessageTempListStatus,
  getSMSMessageTempListSender as onGetSMSMessageTempListSender,
  getSMSMessageTempListSubcategory as onGetSMSMessageTempListSubcategory,
  getSMSMessageTempListCategory as onGetSMSMessageTempListCategory,
} from "/src/store/smsmessage/actions";

//redux
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { ToastContainer } from "react-toastify";
import ViewSMSMessageTemplateList from "./ViewSMSMessageTemplateList";
import TableContainerX from "../../../components/Common/TableContainerX";

const SMSMessageTemplateList = (props) => {
  //meta title
  document.title = "SMS Message Template List | VDigital";

  const dispatch = useDispatch();

  const selectSMSMessageState = (state) => state.smsmessagetemp;

  const SMSMessageProperties = createSelector(
    selectSMSMessageState,
    (smsmessagetemp) => ({
      SMSMsgTemp: smsmessagetemp.smsmessagetemp,
      loading: smsmessagetemp.loading,
      smsmessagetempStatus: smsmessagetemp.smsmessagetempStatus,
      smsmessagetempSender: smsmessagetemp.smsmessagetempSender,
      smsmessagetempSubcategory: smsmessagetemp.smsmessagetempSubcategory,
      smsmessagetempCategory: smsmessagetemp.smsmessagetempCategory,
      totalPage: smsmessagetemp.totalPages,
      totalCount: smsmessagetemp.totalCount,
      pageSize: smsmessagetemp.perPage,
      currentPage: smsmessagetemp.currentPage,
    })
  );

  const {
    SMSMsgTemp,
    loading,
    smsmessagetempCategory,
    smsmessagetempSender,
    smsmessagetempSubcategory,
    smsmessagetempStatus,
    totalPage,
    totalCount,
    pageSize,
    currentPage,
  } = useSelector(SMSMessageProperties);

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
        Header: "Template",
        accessor: "template",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <>
              <h5 className="font-size-14 mb-1">
                <Link className="text-dark" to="#">
                  {cellProps.row.original.template}
                </Link>
              </h5>
            </>
          );
        },
      },
      {
        Header: "Template ID",
        accessor: "template_id",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              {cellProps.row.original.template_id}
            </p>
          );
        },
      },
      {
        Header: "Category",
        accessor: "cat_id",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">{cellProps.row.original.cat_id}</p>
          );
        },
      },
      {
        Header: "Sub-Category",
        accessor: "sub_cat_id",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              {cellProps.row.original.sub_cat_id}
            </p>
          );
        },
      },
      {
        Header: "Sender",
        accessor: "sender_id_lbl",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              {cellProps.row.original.sender_id_lbl}
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
    ],
    []
  );

  useEffect(() => {
    if (SMSMsgTemp && !SMSMsgTemp.length) {
      dispatch(onGetSMSMessageTemplate());
      dispatch(onGetSMSMessageTempListCategory());
      dispatch(onGetSMSMessageTempListSubcategory());
      dispatch(onGetSMSMessageTempListSender());
      dispatch(onGetSMSMessageTempListStatus());
    }
  }, [dispatch, SMSMsgTemp]);

  const goToPage = (toPage) => {
    console.log("[GOTO PAGE] Trigger to page - ", toPage);
    dispatch(onGoToPage(toPage));
    dispatch(onGetSMSMessageTemplate());
  };

  const [showViewSMSMessageTamplateList, setShowSMSMessageTamplateList] =
    useState(false);

  const [viewSMSData, setViewSMSData] = useState({});

  const toggleViewModal = (SMSData) => {
    setShowSMSMessageTamplateList(!showViewSMSMessageTamplateList);
    setViewSMSData(SMSData);
  };

  const resetSelection = () => {
    setViewSMSData({});
  };

  const keyField = "id";

  const getTableActions = () => {
    return [{}];
  };

  // console.log(
  //   "SMS Messgage Temp Sub" + JSON.stringify(smsmessagetempSubcategory)
  // );
  return (
    <React.Fragment>
      <ViewSMSMessageTemplateList
        isOpen={showViewSMSMessageTamplateList}
        toggleViewModal={toggleViewModal}
        SMSMsgTemp={viewSMSData}
        smsmessagetempCategory={smsmessagetempCategory}
        smsmessagetempSubCategory={smsmessagetempSubcategory}
        smsmessagetempSender={smsmessagetempSender}
        smsmessagetempStatus={smsmessagetempStatus}
        resetSelection={resetSelection}
      />
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs
            title="Services"
            breadcrumbItem="SMS Message Template List"
          />
          {loading ? (
            <React.Fragment>
              <Spinner
                color="primary"
                className="position-absolute top-50 start-50"
              />
            </React.Fragment>
          ) : (
            <Row>
              <Col lg="12">
                <Card>
                  <CardBody>
                    {/* {console.log(
                      "SMS Msg Template:" + JSON.stringify(SMSMsgTemp)
                    )} */}
                    {/* <TableContainer
                      isPagination={true}
                      columns={columns}
                      data={SMSMsgTemp}
                      // isGlobalFilter={true}
                      // isAddUserList={true}
                      isShowingPageLength={true}
                      // iscustomPageSizeOptions={true}
                      handleUserClick={() => { }}
                      customPageSize={50}
                      tableClass="table align-middle table-nowrap table-hover"
                      theadClass="table-light"
                      paginationDiv="col-sm-12 col-md-7"
                      pagination="pagination pagination-rounded justify-content-end mt-4"
                    /> */}

                    <TableContainerX
                      columns={columns}
                      data={SMSMsgTemp}
                      isLoading={loading}
                      isPagination={true}
                      totalCount={Number(totalCount)}
                      pageSize={Number(pageSize)}
                      currentPage={Number(currentPage)}
                      tableActions={getTableActions()}
                      totalPage={Number(totalPage)}
                      isGlobalFilter={true}
                      isShowingPageLength={true}
                      handleRowClick={(row) => {
                        toggleViewModal(row);
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

export default withRouter(SMSMessageTemplateList);
