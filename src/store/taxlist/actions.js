import {
  GET_TAX, GET_TAX_FAIL, GET_TAX_SUCCESS, ADD_NEW_TAXLIST,
  ADD_TAXLIST_SUCCESS,
  ADD_TAXLIST_FAIL,
} from "./actionTypes";

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

export const addNewTaxList = (
  tax
) => ({
  type: ADD_NEW_TAXLIST,
  payload: tax,
});

export const addTaxListSuccess = (
  tax
) => ({
  type: ADD_TAXLIST_SUCCESS,
  payload: tax,
});

export const addTaxListFail = (error) => ({
  type: ADD_TAXLIST_FAIL,
  payload: error,
});