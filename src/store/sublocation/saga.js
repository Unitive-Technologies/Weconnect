import { call, put, takeEvery } from "redux-saga/effects";
import {
  GET_SUBLOCATION,
  ADD_SUBLOCATION,
  UPDATE_SUBLOCATION,
} from "./actionTypes";
import {
  getSublocationSuccess,
  getSublocationFail,
  addSubLocationSuccess,
  addSubLocationFail,
  updateSublocationSuccess,
  updateSublocationFail,
} from "./actions";
import {
  getSublocation,
  addSublocation,
  updateSublocation,
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
      status: sublocation.status,
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

function* onUpdateSubLocation({ payload: sublocation }) {
  try {
    const response = yield call(updateSublocation, sublocation.id, sublocation);
    console.log("Response data in saga: ", response);
    yield put(updateSublocationSuccess(response));
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
  } catch (error) {
    yield put(addSubLocationFail(error));
  }
}

function* sublocationSaga() {
  yield takeEvery(GET_SUBLOCATION, fetchSublocation);
  yield takeEvery(ADD_SUBLOCATION, onAddSubLocation);
  yield takeEvery(UPDATE_SUBLOCATION, onUpdateSubLocation);
}

export default sublocationSaga;
