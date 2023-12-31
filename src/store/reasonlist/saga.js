import { call, put, takeEvery } from "redux-saga/effects";

import {
  GET_REASON,
  GET_REASON_STATUS,
  GET_REASON_REASONTYPE,
  ADD_NEW_REASON,
} from "./actionTypes";

import {
  getReasonSuccess,
  getReasonFail,
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
  getReasonStatus,
  getReasonReasonType,
  addNewReason,
} from "../../helpers/fakebackend_helper";

const convertReasonListObject = (reasonList) => {
  // customer user list has more data than what we need, we need to convert each of the customer user object in the list with needed colums of the table
  return reasonList.map((reason) => {
    return {
      ...reason,
      id: reason.id,
      name: reason.name,
      code: reason.code,
      type_display_lbl: reason.type_display_lbl,
      created_at_lbl: reason.created_at_lbl,
      created_by_lbl: reason.created_by_lbl,
      status_lbl: reason.status_lbl,
    };
  });
};

function* fetchReason() {
  try {
    const response = yield call(getReason);
    console.log("response:" + JSON.stringify(response));
    const reasonList = convertReasonListObject(response.data);
    yield put(getReasonSuccess(reasonList));
  } catch (error) {
    yield put(getReasonFail(error));
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
    toast.success("Reason Added Successfully", { autoClose: 2000 });
  } catch (error) {
    yield put(addReasonFail(error));
    toast.error("Reason List Added Failed", { autoClose: 2000 });
  }
}

function* reasonSaga() {
  yield takeEvery(GET_REASON, fetchReason);
  yield takeEvery(GET_REASON_STATUS, fetchReasonStatus);
  yield takeEvery(GET_REASON_REASONTYPE, fetchReasonReasonType);
  yield takeEvery(ADD_NEW_REASON, onAddNewReason);
}

export default reasonSaga;
