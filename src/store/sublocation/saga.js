import { call, put, select, takeEvery } from "redux-saga/effects";
import {
  GET_SUBLOCATION,
  ADD_SUBLOCATION,
  UPDATE_SUBLOCATION,
  GET_LOCATION_ONSUBLOCATION,
} from "./actionTypes";
import {
  getSublocation as fetchsublocations,
  getSublocationSuccess,
  getSublocationFail,
  addSubLocationSuccess,
  addSubLocationFail,
  updateSublocationSuccess,
  updateSublocationFail,
  getLocationOnSublocationSuccess,
  getLocationOnSublocationFail,
} from "./actions";
import {
  getSublocation,
  addSublocation,
  updateSublocation,
  getLocationOnSublocation,
} from "../../helpers/backend_helper";

export const getSublocationStore = (state) => state.sublocation;

function* fetchSublocation() {
  try {
    let SublocationStore = yield select(getSublocationStore);

    const pageSize = SublocationStore.pageSize;
    const currentPage = SublocationStore.currentPage;

    const response = yield call(getSublocation, currentPage, pageSize);
    console.log("Response from API -", response);
    // debugger;
    yield put(getSublocationSuccess(response));
  } catch (error) {
    console.error("Error fetching Sublocation list:", error);
    yield put(getSublocationFail(error));
  }
}

// function* fetchSublocation() {
//   try {
//     const response = yield call(getSublocation);
//     // console.log("response:" + JSON.stringify(response.data));
//     const sublocationList = convertSublocationListObject(response.data);
//     yield put(getSublocationSuccess(sublocationList));
//   } catch (error) {
//     yield put(getSublocationFail(error));
//   }
// }

function* onUpdateSubLocation({ payload: sublocation }) {
  try {
    const response = yield call(updateSublocation, sublocation.id, sublocation);
    console.log("Response data in saga: ", response);
    yield put(updateSublocationSuccess(response));
    yield put(fetchsublocations());
  } catch (error) {
    console.log("Error in update sublocation: ", error);
    yield put(updateSublocationFail(error));
  }
}

function* onAddSubLocation({ payload: sublocation }) {
  try {
    const response = yield call(addSublocation, sublocation);
    console.log("Response data: ", response.data);
    yield put(addSubLocationSuccess(response.data));
    yield put(fetchsublocations());
  } catch (error) {
    yield put(addSubLocationFail(error));
  }
}

function* fetchLocationOnSublocation() {
  try {
    const response = yield call(getLocationOnSublocation);
    yield put(getLocationOnSublocationSuccess(response.data));
  } catch (error) {
    yield put(getLocationOnSublocationFail(error));
  }
}

function* sublocationSaga() {
  yield takeEvery(GET_SUBLOCATION, fetchSublocation);
  yield takeEvery(ADD_SUBLOCATION, onAddSubLocation);
  yield takeEvery(UPDATE_SUBLOCATION, onUpdateSubLocation);
  yield takeEvery(GET_LOCATION_ONSUBLOCATION, fetchLocationOnSublocation);
}

export default sublocationSaga;
