//REGISTER
export const POST_FAKE_REGISTER = "/post-fake-register";

//LOGIN
export const POST_FAKE_LOGIN = "/post-fake-login";
export const POST_JWT_LOGIN = "/user/login?vr=web1.0";
export const POST_FAKE_PASSWORD_FORGET = "/fake-forget-pwd";
export const POST_FAKE_JWT_PASSWORD_FORGET = "/jwt-forget-pwd";

export const GET_ADMINDETAILS = "/admindetails";
//PROFILE
export const POST_EDIT_JWT_PROFILE = "/post-jwt-profile";
export const POST_EDIT_PROFILE = "/post-fake-profile";

export const GET_CUSTOMERUSERS =
  "/user?expand=setting,group_lbl,access_level,role_lbl,status_lbl,type_lbl,operator_lbl,operator,created_by_lbl,parent_lbl&filter[role]=4&page=1&per-page=50&vr=web1.0";

export const GET_GROUPPOLICY =
  "/menu-access-right?filter[type]=2&expand=user_count,user_type_lbl&page=1&per-page=50&vr=web1.0";
export const ADD_NEW_GROUPPOLICY = "/add/grouppolicy";
export const GET_DESIGNATION =
  "/schedule-announcement?expand=start_time_lbl,end_time_lbl,announcement_templ_lbl&filter[current_activemsg]=1&vr=web1.0";
export const ADD_NEW_DESIGNATION = "/add/designation";

export const GET_NOTIFICATIONTEMPLATE =
  "/announcement-template?expand=status_lbl,created_by_lbl,created_at_lbl,msg_type_lbl&page=1&per-page=50&vr=web1.0";
export const ADD_NEW_NOTIFICATIONTEMPLATE = "/add/notification";

export const GET_REGIONALOFFICE = "/regionaloffice";
export const ADD_NEW_REGIONALOFFICE = "/add/regionaloffice";
export const UPDATE_REGIONALOFFICE = "/update/regionaloffice";

export const GET_SCHEDULECUSTOMERNOTIFICATION =
  "/schedule-notification?expand=type_lbl,osd_template_id_lbl,bmail_template_id_lbl,sms_template_id_lbl,osd_configuration_id_lbl,status_lbl,created_by_lbl&page=1&per-page=50&vr=web1.0";
export const ADD_NEW_SCHEDULECUSTOMERNOTIFICATION =
  "/add/schedulecustomernotification";

export const GET_SCHEDULEDNOTIFICATION = "/schedulednotificationlist";
export const GET_STATEUSERS = "/stateuserlist";

export const GET_DISTRICT = "/districtlist";
export const ADD_DISTRICT = "/add/district";

export const GET_CITY = "/citylist";
export const ADD_CITY = "/add/city";

export const GET_LOCATION =
  "/location?expand=created_by_lbl,operator_lbl,operator_code,status_lbl&vr=web1.0";
export const ADD_LOCATION = "/location?vr=web1.0";

export const GET_SUBLOCATION =
  "/sublocation?expand=created_by_lbl,operator_lbl,location_lbl,status_lbl,location_code,operator_code&page=1&per-page=50&vr=web1.0";
export const ADD_SUBLOCATION = "/sublocation?vr=web1.0";

export const GET_DISTRIBUTORS = "/distributorlist";
export const ADD_NEW_DISTRIBUTOR = "/add/distributors";
export const UPDATE_DISTRIBUTOR = "/update/distributors";

export const GET_LCO = "/lco";
export const ADD_NEW_LCO = "/add/lco";
export const UPDATE_LCO = "/update/lco";

export const GET_APPADBANNER = "/appadbanner";
export const ADD_APPADBANNER = "/add/appadbanner";

export const GET_USERHIERARCHY = "/userhierarchy";
export const ADD_USERHIERARCHY = "/add/userhierarchy";

export const GET_BROADCASTER =
  "/broadcaster?expand=created_by_lbl,status_lbl&page=1&per-page=50&vr=web1.0";
export const ADD_NEW_BROADCASTER = "/add/broadcasterlist";

