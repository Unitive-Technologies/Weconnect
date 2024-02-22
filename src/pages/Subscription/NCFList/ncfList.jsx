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
  Table,
  Toast,
  ToastBody,
  ToastHeader,
  UncontrolledTooltip,
} from "reactstrap";
import Breadcrumbs from "/src/components/Common/Breadcrumb";
import { useSelector, useDispatch } from "react-redux";
import {
  getNcf as onGetNcf,
  getAdministrativeDivisionStatus as onGetAdministrativeDivisionStatus,
} from "/src/store/actions";
import { createSelector } from "reselect";
import { ToastContainer } from "react-toastify";
import ViewNcf from "./ViewNcf";
import AddNewNcf from "./AddNewNcf";
import BulkAssigntoOperator from "./BulkAssigntoOperator";
import BulkRemovalFromOperator from "./BulkRemovalFromOperator";
import { useTable, useRowSelect } from "react-table";

const NCFList = (props) => {
  //meta title
  document.title = "NCF  | VDigital";

  const dispatch = useDispatch();

  const selectNcfState = (state) => state.ncf;
  const NcfProperties = createSelector(selectNcfState, (ncf) => ({
    ncfl: ncf.ncf,
    loading: ncf.loading,
  }));

  const selectDistrictState = (state) => state.district;
  const districtProperties = createSelector(
    selectDistrictState,
    (district) => ({
      status: district.status,
    })
  );

  const { status } = useSelector(districtProperties);
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
  const [isChecked, setIsChecked] = useState(false);
  const [selectedRow, setSelectedRow] = useState({});
  const [showWarning, setShowWarning] = useState(false);

  const handleCheckboxClick = (row) => {
    setShowViewNcf(false);
    setIsChecked(true);
    setSelectedRow(row);
  };

  // const handleCheckboxDeselect = (row) => {
  //   setIsChecked(false);
  //   setSelectedRow({});
  //   console.log("Deselect function worked");
  // };

  const handleCheckboxDeselect = (row) => {
    setShowViewNcf(false);
    setIsChecked(false);
    setSelectedRow((prevSelectedRow) => {
      return prevSelectedRow === row ? {} : prevSelectedRow;
    });
    console.log("selected row: ", selectedRow);
  };

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

  const handleWarning = () => {
    setShowWarning(!showWarning);
  };

  const additionalRateTableSchema = {
    subTableArrayKeyName: "additional_rates",
    keyColumn: "_id",
    columns: [
      {
        header: "Name",
        accessor: (rowData) => rowData.name,
      },
      {
        header: "MRP",
        accessor: (rowData) => rowData.mrp,
      },
      {
        header: "LCO Discount(%)",
        accessor: (rowData) => rowData.lmo_discount,
      },
      {
        header: "LCO Rate",
        accessor: (rowData) => rowData.lmo_rate,
      },
      {
        header: "Per Channel",
        accessor: (rowData) =>
          rowData.calculate_per_channel == 0 ? "NO" : "YES",
      },
      {
        header: "Is Refundable",
        accessor: (rowData) => (rowData.is_refundable == 0 ? "NO" : "YES"),
      },
    ],
  };

  const getAdditionalRateListRendered = (rowData) => {
    return (
      <Table className="table mb-0">
        <thead>
          <tr>
            {additionalRateTableSchema.columns.map((column) => {
              return <th key={column.header}>{column.header}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {rowData[additionalRateTableSchema.subTableArrayKeyName].map(
            (object) => {
              return (
                <tr key={object.id}>
                  {additionalRateTableSchema.columns.map((column) => {
                    return (
                      <td key={column.header}>{column.accessor(object)}</td>
                    );
                  })}
                </tr>
              );
            }
          )}
        </tbody>
      </Table>
    );
  };

  const columns = useMemo(
    () => [
      {
        Header: "*",
        disableFilters: true,
        filterable: true,
        Cell: (cellProps) => (
          <input
            type="checkbox"
            // onChange={
            //   // isChecked
            //   //   ? () => handleCheckboxClick(cellProps.row.original):
            //   () => handleCheckboxDeselect(cellProps.row.original)
            // }
            onChange={() => handleCheckboxClick(cellProps.row.original)}
          />
        ),
      },
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
              {cellProps.row.original.created_by_lbl}
            </p>
          );
        },
      },
    ],
    []
  );

  useEffect(() => {
    if (ncfl && !ncfl.length) {
      dispatch(onGetNcf());
      dispatch(onGetAdministrativeDivisionStatus());
    }
  }, [dispatch, ncfl]);

  // useEffect(() => {
  //   dispatch(onGetAdministrativeDivisionStatus());
  // }, [dispatch, status]);

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
        action:
          Object.keys(selectedRow).length === 0
            ? () => setShowWarning(true)
            : () => setShowBulkAssign(true),
        type: "dropdown",
        dropdownName: "Action",
      },
      {
        name: "Bulk Removal from Operator",
        action:
          Object.keys(selectedRow).length === 0
            ? () => setShowWarning(true)
            : () => setShowBulkRemoval(true),
        type: "dropdown",
        dropdownName: "Action",
      },
    ];
  };

  return (
    <React.Fragment>
      <ViewNcf
        isOpen={showViewNcf}
        toggleViewModal={toggleViewNcf}
        ncf={viewNcfData}
      />
      <AddNewNcf
        isOpen={showAddNcf}
        toggleAddNewNcf={toggleAddNcf}
        status={status}
      />
      <BulkAssigntoOperator
        isOpen={showBulkAssign}
        toggle={toggleBulkAssign}
        selectedRow={selectedRow}
      />
      <BulkRemovalFromOperator
        isOpen={showBulkRemoval}
        toggle={toggleBulkRemoval}
        selectedRow={selectedRow}
      />
      <div
        className="position-fixed top-0 end-0 p-3"
        style={{ zIndex: "1005" }}
      >
        <Toast isOpen={showWarning}>
          <ToastHeader toggle={handleWarning}>
            <i className="mdi mdi-alert-outline me-2"></i> Warning
          </ToastHeader>
          <ToastBody>Please select NCF</ToastBody>
        </Toast>
      </div>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="NCF" breadcrumbItem="NCF" />
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
                      isShowTableActionButtons={true}
                      isShowingPageLength={true}
                      tableActions={getTableActions()}
                      handleRowClick={(row) => {
                        toggleViewNcf(row);
                      }}
                      customPageSize={8}
                      tableClass="table align-middle table-nowrap table-hover"
                      theadClass="table-light"
                      paginationDiv="col-sm-12 col-md-7"
                      pagination="pagination pagination-rounded justify-content-end mt-4"
                      subTableEnabled={true}
                      getRenderedSubTable={getAdditionalRateListRendered}
                      isSubTableContentExists={(rowData) =>
                        rowData.additional_rates.length > 0
                      }
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
