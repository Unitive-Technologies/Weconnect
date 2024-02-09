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
  updateStockStbBlacklist as onUpdateStockStbBlacklist,
  getInventoryStockStb as onGetInventoryStockStb,
} from "/src/store/inventorystock/actions";
import { getInventoryBlacklistedStb as onGetInventoryBlacklistedStb } from "/src/store/inventoryblacklisted/actions";

function StockStbBlacklist(props) {
  const { isOpen, toggle, selectedStbs } = props;
  const [isChecked, setIsChecked] = useState(true);
  const [selectedFileDetails, setSelectedFileDetails] = useState({
    name: "",
    type: "",
    ext: "",
    data: "",
  });

  const dispatch = useDispatch();

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      remark: "",
      blacklist: [],
      docs: { name: "", type: "", ext: "", data: "" },
    },
    validationSchema: Yup.object({
      remark: Yup.string().required("Enter remark"),
    }),
    onSubmit: (values) => {
      const newBlacklist = {
        id: Math.floor(Math.random() * (30 - 20)) + 20,
        remark: values["remark"],
        blacklist: selectedStbs.map((row) => row.id),
        docs: selectedFileDetails,
      };
      console.log("Blacklist: " + JSON.stringify(newBlacklist));
      dispatch(onUpdateStockStbBlacklist(newBlacklist));
      dispatch(onGetInventoryStockStb());
      dispatch(onGetInventoryBlacklistedStb());
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
      <ModalHeader toggle={toggle}>Blacklist STB</ModalHeader>
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
            <Col lg="4">
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
            <Col lg="4">
              <Label>
                Select Blacklisting reason file (MAX 2Mb)
                <span style={{ color: "red" }}>*</span>
              </Label>
              <div className="mt-4 mt-md-0">
                <Input
                  type="file"
                  className="form-control"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    const fileExtension = file.name.split(".").pop();
                    setSelectedFileDetails({
                      name: file.name,
                      type: file.type,
                      ext: fileExtension,
                      data: "file",
                    });
                  }}
                />
              </div>
            </Col>
          </Row>
        </ModalBody>
        <Row>
          <Col>
            <ModalFooter>
              <button type="submit" className="btn btn-success save-user">
                Blacklist
              </button>
            </ModalFooter>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}

StockStbBlacklist.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
  selectedStbs: PropTypes.array,
};

export default StockStbBlacklist;
