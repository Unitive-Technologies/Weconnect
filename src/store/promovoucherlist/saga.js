import { call, put, takeEvery } from "redux-saga/effects";

import { GET_PROMOVOUCHER } from "./actionTypes";

import { getPromoVoucherSuccess, getPromoVoucherFail } from "./actions";

//Include Both Helper File with needed methods
import { getPromoVoucher } from "../../helpers/fakebackend_helper";

const convertPromoVoucherListObject = (promoVoucherList) => {
  // customer user list has more data than what we need, we need to convert each of the customer user object in the list with needed colums of the table
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
    console.log("response:" + JSON.stringify(response));
    const promoVoucherList = convertPromoVoucherListObject(response);
    yield put(getPromoVoucherSuccess(promoVoucherList));
  } catch (error) {
    yield put(getPromoVoucherFail(error));
  }
}

function* promoVoucherSaga() {
  yield takeEvery(GET_PROMOVOUCHER, fetchPromoVoucher);
}

export default promoVoucherSaga;
