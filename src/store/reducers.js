import { combineReducers } from "redux";

// Front
import Layout from "./layout/reducer";

// Authentication
import Login from "./auth/login/reducer";
import Account from "./auth/register/reducer";
import ForgetPassword from "./auth/forgetpwd/reducer";
import Profile from "./auth/profile/reducer";

import users from "./users/reducer";
import customerUsers from "./customerusers/reducer";
import groupPolicy from "./grouppolicy/reducer";
import designation from "./designation/reducer";
import notificationTemplate from "./notificationtemplate/reducer";
import scheduleCustomerNotification from "./schedulecustomernotification/reducer";
import regionaloffice from "./regionalofficelist/reducer";
import stateUsers from "./stateusers/reducer";
import district from "./district/reducer";
import city from "./city/reducer";
import location from "./location/reducer";
import sublocation from "./sublocation/reducer";
import broadCasters from "./broadcaster/reducer";
import genreList from "./genre/reducer";
import languageList from "./language/reducer";
import channelList from "./channel/reducer";
import broadcasterBouquetList from "./broadcasterbouquet/reducer";
import packageList from "./packagelist/reducer";

import distributors from "./distributorslist/reducer";
import lco from "./lcolist/reducer";
import scheduledNotification from "./schedulednotificationlist/reducer";
import userHierarchy from "./userhierarchy/reducer";
import appadbanner from "./appadbannerlist/reducer";

const rootReducer = combineReducers({
  // public
  Layout,
  Login,
  Account,
  ForgetPassword,
  Profile,
  users,
  customerUsers,
  groupPolicy,
  designation,
  notificationTemplate,
  scheduleCustomerNotification,
  regionaloffice,
  stateUsers,
  location,
  sublocation,
  broadCasters,
  genreList,
  languageList,
  channelList,
  broadcasterBouquetList,
  packageList,
  distributors,
  district,
  city,
  lco,
  scheduledNotification,
  userHierarchy,
  appadbanner,
});

export default rootReducer;
