import {
  GET_COMPANYLIST,
  GET_COMPANYLIST_FAIL,
  GET_COMPANYLIST_SUCCESS,
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
