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
  Table,
} from "reactstrap";
import * as Yup from "yup";

import { useFormik } from "formik";
import { addNewPackageList as onAddNewPackageList } from "/src/store/packagelist/actions";
import { Link } from "react-router-dom";

const ViewCasList = (props) => {
  const { data, showEditChannel } = props;
  console.log("data in viewcaslist:" + JSON.stringify(data));
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      //BroadCaster: "",
      cas: "",
      cascode: "",
      created_by: "Admin",
    },
    validationSchema: Yup.object({
      cas: Yup.string().required("Enter Select Cas"),
      cascode: Yup.string().required("Enter cascode"),
      // serviceid: Yup.string().required("serviceid"),
    }),
    onSubmit: (values) => {
      const newPackageList = {
        id: Math.floor(Math.random() * (30 - 20)) + 20,
        cas: values["cas"],
        cascode: values["cascode"],
        created_at: new Date(),
        created_by: values["created_by"],
      };
      console.log("newPackageList:" + newPackageList);
      // save new user
      dispatch(onAddNewPackageList(newPackageList));
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
        accessor: "cas_id",
        disableFilters: true,
        filterable: true,
        Cell: (cellProps) => {
          const totalRows = cellProps.rows.length;
          const reverseIndex = totalRows - cellProps.row.index;

          return (
            <>
              <h5 className="font-size-14 mb-1">
                <Link className="text-dark" to="#">
                  {/* {reverseIndex} */}
                  {cellProps.row.original.cas_id}
                </Link>
              </h5>
            </>
          );
        },
      },

      {
        Header: "CAS",
        accessor: "cas_lbl",
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
                  {cellProps.row.original.cas_lbl}
                </Link>
              </h5>
            </>
          );
        },
      },
      {
        Header: "CAS CODE",
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
                  {cellProps.row.original.cascode}
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
                  name="type"
                  type="select"
                  placeholder="Select type"
                  className="form-select"
                  // disabled={!showEditChannel}
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.cas || ""}
                  disabled={!showEditChannel}
                >
                  <option value="104">Select CAS</option>
                  <option value="105">FTA</option>
                </Input>
                {validation.touched.cas && validation.errors.cas ? (
                  <FormFeedback type="invalid">
                    {validation.errors.cas}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Col lg={12} style={{ marginRight: "20px" }}>
                <div className="mb-3">
                  <Input
                    name="cascode"
                    type="text"
                    placeholder="Cascode"
                    // className="form-select"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.cascode || ""}
                    disabled={!showEditChannel}
                  ></Input>
                  {validation.touched.cascode && validation.errors.cascode ? (
                    <FormFeedback type="invalid">
                      {validation.errors.cascode}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Col lg={2}>
                <div className="mb-3">
                  <button
                    type="submit"
                    className="btn btn-primary "
                    disabled={!showEditChannel}
                  >
                    <i
                      className="bx bx-right-arrow-alt"
                      style={{ fontSize: 20 }}
                    ></i>
                  </button>
                </div>
              </Col>
            </div>
          </Col>

          <Col lg={6}>
            {/* <TableContainer
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
            /> */}
            <Table className="table mb-0">
              <thead>
                <tr>
                  <th>#</th>
                  <th>CAS</th>
                  <th>CAS CODE</th>
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
                        {item.cas_id}
                      </th>
                      <td>{item.cas_lbl}</td>
                      <td>{item.cascode}</td>
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
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

ViewCasList.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default ViewCasList;
