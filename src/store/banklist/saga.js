import { call, put, takeEvery } from "redux-saga/effects";

import { GET_BANK } from "./actionTypes";

import { getBankSuccess, getBankFail } from "./actions";

//Include Both Helper File with needed methods
import { getBank } from "../../helpers/fakebackend_helper";

const convertBankListObject = (bankList) => {
  // Notification Template has more data than what we need, we need to convert each of the Notification Template user object in the list with needed colums of the table
  return bankList.map((bank) => {
    return {
      ...bank,
      id: bank.id,
      name: bank.name,
      code: bank.code,
      ifsc_code: bank.ifsc_code,
      branch: bank.branch,
      branch_address: bank.branch_address,
      formso: bank.formso,
      created_at: bank.created_at,
      created_by: bank.created_by,
      status_lbl: bank.status_lbl,
    };
  });
};

function* fetchBank() {
  try {
    const response = yield call(getBank);
    const bankList = convertBankListObject(response);
    yield put(getBankSuccess(bankList));
  } catch (error) {
    console.error("Error fetching bank list:", error);
    yield put(getBankFail(error));
  }
}

function* bankSaga() {
  yield takeEvery(GET_BANK, fetchBank);
}

export default bankSaga;
