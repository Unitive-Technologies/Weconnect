import {
  GET_CONNECTIONSCHEME,
  GET_CONNECTIONSCHEME_SUCCESS,
  GET_CONNECTIONSCHEME_FAIL,
  ADD_CONNECTIONSCHEME,
  ADD_CONNECTIONSCHEME_SUCCESS,
  ADD_CONNECTIONSCHEME_FAIL,
  GET_CONNECTIONSCHEME_BOXTYPE_SUCCESS,
  GET_CONNECTIONSCHEME_BOXTYPE_FAIL,
  GET_CONNECTIONSCHEME_STATUS_SUCCESS,
  GET_CONNECTIONSCHEME_STATUS_FAIL,
} from "./actionTypes";

const INIT_STATE = {
  connectionscheme: [],
  connectionBoxType: [],
  connectionStatus: [],
  error: {},
  loading: false,
};

const ConnectionScheme = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_CONNECTIONSCHEME:
      return {
        ...state,
        loading: true,
      };

    case GET_CONNECTIONSCHEME_SUCCESS:
      console.log("Connection Scheme list data in reducer:", action.payload);
      return {
        ...state,
        connectionscheme: action.payload,
        loading: false,
      };

    case GET_CONNECTIONSCHEME_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case ADD_CONNECTIONSCHEME:
      return {
        ...state,
        loading: true,
      };
    case ADD_CONNECTIONSCHEME_SUCCESS:
      return {
        ...state,
        connectionscheme: [state.connectionscheme, action.payload],
      };

    case ADD_CONNECTIONSCHEME_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_CONNECTIONSCHEME_BOXTYPE_SUCCESS:
      console.log("Connection Boxtype data in reducer:", action.payload);
      return {
        ...state,
        connectionBoxType: action.payload,
        loading: false,
      };

    case GET_CONNECTIONSCHEME_BOXTYPE_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_CONNECTIONSCHEME_STATUS_SUCCESS:
      console.log("Connection status data in reducer:", action.payload);
      return {
        ...state,
        connectionStatus: action.payload,
        loading: false,
      };

    case GET_CONNECTIONSCHEME_STATUS_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default ConnectionScheme;
