import { all, fork } from "redux-saga/effects";

//public
import AccountSaga from "./auth/register/saga";
import AuthSaga from "./auth/login/saga";
import ForgetSaga from "./auth/forgetpwd/saga";
import ProfileSaga from "./auth/profile/saga";
import LayoutSaga from "./layout/saga";
import contactsSaga from "./contacts/saga";
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
import distributorsSaga from "./distributorslist/saga";
import languageSaga from "./language/saga";
import regionalOfficeSaga from "./regionalofficelist/saga";
import lcoSaga from "./lcolist/saga";
import scheduledNotificationSaga from "./schedulednotificationlist/saga";
import channelListSaga from "./channel/saga";
import broadcasterBouquetListSaga from "./broadcasterbouquet/saga";

import packageListSaga from "./packagelist/saga";

import appAdBannerSaga from "./appadbannerlist/saga";

export default function* rootSaga() {
  yield all([
    //public
    fork(AccountSaga),
    fork(AuthSaga),
    fork(ForgetSaga),
    fork(ProfileSaga),
    fork(LayoutSaga),
    fork(contactsSaga),
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

    fork(appAdBannerSaga),
  ]);
}
