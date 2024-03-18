import React, { useMemo, useState, useEffect } from "react";
import PropTypes from "prop-types";
import TableContainer from "../../../components/Common/TableContainer";
import {
  Card,
  CardBody,
  Col,
  Input,
  Row,
  Toast,
  ToastHeader,
  ToastBody,
  Table,
  CardFooter,
} from "reactstrap";
import { Link } from "react-router-dom";
import ViewChannelsTableList from "./ViewChannelsTableList";

const ViewChannels = (props) => {
  const {
    showEditChannel,
    data,
    setTotalChannelsInChannels,
    setTotalPackageRateInChannels,
    totalChannelsInChannels,
    totalPackageRateInChannels,
  } = props;
  // console.log("data in viewchannels:" + JSON.stringify(data));
  const columns = useMemo(
    () => [
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
                  {"Name"}
                </Link>
              </h5>
            </>
          );
        },
      },
      {
        Header: "Broadcaster",
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
                  {"Broadcaster"}
                </Link>
              </h5>
            </>
          );
        },
      },
      {
        Header: "Type",
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
                  {"Type"}
                </Link>
              </h5>
            </>
          );
        },
      },
      {
        Header: "Channel Count",
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
                  {"Channel Count"}
                </Link>
              </h5>
            </>
          );
        },
      },
      {
        Header: "FTA",
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
                  {"FTA"}
                </Link>
              </h5>
            </>
          );
        },
      },
      {
        Header: "Rate",
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
                  {"rate"}
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
                  {"$"}
                </Link>
              </h5>
            </>
          );
        },
      },
    ],
    []
  );

  const [showViewChannelsPlus, setShowViewChannelsPlus] = useState(false);

  const handleViewChannelsPlus = () => {
    setShowViewChannelsPlus(!showViewChannelsPlus);
  };

  const columns1 = useMemo(
    () => [
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
                  {"Total Channels:"}
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
                {"Total"}
              </Link>
            </h5>
          );
        },
      },
    ],
    []
  );

  useEffect(() => {
    let totalRate = 0;
    if (data) {
      data.forEach((item) => {
        const rate = parseFloat(item.broadcasterRate);

        if (!isNaN(rate)) {
          totalRate += rate;
          setTotalPackageRateInChannels(totalRate);
        }
      });
      setTotalChannelsInChannels(data.length);
    }
  }, [data]);
  return (
    <Card>
      <CardBody>
        <Row>
          <Col lg={10}></Col>
          <Col lg={2}>
            <div className="mb-3">
              <button
                disabled={!showEditChannel}
                type="button"
                onClick={handleViewChannelsPlus}
                className="btn btn-primary d-flex justify-content-end"
              >
                <i className="mdi mdi-plus ms-1" style={{ fontSize: 20 }}></i>
              </button>
            </div>
          </Col>
        </Row>
        <ViewChannelsTableList
          isOpen={showViewChannelsPlus}
          handleAddChannelsTable={() => setShowViewChannelsPlus(false)}
        />
        {/* <div
          className="position-fixed top-0 end-0 p-3"
          style={{ zIndex: "1005" }}
        >
          <Toast isOpen={showViewChannelsPlus}>
            <ToastHeader toggle={handleViewChannelsPlus}>
              <i className="mdi mdi-alert-outline me-2"></i> Warning
            </ToastHeader>
            <ToastBody>Please select package definition</ToastBody>
          </Toast>
        </div> */}

        {/* <TableContainer
          isPagination={true}
          columns={columns}
          data={data}
          tableClass="table align-middle table-nowrap table-hover"
          theadClass="table-light"
          paginationDiv="col-sm-12 col-md-7"
          pagination="pagination pagination-rounded justify-content-end mt-4"
        /> */}
        <Table
          className="table mb-0"
          style={{
            minHeight: "200px",
            maxHeight: "200px",
            overflowY: "hidden",
          }}
        >
          <thead>
            <tr>
              <th
                style={{
                  maxWidth: 10,
                }}
              >
                #
              </th>
              <th>Name</th>
              <th>BroadCaster</th>
              <th>Type</th>
              <th>Alacarte</th>
              <th>FTA</th>
              <th>Rate</th>
              <th>$</th>
            </tr>
          </thead>
          {data && (
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <th
                    scope="row"
                    style={{
                      maxWidth: 10,
                    }}
                  >
                    {index + 1}
                  </th>
                  <td
                    style={{
                      maxWidth: 100,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {item.name}
                  </td>
                  <td
                    style={{
                      maxWidth: 50,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {item.broadcaster_lbl}
                  </td>
                  <td>{item.channel_type_lbl}</td>
                  <td>{item.isAlacarte_lbl}</td>
                  <td>{item.isFta_lbl}</td>
                  <td
                    style={{
                      maxWidth: 50,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {" "}
                    <td>{parseFloat(item.broadcasterRate).toFixed(2)}</td>
                  </td>
                  <td>
                    <h5>
                      <Link
                        className="text-dark"
                        to="#"
                        onClick={() => deleteChannel(index)}
                      >
                        <i
                          className="mdi mdi-delete font-size-18"
                          id="deletetooltip"
                        />
                      </Link>
                    </h5>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </Table>
      </CardBody>
      <CardFooter className="fixed">
        <div style={{ display: "flex" }}>
          <Row
            style={{
              border: "1px solid #ced4da",
              padding: "5px 0px",
              margin: "1px 0px",
              width: "450px",
              height: "50px",
              display: "flex",
            }}
          >
            <div
              style={{
                backgroundColor: "#fff",
                padding: "10px",
                width: "100%",
                boxSizing: "border-box",
              }}
            >
              <h6 style={{ textAlign: "left", margin: 0 }}>
                Total Channels: {totalChannelsInChannels}
              </h6>
            </div>
          </Row>
          <Row
            style={{
              border: "1px solid #ced4da",
              padding: "5px 0px",
              margin: "1px 0px",
              width: "250px",
              display: "flex",
            }}
          >
            <div
              style={{
                backgroundColor: "#fff",
                padding: "10px",
                width: "100%",
                boxSizing: "border-box",
              }}
            >
              <h6 style={{ textAlign: "center", margin: 0 }}>
                Total: {parseFloat(totalPackageRateInChannels).toFixed(2)}
              </h6>
            </div>
          </Row>
        </div>
      </CardFooter>
    </Card>
  );
};

ViewChannels.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default ViewChannels;
