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
export const ADD_NEW_DESIGNATION = "/user-designation?vr=web1.0";

export const GET_NOTIFICATIONTEMPLATE =
  "/announcement-template?expand=status_lbl,created_by_lbl,created_at_lbl,msg_type_lbl&page=1&per-page=50&vr=web1.0";
export const ADD_NEW_NOTIFICATIONTEMPLATE = "/announcement-template?vr=web1.0";

export const GET_REGIONALOFFICE =
  "/operator?expand=reg_phase_lbl,created_by_lbl,status_lbl,mso_lbl,state_lbl,district_lbl,city_lbl,username&filter[type]=1&page=1&per-page=50&vr=web1.0";
export const ADD_NEW_REGIONALOFFICE = "/add/regionaloffice";
export const UPDATE_REGIONALOFFICE = "/update/regionaloffice";

export const GET_SCHEDULECUSTOMERNOTIFICATION =
  "/schedule-notification?expand=type_lbl,osd_template_id_lbl,bmail_template_id_lbl,sms_template_id_lbl,osd_configuration_id_lbl,status_lbl,created_by_lbl&page=1&per-page=50&vr=web1.0";
export const ADD_NEW_SCHEDULECUSTOMERNOTIFICATION =
  "/add/schedulecustomernotification";

export const GET_SCHEDULEDNOTIFICATION = "/schedulednotificationlist";
export const GET_STATEUSERS =
  "/administrative-division?filter[type]=1&expand=created_by_lbl,status_lbl&page=1&per-page=50&vr=web1.0";

export const GET_DISTRICT =
  "/administrative-division?filter[type]=2&expand=created_by_lbl,operator_lbl,status_lbl,state_lbl,state_code_lbl&vr=web1.0";
export const ADD_DISTRICT = "/administrative-division?vr=web1.0";
export const GET_DISTRICT_STATUS = "/list/status?fields=id,name&vr=web1.0";
export const GET_DISTRICT_STATELIST =
  "/administrative-division/list?fields=id,name&expand=state_id_lbl&filter[type]=1&per-page=100&vr=web1.0";
export const UPDATE_DISTRICT = "/administrative-division/1422?vr=web1.0";
export const updateDistrictById = (id) =>
  `/administrative-division/${id}?vr=web1.0`;
export const GET_CITY =
  "/administrative-division?filter[type]=3&expand=created_by_lbl,operator_lbl,status_lbl,state_lbl,state_code_lbl,district_lbl,district_code_lbl&vr=web1.0";
export const ADD_CITY = "/administrative-division?vr=web1.0";
export const GET_DISTRICT_BYSTATEID =
  "/administrative-division?&filter[state_id]=1&filter[type]=2&per-page=100&vr=web1.0";

export const GET_LOCATION =
  "/location?expand=created_by_lbl,operator_lbl,operator_code,status_lbl&vr=web1.0";
export const ADD_LOCATION = "/location?vr=web1.0";

export const GET_SUBLOCATION =
  "/sublocation?expand=created_by_lbl,operator_lbl,location_lbl,status_lbl,location_code,operator_code&page=1&per-page=50&vr=web1.0";
export const ADD_SUBLOCATION = "/sublocation?vr=web1.0";

export const GET_DISTRIBUTORS =
  "/operator?expand=reg_phase_lbl,created_by_lbl,status_lbl,branch_lbl,state_lbl,district_lbl,city_lbl,username&filter[type]=2&page=1&per-page=50&vr=web1.0";
export const ADD_NEW_DISTRIBUTOR = "/add/distributors";
export const UPDATE_DISTRIBUTOR = "/update/distributors";

export const GET_LCO =
  "/operator?expand=credit_limit_lbl,setting,balance,balance_h,reg_phase_lbl,created_by_lbl,distributor_lbl,status_lbl,branch_lbl,branch_code_lbl,state_lbl,district_lbl,city_lbl,username&filter[type]=3&page=1&per-page=50&vr=web1.0";
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

export const GET_LANGUAGELIST =
  "/language?expand=created_by_lbl,status_lbl&page=1&per-page=50&vr=web1.0";
export const ADD_NEW_LANGUAGELIST = "/add/languagelist";

export const GET_CHANNELLIST =
  "/channel?expand=created_by_lbl,broadcaster_lbl,genre_lbl,language_lbl,channel_type_lbl,isAlacarte_lbl,status_lbl,isFta_lbl,isNCF_lbl&sort=name&page=1&per-page=50&vr=web1.0";
export const ADD_NEW_CHANNELLIST = "/add/channellist";

export const GET_BROADCASTERBOUQUETLIST =
  "/broadcaster-bouque?expand=created_by_lbl,status_lbl,broadcaster_lbl,channel_type_lbl,isFta_lbl,isNCF_lbl,channels&sort=name&page=1&per-page=50&vr=web1.0";
