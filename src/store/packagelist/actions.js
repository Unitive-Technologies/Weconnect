import {
  GET_PACKAGELIST,
  GET_PACKAGELIST_FAIL,
  GET_PACKAGELIST_SUCCESS,
  ADD_NEW_PACKAGELIST,
  ADD_PACKAGELIST_SUCCESS,
  ADD_PACKAGELIST_FAIL,
  UPDATE_PACKAGELIST_CURRENT_PAGE,
} from "./actionTypes";

export const goToPage = (toPage) => ({
  type: UPDATE_PACKAGELIST_CURRENT_PAGE,
  payload: Number(toPage),
});

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

export const addNewPackageList = (
  packagelist
) => ({
  type: ADD_NEW_PACKAGELIST,
  payload: packagelist,
});

export const addPackageListSuccess = (
  packagelist
) => ({
  type: ADD_PACKAGELIST_SUCCESS,
  payload: packagelist,
});

export const addPackageListFail = (error) => ({
  type: ADD_PACKAGELIST_FAIL,
  payload: error,
});