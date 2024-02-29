import React, { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import TableContainer from "../../../components/Common/TableContainer";
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
import AddOperators from "./AddOperator";

const Operators = (props) => {
  const { id: selectedRowId } = props;
  const API_URL = "https://sms.unitch.in/api/index.php/v1";
  const [showAddOperator, setShowAddOperator] = useState(false);
  const [addOperatorsData, setAddOperatorsData] = useState([]);

  const toggleAddOperator = () => {
    setShowAddOperator(!showAddOperator);
  };

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
                {
                  <Link className="text-dark" to="#">
                    {"Name"}
                  </Link>
                }
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
                  {"Code"}
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
                  {"Type"}
                </Link>
              </h5>
            </>
          );
        },
      },
      {
        Header: "Expiry Date",
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
                  {"Expiry Date"}
                </Link>
              </h5>
            </>
          );
        },
      },
    ],
    []
  );

  const getTableActions = () => {
    return [
      {
        name: "Add Operator",
        action: setShowAddOperator,
        type: "normal",
      },
    ];
  };

  const getAddOperatorsData = async (e) => {
    try {
      const token = "Bearer " + localStorage.getItem("temptoken");
      const id = parseInt(selectedRowId);

      const response = await axios.get(
        `${API_URL}/operator/list?fields=id,name,code&expand=type_lbl,status_lbl,branch_lbl,distributor_lbl&notfilter[type]=0&filter[type]=3&notfilter[ncf_id]=${id}&page=1&per-page=500&vr=web1.0`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log("response :" + JSON.stringify(response));
      setAddOperatorsData(response.data.data);
    } catch (error) {
      console.error("Error fetching addChannels data:", error);
    }
  };

  useEffect(() => {
    if (selectedRowId) {
      getAddOperatorsData();
    }
  }, [selectedRowId]);
  return (
    <React.Fragment>
      {showAddOperator && (
        <AddOperators
          isOpen={showAddOperator}
          toggle={toggleAddOperator}
          id={selectedRowId}
          data={addOperatorsData}
        />
      )}
      <Card>
        <CardBody>
          <TableContainer
            isPagination={true}
            columns={columns}
            data={addOperatorsData}
            isShowTableActionButtons={true}
            isShowingPageLength={true}
            tableActions={getTableActions()}
            handleUserClick={() => setShowAddOperator(true)}
            tableClass="table align-middle table-nowrap table-hover"
            theadClass="table-light"
            paginationDiv="col-sm-12 col-md-7"
            pagination="pagination pagination-rounded justify-content-end mt-4"
          />
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

Operators.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default Operators;
