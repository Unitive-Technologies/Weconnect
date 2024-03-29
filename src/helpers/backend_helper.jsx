import axios from "axios";
import {
  del,
  get,
  getCompleteResponse,
  post,
  postCompleteResponse,
  put,
} from "./api_helper";
import * as url from "./url_helper";

// Gets the logged in user data from local session
const getLoggedInUser = () => {
  const user = localStorage.getItem("user");
  if (user) return JSON.parse(user);
  return null;
};

//is user is logged in
const isUserAuthenticated = () => {
  return getLoggedInUser() !== null;
};

// Register Method
const postFakeRegister = (data) => {
  return axios
    .post(url.POST_FAKE_REGISTER, data)
    .then((response) => {
      if (response.status >= 200 || response.status <= 299)
        return response.data;
      throw response.data;
    })
    .catch((err) => {
      let message;
      if (err.response && err.response.status) {
        switch (err.response.status) {
          case 404:
            message = "Sorry! the page you are looking for could not be found";
            break;
          case 500:
            message =
              "Sorry! something went wrong, please contact our support team";
            break;
          case 401:
            message = "Invalid credentials";
            break;
          default:
            message = err[1];
            break;
        }
      }
      throw message;
    });
};

// Login Method
const postFakeLogin = (data) => post(url.POST_FAKE_LOGIN, data);

// postForgetPwd
const postFakeForgetPwd = (data) => post(url.POST_FAKE_PASSWORD_FORGET, data);

// Edit profile
const postJwtProfile = (data) => post(url.POST_EDIT_JWT_PROFILE, data);

const postFakeProfile = (data) => post(url.POST_EDIT_PROFILE, data);

// Register Method
const postJwtRegister = (url, data) => {
  return axios
    .post(url, data)
    .then((response) => {
      if (response.status >= 200 || response.status <= 299)
        return response.data;
      throw response.data;
    })
    .catch((err) => {
      var message;
      if (err.response && err.response.status) {
        switch (err.response.status) {
          case 404:
            message = "Sorry! the page you are looking for could not be found";
            break;
          case 500:
            message =
              "Sorry! something went wrong, please contact our support team";
            break;
          case 401:
            message = "Invalid credentials";
            break;
          default:
            message = err[1];
            break;
        }
      }
      throw message;
    });
};

// Login Method
const postJwtLogin = (data) => {
  console.log("reached login helper -", data);
  return post(url.POST_JWT_LOGIN, data);
};

// postForgetPwd
const postJwtForgetPwd = (data) =>
  post(url.POST_FAKE_JWT_PASSWORD_FORGET, data);

// postSocialLogin
export const postSocialLogin = (data) => post(url.SOCIAL_LOGIN, data);

// get Products
export const getProducts = () => get(url.GET_PRODUCTS);

// get Product detail
export const getProductDetail = (id) =>
  get(`${url.GET_PRODUCTS_DETAIL}/${id}`, { params: { id } });

// get Events
export const getEvents = () => get(url.GET_EVENTS);

// add Events
export const addNewEvent = (event) => post(url.ADD_NEW_EVENT, event);

// update Event
export const updateEvent = (event) => put(url.UPDATE_EVENT, event);

// delete Event
export const deleteEvent = (event) =>
  del(url.DELETE_EVENT, { headers: { event } });

// get Categories
export const getCategories = () => get(url.GET_CATEGORIES);

// get chats
export const getChats = () => get(url.GET_CHATS);

// get groups
export const getGroups = () => get(url.GET_GROUPS);

// get Contacts
export const getContacts = () => get(url.GET_CONTACTS);

// get messages
export const getMessages = (roomId = "") =>
  get(`${url.GET_MESSAGES}/${roomId}`, { params: { roomId } });

// post messages
export const getselectedmails = (selectedmails) =>
  post(url.GET_SELECTED_MAILS, selectedmails);

//post setfolderonmails
export const setfolderonmails = (selectedmails, folderId, activeTab) =>
  post(url.SET_FOLDER_SELECTED_MAILS, { selectedmails, folderId, activeTab });

// get orders
export const getOrders = () => get(url.GET_ORDERS);

// add order
export const addNewOrder = (order) => post(url.ADD_NEW_ORDER, order);

// update order
export const updateOrder = (order) => put(url.UPDATE_ORDER, order);

// delete order
export const deleteOrder = (order) =>
  del(url.DELETE_ORDER, { headers: { order } });

// get cart data
export const getCartData = () => get(url.GET_CART_DATA);

// get customers
export const getCustomers = () => get(url.GET_CUSTOMERS);

// add CUSTOMER
export const addNewCustomer = (customer) =>
  post(url.ADD_NEW_CUSTOMER, customer);

// update CUSTOMER
export const updateCustomer = (customer) => put(url.UPDATE_CUSTOMER, customer);

// delete CUSTOMER
export const deleteCustomer = (customer) =>
  del(url.DELETE_CUSTOMER, { headers: { customer } });

// get shops
export const getShops = () => get(url.GET_SHOPS);

// get wallet
export const getWallet = () => get(url.GET_WALLET);

// get crypto order
export const getCryptoOrder = () => get(url.GET_CRYPTO_ORDERS);

// get crypto product
export const getCryptoProduct = () => get(url.GET_CRYPTO_PRODUCTS);

// get invoices
export const getInvoices = () => get(url.GET_INVOICES);

// get invoice details
export const getInvoiceDetail = (id) =>
  get(`${url.GET_INVOICE_DETAIL}/${id}`, { params: { id } });

// get jobs
export const getJobList = () => get(url.GET_JOB_LIST);

// get Apply Jobs
export const getApplyJob = () => get(url.GET_APPLY_JOB);

// get project
export const getProjects = () => get(url.GET_PROJECTS);

// get project details
export const getProjectsDetails = (id) =>
  get(`${url.GET_PROJECT_DETAIL}/${id}`, { params: { id } });

// get tasks
export const getTasks = () => get(url.GET_TASKS);

// add CardData Kanban
export const addCardData = (cardData) => post(url.ADD_CARD_DATA, cardData);

// update jobs
export const updateCardData = (card) => put(url.UPDATE_CARD_DATA, card);

// delete Kanban
export const deleteKanban = (kanban) =>
  del(url.DELETE_KANBAN, { headers: { kanban } });

export const getAdmindetails = () => get(url.GET_ADMINDETAILS);
// get Users
// export const getUsers = () => get(url.GET_USERS);
export const getUsers = async (currentPage, perPage = 20) => {
  console.log("Users - Current Page in fakebackend: ", currentPage);
  console.log("Users - Per Page: ", perPage);
  return await getCompleteResponse(url.getUsersUrl(currentPage, perPage));
};
// export const getCustomerUsers = () => get(url.GET_CUSTOMERUSERS);
export const getCustomerUsers = async (currentPage, perPage = 20) => {
  console.log("CustomerUsers - Current Page in fakebackend: ", currentPage);
  console.log("CustomerUsers - Per Page: ", perPage);
  return await getCompleteResponse(
    url.getCustomerUsersUrl(currentPage, perPage)
  );
};

export const getBroadCaster = async (currentPage, perPage = 20) => {
  console.log("Broadcasters - Current Page in fakebackend: ", currentPage);
  console.log("Broadcasters - Per Page: ", perPage);
  return await getCompleteResponse(url.getBroadcasterUrl(currentPage, perPage));
};

export const getDistrict = async (currentPage, perPage = 20) => {
  console.log("Users - Current Page in fakebackend: ", currentPage);
  console.log("Users - Per Page: ", perPage);
  return await getCompleteResponse(url.getDistrictUrl(currentPage, perPage));
};

export const getGenreList = async (currentPage, perPage = 20) => {
  console.log("GenreList - Current Page in fakebackend: ", currentPage);
  console.log("GenreList - Per Page: ", perPage);
  return await getCompleteResponse(url.getGenreListUrl(currentPage, perPage));
};

export const getCity = async (currentPage, perPage = 20) => {
  console.log("City - Current Page in fakebackend: ", currentPage);
  console.log("City - Per Page: ", perPage);
  return await getCompleteResponse(url.getCityUrl(currentPage, perPage));
};

