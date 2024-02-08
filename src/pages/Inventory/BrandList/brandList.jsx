import React, { useEffect, useState, useRef, useMemo } from "react";
import { Link } from "react-router-dom";
import withRouter from "../../../components/Common/withRouter";
// import TableContainer from "../../../components/Common/TableContainer";
// import Spinners from "../../../components/Common/Spinner";
import {
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Spinner,
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
  goToPage as onGoToPage,
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
import TableContainerX from "../../../components/Common/TableContainerX";

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
      pageSize: brandlist.perPage,
      currentPage: brandlist.currentPage,
    })
  );

  const { totalPage,
    totalCount,
    pageSize,
    currentPage, brand, brandBoxType, brandCasType, brandCharacters, brandStatus, brandBrandType, loading } = useSelector(BrandListProperties);

  const [isLoading, setLoading] = useState(loading);

  const [showAddBrand, setShowAddBrand] = useState(false);
  const [showUploadBrand, setShowUploadBrand] = useState(false);
  const [showViewBrand, setShowViewBrand] = useState(false);
  const [viewBrandData, setViewBrandData] = useState({});

  const handleViewBrand = (brandData) => {
    console.log("User Data: ", brandData);
    setShowViewBrand(!showViewBrand);
    setViewBrandData(brandData);
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
          const startIndex = (currentPage - 1) * pageSize;
          const index = startIndex + cellProps.row.index + 1;

          return (
            <>
              <h5 className="font-size-14 mb-1">
                <Link className="text-dark" to="#">
                  {index}
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

  const goToPage = (toPage) => {
    console.log("[GOTO PAGE] Trigger to page - ", toPage);
    dispatch(onGoToPage(toPage));
    dispatch(onGetBrandList());
  };


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
        brandBoxType={brandBoxType}
        brandBrandType={brandBrandType}
        brandCasType={brandCasType}
        brandCharacters={brandCharacters}
        brandStatus={brandStatus}
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
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Billing" breadcrumbItem="Brand" />
          {loading ? (
            <React.Fragment>
              <Spinner
                color="primary"
                className="position-absolute top-50 start-50"
              />
            </React.Fragment>
          ) : (
            <Row>
              <Col lg="12">
                <Card>
                  <CardBody>
                    {/* <TableContainer
                      isPagination={true}
                      columns={columns}
                      data={brand}
                      isGlobalFilter={true}
                      isShowTableActionButtons={true}
                      isShowingPageLength={true}
                      handleRowClick={(brandData) => {
                        handleViewBrand(brandData);
                      }}
                      tableActions={getTableActions()}
                      customPageSize={50}
                      tableClass="table align-middle table-nowrap table-hover"
                      theadClass="table-light"
                      paginationDiv="col-sm-12 col-md-7"
                      pagination="pagination pagination-rounded justify-content-end mt-4"
                    /> */}
                    <TableContainerX
                      columns={columns}
                      data={brand}
                      isShowTableActionButtons={true}
                      isLoading={loading}
                      isPagination={true}
                      totalCount={Number(totalCount)}
                      pageSize={Number(pageSize)}
                      currentPage={Number(currentPage)}
                      totalPage={Number(totalPage)}
                      isGlobalFilter={true}
                      isShowingPageLength={true}
                      tableActions={getTableActions()}
                      handleRowClick={(brandData) => {
                        handleViewBrand(brandData);
                      }}
                      goToPage={goToPage}
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
