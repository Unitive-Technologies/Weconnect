import {
  GET_SUBLOCATION,
  GET_SUBLOCATION_FAIL,
  GET_SUBLOCATION_SUCCESS,
  ADD_SUBLOCATION,
  ADD_SUBLOCATION_SUCCESS,
  ADD_SUBLOCATION_FAIL,
  UPDATE_SUBLOCATION,
  UPDATE_SUBLOCATION_SUCCESS,
  UPDATE_SUBLOCATION_FAIL,
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

export const addSubLocation = (sublocation) => ({
  type: ADD_SUBLOCATION,
  payload: sublocation,
});

export const addSubLocationSuccess = (sublocation) => ({
  type: ADD_SUBLOCATION_SUCCESS,
  payload: sublocation,
});

export const addSubLocationFail = (error) => ({
  type: ADD_SUBLOCATION_FAIL,
  payload: error,
});

export const updateSublocation = (sublocation) => ({
  type: UPDATE_SUBLOCATION,
  payload: sublocation,
});

export const updateSublocationSuccess = (sublocation) => ({
  type: UPDATE_SUBLOCATION_SUCCESS,
  payload: sublocation,
});

export const updateSublocationFail = (error) => ({
  type: UPDATE_SUBLOCATION_FAIL,
  payload: error,
});
