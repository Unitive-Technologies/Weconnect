import { call, put, select, takeEvery } from "redux-saga/effects";
import { GET_INVENTORYTRACK, GET_INVENTORYTRACK_ACTION } from "./actionTypes";
import {
  getInventoryTrackSuccess,
  getInventoryTrackFail,
  getInventoryTrackActionSuccess,
  getInventoryTrackActionFail,
} from "./actions";
import {
  getInventoryTrack,
  getInventoryTrackAction,
} from "../../helpers/fakebackend_helper";

export const getInventoryTrackStore = (state) => state.inventorytrack;

function* fetchInventoryTrack() {
  try {
    let inventoryTrackStore = yield select(getInventoryTrackStore);

    const pageSize = inventoryTrackStore.pageSize;
    const currentPage = inventoryTrackStore.currentPage;

    const response = yield call(getInventoryTrack, currentPage, pageSize);
    console.log("Response from API -", response);
    // debugger;
    yield put(getInventoryTrackSuccess(response));
  } catch (error) {
    console.error("Error fetching inventory track list:", error);
    yield put(getInventoryTrackFail(error));
  }
}

function* fetchInventoryTrackAction() {
  try {
    const response = yield call(getInventoryTrackAction);
    yield put(getInventoryTrackActionSuccess(response.data));
  } catch (error) {
    yield put(getInventoryTrackActionFail(error));
  }
}

function* inventorytrackSaga() {
  yield takeEvery(GET_INVENTORYTRACK, fetchInventoryTrack);
  yield takeEvery(GET_INVENTORYTRACK_ACTION, fetchInventoryTrackAction);
}

export default inventorytrackSaga;
