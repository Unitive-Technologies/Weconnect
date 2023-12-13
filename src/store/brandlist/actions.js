import {
  GET_BRANDLIST,
  GET_BRANDLIST_FAIL,
  GET_BRANDLIST_SUCCESS,
  ADD_BRANDLIST,
  ADD_BRANDLIST_SUCCESS,
  ADD_BRANDLIST_FAIL,
} from "./actionTypes";

export const getBrandList = () => ({
  type: GET_BRANDLIST,
});

export const getBrandListSuccess = (brandlist) => {
  console.log("Received Brand List:", brandlist);
  return {
    type: GET_BRANDLIST_SUCCESS,
    payload: brandlist,
  };
};

export const getBrandListFail = (error) => ({
  type: GET_BRANDLIST_FAIL,
  payload: error,
});

export const addBrandList = (brandlist) => ({
  type: ADD_BRANDLIST,
  payload: brandlist,
});

export const addBrandListSuccess = (brandlist) => ({
  type: ADD_BRANDLIST_SUCCESS,
  payload: brandlist,
});

export const addBrandListFail = (error) => ({
  type: ADD_BRANDLIST_FAIL,
  payload: error,
});
