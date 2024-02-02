import React, { useMemo, useState } from "react";
import {
  Card,
  CardBody,
  Col,
  Form,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  Table,
} from "reactstrap";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import TableContainer from "../../components/Common/TableContainer";

function CreatePairing(props) {
  const { isOpen, toggle, smartcardlist, stblist, stocksccastype } = props;

  const [cas_id, setCas_id] = useState("");
  const [selectedSmartcard, setSelectedSmartcard] = useState({});
  const [selectedStb, setSelectedStb] = useState({});
  const [isCheckedSc, setIsCheckedSC] = useState(false);
  const [isCheckedStb, setIsCheckedStb] = useState(false);
  const [selectedPairs, setSelectedPairs] = useState([]);
  const [smartcardData, setSmartcardData] = useState(smartcardlist);
  const [stbData, setStbData] = useState(stblist);

  // const handleCheckboxClick = (row) => {
  //   // setShowViewNcf(false);
  //   setIsCheckedSC(true);
  //   setSelectedSmartcard(row);
  // };

  // const handleStbCheckboxClick = (row) => {
  //   // setShowViewNcf(false);
  //   setIsCheckedStb(true);
  //   setSelectedStb(row);
  // };

  const handleSmartcardSelection = (smartcard) => {
    setSelectedSmartcard(smartcard);
  };

  const handleStbSelection = (stb) => {
    setSelectedStb(stb);
  };

  const handleHandshake = () => {
    if (selectedSmartcard && selectedStb) {
      setSelectedPairs([
        ...selectedPairs,
        { smartcard: selectedSmartcard, stb: selectedStb },
      ]);
      // Remove selected smartcard and STB from lists
      const updatedSmartcardList = smartcardlist.filter(
        (item) => item.id !== selectedSmartcard.id
      );
      const updatedStbList = stblist.filter(
        (item) => item.id !== selectedStb.id
      );
      setSelectedSmartcard(null);
      setSelectedStb(null);
      setSmartcardData(updatedSmartcardList);
      setStbData(updatedStbList);
    }
  };

  const smartcardColumns = useMemo(
    () => [
      {
        Header: ".",
        disableFilters: true,
        filterable: true,
        Cell: (cellProps) => (
          <input
            type="checkbox"
            onChange={() => handleSmartcardSelection(cellProps.row.original)}
          />
        ),
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
              <h5 className="font-size-14 mb-1">
                <Link className="text-dark" to="#">
                  {cellProps.row.original.smartcardno}
                </Link>
              </h5>
            </>
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
    ],
    []
  );

  const stbColumns = useMemo(
    () => [
      {
        Header: ".",
        disableFilters: true,
        filterable: true,
        Cell: (cellProps) => (
          <input
            type="checkbox"
            onChange={() => handleStbSelection(cellProps.row.original)}
          />
        ),
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
        Header: "STB No.",
        accessor: "stbno",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <>
              <h5 className="font-size-14 mb-1">
                <Link className="text-dark" to="#">
                  {cellProps.row.original.stbno}
                </Link>
              </h5>
            </>
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
        Header: "Box Type",
        accessor: "boxtype_lbl",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              {cellProps.row.original.boxtype_lbl}
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
        <Form>
          <Row>
            <Col lg={4}>
              <div className="mb-3">
                <Label className="form-label">
                  CAS Type<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="cas_id"
                  type="select"
                  placeholder="Select CAS Type"
                  onChange={(e) => setCas_id(e.target.value)}
                  value={cas_id}
                >
                  <option value="">Select CAS Type</option>
                  {stocksccastype.map((castype) => (
                    <option key={castype.id} value={castype.id}>
                      {castype.name}
                    </option>
                  ))}
                </Input>
              </div>
            </Col>
          </Row>
          <Row>
            <Col lg={6}>
              <Card>
                <CardBody>
                  {console.log("Smartcard data: ", smartcardData)}
                  <TableContainer
                    isPagination={true}
                    columns={smartcardColumns}
                    data={cas_id !== "" ? smartcardData : []}
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
            <Col lg={6}>
              <Card>
                <CardBody>
                  {console.log("stb data: ", stbData)}
                  <TableContainer
                    isPagination={true}
                    columns={stbColumns}
                    data={cas_id !== "" ? stbData : []}
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
            <Col lg="6"></Col>
            <Col xl="3" lg="4" sm="6">
              <button type="button" onClick={handleHandshake}>
                {/* <i className="mdi mdi-handshake-outline"></i> */}
                Create Pairing
              </button>
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
                          <th>STB No.</th>
                          <th>$</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedPairs.map((pair, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{pair.smartcard.smartcardno}</td>
                            <td>{pair.stb.stbno}</td>
                            <td>
                              <i className="mdi mdi-delete"></i>
                            </td>
                          </tr>
                        ))}
                        {/* <tr>
                          <td scope="row">1</td>
                          <td>{selectedSmartcard.smartcardno}</td>
                          <td>{selectedStb.stbno}</td>
                          <td>
                            <h5>
                              <Link className="text-dark" to="#">
                                <i
                                  className="mdi mdi-delete font-size-18"
                                  id="deletetooltip"
                                />
                              </Link>
                            </h5>
                          </td>
                        </tr> */}
                      </tbody>
                    </Table>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Form>
      </ModalBody>
    </Modal>
  );
}

CreatePairing.propTypes = {
  smartcardlist: PropTypes.array,
  stblist: PropTypes.array,
  isOpen: PropTypes.bool,
  toggle: PropTypes.func,
  stocksccastype: PropTypes.array,
};

export default CreatePairing;
