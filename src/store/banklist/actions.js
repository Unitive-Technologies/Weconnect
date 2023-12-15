import {
  GET_BANK, GET_BANK_FAIL, GET_BANK_SUCCESS, ADD_NEW_BANK,
  ADD_BANK_SUCCESS,
  ADD_BANK_FAIL,
} from "./actionTypes";

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