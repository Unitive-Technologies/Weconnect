import { call, put, takeEvery } from "redux-saga/effects";

import { GET_TAX, GET_TAX_STATUS, GET_TAX_APPLY, GET_TAX_VALUES, GET_TAX_TAXONTAX, ADD_NEW_TAXLIST } from "./actionTypes";

import { getTaxSuccess, getTaxFail, getTaxStatusSuccess, getTaxStatusFail, getTaxValuesSuccess, getTaxValuesFail, getTaxApplySuccess, getTaxApplyFail, getTaxTaxOnTaxSuccess, getTaxTaxOnTaxFail, addTaxListSuccess, addTaxListFail } from "./actions";

//Include Both Helper File with needed methods
import { getTax, getTaxStatus, getTaxApply, getTaxTaxOnTax, getTaxValues, addNewTaxList } from "../../helpers/fakebackend_helper";

const convertTaxListObject = (taxList) => {
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
    // const taxList = convertTaxListObject(response);
    yield put(getTaxSuccess(response.data));
  } catch (error) {
    yield put(getTaxFail(error));
  }
}

function* fetchTaxStatus() {
  try {
    const response = yield call(getTaxStatus);
    console.log("tax status response:" + JSON.stringify(response));
    yield put(getTaxStatusSuccess(response.data));
  } catch (error) {
    yield put(getTaxStatusFail(error));
  }
}

function* fetchTaxValues() {
  try {
    const response = yield call(getTaxValues);
    console.log("tax values response:" + JSON.stringify(response));
    yield put(getTaxValuesSuccess(response.data));
  } catch (error) {
    yield put(getTaxValuesFail(error));
  }
}

function* fetchTaxApply() {
  try {
    const response = yield call(getTaxApply);
    console.log("tax apply response:" + JSON.stringify(response));
    yield put(getTaxApplySuccess(response.data));
  } catch (error) {
    yield put(getTaxApplyFail(error));
  }
}

function* fetchTaxTaxOnTax() {
  try {
    const response = yield call(getTaxTaxOnTax);
    console.log("tax taxontax response:" + JSON.stringify(response));
    yield put(getTaxTaxOnTaxSuccess(response.data));
  } catch (error) {
    yield put(getTaxTaxOnTaxFail(error));
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
  yield takeEvery(GET_TAX_STATUS, fetchTaxStatus);
  yield takeEvery(GET_TAX_VALUES, fetchTaxValues);
  yield takeEvery(GET_TAX_APPLY, fetchTaxApply);
  yield takeEvery(GET_TAX_TAXONTAX, fetchTaxTaxOnTax);
}

export default taxSaga;
