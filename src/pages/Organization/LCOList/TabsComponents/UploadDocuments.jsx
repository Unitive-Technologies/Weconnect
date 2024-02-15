import React, { useEffect, useState, useRef, useMemo } from "react";
import axios from "axios";
import {
  Card,
  Table,
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
import { docsTypeList } from "./docsTypeList";
import TableContainer from "../../../../components/Common/TableContainer";
import UploadDocsFile from "./UploadDocsFile";
import { update } from "lodash";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Link } from "react-router-dom";

const UploadDocuments = ({ uploadDocsData, selectedRowId }) => {
  console.log("uploadDocsData:" + JSON.stringify(uploadDocsData));
  const [uploadDocsList, setUploadDocsList] = useState([]);
  const API_URL = "https://sms.unitch.in/api/index.php/v1";

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
                {/* <Link className="text-dark" to="#"> */}
                {reverseIndex}
                {/* </Link> */}
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
              <p className="text-muted mb-0">
                {cellProps.row.original.doctype}
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
            <p className="text-muted mb-0">{cellProps.row.original.name}</p>
          );
        },
      },
      {
        Header: "Type",
        // accessor: "code",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">{cellProps.row.original.type}</p>
          );
        },
      },
      {
        Header: "Download",
        // accessor: "code",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              <Link>Download</Link>
            </p>
          );
        },
      },
      {
        Header: "$",
        // accessor: "code",
        filterable: true,
        Cell: (cellProps) => {
          return <input type="checkbox" />;
        },
      },
    ],
    []
  );

  const getUploadDocsDetails = async (e) => {
    try {
      const token = "Bearer " + localStorage.getItem("temptoken");

      const response = await axios.get(
        `${API_URL}/operator/view-upload-doc?filter[model_id]=${selectedRowId}&expand=data&vr=web1.0`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setUploadDocsData(response.data.data);
      console.log("response in useEffect:" + JSON.stringify(response));
    } catch (error) {
      console.error("Error fetching Upload data:", error);
    }
  };

  const handleUploadDocs = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    console.log("upload btn clicked");
    console.log("uploaded meta data:" + JSON.stringify(uploadDocsList));

    try {
      const newUpload = {
        meta_data: uploadDocsList,
      };

      console.log("newUpload:", JSON.stringify(newUpload));

      const token = "Bearer " + localStorage.getItem("temptoken");

      const response = await axios.post(
        `${API_URL}/operator/upload-doc?vr=web1.0`,
        newUpload,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      console.log("response after submitting upload form:", response.data);
      // setUploadDocsList([]);
    } catch (error) {
      console.error("Error submitting upload form:", error);
    }
  };

  // useEffect(() => {
  //   if (uploadDocsList) {
  //     getUploadDocsDetails();
  //   }
  // }, [uploadDocsList]);

  return (
    <div>
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
              <Table className="table mb-0">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Document Type</th>
                    <th>Uploaded</th>
                  </tr>
                </thead>
                {uploadDocsData.length ? (
                  <tbody>
                    {docsTypeList.map((single, idx) => (
                      <tr key={single.id}>
                        <th scope="row">{idx + 1}</th>
                        <td>{single.value}</td>
                        <td>
                          {uploadDocsData.some(
                            (item) => item.doctype === single.type
                          )
                            ? "Yes"
                            : "No"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                ) : (
                  <tbody></tbody>
                )}
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <div
        style={{
          // margin: "20px 0px",
          marginTop: "-10px",
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
          marginTop: "-10px",
          marginBottom: "18px",
          zIndex: 12000,
          backgroundColor: "#fff",
          width: "fit-content",
          marginLeft: "40%",
          position: "absolute",
          padding: "0px 10px",
        }}
      >
        <h5>Documents Upload</h5>
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
          {/* <form onSubmit={handleUploadDocs}> */}
          <UploadDocsFile
            data={uploadDocsList}
            updateList={setUploadDocsList}
            selectedRowId={selectedRowId}
          />
        </Col>
        <Col
          lg={12}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button
            style={{
              width: "20%",
            }}
            type="button"
            onClick={handleUploadDocs}
          >
            Upload
          </Button>
          {/* </form> */}
        </Col>
      </Row>

      {/* </Form> */}
    </div>
  );
};

export default UploadDocuments;
