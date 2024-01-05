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
import {
  getBrandList as onGetBrandList,
  getBrandListBoxType as onGetBrandListBoxType,
  getBrandListBrandType as onGetBrandListBrandType,
  getBrandListCasType as onGetBrandListCasType,
  getBrandListStatus as onGetBrandListStatus,
  getBrandListCharacters as onGetBrandListCharacters,
} from "/src/store/brandlist/actions";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { ToastContainer } from "react-toastify";
import ViewBrandList from "./ViewBrandList";
import AddNewBrandList from "./AddNewBrandList";
import UploadBrandList from "./UploadBrandList";

const BrandList = (props) => {
  //meta title
  document.title = "Brands | VDigital";
  const dispatch = useDispatch();

  const selectBrandListState = (state) => state.brandlist;
  const BrandListProperties = createSelector(
    selectBrandListState,
    (brandlist) => ({
      brand: brandlist.brandlist,
      brandBoxType: brandlist.brandlistBoxType,
      brandBrandType: brandlist.brandlistBrandType,
      brandCasType: brandlist.brandlistCasType,
      brandCharacters: brandlist.brandlistCharacters,
      brandStatus: brandlist.brandlistStatus,
      loading: brandlist.loading,
    })
  );

  const { brand, brandBoxType, brandCasType, brandCharacters, brandStatus, brandBrandType, loading } = useSelector(BrandListProperties);

  const [isLoading, setLoading] = useState(loading);

  const [showAddBrand, setShowAddBrand] = useState(false);
  const [showUploadBrand, setShowUploadBrand] = useState(false);
  const [showViewBrand, setShowViewBrand] = useState(false);
  const [viewBrandData, setViewBrandData] = useState({});

  const handleViewBrand = (userData) => {
    console.log("User Data: ", userData);
    setShowViewBrand(!showViewBrand);
    setViewBrandData(userData);
  };

  const handleAddBrand = () => {
    setShowAddBrand(!showAddBrand);
  };

  const handleUploadBrand = () => {
    setShowUploadBrand(!showUploadBrand);
  };

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
              <h5
                className="font-size-14 mb-1"
                onClick={() => {
                  const userData = cellProps.row.original;
                  handleViewBrand(userData);
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
          return <Code {...cellProps} />;
        },
      },
      {
        Header: "Box Type",
        accessor: "box_type_lbl",
        filterable: true,
        Cell: (cellProps) => {
          return <BoxType {...cellProps} />;
        },
      },
      {
        Header: "Brand",
        accessor: "brand_type_lbl",
        filterable: true,
        Cell: (cellProps) => {
          return <Brand {...cellProps} />;
        },
      },
      {
        Header: "Char length",
        accessor: "length",
        filterable: true,
        Cell: (cellProps) => {
          return <CharLength {...cellProps} />;
        },
      },
      {
        Header: "Significant length",
        accessor: "significant_length",
        filterable: true,
        Cell: (cellProps) => {
          return <Significant {...cellProps} />;
        },
      },
      {
        Header: "Allowed Character",
        accessor: "char_allowed_lbl",
        filterable: true,
        Cell: (cellProps) => {
          return <Allowed {...cellProps} />;
        },
      },
      {
        Header: "CAS",
        accessor: "cas_lbl",
        filterable: true,
        Cell: (cellProps) => {
          return <Cas {...cellProps} />;
        },
      },
      {
        Header: "Status",
        accessor: "status_lbl",
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
        accessor: "created_by_lbl",
        filterable: true,
        Cell: (cellProps) => {
          return <CreatedBy {...cellProps} />;
        },
      },
    ],
    []
  );

  useEffect(() => {
    if (brand && !brand.length) {
      dispatch(onGetBrandList());
      dispatch(onGetBrandListBoxType());
      dispatch(onGetBrandListBrandType());
      dispatch(onGetBrandListCasType());
      dispatch(onGetBrandListStatus());
      dispatch(onGetBrandListCharacters());
    }
  }, [dispatch, brand]);

  const keyField = "id";

  const getTableActions = () => {
    return [
      {
        name: "Create",
        action: setShowAddBrand,
        type: "normal",
        icon: "create",
      },
      {
        name: "Upload",
        action: setShowUploadBrand,
        type: "normal",
        icon: "upload",
      },
    ];
  };

  return (
    <React.Fragment>
      <ViewBrandList
        isOpen={showViewBrand}
        handleViewBrand={handleViewBrand}
        brand={viewBrandData}
      />
      <AddNewBrandList isOpen={showAddBrand}
        handleAddBrand={handleAddBrand}
        brandBoxType={brandBoxType}
        brandBrandType={brandBrandType}
        brandCasType={brandCasType}
        brandCharacters={brandCharacters}
        brandStatus={brandStatus}
      />
      <UploadBrandList
        isOpen={showUploadBrand}
        handleUploadBrand={handleUploadBrand}
      />
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Inventory" breadcrumbItem="Brands" />
          {isLoading ? (
            <Spinners setLoading={setLoading} />
          ) : (
            <Row>
              <Col lg="12">
                <Card>
                  <CardBody>
                    <TableContainer
                      isPagination={true}
                      columns={columns}
                      data={brand}
                      isGlobalFilter={true}
                      isShowTableActionButtons={true}
                      isShowingPageLength={true}
                      tableActions={getTableActions()}
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
