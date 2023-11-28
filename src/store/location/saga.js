import { call, put, takeEvery } from "redux-saga/effects";

import { GET_LOCATION } from "./actionTypes";

import { getLocationSuccess, getLocationFail } from "./actions";

//Include Both Helper File with needed methods
import { getLocation } from "../../helpers/fakebackend_helper";

const convertLocationListObject = (locationList) => {
  // Location list has more data than what we need, we need to convert each of the location object in the list with needed colums of the table
  return locationList.map((location) => {
    return {
      ...location,
      id: location.id,
      name: location.name,
      code: location.code,
      status:
        location.status === 1
          ? "ACTIVE"
          : location.status === 0
            ? "INACTIVE"
            : "BLOCKED",
      operator_code: location.operator_code,
      operator_lbl: location.operator_lbl,
      created_at: location.created_at,
      created_by_lbl: location.created_by_lbl,
    };
  });
};

function* fetchLocation() {
  try {
    const response = yield call(getLocation);
    console.log("response:" + JSON.stringify(response));
    const locationList = convertLocationListObject(response);
    yield put(getLocationSuccess(locationList));
  } catch (error) {
    yield put(getLocationFail(error));
  }
}

function* locationSaga() {
  yield takeEvery(GET_LOCATION, fetchLocation);
}

export default locationSaga;
