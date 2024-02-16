import {
  GET_OSDCONFIGURATION,
  GET_OSDCONFIGURATION_FAIL,
  GET_OSDCONFIGURATION_SUCCESS,
  GET_OSDCONFIGURATION_ENABLE,
  GET_OSDCONFIGURATION_ENABLE_FAIL,
  GET_OSDCONFIGURATION_ENABLE_SUCCESS,
  GET_OSDCONFIGURATION_FORCESDDISPLAY,
  GET_OSDCONFIGURATION_FORCESDDISPLAY_FAIL,
  GET_OSDCONFIGURATION_FORCESDDISPLAY_SUCCESS,
  GET_OSDCONFIGURATION_DISPLAY,
  GET_OSDCONFIGURATION_DISPLAY_FAIL,
  GET_OSDCONFIGURATION_DISPLAY_SUCCESS,
  GET_OSDCONFIGURATION_FONTCOLOR,
  GET_OSDCONFIGURATION_FONTCOLOR_FAIL,
  GET_OSDCONFIGURATION_FONTCOLOR_SUCCESS,
  GET_OSDCONFIGURATION_BACKGROUNDCOLOR,
  GET_OSDCONFIGURATION_BACKGROUNDCOLOR_FAIL,
  GET_OSDCONFIGURATION_BACKGROUNDCOLOR_SUCCESS,
  GET_OSDCONFIGURATION_FONTSIZE,
  GET_OSDCONFIGURATION_FONTSIZE_FAIL,
  GET_OSDCONFIGURATION_FONTSIZE_SUCCESS,
  GET_OSDCONFIGURATION_BACKGROUNDAREA,
  GET_OSDCONFIGURATION_BACKGROUNDAREA_FAIL,
  GET_OSDCONFIGURATION_BACKGROUNDAREA_SUCCESS,
  GET_OSDCONFIGURATION_STATUS,
  GET_OSDCONFIGURATION_STATUS_FAIL,
  GET_OSDCONFIGURATION_STATUS_SUCCESS,
  ADD_NEW_OSDCONFIGURATION,
  ADD_OSDCONFIGURATION_SUCCESS,
  ADD_OSDCONFIGURATION_FAIL,
  UPDATE_OSDCONFIGURATION,
  UPDATE_OSDCONFIGURATION_FAIL,
  UPDATE_OSDCONFIGURATION_SUCCESS,
} from "./actionTypes";

export const getOSDConfiguration = () => ({
  type: GET_OSDCONFIGURATION,
});

export const getOSDConfigurationSuccess = (osdConfiguration) => {
  // console.log("Received OSD Configuration:", osdConfiguration);
  return {
    type: GET_OSDCONFIGURATION_SUCCESS,
    payload: osdConfiguration,
  };
};

export const getOSDConfigurationFail = (error) => ({
  type: GET_OSDCONFIGURATION_FAIL,
  payload: error,
});

export const addNewOSDConfiguration = (osdConfiguration) => ({
  type: ADD_NEW_OSDCONFIGURATION,
  payload: osdConfiguration,
});

export const addOSDConfigurationSuccess = (osdConfiguration) => ({
  type: ADD_OSDCONFIGURATION_SUCCESS,
  payload: osdConfiguration,
});

export const addOSDConfigurationFail = (error) => ({
  type: ADD_OSDCONFIGURATION_FAIL,
  payload: error,
});

export const getOSDConfigurationEnable = () => ({
  type: GET_OSDCONFIGURATION_ENABLE,
});

export const getOSDConfigurationEnableSuccess = (osdConfigurationEnable) => {
  return {
    type: GET_OSDCONFIGURATION_ENABLE_SUCCESS,
    payload: osdConfigurationEnable,
  };
};

export const getOSDConfigurationEnableFail = (error) => ({
  type: GET_OSDCONFIGURATION_ENABLE_FAIL,
  payload: error,
});

export const getOSDConfigurationForcedDisplay = () => ({
  type: GET_OSDCONFIGURATION_FORCESDDISPLAY,
});

export const getOSDConfigurationForcedDisplaySuccess = (
  osdConfigurationForcedDisplay
) => {
  return {
    type: GET_OSDCONFIGURATION_FORCESDDISPLAY_SUCCESS,
    payload: osdConfigurationForcedDisplay,
  };
};

