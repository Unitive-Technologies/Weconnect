import axios from "axios";
import { del, get, post, put } from "./api_helper";
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
export const getUsers = () => get(url.GET_USERS);

export const getCustomerUsers = () => get(url.GET_CUSTOMERUSERS);

export const getGroupPolicy = () => get(url.GET_GROUPPOLICY);
export const addNewGroupPolicy = (groupPolicy) =>
  post(url.ADD_NEW_GROUPPOLICY, groupPolicy);

export const getDesignation = () => get(url.GET_DESIGNATION);
export const addNewDesignation = (designation) =>
  post(url.ADD_NEW_DESIGNATION, designation);

export const getNotificationTemplate = () => get(url.GET_NOTIFICATIONTEMPLATE);
export const addNewNotificationTemplate = (notificationTemplate) =>
  post(url.ADD_NEW_NOTIFICATIONTEMPLATE, notificationTemplate);

export const getScheduleCustomerNotification = () =>
  get(url.GET_SCHEDULECUSTOMERNOTIFICATION);
export const addNewScheduleCustomerNotification = (
  schedulecustomernotification
) =>
  post(url.ADD_NEW_SCHEDULECUSTOMERNOTIFICATION, schedulecustomernotification);

export const getScheduledNotification = () =>
  get(url.GET_SCHEDULEDNOTIFICATION);
export const getStateUsers = () => get(url.GET_STATEUSERS);

export const getDistrict = () => get(url.GET_DISTRICT);
export const addDistrict = (district) => post(url.ADD_DISTRICT, district);

export const getCity = () => get(url.GET_CITY);
export const addCity = (city) => post(url.ADD_CITY, city);

export const getLocation = () => get(url.GET_LOCATION);
export const addLocation = (location) => post(url.ADD_LOCATION, location);

export const getSublocation = () => get(url.GET_SUBLOCATION);
export const addSublocation = (sublocation) =>
  post(url.ADD_SUBLOCATION, sublocation);

export const getRegionalOffice = () => get(url.GET_REGIONALOFFICE);
export const addNewRegionalOffice = (regionaloffice) =>
  post(url.ADD_NEW_REGIONALOFFICE, regionaloffice);
export const updateRegionalOffice = (regionaloffice) =>
  put(url.UPDATE_REGIONALOFFICE, regionaloffice);

export const getBroadCasters = () => get(url.GET_BROADCASTER);
export const addNewBroadCaster = (broadcast) =>
  post(url.ADD_NEW_BROADCASTER, broadcast);

export const getGenreList = () => get(url.GET_GENRELIST);
export const addNewGenreList = (genre) => post(url.ADD_NEW_GENRELIST, genre);

export const getLanguageList = () => get(url.GET_LANGUAGELIST);
export const addNewLanguageList = (langlist) =>
  post(url.ADD_NEW_LANGUAGELIST, langlist);

export const getChannelList = () => get(url.GET_CHANNELLIST);
export const addNewChannelList = (channel) =>
  post(url.ADD_NEW_CHANNELLIST, channel);

export const getBroadcasterBouquetList = () =>
  get(url.GET_BROADCASTERBOUQUETLIST);
export const addNewBroadcasterBouquetList = (broadcastbouquet) =>
  post(url.ADD_NEW_BROADCASTERBOUQUETLIST, broadcastbouquet);

export const getPackageList = () => get(url.GET_PACKAGELIST);
export const addNewPackageList = (packlist) =>
  post(url.ADD_NEW_PACKAGELIST, packlist);

export const getOSDConfiguration = () => get(url.GET_OSDCONFIGURATIONLIST);
export const addNewOSDConfiguration = (osdconfig) =>
  post(url.ADD_NEW_OSDCONFIGURATIONLIST, osdconfig);

export const getOSDTemplate = () => get(url.GET_OSDTEMPLATE);
export const addNewOSDTemplate = (osdtem) =>
  post(url.ADD_NEW_OSDTEMPLATE, osdtem);

