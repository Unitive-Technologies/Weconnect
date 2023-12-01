import { call, put, takeEvery } from "redux-saga/effects";

import { GET_REASON } from "./actionTypes";

import { getReasonSuccess, getReasonFail } from "./actions";

//Include Both Helper File with needed methods
import { getReason } from "../../helpers/fakebackend_helper";

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
    const reasonList = convertReasonListObject(response);
    yield put(getReasonSuccess(reasonList));
  } catch (error) {
    yield put(getReasonFail(error));
  }
}

function* reasonSaga() {
  yield takeEvery(GET_REASON, fetchReason);
}

export default reasonSaga;
