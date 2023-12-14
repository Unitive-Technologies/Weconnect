import {
  GET_REASON,
  GET_REASON_FAIL,
  GET_REASON_SUCCESS,
  ADD_NEW_REASON,
  ADD_REASON_SUCCESS,
  ADD_REASON_FAIL,
} from "./actionTypes";

export const getReason = () => ({
  type: GET_REASON,
});

export const getReasonSuccess = (reason) => {
  console.log("Received reason list:", reason);
  return {
    type: GET_REASON_SUCCESS,
    payload: reason,
  };
};

export const getReasonFail = (error) => ({
  type: GET_REASON_FAIL,
  payload: error,
});

export const addNewReason = (reason) => ({
  type: ADD_NEW_REASON,
  payload: reason,
});

export const addReasonSuccess = (reason) => ({
  type: ADD_REASON_SUCCESS,
  payload: reason,
});

export const addReasonFail = (error) => ({
  type: ADD_REASON_FAIL,
  payload: error,
});
