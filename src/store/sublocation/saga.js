import { call, put, takeEvery } from "redux-saga/effects";

import { GET_SUBLOCATION, ADD_SUBLOCATION } from "./actionTypes";

import {
  getSublocationSuccess,
  getSublocationFail,
  addSubLocationSuccess,
  addSubLocationFail,
} from "./actions";

//Include Both Helper File with needed methods
import {
  getSublocation,
  addSublocation,
} from "../../helpers/fakebackend_helper";
import { toast } from "react-toastify";

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

function* onAddSubLocation({ payload: sublocation }) {
  try {
    const response = yield call(addSublocation, sublocation);
    yield put(addSubLocationSuccess(response));
    toast.success("Sub Location list Added Successfully", { autoClose: 2000 });
  } catch (error) {
    yield put(addSubLocationFail(error));
    toast.error("Sub Location list Added Failed", { autoClose: 2000 });
  }
}

function* sublocationSaga() {
  yield takeEvery(GET_SUBLOCATION, fetchSublocation);
  yield takeEvery(ADD_SUBLOCATION, onAddSubLocation);
}

export default sublocationSaga;