export const getSublocation = async (currentPage, perPage = 20) => {
  console.log("City - Current Page in fakebackend: ", currentPage);
  console.log("City - Per Page: ", perPage);
  return await getCompleteResponse(url.getSublocationUrl(currentPage, perPage));
};

export const getLocation = async (currentPage, perPage = 20) => {
  console.log("Location - Current Page in fakebackend: ", currentPage);
  console.log("Location - Per Page: ", perPage);
  return await getCompleteResponse(url.getLocationUrl(currentPage, perPage));
};

export const updateCustomerUser = (customerUser, id) =>
  put(url.UPDATE_CUSTOMERUSER(id), customerUser);
export const getCustomerUsersSettings = () =>
  get(url.GET_CUSTOMERUSERS_SETTINGS);

export const getlanguageList = async (currentPage, perPage = 20) => {
  console.log("Language List - Current Page in fakebackend: ", currentPage);
  console.log("Language List - Per Page: ", perPage);
  return await getCompleteResponse(
    url.getLanguageListUrl(currentPage, perPage)
  );
};

export const getCASSourceList = async () => {
  return await getCompleteResponse(url.getCASSourceUrl());
};

export const getChannelList = async (currentPage, perPage = 20) => {
  console.log("Channel List - Current Page in fakebackend: ", currentPage);
  console.log("Channel List - Per Page: ", perPage);
  return await getCompleteResponse(url.getChannelListUrl(currentPage, perPage));
};

export const getBroadcasterBouquetList = async (currentPage, perPage = 20) => {
  console.log(
    "BroadcasterBouquet - Current Page in fakebackend: ",
    currentPage
  );
  console.log("BroadcasterBouquet - Per Page: ", perPage);
  return await getCompleteResponse(
    url.getBroadcasterBouquetListUrl(currentPage, perPage)
  );
};

export const getPackageList = async (currentPage, perPage = 20) => {
  console.log("Package List - Current Page in fakebackend: ", currentPage);
  console.log("Package List - Per Page: ", perPage);
  return await getCompleteResponse(url.getPackageListUrl(currentPage, perPage));
};

export const getWarehouseList = async (currentPage, perPage = 20) => {
  console.log("Warehouse List - Current Page in fakebackend: ", currentPage);
  console.log("Warehouse List - Per Page: ", perPage);
  return await getCompleteResponse(
    url.getWarehouseListUrl(currentPage, perPage)
  );
};

export const getBrandList = async (currentPage, perPage = 20) => {
  console.log("City - Current Page in fakebackend: ", currentPage);
  console.log("City - Per Page: ", perPage);
  return await getCompleteResponse(url.getBrandListUrl(currentPage, perPage));
};

export const getReason = async (currentPage, perPage = 20) => {
  console.log("Reason - Current Page in fakebackend: ", currentPage);
  console.log("Reason - Per Page: ", perPage);
  return await getCompleteResponse(url.getReasonUrl(currentPage, perPage));
};

export const getBank = async (currentPage, perPage = 20) => {
  console.log("Bank - Current Page in fakebackend: ", currentPage);
  console.log("Bank - Per Page: ", perPage);
  return await getCompleteResponse(url.getBankUrl(currentPage, perPage));
};

export const getPromoVoucher = async (currentPage, perPage = 20) => {
  console.log("Users - Current Page in fakebackend: ", currentPage);
  console.log("Users - Per Page: ", perPage);
  return await getCompleteResponse(
    url.getPromoVoucherUrl(currentPage, perPage)
  );
};

export const getBouquet = async (currentPage, perPage = 20) => {
  console.log("Reason - Current Page in fakebackend: ", currentPage);
  console.log("Reason - Per Page: ", perPage);
  return await getCompleteResponse(url.getBouquetUrl(currentPage, perPage));
};

export const getConfigurationUploadLogs = async (currentPage, perPage = 20) => {
  console.log("Users - Current Page in fakebackend: ", currentPage);
  console.log("Users - Per Page: ", perPage);
  return await getCompleteResponse(
    url.getConfigurationUploadLogsUrl(currentPage, perPage)
  );
};

// export const getDocumentUploadPolicy = async (currentPage, perPage = 20) => {
//   console.log("Users - Current Page in fakebackend: ", currentPage);
//   console.log("Users - Per Page: ", perPage);
//   return await getCompleteResponse(url.getDocumentUploadPolicyUrl(currentPage, perPage));
// };

export const getGroupPolicy = () => get(url.GET_GROUPPOLICY);
export const addNewGroupPolicy = (groupPolicy) =>
  post(url.ADD_NEW_GROUPPOLICY, groupPolicy);
export const getPolicyType = () => get(url.GET_POLICY_TYPE);
export const getPolicyRole = () => get(url.GET_POLICY_ROLE);

export const getDesignation = () => get(url.GET_DESIGNATION);
export const addNewDesignation = (designation) =>
  post(url.ADD_NEW_DESIGNATION, designation);
export const getDesignationStatus = () => get(url.GET_DESIGNATION_STATUS);
export const getDesignationType = () => get(url.GET_DESIGNATION_TYPE);
export const getDesignationParent = () => get(url.GET_DESIGNATION_PARENT);
export const updateDesignation = (designation, id) =>
  put(url.UPDATE_DESIGNATION(id), designation);

export const getNotificationTemplate = () => get(url.GET_NOTIFICATIONTEMPLATE);
export const getNotificationTemplateType = () =>
  get(url.GET_NOTIFICATIONTEMPLATE_TYPE);
export const getNotificationTemplateStatus = () =>
  get(url.GET_NOTIFICATIONTEMPLATE_STATUS);
export const updateNotificationTemplate = (notificationTemplate, id) =>
  put(url.UPDATE_NOTIFICATIONTEMPLATE(id), notificationTemplate);
export const getNotificationTemplateAddUser = () =>
  get(url.GET_NOTIFICATIONTEMPLATE_ADDUSER);
export const addNewNotificationTemplate = (notificationTemplate) =>
  post(url.ADD_NEW_NOTIFICATIONTEMPLATE, notificationTemplate);

export const getScheduleCustomerNotification = () =>
  get(url.GET_SCHEDULECUSTOMERNOTIFICATION);
export const getScheduleCustomerNotificationType = () =>
  get(url.GET_SCHEDULECUSTOMERNOTIFICATION_TYPE);
export const getScheduleCustomerNotificationStatus = () =>
  get(url.GET_SCHEDULECUSTOMERNOTIFICATION_STATUS);
export const getScheduleCustomerNotificationSMS = () =>
  get(url.GET_SCHEDULECUSTOMERNOTIFICATION_SMS);
export const getScheduleCustomerNotificationOSD = () =>
  get(url.GET_SCHEDULECUSTOMERNOTIFICATION_OSD);
export const getScheduleCustomerNotificationBmail = () =>
  get(url.GET_SCHEDULECUSTOMERNOTIFICATION_BMAIL);

export const addNewScheduleCustomerNotification = (
  schedulecustomernotification
) =>
  post(url.ADD_NEW_SCHEDULECUSTOMERNOTIFICATION, schedulecustomernotification);

export const getScheduledNotification = () =>
  get(url.GET_SCHEDULEDNOTIFICATION);
// export const getStateUsers = () => get(url.GET_STATEUSERS);
export const getStateUsers = async (currentPage, perPage = 20) => {
  console.log("State Users - Current Page in fakebackend: ", currentPage);
  console.log("State Users - Per Page: ", perPage);
  return await getCompleteResponse(url.getStateUsersUrl(currentPage, perPage));
};

export const downloadUserUploadTemplate = async (data) => {
  return await postCompleteResponse(url.DOWNLOAD_SAMPLE_USERS, data);
};

export const updateUserUploadByToken = async (token, data) => {
  return put(url.updateUserUpload(token), data);
};

export const uploadUserFileForInitiatedUserUpload = async (
  initiatedToken,
  formData
) => {
  return await postCompleteResponse(
    url.uploadUserFileForInitiatedUserUpload(initiatedToken),
    formData
  );
};

export const downloadRegOffUploadTemplate = async (data) => {
  return await postCompleteResponse(url.DOWNLOAD_SAMPLE_REGIONALOFFICE, data);
};

export const updateRegOffUploadByToken = async (token, data) => {
  return put(url.fileUploadRegionalOffice(token), data);
};

