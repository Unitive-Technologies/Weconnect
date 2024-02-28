import React, { useMemo, useState, useEffect } from "react";
import PropTypes from "prop-types";
import TableContainer from "../../../components/Common/TableContainer";
import { Card, CardBody, Input, Table } from "reactstrap";
import { Link } from "react-router-dom";
import { getRechargePeriod as onGetRechargePeriod } from "/src/store/actions";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";

const PreviewTable = (props) => {
  const { rechargeperiod } = props;
  const dispatch = useDispatch();
  const selectBouquetState = (state) => state.bouquet;
  const BouquetProperties = createSelector(selectBouquetState, (bouquet) => ({
    periodArray: bouquet.rechargeperiod,
  }));

  const { periodArray } = useSelector(BouquetProperties);
  useEffect(() => {
    if (rechargeperiod && !rechargeperiod.length) {
      dispatch(onGetRechargePeriod());
    }
  }, [dispatch, rechargeperiod]);

  const columns = useMemo(
    () => [
      {
        Header: "Enabled",
        disableFilters: true,
        filterable: true,
        Cell: (cellProps) => {
          return <Input type="checkbox" checked />;
        },
      },
      {
        Header: "Period",
        accessor: "name",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <>
              <p className="text-muted mb-0">{cellProps.row.original.name}</p>
            </>
          );
        },
      },
      {
        Header: "Pay Channel Rate",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <>
              <Input type="number" />
            </>
          );
        },
      },
      {
        Header: "Tax",
        // accessor: "status",
        filterable: true,
        Cell: (cellProps) => {
          return <Input type="number" />;
        },
      },
      {
        Header: "Total AMT",
        // accessor: "status",
        filterable: true,
        Cell: (cellProps) => {
          return <Input type="number" />;
        },
      },
      {
        Header: "Refundable",
        // accessor: "status",
        filterable: true,
        Cell: (cellProps) => {
          return <Input type="checkbox" checked />;
        },
      },
      {
        Header: "Free Days",
        // accessor: "status",
        filterable: true,
        Cell: (cellProps) => {
          return <Input type="number" />;
        },
      },
      {
        Header: "Action",
        Cell: (cellProps) => {
          return (
            <div className="d-flex gap-3">
              <Link to="#" className="text-success">
                <i
                  className="mdi mdi-content-copy font-size-18"
                  id="edittooltip"
                />
              </Link>
            </div>
          );
        },
      },
    ],
    []
  );

  return (
    <Card>
      <CardBody>
        {console.log("recharge period: ", JSON.stringify(rechargeperiod))}
        {/* <TableContainer
          isPagination={true}
          columns={columns}
          data={rechargeperiod}
          // isShowTableActionButtons={true}
          isShowingPageLength={true}
          theadClass="table-light"
          tableClass="table-bordered align-middle nowrap mt-2"
          paginationDiv="col-sm-12 col-md-7"
          pagination="pagination justify-content-end pagination-rounded"
        /> */}
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Period</th>
              <th>Pay Channel Rate**</th>
              <th>Tax</th>
              <th>Total AMT</th>
              <th>Refundable</th>
              <th>Free Days</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {console.log("period arrayyyyyyy: ", JSON.stringify(periodArray))}
            {periodArray &&
              periodArray.map((row, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  {/* <td>
            <input
              type="checkbox"
              onChange={() => {
                debugger;
                console.log("Clicked the checkbox");
                handleCheckboxChange(row.id);
              }}
              checked={isRowChecked(row.id)}
            />
          </td> */}
                  {console.log("RRRRRRRRRRRRRRRRRRow: ", JSON.stringify(row))}
                  <td>{row && row.name}</td>
                  <td>
                    {" "}
                    <Input type="number" />
                  </td>
                  <td>
                    {" "}
                    <Input type="number" />
                  </td>
                  <td>
                    {" "}
                    <Input type="number" />
                  </td>
                  <td>
                    <Input type="checkbox" defaultChecked />
                  </td>
                  <td>
                    {" "}
                    <Input type="number" />
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </CardBody>
    </Card>
  );
};

PreviewTable.propTypes = {
  // toggle: PropTypes.func,
  // isOpen: PropTypes.bool,
  rechargeperiod: PropTypes.array,
};

export default PreviewTable;
