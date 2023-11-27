import { combineReducers } from "redux";

// Front
import Layout from "./layout/reducer";

// Authentication
import Login from "./auth/login/reducer";
import Account from "./auth/register/reducer";
import ForgetPassword from "./auth/forgetpwd/reducer";
import Profile from "./auth/profile/reducer";

import contacts from "./contacts/reducer";
import customerUsers from "./customerusers/reducer";
import groupPolicy from "./grouppolicy/reducer";
import designation from "./designation/reducer";
import notificationTemplate from "./notificationtemplate/reducer";
import scheduleCustomerNotification from "./schedulecustomernotification/reducer";
import regionaloffice from "./regionalofficelist/reducer";
import stateUsers from "./stateusers/reducer";

import broadCasters from "./broadcaster/reducer";
import genreLists from "./genre/reducer";
import distributors from "./distributorslist/reducer";

const rootReducer = combineReducers({
  // public
  Layout,
  Login,
  Account,
  ForgetPassword,
  Profile,
  contacts,
  customerUsers,
  groupPolicy,
  designation,
  notificationTemplate,
  scheduleCustomerNotification,
  regionaloffice,
  stateUsers,
  broadCasters,
  genreLists,
  distributors,
});

export default rootReducer;
