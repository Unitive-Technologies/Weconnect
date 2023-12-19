import { call, put, takeEvery } from "redux-saga/effects";
import { GET_NCF, ADD_NCF } from "./actionTypes";
import {
  getNcfSuccess,
  getNcfFail,
  addNcfSuccess,
  addNcfFail,
} from "./actions";
import { getNcf, addNcf } from "../../helpers/fakebackend_helper";

const convertNcfListObject = (ncflist) => {
  return ncflist.map((ncf) => {
    return {
      ...ncf,
      id: ncf.id,
      name: ncf.name,
      code: ncf.code,
      status: ncf.status === 1 ? "Active" : "In_active",
      from_channel_no: ncf.from_channel_no,
      to_channel_no: ncf.to_channel_no,
      mrp: ncf.mrp,
      lmo_discount: ncf.lmo_discount,
      lmo_rate: ncf.lmo_rate,
      calculate_per_channel: ncf.calculate_per_channel === 0 ? "Yes" : "No",
      is_refundable: ncf.is_refundable === 1 ? "Yes" : "No",
      created_at: ncf.created_at,
      created_by: ncf.created_by === -1 ? "console" : "other",
      status_lbl: ncf.status_lbl,
    };
  });
};

function* fetchNcf() {
  try {
    const response = yield call(getNcf);
    console.log("response:" + JSON.stringify(response.data));
    const ncfList = convertNcfListObject(response.data);
    yield put(getNcfSuccess(ncfList));
  } catch (error) {
    yield put(getNcfFail(error));
  }
}

function* onAddNcf({ payload: ncf }) {
  try {
    const response = yield call(addNcf, ncf);
    yield put(addNcfSuccess(response));
  } catch (error) {
    yield put(addNcfFail(error));
  }
}

function* ncfSaga() {
  yield takeEvery(GET_NCF, fetchNcf);
  yield takeEvery(ADD_NCF, onAddNcf);
}

export default ncfSaga;
