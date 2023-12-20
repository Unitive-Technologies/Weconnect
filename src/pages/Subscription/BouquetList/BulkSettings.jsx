import React, { useEffect, useState, useRef, useMemo } from "react";
import { Link } from "react-router-dom";
import withRouter from "../../../components/Common/withRouter";
import TableContainer from "../../../components/Common/TableContainer";
import Spinners from "../../../components/Common/Spinner";
import {
  Card,
  CardBody,
  Col,
  Container,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  UncontrolledTooltip,
} from "reactstrap";
import Breadcrumbs from "/src/components/Common/Breadcrumb";
import { getBouquet as onGetBouquet } from "/src/store/actions";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { ToastContainer } from "react-toastify";

const BulkSettings = (props) => {
  const { isOpen, toggle } = props;
  //meta title
  document.title = "Bouquet List | VDigital";

  const dispatch = useDispatch();

  const selectBouquetState = (state) => state.bouquet;
  const BouquetProperties = createSelector(selectBouquetState, (bouquet) => ({
    bouquets: bouquet.bouquet,
    loading: bouquet.loading,
  }));

  const { bouquets, loading } = useSelector(BouquetProperties);

  useEffect(() => {
    console.log("Bouquet list data in component:", bouquets);
  }, [bouquets]);
  const [isLoading, setLoading] = useState(loading);
  const [showCreateBouquet, setShowCreateBouquet] = useState(false);
  const [showBulkAssign, setShowBulkAssign] = useState(false);
  const [showViewBouquet, setShowViewBouquet] = useState(false);
  const [viewBouquetData, setViewBouquetData] = useState({});
  const [showBulkRemoval, setShowBulkRemoval] = useState(false);
  const [showBulkSettings, setShowBulkSettings] = useState(false);

  const columns = useMemo(
    () => [
      {
        Header: "*",
        disableFilters: true,
        filterable: true,
        Cell: () => {
          return (
            <>
              <i className="bx bx-bx bx-check"></i>
            </>
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
        accessor: "name",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <>
              <h5 className="font-size-14 mb-1">
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
            <p className="text-muted mb-0">{cellProps.row.original.code}</p>
          );
        },
      },
      {
        Header: "Bouquet Type",
        accessor: "bouquettype",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">{cellProps.row.original.type_lbl}</p>
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
        Header: "Settings",
        accessor: "settings",
        filterable: true,
        Cell: (cellProps) => {
          return <p className="text-muted mb-0">IS EXCLUSIVE:</p>;
        },
      },
    ],
    []
  );

  useEffect(() => {
    if (bouquets && !bouquets.length) {
      dispatch(onGetBouquet());
    }
  }, [dispatch, bouquets]);

  return (
    <React.Fragment>
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
        <ModalHeader toggle={toggle} tag="h4">
          Bulk Assign Bouquet
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <TableContainer
                    isPagination={true}
                    columns={columns}
                    data={bouquets}
                    isGlobalFilter={true}
                    isShowingPageLength={true}
                    customPageSize={8}
                    tableClass="table align-middle table-nowrap table-hover"
                    theadClass="table-light"
                    paginationDiv="col-sm-12 col-md-7"
                    pagination="pagination pagination-rounded justify-content-end mt-4"
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
      <ToastContainer />
    </React.Fragment>
  );
};

export default withRouter(BulkSettings);
