import React, { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, Col, Row, Table } from "reactstrap";
import {
  getInventoryTrack as onGetInventoryTrack,
  goToPage as onGoToPage,
  getInventoryTrackAction as onGetInventoryTrackAction,
} from "/src/store/inventorytrack/actions";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import TableContainerX from "../../components/Common/TableContainerX";

const InventoryTrack = (props) => {
  const dispatch = useDispatch();

  const selectInventoryTrackState = (state) => state.inventorytrack;
  const inventorytrackProperties = createSelector(
    selectInventoryTrackState,
    (inventorytrack) => ({
      inventory_track: inventorytrack.inventorytrack,
      loading: inventorytrack.loading,
      inventorytrackaction: inventorytrack.inventorytrackaction,
      totalPage: inventorytrack.totalPages,
      totalCount: inventorytrack.totalCount,
      pageSize: inventorytrack.perPage,
      currentPage: inventorytrack.currentPage,
    })
  );

  const {
    inventory_track,
    loading,
    inventorytrackaction,
    totalPage,
    totalCount,
    pageSize,
    currentPage,
  } = useSelector(inventorytrackProperties);

  useEffect(() => {
    dispatch(onGetInventoryTrack());
    dispatch(onGetInventoryTrackAction());
  }, [dispatch]);

  const goToPage = (toPage) => {
    dispatch(onGoToPage(toPage));
    dispatch(onGetInventoryTrack());
  };

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
        Header: "Action",
        accessor: "action",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <>
              <h5
                className="font-size-14 mb-1"
                style={{
                  maxWidth: 50,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                <Link className="text-dark" to="#">
                  {cellProps.row.original.action}
                </Link>
              </h5>
            </>
          );
        },
      },
      {
        Header: "Smartcard No.",
        accessor: "smartcardno",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <>
              <h5 className="font-size-14 mb-1">
                <Link className="text-dark" to="#">
                  {cellProps.row.original.smartcardno}
                </Link>
              </h5>
            </>
          );
        },
      },
      {
        Header: "STB No.",
        accessor: "stbno",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <>
              <h5 className="font-size-14 mb-1">
                <Link className="text-dark" to="#">
                  {cellProps.row.original.stbno}
                </Link>
              </h5>
            </>
          );
        },
      },
      {
        Header: "Brand",
        accessor: "brand_lbl",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p
              className="text-muted mb-0"
              style={{
                maxWidth: 50,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {cellProps.row.original.brand_lbl}
            </p>
          );
        },
      },
      {
        Header: "Stock Type",
        accessor: "state_lbl",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p
              className="text-muted mb-0"
              style={{
                maxWidth: 50,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {cellProps.row.original.state_lbl}
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
            <p
              className="text-muted mb-0"
              style={{
                maxWidth: 50,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {cellProps.row.original.status_lbl}
            </p>
          );
        },
      },
      {
        Header: "CAS Name",
        accessor: "cas_lbl",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p
              className="text-muted mb-0"
              style={{
                maxWidth: 50,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {cellProps.row.original.cas_lbl}
            </p>
          );
        },
      },
      {
        Header: "Inventory State",
        accessor: "inv_state_lbl",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p
              className="text-muted mb-0"
              style={{
                maxWidth: 50,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {cellProps.row.original.inv_state_lbl}
            </p>
          );
        },
      },
      {
        Header: "DOC No./Return DOC No.",
        accessor: "doc_number",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p
              className="text-muted mb-0"
              style={{
                maxWidth: 50,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {cellProps.row.original.doc_number}
            </p>
          );
        },
      },
      {
        Header: "Customer Id",
        accessor: "customer_id",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p
              className="text-muted mb-0"
              style={{
                maxWidth: 50,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {cellProps.row.original.customer_id}
            </p>
          );
        },
      },
      {
        Header: "Operator Name",
        accessor: "operator_name",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p
              className="text-muted mb-0"
              style={{
                maxWidth: 50,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {cellProps.row.original.operator_name}
            </p>
          );
        },
      },
      {
        Header: "Operator Code",
        accessor: "operator_code",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p
              className="text-muted mb-0"
              style={{
                maxWidth: 50,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {cellProps.row.original.operator_code}
            </p>
          );
        },
      },
      {
        Header: "Remark",
        accessor: "remark",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p
              className="text-muted mb-0"
              style={{
                maxWidth: 50,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {cellProps.row.original.remark}
            </p>
          );
        },
      },
      {
        Header: "From Operator",
        accessor: "from_operator",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p
              className="text-muted mb-0"
              style={{
                maxWidth: 50,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {cellProps.row.original.from_operator}
            </p>
          );
        },
      },
      {
        Header: "To Operator",
        accessor: "to_operator",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p
              className="text-muted mb-0"
              style={{
                maxWidth: 50,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {cellProps.row.original.to_operator}
            </p>
          );
        },
      },
      {
        Header: "Action Date",
        accessor: "action_date",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p
              className="text-muted mb-0"
              style={{
                maxWidth: 50,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {cellProps.row.original.action_date}
            </p>
          );
        },
      },
    ],
    []
  );

  const renderStatusTable = (row) => {
    const { scCurrentStatus, stbCurrentStatus } = row;
    console.log("Row Data: ", row);
    const tableData = [{ smartcard: scCurrentStatus, stb: stbCurrentStatus }];
    console.log("Table data: ", tableData);
    return (
      <div>
        <Table className="table mb-0">
          <thead>
            <tr>
              {["Smartcard Current Status", "STB Current Status"].map(
                (columnHeader) => {
                  return <th key={columnHeader}>{columnHeader}</th>;
                }
              )}
            </tr>
          </thead>
          <tbody
            style={{
              maxHeight: 200,
            }}
          >
            {tableData.map((data) => {
              return (
                <tr key={data.index}>
                  <td key={data.smartcard}>{data.smartcard}</td>
                  <td key={data.stb}>{data.stb}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    );
  };

  return (
    <React.Fragment>
      <Row>
        <Col lg="12">
          <Card>
            <CardBody>
              <TableContainerX
                columns={columns}
                data={inventory_track}
                isLoading={loading}
                isPagination={true}
                totalCount={Number(totalCount)}
                pageSize={Number(pageSize)}
                currentPage={Number(currentPage)}
                totalPage={Number(totalPage)}
                isGlobalFilter={true}
                isShowingPageLength={true}
                tableActions={[]}
                goToPage={goToPage}
                subTableEnabled={true}
                getRenderedSubTable={renderStatusTable}
                isSubTableContentExists={(rowData) =>
                  rowData.scCurrentStatus !== "" ||
                  rowData.stbCurrentStatus !== ""
                }
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default InventoryTrack;
