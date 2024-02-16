import {
  GET_OSDTEMPLATE,
  GET_OSDTEMPLATE_FAIL,
  GET_OSDTEMPLATE_SUCCESS,
  GET_OSDTEMPLATE_STATUS,
  GET_OSDTEMPLATE_STATUS_FAIL,
  GET_OSDTEMPLATE_STATUS_SUCCESS,
  GET_OSDTEMPLATE_OSD,
  GET_OSDTEMPLATE_OSD_FAIL,
  GET_OSDTEMPLATE_OSD_SUCCESS,
  GET_OSDTEMPLATE_TEMPLATEFOR,
  GET_OSDTEMPLATE_TEMPLATEFOR_FAIL,
  GET_OSDTEMPLATE_TEMPLATEFOR_SUCCESS,
  ADD_NEW_OSDTEMPLATE,
  ADD_OSDTEMPLATE_SUCCESS,
  ADD_OSDTEMPLATE_FAIL,
  UPDATE_OSDTEMPLATE,
  UPDATE_OSDTEMPLATE_FAIL, UPDATE_OSDTEMPLATE_SUCCESS,
  UPDATE_OSDTEMPLATE_CURRENT_PAGE,
} from "./actionTypes";

export const goToPage = (toPage) => ({
  type: UPDATE_OSDTEMPLATE_CURRENT_PAGE,
  payload: Number(toPage),
});

export const updateOSDTemplate = (osdTemplate) => ({
  type: UPDATE_OSDTEMPLATE,
  payload: osdTemplate,
});

export const updateOSDTemplateSuccess = (osdTemplate) => ({
  type: UPDATE_OSDTEMPLATE_SUCCESS,
  payload: tax,
});

export const updateOSDTemplateFail = (error) => ({
  type: UPDATE_OSDTEMPLATE_FAIL,
  payload: error,
});

export const getOSDTemplate = () => ({
  type: GET_OSDTEMPLATE,
});

export const getOSDTemplateSuccess = (osdTemplate) => {
  console.log("Received OSD Template:", osdTemplate);
  return {
    type: GET_OSDTEMPLATE_SUCCESS,
    payload: osdTemplate,
  };
};

export const getOSDTemplateFail = (error) => ({
  type: GET_OSDTEMPLATE_FAIL,
  payload: error,
});

export const getOSDTemplateStatus = () => ({
  type: GET_OSDTEMPLATE_STATUS,
});

export const getOSDTemplateStatusSuccess = (osdTemplateStatus) => {
  return {
    type: GET_OSDTEMPLATE_STATUS_SUCCESS,
    payload: osdTemplateStatus,
  };
};

export const getOSDTemplateStatusFail = (error) => ({
  type: GET_OSDTEMPLATE_STATUS_FAIL,
  payload: error,
});

export const getOSDTemplateOSD = () => ({
  type: GET_OSDTEMPLATE_OSD,
});

export const getOSDTemplateOSDSuccess = (osdTemplateOSD) => {
  return {
    type: GET_OSDTEMPLATE_OSD_SUCCESS,
    payload: osdTemplateOSD,
  };
};

export const getOSDTemplateOSDFail = (error) => ({
  type: GET_OSDTEMPLATE_OSD_FAIL,
  payload: error,
});

export const getOSDTemplateTemplateFor = () => ({
  type: GET_OSDTEMPLATE_TEMPLATEFOR,
});

export const getOSDTemplateTemplateForSuccess = (osdTemplateTemplateFor) => {
  return {
    type: GET_OSDTEMPLATE_TEMPLATEFOR_SUCCESS,
    payload: osdTemplateTemplateFor,
  };
};

export const getOSDTemplateTemplateForFail = (error) => ({
  type: GET_OSDTEMPLATE_TEMPLATEFOR_FAIL,
  payload: error,
});

export const addNewOSDTemplate = (osdTemplate) => ({
  type: ADD_NEW_OSDTEMPLATE,
  payload: osdTemplate,
});

export const addOSDTemplateSuccess = (osdTemplate) => ({
  type: ADD_OSDTEMPLATE_SUCCESS,
  payload: osdTemplate,
});

export const addOSDTemplateFail = (error) => ({
  type: ADD_OSDTEMPLATE_FAIL,
  payload: error,
});
