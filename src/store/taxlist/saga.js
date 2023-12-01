import { call, put, takeEvery } from "redux-saga/effects";

import { GET_TAX } from "./actionTypes";

import { getTaxSuccess, getTaxFail } from "./actions";

//Include Both Helper File with needed methods
import { getTax } from "../../helpers/fakebackend_helper";

const convertTaxListObject = (taxList) => {
  // customer user list has more data than what we need, we need to convert each of the customer user object in the list with needed colums of the table
  return taxList.map((tax) => {
    return {
      ...tax,
      id: tax.id,
      name: tax.name,
      code: tax.code,
      taxvalue: tax.taxvalue,
      valuetype_lbl: tax.valuetype_lbl,
      parent_lbl: tax.parent_lbl,
      designation: tax.designation,
      created_at: tax.created_at,
      created_by_lbl: tax.created_by_lbl,
      status_lbl: tax.status_lbl,
    };
  });
};

function* fetchTax() {
  try {
    const response = yield call(getTax);
    console.log("response:" + JSON.stringify(response));
    const taxList = convertTaxListObject(response);
    yield put(getTaxSuccess(taxList));
  } catch (error) {
    yield put(getTaxFail(error));
  }
}

function* taxSaga() {
  yield takeEvery(GET_TAX, fetchTax);
}

export default taxSaga;
