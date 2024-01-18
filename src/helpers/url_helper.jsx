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

// export const GET_CUSTOMERUSERS =
//   "/user?expand=setting,group_lbl,access_level,role_lbl,status_lbl,type_lbl,operator_lbl,operator,created_by_lbl,parent_lbl&filter[role]=4&page=1&per-page=500&vr=web1.0";
export const UPDATE_CUSTOMERUSER = (id) => `/user/${id}?vr=web1.0`;

export const GET_CUSTOMERUSERS_SETTINGS =
  "/user?expand=role_lbl,status_lbl,type_lbl,operator_lbl,created_by_lbl,parent_lbl&notfilter[id]=2&filter[status]=0&filter[role]=4&page=1&per-page=500&vr=web1.0";
export const GET_GROUPPOLICY =
  "/menu-access-right?filter[type]=2&expand=user_count,user_type_lbl&page=1&per-page=50&vr=web1.0";
export const ADD_NEW_GROUPPOLICY = "/add/grouppolicy";
export const GET_DESIGNATION =
  "/user-designation?expand=created_by_lbl,status_lbl,parent_lbl,type_lbl&page=1&per-page=50&vr=web1.0";
export const GET_DESIGNATION_STATUS = "/list/status?fields=id,name&vr=web1.0";
export const GET_DESIGNATION_TYPE = "/user-designation/destype-list?vr=web1.0";
export const GET_DESIGNATION_PARENT =
  "/user-designation?field=id,name&vr=web1.0";
export const ADD_NEW_DESIGNATION = "/user-designation?vr=web1.0";
export const UPDATE_DESIGNATION = (id) => `user-designation/${id}?vr=web1.0`;

export const GET_NOTIFICATIONTEMPLATE =
  "/announcement-template?expand=status_lbl,created_by_lbl,created_at_lbl,msg_type_lbl&page=1&per-page=50&vr=web1.0";
export const GET_NOTIFICATIONTEMPLATE_TYPE =
  "/list/amsgType?fields=id,name&vr=web1.0";
export const GET_NOTIFICATIONTEMPLATE_STATUS =
  "/list/status?fields=id,name&vr=web1.0";
export const UPDATE_NOTIFICATIONTEMPLATE = (id) =>
  `announcement-template/${id}?vr=web1.0`;
export const GET_NOTIFICATIONTEMPLATE_ADDUSER =
  "/user/list?fields=id,name,username&expand=type_lbl,role_lbl&notfilter[role]=4&page=1&per-page=500&vr=web1.0";
export const ADD_NEW_NOTIFICATIONTEMPLATE = "/announcement-template?vr=web1.0";

export const getRegionalOfficesUrl = (currPage, perPage) => {
  console.log("current page in regional url - ", currPage, perPage);
  return `/operator?expand=reg_phase_lbl,created_by_lbl,status_lbl,mso_lbl,state_lbl,district_lbl,city_lbl,username&filter[type]=1&page=${currPage}&per-page=${perPage}&vr=web1.0`;
};

export const getDistributorUrl = (currPage, perPage) => {
  console.log("current page in distributor url - ", currPage, perPage);
  return `/operator?expand=reg_phase_lbl,created_by_lbl,status_lbl,branch_lbl,state_lbl,district_lbl,city_lbl,username&filter[type]=2&page=${currPage}&per-page=${perPage}&vr=web1.0`;
};

export const getUsersUrl = (currPage, perPage) => {
  console.log("current page in users url - ", currPage, perPage);
  return `/user?expand=setting,group_lbl,access_level,role_lbl,status_lbl,type_lbl,operator_lbl,created_by_lbl,parent_lbl&notfilter[role]=4&page=${currPage}&per-page=${perPage}&vr=web1.0`;
};

export const getCustomerUsersUrl = (currPage, perPage) => {
  console.log("current page in Customerusers url - ", currPage, perPage);
  return `/user?expand=setting,group_lbl,access_level,role_lbl,status_lbl,type_lbl,operator_lbl,operator,created_by_lbl,parent_lbl&filter[role]=4&page=${currPage}&per-page=${perPage}&vr=web1.0`;
};
export const GET_REGIONALOFFICE =
  "/operator?expand=reg_phase_lbl,created_by_lbl,status_lbl,mso_lbl,state_lbl,district_lbl,city_lbl,username&filter[type]=1&page=1&per-page=50&vr=web1.0";
