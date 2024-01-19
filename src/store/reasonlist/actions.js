import {
  GET_REASON,
  GET_REASON_FAIL,
  GET_REASON_SUCCESS,
  UPDATE_REASON,
  UPDATE_REASON_FAIL,
  UPDATE_REASON_SUCCESS,
  GET_REASON_STATUS,
  GET_REASON_STATUS_FAIL,
  GET_REASON_STATUS_SUCCESS,
  GET_REASON_REASONTYPE,
  GET_REASON_REASONTYPE_FAIL,
  GET_REASON_REASONTYPE_SUCCESS,
  ADD_NEW_REASON,
  ADD_REASON_SUCCESS,
  ADD_REASON_FAIL,
  UPDATE_REASON_CURRENT_PAGE,
} from "./actionTypes";

export const goToPage = (toPage) => ({
  type: UPDATE_REASON_CURRENT_PAGE,
  payload: Number(toPage),
});

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

export const updateReason = (reason) => ({
  type: UPDATE_REASON,
  payload: reason,
});

export const updateReasonSuccess = (reason) => ({
  type: UPDATE_REASON_SUCCESS,
  payload: reason,
});

export const updateReasonFail = (error) => ({
  type: UPDATE_REASON_FAIL,
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

export const getReasonStatus = () => ({
  type: GET_REASON_STATUS,
});

export const getReasonStatusSuccess = (reasonStatus) => {
  return {
    type: GET_REASON_STATUS_SUCCESS,
    payload: reasonStatus,
  };
};

export const getReasonStatusFail = (error) => ({
  type: GET_REASON_STATUS_FAIL,
  payload: error,
});

export const getReasonReasonType = () => ({
  type: GET_REASON_REASONTYPE,
});

export const getReasonReasonTypeSuccess = (reasonReasonType) => {
  // console.log("Received Designation:", designation);
  return {
    type: GET_REASON_REASONTYPE_SUCCESS,
    payload: reasonReasonType,
  };
};

export const getReasonReasonTypeFail = (error) => ({
  type: GET_REASON_REASONTYPE_FAIL,
  payload: error,
});
