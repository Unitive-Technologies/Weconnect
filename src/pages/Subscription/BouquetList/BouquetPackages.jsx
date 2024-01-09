import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import TableContainer from "../../../components/Common/TableContainer";
import {
  Card,
  CardBody,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import { Link } from "react-router-dom";

const AddbouquetPackages = (props) => {
  const { bouquetpackages, isOpen, toggle } = props;

  const columns = useMemo(
    () => [
      {
        Header: "*",
        disableFilters: true,
        id: "*",
        filterable: true,
        Cell: (cellProps) => {
          return <input type="checkbox" />;
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
        accessor: "name",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">{cellProps.row.original.name}</p>
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
        Header: "Type",
        accessor: "package_type_lbl",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              {cellProps.row.original.package_type_lbl}
            </p>
          );
        },
      },
      {
        Header: "Package Type",
        accessor: "isFta_lbl",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              {cellProps.row.original.isFta_lbl}
            </p>
          );
        },
      },
      {
        Header: "Channel Count",
        accessor: "ftaChannelCount",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              {cellProps.row.original.ftaChannelCount}
            </p>
          );
        },
      },
      //   {
      //     Header: "BBQ Count",
      //     accessor: "status",
      //     filterable: true,
      //     Cell: (cellProps) => {
      //       return (
      //         <p className="text-muted mb-0">
      //           {cellProps.row.original.isNcf_lbl}
      //         </p>
      //       );
      //     },
      //   },
      {
        Header: "NCF Count",
        accessor: "ncfChannelCount",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              {cellProps.row.original.ncfChannelCount}
            </p>
          );
        },
      },
      {
        Header: "Total Channel Count",
        accessor: "totalChannelCount",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              {cellProps.row.original.totalChannelCount}
            </p>
          );
        },
      },
      {
        Header: "Rate",
        accessor: "broadcasterRate",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              {cellProps.row.original.broadcasterRate}
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
      autoFocus={true}
      centered={true}
      className="exampleModal"
      tabIndex="-1"
      toggle={toggle}
      size="xl"
    >
      <ModalHeader toggle={toggle}>Add Bouquet packages</ModalHeader>
      <ModalBody>
        <Card>
          <CardBody>
            <TableContainer
              isPagination={true}
              columns={columns}
              data={bouquetpackages}
              isGlobalFilter={true}
              isShowingPageLength={true}
              tableClass="table align-middle table-nowrap table-hover"
              theadClass="table-light"
              paginationDiv="col-sm-12 col-md-7"
              pagination="pagination pagination-rounded justify-content-end mt-4"
            />
          </CardBody>
        </Card>
      </ModalBody>
      <ModalFooter>
        <button type="submit" className="btn btn-success save-user">
          Add
        </button>
      </ModalFooter>
    </Modal>
  );
};

AddbouquetPackages.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default AddbouquetPackages;
