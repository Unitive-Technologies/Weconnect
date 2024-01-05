import React, { useMemo } from "react";
import PropTypes from "prop-types";
import TableContainer from "../../../components/Common/TableContainer";
import { Card, CardBody } from "reactstrap";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  addNewComplaintSubCategory as onAddNewComplaintSubCategory,
  getComplaintSubCategory as onGetComplaintSubCategory,
} from "/src/store/actions";

const AddNewMatrix = (props) => {
  const { isOpen, complaintsubcateDesignation, handleAddSubCategory } = props;
  const dispatch = useDispatch();

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      escalations: [{
        designation: "",
        tat_time: "",
      }],
    },
    validationSchema: Yup.object({
      escalations: Yup.array().of(
        Yup.object().shape({
          designation: Yup.string().required("Enter designation"),
          tat_time: Yup.string().required("Select tat_time"),
        })
      ),
    }),
    onSubmit: (values) => {
      const newComplaintSubCategory = {
        id: Math.floor(Math.random() * (30 - 20)) + 20,
        escalations: values.escalations.map((escalation) => ({
          designation: escalation.designation,
          tat_time: escalation.tat_time,
        })),
        created_at: new Date(),
        // Make sure you have created_by available in your form or remove it
        created_by: values.created_by,
      };

      console.log("ComplaintSubCategory:", newComplaintSubCategory);
      // Save new user
      dispatch(onAddNewComplaintSubCategory(newComplaintSubCategory));
      dispatch(onGetComplaintSubCategory());
      validation.resetForm();
      handleAddSubCategory();
    },
    onReset: () => {
      validation.setValues(validation.initialValues);
    },
  });

  const columns = useMemo(
    () => [
      {
        Header: "Enabled",
        Cell: () => (
          <input
            className="form-check-input"
            type="checkbox"
            id="upcomingtaskCheck01"
          />
        ),
      },
      {
        Header: "Designation",
        accessor: "designation",
        filterable: true,
        Cell: () => (
          <h5
            style={{
              maxWidth: 200,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
            className="font-size-14 mb-1"
          >
            <p className="text-muted mb-0">
              {/* Displaying selected designation */}
              {complaintsubcateDesignation &&
                complaintsubcateDesignation.map((designation) => (
                  <span key={designation.id}>{designation.name}</span>
                ))}
            </p>
          </h5>
        ),
      },
      {
        Header: "TAT(HH:mm:ss)",
        filterable: true,
        Cell: () => (
          <input
            type="text"
            value={validation.values.tat_time || ""}
            readOnly
          />
        ),
      },
    ],
    [validation.values.tat_time, complaintsubcateDesignation]
  );

  return (
    <Card>
      <CardBody>
        <TableContainer
          isPagination={true}
          columns={columns}
          data={handleAddSubCategory}
          customPageSize={50}
          tableClass="table align-middle table-nowrap table-hover"
          theadClass="table-light"
          paginationDiv="col-sm-12 col-md-7"
          pagination="pagination pagination-rounded justify-content-end mt-4"
        />
      </CardBody>
    </Card>
  );
};

AddNewMatrix.propTypes = {
  isOpen: PropTypes.bool,
  complaintsubcateDesignation: PropTypes.array,
  handleAddSubCategory: PropTypes.func,
};

export default AddNewMatrix;
