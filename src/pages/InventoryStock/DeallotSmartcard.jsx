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
  deallotSmartcard as onDeallotSmartcard,
  getInventoryAllottedSmartcard as onGetInventoryAllottedSmartcard,
} from "/src/store/inventoryallotted/actions";

function DeallotSmartcard(props) {
  const {
    isOpen,
    toggle,
    selectedAllottedSmartcards,
    setSelectedAllottedSmartcards,
  } = props;
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
        smartcard_ids: selectedAllottedSmartcards.map((row) => row.id),
      };
      console.log("Deallot: " + JSON.stringify(newDeallot));
      dispatch(onDeallotSmartcard(newDeallot));
      dispatch(onGetInventoryAllottedSmartcard());
      validation.resetForm();
      setSelectedAllottedSmartcards([]);
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
        Header: "Smartcard No.",
        accessor: "smartcardno",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <>
              <h5 className="font-size-14 mb-1">
                {cellProps.row.original.smartcardno}
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
      <ModalHeader toggle={toggle}>De-Allot Smartcards to Operator</ModalHeader>
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
                    data={selectedAllottedSmartcards}
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
                DE-ALLOT SMARTCARD
              </button>
            </ModalFooter>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}

DeallotSmartcard.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
  selectedAllottedSmartcards: PropTypes.array,
  setSelectedAllottedSmartcards: PropTypes.func,
};

export default DeallotSmartcard;