export const ADD_NEW_REGIONALOFFICE = "/add/regionaloffice";
export const UPDATE_REGIONALOFFICE = "/update/regionaloffice";

export const GET_SCHEDULECUSTOMERNOTIFICATION =
  "/schedule-notification?expand=type_lbl,osd_template_id_lbl,bmail_template_id_lbl,sms_template_id_lbl,osd_configuration_id_lbl,status_lbl,created_by_lbl&page=1&per-page=50&vr=web1.0";
export const GET_SCHEDULECUSTOMERNOTIFICATION_TYPE =
  "/list/SchNotType?fields=id,name&vr=web1.0";
export const GET_SCHEDULECUSTOMERNOTIFICATION_STATUS =
  "/list/status?fields=id,name&vr=web1.0";
export const GET_SCHEDULECUSTOMERNOTIFICATION_SMS =
  "/list/smsTemplate?fields=id,name&vr=web1.0";
export const GET_SCHEDULECUSTOMERNOTIFICATION_BMAIL =
  "/mtc/list?fields=id,name,cas_code&vr=web1.0";
export const GET_SCHEDULECUSTOMERNOTIFICATION_OSD =
  "/message-template/list?fields=id,name&filter[template_for]=2&vr=web1.0";

export const ADD_NEW_SCHEDULECUSTOMERNOTIFICATION =
  "/schedule-notification?vr=web1.0";

export const GET_SCHEDULEDNOTIFICATION = "/schedulednotificationlist";
export const GET_STATEUSERS =
  "/administrative-division?filter[type]=1&expand=created_by_lbl,status_lbl&vr=web1.0";

export const GET_DISTRICT =
  "/administrative-division?filter[type]=2&expand=created_by_lbl,operator_lbl,status_lbl,state_lbl,state_code_lbl&vr=web1.0";
export const ADD_DISTRICT = "/administrative-division?vr=web1.0";
export const GET_ADMINISTRATIVEDIVISION_STATUS =
  "/list/status?fields=id,name&vr=web1.0";
export const GET_DISTRICT_STATELIST =
  "/administrative-division/list?fields=id,name&expand=state_id_lbl&filter[type]=1&per-page=100&vr=web1.0";
// export const UPDATE_DISTRICT = "/administrative-division/1422?vr=web1.0";
export const updateDistrictById = (id) =>
  `/administrative-division/${id}?vr=web1.0`;
export const GET_CITY =
  "/administrative-division?filter[type]=3&expand=created_by_lbl,operator_lbl,status_lbl,state_lbl,state_code_lbl,district_lbl,district_code_lbl&vr=web1.0";
export const ADD_CITY = "/administrative-division?vr=web1.0";
export const GET_DISTRICT_BYSTATEID = (id) =>
  `/administrative-division?&filter[state_id]=${id}&filter[type]=2&per-page=100&vr=web1.0`;
export const updateCityById = (id) =>
  `/administrative-division/${id}?vr=web1.0`;

export const GET_LOCATION =
  "/location?expand=created_by_lbl,operator_lbl,operator_code,status_lbl&vr=web1.0";
export const ADD_LOCATION = "/location?vr=web1.0";
export const updateLocationById = (id) => `/location/${id}?vr=web1.0`;
export const GET_LCO_ONLOCATION =
  "/operator/list?fields=id,name,code&expand=branch_lbl,distributor_lbl&filter[type]=3&per-page=100&vr=web1.0";
export const GET_SINGLE_LOCATION = (id) => `/location/${id}?vr=web1.0`;

export const GET_SUBLOCATION =
  "/sublocation?expand=created_by_lbl,operator_lbl,location_lbl,status_lbl,location_code,operator_code&vr=web1.0";
