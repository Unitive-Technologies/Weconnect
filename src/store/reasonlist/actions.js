import { GET_REASON, GET_REASON_FAIL, GET_REASON_SUCCESS } from "./actionTypes";

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
