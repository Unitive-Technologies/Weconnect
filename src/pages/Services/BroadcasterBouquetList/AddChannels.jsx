import React, { useMemo } from "react";
import PropTypes from "prop-types";
import TableContainer from "../../../components/Common/TableContainer";
import {
    Card,
    CardBody,
} from "reactstrap";
import { Link } from "react-router-dom";

const AddChannels = (props) => {

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
                Header: "Channel Name",
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
                                    {"Channel Name"}
                                </Link>
                            </h5>
                        </>
                    );
                },
            },
            {
                Header: "Broadcaster",
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
                                    {"Broadcaster"}
                                </Link>
                            </h5>
                        </>
                    );
                },
            },
            {
                Header: "Type",
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
                                    {"Service ID"}
                                </Link>
                            </h5>
                        </>
                    );
                },
            },
            {
                Header: "Alacarte",
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
                                    {"Alacarte"}
                                </Link>
                            </h5>
                        </>
                    );
                },
            },
            {
                Header: "FTA",
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
                                    {"FTA"}
                                </Link>
                            </h5>
                        </>
                    );
                },
            },
            {
                Header: "Rate",
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
                                    {"Rate"}
                                </Link>
                            </h5>
                        </>
                    );
                },
            },
            {
                Header: "$",
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

    const addChannelsData = [];
    return (
        <Card>
            <CardBody>
                <TableContainer
                    isPagination={true}
                    columns={columns}
                    data={addChannelsData}
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

AddChannels.propTypes = {
    toggle: PropTypes.func,
    isOpen: PropTypes.bool,
};

export default AddChannels;
