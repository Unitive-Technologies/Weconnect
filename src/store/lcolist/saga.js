import { call, put, select, takeEvery } from "redux-saga/effects";

import {
  GET_LCO,
  GET_LCO_BILLEDBY,
  GET_LCO_STATUS,
  GET_LCO_PHASE,
  GET_LCO_STATES,
  GET_LCO_CUSTOMERPORTAL,
  GET_LCO_PARENTDISTRIBUTOR,
  GET_SINGLE_LCO,
  ADD_NEW_LCO,
  UPDATE_LCO,
  GET_LCO_PAYMENTMODE,
  GET_LCO_ADDCREDIT,
} from "./actionTypes";

import {
  getLco as fetchAllLco,
  getLcoSuccess,
  getLcoFail,
  getLcoBilledbySuccess,
  getLcoBilledbyFail,
  getLcoStatusSuccess,
  getLcoStatusFail,
  getLcoPhaseSuccess,
  getLcoPhaseFail,
  getLcoStatesSuccess,
  getLcoStatesFail,
  getLcoCustomerPortalSuccess,
  getLcoCustomerPortalFail,
  getLcoParentDistributorSuccess,
  getLcoParentDistributorFail,
  getSingleLcoSuccess,
  getSingleLcoFail,
  addLcoFail,
  addLcoSuccess,
  updateLcoSuccess,
  updateLcoFail,
  getLcoPaymentmodeSuccess,
  getLcoPaymentmodeFail,
  getLcoAddcreditSuccess,
  getLcoAddcreditFail,
} from "./actions";

//Include Both Helper File with needed methods
import {
  getLco,
  getLcoBilledby,
  getLcoStatus,
  getLcoPhase,
  getLcoStates,
  getLcoCustomerPortal,
  getLcoParentDistributor,
  addNewLco,
  updateLco,
  getSingleLco,
  getLcoPaymentmode,
  getLcoAddcredit,
} from "../../helpers/backend_helper";

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

export const getLcoStore = (state) => state.lco;

function* fetchLco() {
  try {
    let lcoStore = yield select(getLcoStore);

    const pageSize = lcoStore.pageSize;
    const currentPage = lcoStore.currentPage;
    console.log("currentPage in saga -", pageSize);
    console.log("pageSize in saga -", currentPage);

    const response = yield call(getLco, currentPage, pageSize);
    console.log("Response from API -", response);
    // debugger;
    yield put(getLcoSuccess(response));
  } catch (error) {
    console.error("Error fetching lco list:", error);
    yield put(getLcoFail(error));
  }
}

function* fetchLcoBilledby() {
  try {
    const response = yield call(getLcoBilledby);
    yield put(getLcoBilledbySuccess(response.data));
  } catch (error) {
    yield put(getLcoBilledbyFail(error));
  }
}

function* fetchLcoStatus() {
  try {
    const response = yield call(getLcoStatus);
    yield put(getLcoStatusSuccess(response.data));
  } catch (error) {
    yield put(getLcoStatusFail(error));
  }
}

function* fetchLcoPhase() {
  try {
    const response = yield call(getLcoPhase);
    yield put(getLcoPhaseSuccess(response.data));
  } catch (error) {
    yield put(getLcoPhaseFail(error));
  }
}

function* fetchLcoStates() {
  try {
    const response = yield call(getLcoStates);
    yield put(getLcoStatesSuccess(response.data));
  } catch (error) {
    yield put(getLcoStatesFail(error));
  }
}

function* fetchLcoCustomerPortal() {
  try {
    const response = yield call(getLcoCustomerPortal);
    yield put(getLcoCustomerPortalSuccess(response.data));
  } catch (error) {
    yield put(getLcoCustomerPortalFail(error));
  }
}

function* fetchLcoParentDistributor() {
  try {
    const response = yield call(getLcoParentDistributor);
    yield put(getLcoParentDistributorSuccess(response.data));
  } catch (error) {
    yield put(getLcoParentDistributorFail(error));
  }
}

function* onAddNewLco({ payload: lco }) {
  try {
    const response = yield call(addNewLco, lco);

    yield put(addLcoSuccess(response));
    yield put(fetchAllLco());
    // toast.success("LCO Added Successfully", { autoClose: 2000 });
  } catch (error) {
    yield put(addLcoFail(error));
    // toast.error("LCOAdded Failed", { autoClose: 2000 });
  }
}

function* onUpdateLco({ payload: lco }) {
  try {
    const response = yield call(updateLco, lco, lco.id);
    yield put(updateLcoSuccess(response));
    yield put(fetchAllLco());
    // toast.success("LCO Updated Successfully", { autoClose: 2000 });
  } catch (error) {
    yield put(updateLcoFail(error));
    // toast.error("LCO Updated Failed", { autoClose: 2000 });
  }
}

function* onGetSingleLco({ payload: lco }) {
  try {
    const response = yield call(getSingleLco, lco.id);
    console.log(
      "response in saga to get single lco: " + JSON.stringify(response.data)
    );
    yield put(getSingleLcoSuccess(response.data));
  } catch (error) {
    yield put(getSingleLcoFail(error));
  }
}

function* fetchLcoPaymentmode() {
  try {
    const response = yield call(getLcoPaymentmode);
    yield put(getLcoPaymentmodeSuccess(response.data));
  } catch (error) {
    yield put(getLcoPaymentmodeFail(error));
  }
}

export const getLcocreditStore = (state) => state.lcoaddcredit;

function* fetchLcoAddcredit() {
  try {
    let lcocreditStore = yield select(getLcocreditStore);

    const pageSize = lcocreditStore.pageSize;
    const currentPage = lcocreditStore.currentPage;
    console.log("currentPage in credit saga -", pageSize);
    console.log("pageSize in credit saga -", currentPage);

    const response = yield call(getLcoAddcredit, currentPage, pageSize);
    console.log("Credit Response from API -", response);
    // debugger;
    yield put(getLcoAddcreditSuccess(response));
  } catch (error) {
    console.error("Error fetching lco credit list:", error);
    yield put(getLcoAddcreditFail(error));
  }
}

function* lcoSaga() {
  yield takeEvery(GET_LCO, fetchLco);
  yield takeEvery(GET_LCO_BILLEDBY, fetchLcoBilledby);
  yield takeEvery(GET_LCO_STATUS, fetchLcoStatus);
  yield takeEvery(GET_LCO_PHASE, fetchLcoPhase);
  yield takeEvery(GET_LCO_STATES, fetchLcoStates);
  yield takeEvery(GET_LCO_CUSTOMERPORTAL, fetchLcoCustomerPortal);
  yield takeEvery(GET_LCO_PARENTDISTRIBUTOR, fetchLcoParentDistributor);
  yield takeEvery(ADD_NEW_LCO, onAddNewLco);
  yield takeEvery(UPDATE_LCO, onUpdateLco);
  yield takeEvery(GET_SINGLE_LCO, onGetSingleLco);
  yield takeEvery(GET_LCO_PAYMENTMODE, fetchLcoPaymentmode);
  yield takeEvery(GET_LCO_ADDCREDIT, fetchLcoAddcredit);
}

export default lcoSaga;