export const uploadRegionalOfficeSubmit = async (initiatedToken, formData) => {
  return await postCompleteResponse(
    url.uploadRegionalOfficeSubmit(initiatedToken),
    formData
  );
};

export const downloadBrandUploadTemplate = async (data) => {
  return await postCompleteResponse(url.DOWNLOAD_SAMPLE_BRAND, data);
};

export const updateBrandUploadByToken = async (token, data) => {
  return put(url.fileUploadBrand(token), data);
};

export const uploadBrandSubmit = async (initiatedToken, formData) => {
  return await postCompleteResponse(
    url.uploadBrandSubmit(initiatedToken),
    formData
  );
};

export const downloadLCNUploadTemplate = async (data) => {
  return await postCompleteResponse(url.DOWNLOAD_SAMPLE_LCN, data);
};

export const updateLCNUploadByToken = async (token, data) => {
  return put(url.fileUploadLCN(token), data);
};

export const uploadLCNSubmit = async (initiatedToken, formData) => {
  return await postCompleteResponse(
    url.uploadLCNSubmit(initiatedToken),
    formData
  );
};

export const downloadWarehouseUploadTemplate = async (data) => {
  return await postCompleteResponse(url.DOWNLOAD_SAMPLE_WAREHOUSE, data);
};

export const updateWarehouseUploadByToken = async (token, data) => {
  return put(url.fileUploadWarehouse(token), data);
};

export const uploadWarehouseSubmit = async (initiatedToken, formData) => {
  return await postCompleteResponse(
    url.uploadWarehouseSubmit(initiatedToken),
    formData
  );
};

export const downloadBroadcasterUploadTemplate = async (data) => {
  return await postCompleteResponse(url.DOWNLOAD_SAMPLE_BROADCASTER, data);
};

export const updateBroadcasterUploadByToken = async (token, data) => {
  return put(url.fileUploadBroadcaster(token), data);
};

export const uploadBroadcasterSubmit = async (initiatedToken, formData) => {
  return await postCompleteResponse(
    url.uploadBroadcasterSubmit(initiatedToken),
    formData
  );
};

export const downloadGenreUploadTemplate = async (data) => {
  return await postCompleteResponse(url.DOWNLOAD_SAMPLE_GENRE, data);
};

export const updateGenreUploadByToken = async (token, data) => {
  return put(url.fileUploadGenre(token), data);
};

export const uploadGenreSubmit = async (initiatedToken, formData) => {
  return await postCompleteResponse(
    url.uploadGenreSubmit(initiatedToken),
    formData
  );
};

export const downloadLanguageUploadTemplate = async (data) => {
  return await postCompleteResponse(url.DOWNLOAD_SAMPLE_LANGUAGE, data);
};

export const updateLanguageUploadByToken = async (token, data) => {
  return put(url.fileUploadLanguage(token), data);
};

export const uploadLanguageSubmit = async (initiatedToken, formData) => {
  return await postCompleteResponse(
    url.uploadLanguageSubmit(initiatedToken),
    formData
  );
};

export const downloadBankUploadTemplate = async (data) => {
  return await postCompleteResponse(url.DOWNLOAD_SAMPLE_BANK, data);
};

export const updateBankUploadByToken = async (token, data) => {
  return put(url.fileUploadBank(token), data);
};

export const uploadBankSubmit = async (initiatedToken, formData) => {
  return await postCompleteResponse(
    url.uploadBankSubmit(initiatedToken),
    formData
  );
};

export const downloadDistrictUploadTemplate = async (data) => {
  return await postCompleteResponse(url.DOWNLOAD_SAMPLE_DISTRICT, data);
};

export const updateDistrictUploadByToken = async (token, data) => {
  return put(url.fileUploadDistrict(token), data);
};

export const uploadDistrictSubmit = async (initiatedToken, formData) => {
  return await postCompleteResponse(
    url.uploadDistrictSubmit(initiatedToken),
    formData
  );
};

export const downloadCityUploadTemplate = async (data) => {
  return await postCompleteResponse(url.DOWNLOAD_SAMPLE_CITY, data);
};

export const updateCityUploadByToken = async (token, data) => {
  return put(url.fileUploadCity(token), data);
};

export const uploadCitySubmit = async (initiatedToken, formData) => {
  return await postCompleteResponse(
    url.uploadCitySubmit(initiatedToken),
    formData
  );
};

export const downloadPackageUploadTemplate = async (data) => {
  return await postCompleteResponse(url.DOWNLOAD_SAMPLE_PACKAGE, data);
};

export const updatePackageUploadByToken = async (token, data) => {
  return put(url.fileUploadPackage(token), data);
};

export const uploadPackageSubmit = async (initiatedToken, formData) => {
  return await postCompleteResponse(
    url.uploadPackageSubmit(initiatedToken),
    formData
  );
};

export const downloadBulkUpdatePackageUploadTemplate = async (data) => {
  return await postCompleteResponse(
    url.DOWNLOAD_SAMPLE_BULKUPDATEPACKAGE,
    data
  );
};

export const updateBulkUpdatePackageUploadByToken = async (token, data) => {
  return put(url.fileUploadBulkUpdatePackage(token), data);
};

export const uploadBulkUpdatePackageSubmit = async (
  initiatedToken,
  formData
) => {
  return await postCompleteResponse(
    url.uploadBulkUpdatePackageSubmit(initiatedToken),
    formData
  );
};

export const downloadBulkUpdatePackageCascodeUploadTemplate = async (data) => {
  return await postCompleteResponse(
    url.DOWNLOAD_SAMPLE_BULKUPDATECHANNELPACKAGE,
    data
  );
};

export const updateBulkUpdatePackageCascodeUploadByToken = async (
  token,
  data
) => {
  return put(url.fileUploadBulkUpdatePackageCascode(token), data);
};

export const uploadBulkUpdatePackageCascodeSubmit = async (
  initiatedToken,
  formData
) => {
  return await postCompleteResponse(
    url.uploadBulkUpdatePackageCascodeSubmit(initiatedToken),
    formData
  );
};

export const downloadChannelUploadTemplate = async (data) => {
  return await postCompleteResponse(url.DOWNLOAD_SAMPLE_CHANNEL, data);
};

export const updateChannelUploadByToken = async (token, data) => {
  return put(url.fileUploadChannel(token), data);
};

export const uploadChannelSubmit = async (initiatedToken, formData) => {
  return await postCompleteResponse(
    url.uploadChannelSubmit(initiatedToken),
    formData
  );
};

export const downloadBulkUpdateChannelUploadTemplate = async (data) => {
  return await postCompleteResponse(
    url.DOWNLOAD_SAMPLE_BULKUPDATECHANNEL,
    data
  );
};

export const updateBulkUpdateChannelUploadByToken = async (token, data) => {
  return put(url.fileUploadBulkUpdateChannel(token), data);
};

export const uploadBulkUpdateChannelSubmit = async (
  initiatedToken,
  formData
) => {
  return await postCompleteResponse(
    url.uploadBulkUpdateChannelSubmit(initiatedToken),
    formData
  );
};

export const downloadBulkUpdateChannelCascodeUploadTemplate = async (data) => {
  return await postCompleteResponse(
    url.DOWNLOAD_SAMPLE_BULKUPDATECHANNELCASCODE,
    data
  );
};

export const updateBulkUpdateChannelCascodeUploadByToken = async (
  token,
  data
) => {
  return put(url.fileUploadBulkUpdateChannelCascode(token), data);
};

export const uploadBulkUpdateChannelCascodeSubmit = async (
  initiatedToken,
  formData
) => {
  return await postCompleteResponse(
    url.uploadBulkUpdateChannelCascodeSubmit(initiatedToken),
    formData
  );
};

export const downloadLocationUploadTemplate = async (data) => {
  return await postCompleteResponse(url.DOWNLOAD_SAMPLE_LOCATION, data);
};

export const updateLocationUploadByToken = async (token, data) => {
  return put(url.fileUploadLocation(token), data);
};

export const uploadLocationSubmit = async (initiatedToken, formData) => {
  return await postCompleteResponse(
    url.uploadLocationSubmit(initiatedToken),
    formData
  );
};

