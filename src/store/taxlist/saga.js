import { call, put, takeEvery } from "redux-saga/effects";

import { GET_TAX, UPDATE_TAX, GET_TAX_STATUS, GET_TAX_APPLY, GET_TAX_VALUES, GET_TAX_TAXONTAX, ADD_NEW_TAXLIST } from "./actionTypes";

import { getTaxSuccess, getTaxFail, updateTaxSuccess, updateTaxFail, getTaxStatusSuccess, getTaxStatusFail, getTaxValuesSuccess, getTaxValuesFail, getTaxApplySuccess, getTaxApplyFail, getTaxTaxOnTaxSuccess, getTaxTaxOnTaxFail, addTaxListSuccess, addTaxListFail } from "./actions";

//Include Both Helper File with needed methods
import { getTax, updateTax, getTaxStatus, getTaxApply, getTaxTaxOnTax, getTaxValues, addNewTaxList } from "../../helpers/fakebackend_helper";

const convertTaxListObject = (taxList) => {
  return taxList.map((tax) => {
    return {
      ...tax,
      id: tax.id,
      name: tax.name,
      code: tax.code,
      taxvalue: tax.taxvalue,
      status: tax.status,
      valuetype: tax.valuetype,
      parent_id: tax.parent_id,
      applicableon: tax.applicableon,
      description: tax.description,
      created_at: tax.created_at,
      created_by: tax.created_by,
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


function* onUpdateTax({ payload: tax }) {
  console.log("Tax in onUpdate:" + JSON.stringify(tax));
  try {
    const response = yield call(
      updateTax,
      tax.id,
      tax,
    );
    yield put(updateTaxSuccess(response));
    console.log("update response:" + JSON.stringify(response));
  } catch (error) {
    yield put(updateTaxFail(error));
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
  yield takeEvery(UPDATE_TAX, onUpdateTax);
}

export default taxSaga;
