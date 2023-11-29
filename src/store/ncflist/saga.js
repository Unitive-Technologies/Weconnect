import { call, put, takeEvery } from "redux-saga/effects";

import { GET_NCF } from "./actionTypes";

import { getNcfSuccess, getNcfFail } from "./actions";

//Include Both Helper File with needed methods
import { getNcf } from "../../helpers/fakebackend_helper";

const convertNcfListObject = (ncflist) => {
  // Location list has more data than what we need, we need to convert each of the location object in the list with needed colums of the table
  return ncflist.map((ncf) => {
    return {
      ...ncf,
      id: ncf.id,
      name: ncf.name,
      code: ncf.code,
      status:
        ncf.status === 1 ? "ACTIVE" : ncf.status === 0 ? "INACTIVE" : "BLOCKED",
      from_channel_no: ncf.from_channel_no,
      to_channel_no: ncf.to_channel_no,
      mrp: ncf.mrp,
      lmo_discount: ncf.lmo_discount,
      lmo_rate: ncf.lmo_rate,
      calculate_per_channel: ncf.calculate_per_channel,
      is_refundable: ncf.is_refundable === 1 ? "Yes" : "No",
      created_at: ncf.created_at,
      created_by: ncf.created_by === -1 ? "console" : "other",
    };
  });
};

function* fetchNcf() {
  try {
    const response = yield call(getNcf);
    console.log("response:" + JSON.stringify(response));
    const ncfList = convertNcfListObject(response);
    yield put(getNcfSuccess(ncfList));
  } catch (error) {
    yield put(getNcfFail(error));
  }
}

function* ncfSaga() {
  yield takeEvery(GET_NCF, fetchNcf);
}

export default ncfSaga;
