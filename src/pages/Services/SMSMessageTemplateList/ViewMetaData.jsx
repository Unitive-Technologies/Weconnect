import React, { useMemo } from "react";
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
import * as Yup from "yup";

import { useFormik } from "formik";
import { addNewSMSMessageTempList as onAddNewSMSMessageTempList } from "/src/store/smsmessage/actions";
import { Link } from "react-router-dom";

const ViewMetaData = (props) => {
  const { showEditChannel } = props;

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      //BroadCaster: "",
      type: "",
      field: "",
      label: "",
      created_by: "Admin",
    },
    validationSchema: Yup.object({
      type: Yup.string().required("Enter Select type"),
      field: Yup.string().required("Enter Select field"),
      label: Yup.string().required("Enter Select label"),
      // serviceid: Yup.string().required("serviceid"),
    }),
    onSubmit: (values) => {
      const newSMSMessageTemplateList = {
        id: Math.floor(Math.random() * (30 - 20)) + 20,
        type: values["type"],
        field: values["field"],
        label: values["label"],
        created_at: new Date(),
        created_by: values["created_by"],
      };
      console.log("newSMSMessageTempList:" + newSMSMessageTemplateList);
      // save new user
      dispatch(onAddNewSMSMessageTempList(newSMSMessageTemplateList));
      validation.resetForm();
      toggle();
    },
    onReset: (values) => {
      validation.setValues(validation.initialValues);
    },
  });

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
        Header: "Type",
        accessor: "cas",
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
        Header: "Field",
        accessor: "field",
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
                  {"Field"}
                </Link>
              </h5>
            </>
          );
        },
      },
      {
        Header: "Label",
        accessor: "cascode",
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
                  {"Label"}
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

  const casData = [];
  return (
    <Card>
      <CardBody>
        <Row>
          <Col lg={3}>
            <div className="mb-3">
              <Input
                name="type"
                type="select"
                placeholder="Select type"
                className="form-select"
                // disabled={!showEditChannel}
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values.type || ""}
              >
                <option value="104">Select CAS</option>
                <option value="105">FTA</option>
              </Input>
              {validation.touched.type && validation.errors.type ? (
                <FormFeedback type="invalid">
                  {validation.errors.type}
                </FormFeedback>
              ) : null}
            </div>
          </Col>
          <Col lg={3}>
            <div className="mb-3">
              <Input
                s name="field"
                type="text"
                placeholder="Enter field"
                // className="form-select"
                disabled={!showEditChannel}
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values.field || ""}
              >
                <option value="104">Select CAS</option>
                <option value="105">FTA</option>
              </Input>
              {validation.touched.field && validation.errors.field ? (
                <FormFeedback type="invalid">
                  {validation.errors.field}
                </FormFeedback>
              ) : null}
            </div>
          </Col>
          <Col lg={3}>
            <div className="mb-3">
              <Input
                name="label"
                type="text"
                placeholder="Enter label"
                // className="form-select"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values.label || ""}
              ></Input>
              {validation.touched.label && validation.errors.label ? (
                <FormFeedback type="invalid">
                  {validation.errors.label}
                </FormFeedback>
              ) : null}
            </div>
          </Col>
          <Col lg={3}>
            <div className="mb-3">
              <button type="submit" className="btn btn-primary ">
                <i
                  className="bx bx-right-arrow-alt"
                  style={{ fontSize: 20 }}
                ></i>
              </button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col lg={12}>
            <TableContainer
              isPagination={true}
              columns={columns}
              data={casData}
              // isGlobalFilter={true}
              // isShowingPageLength={true}
              // customPageSize={50}
              tableClass="table align-middle table-nowrap table-hover"
              theadClass="table-light"
              paginationDiv="col-sm-12 col-md-7"
              pagination="pagination pagination-rounded justify-content-end mt-4"
            />
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

ViewMetaData.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default ViewMetaData;
