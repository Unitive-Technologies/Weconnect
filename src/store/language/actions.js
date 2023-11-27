import {
  GET_LANGUAGELIST,
  GET_LANGUAGELIST_FAIL,
  GET_LANGUAGELIST_SUCCESS,
} from "./actionTypes";

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
