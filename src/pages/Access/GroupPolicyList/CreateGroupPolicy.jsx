import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import {
  Col,
  Row,
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Label,
  FormFeedback,
  Input,
  Form,
} from "reactstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import { addNewGroupPolicy as onAddNewGroupPolicy } from "/src/store/grouppolicy/actions";
import { useDispatch } from "react-redux";
import DashboardPolicy from "./DashboardPolicy";
import ConfigurationPolicy from "./ConfigurationPolicy";
import InventoryPolicy from "./InventoryPolicy";
import CustomerPolicy from "./CustomerPolicy";
import CasPolicy from "./CasPolicy";
import NonCasPolicy from "./NonCasPolicy";
import AccountingPolicy from "./AccountingPolicy";
import ReportingPolicy from "./ReportingPolicy";

const CreateGroupPolicy = (props) => {
  const { isOpen, toggleAddPolicyModal, policyRole, policyType } = props;
  const API_URL = "https://sms.unitch.in/api/index.php/v1";

  const dispatch = useDispatch();
  const [selectedType, setSelectedType] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [groupPolicyList, setGroupPolicyList] = useState([]);
  const [groupPolicyMenu, setGroupPolicyMenu] = useState([]);
  const [overallTotals, setOverallTotals] = useState();
  const [toggleSwitch, settoggleSwitch] = useState(true);
  // console.log("typeeeeeeeeee:" + JSON.stringify(selectedType));
  // console.log("Roleeeeeeeeee:" + JSON.stringify(selectedRole));
  const [permission, setPermission] = useState();
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      name: "",
      type: "",
      role: "",
      description: "",
      count: "",
      createdat: "",
      createdby: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please Enter Your Name"),
      type: Yup.string().required("Please Select Type"),
      role: Yup.string().required("Please Select Role"),
      description: Yup.string().required("Please Enter Description"),
      count: Yup.string().required("Please Enter Count"),
      createdat: Yup.string().required("Please Enter Created At"),
      createdby: Yup.string().required("Please Enter Created By"),
    }),
    onSubmit: (values) => {
      const newGroupPolicy = {
        id: Math.floor(Math.random() * (30 - 20)) + 20,
        name: values["name"],
        type: values["type"],
        role: values["role"],
        description: values["description"],
        count: values["count"],
        createdat: values["createdat"],
        createdby: values["createdby"],
      };
      console.log("newGroupPolicy:" + newGroupPolicy);
      // save new user
      dispatch(onAddNewGroupPolicy(newGroupPolicy));
      validation.resetForm();
      toggleAddPolicyModal();
    },
  });

  const handleRoleChange = async (e) => {
    try {
      const role = e.target.value;
      setSelectedRole(role);

      validation.handleChange(e);

      const token = "Bearer " + localStorage.getItem("temptoken");

      const response = await axios.get(
        `${API_URL}/menu-access-right/data?filter[type]=1&filter[user_type]=${parseInt(
          selectedType
        )}&filter[user_id]=${role}&vr=web1.0`,
        {
          headers: {
            Authorization: token, // Include your token here
          },
        }
      );

      console.log(
        "policy after selection : " + JSON.stringify(response.data.data)
      );
      setGroupPolicyList(response.data.data);
    } catch (error) {
      console.error("Error fetching policy data:", error);
      // Handle error if necessary
    }
  };

  const handleTypeChange = async (e) => {
    try {
      const type = e.target.value;
      setSelectedType(type);

      validation.handleChange(e);

      const token = "Bearer " + localStorage.getItem("temptoken");

      const response = await axios.get(
        `${API_URL}/menu-access-right/data?filter[type]=1&filter[user_type]=${parseInt(
          type
        )}&filter[user_id]=${selectedRole}&vr=web1.0`,
        {
          headers: {
            Authorization: token, // Include your token here
          },
        }
      );

      console.log(
        "policy after selection : " + JSON.stringify(response.data.data)
      );
      setGroupPolicyList(response.data.data);
    } catch (error) {
      console.error("Error fetching policy data:", error);
      // Handle error if necessary
    }
  };

  // console.log("groupPolicyList: " + JSON.stringify(groupPolicyList));
  console.log("groupPolicyMenu: " + JSON.stringify(groupPolicyMenu));
  //   console.log("groupName: " + JSON.stringify(groupName));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const type = 3;
        const role = "user";
        setSelectedType(type);
        setSelectedRole(role);

        const token = "Bearer " + localStorage.getItem("temptoken");

        const response = await axios.get(
          `${API_URL}/menu-access-right/data?filter[type]=1&filter[user_type]=${type}&filter[user_id]=${role}&vr=web1.0`,
          {
            headers: {
              Authorization: token,
            },
          }
        );

        console.log(
          "policy after selection : " + JSON.stringify(response.data.data)
        );
        setGroupPolicyList(response.data.data);
      } catch (error) {
        console.error("Error fetching policy data:", error);
        // Handle error if necessary
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (Array.isArray(groupPolicyList)) {
      const groupedMenuIds = {};

      groupPolicyList.forEach((group) => {
        group.menu_ids.forEach((item) => {
          if (!groupedMenuIds[item.group_name]) {
            groupedMenuIds[item.group_name] = {
              totalTabs: 0,
              totalHasTrue: 0,
              totalHasPerm: 0,
              subGroup: [],
            };
          }
          groupedMenuIds[item.group_name].totalTabs += 1; // Increment totalTabs for the group
          groupedMenuIds[item.group_name].totalHasPerm += item.access.length; // Increment totalHasPerm for the group
          groupedMenuIds[item.group_name].totalHasTrue += item.access.filter(
            (accessItem) => accessItem.has_perm
          ).length; // Increment totalHasTrue for the group
          groupedMenuIds[item.group_name].subGroup.push({
            name: item.name,
            totalTabs: 1, // Each subGroup initially has 1 tab
            totalHasPerm: item.access.length,
            totalTruePerm: item.access.filter(
              (accessItem) => accessItem.has_perm
            ).length,
            access: item.access,
          });
        });
      });

      console.log("groupedMenuIds:", JSON.stringify(groupedMenuIds));

      const formattedMenuIds = Object.entries(groupedMenuIds).map(
        ([groupName, groupData]) => ({
          groupName,
          totalTabs: groupData.totalTabs,
          totalHasTrue: groupData.totalHasTrue,
          totalHasPerm: groupData.totalHasPerm,
          subGroup: groupData.subGroup,
        })
      );

      setGroupPolicyMenu(formattedMenuIds);

      console.log(
        "Group Policy MenuUUUUUUUUUU:",
        JSON.stringify(formattedMenuIds)
      );
    }
  }, [groupPolicyList]);

  useEffect(() => {
    // Define an object to store the overall counts
    const overallCounts = {
      totalHasPerm: 0,
      totalHasPermTrue: 0,
      totalSubGroups: 0,
    };

    // Iterate over the groupPolicyMenu array
    groupPolicyMenu.forEach((singleGroup) => {
      // Iterate over the subGroup array
      singleGroup.subGroup.forEach((single) => {
        // Increment the total count for totalHasPerm and totalHasPermTrue
        overallCounts.totalHasPerm += single.access.length;
        overallCounts.totalHasPermTrue += single.access.filter(
          (item) => item.has_perm
        ).length;
      });

      // Increment the total count for totalSubGroups
      overallCounts.totalSubGroups += singleGroup.subGroup.length;
    });

    // Update the state with the overall counts
    setOverallTotals(overallCounts);

    console.log("Overall Counts:", JSON.stringify(overallCounts));
  }, [groupPolicyMenu]);

  console.log("permission:" + permission);
  return (
    <Modal
      isOpen={isOpen}
      size="xl"
      role="dialog"
      autoFocus={true}
      centered={true}
      className="exampleModal"
      tabIndex="-1"
      toggle={toggleAddPolicyModal}
    >
      <ModalHeader tag="h4" toggle={toggleAddPolicyModal}>
        Create Group Policy
      </ModalHeader>
      <ModalBody>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            validation.handleSubmit();
            return false;
          }}
        >
          <Row>
            <Col lg={3}>
              <div className="mb-3">
                <Label className="form-label">
                  Name<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="name"
                  type="text"
                  placeholder="Insert Name"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.name || ""}
                  invalid={
                    validation.touched.name && validation.errors.name
                      ? true
                      : false
                  }
                />
                {validation.touched.name && validation.errors.name ? (
                  <FormFeedback type="invalid">
                    {validation.errors.name}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
            <Col lg={3}>
              <div className="mb-3">
                <Label className="form-label">
                  Operator Type<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="type"
                  type="select"
                  placeholder="Select User Type"
                  className="form-select"
                  //   onChange={validation.handleChange}
                  //   value={validation.values.type || ""}
                  onBlur={validation.handleBlur}
                  onChange={handleTypeChange}
                  value={selectedType}
                >
                  <option value="">Select User Type</option>
                  {policyType &&
                    policyType.map((type) => (
                      <option key={type.id} value={type.id}>
                        {type.name}
                      </option>
                    ))}
                </Input>
                {validation.touched.type && validation.errors.type ? (
                  <FormFeedback type="invalid">
                    {validation.errors.type}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
            <Col lg={3}>
              <div className="mb-3">
                <Label className="form-label">
                  Role Type<span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  name="role"
                  type="select"
                  placeholder="Select Role"
                  className="form-select"
                  //   onChange={validation.handleChange}
                  //   value={validation.values.role || ""}
                  onBlur={validation.handleBlur}
                  onChange={handleRoleChange}
                  value={selectedRole}
                >
                  <option value="">Select Role</option>
                  {policyRole &&
                    policyRole.map((role) => (
                      <option key={role.id} value={role.id}>
                        {role.name}
                      </option>
                    ))}
                </Input>
                {validation.touched.role && validation.errors.role ? (
                  <FormFeedback type="invalid">
                    {validation.errors.role}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
            <Col lg={3}>
              <div className="mb-3">
                <Label className="form-label">Description</Label>
                <Input
                  name="description"
                  type="textarea"
                  placeholder="Enter Description"
                  rows="3"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.description || ""}
                  invalid={
                    validation.touched.description &&
                    validation.errors.description
                      ? true
                      : false
                  }
                />
                {validation.touched.description &&
                validation.errors.description ? (
                  <FormFeedback type="invalid">
                    {validation.errors.description}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
          </Row>
          <Row>
            <Col lg={3}>
              <div className="mb-3">
                {/* <Label className="form-label">Description</Label> */}
                <Input
                  name="search"
                  type="text"
                  placeholder="Search all Permissions"
                  rows="3"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.description || ""}
                  invalid={
                    validation.touched.description &&
                    validation.errors.description
                      ? true
                      : false
                  }
                />
                {validation.touched.description &&
                validation.errors.description ? (
                  <FormFeedback type="invalid">
                    {validation.errors.description}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
            <Col lg={3}>
              <div className="form-check form-switch form-switch-lg mb-3">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="customSwitchsizelg"
                  // defaultChecked
                />
                <label
                  className="form-check-label"
                  htmlFor="customSwitchsizelg"
                >
                  Select All
                </label>
              </div>
            </Col>
            <Col lg={3}>
              <div className="form-check form-switch form-switch-lg mb-3">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="customSwitchsizelg"
                  // defaultChecked
                />
                <label
                  className="form-check-label"
                  htmlFor="customSwitchsizelg"
                >
                  View Only
                </label>
              </div>
            </Col>
            <Col lg={3}>
              <button type="submit" className="btn btn-primary w-md">
                Undo All Changes
              </button>
            </Col>
          </Row>
          <Row>
            <Col lg={3}>
              <div>
                <h6>
                  Total Permission tab count:
                  <b> {overallTotals && overallTotals.totalSubGroups}</b>
                </h6>
              </div>
            </Col>
            <Col lg={3}>
              <div>
                <h6>
                  Available Permissions:
                  <b> {overallTotals && overallTotals.totalHasPerm}</b>
                </h6>
              </div>
            </Col>
            <Col lg={3}>
              <div>
                <h6>
                  Selected Permissions:
                  <b> {overallTotals && overallTotals.totalHasPermTrue}</b>
                </h6>
              </div>
            </Col>
          </Row>
          {groupPolicyMenu &&
            groupPolicyMenu.map((singleGroup) => (
              <Row
                key={singleGroup.groupName}
                style={{
                  border: "1px solid #ced4da",
                  margin: "30px 0px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    borderBottom: "1px solid #ced4da",
                  }}
                >
                  <h4>{singleGroup.groupName}</h4>
                  <div
                    style={{
                      display: "flex",
                      gap: "20px",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <h6>
                      Tabs: {singleGroup.totalTabs}, Total:{" "}
                      {singleGroup.totalHasPerm}, Selected:{" "}
                      {singleGroup.totalHasTrue}
                    </h6>
                    <div>
                      <div className="form-check form-switch">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="customSwitch2"
                          // defaultChecked
                          onClick={(e) => {
                            settoggleSwitch(!toggleSwitch);
                          }}
                        />
                      </div>
                    </div>

                    <div className="form-check form-switch">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="customSwitch2"
                        // defaultChecked
                        onClick={(e) => {
                          settoggleSwitch(!toggleSwitch);
                        }}
                      />

                      <label
                        className="form-check-label"
                        htmlFor="customSwitch2"
                      >
                        View Only
                      </label>
                    </div>
                  </div>
                </div>
                {singleGroup.subGroup.map((single) => (
                  <Col
                    key={single.name}
                    sm="4"
                    className="mt-3"
                    style={{
                      border: "1px solid #ced4da",
                      margin: "30px 0px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        borderBottom: "1px solid #ced4da",
                      }}
                    >
                      <h5>{single.name}</h5>
                      <div
                        style={{
                          display: "flex",
                          gap: "20px",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <h6>
                          Tabs: {single.totalSubGroups}, Total:{" "}
                          {single.totalHasPerm}, Selected:{single.totalTruePerm}
                        </h6>
                        {/* {console.log("True Count: " + single.totalTruePerm)} */}
                        <div className="form-check form-switch">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="customSwitch2"
                            onClick={(e) => {
                              settoggleSwitch(!toggleSwitch);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <Row>
                      {single.access.map((item) => (
                        <Col lg={3} className="mb-3" key={item.id}>
                          <div className="form-check form-switch">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id={`customSwitch_${item.id}`}
                              // checked={item.has_perm === true}
                              // onClick={(e) => {
                              //   settoggleSwitch(!toggleSwitch);
                              // }}
                              // onChange={(e) => {
                              //   const updatedAccess = single.access.map(
                              //     (accessItem) => {
                              //       if (accessItem.id === item.id) {
                              //         return {
                              //           ...accessItem,
                              //           has_perm: !accessItem.has_perm, // toggle the value
                              //         };
                              //       }
                              //       return accessItem;
                              //     }
                              //   );
                              //   console.log(
                              //     "updatedAccess: " +
                              //       JSON.stringify(updatedAccess)
                              //   );
                              //   const totalTruePermCount = updatedAccess.filter(
                              //     (accessItem) => accessItem.has_perm
                              //   ).length;

                              //   const updatedSubGroup =
                              //     singleGroup.subGroup.map((subItem) => {
                              //       if (subItem.name === single.name) {
                              //         return {
                              //           ...subItem,
                              //           access: updatedAccess,
                              //           totalTruePerm: totalTruePermCount,
                              //         };
                              //       }
                              //       return subItem;
                              //     });

                              //   const updatedSingleGroup = {
                              //     ...singleGroup,
                              //     subGroup: updatedSubGroup,
                              //   };

                              //   const updatedGroupPolicyMenu =
                              //     groupPolicyMenu.map((group) => {
                              //       if (
                              //         group.groupName === singleGroup.groupName
                              //       ) {
                              //         return updatedSingleGroup;
                              //       }
                              //       return group;
                              //     });

                              //   setGroupPolicyMenu(updatedGroupPolicyMenu);
                              //   console.log(
                              //     "updatedGroupPolicyMenu: ",
                              //     updatedGroupPolicyMenu
                              //   );
                              // }}
                              value={item.has_perm}
                              checked={item.has_perm === true ? true : false}
                              onChange={(e) => setPermission(!e.target.checked)}
                              onClick={() => {
                                settoggleSwitch(!toggleSwitch);
                              }}
                            />
                          </div>
                          <label
                            className="form-check-label"
                            htmlFor={`customSwitch_${item.id}`}
                          >
                            {item.name}
                          </label>
                        </Col>
                      ))}
                    </Row>
                  </Col>
                ))}
              </Row>
            ))}
          <Row>
            <Col>
              <ModalFooter>
                <button type="submit" className="btn btn-success save-user">
                  Create
                </button>
                <button
                  type="reset"
                  className="btn btn-warning"
                  onClick={() => validation.resetForm()}
                >
                  Reset
                </button>

                <button
                  type="button"
                  className="btn btn-outline-danger"
                  onClick={() => {
                    validation.resetForm();
                    toggleAddPolicyModal();
                  }}
                >
                  Cancel
                </button>
              </ModalFooter>
            </Col>
          </Row>
        </Form>
      </ModalBody>
    </Modal>
  );
};

CreateGroupPolicy.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default CreateGroupPolicy;
