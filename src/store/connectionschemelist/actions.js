import {
  GET_CONNECTIONSCHEME,
  GET_CONNECTIONSCHEME_FAIL,
  GET_CONNECTIONSCHEME_SUCCESS,
  ADD_CONNECTIONSCHEME,
  ADD_CONNECTIONSCHEME_SUCCESS,
  ADD_CONNECTIONSCHEME_FAIL,
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

export const addConnectionScheme = (connectionscheme) => ({
  type: ADD_CONNECTIONSCHEME,
  payload: connectionscheme,
});

export const addConnectionSchemeSuccess = (connectionscheme) => ({
  type: ADD_CONNECTIONSCHEME_SUCCESS,
  payload: connectionscheme,
});

export const addConnectionSchemeFail = (error) => ({
  type: ADD_CONNECTIONSCHEME_FAIL,
  payload: error,
});
