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
  const { isOpen, toggle, allottedsmartcardlist, allottedusertype } = props;

  //   const handleSmartcardSelection = (smartcard) => {
  //     setSelectedSmartcard(smartcard);
  //     setIsCheckedSC(true);
  //   };

  //   const handleHandshake = () => {
  //     if (selectedSmartcard && selectedStb) {
  //       setSelectedPairs([
  //         ...selectedPairs,
  //         { smartcard: selectedSmartcard, stb: selectedStb },
  //       ]);
  //       // Remove selected smartcard and STB from lists
  //       const updatedSmartcardList = smartcardData.filter(
  //         (item) => item.id !== selectedSmartcard.id
  //       );
  //       const updatedStbList = stbData.filter(
  //         (item) => item.id !== selectedStb.id
  //       );
  //       setSelectedSmartcard(null);
  //       setSelectedStb(null);
  //       setSmartcardData(updatedSmartcardList);
  //       setStbData(updatedStbList);
  //       setIsCheckedStb(false);
  //       setIsCheckedSC(false);
  //     }
  //   };

  //   const handleDeletePair = (index) => {
  //     const pairToRemove = selectedPairs[index];
  //     const updatedSelectedPairs = selectedPairs.filter((pair, i) => i !== index);
  //     setSelectedPairs(updatedSelectedPairs);
  //     setSmartcardData([...smartcardData, pairToRemove.smartcard]);
  //     setStbData([...stbData, pairToRemove.stb]);
  //   };

  // console.log("Selected pairs: ", selectedPairs);

  const dispatch = useDispatch();

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      cas_id: "",
      smartcardno: "",
      stbno: "",
    },
    validationSchema: Yup.object({
      cas_id: Yup.string().required("Select CAS Type"),
    }),
    onSubmit: (values) => {
      const newPairing = {
        id: Math.floor(Math.random() * (30 - 20)) + 20,
        // cas_id: values["cas_id"],
        pairing: selectedPairs.map((pair) => ({
          sc_id: pair.smartcard.id,
          stb_id: pair.stb.id,
        })),
      };
      console.log("New pairing: " + JSON.stringify(newPairing));
      dispatch(onAddInventoryStockPairing(newPairing));
      dispatch(onGetInventoryStockPairing());
      validation.resetForm();
      toggle();
      setSelectedPairs([]);
      setSelectedSmartcard(null);
      setSelectedStb(null);
      setIsCheckedStb(false);
      setIsCheckedSC(false);
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
              <input type="checkbox" />
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
        Header: "Stock Type",
        accessor: "state_lbl",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              {cellProps.row.original.state_lbl}
            </p>
          );
        },
      },
      {
        Header: "Inventory State",
        accessor: "inv_state_lbl",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              {cellProps.row.original.inv_state_lbl}
            </p>
          );
        },
      },
      {
        Header: "Warehouse",
        accessor: "warehouse_lbl",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              {cellProps.row.original.warehouse_lbl}
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
        Create New Pairing
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
            <Col lg={4}>
              <div className="mb-3">
                <Label className="form-label">
                  Selected User type<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="cas_id"
                  type="select"
                  placeholder="Select CAS Type"
                  onChange={(e) => {
                    validation.handleChange(e);
                    setCas_id(e.target.value);
                  }}
                  onBlur={validation.handleBlur}
                  value={validation.values.cas_id || ""}
                  invalid={
                    validation.touched.cas_id && validation.errors.cas_id
                      ? true
                      : false
                  }
                >
                  <option value="">Select CAS Type</option>
                  {allottedusertype.map((castype) => (
                    <option key={castype.id} value={castype.id}>
                      {castype.name}
                    </option>
                  ))}
                </Input>
                {validation.touched.cas_id && validation.errors.cas_id ? (
                  <FormFeedback type="invalid">
                    {validation.errors.cas_id}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
          </Row>
          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  {/* {console.log("Smartcard data: ", smartcardData)} */}
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
                      {/* <tbody>
                        {selectedPairs.map((pair, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{pair.smartcard.smartcardno}</td>
                            <td>{pair.stb.stbno}</td>
                            <td>
                              <button
                                type="button"
                                onClick={() => handleDeletePair(index)}
                              >
                                <i className="mdi mdi-delete"></i>{" "}
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody> */}
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
};

export default AllottedSmrtcard;
