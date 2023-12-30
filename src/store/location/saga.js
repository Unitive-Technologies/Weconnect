import { call, put, takeEvery } from "redux-saga/effects";
import {
  GET_LOCATION,
  ADD_LOCATION,
  UPDATE_LOCATION,
  GET_LCO_ONLOCATION,
} from "./actionTypes";
import {
  getLocationSuccess,
  getLocationFail,
  addLocationSuccess,
  addLocationFail,
  getLocation as getLocationAction,
  getLcoOnLocationSuccess,
  getLcoOnLocationFail,
  updateLocationSuccess,
  updateLocationFail,
} from "./actions";
import {
  getLocation,
  addLocation,
  updateLocation,
  getLcoOnLocation,
} from "../../helpers/fakebackend_helper";
import { toast } from "react-toastify";

const convertLocationListObject = (locationList) => {
  return locationList.map((location) => {
    return {
      ...location,
      id: location.id,
      name: location.name,
      code: location.code,
      status: location.status,
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
    // console.log("response:" + JSON.stringify(response.data));
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
    yield put(getLocationAction());
    toast.success("Location Added Successfully", {
      autoClose: 2000,
    });
  } catch (error) {
    yield put(addLocationFail(error));
  }
}

function* onUpdateLocation({ payload: location }) {
  try {
    const response = yield call(updateLocation, location.id, location);
    console.log("Response data in saga: ", response);
    yield put(updateLocationSuccess(response));
  } catch (error) {
    console.log("Error in update location: ", error);
    yield put(updateLocationFail(error));
  }
}

function* fetchLcoOnLocation() {
  try {
    const response = yield call(getLcoOnLocation);
    // console.log("response:" + JSON.stringify(response.data));
    const lcoList = convertLocationListObject(response.data);
    yield put(getLcoOnLocationSuccess(lcoList));
  } catch (error) {
    yield put(getLcoOnLocationFail(error));
  }
}

function* locationSaga() {
  yield takeEvery(GET_LOCATION, fetchLocation);
  yield takeEvery(ADD_LOCATION, onAddLocation);
  yield takeEvery(UPDATE_LOCATION, onUpdateLocation);
  yield takeEvery(GET_LCO_ONLOCATION, fetchLcoOnLocation);
}

export default locationSaga;
