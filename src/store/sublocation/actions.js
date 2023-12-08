import {
  GET_SUBLOCATION,
  GET_SUBLOCATION_FAIL,
  GET_SUBLOCATION_SUCCESS,
  ADD_SUBLOCATION,
  ADD_SUBLOCATION_SUCCESS,
  ADD_SUBLOCATION_FAIL,
  GET_LOCLIST,
  GET_LOCLIST_SUCCESS,
  GET_LOCLIST_FAIL,
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

export const getLoclist = () => ({
  type: GET_LOCLIST,
});

export const getLoclistSuccess = (loclist) => {
  console.log("Received location list:", loclist);
  return {
    type: GET_LOCLIST_SUCCESS,
    payload: loclist,
  };
};

export const getloclistFail = (error) => ({
  type: GET_LOCLIST_FAIL,
  payload: error,
});