export const getLocalChannelNumber = () => get(url.GET_LOCALCHANNELNUMBER);
export const getDocumentUploadPolicy = () => get(url.GET_DOCUMENTUPLOADPOLICY);
export const addNewDocumentUploadPolicy = (documentupload) =>
  post(url.ADD_NEW_DOCUMENTUPLOADPOLICY, documentupload);

export const getDistributors = () => get(url.GET_DISTRIBUTORS);
export const addNewDistributor = (distributors) =>
  post(url.ADD_NEW_DISTRIBUTOR, distributors);
export const updateDistributor = (distributors) =>
  put(url.UPDATE_DISTRIBUTOR, distributors);

export const getLco = () => get(url.GET_LCO);
export const addNewLco = (lco) => post(url.ADD_NEW_LCO, lco);
export const updateLco = (lco) => put(url.UPDATE_LCO, lco);

export const getAppAdBanner = () => get(url.GET_APPADBANNER);
export const addAppAdBanner = (appadbanner) =>
  post(url.ADD_APPADBANNER, appadbanner);

export const getUserHierarchy = () => get(url.GET_USERHIERARCHY);
export const addUserHierarchy = (userHierarchy) =>
  post(url.ADD_USERHIERARCHY, userHierarchy);

export const getNcf = () => get(url.GET_NCF);
export const addNcf = (ncf) => post(url.ADD_NCF, ncf);

export const getBouquet = () => get(url.GET_BOUQUET);
export const addBouquet = (bouquet) => post(url.ADD_BOUQUET, bouquet);

export const getConnectionScheme = () => get(url.GET_CONNECTIONSCHEME);
export const addConnectionScheme = (connectionscheme) =>
  post(url.ADD_CONNECTIONSCHEME, connectionscheme);

export const getComplaintCategory = () => get(url.GET_COMPLAINTCATEGORY);
export const addNewComplaintCategory = (complaint) =>
  post(url.ADD_NEW_COMPLAINTCATEGORY, complaint);

export const getComplaintSubCategory = () => get(url.GET_COMPLAINTSUBCATEGORY);
export const addNewComplaintSubCategory = (complaintsubcate) =>
  post(url.ADD_NEW_COMPLAINTCATEGORY, complaintsubcate);
export const getConfigurationUploadLogs = () =>
  get(url.GET_CONFIGURATIONUPLOADLOGS);
export const getCompanyList = () => get(url.GET_COMPANYLIST);

export const getBrandList = () => get(url.GET_BRANDLIST);
export const addBrandList = (brandlist) => post(url.ADD_BRANDLIST, brandlist);

export const getWarehouseList = () => get(url.GET_WAREHOUSELIST);
export const addWareHouseList = (warehouselist) =>
  post(url.ADD_WAREHOUSELIST, warehouselist);

export const getInventoryStateList = () => get(url.GET_INVENTORYSTATELIST);
export const addInventoryStateList = (inventorystate) =>
  post(url.ADD_INVENTORYSTATELIST, inventorystate);

export const getTax = () => get(url.GET_TAX);
export const addNewTaxList = (taxes) => post(url.ADD_NEW_TAXLIST, taxes);

export const getReason = () => get(url.GET_REASON);
export const addNewReason = (reasons) => post(url.ADD_NEW_REASON, reasons);

export const getBank = () => get(url.GET_BANK);
export const addNewBank = (banks) => post(url.ADD_NEW_BANK, banks);
export const getPromoVoucher = () => get(url.GET_PROMOVOUCHER);
export const addNewPromoVoucher = (provoucher) =>
  post(url.ADD_NEW_PROMOVOUCHER, provoucher);
export const getSMSMessageTempList = () => get(url.GET_SMSMESSAGETEMPLIST);
// add user
export const addNewUser = (user) => post(url.ADD_NEW_USER, user);

// update user
export const updateUser = (user) => put(url.UPDATE_USER, user);

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
