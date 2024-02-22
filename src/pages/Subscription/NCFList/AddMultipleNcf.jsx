import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import TableContainer from "../../../components/Common/TableContainer";
import {
  Card,
  CardBody,
  Row,
  Col,
  Input,
  Label,
  Table,
  FormFeedback,
  Form,
} from "reactstrap";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";

const AddMultipleNcf = ({ setAdditionalRates, additionalRates, mrp }) => {
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
                  {cellProps.row.original.name}
                </Link>
              </h5>
            </>
          );
        },
      },
      {
        Header: "MRP",
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
                  {cellProps.row.original.mrp}
                </Link>
              </h5>
            </>
          );
        },
      },
      {
        Header: "LCO Discount(%)",
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
                  {cellProps.row.original.lco_discount}
                </Link>
              </h5>
            </>
          );
        },
      },
      {
        Header: "LCO Rate(%)",
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
                  {cellProps.row.original.lco_rate}
                </Link>
              </h5>
            </>
          );
        },
      },
      {
        Header: "Calculate per Channel",
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
                  {cellProps.row.original.calculate_per_channel}
                </Link>
              </h5>
            </>
          );
        },
      },
      {
        Header: "Is Refundable",
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
                  {cellProps.row.original.is_refundable}
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
                <Link
                  className="text-dark"
                  to="#"
                  onClick={() => deleteMultipleNcf(index)}
                >
                  <i
                    className="mdi mdi-delete font-size-18"
                    id="deletetooltip"
                  />
                </Link>
              </h5>
            </>
          );
        },
      },
    ],
    []
  );

  console.log("additionalRates:" + JSON.stringify(additionalRates));
  console.log("mrpppppppppppppp:" + mrp);

  const [name, setName] = useState("");
  const [discount, setDiscount] = useState(0);
  const [rate, setRate] = useState(0);
  const [perChannel, setPerChannel] = useState("0");
  const [refundable, setRefundable] = useState("1");

  const handleChangeDiscount = (e) => {
    const discountValue = e.target.value;

    setDiscount(discountValue);
    const calculatedRate = (mrp * discountValue) / 100;
    setRate(calculatedRate);
  };

  const handleChangeRate = (e) => {
    const rateValue = e.target.value;

    setRate(rateValue);

    const revisedDiscount = (rateValue * 100) / mrp;
    setDiscount(revisedDiscount);
  };

  const addMultipleNcf = () => {
    if (!name || !discount || !rate) {
      return;
    }

    const newRates = {
      name: name,
      mrp: mrp,
      lmo_discount: parseInt(discount),
      lmo_rate: rate,
      calculate_per_channel: parseInt(perChannel),
      is_refundable: parseInt(refundable),
    };

    const updatedData = [...additionalRates, newRates];
    console.log("Updated Data in additionalNCF" + updatedData);
    setAdditionalRates(updatedData);

    setName("");
    setDiscount(0);
    setRate(0);
  };

  const deleteMultipleNcf = (index) => {
    const list = [...additionalRates];
    list.splice(index, 1);
    setAdditionalRates(list);
  };
  return (
    <>
      <Row
        style={{
          position: "relative",
          border: "1px solid #ced4da",
          padding: "20px 0px",
          margin: "30px 0px",
        }}
      >
        <Col sm="2">
          <div className="mb-3">
            <Label className="form-label">
              Name<span style={{ color: "red" }}>*</span>
            </Label>
            <Input
              name="name"
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </Col>
        <Col sm="2">
          <div className="mb-3">
            <Label className="form-label">
              MRP (INR)<span style={{ color: "red" }}>*</span>
            </Label>
            <Input
              name="mrp"
              type="number"
              placeholder="0"
              value={mrp}
              disabled
            />
          </div>
        </Col>
        <Col sm="2">
          <div className="mb-3">
            <Label className="form-label">
              LCO Discount (%)<span style={{ color: "red" }}>*</span>
            </Label>
            <Input
              name="discount"
              type="number"
              placeholder="0"
              onChange={handleChangeDiscount}
              value={discount}
            />
          </div>
        </Col>
        <Col sm="1">
          <div className="mb-3">
            <Label className="form-label">
              LCO Rate<span style={{ color: "red" }}>*</span>
            </Label>
            <Input
              name="rate"
              type="number"
              placeholder="0"
              value={rate}
              onChange={handleChangeRate}
            />
          </div>
        </Col>
        <Col sm="2">
          <div className="mb-3">
            <Label className="form-label">
              Calculate per channel<span style={{ color: "red" }}>*</span>
            </Label>
            <Input
              name="calculate_per_channel"
              type="select"
              placeholder="Select calculate per channel"
              className="form-select"
              value={perChannel}
              onChange={(e) => setPerChannel(e.target.value)}
            >
              <option value="0">No</option>
              <option value="1">Yes</option>
            </Input>
          </div>
        </Col>
        <Col sm="2">
          <div className="mb-3">
            <Label className="form-label">
              Is Refundable<span style={{ color: "red" }}>*</span>
            </Label>
            <Input
              name="refundable"
              type="select"
              placeholder="Select refundable"
              className="form-select"
              value={refundable}
              onChange={(e) => setRefundable(e.target.value)}
            >
              <option value="1">Yes</option>
              <option value="0">No</option>
            </Input>
          </div>
        </Col>
        <Col sm="1">
          <button
            type="button"
            className="btn btn-primary "
            onClick={addMultipleNcf}
          >
            <i className="bx bx-right-arrow-alt" style={{ fontSize: 20 }}></i>
          </button>
        </Col>
        {/* </Form> */}
      </Row>

      <Row>
        <Card>
          <CardBody>
            <div className="table-responsive">
              <Table className="table mb-0">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>MRP</th>
                    <th>LCO Discount(%)</th>
                    <th>LCO Rate</th>
                    <th>Calcuate Per Channel</th>
                    <th>Is Refundable</th>
                    <th>$</th>
                  </tr>
                </thead>
                <tbody>
                  {additionalRates &&
                    additionalRates.map((item, index) => (
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{item.name}</td>
                        <td>{item.mrp}</td>
                        <td>{item.lmo_discount}</td>
                        <td>{item.lmo_rate}</td>
                        <td>
                          {item.calculate_per_channel === "1" ? "Yes" : "No"}
                        </td>
                        <td>{item.is_refundable === "1" ? "Yes" : "No"}</td>
                        <td>
                          <h5>
                            <Link
                              className="text-dark"
                              to="#"
                              onClick={() => deleteMultipleNcf(index)}
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
              </Table>
            </div>
          </CardBody>
        </Card>
      </Row>
    </>
  );
};

AddMultipleNcf.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default AddMultipleNcf;
