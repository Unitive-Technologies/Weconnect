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

import ContactsList from "../pages/Access/UsersList/usersList";
import CustomerUserlist from "../pages/Access/CustomerUserList/CustomerUserList";
import GroupPolicyList from "../pages/Access/GroupPolicyList/groupPolicyList";
import DesignationList from "../pages/Access/DesignationList/designationList";
import UserHierarchyList from "../pages/Access/UserHierarchyList/userHierarchyList";
import NotificationTemplateList from "../pages/Access/NotificationTemplateList/notificationTemplateList";
import ScheduledNotificationList from "../pages/Access/ScheduledNotificationList/scheduledNotificationList";
import ScheduleCustomerNotificationList from "../pages/Access/ScheduleCustomerNotificationList/scheduleCustomerNotificationList";
import AppAdBannerList from "../pages/Access/AppAdBannerList/appAdBannerList";

// path from organization
import RegionalOfficeList from "../pages/Organization/RegionalOfficeList/regionalOfficeList";
import NewRegionalOfficeList from "../pages/Organization/RegionalOfficeList/NewRegionalOfficeList";
import LcoList from "../pages/Organization/LCOList/lcoList";
import DistributorList from "../pages/Organization/DistributorList/distributorList";

// path from territory
import DistrictList from "../pages/Territory/DistrictList/districtList";
import CityList from "../pages/Territory/CityList/cityList";
import LocationList from "../pages/Territory/LocationList/locationList";
import StateList from "../pages/Territory/StateList/stateList";
import SublocationList from "../pages/Territory/SublocationList/sublocationList";

//  path from services
import BroadcasterBouquetList from "../pages/Services/BroadcasterBouquetList/broadcasterBouquetList";
import BroadcasterList from "../pages/Services/BroadcasterList/broadcasterList";
import ChannelList from "../pages/Services/ChannelList/channelList";
import DocumentUploadPolicyList from "../pages/Services/DocumentUploadPolicyList/documentUploadPolicyList";
import GenreList from "../pages/Services/GenreList/genreList";
import LanguageList from "../pages/Services/LanguageList/languageList";
import LocalChannelNumberList from "../pages/Services/LocalChannelNumberList/localChannelNumberList";
import OSDConfigurationList from "../pages/Services/OSDConfigurationList/osdConfigurationList";
import OSDTemplateList from "../pages/Services/OSDTemplateList/osdTemplateList";
import PackageList from "../pages/Services/PackageList/packageList";
import SMSMessageTemplateList from "../pages/Services/SMSMessageTemplateList/SMSMessageTemplateList";

//  path from Inventory
import CompanyList from "../pages/Inventory/CompanyList/companyList";
import WarehouseList from "../pages/Inventory/WarehouseList/warehouseList";
import InventoryStateList from "../pages/Inventory/InventoryStateList/inventoryStateList";
import BrandList from "../pages/Inventory/BrandList/brandList";

// path from Billing
import BankList from "../pages/Billing/BankList/bankList";
import PromoVoucherList from "../pages/Billing/PromoVoucherList/promoVoucherList";
import ReasonList from "../pages/Billing/ReasonList/reasonList";
import TaxList from "../pages/Billing/TaxList/taxList";

// path from Subscription
import BouquetList from "../pages/Subscription/BouquetList/bouquetList";
import ConnectionSchemeList from "../pages/Subscription/ConnectionSchemeList/connectionSchemeList";
import NCFList from "../pages/Subscription/NCFList/ncfList";

// path from Complaint
import ComplaintCategoryList from "../pages/Complaint/ComplaintCategoryList/complaintCategoryList";
import ComplaintSubCategoryList from "../pages/Complaint/ComplaintSubCategoryList/complaintSubCategoryList";

import ConfigurationUploadLogs from "../pages/UploadLogs/ConfigurationUploadLogs/configurationUploadLogs";

import InventoryStock from "../pages/InventoryStock/inventorystock";

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
    component: <NewRegionalOfficeList />,
  },
  {
    path: "/lco-list",
    component: <LcoList />,
  },
  {
    path: "/distributor-list",
    component: <DistributorList />,
  },

  // path from Territory

  {
    path: "/city-list",
    component: <CityList />,
  },
  {
    path: "/district-list",
    component: <DistrictList />,
  },
  {
    path: "/location-list",
    component: <LocationList />,
  },
  {
    path: "/state-list",
    component: <StateList />,
  },
  {
    path: "/sublocation-list",
    component: <SublocationList />,
  },

  // path from Services
  {
    path: "/broadcaster-bouquet-list",
    component: <BroadcasterBouquetList />,
  },
  {
    path: "/broadcaster-list",
    component: <BroadcasterList />,
  },
  {
    path: "/channel-list",
    component: <ChannelList />,
  },
  {
    path: "/document-upload-policy-list",
    component: <DocumentUploadPolicyList />,
  },
  {
    path: "/genre-list",
    component: <GenreList />,
  },
  {
    path: "/language-list",
    component: <LanguageList />,
  },
  {
    path: "/local-channel-number-list",
    component: <LocalChannelNumberList />,
  },
  {
    path: "/OSDConfiguration-list",
    component: <OSDConfigurationList />,
  },
  {
    path: "/OSDTemplate-list",
    component: <OSDTemplateList />,
  },
  {
    path: "/package-list",
    component: <PackageList />,
  },
  {
    path: "/SMS-Message-Template-list",
    component: <SMSMessageTemplateList />,
  },

  // path from Inventory
  {
    path: "/company-list",
    component: <CompanyList />,
  },
  {
    path: "/brand-list",
    component: <BrandList />,
  },
  {
    path: "/warehouse-list",
    component: <WarehouseList />,
  },
  {
    path: "/inventory-state-list",
    component: <InventoryStateList />,
  },

  // path from Billing
  {
    path: "/bank-list",
    component: <BankList />,
  },
  {
    path: "/promo-voucher-list",
    component: <PromoVoucherList />,
  },
  {
    path: "/reason-list",
    component: <ReasonList />,
  },
  {
    path: "/tax-list",
    component: <TaxList />,
  },

  // path from NCF
  {
    path: "/bouquet-list",
    component: <BouquetList />,
  },
  {
    path: "/connection-scheme-list",
    component: <ConnectionSchemeList />,
  },
  {
    path: "/ncf-list",
    component: <NCFList />,
  },

  // path from Complaint
  {
    path: "/complaint-category-list",
    component: <ComplaintCategoryList />,
  },
  {
    path: "/complaint-subCategory-list",
    component: <ComplaintSubCategoryList />,
  },

  //path from Configuration Upload Logs
  {
    path: "/configuration-upload-logs",
    component: <ConfigurationUploadLogs />,
  },
  {
    path: "/inventorystock",
    component: <InventoryStock />,
  },
];

const publicRoutes = [
  { path: "/logout", component: <Logout /> },
  { path: "/login", component: <Login /> },
  { path: "/forgot-password", component: <ForgetPwd /> },
  { path: "/register", component: <Register /> },
];

export { authProtectedRoutes, publicRoutes };
