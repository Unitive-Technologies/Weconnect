import {
  GET_APPADBANNER_SUCCESS,
  GET_APPADBANNER_FAIL,
  ADD_APPADBANNER_SUCCESS,
  ADD_APPADBANNER_FAIL,
} from "./actionTypes";

const INIT_STATE = {
  appadbanner: [],
  error: {},
  loading: true,
};

const AppAdBanner = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_APPADBANNER_SUCCESS:
      console.log(
        "App Advertisement banner list data in reducer:",
        action.payload
      );
      return {
        ...state,
        appadbanner: action.payload,
        loading: false,
      };

    case GET_APPADBANNER_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case ADD_APPADBANNER_SUCCESS:
      return {
        ...state,
        appadbanner: [...state.appadbanner, action.payload],
      };

    case ADD_APPADBANNER_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default AppAdBanner;
