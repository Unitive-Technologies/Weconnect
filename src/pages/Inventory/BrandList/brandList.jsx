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
  Row,
  UncontrolledTooltip,
} from "reactstrap";
import {
  Name,
  Code,
  BoxType,
  Brand,
  CharLength,
  Significant,
  Allowed,
  Cas,
  Status,
  CreatedAt,
  CreatedBy,
} from "./brandListCol";
import Breadcrumbs from "/src/components/Common/Breadcrumb";
import { getBrandList as onGetBrandList } from "/src/store/brandlist/actions";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { ToastContainer } from "react-toastify";

const BrandList = (props) => {
  //meta title
  document.title = "Brand List | VDigital";
  const dispatch = useDispatch();

  const selectBrandListState = (state) => state.brandlist;
  const BrandListProperties = createSelector(
    selectBrandListState,
    (brandlist) => ({
      brand: brandlist.brandlist,
      loading: brandlist.loading,
    })
  );

  const { brand, loading } = useSelector(BrandListProperties);

  useEffect(() => {
    console.log("BrandList data in component:", brand);
  }, [brand]);
  const [isLoading, setLoading] = useState(loading);

  const [userList, setUserList] = useState([]);
  const [isEdit, setIsEdit] = useState(false);

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
          return <Code {...cellProps} />;
        },
      },
      {
        Header: "Box Type",
        accessor: "boxtype",
        filterable: true,
        Cell: (cellProps) => {
          return <BoxType {...cellProps} />;
        },
      },
      {
        Header: "Brand",
        accessor: "brand",
        filterable: true,
        Cell: (cellProps) => {
          return <Brand {...cellProps} />;
        },
      },
      {
        Header: "Char length",
        accessor: "charlength",
        filterable: true,
        Cell: (cellProps) => {
          return <CharLength {...cellProps} />;
        },
      },
      {
        Header: "Significant length",
        accessor: "significant",
        filterable: true,
        Cell: (cellProps) => {
          return <Significant {...cellProps} />;
        },
      },
      {
        Header: "Allowed Character",
        accessor: "allowed",
        filterable: true,
        Cell: (cellProps) => {
          return <Allowed {...cellProps} />;
        },
      },
      {
        Header: "CAS",
        accessor: "cas",
        filterable: true,
        Cell: (cellProps) => {
          return <Cas {...cellProps} />;
        },
      },
      {
        Header: "Status",
        accessor: "status",
        filterable: true,
        Cell: (cellProps) => {
          return <Status {...cellProps} />;
        },
      },
      {
        Header: "Created At",
        accessor: "created_at",
        filterable: true,
        Cell: (cellProps) => {
          return <CreatedAt {...cellProps} />;
        },
      },
      {
        Header: "Created By",
        accessor: "created_by",
        filterable: true,
        Cell: (cellProps) => {
          return <CreatedBy {...cellProps} />;
        },
      },
      {
        Header: "Action",
        Cell: (cellProps) => {
          return (
            <div className="d-flex gap-3">
              <Link
                to="#"
                className="text-success"
                onClick={() => {
                  const userData = cellProps.row.original;
                  handleUserClick(userData);
                }}
              >
                <i className="mdi mdi-pencil font-size-18" id="edittooltip" />
                <UncontrolledTooltip placement="top" target="edittooltip">
                  Edit
                </UncontrolledTooltip>
              </Link>
              <Link
                to="#"
                className="text-danger"
                onClick={() => {
                  const userData = cellProps.row.original;
                  onClickDelete(userData);
                }}
              >
                <i className="mdi mdi-delete font-size-18" id="deletetooltip" />
                <UncontrolledTooltip placement="top" target="deletetooltip">
                  Delete
                </UncontrolledTooltip>
              </Link>
            </div>
          );
        },
      },
    ],
    []
  );

  useEffect(() => {
    if (brand && !brand.length) {
      dispatch(onGetBrandList());
      setIsEdit(false);
    }
  }, [dispatch, brand]);

  var node = useRef();
  const onPaginationPageChange = (page) => {
    if (
      node &&
      node.current &&
      node.current.props &&
      node.current.props.pagination &&
      node.current.props.pagination.options
    ) {
      node.current.props.pagination.options.onPageChange(page);
    }
  };

  const keyField = "id";

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Inventory" breadcrumbItem="Brand List" />
          {isLoading ? (
            <Spinners setLoading={setLoading} />
          ) : (
            <Row>
              <Col lg="12">
                <Card>
                  <CardBody>
                    {console.log("brandList:" + JSON.stringify(brand))}
                    <TableContainer
                      isPagination={true}
                      columns={columns}
                      data={brand}
                      isGlobalFilter={true}
                      // isAddUserList={true}
                      isShowingPageLength={true}
                      // iscustomPageSizeOptions={true}
                      handleUserClick={() => {}}
                      customPageSize={50}
                      tableClass="table align-middle table-nowrap table-hover"
                      theadClass="table-light"
                      paginationDiv="col-sm-12 col-md-7"
                      pagination="pagination pagination-rounded justify-content-end mt-4"
                    />
                  </CardBody>
                </Card>
              </Col>
            </Row>
          )}
        </Container>
      </div>
      <ToastContainer />
    </React.Fragment>
  );
};

export default withRouter(BrandList);
