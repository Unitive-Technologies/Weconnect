import { call, put, select, takeEvery } from "redux-saga/effects";

import {
  GET_REASON,
  UPDATE_REASON,
  GET_REASON_STATUS,
  GET_REASON_REASONTYPE,
  ADD_REASON,
} from "./actionTypes";

import {
  getReason as fetchreasons,
  getReasonSuccess,
  getReasonFail,
  updateReasonSuccess,
  updateReasonFail,
  getReasonStatusSuccess,
  getReasonStatusFail,
  getReasonReasonTypeSuccess,
  getReasonReasonTypeFail,
  addReasonSuccess,
  addReasonFail,
} from "./actions";

//Include Both Helper File with needed methods
import {
  getReason,
  updateReason,
  getReasonStatus,
  getReasonReasonType,
  addNewReason,
} from "../../helpers/fakebackend_helper";

export const getReasonStore = (state) => state.reason;

function* fetchReason() {
  try {
    let ReasonStore = yield select(getReasonStore);

    const pageSize = ReasonStore.pageSize;
    const currentPage = ReasonStore.currentPage;

    const response = yield call(getReason, currentPage, pageSize);
    console.log("Response from API -", response);
    debugger;
    yield put(getReasonSuccess(response));
  } catch (error) {
    console.error("Error fetching Users list:", error);
    yield put(getReasonFail(error));
  }
}


function* onUpdateReason({ payload: reason }) {
  console.log("Reason onUpdate:" + JSON.stringify(reason));
  console.log("reason id:" + reason.id);
  try {
    const response = yield call(
      updateReason,
      reason.id,
      reason
    );
    yield put(updateReasonSuccess(response));
    console.log("update response:" + JSON.stringify(response));
    yield put(fetchreasons());
  } catch (error) {
    yield put(updateReasonFail(error));
  }
}

function* fetchReasonStatus() {
  try {
    const response = yield call(getReasonStatus);
    console.log("Reason status response:" + JSON.stringify(response));
    yield put(getReasonStatusSuccess(response.data));
  } catch (error) {
    yield put(getReasonStatusFail(error));
  }
}

function* fetchReasonReasonType() {
  try {
    const response = yield call(getReasonReasonType);
    console.log("response:" + JSON.stringify(response));
    yield put(getReasonReasonTypeSuccess(response.data));
  } catch (error) {
    yield put(getReasonReasonTypeFail(error));
  }
}

function* onAddNewReason({ payload: reason }) {
  try {
    const response = yield call(addNewReason, reason);
    yield put(addReasonSuccess(response));
    yield put(fetchreasons());
  } catch (error) {
    yield put(addReasonFail(error));

  }
}

function* reasonSaga() {
  yield takeEvery(GET_REASON, fetchReason);
  yield takeEvery(UPDATE_REASON, onUpdateReason);
  yield takeEvery(GET_REASON_STATUS, fetchReasonStatus);
  yield takeEvery(GET_REASON_REASONTYPE, fetchReasonReasonType);
  yield takeEvery(ADD_REASON, onAddNewReason);
}

export default reasonSaga;