export const ADD_SUBLOCATION = "/sublocation?vr=web1.0";
export const updateSublocationById = (id) => `/sublocation/${id}?vr=web1.0`;
export const GET_LOCATION_ONSUBLOCATION =
  "/location/list?fields=id,name&expand=operator_lbl&per-page=100&vr=web1.0";

export const GET_DISTRIBUTORS =
  "/operator?expand=reg_phase_lbl,created_by_lbl,status_lbl,branch_lbl,state_lbl,district_lbl,city_lbl,username&filter[type]=2&page=1&per-page=50&vr=web1.0";
export const ADD_NEW_DISTRIBUTOR = "/add/distributors";
export const UPDATE_DISTRIBUTOR = "/update/distributors";

export const getLcoUrl = (currPage, perPage) => {
  console.log("current page in lco url - ", currPage, perPage);
  return `/operator?expand=credit_limit_lbl,setting,balance,balance_h,reg_phase_lbl,created_by_lbl,distributor_lbl,status_lbl,branch_lbl,branch_code_lbl,state_lbl,district_lbl,city_lbl,username&filter[type]=3&page=${currPage}&per-page=${perPage}&vr=web1.0`;
};
export const ADD_NEW_LCO = "/add/lco";
export const UPDATE_LCO = "/update/lco";

export const GET_APPADBANNER = "/appadbanner";
export const ADD_APPADBANNER = "/add/appadbanner";

export const GET_USERHIERARCHY = "/userhierarchy";
export const ADD_USERHIERARCHY = "/add/userhierarchy";

export const GET_BROADCASTER =
  "/broadcaster?expand=created_by_lbl,status_lbl&page=1&per-page=50&vr=web1.0";
export const GET_BROADCASTER_STATUS = "/list/status?fields=id,name&vr=web1.0";
("/list/status?fields=id,name&vr=web1.0");
export const ADD_NEW_BROADCASTER = "/broadcaster?vr=web1.0";
export const UPDATE_BROADCASTER = (id) => `/broadcaster/${id}?vr=web1.0`;
export const getBroadcasterUrl = (currPage, perPage) => {
  console.log("current page in broadcaster url - ", currPage, perPage);
  return `/broadcaster?expand=created_by_lbl,status_lbl&page=${currPage}&per-page=${perPage}&vr=web1.0`;
  // ,operator_lbl,created_by_lbl,parent_lbl&notfilter[role]=4&page=${currPage}&per-page=${perPage}&vr=web1.0`;
};

export const GET_GENRELIST =
  "/genre?expand=created_by_lbl,status_lbl&page=1&per-page=50&vr=web1.0";
export const GET_GENRELIST_STATUS = "/list/status?fields=id,name&vr=web1.0";
export const ADD_NEW_GENRELIST = "/genre?vr=web1.0";
export const UPDATE_GENRELIST = (id) => `/genre/${id}?vr=web1.0`;

export const GET_LANGUAGELIST =
  "/language?expand=created_by_lbl,status_lbl&page=1&per-page=50&vr=web1.0";
export const GET_LANGUAGELIST_STATUS = "/list/status?fields=id,name&vr=web1.0";
export const ADD_NEW_LANGUAGELIST = "/language?vr=web1.0";
export const UPDATE_LANGUAGELIST = (id) => `/language/${id}?vr=web1.0`;

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
export const GET_OSDCONFIGURATIONLIST_ENABLE = "/nstv/list/osdenable?vr=web1.0";
export const GET_OSDCONFIGURATIONLIST_FORCESDDISPLAY =
  "/nstv/list/fpforceddisplay?vr=web1.0";
export const GET_OSDCONFIGURATIONLIST_DISPLAY =
  "/nstv/list/osddisplaytype?vr=web1.0";
export const GET_OSDCONFIGURATIONLIST_FONTCOLOR =
  "/nstv/list/osdfontcolor?vr=web1.0";
export const GET_OSDCONFIGURATIONLIST_BACKGROUNDCOLOR =
  "/nstv/list/osdbackcolor?vr=web1.0";
export const GET_OSDCONFIGURATIONLIST_FONTSIZE =
  "/nstv/list/fontSize?vr=web1.0";
