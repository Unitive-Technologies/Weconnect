import { call, put, takeEvery } from "redux-saga/effects";
import { GET_SUBLOCATION, ADD_SUBLOCATION } from "./actionTypes";
import {
  getSublocationSuccess,
  getSublocationFail,
  addSubLocationSuccess,
  addSubLocationFail,
} from "./actions";
import {
  getSublocation,
  addSublocation,
} from "../../helpers/fakebackend_helper";

const convertSublocationListObject = (sublocationList) => {
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
    console.log("response:" + JSON.stringify(response.data));
    const sublocationList = convertSublocationListObject(response.data);
    yield put(getSublocationSuccess(sublocationList));
  } catch (error) {
    yield put(getSublocationFail(error));
  }
}

function* onAddSubLocation({ payload: sublocation }) {
  try {
    const response = yield call(addSublocation, sublocation);
    console.log("Response data: ", response.data);
    yield put(addSubLocationSuccess(response.data));
  } catch (error) {
    yield put(addSubLocationFail(error));
  }
}

function* sublocationSaga() {
  yield takeEvery(GET_SUBLOCATION, fetchSublocation);
  yield takeEvery(ADD_SUBLOCATION, onAddSubLocation);
}

export default sublocationSaga;
