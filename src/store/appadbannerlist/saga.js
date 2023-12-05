import { call, put, takeEvery } from "redux-saga/effects";

import { GET_APPADBANNER, ADD_APPADBANNER } from "./actionTypes";

import {
  getAppAdBannerSuccess,
  getAppAdBannerFail,
  addAppAdBannerSuccess,
  addAppAdBannerFail,
} from "./actions";

//Include Both Helper File with needed methods
import {
  getAppAdBanner,
  addAppAdBanner,
} from "../../helpers/fakebackend_helper";
import { toast } from "react-toastify";

const convertAppAdBannerListObject = (appAdBannerList) => {
  // Notification Template has more data than what we need, we need to convert each of the Notification Template user object in the list with needed colums of the table
  return appAdBannerList.map((appadbanner) => {
    return {
      ...appadbanner,
      id: appadbanner.id,
      title: appadbanner.title,
      caption: appadbanner.caption,
      start_date: appadbanner.start_date,
      end_date: appadbanner.end_date,
      description: appadbanner.description,
      // img: appadbanner.img,
      created_at: appadbanner.created_at,
      created_by: appadbanner.created_by,
      status:
        appadbanner.status === 1
          ? "ACTIVE"
          : appadbanner.status === 0
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

function* onAddAppAdBanner({ payload: appadbanner }) {
  try {
    const response = yield call(addNewDesignation, appadbanner);
    yield put(addAppAdBannerSuccess(response));
    toast.success("App ad banner list Added Successfully", { autoClose: 2000 });
  } catch (error) {
    yield put(addAppAdBannerFail(error));
    toast.error("App ad banner list Added Failed", { autoClose: 2000 });
  }
}

function* appAdBannerSaga() {
  yield takeEvery(GET_APPADBANNER, fetchAppAdBanner);
  yield takeEvery(ADD_APPADBANNER, onAddAppAdBanner);
}

export default appAdBannerSaga;
