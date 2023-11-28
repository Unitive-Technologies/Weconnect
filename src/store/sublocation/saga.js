import { call, put, takeEvery } from "redux-saga/effects";

import { GET_SUBLOCATION } from "./actionTypes";

import { getSublocationSuccess, getSublocationFail } from "./actions";

//Include Both Helper File with needed methods
import { getSublocation } from "../../helpers/fakebackend_helper";

const convertSublocationListObject = (sublocationList) => {
  // Sublocation list has more data than what we need, we need to convert each of the customer user object in the list with needed colums of the table
  return sublocationList.map((sublocation) => {
    return {
      ...sublocation,
      id: sublocation.id,
      name: sublocation.name,
      code: sublocation.code,
      location_lbl: sublocation.location_lbl,
      location_code: sublocation.location_code,
      operator_lbl: sublocation.operator_lbl,
      operator_code: sublocation.operator_code,
      status:
        sublocation.status === 1
          ? "ACTIVE"
          : sublocation.status === 0
            ? "INACTIVE"
            : "BLOCKED",
      created_at: sublocation.created_at,
      created_by_lbl: sublocation.created_by_lbl,
    };
  });
};

function* fetchSublocation() {
  try {
    const response = yield call(getSublocation);
    console.log("response:" + JSON.stringify(response));
    const sublocationList = convertSublocationListObject(response);
    yield put(getSublocationSuccess(sublocationList));
  } catch (error) {
    yield put(getSublocationFail(error));
  }
}

function* sublocationSaga() {
  yield takeEvery(GET_SUBLOCATION, fetchSublocation);
}

export default sublocationSaga;
