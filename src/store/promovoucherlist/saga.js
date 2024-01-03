import { call, put, takeEvery } from "redux-saga/effects";

import { GET_PROMOVOUCHER, GET_PROMOVOUCHER_LCO, GET_PROMOVOUCHER_APPLY, GET_PROMOVOUCHER_BOUQUET, GET_PROMOVOUCHER_RECHARGE, ADD_NEW_PROMOVOUCHER } from "./actionTypes";

import {
  getPromoVoucherSuccess,
  getPromoVoucherFail,
  getPromoVoucherLCOFail,
  getPromoVoucherLCOSuccess, getPromoVoucherApplyFail, getPromoVoucherApplySuccess, getPromoVoucherBouquetFail, getPromoVoucherBouquetSuccess, getPromoVoucherRechargeFail, getPromoVoucherRechargeSuccess, addPromoVoucherFail,
  addPromoVoucherSuccess,
} from "./actions";

//Include Both Helper File with needed methods
import { getPromoVoucher, getPromoVoucherApply, getPromoVoucherLCO, getPromoVoucherBouquet, getPromoVoucherRecharge, addNewPromoVoucher } from "../../helpers/fakebackend_helper";

const convertPromoVoucherListObject = (promoVoucherList) => {

  return promoVoucherList.map((promovoucher) => {
    return {
      ...promovoucher,
      id: promovoucher.id,
      operator: promovoucher.operator,
      operator_code: promovoucher.operator_code,
      voucher_code: promovoucher.voucher_code,
      expiry_date: promovoucher.expiry_date,
      applied_on: promovoucher.applied_on,
      recharge_period: promovoucher.recharge_period,
      amount: promovoucher.amount,
      mrp: promovoucher.mrp,
      bouquets: promovoucher.bouquets,
      smartcard_no: promovoucher.smartcard_no,
      stb_no: promovoucher.stb_no,
      created_at_lbl: promovoucher.created_at_lbl,
      created_by_lbl: promovoucher.created_by_lbl,
      status_lbl: promovoucher.status_lbl,
    };
  });
};

function* fetchPromoVoucher() {
  try {
    const response = yield call(getPromoVoucher);
    console.log("Promo Voucher response:" + JSON.stringify(response));
    // const promoVoucherList = convertPromoVoucherListObject(response);
    yield put(getPromoVoucherSuccess(response.data));
  } catch (error) {
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

    yield put(addPromoVoucherSuccess(response));
    toast.success("Promo Voucher Added Successfully", { autoClose: 2000 });
  } catch (error) {
    yield put(addPromoVoucherFail(error));
    toast.error("PromoVoucher Added Failed", { autoClose: 2000 });
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
