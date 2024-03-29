import { all, fork } from "redux-saga/effects";

//public
import AccountSaga from "./auth/register/saga";
import AuthSaga from "./auth/login/saga";
import ForgetSaga from "./auth/forgetpwd/saga";
import ProfileSaga from "./auth/profile/saga";
import LayoutSaga from "./layout/saga";
import usersSaga from "./users/saga";
import customerUsersSaga from "./customerusers/saga";
import groupPolicySaga from "./grouppolicy/saga";
import designationSaga from "./designation/saga";
import notificationTemplateSaga from "./notificationtemplate/saga";
import scheduleCustomerNotificationSaga from "./schedulecustomernotification/saga";
import stateUsersSaga from "./stateusers/saga";
import districtSaga from "./district/saga";
import citySaga from "./city/saga";
import locationSaga from "./location/saga";
import sublocationSaga from "./sublocation/saga";
import broadCasterSaga from "./broadcaster/saga";
import genreSaga from "./genre/saga";
import distributorsSaga from "./distributor/saga";
import languageSaga from "./language/saga";
import regionalOfficeSaga from "./regionaloffice/saga";
import lcoSaga from "./lcolist/saga";
import scheduledNotificationSaga from "./schedulednotificationlist/saga";
import channelListSaga from "./channel/saga";
import broadcasterBouquetListSaga from "./broadcasterbouquet/saga";
import packageListSaga from "./packagelist/saga";
import appAdBannerSaga from "./appadbannerlist/saga";
import osdConfigurationSaga from "./OSDConfiguration/saga";
import osdTemplateSaga from "./OSDTemplate/saga";
import userHierarchySaga from "./userhierarchy/saga";
import localChannelNumberSaga from "./localchannelnumber/saga";
import ncfSaga from "./ncflist/saga";
import bouquetSaga from "./bouquetlist/saga";
import documentUploadPolicySaga from "./documentuploadpolicy/saga";
import smsMessageTempListSaga from "./smsmessage/saga";
import companyListSaga from "./companylist/saga";
import warehouseListSaga from "./warehouse/saga";
import connectionSchemeSaga from "./connectionschemelist/saga";
import complaintCategorySaga from "./complaintcategorylist/saga";
import brandListSaga from "./brandlist/saga";
import inventoryStateListSaga from "./inventorystate/saga";
import complaintSubCategorySaga from "./complaintsubcategorylist/saga";
import configurationUploadLogsSaga from "./configurationuploadlogs/saga";
import taxSaga from "./taxlist/saga";
import reasonSaga from "./reasonlist/saga";
import bankSaga from "./banklist/saga";
import promoVoucherSaga from "./promovoucherlist/saga";
import admindetailsSaga from "./admin/saga";
import inventorystockSaga from "./inventorystock/saga";
import inventoryallottedSaga from "./inventoryallotted/saga";
import inventoryfaultySaga from "./inventoryfaulty/saga";
import inventoryblacklistedSaga from "./inventoryblacklisted/saga";
import inventorytrackSaga from "./inventorytrack/saga";

export default function* rootSaga() {
  yield all([
    //public
    fork(AccountSaga),
    fork(AuthSaga),
    fork(ForgetSaga),
    fork(ProfileSaga),
    fork(LayoutSaga),
    fork(usersSaga),
    fork(customerUsersSaga),
    fork(groupPolicySaga),
    fork(designationSaga),
    fork(notificationTemplateSaga),
    fork(scheduleCustomerNotificationSaga),
    fork(regionalOfficeSaga),
    fork(stateUsersSaga),
    fork(broadCasterSaga),
    fork(genreSaga),
    fork(languageSaga),
    fork(distributorsSaga),
    fork(districtSaga),
    fork(citySaga),
    fork(lcoSaga),
    fork(locationSaga),
    fork(sublocationSaga),
    fork(scheduledNotificationSaga),
    fork(channelListSaga),
    fork(broadcasterBouquetListSaga),
    fork(packageListSaga),
    fork(osdConfigurationSaga),
    fork(appAdBannerSaga),
    fork(osdTemplateSaga),
    fork(userHierarchySaga),
    fork(localChannelNumberSaga),
    fork(ncfSaga),
    fork(documentUploadPolicySaga),
    fork(bouquetSaga),
    fork(smsMessageTempListSaga),
    fork(companyListSaga),
    fork(warehouseListSaga),
    fork(connectionSchemeSaga),
    fork(complaintCategorySaga),
    fork(brandListSaga),
    fork(inventoryStateListSaga),
    fork(complaintSubCategorySaga),
    fork(configurationUploadLogsSaga),
    fork(taxSaga),
    fork(reasonSaga),
    fork(bankSaga),
    fork(promoVoucherSaga),
    fork(admindetailsSaga),
    fork(inventorystockSaga),
    fork(inventoryallottedSaga),
    fork(inventoryblacklistedSaga),
    fork(inventoryfaultySaga),
    fork(inventorytrackSaga),
  ]);
}
