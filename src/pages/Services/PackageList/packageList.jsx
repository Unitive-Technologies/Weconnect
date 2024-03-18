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
  Table,
  UncontrolledTooltip,
} from "reactstrap";

import {
  Code,
  Type,
  PackageType,
  Status,
  CreatedAt,
  CreatedBy,
  CasCodes,
  BBQ,
  Rate,
  Channels,
} from "./packageListCol";

//Import Breadcrumb
import Breadcrumbs from "/src/components/Common/Breadcrumb";

import {
  goToPage as onGoToPage,
  getPackageList as onGetPackageList,
  getPackageType as onGetPackageType,
  getPackageBoxType as onGetPackageBoxType,
  getPackageStatus as onGetPackageStatus,
  getPackageCascode as onGetPackageCascode,
} from "/src/store/packagelist/actions";

//redux
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { ToastContainer } from "react-toastify";
import AddNewPackageList from "./AddNewPackageList";
import BulkUpdateCasCodePackageList from "./BulkUpdateCasCodePackageList";
import BulkUpdatePackageList from "./BulkUpdatePackageList";
import UploadPackageList from "../PackageList/UploadPackageList";
import ViewPackageList from "./ViewPackageList";
import TableContainerX from "../../../components/Common/TableContainerX";

const PackageList = (props) => {
  //meta title
  document.title = "Packages | VDigital";

  const dispatch = useDispatch();

  const selectPackageListState = (state) => state.packageList;
  const PackageListProperties = createSelector(
    selectPackageListState,
    (packageList) => ({
      packageList: packageList.packageList,
      packageType: packageList.packagetype,
      packageBoxType: packageList.packageboxtype,
      packageStatus: packageList.packagestatus,
      packageCascode: packageList.packageCascode,
      loading: packageList.loading,
      totalPage: packageList.totalPages,
      totalCount: packageList.totalCount,
      pageSize: packageList.perPage,
      currentPage: packageList.currentPage,
    })
  );

  const {
    packageList,
    packageType,
    packageBoxType,
    packageStatus,
    totalPage,
    totalCount,
    pageSize,
    currentPage,
    packageCascode,
    loading,
  } = useSelector(PackageListProperties);

  useEffect(() => {
    // console.log("Package List data in component:", packlist);
  }, [packageList]);
  const [isLoading, setLoading] = useState(loading);
  const [showAddNewPackageList, setShowAddNewPackageList] = useState(false);
  const [showUploadPackageList, setShowUploadPackageList] = useState(false);
  const [showBulkUpdatePackageList, setShowBulkUpdatePackageList] =
    useState(false);
  const [
    showBulkUpdateCasCodePackageList,
    setShowBulkUpdateCasCodePackageList,
  ] = useState(false);

  const columns = useMemo(
    () => [
      {
        Header: "#",
        disableFilters: true,
        filterable: true,
        Cell: (cellProps) => {
          // const totalRows = cellProps.rows.length;
          // const reverseIndex = totalRows - cellProps.row.index;
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
                // onClick={() => {
                //   const packageData = cellProps.row.original;
                //   handleViewPackageList(packageData);
                // }}
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
        Header: "Type",
        accessor: "package_type_lbl",
        filterable: true,
        Cell: (cellProps) => {
          return <Type {...cellProps} />;
        },
      },
      {
        Header: "Package Type",
        accessor: "isFta_lbl",
        filterable: true,
        Cell: (cellProps) => {
          return <PackageType {...cellProps} />;
        },
      },
      {
        Header: "CAS CODES",
        accessor: "casCodes",
        filterable: true,
        Cell: (cellProps) => {
          return <CasCodes {...cellProps} />;
        },
      },
      {
        Header: "CHANNELS",
        accessor: "channels",
        filterable: true,
        maxWidth: 20,

        Cell: (cellProps) => {
          return <Channels {...cellProps} />;
        },
      },
      {
        Header: "BBQ",
        accessor: "brdBouques",
        filterable: true,
        Cell: (cellProps) => {
          return <BBQ {...cellProps} />;
        },
      },
      {
        Header: "Staus",
        accessor: "status_lbl",
        filterable: true,
        Cell: (cellProps) => {
          return <Status {...cellProps} />;
        },
      },
      {
        Header: "Rate",
        accessor: "rate",
        filterable: true,
        Cell: (cellProps) => {
          return <Rate {...cellProps} />;
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
    if (packageList && !packageList.length) {
      dispatch(onGetPackageList());
      dispatch(onGetPackageType());
      dispatch(onGetPackageBoxType());
      dispatch(onGetPackageStatus());
      dispatch(onGetPackageCascode());
    }
  }, [dispatch, packageList]);
  console.log("PackageCasCode in packagelist" + JSON.stringify(packageCascode));

  const goToPage = (toPage) => {
    console.log("[GOTO PAGE] Trigger to page - ", toPage);
    dispatch(onGoToPage(toPage));
    dispatch(onGetPackageList());
  };

  const toggleAddModal = () => {
    setShowAddNewPackageList(!showAddNewPackageList);
  };

  const toggleUploadModal = () => {
    setShowUploadPackageList(!showUploadPackageList);
  };

  const toggleUpdateModal = () => {
    setShowBulkUpdatePackageList(!showBulkUpdatePackageList);
  };

  const handleUpdateCasCode = () => {
    setShowBulkUpdateCasCodePackageList(!showBulkUpdateCasCodePackageList);
  };

  const [showViewPackageList, setShowViewPackageList] = useState(false);

  const [viewData, setViewData] = useState({});
  const [selectedRowId, setSelectedRowId] = useState("");

  const toggleViewModal = (packageData) => {
    setShowViewPackageList(!showViewPackageList);
    setViewData(packageData);
    setSelectedRowId(packageData.id);
  };

  const resetSelection = () => {
    setViewData({});
  };

  const renderChannelBBQTable = (row) => {
    const { channels, brdBouques } = row;
    const channelLength = channels.length;
    const bbqLength = brdBouques.length;
    const higherLength = channelLength > bbqLength ? channelLength : bbqLength;
    const mergedData = Array.from({ length: higherLength }, (_, index) => {
      return {
        index: index,
        channel: channelLength > index ? channels[index].name : "",
        bbq: bbqLength > index ? brdBouques[index].name : "",
      };
    });
    return (
      <div>
        <Table responsive className="table mb-0">
          <thead>
            <tr>
              {["Channels", "BBQ"].map((columnHeader) => {
                return <th key={columnHeader}>{columnHeader}</th>;
              })}
            </tr>
          </thead>
          <tbody
            style={{
              maxHeight: 200,
            }}
          >
            {mergedData.map((object) => {
              return (
                <tr key={object.index}>
                  <td key={object.channel}>{object.channel}</td>
                  <td key={object.bbq}>{object.bbq}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    );
  };

  const getTableActions = () => {
    return [
      {
        name: "Create",
        action: setShowAddNewPackageList,
        type: "normal",
        icon: "create",
      },
      {
        name: "Upload Package",
        action: setShowUploadPackageList,
        type: "dropdown",
        dropdownName: "Upload",
      },
      {
        name: "Bulk Update Package",
        action: setShowBulkUpdatePackageList,
        type: "dropdown",
        dropdownName: "Upload",
      },
      {
        name: "Bulk Update Package Cas Code",
        action: setShowBulkUpdateCasCodePackageList,
        type: "dropdown",
        dropdownName: "Upload",
      },
    ];
  };

  return (
    <React.Fragment>
      <AddNewPackageList
        isOpen={showAddNewPackageList}
        toggleAddModal={toggleAddModal}
        packageType={packageType}
        packageBoxType={packageBoxType}
        packageStatus={packageStatus}
      />
      <UploadPackageList
        title="Upload Package"
        isOpen={showUploadPackageList}
        toggleUploadModal={toggleUploadModal}
        packageStatus={packageStatus}
      />
      <BulkUpdatePackageList
        isOpen={showBulkUpdatePackageList}
        toggleUpdateModal={toggleUpdateModal}
      />
      <BulkUpdateCasCodePackageList
        isOpen={showBulkUpdateCasCodePackageList}
        handleUpdateCasCode={handleUpdateCasCode}
        packageCascode={packageCascode}
      />
      {showViewPackageList && (
        <ViewPackageList
          isOpen={showViewPackageList}
          toggleViewModal={toggleViewModal}
          packageList={viewData}
          selectedRowId={selectedRowId}
          packageType={packageType}
          packageBoxType={packageBoxType}
          packageStatus={packageStatus}
          resetSelection={resetSelection}
        />
      )}

      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Services" breadcrumbItem="Package List" />
          {isLoading ? (
            <Spinners setLoading={setLoading} />
          ) : (
            <Row>
              <Col lg="12">
                <Card>
                  <CardBody>
                    {/* {console.log("packageList:" + JSON.stringify(packageList))} */}
                    {/* <TableContainer
                      isPagination={true}
                      columns={columns}
                      data={packlist}
                      isGlobalFilter={true}
                      isShowTableActionButtons={true}
                      handleAddNewPackageList={() =>
                        setShowAddNewPackageList(true)
                      }
                      handleUploadPackageList={() =>
                        setShowUploadPackageList(true)
                      }
                      handleBulkUpdateCasCodePackageList={() =>
                        setShowBulkUpdateCasCodePackageList(true)
                      }
                      handleBulkUpdatePackageList={() =>
                        setShowBulkUpdateCasCodePackageList(true)
                      }
                      isShowingPageLength={true}
                      tableActions={getTableActions()}
                      customPageSize={50}
                      tableClass="table align-middle table-nowrap table-hover"
                      theadClass="table-light"
                      paginationDiv="col-sm-12 col-md-7"
                      pagination="pagination pagination-rounded justify-content-end mt-4"
                    /> */}
                    <TableContainerX
                      columns={columns}
                      data={packageList}
                      isLoading={loading}
                      isPagination={true}
                      totalCount={Number(totalCount)}
                      pageSize={Number(pageSize)}
                      currentPage={Number(currentPage)}
                      totalPage={Number(totalPage)}
                      isGlobalFilter={true}
                      isShowingPageLength={true}
                      tableActions={getTableActions()}
                      handleRowClick={(row) => toggleViewModal(row)}
                      handleAddNewPackageList={() =>
                        setShowAddNewPackageList(true)
                      }
                      handleUploadPackageList={() =>
                        setShowUploadPackageList(true)
                      }
                      handleBulkUpdateCasCodePackageList={() =>
                        setShowBulkUpdateCasCodePackageList(true)
                      }
                      handleBulkUpdatePackageList={() =>
                        setShowBulkUpdateCasCodePackageList(true)
                      }
                      goToPage={goToPage}
                      subTableEnabled={true}
                      getRenderedSubTable={renderChannelBBQTable}
                      isSubTableContentExists={(rowData) =>
                        rowData.channels.length > 0 ||
                        rowData.brdBouques.length > 0
                      }
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

export default withRouter(PackageList);
