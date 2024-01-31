import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import TableContainer from "../../../components/Common/TableContainer";
import { Card, CardBody, Table } from "reactstrap";

const AddNewMatrix = (props) => {
  const {
    complaintsubcateDesignation,
    timeArray,
    setTimeArray,
    escalations,
    showEditSubCategory,
  } = props;
  console.log("timeArray:" + JSON.stringify(timeArray));
  const [time, setTime] = useState("");
  const [selectedDesignationId, setSelectedDesignationId] = useState("");
  const [timeForId, setTimeForId] = useState({});
  const handleCheckboxChange = (singleId) => {
    setSelectedDesignationId(singleId);
  };
  console.log("selectedID:" + selectedDesignationId);

  const handleTimeChange = (event, singleId) => {
    const { value } = event.target;

    setTimeForId((prevState) => ({
      ...prevState,
      [singleId]: value,
    }));

    const isValidTimeFormat =
      /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/.test(value);

    if (!isValidTimeFormat || !selectedDesignationId || !value) {
      return;
    }

    const newItem = {
      designation: selectedDesignationId,
      tat_time: value,
    };

    const updatedData = timeArray.filter(
      (item) => item.designation !== selectedDesignationId
    );
    updatedData.push(newItem);

    setTimeArray(updatedData);
  };

  // const newArray = complaintsubcateDesignation.map((single) => {
  //   return { id: single.id, name: single.name, time: time };
  // });

  // console.log("newArray:" + JSON.stringify(newArray));
  const columns = useMemo(
    () => [
      {
        Header: "Enabled",
        // disableFilters: true,
        // filterable: true,
        Cell: (cellProps) => {
          const matchingEscalation = escalations.find(
            (single) => single.designation === cellProps.row.original.id
          );
          return matchingEscalation ? (
            <>
              <input
                type="checkbox"
                disabled
                checked={matchingEscalation.designation}
              />
            </>
          ) : (
            <>
              <input type="checkbox" disabled />
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
                <p className="text-muted mb-0">{cellProps.row.original.name}</p>
              </h5>
            </>
          );
        },
      },
      {
        Header: "TAT(HH:mm:ss)",
        filterable: true,
        Cell: (cellProps) => {
          const matchingEscalation = escalations.find(
            (single) => single.designation === cellProps.row.original.id
          );
          return matchingEscalation ? (
            <>
              <input type="text" placeholder={matchingEscalation.tat_time} />
            </>
          ) : (
            <>
              <input type="text" placeholder="" />
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
        {showEditSubCategory ? (
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
                {complaintsubcateDesignation.map((single) => (
                  <tr key={single.id}>
                    <th>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id={`upcomingtaskCheck_${single.id}`}
                        onClick={() => handleCheckboxChange(single.id)}
                      />
                    </th>
                    <td>{single.name}</td>
                    <td>
                      <input
                        type="text"
                        id={single.id}
                        onChange={(event) => handleTimeChange(event, single.id)}
                        value={timeForId[single.id] || ""}
                        pattern="[0-2][0-9]:[0-5][0-9]:[0-5][0-9]"
                        title="Please enter time in the format hh:mm:ss"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        ) : (
          <TableContainer
            isPagination={true}
            columns={columns}
            data={complaintsubcateDesignation}
            // isGlobalFilter={true}
            // isShowingPageLength={true}
            customPageSize={50}
            tableClass="table align-middle table-nowrap table-hover"
            theadClass="table-light"
            paginationDiv="col-sm-12 col-md-7"
            pagination="pagination pagination-rounded justify-content-end mt-4"
          />
        )}
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
