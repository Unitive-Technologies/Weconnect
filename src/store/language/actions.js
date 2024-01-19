import {
  GET_LANGUAGELIST,
  GET_LANGUAGELIST_FAIL,
  GET_LANGUAGELIST_SUCCESS,
  GET_LANGUAGELIST_STATUS,
  GET_LANGUAGELIST_STATUS_FAIL,
  GET_LANGUAGELIST_STATUS_SUCCESS,
  ADD_NEW_LANGUAGELIST,
  ADD_LANGUAGELIST_SUCCESS,
  ADD_LANGUAGELIST_FAIL,
  UPDATE_LANGUAGELIST,
  UPDATE_LANGUAGELIST_FAIL,
  UPDATE_LANGUAGELIST_SUCCESS,
  UPDATE_LANGUAGELIST_CURRENT_PAGE,
} from "./actionTypes";

export const goToPage = (toPage) => ({
  type: UPDATE_LANGUAGELIST_CURRENT_PAGE,
  payload: Number(toPage),
});

export const getlanguageList = () => ({
  type: GET_LANGUAGELIST,
});

export const getLanguageListSuccess = (languagelist) => {
  console.log("Received Language List:", languagelist);
  return {
    type: GET_LANGUAGELIST_SUCCESS,
    payload: languagelist,
  };
};

export const getLanguageListFail = (error) => ({
  type: GET_LANGUAGELIST_FAIL,
  payload: error,
});

export const updateLanguageList = (languagelist) => ({
  type: UPDATE_LANGUAGELIST,
  payload: languagelist,
});

export const updateLanguageListSuccess = (languagelist) => ({
  type: UPDATE_LANGUAGELIST_SUCCESS,
  payload: languagelist,
});

export const updateLanguageListFail = (error) => ({
  type: UPDATE_LANGUAGELIST_FAIL,
  payload: error,
});

export const getLanguageListStatus = () => ({
  type: GET_LANGUAGELIST_STATUS,
});

export const getLanguageListStatusSuccess = (languagelistStatus) => {
  return {
    type: GET_LANGUAGELIST_STATUS_SUCCESS,
    payload: languagelistStatus,
  };
};

export const getLanguageListStatusFail = (error) => ({
  type: GET_LANGUAGELIST_STATUS_FAIL,
  payload: error,
});

export const addNewLanguageList = (
  languagelist
) => ({
  type: ADD_NEW_LANGUAGELIST,
  payload: languagelist,
});

export const addLanguageListSuccess = (
  languagelist
) => ({
  type: ADD_LANGUAGELIST_SUCCESS,
  payload: languagelist,
});

export const addLanguageListFail = (error) => ({
  type: ADD_LANGUAGELIST_FAIL,
  payload: error,
});