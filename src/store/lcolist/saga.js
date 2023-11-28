import { call, put, takeEvery } from "redux-saga/effects";

import { GET_LCO } from "./actionTypes";

import { getLcoSuccess, getLcoFail } from "./actions";

//Include Both Helper File with needed methods
import { getLco } from "../../helpers/fakebackend_helper";

const convertLcoListObject = (LcoList) => {
  // Notification Template has more data than what we need, we need to convert each of the Notification Template user object in the list with needed colums of the table
  return LcoList.map((lco) => {
    return {
      ...lco,
      id: lco.id,
      name: lco.name,
      code: lco.code,
      contact_person: lco.contact_person,
      addr: lco.addr,
      mobile_no: lco.mobile_no,
      state_lbl: lco.state_lbl,
      district_lbl: lco.district_lbl,
      created_at: lco.created_at,
      created_by: lco.created_by,
      city_lbl: lco.city_lbl,
      gstno: lco.gstno,
      panno: lco.panno,
      username: lco.username,
      distributor_lbl: lco.distributor_lbl,
      branch_code_lbl: lco.branch_code_lbl,
      branch_lbl: lco.branch_lbl,
      balance: lco.balance,
      status:
        lco.status === 1 ? "ACTIVE" : lco.status === 0 ? "INACTIVE" : "BLOCKED",
    };
  });
};

function* fetchLco() {
  try {
    const response = yield call(getLco);
    const lcoList = convertLcoListObject(response);
    yield put(getLcoSuccess(lcoList));
  } catch (error) {
    console.error("Error fetching LCO list:", error);
    yield put(getLcoFail(error));
  }
}

function* lcoSaga() {
  yield takeEvery(GET_LCO, fetchLco);
}

export default lcoSaga;
