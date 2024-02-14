import React, { useEffect, useState, useRef, useMemo } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import {
  // getUserType as onGetUserType,
  // getUserStatus as onGetUserStatus,
  // getUserRole as onGetUserRole,
  // getUserDesignation as onGetUserDesignation,
  // getUserMsoPolicy as onGetUserMsoPolicy,
  getUserRegionalOffice as onGetUserRegionalOffice,
  getUserMsoDetails as onGetUserMsoDetails,
  getUserDistributor as onGetUserDistributor,
  getUserLco as onGetUserLco,
} from "/src/store/users/actions";
import {
  Col,
  Row,
  Modal,
  ModalFooter,
  ModalHeader,
  ModalBody,
  Label,
  FormFeedback,
  Input,
  Form,
  Card,
  CardBody,
  Table,
} from "reactstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import TableContainer from "../../../../components/Common/TableContainer";

const AddOrUpdateCommission = (props) => {
  const { isOpen, toggleAddOrUpdateModal, selectedRows, selectedRowId } = props;
  console.log(
    "selected Rows in Add Commission:" + JSON.stringify(selectedRows)
  );
  const API_URL = "https://sms.unitch.in/api/index.php/v1";

  const [commision, setCommision] = useState("");
  const [finalSelectedRow, setFinalSelectedRow] = useState([]);
  const handleRowSelection = (row) => {
    console.log("Row clicked:", row.original);
    const selectedId = row.original.id;
    console.log("selectedId:", selectedId);
    setFinalSelectedRow((prevSelectedRows) => {
      const isSelected = prevSelectedRows.includes(selectedId);
      if (isSelected) {
        return prevSelectedRows.filter((id) => id !== selectedId);
      } else {
        return [...prevSelectedRows, selectedId];
      }
    });

    console.log("selectedRows:", JSON.stringify(selectedRows));
  };
  const columns = useMemo(
    () => [
      {
        Header: "*",
        disableFilters: true,
        filterable: true,
        Cell: (cellProps) => (
          <input
            type="checkbox"
            onClick={() => handleRowSelection(cellProps.row)}
            // checked={selectedRows.some(
            //   (r) => r.id === cellProps.row.original.id
            // )}
          />
        ),
      },
      {
        Header: "#",
        // accessor: "name",
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
        accessor: "name",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <>
              <h5
                className="font-size-14 mb-1"
                style={{
                  maxWidth: 200,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
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
        accessor: "code",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">{cellProps.row.original.code}</p>
          );
        },
      },
      {
        Header: "Commission(%)",
        accessor: "addr",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              {cellProps.row.original.commision}
            </p>
          );
        },
      },
      {
        Header: "Type",
        accessor: "contact_person",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              {cellProps.row.original.boxtype_lbl}
            </p>
          );
        },
      },
      {
        Header: "Bouquet Type",
        accessor: "mobile_no",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">{cellProps.row.original.type_lbl}</p>
          );
        },
      },
      {
        Header: "Status",
        accessor: "state_lbl",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              {cellProps.row.original.status_lbl}
            </p>
          );
        },
      },
      {
        Header: "Is Refundable",
        accessor: "District_lbl",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              {cellProps.row.original.is_refundable === 1 ? "Yes" : "No"}
            </p>
          );
        },
      },
      {
        Header: "Allotted By",
        accessor: "city_lbl",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              {cellProps.row.original.created_by_lbl}
            </p>
          );
        },
      },
    ],
    []
  );

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      commision: "",
    },

    validationSchema: Yup.object({
      commision: Yup.string().required("Please Enter Commission"),
    }),
    onSubmit: async (values) => {
      try {
        const selectedRowsToAddOrUpdate = {
          operator_id: selectedRowId,
          bouque_ids: finalSelectedRow,
          commision: values["commision"],
        };

        console.log("newUpload:", JSON.stringify(selectedRowsToAddOrUpdate));

        const token = "Bearer " + localStorage.getItem("temptoken");

        const response = await axios.post(
          `${API_URL}/operator-bouque?vr=web1.0`,
          selectedRowsToAddOrUpdate,
          {
            headers: {
              Authorization: token,
            },
          }
        );

        console.log("response after submitting remove form:", response.data);
        toggleAddOrUpdateModal();
      } catch (error) {
        console.error("Error submitting remove form:", error);
      }
    },
    onReset: (values) => {
      validation.setValues(validation.initialValues);
    },
  });

  return (
    <Modal
      isOpen={isOpen}
      role="dialog"
      size="xl"
      autoFocus={true}
      centered={true}
      className="exampleModal"
      tabIndex="-1"
      toggle={toggleAddOrUpdateModal}
    >
      <ModalHeader tag="h4" toggle={toggleAddOrUpdateModal}>
        Add / Update Commmission
      </ModalHeader>
      <ModalBody>
        <Row>
          <Col lg="12">
            <Card>
              <CardBody>
                <TableContainer
                  isPagination={true}
                  columns={columns}
                  data={selectedRows}
                  isGlobalFilter={true}
                  isShowingPageLength={true}
                  customPageSize={50}
                  tableClass="table align-middle table-nowrap table-hover"
                  theadClass="table-light"
                  paginationDiv="col-sm-12 col-md-7"
                  pagination="pagination pagination-rounded justify-content-end mt-4"
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            validation.handleSubmit();
            return false;
          }}
        >
          <Row>
            <Col lg={4}>
              <div className="mb-3">
                <Label className="form-label">
                  Commission<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="commision"
                  type="number"
                  placeholder="Insert Commission"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.commision || ""}
                  invalid={
                    validation.touched.commision && validation.errors.commision
                      ? true
                      : false
                  }
                />
                {validation.touched.commision && validation.errors.commision ? (
                  <FormFeedback type="invalid">
                    {validation.errors.commision}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
          </Row>

          <Row>
            <Col>
              <ModalFooter>
                <button type="submit" className="btn btn-success save-user">
                  Add/Update Commission
                </button>
              </ModalFooter>
            </Col>
          </Row>
        </Form>
      </ModalBody>
    </Modal>
  );
};

AddOrUpdateCommission.propTypes = {
  isOpen: PropTypes.bool,
  toggleAddOrUpdateModal: PropTypes.func,
};
export default AddOrUpdateCommission;
