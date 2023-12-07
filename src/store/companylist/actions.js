import {
  GET_COMPANYLIST,
  GET_COMPANYLIST_FAIL,
  GET_COMPANYLIST_SUCCESS,
  ADD_NEW_COMPANYLIST,
  ADD_COMPANYLIST_SUCCESS,
  ADD_COMPANYLIST_FAIL,
} from "./actionTypes";

export const getCompanyList = () => ({
  type: GET_COMPANYLIST,
});

export const getCompanyListSuccess = (companylist) => {
  console.log("Received Company List:", companylist);
  return {
    type: GET_COMPANYLIST_SUCCESS,
    payload: companylist,
  };
};

export const getCompanyListFail = (error) => ({
  type: GET_COMPANYLIST_FAIL,
  payload: error,
});

export const addNewCompanyList = (
  companylist
) => ({
  type: ADD_NEW_COMPANYLIST,
  payload: companylist,
});

export const addCompanyListSuccess = (
  companylist
) => ({
  type: ADD_COMPANYLIST_SUCCESS,
  payload: companylist,
});

export const addCompanyListFail = (error) => ({
  type: ADD_COMPANYLIST_FAIL,
  payload: error,
});