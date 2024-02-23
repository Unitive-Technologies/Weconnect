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
  allotStb as onAllotStb,
  getInventoryAllottedStb as onGetInventoryAllottedStb,
} from "/src/store/inventoryAllotted/actions";
import { getResponse } from "../../helpers/api_helper";

function AllottedStb(props) {
  const {
    isOpen,
    toggle,
    allottedstblist,
    allottedusertype,
    allottedoperatorlist,
  } = props;
  const [usertype, setUsertype] = useState("");
  const [selectedStblist, setSelectedStblist] = useState([]);
  const [isCheckedSc, setIsCheckedSc] = useState(false);
  const [branch_id, setBranch_id] = useState("");
  const [distributor_id, setDistributor_id] = useState("");
  const [operator, setOperator] = useState("");
  const [allotteddistributor, setAllotteddistributor] = useState([]);
  const [allottedlco, setAllottedlco] = useState([]);

  const baseUrl = "https://sms.unitch.in/api/index.php/v1";

  useEffect(() => {
    console.log("Selected branch id: ", branch_id);
    getResponse(
      `${baseUrl}/operator/list?fields=id,name,type,mso_id,branch_id,distributor_id&per-page=100&filter[branch_id]=${parseInt(
        branch_id
      )}&filter[type]=2&vr=web1.0`
    ).then((response) => {
      console.log("distributor response data: ", response.data);
      setAllotteddistributor(response.data.data);
    });
  }, [branch_id]);

  useEffect(() => {
    console.log("Selected distributor id: ", distributor_id);
    getResponse(
      `${baseUrl}/operator/list?fields=id,name,type,mso_id,branch_id,distributor_id&per-page=100&filter[branch_id]=${branch_id}&filter[distributor_id]=${distributor_id}&filter[type]=3&vr=web1.0`
    ).then((response) => {
      // console.log("lco response data: ", response.data.data);
      setAllottedlco(response.data.data);
    });
  }, [distributor_id]);

  const handleStbSelection = (row) => {
    const isSelected = selectedStblist.some(
      (selectedStb) => selectedStb.id === row.id
    );
    if (isSelected) {
      const updatedSelectedStblist = selectedStblist.filter(
        (selectedStb) => selectedStb.id !== row.id
      );
      setSelectedStblist(updatedSelectedStblist);
    } else {
      setSelectedStblist([...selectedStblist, row]);
    }
  };

  const handleDeleteStb = (index) => {
    const updatedSelectedStblist = selectedStblist.filter(
      (pair, i) => i !== index
    );
    setSelectedStblist(updatedSelectedStblist);
  };

  const dispatch = useDispatch();

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      operator_id: "",
      stb_ids: [],
    },
    validationSchema: Yup.object({
      usertype: Yup.string().required("Select user Type"),
    }),
    onSubmit: (values) => {
      let id = {};
      if (usertype === "1") {
        id = branch_id;
      } else if (usertype === "2") {
        id = distributor_id;
      } else if (usertype === "3") {
        id = operator;
      }

      const newAllotted = {
        id: Math.floor(Math.random() * (30 - 20)) + 20,
        operator_id: id,
        stb_ids: allottedstblist.map((row) => row.id),
      };
      console.log("New allotted stb: " + JSON.stringify(newAllotted));
      dispatch(onAllotStb(newAllotted));
      dispatch(onGetInventoryAllottedStb());
      validation.resetForm();
      setUsertype("");
      setSelectedStblist([]);
      setBranch_id("");
      setDistributor_id("");
      setOperator("");
      setAllotteddistributor([]);
      setAllottedlco([]);
      toggle();
    },
    onReset: (values) => {
      validation.setValues(validation.initialValues);
    },
  });

  const stbColumns = useMemo(
    () => [
      // {
      //   Header: ".",
      //   disableFilters: true,
      //   filterable: true,
      //   Cell: (cellProps) => {
      //     return (
      //       <>
      //         <input
      //           type="checkbox"
      //           onChange={() => handleStbSelection(cellProps.row.original)}
      //         />
      //       </>
      //     );
      //   },
      // },
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
        Header: "STB No.",
        accessor: "stbno",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <>
              <p className="font-size-14 mb-1">
                {cellProps.row.original.stbno}
              </p>
            </>
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

  useEffect(() => {
    setBranch_id("");
    setDistributor_id("");
    setOperator("");
    setAllotteddistributor([]);
    setAllottedlco([]);
  }, [usertype]);

  const handleModalToggle = () => {
    toggle();
    setUsertype("");
    setSelectedStblist([]);
    setBranch_id("");
    setDistributor_id("");
    setOperator("");
    setAllotteddistributor([]);
    setAllottedlco([]);
  };

  return (
    <Modal
      isOpen={isOpen}
      role="dialog"
      size="xl"
      autoFocus={true}
      centered={true}
      className="exampleModal"
      tabIndex="-1"
      toggle={handleModalToggle}
    >
      <ModalHeader tag="h4" toggle={handleModalToggle}>
        Allot STBs to Operator
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
                  placeholder="Select User Type"
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
            {usertype === "1" ? (
              <Col lg={3}>
                <div className="mb-3">
                  <Label className="form-label">
                    Select REGIONAL OFFICE
                    <span style={{ color: "red" }}>*</span>
                  </Label>
                  <Input
                    name="brand_id"
                    type="select"
                    placeholder="Select Reginal office"
                    onChange={(e) => setBranch_id(e.target.value)}
                    onBlur={validation.handleBlur}
                    value={branch_id}
                  >
                    <option value="">Select Reginal office</option>
                    {allottedoperatorlist.map((operatorlist) => (
                      <option key={operatorlist.id} value={operatorlist.id}>
                        {operatorlist.name}
                      </option>
                    ))}
                  </Input>
                </div>
              </Col>
            ) : null}
            {usertype === "2" ? (
              <>
                <Col lg={3}>
                  <div className="mb-3">
                    <Label className="form-label">
                      Select REGIONAL OFFICE
                      <span style={{ color: "red" }}>*</span>
                    </Label>
                    <Input
                      name="brand_id"
                      type="select"
                      placeholder="Select Reginal office"
                      onChange={(e) => {
                        validation.handleChange(e);
                        setBranch_id(e.target.value);
                      }}
                      onBlur={validation.handleBlur}
                      value={validation.values.brand_id || ""}
                      invalid={
                        validation.touched.brand_id &&
                        validation.errors.brand_id
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
                    {validation.touched.brand_id &&
                    validation.errors.brand_id ? (
                      <FormFeedback type="invalid">
                        {validation.errors.brand_id}
                      </FormFeedback>
                    ) : null}
                  </div>
                </Col>
                {branch_id !== "" ? (
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
                        onChange={(e) => {
                          validation.handleChange(e);
                          setDistributor_id(e.target.value);
                        }}
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
                        {allotteddistributor.map((operatorlist) => (
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
              </>
            ) : null}
            {usertype === "3" ? (
              <>
                <Col lg={3}>
                  <div className="mb-3">
                    <Label className="form-label">
                      Select REGIONAL OFFICE
                      <span style={{ color: "red" }}>*</span>
                    </Label>
                    <Input
                      name="brand_id"
                      type="select"
                      placeholder="Select Reginal office"
                      onChange={(e) => {
                        validation.handleChange(e);
                        setBranch_id(e.target.value);
                      }}
                      onBlur={validation.handleBlur}
                      value={validation.values.brand_id || ""}
                      invalid={
                        validation.touched.brand_id &&
                        validation.errors.brand_id
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
                    {validation.touched.brand_id &&
                    validation.errors.brand_id ? (
                      <FormFeedback type="invalid">
                        {validation.errors.brand_id}
                      </FormFeedback>
                    ) : null}
                  </div>
                </Col>
                {branch_id !== "" ? (
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
                        onChange={(e) => setDistributor_id(e.target.value)}
                        value={distributor_id}
                      >
                        <option value="">Select Distributor</option>
                        {allotteddistributor.map((operatorlist) => (
                          <option key={operatorlist.id} value={operatorlist.id}>
                            {operatorlist.name}
                          </option>
                        ))}
                      </Input>
                    </div>
                  </Col>
                ) : null}
                {distributor_id !== "" ? (
                  <Col lg={3}>
                    <div className="mb-3">
                      <Label className="form-label">
                        Select Lco
                        <span style={{ color: "red" }}>*</span>
                      </Label>
                      <Input
                        name="operator"
                        type="select"
                        placeholder="Select Lco"
                        onChange={(e) => setOperator(e.target.value)}
                        onBlur={validation.handleBlur}
                        value={operator}
                      >
                        <option value="">Select Distributor</option>
                        {allottedlco.map((operatorlist) => (
                          <option key={operatorlist.id} value={operatorlist.id}>
                            {operatorlist.name}
                          </option>
                        ))}
                      </Input>
                    </div>
                  </Col>
                ) : null}
              </>
            ) : null}
          </Row>
          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <TableContainer
                    isPagination={true}
                    columns={stbColumns}
                    data={allottedstblist}
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

AllottedStb.propTypes = {
  allottedstblist: PropTypes.array,
  isOpen: PropTypes.bool,
  toggle: PropTypes.func,
  allottedusertype: PropTypes.array,
  allottedoperatorlist: PropTypes.array,
};

export default AllottedStb;
