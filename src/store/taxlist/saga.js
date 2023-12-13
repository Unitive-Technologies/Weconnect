import { call, put, takeEvery } from "redux-saga/effects";

import { GET_TAX, ADD_NEW_TAXLIST } from "./actionTypes";

import { getTaxSuccess, getTaxFail, addTaxListSuccess, addTaxListFail } from "./actions";

//Include Both Helper File with needed methods
import { getTax, addNewTaxList } from "../../helpers/fakebackend_helper";

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

function* onAddNewTaxList({ payload: tax }) {
  try {
    const response = yield call(addNewTaxList, tax);
    yield put(addTaxListSuccess(response));
    toast.success("Tax List Added Successfully", { autoClose: 2000 });
  } catch (error) {
    yield put(addTaxListFail(error));
    toast.error("Tax List Added Failed", { autoClose: 2000 });
  }
}

function* taxSaga() {
  yield takeEvery(GET_TAX, fetchTax);
  yield takeEvery(ADD_NEW_TAXLIST, onAddNewTaxList);
}

export default taxSaga;
