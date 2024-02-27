import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import TableContainer from "../../../components/Common/TableContainer";
import {
  Card,
  CardBody,
  Table,
  Toast,
  ToastHeader,
  Row,
  Col,
  ToastBody,
} from "reactstrap";
import { Link } from "react-router-dom";
import AddBrandsTableList from "./AddBrandsTableList";

const AddBrands = (props) => {
  const { stbbrands, setStbbrands, selectedType } = props;
  const API_URL = "https://sms.unitch.in/api/index.php/v1";
  const [showBrandsModal, setShowBrandsModal] = useState(false);
  const columns = useMemo(
    () => [
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
        Header: "Brand Name",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <>
              <h5
                style={{
                  maxWidth: 200,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
                className="font-size-14 mb-1"
              >
                <Link className="text-dark" to="#">
                  {"Brand Name"}
                </Link>
              </h5>
            </>
          );
        },
      },
      {
        Header: "Box Type",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <>
              <h5
                style={{
                  maxWidth: 200,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
                className="font-size-14 mb-1"
              >
                <Link className="text-dark" to="#">
                  {"Box Type"}
                </Link>
              </h5>
            </>
          );
        },
      },
      {
        Header: "CAS",
        // accessor: "status",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <>
              <h5
                style={{
                  maxWidth: 200,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
                className="font-size-14 mb-1"
              >
                <Link className="text-dark" to="#">
                  {"cas"}
                </Link>
              </h5>
            </>
          );
        },
      },
      {
        Header: "Brand Type",
        // accessor: "status",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <>
              <h5
                style={{
                  maxWidth: 200,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
                className="font-size-14 mb-1"
              >
                <Link className="text-dark" to="#">
                  {"Brand Type"}
                </Link>
              </h5>
            </>
          );
        },
      },
      {
        Header: "$",
        // accessor: "type",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <>
              <h5
                style={{
                  maxWidth: 200,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
                className="font-size-14 mb-1"
              >
                <Link className="text-dark" to="#">
                  {"$"}
                </Link>
              </h5>
            </>
          );
        },
      },
    ],
    []
  );
  const [brandsList, setBrandsList] = useState([]);
  const [showAddBrandPlus, setShowAddBrandPlus] = useState(false);

  const handleAddBrandsWarning = () => {
    setShowAddBrandPlus(!showAddBrandPlus);
  };

  const handleAddBrandsTable = async (e) => {
    try {
      setShowBrandsModal(true); // Ensure modal is set to open before API call
      const token = "Bearer " + localStorage.getItem("temptoken");
      const type = parseInt(selectedType);

      const response = await axios.get(
        `${API_URL}/brand/list?fields=id,name&expand=box_type_lbl,type_lbl,cas_lbl&filter[type][]=1&filter[type][]=3&vr=web1.0`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log("response :" + JSON.stringify(response));
      setBrandsList(response.data.data);
    } catch (error) {
      console.error("Error fetching addChannels data:", error);
    }
  };

  const deleteBrand = (index) => {
    const list = [...stbbrands];
    list.splice(index, 1);
    setStbbrands(list);
  };

  return (
    <React.Fragment>
      {showBrandsModal && (
        <AddBrandsTableList
          isOpen={Boolean(showBrandsModal)}
          data={brandsList}
          toggleClose={() => setShowBrandsModal(!showBrandsModal)}
          setStbbrands={setStbbrands}
          // selectedIsHD={selectedIsHD}
          selectedType={selectedType}
        />
      )}
      <div
        className="position-fixed top-0 end-0 p-3"
        style={{ zIndex: "1005" }}
      >
        <Toast isOpen={showAddBrandPlus}>
          <ToastHeader toggle={handleAddBrandsWarning}>
            <i className="mdi mdi-alert-outline me-2"></i> Warning
          </ToastHeader>
          <ToastBody>{!selectedType && "Please select Box Type"}</ToastBody>
        </Toast>
      </div>

      <Card>
        <CardBody>
          <Row>
            <Col lg={8}></Col>
            <Col lg={4}>
              <div className="mb-3 d-flex justify-content-end">
                {/* {console.log("selectedIsHD: " + selectedIsHD)}
                {console.log("selectedType: " + selectedType)} */}
                <button
                  onClick={
                    !selectedType
                      ? handleAddBrandsWarning
                      : handleAddBrandsTable
                  }
                  type="button"
                  className="btn btn-primary"
                >
                  Add Brands
                </button>
              </div>
            </Col>
          </Row>

          <Table
            className="table mb-0"
            style={{
              minHeight: "200px",
              maxHeight: "200px",
              overflowY: "hidden",
            }}
          >
            <thead>
              <tr>
                <th
                  style={{
                    maxWidth: 10,
                  }}
                >
                  #
                </th>
                <th>Brand Name</th>
                <th>Box Type</th>
                <th>CAS</th>
                <th>Brand Type</th>
                <th>$</th>
              </tr>
            </thead>
            {/* {console.log(
              "alacarteData after add:" + JSON.stringify(alacarteData)
            )} */}
            <tbody>
              {stbbrands &&
                stbbrands.map((item, index) => (
                  <tr key={index}>
                    <th
                      scope="row"
                      style={{
                        maxWidth: 10,
                      }}
                    >
                      {index + 1}
                    </th>
                    <td
                      style={{
                        maxWidth: 50,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {item.name}
                    </td>
                    <td
                      style={{
                        maxWidth: 50,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {item.box_type_lbl}
                    </td>
                    <td
                      style={{
                        maxWidth: 40,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {item.cas_lbl}
                    </td>
                    <td>{item.type_lbl}</td>

                    <td>
                      <h5>
                        <Link
                          className="text-dark"
                          to="#"
                          onClick={() => deleteBrand(index)}
                        >
                          <i
                            className="mdi mdi-delete font-size-18"
                            id="deletetooltip"
                          />
                        </Link>
                      </h5>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>

          {/* <Count
            ftaCount={ftaCount}
            paychannelCount={paychannelCount}
            ncfCount={ncfCount}
            totalChannel={totalChannel}
            totalRate={totalRate}
          /> */}
        </CardBody>
        {/* <CardFooter className="fixed">
          <div style={{ display: "flex" }}>
            <Row
              style={{
                border: "1px solid #ced4da",
                padding: "5px 0px",
                margin: "1px 0px",
                width: "450px",
                height: "50px",
                display: "flex",
              }}
            >
              <div
                style={{
                  backgroundColor: "#fff",
                  padding: "10px",
                  width: "100%",
                  boxSizing: "border-box",
                }}
              >
                <h6 style={{ textAlign: "left", margin: 0 }}>
            
                  Total Channels: {totalChannelsInChannels}
                </h6>
              </div>
            </Row>
            <Row
              style={{
                border: "1px solid #ced4da",
                padding: "5px 0px",
                margin: "1px 0px",
                width: "250px",
                display: "flex",
              }}
            >
              <div
                style={{
                  backgroundColor: "#fff",
                  padding: "10px",
                  width: "100%",
                  boxSizing: "border-box",
                }}
              >
                <h6 style={{ textAlign: "center", margin: 0 }}>
            
                  Total: {parseFloat(totalPackageRateInChannels).toFixed(2)}
                </h6>
              </div>
            </Row>
          </div>
        </CardFooter> */}
      </Card>
    </React.Fragment>
  );
};

AddBrands.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default AddBrands;
