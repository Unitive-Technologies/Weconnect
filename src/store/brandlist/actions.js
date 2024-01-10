import {
  GET_BRANDLIST,
  GET_BRANDLIST_FAIL,
  GET_BRANDLIST_SUCCESS,
  GET_BRANDLIST_BRANDTYPE,
  GET_BRANDLIST_BRANDTYPE_FAIL,
  GET_BRANDLIST_BRANDTYPE_SUCCESS,
  GET_BRANDLIST_BOXTYPE,
  GET_BRANDLIST_BOXTYPE_FAIL,
  GET_BRANDLIST_BOXTYPE_SUCCESS,
  GET_BRANDLIST_CHARACTERS,
  GET_BRANDLIST_CHARACTERS_FAIL,
  GET_BRANDLIST_CHARACTERS_SUCCESS,
  GET_BRANDLIST_STATUS,
  GET_BRANDLIST_STATUS_FAIL,
  GET_BRANDLIST_STATUS_SUCCESS,
  GET_BRANDLIST_CASTYPE,
  GET_BRANDLIST_CASTYPE_FAIL,
  GET_BRANDLIST_CASTYPE_SUCCESS,
  ADD_BRANDLIST,
  ADD_BRANDLIST_SUCCESS,
  ADD_BRANDLIST_FAIL,
  UPDATE_BRANDLIST,
  UPDATE_BRANDLIST_FAIL,
  UPDATE_BRANDLIST_SUCCESS,
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

export const updateBrandList = (brandlist) => ({
  type: UPDATE_BRANDLIST,
  payload: brandlist,
});

export const updateBrandListSuccess = (brandlist) => ({
  type: UPDATE_BRANDLIST_SUCCESS,
  payload: brandlist,
});

export const updateBrandListFail = (error) => ({
  type: UPDATE_BRANDLIST_FAIL,
  payload: error,
});

export const addBrandList = (brandlist) => ({
  type: ADD_BRANDLIST,
  payload: brandlist,
});

export const addBrandListSuccess = (brandlist) => ({
  type: ADD_BRANDLIST_SUCCESS,
  payload: brandlist,
});

export const addBrandListFail = (error) => ({
  type: ADD_BRANDLIST_FAIL,
  payload: error,
});

export const getBrandListStatus = () => ({
  type: GET_BRANDLIST_STATUS,
});

export const getBrandListStatusSuccess = (brandlistStatus) => {
  return {
    type: GET_BRANDLIST_STATUS_SUCCESS,
    payload: brandlistStatus,
  };
};

export const getBrandListStatusFail = (error) => ({
  type: GET_BRANDLIST_STATUS_FAIL,
  payload: error,
});

export const getBrandListBrandType = () => ({
  type: GET_BRANDLIST_BRANDTYPE,
});

export const getBrandListBrandTypeSuccess = (brandlistBrandType) => {
  return {
    type: GET_BRANDLIST_BRANDTYPE_SUCCESS,
    payload: brandlistBrandType,
  };
};

export const getBrandListBrandTypeFail = (error) => ({
  type: GET_BRANDLIST_BRANDTYPE_FAIL,
  payload: error,
});

export const getBrandListBoxType = () => ({
  type: GET_BRANDLIST_BOXTYPE,
});

export const getBrandListBoxTypeSuccess = (brandlistBoxType) => {
  return {
    type: GET_BRANDLIST_BOXTYPE_SUCCESS,
    payload: brandlistBoxType,
  };
};

export const getBrandListBoxTypeFail = (error) => ({
  type: GET_BRANDLIST_BOXTYPE_FAIL,
  payload: error,
});

export const getBrandListCharacters = () => ({
  type: GET_BRANDLIST_CHARACTERS,
});

export const getBrandListCharactersSuccess = (brandlistCharacters) => {
  return {
    type: GET_BRANDLIST_CHARACTERS_SUCCESS,
    payload: brandlistCharacters,
  };
};

export const getBrandListCharactersFail = (error) => ({
  type: GET_BRANDLIST_CHARACTERS_FAIL,
  payload: error,
});

export const getBrandListCasType = () => ({
  type: GET_BRANDLIST_CASTYPE,
});

export const getBrandListCasTypeSuccess = (brandlistCasType) => {
  return {
    type: GET_BRANDLIST_CASTYPE_SUCCESS,
    payload: brandlistCasType,
  };
};

export const getBrandListCasTypeFail = (error) => ({
  type: GET_BRANDLIST_CASTYPE_FAIL,
  payload: error,
});