export const getOSDConfigurationForcedDisplayFail = (error) => ({
  type: GET_OSDCONFIGURATION_FORCESDDISPLAY_FAIL,
  payload: error,
});

export const getOSDConfigurationDisplay = () => ({
  type: GET_OSDCONFIGURATION_DISPLAY,
});

export const getOSDConfigurationDisplaySuccess = (osdConfigurationDisplay) => {
  return {
    type: GET_OSDCONFIGURATION_DISPLAY_SUCCESS,
    payload: osdConfigurationDisplay,
  };
};

export const getOSDConfigurationDisplayFail = (error) => ({
  type: GET_OSDCONFIGURATION_DISPLAY_FAIL,
  payload: error,
});

export const getOSDConfigurationFontColor = () => ({
  type: GET_OSDCONFIGURATION_FONTCOLOR,
});

export const getOSDConfigurationFontColorSuccess = (
  osdConfigurationFontColor
) => {
  return {
    type: GET_OSDCONFIGURATION_FONTCOLOR_SUCCESS,
    payload: osdConfigurationFontColor,
  };
};

export const getOSDConfigurationFontColorFail = (error) => ({
  type: GET_OSDCONFIGURATION_FONTCOLOR_FAIL,
  payload: error,
});

export const getOSDConfigurationBackgroundColor = () => ({
  type: GET_OSDCONFIGURATION_BACKGROUNDCOLOR,
});

export const getOSDConfigurationBackgroundColorSuccess = (
  osdConfigurationBackgroundColor
) => {
  return {
    type: GET_OSDCONFIGURATION_BACKGROUNDCOLOR_SUCCESS,
    payload: osdConfigurationBackgroundColor,
  };
};

export const getOSDConfigurationBackgroundColorFail = (error) => ({
  type: GET_OSDCONFIGURATION_BACKGROUNDCOLOR_FAIL,
  payload: error,
});

export const getOSDConfigurationFontSize = () => ({
  type: GET_OSDCONFIGURATION_FONTSIZE,
});

export const getOSDConfigurationFontSizeSuccess = (
  osdConfigurationFontSize
) => {
  return {
    type: GET_OSDCONFIGURATION_FONTSIZE_SUCCESS,
    payload: osdConfigurationFontSize,
  };
};

export const getOSDConfigurationFontSizeFail = (error) => ({
  type: GET_OSDCONFIGURATION_FONTSIZE_FAIL,
  payload: error,
});

export const getOSDConfigurationBackgroundArea = () => ({
  type: GET_OSDCONFIGURATION_BACKGROUNDAREA,
});

export const getOSDConfigurationBackgroundAreaSuccess = (
  osdConfigurationBackgroundArea
) => {
  return {
    type: GET_OSDCONFIGURATION_BACKGROUNDAREA_SUCCESS,
    payload: osdConfigurationBackgroundArea,
  };
};

export const getOSDConfigurationBackgroundAreaFail = (error) => ({
  type: GET_OSDCONFIGURATION_BACKGROUNDAREA_FAIL,
  payload: error,
});

export const getOSDConfigurationStatus = () => ({
  type: GET_OSDCONFIGURATION_STATUS,
});

export const getOSDConfigurationStatusSuccess = (osdConfigurationStatus) => {
  return {
    type: GET_OSDCONFIGURATION_STATUS_SUCCESS,
    payload: osdConfigurationStatus,
  };
};

export const getOSDConfigurationStatusFail = (error) => ({
  type: GET_OSDCONFIGURATION_STATUS_FAIL,
  payload: error,
});

export const updateOSDConfiguration = (osdConfiguration) => ({
  type: UPDATE_OSDCONFIGURATION,
  payload: osdConfiguration,
});

export const updateOSDConfigurationSuccess = (osdConfiguration) => ({
  type: UPDATE_OSDCONFIGURATION_SUCCESS,
  payload: osdConfiguration,
});

export const updateOSDConfigurationFail = (error) => ({
  type: UPDATE_OSDCONFIGURATION_FAIL,
  payload: error,
});
