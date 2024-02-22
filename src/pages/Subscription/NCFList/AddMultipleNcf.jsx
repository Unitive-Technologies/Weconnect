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

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      name: "",
      mrp: mrp,
      lmo_discount: 0,
      lmo_rate: 0,
      calculate_per_channel: 0,
      is_refundable: 1,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Enter name"),
    }),
    onSubmit: (values) => {
      const newNcf = {
        id: index + 1,
        name: values["name"],
        mrp: values["mrp"],
        lmo_discount: values["lmo_discount"],
        lmo_rate: values["lmo_rate"],
        calculate_per_channel: values["calculate_per_channel"],
        is_refundable: values["is_refundable"],
      };
      console.log("New NCF:" + JSON.stringify(newNcf));
      const updatedData = [...data, newNcf];
      setAdditionalRates(updatedData);
      validation.resetForm();
    },
    onReset: (values) => {
      validation.setValues(validation.initialValues);
    },
  });
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
            <TableContainer
              isPagination={true}
              columns={columns}
              data={additionalRates && additionalRates}
              // isGlobalFilter={true}
              isShowingPageLength={true}
              // customPageSize={50}
              tableClass="table align-middle table-nowrap table-hover"
              theadClass="table-light"
              paginationDiv="col-sm-12 col-md-7"
              pagination="pagination pagination-rounded justify-content-end mt-4"
            />
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
