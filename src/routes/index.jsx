import React from "react";
import { Navigate } from "react-router-dom";

// // Profile
import UserProfile from "../pages/Authentication/user-profile";

// Authentication related pages
import Login from "../pages/Authentication/Login";
import Logout from "../pages/Authentication/Logout";
import Register from "../pages/Authentication/Register";
import ForgetPwd from "../pages/Authentication/ForgetPassword";

// Dashboard
import Dashboard from "../pages/Dashboard/index";
// import UserList from "../pages/MsoMaster/Access/UserList/index";

import ContactsList from "../pages/Contacts/ContactList/contacts-list";
import CustomerUserlist from "../pages/Contacts/CustomerUserList/CustomerUserList";
import GroupPolicyList from "../pages/Contacts/GroupPolicyList/groupPolicyList";
import DesignationList from "../pages/Contacts/DesignationList/designationList";
import UserHierarchyList from "../pages/Contacts/UserHierarchyList/userHierarchyList";
import NotificationTemplateList from "../pages/Contacts/NotificationTemplateList/notificationTemplateList";
import ScheduledNotificationList from "../pages/Contacts/ScheduledNotificationList/scheduledNotificationList";
import ScheduleCustomerNotificationList from "../pages/Contacts/ScheduleCustomerNotificationList/scheduleCustomerNotificationList";
import AppAdBannerList from "../pages/Contacts/AppAdBannerList/appAdBannerList";

// path from organization
import RegionalOfficeList from "../pages/Organization/RegionalOfficeList/regionalOfficeList";
import LcoList from "../pages/Organization/LCOList/lcoList";
import DistributorList from "../pages/Organization/DistributorList/distributorList";

const authProtectedRoutes = [
  { path: "/dashboard", component: <Dashboard /> },

  //   // //profile
  { path: "/profile", component: <UserProfile /> },
  // { path: "/mso-master-access-user-list", component: <UserList /> },
  //   // this route should be at the end of all other routes
  //   // eslint-disable-next-line react/display-name
  { path: "/", exact: true, component: <Navigate to="/dashboard" /> },

  { path: "/grouppolicylist", component: <GroupPolicyList /> },
  { path: "/userslist", component: <ContactsList /> },
  { path: "/customer-userslist", component: <CustomerUserlist /> },
  { path: "/designationlist", component: <DesignationList /> },
  { path: "/user-hierarchylist", component: <UserHierarchyList /> },
  {
    path: "/notification-templatelist",
    component: <NotificationTemplateList />,
  },
  {
    path: "/scheduled-notificationlist",
    component: <ScheduledNotificationList />,
  },
  {
    path: "/schedule-customer-notificationlist",
    component: <ScheduleCustomerNotificationList />,
  },
  {
    path: "/app-adbannerlist",
    component: <AppAdBannerList />,
  },


  {
    path: "/regional-office-list",
    component: <RegionalOfficeList />,
  },
  {
    path: "/lco-list",
    component: <LcoList />,
  },
  {
    path: "/distributor-list",
    component: <DistributorList />,
  },
];

const publicRoutes = [
  { path: "/logout", component: <Logout /> },
  { path: "/login", component: <Login /> },
  { path: "/forgot-password", component: <ForgetPwd /> },
  { path: "/register", component: <Register /> },
];

export { authProtectedRoutes, publicRoutes };
