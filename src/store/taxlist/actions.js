import { GET_TAX, GET_TAX_FAIL, GET_TAX_SUCCESS } from "./actionTypes";

export const getTax = () => ({
  type: GET_TAX,
});

export const getTaxSuccess = (tax) => {
  console.log("Received tax list:", tax);
  return {
    type: GET_TAX_SUCCESS,
    payload: tax,
  };
};

export const getTaxFail = (error) => ({
  type: GET_TAX_FAIL,
  payload: error,
});
