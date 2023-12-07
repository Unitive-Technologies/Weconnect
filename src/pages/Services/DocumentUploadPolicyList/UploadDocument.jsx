import React, { useMemo } from "react";
import PropTypes from "prop-types";
import TableContainer from "../../../components/Common/TableContainer";
import {
    Card,
    CardBody,
} from "reactstrap";
import { Link } from "react-router-dom";

const UploadDocument = (props) => {

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
                                    {"Name"}
                                </Link>
                            </h5>
                        </>
                    );
                },
            },
            {
                Header: "Type",
                // accessor: "login",
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
                                    {"Type"}
                                </Link>
                            </h5>
                        </>
                    );
                },
            },
            {
                Header: "Size",
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
                                    {"Size"}
                                </Link>
                            </h5>
                        </>
                    );
                },
            },
            {
                Header: "Download",
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
                                    {"Download"}
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

    const uploadDocumentData = [];
    return (
        <Card>
            <CardBody>
                <TableContainer
                    isPagination={true}
                    columns={columns}
                    data={uploadDocumentData}
                    // isGlobalFilter={true}
                    // isShowingPageLength={true}
                    // customPageSize={50}
                    tableClass="table align-middle table-nowrap table-hover"
                    theadClass="table-light"
                    paginationDiv="col-sm-12 col-md-7"
                    pagination="pagination pagination-rounded justify-content-end mt-4"
                />
            </CardBody>
        </Card>
    );
};

UploadDocument.propTypes = {
    toggle: PropTypes.func,
    isOpen: PropTypes.bool,
};

export default UploadDocument;
