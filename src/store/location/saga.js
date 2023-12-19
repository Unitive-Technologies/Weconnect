import { call, put, takeEvery } from "redux-saga/effects";
import { GET_LOCATION, ADD_LOCATION } from "./actionTypes";
import {
  getLocationSuccess,
  getLocationFail,
  addLocationSuccess,
  addLocationFail,
} from "./actions";
import { getLocation, addLocation } from "../../helpers/fakebackend_helper";

const convertLocationListObject = (locationList) => {
  return locationList.map((location) => {
    return {
      ...location,
      id: location.id,
      name: location.name,
      code: location.code,
      status:
        location.status === 1
          ? "ACTIVE"
          : location.status === 2
          ? "INACTIVE"
          : "BLOCKED",
      operator_code: location.operator_code,
      operator_lbl: location.operator_lbl,
      status_lbl: location.status_lbl,
      created_at: location.created_at,
      created_by_lbl: location.created_by_lbl,
      operator_id: location.operator_id,
    };
  });
};

function* fetchLocation() {
  try {
    const response = yield call(getLocation);
    console.log("response:" + JSON.stringify(response.data));
    const locationList = convertLocationListObject(response.data);
    yield put(getLocationSuccess(locationList));
  } catch (error) {
    yield put(getLocationFail(error));
  }
}

function* onAddLocation({ payload: location }) {
  try {
    const response = yield call(addLocation, location);
    console.log("Response data: ", response.data);
    yield put(addLocationSuccess(response.data));
  } catch (error) {
    yield put(addLocationFail(error));
  }
}

function* locationSaga() {
  yield takeEvery(GET_LOCATION, fetchLocation);
  yield takeEvery(ADD_LOCATION, onAddLocation);
}

export default locationSaga;
