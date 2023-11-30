import {
  GET_CONNECTIONSCHEME,
  GET_CONNECTIONSCHEME_FAIL,
  GET_CONNECTIONSCHEME_SUCCESS,
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