export const GET_OSDCONFIGURATIONLIST_BACKGROUNDAREA =
  "/nstv/list/osdbackgroundarea?vr=web1.0";
export const GET_OSDCONFIGURATIONLIST_STATUS =
  "/list/status?fields=id,name&vr=web1.0";
export const ADD_NEW_OSDCONFIGURATIONLIST =
  "/message-template/template-for?vr=web1.0";

export const GET_LOCALCHANNELNUMBER = "/localchannelnumberlist";

export const GET_DOCUMENTUPLOADPOLICY = "/documentuploadpolicylist";
export const ADD_NEW_DOCUMENTUPLOADPOLICY = "/add/documentuploadpolicylist";

export const GET_OSDTEMPLATE =
  "/message-template?expand=created_by_lbl,status_lbl,template_for_lbl,operator_count&page=1&per-page=50&vr=web1.0";
export const GET_OSDTEMPLATE_TEMPLATEFOR =
  "/message-template/template-for?fields=id,name&vr=web1.0";
export const GET_OSDTEMPLATE_STATUS = "/list/status?fields=id,name&vr=web1.0";
export const GET_OSDTEMPLATE_OSD =
  "/mtc/list?fields=id,name,cas_code&vr=web1.0";
export const ADD_NEW_OSDTEMPLATE = "/message-template?vr=web1.0";

export const GET_NCF =
  "/ncf-rates?expand=status_lbl,created_by_lbl,type_lbl&page=1&per-page=50&vr=web1.0";
export const ADD_NCF = "/ncf-rates?vr=web1.0";
export const GET_OPERATOR_FORBULKASSIGN = (id) =>
  `/operator/list?fields=id,name,code&expand=type_lbl,status_lbl,branch_lbl,distributor_lbl&notfilter[type]=0&filter[type]=3&notfilter[ncf_id]=${id}&page=1&per-page=500&vr=web1.0`;
export const ADD_BULKASSIGN_NCF = "/ncf-rates/assign?vr=web1.0";

export const GET_COMPANYLIST = "/companylist";

export const GET_BRANDLIST =
  "/brand?expand=box_type_lbl,brand_type_lbl,char_allowed_lbl,cas_lbl,created_by_lbl,status_lbl&page=1&per-page=50&vr=web1.0";
export const GET_BRANDLIST_BRANDTYPE =
  "/list/brandtype?fields=id,name&vr=web1.0";
export const GET_BRANDLIST_BOXTYPE = "/list/boxtype?fields=id,name&vr=web1.0";
export const GET_BRANDLIST_CHARACTERS =
  "/list/charallowed?fields=id,name&vr=web1.0";
export const GET_BRANDLIST_STATUS = "/list/status?fields=id,name&vr=web1.0";
export const GET_BRANDLIST_CASTYPE = "/casvendor/list?fields=id,name&vr=web1.0";
export const ADD_BRANDLIST = "/brand?vr=web1.0";
export const UPDATE_BRANDLIST = (id) => `/brand/${id}?vr=web1.0`;

export const GET_WAREHOUSELIST =
  "/warehouse?expand=city_lbl,created_by_lbl,status_lbl,operator_lbl,operator_code_lbl&page=1&per-page=50&vr=web1.0";
export const GET_WAREHOUSELIST_STATUS = "/list/status?fields=id,name&vr=web1.0";
export const GET_WAREHOUSELIST_OPERATOR =
  "/operator/list?fields=id,name,code&expand=branch_lbl,distributor_lbl,city_lbl,state_lbl&per-page=100&vr=web1.0";

export const GET_WAREHOUSESTATUS = "/list/status?fields=id,name&vr=web1.0";
export const GET_WAREHOUSEOPERATOR =
  "/operator/list?fields=id,name,code&expand=branch_lbl,distributor_lbl,city_lbl,state_lbl&per-page=100&vr=web1.0";
export const ADD_WAREHOUSELIST = "/warehouse?vr=web1.0";
export const UPDATE_WAREHOUSELIST = (id) => `/warehouse/${id}?vr=web1.0`;

