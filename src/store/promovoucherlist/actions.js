import {
  GET_PROMOVOUCHER,
  GET_PROMOVOUCHER_FAIL,
  GET_PROMOVOUCHER_SUCCESS,
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
