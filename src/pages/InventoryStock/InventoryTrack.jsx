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
      //   {
      //     Header: "",
      //     filterable: true,
      //     Cell: (cellProps) => {
      //       return <p>+</p>;
      //     },
      //   },
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
            <p className="text-muted mb-0">
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
            <p className="text-muted mb-0">
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
            <p className="text-muted mb-0">
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
            <p className="text-muted mb-0">{cellProps.row.original.cas_lbl}</p>
          );
        },
      },
      {
        Header: "Inventory State",
        accessor: "inv_state_lbl",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
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
            <p className="text-muted mb-0">
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
            <p className="text-muted mb-0">
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
            <p className="text-muted mb-0">
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
            <p className="text-muted mb-0">
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
            <p className="text-muted mb-0">{cellProps.row.original.remark}</p>
          );
        },
      },
      {
        Header: "From Operator",
        accessor: "from_operator",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
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
            <p className="text-muted mb-0">
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
            <p className="text-muted mb-0">
              {cellProps.row.original.action_date}
            </p>
          );
        },
      },
    ],
    []
  );

  //   {
  //     "_id": "65d88c6c628cd62e90058c74",
  //     "action": "SmartcardDealloted",
  //     "object_class": "app\\models\\inventory\\Smartcard",
  //     "object_id": 323340,
  //     "insert_by": "mso",
  //     "insert_ts": 1708690540,
  //     "object_status": 1,
  //     "smartcardno": "a123456789098678",
  //     "operator_id": 2020,
  //     "cas_id": 1,
  //     "smartcard_details": {
  //         "smartcardno": "a123456789098678",
  //         "is_embeded": 0,
  //         "cas_id": 1,
  //         "po_id": 46,
  //         "po_number": "aasdfe",
  //         "po_code": "PO/23-24/20240125131806001",
  //         "po_date": "2024-01-24",
  //         "invoice_no": "aswwee",
  //         "invoice_date": "2024-01-25"
  //     },
  //     "state": 1,
  //     "invent_state": 1,
  //     "lmo_name": "New Regional AAgree",
  //     "lmo_code": "C000025",
  //     "action_text": "Smartcard a123456789098678 DeAlloted from New Regional AAgree by mso on 2024-02-23 17:45:40",
  //     "remark": "Smartcardno a123456789098678 Alloted to RO:New Regional AAgree",
  //     "action_detail": "Smartcard a123456789098678 DeAlloted from New Regional AAgree by mso on 2024-02-23 17:45:40",
  //     "model": "smartcard",
  //     "model_id": 323340,
  //     "stbno": null,
  //     "old_stbno": null,
  //     "old_smartcardno": null,
  //     "ishd": "",
  //     "old_ishd": "",
  //     "status": 1,
  //     "status_lbl": "Active",
  //     "casName": "NSTV",
  //     "action_date": "2024-02-23 17:45:40",
  //     "action_by": "mso",
  //     "subscriber_name": null,
  //     "customer_id": null,
  //     "operator_name": "New Regional AAgree",
  //     "operator_code": "C000025",
  //     "doc_number": null,
  //     "return_doc_number": null,
  //     "from_operator": null,
  //     "to_operator": null,
  //     "stbCurrentStatus": "Not Found",
  //     "scCurrentStatus": "In Stock",
  //     "stb_brand_lbl": null,
  //     "state_lbl": "New",
  //     "inv_state_lbl": "Release"
  // },

  const tableSchema = {
    // subTableArrayKeyName: "smartcard_details",
    // keyColumn: "_id",
    columns: [
      {
        header: "Smartcard Current Status",
        accessor: "scCurrentStatus",
      },
      {
        header: "STB Current Status",
        accessor: "stbCurrentStatus",
      },
    ],
  };

  const getTrackListRendered = (rowData) => {
    return (
      <Table className="table mb-0">
        <thead>
          <tr>
            {tableSchema.columns.map((column) => {
              return <th key={column.header}>{column.header}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {rowData[tableSchema.subTableArrayKeyName].map((object) => {
            return (
              <tr key={object.id}>
                {tableSchema.columns.map((column) => {
                  return <td key={column.header}>{column.accessor(object)}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </Table>
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
                // subTableEnabled={true}
                // getRenderedSubTable={getTrackListRendered}
                // isSubTableContentExists={(rowData) =>
                //   rowData.smartcard_details.length > 0
                // }
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default InventoryTrack;