export const GET_INVENTORYSTATELIST = "/inventorystatelist";
export const ADD_INVENTORYSTATELIST = "/add/inventorystatelist";

export const GET_SMSMESSAGETEMPLIST =
  "/sms-message-template?expand=created_by_lbl,status_lbl,sender_id_lbl&page=1&per-page=50&vr=web1.0";
export const ADD_NEW_SMSMESSAGETEMPLIST = "/add/SMSMessageTemplate";

export const GET_BOUQUET =
  "/bouque?expand=setting,created_by_lbl,lco_rate,type_lbl,status_lbl,boxtype_lbl,rate,category_lbl,is_exclusive_lbl,is_promotional_lbl,additional_rates,is_online_app_lbl&page=1&per-page=50&vr=web1.0";
export const ADD_BOUQUET = "/bouque?vr=web1.0";
export const GET_BOUQUET_BOXTYPE = "/list/boxtype?fields=id,name&vr=web1.0";
export const GET_BOUQUETTYPE = "/list/bouquetype?fields=id,name&vr=web1.0";
export const GET_BOUQUEX = "/list/bouquex?fields=id,name&vr=web1.0";
export const GET_RECHARGEPERIOD = "/recharge-period/list?vr=web1.0";
export const GET_BOUQUET_TAXLIST =
  "/tax/list?fields=id,name,taxvalue&filter[applicableon]=1&expand=formula&vr=web1.0";
export const GET_ALACARTECHANNALS =
  "/channel/list?fields=id,name,code,broadcasterRate&expand=broadcaster_lbl,channel_type_lbl,isFta_lbl,isNCF_lbl&filter[isAlacarte]=1&sort=name&vr=web1.0";
export const GET_BOUQUET_PACKAGES =
  "/package/list?fields=id,name,code,broadcasterRate&expand=package_type_lbl,isFta_lbl,channelIds,brdBouqueIds,ftaChannelCount,payChannelCount,ncfChannelCount,totalChannelCount&sort=name&vr=web1.0";
export const GET_OPERATOR_FORBOUQUET = (id) =>
  `/operator/list?fields=id,name,code&expand=type_lbl,status_lbl,branch_lbl,distributor_lbl&notfilter[type]=0&notfilter[bouque_id]=${id}&page=1&per-page=500&vr=web1.0`;

export const GET_CONNECTIONSCHEME = "/connectionscheme";
export const ADD_CONNECTIONSCHEME = "/add/connectionscheme";

export const GET_COMPLAINTCATEGORY =
  "/complaint-category?expand=created_by_lbl,status_lbl,showonweb_lbl&page=1&per-page=50&vr=web1.0";
export const GET_COMPLAINTCATEGORY_STATUS =
  "/list/status?fields=id,name&vr=web1.0";
export const ADD_NEW_COMPLAINTCATEGORY = "/complaint-category?vr=web1.0";
export const UPDATE_COMPLAINTCATEGORY = (id) =>
  `/complaint-category/${id}?vr=web1.0`;

export const GET_COMPLAINTSUBCATEGORY =
  "/complaint-subcategory?expand=created_by_lbl,status_lbl,showonweb_lbl,category_lbl&page=1&per-page=50&vr=web1.0";
export const GET_COMPLAINTSUBCATEGORY_STATUS =
  "/list/status?fields=id,name&vr=web1.0";
export const GET_COMPLAINTSUBCATEGORY_CATEGORY =
  "/complaint-category?filter[status]=1&fields=id,name&vr=web1.0";
export const GET_COMPLAINTSUBCATEGORY_DESIGNATION =
  "/user-designation?fields=id,name&vr=web1.0";

export const ADD_NEW_COMPLAINTSUBCATEGORY = "/complaint-subcategory?vr=web1.0";

export const GET_CONFIGURATIONUPLOADLOGS =
  "/upload-q?expand=uploaded_file,created_by_lbl,status_lbl&notfilter[status]=0&filter[section]=configuration&page=1&per-page=50&vr=web1.0";