export const downloadSublocationUploadTemplate = async (data) => {
  return await postCompleteResponse(url.DOWNLOAD_SAMPLE_SUBLOCATION, data);
};

export const updateSublocationUploadByToken = async (token, data) => {
  return put(url.fileUploadSublocation(token), data);
};

export const uploadSublocationSubmit = async (initiatedToken, formData) => {
  return await postCompleteResponse(
    url.uploadSublocationSubmit(initiatedToken),
    formData
  );
};

export const downloadDistributorUploadTemplate = async (data) => {
  return await postCompleteResponse(url.DOWNLOAD_SAMPLE_DISTRIBUTOR, data);
};

export const updateDistributorUploadByToken = async (token, data) => {
  return put(url.fileUploadDistributor(token), data);
};

export const uploadDistributorSubmit = async (initiatedToken, formData) => {
  return await postCompleteResponse(
    url.uploadDistributorSubmit(initiatedToken),
    formData
  );
};

export const downloadLcoUploadTemplate = async (data) => {
  return await postCompleteResponse(url.DOWNLOAD_SAMPLE_LCO, data);
};

export const updateLcoUploadByToken = async (token, data) => {
  return put(url.fileUploadLco(token), data);
};

export const uploadLcoSubmit = async (initiatedToken, formData) => {
  return await postCompleteResponse(
    url.uploadLcoSubmit(initiatedToken),
    formData
  );
};

export const downloadUpdateLcoUploadTemplate = async (data) => {
  return await postCompleteResponse(url.DOWNLOAD_SAMPLE_UPDATELCO, data);
};

export const updateBulkLcoUploadByToken = async (token, data) => {
  return put(url.fileUploadUpdateLco(token), data);
};

export const uploadBulkUpdateLcoSubmit = async (initiatedToken, formData) => {
  return await postCompleteResponse(
    url.uploadUpdateLcoSubmit(initiatedToken),
    formData
  );
};

// export const getDistrict = () => get(url.GET_DISTRICT);
export const addDistrict = (district) => post(url.ADD_DISTRICT, district);
export const getDistrictStateList = () => get(url.GET_DISTRICT_STATELIST);
export const getAdministrativeDivisionStatus = () =>
  get(url.GET_ADMINISTRATIVEDIVISION_STATUS);
export const updateDistrict = (id, district) =>
  put(url.updateDistrictById(id), district);

export const initiateSampleDownload_District = (uploadObject) =>
  post(url.UPLOAD_ADMINISTRATIVE_DIVISION_QUEUE, uploadObject);

export const uploadFileForInitiatedDistrictUpload = (
  initiatedId,
  uploadObject
) => put(url.UPLOAD_ADMINISTRATIVE_DIVISION_QUEUE, uploadObject);

export const uploadDistrictDataForInitiatedDistrictUpload = (
  initiatedId,
  fileFormData
) => post(url.UPLOAD_ADMINISTRATIVE_DIVISION_QUEUE, uploadObject);

// export const getCity = () => get(url.GET_CITY);
export const addCity = (city) => post(url.ADD_CITY, city);

export const getDistrictByStateid = (id) => get(url.GET_DISTRICT_BYSTATEID(id));
export const updateCity = (id, city) => put(url.updateCityById(id), city);

// export const getLocation = () => get(url.GET_LOCATION);
export const addLocation = (location) => post(url.ADD_LOCATION, location);
export const updateLocation = (id, location) =>
  put(url.updateLocationById(id), location);
export const getLcoOnLocation = () => get(url.GET_LCO_ONLOCATION);
// export const getSingleLocation = (id, location) =>
//   get(url.GET_SINGLE_LOCATION(id), location);

// export const getSublocation = () => get(url.GET_SUBLOCATION);
export const addSublocation = (sublocation) =>
  post(url.ADD_SUBLOCATION, sublocation);
export const updateSublocation = (id, sublocation) =>
  put(url.updateSublocationById(id), sublocation);
export const getLocationOnSublocation = () =>
  get(url.GET_LOCATION_ONSUBLOCATION);

export const getRegionalOffices = async (currentPage, perPage = 20) => {
  console.log("RegionalOffice - Current Page in fakebackend: ", currentPage);
  console.log("RegionalOffice - Per Page: ", perPage);
  return await getCompleteResponse(
    url.getRegionalOfficesUrl(currentPage, perPage)
  );
};
export const addNewRegionalOffice = (regionaloffice) =>
  post(url.ADD_NEW_REGIONALOFFICE, regionaloffice);
export const updateRegionalOffice = (regionaloffice, id) =>
  put(url.UPDATE_REGIONALOFFICE(id), regionaloffice);
export const getRegionalAllottedBouquet = (id) =>
  get(url.GET_REGIONAL_ALLOTTEDBOUQUET(id));
export const getRegionalCreditList = () => get(url.GET_REGIONAL_CREDIT_LIST);
export const getRegionalBankList = () => get(url.GET_REGIONAL_BANK_LIST);
export const getBroadCastersStatus = () => get(url.GET_BROADCASTER_STATUS);
export const addNewBroadCaster = (broadcast) =>
  post(url.ADD_NEW_BROADCASTER, broadcast);
export const updateBroadCasters = (broadbouquet, id) =>
  put(url.UPDATE_BROADCASTER(id), broadbouquet);

export const getUserType = () => get(url.GET_USER_TYPE);
export const getUserStatus = () => get(url.GET_USER_STATUS);
export const getUserRole = () => get(url.GET_USER_ROLE);
export const getUserDesignation = () => get(url.GET_USER_DESIGNATION);
export const getUserMsoPolicy = () => get(url.GET_USER_MSO_POLICY);
export const getUserRegionalOffice = () => get(url.GET_USER_REGIONALOFFICE);
export const getUserMsoDetails = () => get(url.GET_USER_MSO_DETAILS);
export const getUserDistributor = () => get(url.GET_USER_DISTRIBUTOR);
export const getUserLco = () => get(url.GET_USER_LCO);
export const getUserBulkSettings = () => get(url.GET_USER_BULKSETTINGS);

// export const getGenreList = () => get(url.GET_GENRELIST);
export const getGenreListStatus = () => get(url.GET_GENRELIST_STATUS);
export const addNewGenreList = (genre) => post(url.ADD_NEW_GENRELIST, genre);
export const updateGenreList = (genreList, id) =>
  put(url.UPDATE_GENRELIST(id), genreList);

// export const getLanguageList = () => get(url.GET_LANGUAGELIST);
export const getLanguageListStatus = () => get(url.GET_LANGUAGELIST_STATUS);
export const addNewLanguageList = (langlist) =>
  post(url.ADD_NEW_LANGUAGELIST, langlist);
export const updateLanguageList = (langlist, id) =>
  put(url.UPDATE_LANGUAGELIST(id), langlist);

// export const getChannelList = () => get(url.GET_CHANNELLIST);
export const addNewChannelList = (channel) =>
  post(url.ADD_NEW_CHANNELLIST, channel);
export const getChannelListStatus = () => get(url.GET_CHANNELLIST_STATUS);
export const getChannelListDefinition = () =>
  get(url.GET_CHANNELLIST_DEFINITION);
export const getChannelListType = () => get(url.GET_CHANNELLIST_TYPE);
export const getChannelListBroadcaster = () =>
  get(url.GET_CHANNELLIST_BROADCASTER);
export const getChannelListCascode = () => get(url.GET_CHANNELLIST_CASCODE);
// export const getChannelListCascode = () => get(url.GET_CHANNELLIST_CASCODE);
export const getChannelListGenre = () => get(url.GET_CHANNELLIST_GENRE);
export const getChannelListLanguage = () => get(url.GET_CHANNELLIST_LANGUAGE);
export const updateChannelList = (id, channelList) =>
  put(url.UPDATE_CHANNELLIST(id), channelList);

// export const getBroadcasterBouquetList = () =>
//   get(url.GET_BROADCASTERBOUQUETLIST);
export const addNewBroadcasterBouquetList = (broadcasterBouquetList) =>
  post(url.ADD_NEW_BROADCASTERBOUQUETLIST, broadcasterBouquetList);
export const getBroadcasterBouquetStatus = () =>
  get(url.GET_BROADCASTERBOUQUETLIST_STATUS);