export const ADD_NEW_BROADCASTERBOUQUETLIST = "/add/broadcasterbouquet";

export const GET_PACKAGELIST =
  "/package?expand=created_by_lbl,package_type_lbl,isFta_lbl,status_lbl,channels,brdBouques&sort=name&page=1&per-page=50&vr=web1.0";
export const ADD_NEW_PACKAGELIST = "/add/packagelist";

export const GET_OSDCONFIGURATIONLIST =
  "/mtc?expand=created_by_lbl,status_lbl,is_reserved_lbl,type_lbl&page=1&per-page=50&vr=web1.0";
export const ADD_NEW_OSDCONFIGURATIONLIST = "/add/osdconfigurationlist";

export const GET_LOCALCHANNELNUMBER = "/localchannelnumberlist";

export const GET_DOCUMENTUPLOADPOLICY = "/documentuploadpolicylist";
export const ADD_NEW_DOCUMENTUPLOADPOLICY = "/add/documentuploadpolicylist";

export const GET_OSDTEMPLATE =
  "/message-template?expand=created_by_lbl,status_lbl,template_for_lbl,operator_count&page=1&per-page=50&vr=web1.0";
export const ADD_NEW_OSDTEMPLATE = "/add/osdtemplatelist";

export const GET_NCF =
  "/ncf-rates?expand=status_lbl,created_by_lbl,type_lbl&page=1&per-page=50&vr=web1.0";
export const ADD_NCF = "/add/ncf";

export const GET_COMPANYLIST = "/companylist";

export const GET_BRANDLIST =
  "/brand?expand=box_type_lbl,brand_type_lbl,char_allowed_lbl,cas_lbl,created_by_lbl,status_lbl&page=1&per-page=50&vr=web1.0";
export const ADD_BRANDLIST = "/add/brandlist";

export const GET_WAREHOUSELIST =
  "/warehouse?expand=city_lbl,created_by_lbl,status_lbl,operator_lbl,operator_code_lbl&page=1&per-page=50&vr=web1.0";
export const ADD_WAREHOUSELIST = "/add/warehouselist";

export const GET_INVENTORYSTATELIST = "/inventorystatelist";
export const ADD_INVENTORYSTATELIST = "/add/inventorystatelist";

export const GET_SMSMESSAGETEMPLIST =
  "/sms-message-template?expand=created_by_lbl,status_lbl,sender_id_lbl&page=1&per-page=50&vr=web1.0";
export const ADD_NEW_SMSMESSAGETEMPLIST = "/add/SMSMessageTemplateList";

export const GET_BOUQUET =
  "/bouque?expand=setting,created_by_lbl,lco_rate,type_lbl,status_lbl,boxtype_lbl,rate,category_lbl,is_exclusive_lbl,is_promotional_lbl,additional_rates,is_online_app_lbl&page=1&per-page=50&vr=web1.0";
export const ADD_BOUQUET = "/add/bouquet";

export const GET_CONNECTIONSCHEME = "/connectionscheme";
export const ADD_CONNECTIONSCHEME = "/add/connectionscheme";

export const GET_COMPLAINTCATEGORY =
  "/complaint-category?expand=created_by_lbl,status_lbl,showonweb_lbl&page=1&per-page=50&vr=web1.0";
export const ADD_NEW_COMPLAINTCATEGORY = "/add/complaintcategory";

export const GET_COMPLAINTSUBCATEGORY = "/complaintsubcategory";
export const ADD_NEW_COMPLAINTSUBCATEGORY = "/add/complaintsubcategory";

export const GET_CONFIGURATIONUPLOADLOGS =
  "/upload-q?expand=uploaded_file,created_by_lbl,status_lbl&notfilter[status]=0&filter[section]=configuration&page=1&per-page=50&vr=web1.0";
export const GET_TAX =
  "/tax?expand=valuetype_lbl,parent_lbl,created_by_lbl,status_lbl&page=1&per-page=50&vr=web1.0";
export const ADD_NEW_TAXLIST = "/add/tax";

export const GET_REASON =
  "/reason?expand=created_by_lbl,status_lbl,type_display_lbl,created_at_lbl&page=1&per-page=50&vr=web1.0";
export const ADD_NEW_REASON = "/add/reason";
export const GET_BANK = "/bank";
export const ADD_NEW_BANK = "/add/bank";

export const GET_PROMOVOUCHER = "/promovoucher";
export const ADD_NEW_PROMOVOUCHER = "/add/promovoucher";

export const GET_USERS =
  "/user?expand=setting,group_lbl,access_level,role_lbl,status_lbl,type_lbl,operator_lbl,created_by_lbl,parent_lbl&notfilter[role]=4&page=1&per-page=50&vr=web1.0";
