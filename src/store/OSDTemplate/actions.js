import {
  GET_OSDTEMPLATE,
  GET_OSDTEMPLATE_FAIL,
  GET_OSDTEMPLATE_SUCCESS,
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