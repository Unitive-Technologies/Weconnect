import React, { useMemo, useState, useEffect } from "react";
import axios from "axios";
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
  const API_URL = "https://sms.unitch.in/api/index.php/v1";
  const [tableList, setTableList] = useState([]);

  useEffect(() => {
    const getFilteredData = async () => {
      try {
        const token = "Bearer " + localStorage.getItem("temptoken");

        const response = await axios.get(
          `${API_URL}/package/list?fields=id,name,code,broadcasterRate&expand=package_type_lbl,isFta_lbl,channelIds,brdBouqueIds,ftaChannelCount,payChannelCount,ncfChannelCount,totalChannelCount&sort=name&vr=web1.0`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        console.log(
          "Bouquet packages in useeffect: " + JSON.stringify(response.data.data)
        );
        setTableList(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getFilteredData();
  }, [tableList, isOpen]);

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
        accessor: "code",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <>
              <h5 className="font-size-14 mb-1">
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
        accessor: "package_type_lbl",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <>
              <h5 className="font-size-14 mb-1">
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
        accessor: "isFta_lbl",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <>
              <h5 className="font-size-14 mb-1">
                <Link className="text-dark" to="#">
                  {cellProps.row.original.isFta_lbl}
                </Link>
              </h5>
            </>
          );
        },
      },
      {
        Header: "Channel Count",
        accessor: "ftaChannelCount",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <>
              <h5 className="font-size-14 mb-1">
                <Link className="text-dark" to="#">
                  {cellProps.row.original.ftaChannelCount}
                </Link>
              </h5>
            </>
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
            <>
              <h5 className="font-size-14 mb-1">
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
        accessor: "totalChannelCount",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <>
              <h5 className="font-size-14 mb-1">
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
        accessor: "broadcasterRate",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <>
              <h5 className="font-size-14 mb-1">
                <Link className="text-dark" to="#">
                  {cellProps.row.original.broadcasterRate}
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
              data={tableList}
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