export const GET_USER_PROFILE = "/user";
export const ADD_NEW_USER = "/user?vr=web1.0";
export const UPDATE_USER = "/user/311736?vr=web1.0";
export const DELETE_USER = "/delete/user";
export const GET_USER_TYPE = "/list/usertype?fields=id,name&vr=web1.0";
export const GET_USER_STATUS = "/list/userstatus?fields=id,name&vr=web1.0";
export const GET_USER_ROLE = "/list/userrole?fields=id,name&vr=web1.0";
export const GET_USER_DESIGNATION =
  "/user-designation/list?field=id,name&vr=web1.0";
export const GET_USER_MSO_POLICY =
  "/menu-access-right/list?expand=user_type_lbl&fields=_id,user_id,user_type,role&filter[type][]=1&filter[type][]=2&filter[user_type]=0&filter[role_id]=2&vr=web1.0";

export const GET_USER_REGIONALOFFICE =
  "/operator/list?fields=id,name,type,mso_id,branch_id,distributor_id&per-page=100&filter[mso_id]=1&filter[type]=1&vr=web1.0";
export const GET_USER_MSO_DETAILS =
  "/operator/list?fields=id,name,type,mso_id,branch_id,distributor_id&per-page=100&filter[type]=0&vr=web1.0";
export const GET_USER_DISTRIBUTOR =
  "/operator/list?fields=id,name,type,mso_id,branch_id,distributor_id&per-page=100&filter[mso_id]=1&filter[branch_id]=9&filter[type]=2&vr=web1.0";
export const GET_USER_LCO =
  "/operator/list?fields=id,name,type,mso_id,branch_id,distributor_id&per-page=100&filter[mso_id]=1&filter[branch_id]=9&filter[distributor_id]=32&filter[type]=3&vr=web1.0";
export const GET_MSO_ADMIN_POLICY =
  "/menu-access-right/list?expand=user_type_lbl&fields=_id,user_id,user_type,role&filter[type][]=1&filter[type][]=2&filter[user_type]=0&filter[role_id]=1&vr=web1.0";
export const GET_MSO_STAFF_POLICY =
  "/menu-access-right/list?expand=user_type_lbl&fields=_id,user_id,user_type,role&filter[type][]=1&filter[type][]=2&filter[user_type]=0&filter[role_id]=2&vr=web1.0";
export const GET_MSO_USER_POLICY =
  "/menu-access-right/list?expand=user_type_lbl&fields=_id,user_id,user_type,role&filter[type][]=1&filter[type][]=2&filter[user_type]=0&filter[role_id]=3&vr=web1.0";
export const GET_RO_ADMIN_POLICY =
  "/menu-access-right/list?expand=user_type_lbl&fields=_id,user_id,user_type,role&filter[type][]=1&filter[type][]=2&filter[user_type]=1&filter[role_id]=1&vr=web1.0";
export const GET_RO_STAFF_POLICY =
  "/menu-access-right/list?expand=user_type_lbl&fields=_id,user_id,user_type,role&filter[type][]=1&filter[type][]=2&filter[user_type]=1&filter[role_id]=2&vr=web1.0";
export const GET_RO_USER_POLICY =
  "/menu-access-right/list?expand=user_type_lbl&fields=_id,user_id,user_type,role&filter[type][]=1&filter[type][]=2&filter[user_type]=1&filter[role_id]=3&vr=web1.0";
export const GET_DISTRIBUTOR_ADMIN_POLICY =
  "/menu-access-right/list?expand=user_type_lbl&fields=_id,user_id,user_type,role&filter[type][]=1&filter[type][]=2&filter[user_type]=2&filter[role_id]=1&vr=web1.0";
export const GET_DISTRIBUTOR_STAFF_POLICY =
  "/menu-access-right/list?expand=user_type_lbl&fields=_id,user_id,user_type,role&filter[type][]=1&filter[type][]=2&filter[user_type]=2&filter[role_id]=2&vr=web1.0";
export const GET_DISTRIBUTOR_USER_POLICY =
  "/menu-access-right/list?expand=user_type_lbl&fields=_id,user_id,user_type,role&filter[type][]=1&filter[type][]=2&filter[user_type]=2&filter[role_id]=3&vr=web1.0";
export const GET_LCO_ADMIN_POLICY =
  "/menu-access-right/list?expand=user_type_lbl&fields=_id,user_id,user_type,role&filter[type][]=1&filter[type][]=2&filter[user_type]=3&filter[role_id]=1&vr=web1.0";
export const GET_LCO_STAFF_POLICY =
  "/menu-access-right/list?expand=user_type_lbl&fields=_id,user_id,user_type,role&filter[type][]=1&filter[type][]=2&filter[user_type]=3&filter[role_id]=2&vr=web1.0";
export const GET_LCO_USER_POLICY =
  "/menu-access-right/list?expand=user_type_lbl&fields=_id,user_id,user_type,role&filter[type][]=1&filter[type][]=2&filter[user_type]=3&filter[role_id]=3&vr=web1.0";
