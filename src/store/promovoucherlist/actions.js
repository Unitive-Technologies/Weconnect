import {
  GET_PROMOVOUCHER,
  GET_PROMOVOUCHER_FAIL,
  GET_PROMOVOUCHER_SUCCESS,
  ADD_NEW_PROMOVOUCHER,
  ADD_PROMOVOUCHER_SUCCESS,
  ADD_PROMOVOUCHER_FAIL,
  GET_PROMOVOUCHER_LCO,
  GET_PROMOVOUCHER_LCO_FAIL,
  GET_PROMOVOUCHER_LCO_SUCCESS,
  GET_PROMOVOUCHER_APPLY,
  GET_PROMOVOUCHER_APPLY_FAIL,
  GET_PROMOVOUCHER_APPLY_SUCCESS,
  GET_PROMOVOUCHER_RECHARGE,
  GET_PROMOVOUCHER_RECHARGE_FAIL,
  GET_PROMOVOUCHER_RECHARGE_SUCCESS,
  GET_PROMOVOUCHER_BOUQUET,
  GET_PROMOVOUCHER_BOUQUET_FAIL,
  GET_PROMOVOUCHER_BOUQUET_SUCCESS,
} from "./actionTypes";

export const getPromoVoucher = () => ({
  type: GET_PROMOVOUCHER,
});

export const getPromoVoucherSuccess = (promovoucher) => {
  console.log("Received promo voucher list:", promovoucher);
  return {
    type: GET_PROMOVOUCHER_SUCCESS,
    payload: promovoucher,
  };
};

export const getPromoVoucherFail = (error) => ({
  type: GET_PROMOVOUCHER_FAIL,
  payload: error,
});

export const getPromoVoucherLCO = () => ({
  type: GET_PROMOVOUCHER_LCO,
});

export const getPromoVoucherLCOSuccess = (promovoucherLCO) => {

  return {
    type: GET_PROMOVOUCHER_LCO_SUCCESS,
    payload: promovoucherLCO,
  };
};

export const getPromoVoucherLCOFail = (error) => ({
  type: GET_PROMOVOUCHER_LCO_FAIL,
  payload: error,
});

export const getPromoVoucherApply = () => ({
  type: GET_PROMOVOUCHER_APPLY,
});

export const getPromoVoucherApplySuccess = (promovoucherApply) => {

  return {
    type: GET_PROMOVOUCHER_APPLY_SUCCESS,
    payload: promovoucherApply,
  };
};

export const getPromoVoucherApplyFail = (error) => ({
  type: GET_PROMOVOUCHER_APPLY_FAIL,
  payload: error,
});

export const getPromoVoucherRecharge = () => ({
  type: GET_PROMOVOUCHER_RECHARGE,
});

export const getPromoVoucherRechargeSuccess = (promovoucherRecharge) => {

  return {
    type: GET_PROMOVOUCHER_RECHARGE_SUCCESS,
    payload: promovoucherRecharge,
  };
};

export const getPromoVoucherRechargeFail = (error) => ({
  type: GET_PROMOVOUCHER_RECHARGE_FAIL,
  payload: error,
});

export const getPromoVoucherBouquet = () => ({
  type: GET_PROMOVOUCHER_BOUQUET,
});

export const getPromoVoucherBouquetSuccess = (promovoucherBouquet) => {

  return {
    type: GET_PROMOVOUCHER_BOUQUET_SUCCESS,
    payload: promovoucherBouquet,
  };
};

export const getPromoVoucherBouquetFail = (error) => ({
  type: GET_PROMOVOUCHER_BOUQUET_FAIL,
  payload: error,
});

export const addNewPromoVoucher = (
  promovoucher
) => ({
  type: ADD_NEW_PROMOVOUCHER,
  payload: promovoucher,
});

export const addPromoVoucherSuccess = (
  promovoucher
) => ({
  type: ADD_PROMOVOUCHER_SUCCESS,
  payload: promovoucher,
});

export const addPromoVoucherFail = (error) => ({
  type: ADD_PROMOVOUCHER_FAIL,
  payload: error,
});