import React, { useEffect, useState, useRef, useMemo } from "react";
import PropTypes from "prop-types";
import TableContainer from "../../../components/Common/TableContainer";
import {
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Label,
  FormFeedback,
  UncontrolledTooltip,
  Input,
  Form,
  CardTitle,
  CardSubtitle,
} from "reactstrap";
import { Link } from "react-router-dom";
import Dropzone from "react-dropzone";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";

const BulkAddCreditModal = (props) => {
  const { isOpen, toggle } = props;
  const dispatch = useDispatch();
  const lco = [];
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
                onClick={() => {
                  const userData = cellProps.row.original;
                  toggleViewModal(userData);
                }}
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
        Header: "Code",
        // accessor: "login",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <>
              <h5 className="font-size-14 mb-1">
                <Link className="text-dark" to="#">
                  {cellProps.row.original.username}
                </Link>
              </h5>
            </>
          );
        },
      },
      {
        Header: "Distributor",
        // accessor: "status",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <>
              <h5 className="font-size-14 mb-1">
                <Link className="text-dark" to="#">
                  {cellProps.row.original.status}
                </Link>
              </h5>
            </>
          );
        },
      },
      {
        Header: "Regional Office",
        // accessor: "type",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <>
              <h5 className="font-size-14 mb-1">
                <Link className="text-dark" to="#">
                  {cellProps.row.original.status}
                </Link>
              </h5>
            </>
          );
        },
      },
      {
        Header: "Balance",
        // accessor: "role",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <>
              <h5 className="font-size-14 mb-1">
                <Link className="text-dark" to="#">
                  {cellProps.row.original.balance}
                </Link>
              </h5>
            </>
          );
        },
      },
    ],
    []
  );

  const selOperColumn = useMemo(
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
                onClick={() => {
                  const userData = cellProps.row.original;
                  toggleViewModal(userData);
                }}
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
        Header: "Code",
        // accessor: "login",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <>
              <h5 className="font-size-14 mb-1">
                <Link className="text-dark" to="#">
                  {cellProps.row.original.username}
                </Link>
              </h5>
            </>
          );
        },
      },
      {
        Header: "Distributor",
        // accessor: "status",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <>
              <h5 className="font-size-14 mb-1">
                <Link className="text-dark" to="#">
                  {cellProps.row.original.status}
                </Link>
              </h5>
            </>
          );
        },
      },
      {
        Header: "Regional Office",
        // accessor: "type",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <>
              <h5 className="font-size-14 mb-1">
                <Link className="text-dark" to="#">
                  {cellProps.row.original.status}
                </Link>
              </h5>
            </>
          );
        },
      },
    ],
    []
  );
  return (
    <Modal
      isOpen={isOpen}
      size="xl"
      role="dialog"
      autoFocus={true}
      centered={true}
      className="exampleModal"
      tabIndex="-1"
      toggle={toggle}
    >
      <ModalHeader toggle={toggle} tag="h4">
        Bulk Add Credit to LCO
      </ModalHeader>
      <ModalBody>
        <Card>
          <CardBody>
            {/* {console.log("user in bulk:" + JSON.stringify(lco))} */}
            <Row>
              <Col lg={4}>
                <div className="mb-3">
                  <Label className="form-label">Credit Amount</Label>
                  <Input
                    name="credit"
                    label="Credit Amount"
                    placeholder="Enter Credit Amount"
                    type="number"
                    // onChange={validation.handleChange}
                    // onBlur={validation.handleBlur}
                    // value={validation.values.mobile_no || ""}
                    // invalid={
                    //   validation.touched.mobile_no &&
                    //   validation.errors.mobile_no
                    //     ? true
                    //     : false
                    // }
                  />
                  {/* {validation.touched.mobile_no &&
                  validation.errors.mobile_no ? ( */}
                  <FormFeedback type="invalid">
                    {/* {validation.errors.mobile_no} */}
                  </FormFeedback>
                  {/* ) : null} */}
                </div>
              </Col>
              <Col lg={4}>
                <div className="mb-3">
                  <Label className="form-label">Remark</Label>
                  <Input
                    name="remark"
                    label="Remark"
                    placeholder="Enter Remark"
                    type="textarea"
                    // onChange={validation.handleChange}
                    // onBlur={validation.handleBlur}
                    // value={validation.values.phone_no || ""}
                    // invalid={
                    //   validation.touched.phone_no && validation.errors.phone_no
                    //     ? true
                    //     : false
                    // }
                  />
                  {/* {validation.touched.phone_no && validation.errors.phone_no ? ( */}
                  <FormFeedback type="invalid">
                    {/* {validation.errors.phone_no} */}
                  </FormFeedback>
                  {/* ) : null} */}
                </div>
              </Col>
            </Row>
            <TableContainer
              isPagination={true}
              columns={columns}
              data={lco}
              //   isGlobalFilter={true}
              isShowingPageLength={true}
              customPageSize={50}
              tableClass="table align-middle table-nowrap table-hover"
              theadClass="table-light"
              paginationDiv="col-sm-12 col-md-7"
              pagination="pagination pagination-rounded justify-content-end mt-4"
            />
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
              <h5 style={{}}>Agreement</h5>
            </div>
            <Row
              style={{
                position: "relative",
                border: "1px solid #ced4da",
                padding: "20px 0px",
                margin: "30px 0px",
              }}
            >
              <Col lg={12}>
                <TableContainer
                  isPagination={true}
                  columns={selOperColumn}
                  data={lco}
                  //   isGlobalFilter={true}
                  isShowingPageLength={true}
                  customPageSize={50}
                  tableClass="table align-middle table-nowrap table-hover"
                  theadClass="table-light"
                  paginationDiv="col-sm-12 col-md-7"
                  pagination="pagination pagination-rounded justify-content-end mt-4"
                />
              </Col>
            </Row>
          </CardBody>
        </Card>
      </ModalBody>
      <ModalFooter>
        <button type="submit" className="btn btn-success save-user">
          Save
        </button>
        <button
          type="button"
          className="btn btn-outline-danger"
          onClick={() => {
            validation.resetForm();
            closeEditModal();
          }}
        >
          Cancel
        </button>
      </ModalFooter>
    </Modal>
  );
};

BulkAddCreditModal.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default BulkAddCreditModal;
