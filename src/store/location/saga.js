import { call, put, select, takeEvery } from "redux-saga/effects";
import {
  GET_LOCATION,
  ADD_LOCATION,
  UPDATE_LOCATION,
  GET_LCO_ONLOCATION,
  // GET_SINGLE_LOCATION,
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
  // getSingleLocationSuccess,
  // getSingleLocationFail,
} from "./actions";
import {
  getLocation,
  addLocation,
  updateLocation,
  getLcoOnLocation,
  // getSingleLocation,
} from "../../helpers/fakebackend_helper";
import { toast } from "react-toastify";

export const getLocationStore = (state) => state.location;

function* fetchLocation() {
  try {
    let LocationStore = yield select(getLocationStore);

    const pageSize = LocationStore.pageSize;
    const currentPage = LocationStore.currentPage;

    const response = yield call(getLocation, currentPage, pageSize);
    console.log("Response from API -", response);
    // debugger;
    yield put(getLocationSuccess(response));
  } catch (error) {
    console.error("Error fetching Reason list:", error);
    yield put(getLocationFail(error));
  }
}

function* onAddLocation({ payload: location }) {
  try {
    const response = yield call(addLocation, location);
    console.log("Response data: ", response.data);
    yield put(addLocationSuccess(response.data));
    yield put(getLocationAction());
    // toast.success("Location Added Successfully", {
    //   autoClose: 2000,
    // });
  } catch (error) {
    yield put(addLocationFail(error));
  }
}

function* onUpdateLocation({ payload: location }) {
  try {
    const response = yield call(updateLocation, location.id, location);
    console.log("Response data in saga: ", response);
    yield put(updateLocationSuccess(response));
    yield put(getLocationAction());
  } catch (error) {
    console.log("Error in update location: ", error);
    yield put(updateLocationFail(error));
  }
}

function* fetchLcoOnLocation() {
  try {
    const response = yield call(getLcoOnLocation);
    // console.log("response:" + JSON.stringify(response.data));
    // const lcoList = convertLocationListObject(response.data);
    yield put(getLcoOnLocationSuccess(response.data));
  } catch (error) {
    yield put(getLcoOnLocationFail(error));
  }
}

// function* fetchSingleLocation({ payload: location }) {
//   try {
//     const response = yield call(getSingleLocation, location);
//     console.log("Fetch single location:" + JSON.stringify(response.data));
//     // const singleLocation = convertLocationListObject(response.data);
//     yield put(getSingleLocationSuccess(response.data));
//   } catch (error) {
//     console.log("Error at fetch single location: ", error);
//     yield put(getSingleLocationFail(error));
//   }
// }

function* locationSaga() {
  yield takeEvery(GET_LOCATION, fetchLocation);
  yield takeEvery(ADD_LOCATION, onAddLocation);
  yield takeEvery(UPDATE_LOCATION, onUpdateLocation);
  yield takeEvery(GET_LCO_ONLOCATION, fetchLcoOnLocation);
  // yield takeEvery(GET_SINGLE_LOCATION, fetchSingleLocation);
}

export default locationSaga;
