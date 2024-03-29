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

const AddPackagesTableList = (props) => {
  const {
    isOpen,
    data,
    toggleClose,
    selectedType,
    selectedIsHD,
    setPackagesData,
  } = props;
  console.log("data in alacarteTable List:" + JSON.stringify(data));
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
    setPackagesData(selectedRows);
    toggleClose();
  };

  const columns = useMemo(
    () => [
      {
        Header: "*",
        disableFilters: true,
        filterable: true,

        Cell: (cellProps) => {
          return (
            <input
              type="checkbox"
              // disabled={
              //   definition === "0" &&
              //   cellProps.row.original.channel_type_lbl === "HD"
              // }
            />
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
        Header: "Name",
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
        Header: "Code",
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
                  {cellProps.row.original.code}
                </Link>
              </h5>
            </>
          );
        },
      },
      {
        Header: "Type",
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
                  {cellProps.row.original.package_type_lbl}
                </Link>
              </h5>
            </>
          );
        },
      },
      {
        Header: "Package Type",
        // accessor: "channel_type_lbl",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <>
              <h5
                // style={{
                //   color:
                //     definition === "0" &&
                //     cellProps.row.original.channel_type_lbl === "HD" &&
                //     "red",
                // }}
                className="font-size-14 mb-1"
              >
                {cellProps.row.original.isFta_lbl}
              </h5>
            </>
          );
        },
      },

      {
        Header: "Channel Count",
        // accessor: "isFta_lbl",
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
                  {cellProps.row.original.channelIds.length}
                </Link>
              </h5>
            </>
          );
        },
      },

      {
        Header: "BBQ Count",
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
                  {cellProps.row.original.brdBouqueIds.length}
                </Link>
              </h5>
            </>
          );
        },
      },
      {
        Header: "NCF Count",
        // accessor: "broadcasterRate",
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
                  {cellProps.row.original.ncfChannelCount}
                </Link>
              </h5>
            </>
          );
        },
      },
      {
        Header: "Total Channel Count",
        accessor: "broadcasterRate",
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
                  {cellProps.row.original.totalChannelCount}
                </Link>
              </h5>
            </>
          );
        },
      },
      {
        Header: "Rate",
        // accessor: "broadcasterRate",
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
                  {cellProps.row.original.broadcasterRate}
                </Link>
              </h5>
            </>
          );
        },
      },
    ],
    [data]
    // [definition]
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
        Add Packages
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
          </CardBody>

          <div
            style={{
              backgroundColor: "#fff",
              padding: "10px",
              width: "100%",
              boxSizing: "border-box",
            }}
          >
            <h6 style={{ textAlign: "left", margin: 0 }}>
              *Click tick to select channels
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
              **HD packages can contain both types(HD & SD)
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
        </Card>
      </ModalBody>
    </Modal>
  );
};

AddPackagesTableList.propTypes = {
  toggleClose: PropTypes.func,
  isOpen: PropTypes.bool,
  data: PropTypes.array,
};

export default AddPackagesTableList;
