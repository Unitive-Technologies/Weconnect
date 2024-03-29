import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import TableContainer from "../../../components/Common/TableContainer";
import {
  Card,
  CardBody,
  Col,
  Input,
  Row,
  Toast,
  ToastHeader,
  Modal,
  ModalBody,
  ModalHeader,
  ToastBody,
  ModalFooter,
  Form,
} from "reactstrap";
import { Link } from "react-router-dom";
import TableContainerX from "../../../components/Common/TableContainerX";

const SelectBrandTableList = (props) => {
  const { isOpen, data, toggleClose, setBrands, isHD } = props;

  console.log("isHD on selectbrandtable list:" + isHD);

  const [selectedRows, setSelectedRows] = useState([]);

  const handleSelectedRows = (row) => {
    // Check if the row is already selected
    const isSelected = selectedRows.some(
      (selectedRow) => selectedRow.id === row.id
    );

    // If the row is selected, remove it from the selected rows array
    if (isSelected) {
      const updatedSelectedRows = selectedRows.filter(
        (selectedRow) => selectedRow.id !== row.id
      );
      setSelectedRows(updatedSelectedRows);
    } else {
      // If the row is not selected, add it to the selected rows array
      setSelectedRows([...selectedRows, row]);
    }
  };
  console.log("selectedRows:" + JSON.stringify(selectedRows));

  const handleAddButtonClick = () => {
    setBrands(selectedRows);
    toggleClose();
  };

  const columns = useMemo(
    () => [
      // {
      //   Header: "*",
      //   disableFilters: true,
      //   filterable: true,

      //   Cell: (cellProps) => {
      //     return (
      //       <input
      //         type="checkbox"
      //         disabled={
      //           isHD === "0" && cellProps.row.original.channel_type_lbl === "HD"
      //         }
      //       />
      //     );
      //   },
      //   getRowProps: (row) => {
      //     if (isHD === "0" && row.original.channel_type_lbl === "HD") {
      //       return {
      //         style: {
      //           background: "red",
      //           pointerEvents: "none", // Disable clicking
      //         },
      //       };
      //     } else {
      //       return {
      //         style: {
      //           background: "inherit", // Use default background color
      //         },
      //       };
      //     }
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
                  {cellProps.row.original.name}
                </Link>
              </h5>
            </>
          );
        },
      },
      {
        Header: "Box Type",
        // accessor: "broadcaster_lbl",
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
                  {cellProps.row.original.box_type_lbl}
                </Link>
              </h5>
            </>
          );
        },
      },
      {
        Header: "CAS",
        // accessor: "channel_type_lbl",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <>
              <h5
                // style={{
                //   color:
                //     isHD === "0" &&
                //     cellProps.row.original.channel_type_lbl === "HD" &&
                //     "red",
                // }}
                className="font-size-14 mb-1"
              >
                {cellProps.row.original.cas_lbl}
              </h5>
            </>
          );
        },
      },

      {
        Header: "Brand Type",
        // accessor: "isAlacarte_lbl",
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
                  {cellProps.row.original.type_lbl}
                </Link>
              </h5>
            </>
          );
        },
      },
    ],
    [isHD]
  );

  return (
    <Modal
      isOpen={isOpen}
      role="dialog"
      autoFocus={true}
      centered={true}
      className="exampleModal"
      tabIndex="-1"
      size="xl"
      toggle={toggleClose}
    >
      <ModalHeader toggle={toggleClose} tag="h4">
        Add Brands
      </ModalHeader>
      <ModalHeader tag="h6">
        **To Select row, Click <i className="bx bx-bx bx-check"></i>
      </ModalHeader>
      <ModalBody>
        <Card>
          <CardBody>
            {/* {isLoading ? (
            <Spinners setLoading={setLoading} />
          ) : ( */}
            <TableContainer
              isPagination={true}
              columns={columns}
              data={data}
              // getRowProps={(row) => ({
              //   style: {
              //     background:
              //       definition === "0" && row.original.channel_type_lbl === "HD"
              //         ? "red"
              //         : "inherit",
              //   },
              // })}
              handleRowClick={(row) => handleSelectedRows(row)}
              isGlobalFilter={true}
              isShowingPageLength={true}
              customPageSize={50}
              tableClass="table align-middle table-nowrap table-hover"
              theadClass="table-light"
              paginationDiv="col-sm-12 col-md-7"
              pagination="pagination pagination-rounded justify-content-end mt-4"
            />

            <div
              style={{
                backgroundColor: "#fff",
                padding: "10px",
                width: "100%",
                boxSizing: "border-box",
              }}
            >
              <h6 style={{ textAlign: "left", margin: 0 }}>
                *Click to select brands
              </h6>
            </div>
            <div
              style={{
                backgroundColor: "#fff",
                padding: "10px",
                width: "100%",
                boxSizing: "border-box",
              }}
            >
              <h6 style={{ textAlign: "left", margin: 0 }}>
                **SD brands cannot be added to HD Schemes
              </h6>
            </div>
            <Row>
              <Col>
                <ModalFooter>
                  <button
                    type="submit"
                    className="btn btn-success save-user"
                    onClick={handleAddButtonClick}
                    disabled={!selectedRows}
                  >
                    ADD
                  </button>
                </ModalFooter>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </ModalBody>
    </Modal>
  );
};

SelectBrandTableList.propTypes = {
  toggleClose: PropTypes.func,
  isOpen: PropTypes.bool,
  data: PropTypes.array,
};

export default SelectBrandTableList;
