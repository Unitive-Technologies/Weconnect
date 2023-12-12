import { call, put, takeEvery } from "redux-saga/effects";

import { GET_LCO, ADD_NEW_LCO, UPDATE_LCO } from "./actionTypes";

import {
  getLcoSuccess,
  getLcoFail,
  addLcoFail,
  addLcoSuccess,
  updateLcoSuccess,
  updateLcoFail,
} from "./actions";

//Include Both Helper File with needed methods
import { getLco, addNewLco, updateLco } from "../../helpers/fakebackend_helper";

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

function* onAddNewLco({ payload: lco }) {
  try {
    const response = yield call(addNewLco, lco);

    yield put(addLcoSuccess(response));
    toast.success("LCO Added Successfully", { autoClose: 2000 });
  } catch (error) {
    yield put(addLcoFail(error));
    toast.error("LCOAdded Failed", { autoClose: 2000 });
  }
}

function* onUpdateLco({ payload: lco }) {
  try {
    const response = yield call(updateLco, lco);
    yield put(updateLcoSuccess(response));
    toast.success("LCO Updated Successfully", { autoClose: 2000 });
  } catch (error) {
    yield put(updateLcoFail(error));
    toast.error("LCO Updated Failed", { autoClose: 2000 });
  }
}

function* lcoSaga() {
  yield takeEvery(GET_LCO, fetchLco);
  yield takeEvery(ADD_NEW_LCO, onAddNewLco);
  yield takeEvery(UPDATE_LCO, onUpdateLco);
}

export default lcoSaga;
