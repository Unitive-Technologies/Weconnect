import {
  GET_DESIGNATION,
  GET_DESIGNATION_FAIL,
  GET_DESIGNATION_SUCCESS,
  GET_DESIGNATION_STATUS,
  GET_DESIGNATION_STATUS_FAIL,
  GET_DESIGNATION_STATUS_SUCCESS,
  ADD_NEW_DESIGNATION,
  ADD_DESIGNATION_SUCCESS,
  ADD_DESIGNATION_FAIL,
} from "./actionTypes";

export const getDesignation = () => ({
  type: GET_DESIGNATION,
});

export const getDesignationSuccess = (designation) => {
  console.log("Received Designation:", designation);
  return {
    type: GET_DESIGNATION_SUCCESS,
    payload: designation,
  };
};

export const getDesignationFail = (error) => ({
  type: GET_DESIGNATION_FAIL,
  payload: error,
});

export const addNewDesignation = (designation) => ({
  type: ADD_NEW_DESIGNATION,
  payload: designation,
});

export const addDesignationSuccess = (designation) => ({
  type: ADD_DESIGNATION_SUCCESS,
  payload: designation,
});

export const addDesignationFail = (error) => ({
  type: ADD_DESIGNATION_FAIL,
  payload: error,
});

export const getDesignationStatus = () => ({
  type: GET_DESIGNATION_STATUS,
});

export const getDesignationStatusSuccess = (designationStatus) => {
  // console.log("Received Designation:", designation);
  return {
    type: GET_DESIGNATION_STATUS_SUCCESS,
    payload: designationStatus,
  };
};

export const getDesignationStatusFail = (error) => ({
  type: GET_DESIGNATION_STATUS_FAIL,
  payload: error,
});
