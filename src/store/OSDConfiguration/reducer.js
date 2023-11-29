import {
  GET_OSDCONFIGURATION_SUCCESS,
  GET_OSDCONFIGURATION_FAIL,
} from "./actionTypes";

const INIT_STATE = {
  osdConfiguration: [],
  error: {},
  loading: true,
};

const OSDConfiguration = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_OSDCONFIGURATION_SUCCESS:
      console.log("OSD Configuration data in reducer:", action.payload);
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

    default:
      return state;
  }
};

export default OSDConfiguration;
