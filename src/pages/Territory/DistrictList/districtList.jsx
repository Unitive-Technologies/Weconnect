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
import Breadcrumbs from "/src/components/Common/Breadcrumb";
import { getDistrict as onGetDistrict } from "/src/store/actions";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { ToastContainer } from "react-toastify";
import AddNewDistrict from "./AddNewDistrict";
import UploadDistrict from "./UploadDistrict";
import ViewDistrict from "./ViewDistrict";

const DistrictList = (props) => {
  //meta title
  document.title = "District List | VDigital";

  const dispatch = useDispatch();
  const [showAddDistrict, setShowAddDistrict] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [showUploadDistrict, setShowUploadDistrict] = useState(false);
  const [showViewDistrict, setShowViewDistrict] = useState(false);
  const [viewDistrictData, setViewDistrictData] = useState({});
  // const [stateNames, setStateNames] = useState([]);

  const selectDistrictState = (state) => state.district;
  const districtProperties = createSelector(
    selectDistrictState,
    (district) => ({
      districts: district.district,
      loading: district.loading,
    })
  );

  const { districts, loading } = useSelector(districtProperties);
  const [isLoading, setLoading] = useState(loading);

  // useEffect(() => {
  //   const stateInfoArray = districts.map((district) => ({
  //     state_lbl: district.state_lbl,
  //     state_code_lbl: district.state_code_lbl,
  //   }));
  //   setStateNames(stateInfoArray);
  //   console.log("stateNames: ", stateNames);
  // }, []);

  const stateNames = [
    {
      id: 37,
      name: "Delhi",
    },
    {
      id: 36,
      name: "Puducherry",
    },
    {
      id: 35,
      name: "Ladakh",
    },
    {
      id: 34,
      name: "Andaman and Nicobar Islands",
    },
    {
      id: 33,
      name: "Lakshadweep",
    },
    {
      id: 32,
      name: "Daman and Diu",
    },
    {
      id: 31,
      name: "Dadra and Nagar Haveli",
    },
    {
      id: 30,
      name: "Chandigarh",
    },
    {
      id: 29,
      name: "West Bengal",
    },
    {
      id: 28,
      name: "Uttarakhand",
    },
    {
      id: 27,
      name: "Uttar Pradesh",
    },
    {
      id: 26,
      name: "Tripura",
    },
    {
      id: 25,
      name: "Telangana",
    },
    {
      id: 24,
      name: "Tamil Nadu",
    },
    {
      id: 23,
      name: "Sikkim",
    },
    {
      id: 22,
      name: "Rajasthan",
    },
    {
      id: 21,
      name: "Punjab",
    },
    {
      id: 20,
      name: "Odisha",
    },
    {
      id: 19,
      name: "Nagaland",
    },
    {
      id: 18,
      name: "Mizoram",
    },
    {
      id: 17,
      name: "Meghalaya",
    },
    {
      id: 16,
      name: "Manipur",
    },
    {
      id: 15,
      name: "Maharashtra",
    },
    {
      id: 14,
      name: "Madhya Pradesh",
    },
    {
      id: 13,
      name: "Kerala",
    },
    {
      id: 12,
      name: "Karnataka",
    },
    {
      id: 11,
      name: "Jharkhand",
    },
    {
      id: 10,
      name: "Jammu and Kashmir",
    },
    {
      id: 9,
      name: "Himachal Pradesh",
    },
    {
      id: 8,
      name: "Haryana",
    },
    {
      id: 7,
      name: "Gujarat",
    },
    {
      id: 6,
      name: "Goa",
    },
    {
      id: 5,
      name: "Chhattisgarh",
    },
    {
      id: 4,
      name: "Bihar",
    },
    {
      id: 3,
      name: "Assam",
    },
    {
      id: 2,
      name: "Arunachal Pradesh",
    },
    {
      id: 1,
      name: "Andhra Pradesh",
    },
  ];

  console.log("States Name in district list: ", stateNames);
  useEffect(() => {
    // console.log("Districts data in component:", districts);
  }, [districts]);

  const columns = useMemo(
    () => [
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
                  toggleViewDistrict(userData);
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
          return (
            <p className="text-muted mb-0">{cellProps.row.original.code}</p>
          );
        },
      },
      {
        Header: "State",
        accessor: "state_lbl",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              {cellProps.row.original.state_lbl}
            </p>
          );
        },
      },
      {
        Header: "State Code",
        accessor: "state_code_lbl",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              {cellProps.row.original.state_code_lbl}
            </p>
          );
        },
      },
      {
        Header: "Description",
        accessor: "description",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              {cellProps.row.original.description}
            </p>
          );
        },
      },
      {
        Header: "Status",
        accessor: "status_lbl",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              {cellProps.row.original.status_lbl}
            </p>
          );
        },
      },
      {
        Header: "Created At",
        accessor: "created_at",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              {cellProps.row.original.created_at}
            </p>
          );
        },
      },
      {
        Header: "Created By",
        accessor: "created_by_lbl",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <p className="text-muted mb-0">
              {cellProps.row.original.created_by_lbl}
            </p>
          );
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
    if (districts && !districts.length) {
      dispatch(onGetDistrict());
      setIsEdit(false);
    }
  }, [dispatch, districts]);

  // useEffect(() => {
  //   setContact(users);
  //   setIsEdit(false);
  // }, [users]);

  // useEffect(() => {
  //   if (!isEmpty(users) && !!isEdit) {
  //     setContact(users);
  //     setIsEdit(false);
  //   }
  // }, [users]);

  const toggle = () => {
    setShowAddDistrict(!showAddDistrict);
  };
  const toggle1 = () => {
    setShowUploadDistrict(!showUploadDistrict);
  };

  const toggleViewDistrict = (userData) => {
    console.log("User Data: ", userData);
    setShowViewDistrict(!showViewDistrict);
    setViewDistrictData(userData);
  };

  const handleUserClick = (arg) => {
    const user = arg;

    setContact({
      id: user.id,
      name: user.name,
      designation: user.designation,
      email: user.email,
      tags: user.tags,
      projects: user.projects,
    });
    setIsEdit(true);

    toggle();
  };

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

  const onClickDelete = (users) => {
    setContact(users);
  };

  const keyField = "id";

  const getTableActions = () => {
    return [
      {
        name: "Create",
        action: setShowAddDistrict,
        type: "normal",
        icon: "create",
      },
      {
        name: "Upload",
        action: setShowUploadDistrict,
        type: "normal",
        icon: "upload",
      },
    ];
  };

  return (
    <React.Fragment>
      {console.log(stateNames)}
      <ViewDistrict
        isOpen={showViewDistrict}
        toggle={toggleViewDistrict}
        district={viewDistrictData}
        stateNames={stateNames}
      />
      <AddNewDistrict
        isOpen={showAddDistrict}
        toggle={toggle}
        stateNames={stateNames}
      />
      <UploadDistrict isOpen={showUploadDistrict} toggle={toggle1} />
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Territory" breadcrumbItem="Districts" />
          {isLoading ? (
            <Spinners setLoading={setLoading} />
          ) : (
            <Row>
              <Col lg="12">
                <Card>
                  <CardBody>
                    {/* {console.log("Districts:" + JSON.stringify(districts))} */}
                    <TableContainer
                      isPagination={true}
                      columns={columns}
                      data={districts}
                      isGlobalFilter={true}
                      isAddUserList={true}
                      isShowingPageLength={true}
                      tableActions={getTableActions()}
                      handleDistrictClick={() => setShowAddDistrict(true)}
                      handleUploadDistrict={() => setShowUploadDistrict(true)}
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
          )}
        </Container>
      </div>
      <ToastContainer />
    </React.Fragment>
  );
};

export default withRouter(DistrictList);
