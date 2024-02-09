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
  addStockStbActionupdation as onAddStockStbActionupdation,
  getInventoryStockStb as onGetInventoryStockStb,
} from "/src/store/inventorystock/actions";

function StbActionUpdation(props) {
  const {
    isOpen,
    toggle,
    selectedStbs,
    brand1,
    stockscwarehouse,
    actioninventorystate,
  } = props;
  const [isChecked, setIsChecked] = useState(true);

  const dispatch = useDispatch();

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      remark: "",
      ids: [],
      stbbrand_id: "",
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
        ids: selectedStbs.map((row) => row.id),
        stbbrand_id: values["brand_id"],
        warehouse_id: values["warehouse_id"],
        state: values["state"],
      };
      console.log("New Updation: " + JSON.stringify(newUpdation));
      dispatch(onAddStockStbActionupdation(newUpdation));
      dispatch(onGetInventoryStockStb());
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
      <ModalHeader toggle={toggle}>
        Update Brand/Warehouse/Inventory State
      </ModalHeader>
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
                    data={selectedStbs}
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
                <Label className="form-label">STB Brand</Label>
                <Input
                  name="stbbrand_id"
                  type="select"
                  placeholder="Select stb brand"
                  className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.stbbrand_id || ""}
                  invalid={
                    validation.touched.stbbrand_id &&
                    validation.errors.stbbrand_id
                      ? true
                      : false
                  }
                >
                  <option value="">Select stb brand</option>
                  {validation.values.cas_id !== "" ? (
                    <>
                      {brand1.map((options) => (
                        <option key={options.id} value={options.id}>
                          {options.name}
                        </option>
                      ))}{" "}
                    </>
                  ) : null}
                </Input>
                {validation.touched.stbbrand_id &&
                validation.errors.stbbrand_id ? (
                  <FormFeedback type="invalid">
                    {validation.errors.stbbrand_id}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
            <Col lg={3}>
              <div className="mb-3">
                <Label className="form-label">STB Warehouse</Label>
                <Input
                  name="warehouse_id"
                  type="select"
                  placeholder="Select stb warehouse"
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
                <Label className="form-label">STB Inentory state</Label>
                <Input
                  name="state"
                  type="select"
                  placeholder="Select STB inventory state"
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
                  {actioninventorystate.map((options) => (
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

StbActionUpdation.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
  selectedStbs: PropTypes.array,
  brand1: PropTypes.array,
  stockscwarehouse: PropTypes.array,
  actioninventorystate: PropTypes.array,
};

export default StbActionUpdation;