export const getBroadcasterBouquetDefinition = () =>
  get(url.GET_BROADCASTERBOUQUETLIST_DEFINITION);
export const getBroadcasterBouquetType = () =>
  get(url.GET_BROADCASTERBOUQUETLIST_TYPE);
export const getBroadcasterBouquetBroadcaster = () =>
  get(url.GET_BROADCASTERBOUQUETLIST_BROADCASTER);
export const getBroadcasterBouquetAddchannels = () =>
  get(url.GET_BROADCASTERBOUQUETLIST_ADDCHANNELS);
export const updateBroadcasterBouquet = (broadcasterBouquetList, id) =>
  put(url.UPDATE_BROADCASTERBOUQUETLIST(id), broadcasterBouquetList);

// export const getPackageList = () => get(url.GET_PACKAGELIST);
export const addNewPackageList = (packlist) =>
  post(url.ADD_NEW_PACKAGELIST, packlist);
export const getPackageType = () => get(url.GET_PACKAGE_TYPE);
export const getPackageBoxType = () => get(url.GET_PACKAGE_BOXTYPE);
export const getPackageStatus = () => get(url.GET_PACKAGE_STATUS);
export const getPackageCascode = () => get(url.GET_PACKAGE_CASCODE);
export const updatePackage = (packlist, id) =>
  put(url.UPDATE_PACKAGE(id), packlist);

export const getOSDConfiguration = () => get(url.GET_OSDCONFIGURATIONLIST);
export const getOSDConfigurationEnable = () =>
  get(url.GET_OSDCONFIGURATIONLIST_ENABLE);
export const getOSDConfigurationForcedDisplay = () =>
  get(url.GET_OSDCONFIGURATIONLIST_FORCESDDISPLAY);
export const getOSDConfigurationDisplay = () =>
  get(url.GET_OSDCONFIGURATIONLIST_DISPLAY);
export const getOSDConfigurationFontColor = () =>
  get(url.GET_OSDCONFIGURATIONLIST_FONTCOLOR);
export const getOSDConfigurationBackgroundColor = () =>
  get(url.GET_OSDCONFIGURATIONLIST_BACKGROUNDCOLOR);
export const getOSDConfigurationFontSize = () =>
  get(url.GET_OSDCONFIGURATIONLIST_FONTSIZE);
export const getOSDConfigurationBackgroundArea = () =>
  get(url.GET_OSDCONFIGURATIONLIST_BACKGROUNDAREA);
export const getOSDConfigurationStatus = () =>
  get(url.GET_OSDCONFIGURATIONLIST_STATUS);

export const addNewOSDConfiguration = (osdconfig) =>
  post(url.ADD_NEW_OSDCONFIGURATIONLIST, osdconfig);
export const updateOSDConfiguration = (id, osdConfig) =>
  put(url.UPDATE_OSDCONFIGURATION(id), osdConfig);
// export const getOSDTemplate = () => get(url.GET_OSDTEMPLATE);
export const getOSDTemplateTemplateFor = () =>
  get(url.GET_OSDTEMPLATE_TEMPLATEFOR);
export const getOSDTemplateOSD = () => get(url.GET_OSDTEMPLATE_OSD);
export const getOSDTemplateStatus = () => get(url.GET_OSDTEMPLATE_STATUS);
export const addNewOSDTemplate = (osdtem) =>
  post(url.ADD_NEW_OSDTEMPLATE, osdtem);
export const updateOSDTemplate = (id, osdtem) =>
  put(url.UPDATE_OSDTEMPLATE(id), osdtem);
export const getOSDTemplate = async (currentPage, perPage = 20) => {
  console.log("Tax - Current Page in fakebackend: ", currentPage);
  console.log("Tax - Per Page: ", perPage);
  return await getCompleteResponse(url.getOSDTemplateUrl(currentPage, perPage));
};

export const getLocalChannelNumber = () => get(url.GET_LOCALCHANNELNUMBER);
export const getDocumentUploadPolicy = () => get(url.GET_DOCUMENTUPLOADPOLICY);
export const addNewDocumentUploadPolicy = (documentupload) =>
  post(url.ADD_NEW_DOCUMENTUPLOADPOLICY, documentupload);

export const getDistributors = async (currentPage, perPage = 20) => {
  console.log("Distributor - Current Page in fakebackend: ", currentPage);
  console.log("Distributor - Per Page: ", perPage);
  return await getCompleteResponse(url.getDistributorUrl(currentPage, perPage));
};
export const getDistributorsPhase = () => get(url.GET_DISTRIBUTORS_PHASE);
export const getDistributorsStatus = () => get(url.GET_DISTRIBUTORS_STATUS);
export const getDistributorsSettings = () => get(url.GET_DISTRIBUTORS_SETTINGS);
export const getDistributorsOperator = () => get(url.GET_DISTRIBUTORS_OPERATOR);

export const addNewDistributor = (distributor) =>
  post(url.ADD_NEW_DISTRIBUTOR, distributor);
export const updateDistributor = (distributors, id) =>
  put(url.UPDATE_DISTRIBUTOR(id), distributors);

// export const getLco = () => get(url.GET_LCO);
export const getLco = async (currentPage, perPage = 20) => {
  console.log("lco - Current Page in fakebackend: ", currentPage);
  console.log("lco - Per Page: ", perPage);
  return await getCompleteResponse(url.getLcoUrl(currentPage, perPage));
};
export const addNewLco = (lco) => post(url.ADD_NEW_LCO, lco);
export const updateLco = (lco, id) => put(url.UPDATE_LCO(id), lco);
export const getLcoBilledby = () => get(url.GET_LCO_BILLEDBY);
export const getLcoStatus = () => get(url.GET_LCO_STATUS);
export const getLcoPhase = () => get(url.GET_LCO_PHASE);
export const getLcoStates = () => get(url.GET_LCO_STATES);
export const getLcoCustomerPortal = () => get(url.GET_LCO_CUSTOMERPORTAL);
export const getLcoParentDistributor = () => get(url.GET_LCO_PARENTDISTRIBUTOR);
export const getSingleLco = (id) => get(url.GET_SINGLE_LCO(id));
export const getLcoPaymentmode = () => get(url.GET_LCO_PAYMENTMODE);
export const getLcoAddcredit = async (currentPage, perPage = 20) => {
  return await getCompleteResponse(url.GET_LCO_ADDCREDIT(currentPage, perPage));
};

export const getAppAdBanner = () => get(url.GET_APPADBANNER);
export const addAppAdBanner = (appadbanner) =>
  post(url.ADD_APPADBANNER, appadbanner);

export const getUserHierarchy = () => get(url.GET_USERHIERARCHY);
export const addUserHierarchy = (userHierarchy) =>
  post(url.ADD_USERHIERARCHY, userHierarchy);

export const getNcf = () => get(url.GET_NCF);
export const addNcf = (ncf) => post(url.ADD_NCF, ncf);
export const getOperatorForBulkAssign = (id) =>
  get(url.GET_OPERATOR_FORBULKASSIGN(id));
export const addBulkAssignNcf = (assignncf) =>
  post(url.ADD_BULKASSIGN_NCF, assignncf);
export const updateNcf = (ncf, id) => put(url.UPDATE_NCF(id), ncf);
// export const getBouquet = () => get(url.GET_BOUQUET);
export const addBouquet = (bouquet) => post(url.ADD_BOUQUET, bouquet);
export const updateBouquet = (bouquet, id) =>
  put(url.UPDATE_BOUQUET(id), bouquet);
export const getBouquetStatus = () => get(url.GET_BOUQUET_STATUS);
export const getBouquetBoxtype = () => get(url.GET_BOUQUET_BOXTYPE);
export const getBouquetType = () => get(url.GET_BOUQUETTYPE);
export const getBouquex = () => get(url.GET_BOUQUEX);
export const getBouquetTaxlist = () => get(url.GET_BOUQUET_TAXLIST);
export const getRechargePeriod = () => get(url.GET_RECHARGEPERIOD);
export const getAlacarteChannels = () => get(url.GET_ALACARTECHANNALS);
export const getBouquetPackages = () => get(url.GET_BOUQUET_PACKAGES);
export const getOperatorForBouquet = (id) =>
  get(url.GET_OPERATOR_FORBOUQUET(id));

