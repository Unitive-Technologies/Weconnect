import { call, put, select, takeEvery } from "redux-saga/effects";

import {
  GET_PROMOVOUCHER,
  GET_PROMOVOUCHER_LCO,
  GET_PROMOVOUCHER_APPLY,
  GET_PROMOVOUCHER_BOUQUET,
  GET_PROMOVOUCHER_RECHARGE,
  ADD_NEW_PROMOVOUCHER,
} from "./actionTypes";

import {
  getPromoVoucherSuccess,
  getPromoVoucherFail,
  getPromoVoucherLCOFail,
  getPromoVoucherLCOSuccess,
  getPromoVoucherApplyFail,
  getPromoVoucherApplySuccess,
  getPromoVoucherBouquetFail,
  getPromoVoucherBouquetSuccess,
  getPromoVoucherRechargeFail,
  getPromoVoucherRechargeSuccess,
  addPromoVoucherFail,
  addPromoVoucherSuccess,
} from "./actions";

//Include Both Helper File with needed methods
import {
  getPromoVoucher,
  getPromoVoucherApply,
  getPromoVoucherLCO,
  getPromoVoucherBouquet,
  getPromoVoucherRecharge,
  addNewPromoVoucher,
} from "../../helpers/fakebackend_helper";

export const getPromoVoucherStore = (state) => state.promovoucher;

function* fetchPromoVoucher() {
  try {
    let PromoVoucherStore = yield select(getPromoVoucherStore);

    const pageSize = PromoVoucherStore.pageSize;
    const currentPage = PromoVoucherStore.currentPage;

    const response = yield call(getPromoVoucher, currentPage, pageSize);
    console.log("Response from API -", response);
    debugger;
    yield put(getPromoVoucherSuccess(response));
  } catch (error) {
    console.error("Error fetching Reason list:", error);
    yield put(getPromoVoucherFail(error));
  }
}

function* fetchPromoVoucherLCO() {
  try {
    const response = yield call(getPromoVoucherLCO);
    console.log("Promo Voucher LCO response:" + JSON.stringify(response));
    yield put(getPromoVoucherLCOSuccess(response.data));
  } catch (error) {
    yield put(getPromoVoucherLCOFail(error));
  }
}

function* fetchPromoVoucherApply() {
  try {
    const response = yield call(getPromoVoucherApply);
    console.log("Promo Voucher Apply response:" + JSON.stringify(response));
    yield put(getPromoVoucherApplySuccess(response.data));
  } catch (error) {
    yield put(getPromoVoucherApplyFail(error));
  }
}

function* fetchPromoVoucherRecharge() {
  try {
    const response = yield call(getPromoVoucherRecharge);
    console.log("Promo Voucher Recharge response:" + JSON.stringify(response));
    yield put(getPromoVoucherRechargeSuccess(response.data));
  } catch (error) {
    yield put(getPromoVoucherRechargeFail(error));
  }
}

function* fetchPromoVoucherBouquet() {
  try {
    const response = yield call(getPromoVoucherBouquet);
    console.log("Promo Voucher Bouquet response:" + JSON.stringify(response));
    yield put(getPromoVoucherBouquetSuccess(response.data));
  } catch (error) {
    yield put(getPromoVoucherBouquetFail(error));
  }
}

function* onAddNewPromoVoucher({ payload: promovoucher }) {
  try {
    const response = yield call(addNewPromoVoucher, promovoucher);
    console.log("response in saga:" + JSON.stringify(response));
    yield put(addPromoVoucherSuccess(response));
    // toast.success("Promo Voucher Added Successfully", { autoClose: 2000 });
  } catch (error) {
    yield put(addPromoVoucherFail(error));
    // toast.error("PromoVoucher Added Failed", { autoClose: 2000 });
  }
}

function* promoVoucherSaga() {
  yield takeEvery(GET_PROMOVOUCHER, fetchPromoVoucher);
  yield takeEvery(GET_PROMOVOUCHER_LCO, fetchPromoVoucherLCO);
  yield takeEvery(GET_PROMOVOUCHER_APPLY, fetchPromoVoucherApply);
  yield takeEvery(GET_PROMOVOUCHER_RECHARGE, fetchPromoVoucherRecharge);
  yield takeEvery(GET_PROMOVOUCHER_BOUQUET, fetchPromoVoucherBouquet);
  yield takeEvery(ADD_NEW_PROMOVOUCHER, onAddNewPromoVoucher);
}

export default promoVoucherSaga;
