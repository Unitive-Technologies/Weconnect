import { call, put, takeEvery } from "redux-saga/effects";

import { GET_BANK, GET_BANK_STATUS, ADD_NEW_BANK } from "./actionTypes";

import {
  getBankSuccess, getBankFail, getBankStatusFail,
  getBankStatusSuccess, addBankSuccess, addBankFail
} from "./actions";

//Include Both Helper File with needed methods
import { getBank, getBankStatus, addNewBank } from "../../helpers/fakebackend_helper";

const convertBankListObject = (bankList) => {
  // Notification Template has more data than what we need, we need to convert each of the Notification Template user object in the list with needed colums of the table
  return bankList.map((bank) => {
    return {
      ...bank,
      id: bank.id,
      name: bank.name,
      code: bank.code,
      ifscode: bank.ifscode,
      branch: bank.branch,
      address: bank.address,
      ismso: bank.ismso,
      created_at: bank.created_at,
      created_by: bank.created_by,
      status: bank.status,
    };
  });
};

function* fetchBank() {
  try {
    const response = yield call(getBank);
    console.log("Bank response:" + JSON.stringify(response));
    yield put(getBankSuccess(response.data));
  } catch (error) {
    yield put(getBankFail(error));
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
    toast.success("Bank Added Successfully", { autoClose: 2000 });
  } catch (error) {
    yield put(addBankFail(error));
    toast.error("Bank Added Failed", { autoClose: 2000 });
  }
}

function* bankSaga() {
  yield takeEvery(GET_BANK, fetchBank);
  yield takeEvery(ADD_NEW_BANK, onAddNewBank);
  yield takeEvery(GET_BANK_STATUS, fetchBankStatus);
}

export default bankSaga;
