import {
  GET_OSDTEMPLATE,
  GET_OSDTEMPLATE_FAIL,
  GET_OSDTEMPLATE_SUCCESS,
  ADD_NEW_OSDTEMPLATE,
  ADD_OSDTEMPLATE_SUCCESS,
  ADD_OSDTEMPLATE_FAIL,
} from "./actionTypes";

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

export const addNewOSDTemplate = (
  osdTemplate
) => ({
  type: ADD_NEW_OSDTEMPLATE,
  payload: osdTemplate,
});

export const addOSDTemplateSuccess = (
  osdTemplate
) => ({
  type: ADD_OSDTEMPLATE_SUCCESS,
  payload: osdTemplate,
});

export const addOSDTemplateFail = (error) => ({
  type: ADD_OSDTEMPLATE_FAIL,
  payload: error,
});