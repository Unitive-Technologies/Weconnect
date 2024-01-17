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
import regionaloffice from "./regionaloffice/reducer";
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
import osdConfiguration from "./OSDConfiguration/reducer";
import osdTemplate from "./OSDTemplate/reducer";
import distributors from "./distributor/reducer";
import lco from "./lcolist/reducer";
import schedulednotification from "./schedulednotificationlist/reducer";
import userHierarchy from "./userhierarchy/reducer";
import appadbanner from "./appadbannerlist/reducer";
import localChannelNumber from "./localchannelnumber/reducer";
import ncf from "./ncflist/reducer";
import bouquet from "./bouquetlist/reducer";
import documentUploadPolicy from "./documentuploadpolicy/reducer";
import smsmessagetemp from "./smsmessage/reducer";
import connectionscheme from "./connectionschemelist/reducer";
import companylist from "./companylist/reducer";
import brandlist from "./brandlist/reducer";
import configurationuploadlogs from "./configurationuploadlogs/reducer";
import complaintcategory from "./complaintcategorylist/reducer";
import complaintsubcategory from "./complaintsubcategorylist/reducer";
import warehouselist from "./warehouse/reducer";
import inventorystatelist from "./inventorystate/reducer";
import tax from "./taxlist/reducer";
import reason from "./reasonlist/reducer";
import bank from "./banklist/reducer";
import promovoucher from "./promovoucherlist/reducer";
import admindetails from "./admin/reducer";
import inventorystock from "./inventorystock/reducer";
import operatorforassign from "./ncflist/reducer";
import operatorforbouquet from "./bouquetlist/reducer";
import stockstb from "./inventorystock/reducer";
import stockpairing from "./inventorystock/reducer";
import faultysmartcard from "./inventorystock/reducer";
import faultystb from "./inventorystock/reducer";
import faultypairing from "./inventorystock/reducer";

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
  schedulednotification,
  userHierarchy,
  appadbanner,
  osdConfiguration,
  osdTemplate,
  localChannelNumber,
  ncf,
  bouquet,
  documentUploadPolicy,
  smsmessagetemp,
  connectionscheme,
  companylist,
  brandlist,
  complaintcategory,
  complaintsubcategory,
  warehouselist,
  inventorystatelist,
  configurationuploadlogs,
  tax,
  reason,
  bank,
  promovoucher,
  admindetails,
  inventorystock,
  operatorforassign,
  operatorforbouquet,
  stockstb,
  stockpairing,
  faultysmartcard,
  faultystb,
  faultypairing,
});

export default rootReducer;
