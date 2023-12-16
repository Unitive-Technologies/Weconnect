import {
  GET_PROMOVOUCHER,
  GET_PROMOVOUCHER_FAIL,
  GET_PROMOVOUCHER_SUCCESS,
  ADD_NEW_PROMOVOUCHER,
  ADD_PROMOVOUCHER_SUCCESS,
  ADD_PROMOVOUCHER_FAIL,
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