import {
  GET_REASON, GET_REASON_FAIL, GET_REASON_SUCCESS, ADD_NEW_REASONLIST,
  ADD_REASONLIST_SUCCESS,
  ADD_REASONLIST_FAIL,
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

export const addNewReason = (
  Reason
) => ({
  type: ADD_NEW_REASON,
  payload: Reason,
});

export const addChannelListSuccess = (
  Reason
) => ({
  type: ADD_REASON_SUCCESS,
  payload: Reason,
});

export const addChannelListFail = (error) => ({
  type: ADD_REASON_FAIL,
  payload: error,
});