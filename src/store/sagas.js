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
import broadCasterSaga from "./broadcaster/saga";
import genreSaga from "./genre/saga";
import distributorsSaga from "./distributorslist/saga";

import regionalOfficeSaga from "./regionalofficelist/saga";
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
    fork(distributorsSaga),
  ]);
}