export const GET_TAX =
  "/tax?expand=valuetype_lbl,parent_lbl,created_by_lbl,status_lbl&page=1&per-page=50&vr=web1.0";
export const GET_TAX_STATUS = "/list/status?fields=id,name&vr=web1.0";
export const GET_TAX_VALUES = "/list/valuetype?fields=id,name&vr=web1.0";
export const GET_TAX_APPLY = "/list/chargetype?fields=id,name&vr=web1.0";
export const GET_TAX_TAXONTAX =
  "/tax/list?fields=id,name&filter[parent_id]=0&vr=web1.0";

export const ADD_NEW_TAXLIST = "/tax?vr=web1.0";
export const UPDATE_TAX = (id) => `/tax/${id}?vr=web1.0`;

export const GET_REASON =
  "/reason?expand=created_by_lbl,status_lbl,type_display_lbl,created_at_lbl&page=1&per-page=50&vr=web1.0";
export const GET_REASON_REASONTYPE =
  "/list/reasonType?fields=id,name&vr=web1.0";
export const GET_REASON_STATUS = "/list/status?fields=id,name&vr=web1.0";
export const ADD_NEW_REASON = "/reason?vr=web1.0";
export const UPDATE_REASON = (id) => `/reason/${id}?vr=web1.0`;

export const GET_BANK =
  "/bank?expand=created_by_lbl,status_lbl,ismso_lbl&page=1&per-page=50&vr=web1.0";
export const GET_BANK_STATUS = "/list/status?fields=id,name&vr=web1.0";
export const ADD_NEW_BANK = "/bank?vr=web1.0";
export const UPDATE_BANK = (id) => `/bank/${id}?vr=web1.0`;

export const GET_PROMOVOUCHER =
  "/promo-voucher?expand=status_lbl,bouque_lbl,expiry_date_lbl,apply_on_lbl,rperiod_lbl,operator_lbl,operator_code_lbl,smartcardno,stbno,created_at_lbl,created_by_lbl&page=1&per-page=50&vr=web1.0";
export const GET_PROMOVOUCHER_LCO =
  "/operator/list?fields=id,name,code&filter[type]=3&per-page=100&vr=web1.0";
export const GET_PROMOVOUCHER_APPLY = "/list/applyOn?fields=id,name&vr=web1.0";
export const GET_PROMOVOUCHER_RECHARGE =
  "/list/RechargePeriod?fields=id,name&vr=web1.0";
export const GET_PROMOVOUCHER_BOUQUET = "/bouque/list?fields=id,name&vr=web1.0";

export const ADD_NEW_PROMOVOUCHER = "/promo-voucher?vr=web1.0";

export const GET_USERS =
  "/user?expand=setting,group_lbl,access_level,role_lbl,status_lbl,type_lbl,operator_lbl,created_by_lbl,parent_lbl&notfilter[role]=4&page=1&per-page=500&vr=web1.0";
export const GET_USER_PROFILE = "/user";
export const ADD_NEW_USER = "/user?vr=web1.0";
export const UPDATE_USER = (id) => `/user/${id}?vr=web1.0`;
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
export const GET_USER_BULKSETTINGS = "/user/setting?fields=id,name&vr=web1.0";

export const GET_INVENTORYSTOCK =
  "/smartcard?expand=po_date,po_number,invoice_no,invoice_date,created_by_lbl,cas_lbl,status_lbl,brand_lbl,warehouse_lbl,state_lbl,inv_state_lbl&filter[status]=1&filter[stb_id]=0&page=1&per-page=50&vr=web1.0";
export const GET_INVENTORYSTOCK_STB =
  "/stb?expand=po_date,po_number,invoice_no,invoice_date,created_by_lbl,status_lbl,brand_lbl,boxtype_lbl,cas_lbl,warehouse_lbl,state_lbl,inv_state_lbl&filter[status]=1&filter[sc_id]=0&page=1&per-page=50&vr=web1.0";
export const GET_INVENTORYSTOCK_PAIRING =
  "/pairing?expand=created_by_lbl,status_lbl,cas_lbl,brand_lbl,boxtype_lbl,is_embeded_lbl,warehouse_lbl,state_lbl,inv_state_lbl,other_id_lbl,rsd_startdate&filter[status]=1&page=1&per-page=50&vr=web1.0";

