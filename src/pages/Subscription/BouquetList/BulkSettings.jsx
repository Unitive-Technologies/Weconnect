import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import withRouter from "../../../components/Common/withRouter";
import TableContainer from "../../../components/Common/TableContainer";
import {
  Card,
  CardBody,
  Col,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from "reactstrap";
import { getBouquet as onGetBouquet } from "/src/store/actions";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { ToastContainer } from "react-toastify";
import SelectedBouquets from "./SelectedBouquets";
import SettingTable from "./SettingTable";

const BulkSettings = (props) => {
  const { isOpen, toggle, bouquets } = props;
  //meta title
  document.title = "Bouquets | VDigital";
  const API_URL = "https://sms.unitch.in/api/index.php/v1";
  const [settingTableList, setSettingTableList] = useState([]);
  const [tableList, setTableList] = useState([]);
  const [selectedBouquets, setSelectedBouquets] = useState([]);

  const handleActive = (row) => {
    const isRowSelected = selectedBouquets.some((user) => user.id === row.id);

    setTableList((prevTableList) =>
      prevTableList.filter((user) => user.id !== row.id)
    );

    if (isRowSelected) {
      setSelectedBouquets((prevSelectedUsers) =>
        prevSelectedUsers.filter((user) => user.id !== row.id)
      );
    } else {
      setSelectedBouquets((prevSelectedUsers) => [...prevSelectedUsers, row]);
    }

    // Ensure that row.original exists before accessing its properties
    if (row.original) {
      row.original.isSelected = !isRowSelected;
    }
  };

  const columns = useMemo(
    () => [
      {
        Header: "*",
        disableFilters: true,
        filterable: true,
        Cell: (cellProps) => (
          <input
            type="checkbox"
            onChange={() => handleCheckboxClick(cellProps.row.original)}
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
        Header: "Name",
        accessor: "name",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <>
              <h5 className="font-size-14 mb-1">
                <Link className="text-dark" to="#">
                  {cellProps.row.original.name}
                </Link>
              </h5>
            </>
          );
        },
      },
      {
        Header: "Code",
        accessor: "code",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">{cellProps.row.original.code}</p>
          );
        },
      },
      {
        Header: "Bouquet Type",
        accessor: "bouquettype",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">{cellProps.row.original.type_lbl}</p>
          );
        },
      },
      {
        Header: "Status",
        accessor: "status",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">{cellProps.row.original.status}</p>
          );
        },
      },
      {
        Header: "Settings",
        accessor: "is_exclusive_lbl",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              IS EXCLUSIVE:{cellProps.row.original.is_exclusive_lbl}
            </p>
          );
        },
      },
    ],
    [bouquets]
  );

  useEffect(() => {
    const getSettingData = async () => {
      try {
        const token = "Bearer " + localStorage.getItem("temptoken");
        const response = await axios.get(
          `${API_URL}/bouque/setting?fields=id,name&vr=web1.0`,

          {
            headers: {
              Authorization: token,
            },
          }
        );
        console.log(
          "tableList in useEffect: " + JSON.stringify(response.data.data)
        );
        setSettingTableList(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getSettingData();
  }, []);
  useEffect(() => {
    if (bouquets) {
      setTableList(bouquets);
    }
  }, [bouquets]);

  return (
    <React.Fragment>
      <Modal
        isOpen={isOpen}
        role="dialog"
        autoFocus={true}
        centered={true}
        className="exampleModal"
        tabIndex="-1"
        toggle={toggle}
        size="xl"
      >
        <ModalHeader toggle={toggle} tag="h4">
          Bulk Assign Bouquet
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <TableContainer
                    isPagination={true}
                    columns={columns}
                    data={tableList}
                    isGlobalFilter={true}
                    isShowingPageLength={true}
                    handleRowClick={(row) => handleActive(row)}
                    customPageSize={8}
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
            <p style={{ fontWeight: "bold" }}>Selected Bouquets</p>
          </div>
          <Row
            style={{
              position: "relative",
              border: "1px solid #ced4da",
              padding: "20px 0px",
              margin: "30px 0px",
            }}
          >
            <SelectedBouquets selectedBouquets={selectedBouquets} />
          </Row>
          <div
            style={{
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
            <p style={{ fontWeight: "bold" }}>Bouquet settings</p>
          </div>
          <Row
            style={{
              position: "relative",
              border: "1px solid #ced4da",
              padding: "20px 0px",
              margin: "30px 0px",
            }}
          >
            <SettingTable settingTableList={settingTableList} />
          </Row>
          <Row>
            <Col sm="12">
              <div className="d-flex flex-wrap gap-2">
                <button type="submit" className="btn btn-success save-user">
                  Save
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
              </div>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
      <ToastContainer />
    </React.Fragment>
  );
};

export default withRouter(BulkSettings);
