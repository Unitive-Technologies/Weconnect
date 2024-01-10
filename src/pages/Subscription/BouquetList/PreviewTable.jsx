import React, { useMemo, useState, useEffect } from "react";
import PropTypes from "prop-types";
import TableContainer from "../../../components/Common/TableContainer";
import { Card, CardBody, Input } from "reactstrap";
import { Link } from "react-router-dom";
import { getRechargePeriod as onGetRechargePeriod } from "/src/store/actions";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";

const PreviewTable = (props) => {
  // const { rechargeperiod } = props;
  const dispatch = useDispatch();
  const selectBouquetState = (state) => state.bouquet;
  const BouquetProperties = createSelector(selectBouquetState, (bouquet) => ({
    rechargeperiod: bouquet.rechargeperiod,
  }));

  const { rechargeperiod } = useSelector(BouquetProperties);
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
        accessor: "year",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <>
              <p className="text-muted mb-0">{cellProps.row.original.year}</p>
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
        {console.log("recharge period: ", rechargeperiod)}
        <TableContainer
          isPagination={true}
          columns={columns}
          data={rechargeperiod}
          // isShowTableActionButtons={true}
          isShowingPageLength={true}
          theadClass="table-light"
          tableClass="table-bordered align-middle nowrap mt-2"
          paginationDiv="col-sm-12 col-md-7"
          pagination="pagination justify-content-end pagination-rounded"
        />
      </CardBody>
    </Card>
  );
};

PreviewTable.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default PreviewTable;
