import React, { useEffect, useState, useRef, useMemo, Fragment } from "react";
import withRouter from "../../../components/Common/withRouter";
import Spinners from "../../../components/Common/Spinner";
import { Card, CardBody, Col, Container, Row, Table } from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "/src/components/Common/Breadcrumb";

// import { getRegionalOffice as onGetRegionalOffice } from "/src/store/regionaloffice/actions";

//redux
import { getRegionalOffice } from "../../../helpers/fakebackend_helper";

import {
  RESPONSE_HEADER_CURRENT_PAGE,
  RESPONSE_HEADER_PAGE_COUNT,
  RESPONSE_HEADER_PER_PAGE,
  RESPONSE_HEADER_TOTAL_COUNT,
} from "../../../constants/strings";
import { useTable } from "react-table";
import { Link } from "react-router-dom";

const columns =
  // useMemo(
  //   () =>
  [
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
          <p className="text-muted mb-0">
            {cellProps.row.original.district_lbl}
          </p>
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
        return (
          <p className="text-muted mb-0">{cellProps.row.original.gstno}</p>
        );
      },
    },
    {
      Header: "PAN",
      accessor: "panno",
      filterable: true,
      Cell: (cellProps) => {
        return (
          <p className="text-muted mb-0">{cellProps.row.original.panno}</p>
        );
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
        return (
          <p className="text-muted mb-0">{cellProps.row.original.status}</p>
        );
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
//   ,
//   []
// );

const NewRegionalOfficeList = (props) => {
  //meta title
  document.title = "Regional Offices | VDigital";

  const [isLoading, setLoading] = useState(false);
  const [currPage, setCurrPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);

  const [data, setData] = useState([]); // Array for current page data
  const [pageIndex, setPageIndex] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const fetchData = async () => {
    // Perform API call or fetch data from the server with pagination parameters
    getRegionalOffice(pageIndex + 1).then((result) => {
      setData(result.data.data);
      setTotalPages(result.headers[RESPONSE_HEADER_PAGE_COUNT]);
    });
  };

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  useEffect(() => {
    fetchData();
  }, [pageIndex]);

  const generateSortingIndicator = (column) => {
    return column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : "";
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Organization" breadcrumbItem="Regional Offices" />
          {isLoading ? (
            <Spinners setLoading={setLoading} />
          ) : (
            <Row>
              <Col lg="12">
                <Card>
                  <CardBody>
                    <table
                      {...getTableProps()}
                      className="table align-middle table-nowrap table-hover"
                    >
                      {/* Render header */}
                      <thead className={"table-light"}>
                        {headerGroups.map((headerGroup) => (
                          <tr
                            key={headerGroup.id}
                            {...headerGroup.getHeaderGroupProps()}
                          >
                            {headerGroup.headers.map((column) => (
                              <th
                                {...column.getHeaderProps()}
                                key={column.id}
                                className={column.isSort ? "sorting" : ""}
                              >
                                <div>
                                  {column.render("Header")}
                                  {generateSortingIndicator(column)}
                                </div>
                                {/* <Filter column={column} /> */}
                              </th>
                            ))}
                          </tr>
                        ))}
                      </thead>
                      <tbody {...getTableBodyProps()}>
                        {rows.map((row) => {
                          prepareRow(row);
                          return (
                            <Fragment key={row.getRowProps().key}>
                              <tr onClick={() => {}}>
                                {row.cells.map((cell) => {
                                  return (
                                    <td key={cell.id} {...cell.getCellProps()}>
                                      {cell.render("Cell")}
                                    </td>
                                  );
                                })}
                              </tr>
                            </Fragment>
                          );
                        })}
                      </tbody>
                    </table>

                    {/* Render pagination controls */}
                    <div>
                      <button
                        onClick={() =>
                          setPageIndex((prev) => Math.max(prev - 1, 0))
                        }
                      >
                        Previous
                      </button>
                      <span>
                        Page {pageIndex + 1} of {totalPages}
                      </span>
                      <button
                        onClick={() =>
                          setPageIndex((prev) =>
                            Math.min(prev + 1, totalPages - 1)
                          )
                        }
                      >
                        Next
                      </button>
                    </div>

                    {/* <RegionalTable /> */}
                    {/* <NewTableContainer
                      isPagination={true}
                      isLoading={isLoading}
                      columns={Columns}
                      data={regionaloffices}
                      isGlobalFilter={true}
                      isShowTableActionButtons={true}
                      isShowingPageLength={true}
                      iscustomPageSizeOptions={true}
                      tableActions={getTableActions()}
                      customPageSize={perPage}
                      // setCustomPageSize={handlePerPageChange}
                      currentPage={currPage}
                      totalRows={totalCount}
                      totalPageCount={pageCount}
                      rowsPerPage={perPage}
                      pageChangeHandler={(num) => setCurrPage(num)}
                      tableClass="table align-middle table-nowrap table-hover"
                      theadClass="table-light"
                      paginationDiv="col-sm-12 col-md-7"
                      pagination="pagination pagination-rounded justify-content-end mt-4"
                    /> */}

                    {/* <NewPagination
                      pageChangeHandler={(num) => setCurrPage(num)}
                      rowsPerPage={perPage}
                      totalRows={totalCount}
                      currentPage={parseInt(currPage)}
                      paginationDiv="col-sm-12 col-md-7"
                      pagination="pagination pagination-rounded justify-content-end mt-4"
                      pageCount={pageCount}
                      // pageIndex={state.pageIndex}
                    /> */}
                  </CardBody>
                </Card>
              </Col>
            </Row>
          )}
        </Container>
      </div>
    </React.Fragment>
  );
};

export default withRouter(NewRegionalOfficeList);
