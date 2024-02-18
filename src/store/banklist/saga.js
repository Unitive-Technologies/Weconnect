import { call, put, select, takeEvery } from "redux-saga/effects";

import {
  GET_BANK,
  UPDATE_BANK,
  GET_BANK_STATUS,
  ADD_NEW_BANK,
} from "./actionTypes";

import {
  getBank as fetchbanks,
  getBankSuccess,
  getBankFail,
  updateBankSuccess,
  updateBankFail,
  getBankStatusFail,
  getBankStatusSuccess,
  addBankSuccess,
  addBankFail,
} from "./actions";

//Include Both Helper File with needed methods
import {
  getBank,
  updateBank,
  getBankStatus,
  addNewBank,
} from "../../helpers/backend_helper";

export const getBankStore = (state) => state.bank;

function* fetchBank() {
  try {
    let BankStore = yield select(getBankStore);

    const pageSize = BankStore.pageSize;
    const currentPage = BankStore.currentPage;

    const response = yield call(getBank, currentPage, pageSize);
    console.log("Response from API -", response);
    // debugger;
    yield put(getBankSuccess(response));
  } catch (error) {
    console.error("Error fetching Bank list:", error);
    yield put(getBankFail(error));
  }
}
function* onUpdateBank({ payload: bank }) {
  console.log("Bank in onUpdate:" + JSON.stringify(bank));
  try {
    const response = yield call(updateBank, bank.id, bank);
    yield put(updateBankSuccess(response));
    console.log("update response:" + JSON.stringify(response));
    yield put(fetchbanks());
  } catch (error) {
    yield put(updateBankFail(error));
  }
}

function* fetchBankStatus() {
  try {
    const response = yield call(getBankStatus);
    console.log("Bank status response:" + JSON.stringify(response));
    yield put(getBankStatusSuccess(response.data));
  } catch (error) {
    yield put(getBankStatusFail(error));
  }
}

function* onAddNewBank({ payload: bank }) {
  try {
    const response = yield call(addNewBank, bank);
    yield put(addBankSuccess(response));
    // toast.success("Bank Added Successfully", { autoClose: 2000 });
    yield put(fetchbanks());
  } catch (error) {
    yield put(addBankFail(error));
    // toast.error("Bank Added Failed", { autoClose: 2000 });
  }
}

function* bankSaga() {
  yield takeEvery(GET_BANK, fetchBank);
  yield takeEvery(UPDATE_BANK, onUpdateBank);
  yield takeEvery(ADD_NEW_BANK, onAddNewBank);
  yield takeEvery(GET_BANK_STATUS, fetchBankStatus);
}

export default bankSaga;
