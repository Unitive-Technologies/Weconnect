import React, { useEffect, useState, useRef, useMemo } from "react";
import {
  Card,
  CardBody,
  Button,
  Col,
  Container,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
  FormFeedback,
  UncontrolledTooltip,
  Input,
  Form,
} from "reactstrap";
import TableContainer from "../../../../components/Common/TableContainer";
import UploadDocsFile from "./UploadDocsFile";
import { update } from "lodash";

const UploadDocuments = ({ uploadDocsData }) => {
  const [uploadDocsList, setUploadDocsList] = useState([]);
  const columns = useMemo(
    () => [
      {
        Header: "#",
        // accessor: "name",
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
        Header: "Document Type",
        accessor: "name",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <>
              <h5
                className="font-size-14 mb-1"
                onClick={() => {
                  const userData = cellProps.row.original;
                  handleViewRegionalOffice(userData);
                }}
              >
                <Link className="text-dark" to="#">
                  {cellProps.row.original.name}
                </Link>
              </h5>
              <p className="text-muted mb-0">
                {cellProps.row.original.designation}
              </p>
            </>
          );
        },
      },
      {
        Header: "Upload",
        accessor: "code",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">{cellProps.row.original.code}</p>
          );
        },
      },
    ],
    []
  );

  const columns1 = useMemo(
    () => [
      {
        Header: "#",
        // accessor: "name",
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
        Header: "Proof Type",
        // accessor: "name",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <>
              <h5
                className="font-size-14 mb-1"
                onClick={() => {
                  const userData = cellProps.row.original;
                  handleViewRegionalOffice(userData);
                }}
              >
                <Link className="text-dark" to="#">
                  {cellProps.row.original.name}
                </Link>
              </h5>
              <p className="text-muted mb-0">
                {cellProps.row.original.designation}
              </p>
            </>
          );
        },
      },
      {
        Header: "Name",
        // accessor: "code",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">{cellProps.row.original.code}</p>
          );
        },
      },
      {
        Header: "Type",
        // accessor: "code",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">{cellProps.row.original.code}</p>
          );
        },
      },
      {
        Header: "Download",
        // accessor: "code",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">{cellProps.row.original.code}</p>
          );
        },
      },
      {
        Header: "$",
        // accessor: "code",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">{cellProps.row.original.code}</p>
          );
        },
      },
    ],
    []
  );
  return (
    <div>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          //   validation.handleSubmit();
          return false;
        }}
      >
        <div
          style={{
            // margin: "20px 0px",
            marginTop: "20px",
            marginBottom: "-18px",
            zIndex: 12000,
            backgroundColor: "#fff",
            width: "fit-content",
            marginLeft: "40%",
            position: "absolute",
            padding: "0px 10px",
          }}
        >
          {" "}
          <h5 style={{}}>Document Type Uploaded</h5>
        </div>
        <Row
          style={{
            position: "relative",
            border: "1px solid #ced4da",
            padding: "20px 0px",
            margin: "30px 0px",
          }}
        >
          <Col lg={12}>
            <Card>
              <CardBody>
                <TableContainer
                  isPagination={true}
                  columns={columns}
                  data={uploadDocsData}
                  // isGlobalFilter={true}
                  // isAddRegionalOffice={true}
                  isShowingPageLength={true}
                  // tableActions={getTableActions()}
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
        <div
          style={{
            // margin: "20px 0px",
            marginTop: "20px",
            marginBottom: "-18px",
            zIndex: 12000,
            backgroundColor: "#fff",
            width: "fit-content",
            marginLeft: "40%",
            position: "absolute",
            padding: "0px 10px",
          }}
        >
          {" "}
          <h5 style={{}}>Uploaded Documents</h5>
        </div>
        <Row
          style={{
            position: "relative",
            border: "1px solid #ced4da",
            padding: "20px 0px",
            margin: "30px 0px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Col lg={12}>
            <Card>
              <CardBody>
                <TableContainer
                  isPagination={true}
                  columns={columns1}
                  data={uploadDocsData}
                  // isGlobalFilter={true}
                  // isAddRegionalOffice={true}
                  isShowingPageLength={true}
                  // tableActions={getTableActions()}
                  customPageSize={50}
                  tableClass="table align-middle table-nowrap table-hover"
                  theadClass="table-light"
                  paginationDiv="col-sm-12 col-md-7"
                  pagination="pagination pagination-rounded justify-content-end mt-4"
                />
              </CardBody>
            </Card>
          </Col>
          <Button
            style={{
              width: "20%",
            }}
          >
            Remove
          </Button>
        </Row>
        <div
          style={{
            // margin: "20px 0px",
            marginTop: "20px",
            marginBottom: "-18px",
            zIndex: 12000,
            backgroundColor: "#fff",
            width: "fit-content",
            marginLeft: "40%",
            position: "absolute",
            padding: "0px 10px",
          }}
        >
          {" "}
          <h5 style={{}}>Documents Upload</h5>
        </div>
        <Row
          style={{
            position: "relative",
            border: "1px solid #ced4da",
            padding: "20px 0px",
            margin: "30px 0px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Col lg={6}>
            <div className="mb-3">
              <Label className="form-label">
                Document Type (MAX 2MB)<span style={{ color: "red" }}>*</span>
              </Label>
              <Input
                name="parent_id"
                type="select"
                placeholder="Select Document Type"
                className="form-select"
                // onChange={validation.handleChange}
                // onBlur={validation.handleBlur}
                // value={validation.values.parent_id || ""}
              >
                <option value="">Select Document Type</option>
                {/* {lcoParentDistributor &&
                  lcoParentDistributor.map((parent) => (
                    <option key={parent.id} value={parent.id}>
                      {parent.name}
                    </option>
                  ))} */}
              </Input>
              {/* {validation.touched.parent_id && validation.errors.parent_id ? (
                <FormFeedback type="invalid">
                  {validation.errors.parent_id}
                </FormFeedback>
              ) : null} */}
            </div>
          </Col>
          <Col lg={6}>
            <Card>
              <CardBody>
                <TableContainer
                  isPagination={true}
                  columns={columns1}
                  data={uploadDocsData}
                  // isGlobalFilter={true}
                  // isAddRegionalOffice={true}
                  isShowingPageLength={true}
                  // tableActions={getTableActions()}
                  customPageSize={50}
                  tableClass="table align-middle table-nowrap table-hover"
                  theadClass="table-light"
                  paginationDiv="col-sm-12 col-md-7"
                  pagination="pagination pagination-rounded justify-content-end mt-4"
                />
              </CardBody>
            </Card>
          </Col>
          <Button
            style={{
              width: "20%",
            }}
          >
            Remove
          </Button>
        </Row>
        <UploadDocsFile data={uploadDocsList} updateList={setUploadDocsList} />
        <Button
          style={{
            width: "20%",
          }}
        >
          Upload
        </Button>
        <div
          style={{
            // margin: "20px 0px",
            marginTop: "20px",
            marginBottom: "18px",
            zIndex: 12000,
            backgroundColor: "#fff",
            width: "fit-content",
            marginLeft: "40%",
            position: "absolute",
            padding: "0px 10px",
          }}
        >
          <h5 style={{}}>Upload Documents</h5>
        </div>
        <Row
          style={{
            position: "relative",
            border: "1px solid #ced4da",
            padding: "20px 0px",
            margin: "30px 0px",
          }}
        >
          <Col sm="12">
            <UploadDocsFile
              data={uploadDocsList}
              updateList={setUploadDocsList}
            />
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default UploadDocuments;
