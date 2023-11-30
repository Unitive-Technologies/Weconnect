import {
  GET_BRANDLIST,
  GET_BRANDLIST_FAIL,
  GET_BRANDLIST_SUCCESS,
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
