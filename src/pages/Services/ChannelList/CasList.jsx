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

  console.log("Cas List Data" + JSON.stringify(data))

  const updateCasList = () => {
    if (!casSelection || !casCode || !serviceId) {
      return;
    }

    const newItem = {
      cas_id: data.length + 1,
      casSelection: casSelection,
      casCode: casCode,
      serviceId: serviceId,
    };

    const updatedData = [...data, newItem];
    console.log("Updated Data in CasList" + updatedData)
    updateList(updatedData);


    setCasSelection("");
    setCasCode("");
    setServiceId("");
  };


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
        accessor: "cas_id",
        disableFilters: true,
        // filterable: true,
        Cell: (cellProps) => {
          const totalRows = cellProps.rows.length;
          const index = startIndex + cellProps.row.index + 1;
          return (
            <>
              <p className="text-dark">
                {/* {index} */}
                {cellProps.row.original.cas_id}
              </p>
            </>
          );
        },
      },

      {
        Header: "CAS",
        accessor: "casSelection",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              {cellProps.row.original.casSelection}
            </p>
          );
        },
      },
      {
        Header: "CAS CODE",
        accessor: "casCode",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              {cellProps.row.original.casCode}
            </p>
          );
        },
      },
      {
        Header: "Service ID",
        accessor: "serviceId",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              {cellProps.row.original.serviceId}
            </p>
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

  // const casData = [data];
  const [casSelection, setCasSelection] = useState("");
  const [casCode, setCasCode] = useState("");
  const [serviceId, setServiceId] = useState("");

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   if (name === "casSelection") {
  //     setCasSelection(value);
  //   } else if (name === "casCode") {
  //     setCasCode(value);
  //   } else if (name === "serviceId") {
  //     setServiceId(value);
  //   }
  // };

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
                  name="casSelection"
                  type="select"
                  placeholder="Select CAS"
                  className="form-select"
                  value={casSelection}
                  // onChange={(e) => setCasSelection(e.target.value)}
                  onChange={(e) => setCasSelection(e.target.value)}
                >
                  <option value="">Select cascode</option>
                  {channelListCascode &&
                    channelListCascode.map((options) => (
                      <option key={options.id} value={options.id}>
                        {options.name}
                      </option>
                    ))}
                </Input>
                {/* {casSource && casSource.map((options) => (
                    <option key={options.id} value={options.id}>
                      {options.name}
                    </option>
                  ))
                  } */}

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
                    onChange={(e) => setCasCode(e.target.value)}
                  />
                </div>
              </Col>
              <Col lg={5} style={{ marginRight: "20px" }}>
                <div className="mb-3">
                  <Input
                    name="serviceId"
                    type="text"
                    placeholder="service id"
                    value={serviceId}
                    onChange={(e) => setServiceId(e.target.value)}
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
          {console.log("Cas List table Data" + JSON.stringify(data))}
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
  handleUpdateCasList: PropTypes.func,
  isOpen: PropTypes.bool,
  channelListCascode: PropTypes.array,
  data: PropTypes.array,
};

export default CasList;
