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
  updateStockSmartcardActionupdation as onUpdateStockSmartcardActionupdation,
  getInventoryStockSmartcard as onGetInventoryStockSmartcard,
} from "/src/store/inventorystock/actions";

function StockActionUpdation(props) {
  const {
    isOpen,
    toggle,
    selectedRows,
    stocksccastype,
    stockscwarehouse,
    stockscinventorystate,
  } = props;
  const [isChecked, setIsChecked] = useState(true);

  const dispatch = useDispatch();

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      remark: "",
      ids: [],
      brand_id: "",
      warehouse_id: "",
      state: "",
    },
    validationSchema: Yup.object({
      remark: Yup.string().required("Enter remark"),
    }),
    onSubmit: (values) => {
      const newUpdation = {
        id: Math.floor(Math.random() * (30 - 20)) + 20,
        remark: values["remark"],
        ids: selectedRows.map((row) => row.id),
        brand_id: values["brand_id"],
        warehouse_id: values["warehouse_id"],
        state: values["state"],
      };
      console.log("New Updation: " + JSON.stringify(newUpdation));
      dispatch(onUpdateStockSmartcardActionupdation(newUpdation));
      dispatch(onGetInventoryStockSmartcard());
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
        Header: "Current Brand",
        accessor: "brand_lbl",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <>
              <h5 className="font-size-14 mb-1">
                {cellProps.row.original.brand_lbl}
              </h5>
            </>
          );
        },
      },
      {
        Header: "Current warehouse",
        accessor: "warehouse_lbl",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <>
              <h5 className="font-size-14 mb-1">
                {cellProps.row.original.warehouse_lbl}
              </h5>
            </>
          );
        },
      },
      {
        Header: "Current Inventory state",
        accessor: "inv_state_lbl",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <>
              <h5 className="font-size-14 mb-1">
                {cellProps.row.original.inv_state_lbl}
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
      <ModalHeader toggle={toggle}>Mark Faulty Smartcard</ModalHeader>
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
                    data={selectedRows}
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
                <Label className="form-label">Smartcard Brand</Label>
                <Input
                  name="brand_id"
                  type="select"
                  placeholder="Select brand Type"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.brand_id || ""}
                  invalid={
                    validation.touched.brand_id && validation.errors.brand_id
                      ? true
                      : false
                  }
                >
                  <option value="">Select brand Type</option>
                  {stocksccastype.map((brandtype) => (
                    <option key={brandtype.id} value={brandtype.id}>
                      {brandtype.name}
                    </option>
                  ))}
                </Input>
                {validation.touched.brand_id && validation.errors.brand_id ? (
                  <FormFeedback type="invalid">
                    {validation.errors.brand_id}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
            <Col lg={3}>
              <div className="mb-3">
                <Label className="form-label">Smartcard Warehouse</Label>
                <Input
                  name="warehouse_id"
                  type="select"
                  placeholder="Select warehouse"
                  className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.warehouse_id || ""}
                  invalid={
                    validation.touched.warehouse_id &&
                    validation.errors.warehouse_id
                      ? true
                      : false
                  }
                >
                  <option value="">Select warehouse</option>
                  {stockscwarehouse.map((options) => (
                    <option key={options.id} value={options.id}>
                      {options.name}
                    </option>
                  ))}
                </Input>
                {validation.touched.warehouse_id &&
                validation.errors.warehouse_id ? (
                  <FormFeedback type="invalid">
                    {validation.errors.warehouse_id}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
            <Col lg={3}>
              <div className="mb-3">
                <Label className="form-label">Smatcard Inentory state</Label>
                <Input
                  name="state"
                  type="select"
                  placeholder="Select inventory state"
                  className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.state || ""}
                  invalid={
                    validation.touched.state && validation.errors.state
                      ? true
                      : false
                  }
                >
                  <option value="">Select inventory state</option>
                  {stockscinventorystate.map((options) => (
                    <option key={options.id} value={options.id}>
                      {options.name}
                    </option>
                  ))}
                </Input>
                {validation.touched.state && validation.errors.state ? (
                  <FormFeedback type="invalid">
                    {validation.errors.state}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
            <Col lg="3">
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
                Update
              </button>
            </ModalFooter>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}

StockActionUpdation.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
  selectedRows: PropTypes.array,
  stocksccastype: PropTypes.array,
  stockscwarehouse: PropTypes.array,
  stockscinventorystate: PropTypes.array,
};

export default StockActionUpdation;
