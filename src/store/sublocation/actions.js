import {
  GET_SUBLOCATION,
  GET_SUBLOCATION_FAIL,
  GET_SUBLOCATION_SUCCESS,
} from "./actionTypes";

export const getSublocation = () => ({
  type: GET_SUBLOCATION,
});

export const getSublocationSuccess = (sublocation) => {
  console.log("Received Sublocation:", sublocation);
  return {
    type: GET_SUBLOCATION_SUCCESS,
    payload: sublocation,
  };
};

export const getSublocationFail = (error) => ({
  type: GET_SUBLOCATION_FAIL,
  payload: error,
});