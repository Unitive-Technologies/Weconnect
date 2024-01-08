import {
  GET_OSDCONFIGURATION_SUCCESS,
  GET_OSDCONFIGURATION_FAIL,
  GET_OSDCONFIGURATION_ENABLE_SUCCESS,
  GET_OSDCONFIGURATION_ENABLE_FAIL,
  GET_OSDCONFIGURATION_FORCESDDISPLAY_SUCCESS,
  GET_OSDCONFIGURATION_FORCESDDISPLAY_FAIL,
  GET_OSDCONFIGURATION_DISPLAY_SUCCESS,
  GET_OSDCONFIGURATION_DISPLAY_FAIL,
  GET_OSDCONFIGURATION_FONTCOLOR_SUCCESS,
  GET_OSDCONFIGURATION_FONTCOLOR_FAIL,
  GET_OSDCONFIGURATION_BACKGROUNDCOLOR_SUCCESS,
  GET_OSDCONFIGURATION_BACKGROUNDCOLOR_FAIL,
  GET_OSDCONFIGURATION_FONTSIZE_SUCCESS,
  GET_OSDCONFIGURATION_FONTSIZE_FAIL,
  GET_OSDCONFIGURATION_BACKGROUNDAREA_SUCCESS,
  GET_OSDCONFIGURATION_BACKGROUNDAREA_FAIL,
  GET_OSDCONFIGURATION_STATUS_SUCCESS,
  GET_OSDCONFIGURATION_STATUS_FAIL,
  ADD_OSDCONFIGURATION_SUCCESS,
  ADD_OSDCONFIGURATION_FAIL,
} from "./actionTypes";

const INIT_STATE = {
  osdConfiguration: [],
  osdConfigurationEnable: [],
  osdConfigurationForcedDisplay: [],
  osdConfigurationDisplay: [],
  osdConfigurationFontColor: [],
  osdConfigurationBackgroundColor: [],
  osdConfigurationFontSize: [],
  osdConfigurationBackgroundArea: [],
  osdConfigurationStatus: [],
  error: {},
  loading: true,
};

const OSDConfiguration = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_OSDCONFIGURATION_SUCCESS:
      // console.log("OSD Configuration data in reducer:", action.payload);
      return {
        ...state,
        osdConfiguration: action.payload,
        loading: false,
      };

    case GET_OSDCONFIGURATION_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_OSDCONFIGURATION_ENABLE_SUCCESS:
      // console.log("osd Configuration enable data in reducer:", action.payload);
      return {
        ...state,
        osdConfigurationEnable: action.payload,
        loading: false,
      };

    case GET_OSDCONFIGURATION_ENABLE_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_OSDCONFIGURATION_FORCESDDISPLAY_SUCCESS:
      // console.log("osd Configuration forcesddisplay data in reducer:", action.payload);
      return {
        ...state,
        osdConfigurationForcedDisplay: action.payload,
        loading: false,
      };

    case GET_OSDCONFIGURATION_FORCESDDISPLAY_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_OSDCONFIGURATION_DISPLAY_SUCCESS:
      // console.log("osd Configuration display data in reducer:", action.payload);
      return {
        ...state,
        osdConfigurationDisplay: action.payload,
        loading: false,
      };

    case GET_OSDCONFIGURATION_DISPLAY_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_OSDCONFIGURATION_FONTCOLOR_SUCCESS:
      // console.log("osd Configuration fontcolor data in reducer:", action.payload);
      return {
        ...state,
        osdConfigurationFontColor: action.payload,
        loading: false,
      };

    case GET_OSDCONFIGURATION_FONTCOLOR_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_OSDCONFIGURATION_BACKGROUNDCOLOR_SUCCESS:
      // console.log("osd Configuration fontcolor data in reducer:", action.payload);
      return {
        ...state,
        osdConfigurationBackgroundColor: action.payload,
        loading: false,
      };

    case GET_OSDCONFIGURATION_BACKGROUNDCOLOR_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_OSDCONFIGURATION_FONTSIZE_SUCCESS:
      // console.log("osd Configuration fontcolor data in reducer:", action.payload);
      return {
        ...state,
        osdConfigurationFontSize: action.payload,
        loading: false,
      };

    case GET_OSDCONFIGURATION_FONTSIZE_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_OSDCONFIGURATION_BACKGROUNDAREA_SUCCESS:
      // console.log("osd Configuration fontcolor data in reducer:", action.payload);
      return {
        ...state,
        osdConfigurationBackgroundArea: action.payload,
        loading: false,
      };

    case GET_OSDCONFIGURATION_BACKGROUNDAREA_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_OSDCONFIGURATION_STATUS_SUCCESS:
      // console.log("osd Configuration Status data in reducer:", action.payload);
      return {
        ...state,
        osdConfigurationStatus: action.payload,
        loading: false,
      };

    case GET_OSDCONFIGURATION_STATUS_FAIL:
      return {
        ...state,
        error: action.payload,
      };



    case ADD_OSDCONFIGURATION_SUCCESS:
      return {
        ...state,
        osdConfiguration: [
          ...state.osdConfiguration,
          action.payload,
        ],
      };

    case ADD_OSDCONFIGURATION_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default OSDConfiguration;
