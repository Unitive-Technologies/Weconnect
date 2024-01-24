import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import TableContainer from "../../../components/Common/TableContainer";
import {
  Card,
  CardBody,
  Row,
  Col,
  Label,
  Input,
  Form,
  FormFeedback,
} from "reactstrap";
import { Link } from "react-router-dom";
import { createSelector } from "reselect";
import { useSelector, useDispatch } from "react-redux";

const CasList = ({ data, updateList, handleUpdateCasList, channelListCascode }) => {
  const selectChannelState = (state) => state.channelList;
  const ChannelProperties = createSelector(
    selectChannelState,
    (channelList) => ({
      casSource: channelList.casSource,
    })
  );

  const { casSource } = useSelector(ChannelProperties);

  const columns = useMemo(
    () => [
      {
        Header: "#",
        disableFilters: true,
        // filterable: true,
        Cell: (cellProps) => {
          const totalRows = cellProps.rows.length;
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
        Header: "CAS",
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
                <Link className="text-dark" to="#">
                  {cellProps.row.casLabel || "-"}
                </Link>
              </h5>
            </>
          );
        },
      },
      {
        Header: "CAS CODE",
        // accessor: "login",
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
                <Link className="text-dark" to="#">
                  {cellProps.row.casCode || "-"}
                </Link>
              </h5>
            </>
          );
        },
      },
      {
        Header: "Service ID",
        // accessor: "status",
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
                <Link className="text-dark" to="#">
                  {cellProps.row.serviceId || "-"}
                </Link>
              </h5>
            </>
          );
        },
      },
      {
        Header: "$",
        // accessor: "type",
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
                <Link className="text-dark" to="#">
                  {"deleteIcon"}
                </Link>
              </h5>
            </>
          );
        },
      },
    ],
    []
  );

  const casData = [data];
  const [casSelection, setCasSelection] = useState("");
  const [casCode, setCasCode] = useState("");
  const [serviceId, setServiceId] = useState("");

  const updateCasList = () => {
    // Check if data is an array before spreading
    const newData = Array.isArray(data) ? [...data] : [];
    newData.push({ cas_lbl: casSelection, cascode: casCode, serviceid: serviceId });
    updateList(newData);
  };

  const handleChange = (e) => {
    // Handle change for different input fields
    const { name, value } = e.target;
    if (name === "casSelection") {
      setCasSelection(value);
    } else if (name === "casCode") {
      setCasCode(value);
    } else if (name === "serviceID") {
      setServiceId(value);
    }
  };

  const deleteCasList = (index) => {
    const list = [...data];
    list.splice(index, 1);
    updateList(list);
  };

  return (
    <Card>
      <CardBody>
        <Row>
          <Col
            lg={6}
            style={{
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            <Col lg={12}>
              <div className="mb-3">
                <Input
                  name="options"
                  type="select"
                  placeholder="Select CAS"
                  className="form-select"
                  onChange={handleChange}
                >
                  {channelListCascode && channelListCascode.map((options) => (
                    <option key={options.id} value={options.id}>
                      {options.name}
                    </option>
                  ))
                  }
                  {/* {casSource && casSource.map((options) => (
                    <option key={options.id} value={options.id}>
                      {options.name}
                    </option>
                  ))
                  } */}
                </Input >
              </div >
            </Col >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Col lg={5} style={{ marginRight: "20px" }}>
                <div className="mb-3">
                  {/* <TODO>Add handlechange and update cascode</TODO> */}
                  <Input
                    name="casCode"
                    type="text"
                    placeholder="CAS Code"
                    value={casCode}
                    onChange={handleChange}
                  />
                </div>
              </Col>
              <Col lg={5} style={{ marginRight: "20px" }}>
                <div className="mb-3">
                  <Input
                    name="serviceID"
                    type="text"
                    placeholder="Service ID"
                    value={serviceId}
                    onChange={handleChange}
                  />
                </div>
              </Col>
              <Col lg={2}>
                <div className="mb-3">
                  <button
                    type="button"
                    className="btn btn-primary "
                    onClick={updateCasList}
                  >
                    <i
                      className="bx bx-right-arrow-alt"
                      style={{ fontSize: 20 }}
                    ></i>
                  </button>
                </div>
              </Col>
            </div>
          </Col >

          <Col lg={6}>
            <TableContainer
              isPagination={true}
              columns={columns}
              data={data}
              // isGlobalFilter={true}
              // isShowingPageLength={true}
              // customPageSize={50}
              tableClass="table align-middle table-nowrap table-hover"
              theadClass="table-light"
              paginationDiv="col-sm-12 col-md-7"
              pagination="pagination pagination-rounded justify-content-end mt-4"
            />
          </Col>
        </Row >
      </CardBody >
    </Card >
  );
};

CasList.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default CasList;
