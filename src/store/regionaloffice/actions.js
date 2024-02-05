import {
  GET_REGIONALOFFICE,
  GET_REGIONALOFFICE_FAIL,
  GET_REGIONALOFFICE_SUCCESS,
  ADD_NEW_REGIONALOFFICE,
  ADD_REGIONALOFFICE_SUCCESS,
  ADD_REGIONALOFFICE_FAIL,
  UPDATE_REGIONALOFFICE,
  UPDATE_REGIONALOFFICE_SUCCESS,
  UPDATE_REGIONALOFFICE_FAIL,
  UPDATE_REGIONALOFFICES_CURRENT_PAGE,
  GET_REGIONAL_ALLOTTEDBOUQUET,
  GET_REGIONAL_ALLOTTEDBOUQUET_SUCCESS,
  GET_REGIONAL_ALLOTTEDBOUQUET_FAIL,
} from "./actionTypes";

export const goToPage = (toPage) => ({
  type: UPDATE_REGIONALOFFICES_CURRENT_PAGE,
  payload: Number(toPage),
});

export const getRegionalOffice = () => {
  return {
    type: GET_REGIONALOFFICE,
  };
};

export const getRegionalOfficeSuccess = (regionaloffice) => {
  return {
    type: GET_REGIONALOFFICE_SUCCESS,
    payload: regionaloffice,
  };
};

export const getRegionalOfficeFail = (error) => ({
  type: GET_REGIONALOFFICE_FAIL,
  payload: error,
});

export const getRegionalAllottedBouquet = () => {
  return {
    type: GET_REGIONAL_ALLOTTEDBOUQUET,
  };
};

export const getRegionalAllottedBouquetSuccess = (regionalBouquet) => {
  return {
    type: GET_REGIONAL_ALLOTTEDBOUQUET_SUCCESS,
    payload: regionalBouquet,
  };
};

export const getRegionalAllottedBouquetFail = (error) => ({
  type: GET_REGIONAL_ALLOTTEDBOUQUET_FAIL,
  payload: error,
});

export const addNewRegionalOffice = (regionalOffice) => ({
  type: ADD_NEW_REGIONALOFFICE,
  payload: regionalOffice,
});

export const addRegionalOfficeSuccess = (regionalOffice) => ({
  type: ADD_REGIONALOFFICE_SUCCESS,
  payload: regionalOffice,
});

export const addRegionalOfficeFail = (error) => ({
  type: ADD_REGIONALOFFICE_FAIL,
  payload: error,
});

export const updateRegionalOffice = (regionalOffice) => ({
  type: UPDATE_REGIONALOFFICE,
  payload: regionalOffice,
});

export const updateRegionalOfficeSuccess = (regionalOffice) => ({
  type: UPDATE_REGIONALOFFICE_SUCCESS,
  payload: regionalOffice,
});

export const updateRegionalOfficeFail = (error) => ({
  type: UPDATE_REGIONALOFFICE_FAIL,
  payload: error,
});
