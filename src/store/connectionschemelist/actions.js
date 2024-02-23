import {
  GET_CONNECTIONSCHEME,
  GET_CONNECTIONSCHEME_FAIL,
  GET_CONNECTIONSCHEME_SUCCESS,
  ADD_CONNECTIONSCHEME,
  ADD_CONNECTIONSCHEME_SUCCESS,
  ADD_CONNECTIONSCHEME_FAIL,
  GET_CONNECTIONSCHEME_BOXTYPE,
  GET_CONNECTIONSCHEME_BOXTYPE_FAIL,
  GET_CONNECTIONSCHEME_BOXTYPE_SUCCESS,
  GET_CONNECTIONSCHEME_STATUS,
  GET_CONNECTIONSCHEME_STATUS_FAIL,
  GET_CONNECTIONSCHEME_STATUS_SUCCESS,
} from "./actionTypes";

export const getConnectionScheme = () => ({
  type: GET_CONNECTIONSCHEME,
});

export const getConnectionSchemeSuccess = (connectionscheme) => {
  console.log("Received Connectin Scheme List:", connectionscheme);
  return {
    type: GET_CONNECTIONSCHEME_SUCCESS,
    payload: connectionscheme,
  };
};

export const getConnectionSchemeFail = (error) => ({
  type: GET_CONNECTIONSCHEME_FAIL,
  payload: error,
});

export const addConnectionscheme = (connectionscheme) => ({
  type: ADD_CONNECTIONSCHEME,
  payload: connectionscheme,
});
// console.log("payload: ", payload)
// );

export const addConnectionSchemeSuccess = (connectionscheme) => ({
  type: ADD_CONNECTIONSCHEME_SUCCESS,
  payload: connectionscheme,
});

export const addConnectionSchemeFail = (error) => ({
  type: ADD_CONNECTIONSCHEME_FAIL,
  payload: error,
});

export const getConnectionSchemeBoxType = () => ({
  type: GET_CONNECTIONSCHEME_BOXTYPE,
});

export const getConnectionSchemeBoxTypeSuccess = (connectionscheme) => {
  console.log("Received Connectin Scheme List:", connectionscheme);
  return {
    type: GET_CONNECTIONSCHEME_BOXTYPE_SUCCESS,
    payload: connectionscheme,
  };
};

export const getConnectionSchemeBoxTypeFail = (error) => ({
  type: GET_CONNECTIONSCHEME_BOXTYPE_FAIL,
  payload: error,
});

export const getConnectionSchemeStatus = () => ({
  type: GET_CONNECTIONSCHEME_STATUS,
});

export const getConnectionSchemeStatusSuccess = (connectionscheme) => {
  console.log("Received Connectin Scheme List:", connectionscheme);
  return {
    type: GET_CONNECTIONSCHEME_STATUS_SUCCESS,
    payload: connectionscheme,
  };
};

export const getConnectionSchemeStatusFail = (error) => ({
  type: GET_CONNECTIONSCHEME_STATUS_FAIL,
  payload: error,
});
