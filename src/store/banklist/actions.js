import {
  GET_BANK, GET_BANK_FAIL, GET_BANK_SUCCESS,
  GET_BANK_STATUS,
  GET_BANK_STATUS_FAIL,
  GET_BANK_STATUS_SUCCESS,
  ADD_NEW_BANK,
  ADD_BANK_SUCCESS,
  ADD_BANK_FAIL,
  UPDATE_BANK, UPDATE_BANK_FAIL, UPDATE_BANK_SUCCESS,
  UPDATE_BANK_CURRENT_PAGE,
} from "./actionTypes";

export const goToPage = (toPage) => ({
  type: UPDATE_BANK_CURRENT_PAGE,
  payload: Number(toPage),
});

export const getBank = () => ({
  type: GET_BANK,
});

export const getBankSuccess = (bank) => {
  console.log("Received Bank list:", bank);
  return {
    type: GET_BANK_SUCCESS,
    payload: bank,
  };
};

export const getBankFail = (error) => ({
  type: GET_BANK_FAIL,
  payload: error,
});

export const updateBank = (bank) => ({
  type: UPDATE_BANK,
  payload: bank,
});

export const updateBankSuccess = (bank) => ({
  type: UPDATE_BANK_SUCCESS,
  payload: bank,
});

export const updateBankFail = (error) => ({
  type: UPDATE_BANK_FAIL,
  payload: error,
});

export const addNewBank = (
  bank
) => ({
  type: ADD_NEW_BANK,
  payload: bank,
});

export const addBankSuccess = (
  bank
) => ({
  type: ADD_BANK_SUCCESS,
  payload: bank,
});

export const addBankFail = (error) => ({
  type: ADD_BANK_FAIL,
  payload: error,
});

export const getBankStatus = () => ({
  type: GET_BANK_STATUS,
});

export const getBankStatusSuccess = (bankStatus) => {
  return {
    type: GET_BANK_STATUS_SUCCESS,
    payload: bankStatus,
  };
};

export const getBankStatusFail = (error) => ({
  type: GET_BANK_STATUS_FAIL,
  payload: error,
});