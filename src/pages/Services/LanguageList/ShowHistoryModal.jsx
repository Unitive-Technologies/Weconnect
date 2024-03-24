import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Modal, Table, ModalBody, ModalHeader, Row, Col, Input } from "reactstrap";
import TableContainer from "../../../components/Common/TableContainer";

const ShowHistoryModal = ({ isOpen, toggleHistoryModal, language }) => {
  console.log("Show History Modal in ReasonList" + language)

  const API_URL = "https://sms.unitch.in/api/index.php/v1";
  const [historyData, setHistoryData] = useState([]);
  const [year, setYear] = useState("2024");

  const reversedHistoryData = useMemo(() => {
    return [...historyData].reverse();
  }, [historyData]);

  const rateTableSchema = {
    subTableArrayKeyName: "nData",
    keyColumn: "id",
    columns: [
      {
        header: "Column Name",
        accessor: (rowData) => rowData.key,
      },
      {
        header: "Updated Value",
        accessor: (rowData) => {
          if (rowData.new === null) {
            return "";
          } else if (typeof rowData.new === 'string') {
            return rowData.new;
          } else {
            return JSON.stringify(rowData.new) || "0";
          }
        },
      },
      {
        header: "Previous Value",
        accessor: (rowData) => {
          if (rowData.old === null) {
            return "";
          } else if (typeof rowData.old === 'string') {
            return rowData.old;
          } else {
            return JSON.stringify(rowData.old) || "0";
          }
        },
      },
    ],
  };

  const getRateTableRendered = (rowData) => {
    return (
      <div style={{ maxHeight: "200px", overflowY: "auto" }}>
        <Table className="table mb-0">
          <thead>
            <tr>
              {rateTableSchema.columns.map((column) => (
                <th
                  key={column.header}
                  style={{ position: "sticky", top: 0, background: "white" }}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rowData[rateTableSchema.subTableArrayKeyName].map((object) => {
              return (
                <tr key={object.id}>
                  {rateTableSchema.columns.map((column) => {
                    return <td key={column.header} style={{
                      maxWidth: 100,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}>{column.accessor(object)}</td>;
                  })}
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    );
  };

  const columns = useMemo(
    () => [
      {
        Header: "#",
        disableFilters: true,
        filterable: true,
        Cell: (cellProps) => {
          const totalRows = cellProps.rows.length;
          const serialNumber = totalRows - cellProps.row.index;

          return (
            <>
              <h5 className="font-size-14 mb-1">
                <Link className="text-dark" to="#">
                  {serialNumber}
                </Link>
              </h5>
            </>
          );
        },
      },

      {
        Header: "Action",
        // accessor: "name",
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
                  {cellProps.row.original.name}
                </Link>
              </h5>
            </>
          );
        },
      },
      {
        Header: "Action By",
        // accessor: "login",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <>
              <h5 className="font-size-14 mb-1">
                <Link className="text-dark" to="#">
                  {cellProps.row.original._metadata.createdby}
                </Link>
              </h5>
            </>
          );
        },
      },
      {
        Header: "Action On",
        // accessor: "status",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <>
              <h5 className="font-size-14 mb-1">
                <Link className="text-dark" to="#">
                  {cellProps.row.original._metadata.createdOn}
                </Link>
              </h5>
            </>
          );
        },
      },
      {
        Header: "Remark",
        // accessor: "type",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <>
              <h5 className="font-size-14 mb-1" style={{
                maxWidth: 200,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}>
                <Link className="text-dark" to="#">
                  {cellProps.row.original._remark}
                </Link>
              </h5>
            </>
          );
        },
      },
    ],
    []
  );

  const getHistoryDetails = async (e) => {
    try {
      const token = "Bearer " + localStorage.getItem("temptoken");

      const response = await axios.get(
        `${API_URL}/language/${language.id
        }/audit?fields=id,name,_metadata,model,_remark&expand=nData&page=1&per-page=50&filter[year]=${parseInt(
          year
        )}&vr=web1.0`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setHistoryData(response.data.data);
      console.log("response in useEffect:" + JSON.stringify(response));
    } catch (error) {
      console.error("Error fetching history data:", error);
    }
  };
  useEffect(() => {
    if (language) {
      getHistoryDetails();
    }
  }, [language, year]);

  return (
    <Modal
      isOpen={isOpen}
      role="dialog"
      size="xl"
      autoFocus={true}
      centered={true}
      className="exampleModal"
      tabIndex="-1"
      toggle={toggleHistoryModal}
    >
      <ModalHeader toggle={toggleHistoryModal} tag="h4" position="relative">
        <h4>Language History ({language.name})</h4>
      </ModalHeader>
      <ModalBody>
        <div
          style={{
            // margin: "20px 0px",
            marginTop: "20px",
            marginBottom: "-18px",
            zIndex: 12000,
            backgroundColor: "#fff",
            width: "fit-content",
            marginLeft: "40%",
            position: "absolute",
            padding: "0px 10px",
          }}
        >
          {" "}
          <h5 style={{}}>
            History Year<span style={{ color: "red" }}>*</span>
          </h5>
        </div>
        <Row
          style={{
            position: "relative",
            border: "1px solid #ced4da",
            padding: "20px 0px",
            margin: "30px 0px",
          }}
        >
          <Col lg={4}>
            <Input
              name="year"
              type="select"
              placeholder="Select Year"
              className="form-select"
              onChange={(e) => setYear(e.target.value)}
              // onBlur={validation.handleBlur}
              value={year}
            >
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
              <option value="2021">2021</option>
              <option value="2020">2020</option>
              <option value="2019">2019</option>
              <option value="2018">2018</option>
              <option value="2017">2017</option>
              <option value="2016">2016</option>
              <option value="2015">2015</option>
              <option value="2014">2014</option>
            </Input>
          </Col>
        </Row>
        <Row>
          <Col lg={12}>
            <TableContainer
              isPagination={true}
              columns={columns}
              data={reversedHistoryData}
              //   isGlobalFilter={true}
              isShowingPageLength={true}
              customPageSize={50}
              tableClass="table align-middle table-nowrap table-hover"
              theadClass="table-light"
              paginationDiv="col-sm-12 col-md-7"
              pagination="pagination pagination-rounded justify-content-end mt-4"
              subTableEnabled={true}
              getRenderedSubTable={getRateTableRendered}
              isSubTableContentExists={(rowData) =>
                rowData.nData.length > 0
              }
            />
          </Col>
        </Row>
      </ModalBody>
    </Modal>
  );
};

export default ShowHistoryModal;
