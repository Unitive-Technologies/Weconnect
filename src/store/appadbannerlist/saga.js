import { call, put, takeEvery } from "redux-saga/effects";

import { GET_APPADBANNER } from "./actionTypes";

import { getAppAdBannerSuccess, getAppAdBannerFail } from "./actions";

//Include Both Helper File with needed methods
import { getAppAdBanner } from "../../helpers/fakebackend_helper";

const convertAppAdBannerListObject = (appAdBannerList) => {
  // Notification Template has more data than what we need, we need to convert each of the Notification Template user object in the list with needed colums of the table
  return appAdBannerList.map((appabanner) => {
    return {
      ...appabanner,
      id: appabanner.id,
      name: appabanner.name,
      code: appabanner.code,
      contact_person: appabanner.contact_person,
      addr: appabanner.addr,
      mobile_no: appabanner.mobile_no,
      state_lbl: appabanner.state_lbl,
      district_lbl: appabanner.district_lbl,
      created_at: appabanner.created_at,
      created_by: appabanner.created_by,
      city_lbl: appabanner.city_lbl,
      gstno: appabanner.gstno,
      panno: appabanner.panno,
      username: appabanner.username,
      status:
        appabanner.status === 1
          ? "ACTIVE"
          : appabanner.status === 0
          ? "INACTIVE"
          : "BLOCKED",
    };
  });
};

function* fetchAppAdBanner() {
  try {
    const response = yield call(getAppAdBanner);
    const appadbannerList = convertAppAdBannerListObject(response);
    yield put(getAppAdBannerSuccess(appadbannerList));
  } catch (error) {
    console.error("Error fetching App ad banner list:", error);
    yield put(getAppAdBannerFail(error));
  }
}

function* appAdBannerSaga() {
  yield takeEvery(GET_APPADBANNER, fetchAppAdBanner);
}

export default appAdBannerSaga;
