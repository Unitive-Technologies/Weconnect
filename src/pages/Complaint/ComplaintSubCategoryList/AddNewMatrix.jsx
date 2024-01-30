import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import TableContainer from "../../../components/Common/TableContainer";
import { Card, CardBody, Table } from "reactstrap";

const AddNewMatrix = (props) => {
  const { complaintsubcateDesignation, timeArray, setTimeArray } = props;
  console.log("timeArray:" + JSON.stringify(timeArray));
  const [time, setTime] = useState("");
  const [selectedDesignationId, setSelectedDesignationId] = useState("");

  const handleCheckboxChange = (row) => (event) => {
    setSelectedDesignationId(row.id);
  };
  console.log("selectedID:" + selectedDesignationId);

  const handleTimeChange = (event) => {
    const { value } = event.target;
    setTime(event.target.value);

    if (!selectedDesignationId || !value) {
      return;
    }
    const newItem = {
      designation: selectedDesignationId,
      tat_time: value,
    };
    const updatedData = [...timeArray, newItem];

    setTimeArray(updatedData);
  };

  const newArray = complaintsubcateDesignation.map((single) => {
    return { id: single.id, name: single.name, time: time };
  });

  console.log("newArray:" + JSON.stringify(newArray));
  const columns = useMemo(
    () => [
      {
        Header: "Enabled",
        Cell: (cellProps) => (
          <input
            className="form-check-input"
            type="checkbox"
            id={`upcomingtaskCheck_${cellProps.row.original.id}`}
            onClick={handleCheckboxChange(cellProps.row.original)}
          />
        ),
      },
      {
        Header: "Designation",
        accessor: "name",
        filterable: true,
        Cell: (cellProps) => (
          <h5 className="font-size-14 mb-1">
            <Link className="text-dark" to="#">
              {cellProps.row.original.name}
            </Link>
          </h5>
        ),
      },
      {
        Header: "TAT(HH:mm:ss)",
        filterable: true,
        Cell: (cellProps) => {
          // Generate unique ID for each input field
          const uniqueId = `timeInput_${cellProps.row.original.id}`;

          return (
            <input
              type="text"
              id={uniqueId}
              onChange={handleTimeChange}
              value={time}
            />
          );
        },
      },
    ],
    [time, handleTimeChange, selectedDesignationId, timeArray, setTimeArray]
  );

  return (
    <Card>
      <CardBody>
        {/* <TableContainer
          isPagination={true}
          columns={columns}
          data={newArray}
          customPageSize={50}
          tableClass="table align-middle table-nowrap table-hover"
          theadClass="table-light"
          paginationDiv="col-sm-12 col-md-7"
          pagination="pagination pagination-rounded justify-content-end mt-4"
        /> */}
        <div className="table-responsive">
          <Table className="table mb-0">
            <thead>
              <tr>
                <th>#</th>
                <th>Designation</th>
                <th>TAT(HH:mm:ss)</th>
              </tr>
            </thead>
            <tbody>
              {newArray.map((single) => (
                <tr key={single.id}>
                  <th>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={`upcomingtaskCheck_${single.id}`}
                      onClick={handleCheckboxChange(single)}
                    />
                  </th>
                  <td>{single.name}</td>
                  <td>
                    <input
                      type="text"
                      id={single.id}
                      onChange={handleTimeChange}
                      value={time}
                      pattern="[0-2][0-9]:[0-5][0-9]:[0-5][0-9]"
                      title="Please enter time in the format hh:mm:ss"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </CardBody>
    </Card>
  );
};

AddNewMatrix.propTypes = {
  complaintsubcateDesignation: PropTypes.array,
  timeArray: PropTypes.array,
  setTimeArray: PropTypes.func,
};

export default AddNewMatrix;
