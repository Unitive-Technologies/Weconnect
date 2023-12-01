import { GET_BANK, GET_BANK_FAIL, GET_BANK_SUCCESS } from "./actionTypes";

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
