import {
  GET_CONNECTIONSCHEME_SUCCESS,
  GET_CONNECTIONSCHEME_FAIL,
  ADD_CONNECTIONSCHEME_SUCCESS,
  ADD_CONNECTIONSCHEME_FAIL,
} from "./actionTypes";

const INIT_STATE = {
  connectionscheme: [],
  error: {},
  loading: true,
};

const ConnectionScheme = (state = INIT_STATE, action) => {
  switch (action.type) {
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
    default:
      return state;
  }
};

export default ConnectionScheme;
