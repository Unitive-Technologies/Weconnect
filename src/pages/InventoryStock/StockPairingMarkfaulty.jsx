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
  updateStockPairingMarkfaulty as onUpdateStockPairingMarkfaulty,
  getInventoryStockPairing as onGetInventoryStockPairing,
} from "/src/store/inventorystock/actions";
import { getInventoryFaultyPairing as onGetInventoryFaultyPairing } from "/src/store/inventoryfaulty/actions";

function StockPairingMarkfaulty(props) {
  const { isOpen, toggle, selectedPairings, pairinginventorystate } = props;
  const [isChecked, setIsChecked] = useState(true);

  const dispatch = useDispatch();

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      remark: "",
      faulty: [],
      invt_state: "",
    },
    validationSchema: Yup.object({
      remark: Yup.string().required("Enter remark"),
    }),
    onSubmit: (values) => {
      const newMarkfaulty = {
        // id: Math.floor(Math.random() * (30 - 20)) + 20,
        remark: values["remark"],
        faulty: selectedPairings.map((row) => row.id),
        invt_state: values["invt_state"],
      };
      console.log("mark faulty: " + JSON.stringify(newMarkfaulty));
      dispatch(onUpdateStockPairingMarkfaulty(newMarkfaulty));
      dispatch(onGetInventoryStockPairing());
      dispatch(onGetInventoryFaultyPairing());
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
      <ModalHeader toggle={toggle}>Mark Faulty Pairing</ModalHeader>
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
                    data={selectedPairings}
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
          <Row>
            <Col lg={3}>
              <div className="mb-3">
                <Label className="form-label">
                  Inentory state<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="invt_state"
                  type="select"
                  placeholder="Select inventory state"
                  className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.invt_state || ""}
                  invalid={
                    validation.touched.state && validation.errors.invt_state
                      ? true
                      : false
                  }
                >
                  <option value="">Select inventory state</option>
                  {pairinginventorystate.map((options) => (
                    <option key={options.id} value={options.id}>
                      {options.name}
                    </option>
                  ))}
                </Input>
                {validation.touched.invt_state &&
                validation.errors.invt_state ? (
                  <FormFeedback type="invalid">
                    {validation.errors.invt_state}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
          </Row>
          <Row>
            <Col lg="6">
              <Label>
                Remark (atleast 4 characters)
                <span style={{ color: "red" }}>*</span>
              </Label>
              <Input
                name="remark"
                type="textarea"
                placeholder="Enter remark"
                rows="3"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values.remark || ""}
                invalid={
                  validation.touched.remark && validation.errors.remark
                    ? true
                    : false
                }
              />
              {validation.touched.remark && validation.errors.remark ? (
                <FormFeedback type="invalid">
                  {validation.errors.remark}
                </FormFeedback>
              ) : null}
            </Col>
          </Row>
        </ModalBody>
        <Row>
          <Col>
            <ModalFooter>
              <button type="submit" className="btn btn-success save-user">
                Mark Faulty
              </button>
            </ModalFooter>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}

StockPairingMarkfaulty.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
  selectedPairings: PropTypes.array,
  pairinginventorystate: PropTypes.array,
};

export default StockPairingMarkfaulty;