export const GET_GENRELIST =
  "/genre?expand=created_by_lbl,status_lbl&page=1&per-page=50&vr=web1.0";
export const ADD_NEW_GENRELIST = "/add/genrelist";

export const GET_LANGUAGELIST = "/languagelist";
export const ADD_NEW_LANGUAGELIST = "/add/languagelist";

export const GET_CHANNELLIST = "/channellist";
export const ADD_NEW_CHANNELLIST = "/add/channellist";

export const GET_BROADCASTERBOUQUETLIST = "/broadcasterbouquet";
export const ADD_NEW_BROADCASTERBOUQUETLIST = "/add/broadcasterbouquet";

export const GET_PACKAGELIST = "/packagelist";
export const ADD_NEW_PACKAGELIST = "/add/packagelist";

export const GET_OSDCONFIGURATIONLIST = "/osdconfigurationlist";
export const ADD_NEW_OSDCONFIGURATIONLIST = "/add/osdconfigurationlist";

export const GET_LOCALCHANNELNUMBER = "/localchannelnumberlist";

export const GET_DOCUMENTUPLOADPOLICY = "/documentuploadpolicylist";
export const ADD_NEW_DOCUMENTUPLOADPOLICY = "/add/documentuploadpolicylist";

export const GET_OSDTEMPLATE = "/osdtemplatelist";
export const ADD_NEW_OSDTEMPLATE = "/add/osdtemplatelist";

export const GET_NCF =
  "/ncf-rates?expand=status_lbl,created_by_lbl,type_lbl&page=1&per-page=50&vr=web1.0";
export const ADD_NCF = "/add/ncf";

export const GET_COMPANYLIST = "/companylist";

export const GET_BRANDLIST = "/brandlist";
export const ADD_BRANDLIST = "/add/brandlist";

export const GET_WAREHOUSELIST = "/warehouselist";
export const ADD_WAREHOUSELIST = "/add/warehouselist";

export const GET_INVENTORYSTATELIST = "/inventorystatelist";
export const ADD_INVENTORYSTATELIST = "/add/inventorystatelist";

export const GET_SMSMESSAGETEMPLIST = "/smsmsgtemplatelist";

export const GET_BOUQUET =
  "/bouque?expand=setting,created_by_lbl,lco_rate,type_lbl,status_lbl,boxtype_lbl,rate,category_lbl,is_exclusive_lbl,is_promotional_lbl,additional_rates,is_online_app_lbl&page=1&per-page=50&vr=web1.0";
export const ADD_BOUQUET = "/add/bouquet";

export const GET_CONNECTIONSCHEME = "/connectionscheme";
export const ADD_CONNECTIONSCHEME = "/add/connectionscheme";

export const GET_COMPLAINTCATEGORY =
  "/schedule-announcement?expand=start_time_lbl,end_time_lbl,announcement_templ_lbl&filter[current_activemsg]=1&vr=web1.0";
export const ADD_NEW_COMPLAINTCATEGORY = "/add/complaintcategory";

export const GET_COMPLAINTSUBCATEGORY = "/complaintsubcategory";
export const ADD_NEW_COMPLAINTSUBCATEGORY = "/add/complaintsubcategory";

export const GET_CONFIGURATIONUPLOADLOGS = "/configurationuploadlogs";
export const GET_TAX = "/tax";
export const ADD_NEW_TAXLIST = "/add/tax";

export const GET_REASON = "/reason";
export const ADD_NEW_REASON = "/add/reason";
export const GET_BANK = "/bank";
export const ADD_NEW_BANK = "/add/bank";

export const GET_PROMOVOUCHER = "/promovoucher";
export const ADD_NEW_PROMOVOUCHER = "/add/promovoucher";

export const GET_USERS =
  "/user?expand=setting,group_lbl,access_level,role_lbl,status_lbl,type_lbl,operator_lbl,created_by_lbl,parent_lbl&notfilter[role]=4&page=1&per-page=50&vr=web1.0";
export const GET_USER_PROFILE = "/user";
export const ADD_NEW_USER = "/add/user";
export const UPDATE_USER = "/update/user";
export const DELETE_USER = "/delete/user";
