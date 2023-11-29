import {
  GET_OSDTEMPLATE_SUCCESS,
  GET_OSDTEMPLATE_FAIL,
} from "./actionTypes";

const INIT_STATE = {
  osdTemplate: [],
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

    default:
      return state;
  }
};

export default OSDTemplate;
