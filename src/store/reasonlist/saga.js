import { call, put, takeEvery } from "redux-saga/effects";

import { GET_REASON, ADD_NEW_REASON } from "./actionTypes";

import { getReasonSuccess, getReasonFail, addReasonSuccess, addReasonFail } from "./actions";

//Include Both Helper File with needed methods
import { getReason, addNewReason } from "../../helpers/fakebackend_helper";

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
    // const reasonList = convertReasonListObject(response);
    yield put(getReasonSuccess(response.data));
  } catch (error) {
    yield put(getReasonFail(error));
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
  yield takeEvery(ADD_NEW_REASON, onAddNewReason);
}

export default reasonSaga;
