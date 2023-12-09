import {
  GET_OSDCONFIGURATION,
  GET_OSDCONFIGURATION_FAIL,
  GET_OSDCONFIGURATION_SUCCESS,
  ADD_NEW_OSDCONFIGURATION,
  ADD_OSDCONFIGURATION_SUCCESS,
  ADD_OSDCONFIGURATION_FAIL,
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

export const addNewOSDConfiguration = (
  osdConfiguration
) => ({
  type: ADD_NEW_OSDCONFIGURATION,
  payload: osdConfiguration,
});

export const addOSDConfigurationSuccess = (
  osdConfiguration
) => ({
  type: ADD_OSDCONFIGURATION_SUCCESS,
  payload: osdConfiguration,
});

export const addOSDConfigurationFail = (error) => ({
  type: ADD_OSDCONFIGURATION_FAIL,
  payload: error,
});