export const getConnectionScheme = () => get(url.GET_CONNECTIONSCHEME);
export const addConnectionScheme = (connectionscheme) =>
  post(url.ADD_CONNECTIONSCHEME, connectionscheme);
export const getConnectionSchemeBoxType = () =>
  get(url.GET_CONNECTIONSCHEME_BOXTYPE);
export const getConnectionSchemeStatus = () =>
  get(url.GET_CONNECTIONSCHEME_STATUS);
export const updateConnectionScheme = (connectionscheme, id) =>
  put(url.UPDATE_CONNECTIONSCHEME(id), connectionscheme);

export const getComplaintCategory = () => get(url.GET_COMPLAINTCATEGORY);
export const getComplaintCategoryStatus = () =>
  get(url.GET_COMPLAINTCATEGORY_STATUS);
export const addNewComplaintCategory = (complaint) =>
  post(url.ADD_NEW_COMPLAINTCATEGORY, complaint);
export const updateComplaintCategory = (id, complaint) =>
  put(url.UPDATE_COMPLAINTCATEGORY(id), complaint);

export const getComplaintSubCategory = () => get(url.GET_COMPLAINTSUBCATEGORY);
export const getComplaintSubCategoryStatus = () =>
  get(url.GET_COMPLAINTSUBCATEGORY_STATUS);
export const getComplaintSubCategoryCategory = () =>
  get(url.GET_COMPLAINTSUBCATEGORY_CATEGORY);
export const getComplaintSubCategoryDesignation = () =>
  get(url.GET_COMPLAINTSUBCATEGORY_DESIGNATION);
export const addNewComplaintSubCategory = (complaintsubcate) =>
  post(url.ADD_NEW_COMPLAINTSUBCATEGORY, complaintsubcate);
export const updateComplaintSubCategory = (id, complaint) =>
  put(url.UPDATE_COMPLAINTSUBCATEGORY(id), complaint);
// export const getConfigurationUploadLogs = () =>
//   get(url.GET_CONFIGURATIONUPLOADLOGS);
export const getCompanyList = () => get(url.GET_COMPANYLIST);

// export const getBrandList = () => get(url.GET_BRANDLIST);
export const getBrandListBrandType = () => get(url.GET_BRANDLIST_BRANDTYPE);
export const getBrandListBoxType = () => get(url.GET_BRANDLIST_BOXTYPE);
export const getBrandListCharacters = () => get(url.GET_BRANDLIST_CHARACTERS);
export const getBrandListStatus = () => get(url.GET_BRANDLIST_STATUS);
export const getBrandListCasType = () => get(url.GET_BRANDLIST_CASTYPE);
export const addBrandList = (brandlist) => post(url.ADD_BRANDLIST, brandlist);
export const updateBrandList = (id, brandlist) =>
  put(url.UPDATE_BRANDLIST(id), brandlist);

// export const getWarehouseList = () => get(url.GET_WAREHOUSELIST);
export const getWarehouseListStatus = () => get(url.GET_WAREHOUSELIST_STATUS);
export const getWarehouseListOperator = () =>
  get(url.GET_WAREHOUSELIST_OPERATOR);
export const addWareHouseList = (warehouselist) =>
  post(url.ADD_WAREHOUSELIST, warehouselist);
export const updateWarehouseList = (id, warehouselist) =>
  put(url.UPDATE_WAREHOUSELIST(id), warehouselist);

export const getInventoryStateList = () => get(url.GET_INVENTORYSTATELIST);
export const addInventoryStateList = (inventorystate) =>
  post(url.ADD_INVENTORYSTATELIST, inventorystate);

// export const getTax = () => get(url.GET_TAX);
export const addNewTaxList = (taxes) => post(url.ADD_NEW_TAXLIST, taxes);
export const updateTax = (id, taxes) => put(url.UPDATE_TAX(id), taxes);

export const getTaxStatus = () => get(url.GET_TAX_STATUS);
export const getTaxValues = () => get(url.GET_TAX_VALUES);
export const getTaxApply = () => get(url.GET_TAX_APPLY);
export const getTaxTaxOnTax = () => get(url.GET_TAX_TAXONTAX);

export const getTax = async (currentPage, perPage = 20) => {
  console.log("Tax - Current Page in fakebackend: ", currentPage);
  console.log("Tax - Per Page: ", perPage);
  return await getCompleteResponse(url.getTaxUrl(currentPage, perPage));
};

// export const getReason = () => get(url.GET_REASON);
export const getReasonStatus = () => get(url.GET_REASON_STATUS);
export const getReasonReasonType = () => get(url.GET_REASON_REASONTYPE);
export const addNewReason = (reasons) => post(url.ADD_NEW_REASON, reasons);
export const updateReason = (id, reasons) =>
  put(url.UPDATE_REASON(id), reasons);
export const downloadReasonUploadTemplate = async (data) => {
  return await postCompleteResponse(url.DOWNLOAD_SAMPLE_REASON, data);
};

export const updateReasonUploadByToken = async (token, data) => {
  return put(url.fileUploadReason(token), data);
};

export const uploadReasonSubmit = async (initiatedToken, formData) => {
  return await postCompleteResponse(
    url.uploadReasonSubmit(initiatedToken),
    formData
  );
};

// export const getBank = () => get(url.GET_BANK);
export const getBankStatus = () => get(url.GET_BANK_STATUS);
export const addNewBank = (banks) => post(url.ADD_NEW_BANK, banks);
export const updateBank = (id, banks) => put(url.UPDATE_BANK(id), banks);

// export const getPromoVoucher = () => get(url.GET_PROMOVOUCHER);
export const getPromoVoucherLCO = () => get(url.GET_PROMOVOUCHER_LCO);
export const getPromoVoucherApply = () => get(url.GET_PROMOVOUCHER_APPLY);
export const getPromoVoucherRecharge = () => get(url.GET_PROMOVOUCHER_RECHARGE);
export const getPromoVoucherBouquet = () => get(url.GET_PROMOVOUCHER_BOUQUET);

export const addNewPromoVoucher = (provoucher) =>
  post(url.ADD_NEW_PROMOVOUCHER, provoucher);

export const addPromoVoucherScrap = (provoucher) =>
  post(url.ADD_PROMOVOUCHER_SCRAP, provoucher);

// export const getSMSMessageTempList = () => get(url.GET_SMSMESSAGETEMPLIST);
export const addNewSMSMessageTempList = (smsmsg) =>
  post(url.ADD_NEW_SMSMESSAGETEMPLIST, smsmsg);

export const updateSMSMessageTempList = (id, smsmsg) =>
  put(url.UPDATE_SMSMESSAGETEMPLIST(id), smsmsg);
export const getSMSMessageTempListStatus = () =>
  get(url.GET_SMSMESSAGETEMPLIST_STATUS);
export const getSMSMessageTempListSubcategory = () =>
  get(url.GET_SMSMESSAGETEMPLIST_SUBCATEGORY);
export const getSMSMessageTempListCategory = () =>
  get(url.GET_SMSMESSAGETEMPLIST_CATEGORY);
export const getSMSMessageTempListSender = () =>
  get(url.GET_SMSMESSAGETEMPLIST_SENDER);

export const getSMSMessageTempList = async (currentPage, perPage = 20) => {
  console.log("Tax - Current Page in fakebackend: ", currentPage);
  console.log("Tax - Per Page: ", perPage);
  return await getCompleteResponse(
    url.getSMSMessageTempListUrl(currentPage, perPage)
  );
};

export const getInventoryStockSmartcard = () =>
  get(url.GET_INVENTORYSTOCK_SMARTCARD);
export const getInventoryStockStb = () => get(url.GET_INVENTORYSTOCK_STB);
export const getInventoryStockPairing = async (currentPage, perPage = 20) => {
  return await getCompleteResponse(
    url.getStockPairingUrl(currentPage, perPage)
  );
};

export const downloadSmartcardUploadTemplate = async (data) => {
  return await postCompleteResponse(url.DOWNLOAD_SAMPLE_SMARTCARD, data);
};

export const updateSmartcardUploadByToken = async (token, data) => {
  return put(url.fileUploadSmartcard(token), data);
};