export const getStockPairingUrl = (currPage, perPage) => {
  console.log("current page in users url - ", currPage, perPage);
  return `/pairing?expand=created_by_lbl,status_lbl,cas_lbl,brand_lbl,boxtype_lbl,is_embeded_lbl,warehouse_lbl,state_lbl,inv_state_lbl,other_id_lbl,rsd_startdate&filter[status]=1&page=${currPage}&per-page=${perPage}&vr=web1.0`;
};

export const GET_INVENTORYFAULTY_SMARTCARD =
  "/smartcard?expand=po_date,po_number,invoice_no,invoice_date,created_by_lbl,cas_lbl,status_lbl,brand_lbl,warehouse_lbl,state_lbl,inv_state_lbl&filter[status]=3&filter[stb_id]=0&page=1&per-page=50&vr=web1.0";
export const GET_INVENTORYFAULTY_STB =
  "stb?expand=po_date,po_number,invoice_no,invoice_date,created_by_lbl,status_lbl,brand_lbl,boxtype_lbl,cas_lbl,warehouse_lbl,state_lbl,inv_state_lbl&filter[status]=3&filter[sc_id]=0&filter[track]=1&page=1&per-page=50&vr=web1.0";
export const GET_INVENTORYFAULTY_PAIRING =
  "/pairing?expand=created_by_lbl,status_lbl,cas_lbl,brand_lbl,boxtype_lbl,is_embeded_lbl,warehouse_lbl,state_lbl,inv_state_lbl,other_id_lbl&filter[status]=3&page=1&per-page=50&vr=web1.0";

export const GET_INVENTORYBLACKLISTED_SMARTCARD =
  "/smartcard?expand=po_date,po_number,invoice_no,invoice_date,created_by_lbl,cas_lbl,status_lbl,brand_lbl,warehouse_lbl,state_lbl,inv_state_lbl&filter[status]=4&filter[stb_id]=0&filter[track]=1&page=1&per-page=50&vr=web1.0";
export const GET_INVENTORYBLACKLISTED_STB =
  "/stb?expand=po_date,po_number,invoice_no,invoice_date,created_by_lbl,status_lbl,brand_lbl,boxtype_lbl,cas_lbl,warehouse_lbl,state_lbl,inv_state_lbl&filter[status]=4&filter[sc_id]=0&filter[track]=1&page=1&per-page=50&vr=web1.0";
export const GET_INVENTORYBLACKLISTED_PAIRING =
  "pairing?expand=created_by_lbl,status_lbl,cas_lbl,brand_lbl,boxtype_lbl,is_embeded_lbl,warehouse_lbl,state_lbl,inv_state_lbl,other_id_lbl&filter[status]=4&filter[track]=1&page=1&per-page=50&vr=web1.0";

export const GET_INVENTORYALLOTTED_SMARTCARD =
  "/smartcard-allotment?expand=created_by_lbl,status_lbl,cas_lbl,brand_lbl,is_embeded_lbl,operator_lbl,warehouse_lbl,inv_state_lbl&filter[status]=1&filter[account_id]=0&page=1&per-page=50&vr=web1.0";
export const GET_INVENTORYALLOTTED_STB =
  "/stb-allotment?expand=created_by_lbl,status_lbl,boxtype_lbl,cas_lbl,brand_lbl,is_embeded_lbl,operator_lbl,warehouse_lbl,inv_state_lbl&filter[status]=1&filter[account_id]=0&page=1&per-page=50&vr=web1.0";
export const GET_INVENTORYALLOTTED_PAIRING =
  "/pairing-allotment?expand=created_by_lbl,status_lbl,cas_lbl,brand_lbl,boxtype_lbl,is_embeded_lbl,operator_lbl,warehouse_lbl,inv_state_lbl,other_id_lbl,rsd_startdate&filter[status]=1&filter[account_id]=0&page=1&per-page=50&vr=web1.0";
