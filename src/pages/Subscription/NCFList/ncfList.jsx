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
  UncontrolledTooltip,
} from "reactstrap";
import Breadcrumbs from "/src/components/Common/Breadcrumb";
import { getNcf as onGetNcf } from "/src/store/actions";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { ToastContainer } from "react-toastify";
import ViewNcf from "./ViewNcf";
import AddNewNcf from "./AddNewNcf";
import BulkAssigntoOperator from "./BulkAssigntoOperator";
import BulkRemovalFromOperator from "./BulkRemovalFromOperator";

const NCFList = (props) => {
  //meta title
  document.title = "NCF List | VDigital";

  const dispatch = useDispatch();

  const selectNcfState = (state) => state.ncf;
  const NcfProperties = createSelector(selectNcfState, (ncf) => ({
    ncfl: ncf.ncf,
    loading: ncf.loading,
  }));

  const { ncfl, loading } = useSelector(NcfProperties);

  useEffect(() => {
    // console.log("NCF list data in component:", ncfl);
  }, [ncfl]);
  const [isLoading, setLoading] = useState(loading);
  const [modal, setModal] = useState(false);
  const [showAddNcf, setShowAddNcf] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [showBulkAssign, setShowBulkAssign] = useState(false);
  const [showViewNcf, setShowViewNcf] = useState(false);
  const [viewNcfData, setViewNcfData] = useState({});
  const [showBulkRemoval, setShowBulkRemoval] = useState(false);

  const toggleViewNcf = (userData) => {
    console.log("User Data: ", userData);
    setShowViewNcf(!showViewNcf);
    setViewNcfData(userData);
  };

  const toggleAddNcf = () => {
    setShowAddNcf(!showAddNcf);
  };

  const toggleBulkAssign = () => {
    setShowBulkAssign(!showBulkAssign);
  };

  const toggleBulkRemoval = () => {
    setShowBulkRemoval(!showBulkRemoval);
  };

  const columns = useMemo(
    () => [
      {
        Header: "*",
        disableFilters: true,
        filterable: true,
        Cell: () => {
          return (
            <>
              <input type="checkbox" />
            </>
          );
        },
      },
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
              <h5
                className="font-size-14 mb-1"
                onClick={() => {
                  const userData = cellProps.row.original;
                  toggleViewNcf(userData);
                }}
              >
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
          return (
            <p className="text-muted mb-0">{cellProps.row.original.code}</p>
          );
        },
      },
      {
        Header: "FROM",
        accessor: "from_channel_no",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              {cellProps.row.original.from_channel_no}
            </p>
          );
        },
      },
      {
        Header: "TO",
        accessor: "to_channel_no",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              {cellProps.row.original.to_channel_no}
            </p>
          );
        },
      },
      {
        Header: "MRP",
        accessor: "mrp",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">{cellProps.row.original.mrp}</p>
          );
        },
      },
      {
        Header: "LCO Discount(%)",
        accessor: "lmo_discount",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              {cellProps.row.original.lmo_discount}
            </p>
          );
        },
      },
      {
        Header: "LCO Rate",
        accessor: "lmo_rate",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">{cellProps.row.original.lmo_rate}</p>
          );
        },
      },
      {
        Header: "Per Channel",
        accessor: "calculate_per_channel",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              {cellProps.row.original.calculate_per_channel}
            </p>
          );
        },
      },
      {
        Header: "Is Refundable",
        accessor: "is_refundable",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              {cellProps.row.original.is_refundable}
            </p>
          );
        },
      },
      {
        Header: "Status",
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
        accessor: "created_by",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              {cellProps.row.original.created_by}
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
    if (ncfl && !ncfl.length) {
      dispatch(onGetNcf());
      setIsEdit(false);
    }
  }, [dispatch, ncfl]);

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

  const keyField = "id";
  const getTableActions = () => {
    return [
      {
        name: "Create",
        action: setShowAddNcf,
        type: "normal",
        icon: "create",
      },
      {
        name: "Bulk Assign to Operator",
        action: setShowBulkAssign,
        type: "dropdown",
        dropdownName: "Action",
      },
      {
        name: "Bulk Removal from Operator",
        action: setShowBulkRemoval,
        type: "dropdown",
        dropdownName: "Action",
      },
    ];
  };

  return (
    <React.Fragment>
      <ViewNcf isOpen={showViewNcf} toggle={toggleViewNcf} ncf={viewNcfData} />
      <AddNewNcf isOpen={showAddNcf} toggle={toggleAddNcf} />
      <BulkAssigntoOperator isOpen={showBulkAssign} toggle={toggleBulkAssign} />
      <BulkRemovalFromOperator
        isOpen={showBulkRemoval}
        toggle={toggleBulkRemoval}
      />
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="NCF" breadcrumbItem="NCF List" />
          {isLoading ? (
            <Spinners setLoading={setLoading} />
          ) : (
            <Row>
              <Col lg="12">
                <Card>
                  <CardBody>
                    <TableContainer
                      isPagination={true}
                      columns={columns}
                      data={ncfl}
                      isGlobalFilter={true}
                      isAddUserList={true}
                      isShowingPageLength={true}
                      tableActions={getTableActions()}
                      handleUserClick={() => setShowAddNcf(true)}
                      handleUploadUser={() => setShowBulkAssign(true)}
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

export default withRouter(NCFList);