export const uploadSmartcardSubmit = async (initiatedToken, formData) => {
  return await postCompleteResponse(
    url.uploadBulkSmartcardSubmit(initiatedToken),
    formData
  );
};

export const downloadSmartcardBulkUpdateTemplate = async (data) => {
  return await postCompleteResponse(url.DOWNLOAD_SAMPLE_SMARTCARD_UPDATE, data);
};

export const updateSmartcardBulkUpdateByToken = async (token, data) => {
  return put(url.fileUploadSmartcardUpdate(token), data);
};

export const bulkUpdateSmartcardSubmit = async (initiatedToken, formData) => {
  return await postCompleteResponse(
    url.uploadBulkUpdateSmartcardSubmit(initiatedToken),
    formData
  );
};

export const downloadStbUploadTemplate = async (data) => {
  return await postCompleteResponse(url.DOWNLOAD_SAMPLE_STB, data);
};

export const updateStbUploadByToken = async (token, data) => {
  return put(url.fileUploadStb(token), data);
};

export const uploadStbSubmit = async (initiatedToken, formData) => {
  return await postCompleteResponse(
    url.uploadBulkStbSubmit(initiatedToken),
    formData
  );
};

export const downloadStbBulkUpdateTemplate = async (data) => {
  return await postCompleteResponse(url.DOWNLOAD_SAMPLE_STB_UPDATE, data);
};

export const updateStbBulkUpdateByToken = async (token, data) => {
  return put(url.fileUploadStbUpdate(token), data);
};

export const bulkUpdateStbSubmit = async (initiatedToken, formData) => {
  return await postCompleteResponse(
    url.uploadBulkUpdateStbSubmit(initiatedToken),
    formData
  );
};

export const downloadPairingUploadTemplate = async (data) => {
  return await postCompleteResponse(url.DOWNLOAD_SAMPLE_PAIRING, data);
};

export const updatePairingUploadByToken = async (token, data) => {
  return put(url.fileUploadPairing(token), data);
};

export const uploadPairingSubmit = async (initiatedToken, formData) => {
  return await postCompleteResponse(
    url.uploadBulkPairingSubmit(initiatedToken),
    formData
  );
};

export const downloadUploadMaterialstatusTemplate = async (data) => {
  return await postCompleteResponse(
    url.DOWNLOAD_SAMPLE_PAIRING_MATERIALSTATUS,
    data
  );
};

export const uploadMaterialstatusByToken = async (token, data) => {
  return put(url.fileUploadMaterialstatus(token), data);
};

export const uploadMaterialstatusSubmit = async (initiatedToken, formData) => {
  return await postCompleteResponse(
    url.uploadMaterialstatusSubmit(initiatedToken),
    formData
  );
};

export const downloadSmartcardAllotmentUploadTemplate = async (data) => {
  return await postCompleteResponse(
    url.DOWNLOAD_SAMPLE_SMARTCARD_ALLOTMENT,
    data
  );
};

export const updateSmartcardAllotmentUploadByToken = async (token, data) => {
  return put(url.fileUploadSmartcardAllotment(token), data);
};

export const uploadSmartcardAllotmentSubmit = async (
  initiatedToken,
  formData
) => {
  return await postCompleteResponse(
    url.uploadBulkSmartcardAllotmentSubmit(initiatedToken),
    formData
  );
};

export const downloadStbAllotmentUploadTemplate = async (data) => {
  return await postCompleteResponse(url.DOWNLOAD_SAMPLE_STB_ALLOTMENT, data);
};

export const updateStbAllotmentUploadByToken = async (token, data) => {
  return put(url.fileUploadStbAllotment(token), data);
};

export const uploadStbAllotmentSubmit = async (initiatedToken, formData) => {
  return await postCompleteResponse(
    url.uploadBulkStbAllotmentSubmit(initiatedToken),
    formData
  );
};

export const downloadPairingAllotmentUploadTemplate = async (data) => {
  return await postCompleteResponse(
    url.DOWNLOAD_SAMPLE_PAIRING_ALLOTMENT,
    data
  );
};

export const updatePairingAllotmentUploadByToken = async (token, data) => {
  return put(url.fileUploadPairingAllotment(token), data);
};

export const uploadPairingAllotmentSubmit = async (
  initiatedToken,
  formData
) => {
  return await postCompleteResponse(
    url.uploadBulkPairingAllotmentSubmit(initiatedToken),
    formData
  );
};

export const downloadUploadCreditLcoTemplate = async (data) => {
  return await postCompleteResponse(url.DOWNLOAD_SAMPLE_UPLOADCREDITLCO, data);
};

export const updateUploadCreditLcoByToken = async (token, data) => {
  return put(url.fileUploadCreditLco(token), data);
};

export const uploadCreditLcoSubmit = async (initiatedToken, formData) => {
  return await postCompleteResponse(
    url.bulkUploadCreditLcoSubmit(initiatedToken),
    formData
  );
};

export const updateInventoryStockStb = (id, stockstb) =>
  put(url.UPDATE_INVENTORYSTOCK_STB(id), stockstb);
export const addInventoryStockSmartcard = (stocksmartcard) =>
  post(url.ADD_INVENTORYSTOCK_SMARTCARD, stocksmartcard);
export const addInventoryStockStb = (stockstb) =>
  post(url.ADD_INVENTORYSTOCK_STB, stockstb);
export const addInventoryStockPairing = (stockpairing) =>
  post(url.ADD_INVENTORYSTOCK_PAIRING, stockpairing);
export const updateStockSmartcardMarkfaulty = (stocksmartcard) =>
  put(url.UPDATE_STOCKSMARTCARD_MARKFAULTY, stocksmartcard);
export const updateStockSmartcardBlacklist = (stocksmartcard) =>
  put(url.UPDATE_STOCKSMARTCARD_BLACKLIST, stocksmartcard);
export const updateStockSmartcardActionupdation = (stocksmartcard) =>
  post(url.UPDATE_STOCKSMARTCARD_ACTIONUPDATION, stocksmartcard);
export const updateStockStbMarkfaulty = (stockstb) =>
  put(url.UPDATE_STOCKSTB_MARKFAULTY, stockstb);
export const updateStockStbBlacklist = (stockstb) =>
  put(url.UPDATE_STOCKSTB_BLACKLIST, stockstb);
export const addStockStbActionupdation = (stockstb) =>
  post(url.ADD_STOCKATB_ACTIONUPDATION, stockstb);
export const getStockPairingInventoryState = () =>
  get(url.GET_STOCKPAIRING_INVENTORYSTATE);
export const updateStockPairingMarkfaulty = (stockpairing) =>
  put(url.UPDATE_STOCKPAIRING_MARKFAULTY, stockpairing);
export const updateStockpairingBlacklist = (stockpairing) =>
  put(url.UPDATE_STOCKPAIRING_BLACKLIST, stockpairing);
export const deleteStockPairing = (stockpairing) =>
  post(url.DELETE_STOCKPAIRING, stockpairing);

export const getInventoryFaultySmartcard = () =>
  get(url.GET_INVENTORYFAULTY_SMARTCARD);
export const updateFaultySmartcardSendsc = (faultypairing) =>
  put(url.UPDATE_FAULTYSMARTCARD_SENDSC, faultypairing);
export const updateFaultySmartcardBlacklist = (faultypairing) =>
  put(url.UPDATE_FAULTYSMARTCARD_BLACKLIST, faultypairing);
export const getInventoryFaultyStb = () => get(url.GET_INVENTORYFAULTY_STB);
export const updateFaultyStbSendstb = (faultystb) =>
  put(url.UPDATE_FAULTYSTB_SENDSTB, faultystb);
export const updateFaultyStbBlacklist = (faultystb) =>
  put(url.UPDATE_FAULTYSTB_BLACKLIST, faultystb);
export const getInventoryFaultyPairing = async (currentPage, perPage = 20) => {
  return await getCompleteResponse(url.getFaultyPairingUrl(currentPage, 20));
};
export const updateFaultyPairingSendpair = (faultypairing) =>
  put(url.UPDATE_FAULTYPAIRING_SENDPAIR, faultypairing);
export const updateFaultyPairingBlacklist = (faultypairing) =>
  put(url.UPDATE_FAULTYPAIRING_BLACKLIST, faultypairing);

