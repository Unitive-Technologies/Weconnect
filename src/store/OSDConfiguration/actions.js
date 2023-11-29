import {
  GET_OSDCONFIGURATION,
  GET_OSDCONFIGURATION_FAIL,
  GET_OSDCONFIGURATION_SUCCESS,
} from "./actionTypes";

export const getOSDConfiguration = () => ({
  type: GET_OSDCONFIGURATION,
});

export const getOSDConfigurationSuccess = (osdConfiguration) => {
  console.log("Received OSD Configuration:", osdConfiguration);
  return {
    type: GET_OSDCONFIGURATION_SUCCESS,
    payload: osdConfiguration,
  };
};

export const getOSDConfigurationFail = (error) => ({
  type: GET_OSDCONFIGURATION_FAIL,
  payload: error,
});