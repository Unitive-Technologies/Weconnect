import {
  GET_DESIGNATION,
  GET_DESIGNATION_FAIL,
  GET_DESIGNATION_SUCCESS,
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