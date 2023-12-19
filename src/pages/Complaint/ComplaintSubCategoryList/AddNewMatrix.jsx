import React, { useMemo } from "react";
import PropTypes from "prop-types";
import TableContainer from "../../../components/Common/TableContainer";
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";

const AddNewMatrix = (props) => {
  const complaintsubcateData = [
    {
      designation: "Director",
    },
  ];

  const columns = useMemo(
    () => [
      {
        Header: "Enabled",
        // accessor: "",
        // disableFilters: true,
        // filterable: true,
        Cell: () => {
          return (
            <>
              <input
                className="form-check-input"
                type="checkbox"
                id="upcomingtaskCheck01"
                // defaultChecked
                // disabled
              />
            </>
          );
        },
      },

      {
        Header: "Designation",
        accessor: "designation",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <>
              <h5
                style={{
                  maxWidth: 200,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
                className="font-size-14 mb-1"
              >
                <p className="text-muted mb-0">
                  {cellProps.row.original.designation}
                </p>
              </h5>
            </>
          );
        },
      },
      {
        Header: "TAT(HH:mm:ss)",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <>
              <input type="text"></input>
            </>
          );
        },
      },
    ],
    []
  );

  return (
    <Card>
      <CardBody>
        <TableContainer
          isPagination={true}
          columns={columns}
          data={complaintsubcateData}
          // isGlobalFilter={true}
          // isShowingPageLength={true}
          customPageSize={50}
          tableClass="table align-middle table-nowrap table-hover"
          theadClass="table-light"
          paginationDiv="col-sm-12 col-md-7"
          pagination="pagination pagination-rounded justify-content-end mt-4"
        />
      </CardBody>
    </Card>
  );
};

AddNewMatrix.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default AddNewMatrix;
