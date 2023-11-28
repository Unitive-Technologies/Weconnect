import {
  GET_SUBLOCATION_SUCCESS,
  GET_SUBLOCATION_FAIL,
} from "./actionTypes";

const INIT_STATE = {
  sublocation: [],
  error: {},
  loading: true,
};

const Sublocation = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_SUBLOCATION_SUCCESS:
      console.log("SubLocation data in reducer:", action.payload);
      return {
        ...state,
        sublocation: action.payload,
        loading: false,
      };

    case GET_SUBLOCATION_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default Sublocation;
