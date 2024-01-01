import {
  GET_TAX, GET_TAX_FAIL, GET_TAX_SUCCESS, ADD_NEW_TAXLIST,
  ADD_TAXLIST_SUCCESS,
  ADD_TAXLIST_FAIL,
  GET_TAX_STATUS,
  GET_TAX_STATUS_FAIL,
  GET_TAX_STATUS_SUCCESS,
  GET_TAX_VALUES,
  GET_TAX_VALUES_FAIL,
  GET_TAX_VALUES_SUCCESS,
  GET_TAX_APPLY,
  GET_TAX_APPLY_FAIL,
  GET_TAX_APPLY_SUCCESS,
  GET_TAX_TAXONTAX,
  GET_TAX_TAXONTAX_FAIL,
  GET_TAX_TAXONTAX_SUCCESS,

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

export const getTaxStatus = () => ({
  type: GET_TAX_STATUS,
});

export const getTaxStatusSuccess = (taxStatus) => {
  console.log("Received Tax status:", taxStatus);
  return {
    type: GET_TAX_STATUS_SUCCESS,
    payload: taxStatus,
  };
};

export const getTaxStatusFail = (error) => ({
  type: GET_TAX_STATUS_FAIL,
  payload: error,
});

export const getTaxValues = () => ({
  type: GET_TAX_VALUES,
});

export const getTaxValuesSuccess = (taxValues) => {
  console.log("Received Tax Values:", taxValues);
  return {
    type: GET_TAX_VALUES_SUCCESS,
    payload: taxValues,
  };
};

export const getTaxValuesFail = (error) => ({
  type: GET_TAX_VALUES_FAIL,
  payload: error,
});

export const getTaxApply = () => ({
  type: GET_TAX_APPLY,
});

export const getTaxApplySuccess = (taxApply) => {
  console.log("Received Tax Apply:", taxApply);
  return {
    type: GET_TAX_APPLY_SUCCESS,
    payload: taxApply,
  };
};

export const getTaxApplyFail = (error) => ({
  type: GET_TAX_APPLY_FAIL,
  payload: error,
});

export const getTaxTaxOnTax = () => ({
  type: GET_TAX_TAXONTAX,
});

export const getTaxTaxOnTaxSuccess = (taxTaxOnTax) => {
  console.log("Received Tax status:", taxTaxOnTax);
  return {
    type: GET_TAX_TAXONTAX_SUCCESS,
    payload: taxTaxOnTax,
  };
};

export const getTaxTaxOnTaxFail = (error) => ({
  type: GET_TAX_TAXONTAX_FAIL,
  payload: error,
});