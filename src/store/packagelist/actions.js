import {
  GET_PACKAGELIST,
  GET_PACKAGELIST_FAIL,
  GET_PACKAGELIST_SUCCESS,
} from "./actionTypes";

export const getPackageList = () => ({
  type: GET_PACKAGELIST,
});

export const getPackageListSuccess = (packagelist) => {
  console.log("Received Package List:", packagelist);
  return {
    type: GET_PACKAGELIST_SUCCESS,
    payload: packagelist,
  };
};

export const getPackageListFail = (error) => ({
  type: GET_PACKAGELIST_FAIL,
  payload: error,
});
