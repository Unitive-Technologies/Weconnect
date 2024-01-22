import { call, put, select, takeEvery } from "redux-saga/effects";
import { GET_INVENTORYTRACK } from "./actionTypes";
import { getInventoryTrackSuccess, getInventoryTrackFail } from "./actions";
import { getInventoryTrack } from "../../helpers/fakebackend_helper";

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

function* inventorytrackSaga() {
  yield takeEvery(GET_INVENTORYTRACK, fetchInventoryTrack);
}

export default inventorytrackSaga;
