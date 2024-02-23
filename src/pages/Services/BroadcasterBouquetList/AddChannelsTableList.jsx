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

const AddChannelsTableList = (props) => {
  const { isOpen, data, toggleClose, setChannels, definition } = props;
  console.log("data in addchannels table:" + JSON.stringify(data));
  console.log("data in definition" + definition);

  const [selectedRows, setSelectedRows] = useState([]);

  const handleSelectedRows = (row) => {
    const isSelected = selectedRows.some(
      (selectedRow) => selectedRow.id === row.id
    );

    const channel_type_lbl = row.channel_type_lbl;

    if (
      (isSelected && channel_type_lbl === "HD" && definition === 1) ||
      !isSelected
    ) {
      const updatedSelectedRows = isSelected
        ? selectedRows.filter((selectedRow) => selectedRow.id !== row.id)
        : [...selectedRows, row];

      setSelectedRows(updatedSelectedRows);
    }
  };
  console.log("selectedRows:" + JSON.stringify(selectedRows));

  const handleAddButtonClick = () => {
    setChannels(selectedRows);
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
              disabled={
                definition === "0" &&
                cellProps.row.original.channel_type_lbl === "HD"
              }
            />
          );
        },
        getRowProps: (row) => {
          if (definition === "0" && row.original.channel_type_lbl === "HD") {
            return {
              style: {
                background: "red",
                pointerEvents: "none", // Disable clicking
              },
            };
          } else {
            return {
              style: {
                background: "inherit", // Use default background color
              },
            };
          }
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
        Header: "Broadcaster",
        accessor: "broadcaster_lbl",
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
                  {cellProps.row.original.broadcaster_lbl}
                </Link>
              </h5>
            </>
          );
        },
      },
      {
        Header: "Type",
        accessor: "channel_type_lbl",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <>
              <h5
                style={{
                  color:
                    definition === "0" &&
                    cellProps.row.original.channel_type_lbl === "HD" &&
                    "red",
                }}
                className="font-size-14 mb-1"
              >
                {cellProps.row.original.channel_type_lbl}
              </h5>
            </>
          );
        },
      },

      {
        Header: "Alacarte",
        accessor: "isAlacarte_lbl",
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
                  {cellProps.row.original.isAlacarte_lbl}
                </Link>
              </h5>
            </>
          );
        },
      },
      {
        Header: "FTA",
        accessor: "isFta_lbl",
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
                  {cellProps.row.original.isFta_lbl}
                </Link>
              </h5>
            </>
          );
        },
      },
      {
        Header: "Rate",
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
                  {parseFloat(cellProps.row.original.broadcasterRate).toFixed(
                    2
                  )}
                </Link>
              </h5>
            </>
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
      autoFocus={true}
      centered={true}
      className="exampleModal"
      tabIndex="-1"
      size="xl"
      toggle={toggleClose}
    >
      <ModalHeader toggle={toggleClose} tag="h4">
        Add Channels
      </ModalHeader>
      <ModalHeader tag="h6">
        **To Select row, Click <i className="bx bx-bx bx-check"></i>
      </ModalHeader>
      <ModalBody>
        <Card>
          <CardBody>
            <TableContainer
              isPagination={true}
              columns={columns}
              data={data}
              handleRowClick={(row) => {
                handleSelectedRows(row);
              }}
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

AddChannelsTableList.propTypes = {
  toggleClose: PropTypes.func,
  isOpen: PropTypes.bool,
  data: PropTypes.array,
};

export default AddChannelsTableList;