export const getInventoryBlacklistedSmartcard = () =>
  get(url.GET_INVENTORYBLACKLISTED_SMARTCARD);
export const getInventoryBlacklistedStb = () =>
  get(url.GET_INVENTORYBLACKLISTED_STB);
// export const getInventoryBlacklistedPairing = () =>
//   get(url.GET_INVENTORYBLACKLISTED_PAIRING);
export const getInventoryBlacklistedPairing = async (
  currentPage,
  perPage = 20
) => {
  return await getCompleteResponse(
    url.getBlacklistedPairingUrl(currentPage, perPage)
  );
};

export const getInventoryAllottedSmartcard = () =>
  get(url.GET_INVENTORYALLOTTED_SMARTCARD);
export const getInventoryAllottedUsertype = () =>
  get(url.GET_INVENTORYALLOTTED_USERTYPE);
export const getInventoryAllottedSmartcardlist = () =>
  get(url.GET_INVENTORYALLOTTED_SMARTCARDLIST);
export const getInventoryAllottedOperatorlist = () =>
  get(url.GET_INVENTORYALLOTTED_OPERATORLIST);
export const allotSmartcard = (allottedsmartcard) =>
  post(url.ALLOT_SMARTCARD, allottedsmartcard);
export const deallotSmartcard = (allottedsmartcard) =>
  put(url.DEALLOT_SMARTCARD, allottedsmartcard);
export const getInventoryAllottedDistributor = (brand_id) =>
  get(url.GET_INVENTORYALLOTTED_DISTRIBUTOR(brand_id));
export const getInventoryAllottedLco = (brand_id, distributor_id) =>
  get(url.GET_INVENTORYALLOTTED_LCO(brand_id, distributor_id));

export const getInventoryAllottedStb = () => get(url.GET_INVENTORYALLOTTED_STB);
export const getInventoryAllottedStblist = () =>
  get(url.GET_INVENTORYALLOTTED_STBLIST);
export const allotStb = (allottedstb) => post(url.ALLOT_STB, allottedstb);
export const deallotStb = (allottedstb) => put(url.DEALLOT_STB, allottedstb);
export const getInventoryAllottedPairing = async (
  currentPage,
  perPage = 20
) => {
  return await getCompleteResponse(
    url.getAllottedPairingUrl(currentPage, perPage)
  );
};
export const getInventoryAllottedPairinglist = () =>
  get(url.GET_INVENTORYALLOTTED_PAIRINGLIST);
export const allotPairing = (allottedpairing) =>
  post(url.ALLOT_PAIRING, allottedpairing);
export const deallotPairing = (allottedpairing) =>
  put(url.DEALLOT_PAIRING, allottedpairing);
export const getInventoryTrack = async (currentPage, perPage = 20) => {
  return await getCompleteResponse(
    url.getInventoryTrackUrl(currentPage, perPage)
  );
};

export const getInventoryAllottedMaterialstatus = () =>
  get(url.GET_INVENTORYALLOTTED_MATERIALSTATUS);
export const getInventoryAllottedPairingstatus = () =>
  get(url.GET_INVENTORYALLOTTED_PAIRINGSTATUS);
export const getInventoryAllottedInventoryStateById = (id) =>
  get(url.GET_INVENTORYALLOTTED_INVENTORYSTATEBYID(id));

export const getInventoryTrackAction = () => get(url.GET_INVENTORYTRACK_ACTION);
export const getInventoryStockScCastype = () =>
  get(url.GET_INVENTORYSTOCK_SC_CASTYPE);
export const getInventoryStockScStatetype = () =>
  get(url.GET_INVENTORYSTOCK_SC_STATETYPE);
export const getInventoryStockScInventorystate = () =>
  get(url.GET_INVENTORYSTOCK_SC_INVENTORYSTATE);
export const getInventoryStockScWarehouse = () =>
  get(url.GET_INVENTORYSTOCK_SC_WAREHOUSE);
export const getInventoryStockScBrand1 = () =>
  get(url.GET_INVENTORYSTOCK_SC_BRAND1);
export const getInventoryStockScBrand2 = () =>
  get(url.GET_INVENTORYSTOCK_SC_BRAND2);
export const getPairingSmartcardList = () => get(url.GET_PAIRING_SMARTCARDLIST);
export const getPairingStbList = () => get(url.GET_PAIRING_STBLIST);
export const getStockActionInventorystate = () =>
  get(url.GET_STOCKACTION_INVENTORYSTATE);

export const addNewUser = (user) => post(url.ADD_NEW_USER, user);

// update user
export const updateUser = (user, id) => put(url.UPDATE_USER(id), user);
export const updateUserSettings = (user) => put(url.UPDATE_USER_SETTINGS, user);

// delete user
export const deleteUser = (user) => del(url.DELETE_USER, { headers: { user } });

// add jobs
export const addNewJobList = (job) => post(url.ADD_NEW_JOB_LIST, job);

// update jobs
export const updateJobList = (job) => put(url.UPDATE_JOB_LIST, job);

// delete jobs
export const deleteJobList = (job) =>
  del(url.DELETE_JOB_LIST, { headers: { job } });

// Delete Apply Jobs
export const deleteApplyJob = (data) =>
  del(url.DELETE_APPLY_JOB, { headers: { data } });

/** PROJECT */
// add user
export const addNewProject = (project) => post(url.ADD_NEW_PROJECT, project);

// update user
export const updateProject = (project) => put(url.UPDATE_PROJECT, project);

// delete user
export const deleteProject = (project) =>
  del(url.DELETE_PROJECT, { headers: { project } });

export const getUserProfile = () => get(url.GET_USER_PROFILE);

// get maillist
export const getMailsLists = (filter) =>
  post(url.GET_MAILS_LIST, {
    params: filter,
  });

//update mail
export const updateMail = (mail) => put(url.UPDATE_MAIL, mail);

// get folderlist
export const selectFolders = () => get(url.SELECT_FOLDER);

// post messages
export const addMessage = (message) => post(url.ADD_MESSAGE, message);
// delete message
export const deleteMessage = (data) =>
  del(url.DELETE_MESSAGE, { headers: { data } });

// get dashboard charts data
export const getWeeklyData = () => get(url.GET_WEEKLY_DATA);
export const getYearlyData = () => get(url.GET_YEARLY_DATA);
export const getMonthlyData = () => get(url.GET_MONTHLY_DATA);

export const walletBalanceData = (month) =>
  get(`${url.GET_WALLET_DATA}/${month}`, { params: { month } });

export const getStatisticData = (duration) =>
  get(`${url.GET_STATISTICS_DATA}/${duration}`, { params: { duration } });

export const visitorData = (duration) =>
  get(`${url.GET_VISITOR_DATA}/${duration}`, { params: { duration } });

export const topSellingData = (month) =>
  get(`${url.TOP_SELLING_DATA}/${month}`, { params: { month } });

export const getEarningChartsData = (month) =>
  get(`${url.GET_EARNING_DATA}/${month}`, { params: { month } });

const getProductComents = () => get(url.GET_PRODUCT_COMMENTS);

const onLikeComment = (commentId, productId) => {
  return post(`${url.ON_LIKNE_COMMENT}/${productId}/${commentId}`, {
    params: { commentId, productId },
  });
};
const onLikeReply = (commentId, productId, replyId) => {
  return post(`${url.ON_LIKNE_COMMENT}/${productId}/${commentId}/${replyId}`, {
    params: { commentId, productId, replyId },
  });
};

const onAddReply = (commentId, productId, replyText) => {
  return post(`${url.ON_ADD_REPLY}/${productId}/${commentId}`, {
    params: { commentId, productId, replyText },
  });
};

const onAddComment = (productId, commentText) => {
  return post(`${url.ON_ADD_COMMENT}/${productId}`, {
    params: { productId, commentText },
  });
};

export {
  getLoggedInUser,
  isUserAuthenticated,
  postFakeRegister,
  postFakeLogin,
  postFakeProfile,
  postFakeForgetPwd,
  postJwtRegister,
  postJwtLogin,
  postJwtForgetPwd,
  postJwtProfile,
  getProductComents,
  onLikeComment,
  onLikeReply,
  onAddReply,
  onAddComment,
};
