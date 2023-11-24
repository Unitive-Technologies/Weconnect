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
import CustomerUserlist from "../pages/Contacts/CustomerUserList/customer-userlist";
import GroupPolicyList from "../pages/Contacts/GroupPolicyList/groupPolicyList";
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
];

const publicRoutes = [
  { path: "/logout", component: <Logout /> },
  { path: "/login", component: <Login /> },
  { path: "/forgot-password", component: <ForgetPwd /> },
  { path: "/register", component: <Register /> },
];

export { authProtectedRoutes, publicRoutes };
