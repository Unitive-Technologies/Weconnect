import React, { useMemo, useState } from "react";
import {
  Card,
  CardBody,
  Col,
  Form,
  FormFeedback,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";
import PropTypes from "prop-types";
import TableContainer from "../../components/Common/TableContainer";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  deallotStb as onDeallotStb,
  getInventoryAllottedStb as onGetInventoryAllottedStb,
} from "/src/store/inventoryallotted/actions";

function DeallotStb(props) {
  const { isOpen, toggle, selectedAllottedStbs } = props;
  const [isChecked, setIsChecked] = useState(false);

  const dispatch = useDispatch();

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      remark: "",
      smartcard_ids: [],
    },
    validationSchema: Yup.object({
      //   remark: Yup.string().required("Enter remark"),
    }),
    onSubmit: (values) => {
      const newDeallot = {
        remark: values["remark"],
        smartcard_ids: selectedAllottedStbs.map((row) => row.id),
      };
      console.log("Deallot: " + JSON.stringify(newDeallot));
      dispatch(onDeallotStb(newDeallot));
      dispatch(onGetInventoryAllottedStb());
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
        Header: "*",
        disableFilters: true,
        filterable: true,
        Cell: () => {
          return (
            <input
              type="checkbox"
              checked={isChecked}
              onClick={() => setIsChecked(!isChecked)}
            />
          );
        },
      },
      {
        Header: "#",
        disableFilters: true,
        filterable: true,
        Cell: (cellProps) => {
          const totalRows = cellProps.rows.length;
          const reverseIndex = totalRows - cellProps.row.index;
          return (
            <>
              <h5 className="font-size-14 mb-1">{reverseIndex}</h5>
            </>
          );
        },
      },
      {
        Header: "STB No.",
        accessor: "stbno",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <>
              <h5 className="font-size-14 mb-1">
                {cellProps.row.original.stbno}
              </h5>
            </>
          );
        },
      },
      {
        Header: "Allotted to",
        accessor: "operator_lbl",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <>
              <h5 className="font-size-14 mb-1">
                {cellProps.row.original.operator_lbl}
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
      role="dialog"
      size="xl"
      autoFocus={true}
      centered={true}
      className="exampleModal"
      tabIndex="-1"
      toggle={toggle}
    >
      <ModalHeader toggle={toggle}>Allot STBs to Operator</ModalHeader>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          validation.handleSubmit();
          return false;
        }}
      >
        <ModalBody>
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <TableContainer
                    isPagination={true}
                    columns={columns}
                    data={selectedAllottedStbs}
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
        </ModalBody>
        <Row>
          <Col>
            <ModalFooter>
              <button type="submit" className="btn btn-success save-user">
                DE-ALLOT STB
              </button>
            </ModalFooter>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}

DeallotStb.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
  selectedAllottedStbs: PropTypes.array,
};

export default DeallotStb;
