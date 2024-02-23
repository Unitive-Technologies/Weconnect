import React, { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import TableContainer from "../../../components/Common/TableContainer";
import {
  Card,
  CardBody,
  Col,
  Input,
  Row,
  Toast,
  ToastHeader,
  ToastBody,
  Table,
  CardFooter,
} from "reactstrap";
import { Link } from "react-router-dom";
import SelectBrandTableList from "./SelectBrandTableList";

const AddBrands = (props) => {
  const { isHD, brands, setBrands } = props;

  console.log("ISHD after:" + isHD, typeof isHD);
  const [addBrandsList, setAddBrandsList] = useState([]);

  {
    console.log("brandssssssssssssssssss:" + JSON.stringify(brands));
  }
  const API_URL = "https://sms.unitch.in/api/index.php/v1";

  const [showAddBrandsPlus, setShowAddBrandsPlus] = useState(false);
  const [showBrandsTableList, setShowBrandsTableList] = useState(false);

  const toggleBrandsTablesList = () => {
    setShowBrandsTableList(!showBrandsTableList);
  };
  const toggleAddBrandsWarning = () => {
    setShowAddBrandsPlus(!showAddBrandsPlus);
  };

  const handleAddBrandsTable = async (e) => {
    setShowBrandsTableList(true);
    try {
      const token = "Bearer " + localStorage.getItem("temptoken");

      const response = await axios.get(
        `${API_URL}/brand/list?fields=id,name&expand=box_type_lbl,type_lbl,cas_lbl&filter[type][]=1&filter[type][]=3&vr=web1.0`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setAddBrandsList(response.data.data);
    } catch (error) {
      console.error("Error fetching addChannels data:", error);
    }
  };
  console.log("ShowBrandsTableList:" + JSON.stringify(addBrandsList));

  const deleteBrands = (index) => {
    const list = [...brands];
    list.splice(index, 1);
    setBrands, list;
  };

  return (
    <>
      <SelectBrandTableList
        isOpen={showBrandsTableList}
        data={addBrandsList}
        toggleClose={toggleBrandsTablesList}
        setBrands={setBrands}
        isHD={isHD}
      />

      <div
        className="position-fixed top-0 end-0 p-3"
        style={{ zIndex: "1005" }}
      >
        <Toast isOpen={showAddBrandsPlus}>
          <ToastHeader toggle={toggleAddBrandsWarning}>
            <i className="mdi mdi-alert-outline me-2"></i> Warning
          </ToastHeader>
          <ToastBody>
            {isHD === "" && "Please select Scheme Type First"}
          </ToastBody>
        </Toast>
      </div>

      <Card>
        <CardBody>
          <Row>
            <Col lg={8}></Col>
            <Col lg={4}>
              <div className="mb-3  d-flex justify-content-end">
                <button
                  onClick={
                    isHD !== "" ? handleAddBrandsTable : toggleAddBrandsWarning
                  }
                  type="button"
                  className="btn btn-primary"
                >
                  Add Brands
                  {/* <i className="mdi mdi-plus ms-1" style={{ fontSize: 20 }}></i> */}
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

            <tbody>
              {brands &&
                brands.map((item, index) => (
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
                        maxWidth: 100,
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
                    <td>{item.cas_lbl}</td>
                    <td>{item.type_lbl}</td>
                    <td>
                      <h5>
                        <Link
                          className="text-dark"
                          to="#"
                          onClick={() => deleteBrands(index)}
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
        </CardBody>
      </Card>
    </>
  );
};

AddBrands.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default AddBrands;
