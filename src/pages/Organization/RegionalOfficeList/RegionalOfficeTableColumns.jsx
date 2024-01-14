import React, { useMemo } from "react";
import { Link } from "react-router-dom";

export const Columns = [
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
              {}
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
    Header: "Code",
    accessor: "code",
    filterable: true,
    Cell: (cellProps) => {
      return <p className="text-muted mb-0">{cellProps.row.original.code}</p>;
    },
  },
  {
    Header: "Address",
    accessor: "addr",
    filterable: true,
    Cell: (cellProps) => {
      return <p className="text-muted mb-0">{cellProps.row.original.addr}</p>;
    },
  },
  {
    Header: "Contact Person",
    accessor: "contact_person",
    filterable: true,
    Cell: (cellProps) => {
      return (
        <p className="text-muted mb-0">
          {cellProps.row.original.contact_person}
        </p>
      );
    },
  },
  {
    Header: "Mobile",
    accessor: "mobile_no",
    filterable: true,
    Cell: (cellProps) => {
      return (
        <p className="text-muted mb-0">{cellProps.row.original.mobile_no}</p>
      );
    },
  },
  {
    Header: "State",
    accessor: "state_lbl",
    filterable: true,
    Cell: (cellProps) => {
      return (
        <p className="text-muted mb-0">{cellProps.row.original.state_lbl}</p>
      );
    },
  },
  {
    Header: "District",
    accessor: "District_lbl",
    filterable: true,
    Cell: (cellProps) => {
      return (
        <p className="text-muted mb-0">{cellProps.row.original.district_lbl}</p>
      );
    },
  },
  {
    Header: "City",
    accessor: "city_lbl",
    filterable: true,
    Cell: (cellProps) => {
      return (
        <p className="text-muted mb-0">{cellProps.row.original.city_lbl}</p>
      );
    },
  },
  {
    Header: "GST",
    accessor: "gstno",
    filterable: true,
    Cell: (cellProps) => {
      return <p className="text-muted mb-0">{cellProps.row.original.gstno}</p>;
    },
  },
  {
    Header: "PAN",
    accessor: "panno",
    filterable: true,
    Cell: (cellProps) => {
      return <p className="text-muted mb-0">{cellProps.row.original.panno}</p>;
    },
  },
  {
    Header: "Login ID",
    accessor: "username",
    filterable: true,
    Cell: (cellProps) => {
      return (
        <p className="text-muted mb-0">{cellProps.row.original.username}</p>
      );
    },
  },
  {
    Header: "Status",
    accessor: "status",
    filterable: true,
    Cell: (cellProps) => {
      return <p className="text-muted mb-0">{cellProps.row.original.status}</p>;
    },
  },
  {
    Header: "Created At",
    accessor: "created_at",
    filterable: true,
    Cell: (cellProps) => {
      return (
        <p className="text-muted mb-0">{cellProps.row.original.created_at}</p>
      );
    },
  },
  {
    Header: "Created By",
    accessor: "created_by",
    filterable: true,
    Cell: (cellProps) => {
      return (
        <p className="text-muted mb-0">{cellProps.row.original.created_by}</p>
      );
    },
  },
];
