import React, { useMemo, useState, useEffect } from "react";
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
  Table,
} from "reactstrap";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import TableContainer from "../../components/Common/TableContainer";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  allotSmartcard as onAllotSmartcard,
  getInventoryAllottedPairing as onGetInventoryAllottedPairing,
} from "/src/store/inventoryAllotted/actions";

function AllottedSmrtcard(props) {
  const {
    isOpen,
    toggle,
    allottedsmartcardlist,
    allottedusertype,
    allottedoperatorlist,
  } = props;
  const [usertype, setUsertype] = useState("");
  const [selectedSmartcardlist, setSelectedSmartcardlist] = useState([]);
  const [isCheckedSc, setIsCheckedSc] = useState(false);

  //   const handleSmartcardSelection = (smartcard) => {
  //     // Check if the smartcard is already selected
  //     const isSelected = selectedSmartcardlist.some(
  //       (item) => item.smartcardno === smartcard.smartcardno
  //     );

  //     if (!isSelected) {
  //       // If not already selected, add it to the list
  //       setSelectedSmartcardlist([...selectedSmartcardlist, smartcard]);
  //       setIsCheckedSc(true);
  //     }
  //   };

  const handleSmartcardSelection = (row) => {
    // Check if the row is already selected
    const isSelected = selectedSmartcardlist.some(
      (selectedSmartcard) => selectedSmartcard.id === row.id
    );

    // If the row is selected, remove it from the selected rows array
    if (isSelected) {
      const updatedSelectedSmartcardlist = selectedSmartcardlist.filter(
        (selectedSmartcard) => selectedSmartcard.id !== row.id
      );
      setSelectedSmartcardlist(updatedSelectedSmartcardlist);
    } else {
      // If the row is not selected, add it to the selected rows array
      setSelectedSmartcardlist([...selectedSmartcardlist, row]);
    }
  };

  useEffect(() => {
    console.log("Selected Smartcardlist: ", selectedSmartcardlist);
  }, [selectedSmartcardlist]);

  const handleDeleteSmartcard = (index) => {
    const updatedSelectedSmartcardlist = selectedSmartcardlist.filter(
      (pair, i) => i !== index
    );
    setSelectedSmartcardlist(updatedSelectedSmartcardlist);
  };

  const dispatch = useDispatch();

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      operator_id: "",
      smartcard_ids: [],
    },
    validationSchema: Yup.object({
      usertype: Yup.string().required("Select user Type"),
    }),
    onSubmit: (values) => {
      const newAllotted = {
        id: Math.floor(Math.random() * (30 - 20)) + 20,
        operator_id: values.operator_id,
        smartcard_ids: selectedSmartcardlist.map((row) => row.id),
      };
      console.log("New allotted smartcard: " + JSON.stringify(newAllotted));
      dispatch(onAllotSmartcard(newAllotted));
      dispatch(onGetInventoryAllottedPairing());
      validation.resetForm();
      toggle();
      setUsertype("");
      setSelectedSmartcardlist([]);
    },
    onReset: (values) => {
      validation.setValues(validation.initialValues);
    },
  });

  const smartcardColumns = useMemo(
    () => [
      {
        Header: ".",
        disableFilters: true,
        filterable: true,
        Cell: (cellProps) => {
          return (
            <>
              <input
                type="checkbox"
                onChange={() =>
                  handleSmartcardSelection(cellProps.row.original)
                }
              />
            </>
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
        Header: "Smartcard No.",
        accessor: "smartcardno",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <>
              <p className="font-size-14 mb-1">
                {cellProps.row.original.smartcardno}
              </p>
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
            <p className="text-muted mb-0">{cellProps.row.original.cas_lbl}</p>
          );
        },
      },
      {
        Header: "Brand",
        accessor: "brand_lbl",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              {cellProps.row.original.brand_lbl}
            </p>
          );
        },
      },
      {
        Header: "Status",
        accessor: "status_lbl",
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
        Header: "Alloted to",
        accessor: "operator_lbl",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              {cellProps.row.original.operator_lbl}
            </p>
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
      <ModalHeader tag="h4" toggle={toggle}>
        Allot Smartcards to Operator
      </ModalHeader>
      <ModalBody>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            validation.handleSubmit();
            return false;
          }}
        >
          <Row>
            <Col lg={3}>
              <div className="mb-3">
                <Label className="form-label">
                  User Type<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="usertype"
                  type="select"
                  placeholder="Select CAS Type"
                  onChange={(e) => {
                    validation.handleChange(e);
                    setUsertype(e.target.value);
                  }}
                  onBlur={validation.handleBlur}
                  value={validation.values.usertype || ""}
                  invalid={
                    validation.touched.usertype && validation.errors.usertype
                      ? true
                      : false
                  }
                >
                  <option value="">Select user Type</option>
                  {allottedusertype.map((usertype) => (
                    <option key={usertype.id} value={usertype.id}>
                      {usertype.name}
                    </option>
                  ))}
                </Input>
                {validation.touched.usertype && validation.errors.usertype ? (
                  <FormFeedback type="invalid">
                    {validation.errors.usertype}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
            {usertype !== "" ? (
              <Col lg={3}>
                <div className="mb-3">
                  <Label className="form-label">
                    Select REGIONAL OFFICE
                    <span style={{ color: "red" }}>*</span>
                  </Label>
                  <Input
                    name="operator_id"
                    type="select"
                    placeholder="Select Reginal office"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.operator_id || ""}
                    invalid={
                      validation.touched.operator_id &&
                      validation.errors.operator_id
                        ? true
                        : false
                    }
                  >
                    <option value="">Select Reginal office</option>
                    {allottedoperatorlist.map((operatorlist) => (
                      <option key={operatorlist.id} value={operatorlist.id}>
                        {operatorlist.name}
                      </option>
                    ))}
                  </Input>
                  {validation.touched.operator_id &&
                  validation.errors.operator_id ? (
                    <FormFeedback type="invalid">
                      {validation.errors.operator_id}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
            ) : null}
            {validation.values.operator_id !== "" ? (
              <Col lg={3}>
                <div className="mb-3">
                  <Label className="form-label">
                    Select DISTRIBUTOR
                    <span style={{ color: "red" }}>*</span>
                  </Label>
                  <Input
                    name="distributor_id"
                    type="select"
                    placeholder="Select Distributor"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.distributor_id || ""}
                    invalid={
                      validation.touched.distributor_id &&
                      validation.errors.distributor_id
                        ? true
                        : false
                    }
                  >
                    <option value="">Select Distributor</option>
                    {allottedoperatorlist.map((operatorlist) => (
                      <option key={operatorlist.id} value={operatorlist.id}>
                        {operatorlist.name}
                      </option>
                    ))}
                  </Input>
                  {validation.touched.distributor_id &&
                  validation.errors.distributor_id ? (
                    <FormFeedback type="invalid">
                      {validation.errors.distributor_id}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
            ) : null}
          </Row>
          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <TableContainer
                    isPagination={true}
                    columns={smartcardColumns}
                    data={allottedsmartcardlist}
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
            <Col>
              <Card>
                <CardBody>
                  <div className="table-responsive">
                    <Table className="table mb-0">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Smartcard No.</th>
                          <th>$</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedSmartcardlist.map((pair, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{pair.smartcardno}</td>
                            <td>
                              <button
                                type="button"
                                onClick={() => handleDeleteSmartcard(index)}
                              >
                                <i className="mdi mdi-delete"></i>{" "}
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col>
              <ModalFooter>
                <button type="submit" className="btn btn-success save-user">
                  Allot
                </button>
                <button
                  type="reset"
                  className="btn btn-warning"
                  onClick={() => validation.resetForm()}
                >
                  Reset
                </button>

                <button
                  type="button"
                  className="btn btn-outline-danger"
                  onClick={() => {
                    validation.resetForm();
                    toggle();
                  }}
                >
                  Cancel
                </button>
              </ModalFooter>
            </Col>
          </Row>
        </Form>
      </ModalBody>
    </Modal>
  );
}

AllottedSmrtcard.propTypes = {
  allottedsmartcardlist: PropTypes.array,
  isOpen: PropTypes.bool,
  toggle: PropTypes.func,
  allottedusertype: PropTypes.array,
  allottedoperatorlist: PropTypes.array,
};

export default AllottedSmrtcard;
