import {
  GET_PACKAGELIST,
  GET_PACKAGELIST_FAIL,
  GET_PACKAGELIST_SUCCESS,
  GET_PACKAGE_TYPE,
  GET_PACKAGE_TYPE_FAIL,
  GET_PACKAGE_TYPE_SUCCESS,
  GET_PACKAGE_BOXTYPE,
  GET_PACKAGE_BOXTYPE_FAIL,
  GET_PACKAGE_BOXTYPE_SUCCESS,
  GET_PACKAGE_STATUS,
  GET_PACKAGE_STATUS_FAIL,
  GET_PACKAGE_STATUS_SUCCESS,
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

export const getPackageType = () => ({
  type: GET_PACKAGE_TYPE,
});

export const getPackageTypeSuccess = (packagetype) => {
  // console.log("Received Package Type:", packagetype);
  return {
    type: GET_PACKAGE_TYPE_SUCCESS,
    payload: packagetype,
  };
};

export const getPackageTypeFail = (error) => ({
  type: GET_PACKAGE_TYPE_FAIL,
  payload: error,
});

export const getPackageBoxType = () => ({
  type: GET_PACKAGE_BOXTYPE,
});

export const getPackageBoxTypeSuccess = (packageboxtype) => {
  // console.log("Received Package Boxtype:", packageboxtype);
  return {
    type: GET_PACKAGE_BOXTYPE_SUCCESS,
    payload: packageboxtype,
  };
};

export const getPackageBoxTypeFail = (error) => ({
  type: GET_PACKAGE_BOXTYPE_FAIL,
  payload: error,
});

export const getPackageStatus = () => ({
  type: GET_PACKAGE_STATUS,
});

export const getPackageStatusSuccess = (packagestatus) => {
  // console.log("Received Package Status:", packagestatus);
  return {
    type: GET_PACKAGE_STATUS_SUCCESS,
    payload: packagestatus,
  };
};

export const getPackageStatusFail = (error) => ({
  type: GET_PACKAGE_STATUS_FAIL,
  payload: error,
});

export const addNewPackageList = (packagelist) => ({
  type: ADD_NEW_PACKAGELIST,
  payload: packagelist,
});

export const addPackageListSuccess = (packagelist) => ({
  type: ADD_PACKAGELIST_SUCCESS,
  payload: packagelist,
});

export const addPackageListFail = (error) => ({
  type: ADD_PACKAGELIST_FAIL,
  payload: error,
});
