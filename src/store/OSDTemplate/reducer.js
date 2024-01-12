import {
  GET_OSDTEMPLATE_SUCCESS,
  GET_OSDTEMPLATE_FAIL,
  GET_OSDTEMPLATE_STATUS_FAIL,
  GET_OSDTEMPLATE_STATUS_SUCCESS,
  GET_OSDTEMPLATE_OSD_FAIL,
  GET_OSDTEMPLATE_OSD_SUCCESS,
  GET_OSDTEMPLATE_TEMPLATEFOR_FAIL,
  GET_OSDTEMPLATE_TEMPLATEFOR_SUCCESS,
  ADD_OSDTEMPLATE_SUCCESS,
  ADD_OSDTEMPLATE_FAIL,
} from "./actionTypes";

const INIT_STATE = {
  osdTemplate: [],
  osdTemplateStatus: [],
  osdTemplateTemplateFor: [],
  osdTemplateOSD: [],
  error: {},
  loading: true,
};

const OSDTemplate = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_OSDTEMPLATE_SUCCESS:
      console.log("OSD Template data in reducer:", action.payload);
      return {
        ...state,
        osdTemplate: action.payload,
        loading: false,
      };

    case GET_OSDTEMPLATE_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_OSDTEMPLATE_STATUS_SUCCESS:
      console.log("Osd Template Status data in reducer:", action.payload);
      return {
        ...state,
        osdTemplateStatus: action.payload,
        loading: false,
      };

    case GET_OSDTEMPLATE_STATUS_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_OSDTEMPLATE_OSD_SUCCESS:
      console.log("Osd Template OSD data in reducer:", action.payload);
      return {
        ...state,
        osdTemplateOSD: action.payload,
        loading: false,
      };

    case GET_OSDTEMPLATE_OSD_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_OSDTEMPLATE_TEMPLATEFOR_SUCCESS:
      console.log("Osd Template Template For data in reducer:", action.payload);
      return {
        ...state,
        osdTemplateTemplateFor: action.payload,
        loading: false,
      };

    case GET_OSDTEMPLATE_TEMPLATEFOR_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case ADD_OSDTEMPLATE_SUCCESS:
      return {
        ...state,
        osdTemplate: [
          ...state.osdTemplate,
          action.payload,
        ],
      };

    case ADD_OSDTEMPLATE_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default OSDTemplate;
