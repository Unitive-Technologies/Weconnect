import React, { useEffect, useState, useRef, useMemo } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import TableContainer from "../../../../components/Common/TableContainer";
import Spinners from "../../../../components/Common/Spinner";
import {
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Toast,
  ToastHeader,
  ToastBody,
} from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "/src/components/Common/Breadcrumb";

import { getRegionalOffice as onGetRegionalOffice } from "/src/store/actions";

//redux
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { ToastContainer } from "react-toastify";
import AddOrUpdateCommission from "./AddOrUpdateCommission";

const AllottedBouquet = ({ allottedBouquetData, selectedRowId }) => {
  //meta title
  document.title = "LCO | VDigital";
  const API_URL = "https://sms.unitch.in/api/index.php/v1";
  const [selectedRows, setSelectedRows] = useState([]);
  const [showAddOrUpdateModal, setShowAddOrUpdateModal] = useState(false);
  const [selectedWholeRows, setSelectedWholeRows] = useState([]);
  const handleRowSelection = (row) => {
    console.log("Row clicked:", row.original);
    const selectedId = row.original.id;
    const selectedRowFullDetails = row.original;
    console.log("selectedId:", selectedId);
    setSelectedRows((prevSelectedRows) => {
      const isSelected = prevSelectedRows.includes(selectedId);
      if (isSelected) {
        return prevSelectedRows.filter((id) => id !== selectedId);
      } else {
        return [...prevSelectedRows, selectedId];
      }
    });
    setSelectedWholeRows((prevSelectedRows) => {
      const isSelected = prevSelectedRows.includes(selectedRowFullDetails);
      if (isSelected) {
        return prevSelectedRows.filter((id) => id !== selectedId);
      } else {
        return [...prevSelectedRows, selectedRowFullDetails];
      }
    });
    console.log("selectedRows:", JSON.stringify(selectedRows));
  };

  // const handleRowSelection = (row) => {
  //   console.log("Row clicked:", row.original);

  //   const selectedRowIds = selectedRows.map((r) => r.id);
  //   if (selectedRowIds.includes(row.original.id)) {
  //     setSelectedRows(selectedRows.filter((r) => r.id !== row.original.id));
  //   } else {
  //     setSelectedRows([...selectedRows, row.original.id]);
  //   }
  //   console.log("Selected rows:", JSON.stringify(selectedRows));
  // };

  const columns = useMemo(
    () => [
      {
        Header: "*",
        disableFilters: true,
        filterable: true,
        Cell: (cellProps) => (
          <input
            type="checkbox"
            onClick={() => handleRowSelection(cellProps.row)}
            // checked={selectedRows.some(
            //   (r) => r.id === cellProps.row.original.id
            // )}
          />
        ),
      },
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
        Header: "Name",
        accessor: "name",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <>
              <h5
                className="font-size-14 mb-1"
                style={{
                  maxWidth: 200,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
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
        Header: "Commission(%)",
        accessor: "addr",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              {cellProps.row.original.commision}
            </p>
          );
        },
      },
      {
        Header: "Type",
        accessor: "contact_person",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              {cellProps.row.original.boxtype_lbl}
            </p>
          );
        },
      },
      {
        Header: "Bouquet Type",
        accessor: "mobile_no",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">{cellProps.row.original.type_lbl}</p>
          );
        },
      },
      {
        Header: "Status",
        accessor: "state_lbl",
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
        Header: "Is Refundable",
        accessor: "District_lbl",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              {cellProps.row.original.is_refundable === 1 ? "Yes" : "No"}
            </p>
          );
        },
      },
      {
        Header: "Allotted By",
        accessor: "city_lbl",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              {cellProps.row.original.created_by_lbl}
            </p>
          );
        },
      },
    ],
    []
  );

  const handleRemoveRows = async (e) => {
    e.preventDefault();

    console.log("remove btn clicked");
    console.log("selectedRows:" + JSON.stringify(selectedRows));

    try {
      const selectedRowsToBeRemove = {
        operator_id: selectedRowId,
        bouque_ids: selectedRows,
      };

      console.log("newUpload:", JSON.stringify(selectedRowsToBeRemove));

      const token = "Bearer " + localStorage.getItem("temptoken");

      const response = await axios.put(
        `${API_URL}/operator-bouque/${selectedRowId}?vr=web1.0`,
        selectedRowsToBeRemove,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      console.log("response after submitting remove form:", response.data);
    } catch (error) {
      console.error("Error submitting remove form:", error);
    }
  };

  const toggleAddOrUpdateModal = () => {
    setShowAddOrUpdateModal(!showAddOrUpdateModal);
  };
  // const handleAddOrUpdate = async (e) => {
  //   e.preventDefault();

  //   console.log("selectedRows:" + JSON.stringify(selectedRows));

  //   try {
  //     const selectedRowsToAddOrUpdate = {
  //       operator_id: selectedRowId,
  //       bouque_ids: selectedRows,
  //       commision: 0,
  //     };

  //     console.log("newUpload:", JSON.stringify(selectedRowsToAddOrUpdate));

  //     const token = "Bearer " + localStorage.getItem("temptoken");

  //     const response = await axios.post(
  //       `${API_URL}/operator-bouque?vr=web1.0`,
  //       selectedRowsToAddOrUpdate,
  //       {
  //         headers: {
  //           Authorization: token,
  //         },
  //       }
  //     );

  //     console.log("response after submitting remove form:", response.data);
  //   } catch (error) {
  //     console.error("Error submitting remove form:", error);
  //   }
  // };
  const getTableActions = () => {
    return [
      {
        name: "Add/Update Commission",
        action: selectedRows.length ? toggleAddOrUpdateModal : handleWarning,
        type: "normal",
        icon: "create",
      },
      {
        name: "Remove",
        action: selectedRows.length ? handleRemoveRows : handleWarning,
        type: "normal",
        // icon: "create",
      },
    ];
  };
  const [showWarning, setShowWarning] = useState(false);
  const handleWarning = () => {
    setShowWarning(!showWarning);
  };
  return (
    <React.Fragment>
      <AddOrUpdateCommission
        selectedRows={selectedWholeRows}
        selectedRowId={selectedRowId}
        isOpen={showAddOrUpdateModal}
        toggleAddOrUpdateModal={toggleAddOrUpdateModal}
      />
      <div
        className="position-fixed top-0 end-0 p-3"
        style={{ zIndex: "1005" }}
      >
        <Toast isOpen={showWarning}>
          <ToastHeader toggle={handleWarning}>
            <i className="mdi mdi-alert-outline me-2"></i> Warning
          </ToastHeader>
          <ToastBody>Cannot select atleast one Bouquet</ToastBody>
        </Toast>
      </div>
      <Row>
        <Col lg="12">
          <Card>
            <CardBody>
              {/* {console.log(
                "bouquet details:" + JSON.stringify(allottedBouquetData)
              )} */}

              <TableContainer
                isPagination={true}
                columns={columns}
                data={allottedBouquetData}
                isGlobalFilter={true}
                isAddRegionalOffice={true}
                isShowingPageLength={true}
                tableActions={getTableActions()}
                handleRowClick={(row) => handleRowSelection(row)}
                isShowTableActionButtons={true}
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
    </React.Fragment>
  );
};

export default AllottedBouquet;
