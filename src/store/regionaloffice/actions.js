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
} from "./actionTypes";

export const getRegionalOffice = () => ({
  type: GET_REGIONALOFFICE,
});

export const getRegionalOfficeSuccess = (regionalOffice) => {
  console.log("Received Notification Template:", regionalOffice);
  return {
    type: GET_REGIONALOFFICE_SUCCESS,
    payload: regionalOffice,
  };
};

export const getRegionalOfficeFail = (error) => ({
  type: GET_REGIONALOFFICE_FAIL,
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